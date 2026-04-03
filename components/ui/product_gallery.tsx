"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  thumbnail: string;
  images: string[];
  title: string;
}

export default function ProductGallery({ thumbnail, images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  const allImages = [thumbnail, ...images.filter(img => img !== thumbnail)];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden border">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-8"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-20 bg-white border-2 rounded-2xl overflow-hidden shrink-0 transition-all ${
              selectedImage === img
                ? "border-black ring-2 ring-black/20"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image src={img} alt="" fill className="object-contain p-2" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}