import React from "react";
import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";
import { getAllCourses, formatDuration } from "@/sanity/lib/data";
import { CourseCard } from "@/app/components/CourseCard";
import { NextjsIcon, DockerIcon, TypeScriptIcon } from "@/app/components/CourseIcons";

export const metadata = {
  title: "All Courses | Vertex",
  description: "Browse all courses on Vertex learning platform.",
};

export const instant = false;

function getTopicIcon(slug: string) {
  if (slug.includes("nextjs") || slug.includes("react")) {
    return <NextjsIcon />;
  }
  if (slug.includes("docker") || slug.includes("devops") || slug.includes("kubernetes")) {
    return <DockerIcon />;
  }
  if (slug.includes("typescript")) {
    return <TypeScriptIcon />;
  }
  return <NextjsIcon />;
}

export default async function CoursesIndexPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-primary-100 selection:text-primary-500">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
            All Courses
          </h1>
          <p className="font-sans text-neutral-500 text-base mt-2">
            Explore our curated catalog of software engineering and systems courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => {
            const levelDisplay =
              course.level && typeof course.level === "string"
                ? (course.level.charAt(0).toUpperCase() + course.level.slice(1)) as
                    | "Beginner"
                    | "Intermediate"
                    | "Advanced"
                : "Intermediate";

            return (
              <CourseCard
                key={course._id}
                slug={course.slug}
                title={course.title}
                description={course.summary}
                level={levelDisplay}
                duration={formatDuration(course.totalDuration)}
                modulesCount={course.modulesCount || 0}
                coverImage={course.coverImage}
                icon={getTopicIcon(course.slug)}
              />
            );
          })}
        </div>
      </main>

      <BottomGraphic />
    </div>
  );
}
