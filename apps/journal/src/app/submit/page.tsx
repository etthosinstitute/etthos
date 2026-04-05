"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/shared/api-client";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/utils";

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const abstractCount = formData.abstract.trim().length;
  const titleCount = formData.title.trim().length;
  const submitReady = titleCount > 0 && abstractCount >= 50 && !!file;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!file) {
        throw new Error("Please upload your manuscript file.");
      }

      const uploadForm = new FormData();
      uploadForm.append("file", file);
      const uploadResponse = await fetch("/api/uploads/manuscript", {
        method: "POST",
        body: uploadForm,
      });

      const uploadJson = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadJson.error || "Failed to upload manuscript file");
      }

      const payload = {
        ...formData,
        fileUrl: uploadJson.file.url as string,
      };

      await apiRequest("/api/manuscripts", "POST", payload);
      setSuccess("Manuscript submitted successfully!");
      setFormData({ title: "", abstract: "" });
      setFile(null);
      
      setTimeout(() => {
          router.push("/dashboard");
      }, 2000);

    } catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to submit manuscript");

      if (message.includes("Unauthorized")) {
        setError("You must be logged in to submit.");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader 
        title="Submit Manuscript" 
        description="Share your research in psychology and behavioural sciences with the Etthos Journal of Psychology." 
      />
        
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">Submission Portal</p>
              <h2 className="font-serif text-3xl font-bold text-primary">Prepare your manuscript for editorial review</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Submit your title, abstract, and manuscript file link. You will be redirected after successful submission.
              </p>
            </div>
            
            {success && (
              <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Manuscript Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter the full title of your manuscript"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Use the final scholarly title that should appear in editorial records.
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-primary">Abstract</label>
                  <span className="text-xs text-muted-foreground">{abstractCount}/50 minimum</span>
                </div>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                  placeholder="Provide a concise summary of your research..."
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Please provide at least 50 characters so the editors can assess scope and fit quickly.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Manuscript File</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Upload a PDF, DOC, or DOCX file up to 10MB. The file will be stored and attached to your submission.
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  className="w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading || !submitReady}
                  className="h-12 w-full text-base"
                >
                  {loading ? "Submitting..." : "Submit Manuscript"}
                </Button>
                {!submitReady ? (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Add a title, an abstract of at least 50 characters, and your manuscript file to continue.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
