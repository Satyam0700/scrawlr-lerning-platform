"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setVisible(true);
    setIsNavigating(true);
    setProgress(15);

    // Incrementally crawl forward up to 88% while waiting
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        if (prev < 40) return prev + 12;
        if (prev < 70) return prev + 6;
        return prev + 2;
      });
    }, 180);
  }, []);

  const completeProgress = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    const hideTimeout = setTimeout(() => {
      setVisible(false);
      setIsNavigating(false);
      setProgress(0);
    }, 250);
    return hideTimeout;
  }, []);

  // Complete progress bar when route or search params change
  useEffect(() => {
    if (isNavigating) {
      const timeoutId = setTimeout(() => {
        completeProgress();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, searchParams, isNavigating, completeProgress]);

  // Handle global link click interception
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, hashes, and modifiers
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.getAttribute("target") === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const destinationUrl = new URL(href, window.location.href);

        if (
          destinationUrl.pathname === currentUrl.pathname &&
          destinationUrl.search === currentUrl.search &&
          destinationUrl.hash !== currentUrl.hash
        ) {
          return;
        }

        if (destinationUrl.origin === currentUrl.origin) {
          startProgress();
        }
      } catch {
        if (href.startsWith("/")) {
          startProgress();
        }
      }
    };

    const handleCustomStart = () => startProgress();
    const handleCustomDone = () => completeProgress();

    window.addEventListener("scrawlr:navigation-start", handleCustomStart);
    window.addEventListener("scrawlr:navigation-end", handleCustomDone);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("scrawlr:navigation-start", handleCustomStart);
      window.removeEventListener("scrawlr:navigation-end", handleCustomDone);
      document.removeEventListener("click", handleDocumentClick, true);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startProgress, completeProgress]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 nav-progress-glow transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * Helper function to trigger the top progress bar programmatically
 * (e.g., from router.push or form submissions).
 */
export function triggerNavigationProgress() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("scrawlr:navigation-start"));
  }
}
