import { PageHeader } from "@/components/PageHeader";
import { Check } from "lucide-react";
import { FormatJournalName } from "@/components/FormatJournalName";
import {
  getAimsScopeContent,
  getJournalInfo,
} from "@/features/public-site/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aims & Scope",
  description:
    "The Etthos Journal of Health, Behavior and Applied Psychology publishes research across dietetics, environment, law, journalism, and other interdisciplinary fields.",
};

export default async function AimsScopePage() {
  const [aimsScopePage, journalInfo] = await Promise.all([
    getAimsScopeContent(),
    getJournalInfo(),
  ]);

  const { content } = aimsScopePage;

  return (
    <>
      <PageHeader
        title={aimsScopePage.title}
        description={
          aimsScopePage.description ||
          "The scope of the Etthos Journal of Health, Behavior and Applied Psychology covers a broad range of interdisciplinary fields and scholarly disciplines."
        }
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Editorial Mission
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Aims
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              {content.aimsParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index < content.aimsParagraphs.length - 1
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
              Subject Coverage
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Scope
            </h2>
            <p className="text-muted-foreground mb-6 leading-7">
              The{" "}
              <FormatJournalName text="Etthos Journal of Health, Behavior and Applied Psychology" />{" "}
              welcomes submissions in the following interdisciplinary areas,
              including but not limited to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journalInfo.subjectAreas.map((field) => (
                <div
                  key={field}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 transition-colors hover:border-secondary/25 hover:bg-accent/40"
                >
                  <div className="mt-0.5 bg-secondary/10 p-1 rounded-full text-secondary shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground font-medium text-sm">
                    {field}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Submission Categories
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Article Types
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">
                The journal considers the following types of submissions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                {content.articleTypes.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Publication Details
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Journal Information
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    [
                      "Journal Title",
                      <FormatJournalName key="title" text={journalInfo.name} />,
                    ],
                    ["Short Title", journalInfo.shortName],
                    ["Publisher", journalInfo.publisher],
                    ["ISSN (Online)", journalInfo.issn],
                    ["Frequency", journalInfo.frequency],
                    ["Language", journalInfo.language],
                    ["Country", journalInfo.country],
                    ["Subject Area", journalInfo.subjectArea],
                    ["Access Policy", journalInfo.accessPolicy],
                    ["Review Model", journalInfo.reviewModel],
                    ["Licence", journalInfo.license],
                  ].map(([label, value], idx) => (
                    <tr
                      key={label as string}
                      className={idx !== 0 ? "border-t border-border" : ""}
                    >
                      <td className="px-4 py-3 font-medium text-muted-foreground bg-muted/30 w-1/3">
                        {label}
                      </td>
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
