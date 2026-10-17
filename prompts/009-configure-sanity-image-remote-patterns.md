# Prompt 009 — Configure Remote Image Hostnames in next.config.ts

## Goal

Resolve the Next.js `Invalid src prop on next/image, hostname "cdn.sanity.io" is not configured under images in your next.config.js` runtime error by configuring `images.remotePatterns` in `next.config.ts` for Sanity CDN (`cdn.sanity.io`) and external seed image providers (`picsum.photos`, `i.ytimg.com`, `randomuser.me`).

## Reference

- Error: `Invalid src prop (https://cdn.sanity.io/images/g8whmf61/production/...) on next/image, hostname "cdn.sanity.io" is not configured under images in your next.config.js`
- `AGENTS.md` (Section 2: loop, Section 6: tech stack, Section 13: checks to run)
- `node_modules/next/dist/docs/02-app/02-api-reference/05-next-config-js/images.md`

## Skills read

- `AGENTS.md`
- `sanity-best-practices`

## Code inspected

- `next.config.ts`: Currently has `experimental.agentFeedback`, `cacheComponents: true`, `partialPrefetching: true`, and `turbopack` config, but lacks an `images` block.
- `app/courses/[slug]/CourseIcons.tsx`: Line 97 renders `<Image src={imageUrl} ... />` with Sanity image URLs like `https://cdn.sanity.io/...`.
- `seed.ndjson`: Contains external image references to `cdn.sanity.io`, `picsum.photos`, `i.ytimg.com`, and `randomuser.me`.

## Decisions and Assumptions

1. Add `images.remotePatterns` to `next.config.ts` allowing:
   - `protocol: 'https', hostname: 'cdn.sanity.io'`
   - `protocol: 'https', hostname: 'picsum.photos'`
   - `protocol: 'https', hostname: 'i.ytimg.com'`
   - `protocol: 'https', hostname: 'randomuser.me'`
2. Preserve existing `next.config.ts` settings (`cacheComponents: true`, `partialPrefetching: true`, `turbopack` tailwind rules, and `experimental.agentFeedback`).

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `next.config.ts` | Edit | Add `images.remotePatterns` configuration |

## Requirements

1. Add `images.remotePatterns` to `next.config.ts`.
2. Allow `cdn.sanity.io` so Sanity-hosted course covers, author photos, and lesson thumbnails optimize and render without runtime errors.
3. Allow `picsum.photos`, `i.ytimg.com`, and `randomuser.me` to cover all seeded asset sources.
4. Pass TypeScript check (`npx tsc --noEmit`), lint (`npm run lint`), and build (`npm run build`).

## Security Considerations

- Use explicit `hostname` entries in `remotePatterns` rather than wildcard `**` to restrict remote image optimization to trusted origins.

## Acceptance Criteria

- [ ] `cdn.sanity.io` configured in `next.config.ts` under `images.remotePatterns`.
- [ ] No `Invalid src prop on next/image` runtime error when viewing courses with Sanity image assets.
- [ ] TypeScript check, ESLint, and Next.js production build succeed.

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

1. Visit any course with a Sanity CDN cover image (e.g. `http://localhost:3000/courses/devops-with-docker-and-kubernetes` or `http://localhost:3000/courses/practical-web-security`).
2. Verify the course cover image loads cleanly without the Next.js unconfigured host error overlay.
