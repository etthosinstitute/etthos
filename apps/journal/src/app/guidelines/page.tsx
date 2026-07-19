import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description:
    "Submission guidelines for EJHBAP: manuscript types, formatting, required declarations, peer review process, APC, and publication ethics for authors submitting to the journal.",
  keywords: [
    "submit paper psychology journal",
    "author guidelines psychology journal",
    "manuscript submission APC",
    "APA format psychology journal",
    "psychology journal submission process",
  ],
};

export default function GuidelinesPage() {
  const formattingPoints = [
    "Manuscript file: Word (.doc/.docx), double-spaced, 12-pt font, 1-inch margins",
    "Citation and reference style: APA (7th edition)",
    "Structure for original research: Title, Abstract (150–250 words), Keywords (4–6), Introduction, Methods, Results, Discussion, Conclusion, References, Declarations",
  ];

  const titlePagePoints = [
    "Full manuscript title",
    "Author names, affiliations, and ORCID iDs",
    "Corresponding author's contact details",
  ];

  const declarationsPoints = [
    "Conflict of interest statement, or an explicit statement that none exist",
    "Funding statement, including grant numbers, or a statement that no funding was received",
    "Ethics approval: IRB/ethics committee name and approval number for studies involving human participants, plus a statement of informed consent",
    "Data availability statement: where/how underlying data can be accessed, or justification if it cannot be shared",
  ];

  const steps = [
    { label: "1", title: "Portal Submission", text: "Submit via the online submission portal." },
    { label: "2", title: "Editorial Screening", text: "Initial internal check (1–2 weeks)." },
    { label: "3", title: "Double-Blind Peer Review", text: "Subject-matter expert review (see our Peer Review Policy). Typical time to first decision: 6-8 weeks." },
    { label: "4", title: "Revision", text: "Author makes revisions based on feedback (if requested)." },
    { label: "5", title: "Acceptance & Publication", text: "APC payment, copyediting, and publication with a Crossref DOI, typically within 4 weeks of final acceptance." },
  ];

  return (
    <>
      <PageHeader
        title="Author Guidelines"
        description="Comprehensive submission guidelines: manuscript types, general formatting, required declarations, APC, and submission process for authors."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Manuscript Types */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Coverage
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Manuscript Types
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Submissions must fall within our{" "}
                <Link href="/about/aims-scope" className="text-secondary hover:text-secondary/80 underline font-medium">
                  Aims &amp; Scope
                </Link>{" "}
                categories (including original research articles, systematic and narrative reviews, case studies, brief reports, letters to the editor, and methodological papers). Manuscripts found to be outside our scope are desk-rejected without external review.
              </p>
            </section>

            {/* General Formatting */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Preparation
              </p>
              <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
                General Formatting
              </h2>
              <ul className="space-y-4">
                {formattingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Title Page */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Anonymization
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Title Page
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Submit a separate title page including:
              </p>
              <ul className="space-y-3.5 pl-2 mb-6">
                {titlePagePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-secondary/15 bg-secondary/5 p-5 text-sm text-muted-foreground leading-relaxed font-sans">
                <strong>Peer Review Compliance:</strong> To support double-blind peer review, remove all identifying information (names, affiliations, acknowledgments, funding sources) from the main manuscript file itself.
              </div>
            </section>

            {/* Required Declarations */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Ethics &amp; Disclosure
              </p>
              <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
                Required Declarations
              </h2>
              <ul className="space-y-4">
                {declarationsPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Originality & Plagiarism */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Integrity
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Originality &amp; Plagiarism
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All submissions are screened using plagiarism-detection software before entering peer review. Manuscripts must not be under simultaneous consideration elsewhere. Submissions found to contain duplicated publication, fabricated data, or undisclosed AI-generated analysis presented as original work will be rejected and may be reported to the authors&apos; institution in accordance with COPE guidelines.
              </p>
            </section>

            {/* Use of AI Tools */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Technology policy
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Use of AI Tools
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Authors may use AI tools for language editing but must disclose such use in the manuscript. AI tools may not be listed as authors and may not be used to generate data, analysis, or citations.
              </p>
            </section>

            {/* Article Processing Charge */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Fees
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Article Processing Charge (APC)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                EJHBAP charges an APC of ₹3,000 + 18% GST (₹3,540 total), payable only after a manuscript has been accepted following peer review. There is no submission fee. Fee waivers may be requested at <a href="mailto:support@etthos.com" className="text-secondary hover:text-secondary/80 underline font-medium">support@etthos.com</a> before submission. See our{" "}
                <Link href="/policies/open-access" className="text-secondary hover:text-secondary/80 underline font-medium">
                  Open Access &amp; Licensing
                </Link>{" "}
                policy for full details.
              </p>
            </section>

            {/* Submission Process */}
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Workflow
              </p>
              <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
                Submission Process
              </h2>
              <div className="relative border-l border-border/80 pl-6 ml-4 space-y-6">
                {steps.map((step) => (
                  <div key={step.label} className="relative">
                    <span className="absolute -left-[37px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {step.label}
                    </span>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24 rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">
                Resources
              </h3>

              <div className="space-y-4">
                {/* APA Style Guide */}
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 font-sans">
                  <FileText className="h-6 w-6 text-secondary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">APA Style Guide</h4>
                    <p className="text-xs text-muted-foreground mb-3 font-normal">
                      Official APA formatting resources and tutorials.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full text-xs h-8">
                      <a href="https://apastyle.apa.org/" target="_blank" rel="noopener noreferrer">
                        View Guide
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Author Toolkit */}
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 font-sans">
                  <Download className="h-6 w-6 text-secondary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Author Toolkit</h4>
                    <p className="text-xs text-muted-foreground mb-3 font-normal">
                      Download our template to format your submission.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full text-xs h-8">
                      <a href="/EJHBAP_Manuscript_Template.docx" download>
                        Download Template
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                  <Link href="/submit">
                    Start Submission
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-4 text-center font-sans">
                <span className="text-xs text-muted-foreground font-normal">
                  Contact: <a href="mailto:support@etthos.com" className="hover:underline">support@etthos.com</a>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
