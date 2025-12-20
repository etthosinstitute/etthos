import React from "react";
import { ProgramCard } from "@repo/ui/program-card";

const programs = [
  {
    title: "Clinical Counselling",
    description: "Evidence-based therapy training for individuals and groups. Master CBT, DBT, and person-centered approaches through rigorous coursework.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaRWNS-4Sd9zquFCJA1wlvuIaL6vJ_o8fHUVowcBY1NHQUqT4EZ2NoZaMfREIkK47Wk49NjhQ8jPWKdOBzPLJYOA0sQSkDsuKpVV43AEgHecEL8l4u-l1FHmxTz4Ls94o04NzwkJiqCkgkGyv46WMilbpX2Z7w4AielKH8TOFr1374sYnp0atEjqo1ICuVPtw0xFMIr6xhOBnJp98ixniJpgtUsQDw7GGWdqZCv0FRZEXLlSZzzn33Z1-cHXs1UfCPwouZt2OarZ8",
    icon: "🧘",
    buttonText: "Learn More",
  },
  {
    title: "Professional Certification",
    description: "RCI-recognized certification programs. Get certified in child psychology, clinical assessments, and neuro-psychology.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBImdRkIKmSToN18ZdX0LEg1tS0hQoJHd5mdg7oJcKYNnxUterzJ0UnjCl71_urGkdGzSsnyBeYkSbND2JITSVv5ghQZ1pfYppPoEZGiS7e7Cc0fOa121yfStyTMVAH64bx5BXGjVY973OxJeKbbs8B3RDF_NvhKoJnH_IZCjMkgGioiqNulmbFi_t-MBdjh9_XMD1H0az_5SrWzr_L9TSUrpB0bSiddHcmG2ejYGK9l4QzyzCFxTjuEzwpvBkEVfqdRjPyqjEjUC8",
    icon: "🎓",
    buttonText: "Explore Courses",
  },
  {
    title: "Research & Publication",
    description: "Contributing to the future of mental health science. Join our advanced labs and publish in top-tier peer-reviewed journals.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9EqHfDdt55Y3sWpYDBBkGO6hsKoPhE3Y4Ew5pbpAWU6ZtTqhSmFrssBreYFM4SypDm70Az_reePSK6YF5tT3MBAFg2m_p3DdoManzVonJZe-3I7ZkzFSd97hUct2HJgk_jQZbC1ID-E4lpFh542PEt1ifV1CFwyw5FGcL_vbA8uzqZiIYJCZ7bHdsFDrPQYWXpFWGWsJ0VzAHZWgEjQKIUIL2vdgimmZ8V0FABHxZRBAN76ICn9gCNh7oRnkSAyem8ddWRQNP9No",
    icon: "🔬",
    buttonText: "View Publications",
  },
];

export const Programs = () => {
  return (
    <section className="relative bg-surface-base py-24 transition-colors" id="programs">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 text-text-high md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-text-muted">
              Academic Excellence
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Programs engineered for real clinical impact.
            </h2>
            <p className="text-lg text-text-muted">
              Build a portfolio of research, therapy simulations, and supervised practice with mentors licensed across India.
            </p>
          </div>
          <a
            className="hidden md:flex items-center gap-2 text-brand-cyan font-semibold hover:text-brand-amber transition-colors"
            href="#all-programs"
          >
            View All Programs <span className="text-base">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              title={program.title}
              description={program.description}
              imageUrl={program.imageUrl}
              icon={<span className="text-2xl">{program.icon}</span>}
              buttonText={program.buttonText}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a
            className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:text-brand-amber transition-colors"
            href="#all-programs"
          >
            View All Programs <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
