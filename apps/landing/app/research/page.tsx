import React from "react";
import { Header } from "../../components/Header";

// Force static generation for optimal Vercel deployment
export const dynamic = 'force-static';
import { Footer } from "../../components/Footer";
import { ServiceHero } from "../../components/ServiceHero";
import { ServiceCard } from "../../components/ServiceCard";
import { ServiceCTA } from "../../components/ServiceCTA";
import { researchServices } from "../../lib/research-services";
import { FlaskConical } from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "community-research": <span className="text-2xl">👥</span>,
  "health-based-research": <span className="text-2xl">🏥</span>,
  "research-support": <span className="text-2xl">📝</span>,
  "statistical-support": <span className="text-2xl">📊</span>,
  "guide-and-synopsis-support": <span className="text-2xl">📚</span>,
  "research-journal": <span className="text-2xl">📰</span>,
  "research-conferences": <span className="text-2xl">🎤</span>,
};

const ResearchPage = () => {
  return (
    <div className="bg-surface-base text-text-high font-display min-h-screen transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />

        <main className="w-full">
          <ServiceHero
            title="Behavioral Science"
            highlightedWord="Research"
            description="Driving real-world impact through psychology and behavioral science research. Expert services for individuals, institutions, and government agencies."
            badge="Meeting Global Standards"
            badgeIcon={<FlaskConical className="w-4 h-4" />}
            backLink="/"
            backText="Back to Home"
          />

          {/* Services Grid */}
          <section className="relative bg-surface-base py-20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight" aria-hidden />
            
            <div className="relative container mx-auto px-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {researchServices.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    title={service.title}
                    description={service.shortDescription}
                    icon={serviceIcons[service.slug]}
                    features={service.services}
                    href={`/research/${service.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <ServiceCTA
            title="Ready to Advance Your Research?"
            description="Partner with our research experts for methodology guidance, statistical support, and publication assistance."
            primaryButtonText="Get Research Support"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ResearchPage;
