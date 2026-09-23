# Upgrade Report

Scope: a quality/architecture/UX/3D upgrade pass over the AdAegis demo built
in the previous session. This was **not** a rewrite — see
[DECISIONS.md](DECISIONS.md) and the principle below.

**Principle applied:** improve what's real, don't invent work for what
isn't. This app has no backend, database, or AI integration by design (see
[LIMITATIONS.md](LIMITATIONS.md)) — this pass does not fabricate any of
those to check a box. Where a requested dimension has nothing to improve,
that's stated below instead of padded.

## Improvement matrix

| Area | Before | Problem | Priority | Action taken |
|---|---|---|---|---|
| Code quality | 9 files each redeclared their own Badge-tone map (Defense/Attack/status/severity/threat colors) | Real duplication — a color's meaning could drift file to file | P1 | Consolidated into `src/lib/tone.ts`; 9 files now import shared maps |
| Design system | Colors tokenized, but shadows/elevation/motion/focus were not | No consistent way to signal "this matters more" | P1 | Added an elevation system (`surface-raised/-elevated/-floating`, `.depth-interactive`) + a global focus-visible ring + `prefers-reduced-motion` handling to `globals.css` |
| UI / 3D | Flat cards everywhere | Requested "premium spatial" direction; flat-everywhere also under-communicates hierarchy | P1 | Applied depth **semantically** to 3 places only (dashboard KPIs, competitor threat cards, workflow pipeline hero) — tables/forms/settings stay flat and fast, by design (see DECISIONS.md) |
| Copywriting | Landing page used a tracked-out all-caps eyebrow label ("THE PROBLEM") above a heading | Flagged by the `frontend-design` skill as a common generative-AI tell | P3 | Rewritten as a single editorial paragraph, no eyebrow label |
| Performance | Recharts (~350KB, measured) statically imported into `/dashboard` and `/reports` | Heaviest dependency in the app, shipped eagerly on 2 routes | P1 | Lazy-loaded via `next/dynamic` with skeleton fallbacks; verified with `du -sh .next/static/chunks` before/after |
| Accessibility | Icon-only buttons (copy API key, workflow pause/play) had only a `title` tooltip; no visible focus ring on a dark theme | `title` isn't reliably exposed to screen readers; default focus outline is low-contrast on this palette | P2 | Added `aria-label`s; added a global `:focus-visible` ring in the brand's amber |
| Testing | Zero automated tests | No regression protection for the two real bugs fixed last pass | P1 | Added Vitest; 7 tests covering `utils.ts` formatters (incl. a regression test for the double-`%` bug) and `auth.ts`'s SSR-safety (regression test for the hydration bug) |
| DevOps | No CI | Nothing ran lint/build/test automatically | P1 | Added `.github/workflows/ci.yml` (install → lint → test → build on every push/PR to `main`) |
| Backend / Database / AI | None exist | N/A — see below | — | **Not touched.** Building any of these now would mean inventing requirements nobody has validated; see `docs/DECISIONS.md`, "Frontend-first, mock data, no backend" |
| Security | Already documented as demo-only auth, no secrets | Re-reviewed; nothing changed | — | No new findings. Same posture as `docs/SECURITY.md` |

## Files changed

- `src/lib/tone.ts` — new, shared tone maps
- `src/app/globals.css` — elevation tokens, focus ring, reduced-motion handling
- `src/components/ui/stat-tile.tsx`, `src/app/(app)/competitors/page.tsx`, `src/app/(app)/workflows/[id]/page.tsx`, `src/components/shell/topbar.tsx` — depth applied semantically
- `src/app/(app)/dashboard/page.tsx`, `src/app/(app)/reports/page.tsx`, `src/components/charts/chart-skeleton.tsx` — lazy chart loading
- `src/app/page.tsx` — landing-page copy edit
- `src/app/(app)/settings/page.tsx`, `src/app/(app)/workflows/page.tsx` — accessibility labels
- `src/lib/utils.test.ts`, `src/lib/auth.test.ts`, `vitest.config.ts` — new test suite
- `.github/workflows/ci.yml` — new CI pipeline
- 9 route files in `src/app/(app)/**` — updated imports for the `tone.ts` consolidation only (no behavior change)

## Tests

`npm run build` ✅ · `npm run lint` ✅ (0 errors/warnings) · `npm run test` ✅ (7/7)

Visual QA for the depth/hover changes was done by build verification and
code review, not a live browser pass, because this environment's
concurrent-dev-server limit was occupied by other sessions at the time —
see `docs/TESTING.md` for the honest note. It should be spot-checked in a
browser before treating the 3D pass as fully verified.

## Security

No new findings; no code touched a security-relevant surface (auth, data
handling, secrets). Posture is unchanged from `docs/SECURITY.md`.

## Performance

Recharts (~350KB) is no longer in the initial bundle for `/dashboard` and
`/reports`; both now show a skeleton and fetch the chart chunk separately.
No other dependency in this app is large enough to warrant the same
treatment (see `docs/DECISIONS.md`).

## UI/UX

Duplicate color-mapping logic removed (single source of truth in
`tone.ts`). Depth/elevation now signals importance in 3 specific places
instead of being either absent everywhere or applied indiscriminately.
Landing-page copy de-genericized per the `frontend-design` skill's guidance.

## 3D

Implemented as CSS-only (transform + layered box-shadow), not WebGL/Three.js
— no element in this app needs true 3D, and a GPU-heavy approach would
contradict the "professional first, 3D second" and performance-aware
directives in the brief. Semantic placement only: dashboard KPI tiles,
competitor threat cards, the workflow pipeline viewer. `prefers-reduced-motion`
disables the hover-lift transform.

## Remaining issues

- No component/interaction test coverage (Playwright/RTL) — flagged, not
  silently skipped.
- Depth/hover changes not re-verified in a live browser this pass (dev
  server slot limit — see above).
- No accessibility audit tool (axe/Lighthouse) run; a11y additions were
  manual and should be spot-checked.
- Backend, database, and AI dimensions remain entirely unbuilt by design —
  see `docs/ROADMAP.md` for the phased plan.

## Git commits (this pass)

See `git log` — each improvement area above landed as its own commit
(tone consolidation, design tokens + depth, chart lazy-loading, a11y +
copy, tests, CI, docs), not one combined diff.

## Final status

**READY FOR NEXT PASS.** The demo is measurably cleaner (no duplicated
tone logic), faster on its two heaviest routes, more accessible, has
its first regression tests and its first CI pipeline, and has a
semantically-restrained depth system instead of no depth system at all.
Backend/DB/AI remain intentionally out of scope — that is a scoping
decision stated up front, not an incomplete task.
