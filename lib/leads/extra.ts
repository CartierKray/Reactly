/**
 * lib/leads/extra.ts  (alleen server)
 *
 * Wat er na het afleveren van een aanvraag nog gebeurt, zonder dat het de
 * aanvraag ooit kan laten mislukken:
 *
 *  1. De aanvrager wordt een contact in Resend (segment "Website-aanvragen"),
 *     met bron, diensten, pakket en pijplijnstatus "nieuw". Het dashboard leest
 *     zijn leads hieruit. Zonder opt-in voor de nieuwsbrief staat het contact
 *     afgemeld voor mailings (losse mails over de aanvraag kunnen wel).
 *  2. Met toestemming voor marketingcookies meldt de server de conversie aan de
 *     Meta Conversions API (META_PIXEL_ID + META_CAPI_TOKEN), met dezelfde
 *     event-ID als de Pixel in de browser, zodat Meta hem niet dubbel telt.
 *     E-mail en telefoon gaan alleen gehasht (SHA-256) mee.
 */

import { createHash } from "node:crypto";

import { resendConfigured, ensureSegment, upsertContact } from "@/lib/resend-api";
import { TYPE_LABELS, isValidEmail, type NormalizedLead } from "./schema";

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
const schoon = (o: Record<string, string | undefined>) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v && v.trim()).map(([k, v]) => [k, v!.trim().slice(0, 250)]));

export async function syncLeadContact(lead: NormalizedLead): Promise<void> {
  if (!resendConfigured() || !isValidEmail(lead.email)) return;
  try {
    const segment = await ensureSegment(process.env.RESEND_LEADS_SEGMENT || "Website-aanvragen");
    const [voornaam, ...rest] = lead.name.split(/\s+/);
    await upsertContact({
      email: lead.email,
      firstName: voornaam,
      lastName: rest.join(" ") || undefined,
      segmentIds: [segment],
      properties: schoon({
        bron: TYPE_LABELS[lead.type],
        telefoon: lead.phone,
        bedrijf: lead.company,
        diensten: lead.services.join(", "),
        pakket: lead.packageName,
        website: lead.siteUrl,
        nieuwsbrief: lead.consentMarketing ? "ja" : undefined,
      }),
      createOnly: { properties: { status: "nieuw" }, unsubscribed: !lead.consentMarketing },
    });
  } catch (e) {
    console.error("[leads] contact niet opgeslagen in Resend:", e instanceof Error ? e.message : "onbekende fout");
  }
}

export async function sendMetaLead(lead: NormalizedLead, ctx: { ip: string; userAgent: string; fbp?: string; fbc?: string }): Promise<void> {
  const pixel = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token || !lead.consentAds) return;
  const versie = process.env.META_API_VERSION || "v27.0";
  let telefoon = lead.phone.replace(/[^\d]/g, "");
  if (telefoon.startsWith("00")) telefoon = telefoon.slice(2);
  else if (telefoon.startsWith("0")) telefoon = `31${telefoon.slice(1)}`;
  const [voornaam, ...rest] = lead.name.split(/\s+/);
  try {
    const res = await fetch(`https://graph.facebook.com/${versie}/${pixel}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: lead.eventId || undefined,
            action_source: "website",
            event_source_url: lead.pageUrl || undefined,
            user_data: {
              em: isValidEmail(lead.email) ? [sha(lead.email)] : undefined,
              ph: telefoon.length >= 9 ? [sha(telefoon)] : undefined,
              fn: voornaam ? [sha(voornaam)] : undefined,
              ln: rest.length ? [sha(rest.join(" "))] : undefined,
              country: [sha("nl")],
              client_ip_address: ctx.ip || undefined,
              client_user_agent: ctx.userAgent || undefined,
              fbp: ctx.fbp || undefined,
              fbc: ctx.fbc || undefined,
            },
            custom_data: { lead_type: lead.type, content_name: lead.packageName || TYPE_LABELS[lead.type] },
          },
        ],
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error(`[leads] Meta Conversions API weigerde (${res.status})`);
  } catch (e) {
    console.error("[leads] Meta Conversions API onbereikbaar:", e instanceof Error ? e.message : "onbekende fout");
  }
}

/** Waarde van een cookie uit de request-headers (voor _fbp en _fbc). */
export function cookieWaarde(headers: Headers, naam: string): string | undefined {
  const m = (headers.get("cookie") ?? "").match(new RegExp(`(?:^|;\\s*)${naam}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}
