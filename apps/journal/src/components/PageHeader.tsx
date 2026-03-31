import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border py-16 md:py-24",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--paper)/0.98)_0%,hsl(var(--accent)/0.52)_58%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 paper-grid opacity-[0.26]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(184,138,68,0.16),transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto mb-5 journal-rule" />
        <p className="journal-kicker mb-4">Etthos Journal of Psychology</p>
        <h1 className="mb-4 font-serif text-4xl font-semibold tracking-tight text-primary md:text-6xl">{title}</h1>
        {description && (
          <p className="mx-auto max-w-3xl text-[17px] leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
