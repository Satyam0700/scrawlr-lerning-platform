import React from "react";
import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-primary-100 selection:text-primary-500">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-14 h-4 rounded bg-neutral-200 skeleton-shimmer" />
          <span className="text-neutral-300">/</span>
          <div className="w-40 h-4 rounded bg-neutral-200 skeleton-shimmer" />
        </div>

        {/* Hero course details skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Cover image placeholder */}
          <div className="lg:col-span-4 w-full aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl bg-neutral-200 skeleton-shimmer shadow-sm" />

          {/* Course info */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="w-24 h-6 rounded-full bg-neutral-200 skeleton-shimmer mb-4" />
            <div className="w-4/5 h-10 rounded-lg bg-neutral-200 skeleton-shimmer mb-4" />
            <div className="w-full h-5 rounded bg-neutral-100 skeleton-shimmer mb-2" />
            <div className="w-3/4 h-5 rounded bg-neutral-100 skeleton-shimmer mb-6" />

            {/* Meta chips */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="w-20 h-5 rounded bg-neutral-200 skeleton-shimmer" />
              <div className="w-20 h-5 rounded bg-neutral-200 skeleton-shimmer" />
              <div className="w-24 h-5 rounded bg-neutral-200 skeleton-shimmer" />
              <div className="w-24 h-5 rounded bg-neutral-200 skeleton-shimmer" />
            </div>

            {/* CTA Button */}
            <div className="w-48 h-12 rounded-xl bg-neutral-200 skeleton-shimmer" />
          </div>
        </div>

        {/* What you'll learn section */}
        <div className="mb-16">
          <div className="w-52 h-7 rounded-md bg-neutral-200 skeleton-shimmer mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200/90 rounded-xl p-6 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-200 skeleton-shimmer mb-4" />
                <div className="w-32 h-5 rounded bg-neutral-200 skeleton-shimmer mb-2" />
                <div className="w-full h-4 rounded bg-neutral-100 skeleton-shimmer mb-1" />
                <div className="w-4/5 h-4 rounded bg-neutral-100 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>

        {/* Course Curriculum list */}
        <div>
          <div className="w-48 h-7 rounded-md bg-neutral-200 skeleton-shimmer mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-2xs flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 skeleton-shimmer" />
                  <div>
                    <div className="w-48 h-5 rounded bg-neutral-200 skeleton-shimmer mb-1.5" />
                    <div className="w-32 h-4 rounded bg-neutral-100 skeleton-shimmer" />
                  </div>
                </div>
                <div className="w-16 h-4 rounded bg-neutral-200 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomGraphic />
    </div>
  );
}
