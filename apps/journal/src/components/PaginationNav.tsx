import Link from "next/link";

interface PaginationNavProps {
  basePath: string;
  page: number;
  totalPages: number;
}

export function PaginationNav({
  basePath,
  page,
  totalPages,
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="mt-10 flex items-center justify-between gap-4 text-sm">
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${previousPage}`}
          className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:bg-accent"
        >
          Previous
        </Link>
      ) : (
        <span />
      )}
      <p className="text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link
          href={`${basePath}?page=${nextPage}`}
          className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:bg-accent"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
