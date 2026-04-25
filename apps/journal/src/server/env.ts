import { z } from "zod";

const baseSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
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
  AUTH_COOKIE_SECURE: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return value === "true";
    }),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  REVIEW_INBOX_EMAIL: z.string().email().optional(),
  CONTACT_INBOX_EMAIL: z.string().email().optional(),
  UPLOAD_DIR: z.string().optional(),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(10),
});

const parsed = baseSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  // Only throw error if we are NOT in a build/CI environment
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
    throw new Error(`Invalid journal environment configuration: ${issues}`);
  } else {
    console.warn(`⚠️ Warning: Invalid journal environment configuration (ignored during build): ${issues}`);
  }
}

const data = parsed.success ? parsed.data : ({} as Partial<z.infer<typeof baseSchema>>);

export const env = {
  ...data,
  EMAIL_SECURE:
    data.EMAIL_SECURE !== undefined
      ? data.EMAIL_SECURE
      : data.EMAIL_PORT === 465,
  APP_URL: data.APP_URL || "http://localhost:3000",
  REVIEW_INBOX_EMAIL: data.REVIEW_INBOX_EMAIL || "spider20251@gmail.com",
  CONTACT_INBOX_EMAIL:
    data.CONTACT_INBOX_EMAIL ||
    data.REVIEW_INBOX_EMAIL ||
    "spider20251@gmail.com",
  AUTH_COOKIE_SECURE:
    data.AUTH_COOKIE_SECURE !== undefined
      ? data.AUTH_COOKIE_SECURE
      : (data.APP_URL || "http://localhost:3000").startsWith("https://"),
} as const;

export function isProduction() {
  return env.NODE_ENV === "production";
}
