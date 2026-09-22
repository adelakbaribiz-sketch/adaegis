# Changelog

## 0.1.0 — Initial demo

- Scaffolded Next.js 16 (App Router, React 19, TypeScript, Tailwind v4).
- Built original visual identity ("tactical intelligence": dark canvas,
  amber/cyan accents, mono for data) and hand-built UI primitives
  (Badge, Button, Card, StatTile, EmptyState, Sparkline, PageHeader).
- Implemented 9 product modules on typed mock data: Dashboard, Campaigns
  (+ detail), Competitors (+ detail), Workflows (+ pipeline detail), Alerts,
  Reports, Billing, Settings, and a marketing landing page.
- Added a demo-only client-side auth gate.
- Added empty, loading, and error states; a mobile navigation drawer.
- Fixed a hydration mismatch in the auth gate, a mobile-nav gap, a
  double-`%` formatting bug, and a non-compiling dynamic Tailwind class
  (see [docs/TESTING.md](docs/TESTING.md) for details).
- Wrote the full documentation suite in `docs/`, including an explicit
  real-vs-mock breakdown in [docs/LIMITATIONS.md](docs/LIMITATIONS.md).
