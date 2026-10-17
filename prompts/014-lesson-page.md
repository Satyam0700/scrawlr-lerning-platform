# Prompt 014 — Vertex Lesson Page UI & Sanity Video Integration

## Goal

Implement the Vertex Lesson Page at `app/lessons/[slug]/page.tsx` based exactly on the desktop reference design image `design/vertex-lesson.png`, wired to real seeded Sanity content. The lesson video plays directly on the page via a responsive provider embed (YouTube / Vimeo / Bunny) that respects timestamp seeking (`?start=seconds` or `?t=seconds`). Reproduce the exact layout, typography, colors, spacing, and interactive states (expandable sidebar module accordion with "Now playing" indicator, Lesson Content / Notes tabs, Overview, Key Points, Pro Tip, Resources, Previous/Next lesson navigation), adapting responsively to mobile viewports while preserving desktop pixel fidelity.

## Reference

- `design/vertex-lesson.png` — the source of truth for layout, typography, colors, spacing, and visual elements.
- `seed.ndjson` & `videos.json` — seeded Sanity dataset containing lessons, modules, courses, and video embed sources.
- `design/vertex-designsystem.png` & `prompts/001-design-system.md` — design tokens and typography hierarchy.

## Skills read

- `AGENTS.md` (Project rules, Section 3 UI work, Section 5 app structure, Section 7 decisions, Section 8 data model, Section 9 video transcripts/embeds, Section 13 checks)
- `sanity-best-practices` (Sanity App Router integration, GROQ querying, Portable Text rendering, typed projections)
- `clerk` (Auth session & learner progress integration)

## Code inspected

- `sanity/lib/queries.ts`: `lessonBySlugQuery` for fetching lesson details, keyPoints, proTip, notes, resources, and reverse-lookup parent course and modules.
- `sanity/lib/data.ts`: Server data fetching method `getLessonBySlug`.
- `sanity/lib/types.ts`: `LessonDetailData`, `ModuleData`, `LessonSummary`, `Resource`.
- `sanity/schemaTypes/lessonType.ts`: schema definition for `lesson`.
- `app/components/Header.tsx`: shared navigation header with Vertex logo, navigation links, notifications, and Clerk user authentication.
- `app/components/CourseIcons.tsx`: SVG brand marks including `NextjsIcon`.
- `app/courses/[slug]/page.tsx`: course detail page layout & patterns.
- `app/globals.css`: design system tokens and typography utilities (`font-display`, `font-sans`, `text-primary-500`, `bg-primary-500`, etc.).

## Decisions and Assumptions

1. **Routing & Dynamic Slug Resolution**:
   - Create App Router dynamic route: `app/lessons/[slug]/page.tsx`.
   - Support both canonical seeded lesson slugs (e.g. `nextjs-app-router-in-depth-fetching-in-server-components`, `nextjs-app-router-in-depth-caching-and-revalidation`, etc.) and the design mockup slug `data-fetching-and-caching` / `data-fetching-caching` via GROQ fallback in `lessonBySlugQuery`.
   - `generateStaticParams` pre-renders canonical lesson slugs and mock aliases.
   - Dynamic SEO metadata generated via `generateMetadata`.
2. **Page Architecture (Server + Client Boundaries)**:
   - `app/lessons/[slug]/page.tsx` is an async React Server Component. It fetches lesson data via `getLessonBySlug(slug)` securely server-side without exposing tokens to the client.
   - If no lesson matches, call `notFound()` to render Next.js 404.
   - Parse `searchParams` (`start` or `t`) for video timestamp seeking.
   - Derive current module index, lesson index (e.g. "Lesson 5.1"), previous lesson, and next lesson from the course's ordered modules and lessons.
