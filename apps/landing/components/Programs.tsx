import React from "react";
import { ProgramCard } from "@repo/ui/program-card";

const programs = [
  {
    title: "Clinical Counselling",
    description: "Evidence-based therapy training for individuals and groups. Master CBT, DBT, and person-centered approaches through rigorous coursework.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    icon: "🧘",
    buttonText: "Learn More",
  },
  {
    title: "Professional Certification",
    description: "RCI-recognized certification programs. Get certified in child psychology, clinical assessments, and neuro-psychology.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2669&auto=format&fit=crop",
    icon: "🎓",
    buttonText: "Explore Courses",
  },
  {
    title: "Research & Publication",
    description: "Contributing to the future of mental health science. Join our advanced labs and publish in top-tier peer-reviewed journals.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop",
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
