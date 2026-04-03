// app/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Metadata } from "next";
import Breadcrumb from "@/components/ui/bread_crumbs";
import ProductGallery from "@/components/ui/product_gallery";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let product;
  try {
    product = await getProductById(id);
  } catch {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      images: [product.thumbnail],
      title: product.title,
      description: product.description.slice(0, 160),
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Breadcrumb title={product.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images - now interactive */}
        <ProductGallery
          thumbnail={product.thumbnail}
          images={product.images}
          title={product.title}
        />

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-3xl">
              {product.category}
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-3xl">
              {product.brand}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-5xl font-semibold">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-2xl line-through text-gray-400">
                  ${product.price}
                </span>
                <span className="text-red-500 font-medium">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-8 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-500">
                Rating
              </div>
              <div className="flex items-center gap-1 text-2xl">
                ⭐ <span className="font-semibold">{product.rating}</span>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-500">
                Stock
              </div>
              <div className="text-2xl font-semibold">{product.stock} left</div>
            </div>
          </div>

          <button className="w-full py-6 bg-black text-white text-xl font-semibold rounded-3xl hover:bg-gray-800 transition">
            Add to Cart — ${discountedPrice}
          </button>
        </div>
      </div>
    </div>
  );
}
