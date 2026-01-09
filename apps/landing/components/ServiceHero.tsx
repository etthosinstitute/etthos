import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  highlightedWord: string;
  description: string;
  badge: string;
  badgeIcon: React.ReactNode;
  backLink: string;
  backText: string;
}

export const ServiceHero = ({
  title,
  highlightedWord,
  description,
  badge,
  badgeIcon,
  backLink,
  backText,
}: ServiceHeroProps) => {
  return (
    <section className="relative bg-surface-base py-20 lg:py-28 transition-colors overflow-hidden">
      {/* Background Gradients - matching landing page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-200 h-200 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-iris/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {backText}
        </Link>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-6">
            {badgeIcon}
            {badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-high mb-6">
            {title}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-cobalt">
              {highlightedWord}
            </span>
          </h1>

          <p className="text-lg text-text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
