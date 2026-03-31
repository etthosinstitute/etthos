import nodemailer from "nodemailer";
import { fullName } from "@/lib/utils";
import { env } from "@/lib/env";

const SMTP_HOST = env.EMAIL_HOST;
const SMTP_PORT = env.EMAIL_PORT;
const SMTP_SECURE = env.EMAIL_SECURE;
const SMTP_USER = env.EMAIL_USER;
const SMTP_PASS = env.EMAIL_PASS;
const REVIEW_INBOX_EMAIL = env.REVIEW_INBOX_EMAIL;

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
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

interface ReviewEmailPayload {
  reviewerEmail: string;
  reviewerName?: string | null;
  manuscriptTitle: string;
  manuscriptId: string;
  decision: string;
  content: string;
}

interface ReviewAssignmentEmailPayload {
  reviewerEmail: string;
  reviewerName?: string | null;
  editorName?: string | null;
  manuscriptTitle: string;
  manuscriptId: string;
  dueDate?: string | null;
  dashboardUrl?: string | null;
}

interface ReviewStatusEmailPayload {
  reviewerEmail: string;
  reviewerName?: string | null;
  manuscriptTitle: string;
  manuscriptId: string;
  status: "ACCEPTED" | "DECLINED";
}

interface ReviewerAccountEmailPayload {
  reviewerEmail: string;
  reviewerName?: string | null;
  tempPassword: string;
  createdByName?: string | null;
  dashboardUrl?: string | null;
}

interface PasswordResetEmailPayload {
  email: string;
  name?: string | null;
  resetUrl: string;
}

export async function sendReviewSubmissionEmail(payload: ReviewEmailPayload) {
  const mailer = getTransporter();
  const reviewerLabel = payload.reviewerName?.trim() ||
    fullName(undefined, undefined, payload.reviewerEmail || "Reviewer");
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeReviewerEmail = escapeHtml(payload.reviewerEmail);
  const safeManuscriptTitle = escapeHtml(payload.manuscriptTitle);
  const safeManuscriptId = escapeHtml(payload.manuscriptId);
  const safeDecision = escapeHtml(payload.decision);
  const safeContent = escapeHtml(payload.content);

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: REVIEW_INBOX_EMAIL,
    replyTo: payload.reviewerEmail,
    subject: `Review Submission: ${payload.manuscriptTitle}`,
    text: [
      "A new review has been submitted.",
      "",
      `Reviewer: ${reviewerLabel}`,
      `Reviewer Email: ${payload.reviewerEmail}`,
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
      `Decision: ${payload.decision}`,
      "",
      "Review Content:",
      payload.content,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">New Review Submission</h2>
        <p>A review has been submitted through the Etthos Journal system.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Reviewer</strong></td><td>${safeReviewerLabel}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Reviewer Email</strong></td><td>${safeReviewerEmail}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${safeManuscriptTitle}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${safeManuscriptId}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Decision</strong></td><td>${safeDecision}</td></tr>
        </table>
        <h3 style="margin: 20px 0 8px;">Review Content</h3>
        <div style="white-space: pre-wrap; background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7;">${safeContent}</div>
      </div>
    `,
  });
}

export async function sendReviewAssignmentEmail(
  payload: ReviewAssignmentEmailPayload
) {
  const mailer = getTransporter();
  const reviewerLabel = payload.reviewerName?.trim() ||
    fullName(undefined, undefined, payload.reviewerEmail || "Reviewer");
  const editorLabel = payload.editorName?.trim() || "Editorial Office";
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeEditorLabel = escapeHtml(editorLabel);
  const safeTitle = escapeHtml(payload.manuscriptTitle);
  const safeId = escapeHtml(payload.manuscriptId);
  const safeDueDate = escapeHtml(payload.dueDate || "Not specified");
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/dashboard`;
  const safeDashboardUrl = escapeHtml(dashboardUrl);

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: payload.reviewerEmail,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: `Review Request: ${payload.manuscriptTitle}`,
    text: [
      `Dear ${reviewerLabel},`,
      "",
      `${editorLabel} has invited you to review a manuscript for Etthos Journal of Psychology.`,
      "",
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
      `Due Date: ${payload.dueDate || "Not specified"}`,
      `Dashboard: ${dashboardUrl}`,
      "",
      "Please log in to the reviewer dashboard to accept or submit your review.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">Review Invitation</h2>
        <p>Dear ${safeReviewerLabel},</p>
        <p>${safeEditorLabel} has invited you to review a manuscript for the Etthos Journal of Psychology.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${safeTitle}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${safeId}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Due Date</strong></td><td>${safeDueDate}</td></tr>
        </table>
        <p>
          Please log in to your reviewer dashboard to respond and submit your review:
          <a href="${safeDashboardUrl}" style="color: #1f5f5b;">${safeDashboardUrl}</a>
        </p>
      </div>
    `,
  });
}

export async function sendReviewStatusEmail(payload: ReviewStatusEmailPayload) {
  const mailer = getTransporter();
  const reviewerLabel = payload.reviewerName?.trim() ||
    fullName(undefined, undefined, payload.reviewerEmail || "Reviewer");
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeStatus = escapeHtml(payload.status);
  const safeTitle = escapeHtml(payload.manuscriptTitle);
  const safeId = escapeHtml(payload.manuscriptId);

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: REVIEW_INBOX_EMAIL,
    replyTo: payload.reviewerEmail,
    subject: `Review Invitation ${payload.status.toLowerCase()}: ${payload.manuscriptTitle}`,
    text: [
      `${reviewerLabel} has ${payload.status.toLowerCase()} a review invitation.`,
      "",
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">Reviewer Response</h2>
        <p>${safeReviewerLabel} has <strong>${safeStatus.toLowerCase()}</strong> a review invitation.</p>
        <p><strong>Manuscript:</strong> ${safeTitle}</p>
        <p><strong>Manuscript ID:</strong> ${safeId}</p>
      </div>
    `,
  });
}

