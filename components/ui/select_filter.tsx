'use client';

import { useState, useRef, useEffect } from "react";
import { Category } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectFilterProps {
  categories: Category[];
  initialCategory?: string;
}

export default function SelectFilter({
  categories,
  initialCategory = "",
}: SelectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initialCategory);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("category", value);
    else params.delete("category");
    params.delete("page");
    router.push(`/?${params.toString()}`);
    setSelected(value);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-3 bg-white border border-gray-300 rounded-3xl text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
      >
        {selected
          ? categories.find((c) => c.slug === selected)?.name
          : "All Categories"}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-auto">
          <li
            className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-base"
            onClick={() => handleSelect("")}
          >
            All Categories
          </li>
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className={`px-5 py-3 hover:bg-gray-100 cursor-pointer text-base ${
                selected === cat.slug ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => handleSelect(cat.slug)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}