/**
 * lib/leads/template.ts  (alleen server)
 *
 * De interne mail die bij elke aanvraag naar het team gaat (LEAD_TO_EMAIL,
 * standaard cartierkray@gmail.com), in de huisstijl van Reactly: kop in
 * nachtblauw met het woordmerk, de contactgegevens bovenaan met directe
 * knoppen (mailen, bellen, WhatsApp), daaronder de aanvraag zelf.
 *
 * Tabellen en inline stijlen: dat tonen Outlook, Gmail en Apple Mail
 * allemaal netjes. Het logo is tekst, geen afbeelding die geblokkeerd wordt.
 */

import { SITE } from "@/lib/site";
import { TYPE_LABELS, type NormalizedLead } from "./schema";

export const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const FONT = "font-family:Poppins,'Segoe UI',Helvetica,Arial,sans-serif";
export const NAVY = "#010B2C";
export const BLUE = "#0057FF";

const whatsappLink = (phone: string) => {
  let d = phone.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `31${d.slice(1)}`;
  return `https://wa.me/${d}`;
};

const datum = (iso: string) =>
  new Date(iso).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", dateStyle: "long", timeStyle: "short" });

export function leadSubject(lead: NormalizedLead): string {
  const wie = lead.company ? `${lead.name} (${lead.company})` : lead.name;
  if (lead.type === "offerte") {
    const wat = lead.services.slice(0, 3).join(", ") + (lead.services.length > 3 ? " +" : "");
    return `Nieuwe offerteaanvraag: ${wat} | ${wie}`;
  }
  if (lead.type === "medewerker") return `Chat: medewerker gevraagd | ${wie}`;
  if (lead.type === "terugbellen") return `Terugbelverzoek | ${wie}`;
  if (lead.type === "scan") return `Gratis website-scan: ${lead.siteUrl || "website"} | ${wie}`;
  return `Nieuw bericht${lead.subject ? `: ${lead.subject}` : ""} | ${wie}`;
}

/** Platte tekst: voor mailprogramma's zonder HTML en voor de EmailJS-terugval. */
export function leadSummary(lead: NormalizedLead): string {
  const regels = [
    `${TYPE_LABELS[lead.type]} via ${SITE.url.replace(/^https?:\/\//, "")}`,
    "",
    `Naam: ${lead.name}`,
    lead.company && `Bedrijf: ${lead.company}`,
    lead.email && `E-mail: ${lead.email}`,
    lead.phone && `Telefoon: ${lead.phone}`,
    lead.packageName && `Pakket: ${lead.packageName}`,
    lead.siteUrl && `Website: ${lead.siteUrl}`,
    lead.services.length > 0 && `Diensten: ${lead.services.join(", ")}`,
    ...lead.answers.map((a) => `${a.label}: ${a.value}`),
    lead.subject && `Onderwerp: ${lead.subject}`,
    lead.message && `\nBericht:\n${lead.message}`,
    "",
    ...Object.entries(lead.extra).map(([k, v]) => `${k}: ${v}`),
    lead.consentMarketing && `Nieuwsbrief: ja, wil tips en acties ontvangen`,
    lead.pageUrl && `Pagina: ${lead.pageUrl}`,
    `Ontvangen: ${datum(lead.receivedAt)}`,
  ];
  return regels.filter((r) => r !== false && r !== "" && r !== undefined).join("\n").replace(/\n{3,}/g, "\n\n");
}

const rij = (k: string, v: string) =>
  `<tr><td valign="top" style="padding:7px 0;width:38%;${FONT};font-size:13px;color:#6b7280">${esc(k)}</td><td valign="top" style="padding:7px 0;${FONT};font-size:14px;font-weight:600;color:#0b1020">${esc(v)}</td></tr>`;

const kop = (t: string) =>
  `<div style="${FONT};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${BLUE};margin:0 0 10px">${esc(t)}</div>`;

