# Prompt 010 — Render Course Cover Image as Course Card Icon

## Goal

Update the course cards on the `/courses` catalog page (`app/courses/page.tsx`) and the reusable `CourseCard` component (`app/components/CourseCard.tsx`) so the course icon at the top of each card renders the course's `coverImage` from Sanity instead of falling back to the generic Next.js black `N` icon.

## Reference

- User Request & Screenshot: User highlighted that the course cards in the catalog displayed generic Next.js "N" icons for courses like "Building AI Apps with LLMs", and requested: "icon of course same as the cover image".
- `AGENTS.md` (Section 2: loop, Section 3: UI fidelity, Section 8: Sanity data model, Section 13: checks to run)
- `sanity/lib/image.ts` (`urlFor` helper for Sanity CDN image transformations)

## Skills read

- `AGENTS.md`
- `sanity-best-practices`

## Code inspected

- `app/courses/page.tsx`: Contains `getTopicIcon(course.slug)` which fell back to `<NextjsIcon />` for all unmapped courses, ignoring `course.coverImage`.
- `app/components/CourseCard.tsx`: Reusable card component taking `icon: React.ReactNode`.
- `sanity/lib/data.ts` & `sanity/lib/types.ts`: `CourseCardData` includes `coverImage?: SanityImage`.
- `next.config.ts`: Configured with `cdn.sanity.io` and `picsum.photos` in `images.remotePatterns`.

## Decisions and Assumptions

1. **Cover Image Rendering as Card Icon**:
   - In `app/courses/page.tsx`, if `course.coverImage` exists, transform and render it using `urlFor(course.coverImage).width(112).height(112).fit('crop').url()` inside an optimized Next.js `<Image />` (`w-14 h-14 rounded-xl object-cover border border-neutral-200/80 shadow-2xs`).
   - If a course does not have a `coverImage`, fall back gracefully to topic SVG icons (`NextjsIcon`, `DockerIcon`, `TypeScriptIcon`).
2. **Update `CourseCard.tsx`**:
   - Update `CourseCardProps` to support `coverImage?: SanityImage`.
   - When `coverImage` is passed, render the cover image thumbnail as the card's top icon; otherwise render `icon`.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `app/courses/page.tsx` | Edit | Render `course.coverImage` as card icon for each course in the catalog |
| `app/components/CourseCard.tsx` | Edit | Accept `coverImage?: SanityImage` and render thumbnail when provided |

## Requirements

1. Each course card in `/courses` displays its own Sanity `coverImage` as the icon thumbnail.
2. Prevent generic Next.js `N` icon fallback when a course has a unique `coverImage`.
3. Preserve clean rounded styling (`rounded-xl overflow-hidden w-14 h-14 border border-neutral-200/80`).
4. Type checks (`npx tsc --noEmit`), ESLint (`npm run lint`), and Next.js build (`npm run build`) pass without errors.

## Security Considerations

- All image URLs are securely generated via Sanity's `@sanity/image-url` builder and restricted to verified hostnames in `next.config.ts`.

## Acceptance Criteria

- [ ] `/courses` catalog renders each course's `coverImage` as its card icon.
- [ ] Non-Next.js courses (such as "Building AI Apps with LLMs", Python, PostgreSQL, Security, etc.) no longer show the Next.js `N` icon.
- [ ] No layout shifts or styling regressions.
- [ ] `npm run build` and `npx tsc --noEmit` pass cleanly.

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

## Manual Test Steps

1. Visit [http://localhost:3000/courses](http://localhost:3000/courses).
2. Verify that each course card (including "Building AI Apps with LLMs", "DevOps with Docker and Kubernetes", etc.) displays its distinctive cover image in the icon position.
