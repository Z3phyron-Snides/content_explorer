// components/ui/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8">
      <Link
        href="/"
        className="text-gray-500 hover:text-black transition-colors flex items-center gap-1"
      >
        ← Back to Products
      </Link>
      <span className="text-gray-300">/</span>
      <span className="font-medium text-gray-900 line-clamp-1">{title}</span>
    </nav>
  );
}