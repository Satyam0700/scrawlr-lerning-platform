# Prompt 003 — Set up Clerk Authentication

## Goal

Integrate Clerk authentication into the Vertex learning platform web application using the dashboard-selected application `app_3KllC9HL0Kd8qO1OkwJGijL07Dt`, configure `@clerk/nextjs`, establish request proxy/middleware, add `<ClerkProvider>` to the root layout, and update the top navigation header with live authentication controls (`<Show when="signed-out">` and `<Show when="signed-in">` with `<UserButton />`).

## Reference

- User instructions: Set up Clerk with dashboard-selected app `app_3KllC9HL0Kd8qO1OkwJGijL07Dt`
- Next.js 16 proxy convention: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
- Header design: `app/components/Header.tsx` and `design/vertex-home.png`

## Skills read

- `AGENTS.md` (Authentication constraints, Clerk rules, secret key protection)
- `.agents/skills/clerk/SKILL.md` (Clerk skill router and version detection)
- `.agents/skills/clerk-nextjs-patterns/SKILL.md` (Next.js server vs client patterns, `<Show>`, `<UserButton>`, `clerkMiddleware`)
- `.agents/skills/clerk-nextjs-patterns/references/middleware-strategies.md` (`proxy.ts` structure and matcher)

## Code inspected

- `package.json`: Next.js 16.4.2, React 19.3.0. No existing auth packages.
- `app/layout.tsx`: RootLayout defines fonts and basic page structure. Needs `<ClerkProvider>` inside `<body>`.
- `app/components/Header.tsx`: Right side currently has a static avatar `<img>` placeholder that needs to be replaced with Clerk auth controls matching the design.
- Project root: No existing `middleware.ts` or `proxy.ts`. Next.js 16 introduces `proxy.ts` for request interception.

## Decisions and Assumptions

1. **Application Selection**:
   - The user has dashboard-selected `app_3KllC9HL0Kd8qO1OkwJGijL07Dt`.
   - Use `npx -y clerk@latest init --app app_3KllC9HL0Kd8qO1OkwJGijL07Dt` to install and link the application.
   - If authentication is required for the CLI to link the app, guide the user or pull environment keys.
2. **Next.js 16 Middleware / Proxy**:
   - Next.js 16 uses `proxy.ts` (Next.js <=15 used `middleware.ts`).
   - If `clerk init` creates `middleware.ts`, verify or alias/rename to `proxy.ts` so Next.js 16 handles requests cleanly without warnings or build errors.
   - Use standard bare `clerkMiddleware()` with matcher excluding static assets and including API/trpc routes.
3. **Provider Placement**:
   - For current Next.js SDKs, `<ClerkProvider>` is placed inside `<body>` wrapping `{children}` in `app/layout.tsx`.
4. **Header Auth Controls**:
   - Replace the static placeholder avatar in `Header.tsx` with:
     - When signed out (`<Show when="signed-out">`): A sleek "Sign in" button styled to match the Vertex design system (`btn` / subtle border button).
     - When signed in (`<Show when="signed-in">`): Clerk's `<UserButton />` with custom avatar appearance matching the 36x36 circular profile icon in the design.
5. **Security & Secrets**:
   - Never print or commit `CLERK_SECRET_KEY`.
   - Keep browsing public by default, per `AGENTS.md` section 7.

## Files to touch

| File | Action | Purpose |
|---|---|---|
| `package.json` | Edit | Add `@clerk/nextjs` dependency |
| `app/layout.tsx` | Edit | Wrap application with `<ClerkProvider>` inside `<body>` |
| `proxy.ts` | Create | Configure Clerk middleware for Next.js 16 request handling |
| `app/components/Header.tsx` | Edit | Replace static avatar with dynamic `<Show>` auth controls |
| `.env.local` / `.env` | Auto / CLI | Store development keys for `app_3KllC9HL0Kd8qO1OkwJGijL07Dt` |

## Requirements

### 1. Clerk SDK Installation & Linking
- Run Clerk CLI init targeting app `app_3KllC9HL0Kd8qO1OkwJGijL07Dt`.
- Ensure `@clerk/nextjs` is installed and environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) are present in `.env.local`.

### 2. Root Provider
- In `app/layout.tsx`, import `ClerkProvider` from `@clerk/nextjs`.
- Wrap `{children}` inside `<body>` with `<ClerkProvider>`.

### 3. Proxy / Middleware
- Create `proxy.ts` exporting `clerkMiddleware()` from `@clerk/nextjs/server`.
- Set configuration matcher to:
  ```typescript
  export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  };
  ```

### 4. Interactive Auth Controls in Header
- In `app/components/Header.tsx`, import `{ SignInButton, SignUpButton, Show, UserButton }` from `@clerk/nextjs`.
- Replace static avatar with:
  - `<Show when="signed-out">`: Render a stylish Sign In button (`SignInButton` with mode="modal" or direct redirect) fitting the header height and aesthetics.
  - `<Show when="signed-in">`: Render `<UserButton />` with `userButtonAvatarBox` size matching the 36px circular avatar.

### 5. Verification & Doctor
- Run `npx -y clerk@latest doctor`.
- Run `npm run lint` and `npm run build` (or Next.js type check) to ensure zero errors.

## Acceptance Criteria

- [ ] `@clerk/nextjs` installed and configured in `package.json`.
- [ ] Application `app_3KllC9HL0Kd8qO1OkwJGijL07Dt` linked with valid publishable and secret keys.
- [ ] `proxy.ts` intercepting requests with `clerkMiddleware()`.
- [ ] `<ClerkProvider>` wraps app content in `app/layout.tsx`.
- [ ] `app/components/Header.tsx` dynamically shows Sign In when logged out and `UserButton` when logged in.
- [ ] Build and lint checks pass cleanly without regressions.

## Manual Test Steps

1. Start the development server (`npm run dev`).
2. Navigate to `http://localhost:3000`.
3. Verify that when not authenticated, the "Sign in" button is visible in the header.
4. Click "Sign in" and complete sign in / test authentication modal.
5. Confirm that upon authentication, the user avatar (`UserButton`) is rendered in place of the sign-in button.
6. Click the `UserButton` to open the profile dropdown and verify session details.
