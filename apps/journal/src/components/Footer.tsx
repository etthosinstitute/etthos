import { Logo } from "@repo/ui/logo";
import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { getJournalInfo } from "@/features/public-site/queries";

export async function Footer() {
  const journalInfo = await getJournalInfo();

  return (
    <footer className="mt-auto border-t border-border bg-[linear-gradient(180deg,hsl(var(--paper))_0%,hsl(var(--background))_100%)] text-foreground">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.9fr_0.9fr_1.2fr] md:gap-12">
          <div>
            <Link href="/" className="mb-6 inline-block">
              <Logo
                className="h-10 w-auto text-primary"
                width={120}
                height={30}
              />
            </Link>
            <p className="mb-4 font-serif text-[2rem] font-semibold leading-tight text-primary">
              Etthos Journal <span className="lowercase text-[0.85em]">of</span>{" "}
              Health, Behavior and Applied Psychology
            </p>
            <p className="max-w-sm text-[15px] leading-8 text-muted-foreground">
              {journalInfo.description}
            </p>
            <div className="mt-6">
              <a
                href={journalInfo.mainWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-highlight hover:text-secondary transition-colors"
              >
                Visit etthos.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[15px] text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About the Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial-board"
                  className="hover:text-primary transition-colors"
                >
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link
                  href="/issues"
                  className="hover:text-primary transition-colors"
                >
                  Issues Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/about/aims-scope"
                  className="hover:text-primary transition-colors"
                >
                  Aims &amp; Scope
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              For Authors
            </h4>
            <ul className="space-y-3 text-[15px] text-muted-foreground">
              <li>
                <Link
                  href="/submit"
                  className="hover:text-primary transition-colors"
                >
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="hover:text-primary transition-colors"
                >
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="hover:text-primary transition-colors"
                >
                  Publication Ethics
                </Link>
              </li>
              <li>
                <Link
                  href="/about/publisher"
                  className="hover:text-primary transition-colors"
                >
                  Publisher Information
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Publisher
            </h4>
            <ul className="space-y-5 text-[15px] leading-8 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-highlight" />
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {journalInfo.registeredOffice.label}
                  </span>
                  <span>{journalInfo.registeredOffice.address}</span>
                </div>
              </li>
              {journalInfo.corporateOffice && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-highlight" />
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {journalInfo.corporateOffice.label}
                    </span>
                    <span>{journalInfo.corporateOffice.address}</span>
                  </div>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-highlight" />
                <a
                  href={`mailto:${journalInfo.contactEmail}`}
                  className="hover:text-primary transition-colors"
                >
                  {journalInfo.contactEmail}
                </a>
              </li>
              {journalInfo.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-highlight" />
                  <span>{journalInfo.phone}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            &copy; {new Date().getFullYear()} Etthos Institute of Behavioral Research and Training Pvt. Ltd. Articles published in EJHBAP are distributed under a Creative Commons Attribution 4.0 International License (CC BY 4.0). The journal's name, logo, and website design remain the property of the publisher.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 shrink-0">
            <span>ISSN: {journalInfo.issn || "Pending"} (Online)</span>
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-primary transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-primary transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/policies"
              className="hover:text-primary transition-colors"
            >
              Publication Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
