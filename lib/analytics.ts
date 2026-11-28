/**
 * lib/analytics.ts
 *
 * Eén plek voor metingen: GA4 / Google Ads (gtag), Google Tag Manager
 * (dataLayer) en de Meta Pixel. Alles is een no-op zolang de tags niet geladen
 * zijn, en die laden pas na toestemming (components/site/Analytics.tsx). Er
 * gaat dus nooit iets weg zonder akkoord van de bezoeker.
 *
 * Conversies:
 *  - Aanvraag (offerte, contact, chat, website-scan): GA4 `generate_lead`,
 *    Google Ads-conversie (NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL) en Meta `Lead`.
 *    Dezelfde event-ID gaat mee naar de server, zodat de Meta Conversions API
 *    de melding van de browser herkent en niet dubbel telt.
 *  - Bellen, WhatsApp, mailen: GA4-event en Meta `Contact`.
 *  - Offerte geopend: GA4 `offerte_start` en Meta `InitiateCheckout`, handig
 *    voor retargeting op mensen die begonnen maar niet afrondden.
 */

type Params = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

/** Meta-standaardevents per eigen eventnaam; de rest gaat als custom event. */
const META_STANDARD: Record<string, string> = {
  generate_lead: "Lead",
  contact_click: "Contact",
  offerte_start: "InitiateCheckout",
  view_pricing: "ViewContent",
};

const clean = (p: Params) => Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined && v !== ""));

/** Een event naar alle geladen tags. */
export function track(event: string, params: Params = {}, opts: { eventId?: string } = {}) {
  if (typeof window === "undefined") return;
  const p = clean(params);
  try {
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...p });
    if (typeof window.gtag === "function") window.gtag("event", event, p);
    if (typeof window.fbq === "function") {
      const std = META_STANDARD[event];
      if (std) window.fbq("track", std, p, opts.eventId ? { eventID: opts.eventId } : undefined);
      else window.fbq("trackCustom", event, p);
    }
  } catch {
    /* meten mag de site nooit breken */
  }
}

/** Unieke ID voor één conversie (browser en server delen hem voor ontdubbeling). */
export function newEventId(prefix = "lead"): string {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${rnd}`;
}

/** Een binnengekomen aanvraag: GA4, Google Ads-conversie en Meta Lead. */
export function trackLead({
  type,
  eventId,
  value,
  email,
  phone,
  label,
}: {
  type: string;
  eventId: string;
  value?: number;
  email?: string;
  phone?: string;
  label?: string;
}) {
  if (typeof window === "undefined") return;
  const currency = value ? "EUR" : undefined;
  try {
    // Enhanced conversions: gtag hasht e-mail en telefoon zelf vóór verzending.
    if (typeof window.gtag === "function" && (email || phone)) {
      window.gtag("set", "user_data", clean({ email, phone_number: phone }));
    }
    if (typeof window.gtag === "function" && ADS_ID && ADS_LEAD_LABEL) {
      window.gtag("event", "conversion", clean({ send_to: `${ADS_ID}/${ADS_LEAD_LABEL}`, value, currency, transaction_id: eventId }));
    }
  } catch {
    /* niets */
  }
  track("generate_lead", { lead_type: type, content_name: label ?? type, value, currency }, { eventId });
}

/** Bellen / WhatsApp / mailen vanaf de site. */
export function trackContact(method: "phone" | "whatsapp" | "email" | "route", context: string) {
  track("contact_click", { method, context });
}
