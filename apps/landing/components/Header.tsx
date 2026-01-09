"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@repo/ui/logo";
import { useTheme } from "./theme-provider";

const navLinks = [
  { label: "About", href: "#who-we-are" },
  { label: "Programs", href: "#programs" },
  { label: "Contact", href: "https://wa.me/+917261028965", external: true },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-base border-b border-slate-200/70 dark:bg-brand-midnight dark:border-white/10 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 md:px-10">
        <Link href="/" aria-label="Go to homepage">
          <Logo width={120} height={36} className="h-9 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.href} 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-text-muted hover:text-brand-cyan transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-sm font-semibold text-text-muted hover:text-brand-cyan transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <button 
            onClick={toggleTheme} 
            className="rounded-full border border-slate-200/60 dark:border-white/10 p-2 hover:bg-surface-soft transition-colors" 
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? "☀️" : "🌙") : <span className="w-4 h-4 block" />}
          </button>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
};
