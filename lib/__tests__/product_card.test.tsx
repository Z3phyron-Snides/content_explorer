import { render, screen } from '@testing-library/react';
import { Product } from '@/lib/types';
import { describe, expect, it } from 'vitest';
import ProductCard from '@/components/ui/product_card';

const mockProduct: Product = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  images: [],
};

describe('ProductCard', () => {
  it('renders title, discounted price, rating and category', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    expect(screen.getByText('$477.85')).toBeInTheDocument();   // ← Fixed: actual calculated value
    expect(screen.getByText('4.69')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
  });

  it('shows discount badge and strikethrough when discount > 0', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('-13%')).toBeInTheDocument();
    expect(screen.getByText('$549')).toHaveClass('line-through');
  });

  it('links to correct product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/1');
  });
});