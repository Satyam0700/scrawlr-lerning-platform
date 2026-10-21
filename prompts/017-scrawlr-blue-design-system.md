# Prompt 017 — Scrawlr Brand and Blue Design System Migration

## Goal

Migrate the design system and branding of the learning platform from **Vertex** (orange primary `#F97316`) to **Scrawlr** (vibrant royal blue primary `#2563EB`), preserving all layout structures, typography hierarchy, component behaviors, and data contracts while providing a fresh, cohesive, modern brand identity.

## Reference

- User request: *"Chane the design system for this to new the structure looks same but we change logo as new name Scrawlr and design to blue"*
- Existing design tokens: `app/globals.css`
- Brand header & navigation: `app/components/Header.tsx`
- Hero and layout: `app/components/HeroSection.tsx`, `app/components/BottomGraphic.tsx`, `app/layout.tsx`

## Skills read

- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (Next.js font handling & CSS variables).
- Tailwind CSS v4 `@theme inline` system conventions.

## Code inspected

- `app/globals.css`: Primary color tokens `--color-primary-*`, button hover states, input focus rings, badges, progress bar, now-playing status dots.
- `app/components/Header.tsx`: Brand mark (previously geometric orange triangle), brand wordmark ("Vertex"), navigation, and auth actions.
- `app/components/HeroSection.tsx`: "Vertex" copy in subtitle, orange button hover styles.
- `app/components/BottomGraphic.tsx`: Decorative silhouette equalizer bars and ambient glow using orange rgba values.
- `app/search/SearchBottomBanner.tsx`: Warm peach/orange background container, orange search badge.
- `app/search/SearchVideoCard.tsx`: Hardcoded orange badge classes (`text-orange-600 bg-orange-50 border-orange-200/60`).
- `app/courses/[slug]/CourseIcons.tsx`: Terracotta/orange SVG stroke `#EA580C` for outcome icons.
- `app/lessons/[slug]/LessonResources.tsx`, `LessonSidebar.tsx`, `LessonContentTabs.tsx`, `page.tsx`: Orange tint badges and resource icon backgrounds.
- Metadata titles and descriptions in `app/layout.tsx`, `app/search/page.tsx`, `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/lessons/[slug]/page.tsx`, `app/studio/[[...tool]]/page.tsx`.

## Decisions and assumptions

1. **Brand Palette (Blue)**:
   - Primary 500: `#2563EB` (vibrant, modern royal blue)
   - Primary 600: `#1D4ED8` (deep blue for hover states and active emphasis)
   - Primary 400: `#60A5FA` (focus rings and border highlights)
   - Primary 300: `#93C5FD`
   - Primary 200: `#BFDBFE`
   - Primary 100: `#EFF6FF` (tinted backgrounds, badges, and card accents)
   - Primary 50: `#F8FAFC` / `#F0F7FF`
2. **Scrawlr Logo Mark**:
   - Create a sleek, modern custom SVG mark for **Scrawlr** featuring an elegant flowing 'S' / continuous stylized stroke with electric blue gradients and subtle depth that looks crisp at 28x28px and scales cleanly.
   - Accompany with bold, tight typography: "Scrawlr".
3. **Preserve Structure**:
   - Keep all existing layouts, grids, flex containers, typography scale (Playfair Display + Inter), and spacing exactly intact.
4. **Clean Component Tints**:
   - Replace hardcoded `bg-orange-*`, `text-orange-*`, and `border-orange-*` utilities across search, lesson, course, and hero components with corresponding `blue` equivalents or `primary-*` design system tokens.
5. **Update Metadata & Copy**:
   - Update user-facing platform names from "Vertex" to "Scrawlr" in metadata titles, hero copy, and studio headers.

## Files to touch

