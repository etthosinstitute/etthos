import { PageHeader } from "@/components/PageHeader";
import { Check, Shield, Lock, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Ethics",
  description: "Publication ethics, peer review policy, plagiarism policy, and copyright information for the Etthos Journal of Psychology.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHeader 
        title="Policies & Ethics" 
        description="Our commitment to ethical publishing and research integrity in psychology and behavioural sciences." 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2">
              <a href="#peer-review" className="block px-4 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors text-primary border-l-2 border-secondary">
                Peer Review Policy
              </a>
              <a href="#ethics" className="block px-4 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:border-secondary">
                Publication Ethics
              </a>
               <a href="#human-subjects" className="block px-4 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:border-secondary">
                Human Subjects Research
              </a>
               <a href="#plagiarism" className="block px-4 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:border-secondary">
                Plagiarism Policy
              </a>
               <a href="#copyright" className="block px-4 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:border-secondary">
                Copyright & Licensing
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            
            <section id="peer-review" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <Check className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">Peer Review Policy</h2>
              </div>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>
                  The Etthos Journal of Psychology employs a strict <strong>double-blind peer review process</strong>. Both reviewer and author identities are concealed throughout the review process to ensure unbiased and objective evaluation of scholarly work.
                </p>
                <p>
                  All submitted manuscripts are initially screened by the editorial office for suitability, scope alignment, and compliance with the journal&apos;s guidelines. Manuscripts passing this screening are assigned to at least two independent expert reviewers with relevant domain expertise in psychology or behavioural sciences.
                </p>
                 <ul>
                    <li><strong>Initial Screening:</strong> 3–5 working days</li>
                    <li><strong>Peer Review Process:</strong> 4–6 weeks</li>
                    <li><strong>Revision Period:</strong> Authors are typically given 2–4 weeks for revisions</li>
                    <li><strong>Editorial Decision:</strong> Accept, Minor Revisions, Major Revisions, or Reject</li>
                 </ul>
              </div>
            </section>

            <div className="h-px bg-border"></div>

            <section id="ethics" className="scroll-mt-24">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">Publication Ethics</h2>
              </div>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>
                  The Etthos Journal of Psychology strictly adheres to the guidelines of the <strong>Committee on Publication Ethics (COPE)</strong>. Authors, editors, and reviewers are expected to maintain the highest standards of publication ethics.
                </p>
                <p>
                  <strong>Authorship:</strong> Authorship should be limited to those who have made a significant intellectual contribution to the conception, design, execution, or interpretation of the reported study. All listed authors must have approved the final version of the manuscript and agreed to its submission.
                </p>
                 <p>
                  <strong>Data Integrity:</strong> Authors may be asked to provide raw data in connection with a paper for editorial review. Fabrication or falsification of data constitutes a serious breach of ethics and will result in immediate rejection and potential sanctions.
                </p>
                <p>
                  <strong>Conflict of Interest:</strong> All authors must disclose any financial or personal relationships that could be perceived as influencing their work. The editorial team will assess all declared conflicts and take appropriate action.
                </p>
              </div>
            </section>

            <div className="h-px bg-border"></div>

            <section id="human-subjects" className="scroll-mt-24">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">Human Subjects Research Ethics</h2>
              </div>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>
                  All research involving human participants published in the Etthos Journal of Psychology must have been conducted in accordance with the <strong>Declaration of Helsinki</strong> (2013 revision) and must have received approval from an appropriate Institutional Review Board (IRB) or Ethics Committee.
                </p>
                <p>
                  Authors must include a clear statement in the manuscript confirming: (a) the name of the approving ethics body, (b) the approval reference number, and (c) that informed consent was obtained from all participants (or their legal guardians in the case of minors). For qualitative research involving sensitive populations, additional safeguards for participant confidentiality and anonymity must be described.
                </p>
                <p>
                  Research involving deception, vulnerable populations, or sensitive topics must provide additional ethical justifications. The editorial board reserves the right to request further documentation or to reject manuscripts that do not meet ethical standards.
                </p>
              </div>
            </section>

            <div className="h-px bg-border"></div>

             <section id="plagiarism" className="scroll-mt-24">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">Plagiarism Policy</h2>
              </div>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>
                   The journal has a <strong>zero-tolerance policy</strong> towards plagiarism. All submissions are checked for similarity using industry-standard software (e.g., Turnitin, iThenticate).
                </p>
                <p>
                   Similarity index must be below 15% (excluding references and direct quotations). Any manuscript found to contain plagiarised material will be rejected immediately, and the authors may be notified to their affiliated institutions and barred from future submissions.
                </p>
              </div>
            </section>

            <div className="h-px bg-border"></div>

             <section id="copyright" className="scroll-mt-24">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <FileText className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">Copyright & Licensing</h2>
              </div>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>
                   This is an Open Access journal. All articles are distributed under the terms of the <strong>Creative Commons Attribution License (CC BY 4.0)</strong>, 
                   which permits unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited.
                </p>
                <p>
                   Authors retain the copyright of their work. By submitting a manuscript, authors grant the journal a non-exclusive licence to publish and disseminate the work.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
