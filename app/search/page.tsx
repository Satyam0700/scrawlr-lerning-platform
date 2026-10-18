import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { searchContent } from "@/sanity/lib/data";
import { SearchResultsClient } from "./SearchResultsClient";

export const instant = false;

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const rawQ = resolvedParams.q;
  const query = typeof rawQ === "string" && rawQ.trim() ? rawQ.trim() : "data fetching";

  return {
    title: `Results for "${query}" | Vertex Search`,
    description: `Found courses and video lessons matching "${query}" on Vertex.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const rawQ = resolvedParams.q;
  const rawSort = resolvedParams.sort;

  const query = typeof rawQ === "string" && rawQ.trim() ? rawQ.trim() : "data fetching";
  const sort = typeof rawSort === "string" ? rawSort : "most-relevant";

  const searchData = await searchContent(query, sort);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 flex flex-col font-sans">
      {/* Shared Application Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
        {/* Header Hero Section */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* SEARCH RESULTS Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-primary-600 bg-primary-100/70 border border-primary-200/80 mb-5 select-none shadow-2xs">
            SEARCH RESULTS
          </div>

          {/* Heading */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-tight">
            Results for <span className="text-primary-500 font-serif">&ldquo;{query}&rdquo;</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-neutral-500 text-sm sm:text-base mt-2.5">
            Found {searchData.totalCount} results across {searchData.coursesCount} courses
          </p>
        </div>

        {/* Interactive Search Client Component */}
        <Suspense
          fallback={
            <div className="w-full py-16 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm text-neutral-400">Loading search results...</p>
            </div>
          }
        >
          <SearchResultsClient
            key={`${query}-${sort}`}
            initialQuery={query}
            initialSort={sort}
            results={searchData.results}
            totalCount={searchData.totalCount}
            coursesCount={searchData.coursesCount}
          />
        </Suspense>
      </main>
    </div>
  );
}
