/**
 * lib/dashboard/auth.ts
 *
 * Toegang tot het interne dashboard: één wachtwoord (DASHBOARD_PASSWORD) en
 * een ondertekende sessiecookie van 7 dagen (HMAC-SHA256 met DASHBOARD_SECRET,
 * of anders het wachtwoord zelf). Wijzig je het wachtwoord, dan zijn alle
 * sessies direct ongeldig.
 *
 * Werkt met Web Crypto, dus zowel in de middleware (edge) als in API-routes.
 * Zonder DASHBOARD_PASSWORD is het dashboard in productie dicht; alleen lokaal
 * (npm run dev) is het dan zonder wachtwoord te bekijken.
 */

export const SESSION_COOKIE = "rd_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const enc = new TextEncoder();

function geheim(): string | null {
  return process.env.DASHBOARD_SECRET || process.env.DASHBOARD_PASSWORD || null;
}

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string, key: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(data))));
}

function gelijk(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let verschil = 0;
  for (let i = 0; i < a.length; i++) verschil |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return verschil === 0;
}

/** Lokaal zonder wachtwoord: open, met een duidelijke melding in het dashboard. */
export function dashboardZonderWachtwoord(): boolean {
  return !process.env.DASHBOARD_PASSWORD && process.env.NODE_ENV === "development";
}

export function dashboardIngesteld(): boolean {
  return Boolean(process.env.DASHBOARD_PASSWORD);
}

export async function createSession(): Promise<string> {
  const key = geheim();
  if (!key) throw new Error("DASHBOARD_PASSWORD ontbreekt");
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `v1.${exp}`;
  return `${payload}.${await hmac(payload, key)}`;
}

export async function verifySession(token?: string | null): Promise<boolean> {
  const key = geheim();
  if (!token || !key) return false;
  const [v, exp, sig] = token.split(".");
  if (v !== "v1" || !exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return gelijk(sig, await hmac(`${v}.${exp}`, key));
}

/** Wachtwoord controleren in constante tijd. */
export async function checkPassword(invoer: string): Promise<boolean> {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw || typeof invoer !== "string" || !invoer) return false;
  const [a, b] = await Promise.all([hmac(invoer, "reactly-dashboard"), hmac(pw, "reactly-dashboard")]);
  return gelijk(a, b);
}
