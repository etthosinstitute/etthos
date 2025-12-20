import React from "react";
import { Logo } from "@repo/ui/logo";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/70 bg-surface-card py-12 text-slate-500 transition-colors dark:border-white/10 dark:bg-gradient-to-b dark:from-brand-ink dark:to-brand-midnight dark:text-text-muted">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-10 md:text-left">
        <Logo width={160} height={48} className="h-12 w-auto" />
        <div className="text-sm text-text-muted dark:text-text-muted">© 2024 Etthos Institute. All rights reserved.</div>
      </div>
    </footer>
  );
};
