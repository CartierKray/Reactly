/**
 * lib/leads/resend.ts  (alleen server)
 *
 * Bezorging van aanvragen via Resend, vanaf de server. Elke aanvraag gaat
 * naar LEAD_TO_EMAIL (standaard cartierkray@gmail.com), verstuurd als
 * LEAD_FROM_EMAIL (standaard "Reactly <info@reactly.nl>"), met het
 * e-mailadres van de klant als antwoordadres: op "beantwoorden" klikken
 * mailt de klant dus direct.
 *
 * Alleen actief als RESEND_API_KEY is gezet; anders neemt de EmailJS-route
 * het over. Lukt het hier niet, dan ook: een lead mag nooit verloren gaan
 * aan één storing.
 */

import { isValidEmail, type NormalizedLead } from "./schema";
import { leadHtml, leadSubject, leadSummary } from "./template";

const ENDPOINT = "https://api.resend.com/emails";

export const resendGeconfigureerd = () => Boolean(process.env.RESEND_API_KEY);

export async function verstuurViaResend(lead: NormalizedLead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const naar = (process.env.LEAD_TO_EMAIL ?? "cartierkray@gmail.com")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const van = process.env.LEAD_FROM_EMAIL ?? "Reactly <info@reactly.nl>";

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: van,
        to: naar,
        ...(isValidEmail(lead.email) ? { reply_to: lead.email } : {}),
        subject: leadSubject(lead),
        text: leadSummary(lead),
        html: leadHtml(lead),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Geen persoonsgegevens loggen: alleen status en de foutmelding van Resend.
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error(`[leads] Resend weigerde (${res.status}): ${detail}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[leads] Resend onbereikbaar:", error instanceof Error ? error.message : "onbekende fout");
    return false;
  }
}
