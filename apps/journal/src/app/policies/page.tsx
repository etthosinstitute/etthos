import { PageHeader } from "@/components/PageHeader";
import { getPoliciesContent } from "@/lib/public-site";
import { Check, Shield, Lock, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Ethics",
  description: "Publication ethics, peer review policy, plagiarism policy, and copyright information for the Etthos Journal of Psychology.",
};

const iconMap = {
  check: Check,
  "file-text": FileText,
  lock: Lock,
  shield: Shield,
} as const;

export default async function PoliciesPage() {
  const policiesPage = await getPoliciesContent();

  return (
    <>
      <PageHeader 
        title={policiesPage.title}
        description={policiesPage.description || "Our commitment to ethical publishing and research integrity in psychology and behavioural sciences."}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2 rounded-[1.5rem] border border-border bg-card p-4 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              {policiesPage.content.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={index === 0
                    ? "block rounded-xl border-l-2 border-secondary bg-accent/40 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent/70"
                    : "block rounded-xl border-l-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-secondary hover:bg-accent/50 hover:text-foreground"}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {policiesPage.content.sections.map((section, index) => {
              const Icon = iconMap[section.icon];

              return (
                <div key={section.id}>
                  <section id={section.id} className="scroll-mt-24 rounded-[1.75rem] border border-border bg-card p-8 shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                            <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-primary">{section.title}</h2>
                    </div>
                    <div className="prose prose-slate max-w-none text-muted-foreground">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                  {index < policiesPage.content.sections.length - 1 && (
                    <div className="h-px bg-border"></div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
}
