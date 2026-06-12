import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpayPayment } from "@/lib/razorpay";

const verifySchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const payload = verifySchema.parse(await request.json());

    const isValid = verifyRazorpayPayment(
      payload.orderId,
      payload.paymentId,
      payload.signature,
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 },
      );
    }

    // Here you could save the payment to a database or trigger other actions
    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ message }, { status: 400 });
  }
}
