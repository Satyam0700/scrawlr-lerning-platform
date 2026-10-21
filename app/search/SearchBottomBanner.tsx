import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export function SearchBottomBanner() {
  return (
    <div className="bg-[#F0F7FF] border border-[#DBEAFE] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs mt-8">
      <div className="flex items-center gap-4">
        {/* Blue Search Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-primary-100/70 border border-primary-200/50 flex items-center justify-center text-primary-500 shrink-0">
          <Search className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* Text Copy */}
        <div>
          <h3 className="font-sans font-semibold text-base text-neutral-900">
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-sm text-neutral-500 mt-0.5">
            Try different keywords or browse our full course catalog.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/courses"
        className="btn border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-medium px-5 py-2.5 rounded-xl shadow-xs inline-flex items-center gap-2 transition-all group shrink-0"
      >
        <span>Browse all courses</span>
        <ArrowRight className="w-4 h-4 text-primary-500 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
