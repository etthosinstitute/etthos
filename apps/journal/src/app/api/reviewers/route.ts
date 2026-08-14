import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getAuthUser } from "@/server/auth";
import { getAppBaseUrl } from "@/server/env";
import { sendReviewerAccountEmail } from "@/server/mail";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import { trySendEmail } from "@/server/mailer";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { z } from "zod";
import { handleRouteError } from "@/shared/utils";

const reviewerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
});

function generatePassword() {
  return `Etthos@${randomBytes(4).toString("hex")}`;
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);

  if (
    !user ||
    (user.role !== "EDITOR" &&
      user.role !== "ADMIN" &&
      user.role !== "SUPER_ADMIN")
  ) {
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
      select: {
        id: true,
        role: true,
        isReviewer: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const creator = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (existingUser && existingUser.role !== "AUTHOR") {
      return NextResponse.json(
        {
          error: `This email already belongs to a ${existingUser.role.toLowerCase()} account.`,
        },
        { status: 409 },
      );
    }

    const creatorName = "Editor, Etthos Journal";

    if (existingUser?.role === "AUTHOR") {
      const reviewer = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          firstName,
          lastName,
          isReviewer: true,
          isActive: true,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isReviewer: true,
        },
      });

      const { emailSent, emailError } = await trySendEmail(
        async () =>
          sendReviewerAccountEmail({
            reviewerEmail: reviewer.email,
            reviewerName: `${firstName} ${lastName}`,
            createdByName: creatorName,
            dashboardUrl: `${getAppBaseUrl(req)}/auth/login`,
          }),
        "Failed to send reviewer account email",
        "Reviewer account email error",
      );

      await createAuditLog({
        actorId: user.userId,
        actorRole: user.role,
        action: "REVIEWER_CREATED",
        entityType: "USER",
        entityId: reviewer.id,
        summary: `Enabled reviewer access for author account ${firstName} ${lastName}.`,
        metadata: {
          reviewerEmail: reviewer.email,
          previousRole: "AUTHOR",
          reviewerAccessEnabled: true,
        },
        req,
      });

      return NextResponse.json(
        {
          reviewer,
          emailSent,
          emailError,
          action: "promoted",
        },
        { status: 200 },
      );
    }

    const tempPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const reviewer = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "REVIEWER",
        isReviewer: true,
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isReviewer: true,
      },
    });

    const { emailSent, emailError } = await trySendEmail(
      async () =>
        sendReviewerAccountEmail({
          reviewerEmail: email,
          reviewerName: `${firstName} ${lastName}`,
          tempPassword,
          createdByName: creatorName,
          dashboardUrl: `${getAppBaseUrl(req)}/auth/login`,
        }),
      "Failed to send reviewer account email",
      "Reviewer account email error",
    );

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
        action: "created",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create reviewer error:", error);
    return handleRouteError(error);
  }
}
