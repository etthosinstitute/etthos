import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { signToken, setAuthCookie } from "@/server/auth";
import { handleRouteError } from "@/shared/utils";
import { enforceRateLimit } from "@/server/rate-limit";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const limited = enforceRateLimit(req, {
      bucket: "auth:signup",
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (limited) return limited;

    const body = await req.json();
    const { email, password, firstName, lastName } = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "AUTHOR",
        isActive: true,
      },
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
        },
      },
      { status: 201 }
    );

    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return handleRouteError(error);
  }
}
