import { PageHeader } from "@/components/PageHeader";
import { Check } from "lucide-react";
import { journalInfo, subjectAreas } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Journal",
  description: "Learn about the Etthos Journal of Psychology — mission, scope, editorial policies, and publication frequency.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About the Journal" 
        description="An overview of the mission, scope, and editorial policies of the Etthos Journal of Psychology." 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Journal Overview</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  The <em>Etthos Journal of Psychology</em> (EJP) is a peer-reviewed, open-access academic journal published by <strong>Etthos</strong>. The journal is dedicated to the dissemination of high-quality original research, review articles, and scholarly discourse across the full spectrum of psychology and behavioural sciences.
                </p>
                <p className="mb-4">
                  EJP aspires to serve as a credible scholarly platform for researchers, academicians, and practitioners — particularly those working in the Indian and South Asian context — to share rigorous empirical work and contribute to the advancement of psychological knowledge. The journal welcomes methodologically sound contributions from clinical, cognitive, developmental, social, educational, organisational, and health psychology, among other sub-disciplines.
                </p>
                <p>
                  The journal is committed to maintaining the highest standards of publication ethics and scholarly rigour. All submissions undergo a double-blind peer review process conducted by experts in the relevant field.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Aims and Scope</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Etthos Journal of Psychology welcomes original research articles, review papers, case studies, short communications, and theoretical contributions in the following areas:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectAreas.map((field) => (
                  <li key={field} className="flex items-start gap-3 text-muted-foreground">
                    <div className="mt-1 bg-secondary/10 p-1 rounded-full text-secondary">
                      <Check className="h-3 w-3" />
                    </div>
                    {field}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/about/aims-scope" className="text-sm text-secondary hover:text-secondary/80 font-medium underline">
                  View detailed Aims &amp; Scope →
                </Link>
              </div>
            </section>

             <section>
              <h2 className="font-serif font-bold text-2xl mb-4 text-primary">Publication Frequency</h2>
              <p className="text-muted-foreground leading-relaxed">
                The journal is published <strong>quarterly</strong> (4 issues per year) in March, June, September, and December. Special issues dedicated to specific topics may also be published.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Key Facts</h3>
              <ul className="space-y-4 text-sm">
                 <li className="flex justify-between border-b border-border/50 pb-2">
                   <span className="text-muted-foreground">Journal</span>
                   <span className="font-medium text-right">{journalInfo.name}</span>
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
                   <span className="font-medium text-right">{journalInfo.subjectArea}</span>
                 </li>
                 <li className="flex justify-between border-b border-border/50 pb-2">
                   <span className="text-muted-foreground">Frequency</span>
                   <span className="font-medium">{journalInfo.frequency}</span>
                 </li>
                 <li className="flex justify-between border-b border-border/50 pb-2">
                   <span className="text-muted-foreground">Access Policy</span>
                   <span className="font-medium">{journalInfo.accessPolicy}</span>
                 </li>
                 <li className="flex justify-between pt-2">
                   <span className="text-muted-foreground">Review Model</span>
                   <span className="font-medium">{journalInfo.reviewModel}</span>
                 </li>
              </ul>
            </div>

             <div className="bg-primary text-primary-foreground p-6 rounded-lg">
              <h3 className="font-serif font-bold text-lg mb-4">Submit Your Work</h3>
              <p className="text-primary-foreground/80 text-sm mb-6">
                Ready to publish with us? Check our author guidelines and submit your manuscript today.
              </p>
              <a href="/submit" className="inline-block bg-secondary text-secondary-foreground font-medium px-4 py-2 rounded-md text-sm hover:bg-secondary/90 transition-colors w-full text-center">
                Start Submission
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
