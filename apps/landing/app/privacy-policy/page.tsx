"use client";

import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const PrivacyPolicyPage = () => {
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
            <p className="text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/70 text-base">
              Effective Date: 1st July 2025
            </p>
          </div>
        </section>

        {/* Content - Single Paper Document */}
        <section className="py-12 md:py-20 bg-surface-soft">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <article className="bg-surface-card p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-surface-contrast/5">
              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">1.</span>Information We
                  Collect
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  We may collect personal and non-personal information through
                  various channels including but not limited to online
                  registrations, course enrollments, research participation,
                  surveys, or direct communication.
                </p>
                <ul className="space-y-4 ml-1">
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Full name
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Contact information including email address and phone number
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Professional or academic background
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Billing and payment details (handled securely via
                    third-party gateways)
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    IP address, browser type, and access time (via cookies and
                    analytics tools)
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">2.</span>Purpose of
                  Data Collection
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  Your personal data is collected to:
                </p>
                <ul className="space-y-4 ml-1">
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Register and manage participation in our programs or
                    research initiatives
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Provide access to psychological training, workshops, and
                    consultancy services
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Customize your experience and recommend relevant offerings
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                    Analyze user behavior to improve website functionality
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">3.</span>Consent and
                  User Rights
                </h2>
                <p className="text-text-muted leading-relaxed">
                  By using our platform or submitting personal information, you
                  consent to the collection and use of your data as outlined in
                  this policy. You have the right to access the data we hold
                  about you, request correction or deletion, and withdraw
                  consent at any time.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">4.</span>Data Storage
                  and Security
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We implement industry-standard measures to protect your
                  personal information from unauthorized access, disclosure,
                  alteration, or destruction. Data is stored on secure servers,
                  and any financial transactions are processed through certified
                  payment gateways with encryption protocols.
                </p>
              </section>

              {/* Section 5 - Contact */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-text-high mb-6 pb-3 border-b border-surface-contrast/10">
                  <span className="text-brand-cyan mr-2">5.</span>Contact Us
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  For questions, concerns, or requests related to your privacy
                  or personal data, please contact us at:
                </p>
                <div className="bg-surface-soft p-6 rounded-xl border border-surface-contrast/10 space-y-3">
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📧</span>
                    <span>
                      <strong className="text-text-high">Email:</strong>{" "}
                      info@etthos.com
                    </span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📞</span>
                    <span>
                      <strong className="text-text-high">Phone:</strong> +91
                      72610 28965
                    </span>
                  </p>
                  <p className="text-text-muted flex items-center gap-3">
                    <span className="text-brand-cyan">📍</span>
                    <span>
                      <strong className="text-text-high">Address:</strong>{" "}
                      A/107, Sardar Patel Nagar, Mahuli, Patna, Bihar, 804453
                    </span>
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

export default PrivacyPolicyPage;