export function leadHtml(lead: NormalizedLead): string {
  const knoppen = [
    lead.email &&
      `<a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent(`Re: ${leadSubject(lead)}`)}" style="display:inline-block;background:${BLUE};color:#ffffff;text-decoration:none;${FONT};font-size:13px;font-weight:600;padding:11px 18px;border-radius:999px;margin:0 8px 8px 0">Beantwoord per mail</a>`,
    lead.phone &&
      `<a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#0b1020;color:#ffffff;text-decoration:none;${FONT};font-size:13px;font-weight:600;padding:11px 18px;border-radius:999px;margin:0 8px 8px 0">Bel ${esc(lead.phone)}</a>`,
    lead.phone &&
      `<a href="${esc(whatsappLink(lead.phone))}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;${FONT};font-size:13px;font-weight:600;padding:11px 18px;border-radius:999px;margin:0 0 8px">WhatsApp</a>`,
  ]
    .filter(Boolean)
    .join("");

  const diensten = lead.services.length
    ? `<tr><td style="padding:0 32px 20px">${kop("Gekozen diensten")}${lead.services
        .map(
          (s) =>
            `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background:#eef3ff;border:1px solid #d6e2ff;${FONT};font-size:13px;font-weight:600;color:#0b1020">${esc(s)}</span>`,
        )
        .join("")}</td></tr>`
    : "";

  const antwoorden = lead.answers.length || lead.packageName || lead.subject || lead.siteUrl
    ? `<tr><td style="padding:0 32px 20px">${kop("De aanvraag")}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${[
        lead.packageName ? rij("Pakket", lead.packageName) : "",
        lead.siteUrl ? rij("Website", lead.siteUrl) : "",
        lead.subject ? rij("Onderwerp", lead.subject) : "",
        ...lead.answers.map((a) => rij(a.label, a.value)),
      ].join("")}</table></td></tr>`
    : "";

  const bericht = lead.message
    ? `<tr><td style="padding:0 32px 20px">${kop(lead.type === "medewerker" ? "Gesprek in de chat" : "Bericht")}<div style="background:#f6f7fb;border:1px solid #eceef5;border-radius:12px;padding:14px 16px;${FONT};font-size:14px;line-height:1.6;color:#1f2937;white-space:pre-wrap">${esc(lead.message)}</div></td></tr>`
    : "";

  const context = [
    ...Object.entries(lead.extra).map(([k, v]) => rij(k, v)),
    lead.consentMarketing ? rij("Nieuwsbrief", "Ja, wil tips en acties ontvangen") : "",
    lead.pageUrl ? rij("Pagina", lead.pageUrl) : "",
    rij("Ontvangen", datum(lead.receivedAt)),
  ].join("");

  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(leadSubject(lead))}</title></head>
<body style="margin:0;padding:0;background:#eef0f6">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f6;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden">
  <tr><td style="background:${NAVY};padding:24px 32px">
    <span style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;font-style:italic;color:#ffffff;letter-spacing:-.3px">Reactly</span>
    <span style="float:right;margin-top:6px;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.1);${FONT};font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#cdd8ff">${esc(TYPE_LABELS[lead.type])}</span>
  </td></tr>
  <tr><td style="padding:28px 32px 6px">
    <h1 style="margin:0 0 4px;${FONT};font-size:22px;line-height:1.3;color:#0b1020">${esc(lead.name)}${lead.company ? ` <span style="color:#6b7280;font-weight:500">· ${esc(lead.company)}</span>` : ""}</h1>
    <p style="margin:0 0 16px;${FONT};font-size:14px;color:#4b5563">${[lead.email, lead.phone].filter(Boolean).map(esc).join(" · ")}</p>
    ${knoppen}
  </td></tr>
  <tr><td style="padding:12px 32px 0"><div style="height:1px;background:#eceef5"></div></td></tr>
  <tr><td style="height:20px"></td></tr>
  ${diensten}
  ${antwoorden}
  ${bericht}
  <tr><td style="padding:0 32px 28px">${kop("Context")}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${context}</table></td></tr>
  <tr><td style="background:${NAVY};padding:16px 32px;${FONT};font-size:12px;color:#a9b4d6">
    Beantwoorden gaat rechtstreeks naar de klant. Verstuurd door ${esc(SITE.url.replace(/^https?:\/\//, ""))}.
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

/**
 * Parameters voor het bestaande EmailJS-sjabloon (naam, bedrijf, e-mail,
 * telefoon, onderwerp, bericht), voor als Resend niet is ingesteld.
 */
export function toTemplateParams(lead: NormalizedLead): Record<string, string> {
  return {
    name: lead.name,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    subject: leadSubject(lead),
    message: leadSummary(lead),
    reply_to: lead.email,
  };
}
