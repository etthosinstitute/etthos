"use client";

import { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/shared/api-client";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/utils";
import { AuthCard } from "@/components/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiRequest<{ message: string }>(
        "/api/auth/forgot-password",
        "POST",
        {
          email,
        },
      );
      setMessage(response.message);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to request password reset"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">
          Account Recovery
        </p>
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your journal account email and we&apos;ll send you a reset link
          if the account exists.
        </p>
      </div>

      {message ? (
        <div className="mb-6 rounded-2xl border border-emerald-600/20 bg-emerald-600/10 p-4 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:underline font-medium"
        >
          Back to login
        </Link>
      </div>
    </AuthCard>
  );
}
