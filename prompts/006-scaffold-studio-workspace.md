# Prompt 006 — Scaffold Standalone Sanity Studio Workspace

## Goal

Scaffold a dedicated, standalone Sanity Studio workspace in `studio/` per `AGENTS.md` Section 5 architecture requirements, keeping content authoring and schema management separate from the Next.js web application. Configure Vite-based Studio dev/build, custom Desk structure, TypeGen integration, environment configuration, and root workspace scripts.

## Reference

- `AGENTS.md` (Section 5: "The project is two standalone workspaces in one repo. Build it this way and do not embed the Studio inside Next.js. Keeping them separate is what preserves independent deploys, Studio auto updates, and TypeGen. A Studio workspace holds the Sanity schema and content authoring, nothing else"; Section 6: "Do not use ... an embedded Studio"; Section 13: Checks to run)
- `sanity-best-practices` (`references/project-structure.md`, `references/nextjs.md`, `references/typegen.md`)
- Existing schemas and structure: `sanity/schemaTypes/`, `sanity/structure.ts`

## Skills read

- `sanity-best-practices` (`SKILL.md`, `references/project-structure.md`, `references/nextjs.md`, `references/typegen.md`)
- `AGENTS.md` (Section 2, 5, 6, 13)

## Code inspected

- Root `package.json`: Contains Next.js app dependencies along with `sanity` and `@sanity/vision`.
- `app/studio/[[...tool]]/page.tsx`: Embedded studio route in Next.js which violates `AGENTS.md` Section 5 & 6 standalone architecture.
- `sanity/schemaTypes/`: Contains all defined Vertex schemas (`courseType.ts`, `lessonType.ts`, `instructorType.ts`, `categoryType.ts`, `moduleType.ts`, `learningOutcomeType.ts`, `resourceType.ts`, `blockContentType.ts`, `index.ts`).
- `sanity/structure.ts`: Desk structure configured for Vertex.
- `.env.local`: Contains `NEXT_PUBLIC_SANITY_PROJECT_ID="g8whmf61"` and `NEXT_PUBLIC_SANITY_DATASET="production"`.

## Decisions and Assumptions

1. **Standalone Studio Workspace Directory (`studio/`)**:
   - Create `studio/` as its own standalone project with independent `package.json`, `sanity.config.ts`, `sanity.cli.ts`, `structure.ts`, and `schemaTypes/`.
   - Uses Vite under the hood (`sanity dev` running on `http://localhost:3333`) providing 10-30x faster builds, automatic Studio updates, and TypeGen watch capability.
2. **Schema Organization**:
   - Migrate/mirror all Vertex content model schemas into `studio/schemaTypes/` (`courseType.ts`, `lessonType.ts`, `instructorType.ts`, `categoryType.ts`, `moduleType.ts`, `learningOutcomeType.ts`, `resourceType.ts`, `blockContentType.ts`, `index.ts`).
   - Copy `sanity/structure.ts` to `studio/structure.ts` with custom icons from `@sanity/icons`.
3. **Studio CLI & TypeGen Configuration (`studio/sanity.cli.ts`)**:
   - Configure `typegen` in `studio/sanity.cli.ts` to scan web queries in `../app` and `../sanity` and generate TypeScript types to `../sanity.types.ts`.
4. **Remove Embedded Studio in Web App**:
   - Remove `app/studio/[[...tool]]/page.tsx` (or replace with a redirection/instructions page to `http://localhost:3333`) to eliminate the Next.js bundle bloat and comply strictly with `AGENTS.md` Section 5 & 6.
5. **Root Scripts**:
   - Add convenience scripts to root `package.json`:
     - `"studio:dev": "npm --prefix studio run dev"` (runs Studio on port 3333)
     - `"studio:build": "npm --prefix studio run build"`
     - `"studio:typegen": "npm --prefix studio run typegen"`

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `studio/package.json` | Create | Independent package manifest for Sanity Studio workspace |
| `studio/sanity.config.ts` | Create | Vite-based Sanity Studio configuration (port 3333) |
| `studio/sanity.cli.ts` | Create | Studio CLI config and TypeGen outputting to web |
| `studio/tsconfig.json` | Create | TypeScript configuration for Studio |
| `studio/.gitignore` | Create | Git ignore for Studio build artifacts and node_modules |
| `studio/.env` | Create | Studio environment variables (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`) |
| `studio/structure.ts` | Create | Desk structure with custom icons for Vertex |
| `studio/schemaTypes/*` | Create | All Vertex content model schemas (course, lesson, instructor, category, module, etc.) |
| `app/studio/[[...tool]]/page.tsx` | Delete / Replace | Remove embedded studio route in Next.js web workspace |
| `package.json` | Edit | Add `"studio:dev"`, `"studio:build"`, `"studio:typegen"` helper scripts |

## Requirements

1. `studio/` workspace must be completely self-contained and run via `sanity dev` (defaulting to port 3333).
2. All schemas (`course`, `lesson`, `instructor`, `category`, `module`, `learningOutcome`, `resource`, `blockContent`) must be fully defined and registered in `studio/schemaTypes/index.ts`.
3. Desk structure in `studio/structure.ts` must organize Courses, Lessons, Instructors, and Categories with clear icons.
4. Next.js app in root must compile cleanly without embedded studio overhead.
5. `studio/` dependencies must install cleanly (`npm install` in `studio/`).
6. Both workspaces must pass lint and type checking.

## Security Considerations

- `studio/.env` only uses public Studio project ID and dataset (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`). No secret API tokens are placed in client-accessible Studio files.
- Dataset read/write tokens remain strictly on the server in Next.js web application.

## Acceptance Criteria

- [ ] `studio/` directory created with `package.json`, `sanity.config.ts`, `sanity.cli.ts`, `tsconfig.json`, `structure.ts`, and `schemaTypes/`.
- [ ] Dependencies in `studio/` installed successfully.
- [ ] `npm --prefix studio run build` or `npx sanity build` in `studio/` succeeds.
- [ ] Embedded studio route in Next.js is eliminated or replaced with redirect notice.
- [ ] Root Next.js app builds cleanly (`npm run build`) and passes lint (`npm run lint`) and type check (`npx tsc --noEmit`).
- [ ] Root `package.json` provides `npm run studio:dev` and `npm run studio:build`.

## Checks to Run

- Run `npm install` inside `studio/`.
- Run `npm --prefix studio run build` to verify Studio builds without errors.
- Run `npx tsc --noEmit` and `npm run build` in root to verify web app compiles cleanly.

## Manual Test Steps

1. In a terminal, run `npm run studio:dev` (or `cd studio && npm run dev`).
2. Open `http://localhost:3333` in the browser and verify the standalone Sanity Studio opens.
3. Verify all Vertex document types (Courses, Lessons, Instructors, Categories) are present in the navigation.
4. In another terminal, run `npm run dev` and verify `http://localhost:3000` loads the web app.
