import React from "react";
import { Header } from "../../components/Header";

// Force static generation for optimal Vercel deployment
export const dynamic = "force-static";
import { Footer } from "../../components/Footer";
import { ServiceHero } from "../../components/ServiceHero";
import { ServiceCard } from "../../components/ServiceCard";
import { ServiceCTA } from "../../components/ServiceCTA";
import { consultingServices } from "../../lib/consulting-services";
import { Briefcase } from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "employees-wellness-program": <span className="text-2xl">💚</span>,
  "corporate-training-program": <span className="text-2xl">🎓</span>,
  "manager-training-program": <span className="text-2xl">👔</span>,
  "posh-training": <span className="text-2xl">🛡️</span>,
  "teacher-training-program": <span className="text-2xl">📖</span>,
  "business-consultations": <span className="text-2xl">🏢</span>,
  "product-consultation": <span className="text-2xl">📦</span>,
  "market-research-support": <span className="text-2xl">📈</span>,
  "career-counselling": <span className="text-2xl">🧭</span>,
};

const ConsultingPage = () => {
  return (
    <div className="bg-surface-base text-text-high font-display min-h-screen transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />

        <main className="w-full">
          <ServiceHero
            title="Psychological"
            highlightedWord="Consulting"
            description="Customized consultation services for corporates, educational institutions, NGOs, startups, and social organizations grounded in psychological science."
            badge="Managing Human Behaviour"
            badgeIcon={<Briefcase className="w-4 h-4" />}
            backLink="/"
            backText="Back to Home"
          />

          {/* Services Grid */}
          <section className="relative bg-surface-base py-20 transition-colors">
            <div
              className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight"
              aria-hidden
            />

            <div className="relative container mx-auto px-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {consultingServices.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    title={service.title}
                    description={service.shortDescription}
                    icon={serviceIcons[service.slug]}
                    features={service.services}
                    href={`/consulting/${service.slug}`}
                    badge={service.deliveryMode}
                  />
                ))}
              </div>
            </div>
          </section>

          <ServiceCTA
            title="Transform Your Organization"
            description="Partner with our behavioral science experts to build psychologically healthy and high-performing teams."
            primaryButtonText="Get a Quote"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ConsultingPage;
