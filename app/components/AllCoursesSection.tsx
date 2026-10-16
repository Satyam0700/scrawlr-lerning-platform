import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard, CourseCardProps } from "./CourseCard";
import { NextjsIcon, DockerIcon, TypeScriptIcon } from "./CourseIcons";

const COURSES: CourseCardProps[] = [
  {
    slug: "nextjs-for-production",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modulesCount: 12,
    icon: <NextjsIcon />,
  },
  {
    slug: "docker-essentials",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modulesCount: 8,
    icon: <DockerIcon />,
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modulesCount: 10,
    icon: <TypeScriptIcon />,
  },
];

export function AllCoursesSection() {
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
        {COURSES.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>
    </section>
  );
}
