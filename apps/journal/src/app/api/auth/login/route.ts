import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { signToken, setAuthCookie } from "@/server/auth";
import { handleRouteError } from "@/shared/utils";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const limited = enforceRateLimit(req, {
      bucket: "auth:login",
      limit: 10,
      windowMs: 10 * 60 * 1000,
    });
    if (limited) return limited;

    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await createAuditLog({
      actorId: user.id,
      actorRole: user.role,
      action: "LOGIN",
      entityType: "USER",
      entityId: user.id,
      summary: "User logged into the journal dashboard.",
      req,
    });

    const token = signToken(user.id, user.email, user.role);

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isReviewer: user.isReviewer,
        },
      },
      { status: 200 },
    );

    setAuthCookie(response, token, req);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return handleRouteError(error);
  }
}
