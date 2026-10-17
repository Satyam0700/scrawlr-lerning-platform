# Prompt 011 — Fetch Homepage Courses from Seeded Sanity Content

## Goal

Replace the hardcoded mock courses array in `app/components/AllCoursesSection.tsx` with live data fetched directly from the seeded Sanity Content Lake using `getFeaturedCourses()` / `getAllCourses()`, ensuring the homepage "All Courses" section renders real course data, real cover images, durations, levels, and working links to course pages.

## Reference

- User Request & Screenshot: User requested to make sure courses on the homepage are also fetched from seeded Sanity content.
- `design/vertex-home.png` — reference 3-column card grid on the home page.
- `AGENTS.md` (Section 2: loop, Section 5: server data fetching, Section 8: Sanity data model, Section 13: checks)
- `sanity/lib/data.ts` (`getFeaturedCourses()`, `formatDuration()`, `CourseCardData`)

## Skills read

- `AGENTS.md`
- `sanity-best-practices`

## Code inspected

- `app/components/AllCoursesSection.tsx`: Currently renders a static `COURSES` mock array containing hardcoded values.
- `app/page.tsx`: Server component composing `Header`, `HeroSection`, `AllCoursesSection`, `WeeklyUpdateBanner`, and `BottomGraphic`.
- `sanity/lib/data.ts`: Provides `getFeaturedCourses()` which executes GROQ `featuredCoursesQuery` via `serverSanityFetch` with the private server read token.
- `app/components/CourseCard.tsx`: Reusable card component supporting `coverImage`, `icon`, `title`, `description`, `level`, `duration`, and `modulesCount`.

## Decisions and Assumptions

1. **Async Server Component Fetching**:
   - Convert `AllCoursesSection` into an async React Server Component (or pass courses down from `app/page.tsx`).
   - Fetch featured courses using `getFeaturedCourses()`.
   - Take the top 3 featured courses (`courses.slice(0, 3)`) to maintain the 3-column desktop layout established in `vertex-home.png`.
   - Fall back to `getAllCourses()` if `getFeaturedCourses()` returns fewer than 3 courses.
2. **Dynamic Card Data**:
   - For each course, pass:
     - `slug`: `course.slug`
     - `title`: `course.title`
     - `description`: `course.summary`
     - `level`: capitalized level string
     - `duration`: `formatDuration(course.totalDuration)`
     - `modulesCount`: `course.modulesCount || 0`
     - `coverImage`: `course.coverImage`
3. **Cache Components & Build Compatibility**:
   - Add `export const instant = false` to `app/page.tsx` to ensure prerendering under Next.js 16 Cache Components succeeds without runtime IO blocking errors.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `app/components/AllCoursesSection.tsx` | Edit | Replace hardcoded `COURSES` array with async Sanity fetch via `getFeaturedCourses()` |
| `app/page.tsx` | Edit | Add `export const instant = false` for Cache Components prerendering |

## Requirements

1. Remove hardcoded `COURSES` array from `AllCoursesSection.tsx`.
2. Fetch live seeded courses from Sanity via `getFeaturedCourses()` / `getAllCourses()`.
3. Display 3 course cards on the homepage with their real Sanity `coverImage`, title, description, level, duration, and module count.
4. Each card links to `/courses/[slug]` using the course's real Sanity slug.
5. All verification checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`) pass.

## Security Considerations

- Course data is fetched exclusively on the server through `serverSanityFetch` using `SANITY_API_READ_TOKEN`.
- No credentials or write tokens are exposed to the client.

## Acceptance Criteria

- [ ] Homepage "All Courses" section displays courses fetched live from Sanity.
- [ ] Hardcoded mock data in `AllCoursesSection.tsx` is completely removed.
- [ ] Each homepage course card links to its valid `/courses/[slug]` page.
- [ ] `npm run build`, `npm run lint`, and `npx tsc --noEmit` pass with 0 errors.

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

1. Visit [http://localhost:3000/](http://localhost:3000/).
2. Verify the "All Courses" section displays 3 real courses from the Sanity dataset with their real titles, descriptions, and cover image icons.
3. Click a course card and verify it navigates cleanly to the corresponding `/courses/[slug]` detail page.
