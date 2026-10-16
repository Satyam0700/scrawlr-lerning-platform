import Link from "next/link";
import { Suspense } from "react";
import { Bell } from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Vertex Logo Mark: Geometric Inverted Triangle */}
            <div className="w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Left facet */}
                <path
                  d="M14 24L3 6H10.5L14 13L17.5 6H25L14 24Z"
                  fill="#F97316"
                />
                {/* Right facet shadow */}
                <path
                  d="M14 24L10.5 6H17.5L14 24Z"
                  fill="#EA580C"
                />
                {/* Inner center highlight */}
                <path
                  d="M14 24L10.5 6H14L14 24Z"
                  fill="#FB923C"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span className="font-sans font-bold text-xl text-neutral-900 tracking-tight">
              Vertex
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/my-learning"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              My Learning
            </Link>
          </nav>
        </div>

        {/* Right: Notification Bell & Profile Avatar / Auth */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="text-neutral-600 hover:text-neutral-900 transition-colors p-1.5 rounded-full hover:bg-neutral-100"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>

          <Suspense
            fallback={
              <div className="w-9 h-9 rounded-full bg-neutral-100 animate-pulse" />
            }
          >
            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="btn btn-tertiary h-9 text-xs sm:text-sm font-medium"
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="btn btn-primary h-9 text-xs sm:text-sm px-3.5"
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-neutral-200/60 shadow-sm",
                  },
                }}
              />
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
