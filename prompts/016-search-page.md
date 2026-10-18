# Prompt 016 — Vertex Search Page UI & Sanity Content Integration

## Goal

Implement the Vertex Search Results Page at `app/search/page.tsx` based exactly on the desktop reference design image `design/vertex-search.png`, wired to real Sanity course and lesson content. The search surfaces ranked, clickable result cards in two distinct formats:
1. **Video results**: A lesson video matched at a specific chapter or timestamp moment, featuring a video thumbnail preview, play button, timestamp badge, course icon + title, `VIDEO` badge, description, lesson/module breadcrumb, and a `Watch from MM:SS >` action that links directly to `/lessons/[slug]?start=[seconds]`.
2. **Lesson results**: A lesson matched on its curriculum topic, featuring a left preview panel with key learning points and checkmark icon, course icon + title, `LESSON` badge, title, description, module indicator, and a `View lesson ↗` action that links to `/lessons/[slug]`.

The page includes the `SEARCH RESULTS` pill badge, serif heading `Results for "<query>"`, dynamic result count across courses (`Found X results across Y courses`), full interactive search bar with `⌘ K` keyboard affordance, result count & sort control dropdown (`Most Relevant ⌵`), and the bottom "Can't find what you're looking for?" banner linking to the catalog. It is fully responsive on mobile while preserving desktop pixel fidelity.

## Reference

- `design/vertex-search.png` — the source of truth for layout, typography, colors, spacing, card styles, and visual hierarchy.
- `seed.ndjson` & `videos.json` — seeded Sanity dataset containing courses, modules, lessons, key points, notes, and video metadata.
- `design/vertex-designsystem.png` & `prompts/001-design-system.md` — design tokens, typography, and color palette.
- `app/lessons/[slug]/page.tsx` — existing lesson page supporting `?start=${seconds}` for direct video seeking.

## Skills read

- `AGENTS.md` (Section 3 UI work, Section 5 app structure, Section 7 decisions, Section 8 data model, Section 11 search behavior, Section 12 gotchas, Section 13 checks)
- `sanity-best-practices` (GROQ queries, server-only data fetching, typed projections, token security)
- `create-agent-with-sanity-context` (Sanity search architecture, MCP endpoint conventions, initial context)
- `dial-your-context` (search guidance, query instructions, GROQ filtering)
- `shape-your-agent` (grounded search, ranking rules, guardrails)

## Code inspected

- `sanity/lib/queries.ts`: existing GROQ queries for courses, lessons, instructors, and categories.
- `sanity/lib/data.ts`: server-side data fetching methods with `serverSanityFetch`.
- `sanity/lib/types.ts`: TypeScript data models (`CourseCardData`, `LessonDetailData`, `ModuleData`).
- `app/components/Header.tsx`: global navigation header with Vertex logo, navigation links, and Clerk auth.
- `app/components/HeroSection.tsx`: homepage search input bar with `⌘ K` badge.
- `app/components/CourseIcons.tsx`: SVG brand marks (`NextjsIcon`, `DockerIcon`, `TypeScriptIcon`).
- `app/lessons/[slug]/page.tsx`: lesson player page handling `start` / `t` query parameters for deep-linking.
- `app/globals.css`: design system typography and color utilities (`font-display`, `font-sans`, `bg-primary-500`, etc.).

## Decisions and Assumptions

1. **Routing & Search Query Handling**:
   - Create App Router page at `app/search/page.tsx` accepting search params (`?q=...` and optional `?sort=...`).
   - Default query is `data fetching` if none provided, matching the reference design.
   - Wire header and hero search inputs to submit to `/search?q=[query]`.
   - Implement keyboard shortcut (`⌘ K` / `Ctrl + K`) to focus the search bar.
2. **Dual-Mode Search Data Layer (`sanity/lib/search.ts` & `sanity/lib/queries.ts`)**:
   - Implement a fast, grounded GROQ query (`searchContentQuery`) that tokenizes query terms with wildcards (`*`) and fetches matching lessons and their parent course and module hierarchy.
   - Match both ways per AGENTS.md Section 11:
     - Match lessons by title, summary, key points, and plain-text notes projection.
     - Match video chapters and timestamps (using chapter titles, video duration segments, and transcript points) to generate video moment results.
   - For demo fidelity with `design/vertex-search.png`:
     - Provide grounded search results from Sanity with realistic video timestamp matching (e.g. `12:45` for "Data Fetching in Server Components", `08:32` for "Fetching Data with useEffect", `15:18` for "Building REST API & Fetching Data", `06:41` for "Fetch API Basics").
     - Generate structured lesson cards (e.g. "Data Fetching & Caching" with bullet key points `• Fetching strategies`, `• Caching techniques`, `• Revalidation methods`).
   - If `SANITY_CONTEXT_MCP_URL` and `OPENAI_API_KEY` are provided in env, support streaming MCP agent responses; otherwise fallback seamlessly to grounded Sanity GROQ execution.
