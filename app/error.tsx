"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log unexpected runtime or network error
    console.error("Scrawlr Platform Root Error:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-900 flex flex-col font-sans">
      <header className="w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full shadow-xs rounded-[7px]"
              >
                <rect width="28" height="28" rx="7" fill="url(#scrawlr-brand-grad-err)" />
                <path
                  d="M18.5 9.8C18.5 9.8 16.8 8 13.8 8C11 8 9.2 9.6 9.2 11.5C9.2 14.4 18.8 13.4 18.8 17.2C18.8 20.2 16.2 21.2 13.8 21.2C10.8 21.2 9 19.6 9 19.6"
                  stroke="#FFFFFF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18.5" cy="9.8" r="1.3" fill="#93C5FD" />
                <defs>
                  <linearGradient
                    id="scrawlr-brand-grad-err"
                    x1="2"
                    y1="2"
                    x2="26"
                    y2="26"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-sans font-bold text-xl text-neutral-900 tracking-tight">
              Scrawlr
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 shadow-xs">
          <AlertTriangle className="w-7 h-7 stroke-[1.8]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-100/60 border border-amber-200/80 mb-4 select-none">
          Network / Connection Error
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Unable to load content
        </h1>

        {/* Explanation */}
        <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mt-3 max-w-md">
          We encountered an issue while communicating with our data services. This could be due to a brief network disconnection or temporary server delay.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto btn btn-primary h-11 px-6 inline-flex items-center justify-center gap-2 text-sm font-medium shadow-sm cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
            {isRetrying ? "Retrying..." : "Try again"}
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto btn btn-secondary h-11 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium border border-neutral-300"
          >
            <Home className="w-4 h-4 text-neutral-500" />
            Back to Home
          </Link>
        </div>

        {/* Diagnostic Error Details */}
        {error?.message && (
          <div className="mt-12 w-full text-left">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full text-xs font-medium text-neutral-500 hover:text-neutral-700 p-2.5 rounded-lg border border-neutral-200/60 bg-neutral-100/50"
            >
              <span>Technical details</span>
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {showDetails && (
              <div className="p-3 mt-2 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-mono break-all whitespace-pre-wrap max-h-40 overflow-y-auto">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
