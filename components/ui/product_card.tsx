import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-2xl">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="font-medium text-emerald-600">
            ${discountedPrice}
          </span>
          {product.discountPercentage > 0 && (
            <span className="line-through text-gray-400">${product.price}</span>
          )}
        </div>

        <div className="flex justify-between items-center text-xs mt-auto">
          <div className="flex items-center gap-1">
            ⭐ <span className="font-medium">{product.rating}</span>
          </div>
          <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-2xl">
            {product.category}
          </div>
        </div>
      </div>
    </Link>
  );
}
