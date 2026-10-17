# Prompt 008 — Vertex Course Page UI & Sanity Integration

## Goal

Implement the Vertex Course Detail Page at `app/courses/[slug]/page.tsx` based exactly on the desktop reference design image `design/vertex-course.png`, powered by real seeded Sanity content. Reproduce the exact layout, typography, colors, spacing, and interactive states (expandable module accordions, show more/less modules toggle, sticky progress bar), adapting responsively to mobile viewports while preserving desktop pixel fidelity.

## Reference

- `design/vertex-course.png` — the source of truth for layout, typography, colors, spacing, and visual elements.
- `seed.ndjson` — seeded Sanity dataset containing 10 courses with structured modules, lessons, instructors, and learning outcomes.
- `design/vertex-designsystem.png` & `prompts/001-design-system.md` — design tokens and typography hierarchy.

## Skills read

- `AGENTS.md` (Project rules, Section 3 UI work, Section 5 app structure, Section 8 data model, Section 13 checks)
- `sanity-best-practices` (Sanity App Router integration, GROQ querying, Portable Text, typed projections)
- `clerk` (Auth session & learner progress integration)

## Code inspected

- `sanity/lib/queries.ts`: `courseBySlugQuery` for fetching course, learning outcomes, instructor, category, and modules with lessons.
- `sanity/lib/data.ts`: Server data fetching methods `getCourseBySlug`, type definitions `CourseDetailData`, `ModuleData`, `LessonSummary`, and `formatDuration`.
- `app/components/Header.tsx`: Navigation header with Vertex logo, navigation links, notifications, and Clerk user authentication.
- `app/components/CourseIcons.tsx`: SVG brand marks for Next.js, Docker, TypeScript.
- `app/globals.css`: Tailwind v4 theme definitions, typography utilities (`text-display-1`, `font-display`, `font-sans`), component classes (`btn-primary`, `badge-popular`, `progress-track`, `card`).

## Decisions and Assumptions

1. **Routing & Slug Resolution**:
   - Create App Router dynamic route: `app/courses/[slug]/page.tsx`.
   - Also create `app/courses/page.tsx` or redirect `/courses` to the catalog / home page so `/courses` link never 404s.
   - Support both `nextjs-app-router-in-depth` (the canonical seed slug) and `nextjs-for-production` (the UI mock slug used in earlier components) seamlessly via GROQ fallback in `courseBySlugQuery`.
2. **Page Architecture (Server + Client Boundaries)**:
   - `app/courses/[slug]/page.tsx` is an async React Server Component. It fetches data via `getCourseBySlug(slug)` securely server-side without exposing tokens to the client.
   - If no course matches, call `notFound()` to render Next.js 404.
   - SEO metadata dynamically generated via `generateMetadata`.
   - Client interactive parts are encapsulated in client components:
     - `app/courses/[slug]/CourseModulesList.tsx`: Accordion expand/collapse for modules and lessons, and the "Show all X modules" / "Show less" toggle.
     - `app/courses/[slug]/CourseProgressBar.tsx`: Floating/sticky bottom progress bar with progress fill and "Continue Learning" CTA.
3. **Course Hero & Visual Reproduction**:
   - **Breadcrumbs**: `All Courses > [Course Title]` with chevron separator and hover states.
   - **Course Badge**: Peach/orange "POPULAR" badge displayed when `course.popular` is true.
   - **Course Title**: `font-display font-bold text-4xl sm:text-5xl text-neutral-900 leading-tight`.
   - **Course Summary**: `font-sans text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl`.
   - **Cover Card**: Large rounded card displaying the topic logo (Next.js dark square with iconic white "N" as in `vertex-course.png`) or Sanity `coverImage`.
   - **Meta Stats**: 4-part inline stat row with icons:
     - Difficulty level (signal bars icon)
     - Total duration (clock icon)
     - Modules count (document/page icon)
     - Students count (users icon)
   - **CTA Buttons**:
     - Primary button: "Continue Learning" with `ArrowRight` icon (terracotta/orange `btn-primary`), linking directly to the first lesson of the course (`/lessons/${firstLessonSlug}`).
     - Secondary button: "Bookmark" with `Bookmark` icon (white card with border, subtle hover).
