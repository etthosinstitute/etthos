import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";
import { enforceRateLimit } from "@/server/rate-limit";
import { consumePasswordResetToken } from "@/server/password-reset";
import { createAuditLog } from "@/server/audit";
import { handleRouteError } from "@/shared/utils";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, {
    bucket: "auth:reset-password",
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { token, password } = resetPasswordSchema.parse(body);
    const resetRecord = await consumePasswordResetToken(token);

    if (!resetRecord) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { password: hashedPassword },
    });

    await createAuditLog({
      actorId: resetRecord.user.id,
      actorRole: resetRecord.user.role,
      action: "PASSWORD_RESET_COMPLETED",
      entityType: "USER",
      entityId: resetRecord.user.id,
      summary: "Password reset completed through email reset flow.",
      req,
    });

    return NextResponse.json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return handleRouteError(error);
  }
}
