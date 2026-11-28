/**
 * app/api/leads/route.ts
 *
 * Het enige punt waar aanvragen van reactly.nl doorheen gaan: het
 * contactformulier, de offerte-aanvraag in stappen en de chat. Opgezet
 * zoals bij BeterLease:
 *
 *   1. rate limiting per IP (ruim voor pogingen, streng voor afleveringen);
 *   2. honeypot (hard) en snelheidscontrole (alleen loggen);
 *   3. volledige servervalidatie met Nederlandse veldmeldingen;
 *   4. aflevering.
 *
 * Aflevering: eerst via Resend als RESEND_API_KEY is gezet: naar
 * LEAD_TO_EMAIL (standaard cartierkray@gmail.com) vanaf LEAD_FROM_EMAIL
 * (standaard "Reactly <info@reactly.nl>"), met daarna een bevestigingsmail
 * aan de klant. Zonder Resend, of als Resend faalt: EmailJS vanaf de server
 * als EMAILJS_PRIVATE_KEY is gezet, anders via de browser. Een lead mag
 * nooit verloren gaan aan één instelling of storing.
 *
 * Daarna (lib/leads/extra): de aanvrager wordt een contact in Resend voor het
 * dashboard, en met marketingtoestemming gaat de conversie naar de Meta
 * Conversions API. Geen van beide kan de aanvraag laten mislukken.
 */

import { NextResponse } from "next/server";

import { verstuurBevestiging } from "@/lib/leads/bevestiging";
import { cookieWaarde, sendMetaLead, syncLeadContact } from "@/lib/leads/extra";
import { clientIp, rateLimit } from "@/lib/leads/rateLimit";
import { verstuurViaResend } from "@/lib/leads/resend";
import { normalizeLead, validateLead, type LeadInput, type NormalizedLead } from "@/lib/leads/schema";
import { toTemplateParams } from "@/lib/leads/template";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_acr1dXX";
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_196x1XX";
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "K5wMHhtMWmcGoCuXX";
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

/** Optionele CRM-/automatiseringskoppeling (Zapier, Make, n8n…). */
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

/**
 * Twee limieten: de ruime telt alle pogingen (een klant met een typefout
 * wordt niet buitengesloten), de strenge alleen aanvragen die echt worden
 * afgeleverd.
 */
const ATTEMPT_LIMIT = { max: 40, windowMs: 10 * 60_000 };
const DELIVERY_LIMIT = { max: 6, windowMs: 10 * 60_000 };
const MIN_FILL_SECONDS = 2;
const MAX_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  const attempt = rateLimit(`lead:attempt:${ip}`, ATTEMPT_LIMIT.max, ATTEMPT_LIMIT.windowMs);
  if (!attempt.allowed) {
    log("rate-limited-attempts", { ip });
    return NextResponse.json(
      { ok: false, error: "rate_limited", message: "Te veel verzoeken vanaf dit adres. Probeer het over enkele minuten opnieuw of bel ons direct." },
      { status: 429, headers: { "Retry-After": String(attempt.retryAfterSeconds) } },
    );
  }

  let body: LeadInput;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "too_large", message: "Je aanvraag is te groot om te verwerken." }, { status: 413 });
    }
    body = JSON.parse(text) as LeadInput;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json", message: "De aanvraag kon niet gelezen worden." }, { status: 400 });
  }

  // Honeypot: gewone 200 terug zodat een bot niets leert, maar niets versturen.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    log("honeypot", { ip, type: body.type });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Snelheidscontrole: alleen loggen. Met automatisch invullen kan een echte
  // bezoeker ook razendsnel zijn; een verloren lead weegt zwaarder.
  if (typeof body.startedAt === "number" && body.startedAt > 0) {
    const elapsed = (Date.now() - body.startedAt) / 1000;
    if (elapsed >= 0 && elapsed < MIN_FILL_SECONDS) log("verdacht-snel-ingevuld", { ip, type: body.type });
  }

  const errors = validateLead(body);
  if (errors.length) {
    log("validation-failed", { ip, type: body.type, fields: errors.map((e) => e.field) });
    return NextResponse.json(
      { ok: false, error: "validation_failed", message: "Controleer de gemarkeerde velden en probeer het opnieuw.", errors },
      { status: 422 },
    );
  }

  const delivery = rateLimit(`lead:deliver:${ip}`, DELIVERY_LIMIT.max, DELIVERY_LIMIT.windowMs);
  if (!delivery.allowed) {
    log("rate-limited-deliveries", { ip, type: body.type });
    return NextResponse.json(
      { ok: false, error: "rate_limited", message: "Je hebt net al een aanvraag verstuurd en die hebben we ontvangen. Bel ons gerust als het dringend is." },
      { status: 429, headers: { "Retry-After": String(delivery.retryAfterSeconds) } },
    );
  }

  const lead = normalizeLead(body);
  if (WEBHOOK_URL) void forwardToWebhook(lead);
  const naAflevering = () =>
    Promise.allSettled([
      syncLeadContact(lead),
      sendMetaLead(lead, {
        ip,
        userAgent: request.headers.get("user-agent") ?? "",
        fbp: cookieWaarde(request.headers, "_fbp"),
        fbc: cookieWaarde(request.headers, "_fbc"),
      }),
    ]);

  // 1. Resend: rechtstreeks naar LEAD_TO_EMAIL, daarna de bevestiging.
  if (await verstuurViaResend(lead)) {
    log("delivered-resend", { ip, type: lead.type });
    await Promise.allSettled([verstuurBevestiging(lead), naAflevering()]);
    return NextResponse.json({ ok: true, deliver: "server", delivered: true });
  }

  const templateParams = toTemplateParams(lead);

  // 2. EmailJS vanaf de server (met privésleutel), anders via de browser.
  if (!PRIVATE_KEY) {
    await naAflevering();
    return viaBrowser(ip, lead, templateParams);
  }

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        template_params: templateParams,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).slice(0, 300);
      console.error(`[leads] EmailJS weigerde de aanvraag (${response.status}): ${detail}`);
      return viaBrowser(ip, lead, templateParams);
    }
    log("delivered-emailjs", { ip, type: lead.type });
    await Promise.allSettled([verstuurBevestiging(lead), naAflevering()]);
    return NextResponse.json({ ok: true, deliver: "server", delivered: true });
  } catch (error) {
    console.error("[leads] afleveren mislukt:", error instanceof Error ? error.message : "onbekende fout");
    return viaBrowser(ip, lead, templateParams);
  }
}

/** Gevalideerd en klaar; de browser levert af via EmailJS. */
function viaBrowser(ip: string, lead: NormalizedLead, templateParams: Record<string, string>) {
  log("delegated-to-client", { ip, type: lead.type });
  return NextResponse.json({
    ok: true,
    deliver: "client",
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID,
    publicKey: PUBLIC_KEY,
    templateParams,
  });
}

async function forwardToWebhook(lead: NormalizedLead) {
  try {
    await fetch(WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("[leads] webhook mislukt:", error instanceof Error ? error.message : "onbekende fout");
  }
}

/** Logging zonder persoonsgegevens: nooit naam, e-mail, telefoon of berichttekst. */
function log(event: string, meta: Record<string, unknown>) {
  const safe = { ...meta, ip: hashIp(String(meta.ip ?? "")) };
  console.info(`[leads] ${event}`, JSON.stringify(safe));
}

function hashIp(ip: string): string {
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (Math.imul(31, h) + ip.charCodeAt(i)) | 0;
  return `ip_${(h >>> 0).toString(36)}`;
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
