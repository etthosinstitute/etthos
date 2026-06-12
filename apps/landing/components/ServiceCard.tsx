import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  href: string;
  badge?: string;
}

export const ServiceCard = ({
  title,
  description,
  icon,
  features,
  href,
  badge,
}: ServiceCardProps) => {
  return (
    <Link
      href={href}
      className="group relative bg-surface-card rounded-2xl border border-slate-200/60 dark:border-white/10 p-6 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      {/* Icon Container - matching HowItWorks pattern but larger */}
      <div className="w-20 h-20 rounded-full bg-surface-base border-4 border-surface-soft dark:border-brand-ink flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-text-high mb-2 group-hover:text-brand-cyan transition-colors">
        {title}
      </h3>

      <p className="text-sm text-text-muted leading-relaxed mb-4">
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="space-y-2 text-sm text-text-muted mb-4">
          {features.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-brand-cyan mt-0.5">✓</span>
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
        {badge && (
          <div className="text-xs font-medium text-text-muted bg-surface-soft dark:bg-brand-ink/30 px-2 py-1 rounded-md">
            {badge}
          </div>
        )}
        <span
          className={`inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan group-hover:gap-3 transition-all ${!badge ? "ml-auto" : ""}`}
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};
