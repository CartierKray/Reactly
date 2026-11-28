"use client";

/**
 * lib/leads/client.ts
 *
 * De enige manier waarop de frontend een aanvraag verstuurt (contact,
 * offerte, chat). Succes betekent dat de aanvraag daadwerkelijk is
 * afgeleverd, nooit alleen dat de knop is ingedrukt.
 *
 * De server kiest de route: Resend (als RESEND_API_KEY is gezet), anders
 * zet hij de gevalideerde gegevens klaar en levert de browser af via
 * EmailJS, zoals het contactformulier voorheen deed.
 */

import { newEventId, trackLead } from "@/lib/analytics";
import { readConsent } from "@/lib/consent";

import { validateLead, type FieldError, type LeadInput } from "./schema";

export type LeadResult = { ok: true } | { ok: false; message: string; errors?: FieldError[] };

const NETWORK_ERROR =
  "We konden geen verbinding maken. Controleer je internetverbinding en probeer het opnieuw, of bel ons direct.";

/** Ligt het niet aan de bezoeker, dan is bellen of WhatsApp de snelste route. */
const DELIVERY_ERROR =
  "Je aanvraag kon nu niet bij ons worden afgeleverd. Dat ligt aan ons. Bel of WhatsApp ons gerust, dan pakken we het direct op.";

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const payload: LeadInput = {
    ...input,
    pageUrl: input.pageUrl ?? (typeof window !== "undefined" ? window.location.href : ""),
    eventId: input.eventId ?? newEventId(input.type),
    consentAds: readConsent()?.marketing === true,
  };
  const geslaagd = (): LeadResult => {
    // Conversie melden (alleen als de tags na toestemming geladen zijn).
    trackLead({
      type: payload.type,
      eventId: payload.eventId!,
      email: payload.email,
      phone: payload.phone,
      label: payload.packageName || payload.subject || payload.type,
    });
    return { ok: true };
  };

  // Dezelfde controle als de server, maar meteen.
  const fouten = validateLead(payload);
  if (fouten.length) {
    return { ok: false, message: "Controleer de gemarkeerde velden en probeer het opnieuw.", errors: fouten };
  }

  let response: Response;
  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, message: NETWORK_ERROR };
  }

  let data: {
    ok?: boolean;
    message?: string;
    errors?: FieldError[];
    deliver?: "server" | "client";
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
    templateParams?: Record<string, string>;
  } | null = null;
  try {
    data = await response.json();
  } catch {
    /* leeg antwoord: hieronder afgehandeld */
  }

  if (!response.ok || !data?.ok) {
    return {
      ok: false,
      message: typeof data?.message === "string" ? data.message : DELIVERY_ERROR,
      errors: Array.isArray(data?.errors) ? data.errors : undefined,
    };
  }

  // Afgeleverd door de server, of bewust genegeerd (bot).
  if (data.deliver !== "client") return geslaagd();

  // De server heeft gevalideerd; de browser levert af via EmailJS.
  try {
    const emailjs = (await import("@emailjs/browser")).default;
    await emailjs.send(data.serviceId!, data.templateId!, data.templateParams, { publicKey: data.publicKey! });
    return geslaagd();
  } catch (error) {
    console.error("[leads] afleveren via de browser mislukt", error);
    return { ok: false, message: DELIVERY_ERROR };
  }
}

/** Zet een lijst veldfouten om in een map voor weergave bij het veld. */
export function toFieldErrorMap(errors?: FieldError[]): Record<string, string> {
  if (!errors?.length) return {};
  const out: Record<string, string> = {};
  for (const e of errors) if (!out[e.field]) out[e.field] = e.message;
  return out;
}
