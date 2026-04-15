import { PageHeader } from "@/components/PageHeader";
import { getJournalInfo, getPublisherContent } from "@/features/public-site/queries";
import { MapPin, Mail, Phone, ExternalLink, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publisher Information",
  description: "Publisher information for the Etthos Journal Of Health, Behavior and Applied Psychology — Etthos, postal address, and contact details.",
};

export default async function PublisherPage() {
  const [journalInfo, publisherPage] = await Promise.all([
    getJournalInfo(),
    getPublisherContent(),
  ]);

  return (
    <>
      <PageHeader
        title={publisherPage.title}
        description={publisherPage.description || "Official publisher details for the Etthos Journal Of Health, Behavior and Applied Psychology."}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Publisher Identity */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full bg-[hsl(var(--highlight)/0.12)] p-3 text-[hsl(var(--highlight))]">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-primary">Etthos</h2>
                <p className="text-muted-foreground text-sm">Publisher of the Etthos Journal Of Health, Behavior and Applied Psychology</p>
              </div>
            </div>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              {publisherPage.content.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={journalInfo.mainWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Visit etthos.com
              </a>
            </div>
          </section>

          {/* Postal Addresses (ISSN Requirement) */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">ISSN Requirement</p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">Postal Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    {journalInfo.registeredOffice.label}
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed text-sm">
                  {journalInfo.registeredOffice.address}
                </p>
              </div>
              {journalInfo.corporateOffice && (
                <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      {journalInfo.corporateOffice.label}
                    </h3>
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">
                    {journalInfo.corporateOffice.address}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">Editorial Contact</p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">Contact Details</h2>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card divide-y divide-border shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <div className="flex items-center gap-4 p-4">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${journalInfo.contactEmail}`} className="text-foreground hover:text-secondary transition-colors">
                    {journalInfo.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">General Enquiries</p>
                  <a href={`mailto:${journalInfo.infoEmail}`} className="text-foreground hover:text-secondary transition-colors">
                    {journalInfo.infoEmail}
                  </a>
                </div>
              </div>
              {journalInfo.phone && (
                <div className="flex items-center gap-4 p-4">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Phone</p>
                    <span className="text-foreground">{journalInfo.phone}</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Journal Details */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">Publication Record</p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">Journal Details</h2>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Journal Title", journalInfo.name],
                    ["ISSN (Online)", journalInfo.issn || "Pending"],
                    ["Frequency", journalInfo.frequency],
                    ["Language", journalInfo.language],
                    ["Subject Area", journalInfo.subjectArea],
                    ["Access Model", journalInfo.accessPolicy],
                    ["Licence", journalInfo.license],
                    ["Website", journalInfo.websiteUrl],
                  ].map(([label, value], idx) => (
                    <tr key={label} className={idx !== 0 ? "border-t border-border" : ""}>
                      <td className="px-4 py-3 font-medium text-muted-foreground bg-muted/30 w-1/3">{label}</td>
                      <td className="px-4 py-3 text-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
