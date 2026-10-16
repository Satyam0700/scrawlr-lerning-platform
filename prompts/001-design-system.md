# Prompt 001 — Vertex Design System

## Goal

Implement the Vertex design system as Tailwind CSS v4 tokens and utility classes in `app/globals.css`, update the root layout to use the correct fonts (Playfair Display + Inter), and verify the build passes.

## Reference

`design/vertex-designsystem.png` — the single source of truth for every value below.

## Skills read

- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` for `next/font/google` usage (Next.js 16).

## Code inspected

- `app/globals.css` — default Next.js starter with Geist fonts and dark mode media query. Will be replaced.
- `app/layout.tsx` — uses `Geist` and `Geist_Mono` from `next/font/google`, applies CSS variables.
- `app/page.tsx` — default starter page, left unchanged for now.
- `package.json` — Tailwind v4 with `@tailwindcss/turbopack`, Next.js 16.4.2, React 19.
- `next.config.ts` — turbopack CSS rule for `@tailwindcss/turbopack`.

## Decisions

- Use Tailwind v4's `@theme inline` block for all design tokens (colors, spacing, radii, shadows, fonts, font-size/line-height).
- Remove the dark mode media query — the design system is light-only. We can add dark mode later.
- Import Playfair Display and Inter via `next/font/google` as variable fonts and expose them through CSS variables `--font-display` and `--font-sans`.
- No component-level files yet — this prompt lays the foundation tokens only.

## Files to touch

| File | Action |
|---|---|
| `app/globals.css` | **Rewrite** — full design-system tokens |
| `app/layout.tsx` | **Edit** — swap Geist fonts for Playfair Display + Inter |

## Requirements

### 01 Colors (from the design image)

**Primary palette**
| Token | Hex |
|---|---|
| `--color-primary-500` | `#F97316` |
| `--color-primary-400` | `#FB923C` |
| `--color-primary-300` | `#FDBA74` |
| `--color-primary-200` | `#FED7AA` |
| `--color-primary-100` | `#FFEEE5` |

**Neutral palette**
| Token | Hex |
|---|---|
| `--color-neutral-900` | `#0F172A` |
| `--color-neutral-700` | `#334155` |
| `--color-neutral-500` | `#64748B` |
| `--color-neutral-300` | `#CBD5E1` |
| `--color-neutral-200` | `#E2E8F0` |
| `--color-neutral-100` | `#F1F5F9` |
| `--color-neutral-50`  | `#FAFAFC` |
| `--color-white`       | `#FFFFFF` |

### 02 Typography

- **Display font**: Playfair Display — variable font via `next/font/google`
- **Body font**: Inter — variable font via `next/font/google`
- Both exposed as CSS variables and registered in `@theme inline`

### 03 Type scale

| Token | Font | Size / Line-height | Weight | Use |
|---|---|---|---|---|
| `display-1` | Playfair Display | 48px / 56px | Bold | Page titles |
| `display-2` | Playfair Display | 36px / 44px | Bold | Section titles |
| `heading-1` | Inter | 28px / 36px | Semi Bold (600) | Card titles |
| `heading-2` | Inter | 22px / 30px | Semi Bold (600) | Sub section |
| `heading-3` | Inter | 18px / 26px | Medium (500) | Small titles |
| `body-lg` | Inter | 16px / 24px | Regular (400) | Body copy |
| `body` | Inter | 14px / 20px | Regular (400) | Supporting text |
| `small` | Inter | 12px / 16px | Regular (400) | Captions, meta |

### 04 Spacing system

Base unit: 4px (0.25rem). Tokens at 4, 8, 12, 16, 24, 32, 40, 48, 64.

### 05 Radius & Shadows

**Radii**
| Token | Value |
|---|---|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 24px |
| `full` | 9999px |

**Shadows** (using `rgba(15, 23, 42, alpha)`)
| Token | Value |
|---|---|
| `sm` | `0 1px 2px 0 rgba(15, 23, 42, 0.05)` |
| `md` | `0 4px 12px -2px rgba(15, 23, 42, 0.08)` |
| `lg` | `0 12px 24px -4px rgba(15, 23, 42, 0.10)` |
| `xl` | `0 20px 40px -8px rgba(15, 23, 42, 0.12)` |

### 06 Icons

Specs: 24x24px grid, 2px stroke width (outline), rounded line caps, consistent optical balance. No icon library installed in this prompt — these are specs for when we add one.

### 07 Buttons (utility classes)

Define these as component classes via `@layer components`:

- **Primary**: bg primary-500, white text, 44px height, rounded-md (12px), px-4, Inter Medium 14-16px. Hover: darken. Disabled: primary-200 text with no bg, pointer-events-none.
- **Secondary**: border primary-500, text primary-500, transparent bg, same dimensions. Hover: primary-50 bg. Disabled: faded border+text.
- **Tertiary**: transparent bg, neutral-700 text, underline or icon. Hover: neutral-900. Disabled: neutral-300 text.
- **Text**: no bg, primary-500 text with optional icon. Hover: primary-600. Disabled: faded.

### 08 Inputs (utility classes)

- Height 44px, rounded-md (12px), border 1px neutral-200, padding 0 16px.
- Focus: border primary-400 (`#FB923C`), outline ring.

### 09 Badges / Tags

- Video badge: primary-500 border, primary-500 text, small uppercase.
- Lesson badge: green-ish border + text (use a semantic green, e.g. `#16A34A`).
- Popular badge: primary-500 bg, white text, small uppercase.

### 10 Status indicators

- In Progress: neutral-500 half-circle icon
- Completed: green checkmark
- Now Playing: primary-500 filled circle
- Locked: neutral-300 lock icon

### 11 Progress bar

- Track: neutral-200 bg, rounded-full, 6px height
- Fill: primary-500 bg, rounded-full

### 12 Cards

Utility base class: white bg, rounded-lg (16px), shadow-sm, border neutral-200, overflow-hidden.

### 13 Navigation

Utility base class for nav: flex items-center, specific link styles (neutral-700 default, primary-500 active).

## Security considerations

None — this prompt is CSS tokens and font setup only.

## Acceptance criteria

1. `app/globals.css` contains all design-system tokens inside `@theme inline` and utility/component classes in `@layer`.
2. `app/layout.tsx` imports Playfair Display and Inter, exposes them as CSS variables, applies Inter as the default body font.
3. `npx next build` succeeds with no type errors.
4. `npm run lint` passes.
5. No dark mode media query — light mode only for now.
6. No Geist font references remain.

## Checks

```bash
# From the web workspace root
npx next build
npm run lint
```

## Manual test steps

1. Run `npm run dev`.
2. Open `http://localhost:3000` in the browser.
3. Inspect the `<html>` element — confirm it has the Inter and Playfair Display font classes.
4. Inspect computed styles — confirm `font-family` resolves to Inter.
5. Open DevTools > Elements > Styles — search for `--color-primary-500` and confirm it is `#F97316`.
