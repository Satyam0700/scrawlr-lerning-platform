"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CourseProgressBarProps {
  progressPercentage?: number;
  continueLessonSlug?: string;
}

export function CourseProgressBar({
  progressPercentage = 35,
  continueLessonSlug,
}: CourseProgressBarProps) {
  const targetHref = continueLessonSlug
    ? `/lessons/${continueLessonSlug}`
    : "#";

  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-4 sm:px-6 sm:py-3.5 shadow-xl flex items-center justify-between gap-4 sm:gap-8 pointer-events-auto transition-all">
        {/* Left: Your Progress label and percent */}
        <div className="flex flex-col flex-shrink-0">
          <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
            Your Progress
          </span>
          <span className="text-sm sm:text-base font-bold text-neutral-900">
            {progressPercentage}% complete
          </span>
        </div>

        {/* Center: Progress Bar Track */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>
        </div>

        {/* Right: Continue Learning Button */}
        <Link
          href={targetHref}
          className="btn btn-primary h-11 px-5 sm:px-6 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm flex-shrink-0 hover:bg-[#EA6A10] transition-colors"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
