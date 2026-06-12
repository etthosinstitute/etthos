import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  bucket: string;
  limit: number;
  windowMs: number;
  key?: string;
};

const globalStore = globalThis as typeof globalThis & {
  __journalRateLimitStore?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalStore.__journalRateLimitStore ?? new Map<string, RateLimitEntry>();
globalStore.__journalRateLimitStore = rateLimitStore;

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "unknown";
}

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function enforceRateLimit(
  req: NextRequest,
  { bucket, limit, windowMs, key }: RateLimitOptions,
) {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const identifier = key || getClientIp(req);
  const storeKey = `${bucket}:${identifier}`;
  const existing = rateLimitStore.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return null;
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.resetAt - now) / 1000),
    );
    return NextResponse.json(
      {
        error: `Too many requests. Please try again in about ${retryAfterSeconds} seconds.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  existing.count += 1;
  rateLimitStore.set(storeKey, existing);
  return null;
}
