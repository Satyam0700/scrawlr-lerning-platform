"use client";

import React from "react";

interface LessonVideoPlayerProps {
  videoUrl?: string;
  title?: string;
  startSeconds?: number;
}

/**
 * Robust provider embed URL parser supporting YouTube, Vimeo, and Bunny.
 * Directly embeds the provider's player with start seconds support.
 */
function getEmbedUrl(url?: string, startSeconds?: number): string | null {
  if (!url) return null;

  const start = startSeconds && startSeconds > 0 ? Math.floor(startSeconds) : 0;

  // 1. YouTube
  // Patterns: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    const startParam = start > 0 ? `&start=${start}` : "";
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1${startParam}`;
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
