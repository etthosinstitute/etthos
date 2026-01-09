import React from "react";
import { MessageCircle, Mail } from "lucide-react";

interface ServiceCTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  whatsappNumber?: string;
  email?: string;
}

export const ServiceCTA = ({
  title,
  description,
  primaryButtonText,
  whatsappNumber = "+917261028965",
  email = "info@etthos.com",
}: ServiceCTAProps) => {
  return (
    <section className="py-24 bg-surface-soft dark:bg-brand-ink/20 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold">
          Get Started
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-high mb-6">
          {title}
        </h2>
        <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan hover:bg-brand-cobalt text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5" />
            {primaryButtonText}
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-text-high font-semibold rounded-xl transition-all duration-300 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
};
