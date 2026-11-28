/**
 * app/api/dashboard/overview/route.ts
 *
 * GET ?days=7|14|30&fresh=1 → alle cijfers voor het overzicht (Meta, Google
 * Ads, leads). Het dashboard ververst hiermee elke minuut.
 */

import { NextResponse } from "next/server";

import { getOverview } from "@/lib/dashboard/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const days = [7, 14, 30].includes(Number(url.searchParams.get("days"))) ? Number(url.searchParams.get("days")) : 30;
  const data = await getOverview(days, { fresh: url.searchParams.get("fresh") === "1" });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
