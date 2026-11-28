/**
 * middleware.ts
 *
 * Bewaakt het interne dashboard: /dashboard en /api/dashboard alleen met een
 * geldige sessie (lib/dashboard/auth). Zonder sessie: pagina's naar het
 * inlogscherm, API's een 401. Alles onder /dashboard krijgt bovendien
 * X-Robots-Tag: noindex, zodat zoekmachines het nooit opnemen.
 */

import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, dashboardZonderWachtwoord, verifySession } from "@/lib/dashboard/auth";

export const config = { matcher: ["/dashboard", "/dashboard/:path*", "/api/dashboard/:path*"] };

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const verder = () => {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  };

  if (pathname === "/dashboard/login" || pathname === "/api/dashboard/login") return verder();
  if (dashboardZonderWachtwoord()) return verder();
  if (await verifySession(req.cookies.get(SESSION_COOKIE)?.value)) return verder();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "unauthorized", message: "Log opnieuw in op het dashboard." }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/dashboard/login";
  url.search = pathname === "/dashboard" ? "" : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}
