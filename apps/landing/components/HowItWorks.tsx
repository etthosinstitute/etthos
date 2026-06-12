import React from "react";

const steps = [
  {
    number: "01",
    title: "Counseling & Wellness",
    description:
      "Personalized therapy sessions to protect your emotional peace.",
    icon: "🧠",
  },
  {
    number: "02",
    title: "Education & Certification",
    description:
      "Globally recognized training programs for aspiring psychologists.",
    icon: "📚",
  },
  {
    number: "03",
    title: "Self-Help & Healing",
    description: "Resources and tools for continuous personal growth.",
    icon: "🌱",
  },
  {
    number: "04",
    title: "Consulting & Management",
    description: "Behavioral solutions for organizations and institutions.",
    icon: "🤝",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-surface-soft dark:bg-brand-ink/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-high mb-4">
            How Etthos Works
          </h2>
          <p className="text-lg text-text-muted">
            A comprehensive ecosystem for mental health and professional
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="w-24 h-24 mx-auto bg-surface-base rounded-full border-4 border-surface-soft dark:border-brand-ink flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-white text-xs font-bold">
                  {step.number}
                </div>
              </div>

              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-text-high mb-3 group-hover:text-brand-cyan transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
