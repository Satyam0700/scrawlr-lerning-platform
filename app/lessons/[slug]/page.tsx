import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  Clock,
  BarChart2,
  Users,
  Bookmark,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Header } from "@/app/components/Header";
import { getLessonBySlug, getAllLessonSlugs, formatDuration } from "@/sanity/lib/data";
import { LessonSidebar } from "./LessonSidebar";
import { LessonVideoPlayer } from "./LessonVideoPlayer";
import { LessonContentTabs } from "./LessonContentTabs";
import type { LessonSummary, ModuleData } from "@/sanity/lib/types";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  try {
    const lessons = await getAllLessonSlugs();
    const paramsList = lessons.map((item) => ({
      slug: item.slug,
    }));
    // Also add design mockup slugs
    paramsList.push({ slug: "data-fetching-and-caching" });
    paramsList.push({ slug: "data-fetching-caching" });
    return paramsList;
  } catch {
    return [
      { slug: "data-fetching-and-caching" },
      { slug: "nextjs-app-router-in-depth-fetching-in-server-components" },
    ];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Vertex",
    };
  }

  const courseTitle = lesson.course?.title || "Vertex";
  return {
    title: `${lesson.title} — ${courseTitle}`,
    description: `Watch ${lesson.title} on Vertex.`,
  };
}

function extractIntroText(notes?: unknown[]): string | undefined {
  if (!Array.isArray(notes) || notes.length === 0) return undefined;
  const firstBlock = notes[0] as { children?: { text?: string }[] };
  if (firstBlock?.children && Array.isArray(firstBlock.children)) {
    const text = firstBlock.children.map((c) => c.text || "").join("").trim();
    if (text) return text;
  }
  return undefined;
}

export default async function LessonPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { start, t } = await searchParams;

  const startSeconds = Number(start || t) || 0;
  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const course = lesson.course;
  const modules: ModuleData[] = course?.modules || [];

  // Flatten lessons across modules to calculate exact curriculum positions
  interface FlatLessonItem {
    lesson: LessonSummary;
    moduleIndex: number;
    moduleTitle: string;
    lessonIndex: number;
  }

  const flatLessons: FlatLessonItem[] = [];
  modules.forEach((mod, modIdx) => {
    (mod.lessons || []).forEach((les, lesIdx) => {
      flatLessons.push({
        lesson: les,
        moduleIndex: modIdx,
        moduleTitle: mod.title,
        lessonIndex: lesIdx,
      });
    });
  });

  // Identify current position in flattened curriculum
  let currentIndex = flatLessons.findIndex(
    (item) => item.lesson.slug === lesson.slug || item.lesson._id === lesson._id
  );

  // If slug alias used (e.g. data-fetching-and-caching), default to matching lesson position
  if (currentIndex === -1 && flatLessons.length > 0) {
    const matchedBySlug = flatLessons.findIndex((item) =>
      item.lesson.slug.includes("fetching-in-server-components")
    );
    currentIndex = matchedBySlug !== -1 ? matchedBySlug : 0;
  }

  const currentFlat = flatLessons[currentIndex] || {
    moduleIndex: 4, // 5th module in 0-indexed for 5.1 in mock
    moduleTitle: "Data Fetching & Caching",
    lessonIndex: 0,
  };

  const moduleNumber = currentFlat.moduleIndex + 1;
  const lessonNumber = currentFlat.lessonIndex + 1;
  const moduleTitle = currentFlat.moduleTitle;

  const previousLesson = currentIndex > 0 ? flatLessons[currentIndex - 1]?.lesson : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]?.lesson
      : null;

  // Metadata formatting
  const durationDisplay = formatDuration(lesson.duration || 5280);
  const studentCountDisplay = (lesson.studentCount || 3426).toLocaleString();
  const levelDisplay = course?.level
    ? course.level.charAt(0).toUpperCase() + course.level.slice(1)
    : "Intermediate";

  const introText = extractIntroText(lesson.notes);
  const summaryDisplay =
    introText ||
    "Learn how Next.js handles data fetching and caching in both Server and Client Components.";

  const courseTitle = course?.title || "Next.js for Production";
  const courseSlug = course?.slug || "nextjs-app-router-in-depth";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      {/* Main Page Layout: Two columns on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <LessonSidebar
          courseTitle={courseTitle}
          courseSlug={courseSlug}
          courseCoverImage={course?.coverImage}
          modules={modules}
          currentLessonSlug={lesson.slug}
          currentModuleIndex={currentFlat.moduleIndex}
          currentLessonIndex={currentFlat.lessonIndex}
        />

        {/* Right Main Lesson Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-neutral-500 mb-6"
            >
              <Link
                href="/courses"
                className="hover:text-neutral-900 transition-colors"
              >
                All Courses
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
              <Link
                href={`/courses/${courseSlug}`}
                className="hover:text-neutral-900 transition-colors"
              >
                {courseTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-700 font-medium truncate max-w-[180px] sm:max-w-none">
                {moduleTitle}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-900 font-semibold truncate max-w-[180px] sm:max-w-none">
                {lesson.title}
              </span>
            </nav>

            {/* Lesson Badge & Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100/90 text-primary-500 font-sans font-bold text-xs uppercase tracking-wider mb-3">
                Lesson {moduleNumber}.{lessonNumber}
              </span>

              <div className="flex items-start justify-between gap-4">
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[40px] text-neutral-900 tracking-tight leading-tight">
                  {lesson.title}
                </h1>

                {/* Bookmark Affordance */}
                <button
                  type="button"
                  aria-label="Bookmark lesson"
                  className="p-2.5 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 shadow-2xs transition-all flex-shrink-0 mt-1"
                >
                  <Bookmark className="w-5 h-5 stroke-[1.8]" />
                </button>
              </div>

              {/* Lesson Summary */}
              <p className="font-sans text-neutral-600 text-base sm:text-lg mt-3 leading-relaxed">
                {summaryDisplay}
              </p>

              {/* Lesson Metadata Stats Row */}
              <div className="flex items-center flex-wrap gap-6 mt-4 pt-1 text-xs sm:text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{durationDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-neutral-400" />
                  <span>{levelDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>{studentCountDisplay} students</span>
                </div>
              </div>
            </div>

            {/* Video Player Embed */}
            <div className="mb-8">
              <LessonVideoPlayer
                videoUrl={lesson.videoUrl}
                title={lesson.title}
                startSeconds={startSeconds}
              />
            </div>

            {/* Lesson Content & Notes Tabs */}
            <LessonContentTabs
              overviewText={introText}
              keyPoints={lesson.keyPoints}
              proTip={lesson.proTip}
              resources={lesson.resources}
            />

            {/* Bottom Lesson Navigation Bar */}
            <div className="border-t border-neutral-200/90 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              {previousLesson ? (
                <Link
                  href={`/lessons/${previousLesson.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 text-neutral-800 shadow-2xs hover:border-neutral-300 transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                  <div className="text-left">
                    <span className="text-[11px] text-neutral-400 block font-sans">
                      Previous Lesson
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors block truncate max-w-[200px]">
                      {previousLesson.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextLesson && (
                <Link
                  href={`/lessons/${nextLesson.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="text-right">
                    <span className="text-[11px] text-white/80 block font-sans uppercase font-medium">
                      Next Lesson
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block truncate max-w-[200px]">
                      {nextLesson.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
