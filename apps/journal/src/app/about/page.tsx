import { PageHeader } from "@/components/PageHeader";
import { Check } from "lucide-react";
import { FormatJournalName } from "@/components/FormatJournalName";
import {
  getAboutContent,
  getJournalInfo,
} from "@/features/public-site/queries";
import { getFounderImage } from "@/features/public-site/images";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About EJHBAP",
  description:
    "Learn about the Etthos Journal of Health, Behavior and Applied Psychology (EJHBAP), a peer-reviewed, open access journal, its publisher, leadership, and interdisciplinary approach to psychology and behavioral science.",
  keywords: [
    "about EJHBAP",
    "psychology journal publisher",
    "health behavior journal",
    "interdisciplinary psychology journal",
    "journal leadership",
  ],
};

export default async function AboutPage() {
  const [aboutPage, journalInfo] = await Promise.all([
    getAboutContent(),
    getJournalInfo(),
  ]);

  const { content } = aboutPage;

  return (
    <>
      <PageHeader
        title={aboutPage.title}
        description={
          aboutPage.description ||
          "An overview of the mission, scope, and editorial policies of the Etthos Journal of Health, Behavior and Applied Psychology."
        }
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Journal Overview
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                About EJHBAP
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {content.overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index < content.overviewParagraphs.length - 1
                        ? "mb-4"
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Leadership
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                {content.foundersTitle}
              </h2>
              <p className="text-muted-foreground leading-7 mb-8">
                {content.foundersDescription}
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {content.founders.map((founder) => {
                  const founderImage = getFounderImage(founder.image);

                  return (
                    <div
                      key={founder.name}
                      className="flex flex-col items-center rounded-[1.75rem] border border-border bg-background/70 p-8 text-center transition-all hover:border-secondary/30 hover:shadow-[0_20px_50px_-30px_rgba(19,34,56,0.3)]"
                    >
                      <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--highlight)/0.05)] mb-6">
                        {founderImage ? (
                          <Image
                            src={founderImage}
                            alt={founder.name}
                            fill
                            className="object-contain p-2"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="font-serif text-2xl font-bold text-primary tracking-tight">
                          {founder.name}
                        </h3>
                        <div className="mt-3 h-px w-12 bg-secondary/30" />
                        <p className="mt-3 text-sm font-semibold text-secondary">
                          {founder.role}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground text-center max-w-[220px]">
                          Etthos Institute of Behavioral Research and Training Pvt. Ltd.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 border-t border-border/60 pt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span>Contact: <a href="mailto:support@etthos.com" className="hover:text-primary underline">support@etthos.com</a></span>
                <span className="text-border">•</span>
                <span>Publisher: Etthos Institute of Behavioral Research and Training Pvt. Ltd.</span>
                <span className="text-border">•</span>
                <span>ISSN: Pending (Online)</span>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Editorial Positioning
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Aims & Scope
              </h2>
              <p className="text-muted-foreground mb-6 leading-7">
                {content.aimsIntro}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journalInfo.subjectAreas.map((field) => (
                  <li
                    key={field}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 text-muted-foreground"
                  >
                    <div className="mt-1 bg-secondary/10 p-1 rounded-full text-secondary">
                      <Check className="h-3 w-3" />
                    </div>
                    {field}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/about/aims-scope"
                  className="text-sm text-secondary hover:text-secondary/80 font-medium underline"
                >
                  View our full Aims &amp; Scope →
                </Link>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Publishing Rhythm
              </p>
              <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
                Publication Frequency
              </h2>
              <p className="text-muted-foreground leading-7">
                {content.publicationFrequencyText}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">
                Key Facts
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Journal</span>
                  <span className="font-medium text-right">
                    <FormatJournalName text={journalInfo.name} />
                  </span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Publisher</span>
                  <span className="font-medium">{journalInfo.publisher}</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">ISSN (Online)</span>
                  <span className="font-medium">{journalInfo.issn}</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="font-medium text-right">
                    {journalInfo.subjectArea}
                  </span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Frequency</span>
                  <span className="font-medium">{journalInfo.frequency}</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Access Policy</span>
                  <span className="font-medium">
                    {journalInfo.accessPolicy}
                  </span>
                </li>
                <li className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Review Model</span>
                  <span className="font-medium">{journalInfo.reviewModel}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground shadow-[0_22px_60px_-46px_rgba(19,34,56,0.8)]">
              <h3 className="font-serif font-bold text-lg mb-4">
                {content.submitCtaTitle}
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-6">
                {content.submitCtaDescription}
              </p>
              <a
                href="/submit"
                className="inline-block bg-secondary text-secondary-foreground font-medium px-4 py-2 rounded-md text-sm hover:bg-secondary/90 transition-colors w-full text-center"
              >
                Start Submission
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
