/**
 * app/api/dashboard/mail/route.ts
 *
 * GET  → segmenten en recente mailings uit Resend
 * POST { mode: "test" | "single" | "broadcast", ... }
 *   test       één voorbeeldmail naar het opgegeven adres (jezelf)
 *   single     losse mail of uitnodiging aan één of enkele adressen (max 50)
 *   broadcast  mailing aan een heel segment, nu of op een tijdstip; Resend
 *              voegt de afmeldlink toe en slaat afgemelde contacten over
 */

import { NextResponse } from "next/server";

import { mailAfzender, mailHtml, mailTekst, type MailInhoud } from "@/lib/dashboard/mail";
import { createBroadcast, listBroadcasts, listSegments, resendConfigured, sendEmail } from "@/lib/resend-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fout = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function GET() {
  if (!resendConfigured()) return NextResponse.json({ connected: false, segments: [], broadcasts: [] });
  try {
    const [segments, broadcasts] = await Promise.all([listSegments(), listBroadcasts()]);
    return NextResponse.json({ connected: true, segments, broadcasts: broadcasts.slice(0, 20) });
  } catch (e) {
    return NextResponse.json({ connected: false, error: e instanceof Error ? e.message : "Resend onbereikbaar", segments: [], broadcasts: [] });
  }
}

export async function POST(request: Request) {
  if (!resendConfigured()) return fout("Koppel eerst Resend (RESEND_API_KEY) in Vercel om te mailen.");
  let b: MailInhoud & { mode?: string; to?: string[] | string; segmentId?: string; scheduledAt?: string; name?: string };
  try {
    b = await request.json();
  } catch {
    return fout("Ongeldige aanvraag.");
  }
  if (!b.subject?.trim() || b.subject.length > 200) return fout("Vul een onderwerp in.");
  if (!b.body?.trim() || b.body.length > 20_000) return fout("Schrijf eerst een bericht.");
  if (b.ctaUrl && !/^https?:\/\/\S+/.test(b.ctaUrl)) return fout("De link van de knop moet met https:// beginnen.");

  const inhoud: MailInhoud = {
    subject: b.subject.trim(),
    preheader: b.preheader?.trim(),
    heading: b.heading?.trim(),
    body: b.body,
    ctaLabel: b.ctaLabel?.trim(),
    ctaUrl: b.ctaUrl?.trim(),
  };
  const van = mailAfzender();
  const replyTo = process.env.LEAD_REPLY_TO || "info@reactly.nl";

  try {
    if (b.mode === "test" || b.mode === "single") {
      const aan = (Array.isArray(b.to) ? b.to : String(b.to ?? "").split(/[,;\s]+/)).map((x) => x.trim()).filter(Boolean);
      if (!aan.length || aan.some((x) => !EMAIL.test(x))) return fout("Controleer de e-mailadressen.");
      if (aan.length > (b.mode === "test" ? 3 : 50)) return fout(b.mode === "test" ? "Een test gaat naar maximaal 3 adressen." : "Mail maximaal 50 adressen tegelijk; gebruik voor meer een mailing aan een segment.");
      const r = await sendEmail({
        from: van,
        to: aan,
        subject: b.mode === "test" ? `[Test] ${inhoud.subject}` : inhoud.subject,
        html: mailHtml(inhoud),
        text: mailTekst(inhoud),
        replyTo,
      });
      return NextResponse.json({ ok: true, id: r.id });
    }
    if (b.mode === "broadcast") {
      if (!b.segmentId) return fout("Kies een segment.");
      let scheduledAt: string | undefined;
      if (b.scheduledAt) {
        const t = new Date(b.scheduledAt);
        if (Number.isNaN(t.getTime()) || t.getTime() < Date.now() + 60_000) return fout("Kies een tijdstip in de toekomst.");
        scheduledAt = t.toISOString();
      }
      const r = await createBroadcast({
        segmentId: b.segmentId,
        from: van,
        subject: inhoud.subject,
        html: mailHtml({ ...inhoud, broadcast: true }),
        text: mailTekst({ ...inhoud, broadcast: true }),
        replyTo,
        name: b.name?.trim() || inhoud.subject,
        send: true,
        scheduledAt,
      });
      return NextResponse.json({ ok: true, id: r.id, scheduled: Boolean(scheduledAt) });
    }
    return fout("Onbekende actie.");
  } catch (e) {
    return fout(e instanceof Error ? e.message : "Versturen mislukt.", 502);
  }
}
