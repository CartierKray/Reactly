/**
 * app/api/dashboard/import/route.ts
 *
 * POST multipart: file (CSV), segment (naam), email, firstName?, lastName?
 * (kolomnamen), consent ("ja"). Importeert de leads in één keer in een Resend-
 * segment (tot 200 MB; 6.000 regels is geen probleem). Bestaande contacten
 * worden bijgewerkt, niet dubbel aangemaakt.
 *
 * GET ?id=… → status van de import.
 */

import { NextResponse } from "next/server";

import { ensureSegment, getImport, importContacts, resendConfigured } from "@/lib/resend-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fout = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  if (!resendConfigured()) return fout("Koppel eerst Resend (RESEND_API_KEY) om leads te importeren.");
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fout("Upload een CSV-bestand.");
  }
  const file = form.get("file");
  const segment = String(form.get("segment") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const firstName = String(form.get("firstName") ?? "").trim();
  const lastName = String(form.get("lastName") ?? "").trim();
  if (!(file instanceof Blob) || file.size === 0) return fout("Upload een CSV-bestand.");
  if (file.size > 50 * 1024 * 1024) return fout("Het bestand is groter dan 50 MB. Splits het op.");
  if (!segment || segment.length > 80) return fout("Geef het segment een naam.");
  if (!email) return fout("Kies de kolom met e-mailadressen.");
  if (form.get("consent") !== "ja") return fout("Bevestig dat je deze contacten mag mailen.");
  try {
    const segmentId = await ensureSegment(segment);
    const columnMap: Record<string, string> = { email };
    if (firstName) columnMap.first_name = firstName;
    if (lastName) columnMap.last_name = lastName;
    const r = await importContacts(file, { columnMap, segmentIds: [segmentId], onConflict: "upsert" });
    return NextResponse.json({ ok: true, id: r.id, segmentId });
  } catch (e) {
    return fout(e instanceof Error ? e.message : "Importeren mislukt.", 502);
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !resendConfigured()) return fout("Onbekende import.");
  try {
    return NextResponse.json({ ok: true, import: await getImport(id) });
  } catch (e) {
    return fout(e instanceof Error ? e.message : "Status ophalen mislukt.", 502);
  }
}
