/**
 * lib/leads/bevestiging.ts  (alleen server)
 *
 * Bevestigingsmail aan de klant na elk formulier, zoals bij BeterLease:
 * per soort aanvraag een eigen kop en uitleg, een overzicht van wat er is
 * ingevuld, "Wat gebeurt er nu?" en alle manieren om ons te bereiken.
 * Verstuurd via Resend vanaf LEAD_FROM_EMAIL (standaard Reactly
 * <info@reactly.nl>), met info@reactly.nl als antwoordadres. Mislukt het,
 * dan merkt de klant daar niets van: de aanvraag zelf is dan al binnen.
 */

import { OPENING_HOURS, SITE, formatHours } from "@/lib/site";
import { isValidEmail, type NormalizedLead } from "./schema";
import { BLUE, FONT, NAVY, esc } from "./template";

type Tekst = { onderwerp: string; kop: string; intro: string; volgende: string[] };

function teksten(lead: NormalizedLead): Tekst {
  switch (lead.type) {
    case "offerte":
      return {
        onderwerp: "We hebben je aanvraag ontvangen | Reactly",
        kop: "Bedankt voor je aanvraag",
        intro: `Leuk dat je met Reactly verder wilt${lead.services.length ? ` met ${lead.services.slice(0, 3).join(", ").toLowerCase()}` : ""}. We gaan direct voor je aan de slag.`,
        volgende: [
          "We bekijken je aanvraag persoonlijk en zoeken uit wat het meeste oplevert.",
          "Binnen 24 uur ontvang je een voorstel op maat, met planning en investering.",
          "Daarna plannen we een vrijblijvende kennismaking, online of bij ons op kantoor.",
        ],
      };
    case "medewerker":
      return {
        onderwerp: "Een collega neemt contact met je op | Reactly",
        kop: "Een collega helpt je verder",
        intro: "Je vroeg in de chat om een medewerker. We hebben je gegevens en het gesprek ontvangen.",
        volgende: [
          "Een collega leest het gesprek terug, zodat je niets opnieuw hoeft uit te leggen.",
          "Tijdens openingstijden hoor je meestal binnen enkele minuten van ons, anders op de eerstvolgende werkdag.",
        ],
      };
    case "terugbellen":
      return {
        onderwerp: "We bellen je terug | Reactly",
        kop: "Bedankt, we bellen je terug",
        intro: "We hebben je terugbelverzoek ontvangen.",
        volgende: [
          "Een strateeg belt je op het nummer dat je hebt doorgegeven.",
          "Tijdens openingstijden meestal dezelfde dag, anders op de eerstvolgende werkdag.",
        ],
      };
    case "scan":
      return {
        onderwerp: "Je gratis website-scan is aangevraagd | Reactly",
        kop: "Je website-scan staat klaar om te starten",
        intro: `We bekijken ${lead.siteUrl ? lead.siteUrl.replace(/^https?:\/\//, "") : "je website"} op snelheid, vindbaarheid, conversie en uitstraling.`,
        volgende: [
          "Een specialist loopt je website persoonlijk na, op telefoon en desktop.",
          "Binnen één werkdag ontvang je de belangrijkste verbeterpunten, zonder verplichtingen.",
          "Wil je het daarna samen oppakken? Dan maken we een voorstel op maat.",
        ],
      };
    default:
      return {
        onderwerp: "We hebben je bericht ontvangen | Reactly",
        kop: "Bedankt voor je bericht",
        intro: "We hebben je bericht goed ontvangen en nemen snel contact met je op.",
        volgende: [
          "We lezen je bericht en zoeken de juiste specialist erbij.",
          "Je hoort binnen één werkdag van ons, per mail of telefonisch.",
        ],
      };
  }
}

function overzicht(lead: NormalizedLead): [string, string][] {
  const rijen: [string, string][] = [];
  if (lead.services.length) rijen.push(["Diensten", lead.services.join(", ")]);
  if (lead.packageName) rijen.push(["Pakket", lead.packageName]);
  if (lead.siteUrl) rijen.push(["Website", lead.siteUrl]);
  for (const a of lead.answers) rijen.push([a.label, a.value]);
  if (lead.subject && lead.type === "contact") rijen.push(["Onderwerp", lead.subject]);
  return rijen.slice(0, 12);
}

