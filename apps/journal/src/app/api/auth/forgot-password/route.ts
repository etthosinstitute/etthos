import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";
import { enforceRateLimit } from "@/server/rate-limit";
import { createPasswordResetToken, buildPasswordResetUrl } from "@/server/password-reset";
import { sendPasswordResetEmail } from "@/server/mail";
import { createAuditLog } from "@/server/audit";
import { handleRouteError } from "@/shared/utils";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, {
    bucket: "auth:forgot-password",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });

    if (user?.isActive) {
      const { token } = await createPasswordResetToken(user.id);
      const resetUrl = `${req.nextUrl.origin}${buildPasswordResetUrl(token)}`;

      try {
        await sendPasswordResetEmail({
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" "),
          resetUrl,
        });
      } catch (error) {
        console.error("Password reset email error:", error);
      }

      await createAuditLog({
        actorId: user.id,
        actorRole: user.role,
        action: "PASSWORD_RESET_REQUESTED",
        entityType: "USER",
        entityId: user.id,
        summary: "Password reset requested.",
        metadata: { email: user.email },
        req,
      });
    }

    return NextResponse.json({
      message:
        "If an account exists for that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return handleRouteError(error);
  }
}
