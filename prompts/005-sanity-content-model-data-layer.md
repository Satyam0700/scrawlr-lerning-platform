# Prompt 005 — Sanity Content Model, Studio & Server Data Layer

## Goal

Implement the Sanity content model in Sanity Studio for Vertex (course, module, lesson, instructor, category) per `AGENTS.md` specifications, configure desk structure and icons, establish a private server-only Sanity read client, and build a strongly-typed data access layer with GROQ queries for fetching courses, course details, lessons, instructors, and categories.

## Reference

- `AGENTS.md` (Section 5: Studio workspace & web data boundaries; Section 6: Tech stack; Section 8: The data you are modeling; Section 12: Private dataset and server read token rules)
- `sanity-best-practices` (`references/schema.md`, `references/nextjs.md`, `references/groq.md`)
- `content-modeling-best-practices` (Embedded objects vs references, clean field naming)
- Existing Sanity config: `sanity.config.ts`, `sanity/schemaTypes/index.ts`, `sanity/lib/client.ts`, `sanity/structure.ts`

## Skills read

- `sanity-best-practices` (`SKILL.md`, `references/schema.md`, `references/nextjs.md`)
- `content-modeling-best-practices` (`SKILL.md`)
- `AGENTS.md` (Section 2, 5, 8, 12, 13)

## Code inspected

- `sanity/schemaTypes/index.ts`: Empty schema types array `types: []`.
- `sanity.config.ts`: Configures `basePath: '/studio'`, schema, vision tool, and structure tool.
- `sanity/structure.ts`: Minimal desk structure `S.list().title('Content').items(S.documentTypeListItems())`.
- `sanity/lib/client.ts`: Public client using `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
- `sanity/lib/live.ts`: `defineLive` setup.
- `sanity/env.ts`: Validates project ID and dataset.
- `.env.local`: Contains `NEXT_PUBLIC_SANITY_PROJECT_ID="g8whmf61"` and `NEXT_PUBLIC_SANITY_DATASET="production"`.
- `.env.example`: Currently missing Sanity environment variable declarations.
- `app/components/AllCoursesSection.tsx`: Currently uses hardcoded course cards that will later consume this data layer.

## Decisions and Assumptions

1. **Schema Architecture & Separation of Concerns (AGENTS.md Section 8)**:
   - **`course`** (Document):
     - `title` (string, required)
     - `slug` (slug, required, auto-generated from title)
     - `summary` (text, marketing summary)
     - `coverImage` (image with hotspot and `alt` string)
     - `level` (string: `Beginner`, `Intermediate`, `Advanced`)
     - `price` (number)
     - `popular` (boolean flag)
     - `studentCount` (number, display count)
     - `learningOutcomes` (array of `learningOutcome` objects: `{ icon, title, description }`)
     - `instructor` (reference to `instructor` document, required)
     - `category` (reference to `category` document, required)
     - `modules` (array of embedded `module` objects)
   - **`module`** (Embedded Object inside course, not a top-level document):
     - `title` (string, required)
     - `summary` (text)
     - `lessons` (ordered array of references to `lesson` documents)
     - Note: Derives numbers (Module 1, Lesson 1.1) from array ordering, not stored as fields.
   - **`lesson`** (Document):
     - `title` (string, required)
     - `slug` (slug, required, auto-generated from title)
     - `videoUrl` (url, YouTube/Vimeo/Bunny)
     - `thumbnail` (image with hotspot and `alt`)
     - `duration` (number, duration in minutes or seconds)
     - `freePreview` (boolean flag for display)
     - `studentCount` (number, display count)
     - `notes` (Portable Text `blockContent` for rich notes)
     - `keyPoints` (array of strings for "In this lesson you will")
     - `proTip` (text, optional)
     - `resources` (array of `resource` objects: `{ type, title, description, url }`)
     - Note: Does not store parent course; derived via reverse GROQ lookup (`*[_type == "course" && references(^._id)][0]`).
   - **`instructor`** (Document):
     - `name` (string, required)
     - `slug` (slug, required, auto-generated from name)
     - `photo` (image with hotspot and `alt`)
     - `expertise` (string, e.g., "Principal Engineer & Cloud Architect")
     - `bio` (text or Portable Text)
   - **`category`** (Document):
     - `title` (string, required)
     - `slug` (slug, required, auto-generated from title)
     - `description` (text)
   - **Helper Objects**:
     - `blockContent` (rich text definitions for Portable Text)
     - `learningOutcome` (`{ icon, title, description }`)
     - `resource` (`{ type, title, description, url }`)

2. **Studio Structure & Icons (`sanity/structure.ts`)**:
   - Organize Studio navigation cleanly with icons from `@sanity/icons`:
     - Courses (`BookIcon`)
     - Lessons (`PlayIcon`)
     - Instructors (`UsersIcon`)
     - Categories (`TagIcon`)
   - Exclude nested objects (`module`, `learningOutcome`, `resource`, `blockContent`) from the top-level document list.

3. **Data Access & Server-Only Read Client (AGENTS.md Section 5 & 12)**:
   - Create `sanity/lib/server-client.ts`:
     - Uses `server-only` to guarantee it is never imported into client components.
     - Reads `SANITY_API_READ_TOKEN` from `process.env`.
     - Uses `createClient` configured with `useCdn: false` for authenticated private dataset reads and draft/fresh data fetching.
   - Create `sanity/lib/queries.ts`:
     - Define GROQ queries:
       - `allCoursesQuery`: Fetches all courses with slug, title, summary, coverImage, level, price, popular, studentCount, instructor name/photo, category title, and total module/lesson counts.
       - `courseBySlugQuery`: Fetches detailed course by slug including learning outcomes, instructor details, category, and ordered modules with full lesson references.
       - `lessonBySlugQuery`: Fetches a lesson by its slug, including notes, key points, resources, and reverse-resolved course and module title/index.
       - `allInstructorsQuery` and `instructorBySlugQuery`.
       - `allCategoriesQuery`.
   - Create `sanity/lib/data.ts`:
     - Server-side data fetching helper functions (`getAllCourses()`, `getCourseBySlug(slug)`, `getLessonBySlug(slug)`, `getAllInstructors()`, `getInstructorBySlug(slug)`, `getAllCategories()`).
     - Strong TypeScript interfaces for all queried content shapes.
   - Update `.env.example`:
     - Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_API_READ_TOKEN`.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `sanity/schemaTypes/categoryType.ts` | Create | Category document schema |
