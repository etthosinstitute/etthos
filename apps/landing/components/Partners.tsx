import React from "react";

interface PartnerItem {
  icon: string;
  name: string;
}

const partners: PartnerItem[] = [
  { icon: "🏛️", name: "UnivPsych" },
  { icon: "✓", name: "RCI Licensed" },
  { icon: "🏥", name: "City Hospital" },
  { icon: "🧠", name: "MindCare" },
  { icon: "🎓", name: "EduTrust" },
];

export const Partners = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/70 bg-surface-card py-12 transition-colors dark:border-white/5 dark:bg-surface-soft">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/10 to-transparent dark:from-brand-ink/40" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-10">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.4em] text-text-muted dark:text-text-muted">
          Accredited & Trusted By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 text-text-high md:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex cursor-default items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 transition-colors hover:border-brand-cyan/40 dark:border-white/10"
            >
              <span className="text-2xl text-brand-cyan transition-colors group-hover:text-brand-amber">
                {partner.icon}
              </span>
              <span className="text-base font-semibold text-text-high dark:text-text-high">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
