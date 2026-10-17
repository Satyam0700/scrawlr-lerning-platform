# Prompt 015 — Support YouTube Live, Shorts, and Varied Video Embed URL Formats

## Goal

Ensure all valid YouTube URLs—including YouTube Live streams (`/live/ID`), YouTube Shorts (`/shorts/ID`), standard watch links (`/watch?v=ID`), share links (`youtu.be/ID`), and URLs containing query parameters (such as `?si=...`)—correctly render as playable video embeds in `LessonVideoPlayer.tsx` rather than falling back to the "Video stream currently being processed" placeholder.

## Problem Statement

When a user creates a new course or lesson in Sanity with a YouTube link such as a live stream recording (`https://www.youtube.com/live/J1ybBABaMqM?si=smH8pwDkkAtpelnY`), the lesson page shows the fallback message:
> "Video stream currently being processed — The high-definition video embed for this lesson will be available as soon as encoding completes."

This occurs because `LessonVideoPlayer.tsx`'s current regular expression only checked for `watch?v=`, `embed/`, or `youtu.be/`, failing on modern YouTube paths such as `/live/` or `/shorts/`, or URLs with URL parameters appended before/after the ID.

## Skills Read

- `AGENTS.md` (Section 7 Decisions already made: provider embeds for YouTube, Vimeo, and Bunny; Section 9 Video ingestion & embeds; Section 13 Checks)
- `sanity-best-practices`

## Code Inspected

- `app/lessons/[slug]/LessonVideoPlayer.tsx`: Contains `getEmbedUrl(url?: string, startSeconds?: number)` which parses YouTube, Vimeo, and Bunny embed URLs.
- `sanity/schemaTypes/lessonType.ts`: `videoUrl` field schema allowing valid URLs for YouTube, Vimeo, or Bunny.
- `app/lessons/[slug]/page.tsx`: Passes `lesson.videoUrl`, `lesson.title`, and `startSeconds` to `LessonVideoPlayer`.

## Decisions and Assumptions

1. **Robust URL Parsing**:
   - Refactor YouTube video ID extraction to support:
     - `youtube.com/watch?v=VIDEO_ID` (with any additional params e.g. `&t=...`, `&si=...`)
     - `youtube.com/live/VIDEO_ID` (YouTube Live streams)
     - `youtube.com/shorts/VIDEO_ID` (YouTube Shorts)
     - `youtube.com/embed/VIDEO_ID`
     - `youtube.com/v/VIDEO_ID`
     - `youtu.be/VIDEO_ID`
     - Mobile variants (`m.youtube.com`)
   - Use URL parsing logic with fallback regex to cleanly handle query parameters like `?si=...` without polluting the 11-character video ID.
2. **Start Parameter Preservation**:
   - Honor `startSeconds` parameter if passed via props (`&start=${start}`).
   - If `startSeconds` is not provided in props (0), optionally extract start timestamp from the URL itself (e.g. `?t=120` or `?start=120`).
3. **Provider Embed Fidelity**:
   - Construct standard embed URL using `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1${startParam}`.
   - Maintain Vimeo and Bunny CDN embed compatibility.

## Files to Touch

- `app/lessons/[slug]/LessonVideoPlayer.tsx`

## Requirements

1. Extract the 11-character YouTube video ID reliably from any valid YouTube URL format (watch, live, shorts, embed, youtu.be), regardless of tracking parameters like `si` or timestamp parameters like `t`.
2. Generate the appropriate `youtube-nocookie.com/embed/${videoId}` URL.
3. Keep the 16:9 responsive embed container and existing iframe security/permissions attributes (`allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen`).
4. Keep the fallback display for empty or unparseable URLs.

## Security Considerations

- Use sanitized 11-character video IDs (`[a-zA-Z0-9_-]{11}`) to prevent URL injection.
- Retain `https://www.youtube-nocookie.com` domain for embedded playback.

## Acceptance Criteria

- Lessons with YouTube URLs using `/live/VIDEO_ID` (e.g., `https://www.youtube.com/live/J1ybBABaMqM?si=smH8pwDkkAtpelnY`) immediately render the embedded YouTube player.
- Lessons with standard `watch?v=`, `youtu.be/`, and `/embed/` continue to render properly.
- Invalid or missing video URLs still display the graceful fallback message.
- Type check (`npm run build` or `npx tsc --noEmit`) passes with 0 errors.

## Checks to Run

- TypeScript check: `npx tsc --noEmit`
- Next.js lint / build check: `npm run build`

## Manual Test Steps

1. Navigate to `/lessons/engineering-mathematics-1-matrices-one-shot-all-branches` (or the slug for the user's new lesson).
2. Verify that the YouTube player loads the video `J1ybBABaMqM` directly on the page instead of showing the "Video stream currently being processed" message.
3. Test a standard YouTube watch URL lesson to verify regression safety.
