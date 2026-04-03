import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
  category: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    return `/?${params.toString()}`;
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Arrow */}
      {prevPage >= 1 ? (
        <Link
          href={buildHref(prevPage)}
          className="w-9 h-9 flex items-center justify-center rounded-2xl border hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-2xl border text-gray-300 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-2xl border ${
            page === currentPage
              ? "bg-black text-white border-black"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next Arrow */}
      {nextPage <= totalPages ? (
        <Link
          href={buildHref(nextPage)}
          className="w-9 h-9 flex items-center justify-center rounded-2xl border hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-2xl border text-gray-300 cursor-not-allowed">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}