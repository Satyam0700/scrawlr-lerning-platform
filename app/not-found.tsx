import React from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";
import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        {/* 404 Big Display */}
        <div className="text-7xl font-display font-extrabold text-primary-500 tracking-tight mb-2">
          404
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Page not found
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mt-3">
          The page, course, or lesson you requested does not exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
          <Link
            href="/courses"
            className="w-full sm:w-auto btn btn-primary h-11 px-6 inline-flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Search className="w-4 h-4" />
            Explore Courses
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto btn btn-secondary h-11 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium border border-neutral-300"
          >
            <Home className="w-4 h-4 text-neutral-500" />
            Back to Home
          </Link>
        </div>
      </main>

      <BottomGraphic />
    </div>
  );
}