export function bevestigingHtml(lead: NormalizedLead): { onderwerp: string; html: string; text: string } {
  const tk = teksten(lead);
  const voornaam = lead.name.split(/\s+/)[0] ?? "";
  const rijen = overzicht(lead);
  const domein = SITE.url.replace(/^https?:\/\//, "");

  const tijden = OPENING_HOURS.map(
    (d) =>
      `<tr><td style="padding:2px 0;color:#6b7280;${FONT};font-size:13px">${esc(d.day)}</td><td align="right" style="padding:2px 0;color:#0b1020;${FONT};font-size:13px">${esc(formatHours(d))}</td></tr>`,
  ).join("");

  const tabel = rijen.length
    ? `<tr><td style="padding:8px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e9f2;border-radius:14px;background:#f7f8fc">
          <tr><td colspan="2" style="padding:14px 18px 6px;${FONT};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${BLUE}">Jouw aanvraag</td></tr>
          ${rijen
            .map(
              ([k, v]) =>
                `<tr><td valign="top" style="padding:6px 18px;${FONT};font-size:14px;color:#6b7280">${esc(k)}</td><td valign="top" align="right" style="padding:6px 18px;${FONT};font-size:14px;font-weight:600;color:#0b1020">${esc(v)}</td></tr>`,
            )
            .join("")}
          <tr><td colspan="2" style="height:10px"></td></tr>
        </table>
      </td></tr>`
    : "";

  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(tk.onderwerp)}</title></head>
<body style="margin:0;padding:0;background:#eef0f6">
<div style="display:none;max-height:0;overflow:hidden">${esc(tk.intro)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f6;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
  <tr><td style="background:${NAVY};background-image:radial-gradient(60% 120% at 100% 0%,rgba(84,46,214,.55),transparent),radial-gradient(50% 120% at 0% 100%,rgba(0,87,255,.35),transparent);padding:30px 32px">
    <span style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:26px;font-weight:700;font-style:italic;color:#ffffff;letter-spacing:-.3px">Reactly</span>
    <div style="${FONT};font-size:12px;color:#a9b4d6;margin-top:4px">${esc(SITE.tagline)}</div>
  </td></tr>
  <tr><td style="padding:36px 32px 8px">
    <div style="width:46px;height:46px;border-radius:23px;background:${BLUE};color:#fff;text-align:center;line-height:46px;font-size:22px;font-weight:700">&#10003;</div>
    <h1 style="margin:18px 0 8px;${FONT};font-size:24px;line-height:1.25;color:#0b1020">${esc(tk.kop)}${voornaam ? `, ${esc(voornaam)}` : ""}</h1>
    <p style="margin:0;${FONT};font-size:15px;line-height:1.6;color:#4b5563">${esc(tk.intro)}</p>
  </td></tr>
  ${tabel}
  <tr><td style="padding:28px 32px 8px">
    <div style="${FONT};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${BLUE};margin-bottom:12px">Wat gebeurt er nu?</div>
    ${tk.volgende
      .map(
        (s, i) =>
          `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:10px"><tr><td valign="top" style="width:30px"><div style="width:22px;height:22px;border-radius:11px;background:${NAVY};color:#fff;text-align:center;line-height:22px;${FONT};font-size:12px;font-weight:600">${i + 1}</div></td><td style="${FONT};font-size:14px;line-height:1.55;color:#374151">${esc(s)}</td></tr></table>`,
      )
      .join("")}
  </td></tr>
  <tr><td style="padding:16px 32px 8px">
    <a href="${esc(SITE.phone.href)}" style="display:inline-block;background:${BLUE};color:#ffffff;text-decoration:none;${FONT};font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;margin:0 8px 8px 0">Bel ${esc(SITE.phone.display)}</a>
    <a href="${esc(SITE.whatsapp.href)}" style="display:inline-block;background:#0b1020;color:#ffffff;text-decoration:none;${FONT};font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;margin:0 0 8px">WhatsApp ons</a>
  </td></tr>
  <tr><td style="padding:20px 32px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eceef5">
      <tr>
        <td valign="top" style="padding-top:20px;width:52%">
          <div style="${FONT};font-size:13px;font-weight:600;color:#0b1020;margin-bottom:6px">Contact</div>
          <div style="${FONT};font-size:13px;line-height:1.7;color:#4b5563">
            ${esc(SITE.phone.display)}<br>
            <a href="mailto:${esc(SITE.email)}" style="color:${BLUE};text-decoration:none">${esc(SITE.email)}</a><br>
            ${esc(SITE.address.street)}<br>${esc(SITE.address.postalCode)} ${esc(SITE.address.city)}
          </div>
        </td>
        <td valign="top" style="padding-top:20px">
          <div style="${FONT};font-size:13px;font-weight:600;color:#0b1020;margin-bottom:6px">Openingstijden</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tijden}</table>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="background:${NAVY};padding:20px 32px;${FONT};font-size:12px;line-height:1.6;color:#a9b4d6">
    Je ontvangt deze e-mail omdat je een formulier invulde op <a href="${esc(SITE.url)}" style="color:#ffffff">${esc(domein)}</a>.
    Klopt er iets niet? Beantwoord deze e-mail gerust, dan komt hij bij ons team terecht.
  </td></tr>
</table>
</td></tr></table></body></html>`;

  const text = [
    `${tk.kop}${voornaam ? `, ${voornaam}` : ""}`,
    "",
    tk.intro,
    ...(rijen.length ? ["", "Jouw aanvraag:", ...rijen.map(([k, v]) => `- ${k}: ${v}`)] : []),
    "",
    "Wat gebeurt er nu?",
    ...tk.volgende.map((s, i) => `${i + 1}. ${s}`),
    "",
    `Bel ${SITE.phone.display} · WhatsApp ${SITE.whatsapp.href} · ${SITE.email}`,
    `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`,
    "",
    "Met vriendelijke groet,",
    "Team Reactly",
  ].join("\n");

  return { onderwerp: tk.onderwerp, html, text };
}

/** Stuurt de bevestiging; gooit nooit, de aanvraag zelf is al afgeleverd. */
export async function verstuurBevestiging(lead: NormalizedLead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !isValidEmail(lead.email)) return false;
  const { onderwerp, html, text } = bevestigingHtml(lead);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "Reactly <info@reactly.nl>",
        to: [lead.email],
        reply_to: process.env.LEAD_REPLY_TO ?? SITE.email,
        subject: onderwerp,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error(`[leads] bevestiging geweigerd (${res.status})`);
    return res.ok;
  } catch {
    console.error("[leads] bevestiging niet verstuurd");
    return false;
  }
}
