// app/products/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-200 rounded-3xl" />
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 rounded-2xl w-3/4" />
          <div className="h-6 bg-gray-200 rounded-2xl w-1/2" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-16 bg-gray-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}