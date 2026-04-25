import React from "react";
import Link from "next/link";
import { Badge } from "@repo/ui/badge";
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
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef5fb_52%,#e8f0fb_100%)] py-20 transition-colors dark:bg-gradient-to-br dark:from-[#050914] dark:via-[#071021] dark:to-[#0a1630] lg:py-28">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
         <div className="absolute top-0 right-0 h-200 w-200 rounded-full bg-brand-cyan/12 blur-3xl -translate-y-1/2 translate-x-1/2 dark:bg-brand-cyan/10" />
         <div className="absolute bottom-0 left-0 h-150 w-150 rounded-full bg-brand-iris/10 blur-3xl translate-y-1/3 -translate-x-1/3 dark:bg-brand-iris/10" />
         <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(5,9,20,0.18),rgba(5,9,20,0))]" />
      </div>

      <div className="relative z-10 w-full max-w-360 mx-auto px-4 text-text-high md:px-10 dark:text-white">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 max-w-xl order-2 lg:order-1 pt-10 lg:pt-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-high dark:text-white">
              <Badge className="border-brand-cobalt/20 bg-brand-cobalt/10 text-brand-cobalt backdrop-blur-sm dark:border-brand-cobalt/20 dark:bg-brand-cobalt/10 dark:text-brand-cobalt">New Batch 2026</Badge>
              <Badge className="border-brand-cyan/15 bg-brand-cyan/8 text-brand-cyan shadow-sm backdrop-blur-sm dark:border-brand-cyan/15 dark:bg-brand-cyan/8 dark:text-brand-cyan">As per latest DSM - 5 - TR and ICD - 11 Norms.</Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Psychology with <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-cobalt">Purpose</span>.
            </h1>
            
            <p className="max-w-xl text-lg font-medium leading-relaxed text-text-muted dark:text-white/78">
              The premier institute for modern psychology. We bridge the gap between academic theory and real-world clinical practice with RCI-licensed experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="#services"
                className="font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan/60 shadow-lg shadow-brand-cobalt/25 hover:shadow-brand-cobalt/40 bg-linear-to-r from-brand-cyan to-brand-cobalt text-white hover:opacity-90 py-3.5 px-8 text-base"
              >
                Start Your Journey
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/84 px-8 py-3.5 text-base font-semibold text-text-high shadow-[0_12px_28px_-22px_rgba(19,34,56,0.28)] backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/20 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan/60 dark:border-white/10 dark:bg-white/6 dark:text-white dark:shadow-[0_12px_28px_-22px_rgba(0,0,0,0.4)] dark:hover:border-white/20 dark:hover:bg-white/10"
              >
                View Curriculum
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-6 border-t border-slate-200/80 pt-8 dark:border-white/10">
              <AvatarGroup avatars={avatars} max={4} />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-text-high dark:text-white">Join our alumni network</span>
                <div className="flex items-center gap-1 text-xs text-text-muted dark:text-white/65">
                  <span className="text-brand-amber">◆</span>
                  <span>Top Clinic Placements</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Video */}
          <div className="relative order-1 h-125 lg:h-175 w-full lg:order-2">
             {/* Main Video Container */}
            <div className="relative ml-auto h-[90%] w-[90%] overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/92 shadow-[0_28px_80px_-34px_rgba(19,34,56,0.3)] dark:border-white/10 dark:bg-surface-card rotate-2 transition-all duration-500 ease-out hover:rotate-0">
              <iframe
                className="absolute inset-0 w-full h-full object-cover"
                src="https://www.youtube.com/embed/WRTu1Wn_Elc?rel=0&modestbranding=1"
                title="Etthos Institute Video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Overlay Gradient */}
      

             
            </div>

            {/* Floating Element 1 - Top Left */}
            <div className="absolute top-10 left-0 animate-bounce-slow">
              <div className="max-w-45 rounded-2xl border border-slate-100 bg-white/94 p-4 shadow-xl dark:border-white/10 dark:bg-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                        <span className="text-lg">✓</span>
                     </div>
                     <div className="text-xs font-bold text-text-high dark:text-white">Certified</div>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-300 leading-tight">RCI recognized excellence in training</div>
               </div>
            </div>

             {/* Floating Element 2 - Bottom Right (shifted) */}
            <div className="absolute bottom-20 -left-10 lg:left-10 z-20 hidden md:block">
               <div className="flex items-center gap-3 rounded-full border border-slate-100 bg-white/94 p-3 pr-6 shadow-glow dark:border-white/10 dark:bg-slate-800">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                     ★
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-text-high dark:text-white">4.9/5 Rating</span>
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
