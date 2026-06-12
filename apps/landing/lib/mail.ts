import nodemailer from "nodemailer";
import { env } from "@/lib/env";

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
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_SECURE,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }

  return transporter;
}

export async function sendLandingContactEmail(payload: {
  fullName: string;
  email: string;
  subject: string;
  comment: string;
}) {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Etthos Institute" <${env.EMAIL_USER}>`,
    to: env.CONTACT_INBOX_EMAIL,
    replyTo: payload.email,
    subject: `Landing Contact: ${payload.subject}`,
    text: [
      "A new landing-page contact form submission has been received.",
      "",
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.comment,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">New Landing Contact Submission</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Name</strong></td><td>${escapeHtml(payload.fullName)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Subject</strong></td><td>${escapeHtml(payload.subject)}</td></tr>
        </table>
        <div style="white-space: pre-wrap; background: #f7f3ec; padding: 16px; border-radius: 12px; border: 1px solid #d9d1c7;">${escapeHtml(payload.comment)}</div>
      </div>
    `,
  });
}

export async function sendCourseEnquiryEmail(payload: {
  courseTitle: string;
  name: string;
  email: string;
  phone: string;
  age?: string;
}) {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Etthos Institute" <${env.EMAIL_USER}>`,
    to: env.CONTACT_INBOX_EMAIL,
    replyTo: payload.email,
    subject: `Course Enquiry: ${payload.courseTitle}`,
    text: [
      "A new course enquiry has been received.",
      "",
      `Course: ${payload.courseTitle}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Age: ${payload.age || "Not provided"}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132238;">
        <h2 style="margin-bottom: 12px;">New Course Enquiry</h2>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Course</strong></td><td>${escapeHtml(payload.courseTitle)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Name</strong></td><td>${escapeHtml(payload.name)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Phone</strong></td><td>${escapeHtml(payload.phone)}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Age</strong></td><td>${escapeHtml(payload.age || "Not provided")}</td></tr>
        </table>
      </div>
    `,
  });
}
