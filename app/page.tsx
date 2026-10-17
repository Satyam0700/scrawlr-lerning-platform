import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AllCoursesSection } from "./components/AllCoursesSection";
import { WeeklyUpdateBanner } from "./components/WeeklyUpdateBanner";
import { BottomGraphic } from "./components/BottomGraphic";

export const instant = false;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/40 text-neutral-900 selection:bg-primary-100 selection:text-primary-500">
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Section Divider */}
        <div className="w-full border-t border-neutral-200/70" />

        {/* All Courses Section */}
        <AllCoursesSection />

        {/* Weekly Update Banner */}
        <WeeklyUpdateBanner />

        {/* Ambient Decorative Silhouette Graphic */}
        <BottomGraphic />
      </main>
    </div>
  );
}
