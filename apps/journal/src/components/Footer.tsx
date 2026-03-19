import { Logo } from "@repo/ui/logo";
import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { journalInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10 w-auto text-primary-foreground" width={120} height={30} />
            </Link>
            <p className="font-serif font-bold text-lg mb-2">
              {journalInfo.name}
            </p>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A peer-reviewed, open-access journal dedicated to advancing research in psychology and behavioural sciences.
            </p>
            <div className="mt-4">
              <a
                href={journalInfo.mainWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-highlight hover:text-highlight/80 transition-colors"
              >
                Visit etthos.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4 text-primary-foreground/90">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary-foreground hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-foreground hover:underline transition-colors">
                  About the Journal
                </Link>
              </li>
              <li>
                <Link href="/editorial-board" className="hover:text-primary-foreground hover:underline transition-colors">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/issues" className="hover:text-primary-foreground hover:underline transition-colors">
                  Issues Archive
                </Link>
              </li>
              <li>
                <Link href="/about/aims-scope" className="hover:text-primary-foreground hover:underline transition-colors">
                  Aims &amp; Scope
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4 text-primary-foreground/90">For Authors</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/submit" className="hover:text-primary-foreground hover:underline transition-colors">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary-foreground hover:underline transition-colors">
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-primary-foreground hover:underline transition-colors">
                  Publication Ethics
                </Link>
              </li>
              <li>
                <Link href="/about/publisher" className="hover:text-primary-foreground hover:underline transition-colors">
                  Publisher Information
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-foreground hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Publisher Info (ISSN Requirement) */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4 text-primary-foreground/90">Publisher</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-highlight" />
                <div>
                  <span className="font-semibold block text-xs uppercase tracking-wider mb-1 text-primary-foreground/50">
                    {journalInfo.registeredOffice.label}
                  </span>
                  <span>{journalInfo.registeredOffice.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-highlight" />
                <div>
                  <span className="font-semibold block text-xs uppercase tracking-wider mb-1 text-primary-foreground/50">
                    {journalInfo.corporateOffice.label}
                  </span>
                  <span>{journalInfo.corporateOffice.address}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-highlight" />
                <a href={`mailto:${journalInfo.contactEmail}`} className="hover:text-primary-foreground transition-colors">
                  {journalInfo.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-highlight" />
                <span>{journalInfo.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} {journalInfo.name}. Published by {journalInfo.publisher}. All rights reserved.</p>
          <div className="flex gap-4">
            <span>ISSN: {journalInfo.issn} (Online)</span>
            <Link href="/policies" className="hover:text-primary-foreground transition-colors">Publication Ethics</Link>
            <Link href="/about/publisher" className="hover:text-primary-foreground transition-colors">Publisher Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
