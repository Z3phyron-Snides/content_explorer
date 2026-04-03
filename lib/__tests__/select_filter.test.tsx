import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import SelectFilter from "@/components/ui/select_filter";
import { Category } from "@/lib/types";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockCategories: Category[] = [
  { slug: "electronics", name: "Electronics", url: "/cat/electronics" },
  { slug: "clothing", name: "Clothing", url: "/cat/clothing" },
  { slug: "books", name: "Books", url: "/cat/books" },
];

describe("SelectFilter", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders with default "All Categories" text', () => {
    render(<SelectFilter categories={mockCategories} />);
    expect(screen.getByText("All Categories")).toBeInTheDocument();
  });

  it("renders with initial category selected", () => {
    render(
      <SelectFilter
        categories={mockCategories}
        initialCategory="electronics"
      />,
    );
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<SelectFilter categories={mockCategories} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("selects category and updates URL", async () => {
    const user = userEvent.setup();
    render(<SelectFilter categories={mockCategories} />);

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(screen.getByText("Electronics"));

    expect(mockPush).toHaveBeenCalledWith("/?category=electronics");
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SelectFilter categories={mockCategories} />
        <div data-testid="outside">Outside</div>
      </div>,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("list")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
