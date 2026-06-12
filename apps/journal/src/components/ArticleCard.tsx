import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, User } from "lucide-react";
import type { PublicArticle } from "@/features/public-site/queries";

export function ArticleCard({ article }: { article: PublicArticle }) {
  return (
    <div className="group journal-panel relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25 hover:shadow-[0_24px_60px_-45px_rgba(19,34,56,0.3)]">
      <div className="absolute inset-x-7 top-0 h-px bg-[hsl(var(--highlight)/0.72)]" />
      <div className="mb-5 flex items-center justify-between gap-3">
        <Badge
          variant="secondary"
          className="rounded-full border-0 bg-secondary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          {article.type}
        </Badge>
        <div className="journal-meta flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" />
          {article.date}
        </div>
      </div>

      <h3 className="journal-title mb-4 text-[1.9rem] leading-[1.16] transition-colors group-hover:text-secondary line-clamp-3">
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-x-1 text-[15px] text-[hsl(var(--ink-soft))]">
        <User className="h-3.5 w-3.5 mr-1 shrink-0" />
        {article.authors.map((a, i) => (
          <span key={i}>
            {a.name}
            {i < article.authors.length - 1 ? "," : ""}
          </span>
        ))}
      </div>

      {article.keywords && article.keywords.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {article.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-[hsl(var(--highlight)/0.1)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--highlight))]"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      <p className="journal-body mb-8 line-clamp-4">{article.abstract}</p>

      <div className="flex items-center justify-between border-t border-border/90 pt-5">
        <div className="journal-meta">
          Vol {article.volume}, Issue {article.issue}
          {article.doi && (
            <span className="ml-2 font-medium normal-case tracking-normal text-secondary/85">
              DOI: {article.doi}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-full border-border bg-background/80 text-xs"
          >
            <Link href={`/articles/${article.slug}`}>
              <FileText className="h-3.5 w-3.5" />
              Read
            </Link>
          </Button>
          {article.pdfUrl ? (
            <Button
              asChild
              size="sm"
              className="h-8 gap-1 rounded-full text-xs"
            >
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-3.5 w-3.5" />
                PDF
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              disabled
              className="h-8 gap-1 rounded-full text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
