/**
 * lib/resend-api.ts  (alleen server)
 *
 * Dunne laag over de Resend REST-API: contacten, segmenten, eigenschappen,
 * mailings (broadcasts), imports en losse mails. Gedeeld door /api/leads (elke
 * aanvraag wordt ook een contact) en het interne dashboard.
 *
 * Resend staat standaard 2 verzoeken per seconde toe: bij een 429 wachten we
 * kort (Retry-After) en proberen het nog twee keer.
 */

const BASE = "https://api.resend.com";

export const resendConfigured = () => Boolean(process.env.RESEND_API_KEY);

export class ResendError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function resend<T = unknown>(path: string, init: Omit<RequestInit, "body"> & { json?: unknown; body?: BodyInit } = {}): Promise<T> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new ResendError(0, "RESEND_API_KEY ontbreekt");
  const { json, headers, ...rest } = init;
  for (let poging = 0; ; poging++) {
    const res = await fetch(`${BASE}${path}`, {
      ...rest,
      headers: {
        Authorization: `Bearer ${key}`,
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...((headers as Record<string, string>) ?? {}),
      },
      body: json !== undefined ? JSON.stringify(json) : init.body,
      signal: init.signal ?? AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (res.status === 429 && poging < 2) {
      const wacht = Math.min(Number(res.headers.get("retry-after")) || 1, 3);
      await new Promise((r) => setTimeout(r, wacht * 1000));
      continue;
    }
    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { message: text.slice(0, 200) };
    }
    if (!res.ok) {
      const d = data as { message?: string; error?: string } | null;
      throw new ResendError(res.status, d?.message || d?.error || `Resend gaf ${res.status}`);
    }
    return data as T;
  }
}

/* ── Segmenten ──────────────────────────────────────────────────────────── */

export type Segment = { id: string; name: string; created_at?: string; contacts_count?: number; [k: string]: unknown };

let segmentCache: Map<string, string> | null = null;

export async function listSegments(): Promise<Segment[]> {
  const r = await resend<{ data?: Segment[] }>("/segments");
  return r.data ?? [];
}

/** ID van een segment op naam; maakt het aan als het nog niet bestaat. */
export async function ensureSegment(name: string): Promise<string> {
  if (segmentCache?.has(name)) return segmentCache.get(name)!;
  const all = await listSegments();
  segmentCache = new Map(all.map((s) => [s.name, s.id]));
  const bestaand = segmentCache.get(name);
  if (bestaand) return bestaand;
  const nieuw = await resend<{ id: string }>("/segments", { method: "POST", json: { name } });
  segmentCache.set(name, nieuw.id);
  return nieuw.id;
}

/* ── Contacten ──────────────────────────────────────────────────────────── */

export type Contact = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
  unsubscribed?: boolean;
  properties?: Record<string, string | number | boolean | null>;
};

/** Eigen velden die we bij contacten bijhouden (pijplijn van het dashboard). */
export const CONTACT_PROPERTIES = ["bron", "telefoon", "bedrijf", "diensten", "pakket", "website", "status", "waarde", "nieuwsbrief"] as const;

let propertiesKlaar = false;
async function ensureProperties() {
  if (propertiesKlaar) return;
  try {
    const r = await resend<{ data?: { key: string }[] }>("/contact-properties");
    const aanwezig = new Set((r.data ?? []).map((p) => p.key));
    for (const key of CONTACT_PROPERTIES) {
      if (!aanwezig.has(key)) await resend("/contact-properties", { method: "POST", json: { key, type: "string" } }).catch(() => undefined);
    }
    propertiesKlaar = true;
  } catch {
    /* eigenschappen zijn een extraatje; zonder werkt opslaan ook */
  }
}

export type ContactInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Altijd bijwerken. */
  properties?: Record<string, string>;
  /** Alleen bij een nieuw contact (bijv. status "nieuw", afmelding). */
  createOnly?: { properties?: Record<string, string>; unsubscribed?: boolean };
  segmentIds?: string[];
};

