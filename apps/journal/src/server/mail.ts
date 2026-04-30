import { fullName } from "@/shared/utils";
import { env } from "@/server/env";
import {
  escapeHtml,
  getMailerFrom,
  getMailerTransporter,
  wrapHtmlEmail,
} from "@/server/mailer";

const REVIEW_INBOX_EMAIL = env.REVIEW_INBOX_EMAIL;
const CONTACT_INBOX_EMAIL = env.CONTACT_INBOX_EMAIL;

interface ReviewerApplicationPayload {
  name: string;
  email: string;
  affiliation: string;
  expertise: string;
  orcid?: string | null;
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
  tempPassword?: string | null;
  createdByName?: string | null;
  dashboardUrl?: string | null;
}

interface PasswordResetEmailPayload {
  email: string;
  name?: string | null;
  resetUrl: string;
}

function resolveReviewerLabel(name?: string | null, email?: string) {
  return name?.trim() || fullName(undefined, undefined, email || "Reviewer");
}

export async function sendReviewSubmissionEmail(payload: ReviewEmailPayload) {
  const mailer = getMailerTransporter();
  const reviewerLabel = resolveReviewerLabel(
    payload.reviewerName,
    payload.reviewerEmail
  );
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeReviewerEmail = escapeHtml(payload.reviewerEmail);
  const safeManuscriptTitle = escapeHtml(payload.manuscriptTitle);
  const safeManuscriptId = escapeHtml(payload.manuscriptId);
  const safeDecision = escapeHtml(payload.decision);
  const safeContent = escapeHtml(payload.content);

  await mailer.sendMail({
    from: getMailerFrom(),
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
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">New Review Submission</h2>
        <p>A review has been submitted through the Etthos Journal of Health, Behavior and Applied Psychology system.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Reviewer</strong></td><td>${safeReviewerLabel}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Reviewer Email</strong></td><td>${safeReviewerEmail}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${safeManuscriptTitle}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${safeManuscriptId}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Decision</strong></td><td>${safeDecision}</td></tr>
        </table>
        <h3 style="margin: 20px 0 8px;">Review Content</h3>
        <div style="white-space: pre-wrap; background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7;">${safeContent}</div>
    `),
  });
}

export async function sendReviewAssignmentEmail(
  payload: ReviewAssignmentEmailPayload
) {
  const mailer = getMailerTransporter();
  const reviewerLabel = resolveReviewerLabel(
    payload.reviewerName,
    payload.reviewerEmail
  );
  const editorLabel = payload.editorName?.trim() || "Editorial Office";
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeEditorLabel = escapeHtml(editorLabel);
  const safeTitle = escapeHtml(payload.manuscriptTitle);
  const safeId = escapeHtml(payload.manuscriptId);
  const safeDueDate = escapeHtml(payload.dueDate || "Not specified");
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/dashboard`;
  const safeDashboardUrl = escapeHtml(dashboardUrl);

  await mailer.sendMail({
    from: getMailerFrom(),
    to: payload.reviewerEmail,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: `Review Request: ${payload.manuscriptTitle}`,
    text: [
      `Dear ${reviewerLabel},`,
      "",
      `${editorLabel} has invited you to review a manuscript for Etthos Journal of Health, Behavior and Applied Psychology.`,
      "",
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
      `Due Date: ${payload.dueDate || "Not specified"}`,
      `Dashboard: ${dashboardUrl}`,
      "",
      "Please log in to the reviewer dashboard to accept or submit your review.",
    ].join("\n"),
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">Review Invitation</h2>
        <p>Dear ${safeReviewerLabel},</p>
        <p>${safeEditorLabel} has invited you to review a manuscript for the Etthos Journal of Health, Behavior and Applied Psychology.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${safeTitle}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${safeId}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Due Date</strong></td><td>${safeDueDate}</td></tr>
        </table>
        <p>
          Please log in to your reviewer dashboard to respond and submit your review:
          <a href="${safeDashboardUrl}" style="color: #1f5f5b;">${safeDashboardUrl}</a>
        </p>
    `),
  });
}

export async function sendReviewStatusEmail(payload: ReviewStatusEmailPayload) {
  const mailer = getMailerTransporter();
  const reviewerLabel = resolveReviewerLabel(
    payload.reviewerName,
    payload.reviewerEmail
  );
  const safeReviewerLabel = escapeHtml(reviewerLabel);
  const safeStatus = escapeHtml(payload.status);
  const safeTitle = escapeHtml(payload.manuscriptTitle);
  const safeId = escapeHtml(payload.manuscriptId);

  await mailer.sendMail({
    from: getMailerFrom(),
    to: REVIEW_INBOX_EMAIL,
    replyTo: payload.reviewerEmail,
    subject: `Review Invitation ${payload.status.toLowerCase()}: ${payload.manuscriptTitle}`,
    text: [
      `${reviewerLabel} has ${payload.status.toLowerCase()} a review invitation.`,
      "",
      `Manuscript: ${payload.manuscriptTitle}`,
      `Manuscript ID: ${payload.manuscriptId}`,
    ].join("\n"),
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">Reviewer Response</h2>
        <p>${safeReviewerLabel} has <strong>${safeStatus.toLowerCase()}</strong> a review invitation.</p>
        <p><strong>Manuscript:</strong> ${safeTitle}</p>
        <p><strong>Manuscript ID:</strong> ${safeId}</p>
    `),
  });
}

export async function sendReviewerAccountEmail(
  payload: ReviewerAccountEmailPayload
) {
  const mailer = getMailerTransporter();
  const reviewerLabel = resolveReviewerLabel(
    payload.reviewerName,
    payload.reviewerEmail
  );
  const creatorLabel = payload.createdByName?.trim() || "The editorial team";
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/auth/login`;
  const hasTempPassword = Boolean(payload.tempPassword);

  await mailer.sendMail({
    from: getMailerFrom(),
    to: payload.reviewerEmail,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: "Your reviewer account for Etthos Journal of Health, Behavior and Applied Psychology",
    text: hasTempPassword
      ? [
          `Dear ${reviewerLabel},`,
          "",
          `${creatorLabel} has created a reviewer account for you on the Etthos Journal of Health, Behavior and Applied Psychology platform.`,
          "",
          `Login email: ${payload.reviewerEmail}`,
          `Temporary password: ${payload.tempPassword}`,
          `Login URL: ${dashboardUrl}`,
          "",
          "Please log in and change your password after your first access.",
        ].join("\n")
      : [
          `Dear ${reviewerLabel},`,
          "",
          `${creatorLabel} has enabled reviewer access on your existing Etthos Journal of Health, Behavior and Applied Psychology account.`,
          "",
          `Login email: ${payload.reviewerEmail}`,
          `Login URL: ${dashboardUrl}`,
          "",
          "Please log in with your existing password to access reviewer assignments.",
        ].join("\n"),
    html: hasTempPassword
      ? wrapHtmlEmail(`
          <h2 style="margin-bottom: 12px;">Reviewer Account Created</h2>
          <p>Dear ${escapeHtml(reviewerLabel)},</p>
          <p>${escapeHtml(creatorLabel)} has created a reviewer account for you on the Etthos Journal of Health, Behavior and Applied Psychology platform.</p>
          <table style="border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 12px 6px 0;"><strong>Login email</strong></td><td>${escapeHtml(payload.reviewerEmail)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>Temporary password</strong></td><td>${escapeHtml(payload.tempPassword || "")}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>Login URL</strong></td><td><a href="${escapeHtml(dashboardUrl)}" style="color:#1f5f5b;">${escapeHtml(dashboardUrl)}</a></td></tr>
          </table>
          <p>Please log in and change your password after your first access.</p>
      `)
      : wrapHtmlEmail(`
          <h2 style="margin-bottom: 12px;">Reviewer Access Enabled</h2>
          <p>Dear ${escapeHtml(reviewerLabel)},</p>
          <p>${escapeHtml(creatorLabel)} has enabled reviewer access on your existing Etthos Journal of Health, Behavior and Applied Psychology account.</p>
          <table style="border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 12px 6px 0;"><strong>Login email</strong></td><td>${escapeHtml(payload.reviewerEmail)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>Login URL</strong></td><td><a href="${escapeHtml(dashboardUrl)}" style="color:#1f5f5b;">${escapeHtml(dashboardUrl)}</a></td></tr>
          </table>
          <p>Please log in with your existing password to access reviewer assignments.</p>
      `),
  });
}

export async function sendPasswordResetEmail(payload: PasswordResetEmailPayload) {
  const mailer = getMailerTransporter();
  const recipientLabel =
    payload.name?.trim() ||
    fullName(undefined, undefined, payload.email || "Journal user");

  await mailer.sendMail({
    from: getMailerFrom(),
    to: payload.email,
    replyTo: REVIEW_INBOX_EMAIL,
    subject: "Reset your Etthos Journal of Health, Behavior and Applied Psychology password",
    text: [
      `Dear ${recipientLabel},`,
      "",
      "We received a request to reset your Etthos Journal of Health, Behavior and Applied Psychology password.",
      `Reset link: ${payload.resetUrl}`,
      "",
      "This link expires in 1 hour. If you did not request this, you can ignore this email.",
    ].join("\n"),
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">Reset your password</h2>
        <p>Dear ${escapeHtml(recipientLabel)},</p>
        <p>We received a request to reset your Etthos Journal of Health, Behavior and Applied Psychology password.</p>
        <p>
          <a href="${escapeHtml(payload.resetUrl)}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#1f5f5b;color:#ffffff;text-decoration:none;">
            Reset Password
          </a>
        </p>
        <p style="margin-top: 12px;">If the button does not work, use this link:</p>
        <p><a href="${escapeHtml(payload.resetUrl)}" style="color:#1f5f5b;">${escapeHtml(payload.resetUrl)}</a></p>
        <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    `),
  });
}

