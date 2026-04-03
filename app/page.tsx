import EmptyState from "@/components/ui/empty_state";
import ProductCard from "@/components/ui/product_card";
import SearchBar from "@/components/ui/search_bar";
import Pagination from "@/components/ui/pagination";
import { getCategories, getProducts } from "@/lib/api";
import { Suspense } from "react";
import SelectFilter from "@/components/ui/select_filter";

interface SearchParams {
  q?: string;
  category?: string;
  page?: string;
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const page = parseInt(params.page || "1");
  const limit = 20;
  const skip = (page - 1) * limit;

  const [productsData, categories] = await Promise.all([
    getProducts({ limit, skip, search: query, category }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(productsData.total / limit);

  return (
    <main className="p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Product Explorer</h1>
        <p className="text-gray-600 mt-2">
          {productsData.total} products • Powered by DummyJSON
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar initialQuery={query} />
        <SelectFilter categories={categories} initialCategory={category} />
      </div>

      {/* Results */}
      <Suspense
        fallback={<div className="text-center py-12">Loading products...</div>}
      >
        {productsData.products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination - now separated */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              query={query}
              category={category}
            />
          </>
        )}
      </Suspense>
    </main>
  );
}
