"use client";

import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-surface-base text-text-high font-display overflow-x-hidden antialiased transition-colors">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-midnight text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-cyan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-iris/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Refund Policy</h1>
            <p className="text-white/70 text-base">Thank you for choosing Etthos</p>
          </div>
        </section>

        {/* Content - Single Paper Document */}
        <section className="py-12 md:py-20 bg-surface-soft">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <article className="bg-surface-card p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-surface-contrast/5">
              
              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">1.</span>Our Commitment
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We truly appreciate the opportunity to serve you and are committed to delivering the highest standard of service in everything we do. If for any reason you are not fully satisfied with our service, we&apos;re here to help.
                </p>
              </section>

              {/* Section 2 - Refund Policy */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">2.</span>Refund Policy
                </h2>
                
                {/* Warning Box */}
                <div className="bg-brand-amber/10 border-l-4 border-brand-amber p-6 rounded-r-xl mb-8">
                  <p className="font-bold text-brand-amber mb-4 text-lg">⚠️ Important Notice</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-brand-amber mt-2 flex-shrink-0"></span>
                      <span><strong className="text-text-high">All sales are final:</strong> Once customers make a purchase, they will not be able to return that item for a replacement or refund.</span>
                    </li>
                    <li className="flex items-start gap-3 text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-brand-amber mt-2 flex-shrink-0"></span>
                      <span><strong className="text-text-high">No cash refunds:</strong> No monetary refunds will be given for any reason, though alternative refunds may be offered, such as store credit or exchanges.</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-text-muted leading-relaxed">
                  Refunds will be considered only in accordance with the specific cancellation and refund policies mentioned on the course or service detail pages. Once services have commenced or materials have been accessed, refunds may not be applicable.
                </p>
              </section>

              {/* Section 3 - Contact */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">3.</span>Customer Support
                </h2>
                <div className="bg-surface-soft p-6 rounded-xl border border-surface-contrast/10 space-y-4">
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan text-xl">📞</span>
                    <span><strong className="text-text-high">Phone:</strong> <a href="tel:+917261028965" className="text-brand-cyan hover:underline">+91 72610 28965</a></span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan text-xl">📧</span>
                    <span><strong className="text-text-high">Email:</strong> <a href="mailto:info@etthos.com" className="text-brand-cyan hover:underline">info@etthos.com</a></span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan text-xl">🕐</span>
                    <span><strong className="text-text-high">Available:</strong> Monday to Saturday, 09:00 AM – 8:00 PM</span>
                  </p>
                </div>
              </section>

            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
