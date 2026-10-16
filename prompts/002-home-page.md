# Prompt 002 — Vertex Home Page UI

## Goal

Implement the Vertex Home Page UI in `app/page.tsx` based exactly on the desktop reference design image `design/vertex-home.png`, following the design tokens established in `app/globals.css` and `prompts/001-design-system.md`. Ensure responsive layout down to mobile viewports while maintaining pixel-perfect fidelity with the desktop reference.

## Reference

- `design/vertex-home.png` — the source of truth for layout, typography, colors, spacing, and visual elements.
- `design/vertex-designsystem.png` & `prompts/001-design-system.md` — design tokens and typography hierarchy.

## Skills read

- `AGENTS.md` (Project rules, UI reproduction rules, tech stack constraints)
- `prompts/001-design-system.md` (Design tokens, type scale, radii, colors, icons spec)

## Code inspected

- `app/layout.tsx`: Root layout with `Playfair_Display` (`--font-playfair-display`) and `Inter` (`--font-inter`) variables applied to `<html>`, default body layout.
- `app/globals.css`: Tailwind v4 theme definitions (`@theme inline`), typography utility classes (`text-display-1`, `text-display-2`, `text-body`, etc.), component classes (`btn`, `btn-primary`, `badge`, `card`, `input`).
- `app/page.tsx`: Current placeholder Next.js template to be replaced.
- `package.json`: Contains Next.js 16.4.2, React 19.3.0, Tailwind v4.

## Decisions and Assumptions

1. **Iconography**:
   - Use `lucide-react` (or high-fidelity inline SVGs adhering to the 24x24 2px stroke spec) for icons: Search, ArrowRight, Bell, Star, Signal/BarChart, Clock, BookOpen/FileText, Command.
   - For course brand logos (Next.js, Docker, TypeScript), implement dedicated SVG components matching their iconic designs in the reference image.
   - For the Vertex logo mark in the header, create an SVG component matching the orange geometric triangle/origami emblem with the "Vertex" wordmark.
2. **Components Structure**:
   - Create modular, reusable components in `app/components/`:
     - `Header.tsx`: Top navigation bar with Vertex logo, "Courses", "My Learning" links, notification bell, and user avatar.
     - `HeroSection.tsx`: "INTELLIGENT LEARNING" badge, Playfair Display headline ("Search your learning in plain English."), subheadline, "Explore Courses ->" CTA button, and the search input bar with `⌘ K` badge.
     - `CourseCard.tsx`: Reusable card component for course display with logo, Playfair Display title, description, and meta row (difficulty, duration, module count).
     - `AllCoursesSection.tsx`: "All Courses" section heading, "View all courses ->" link, and 3-column responsive grid with the three initial courses (Next.js for Production, Docker Essentials, TypeScript Deep Dive).
     - `WeeklyUpdateBanner.tsx`: Centered divider with star icon and "New courses and lessons added every week."
     - `BottomDecorGraphic.tsx`: Visual reproduction of the orange/coral vertical equalizer/cityscape gradient silhouette graphic at the base of the page.
3. **Typography**:
   - Headlines ("Search your learning in plain English.", "All Courses", and course card titles) use `font-display` (Playfair Display) as seen in `vertex-home.png`.
   - Body copy, navigation, badges, metadata, and buttons use `font-sans` (Inter).
4. **Interactivity & State**:
   - Navigation links point to `/courses` and `/my-learning`.
   - The search input is interactive (focused styling, keyboard shortcut visual).
   - Course cards have subtle hover states (`hover:shadow-md hover:-translate-y-0.5 transition-all`).
5. **Responsiveness**:
   - Desktop matches `vertex-home.png` exactly.
   - On tablet/mobile: course cards stack from 3 columns to 1 or 2 columns; search bar adapts full width with proper padding; header remains clean and organized.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `package.json` | Edit (install) | Add `lucide-react` for consistent 24x24 2px stroke icons |
| `app/components/Header.tsx` | Create | Top navigation bar with logo, links, bell, and avatar |
| `app/components/HeroSection.tsx` | Create | Hero headline, badge, subtitle, CTA button, search bar |
| `app/components/CourseCard.tsx` | Create | Individual course card component |
| `app/components/AllCoursesSection.tsx` | Create | "All Courses" section with 3-column card grid |
| `app/components/WeeklyUpdateBanner.tsx` | Create | Decorative star banner with dividing lines |
| `app/components/BottomGraphic.tsx` | Create | Bottom ambient equalizer/silhouette graphic |
| `app/page.tsx` | Rewrite | Home page composing the components |

## Requirements

### 1. Navigation Header
- Vertex Logo: Orange triangle brand icon + bold "Vertex" text.
- Nav items: "Courses" (link to `/courses`), "My Learning" (link to `/my-learning`).
- Right items:
  - Notification bell icon with subtle hover state.
  - User avatar: circular profile image with subtle border.
