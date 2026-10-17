"use client";

import React from "react";

interface LessonVideoPlayerProps {
  videoUrl?: string;
  title?: string;
  startSeconds?: number;
}

/**
 * Extracts 11-character YouTube video ID across watch, live, shorts, embed, and short URLs.
 */
function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    // youtu.be/VIDEO_ID
    if (host === "youtu.be" || host.endsWith(".youtu.be")) {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
      }
    }

    // youtube.com (including m.youtube.com, www.youtube.com, etc.)
    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      // 1. Check ?v=VIDEO_ID
      const v = parsed.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) {
        return v;
      }

      // 2. Check path routes: /live/:id, /shorts/:id, /embed/:id, /v/:id
      const segments = parsed.pathname.split("/").filter(Boolean);
      if (
        segments.length >= 2 &&
        ["live", "shorts", "embed", "v"].includes(segments[0])
      ) {
        const id = segments[1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
          return id;
        }
      }
    }
  } catch {
    // If URL parsing fails, fall back to regex
  }

  // Regex fallback supporting /live/, /shorts/, /embed/, /v/, watch?v=, and youtu.be
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|shorts\/|watch\?.*v=))([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return ytMatch[1];
  }

  return null;
}

/**
 * Extracts start time in seconds from props or URL timestamp parameters (?t= or ?start=).
 */
function extractStartTime(url: string, startSeconds?: number): number {
  if (startSeconds && startSeconds > 0) {
    return Math.floor(startSeconds);
  }
  try {
    const parsed = new URL(url);
    const t = parsed.searchParams.get("t") || parsed.searchParams.get("start");
    if (t) {
      const parsedT = parseInt(t, 10);
      if (!isNaN(parsedT) && parsedT > 0) {
        return parsedT;
      }
    }
  } catch {
    // Ignore URL parse error
  }
  return 0;
}

/**
 * Robust provider embed URL parser supporting YouTube, Vimeo, and Bunny.
 * Directly embeds the provider's player with start seconds support.
 */
function getEmbedUrl(url?: string, startSeconds?: number): string | null {
  if (!url) return null;

  const start = extractStartTime(url, startSeconds);

  // 1. YouTube
  const ytId = extractYouTubeVideoId(url);
  if (ytId) {
    const startParam = start > 0 ? `&start=${start}` : "";
    return `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1${startParam}`;
  }

  // 2. Vimeo
  // Patterns: vimeo.com/ID, player.vimeo.com/video/ID
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/
  );
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
    const videoId = vimeoMatch[3] || vimeoMatch[1];
    const timeHash = start > 0 ? `#t=${start}s` : "";
    return `https://player.vimeo.com/video/${videoId}?autoplay=0${timeHash}`;
  }

  // 3. Bunny
  // Patterns: iframe.mediadelivery.net/embed/LIBRARY/ID
  if (url.includes("mediadelivery.net") || url.includes("bunnycdn")) {
    return url;
  }

  // Fallback: If it's already an embed URL
  if (url.includes("/embed/")) {
    return url;
  }

  return null;
}

export function LessonVideoPlayer({
  videoUrl,
  title = "Lesson Video",
  startSeconds = 0,
}: LessonVideoPlayerProps) {
  const embedUrl = getEmbedUrl(videoUrl, startSeconds);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video bg-neutral-950 rounded-2xl overflow-hidden shadow-lg border border-neutral-800">
        {embedUrl ? (
          <iframe
            key={`${embedUrl}-${startSeconds}`}
            src={embedUrl}
            title={title}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-neutral-400 bg-neutral-900">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-300">
              Video stream currently being processed
            </p>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm">
              The high-definition video embed for this lesson will be available as soon as encoding completes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
