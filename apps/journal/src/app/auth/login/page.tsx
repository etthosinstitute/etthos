"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("Account created successfully. Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/auth/login", "POST", formData);
      router.push("/dashboard");
      router.refresh(); // Refresh to update auth state context if any
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to log in"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
             <div className="text-center mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">Author Access</p>
                <h1 className="font-serif text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">Log in to access your dashboard</p>
            </div>

          {success && (
             <div className="bg-green-500/10 text-green-600 text-sm p-3 rounded mb-6 border border-green-500/20">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded mb-6 border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="mt-2 text-right">
                <Link href="/auth/forgot-password" className="text-xs font-medium text-secondary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md hover:bg-primary/90 transition-colors font-medium mt-6 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-16">
      <Suspense fallback={<div className="text-center text-muted-foreground p-8">Loading login...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
