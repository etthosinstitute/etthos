import React from "react";
import Image from "next/image";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button-v2";
import { AvatarGroup } from "@repo/ui/avatar";

export const Hero = () => {
  const avatars = [
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChh9MOeccfkiSRUFVRZCJDCuTpJLBhc_LCMBm34hVE53xOgc0jK4-HLYL7S9_kY3WyjnOnvkJSIap7SKApsLkH_U2PPNmrpgZdMSuNq3KkbjFy8kW86QHgQsGXhck45dm24n6xUS2dGfzrJ2wt5ap-b17V1cRObOUee1VOpeH3IQr_2VtP8rKq3t4EXgspUNQnJB6ZgR6NjzPJMiZ7trdceELr85Ral2y8LFDIdq5dyNVLQskiUArsWk7HVg6izNyv3lx1xI2yIcY",
      alt: "Student 1",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt-lyF6Qdnffb8l8wUZFl1-qPC1GAgf-CM7_-8a7aqguZggEu2cpxv-IE5YGlPRCBeOUIgAx4y2qrpFrokPKPFT-NuIJp2qw3ortCCxePZb8n94bcYLPy0VZJ8I2ED1jn7c2a5cr34O1eQMqLdqUu7wyKyHrinuvYQBjRAXF48IsoyBMn9fYjx6T0utTAgFxacF8tWSZlK2IW_olCpamDNpq0GYBQ3c5oSl7AsgSFvpPrednH7c29mM4YySIKahvxHGmfsua_qF1Y",
      alt: "Student 2",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN1oGJojg0tqVhSXPYd_B9NQ4FQPTkDqVdd8FB33iUQOIYm9LLG6krx6_ElIrekVDZ1h6teLy_ozjmI-RXQGbXu9KKUcfjO1HqRC6P6qqX9mE5BDuRCmEbCDSlDHF_xqEkirM652k8aC4UOnyWYFi_AUyV15pK5siTNrE4eXU41rRtMLybWlahdMHoTZYbiITgbmAhwaFbzpVQsiwblfUQARmxnuf55vD-EQyZTvk5TXzBJf6IhUACH4fGyKD1oy4AY4B7bE6Detc",
      alt: "Student 3",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white/95 to-surface-base py-20 transition-colors lg:py-28 dark:bg-hero-mesh dark:from-brand-ink dark:via-brand-ink dark:to-brand-midnight">
      <div className="pointer-events-none absolute inset-0 opacity-40 hidden dark:block" aria-hidden>
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-brand-cyan blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-rose blur-[160px]" />
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10 text-text-high">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 max-w-xl order-2 lg:order-1">
            <div className="flex items-center gap-2 font-bold tracking-wide uppercase text-xs text-brand-midnight dark:text-text-high">
              <Badge>New Batch 2024</Badge>
              <Badge variant="success">RCI Approved</Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Psychology with <span className="text-brand-cyan">Purpose</span>.
            </h1>
            
            <p className="text-lg font-medium leading-relaxed text-[#1b2234] dark:text-white">
              The premier institute for modern psychology. We bridge the gap between academic theory and real-world clinical practice with RCI-licensed experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button variant="primary" size="lg">
                Start Your Journey
              </Button>
              <Button variant="secondary" size="lg">
                View Curriculum
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 border-t border-slate-200 pt-8 dark:border-white/10">
              <AvatarGroup avatars={avatars} max={4} />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-text-high">Join our alumni network</span>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <span className="text-brand-amber">◆</span>
                  <span>Top Clinic Placements</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative order-1 h-full min-h-[400px] w-full lg:order-2 lg:min-h-[600px]">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-glow transition-colors dark:border-white/10 dark:bg-surface-card">
              <Image
                alt="Modern counseling office"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaRWNS-4Sd9zquFCJA1wlvuIaL6vJ_o8fHUVowcBY1NHQUqT4EZ2NoZaMfREIkK47Wk49NjhQ8jPWKdOBzPLJYOA0sQSkDsuKpVV43AEgHecEL8l4u-l1FHmxTz4Ls94o04NzwkJiqCkgkGyv46WMilbpX2Z7w4AielKH8TOFr1374sYnp0atEjqo1ICuVPtw0xFMIr6xhOBnJp98ixniJpgtUsQDw7GGWdqZCv0FRZEXLlSZzzn33Z1-cHXs1UfCPwouZt2OarZ8"
                fill
                className="object-cover opacity-95"
              />
              <div className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-slate-200 bg-white p-4 shadow-card backdrop-blur-lg dark:border-white/10 dark:bg-surface-card/90">
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand-cyan"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-midnight/70 dark:text-text-muted">Live Session</span>
                </div>
                <p className="text-sm font-semibold text-brand-midnight dark:text-text-high">
                  "Experience clinical training in state-of-the-art simulation labs."
                </p>
              </div>
            </div>
            <div className="absolute -right-10 top-10 hidden h-full w-full rounded-3xl border border-white/40 bg-white/40 dark:border-white/5 dark:bg-white/5 lg:block -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
