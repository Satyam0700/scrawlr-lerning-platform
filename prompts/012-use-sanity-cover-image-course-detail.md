# Prompt 012 — Render Seeded Sanity Cover Image on Course Detail Page

## Goal

Ensure the course detail page (`app/courses/[slug]/page.tsx`) and `CourseCoverArtwork` render the actual seeded Sanity `coverImage` for all courses (including Next.js courses), removing hardcoded SVG artwork overrides so 100% of the displayed course visuals and metadata originate directly from the Sanity Content Lake.

## Reference

- User Request & Screenshot: User highlighted that the course page still showed the hardcoded Next.js SVG logo card rather than the seeded Sanity cover image, requesting: "make sure everything fetched from seeded snaity content".
- `AGENTS.md` (Section 2: loop, Section 3: UI fidelity, Section 8: Sanity data model, Section 13: checks)
- `seed.ndjson` (Line 24: `course.nextjs-app-router-in-depth` contains `coverImage` pointing to Sanity asset/CDN)

## Skills read

- `AGENTS.md`
- `sanity-best-practices`

## Code inspected

- `app/courses/[slug]/CourseIcons.tsx`: Line 87-91 contained `const isNextjs = slug.includes("nextjs"); if (isNextjs) return <NextjsCoverCard />;` which bypassed the Sanity `coverImage`.
- `app/courses/[slug]/page.tsx`: Passes `slug`, `coverImage`, and `title` to `CourseCoverArtwork`.
- `sanity/lib/queries.ts`: `courseBySlugQuery` projects `coverImage` from the Sanity Content Lake.

## Decisions and Assumptions

1. **Prioritize Sanity `coverImage`**:
   - In `app/courses/[slug]/CourseIcons.tsx`, remove the hardcoded `isNextjs` branch that intercepted Next.js courses.
   - Whenever `coverImage` is present on the Sanity course document, render the image using `urlFor(coverImage).width(800).height(800).fit("crop").url()` inside Next.js `<Image fill priority ... />` with rounded corners `rounded-[28px]`.
   - Keep the SVG card as a fallback only when a course document in Sanity has no `coverImage`.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `app/courses/[slug]/CourseIcons.tsx` | Edit | Render Sanity `coverImage` for all courses, removing Next.js hardcoded override |

## Requirements

1. Course detail page renders the Sanity `coverImage` for all seeded courses.
2. No course slug intercepts or overrides Sanity image content with hardcoded SVGs.
3. Responsive rounded artwork container with optimized responsive image sizes.
4. Pass TypeScript check (`npx tsc --noEmit`), lint (`npm run lint`), and Next.js build (`npm run build`).

## Security Considerations

- All image URLs are securely transformed via `@sanity/image-url` builder and restricted to verified hostnames in `next.config.ts`.

## Acceptance Criteria

- [ ] Next.js course page renders the seeded Sanity `coverImage` instead of hardcoded SVG card.
- [ ] All other course pages continue to render their seeded Sanity `coverImage`.
- [ ] TypeScript check, ESLint, and Next.js production build pass with 0 errors.

## Checks to Run

1. Type check:
   ```bash
   npx tsc --noEmit
   ```
2. Lint:
   ```bash
   npm run lint
   ```
3. Production build:
   ```bash
   npm run build
   ```

## Manual Test Steps

1. Visit [http://localhost:3000/courses/nextjs-app-router-in-depth](http://localhost:3000/courses/nextjs-app-router-in-depth).
2. Confirm the course cover artwork on the left renders the seeded Sanity cover image.
3. Visit other courses (e.g. [http://localhost:3000/courses/devops-with-docker-and-kubernetes](http://localhost:3000/courses/devops-with-docker-and-kubernetes)) and confirm their Sanity cover images render cleanly.
