# Prompt 013 — Fix Sanity Fetch Caching for Instant Studio Updates

## Goal

Fix the Next.js data caching in `sanity/lib/server-client.ts` so that edits made to courses, lessons, and content in Sanity Studio (such as changing a course's level from "Intermediate" to "Beginner") reflect immediately on the page upon refresh without being trapped in an indefinite `revalidate: false` cache.

## Reference

- User Issue: User changed content (level) in Sanity Studio, but the page continued showing the old value because Next.js cached the query result indefinitely.
- `AGENTS.md` (Section 2: loop, Section 5: server data access, Section 12: things that will trip you up, Section 13: checks)
- `sanity/lib/server-client.ts` line 38: `revalidate: tags.length ? false : revalidate`

## Skills read

- `AGENTS.md`
- `sanity-best-practices`

## Code inspected

- `sanity/lib/server-client.ts`:
  - Lines 25-42: `serverSanityFetch` sets `next: { revalidate: tags.length ? false : revalidate, tags }`.
  - When tags like `course:slug` are passed, `revalidate` becomes `false`. Under Next.js App Router, `revalidate: false` means "cache indefinitely" until an on-demand revalidation webhook is received. Since local Studio edits do not trigger webhooks, the cache never invalidates.
- `sanity/lib/data.ts`:
  - `getCourseBySlug`, `getAllCourses`, and `getFeaturedCourses` pass `tags`, inadvertently triggering indefinite caching.
- Verified in Sanity Content Lake:
  - `course.nextjs-app-router-in-depth` was already updated in Sanity to `"level": "Beginner"`, proving the issue is purely Next.js server fetch caching.

## Decisions and Assumptions

1. **Development & Dynamic Revalidation**:
   - In development mode (`process.env.NODE_ENV === 'development'`), set `revalidate: 0` and `cache: 'no-store'` so any edit published in Sanity Studio is immediately visible on the next page refresh.
   - In production, default to time-based revalidation (e.g. 60 seconds) rather than `false` unless explicitly opted-in, preventing stale caches when webhook infrastructure is not connected.
2. **Perspective Support**:
   - Keep `useCdn: false` and ensure queries fetch the latest published content directly from Sanity Content Lake.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `sanity/lib/server-client.ts` | Edit | Adjust `serverSanityFetch` caching to avoid indefinite cache in development |

## Requirements

1. When a user updates a course in Sanity Studio (e.g. changing level to "Beginner") and publishes, refreshing the course page displays the new value.
2. Development environment must not cache queries indefinitely.
3. Production environment respects revalidation windows (default 60s).
4. Type checks (`npx tsc --noEmit`), lint (`npm run lint`), and build (`npm run build`) pass cleanly.

## Security Considerations

- Read token remains server-side only in `sanity/lib/server-client.ts` with `import 'server-only'`.

## Acceptance Criteria

- [ ] `http://localhost:3000/courses/nextjs-app-router-in-depth` displays the updated level ("Beginner") from Sanity.
- [ ] Subsequent content edits in Sanity Studio reflect immediately on page reload.
- [ ] Type check and production build succeed.

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

1. Visit [http://localhost:3000/courses/nextjs-app-router-in-depth](http://localhost:3000/courses/nextjs-app-router-in-depth).
2. Confirm the difficulty level stat displays "Beginner" (reflecting the change made in Sanity).
3. In Sanity Studio, edit any course field and publish.
4. Refresh the page in the browser and verify the updated value renders immediately.
