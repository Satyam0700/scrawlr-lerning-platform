import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 flex flex-col items-center text-center px-4">
      {/* Pill Badge */}
      <div className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-primary-500 bg-primary-100/60 border border-primary-200 mb-6">
        INTELLIGENT LEARNING
      </div>

      {/* Main Headline */}
      <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-neutral-900 tracking-tight max-w-2xl">
        Search your learning
        <br />
        in plain English.
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md mt-4">
        Vertex understands what you want to learn and
        <br className="hidden sm:inline" />
        finds the exact lessons across all your courses.
      </p>

      {/* CTA Button */}
      <div className="mt-8">
        <Link
          href="/courses"
          className="btn btn-primary h-11 px-6 rounded-md font-medium text-white shadow-sm inline-flex items-center gap-2 hover:bg-[#EA6A10] transition-colors"
        >
          <span>Explore Courses</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="w-full max-w-2xl mt-10">
        <form
          action="/search"
          method="GET"
          className="relative flex items-center w-full bg-white border border-neutral-200 rounded-xl px-4 h-14 shadow-sm hover:border-neutral-300 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20 transition-all"
        >
          <Search className="w-5 h-5 text-neutral-400 flex-shrink-0 mr-3" />
          <input
            type="text"
            name="q"
            placeholder="Ask anything about your learning..."
            className="w-full bg-transparent border-none text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-neutral-500 bg-neutral-100 border border-neutral-200/90 rounded text-[11px] select-none">
            ⌘ K
          </kbd>
        </form>
      </div>
    </section>
  );
}
