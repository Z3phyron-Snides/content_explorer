import { LucideSearchAlert } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-7xl mb-6">
        <LucideSearchAlert className="text-gray-300" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-2">No products found</h3>
      <p className="text-gray-500 max-w-xs">
        We couldn&apos;t find any products matching your search or filter.
        <br />
        Try different keywords or clear the filters.
      </p>
    </div>
  );
}