"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@repo/ui/logo";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { apiRequest } from "@/shared/api-client";

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
  const [accountOpen, setAccountOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    role: string;
    isReviewer?: boolean;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const response = await apiRequest<{
          user: {
            id: string;
            email: string;
            firstName?: string | null;
            lastName?: string | null;
            role: string;
            isReviewer?: boolean;
          } | null;
        }>("/api/auth/me");

        if (!cancelled) {
          setCurrentUser(response.user);
        }
      } catch {
        if (!cancelled) {
          setCurrentUser(null);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    await apiRequest("/api/auth/logout", "POST");
    setCurrentUser(null);
    setMobileOpen(false);
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  }

  const currentUserLabel =
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") ||
    currentUser?.email ||
    "Account";
  const currentUserInitial =
    currentUser?.firstName?.[0] ||
    currentUser?.email?.[0]?.toUpperCase() ||
    "A";

  return (
    <div suppressHydrationWarning>
      <div className="border-b border-border/60 bg-[hsl(var(--paper)/0.86)] text-foreground text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            Published by{" "}
            <a
              href="https://etthos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1"
            >
              Etthos Institute of Behavioral Research and Training Pvt Ltd.{" "}
              <ExternalLink className="h-3 w-3" />
            </a>
          </span>
          <span className="hidden sm:inline text-muted-foreground">
            ISSN: XXXX-XXXX (Online) | Open Access
          </span>
        </div>
      </div>

      <nav className="sticky top-0 z-50 border-b border-border/75 bg-[hsl(var(--paper)/0.94)] shadow-[0_12px_36px_-28px_rgba(19,34,56,0.38)] backdrop-blur-xl">
        <div className="container mx-auto flex h-[5.2rem] items-center justify-between gap-4 px-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <Logo className="h-10 w-auto text-primary" width={80} height={28} />
            <div className="hidden min-w-0 border-l border-border/90 pl-3 min-[1320px]:block">
              <span className="block font-serif text-[1.02rem] font-semibold leading-tight text-primary">
                Etthos Journal{" "}
                <span className="text-[0.75em] lowercase">of</span>
              </span>
              <span className="block max-w-74 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Health, Behavior and Applied Psychology
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 text-[14px] font-medium text-muted-foreground xl:flex">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 rounded-full px-3 py-2 transition-colors hover:bg-accent/70 hover:text-primary">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="w-[17rem] rounded-[1.45rem] border border-border/90 bg-[hsl(var(--paper)/0.98)] p-2 shadow-[0_24px_56px_-36px_rgba(19,34,56,0.4)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/70 hover:text-primary"
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
                  className="rounded-full px-3 py-2 transition-colors hover:bg-accent/70 hover:text-primary"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {!authLoading && currentUser ? (
              <div className="relative hidden xl:block">
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  className="flex max-w-[190px] items-center gap-2.5 rounded-full border border-border/90 bg-background/88 px-2 py-1.5 text-sm text-primary shadow-[0_10px_24px_-18px_rgba(19,34,56,0.28)] transition-colors hover:bg-accent/70"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-sm font-semibold text-secondary">
                    {currentUserInitial}
                  </span>
                  <span className="min-w-0 flex-1 text-left leading-tight">
                    <span className="block truncate font-medium">
                      {currentUserLabel}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {currentUser.role}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${accountOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-[1.4rem] border border-border bg-[hsl(var(--paper)/0.98)] p-2 shadow-[0_26px_60px_-42px_rgba(19,34,56,0.42)]">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/70 hover:text-primary"
                      onClick={() => setAccountOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/70 hover:text-primary"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : !authLoading ? (
              <div className="hidden xl:flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-border/80 bg-background/80 px-4"
                >
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4" />
                    User Login
                  </Link>
                </Button>
              </div>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-accent/70 hover:text-secondary"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="hidden xl:block">
              {mounted && currentUser ? (
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-secondary px-4 hover:bg-secondary/90 text-secondary-foreground shadow-[0_12px_24px_-16px_hsl(var(--secondary))]"
                >
                  <Link href="/submit">Submit Manuscript</Link>
                </Button>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <Button
                    type="button"
                    size="sm"
                    disabled
                    title="Login or signup first"
                    className="cursor-not-allowed rounded-full bg-secondary/55 px-4 text-secondary-foreground"
                  >
                    Submit Manuscript
                  </Button>
                  {!authLoading ? (
                    <p className="text-[11px] text-muted-foreground">
                      Login or signup first
                    </p>
                  ) : null}
                </div>
              )}
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
          <div className="xl:hidden border-t border-border bg-[hsl(var(--paper)/0.98)]">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/70 hover:text-primary"
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
                            className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/70 hover:text-primary"
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
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/70 hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="pt-4 border-t border-border">
                {!authLoading && currentUser ? (
                  <div className="mb-3 space-y-2">
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-primary">
                      <p className="font-medium">{currentUserLabel}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {currentUser.role}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-border/80 bg-background/80"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-center text-muted-foreground hover:text-primary hover:bg-accent/70"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : !authLoading ? (
                  <Button
                    asChild
                    variant="outline"
                    className="mb-3 w-full border-border/80 bg-background/80"
                  >
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      User Login
                    </Link>
                  </Button>
                ) : null}
                {currentUser ? (
                  <Button
                    asChild
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Link href="/submit" onClick={() => setMobileOpen(false)}>
                      Submit Manuscript
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      disabled
                      className="w-full cursor-not-allowed bg-secondary/55 text-secondary-foreground"
                    >
                      Submit Manuscript
                    </Button>
                    {!authLoading ? (
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        Login or signup first
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
