import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactContent, getJournalInfo } from "@/features/public-site/queries";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Etthos Journal of Psychology — editorial enquiries, submissions, and general information.",
};

export default async function ContactPage() {
  const [contactPage, journalInfo] = await Promise.all([
    getContactContent(),
    getJournalInfo(),
  ]);

  return (
    <>
      <PageHeader
        title={contactPage.title}
        description={contactPage.description || "We welcome enquiries from authors, reviewers, and readers."}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Contact Form */}
          <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">Editorial Enquiry</p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">Send a Message</h2>
            <p className="mb-6 text-sm leading-7 text-muted-foreground">
              {contactPage.content.formIntro}
            </p>
            <ContactForm
              subjects={contactPage.content.subjects}
              successMessage={contactPage.content.successMessage}
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Contact Information</h3>
              <ul className="space-y-5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-0.5">Editorial Office</p>
                    <a href={`mailto:${journalInfo.contactEmail}`} className="hover:text-secondary transition-colors">
                      {journalInfo.contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-0.5">General Enquiries</p>
                    <a href={`mailto:${journalInfo.infoEmail}`} className="hover:text-secondary transition-colors">
                      {journalInfo.infoEmail}
                    </a>
                  </div>
                </li>
                {journalInfo.phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Phone</p>
                      <span>{journalInfo.phone}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Office Addresses</h3>
              <ul className="space-y-5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wider text-foreground mb-1">{journalInfo.registeredOffice.label}</p>
                    <span>{journalInfo.registeredOffice.address}</span>
                  </div>
                </li>
                {journalInfo.corporateOffice && (
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs uppercase tracking-wider text-foreground mb-1">{journalInfo.corporateOffice.label}</p>
                      <span>{journalInfo.corporateOffice.address}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
