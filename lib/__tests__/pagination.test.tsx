import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '@/components/ui/pagination';

vi.mock('lucide-react', () => ({
  ChevronLeft: () => <span data-testid="chevron-left">←</span>,
  ChevronRight: () => <span data-testid="chevron-right">→</span>,
}));

describe('Pagination', () => {
  it('returns null when totalPages <= 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} query="" category="" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page numbers correctly', () => {
    render(<Pagination currentPage={2} totalPages={5} query="" category="" />);
    
    [1, 2, 3, 4, 5].forEach(page => {
      expect(screen.getByText(page.toString())).toBeInTheDocument();
    });
  });

  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} query="" category="" />);
    
    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveClass('bg-black', 'text-white');
  });

  it('disables previous arrow on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} query="" category="" />);
    
    const prevArrow = screen.getByTestId('chevron-left').parentElement;
    expect(prevArrow).toHaveClass('cursor-not-allowed', 'text-gray-300');
  });

  it('disables next arrow on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} query="" category="" />);
    
    const nextArrow = screen.getByTestId('chevron-right').parentElement;
    expect(nextArrow).toHaveClass('cursor-not-allowed', 'text-gray-300');
  });

  it('builds URL with query parameter', () => {
    render(<Pagination currentPage={2} totalPages={3} query="laptop" category="" />);
    
    const page1 = screen.getByText('1');
    expect(page1).toHaveAttribute('href', '/?page=1&q=laptop');
  });

  it('builds URL with category parameter', () => {
    render(<Pagination currentPage={2} totalPages={3} query="" category="electronics" />);
    
    const page3 = screen.getByText('3');
    expect(page3).toHaveAttribute('href', '/?page=3&category=electronics');
  });

  it('has aria labels for accessibility', () => {
    render(<Pagination currentPage={2} totalPages={3} query="" category="" />);
    
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });
});