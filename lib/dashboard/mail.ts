/**
 * lib/dashboard/mail.ts
 *
 * De opmaak van mailings en losse mails vanuit het dashboard, in de huisstijl:
 * donkere kop met het woordmerk, rustige tekst, één knop en een nette voet
 * met afmeldlink. Tabellen en inline stijlen, zodat Outlook, Gmail en Apple
 * Mail hem gelijk tonen. Ook in de browser te gebruiken (voorbeeldweergave).
 *
 * In de tekst: een lege regel = nieuwe alinea, **vet** wordt vet, en
 * {{voornaam}} wordt de voornaam van de ontvanger (bij mailings via Resend).
 */

export type MailInhoud = {
  subject: string;
  preheader?: string;
  heading?: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  /** Mailing aan een segment: afmeldlink en persoonlijke aanhef via Resend. */
  broadcast?: boolean;
};

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FONT = "font-family:Poppins,'Segoe UI',Helvetica,Arial,sans-serif";

function alineas(tekst: string, broadcast: boolean): string {
  return tekst
    .trim()
    .split(/\n{2,}/)
    .map((p) => {
      let h = esc(p).replace(/\n/g, "<br>");
      h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      h = h.replace(/\{\{\s*voornaam\s*\}\}/gi, broadcast ? "{{{contact.first_name|daar}}}" : "daar");
      return `<p style="margin:0 0 16px;${FONT};font-size:15px;line-height:1.7;color:#2b2f3a">${h}</p>`;
    })
    .join("");
}

export function mailHtml(m: MailInhoud): string {
  const broadcast = Boolean(m.broadcast);
  const knop =
    m.ctaLabel && m.ctaUrl
      ? `<tr><td style="padding:8px 40px 8px"><a href="${esc(m.ctaUrl)}" style="display:inline-block;background:#0050f0;color:#ffffff;text-decoration:none;${FONT};font-size:14px;font-weight:600;padding:13px 24px;border-radius:12px">${esc(m.ctaLabel)}</a></td></tr>`
      : "";
  const afmelden = broadcast
    ? `<a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8a90a0;text-decoration:underline">Afmelden</a> · `
    : "";
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.subject)}</title></head>
<body style="margin:0;padding:0;background:#eef0f4">
${m.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(m.preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f4;padding:28px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden">
<tr><td style="background:#0a0b10;padding:26px 40px">
<span style="font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;font-style:italic;color:#ffffff;letter-spacing:-0.01em">Reactly</span>
</td></tr>
${m.heading ? `<tr><td style="padding:34px 40px 6px"><h1 style="margin:0;${FONT};font-size:24px;line-height:1.3;font-weight:600;color:#0a0b10">${esc(m.heading)}</h1></td></tr>` : ""}
<tr><td style="padding:${m.heading ? "16px" : "34px"} 40px 8px">${alineas(m.body, broadcast)}</td></tr>
${knop}
<tr><td style="padding:28px 40px 34px"><p style="margin:0;${FONT};font-size:14px;line-height:1.6;color:#2b2f3a">Met vriendelijke groet,<br><strong>Team Reactly</strong></p></td></tr>
<tr><td style="background:#f6f7f9;padding:20px 40px;border-top:1px solid #eceef2">
<p style="margin:0;${FONT};font-size:12px;line-height:1.6;color:#8a90a0">${afmelden}Reactly · Webdesign &amp; online marketing · Staalstraat 103, Velsen-Noord</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/** Platte tekstversie (voor mailprogramma's zonder HTML). */
export function mailTekst(m: MailInhoud): string {
  const t = m.body.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\{\{\s*voornaam\s*\}\}/gi, m.broadcast ? "{{{contact.first_name|daar}}}" : "daar");
  return [m.heading, t, m.ctaLabel && m.ctaUrl ? `${m.ctaLabel}: ${m.ctaUrl}` : "", "Met vriendelijke groet,\nTeam Reactly", m.broadcast ? "Afmelden: {{{RESEND_UNSUBSCRIBE_URL}}}" : ""]
    .filter(Boolean)
    .join("\n\n");
}

export const mailAfzender = () => process.env.DASHBOARD_MAIL_FROM || process.env.LEAD_FROM_EMAIL || "Reactly <info@reactly.nl>";
