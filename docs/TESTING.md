# Testing

## What was actually run

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✅ PASSED — compiles, type-checks, and prerenders all 13 routes |
| Lint | `npm run lint` | ✅ PASSED — zero errors, zero warnings |
| Unit tests | `npm run test` | ✅ PASSED — 7/7 (Vitest — see "Unit tests" below) |
| Console errors (each route, browser) | manual, via dev server | ✅ PASSED after fix (see below) |
| Responsive layout (375px mobile width) | manual, dashboard + nav | ✅ PASSED after fix (see below) |
| Broken links / 404 handling | manual — visited an invalid `/campaigns/xyz` id | ✅ PASSED — renders custom `not-found.tsx` |
| Missing assets | manual — checked network tab | ✅ PASSED — no 404s on load |
| Env vars | inspection | ✅ PASSED — build has zero required env vars (see `.env.example`) |
| Bundle size evidence | `du -sh .next/static/chunks/*.js` | Recharts is a ~350KB chunk; now lazy-loaded (see [DECISIONS.md](DECISIONS.md)) |

## Unit tests (added in the upgrade pass)

`npm run test` runs Vitest against `src/lib/*.test.ts`:

- **`utils.test.ts`** — `formatCurrency`, `formatCompactNumber`,
  `formatPercent` (specifically checks for the double-`%` regression fixed
  below), and `timeAgo`.
- **`auth.test.ts`** — a direct regression test for the hydration bug fixed
  below: it runs in Vitest's default `node` environment (no `window`
  global, the same as a Next.js Server Component render) and asserts
  `isSignedIn()` returns `false` rather than throwing.

Not yet covered: component/interaction tests (Playwright/Testing Library)
for filter/toggle behavior on Campaigns, Alerts, Workflows — see "Not
implemented" below.

## Visual QA note for this upgrade pass

The design-system/depth changes (elevation tokens, hover-lift on StatTile
and competitor cards, mobile-nav styling) were verified by build output and
code review, not by re-driving the app in a live browser — this
environment's dev-server slot limit was occupied by other concurrent
sessions at the time. The base app's interaction flows (login, nav,
filters, hydration) were verified live in the prior pass — see the entries
below.

## Issues found and fixed during this pass

1. **Hydration mismatch on every authenticated route.** The auth gate in
   `src/app/(app)/layout.tsx` originally read `localStorage` inside a
   `useState` lazy initializer, which runs during the client's first render
   but not during server rendering — the server always saw "signed out"
   while the client's first paint could see "signed in," so React's
   hydration check failed. **Fixed** by starting both server and client
   renders from the same `false` state and flipping it in a `useEffect`
   after mount, which is the correct place to read a browser-only API.
2. **No mobile navigation.** The sidebar was `hidden` below the `md`
   breakpoint with no replacement, meaning phone-width users landed on
   `/dashboard` with no way to reach any other page. **Fixed** by adding a
   hamburger-triggered nav drawer in the top bar (`src/components/shell/topbar.tsx`),
   sharing the same nav item list as the desktop sidebar
   (`src/components/shell/nav-items.ts`).
3. **Double `%` in campaign CTR column.** `formatPercent()` already appends
   `%`; the campaigns table appended a second one. **Fixed.**
4. **Dynamic Tailwind class names that would not compile in production.**
   `` `bg-${accent}/15 text-${accent}` `` on the Settings → Team page is not
   statically analyzable by Tailwind's v4 scanner and would have silently
   rendered unstyled avatars in a production build (this doesn't show up in
   `next build` because Tailwind still emits *some* classes it can partially
   match, but the color would be wrong). **Fixed** with a static
   `Record<Accent, string>` lookup, the same pattern already used in
   `badge.tsx` and `button.tsx`.
5. **`next/font/google` build failure in this offline/sandboxed
   environment** — `npm run build` failed outright because it couldn't
   reach `fonts.googleapis.com`. **Fixed** by switching to a system font
   stack (`-apple-system, "Segoe UI", …` / `ui-monospace, "JetBrains Mono", …`),
   which also removes a network dependency from the build entirely — see
   [DECISIONS.md](DECISIONS.md).

## Not implemented (real gap, not a false claim)

- No component or interaction tests (e.g. Playwright/Testing Library) for
  filter/toggle behavior on Campaigns, Alerts, Workflows.
- No live-browser visual QA pass for the depth/elevation changes in this
  upgrade (see note above).
- No accessibility audit tooling (axe/Lighthouse) run — focus-visible
  styling and `prefers-reduced-motion` handling were added and reviewed by
  hand, not machine-verified.

## CI

`.github/workflows/ci.yml` runs `npm ci`, lint, test, and build on every
push and pull request to `main`. This did not exist before this upgrade
pass — there was no CI at all.
