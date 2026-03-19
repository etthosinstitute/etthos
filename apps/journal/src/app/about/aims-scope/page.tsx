import { PageHeader } from "@/components/PageHeader";
import { Check } from "lucide-react";
import { subjectAreas, journalInfo } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aims & Scope",
  description: "The Etthos Journal of Psychology publishes research across clinical, cognitive, developmental, social, and other areas of psychology and behavioural sciences.",
};

export default function AimsScopePage() {
  return (
    <>
      <PageHeader
        title="Aims & Scope"
        description="The scope of the Etthos Journal of Psychology covers the full breadth of psychology and behavioural sciences."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Aims</h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">
                The <em>Etthos Journal of Psychology</em> (EJP) aims to serve as a credible, peer-reviewed scholarly platform for the publication of original research, review articles, case studies, theoretical contributions, and short communications in the domain of psychology and behavioural sciences.
              </p>
              <p className="mb-4">
                The journal is particularly committed to amplifying scholarship emerging from the Indian and South Asian research context, while remaining open to contributions from researchers across the globe. EJP seeks to bridge the gap between academic theory and applied practice by encouraging methodologically rigorous, ethically conducted, and socially relevant psychological inquiry.
              </p>
              <p>
                The journal upholds the highest standards of publication ethics, transparency, and scholarly integrity, guided by the principles of the Committee on Publication Ethics (COPE).
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Scope</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Etthos Journal of Psychology welcomes submissions in the following areas of psychology and behavioural sciences, including but not limited to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectAreas.map((field) => (
                <div key={field} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                  <div className="mt-0.5 bg-secondary/10 p-1 rounded-full text-secondary shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{field}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Article Types</h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">The journal considers the following types of submissions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Original Research Articles:</strong> Empirical studies reporting new findings based on primary data.</li>
                <li><strong>Review Articles:</strong> Systematic reviews, meta-analyses, and narrative reviews synthesising existing literature.</li>
                <li><strong>Case Studies:</strong> In-depth analyses of individual or group cases with clinical or theoretical significance.</li>
                <li><strong>Short Communications:</strong> Brief empirical reports or preliminary findings of high relevance.</li>
                <li><strong>Theoretical Papers:</strong> Contributions advancing conceptual frameworks or proposing new models.</li>
                <li><strong>Letters to the Editor:</strong> Scholarly responses to previously published articles.</li>
                <li><strong>Book Reviews:</strong> Critical reviews of recently published academic texts relevant to psychology.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Journal Information</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Journal Title", journalInfo.name],
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
