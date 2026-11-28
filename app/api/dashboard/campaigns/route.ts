/**
 * app/api/dashboard/campaigns/route.ts
 *
 * PATCH { channel, id, active }              → campagne aan/uit
 * PATCH { channel, id, budget, budgetRef? }  → dagbudget in euro
 * POST  { ...NieuweMetaCampagne }            → nieuwe Meta-campagne (gepauzeerd)
 */

import { NextResponse } from "next/server";

import { invalidateOverview } from "@/lib/dashboard/data";
import { googleAdsConfigured, googleSetBudget, googleSetStatus } from "@/lib/dashboard/google-ads";
import { metaConfigured, metaCreateCampaign, metaSetBudget, metaSetStatus, type NieuweMetaCampagne } from "@/lib/dashboard/meta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fout = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function PATCH(request: Request) {
  let b: { channel?: string; id?: string; active?: boolean; budget?: number; budgetRef?: string };
  try {
    b = await request.json();
  } catch {
    return fout("Ongeldige aanvraag.");
  }
  if (!b.id || (b.channel !== "meta" && b.channel !== "google")) return fout("Campagne of kanaal ontbreekt.");
  if (b.id.startsWith("demo-")) return fout("Dit is voorbeelddata. Koppel eerst het advertentieaccount in Instellingen.");
  try {
    if (b.channel === "meta") {
      if (!metaConfigured()) return fout("Meta Ads is nog niet gekoppeld.");
      if (typeof b.active === "boolean") await metaSetStatus(b.id, b.active);
      if (typeof b.budget === "number") {
        if (!(b.budget >= 1 && b.budget <= 10_000)) return fout("Kies een dagbudget tussen € 1 en € 10.000.");
        await metaSetBudget(b.id, b.budget);
      }
    } else {
      if (!googleAdsConfigured()) return fout("Google Ads is nog niet gekoppeld.");
      if (typeof b.active === "boolean") await googleSetStatus(b.id, b.active);
      if (typeof b.budget === "number") {
        if (!b.budgetRef) return fout("Deze campagne heeft geen eigen budget om te wijzigen.");
        if (!(b.budget >= 1 && b.budget <= 10_000)) return fout("Kies een dagbudget tussen € 1 en € 10.000.");
        await googleSetBudget(b.budgetRef, b.budget);
      }
    }
    invalidateOverview();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fout(e instanceof Error ? e.message : "Wijzigen mislukt.", 502);
  }
}

export async function POST(request: Request) {
  if (!metaConfigured()) return fout("Meta Ads is nog niet gekoppeld. Vul de gegevens in bij Instellingen.");
  let c: NieuweMetaCampagne;
  try {
    c = await request.json();
  } catch {
    return fout("Ongeldige aanvraag.");
  }
  const url = (v: string) => /^https:\/\/\S+\.\S+/.test(v ?? "");
  if (!c.name?.trim() || c.name.length > 120) return fout("Geef de campagne een naam.");
  if (!url(c.link)) return fout("Vul een geldige https-link in naar de landingspagina.");
  if (!url(c.imageUrl)) return fout("Vul een geldige https-link in naar de afbeelding.");
  if (!c.headline?.trim() || !c.primaryText?.trim()) return fout("Kop en advertentietekst zijn verplicht.");
  if (!(c.dailyBudget >= 1 && c.dailyBudget <= 10_000)) return fout("Kies een dagbudget tussen € 1 en € 10.000.");
  if (!(c.ageMin >= 18 && c.ageMax <= 65 && c.ageMin < c.ageMax)) return fout("Kies een leeftijd tussen 18 en 65.");
  try {
    const r = await metaCreateCampaign({
      ...c,
      name: c.name.trim(),
      headline: c.headline.trim().slice(0, 255),
      primaryText: c.primaryText.trim().slice(0, 2000),
      description: c.description?.trim().slice(0, 255),
      countries: (c.countries ?? ["NL"]).slice(0, 25),
    });
    invalidateOverview();
    return NextResponse.json({ ok: true, ...r });
  } catch (e) {
    return fout(e instanceof Error ? e.message : "Aanmaken mislukt.", 502);
  }
}
