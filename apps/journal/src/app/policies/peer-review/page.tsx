import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peer Review Policy",
  description:
    "EJHBAP uses double-blind peer review with a minimum of two independent reviewers per manuscript. Read our full peer review process, timelines, and appeals policy.",
  keywords: [
    "double blind peer review psychology journal",
    "peer review process psychology",
    "psychology journal review timeline",
    "manuscript review policy",
  ],
};

export default function PeerReviewPolicyPage() {
  const steps = [
    {
      label: "1",
      title: "Editorial screening",
      text: "On submission, the Editor-in-Chief or an Associate Editor screens the manuscript for scope fit, originality (via plagiarism-detection software), and basic scholarly standards. Manuscripts that fail this screening are desk-rejected, typically within 1-2 weeks.",
    },
    {
      label: "2",
      title: "Reviewer assignment",
      text: "Manuscripts that pass screening are sent to a minimum of two independent subject-matter reviewers who are not affiliated with the authors' institution and have no conflict of interest with the work.",
    },
    {
      label: "3",
      title: "Review",
      text: "Reviewers evaluate the manuscript for originality, methodological soundness, clarity, ethical compliance, and contribution to the field. Standard turnaround for reviewers is 3-4 weeks.",
    },
    {
      label: "4",
      title: "Editorial decision",
      text: "Based on reviewer recommendations, the handling editor issues one of: Accept, Minor Revisions, Major Revisions, or Reject. In cases of conflicting reviewer recommendations, a third reviewer or the Editor-in-Chief makes the final call.",
    },
    {
      label: "5",
      title: "Revision and re-review",
      text: "Revised manuscripts are typically returned to the original reviewers to confirm concerns have been addressed.",
    },
    {
      label: "6",
      title: "Final decision",
      text: "The Editor-in-Chief holds final responsibility for all publication decisions.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Peer Review Policy"
        description="The editorial review standards, evaluation criteria, and appeals process of the Etthos Journal of Health, Behavior and Applied Psychology."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Commitment Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Standards
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Our Commitment
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP is committed to publishing rigorously reviewed, original scholarly work. All research articles, review articles, case studies, brief reports, and letters to the editor submitted to the journal undergo a structured peer review process before any decision to publish is made. No article is published without independent expert review.
            </p>
          </section>

          {/* Type of Peer Review */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Anonymity
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Type of Peer Review
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP uses double-blind peer review. Author identities are withheld from reviewers, and reviewer identities are withheld from authors, throughout the review process. Authors must remove identifying information (names, affiliations, acknowledgments, funding sources) from the manuscript file itself before submission; this information is collected separately during submission. See our{" "}
              <Link href="/guidelines" className="text-secondary hover:text-secondary/80 underline font-medium">
                Author Guidelines
              </Link>{" "}
              for formatting details.
            </p>
          </section>

          {/* Review Process */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Evaluation
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Review Process
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
            <div className="mt-8 border-t border-border/50 pt-5 text-sm text-muted-foreground leading-relaxed">
              <strong>Timelines:</strong> Typical total time to first decision is 6–8 weeks. Accepted articles are typically published within 4 weeks of final acceptance.
            </div>
          </section>

          {/* Conflicts of Interest */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Fairness
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Conflicts of Interest
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reviewers and editors must declare any financial, professional, or personal conflict of interest and recuse themselves from handling a manuscript where one exists. Authors are asked to suggest exclusions (individuals who should not review their work) at submission.
            </p>
          </section>

          {/* Confidentiality */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Security
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Confidentiality
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Manuscripts under review are treated as confidential documents. Reviewers may not share, cite, or use unpublished data or ideas from manuscripts they review without the authors&apos; explicit written consent.
            </p>
          </section>

          {/* Appeals */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Recourse
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Appeals
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Authors who wish to appeal a rejection decision may submit a written request to the Editor-in-Chief explaining the grounds for appeal. Appeals are evaluated by an editor not involved in the original decision, where possible.
            </p>
          </section>

          {/* Special Issues */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Oversight
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Special Issues
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Any special or guest-edited issue is held to the same peer review standard as regular issues. The Editor-in-Chief retains oversight of all content published under the EJHBAP name, including special issues, and guest editors may not make final acceptance decisions independently.
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
