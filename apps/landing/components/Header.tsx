"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@repo/ui/logo";
import { Button } from "@repo/ui/button-v2";
import { useTheme } from "./theme-provider";

const navLinks = [
  { label: "About", href: "#who-we-are" },
  { label: "Programs", href: "#programs" },
  { label: "Research", href: "#research" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-base border-b border-slate-200/70 dark:bg-brand-midnight dark:border-white/10">
      <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 md:px-10">
        <Link href="/" aria-label="Go to homepage">
          <Logo width={120} height={36} className="h-9 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-text-muted hover:text-text-high">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="rounded-full border p-2">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Button size="sm">Login</Button>
          </div>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
};
