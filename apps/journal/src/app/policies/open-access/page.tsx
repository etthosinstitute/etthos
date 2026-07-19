import { PageHeader } from "@/components/PageHeader";
import { Check, Shield, HelpCircle, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Access & Licensing",
  description:
    "EJHBAP is a fully open access journal publishing under CC BY 4.0. Read our open access statement, licensing terms, and article processing charge (APC) details.",
  keywords: [
    "open access psychology journal",
    "CC BY 4.0 license",
    "article processing charge",
    "APC psychology journal",
    "open access licensing policy",
  ],
};

export default function OpenAccessPolicyPage() {
  const licenseRights = [
    {
      title: "Share",
      text: "Copy and redistribute the material in any medium or format.",
    },
    {
      title: "Adapt",
      text: "Remix, transform, and build upon the material for any purpose, including commercially.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Open Access Statement &amp; Licensing Policy"
        description="Information about our open access model, Creative Commons CC BY 4.0 licensing, author copyrights, APC fees, and archiving."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Open Access Statement */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Publishing Model
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Open Access Statement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP is a fully open access journal. All content is made freely available online immediately upon publication, with no embargo period, no subscription requirement, and no paywall of any kind. Readers may read, download, copy, distribute, print, search, and link to the full text of every article without seeking permission from the publisher or author, subject only to the license terms below.
            </p>
          </section>

          {/* Licensing */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Terms of Use
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Licensing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All articles published in EJHBAP are distributed under a Creative Commons Attribution 4.0 International License (CC BY 4.0), unless otherwise stated on an individual article.
            </p>
            
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-primary">Under this license, users may:</p>
              <div className="grid gap-4 md:grid-cols-2">
                {licenseRights.map((right) => (
                  <div key={right.title} className="rounded-xl border border-border bg-background/50 p-5">
                    <h4 className="font-serif font-semibold text-base text-primary mb-1">{right.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{right.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-secondary/15 bg-secondary/5 p-5 text-xs text-muted-foreground leading-relaxed font-sans">
              <strong>Attribution Condition:</strong> Provided that appropriate credit is given to the original author(s), a link to the license is provided, and any changes made are indicated.
            </div>
          </section>

          {/* Copyright */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Intellectual Property
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Copyright
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Authors retain copyright of their work. Authors grant EJHBAP a non-exclusive license to publish, distribute, and archive the article under the terms of the CC BY license stated above. This copyright and licensing information is displayed separately from the journal&apos;s website terms and copyright notice (see footer).
            </p>
          </section>

          {/* Article Processing Charge */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Funding
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Article Processing Charge (APC)
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                EJHBAP charges an Article Processing Charge (APC) of ₹3,000 + 18% GST (₹3,540 total) per accepted article, payable only after a manuscript has successfully passed peer review and been formally accepted for publication. There is no submission fee and no charge at any stage prior to acceptance.
              </p>
              <p>
                The APC covers editorial handling, peer review coordination, copyediting, typesetting, DOI registration, and permanent open-access hosting of the article.
              </p>
              <p>
                Authors unable to pay due to financial hardship may contact <a href="mailto:support@etthos.com" className="text-secondary hover:text-secondary/80 underline font-medium">support@etthos.com</a> before submission to request a fee waiver or reduction; requests are considered on a case-by-case basis and do not influence the editorial or peer review decision.
              </p>
            </div>
          </section>

          {/* Archiving */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Preservation
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Archiving
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EJHBAP is committed to the long-term preservation of its published content and to ensuring continued access to articles even in the event of future changes to the journal or publisher. Formal digital archiving arrangements will be published on this page as they are finalized.
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
