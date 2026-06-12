import { ArticleCard } from "@/components/ArticleCard";
import {
  getAuthorProfileBySlug,
  getJournalInfo,
} from "@/features/public-site/queries";
import { notFound } from "next/navigation";
import { Mail, MapPin, Globe, BookOpen } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const [profile, journalInfo] = await Promise.all([
    getAuthorProfileBySlug(id),
    getJournalInfo(),
  ]);
  const member = profile?.member;
  if (member) {
    return {
      title: `${member.name} — Author Profile`,
      description: `${member.name}, ${member.designation} at ${member.institution}. View profile and publications in the ${journalInfo.name}.`,
    };
  }
  return {
    title: "Author Profile",
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { id } = await params;

  const [profile, journalInfo] = await Promise.all([
    getAuthorProfileBySlug(id),
    getJournalInfo(),
  ]);
  const member = profile?.member;
  const authorArticles = profile?.articles || [];

  if (!member) {
    notFound();
  }

  return (
    <>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="w-28 h-28 rounded-lg object-cover border-2 border-primary-foreground/20"
              />
            ) : (
              <div className="w-28 h-28 rounded-lg bg-white/10 flex items-center justify-center text-3xl font-serif font-bold text-primary-foreground">
                {member.name
                  .replace(
                    /^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*(\(Dr\.\))?\s*/i,
                    "",
                  )
                  .charAt(0)}
              </div>
            )}
            <div>
              <h1 className="font-serif font-bold text-3xl mb-2">
                {member.name}
              </h1>
              <p className="text-primary-foreground/80 mb-1">
                {member.designation}
              </p>
              <p className="text-primary-foreground/70 text-sm mb-1">
                {member.department}
              </p>
              <p className="text-primary-foreground/70 text-sm">
                {member.institution}, {member.country}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-primary-foreground/60">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> {member.email}
                </a>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {member.country}
                </span>
                {member.orcid && (
                  <a
                    href={`https://orcid.org/${member.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary-foreground transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5" /> ORCID: {member.orcid}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Expertise */}
          <section>
            <h2 className="font-serif font-bold text-xl text-primary mb-4">
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((area) => (
                <span
                  key={area}
                  className="text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>

          {/* Bio */}
          <section>
            <h2 className="font-serif font-bold text-xl text-primary mb-4">
              Biography
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {member.biography}
            </p>
          </section>

          {/* Published Articles */}
          <section>
            <h2 className="font-serif font-bold text-xl text-primary mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Publications in {journalInfo.shortName}
            </h2>
            {authorArticles.length > 0 ? (
              <div className="space-y-6">
                {authorArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No publications in this journal yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
