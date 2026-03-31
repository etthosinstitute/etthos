import nodemailer from "nodemailer";
import { env } from "@/lib/env";

const SMTP_HOST = env.EMAIL_HOST;
const SMTP_PORT = env.EMAIL_PORT;
const SMTP_SECURE = env.EMAIL_SECURE;
const SMTP_USER = env.EMAIL_USER;
const SMTP_PASS = env.EMAIL_PASS;
const REVIEW_INBOX_EMAIL = env.REVIEW_INBOX_EMAIL;
const CONTACT_INBOX_EMAIL = env.CONTACT_INBOX_EMAIL;

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransporter() {
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

export async function sendContactMessageEmail(payload: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const mailer = getTransporter();
  const senderName = `${payload.firstName} ${payload.lastName}`.trim();

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: CONTACT_INBOX_EMAIL,
    replyTo: payload.email,
    subject: `Contact Enquiry: ${payload.subject}`,
    text: [
      "A new contact enquiry has been received.",
      "",
      `Name: ${senderName}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">New Contact Enquiry</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Name</strong></td><td>${escapeHtml(senderName)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Subject</strong></td><td>${escapeHtml(payload.subject)}</td></tr>
        </table>
        <div style="white-space: pre-wrap; background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7;">${escapeHtml(payload.message)}</div>
      </div>
    `,
  });
}

export async function sendManuscriptSubmissionEmail(payload: {
  authorEmail: string;
  authorName?: string | null;
  manuscriptTitle: string;
  manuscriptId: string;
  dashboardUrl?: string | null;
}) {
  const mailer = getTransporter();
  const authorLabel = payload.authorName?.trim() || payload.authorEmail;
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/dashboard`;

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: REVIEW_INBOX_EMAIL,
    replyTo: payload.authorEmail,
    subject: `New Manuscript Submission: ${payload.manuscriptTitle}`,
    text: [
      "A new manuscript has been submitted.",
      "",
      `Author: ${authorLabel}`,
      `Author Email: ${payload.authorEmail}`,
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
      `Dashboard: ${dashboardUrl}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">New Manuscript Submission</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Author</strong></td><td>${escapeHtml(authorLabel)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Author Email</strong></td><td>${escapeHtml(payload.authorEmail)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${escapeHtml(payload.manuscriptTitle)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${escapeHtml(payload.manuscriptId)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Dashboard</strong></td><td><a href="${escapeHtml(dashboardUrl)}" style="color:#1f5f5b;">${escapeHtml(dashboardUrl)}</a></td></tr>
        </table>
      </div>
    `,
  });
}
