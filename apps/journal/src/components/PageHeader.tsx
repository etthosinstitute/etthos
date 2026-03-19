import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("bg-muted/30 border-b border-border py-12 md:py-16", className)}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif font-bold text-3xl md:text-5xl mb-4 text-foreground">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
