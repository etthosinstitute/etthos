"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Mail, GraduationCap, Award } from "lucide-react";

export default function ReviewersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    expertise: "",
    orcid: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reviewers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        affiliation: "",
        expertise: "",
        orcid: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Join Our Peer Review Board"
        description="Contribute to the advancement of psychology and behavioral sciences by joining our esteemed panel of expert reviewers."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                Why Review for Etthos?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Peer reviewers are the backbone of scholarly publishing. By
                joining our board, you play a critical role in maintaining the
                integrity and quality of research in psychology.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Academic Recognition",
                  desc: "Gain recognition for your expertise and contribution to the scientific community.",
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  desc: "Help ensure that only rigorous, ethical, and high-impact research is published.",
                },
                {
                  icon: Award,
                  title: "Professional Growth",
                  desc: "Stay at the forefront of new developments in your field and sharpen your critical analysis skills.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-[1.75rem] border border-[hsl(var(--highlight)/0.2)] bg-[hsl(var(--highlight)/0.03)]">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">
                Our Commitment
              </h3>
              <ul className="space-y-3">
                {[
                  "Double-blind peer review process",
                  "Timely communication from editors",
                  "Annual certificates of appreciation",
                  "Invitations to editorial workshops",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--highlight))]" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="relative">
            <div className="sticky top-24 rounded-[2rem] border border-border bg-card p-8 shadow-[0_30px_70px_-40px_rgba(19,34,56,0.3)]">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-2">
                  Expression of Interest
                </p>
                <h2 className="font-serif text-2xl font-bold text-primary">
                  Reviewer Application
                </h2>
              </div>

              {error && (
                <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Application Received
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Thank you for your interest in joining our review board. Our
                    editorial team will review your credentials and contact you
                    shortly.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                    className="rounded-full"
                  >
                    Back to Form
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Doe"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-sm"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@university.edu"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-sm"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Institutional Affiliation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Department of Psychology, University of..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-sm"
                      value={formData.affiliation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          affiliation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Areas of Expertise
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g., Clinical Psychology, Cognitive Neuroscience, Behavioral Therapy..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-sm"
                      value={formData.expertise}
                      onChange={(e) =>
                        setFormData({ ...formData, expertise: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      ORCID iD (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="0000-0000-0000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-sm"
                      value={formData.orcid}
                      onChange={(e) =>
                        setFormData({ ...formData, orcid: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-base shadow-lg shadow-secondary/20 mt-4"
                  >
                    {loading ? "Sending Application..." : "Submit Application"}
                  </Button>

                  <p className="text-[11px] text-center text-muted-foreground px-4">
                    By submitting, you agree to follow the journal's{" "}
                    <span className="text-secondary font-medium">
                      COPE-compliant
                    </span>{" "}
                    ethical guidelines for peer review.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
