import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { Header } from "@/app/components/Header";
import { BottomGraphic } from "@/app/components/BottomGraphic";

export const metadata = {
  title: "My Learning | Scrawlr",
  description: "Track your enrolled courses and lesson progress on Scrawlr.",
};

export default function MyLearningPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
            My Learning
          </h1>
          <p className="font-sans text-neutral-500 text-base mt-2">
            Pick up where you left off across your active courses and tracked video lessons.
          </p>
        </div>

        {/* Empty / Presentational state */}
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-200/60 text-primary-600 flex items-center justify-center mx-auto mb-5 shadow-2xs">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="font-display font-bold text-xl text-neutral-900">
            No courses in progress yet
          </h2>

          <p className="font-sans text-neutral-500 text-sm leading-relaxed mt-2.5 max-w-sm mx-auto">
            Explore our curated catalog of production courses, start learning, and your progress will automatically appear here.
          </p>

          <div className="mt-7">
            <Link
              href="/courses"
              className="btn btn-primary h-11 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-xl shadow-xs hover:bg-primary-600 active:scale-[0.985] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </main>

      <BottomGraphic />
    </div>
  );
}