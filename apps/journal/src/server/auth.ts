import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env, isProduction } from "@/server/env";
import { prisma } from "@/server/db/prisma";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
  isReviewer: boolean;
}

/** Reads and verifies the JWT cookie. Returns the decoded user or null. */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isReviewer: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      isReviewer: user.isReviewer,
    };
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
  void req;
  return Boolean(env.AUTH_COOKIE_SECURE);
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
