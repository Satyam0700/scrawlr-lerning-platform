import React from "react";
import { Header } from "@/app/components/Header";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
        {/* Hero skeleton */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="w-32 h-6 rounded-full bg-neutral-200 skeleton-shimmer mb-6" />
          <div className="w-3/4 h-10 rounded-lg bg-neutral-200 skeleton-shimmer mb-4" />
          <div className="w-1/2 h-5 rounded-md bg-neutral-200/70 skeleton-shimmer mb-8" />
          <div className="w-full max-w-lg h-12 rounded-xl bg-neutral-200 skeleton-shimmer" />
        </div>

        {/* Course cards skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-neutral-200 skeleton-shimmer" />
                <div className="w-3/4 h-6 rounded-md bg-neutral-200 skeleton-shimmer mt-6" />
                <div className="w-full h-4 rounded bg-neutral-100 skeleton-shimmer mt-3" />
                <div className="w-4/5 h-4 rounded bg-neutral-100 skeleton-shimmer mt-2" />
              </div>
              <div className="border-t border-neutral-100 pt-4 mt-8 flex items-center justify-between">
                <div className="w-16 h-3.5 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-16 h-3.5 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-20 h-3.5 rounded bg-neutral-200 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
