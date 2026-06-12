import { env } from "@/lib/env";
import crypto from "crypto";

export type RazorpayOrderRequest = {
  amountInr: number;
  receipt: string;
  notes?: Record<string, string>;
};

export function isRazorpayEnabled() {
  return (
    env.ENABLE_RAZORPAY_PREVIEW &&
    Boolean(env.RAZORPAY_KEY_ID) &&
    Boolean(env.RAZORPAY_KEY_SECRET) &&
    Boolean(env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
  );
}

export async function createRazorpayOrder(payload: RazorpayOrderRequest) {
  if (!isRazorpayEnabled()) {
    throw new Error("Razorpay preview is not enabled");
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
    },
    body: JSON.stringify({
      amount: Math.round(payload.amountInr * 100),
      currency: "INR",
      receipt: payload.receipt,
      notes: payload.notes,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Razorpay order creation failed: ${message}`);
  }

  return response.json() as Promise<{
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  }>;
}

export function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string,
) {
  const secret = env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("Razorpay secret not configured");

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generated_signature === signature;
}
