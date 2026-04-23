"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/shared/api-client";
import { getErrorMessage } from "@/shared/utils";
import { AuthCard } from "@/components/AuthCard";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/auth/signup", "POST", formData);
      router.replace("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to sign up"));
    } finally {
      setLoading(false);
    }
  };

  return (
        <AuthCard>
            <div className="text-center mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">Join the Journal</p>
                <h1 className="font-serif text-3xl font-bold text-primary mb-2">Create Account</h1>
                <p className="text-sm text-muted-foreground">Join the academic community</p>
            </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded mb-6 border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

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
                minLength={6}
                className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md hover:bg-primary/90 transition-colors font-medium mt-6 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        </AuthCard>
  );
}
