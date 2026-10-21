import React from "react";
import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="mb-10">
          <div className="w-48 h-9 rounded-lg bg-neutral-200 skeleton-shimmer mb-3" />
          <div className="w-80 h-5 rounded-md bg-neutral-200/70 skeleton-shimmer" />
        </div>

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

      <BottomGraphic />
    </div>
  );
}
