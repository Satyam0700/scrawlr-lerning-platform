"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";
import { formatDuration } from "@/sanity/lib/format";
import type { ModuleData } from "@/sanity/lib/types";

interface CourseModulesListProps {
  modules: ModuleData[];
  totalModules: number;
  totalDurationFormatted: string;
}

export function CourseModulesList({
  modules,
  totalModules,
  totalDurationFormatted,
}: CourseModulesListProps) {
  // Allow toggling expansion for each module individually
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  // Toggle between showing initial 6 modules vs all modules
  const [showAll, setShowAll] = useState(false);

  const toggleModule = (key: string) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const visibleModules = showAll ? modules : modules.slice(0, 6);
  const hasMoreThanSix = modules.length > 6;

  return (
    <section className="w-full mt-14 mb-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Course Content
        </h2>
        <span className="font-sans text-neutral-500 text-sm">
          {totalModules} modules • {totalDurationFormatted}
        </span>
      </div>

      {/* Accordion Container */}
      <div className="border border-neutral-200/90 rounded-2xl bg-white shadow-sm overflow-hidden divide-y divide-neutral-200/80">
        {visibleModules.map((moduleItem, index) => {
          const moduleNumber = index + 1;
          const isExpanded = !!expandedKeys[moduleItem._key || String(index)];
          const moduleDuration = formatDuration(moduleItem.duration);

          return (
            <div key={moduleItem._key || index} className="group/item">
              {/* Module Header Bar */}
              <button
                type="button"
                onClick={() => toggleModule(moduleItem._key || String(index))}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-neutral-50/70 transition-colors focus:outline-none focus-visible:bg-neutral-50"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Number Badge */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200/90 bg-neutral-50 flex items-center justify-center font-sans font-medium text-sm text-neutral-800 flex-shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                    {moduleNumber}
                  </div>

                  {/* Title and Summary */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-base sm:text-lg text-neutral-900 group-hover/item:text-primary-500 transition-colors truncate">
                      {moduleItem.title}
                    </h3>
                    {moduleItem.summary && (
                      <p className="font-sans text-neutral-500 text-xs sm:text-sm mt-0.5 line-clamp-2 leading-relaxed">
                        {moduleItem.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Duration and Chevron */}
                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                  <span className="font-sans text-neutral-500 text-xs sm:text-sm whitespace-nowrap">
                    {moduleDuration}
                  </span>
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-neutral-400 group-hover/item:text-neutral-700 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </button>

              {/* Collapsible Lessons Sub-List */}
              {isExpanded && (
                <div className="bg-neutral-50/50 border-t border-neutral-100 px-5 sm:px-8 py-3 divide-y divide-neutral-100 animate-fadeIn">
                  {moduleItem.lessons && moduleItem.lessons.length > 0 ? (
                    moduleItem.lessons.map((lesson, lessonIndex) => (
                      <Link
                        key={lesson._id || lesson.slug}
                        href={`/lessons/${lesson.slug}`}
                        className="py-3 flex items-center justify-between gap-4 group/lesson hover:text-primary-500 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {lesson.freePreview ? (
                            <PlayCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-neutral-400 group-hover/lesson:text-primary-500 flex-shrink-0 transition-colors" />
                          )}
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-xs font-semibold text-neutral-400">
                              {moduleNumber}.{lessonIndex + 1}
                            </span>
                            <span className="text-sm font-medium text-neutral-800 group-hover/lesson:text-primary-500 truncate transition-colors">
                              {lesson.title}
                            </span>
                          </div>
                          {lesson.freePreview && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-100 text-primary-500 flex-shrink-0">
                              Free Preview
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-neutral-400 flex-shrink-0">
                          <span>{formatDuration(lesson.duration)}</span>
                          {!lesson.freePreview && (
                            <Lock className="w-3.5 h-3.5 text-neutral-300" />
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-400 py-2">
                      Lessons for this module will be available shortly.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all N modules Button */}
      {hasMoreThanSix && (
        <div className="flex justify-center -mt-4 relative z-10">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 shadow-sm rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:border-neutral-300"
          >
            <span>
              {showAll ? "Show less" : `Show all ${totalModules} modules`}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
