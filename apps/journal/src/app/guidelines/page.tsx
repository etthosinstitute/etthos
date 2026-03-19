import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description: "Guidelines for preparing and submitting manuscripts to the Etthos Journal of Psychology — formatting, structure, and ethical requirements.",
};

export default function GuidelinesPage() {
  return (
    <>
      <PageHeader 
        title="Author Guidelines" 
        description="Everything you need to know to prepare and submit your manuscript to the Etthos Journal of Psychology." 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-serif font-bold text-primary">Submission Process</h2>
              <p>
                Manuscripts must be submitted online via the <Link href="/submit" className="text-secondary underline">Journal Submission System</Link>. 
                First-time users must register for an account. Submissions via email are not accepted.
              </p>
              
              <h3 className="text-xl font-bold mt-8">Manuscript Preparation</h3>
              <p>
                Authors should ensure their manuscripts strictly follow the formatting guidelines below. 
                Incomplete submissions or those not adhering to the guidelines may be returned without review.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>File Format:</strong> Microsoft Word (.doc, .docx) or PDF.</li>
                <li><strong>Font:</strong> Times New Roman or Arial, 12pt.</li>
                <li><strong>Spacing:</strong> Double-spaced throughout.</li>
                <li><strong>Margins:</strong> 1 inch (2.54 cm) on all sides.</li>
                <li><strong>Page Numbers:</strong> Included on every page.</li>
                <li><strong>Word Count:</strong> Research articles: 5,000–8,000 words. Review articles: up to 10,000 words. Short communications: up to 3,000 words.</li>
              </ul>

              <h3 className="text-xl font-bold mt-8">Structure of the Manuscript</h3>
              <ol className="list-decimal pl-5 space-y-2 mt-4">
                <li><strong>Title Page:</strong> Title, author names, affiliations, ORCID IDs, and corresponding author contact details.</li>
                <li><strong>Abstract:</strong> Structured abstract (Background, Objectives, Methods, Results, Conclusion) of max 250 words.</li>
                <li><strong>Keywords:</strong> 4–6 keywords for indexing.</li>
                <li><strong>Introduction:</strong> Context, literature review, and purpose of the study.</li>
                <li><strong>Methods:</strong> Detailed description of participants, measures, and procedures. Include ethics approval details (IRB/institutional ethics committee).</li>
                <li><strong>Results:</strong> Clear presentation of findings with appropriate statistical analyses.</li>
                <li><strong>Discussion:</strong> Interpretation of results, comparison with existing literature, implications, limitations, and directions for future research.</li>
                <li><strong>References:</strong> APA Style (7th Edition).</li>
              </ol>

              <h3 className="text-xl font-bold mt-8">Ethical Requirements</h3>
              <p>
                All research involving human participants must have received approval from an appropriate Institutional Review Board (IRB) or Ethics Committee. Authors must include a statement confirming ethical approval, including the name of the approving body and the approval reference number.
              </p>
              <p className="mt-2">
                Studies involving clinical populations must comply with the Declaration of Helsinki. Informed consent must be obtained from all participants, and confidentiality of participant data must be maintained throughout.
              </p>
              <p className="mt-2">
                Authors must affirm that the work is original, has not been published previously, and is not under consideration elsewhere. Any potential conflicts of interest must be disclosed.
              </p>

              <h3 className="text-xl font-bold mt-8">Statistical Reporting</h3>
              <p>
                Authors should report effect sizes, confidence intervals, and exact p-values where possible. The use of APA-recommended statistical reporting conventions is strongly encouraged. For qualitative research, authors should clearly describe their methodological framework and data analysis procedures.
              </p>
            </div>
          </div>

          {/* Sidebar Resources */}
          <div className="space-y-8">
            <div className="bg-muted/50 p-6 rounded-lg border border-border sticky top-24">
              <h3 className="font-serif font-bold text-lg mb-4 text-primary">Resources</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-md flex items-start gap-3">
                  <FileText className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Manuscript Template</h4>
                    <p className="text-xs text-muted-foreground mb-2">Word document with pre-defined APA 7th edition styles.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs h-8">
                      <Download className="h-3 w-3 mr-2" /> Download .docx
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border rounded-md flex items-start gap-3">
                   <FileText className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Cover Letter Template</h4>
                    <p className="text-xs text-muted-foreground mb-2">Standard format for submission cover letter.</p>
                     <Button variant="outline" size="sm" className="w-full text-xs h-8">
                      <Download className="h-3 w-3 mr-2" /> Download .docx
                    </Button>
                  </div>
                </div>

                 <div className="p-4 bg-card border border-border rounded-md flex items-start gap-3">
                   <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Submission Checklist</h4>
                    <p className="text-xs text-muted-foreground mb-2">Ensure you have everything before submitting.</p>
                     <Button variant="outline" size="sm" className="w-full text-xs h-8">
                      <Download className="h-3 w-3 mr-2" /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
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