| `sanity/schemaTypes/instructorType.ts` | Create | Instructor document schema |
| `sanity/schemaTypes/lessonType.ts` | Create | Lesson document schema |
| `sanity/schemaTypes/moduleType.ts` | Create | Embedded module object schema |
| `sanity/schemaTypes/learningOutcomeType.ts` | Create | Learning outcome object schema |
| `sanity/schemaTypes/resourceType.ts` | Create | Resource object schema |
| `sanity/schemaTypes/blockContentType.ts` | Create | Portable Text schema for notes |
| `sanity/schemaTypes/courseType.ts` | Create | Course document schema linking modules, instructor, category |
| `sanity/schemaTypes/index.ts` | Edit | Register all schemas in Sanity Studio |
| `sanity/structure.ts` | Edit | Organize custom desk structure with icons |
| `sanity/lib/server-client.ts` | Create | Server-only Sanity client with private read token |
| `sanity/lib/queries.ts` | Create | GROQ queries for courses, lessons, instructors, and categories |
| `sanity/lib/data.ts` | Create | Typed data access layer with helper functions |
| `.env.example` | Edit | Document required Sanity environment variables |

## Requirements

1. Use `defineType`, `defineField`, and `defineArrayMember` from `sanity` for type safety across all schemas.
2. Ensure strict adherence to AGENTS.md data model:
   - Module is an embedded object, not a document.
   - Lesson is a document, does not store parent course directly.
   - Course has marketing fields, instructor & category references, learning outcomes, and modules array.
3. Organize desk structure in `sanity/structure.ts` to display top-level document types with clear titles and icons, filtering out non-document objects.
4. Server read client in `sanity/lib/server-client.ts` must use `import 'server-only'` to prevent secret token leaks to the client bundle.
5. Provide typed server functions in `sanity/lib/data.ts` for clean abstraction in Next.js Server Components.
6. Verify TypeScript type-checking and ESLint checks pass with no errors.

## Security Considerations

- `SANITY_API_READ_TOKEN` must remain strictly server-side.
- `server-only` is imported in `sanity/lib/server-client.ts` to prevent accidental bundling into client components.
- No write tokens or credentials exposed to the browser.

## Acceptance Criteria

- [ ] All schema types (`course`, `module`, `lesson`, `instructor`, `category`, `learningOutcome`, `resource`, `blockContent`) are implemented and registered.
- [ ] Sanity Studio at `/studio` boots without errors and displays the customized Desk navigation.
- [ ] Editors can create and link Categories, Instructors, Lessons, and Courses with embedded Modules in Studio.
- [ ] Server-only Sanity client and typed data fetching helper functions (`getAllCourses`, `getCourseBySlug`, `getLessonBySlug`, `getInstructorBySlug`, `getAllCategories`) are implemented and ready for consumption.
- [ ] `.env.example` documents all Sanity environment variables.
- [ ] `npm run lint` and TypeScript check (`npx tsc --noEmit`) pass cleanly.

## Checks to Run

- Run `npx tsc --noEmit` to verify all schema types and query types are valid.
- Run `npm run lint` to verify clean code standard.
- Verify Studio loads at `http://localhost:3000/studio`.

## Manual Test Steps

1. Access `http://localhost:3000/studio`.
2. Verify left navigation shows "Courses", "Lessons", "Instructors", and "Categories" with distinct icons.
3. Test creating a Category and an Instructor.
4. Test creating a Lesson with title, videoUrl, key points, notes, and resources.
5. Test creating a Course, selecting the Category and Instructor, adding a Module, and referencing the created Lesson.
6. Publish documents in Studio and confirm valid storage.
