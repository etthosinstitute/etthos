import { PageHeader } from "@/components/PageHeader";
import { journalInfo } from "@/lib/data";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Etthos Journal of Psychology — editorial enquiries, submissions, and general information.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We welcome enquiries from authors, reviewers, and readers."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Form */}
          <div>
            <h2 className="font-serif font-bold text-2xl mb-6 text-primary">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1.5">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1.5">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                <select
                  id="subject"
                  className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="submission">Manuscript Submission</option>
                  <option value="editorial">Editorial Enquiry</option>
                  <option value="review">Peer Review</option>
                  <option value="technical">Technical Issue</option>
                  <option value="general">General Enquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2.5 border border-border rounded-md bg-card text-foreground text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-colors resize-vertical"
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
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
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-0.5">Phone</p>
                    <span>{journalInfo.phone}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Office Addresses</h3>
              <ul className="space-y-5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wider text-foreground mb-1">{journalInfo.registeredOffice.label}</p>
                    <span>{journalInfo.registeredOffice.address}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wider text-foreground mb-1">{journalInfo.corporateOffice.label}</p>
                    <span>{journalInfo.corporateOffice.address}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
