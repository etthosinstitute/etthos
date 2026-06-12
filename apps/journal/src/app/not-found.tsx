import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-secondary">
          Error 404
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">
          Page Not Found
        </h1>
        <div className="h-px w-16 bg-[hsl(var(--highlight)/0.72)] mx-auto" />
        <p className="text-muted-foreground leading-relaxed">
          The issue or page you are looking for does not exist, has been moved,
          or has not been published yet.
        </p>
        <div className="pt-4">
          <Button
            asChild
            className="rounded-full px-6 py-5 text-base shadow-md"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