3. **Video Embed Player (`LessonVideoPlayer.tsx`)**:
   - AGENTS.md Section 7 rule: "Playback stays on the site through a provider embed. Videos are YouTube, Vimeo, or Bunny embeds shown on the lesson page with the provider's own player. Do not build a custom player. A result links to the lesson page with a start seconds query param, and the embed starts at that second using the provider's own start parameter. Never send the learner out to the provider."
   - Build a robust embed URL generator for YouTube (`https://www.youtube-nocookie.com/embed/${id}?start=${start}`), Vimeo (`https://player.vimeo.com/video/${id}#t=${start}s`), and Bunny.
   - Embed iframe styled in a responsive 16:9 container with smooth rounded corners (`rounded-2xl`) and black backdrop matching the reference design.
4. **Left Sidebar (`LessonSidebar.tsx`)**:
   - Sticky navigation sidebar on desktop with border-r, matching `vertex-lesson.png`.
   - "Back to course" link (`<- Back to course`) linking to `/courses/${course.slug}`.
   - Course summary card with course icon (e.g. Next.js "N" logo), course title, and progress indicator (`35% complete` with progress bar).
   - "Module X of Y" header.
   - List of all course modules as expandable accordions:
     - Number badges (checkmarks for completed modules, solid orange circle for active module, neutral for upcoming).
     - Module title, duration, and expand/collapse chevron.
     - When expanded, lists lessons:
       - Current active lesson shows orange dot, "Now playing" label in orange, and play icon.
       - Inactive lessons show circle icon, title, duration.
       - Clicking any lesson navigates to `/lessons/${lesson.slug}`.
   - Mobile responsive toggle button/drawer so learners on phones can easily browse and switch lessons.
5. **Main Content Area**:
   - **Breadcrumbs**: `All Courses > [Course Title] > [Module Title] > [Lesson Title]`.
   - **Badge**: `LESSON [moduleNum].[lessonNum]` in orange pill style.
   - **Title**: `font-display font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight`.
   - **Bookmark Button**: Outlined bookmark icon button in header.
   - **Subtitle / Summary**: Highlighting key takeaways.
   - **Meta Stats**: Inline stat row with icons:
     - Clock icon + formatted duration (e.g. `1h 28m` or `15m`).
     - Signal bars icon + difficulty level (e.g. `Intermediate`).
     - Users icon + student count (e.g. `3,426 students`).
   - **Tabs (`LessonContentTabs.tsx`)**:
     - `Lesson Content` (active tab with orange underline).
     - `Notes` (inactive tab, presentational per AGENTS.md Section 7).
   - **Overview Section**:
     - Rich text overview rendered via `@portabletext/react` or fallback introductory notes.
   - **"In this lesson you will:" Section**:
     - Render `keyPoints` with orange circular checkmarks.
   - **"Pro Tip" Callout Card**:
     - Warm rounded container (`bg-orange-50/70 border border-orange-200/60 rounded-xl p-5 sm:p-6`) with lightbulb icon, "Pro Tip" label, and tip text.
   - **"Resources" Section (`LessonResources.tsx`)**:
     - Grid of resource cards with document/github icons, title, description, and external link icon.
   - **Bottom Navigation Bar**:
     - "Previous Lesson" button (outline) with previous lesson title and duration.
     - "Next Lesson" button (terracotta primary `btn-primary`) with next lesson title and duration.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `sanity/lib/queries.ts` | Edit | Enhance `lessonBySlugQuery` with module duration projection, course level, and slug alias support |
| `sanity/lib/types.ts` | Edit | Update `LessonDetailData` and nested module types with duration and level fields |
| `app/lessons/[slug]/LessonVideoPlayer.tsx` | Create | Responsive video embed player supporting YouTube/Vimeo/Bunny and timestamp seeking |
| `app/lessons/[slug]/LessonSidebar.tsx` | Create | Interactive client sidebar with module accordions, "Now playing" indicator, and mobile drawer |
| `app/lessons/[slug]/LessonContentTabs.tsx` | Create | Interactive tabs component for Lesson Content and Notes |
| `app/lessons/[slug]/LessonResources.tsx` | Create | Resource cards grid matching design |
| `app/lessons/[slug]/page.tsx` | Create | Main Server Component lesson page composing all sections |

