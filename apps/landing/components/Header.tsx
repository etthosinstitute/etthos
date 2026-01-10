"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@repo/ui/logo";
import { useTheme } from "./theme-provider";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
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
    <>
      <header className="sticky top-0 z-50 w-full bg-surface-base/80 border-b border-slate-200/70 dark:bg-brand-midnight/80 dark:border-white/10 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 md:px-10">
          <Link href="/" aria-label="Go to homepage">
            <Logo width={120} height={36} className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
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
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-sm font-semibold text-text-muted hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
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

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme} 
              className="rounded-full border border-slate-200/60 dark:border-white/10 p-2" 
              aria-label="Toggle theme"
            >
              {mounted ? (theme === "dark" ? "☀️" : "🌙") : <span className="w-4 h-4 block" />}
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
          <div className="md:hidden absolute top-16 left-0 w-full bg-surface-base dark:bg-brand-midnight border-b border-slate-200/70 dark:border-white/10 py-6 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.href} 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-text-high hover:text-brand-cyan py-3 border-b border-slate-100 dark:border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-lg font-semibold text-text-high hover:text-brand-cyan py-3 border-b border-slate-100 dark:border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </header>
    </>
  );
};
