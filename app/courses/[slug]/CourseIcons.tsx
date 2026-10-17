import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

/**
 * High-fidelity Next.js cover card matching vertex-course.png
 */
export function NextjsCoverCard({ className = "w-full aspect-square" }: { className?: string }) {
  return (
    <div
      className={`relative bg-[#0A0A0A] rounded-[28px] overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-2xl border border-neutral-800/60 ${className}`}
    >
      {/* Subtle internal gradient highlight */}
      <div className="absolute inset-0 bg-radial from-neutral-800/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Next.js N Logo mark with diagonal slit and reflection */}
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[280px] max-h-[280px] drop-shadow-md"
      >
        <mask
          id="mask0_course_next"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
          style={{ maskType: "alpha" }}
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_course_next)">
          {/* Diagonal cut with gradient */}
          <path
            d="M149.508 157.508L69.8335 54.0001H54V126H66.6V69.9481L139.73 165.263C143.155 162.887 146.425 160.293 149.508 157.508Z"
            fill="url(#paint0_linear_next)"
          />
          <path d="M115.2 54H127.8V126H115.2V54Z" fill="url(#paint1_linear_next)" />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_next"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.6" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_next"
            x1="121.5"
            y1="54"
            x2="121.5"
            y2="106"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Universal Course Cover Display:
 * If Next.js topic -> renders iconic NextjsCoverCard matching design reference.
 * Otherwise -> renders Sanity cover image or fallback topic badge.
 */
export function CourseCoverArtwork({
  slug,
  coverImage,
  title,
}: {
  slug: string;
  coverImage?: SanityImage;
  title: string;
}) {
  const isNextjs = slug.includes("nextjs");

  if (isNextjs) {
    return <NextjsCoverCard />;
  }

  if (coverImage) {
    const imageUrl = urlFor(coverImage).width(800).height(800).fit("crop").url();
    return (
      <div className="relative w-full aspect-square rounded-[28px] overflow-hidden shadow-xl border border-neutral-200/80 bg-neutral-900">
        <Image
          src={imageUrl}
          alt={coverImage.alt || title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-square rounded-[28px] bg-neutral-900 flex items-center justify-center p-8 text-white font-display font-bold text-3xl shadow-xl">
      {title}
    </div>
  );
}

/**
 * High-fidelity Learning Outcome Icons matching vertex-course.png
 * (Clean 2px outlined orange terracotta icons)
 */
export function OutcomeIcon({ iconName }: { iconName?: string }) {
  const normalized = (iconName || "").toLowerCase();

  // Stacked isometric wireframe layers (App Router Foundations)
  if (normalized.includes("layer") || normalized.includes("foundations") || normalized === "layers") {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 flex-shrink-0"
      >
        <path d="M24 6L6 16L24 26L42 16L24 6Z" />
        <path d="M6 24L24 34L42 24" />
        <path d="M6 32L24 42L42 32" />
      </svg>
    );
  }

  // Database / barrel cylinder (Data Fetching & Caching)
  if (
    normalized.includes("data") ||
    normalized.includes("cache") ||
    normalized.includes("database") ||
    normalized === "workflow"
  ) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 flex-shrink-0"
      >
        <ellipse cx="24" cy="12" rx="16" ry="6" />
        <path d="M8 12V24C8 27.31 15.16 30 24 30C32.84 30 40 27.31 40 24V12" />
        <path d="M8 24V36C8 39.31 15.16 42 24 42C32.84 42 40 39.31 40 36V24" />
      </svg>
    );
  }

  // Speedometer / Gauge (Performance Optimization)
  if (
    normalized.includes("performance") ||
    normalized.includes("gauge") ||
    normalized.includes("speed") ||
    normalized === "gauge"
  ) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 flex-shrink-0"
      >
        <path d="M8 34C6.5 30 6 25 7 20C9 12 16 6 24 6C32 6 39 12 41 20C42 25 41.5 30 40 34" />
        <path d="M12 28L15 26" />
        <path d="M15 17L18 20" />
        <path d="M24 13V17" />
        <path d="M33 17L30 20" />
        <path d="M36 28L33 26" />
        <circle cx="24" cy="34" r="3" />
        <path d="M24 34L32 24" />
      </svg>
    );
  }

  // Cloud (Deployment & Scaling)
  if (
    normalized.includes("deploy") ||
    normalized.includes("cloud") ||
    normalized.includes("rocket") ||
    normalized.includes("scale")
  ) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 flex-shrink-0"
      >
        <path d="M14 36H35C39.42 36 43 32.42 43 28C43 23.83 39.81 20.41 35.7 20.04C34.6 12.98 28.56 8 21.5 8C14.7 8 8.87 13.06 8.04 19.82C4.62 20.73 2 23.82 2 27.5C2 32.2 5.8 36 10.5 36H14Z" />
      </svg>
    );
  }

  // Shield fallback
  if (normalized.includes("shield") || normalized.includes("security")) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 flex-shrink-0"
      >
        <path d="M24 4L8 10V22C8 32.5 14.8 42.2 24 44C33.2 42.2 40 32.5 40 22V10L24 4Z" />
      </svg>
    );
  }

  // Default Layers icon
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      stroke="#EA580C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10 flex-shrink-0"
    >
      <path d="M24 6L6 16L24 26L42 16L24 6Z" />
      <path d="M6 24L24 34L42 24" />
      <path d="M6 32L24 42L42 32" />
    </svg>
  );
}