| File | Action |
|---|---|
| `app/globals.css` | **Edit** — Update primary color tokens to blue palette, update button hover/active colors, focus ring shadows, and comments. |
| `app/components/Header.tsx` | **Edit** — Replace Vertex logo with Scrawlr custom SVG icon mark and "Scrawlr" wordmark. |
| `app/components/HeroSection.tsx` | **Edit** — Update subtitle text to Scrawlr and button hover background to blue. |
| `app/components/BottomGraphic.tsx` | **Edit** — Update gradient bars and ambient glow from orange rgba to blue rgba. |
| `app/search/SearchBottomBanner.tsx` | **Edit** — Update container styling from orange tint to soft blue tint (`#F0F7FF`, border `#DBEAFE`). |
| `app/search/SearchVideoCard.tsx` | **Edit** — Update VIDEO tag colors to blue badge. |
| `app/courses/[slug]/CourseIcons.tsx` | **Edit** — Update outcome icon stroke from `#EA580C` to `#2563EB`. |
| `app/lessons/[slug]/LessonResources.tsx` | **Edit** — Update resource icon wrapper from orange tint to blue tint. |
| `app/lessons/[slug]/LessonSidebar.tsx` | **Edit** — Update active lesson badge styling from orange to blue. |
| `app/lessons/[slug]/LessonContentTabs.tsx` | **Edit** — Update pro tip icon background from orange tint to blue tint. |
| `app/lessons/[slug]/page.tsx` | **Edit** — Update lesson module pill badge from orange tint to blue tint. |
| `app/layout.tsx` | **Edit** — Update metadata title to "Scrawlr — AI-Powered Learning Platform". |
| `app/search/page.tsx` | **Edit** — Update search page metadata to Scrawlr. |
| `app/courses/page.tsx` | **Edit** — Update courses catalog metadata to Scrawlr. |
| `app/courses/[slug]/page.tsx` | **Edit** — Update course detail page title fallback to Scrawlr. |
| `app/lessons/[slug]/page.tsx` | **Edit** — Update lesson page title fallback and description to Scrawlr. |
| `app/studio/[[...tool]]/page.tsx` | **Edit** — Update studio page title and text to Scrawlr Studio. |

## Security considerations

- No sensitive keys, authentication logic, or server routes are altered.
- Clerk authentication and Sanity client credentials remain completely isolated and intact.

## Acceptance criteria

1. **Design System Tokens**:
   - `--color-primary-500` is `#2563EB`.
   - `--color-primary-400` is `#60A5FA`.
   - `--color-primary-300` is `#93C5FD`.
   - `--color-primary-200` is `#BFDBFE`.
   - `--color-primary-100` is `#EFF6FF`.
   - Button, badge, input focus, and progress track styles reflect the blue design system.
2. **Brand & Logo**:
   - Header shows the new custom "Scrawlr" SVG icon mark and "Scrawlr" brand name.
   - Hero subtitle reads "Scrawlr understands what you want to learn...".
3. **Visual Consistency**:
   - Bottom equalizer bars and ambient glow render with smooth blue gradients.
   - Search result video badges, bottom search card, lesson pro-tips, and course outcome icons render with blue accents instead of orange.
4. **Checks pass**:
   - `npm run build` succeeds without type or styling errors.

## Checks to run

```powershell
npm run build
```

## Manual test steps

1. Open `http://localhost:3000/` in browser.
2. Verify the header shows the new Scrawlr logo and "Scrawlr" text in place of Vertex.
3. Verify primary buttons, hover states, hero badge, and bottom graphic equalizer bars display in rich blue.
4. Navigate to `/courses` and click into a course detail page (e.g. `/courses/building-with-nextjs`). Verify the outcome icons and enroll/view buttons use the blue theme.
5. Navigate to a lesson page (e.g. `/lessons/caching-in-nextjs`). Verify the sidebar active lesson highlight, Pro Tip badge, and Resources icons use the blue theme.
6. Navigate to `/search?q=caching`. Verify the VIDEO badge and bottom banner use the blue theme.
