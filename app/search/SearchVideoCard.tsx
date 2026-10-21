import React from "react";
import Link from "next/link";
import { Play, FileText, Folder, ChevronRight } from "lucide-react";
import type { SearchResultItem } from "@/sanity/lib/types";
import { getCourseBrandIcon } from "@/app/components/CourseIcons";

interface SearchVideoCardProps {
  item: SearchResultItem;
}

export function SearchVideoCard({ item }: SearchVideoCardProps) {
  const watchLink = `/lessons/${item.slug}?start=${item.startSeconds || 0}`;

  // Renders the stylized thumbnail matching vertex-search.png
  const renderThumbnailContent = () => {
    const titleLower = item.title.toLowerCase();
    const courseLower = item.courseTitle.toLowerCase();

    if (titleLower.includes("server components") || courseLower.includes("next.js")) {
      return (
        <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
          {/* Stylized background glow and Next.js geometric N */}
          <div className="absolute inset-0 bg-radial from-neutral-800/40 via-transparent to-transparent opacity-60" />
          <div className="w-16 h-16 flex items-center justify-center opacity-85">
            <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
              <circle cx="90" cy="90" r="90" fill="black" />
              <path
                d="M149.508 157.508L69.8335 54.0001H54V126H66.6V69.9481L139.73 165.263C143.155 162.887 146.425 160.293 149.508 157.508Z"
                fill="white"
              />
              <path d="M115.2 54H127.8V126H115.2V54Z" fill="white" />
            </svg>
          </div>
        </div>
      );
    }

    if (titleLower.includes("useeffect") || courseLower.includes("react")) {
      return (
        <div className="w-full h-full bg-[#12141C] p-3 text-[8px] font-mono text-neutral-400 leading-tight relative overflow-hidden select-none">
          <div className="text-neutral-500">{`// Fetch with useEffect`}</div>
          <div className="text-[#E06C75] mt-1">{`const [data, setData] = useState(null);`}</div>
          <div className="text-[#61AFEF]">{`useEffect(() => {`}</div>
          <div className="pl-2 text-[#98C379]">{`fetchData().then(res => {`}</div>
          <div className="pl-4 text-[#ABB2BF]">{`setData(res);`}</div>
          <div className="pl-2 text-[#98C379]">{`}).catch(err => {`}</div>
          <div className="pl-4 text-[#E5C07B]">{`setError(err);`}</div>
          <div className="pl-2 text-[#98C379]">{`});`}</div>
          <div className="text-[#61AFEF]">{`}, []);`}</div>
        </div>
      );
    }

    if (titleLower.includes("building rest api") || titleLower.includes("rest api") || courseLower.includes("node")) {
      return (
        <div className="w-full h-full bg-[#F3F4F6] p-3.5 flex items-center justify-between gap-1 text-[10px] font-sans relative overflow-hidden select-none">
          {/* Client box */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-medium text-neutral-500 mb-1">Client</span>
            <div className="w-12 h-10 bg-white border border-neutral-300 rounded-md shadow-xs flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-neutral-200" />
            </div>
          </div>

          {/* Request arrow */}
          <div className="flex flex-col items-center flex-1 px-1">
            <span className="text-[8px] text-neutral-400 mb-0.5">API Request</span>
            <div className="w-full flex items-center">
              <div className="h-0.5 bg-neutral-300 w-full" />
              <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-neutral-400 rotate-45 -ml-1" />
            </div>
          </div>

          {/* Database box */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-medium text-neutral-500 mb-1">Database</span>
            <div className="w-12 h-10 bg-white border border-neutral-300 rounded-md shadow-xs flex items-center justify-center">
              <span className="text-[8px] font-medium text-neutral-600">Database</span>
            </div>
          </div>
        </div>
      );
    }

    if (titleLower.includes("fetch api basics") || courseLower.includes("javascript")) {
      return (
        <div className="w-full h-full bg-[#0D1117] p-3 text-[9px] font-mono text-neutral-300 leading-normal relative overflow-hidden select-none">
          <div>
            <span className="text-[#FF7B72]">const</span> data = <span className="text-[#FF7B72]">await</span>{" "}
            <span className="text-[#D2A8FF]">fetch</span>(
            <span className="text-[#A5D6FF]">&apos;/api/users&apos;</span>)
          </div>
          <div className="pl-2">
            .<span className="text-[#D2A8FF]">then</span>(res =&gt; res.<span className="text-[#79C0FF]">json</span>())
          </div>
          <div className="pl-2">
            .<span className="text-[#D2A8FF]">catch</span>(err =&gt; console.<span className="text-[#79C0FF]">error</span>(err))
          </div>
        </div>
      );
    }

    // Default stylized fallback
    return (
      <div className="w-full h-full bg-[#18181B] flex items-center justify-center relative overflow-hidden">
        <div className="opacity-70 scale-90">{getCourseBrandIcon(item.courseTitle, "w-10 h-10")}</div>
      </div>
    );
  };

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300/90 shadow-xs hover:shadow-md active:scale-[0.99] active:shadow-2xs transition-all duration-150 p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6 items-stretch">
      {/* Left Column: Video Thumbnail */}
      <div className="relative w-full md:w-64 lg:w-72 aspect-video md:aspect-auto md:h-44 rounded-xl overflow-hidden shrink-0 border border-neutral-200/80 bg-neutral-900 group">
        <Link href={watchLink} className="block w-full h-full relative" aria-label={`Watch ${item.title}`}>
          {renderThumbnailContent()}

          {/* Centered Circular Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-neutral-900 shadow-lg group-hover:scale-110 group-hover:bg-white transition-transform pl-0.5">
              <Play className="w-4 h-4 fill-neutral-900 text-neutral-900 stroke-none" />
            </div>
          </div>

          {/* Bottom Right Duration Badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium rounded-md tracking-tight">
            {item.durationFormatted || item.startFormatted || "12:45"}
          </div>
        </Link>
      </div>

      {/* Right Column: Content Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Header Row: Course Icon + Title + VIDEO Badge */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="shrink-0">{getCourseBrandIcon(item.courseTitle, "w-5 h-5")}</div>
              <span className="text-xs sm:text-sm font-medium text-neutral-700 truncate">
                {item.courseTitle}
              </span>
            </div>

            <span className="shrink-0 px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase text-primary-600 bg-primary-50 border border-primary-200/60 rounded">
              VIDEO
            </span>
          </div>

          {/* Lesson Title */}
          <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-2">
            <Link href={watchLink}>{item.title}</Link>
          </h2>

          {/* Lesson Description */}
          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        </div>

        {/* Footer Row: Metadata + Action */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-neutral-100 flex-wrap">
          {/* Left Metadata */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-neutral-500 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-neutral-600">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              Lesson {item.moduleNumber}.{item.lessonNumber || 1}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-600 truncate max-w-[200px]">
              <Folder className="w-3.5 h-3.5 text-neutral-400" />
              {item.moduleTitle}
            </span>
          </div>

          {/* Right Action: Watch from timestamp */}
          <Link
            href={watchLink}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors group/btn ml-auto"
          >
            <div className="w-5 h-5 rounded-full border border-primary-500 flex items-center justify-center pl-0.5">
              <Play className="w-2.5 h-2.5 fill-primary-500 text-primary-500 stroke-none" />
            </div>
            <span>Watch from {item.startFormatted || "12:45"}</span>
            <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
