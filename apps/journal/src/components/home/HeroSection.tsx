import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Globe, Shield } from "lucide-react";
import { HERO_CONFIG } from "@/features/public-site/static-config";
import { getHomeContent, getLatestPublishedIssue } from "@/features/public-site/queries";

const iconMap = {
  "book-open": BookOpen,
  brain: Brain,
  globe: Globe,
  shield: Shield,
} as const;

export async function HeroSection() {
  const [{ content }, latestIssue] = await Promise.all([
    getHomeContent(),
    getLatestPublishedIssue(),
  ]);

  const heroTitleLineOne = HERO_CONFIG.titleLineOne;
  const heroTitleLineTwo = HERO_CONFIG.titleLineTwo;

  const heroNotice = latestIssue
    ? `${content.heroNotice} — Volume ${latestIssue.volume}, Issue ${latestIssue.issue}`
    : content.heroNotice;

  return (
    <section className="relative overflow-hidden border-b border-border bg-[#132238] py-20 text-[#f7f3ec] md:py-32">
      <div className="absolute inset-0 opacity-100">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(19,34,56,1) 0%, rgba(22,45,70,0.98) 52%, rgba(31,95,91,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(184,138,68,0.18), transparent 24%), radial-gradient(circle at 80% 16%, rgba(67,100,247,0.12), transparent 26%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 48px 48px, 48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_42%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(6,12,24,0.45),transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-1.5 text-sm font-medium text-[#f7f3ec]/88 animate-fade-in-up backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--highlight))] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--highlight))]"></span>
          </span>
          {heroNotice}
        </div>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f7f3ec]/62 animate-fade-in-up delay-100">
          {content.eyebrow}
        </p>
        <h1 className="mx-auto mb-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-tight text-[#f7f3ec] drop-shadow-[0_10px_30px_rgba(8,15,28,0.55)] animate-fade-in-up delay-100 md:text-7xl">
          <span className="block">{heroTitleLineOne}</span>
          <span className="mt-1 block text-[0.58em] leading-[1.02] md:mt-2 md:text-[0.54em]">
            {heroTitleLineTwo}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-[#f7f3ec]/80 animate-fade-in-up delay-200 md:text-xl">
          {content.heroDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base bg-[#f7f3ec] text-[#132238] hover:bg-white shadow-[0_20px_40px_-24px_rgba(247,243,236,0.6)]">
            <Link href="/submit">
              Submit Your Manuscript
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8 text-base border border-white/22 bg-white/7 text-[#f7f3ec] hover:bg-white/12 hover:text-[#f7f3ec] backdrop-blur-sm">
            <Link href="/issues">
              Browse Issues
            </Link>
            </Button>
        </div>

        <div className="mx-auto mt-18 max-w-5xl border-t border-white/14 pt-10">
          <div className="mb-8 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.26em] text-[#f7f3ec]/52">
            <span className="h-px w-10 bg-white/16" />
            Journal Profile
            <span className="h-px w-10 bg-white/16" />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {content.profileCards.map((card) => {
              const Icon = iconMap[card.icon];

              return (
                <div key={`${card.title}-${card.subtitle}`} className="rounded-[1.55rem] border border-white/10 bg-white/8 px-4 py-6 text-center text-[#f7f3ec] shadow-[0_22px_55px_-40px_rgba(8,15,28,0.7)] backdrop-blur-md">
                  <div className="bg-white/8 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-[hsl(var(--highlight))]" />
                  </div>
                  <div className="font-serif font-semibold text-xl mb-1">{card.title}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7f3ec]/58">{card.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
