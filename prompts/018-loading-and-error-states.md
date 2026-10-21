# Prompt 018 — Global Loading States, Card/Button Interactions, and Network Error Boundaries

## Goal

Provide a seamless, responsive loading and error handling experience throughout the Scrawlr platform. When users click any card, link, or button, give immediate visual feedback (top progress bar and interactive active/pressed micro-animations). When pages or server data stream in, render custom Scrawlr-branded skeleton screens (`loading.tsx`). When network or server errors occur, catch them gracefully with dedicated error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`) featuring retry capabilities and fallback navigation.

## Reference

- User request: *"handle the loading state through out the website, when anyone clik any cards, button or error due to network and other stuff"*
- Design system: Scrawlr Blue Design System (`app/globals.css`)
- Layout & Root: `app/layout.tsx`, `app/components/Header.tsx`
- Catalog & Details: `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/lessons/[slug]/page.tsx`
- Search: `app/search/page.tsx`, `app/search/SearchResultsClient.tsx`

## Skills read

- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/loading.md` (Next.js Suspense instant loading states).
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md` (Next.js client-side error boundaries with reset/retry).
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md` (Next.js not-found file convention).
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/global-error.md` (Root layout error boundary).

## Code inspected

- `app/layout.tsx`: Root layout currently lacks global navigation progress indicator and error handling.
- `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/lessons/[slug]/page.tsx`: Server Components querying Sanity without route-level `loading.tsx` or `error.tsx` fallbacks.
- `app/components/CourseCard.tsx`: Course card has hover states but lacks active click feedback for navigation.
- `app/components/HeroSection.tsx`: Search form lacks pending/loading spinner on submission.
- `app/search/SearchResultsClient.tsx`: Search form navigation lacks pending transition spinner when submitting or changing queries.
- `app/search/SearchVideoCard.tsx`, `app/search/SearchLessonCard.tsx`: Search result cards lack active press micro-animations.
- `app/globals.css`: Contains Scrawlr blue design tokens (`--color-primary-*`) but lacks dedicated skeleton shimmer utilities.

## Decisions and assumptions

1. **Global Navigation Loading Bar (`NavigationProgressBar`)**:
   - Implement a lightweight, zero-dependency client component mounted in `app/layout.tsx`.
   - Intercepts link clicks to internal routes (`/courses`, `/lessons/...`, `/search`, etc.) and route transitions (tracking `usePathname()` and `useSearchParams()`).
   - Instantly renders a sleek top loading progress bar (electric blue gradient `#2563EB` to `#60A5FA` with 2px glow) at `z-50` at the very top of the viewport.
   - Smoothly advances from 0% to ~70% to ~90%, and finishes to 100% with a clean fade-out once the target page resolves.
2. **Next.js Suspense Skeleton Screens (`loading.tsx`)**:
   - `app/loading.tsx`: Generic fallback skeleton with header, hero shimmer, and card placeholders.
   - `app/courses/loading.tsx`: Course catalog skeleton matching `CourseCard` grid (6 shimmer cards with logo box, title line, description lines, and meta bar).
   - `app/courses/[slug]/loading.tsx`: Course detail skeleton (breadcrumb, large title, cover art box, learning outcomes grid, module accordion skeleton).
   - `app/lessons/[slug]/loading.tsx`: Lesson player skeleton (16:9 video frame with pulse animation, lesson header, tabs shimmer, curriculum sidebar skeleton).
   - `app/search/loading.tsx`: Search results skeleton (query hero, sort dropdown shimmer, video and lesson card shimmers).
3. **Card & Button Active / Loading Feedback**:
   - `CourseCard`: Add active press scaling (`active:scale-[0.985]`) and pressed ring/highlight so clicks feel instantly responsive.
   - `HeroSection`: Add loading spinner state to search submit button while the router navigates to `/search?q=...`.
   - `SearchResultsClient`: Add loading spinner inside the search input button during pending search submission.
   - `SearchVideoCard` & `SearchLessonCard`: Add active press micro-animations (`active:scale-[0.99]`).
4. **Resilient Network & Server Error Boundaries**:
   - `app/error.tsx`: Root client-side error boundary catching any runtime, Sanity API, or network failure. Features:
     - Clear status badge ("NETWORK / SERVICE ERROR")
     - Friendly message: "Something went wrong while loading this page"
     - "Try again" retry button calling `reset()`
     - "Back to Home" button
     - Collapsible error details for technical diagnostics.
   - `app/global-error.tsx`: Root layout fallback for unhandled exceptions outside the standard layout.
   - `app/courses/[slug]/error.tsx`: Course-level error boundary with "Retry" and "Browse all courses".
   - `app/lessons/[slug]/error.tsx`: Lesson-level error boundary with "Retry" and "Back to course".
   - `app/not-found.tsx`: Polished 404 page for missing courses, lessons, or invalid routes with search link and home navigation.
