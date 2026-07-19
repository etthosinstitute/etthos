import { PageHeader } from "@/components/PageHeader";
import { Check, Shield, AlertCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publication Ethics",
  description:
    "EJHBAP follows COPE's publication ethics principles, covering author, reviewer, and editor responsibilities, and our process for handling allegations of research misconduct.",
  keywords: [
    "publication ethics psychology journal",
    "COPE guidelines",
    "research misconduct policy",
    "editorial ethics",
    "retraction policy psychology journal",
  ],
};

export default function PublicationEthicsPage() {
  const authorDuties = [
    "Manuscripts must report original work; fabrication, falsification, or selective reporting of data is grounds for rejection or retraction.",
    "Simultaneous submission to multiple journals is not permitted.",
    "All individuals who meet authorship criteria (substantial contribution to the work, drafting or critical revision, final approval, accountability) must be listed as authors; others should be acknowledged.",
    "All sources must be properly cited; plagiarism in any form is not tolerated.",
    "Studies involving human participants or animals must have documented ethics committee/IRB approval, stated in the manuscript.",
    "Authors must disclose all conflicts of interest and funding sources.",
  ];

  const reviewerDuties = [
    "Review manuscripts objectively and provide constructive, substantiated feedback.",
    "Maintain confidentiality of unpublished material.",
    "Declare any conflict of interest and decline to review where one exists.",
    "Alert the editor to any suspected ethical concerns (plagiarism, duplicate publication, undisclosed conflicts) encountered during review.",
  ];

  const editorDuties = [
    "Evaluate manuscripts solely on academic merit, regardless of authors' race, gender, nationality, religion, or institutional affiliation.",
    "Ensure a fair, timely, and confidential peer review process.",
    "Recuse themselves from handling manuscripts where they have a conflict of interest (e.g., authored by a colleague, family member, or their own prior student).",
    "Take reasonable steps to identify and prevent publication of plagiarized or fraudulent content.",
  ];

  return (
    <>
      <PageHeader
        title="Publication Ethics &amp; Malpractice Statement"
        description="Our commitment to maintaining the highest ethical standards in scholarly publishing, outlining duties of authors, reviewers, and editors."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Our Standard */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Ethics Framework
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Our Standard
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP follows the principles set out by the Committee on Publication Ethics (COPE), including COPE&apos;s Core Practices and, where relevant, its Best Practice Guidelines for Journal Editors.
            </p>
          </section>

          {/* Duties of Authors */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Author Code
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Duties of Authors
            </h2>
            <ul className="space-y-4">
              {authorDuties.map((duty) => (
                <li key={duty} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Duties of Reviewers */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Reviewer Code
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Duties of Reviewers
            </h2>
            <ul className="space-y-4">
              {reviewerDuties.map((duty) => (
                <li key={duty} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Duties of Editors */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Editor Code
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Duties of Editors
            </h2>
            <ul className="space-y-4">
              {editorDuties.map((duty) => (
                <li key={duty} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Handling Allegations of Misconduct */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d97706]">
              Enforcement
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary flex items-center gap-2">
              <Shield className="h-7 w-7 text-secondary shrink-0" />
              Handling Allegations of Misconduct
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-4 mt-6">
              <p>
                Concerns about a published or submitted article (data integrity, authorship disputes, undisclosed conflicts, plagiarism) may be reported to <a href="mailto:support@etthos.com" className="text-secondary hover:text-secondary/80 underline font-medium">support@etthos.com</a>. All allegations will be investigated following COPE&apos;s flowcharts before any decision is made. Outcomes may include requesting corrections, issuing an Expression of Concern, or retraction, in line with COPE retraction guidelines.
              </p>
            </div>
          </section>

          {/* Corrections and Retractions */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Record Integrity
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Corrections and Retractions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP will publish corrections for honest errors that affect the scientific record, and retractions for content found to violate ethical or scientific standards, following COPE&apos;s retraction guidelines. Both are clearly marked and linked to the original article.
            </p>
          </section>

          {/* Advertising and Editorial Independence */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Independence
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-secondary" />
              Advertising and Editorial Independence
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Editorial decisions are made independently of any advertising, sponsorship, or commercial relationship the publisher may have, and independently of the publisher&apos;s business leadership (see our{" "}
              <Link href="/about" className="text-secondary hover:text-secondary/80 underline font-medium">
                About
              </Link>{" "}
              page).
            </p>
          </section>

          {/* Contact info bar */}
          <div className="border-t border-border/60 pt-8 text-center text-xs text-muted-foreground">
            <span>Contact: <a href="mailto:support@etthos.com" className="hover:text-primary underline">support@etthos.com</a></span>
          </div>

        </div>
      </div>
    </>
  );
}
