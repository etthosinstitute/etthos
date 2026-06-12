import nodemailer from "nodemailer";
import { env } from "@/server/env";

const SMTP_HOST = env.EMAIL_HOST;
const SMTP_PORT = env.EMAIL_PORT;
const SMTP_SECURE = env.EMAIL_SECURE;
const SMTP_USER = env.EMAIL_USER;
const SMTP_PASS = env.EMAIL_PASS;

let transporter: nodemailer.Transporter | null = null;

export function getMailerTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP credentials are missing");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return transporter;
}

export function getMailerFrom() {
  return `"Etthos Journal of Health, Behavior and Applied Psychology" <${SMTP_USER}>`;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function wrapHtmlEmail(content: string) {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">${content}</div>`;
}

export async function trySendEmail(
  fn: () => Promise<void>,
  failureMessage: string,
  logLabel: string,
) {
  try {
    await fn();
    return { emailSent: true, emailError: null };
  } catch (error) {
    console.error(`${logLabel}:`, error);
    return {
      emailSent: false,
      emailError: error instanceof Error ? error.message : failureMessage,
    };
  }
}
