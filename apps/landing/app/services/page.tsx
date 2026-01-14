import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProgramCard } from "@repo/ui/program-card";

const services = [
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

const ServicesPage = () => {
  return (
    <div className="bg-surface-base text-text-high font-display overflow-x-hidden antialiased transition-colors">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section - Matches About page style */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-brand-midnight text-white">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 right-0 w-150 h-150 bg-brand-cyan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-iris/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold">
              Our Expertise
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Services & Programs for <span className="text-brand-cyan">Real Impact</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
              Comprehensive ecosystem for mental health education, counselling, research, and organizational consulting.
            </p>
          </div>
        </section>

        {/* Services Grid - Matches Programs section design */}
        <section className="relative py-24 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight" aria-hidden />
          <div className="relative mx-auto max-w-[1440px] px-4 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Link key={index} href={service.href} className="block group">
                  <ProgramCard
                    title={service.title}
                    description={service.description}
                    imageUrl={service.imageUrl}
                    icon={<span className="text-2xl">{service.icon}</span>}
                    buttonText={service.buttonText}
                    objectPosition={service.objectPosition}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Clean and consistent */}
        <section className="py-24 bg-brand-midnight text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-brand-cyan/30 rounded-full blur-3xl translate-y-1/2" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Ready to get started?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Connect with our team to explore how Etthos can support your growth journey.
            </p>
            <a 
              href="https://wa.me/+917261028965" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-cyan text-brand-midnight font-bold rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-lg shadow-brand-cyan/20"
            >
              Consult With Our Experts
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
