import { PageHeader } from "@/components/PageHeader";
import { getEditorialBoardMembers } from "@/features/public-site/queries";
import { getEditorialImage } from "@/features/public-site/images";
import { Mail, MapPin, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Board",
  description: "Meet the distinguished scholars guiding the Etthos Journal of Health, Behavior and Applied Psychology — profiles, affiliations, and areas of expertise.",
};

export default async function EditorialBoardPage() {
  const sortedBoard = await getEditorialBoardMembers();

  return (
    <>
      <PageHeader 
        title="Editorial Board" 
        description="Meet the distinguished scholars and practitioners guiding the Etthos Journal of Health, Behavior and Applied Psychology." 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">Academic Leadership</p>
          <h2 className="font-serif text-3xl font-bold text-primary">Scholars guiding editorial quality and integrity</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            The journal is supported by academics and practitioners with institutional affiliations, disciplinary expertise, and a shared commitment to rigorous review standards.
          </p>
        </div>
        
        {/* All Board Members */}
        <div className="space-y-8">
          {sortedBoard.map((member) => {
            const editorialImage = getEditorialImage(member.image, member.id);

            return (
            <div
              key={member.id}
              className="rounded-[1.75rem] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25 hover:shadow-[0_24px_65px_-50px_rgba(19,34,56,0.42)] md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo or Avatar */}
                <div className="flex-shrink-0">
                  <Link href={`/authors/${member.slug}`}>
                    {editorialImage ? (
                      <Image
                        src={editorialImage}
                        alt={member.name}
                        width={176}
                        height={176}
                        className={`h-48 w-48 rounded-2xl border border-border shadow-sm transition-all duration-300 hover:opacity-80 ${
                          member.id === "board-ashwarya-raj-laxmi"
                            ? "object-cover object-top scale-110"
                            : "object-contain bg-[hsl(var(--highlight)/0.05)] p-2"
                        }`}
                      />
                    ) : (
                      <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-[hsl(var(--highlight)/0.12)] text-4xl font-serif font-bold text-[hsl(var(--highlight))] hover:bg-[hsl(var(--highlight)/0.18)] transition-colors">
                        {member.name
                          .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*(\(Dr\.\))?\s*/i, "")
                          .charAt(0)}
                      </div>
                    )}
                  </Link>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-primary mb-1 hover:text-secondary transition-colors">
                    <Link href={`/authors/${member.slug}`}>
                      {member.name}
                    </Link>
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
                    {member.expertise.map((area: string) => (
                      <span
                        key={area}
                        className="rounded-full bg-[hsl(var(--highlight)/0.12)] px-2.5 py-1 text-[11px] font-semibold text-[hsl(var(--highlight))]"
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
          );
          })}
        </div>

      </div>
    </>
  );
}
