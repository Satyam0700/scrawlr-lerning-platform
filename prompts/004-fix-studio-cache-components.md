# Prompt 004 — Fix Studio Route dynamic Config for Next.js Cache Components

## Goal

Resolve the build/runtime compilation error on `/studio/[[...tool]]` caused by `export const dynamic = 'force-static'`, which is incompatible with Next.js 16's `cacheComponents: true` setting in `next.config.ts`.

## Reference

- Error: `Route segment config "dynamic" is not compatible with nextConfig.cacheComponents. Please remove it.`
- Source location: `app/studio/[[...tool]]/page.tsx:13`
- Next.js 16 Documentation: `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md` (legacy segment configs like `dynamic` are replaced under `cacheComponents`).

## Skills read

- `AGENTS.md` (Section 2: workflow loop, Section 4: Next.js routing / boundaries, Section 13: checks to run)
- `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`

## Code inspected

- `next.config.ts`: Configures `cacheComponents: true` and `partialPrefetching: true`. Under `cacheComponents`, route segment config exports like `dynamic = 'force-static'` are forbidden.
- `app/studio/[[...tool]]/page.tsx`: Contains `export const dynamic = 'force-static'` on line 13.

## Decisions and Assumptions

1. **Remove Route Segment Config**:
   - Next.js 16 explicitly requires removing `export const dynamic = 'force-static'` when `cacheComponents: true` is enabled.
   - `NextStudio` from `next-sanity/studio` handles client-side rendering for the Studio interface; removing the segment config removes the compilation error while allowing Next.js 16 to handle the route according to Cache Components conventions.
2. **Preserve Metadata and Viewport**:
   - `export { metadata, viewport } from 'next-sanity/studio'` will remain intact as required for proper Sanity Studio viewport scaling and meta tags.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `app/studio/[[...tool]]/page.tsx` | Edit | Remove `export const dynamic = 'force-static'` |

## Requirements

1. Delete `export const dynamic = 'force-static'` from `app/studio/[[...tool]]/page.tsx`.
2. Ensure no lint or syntax issues remain in `app/studio/[[...tool]]/page.tsx`.
3. Verify dev server compilation and run type checks / lint checks.

## Security Considerations

- None; this change only removes an obsolete route segment option in a client-rendered studio page.

## Acceptance Criteria

- [ ] `export const dynamic = 'force-static'` is removed from `app/studio/[[...tool]]/page.tsx`.
- [ ] Next.js compiler no longer throws `Route segment config "dynamic" is not compatible with nextConfig.cacheComponents`.
- [ ] `/studio` route renders without the segment config error.
- [ ] Lint and type checks pass.

## Checks to Run

- Run `npm run lint` or `npx tsc --noEmit` to confirm no TypeScript / ESLint errors.
- Confirm Next.js compilation succeeds on `/studio`.

## Manual Test Steps

1. Start or check the dev server (`npm run dev`).
2. Navigate to `http://localhost:3000/studio`.
3. Verify the browser error overlay does not appear and Sanity Studio loads.
