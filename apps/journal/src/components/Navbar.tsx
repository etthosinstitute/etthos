"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@repo/ui/logo";
import { Search, Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "About",
    children: [
      { href: "/about", label: "About the Journal" },
      { href: "/about/aims-scope", label: "Aims & Scope" },
      { href: "/about/publisher", label: "Publisher Information" },
    ],
  },
  { href: "/editorial-board", label: "Editorial Board" },
  { href: "/issues", label: "Issues" },
  { href: "/guidelines", label: "Author Guidelines" },
  { href: "/policies", label: "Policies & Ethics" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {/* Top Bar — Etthos branding */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            Published by{" "}
            <a
              href="https://etthos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-highlight transition-colors inline-flex items-center gap-1"
            >
              Etthos <ExternalLink className="h-3 w-3" />
            </a>
          </span>
          <span className="hidden sm:inline">
            ISSN: XXXX-XXXX (Online) | Open Access
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo + Journal Name */}
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto text-primary" width={80} height={28} />
            <div className="hidden sm:block border-l border-border pl-3">
              <span className="font-serif font-bold text-sm text-primary leading-tight block">
                Etthos Journal
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
                of Psychology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/50 transition-colors">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="hidden lg:block">
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link href="/submit">Submit Manuscript</Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {aboutOpen && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-border">
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link href="/submit" onClick={() => setMobileOpen(false)}>
                    Submit Manuscript
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