- Full width container with bottom border `border-neutral-200/80`, max content width container.

### 2. Hero Section
- Pill Badge:
  - Text: "INTELLIGENT LEARNING"
  - Styling: rounded-full, subtle warm orange border/bg (`bg-primary-100/60 border border-primary-200 text-primary-500 font-semibold text-xs tracking-wider`).
- Main Headline:
  - Text: "Search your learning in plain English."
  - Styling: Playfair Display (`font-display`), bold, ~52px-56px on desktop, dark neutral (`text-neutral-900`), center aligned.
- Subtitle:
  - Text: "Vertex understands what you want to learn and finds the exact lessons across all your courses."
  - Styling: Inter (`font-sans`), `text-neutral-500`, ~16px-18px, centered, max-w-lg.
- Primary CTA:
  - Button text: "Explore Courses" with right arrow icon (`->`).
  - Styling: Primary button (`bg-primary-500 hover:bg-[#EA6A10] text-white px-6 h-11 rounded-md font-medium shadow-sm transition`).
- Search Bar:
  - Centered box, max-w-2xl, h-14, white background, rounded-xl, border `border-neutral-200`, shadow-sm.
  - Left search magnifying glass icon.
  - Placeholder: "Ask anything about your learning...".
  - Right: `⌘ K` keyboard badge.

### 3. All Courses Section
- Header row:
  - Left: "All Courses" heading in Playfair Display (`font-display font-bold text-2xl text-neutral-900`).
  - Right: "View all courses ->" in `text-primary-500 font-medium text-sm hover:underline`.
- 3 Course Cards:
  - **Card 1**:
    - Logo: Next.js dark icon with white "N".
    - Title: "Next.js for Production" (Playfair Display, bold, text-lg/xl).
    - Description: "Build scalable, high-performance web applications with Next.js."
    - Meta: Intermediate · 18h 24m · 12 modules.
  - **Card 2**:
    - Logo: Docker container whale icon.
    - Title: "Docker Essentials" (Playfair Display, bold, text-lg/xl).
    - Description: "Containerize applications and streamline your development workflow."
    - Meta: Beginner · 10h 12m · 8 modules.
  - **Card 3**:
    - Logo: TypeScript blue square icon with white "TS".
    - Title: "TypeScript Deep Dive" (Playfair Display, bold, text-lg/xl).
    - Description: "Go beyond the basics and write safer, more expressive code."
    - Meta: Intermediate · 14h 36m · 10 modules.
- Card styling:
  - White background, rounded-2xl, border `border-neutral-200`, `shadow-sm hover:shadow-md`, padding 24px, subtle separator line above metadata row.

### 4. Updates Banner
- Centered between horizontal divider lines:
  - Orange outline star icon.
  - Text: "New courses and lessons added every week." (`text-sm text-neutral-700`).

### 5. Ambient Graphic
- Bottom decorative orange/coral bars gradient silhouette resembling sound/equalizer or skyline waves as visible in `vertex-home.png`.

## Security Considerations

- No private API keys or client-side tokens are used.
- All links are local routes or standard anchors.
- Clean component boundaries without arbitrary code execution or unvalidated inputs.

## Acceptance Criteria

1. Home page renders exactly according to `design/vertex-home.png` at desktop viewport.
2. Uses design tokens from `app/globals.css` (Playfair Display, Inter, Primary orange `#F97316`, neutral scales).
3. Header includes logo, nav links, bell icon, and avatar.
4. Hero includes pill badge, title, subtitle, CTA button, and interactive search input with `⌘ K` badge.
5. All 3 course cards match the design image content, icons, typography, and metadata.
6. Banner with star icon and bottom ambient graphic are present and visually faithful.
7. Mobile responsiveness: layout gracefully wraps and stacks on small viewports without horizontal overflow.
8. `npx next build` and `npm run lint` pass with zero errors.

## Checks

```bash
npm install lucide-react
npm run lint
npx next build
```

## Manual Test Steps

1. Run `npm run dev` and navigate to `http://localhost:3000`.
2. Verify Header: Vertex logo renders cleanly, "Courses" and "My Learning" links are present, bell icon and avatar render on the right.
3. Verify Hero: "INTELLIGENT LEARNING" pill badge is styled properly, title is Playfair Display, CTA button hovers smoothly, search bar has magnifying glass and `⌘ K` badge.
4. Verify Course Cards: Next.js, Docker, and TypeScript cards display correct icons, serif titles, descriptions, and icons for level, duration, and modules.
5. Verify Footer Banner & Graphic: Star banner with dividing rules and bottom orange silhouette graphic are visible.
6. Resize browser to tablet and mobile widths: confirm columns stack cleanly, no clipping or horizontal scrolling.
