import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, FileText } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

export interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modulesCount: number;
  icon?: React.ReactNode;
  coverImage?: SanityImage;
}

export function CourseCard({
  slug,
  title,
  description,
  level,
  duration,
  modulesCount,
  icon,
  coverImage,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-neutral-300 active:scale-[0.985] active:bg-neutral-50/60 active:shadow-xs transition-all duration-150 cursor-pointer select-none"
    >
      <div>
        {/* Brand / Topic Logo or Cover Image */}
        <div className="w-14 h-14 flex items-center justify-start">
          {coverImage ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-2xs relative flex-shrink-0">
              <Image
                src={urlFor(coverImage).width(112).height(112).fit("crop").url()}
                alt={coverImage.alt || title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            icon
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-neutral-900 mt-6 group-hover:text-primary-500 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-neutral-500 text-sm leading-relaxed mt-2.5">
          {description}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="border-t border-neutral-100 pt-4 mt-8 flex items-center justify-between text-xs text-neutral-500 font-sans">
        {/* Level */}
        <div className="flex items-center gap-1.5">
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            className="text-neutral-500 flex-shrink-0"
          >
            <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
            <rect
              x="6.75"
              y="7"
              width="2.5"
              height="7"
              rx="0.5"
              fill={level === "Beginner" ? "#CBD5E1" : "currentColor"}
            />
            <rect
              x="11.5"
              y="4"
              width="2.5"
              height="10"
              rx="0.5"
              fill={level === "Advanced" ? "currentColor" : "#CBD5E1"}
            />
          </svg>
          <span>{level}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
          <span>{duration}</span>
        </div>

        {/* Module Count */}
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
          <span>{modulesCount} modules</span>
        </div>
      </div>
    </Link>
  );
}
