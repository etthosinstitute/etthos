import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, User } from "lucide-react";
import type { ArticleData } from "@/lib/data";

export function ArticleCard({ article }: { article: ArticleData }) {
  return (
    <div className="group border border-border bg-card rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="secondary" className="font-normal">
          {article.type}
        </Badge>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" />
          {article.date}
        </div>
      </div>
      
      <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-secondary transition-colors line-clamp-2">
        <Link href={`/articles/${article.slug}`}>
          {article.title}
        </Link>
      </h3>
      
      <div className="text-sm text-muted-foreground mb-2 flex flex-wrap gap-x-1 items-center">
        <User className="h-3.5 w-3.5 mr-1 shrink-0" />
        {article.authors.map((a, i) => (
          <span key={i}>
            {a.name}{i < article.authors.length - 1 ? "," : ""}
          </span>
        ))}
      </div>

      {article.keywords && article.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.keywords.slice(0, 3).map((kw) => (
            <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {kw}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
        {article.abstract}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
         <div className="text-xs text-muted-foreground">
            Vol {article.volume}, Issue {article.issue}
            {article.doi && (
              <span className="ml-2 text-secondary">DOI: {article.doi}</span>
            )}
         </div>
         <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1">
              <Link href={`/articles/${article.slug}`}>
                <FileText className="h-3.5 w-3.5" />
                Read
              </Link>
            </Button>
            <Button size="sm" className="h-8 text-xs gap-1">
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
         </div>
      </div>
    </div>
  );
}
