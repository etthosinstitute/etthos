import React from "react";
import Image from "next/image";

interface ProgramCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  objectPosition?: string;
}

export const ProgramCard = ({
  title,
  description,
  imageUrl,
  icon,
  buttonText = "Learn More",
  onButtonClick,
  objectPosition = "center",
}: ProgramCardProps) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-surface-card shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-colors dark:border-white/10 dark:bg-surface-card/80 dark:shadow-card">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover object-${objectPosition} transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-card-aurora opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-8 flex flex-col flex-1 gap-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl text-brand-cyan transition-colors dark:border-white/15 dark:bg-white/5">
            {icon}
          </div>
          <span className="text-xs tracking-[0.25em] uppercase text-slate-500 dark:text-white/60">
            Program
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-text-high mb-2">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-slate-600 dark:text-white/80">
            {description}
          </p>
        </div>
        <div className="mt-auto">
          <button
            onClick={onButtonClick}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200/80 px-4 py-3 text-sm font-semibold text-brand-cyan transition-colors hover:border-brand-amber/50 hover:text-brand-amber dark:border-white/15 dark:text-white"
          >
            <span>{buttonText}</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
