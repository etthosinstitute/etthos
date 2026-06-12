import React from "react";
import { Header } from "../../components/Header";

// Force static generation for optimal Vercel deployment
export const dynamic = "force-static";
import { Footer } from "../../components/Footer";
import { ServiceHero } from "../../components/ServiceHero";
import { ServiceCard } from "../../components/ServiceCard";
import { ServiceCTA } from "../../components/ServiceCTA";
import { counsellingServices } from "../../lib/counselling-services";
import { Heart } from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "on-call-text-in-person": <span className="text-2xl">📞</span>,
  "health-based-counselling": <span className="text-2xl">🏥</span>,
  "corporate-counselling-plan": <span className="text-2xl">🏢</span>,
  "psychological-assessments": <span className="text-2xl">📋</span>,
};

const CounsellingPage = () => {
  return (
    <div className="bg-surface-base text-text-high font-display min-h-screen transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />

        <main className="w-full">
          <ServiceHero
            title="Professional"
            highlightedWord="Counselling"
            description="Ethical, evidence-based psychological care under the supervision of RCI Licensed Clinical Psychologists. Support for individuals, professionals, and organizations."
            badge="Protect Your Peace"
            badgeIcon={<Heart className="w-4 h-4" />}
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
              <div className="grid gap-8 md:grid-cols-2">
                {counsellingServices.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    title={service.title}
                    description={service.shortDescription}
                    icon={serviceIcons[service.slug]}
                    features={service.services}
                    href={`/counselling/${service.slug}`}
                    badge={service.deliveryMode}
                  />
                ))}
              </div>
            </div>
          </section>

          <ServiceCTA
            title="Ready to Start Your Healing Journey?"
            description="Connect with our RCI Licensed Clinical Psychologists for personalized support."
            primaryButtonText="Book a Session"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CounsellingPage;
