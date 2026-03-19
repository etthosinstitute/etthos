"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    fileUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        fileUrl: formData.fileUrl || "https://example.com/placeholder.pdf", 
      };

      await apiRequest("/api/manuscripts", "POST", payload);
      setSuccess("Manuscript submitted successfully!");
      setFormData({ title: "", abstract: "", fileUrl: "" });
      
      setTimeout(() => {
          router.push("/");
      }, 2000);

    } catch (err: any) {
      if (err.message.includes("Unauthorized")) {
        setError("You must be logged in to submit.");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(err.message || "Failed to submit manuscript");
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
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-sm p-8">
            
            {success && (
              <div className="bg-green-500/10 text-green-600 text-sm p-4 rounded mb-6 border border-green-500/20">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-4 rounded mb-6 border border-destructive/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 font-serif text-lg">Manuscript Title</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 font-serif text-lg">Abstract</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 font-serif text-lg">File URL (PDF)</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Please provide a direct link to your PDF file (e.g., from Dropbox, Google Drive, or S3).
                </p>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.fileUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, fileUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors font-medium text-lg disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Manuscript"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