export async function sendReviewerAccountEmail(
  payload: ReviewerAccountEmailPayload
) {
  const mailer = getTransporter();
  const reviewerLabel = payload.reviewerName?.trim() ||
    fullName(undefined, undefined, payload.reviewerEmail || "Reviewer");
  const creatorLabel = payload.createdByName?.trim() || "The editorial team";
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/auth/login`;

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: payload.reviewerEmail,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: "Your reviewer account for Etthos Journal",
    text: [
      `Dear ${reviewerLabel},`,
      "",
      `${creatorLabel} has created a reviewer account for you on the Etthos Journal of Psychology platform.`,
      "",
      `Login email: ${payload.reviewerEmail}`,
      `Temporary password: ${payload.tempPassword}`,
      `Login URL: ${dashboardUrl}`,
      "",
      "Please log in and change your password after your first access.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">Reviewer Account Created</h2>
        <p>Dear ${escapeHtml(reviewerLabel)},</p>
        <p>${escapeHtml(creatorLabel)} has created a reviewer account for you on the Etthos Journal of Psychology platform.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Login email</strong></td><td>${escapeHtml(payload.reviewerEmail)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Temporary password</strong></td><td>${escapeHtml(payload.tempPassword)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Login URL</strong></td><td><a href="${escapeHtml(dashboardUrl)}" style="color:#1f5f5b;">${escapeHtml(dashboardUrl)}</a></td></tr>
        </table>
        <p>Please log in and change your password after your first access.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(payload: PasswordResetEmailPayload) {
  const mailer = getTransporter();
  const recipientLabel =
    payload.name?.trim() ||
    fullName(undefined, undefined, payload.email || "Journal user");

  await mailer.sendMail({
    from: `"Etthos Journal" <${SMTP_USER}>`,
    to: payload.email,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: "Reset your Etthos Journal password",
    text: [
      `Dear ${recipientLabel},`,
      "",
      "We received a request to reset your Etthos Journal password.",
      `Reset link: ${payload.resetUrl}`,
      "",
      "This link expires in 1 hour. If you did not request this, you can ignore this email.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">Reset your password</h2>
        <p>Dear ${escapeHtml(recipientLabel)},</p>
        <p>We received a request to reset your Etthos Journal password.</p>
        <p>
          <a href="${escapeHtml(payload.resetUrl)}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#1f5f5b;color:#ffffff;text-decoration:none;">
            Reset Password
          </a>
        </p>
        <p style="margin-top: 12px;">If the button does not work, use this link:</p>
        <p><a href="${escapeHtml(payload.resetUrl)}" style="color:#1f5f5b;">${escapeHtml(payload.resetUrl)}</a></p>
        <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}
