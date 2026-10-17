"use client";

import React, { useState } from "react";
import { Check, Lightbulb, PenLine } from "lucide-react";
import { LessonResources } from "./LessonResources";
import type { Resource } from "@/sanity/lib/types";

interface LessonContentTabsProps {
  overviewText?: string;
  keyPoints?: string[];
  proTip?: string;
  resources?: Resource[];
}

export function LessonContentTabs({
  overviewText,
  keyPoints = [],
  proTip,
  resources = [],
}: LessonContentTabsProps) {
  const [activeTab, setActiveTab] = useState<"content" | "notes">("content");

  // Default fallback key points matching lesson UI reference if empty
  const defaultKeyPoints = [
    "Understand the different data fetching methods in Next.js",
    "Learn how caching works in Server Components",
    "Implement revalidation and cache control",
    "Optimize performance with advanced caching strategies",
  ];

  const points = keyPoints && keyPoints.length > 0 ? keyPoints : defaultKeyPoints;

  const defaultOverview =
    "In this lesson, you'll learn how Next.js handles data fetching and caching in both Server and Client Components. We'll explore different caching strategies and revalidation techniques to build fast and scalable applications.";

  const overview = overviewText || defaultOverview;

  const defaultProTip =
    "Use caching and revalidation wisely to ensure your app stays fast and data remains fresh without unnecessary requests.";

  const tip = proTip || defaultProTip;

  return (
    <div className="w-full mt-8">
      {/* Tabs Header */}
      <div className="flex items-center gap-8 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`pb-3.5 text-base font-medium transition-all relative ${
            activeTab === "content"
              ? "text-primary-500 font-semibold"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Lesson Content
          {activeTab === "content" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={`pb-3.5 text-base font-medium transition-all relative ${
            activeTab === "notes"
              ? "text-primary-500 font-semibold"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Notes
          {activeTab === "notes" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "content" ? (
        <div className="pt-8 pb-16 space-y-10">
          {/* Overview Section */}
          <section>
            <h3 className="font-display font-bold text-2xl text-neutral-900 tracking-tight mb-3">
              Overview
            </h3>
            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed">
              {overview}
            </p>
          </section>

          {/* In this lesson you will */}
          {points.length > 0 && (
            <section>
              <h4 className="font-sans font-semibold text-base sm:text-lg text-neutral-900 mb-4">
                In this lesson you will:
              </h4>
              <ul className="space-y-3.5">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-primary-500/80 bg-primary-50/50 flex items-center justify-center text-primary-500 flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="font-sans text-neutral-700 text-sm sm:text-base leading-normal">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pro Tip Card */}
          {tip && (
            <section className="bg-[#FFF8F3] border border-[#FDE6D2] rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
              <div className="w-9 h-9 rounded-full bg-orange-100/80 flex items-center justify-center text-primary-500 flex-shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-sans font-bold text-sm text-neutral-900">
                  Pro Tip
                </h4>
                <p className="font-sans text-xs sm:text-sm text-neutral-700 mt-1 leading-relaxed">
                  {tip}
                </p>
              </div>
            </section>
          )}

          {/* Resources Section */}
          <section>
            <h3 className="font-display font-bold text-2xl text-neutral-900 tracking-tight mb-4">
              Resources
            </h3>
            <LessonResources resources={resources} />
          </section>
        </div>
      ) : (
        /* Presentational Notes Tab */
        <div className="pt-8 pb-16 space-y-6">
          <div className="p-6 bg-white border border-neutral-200/90 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-3 mb-4 text-neutral-800">
              <PenLine className="w-5 h-5 text-primary-500" />
              <h3 className="font-sans font-semibold text-base sm:text-lg">
                Personal Study Notes
              </h3>
            </div>
            <textarea
              readOnly
              value={`Notes for this lesson:\n\n• Key takeaway: Server components execute on server and ship zero javascript.\n• Revalidation tag syntax: revalidateTag('tag-name') triggers on-demand cache purge.\n• Streaming with Suspense isolates asynchronous data fetching bottlenecks.`}
              rows={6}
              className="w-full p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 text-neutral-700 text-sm font-sans focus:outline-none resize-none"
            />
            <p className="text-xs text-neutral-400 mt-2">
              Note: This workspace notes tab is presentational for personal review.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
