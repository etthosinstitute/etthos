import { BookOpen, Brain, Globe, Shield } from "lucide-react";
import { getHomeContent } from "@/features/public-site/queries";

const iconMap = {
  "book-open": BookOpen,
  brain: Brain,
  globe: Globe,
  shield: Shield,
} as const;

export async function JournalFeatures() {
  const { content } = await getHomeContent();

  return (
    <section className="border-y border-border bg-[hsl(var(--paper)/0.56)] py-22">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <p className="mb-3 journal-kicker">Editorial Standards</p>
          <h2 className="mb-3 font-serif text-4xl font-semibold text-primary">
            Why Publish With Us
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-7 text-muted-foreground">
            {content.heroDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature) => {
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={`${feature.eyebrow}-${feature.title}`}
                className="group journal-panel relative overflow-hidden p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-[hsl(var(--highlight)/0.72)]" />
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary ring-1 ring-secondary/15 transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {feature.eyebrow}
                </p>
                <h3 className="mb-3 font-serif text-2xl font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="mx-auto max-w-xs text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
