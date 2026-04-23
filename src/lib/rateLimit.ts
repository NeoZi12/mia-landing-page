// Simple in-memory sliding-window rate limiter.
// Resets on serverless cold start — acceptable for basic abuse defense.
// Upgrade path: swap the Map for @vercel/kv if abuse surfaces.

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
}

export async function ratelimit(
  key: string,
  { windowMs = 60_000, max = 10 }: { windowMs?: number; max?: number } = {},
): Promise<RateLimitResult> {
  const now = Date.now();
  const prior = hits.get(key) ?? [];
  const recent = prior.filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    return { ok: false, remaining: 0 };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: max - recent.length };
}
