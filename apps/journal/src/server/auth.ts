import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env, isProduction } from "@/server/env";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

/** Reads and verifies the JWT cookie. Returns the decoded user or null. */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, env.JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Verifies auth and returns the user.
 * If unauthenticated, returns a 401 NextResponse instead.
 * Usage: const result = await requireAuth(req);
 *        if (result instanceof NextResponse) return result;
 */
export async function requireAuth(
  req: NextRequest
): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}

/** Signs a JWT token with standard payload. */
export function signToken(userId: string, email: string, role: string): string {
  return jwt.sign({ userId, email, role }, env.JWT_SECRET, {
    expiresIn: "7d",
    issuer: "etthos-journal",
    audience: "etthos-journal-users",
  });
}

function shouldUseSecureCookie(req?: NextRequest): boolean {
  if (!isProduction()) return false;

  const appUrlProtocol = env.APP_URL.startsWith("https://") ? "https" : "http";
  const forwardedProto = req?.headers.get("x-forwarded-proto")?.split(",")?.[0]?.trim();
  const requestProtocol = req?.nextUrl.protocol.replace(":", "");
  const effectiveProtocol = forwardedProto || requestProtocol || appUrlProtocol;

  return effectiveProtocol === "https";
}

/** Attaches the auth cookie to a NextResponse. */
export function setAuthCookie(response: NextResponse, token: string, req?: NextRequest): void {
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: shouldUseSecureCookie(req),
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

/** Clears the auth cookie using matching cookie attributes. */
export function clearAuthCookie(response: NextResponse, req?: NextRequest): void {
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: shouldUseSecureCookie(req),
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}
