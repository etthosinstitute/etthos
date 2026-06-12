"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@repo/ui/logo";
import { useTheme } from "./theme-provider";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Journal", href: "https://etthosjournal.com/" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/92 shadow-[0_10px_30px_-24px_rgba(19,34,56,0.35)] backdrop-blur-xl md:bg-surface-card/88 dark:border-white/10 dark:bg-brand-midnight/88">
        <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 md:px-10">
          <Link href="/" aria-label="Go to homepage">
            <Logo width={150} height={45} className="h-11 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-10">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-text-muted hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="text-sm font-semibold text-text-muted cursor-default"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </nav>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200/60 bg-white/70 p-2 hover:bg-surface-soft transition-colors dark:border-white/10 dark:bg-white/5"
              aria-label="Toggle theme"
            >
              <span suppressHydrationWarning>
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200/60 bg-white/70 p-2 dark:border-white/10 dark:bg-white/5"
              aria-label="Toggle theme"
            >
              <span suppressHydrationWarning>
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
            <button
              className="text-2xl p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 top-16 w-full border-b border-slate-200/70 bg-white/96 px-4 py-6 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200 dark:border-white/10 dark:bg-brand-midnight/96 md:hidden">
            <div className="mx-auto flex w-full max-w-360 flex-col gap-4 rounded-[1.75rem] border border-slate-200/70 bg-white/82 p-4 shadow-[0_18px_50px_-36px_rgba(19,34,56,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border-b border-slate-100 px-4 py-3 text-lg font-semibold text-text-high transition-colors hover:bg-surface-soft hover:text-brand-cyan dark:border-white/5 dark:hover:bg-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="cursor-default rounded-xl border-b border-slate-100 px-4 py-3 text-lg font-semibold text-text-muted dark:border-white/5"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
