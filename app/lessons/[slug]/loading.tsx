import React from "react";
import { Header } from "@/app/components/Header";

export default function LessonLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-primary-100 selection:text-primary-500">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-16 h-4 rounded bg-neutral-200 skeleton-shimmer" />
          <span className="text-neutral-300">/</span>
          <div className="w-32 h-4 rounded bg-neutral-200 skeleton-shimmer" />
          <span className="text-neutral-300">/</span>
          <div className="w-48 h-4 rounded bg-neutral-200 skeleton-shimmer" />
        </div>

        {/* 2-Column Grid: Left Content (Video + Tabs) & Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col">
            {/* 16:9 Video Player Skeleton */}
            <div className="w-full aspect-video rounded-2xl bg-neutral-900/90 relative overflow-hidden flex items-center justify-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs">
                <div className="w-8 h-8 border-3 border-primary-400 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>

            {/* Lesson Title & Meta skeleton */}
            <div className="mt-6">
              <div className="w-28 h-5 rounded-full bg-neutral-200 skeleton-shimmer mb-3" />
              <div className="w-3/4 h-8 rounded-lg bg-neutral-200 skeleton-shimmer mb-4" />
              <div className="flex items-center gap-4">
                <div className="w-20 h-4 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-20 h-4 rounded bg-neutral-200 skeleton-shimmer" />
                <div className="w-24 h-4 rounded bg-neutral-200 skeleton-shimmer" />
              </div>
            </div>

            {/* Content Tabs skeleton */}
            <div className="mt-8 border-b border-neutral-200 flex gap-6 pb-2">
              <div className="w-20 h-6 rounded bg-neutral-200 skeleton-shimmer" />
              <div className="w-20 h-6 rounded bg-neutral-200 skeleton-shimmer" />
              <div className="w-20 h-6 rounded bg-neutral-200 skeleton-shimmer" />
            </div>

            {/* Content notes skeleton */}
            <div className="mt-6 space-y-3">
              <div className="w-full h-4 rounded bg-neutral-200/80 skeleton-shimmer" />
              <div className="w-5/6 h-4 rounded bg-neutral-200/80 skeleton-shimmer" />
              <div className="w-4/5 h-4 rounded bg-neutral-200/80 skeleton-shimmer" />
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="lg:col-span-4 bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-sm">
            <div className="w-36 h-6 rounded bg-neutral-200 skeleton-shimmer mb-6" />
            <div className="space-y-6">
              {[1, 2, 3].map((mod) => (
                <div key={mod} className="space-y-3">
                  <div className="w-44 h-4 rounded bg-neutral-200 skeleton-shimmer" />
                  <div className="space-y-2 pl-3">
                    <div className="w-full h-8 rounded-lg bg-neutral-100 skeleton-shimmer" />
                    <div className="w-full h-8 rounded-lg bg-neutral-100 skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
