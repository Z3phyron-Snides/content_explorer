// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn&apos;t load the products right now. This is usually a temporary issue.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Try again
      </button>
    </div>
  );
}