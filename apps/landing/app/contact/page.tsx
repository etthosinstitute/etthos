"use client";

import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    comment: "",
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const offices = [
    {
      title: "Bihar Office",
      address: "Parsa - Punpun Highway, Mahuli, Patna, Bihar, 804453",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.5!2d85.1!3d25.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzAwLjAiTiA4NcKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
      icon: "📍",
    },
    {
      title: "Delhi Office",
      address: "D - Mohan Garden, Dwarka Mor, Uttam Nagar, New Delhi, 110059",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.05!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzM2LjAiTiA3N8KwMDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
      icon: "📍",
    },
  ];

  return (
    <div className="bg-surface-base dark:bg-[#050a18] text-text-high font-display overflow-x-hidden antialiased transition-colors">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-ink to-brand-midnight dark:from-[#020510] dark:via-[#0a0f1e] dark:to-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-iris/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-brand-amber/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10 text-center">
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/20 border border-brand-cyan/30 backdrop-blur-sm">
              <span className="text-brand-cyan text-sm font-semibold tracking-wider uppercase">
                Let&apos;s Connect
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
              Get in <span className="text-brand-cyan">Touch</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 dark:text-slate-400 font-medium leading-relaxed">
              Connect with us to explore how Etthos can support your journey in
              psychology, research, and mental health.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="relative -mt-16 pb-12 z-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-10">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Email Card */}
              <div className="group relative bg-white dark:bg-[#0f1a32] p-8 rounded-3xl border border-slate-200 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent dark:from-brand-cyan/10 dark:to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-cyan/70 text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@etthos.com"
                    className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors block"
                  >
                    info@etthos.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative bg-white dark:bg-[#0f1a32] p-8 rounded-3xl border border-slate-200 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-iris/5 to-transparent dark:from-brand-iris/10 dark:to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-iris to-brand-iris/70 text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                    Call Us
                  </h3>
                  <a
                    href="tel:+917261028965"
                    className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-iris dark:hover:text-brand-iris transition-colors block"
                  >
                    +91 - 72610 28965
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="group relative bg-white dark:bg-[#0f1a32] p-8 rounded-3xl border border-slate-200 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent dark:from-green-500/10 dark:to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/+917261028965"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-slate-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors block"
                  >
                    Chat with us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-surface-base dark:bg-[#050a18]">
          <div className="mx-auto max-w-[1200px] px-4 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
                Send us a <span className="text-brand-cyan">Message</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="relative bg-white dark:bg-[#0a0f1e] p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-iris/5 dark:from-brand-cyan/10 dark:via-transparent dark:to-brand-iris/10 rounded-[2.5rem] opacity-50" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-[#050a18] rounded-2xl border border-slate-200 dark:border-white/20">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 rounded-lg border-2 border-slate-300 dark:border-white/30 text-brand-cyan focus:ring-brand-cyan focus:ring-2"
                  />
                  <label
                    htmlFor="agreedToTerms"
                    className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    By submitting this form, I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      className="text-brand-cyan hover:underline font-semibold"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="text-brand-cyan hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-brand-cyan to-brand-cyan/80 hover:from-brand-cyan/90 hover:to-brand-cyan text-white font-bold py-5 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-iris to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Offices Section */}
        <section className="py-24 bg-gradient-to-b from-surface-soft to-surface-base dark:from-[#0a0f1e] dark:to-[#050a18]">
          <div className="mx-auto max-w-[1440px] px-4 md:px-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/20 border border-brand-cyan/30">
                <span className="text-brand-cyan text-sm font-semibold tracking-wider uppercase">
                  Visit Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                Our <span className="text-brand-cyan">Offices</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Find us at our locations across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-brand-midnight rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-brand-iris/5 dark:from-brand-cyan/10 dark:via-transparent dark:to-brand-iris/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative p-8 bg-white dark:bg-brand-ink/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-cyan/70 text-white text-2xl shadow-lg">
                        {office.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {office.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                      {office.address}
                    </p>
                  </div>
                  
                  <div className="relative h-80 w-full overflow-hidden">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale-[50%] hover:grayscale-0 transition-all duration-700 brightness-90 dark:brightness-75 hover:brightness-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

