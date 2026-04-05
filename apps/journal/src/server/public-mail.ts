import { env } from "@/server/env";
import {
  escapeHtml,
  getMailerFrom,
  getMailerTransporter,
  wrapHtmlEmail,
} from "@/server/mailer";

const REVIEW_INBOX_EMAIL = env.REVIEW_INBOX_EMAIL;
const CONTACT_INBOX_EMAIL = env.CONTACT_INBOX_EMAIL;

export async function sendContactMessageEmail(payload: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const mailer = getMailerTransporter();
  const senderName = `${payload.firstName} ${payload.lastName}`.trim();

  await mailer.sendMail({
    from: getMailerFrom(),
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
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">New Contact Enquiry</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Name</strong></td><td>${escapeHtml(senderName)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Subject</strong></td><td>${escapeHtml(payload.subject)}</td></tr>
        </table>
        <div style="white-space: pre-wrap; background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7;">${escapeHtml(payload.message)}</div>
    `),
  });
}

export async function sendManuscriptSubmissionEmail(payload: {
  authorEmail: string;
  authorName?: string | null;
  manuscriptTitle: string;
  manuscriptId: string;
  dashboardUrl?: string | null;
}) {
  const mailer = getMailerTransporter();
  const authorLabel = payload.authorName?.trim() || payload.authorEmail;
  const dashboardUrl = payload.dashboardUrl || `${env.APP_URL}/dashboard`;

  await mailer.sendMail({
    from: getMailerFrom(),
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
    html: wrapHtmlEmail(`
        <h2 style="margin-bottom: 12px;">New Manuscript Submission</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Author</strong></td><td>${escapeHtml(authorLabel)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Author Email</strong></td><td>${escapeHtml(payload.authorEmail)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript</strong></td><td>${escapeHtml(payload.manuscriptTitle)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Manuscript ID</strong></td><td>${escapeHtml(payload.manuscriptId)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Dashboard</strong></td><td><a href="${escapeHtml(dashboardUrl)}" style="color:#1f5f5b;">${escapeHtml(dashboardUrl)}</a></td></tr>
        </table>
    `),
  });
}
