import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getGuidelinesContent } from "@/features/public-site/queries";
import { Download, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description:
    "Guidelines for preparing and submitting manuscripts to the Etthos Journal of Health, Behavior and Applied Psychology — formatting, structure, and ethical requirements.",
};

const iconMap = {
  "check-circle": CheckCircle,
  "file-text": FileText,
} as const;

export default async function GuidelinesPage() {
  const guidelinesPage = await getGuidelinesContent();

  return (
    <>
      <PageHeader
        title={guidelinesPage.title}
        description={
          guidelinesPage.description ||
          "Everything you need to know to prepare and submit your manuscript to the Etthos Journal of Health, Behavior and Applied Psychology."
        }
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none rounded-[1.75rem] border border-border bg-card p-8 text-muted-foreground shadow-[0_20px_60px_-48px_rgba(19,34,56,0.42)]">
              <p className="not-prose mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Author Preparation
              </p>
              {guidelinesPage.content.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-serif font-bold text-primary mt-8 first:mt-0">
                    {section.title}
                  </h2>
                  {(section.paragraphs ?? []).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items &&
                    section.items.length > 0 &&
                    (section.listType === "numbered" ? (
                      <ol className="list-decimal pl-5 space-y-2 mt-4">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc pl-5 space-y-2 mt-4">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Resources */}
          <div className="space-y-8">
            <div className="sticky top-24 rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_18px_50px_-42px_rgba(19,34,56,0.42)]">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">
                Resources
              </h3>

              <div className="space-y-4">
                {guidelinesPage.content.resources.map((resource) => {
                  const Icon = iconMap[resource.icon];

                  return (
                    <div
                      key={resource.title}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4"
                    >
                      <Icon className="h-6 w-6 text-secondary mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {resource.description}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full text-xs h-8"
                        >
                          <a
                            href={resource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-3 w-3 mr-2" />{" "}
                            {resource.ctaLabel}
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <Button
                  asChild
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Link href="/submit">Start Submission</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
