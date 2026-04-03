# Checkit Product Explorer

**Production-quality product browser built for the Checkit Frontend Engineer Take-Home Assessment**

![Product Explorer Screenshot](https://github.com/Z3phyron-Snides/content_explorer/raw/main/public/og-image.jpg)



**Live Demo:** [https://contentexplorer.rickettsrowland1798.workers.dev/](https://contentexplorer.rickettsrowland1798.workers.dev/)


## Overview

This is a fast, responsive product catalog application consuming the [DummyJSON](https://dummyjson.com/products) API. Built with Next.js (App Router), TypeScript, and Tailwind CSS, it demonstrates clean architecture, performance optimization, and strong frontend engineering judgment.


**Scope:** Not a full e-commerce platform, focused on engineering quality, test coverage, and production-readiness.

---

## Features

* Fully responsive product grid (mobile → desktop)
* Real-time debounced search (≥300ms)
* Category filter with custom dropdown
* Pagination with preserved query params
* product detail pages with interactive image gallery
* Discount calculations, ratings, stock display
* Dynamic SEO metadata + Open Graph tags
* Skeleton loading + error boundaries
* Empty state handling
* Comprehensive Vitest + Testing Library tests
* ISR caching for performance

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 16 (App Router)             |
| Language   | TypeScript                          |
| Styling    | Tailwind CSS                        |
| Icons      | Lucide React                        |
| Testing    | Vitest + @testing-library/react     |
| API        | DummyJSON (server-side fetching)    |
| Deployment | Cloudflare Workers (OpenNext ready) |

---

## Project Structure

```
app/
├── products/[id]/      # Product detail page
│   ├── page.tsx
│   ├── loading.tsx
├── page.tsx            # Main listing + search/filter
├── loading.tsx
├── error.tsx
├── layout.tsx
components/ui/
├── product_card.tsx
├── product_gallery.tsx
├── search_bar.tsx
├── select_filter.tsx
├── pagination.tsx
├── empty_state.tsx
├── bread_crumbs.tsx
lib/
├── api.ts              # Data fetching + ISR caching
├── types.ts
public/
├── og.png
```

---

## Architecture Decisions & Trade-offs

* **Server Components + Parallel Fetching**: `Promise.all` in page.tsx for products + categories for speed.
* **URL-driven State**: Search, category, and pagination stored in URL → shareable/bookmarkable views, no client-side store needed.
* **Debounced Search**: Prevents API hammering; satisfies ≥300ms requirement.
* **Incremental Static Regeneration (ISR)**: Listing `revalidate: 3600` (1 hour), Detail `revalidate: 86400` (24 hours) → balances freshness and performance.
* **Client Components**: Only interactive parts (search input, filter dropdown, image gallery).
* **No External State Management**: Minimal complexity, aligns with assessment scope.




---

## Performance Optimizations

* `next/image` with explicit width/height and lazy loading
* Route-level code splitting for heavy client components
* Next.js fetch cache with `revalidate` → optimal for static-ish data
* Skeleton loaders for perceived performance
* Responsive images and minimal client-side JS

---

## Testing

* 4 component test suites (Pagination, ProductCard, SearchBar, SelectFilter)
* Mocked Next.js navigation hooks
* Coverage includes rendering, interaction, and state handling
* Vitest + React Testing Library

Run tests:

```bash
npm run test
```

---

## Deployment

* **Platform:** Cloudflare Workers (OpenNext adapter)
* Live URL submitted alongside repository


---

## Future Improvements / Bonus Ideas

* Animations
* Seamless search + filter combination
* Client-side cart + toast notifications
* Dark mode toggle
* Infinite scroll alternative
* Full Cloudflare Workers deployment with edge caching
* Accessibility audit and keyboard navigation improvements

---

## Quick Start

```bash
git clone https://github.com/Z3phyron-Snides/content_explorer
cd checkit-explorer
npm install
npm run dev        # Open http://localhost:3000
npm run test       # Run test suites
```

---

## Author

**Rowland Ricketts** — April 2026



