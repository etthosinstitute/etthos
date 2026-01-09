import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <section className="relative overflow-hidden bg-surface-base py-20 transition-colors lg:py-28">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-200 h-200 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-iris/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-360 mx-auto px-4 md:px-10 text-text-high">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 max-w-xl order-2 lg:order-1 pt-10 lg:pt-0">
            <div className="flex items-center gap-2 font-bold tracking-wide uppercase text-xs text-brand-midnight dark:text-text-high">
              <Badge className="bg-brand-iris/10 text-brand-iris border-brand-iris/20 backdrop-blur-sm">New Batch 2026</Badge>
              <Badge variant="success" className="shadow-sm">Inclined with RCI Framework</Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Psychology with <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-cobalt">Purpose</span>.
            </h1>
            
            <p className="text-lg font-medium leading-relaxed text-[#1b2234] dark:text-white/80">
              The premier institute for modern psychology. We bridge the gap between academic theory and real-world clinical practice with RCI-licensed experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="#programs">
                <Button variant="primary" size="lg" className="shadow-lg shadow-brand-cobalt/25 hover:shadow-brand-cobalt/40 transition-all">
                  Start Your Journey
                </Button>
              </Link>
              <Link
                href="#programs"
                className="font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan/60 bg-white/50 backdrop-blur-sm text-text-high border border-slate-200 hover:bg-white/80 py-3.5 px-8 text-base dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                View Curriculum
              </Link>
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
          <div className="relative order-1 h-125 lg:h-175 w-full lg:order-2">
             {/* Main Image */}
            <div className="relative h-[90%] w-[90%] ml-auto overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-surface-card rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
              <Image
                alt="Modern counseling office"
                src="/gallery/WhatsApp Image 2025-12-25 at 00.13.12 (1).jpeg"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                 <div className="glass-panel p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white">
                    <p className="font-semibold text-lg">&ldquo;The clinical exposure here is unmatched.&rdquo;</p>
                    <p className="text-sm text-white/80 mt-1">— Dr. Sarah M., Clinical Director</p>
                 </div>
              </div>
            </div>

            {/* Floating Element 1 - Top Left */}
            <div className="absolute top-10 left-0 animate-bounce-slow">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 max-w-45">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                        <span className="text-lg">✓</span>
                     </div>
                     <div className="text-xs font-bold text-slate-900 dark:text-white">Certified</div>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-300 leading-tight">RCI recognized excellence in training</div>
               </div>
            </div>

             {/* Floating Element 2 - Bottom Right (shifted) */}
            <div className="absolute bottom-20 -left-10 lg:left-10 z-20 hidden md:block">
               <div className="bg-white dark:bg-slate-800 p-3 pr-6 rounded-full shadow-glow border border-slate-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                     ★
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-900 dark:text-white">4.9/5 Rating</span>
                     <span className="text-[10px] text-slate-500 dark:text-slate-300">By 100+ Students</span>
                  </div>
               </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};
