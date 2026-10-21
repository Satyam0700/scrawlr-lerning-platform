"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, BookOpen } from "lucide-react";
import { Header } from "@/app/components/Header";

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Course Detail Error:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 shadow-xs">
          <AlertCircle className="w-7 h-7 stroke-[1.8]" />
        </div>

        <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-100/60 border border-amber-200/80 mb-4 select-none">
          Course Load Error
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Failed to load course details
        </h1>

        <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mt-3">
          We could not load the course content or curriculum. Please check your internet connection or try again.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto btn btn-primary h-11 px-6 inline-flex items-center justify-center gap-2 text-sm font-medium shadow-sm cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
            {isRetrying ? "Retrying..." : "Try again"}
          </button>

          <Link
            href="/courses"
            className="w-full sm:w-auto btn btn-secondary h-11 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium border border-neutral-300"
          >
            <BookOpen className="w-4 h-4 text-neutral-500" />
            All Courses
          </Link>
        </div>
      </main>
    </div>
  );
}
