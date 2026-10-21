import React from "react";
import { Header } from "@/app/components/Header";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
        {/* Header Hero Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-28 h-6 rounded-full bg-neutral-200 skeleton-shimmer mb-5" />
          <div className="w-72 h-10 rounded-lg bg-neutral-200 skeleton-shimmer mb-3" />
          <div className="w-48 h-4 rounded bg-neutral-200/70 skeleton-shimmer" />
        </div>

        {/* Search bar skeleton */}
        <div className="w-full h-12 rounded-xl bg-neutral-200 skeleton-shimmer mb-8" />

        {/* Results list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row gap-6"
            >
              <div className="w-full md:w-56 aspect-video rounded-xl bg-neutral-200 skeleton-shimmer flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="w-32 h-4 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-3/4 h-6 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-full h-4 rounded bg-neutral-100 skeleton-shimmer" />
                <div className="w-4/5 h-4 rounded bg-neutral-100 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
