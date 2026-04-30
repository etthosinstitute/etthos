import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().optional(),
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
  CONTACT_INBOX_EMAIL: z.string().optional(),
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

  // Only throw error if we are NOT in a build/CI environment
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
    throw new Error(`Invalid landing environment configuration: ${issues}`);
  } else {
    console.warn(`⚠️ Warning: Invalid environment configuration (ignored during build): ${issues}`);
  }
}

const data = parsed.success ? parsed.data : ({} as Partial<z.infer<typeof schema>>);

export const env = {
  ...data,
  APP_URL: data.APP_URL || "http://localhost:3001",
  EMAIL_SECURE:
    data.EMAIL_SECURE !== undefined
      ? data.EMAIL_SECURE
      : data.EMAIL_PORT === 465,
  CONTACT_INBOX_EMAIL: data.CONTACT_INBOX_EMAIL || "info@etthos.com",
  ENABLE_RAZORPAY_PREVIEW:
    data.ENABLE_RAZORPAY_PREVIEW || data.NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW || false,
  NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW:
    data.NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW || data.ENABLE_RAZORPAY_PREVIEW || false,
} as const;

