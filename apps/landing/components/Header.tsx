"use client";

import React, { useState } from "react";
import { Logo } from "@repo/ui/logo";
import { Button } from "@repo/ui/button-v2";
import { useTheme } from "./theme-provider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Research", href: "#research" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-base transition-colors dark:border-b dark:border-white/10 dark:bg-brand-midnight/85 dark:shadow-[0_20px_55px_rgba(3,7,18,0.65)] dark:supports-[backdrop-filter]:bg-brand-midnight/70">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 py-2 md:px-10">
        <Logo width={120} height={36} className="h-9 w-auto" />

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="text-sm font-semibold text-text-muted transition-colors hover:text-text-high focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-cyan dark:text-text-muted dark:hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="rounded-full border border-slate-200/80 bg-surface-card/80 p-2 text-text-high shadow-sm transition-colors hover:border-brand-cyan/70 hover:text-brand-cyan dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Button variant="primary" size="sm">
              Login
            </Button>
          </div>
        </div>

        <button
          className="text-2xl text-brand-midnight transition-colors dark:text-text-high md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200/70 bg-surface-base px-4 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-colors dark:border-white/10 dark:bg-brand-midnight/85 md:hidden">
          <nav className="mb-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-slate-100 hover:text-brand-ink dark:text-text-muted dark:hover:bg-white/10 dark:hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-text-high transition-colors hover:border-brand-cyan/70 hover:text-brand-cyan dark:border-white/20 dark:text-white"
            >
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </button>
            <Button variant="primary" size="sm">
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