## Requirements

1. Match `design/vertex-lesson.png` desktop design exactly (layout, typography, colors, spacing, borders, icons, and interactive states).
2. Fully responsive down to mobile viewports (stack sidebar into collapsible drawer or top bar, maintain 16:9 aspect ratio for video embed).
3. Connect live to Sanity content lake via `getLessonBySlug`.
4. Embed real video player (YouTube/Vimeo/Bunny) directly on the page, with `?start=X` or `?t=X` timestamp support.
5. Derive module numbers, lesson numbers (e.g. `Lesson 5.1`), previous lesson, and next lesson dynamically.
6. Provide working links to previous and next lessons, course page (`<- Back to course`), and all sibling lessons in the sidebar.
7. Fallback handling for missing lessons (`notFound()`).

## Security Considerations

- Lesson data fetched server-side only via `serverSanityFetch` with `SANITY_API_READ_TOKEN`.
- No Sanity tokens or secrets exposed to the browser.
- External resource links open securely with `target="_blank" rel="noopener noreferrer"`.
- Video embed iframes use sandbox-safe parameters and official embed URLs (`youtube-nocookie.com`, etc.).

## Acceptance Criteria

- [ ] Navigating to `/lessons/nextjs-app-router-in-depth-fetching-in-server-components` or `/lessons/data-fetching-and-caching` renders the lesson page matching `vertex-lesson.png`.
- [ ] Left sidebar shows "Back to course", course title with icon and progress, and module accordions.
- [ ] Active module is expanded, highlighting the current lesson with "Now playing" and orange play icon.
- [ ] Breadcrumbs show `All Courses > [Course Title] > [Module Title] > [Lesson Title]`.
- [ ] Badge displays `LESSON X.Y` (e.g. `LESSON 5.1`).
- [ ] Meta stats row displays duration, level, and student count with icons.
- [ ] Video player embeds and plays the lesson video on the page in 16:9 aspect ratio.
- [ ] Video URL with `?start=60` starts playback at 60 seconds.
- [ ] Tabs switch between "Lesson Content" and "Notes".
- [ ] Overview, "In this lesson you will:", "Pro Tip", and "Resources" render from Sanity data.
- [ ] Previous Lesson and Next Lesson buttons navigate to adjacent lessons.
- [ ] TypeScript check, lint, and production build pass with zero errors.

## Checks to Run

1. Type check:
   ```bash
   npx tsc --noEmit
   ```
2. Lint check:
   ```bash
   npm run lint
   ```
3. Production build:
   ```bash
   npm run build
   ```
4. Verify page in browser:
   Visit `http://localhost:3000/lessons/data-fetching-and-caching` and `http://localhost:3000/lessons/nextjs-app-router-in-depth-fetching-in-server-components`.

## Manual Test Steps

1. Start/verify dev server at `http://localhost:3000`.
2. Visit `http://localhost:3000/lessons/data-fetching-and-caching` or `http://localhost:3000/lessons/nextjs-app-router-in-depth-fetching-in-server-components`.
3. Verify the sidebar matches `vertex-lesson.png`: "Back to course", course icon, 35% complete, module accordions, and "Now playing" badge on current lesson.
4. Verify breadcrumbs, badge (`LESSON 5.1`), title, bookmark button, subtitle, and meta stats (duration, level, student count).
5. Verify the video player renders on page and plays smoothly.
6. Test timestamp seeking by visiting `http://localhost:3000/lessons/data-fetching-and-caching?start=30` and verify the video starts at 30 seconds.
7. Click the "Notes" tab and verify tab state toggles.
8. Verify "Overview", "In this lesson you will:", "Pro Tip", and "Resources" render with exact styling.
9. Click "Next Lesson" and verify navigation to the next lesson in the curriculum.
10. Test responsive layout on mobile viewport to verify the sidebar collapses cleanly into a toggleable drawer/bar.
