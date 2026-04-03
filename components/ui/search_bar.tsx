'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    // prevents unnecessary timer setup with ealy returns (that is if query is notchanged)
    if (query === initialQuery) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      params.delete('page');
      router.push(`/?${params.toString()}`);
    }, 300); //Debounce @ exactly 300ms (≥300ms requirement)

    return () => clearTimeout(timer);
  }, [query, initialQuery, router, searchParams]);

  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-5 py-3 bg-white border border-gray-300 rounded-3xl focus:outline-none focus:border-black text-base placeholder:text-gray-400"
        data-testid="search-input"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          data-testid="clear-button"
        >
          ✕
        </button>
      )}
    </div>
  );
}