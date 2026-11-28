/**
 * lib/leads/rateLimit.ts
 *
 * Eenvoudige in-memory rate limiting per IP. Bewust zonder externe
 * dependency: het doel is scriptkiddies en kapotte retry-loops afremmen,
 * niet een gedistribueerde DDoS stoppen. Op een serverless platform geldt
 * de limiet per instantie; dat is voor dit doel voldoende en heeft geen
 * infrastructuur nodig. Voor hardere garanties hoort hier een gedeelde
 * store (Upstash/Redis) achter.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Simpele opruiming zodat het geheugen niet onbeperkt groeit.
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    if (buckets.size > MAX_KEYS) buckets.clear();
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Beste beschikbare client-IP achter een proxy/CDN. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? "unknown";
}

/** Alleen voor tests. */
export function __resetRateLimit() {
  buckets.clear();
}