/** Contact aanmaken of, als het al bestaat, bijwerken en aan de segmenten toevoegen. */
export async function upsertContact(c: ContactInput): Promise<void> {
  await ensureProperties();
  try {
    await resend("/contacts", {
      method: "POST",
      json: {
        email: c.email,
        first_name: c.firstName,
        last_name: c.lastName,
        unsubscribed: c.createOnly?.unsubscribed,
        properties: { ...(c.createOnly?.properties ?? {}), ...(c.properties ?? {}) },
        segments: c.segmentIds?.map((id) => ({ id })),
      },
    });
  } catch (e) {
    if (!(e instanceof ResendError) || ![400, 409, 422].includes(e.status)) throw e;
    const id = encodeURIComponent(c.email);
    await resend(`/contacts/${id}`, { method: "PATCH", json: { first_name: c.firstName, last_name: c.lastName, properties: c.properties } });
    for (const s of c.segmentIds ?? []) await resend(`/contacts/${id}/segments/${s}`, { method: "POST" }).catch(() => undefined);
  }
}

export async function updateContact(idOrEmail: string, patch: { properties?: Record<string, string>; unsubscribed?: boolean }) {
  return resend(`/contacts/${encodeURIComponent(idOrEmail)}`, { method: "PATCH", json: patch });
}

export async function listContacts(opts: { segmentId?: string; limit?: number; after?: string } = {}) {
  const q = new URLSearchParams();
  if (opts.segmentId) q.set("segment_id", opts.segmentId);
  q.set("limit", String(Math.min(100, opts.limit ?? 100)));
  if (opts.after) q.set("after", opts.after);
  return resend<{ data?: Contact[]; has_more?: boolean }>(`/contacts?${q}`);
}

/* ── Mailings, losse mails en imports ───────────────────────────────────── */

export type Broadcast = {
  id: string;
  name?: string | null;
  subject?: string | null;
  status?: string;
  segment_id?: string | null;
  created_at?: string;
  scheduled_at?: string | null;
  sent_at?: string | null;
  [k: string]: unknown;
};

export async function listBroadcasts(): Promise<Broadcast[]> {
  const r = await resend<{ data?: Broadcast[] }>("/broadcasts");
  return r.data ?? [];
}

export async function createBroadcast(b: {
  segmentId: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  name?: string;
  send?: boolean;
  scheduledAt?: string;
}) {
  return resend<{ id: string }>("/broadcasts", {
    method: "POST",
    json: {
      segment_id: b.segmentId,
      from: b.from,
      subject: b.subject,
      html: b.html,
      text: b.text,
      reply_to: b.replyTo,
      name: b.name,
      send: b.send,
      scheduled_at: b.scheduledAt,
    },
  });
}

export async function sendEmail(e: { from: string; to: string[]; subject: string; html: string; text?: string; replyTo?: string }) {
  return resend<{ id: string }>("/emails", {
    method: "POST",
    json: { from: e.from, to: e.to, subject: e.subject, html: e.html, text: e.text, reply_to: e.replyTo },
  });
}

/** CSV met contacten importeren (tot 200 MB) in één of meer segmenten. */
export async function importContacts(csv: Blob, opts: { columnMap: Record<string, unknown>; segmentIds: string[]; onConflict?: "upsert" | "skip" }) {
  const fd = new FormData();
  fd.append("file", csv, "leads.csv");
  fd.append("column_map", JSON.stringify(opts.columnMap));
  fd.append("on_conflict", opts.onConflict ?? "upsert");
  fd.append("segments", JSON.stringify(opts.segmentIds.map((id) => ({ id }))));
  return resend<{ id: string }>("/contacts/imports", { method: "POST", body: fd });
}

export async function getImport(id: string) {
  return resend<Record<string, unknown>>(`/contacts/imports/${encodeURIComponent(id)}`);
}
