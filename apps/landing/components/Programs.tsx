import React from "react";
import Link from "next/link";
import { ProgramCard } from "@repo/ui/program-card";

const programs = [
  {
    title: "Counselling",
    description: "Protect Your Peace, Emotionally. Evidence-based psychological care under RCI Licensed Clinical Psychologists for individuals and organizations.",
    imageUrl: "/program-images/counselling.png",
    icon: "💚",
    buttonText: "Learn More",
    href: "/counselling",
    objectPosition: "top",
  },
  {
    title: "Training",
    description: "Globally Recognized. Professional certifications, internships, and diplomas bridging academic theory and clinical practice.",
    imageUrl: "/program-images/training.png",
    icon: "🎓",
    buttonText: "Learn More",
    href: "/training",
  },
  {
    title: "Research",
    description: "Meeting Global Research Standards. Driving real-world impact through psychology and behavioral science research.",
    imageUrl: "/program-images/research.png",
    icon: "🔬",
    buttonText: "Learn More",
    href: "/research",
  },
  {
    title: "Consulting",
    description: "Managing Human Behaviour. Customized consultation services for corporates, institutions, NGOs, and startups.",
    imageUrl: "/program-images/consulting.png",
    icon: "🤝",
    buttonText: "Learn More",
    href: "/consulting",
  },
];

export const Programs = () => {
  return (
    <section className="relative bg-surface-base py-24 transition-colors" id="services">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 text-text-high md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-text-muted">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Services & Programs for Real Impact.
            </h2>
            <p className="text-lg text-text-muted">
              Comprehensive ecosystem for mental health education, counselling, research, and organizational consulting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Link key={index} href={program.href} className="block group">
              <ProgramCard
                title={program.title}
                description={program.description}
                imageUrl={program.imageUrl}
                icon={<span className="text-2xl">{program.icon}</span>}
                buttonText={program.buttonText}
                objectPosition={program.objectPosition}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
