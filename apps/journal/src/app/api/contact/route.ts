import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleRouteError } from "@/lib/utils";
import { enforceRateLimit } from "@/lib/rate-limit";
import { sendContactMessageEmail } from "@/lib/public-mail";

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

type ContactSubmissionDelegate = {
  create: (args: {
    data: {
      firstName: string;
      lastName: string;
      email: string;
      subject: string;
      message: string;
    };
  }) => Promise<unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const limited = enforceRateLimit(req, {
      bucket: "contact:submit",
      limit: 5,
      windowMs: 30 * 60 * 1000,
    });
    if (limited) return limited;

    const body = await req.json();
    const payload = contactSchema.parse(body);

    await (prisma as unknown as { contactSubmission: ContactSubmissionDelegate }).contactSubmission.create({
      data: payload,
    });

    try {
      await sendContactMessageEmail(payload);
    } catch (error) {
      console.error("Contact email error:", error);
    }

    return NextResponse.json({
      message: "Thanks for reaching out. Our editorial team will get back to you shortly.",
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
