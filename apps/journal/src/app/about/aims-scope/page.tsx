import { PageHeader } from "@/components/PageHeader";
import { Check, AlertTriangle, HelpCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aims & Scope",
  description:
    "EJHBAP publishes peer-reviewed research on psychology, health, and human behavior, including interdisciplinary work in nursing, communication, law, and environmental science. Read our full aims and scope.",
  keywords: [
    "psychology journal scope",
    "health behavior research topics",
    "applied psychology journal areas",
    "behavioral science journal scope",
    "clinical psychology research",
  ],
};

export default async function AimsScopePage() {
  const scopeCategories = [
    {
      title: "Core Psychology",
      items: [
        "Clinical & Health Psychology",
        "Neuropsychology & Cognitive Science",
        "Counseling & Applied Psychology",
        "Developmental & Educational Psychology",
        "Organizational & Social Behavior",
      ],
    },
    {
      title: "Behavioral Dimensions of Health & Wellness",
      items: [
        "Behavioral medicine and the psychology of illness, treatment adherence, and recovery",
        "Psychological and behavioral aspects of nursing and patient care",
        "Behavioral nutrition, eating behavior, and psychology of dietary change",
        "Psychological perspectives on traditional and integrative wellness practices (e.g., yoga science, Ayurveda), where studies examine measurable behavioral, cognitive, or mental-health outcomes",
      ],
    },
    {
      title: "Behavioral Dimensions of Society & Communication",
      items: [
        "Media psychology and the behavioral effects of communication and journalism",
        "Psycholinguistics and the cognitive/behavioral study of language",
        "Political and legal psychology, including behavioral analysis of policy, law, and civic decision-making",
      ],
    },
    {
      title: "Behavioral Dimensions of Environment & Systems",
      items: [
        "Environmental psychology and behavior change for sustainability",
        "Human factors in environmental and organizational systems",
      ],
    },
  ];

  const outOfScopeItems = [
    "Purely clinical, technical, or descriptive papers in an adjacent field (e.g., medicine, nutrition, law, environmental science) that do not analyze or engage with psychological or behavioral outcomes",
    "Papers with no human-subjects, behavioral, or cognitive component",
    "Opinion pieces or advocacy writing without an empirical or scholarly evidence base",
  ];

  return (
    <>
      <PageHeader
        title="Aims & Scope"
        description="The editorial objectives, coverage areas, and interdisciplinary boundary of the Etthos Journal of Health, Behavior and Applied Psychology."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Aims Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Editorial Mission
            </p>
            <h2 className="font-serif font-bold text-3xl mb-6 text-primary">
              Aims
            </h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                EJHBAP is a peer-reviewed, open access journal publishing original research at the intersection of psychology, health, and human behavior. Our founding premise is that behavior does not occur in a vacuum: how people think, feel, and act is shaped by (and shapes) the clinical, social, organizational, cultural, communicative, and environmental systems around them.
              </p>
              <p>
                Rather than restrict submissions to a single sub-discipline of psychology, EJHBAP deliberately publishes work from adjacent fields where the central research question concerns human behavior, cognition, or psychological well-being, even when the methods or setting originate in medicine, nutrition science, law, communication studies, or the environmental sciences. Each accepted submission must make a clear, explicit contribution to understanding or improving human psychological or behavioral outcomes: a study is in scope because of what it says about behavior, not merely because it touches a related field in passing.
              </p>
            </div>
          </section>

          {/* Scope Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Subject Coverage
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Scope
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We welcome original research articles, systematic and narrative reviews, case studies, brief reports, letters to the editor, and methodological papers in the following areas:
            </p>
            
            <div className="space-y-8">
              {scopeCategories.map((category) => (
                <div key={category.title} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-serif font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    {category.title}
                  </h3>
                  <ul className="grid grid-cols-1 gap-3.5 pl-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <Check className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Out of Scope Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d97706]">
              Exclusions
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary flex items-center gap-2.5">
              <AlertTriangle className="h-7 w-7 text-[#d97706]" />
              What Falls Outside Our Scope
            </h2>
            <ul className="space-y-4 mt-6">
              {outOfScopeItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#d97706] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Article Types Section */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Submission Criteria
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary">
              Article Types &amp; Length
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full formatting requirements and details on article length are listed on our{" "}
              <Link href="/guidelines" className="text-secondary hover:text-secondary/80 underline font-medium">
                Author Guidelines
              </Link>{" "}
              page.
            </p>
          </section>

          {/* Interdisciplinary Model Note */}
          <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Editorial Philosophy
            </p>
            <h2 className="font-serif font-bold text-3xl mb-4 text-primary flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-secondary" />
              A Note on Our Interdisciplinary Model
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              This scope reflects a deliberate editorial position, not an absence of one: psychological and behavioral science is increasingly produced at the boundaries of clinical practice, communication, law, nutrition, and environmental policy. Our Editorial Board is composed accordingly, bringing together specialists from psychology alongside colleagues in medicine, nursing, communication, law, linguistics, and environmental science, so that interdisciplinary submissions receive genuinely qualified review.
            </p>
          </section>

          {/* Bottom Info Bar */}
          <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <span>Contact: <a href="mailto:support@etthos.com" className="hover:text-primary underline">support@etthos.com</a></span>
            <span>Website: <a href="https://www.etthosjournal.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">www.etthosjournal.co</a></span>
          </div>
        </div>
      </div>
    </>
  );
}
