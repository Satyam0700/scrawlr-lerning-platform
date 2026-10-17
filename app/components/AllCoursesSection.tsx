import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { getFeaturedCourses, getAllCourses, formatDuration } from "@/sanity/lib/data";

export async function AllCoursesSection() {
  let courses = await getFeaturedCourses();
  if (!courses || courses.length === 0) {
    courses = await getAllCourses();
  }
  const displayCourses = courses.slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          All Courses
        </h2>

        <Link
          href="/courses"
          className="text-primary-500 hover:text-[#EA6A10] font-medium text-sm flex items-center gap-1.5 transition-colors group"
        >
          <span>View all courses</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayCourses.map((course) => {
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
            />
          );
        })}
      </div>
    </section>
  );
}
