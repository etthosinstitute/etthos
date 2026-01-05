"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Readable list of colleges placed in `public/colleges`.
const collegeLogos = [
  "14-1024x1024-1-150x150.png",
  "17-1024x1024-1-150x150.png",
  "3-1024x1024-1-150x150.png",
  "7-1024x1024-1-150x150.png",
  "6-1024x1024-1-150x150.png",
  "amity.png",
  "college 1.png",
  "du-1024x963-1-150x150.png",
];

export const Partners = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const singleSetCount = collegeLogos.length;

    let width = 0;
    for (let i = 0; i < singleSetCount; i++) {
      const el = track.children[i] as HTMLElement;
      width += el.offsetWidth + 32; // gap ≈ 2rem (mobile-safe)
    }

    track.style.setProperty("--marquee-width", `${width}px`);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-slate-200/70 bg-surface-card py-10 transition-colors dark:border-white/5 dark:bg-surface-soft">
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-ink/10 to-transparent dark:from-brand-ink/40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-10">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.4em] text-text-muted">
          Trusted By
        </p>

        <p className="mb-6 text-center text-[0.625rem] font-semibold tracking-wide text-text-high">
          STUDENTS FROM
        </p>

        {/* Marquee */}
        <div className="partners-marquee">
          <div ref={trackRef} className="partners-marquee-track">
            {collegeLogos.map((file, i) => (
              <div
                key={`a-${i}`}
                className="logo-item relative 
                           h-16 w-16 
                           sm:h-20 sm:w-20 
                           md:h-24 md:w-24"
              >
                <Image
                  src={`/colleges/${file}`}
                  alt={file}
                  fill
                  sizes="(max-width: 640px) 64px,
                         (max-width: 768px) 80px,
                         96px"
                  className="object-contain"
                />
              </div>
            ))}

            {collegeLogos.map((file, i) => (
              <div
                key={`b-${i}`}
                className="logo-item relative 
                           h-16 w-16 
                           sm:h-20 sm:w-20 
                           md:h-24 md:w-24"
              >
                <Image
                  src={`/colleges/${file}`}
                  alt={file}
                  fill
                  sizes="(max-width: 640px) 64px,
                         (max-width: 768px) 80px,
                         96px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
