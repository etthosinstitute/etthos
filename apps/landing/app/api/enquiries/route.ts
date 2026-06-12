import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendCourseEnquiryEmail } from "@/lib/mail";

const enquirySchema = z.object({
  courseTitle: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  age: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = enquirySchema.parse(await request.json());

    await sendCourseEnquiryEmail(payload);

    return NextResponse.json({
      message:
        "Enquiry submitted successfully. Our admissions team will contact you soon.",
    });
  } catch (error) {
    console.error("SMTP Error (Enquiry):", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit your enquiry right now.";
    const userFriendlyMessage =
      message.includes("535") || message.includes("SMTP")
        ? "The mail server is currently unavailable. Please try again later or contact us directly."
        : message;

    return NextResponse.json({ message: userFriendlyMessage }, { status: 400 });
  }
}