3. **Card Types & Visual Design**:
   - **Video Result Card (`SearchVideoCard.tsx`)**:
     - 16:9 thumbnail container with dark backdrop, centered circular play button (`▶`), and duration badge in bottom right (e.g. `12:45`).
     - Course brand icon (Next.js, React, Node.js, JS) + Course title (e.g. `Next.js for Production`).
     - Badge: `VIDEO` (`text-orange-500 bg-orange-50 border border-orange-200/60 font-semibold text-[11px] px-2 py-0.5 rounded`).
     - Lesson Title (bold, hover transition to orange).
     - Lesson description.
     - Footer: `Lesson X.Y` icon + `Module Title` folder icon.
     - Action button: orange play icon + `Watch from MM:SS >` linking to `/lessons/[slug]?start=[seconds]`.
   - **Lesson Result Card (`SearchLessonCard.tsx`)**:
     - Left preview panel (`bg-neutral-50 rounded-xl p-4 w-60 border border-neutral-100`):
       - Document or tech icon.
       - Key learning points bullet list (e.g. `• Fetching strategies`, `• Caching techniques`, `• Revalidation methods`).
       - Circular checkmark icon at bottom right.
     - Course brand icon + Course title.
     - Badge: `LESSON` (`text-indigo-600 bg-indigo-50 border border-indigo-200/60 font-semibold text-[11px] px-2 py-0.5 rounded`).
     - Title and description.
     - Footer: `Module X` on left; `View lesson ↗` link on right linking to `/lessons/[slug]`.
4. **Sort & Filter Controls**:
   - Interactive dropdown: `Most Relevant` (default), `Newest`, `Duration`.
   - Dynamic sorting client-side / server-side preserving user selection.
5. **Course Brand Icons Expansion (`CourseIcons.tsx`)**:
   - Add `ReactIcon`, `NodejsIcon`, and `JavaScriptIcon` alongside existing `NextjsIcon`, `DockerIcon`, and `TypeScriptIcon` to render pixel-perfect icons matching the mock cards.
6. **Bottom Banner**:
   - Styled banner with orange search icon, heading "Can't find what you're looking for?", subtitle "Try different keywords or browse our full course catalog.", and "Browse all courses ->" button linking to `/courses`.

## Files to touch

- `sanity/lib/queries.ts` — add `searchContentQuery` for tokenized GROQ lesson and course search.
- `sanity/lib/data.ts` — add `searchContent(query: string)` server helper.
- `app/components/CourseIcons.tsx` — add `ReactIcon`, `NodejsIcon`, `JavaScriptIcon`.
- `app/search/page.tsx` — search results page server component with dynamic metadata.
- `app/search/SearchResultsClient.tsx` — interactive search input, sort control, and state management.
- `app/search/SearchVideoCard.tsx` — video result card component.
- `app/search/SearchLessonCard.tsx` — lesson result card component.
- `app/search/SearchBottomBanner.tsx` — bottom discovery banner.
- `app/components/HeroSection.tsx` — wire homepage search input to `/search?q=...`.

## Security considerations

- All Sanity queries execute on the server via `serverSanityFetch` with `SANITY_API_READ_TOKEN`.
- No API tokens or internal video documents are exposed to the client.
- Search queries are URL-encoded and sanitized to prevent injection or unexpected GROQ errors.

## Acceptance criteria

- [ ] Navigating to `/search?q=data+fetching` renders the page matching `vertex-search.png` exactly.
- [ ] Displays `SEARCH RESULTS` pill, `Results for "data fetching"` in display serif font with orange query, and `Found X results across Y courses`.
- [ ] Interactive search bar displays current query with `⌘ K` keyboard badge; entering a new query re-fetches and updates results.
- [ ] Results list displays both `VIDEO` and `LESSON` cards matching design layout, fonts, badges, and icons.
- [ ] Video cards show thumbnail with duration badge, course mark, `VIDEO` badge, description, `Lesson X.Y · Module`, and `Watch from MM:SS >`.
- [ ] Clicking `Watch from MM:SS >` navigates to `/lessons/[slug]?start=[seconds]` and starts playback at that second.
- [ ] Lesson cards show left preview panel with key points and checkmark, course mark, `LESSON` badge, title, description, `Module X`, and `View lesson ↗`.
- [ ] Clicking `View lesson ↗` navigates to `/lessons/[slug]`.
- [ ] Sort dropdown toggles between `Most Relevant`, `Newest`, and `Duration`.
- [ ] Bottom banner "Can't find what you're looking for?" links to `/courses`.
- [ ] Mobile responsive layout stacks cards and collapses cleanly.
- [ ] `npm run lint` and `npx tsc --noEmit` pass with zero errors.

## Checks to run

- `npx tsc --noEmit` (TypeScript type check in web workspace)
- `npm run lint` (ESLint Next.js check)
- `npm run build` (Next.js production build verification)

## Manual test steps

1. Start dev server: `npm run dev`.
2. Navigate to `http://localhost:3000/search?q=data+fetching`.
3. Verify visual layout, typography, badges, and cards against `design/vertex-search.png`.
4. Click on `Watch from 12:45 >` on the first video result; verify navigation to `/lessons/[slug]?start=765` and that player embeds with start time.
5. Click on `View lesson ↗` on the lesson result; verify navigation to the lesson page.
6. Type a new term in the search bar (e.g. `react` or `docker`) and press Enter; verify results update.
7. Test the sort dropdown options (`Most Relevant`, `Newest`, `Duration`).
8. Resize window to mobile width (<640px) to verify responsive stacking.
