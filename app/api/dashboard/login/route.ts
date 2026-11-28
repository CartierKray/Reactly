/**
 * app/api/dashboard/login/route.ts
 *
 * POST { password } → zet de sessiecookie (httpOnly, 7 dagen).
 * DELETE → uitloggen.
 * Maximaal 8 pogingen per 15 minuten per IP, tegen raden.
 */

import { NextResponse } from "next/server";

import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSession, dashboardIngesteld } from "@/lib/dashboard/auth";
import { clientIp, rateLimit } from "@/lib/leads/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const poging = rateLimit(`dashboard:login:${ip}`, 8, 15 * 60_000);
  if (!poging.allowed) {
    return NextResponse.json({ ok: false, message: "Te veel pogingen. Probeer het over een kwartier opnieuw." }, { status: 429 });
  }
  if (!dashboardIngesteld()) {
    return NextResponse.json(
      { ok: false, message: "Er is nog geen wachtwoord ingesteld. Zet DASHBOARD_PASSWORD in Vercel (Settings → Environment Variables) en deploy opnieuw." },
      { status: 503 },
    );
  }
  let password = "";
  try {
    password = String(((await request.json()) as { password?: unknown }).password ?? "");
  } catch {
    /* leeg */
  }
  if (!(await checkPassword(password))) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false, message: "Dat wachtwoord klopt niet." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
