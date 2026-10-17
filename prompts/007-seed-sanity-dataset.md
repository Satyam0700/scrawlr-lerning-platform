# Prompt 007 — Seed Sanity Dataset from Provided Seed Files

## Goal

Seed the Sanity Content Lake `production` dataset using the provided [seed.ndjson](file:///c:/Users/gamer/Desktop/hey/learning-platform/seed.ndjson) and reference [videos.json](file:///c:/Users/gamer/Desktop/hey/learning-platform/videos.json) via the Sanity CLI import tool without modifying either file, and verify all document counts and assets in Sanity immediately afterward.

## Reference

- `AGENTS.md` (Section 8: The data you are modeling; Section 13: Checks to run; Section 14: When in doubt)
- `sanity-migration` (`SKILL.md`, `references/general.md`)
- `sanity-best-practices` (`SKILL.md`, `references/migration.md`)

## Skills read

- `sanity-migration` (`SKILL.md`, `references/general.md`)
- `sanity-best-practices` (`SKILL.md`, `references/migration.md`)
- `AGENTS.md` (Section 2, 8, 13)

## Code & Data inspected

- [seed.ndjson](file:///c:/Users/gamer/Desktop/hey/learning-platform/seed.ndjson): Contains 141 pre-structured documents:
  - `category`: 6 documents
  - `instructor`: 5 documents (with profile photos via `_sanityAsset: "image@https://..."`)
  - `lesson`: 120 documents (with YouTube video URLs, durations, thumbnails via `_sanityAsset`, Portable Text notes, keyPoints, proTips, and resources)
  - `course`: 10 documents (with cover images, marketing fields, learningOutcomes, and module structures referencing lessons)
- [videos.json](file:///c:/Users/gamer/Desktop/hey/learning-platform/videos.json): Contains 120 video metadata entries matching the 120 lessons (YouTube IDs, titles, channels, durations, queries).
- [studio/sanity.cli.ts](file:///c:/Users/gamer/Desktop/hey/learning-platform/studio/sanity.cli.ts) and [sanity.cli.ts](file:///c:/Users/gamer/Desktop/hey/learning-platform/sanity.cli.ts): Configured for project ID `g8whmf61` and dataset `production`.
- Live dataset status: Currently verified as empty (`[]` for courses/lessons/instructors/categories).

## Decisions and Assumptions

1. **Zero modifications to source files**: Neither [seed.ndjson](file:///c:/Users/gamer/Desktop/hey/learning-platform/seed.ndjson) nor [videos.json](file:///c:/Users/gamer/Desktop/hey/learning-platform/videos.json) will be modified in any way, strictly obeying user instructions.
2. **CLI Import**: Use the official Sanity CLI import command `npx sanity dataset import seed.ndjson production --replace --allow-failing-assets` executed against the configured project dataset.
3. **Asset Ingestion**: Sanity CLI handles downloading external `_sanityAsset` URLs (profile photos, thumbnails, cover images) and creating corresponding Sanity asset documents automatically during import.
4. **Post-Import Verification**: Verify exact document counts per document type using GROQ queries via `npx sanity documents query` to ensure all 141 records are created with zero data loss.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `prompts/007-seed-sanity-dataset.md` | Create | Implementation prompt for tracking and verification |

*(No application code or seed data files will be modified)*

## Requirements

1. Run Sanity CLI import of `seed.ndjson` into dataset `production`.
2. Do not modify `seed.ndjson` or `videos.json`.
3. Verify document counts post-import:
   - `category`: 6
   - `instructor`: 5
   - `lesson`: 120
   - `course`: 10
   - Total: 141 documents
4. Confirm Sanity Studio (`http://localhost:3333`) displays the seeded content cleanly.

## Security Considerations

- Import is executed via authenticated CLI session without exposing or storing secret tokens in git-tracked code.
- Source data assets point to public image URLs (randomuser.me, ytimg.com, picsum.photos).

## Acceptance Criteria

- [ ] `seed.ndjson` imported into Sanity `production` dataset via `npx sanity dataset import`.
- [ ] Source files [seed.ndjson](file:///c:/Users/gamer/Desktop/hey/learning-platform/seed.ndjson) and [videos.json](file:///c:/Users/gamer/Desktop/hey/learning-platform/videos.json) remain pristine and untouched.
- [ ] Document counts in Sanity match exactly: 6 categories, 5 instructors, 120 lessons, 10 courses (141 total).
- [ ] Content appears in Sanity Studio at `http://localhost:3333`.

## Checks to Run

1. Execute Sanity CLI dataset import:
   ```bash
   npx sanity dataset import seed.ndjson production --replace --allow-failing-assets
   ```
2. Run count verification via GROQ query:
   ```bash
   npx sanity documents query "*[_type in ['category', 'instructor', 'lesson', 'course']]{_type}"
   ```
3. Check `git status` to ensure `seed.ndjson` and `videos.json` have no git diffs.

## Manual Test Steps

1. Visit Sanity Studio at `http://localhost:3333`.
2. Click **Courses** and verify 10 courses appear with titles, cover images, and structured modules.
3. Click **Lessons** and verify 120 lessons appear with durations, video URLs, and thumbnails.
4. Click **Instructors** and verify 5 instructors appear with portrait photos and bios.
5. Click **Categories** and verify 6 categories appear.
