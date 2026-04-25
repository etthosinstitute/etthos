import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Refund Policy" 
        description="Thank you for choosing Etthos Journal"
      />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground prose-li:text-muted-foreground">
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">1. Our Commitment</h2>
              <p>
                We truly appreciate the opportunity to serve the academic community and are committed to delivering the highest standard of editorial and publication services. If for any reason you are not fully satisfied with our service, we&apos;re here to help.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">2. Publication Fees and Refunds</h2>
              
              <div className="not-prose bg-amber-50/50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8">
                <p className="font-bold text-amber-700 mb-2 text-lg">⚠️ Important Notice</p>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li><strong>All APCs are final:</strong> Article Processing Charges (APCs) are typically non-refundable once an article has entered the production phase.</li>
                  <li><strong>No refunds for rejections:</strong> Fees are for the service of peer-review and publication management; no refunds are provided if a manuscript is rejected after review.</li>
                </ul>
              </div>
              
              <p>
                Refunds will be considered only in exceptional circumstances, such as duplicate payments or technical errors. Once a manuscript has been published online, no refunds are applicable under any circumstances.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">3. Customer Support</h2>
              <div className="not-prose bg-paper/50 p-8 rounded-xl border border-border space-y-4">
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight text-xl">📞</span>
                  <span><strong>Phone:</strong> <a href="tel:+917261028965" className="hover:text-highlight transition-colors">+91 72610 28965</a></span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight text-xl">📧</span>
                  <span><strong>Email:</strong> <a href="mailto:info@etthos.com" className="hover:text-highlight transition-colors">info@etthos.com</a></span>
                </p>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-highlight text-xl">🕐</span>
                  <span><strong>Available:</strong> Monday to Saturday, 09:00 AM – 8:00 PM</span>
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
