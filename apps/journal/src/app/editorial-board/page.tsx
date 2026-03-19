import { PageHeader } from "@/components/PageHeader";
import { editorialBoard } from "@/lib/data";
import { Mail, MapPin, Globe } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Board",
  description: "Meet the distinguished scholars guiding the Etthos Journal of Psychology — profiles, affiliations, and areas of expertise.",
};

export default function EditorialBoardPage() {
  return (
    <>
      <PageHeader 
        title="Editorial Board" 
        description="Meet the distinguished scholars and practitioners guiding the Etthos Journal of Psychology." 
      />
      
      <div className="container mx-auto px-4 py-16">
        
        {/* All Board Members */}
        <div className="space-y-8">
          {editorialBoard.map((member, idx) => (
            <div
              key={member.id}
              className="bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo or Avatar */}
                <div className="flex-shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="w-28 h-28 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-lg bg-primary/10 flex items-center justify-center text-3xl font-serif font-bold text-primary">
                      {member.name
                        .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*(\(Dr\.\))?\s*/i, "")
                        .charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        Editorial Board Member {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {member.designation}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {member.department}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {member.institution}, {member.country}
                  </p>

                  {/* Contact */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 hover:text-secondary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {member.email}
                    </a>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {member.country}
                    </span>
                    {member.orcid && (
                      <a
                        href={`https://orcid.org/${member.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-secondary transition-colors"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        ORCID: {member.orcid}
                      </a>
                    )}
                  </div>

                  {/* Expertise */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.expertise.map((area) => (
                      <span
                        key={area}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {member.biography}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
