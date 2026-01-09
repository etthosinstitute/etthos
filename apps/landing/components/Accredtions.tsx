"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Readable list of accreditations placed in `public/accreted_by`.
const accreditationLogos = [
  "START-UP-INDIA (1).png",
  "Untitled-design-27 (1).png",
  "Untitled-design-30 (1).png",
  "Untitled-design-31 (1).png",
  "Untitled-design-32 (1).png",
  "Untitled-design-33 (1).png",
  "download (1).png",
  "international-accreditation-forum-iaf-logo-png_seeklogo-572393-removebg-preview (1).png",
  "whitelogo.d3a59805 (1).png",
];

export const Accredtions = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const singleSetCount = accreditationLogos.length;

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
          Recognized By
        </p>

        <p className="mb-6 text-center text-[0.625rem] font-semibold tracking-wide text-text-high">
          INDUSTRY LEADERS & INSTITUTIONS
        </p>

        {/* Marquee */}
        <div className="partners-marquee">
          <div ref={trackRef} className="partners-marquee-track">
            {accreditationLogos.map((file, i) => (
              <div
                key={`a-${i}`}
                className="logo-item relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
              >
                <Image
                  src={`/accreted_by/${file}`}
                  alt={file}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  className="object-contain"
                />
              </div>
            ))}

            {accreditationLogos.map((file, i) => (
              <div
                key={`b-${i}`}
                className="logo-item relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
              >
                <Image
                  src={`/accreted_by/${file}`}
                  alt={file}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
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
