import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { sendReviewerAccountEmail } from "@/lib/mail";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAuditLog } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { z } from "zod";

const reviewerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

function generatePassword() {
  return `Etthos@${randomBytes(4).toString("hex")}`;
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);

  if (!user || (user.role !== "EDITOR" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const limited = enforceRateLimit(req, {
    bucket: "reviewer:create",
    key: user.userId,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { firstName, lastName, email } = reviewerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true, firstName: true, lastName: true, email: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    const tempPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const [creator, reviewer] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.userId },
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      }),
      prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role: "REVIEWER",
          isActive: true,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      }),
    ]);

    let emailSent = false;
    let emailError: string | null = null;

    try {
      await sendReviewerAccountEmail({
        reviewerEmail: email,
        reviewerName: `${firstName} ${lastName}`,
        tempPassword,
        createdByName:
          [creator?.firstName, creator?.lastName].filter(Boolean).join(" ") || creator?.email,
        dashboardUrl: `${req.nextUrl.origin}/auth/login`,
      });
      emailSent = true;
    } catch (mailError) {
      console.error("Reviewer account email error:", mailError);
      emailError =
        mailError instanceof Error ? mailError.message : "Failed to send reviewer account email";
    }

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role,
      action: "REVIEWER_CREATED",
      entityType: "USER",
      entityId: reviewer.id,
      summary: `Created reviewer account for ${firstName} ${lastName}.`,
      metadata: {
        reviewerEmail: reviewer.email,
      },
      req,
    });

    return NextResponse.json(
      {
        reviewer,
        tempPassword,
        emailSent,
        emailError,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create reviewer error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
