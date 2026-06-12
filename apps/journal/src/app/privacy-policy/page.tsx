import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Privacy Policy"
        description="Effective Date: 1st July 2025"
      />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground prose-li:text-muted-foreground">
            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">
                1. Information We Collect
              </h2>
              <p>
                Etthos Journal of Health, Behavior and Applied Psychology may
                collect personal and non-personal information through various
                channels including but not limited to manuscript submissions,
                reviewer registrations, surveys, or direct communication.
              </p>
              <ul>
                <li>Full name and academic titles</li>
                <li>
                  Contact information including email address and institutional
                  affiliation
                </li>
                <li>
                  Professional or academic background, including ORCID IDs
                </li>
                <li>
                  Billing and payment details for publication fees (handled
                  securely via third-party gateways like Razorpay)
                </li>
                <li>
                  IP address, browser type, and access time (via cookies and
                  analytics tools)
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">
                2. Purpose of Data Collection
              </h2>
              <p>Your personal data is collected to:</p>
              <ul>
                <li>
                  Register and manage the peer-review and publication process
                </li>
                <li>
                  Communicate with authors, reviewers, and editorial board
                  members
                </li>
                <li>
                  Provide access to published research and journal updates
                </li>
                <li>
                  Analyze user behavior to improve journal website functionality
                  and reach
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">
                3. Consent and User Rights
              </h2>
              <p>
                By using our platform or submitting manuscripts, you consent to
                the collection and use of your data as outlined in this policy.
                You have the right to access the data we hold about you, request
                correction or deletion, and withdraw consent at any time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">
                4. Data Storage and Security
              </h2>
              <p>
                We implement industry-standard measures to protect your personal
                information from unauthorized access, disclosure, alteration, or
                destruction. Data is stored on secure servers, and any financial
                transactions are processed through certified payment gateways
                with encryption protocols.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">
                5. Contact Us
              </h2>
              <p>
                For questions, concerns, or requests related to your privacy or
                personal data, please contact the Etthos Journal editorial
                office at:
              </p>
              <div className="not-prose bg-paper/50 p-8 rounded-xl border border-border space-y-4">
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📧</span>
                  <span>
                    <strong>Email:</strong> info@etthos.com
                  </span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📞</span>
                  <span>
                    <strong>Phone:</strong> +91 72610 28965
                  </span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📍</span>
                  <span>
                    <strong>Address:</strong> A/107, Sardar Patel Nagar, Mahuli,
                    Patna, Bihar, 804453
                  </span>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