export async function sendReviewerApplicationEmail(payload: ReviewerApplicationPayload) {
  const mailer = getMailerTransporter();
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeAffiliation = escapeHtml(payload.affiliation);
  const safeExpertise = escapeHtml(payload.expertise);
  const safeOrcid = escapeHtml(payload.orcid || "Not provided");

  await mailer.sendMail({
    from: getMailerFrom(),
    to: CONTACT_INBOX_EMAIL,
    replyTo: payload.email,
    subject: `Reviewer Application: ${payload.name}`,
    text: [
      "A new reviewer application has been received.",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Affiliation: ${payload.affiliation}`,
      `Expertise: ${payload.expertise}`,
      `ORCID: ${payload.orcid || "Not provided"}`,
      "",
      "Please review the applicant's credentials and respond accordingly.",
    ].join("\n"),
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">New Reviewer Application</h2>
        <p>A potential expert has applied to join the Etthos Journal of Health, Behavior and Applied Psychology peer review board.</p>
        <table style="border-collapse: collapse; margin: 16px 0; width: 100%;">
          <tr><td style="padding: 6px 12px 6px 0; border-bottom: 1px solid #eee; width: 150px;"><strong>Name</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${safeName}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${safeEmail}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; border-bottom: 1px solid #eee;"><strong>Affiliation</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${safeAffiliation}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; border-bottom: 1px solid #eee;"><strong>ORCID</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${safeOrcid}</td></tr>
        </table>
        <h3 style="margin: 20px 0 8px;">Areas of Expertise</h3>
        <div style="background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7; font-size: 14px; line-height: 1.6;">${safeExpertise}</div>
        <p style="margin-top: 24px; font-size: 13px; color: #666;">
          You can reply directly to this email to contact the applicant.
        </p>
    `),
  });
}
