import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendReviewerApplicationEmail } from "@/server/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  affiliation: z.string().min(2),
  expertise: z.string().min(10),
  orcid: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = schema.parse(body);

    await sendReviewerApplicationEmail(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reviewer application failed:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to send application" },
      { status: 500 },
    );
  }
}
