"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  Play,
  Menu,
  X,
} from "lucide-react";
import { formatDuration } from "@/sanity/lib/format";
import { NextjsIcon } from "@/app/components/CourseIcons";
import type { ModuleData, SanityImage } from "@/sanity/lib/types";

interface LessonSidebarProps {
  courseTitle: string;
  courseSlug: string;
  courseCoverImage?: SanityImage;
  modules: ModuleData[];
  currentLessonSlug: string;
  currentModuleIndex: number;
  currentLessonIndex: number;
}

export function LessonSidebar({
  courseTitle,
  courseSlug,
  modules = [],
  currentLessonSlug,
  currentModuleIndex = 0,
  currentLessonIndex = 0,
}: LessonSidebarProps) {
  // Keep the active module expanded by default
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    [currentModuleIndex]: true,
  });

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalModules = modules.length;
  const displayModuleNumber = currentModuleIndex + 1;

  // Render sidebar contents
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Back to course link */}
      <Link
        href={`/courses/${courseSlug}`}
        className="inline-flex items-center gap-2 text-primary-500 font-sans font-medium text-sm hover:underline mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to course</span>
      </Link>

      {/* Course Summary Card */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-200/80">
        <NextjsIcon className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-sans font-bold text-sm text-neutral-900 truncate">
            {courseTitle || "Next.js for Production"}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-sans text-xs text-neutral-500">
              35% complete
            </span>
          </div>
          {/* Progress track */}
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: "35%" }}
            />
          </div>
        </div>
      </div>

      {/* Module Tracker Dropdown / Header */}
      <div className="py-4 flex items-center justify-between text-neutral-800 border-b border-neutral-200/80">
        <span className="font-sans font-semibold text-xs tracking-tight text-neutral-900">
          Module {displayModuleNumber} of {totalModules}
        </span>
        <ChevronDown className="w-4 h-4 text-neutral-400" />
      </div>

      {/* Modules & Lessons Accordion List */}
      <div className="flex-1 overflow-y-auto py-2 divide-y divide-neutral-100/90 -mx-2 px-2">
        {modules.map((moduleItem, modIdx) => {
          const modNumber = modIdx + 1;
          const isCurrentModule = modIdx === currentModuleIndex;
          const isCompleted = modIdx < currentModuleIndex;
          const isExpanded = !!expandedModules[modIdx];
          const modDuration = formatDuration(moduleItem.duration);

          return (
            <div key={moduleItem._key || modIdx} className="py-2.5">
              {/* Module Header Button */}
              <button
                type="button"
                onClick={() => toggleModule(modIdx)}
                className="w-full flex items-center justify-between gap-3 text-left py-1.5 px-1 hover:bg-neutral-100/60 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Number Badge */}
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full border border-primary-500 bg-primary-50/50 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  ) : isCurrentModule ? (
                    <div className="w-7 h-7 rounded-full bg-primary-500 text-white font-sans font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                      {modNumber}
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-600 font-sans font-medium text-xs flex items-center justify-center flex-shrink-0">
                      {modNumber}
                    </div>
                  )}

                  {/* Title and Duration */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`font-sans text-xs sm:text-sm truncate transition-colors ${
                        isCurrentModule
                          ? "font-bold text-neutral-900"
                          : "font-medium text-neutral-800 group-hover:text-neutral-900"
                      }`}
                    >
                      {moduleItem.title}
                    </h4>
                    <span className="font-sans text-[11px] text-neutral-400 block mt-0.5">
                      {modDuration}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-neutral-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Sub-lessons when expanded */}
              {isExpanded && moduleItem.lessons && moduleItem.lessons.length > 0 && (
                <div className="mt-2 ml-4 pl-4 border-l border-neutral-200/90 space-y-2 py-1">
                  {moduleItem.lessons.map((lesson, lesIdx) => {
                    const isLessonActive =
                      lesson.slug === currentLessonSlug ||
                      (isCurrentModule && lesIdx === currentLessonIndex);

                    return (
                      <Link
                        key={lesson._id || lesson.slug}
                        href={`/lessons/${lesson.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between gap-2.5 py-1.5 px-2 rounded-lg transition-colors group/item ${
                          isLessonActive
                            ? "bg-orange-50/80 text-primary-500"
                            : "hover:bg-neutral-100/60 text-neutral-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isLessonActive ? (
                            <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full border border-neutral-300 flex-shrink-0" />
                          )}

                          <div className="min-w-0">
                            <span
                              className={`text-xs block truncate ${
                                isLessonActive
                                  ? "font-semibold text-neutral-900"
                                  : "font-normal group-hover/item:text-neutral-900"
                              }`}
                            >
                              {lesson.title}
                            </span>
                            {isLessonActive && (
                              <span className="text-[10px] font-semibold text-primary-500 tracking-wide block uppercase">
                                Now playing
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right: Play icon if active, or duration */}
                        <div className="flex-shrink-0">
                          {isLessonActive ? (
                            <div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-2xs">
                              <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                            </div>
                          ) : (
                            <span className="text-[11px] text-neutral-400">
                              {formatDuration(lesson.duration)}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar Bar (visible on < lg) */}
      <div className="lg:hidden w-full bg-[#FAFAF9] border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-neutral-500 hover:text-neutral-900 mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="font-sans font-semibold text-xs text-neutral-900 truncate">
            {courseTitle} • Module {displayModuleNumber}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-800 shadow-2xs"
        >
          <Menu className="w-3.5 h-3.5 text-neutral-600" />
          <span>Curriculum</span>
        </button>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#FAFAF9] p-6 shadow-2xl flex flex-col h-full z-10">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-4 flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-80 xl:w-88 flex-shrink-0 border-r border-neutral-200/80 bg-[#FAFAF9]/90 p-6 self-stretch min-h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
        {sidebarContent}
      </aside>
    </>
  );
}
