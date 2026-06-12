import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { createRazorpayOrder, isRazorpayEnabled } from "@/lib/razorpay";

const orderSchema = z.object({
  courseSlug: z.string().min(1),
  courseTitle: z.string().min(1),
  amountInr: z.number().positive().default(500),
});

export async function POST(request: NextRequest) {
  try {
    const payload = orderSchema.parse(await request.json());

    if (!isRazorpayEnabled()) {
      return NextResponse.json(
        {
          message:
            "Razorpay preview is configured in code but not enabled yet.",
        },
        { status: 503 },
      );
    }

    const order = await createRazorpayOrder({
      amountInr: payload.amountInr,
      receipt: `eth_${payload.courseSlug.slice(0, 15)}_${Date.now().toString().slice(-8)}`,
      notes: {
        courseSlug: payload.courseSlug,
        courseTitle: payload.courseTitle,
        mode: "preview",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      courseTitle: payload.courseTitle,
      isPreview: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to initialise Razorpay preview.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
