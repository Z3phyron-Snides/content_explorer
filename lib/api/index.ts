// lib/api.ts
import { Category, Product, ProductsResponse } from "@/lib/types";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts({
  limit = 20,
  skip = 0,
  search = "",
  category = "",
}: {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}): Promise<ProductsResponse> {
  let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

  if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR — good balance for products (explained in README)
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 86400 }, // cache longer for detail pages
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

// Helper for categories (we'll use this for the filter)
export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
