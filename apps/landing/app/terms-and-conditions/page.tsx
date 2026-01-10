"use client";

import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const TermsPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms & Conditions</h1>
            <p className="text-white/70 text-base">Effective Date: 1st July 2025</p>
          </div>
        </section>

        {/* Content - Single Paper Document */}
        <section className="py-12 md:py-20 bg-surface-soft">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <article className="bg-surface-card p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-surface-contrast/5">
              
              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">1.</span>Acceptance of Terms
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Your access to and use of our platform signifies your understanding and agreement to these terms and to our Privacy Policy. If you do not agree with any part of these terms, you are advised not to access or use our services.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">2.</span>Eligibility
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Our services are intended for individuals who are eighteen years of age or older. By using our website, you represent that you meet this eligibility requirement and have the legal capacity to enter into this agreement.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">3.</span>Intellectual Property Rights
                </h2>
                <p className="text-text-muted leading-relaxed">
                  All content including text, graphics, program materials, video content, course modules, research frameworks, logos, and branding elements are the exclusive property of Etthos Institute of Behavioral Research and Training Pvt Ltd. All rights are reserved under applicable intellectual property laws.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">4.</span>Scope of Services
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Etthos Institute provides psychological research, behavioral training, mental health awareness programs, faculty development workshops, and consultancy services. These services are designed for educational, developmental, research, and skill-building purposes only and are not a replacement for clinical diagnosis or medical treatment unless explicitly stated.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">5.</span>Payment and Refund Policy
                </h2>
                <p className="text-text-muted leading-relaxed">
                  All fees for services, training modules, and consultations must be paid in full prior to access unless otherwise agreed in writing. Refund requests will be handled according to our Refund Policy.
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">6.</span>Limitation of Liability
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Etthos Institute shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to the use of our services, website, or any associated content.
                </p>
              </section>

              {/* Section 7 - Contact */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">7.</span>Contact Us
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  For any questions, concerns, or clarifications regarding these Terms and Conditions, you may contact us through:
                </p>
                <div className="bg-surface-soft p-6 rounded-xl border border-surface-contrast/10 space-y-3">
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📧</span>
                    <span><strong className="text-text-high">Email:</strong> info@etthos.com</span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📞</span>
                    <span><strong className="text-text-high">Phone:</strong> +91 72610 28965</span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📍</span>
                    <span><strong className="text-text-high">Address:</strong> A/107, Sardar Patel Nagar, Mahuli, Patna, Bihar, 804453</span>
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

export default TermsPage;
