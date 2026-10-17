import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  Clock,
  FileText,
  Users,
  ArrowRight,
  Bookmark,
} from "lucide-react";

import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";
import { getCourseBySlug, getAllCourses, formatDuration } from "@/sanity/lib/data";
import { CourseCoverArtwork, OutcomeIcon } from "./CourseIcons";
import { CourseModulesList } from "./CourseModulesList";
import { CourseProgressBar } from "./CourseProgressBar";
import type { LearningOutcome, CourseCardData } from "@/sanity/lib/types";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getAllCourses();
    const paramsList = courses.map((course: CourseCardData) => ({
      slug: course.slug,
    }));
    // Also include nextjs-for-production alias
    paramsList.push({ slug: "nextjs-for-production" });
    return paramsList;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Vertex",
    };
  }

  return {
    title: `${course.title} | Vertex`,
    description: course.summary,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Derive first lesson slug for Continue Learning CTA
  const firstLessonSlug =
    course.modules?.[0]?.lessons?.[0]?.slug || "";

  // Format student count (e.g. 18240 -> "18.2k" or 2100 -> "2.1k")
  const studentCountDisplay = course.studentCount
    ? course.studentCount >= 1000
      ? `${(course.studentCount / 1000).toFixed(1)}k`
      : `${course.studentCount}`
    : "2.1k";

  // Capitalize level
  const levelDisplay =
    course.level && typeof course.level === "string"
      ? course.level.charAt(0).toUpperCase() + course.level.slice(1)
      : "Intermediate";

  const totalDurationDisplay = formatDuration(course.totalDuration);
  const totalModulesCount = course.modulesCount || course.modules?.length || 0;

  // Standard learning outcomes if course has none defined
  const learningOutcomes =
    course.learningOutcomes && course.learningOutcomes.length > 0
      ? course.learningOutcomes
      : [
          {
            _key: "default-1",
            icon: "layers",
            title: "App Router Foundations",
            description:
              "Master the App Router, layouts, loading states, and nested routing.",
          },
          {
            _key: "default-2",
            icon: "database",
            title: "Data Fetching & Caching",
            description:
              "Fetch data efficiently and leverage caching for better performance.",
          },
          {
            _key: "default-3",
            icon: "gauge",
            title: "Performance Optimization",
            description:
              "Optimize rendering, assets, and bundle size for faster apps.",
          },
          {
            _key: "default-4",
            icon: "cloud",
            title: "Deployment & Scaling",
            description:
              "Deploy with confidence and scale your Next.js applications.",
          },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-primary-100 selection:text-primary-500 relative">
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-8 sm:mb-12 font-sans"
        >
          <Link
            href="/"
            className="hover:text-neutral-900 transition-colors"
          >
            All Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2]" />
          <span className="text-neutral-700 font-medium truncate max-w-xs sm:max-w-md">
            {course.title}
          </span>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Topic Artwork / Cover */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px]">
              <CourseCoverArtwork
                slug={course.slug}
                coverImage={course.coverImage}
                title={course.title}
              />
            </div>
          </div>

          {/* Right Column: Course Info & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Popular Badge */}
            {course.popular && (
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#FFF2EB] text-primary-500 font-sans font-semibold text-[11px] tracking-wider uppercase mb-3">
                POPULAR
              </span>
            )}

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.15]">
              {course.title}
            </h1>

            {/* Summary */}
            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl">
              {course.summary}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 mt-6 text-xs sm:text-sm text-neutral-500 font-sans">
              {/* Level with signal bars icon */}
              <div className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-neutral-500 flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
                  <rect
                    x="6.75"
                    y="7"
                    width="2.5"
                    height="7"
                    rx="0.5"
                    fill={levelDisplay === "Beginner" ? "#CBD5E1" : "currentColor"}
                  />
                  <rect
                    x="11.5"
                    y="4"
                    width="2.5"
                    height="10"
                    rx="0.5"
                    fill={levelDisplay === "Advanced" ? "currentColor" : "#CBD5E1"}
                  />
                </svg>
                <span>{levelDisplay}</span>
              </div>

              {/* Total Duration */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-500 flex-shrink-0 stroke-[1.8]" />
                <span>{totalDurationDisplay}</span>
              </div>

              {/* Modules count */}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500 flex-shrink-0 stroke-[1.8]" />
                <span>{totalModulesCount} modules</span>
              </div>

              {/* Students count */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-500 flex-shrink-0 stroke-[1.8]" />
                <span>{studentCountDisplay} students</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-8 flex-wrap">
              <Link
                href={firstLessonSlug ? `/lessons/${firstLessonSlug}` : "#"}
                className="btn btn-primary h-12 px-6 rounded-xl font-medium text-sm flex items-center gap-2.5 shadow-sm hover:bg-[#EA6A10] transition-colors"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                className="btn bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 h-12 px-5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-2xs hover:border-neutral-300 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-neutral-700 stroke-[1.8]" />
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="mt-14 sm:mt-16 bg-white/70 border border-neutral-200/90 rounded-2xl p-6 sm:p-9 shadow-sm">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-6">
            What you&apos;ll learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {learningOutcomes.map((outcome: LearningOutcome) => (
              <div
                key={outcome._key}
                className="border border-neutral-200/80 rounded-xl p-5 sm:p-6 bg-white/95 flex items-start gap-4 sm:gap-5 shadow-2xs hover:border-neutral-300 transition-colors"
              >
                <OutcomeIcon iconName={outcome.icon || outcome.title} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
                    {outcome.title}
                  </h3>
                  <p className="font-sans text-neutral-500 text-sm leading-relaxed mt-1.5">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Course Content Modules Accordion */}
        <CourseModulesList
          modules={course.modules || []}
          totalModules={totalModulesCount}
          totalDurationFormatted={totalDurationDisplay}
        />
      </main>

      {/* Floating Bottom Progress Bar */}
      <CourseProgressBar
        progressPercentage={35}
        continueLessonSlug={firstLessonSlug}
      />

      {/* Ambient Decorative Silhouette Graphic */}
      <BottomGraphic />
    </div>
  );
}
