"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/shared/api-client";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/utils";
import { AuthCard } from "@/components/AuthCard";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiRequest<{ message: string }>("/api/auth/reset-password", "POST", {
        token,
        password: form.password,
      });
      setMessage(response.message);
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to reset password"));
    } finally {
      setLoading(false);
    }
  }

  const ready = token && form.password.length >= 8 && form.confirmPassword.length >= 8;
  const mismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  return (
    <AuthCard>
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">Account Recovery</p>
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Choose a new password</h1>
        <p className="text-sm text-muted-foreground">
          Reset links expire after 1 hour. Use a strong password with at least 8 characters.
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

      {!token ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          This reset link is incomplete. Please request a new password reset email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm new password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.confirmPassword}
              onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            />
            {mismatch ? (
              <p className="mt-2 text-xs text-destructive">Password confirmation does not match.</p>
            ) : null}
          </div>

          <Button type="submit" disabled={loading || !ready || mismatch} className="w-full mt-4">
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="text-primary hover:underline font-medium">
          Back to login
        </Link>
      </div>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
      <Suspense fallback={<main className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-16"><div className="text-center text-muted-foreground p-8">Loading reset form...</div></main>}>
        <ResetPasswordContent />
      </Suspense>
  );
}
