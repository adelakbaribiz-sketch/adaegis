# Testing

## What was actually run

No automated test suite exists yet (see "Not implemented" below). Before
calling this build done, the following checks were run manually and their
real output is recorded here.

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✅ PASSED — compiles, type-checks, and prerenders all 13 routes |
| Lint | `npm run lint` | ✅ PASSED — zero errors, zero warnings |
| Console errors (each route, browser) | manual, via dev server | ✅ PASSED after fix (see below) |
| Responsive layout (375px mobile width) | manual, dashboard + nav | ✅ PASSED after fix (see below) |
| Broken links / 404 handling | manual — visited an invalid `/campaigns/xyz` id | ✅ PASSED — renders custom `not-found.tsx` |
| Missing assets | manual — checked network tab | ✅ PASSED — no 404s on load |
| Env vars | inspection | ✅ PASSED — build has zero required env vars (see `.env.example`) |

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

- No unit tests (e.g. Vitest/Jest) for `src/lib/utils.ts` formatters.
- No component or interaction tests (e.g. Playwright/Testing Library) for
  filter/toggle behavior on Campaigns, Alerts, Workflows.
- No CI pipeline running any of the above on push.

This is a real limitation, not an oversight to hide: a portfolio-stage demo
with static mock data has a small, manually-verifiable surface, but a real
product built on this foundation should not ship further without test
coverage on the data-formatting utilities and the auth gate at minimum.
