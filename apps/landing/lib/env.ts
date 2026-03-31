import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url().optional(),
  EMAIL_HOST: z.string().default("smtp.gmail.com"),
  EMAIL_PORT: z.coerce.number().int().positive().default(465),
  EMAIL_SECURE: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return value === "true";
    }),
  EMAIL_USER: z.string().min(1, "EMAIL_USER is required"),
  EMAIL_PASS: z.string().min(1, "EMAIL_PASS is required"),
  CONTACT_INBOX_EMAIL: z.string().email().optional(),
  ENABLE_RAZORPAY_PREVIEW: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid landing environment configuration: ${issues}`);
}

export const env = {
  ...parsed.data,
  APP_URL: parsed.data.APP_URL || "http://localhost:3001",
  EMAIL_SECURE:
    parsed.data.EMAIL_SECURE !== undefined
      ? parsed.data.EMAIL_SECURE
      : parsed.data.EMAIL_PORT === 465,
  CONTACT_INBOX_EMAIL: parsed.data.CONTACT_INBOX_EMAIL || "spider20251@gmail.com",
  ENABLE_RAZORPAY_PREVIEW:
    parsed.data.ENABLE_RAZORPAY_PREVIEW || parsed.data.NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW || false,
  NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW:
    parsed.data.NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW || parsed.data.ENABLE_RAZORPAY_PREVIEW || false,
};

