"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, Check } from "lucide-react";
import type { SearchResultItem } from "@/sanity/lib/types";
import { SearchVideoCard } from "./SearchVideoCard";
import { SearchLessonCard } from "./SearchLessonCard";
import { SearchBottomBanner } from "./SearchBottomBanner";

interface SearchResultsClientProps {
  initialQuery: string;
  initialSort: string;
  results: SearchResultItem[];
  totalCount: number;
  coursesCount: number;
}

export function SearchResultsClient({
  initialQuery,
  initialSort,
  results: initialResults,
  totalCount,
}: SearchResultsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort || "most-relevant");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [results, setResults] = useState(initialResults);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);


  // Global ⌘ K or Ctrl+K shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push(`/search?q=data+fetching&sort=${sort}`);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", trimmed);
    params.set("sort", sort);
    router.push(`/search?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setIsSortOpen(false);

    // Client-side quick sort for instant feedback
    const sorted = [...results];
    if (newSort === "newest") {
      sorted.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } else if (newSort === "duration") {
      sorted.sort((a, b) => (b.duration || 0) - (a.duration || 0));
    } else {
      sorted.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }
    setResults(sorted);

    // Update URL query
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query || initialQuery);
    params.set("sort", newSort);
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const sortLabels: Record<string, string> = {
    "most-relevant": "Most Relevant",
    newest: "Newest",
    duration: "Duration",
  };

  return (
    <div className="w-full">
      {/* Search Bar Container */}
      <form onSubmit={handleSearchSubmit} className="w-full mb-8">
        <div className="relative flex items-center w-full bg-white border border-neutral-200/90 rounded-2xl px-5 h-14 sm:h-15 shadow-xs hover:border-neutral-300 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20 transition-all">
          <Search className="w-5 h-5 text-neutral-400 flex-shrink-0 mr-3.5 stroke-[2]" />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, lessons, topics..."
            className="w-full bg-transparent border-none text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-neutral-500 bg-neutral-100 border border-neutral-200/90 rounded text-[11px] select-none ml-2">
            ⌘ K
          </kbd>
        </div>
      </form>

      {/* Result Count and Sort Bar */}
      <div className="flex items-center justify-between pb-4 mb-2">
        <div className="text-sm sm:text-base font-semibold text-neutral-900">
          {totalCount} results
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neutral-200/90 rounded-xl text-xs sm:text-sm font-medium text-neutral-800 shadow-2xs hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            aria-expanded={isSortOpen}
          >
            <span>{sortLabels[sort] || "Most Relevant"}</span>
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSortChange(key)}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 flex items-center justify-between"
                >
                  <span>{label}</span>
                  {sort === key && <Check className="w-4 h-4 text-primary-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Cards List */}
      {results.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {results.map((item) =>
            item.type === "video" ? (
              <SearchVideoCard key={item.id} item={item} />
            ) : (
              <SearchLessonCard key={item.id} item={item} />
            )
          )}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-semibold text-lg text-neutral-900 mb-1">
            No results found for &ldquo;{query}&rdquo;
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any lessons matching your search terms. Try searching for broader terms like &ldquo;Next.js&rdquo;, &ldquo;React&rdquo;, or &ldquo;data&rdquo;.
          </p>
        </div>
      )}

      {/* Bottom Discovery Banner */}
      <SearchBottomBanner />
    </div>
  );
}
