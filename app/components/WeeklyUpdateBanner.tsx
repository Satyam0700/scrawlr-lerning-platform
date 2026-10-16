import { Star } from "lucide-react";

export function WeeklyUpdateBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20">
      <div className="flex items-center justify-center gap-4 text-sm text-neutral-700">
        <div className="h-[1px] bg-neutral-200 flex-1 max-w-[140px] sm:max-w-xs" />
        <div className="flex items-center gap-2.5 text-center px-2">
          <Star className="w-4 h-4 text-primary-500 stroke-[2] fill-transparent flex-shrink-0" />
          <span className="font-sans font-normal text-neutral-800 text-sm">
            New courses and lessons added every week.
          </span>
        </div>
        <div className="h-[1px] bg-neutral-200 flex-1 max-w-[140px] sm:max-w-xs" />
      </div>
    </div>
  );
}
