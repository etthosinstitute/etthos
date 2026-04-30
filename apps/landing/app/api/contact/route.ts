import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendLandingContactEmail } from "@/lib/mail";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  comment: z.string().min(10),
  agreedToTerms: z.boolean().refine((value) => value, "Consent is required"),
});

export async function POST(request: NextRequest) {
  try {
    const payload = contactSchema.parse(await request.json());

    await sendLandingContactEmail(payload);

    return NextResponse.json({
      message: "Thanks for reaching out. We have received your message and will get back to you shortly.",
    });
  } catch (error) {
    console.error("SMTP Error (Contact):", error);
    const message = error instanceof Error ? error.message : "Unable to send your message right now.";
    const userFriendlyMessage = message.includes("535") || message.includes("SMTP") 
      ? "The mail server is currently unavailable. Please try again later or contact us directly."
      : message;

    return NextResponse.json({ message: userFriendlyMessage }, { status: 400 });
  }
}

