interface RateLimitOptions {
  max: number;
  windowMs: number;
  now?: () => number;
}

/**
 * Fixed-window, in-memory rate limiter. State lives per server instance, so on
 * serverless hosts it is a best-effort guard rather than a global limit.
 * Expired entries are swept on every call so the map cannot grow unbounded.
 */
export function createRateLimiter({ max, windowMs, now = Date.now }: RateLimitOptions) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function isRateLimited(key: string): boolean {
    const time = now();

    for (const [k, entry] of hits) {
      if (time >= entry.resetAt) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry) {
      hits.set(key, { count: 1, resetAt: time + windowMs });
      return false;
    }

    if (entry.count >= max) return true;
    entry.count++;
    return false;
  };
}
