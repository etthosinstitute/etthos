import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Terms and Conditions" 
        description="Welcome to Etthos Journal"
      />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground prose-li:text-muted-foreground">
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Etthos Journal of Health, Behavior and Applied Psychology website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">2. Intellectual Property</h2>
              <p>
                All content published in the Etthos Journal, including articles, editorial materials, graphics, and logos, is the property of Etthos or its contributors and is protected by copyright and other intellectual property laws. Published articles are typically distributed under a Creative Commons license, as specified on the article page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">3. Submission and Publication</h2>
              <p>
                Authors submitting manuscripts to the journal represent that their work is original, has not been published elsewhere, and is not under consideration by another journal. By submitting, authors agree to the journal&apos;s peer-review process and editorial policies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">4. Code of Conduct</h2>
              <p>
                Users agree not to engage in any activity that disrupts or interferes with the journal&apos;s operations or services. This includes, but is not limited to, the submission of fraudulent data, plagiarism, or unauthorized use of the platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">5. Limitation of Liability</h2>
              <p>
                Etthos Journal and its editorial board shall not be held liable for any direct, indirect, incidental, or consequential damages arising out of the use of or inability to use the journal&apos;s services or the content of published articles.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">6. Contact Us</h2>
              <p>
                For any questions or clarifications regarding these Terms and Conditions, please contact us:
              </p>
              <div className="not-prose bg-paper/50 p-8 rounded-xl border border-border space-y-4">
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📧</span>
                  <span><strong>Email:</strong> info@etthos.com</span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📞</span>
                  <span><strong>Phone:</strong> +91 72610 28965</span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight">📍</span>
                  <span><strong>Address:</strong> A/107, Sardar Patel Nagar, Mahuli, Patna, Bihar, 804453</span>
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
