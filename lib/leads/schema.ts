/**
 * lib/leads/schema.ts
 *
 * Eén beschrijving van een aanvraag, gedeeld door browser en server: de
 * browser controleert meteen (de bezoeker ziet direct welk veld niet klopt),
 * de server controleert opnieuw en die controle telt.
 *
 * Soorten aanvragen:
 *  - contact      het contactformulier;
 *  - offerte      de aanvraag in stappen (/offerte), voor elke dienst;
 *  - medewerker   "een medewerker neemt het over" in de chat (met gesprek);
 *  - terugbellen  "laat je gegevens achter" in de chat;
 *  - scan         de gratis website-scan (lead magnet op de prijzenpagina).
 */

export type LeadType = "contact" | "offerte" | "medewerker" | "terugbellen" | "scan";

export type LeadAnswer = { label: string; value: string };

export type LeadInput = {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  /** Gekozen diensten (titels), bij een offerte. */
  services?: string[];
  /** Antwoorden uit de stappen, in volgorde: { label, value }. */
  answers?: LeadAnswer[];
  /** Pakket waar de bezoeker vandaan kwam (?pakket=…). */
  packageName?: string;
  /** Honeypot: onzichtbaar veld dat alleen bots invullen. */
  website?: string;
  /** Moment waarop het formulier werd geopend (ms), voor de snelheidscontrole. */
  startedAt?: number;
  pageUrl?: string;
  /** Huidige website van de klant (website-scan, offerte). */
  siteUrl?: string;
  /** Losse context voor de mail, bv. { Bron: "Chat" }. */
  extra?: Record<string, string>;
  /** Eén ID per aanvraag, gedeeld met de Meta Pixel (ontdubbeling Conversions API). */
  eventId?: string;
  /** "Stuur me tips en acties": expliciete opt-in voor marketingmail. */
  consentMarketing?: boolean;
  /** Marketingcookies geaccepteerd (dan mag de server de conversie aan Meta melden). */
  consentAds?: boolean;
};

export type FieldError = { field: string; message: string };

export type NormalizedLead = Required<Pick<LeadInput, "type">> & {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  services: string[];
  answers: LeadAnswer[];
  packageName: string;
  pageUrl: string;
  siteUrl: string;
  extra: Record<string, string>;
  eventId: string;
  consentMarketing: boolean;
  consentAds: boolean;
  receivedAt: string;
};

export const TYPE_LABELS: Record<LeadType, string> = {
  contact: "Contactformulier",
  offerte: "Offerteaanvraag",
  medewerker: "Chat: medewerker gevraagd",
  terugbellen: "Chat: terugbelverzoek",
  scan: "Gratis website-scan",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v.trim());
}

/** Nederlandse en internationale nummers: 9 tot 15 cijfers, eventueel met +. */
export function isValidPhone(v: unknown): boolean {
  if (typeof v !== "string") return false;
  const digits = v.replace(/[\s\-().]/g, "");
  return /^\+?\d{9,15}$/.test(digits);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function validateLead(input: Partial<LeadInput> | null | undefined): FieldError[] {
  const errors: FieldError[] = [];
  if (!input || typeof input !== "object") return [{ field: "form", message: "De aanvraag is leeg." }];

  const type = input.type;
  if (!type || !(type in TYPE_LABELS)) errors.push({ field: "type", message: "Onbekende soort aanvraag." });

  const name = str(input.name, 120);
  const email = str(input.email, 254);
  const phone = str(input.phone, 40);
  const message = str(input.message, 6000);

  if (name.length < 2) errors.push({ field: "name", message: "Vul je naam in." });

  if (type === "medewerker") {
    if (!isValidEmail(email) && !isValidPhone(phone)) {
      errors.push({ field: "email", message: "Vul een geldig e-mailadres of telefoonnummer in." });
    } else {
      if (email && !isValidEmail(email)) errors.push({ field: "email", message: "Dit e-mailadres lijkt niet te kloppen." });
      if (phone && !isValidPhone(phone)) errors.push({ field: "phone", message: "Dit telefoonnummer lijkt niet te kloppen." });
    }
  } else if (type === "terugbellen") {
    if (!isValidPhone(phone)) errors.push({ field: "phone", message: "Vul een geldig telefoonnummer in." });
    if (email && !isValidEmail(email)) errors.push({ field: "email", message: "Dit e-mailadres lijkt niet te kloppen." });
  } else {
    if (!isValidEmail(email)) errors.push({ field: "email", message: "Vul een geldig e-mailadres in." });
    if (phone && !isValidPhone(phone)) errors.push({ field: "phone", message: "Dit telefoonnummer lijkt niet te kloppen." });
  }

  if (type === "contact" && message.length < 10) {
    errors.push({ field: "message", message: "Vertel in een paar woorden waar we je mee kunnen helpen." });
  }
  if (type === "scan" && str(input.siteUrl, 300).replace(/^https?:\/\//, "").length < 4) {
    errors.push({ field: "siteUrl", message: "Vul het adres van je website in." });
  }
  if (type === "offerte") {
    const services = Array.isArray(input.services) ? input.services.filter((s) => typeof s === "string" && s.trim()) : [];
    if (services.length === 0) errors.push({ field: "services", message: "Kies minstens één dienst." });
  }

  return errors;
}

export function normalizeLead(input: LeadInput): NormalizedLead {
  const answers = Array.isArray(input.answers)
    ? input.answers
        .filter((a) => a && typeof a.label === "string" && typeof a.value === "string" && a.value.trim())
        .slice(0, 30)
        .map((a) => ({ label: a.label.trim().slice(0, 80), value: a.value.trim().slice(0, 600) }))
    : [];
  const extra: Record<string, string> = {};
  if (input.extra && typeof input.extra === "object") {
    for (const [k, v] of Object.entries(input.extra).slice(0, 12)) {
      if (typeof v === "string" && v.trim()) extra[k.slice(0, 60)] = v.trim().slice(0, 300);
    }
  }
  return {
    type: input.type,
    name: str(input.name, 120),
    email: str(input.email, 254).toLowerCase(),
    phone: str(input.phone, 40),
    company: str(input.company, 120),
    subject: str(input.subject, 160),
    message: str(input.message, 6000),
    services: Array.isArray(input.services)
      ? Array.from(new Set(input.services.filter((s) => typeof s === "string").map((s) => s.trim().slice(0, 80)))).slice(0, 12)
      : [],
    answers,
    packageName: str(input.packageName, 160),
    pageUrl: str(input.pageUrl, 500),
    siteUrl: str(input.siteUrl, 300),
    extra,
    eventId: str(input.eventId, 80).replace(/[^\w-]/g, ""),
    consentMarketing: input.consentMarketing === true,
    consentAds: input.consentAds === true,
    receivedAt: new Date().toISOString(),
  };
}
