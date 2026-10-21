import React from "react";
import Link from "next/link";
import { FileText, Check, ArrowUpRight } from "lucide-react";
import type { SearchResultItem } from "@/sanity/lib/types";
import { getCourseBrandIcon } from "@/app/components/CourseIcons";

interface SearchLessonCardProps {
  item: SearchResultItem;
}

export function SearchLessonCard({ item }: SearchLessonCardProps) {
  const lessonLink = `/lessons/${item.slug}`;
  const keyPoints =
    item.keyPoints && item.keyPoints.length > 0
      ? item.keyPoints.slice(0, 3)
      : [
          "Fetching strategies",
          "Caching techniques",
          "Revalidation methods",
        ];

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300/90 shadow-xs hover:shadow-md active:scale-[0.99] active:shadow-2xs transition-all duration-150 p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6 items-stretch">
      {/* Left Column: Lesson Preview Panel */}
      <div className="w-full md:w-64 lg:w-72 bg-[#F9FAFB] rounded-xl border border-neutral-200/80 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Icon */}
          <div className="mb-3 text-neutral-400">
            {item.courseTitle.toLowerCase().includes("react") ? (
              getCourseBrandIcon("react", "w-5 h-5")
            ) : (
              <FileText className="w-5 h-5 text-neutral-500" />
            )}
          </div>

          {/* Bullet List of Key Points */}
          <ul className="space-y-2 text-xs text-neutral-600 font-normal">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="text-neutral-400 select-none">•</span>
                <span className="truncate">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Right Checkmark Indicator */}
        <div className="flex justify-end pt-3">
          <div className="w-5 h-5 rounded-full bg-neutral-700 text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Right Column: Content Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Header Row: Course Icon + Title + LESSON Badge */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="shrink-0">{getCourseBrandIcon(item.courseTitle, "w-5 h-5")}</div>
              <span className="text-xs sm:text-sm font-medium text-neutral-700 truncate">
                {item.courseTitle}
              </span>
            </div>

            <span className="shrink-0 px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase text-indigo-600 bg-indigo-50 border border-indigo-200/60 rounded">
              LESSON
            </span>
          </div>

          {/* Lesson Title */}
          <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-2">
            <Link href={lessonLink}>{item.title}</Link>
          </h2>

          {/* Lesson Description */}
          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        </div>

        {/* Footer Row: Metadata + Action */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-neutral-100 flex-wrap">
          {/* Left Metadata: Module X */}
          <div className="text-xs font-medium text-neutral-500">
            Module {item.moduleNumber}
          </div>

          {/* Right Action: View lesson */}
          <Link
            href={lessonLink}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors group/btn ml-auto"
          >
            <span>View lesson</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