5. **CSS Shimmer Utilities**:
   - Add a smooth, subtle `@keyframes shimmer` in `app/globals.css` using neutral slate tones (`#F1F5F9` to `#E2E8F0`) that blend seamlessly with the Scrawlr aesthetic.

## Files to touch

| File | Action |
|---|---|
| `app/components/NavigationProgressBar.tsx` | **Create** — Client component for top progress bar and click-to-load feedback on internal navigations. |
| `app/layout.tsx` | **Edit** — Mount `NavigationProgressBar` inside root layout. |
| `app/loading.tsx` | **Create** — Root loading skeleton. |
| `app/courses/loading.tsx` | **Create** — Courses catalog loading skeleton matching course cards grid. |
| `app/courses/[slug]/loading.tsx` | **Create** — Course detail loading skeleton (hero, outcomes, modules). |
| `app/lessons/[slug]/loading.tsx` | **Create** — Lesson page loading skeleton (video player, metadata, sidebar). |
| `app/search/loading.tsx` | **Create** — Search results loading skeleton. |
| `app/error.tsx` | **Create** — Root error boundary with retry and network recovery actions. |
| `app/global-error.tsx` | **Create** — Catch-all error boundary for root layout failures. |
| `app/courses/[slug]/error.tsx` | **Create** — Course-scoped error boundary. |
| `app/lessons/[slug]/error.tsx` | **Create** — Lesson-scoped error boundary. |
| `app/not-found.tsx` | **Create** — Branded 404 Not Found page. |
| `app/components/CourseCard.tsx` | **Edit** — Add active pressed micro-interaction and click responsiveness. |
| `app/components/HeroSection.tsx` | **Edit** — Add pending loading spinner state to search button on submit. |
| `app/search/SearchResultsClient.tsx` | **Edit** — Add pending loading spinner state to search button on submit. |
| `app/search/SearchVideoCard.tsx` | **Edit** — Add active press micro-interaction. |
| `app/search/SearchLessonCard.tsx` | **Edit** — Add active press micro-interaction. |
| `app/globals.css` | **Edit** — Add shimmer animation and skeleton utility classes. |

## Security considerations

- No tokens, credentials, or private keys are exposed to the client.
- Error boundaries will not expose sensitive server environment variables or authentication tokens to the user interface.
- Route gating and Clerk authentication remain strictly enforced.

## Acceptance criteria

1. **Instant Click Feedback & Top Loading Bar**:
   - Clicking any course card, header navigation link, lesson sidebar link, or search card immediately displays the top royal blue progress bar.
   - When the target route loads, the progress bar finishes and fades away smoothly.
2. **Skeleton Loading Screens**:
   - Navigating to `/courses` displays the course catalog skeleton grid during server streaming.
   - Navigating to `/courses/[slug]` displays the course detail skeleton (title, cover, outcomes, modules).
   - Navigating to `/lessons/[slug]` displays the lesson skeleton (video placeholder with spinner, sidebar items).
   - Navigating to `/search?q=...` displays the search results skeleton.
3. **Button & Card Active Feedback**:
   - Submitting search in HeroSection shows a loading spinner on the submit button.
   - Submitting search or changing query in SearchResultsClient shows an active loading indicator.
   - Clicking course cards and search cards has noticeable pressed/active micro-animations (`scale-[0.985]`).
4. **Network & Error Recovery**:
   - If a page encounters a network error, CMS fetch failure, or server exception, a branded Scrawlr error boundary appears instead of an unhandled crash.
   - Error page provides a "Try again" button that triggers `reset()` to re-attempt fetching.
   - Error page provides a "Return to Home" / "Browse Courses" fallback.
   - Requesting a non-existent slug displays the custom branded `not-found.tsx` page.
5. **Checks pass**:
   - `npm run build` succeeds cleanly with zero TypeScript or lint errors.

## Checks to run

```powershell
npm run build
```

## Manual test steps

1. Open `http://localhost:3000/`.
2. Click any Course Card on the home page: verify the top blue progress bar appears immediately and the card has pressed feedback.
3. Observe the course detail skeleton while navigating to `/courses/building-with-nextjs`.
4. Click "Continue Learning" or any lesson in the curriculum: verify top progress bar fires and lesson skeleton renders (video player box, sidebar skeleton).
5. In the search bar, type a query (e.g. "caching") and hit Enter: verify the button shows a loading spinner and the search skeleton renders before results populate.
6. Test error recovery: Navigate to an invalid course slug like `/courses/non-existent-course-12345` and verify the custom 404 / not found page displays with navigation buttons back to catalog.
