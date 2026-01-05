import React from "react";

export const WhoWeAre = () => {
  return (
    <section className="relative bg-surface-base py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        
        {/* Top label */}
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-text-muted">
          Who we are
        </p>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          
          {/* Left: Core statement */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              A psychology-driven institute focused on{" "}
              <span className="text-brand-cyan">
                real-world application
              </span>, not just theory.
            </h2>
          </div>

          {/* Right: Structured proof */}
          <div className="space-y-6 text-sm leading-relaxed text-text-muted">
            <p>
              Etthos Institute of Behavioral Research and Training Pvt. Ltd.
              applies scientific psychological principles across counselling,
              training, research, and consulting.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-slate-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Evidence based
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Research-led psychological frameworks
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Ethical practice
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Professional & responsible application
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Applied focus
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  From classroom to clinic & workplace
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Multidomain
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Individuals, institutions & organizations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
       
      </div>
    </section>
  );
};