4. **What You'll Learn Section**:
   - Container card with subtle border and white background.
   - 2x2 grid of learning outcome cards.
   - Mapped icons: Layers, Workflow/Database, Gauge/Speedometer, Rocket/Cloud, Shield, Code based on outcome icon string.
5. **Course Content (Modules & Lessons Accordion)**:
   - Header with title "Course Content" and total modules & hours summary.
   - Numbered circular badges (1, 2, 3...).
   - Module title and summary.
   - Module duration on the right (e.g. `45m`, `1h 12m`).
   - Chevron icon indicating accordion state.
   - Expanding a module reveals its lessons with duration, free preview badge, and link to `/lessons/[slug]`.
   - Displays initial 6 modules as in reference image, with "Show all [N] modules" button to expand all.
6. **Bottom Progress Bar**:
   - Sticky floating bar at the bottom with backdrop blur, rounded corners, and shadow.
   - Displays "Your Progress", completion percentage (e.g. 35%), orange progress fill, and "Continue Learning" button.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `sanity/lib/queries.ts` | Edit | Enhance `courseBySlugQuery` with module duration projection and slug alias support |
| `sanity/lib/data.ts` | Edit | Add `duration` to `ModuleData` interface |
| `app/courses/[slug]/CourseModulesList.tsx` | Create | Interactive client component for module accordion & show more/less toggle |
| `app/courses/[slug]/CourseProgressBar.tsx` | Create | Floating bottom progress bar component with resume CTA |
| `app/courses/[slug]/CourseIcons.tsx` | Create | Learning outcome icons (layers, database, speedometer, cloud, etc.) and cover artwork |
| `app/courses/[slug]/page.tsx` | Create | Server component course detail page composing all sections |
| `app/courses/page.tsx` | Create | Courses catalog / redirect page to ensure clean navigation |

## Requirements

1. Match `design/vertex-course.png` desktop design exactly (typography, colors, padding, borders, icons, states).
2. Fully responsive down to mobile viewports (stack columns cleanly, collapse padding, ensure sticky bar remains usable).
3. Connect live to Sanity content lake via `getCourseBySlug`.
4. Derive all lesson counts, module counts, and total durations from Sanity data.
5. Expandable accordion: click any module to inspect contained lessons.
6. Initial 6-module truncation with "Show all X modules" expandable button.
7. Working links to lesson pages `/lessons/[slug]`.
8. Fallback handling for missing assets or courses (`notFound()`).

## Security Considerations

- Course data fetched server-side only via `serverSanityFetch` with `SANITY_API_READ_TOKEN`.
- No sensitive credentials or API keys exposed to browser client components.
- Sanitized parameters passed to GROQ queries to prevent injection.

## Acceptance Criteria

- [ ] `/courses/nextjs-app-router-in-depth` and `/courses/nextjs-for-production` render the course page matching `vertex-course.png`.
- [ ] Breadcrumbs display `All Courses > [Course Title]`.
- [ ] POPULAR badge, course title, summary, and meta stats (level, duration, modules, students) render from Sanity.
- [ ] Cover card renders topic logo / cover image.
- [ ] "What you'll learn" renders 2x2 grid with corresponding icons and descriptions.
- [ ] "Course Content" displays modules with numbers, titles, summaries, durations, and accordion toggles.
- [ ] "Show all [N] modules" button expands/collapses the full list.
- [ ] Floating bottom bar shows progress and "Continue Learning" CTA.
- [ ] No TypeScript errors, Next.js lint passes, and production build succeeds.

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
   Visit `http://localhost:3000/courses/nextjs-app-router-in-depth` and `http://localhost:3000/courses/nextjs-for-production`.

## Manual Test Steps

1. Start/verify dev server at `http://localhost:3000`.
2. Visit `http://localhost:3000/courses/nextjs-app-router-in-depth`.
3. Verify the breadcrumb, "POPULAR" badge, title, description, and meta stats match the reference design.
4. Verify the "What you'll learn" section displays 4 learning outcome cards with icons.
5. Verify the "Course Content" section displays the first 6 modules with numbers, summaries, and durations.
6. Click on a module header and verify the accordion expands smoothly to show lessons.
7. Click "Show all 12 modules" and verify all modules are displayed.
8. Scroll down and verify the floating bottom progress bar is pinned with 35% progress and "Continue Learning" button.
9. Test responsiveness on mobile viewports.
