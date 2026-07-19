import { PageHeader } from "@/components/PageHeader";
import { MapPin, Mail, Globe, Shield, Scale, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publisher",
  description:
    "EJHBAP is published by Etthos Institute of Behavioral Research and Training Pvt. Ltd., an organization dedicated to advancing psychology and behavioral science research through open access publishing.",
  keywords: [
    "Etthos Institute of Behavioral Research and Training",
    "psychology journal publisher India",
    "open access publisher",
    "journal publisher Patna New Delhi",
  ],
};

export default async function PublisherPage() {
  const journalDetails = [
    { label: "Journal Title", value: "Etthos Journal of Health, Behavior and Applied Psychology (EJHBAP)" },
    { label: "ISSN (Online)", value: "Pending" },
    { label: "Frequency", value: "Quarterly" },
    { label: "Language", value: "English" },
    { label: "Subject Area", value: "Interdisciplinary" },
    { label: "Access Model", value: "Open Access" },
    { label: "License", value: "CC BY 4.0" },
    { label: "Website", value: "https://etthosjournal.com" },
  ];

  return (
    <>
      <PageHeader
        title="Publisher"
        description="Official publication, institutional governance, and contact details for the Etthos Journal of Health, Behavior and Applied Psychology."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* About the Publisher */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Corporate Entity
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              About the Publisher
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Etthos Institute of Behavioral Research and Training Pvt. Ltd. is the publisher of the Etthos Journal of Health, Behavior and Applied Psychology (EJHBAP). The Institute is dedicated to advancing psychological and behavioral science research, with a particular focus on work at the intersection of psychology and adjacent fields (including health, nursing, communication, law, and environmental science) where the central contribution concerns human behavior, cognition, or psychological well-being.
              </p>
              <p>
                EJHBAP operates under a fully open access model, publishing peer-reviewed research under a Creative Commons Attribution 4.0 (CC BY) license, with editorial and peer review decisions made independently by the Editor-in-Chief and Editorial Board, separate from the publisher&apos;s business operations.
              </p>
            </div>
          </section>

          {/* Postal Addresses */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registered Office */}
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Registered Office
                </h3>
              </div>
              <div className="text-foreground leading-relaxed text-sm font-medium space-y-1">
                <p>Etthos Institute of Behavioral Research and Training Pvt. Ltd.</p>
                <p className="text-muted-foreground font-normal">Patna, Bihar, India</p>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <div className="flex items-center gap-3 mb-4">
                <Building2Icon className="h-5 w-5 text-secondary shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Corporate Office
                </h3>
              </div>
              <div className="text-foreground leading-relaxed text-sm font-medium space-y-1">
                <p>Etthos Institute of Behavioral Research and Training Pvt. Ltd.</p>
                <p className="text-muted-foreground font-normal">New Delhi, India</p>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Inquiries
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background/50">
                <Mail className="h-6 w-6 text-secondary shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                    Email
                  </p>
                  <a href="mailto:support@etthos.com" className="text-foreground hover:text-secondary font-medium transition-colors">
                    support@etthos.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background/50">
                <Globe className="h-6 w-6 text-secondary shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                    Website
                  </p>
                  <a href="https://www.etthosjournal.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-secondary font-medium flex items-center gap-1 transition-colors">
                    www.etthosjournal.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Journal Details */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Fact Sheet
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Journal Details
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {journalDetails.map(({ label, value }, idx) => (
                    <tr
                      key={label}
                      className={idx !== 0 ? "border-t border-border" : ""}
                    >
                      <td className="px-4 py-3.5 font-medium text-muted-foreground bg-muted/30 w-1/3">
                        {label}
                      </td>
                      <td className="px-4 py-3.5 text-foreground font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Policies Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Legal &amp; Compliance
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Policies
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-secondary">
              <Link href="/privacy-policy" className="hover:text-secondary/80 hover:underline flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
              <span className="text-border">·</span>
              <Link href="/terms-and-conditions" className="hover:text-secondary/80 hover:underline flex items-center gap-1.5">
                <Scale className="h-4 w-4" />
                Terms &amp; Conditions
              </Link>
              <span className="text-border">·</span>
              <Link href="/refund-policy" className="hover:text-secondary/80 hover:underline flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                Refund Policy
              </Link>
            </div>
          </section>

          {/* Publisher Copyright notice */}
          <div className="border-t border-border/60 pt-8 text-xs text-muted-foreground leading-relaxed text-center">
            &copy; {new Date().getFullYear()} Etthos Institute of Behavioral Research and Training Pvt. Ltd. Articles published in EJHBAP are distributed under a Creative Commons Attribution 4.0 International License (CC BY 4.0). The journal&apos;s name, logo, and website design remain the property of the publisher.
          </div>

        </div>
      </div>
    </>
  );
}

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
