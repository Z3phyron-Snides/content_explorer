import SearchBar from '@/components/ui/search_bar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with initial query', () => {
    render(<SearchBar initialQuery="laptop" />);
    expect(screen.getByTestId('search-input')).toHaveValue('laptop');
  });

  it('debounces and updates URL', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    
    render(<SearchBar initialQuery="" />);
    const input = screen.getByTestId('search-input');
    
    await user.type(input, 'headphones');
    
    vi.advanceTimersByTime(300);
    
    expect(mockPush).toHaveBeenCalledWith('/?q=headphones');
  });
});