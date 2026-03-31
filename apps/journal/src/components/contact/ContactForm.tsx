"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactFormProps = {
  subjects: string[];
  successMessage: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm({ subjects, successMessage }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(payload.error || "Unable to send your message right now.");
        return;
      }

      setForm(initialState);
      setSuccess(payload.message || successMessage);
    } catch {
      setError("Unable to send your message right now.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-primary">First Name</label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-primary">Last Name</label>
          <input
            id="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
            placeholder="Enter last name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-primary">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-primary">Subject</label>
        <select
          id="subject"
          required
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-primary">Message</label>
        <textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors resize-vertical"
          placeholder="Your message..."
        />
      </div>
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </p>
      )}
      <Button type="submit" disabled={submitting} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
        <Send className="h-4 w-4" />
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
