/**
 * app/api/dashboard/leads/route.ts
 *
 * GET   → website-leads (Resend-segment), of voorbeelddata zonder koppeling
 * PATCH { email, status?, value? } → pijplijnstatus en dealwaarde bijwerken
 *       (opgeslagen als contacteigenschappen in Resend)
 */

import { NextResponse } from "next/server";

import { getWebsiteLeads, invalidateOverview } from "@/lib/dashboard/data";
import { LEAD_STATUSES } from "@/lib/dashboard/types";
import { resendConfigured, updateContact } from "@/lib/resend-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWebsiteLeads(), { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!resendConfigured()) return NextResponse.json({ ok: false, message: "Koppel eerst Resend (RESEND_API_KEY) om leads bij te werken." }, { status: 400 });
  let b: { email?: string; status?: string; value?: number };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ongeldige aanvraag." }, { status: 400 });
  }
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email)) return NextResponse.json({ ok: false, message: "E-mailadres ontbreekt." }, { status: 400 });
  const properties: Record<string, string> = {};
  if (b.status !== undefined) {
    if (!LEAD_STATUSES.some((s) => s.id === b.status)) return NextResponse.json({ ok: false, message: "Onbekende status." }, { status: 400 });
    properties.status = b.status;
  }
  if (b.value !== undefined) {
    if (!(b.value >= 0 && b.value < 10_000_000)) return NextResponse.json({ ok: false, message: "Ongeldige waarde." }, { status: 400 });
    properties.waarde = String(Math.round(b.value));
  }
  try {
    await updateContact(b.email, { properties });
    invalidateOverview();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, message: e instanceof Error ? e.message : "Bijwerken mislukt." }, { status: 502 });
  }
}
