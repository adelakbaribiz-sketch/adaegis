# Decisions

Format: decision, why, what it rules out for now.

## Frontend-first, mock data, no backend

**Decision:** Build a fully-navigable Next.js frontend against static typed
mock data; build no server, database, or external integration.

**Why:** The source dossier proposed a 12-module backend (NestJS + FastAPI +
embedded n8n + Kafka + ClickHouse + multi-region Kubernetes) before a single
real user or requirement existed. Building that first would mean months of
infrastructure work in service of a product nobody has validated, and a
portfolio/demo audience cannot evaluate a backend they can't see — they can
evaluate a product experience. Maximum credible frontend, minimum backend,
is the higher-value use of the same effort at this stage.

**Rules out (for now):** real login, real data persistence, real
integrations. All are documented as PROPOSED in [ROADMAP.md](ROADMAP.md).

## Why not build the full proposed backend

**Decision:** Reject Kafka, ClickHouse, embedded n8n, and multi-region
Kubernetes as Phase 1 choices even for a real implementation.

**Why:** At the scale a first real customer implies (a handful of
tenants, thousands of keywords, daily-to-hourly polling — not millions of
events/second), a single Postgres instance and a scheduled job runner solve
the same problem with a fraction of the operational surface. Kafka and
ClickHouse solve scale problems this product does not have yet. Embedded n8n
adds a large, opinionated dependency for workflow logic that is simple
enough (trigger → condition → action, 2–4 steps) to run as plain application
code, at least until the workflow catalog itself becomes a product
differentiator worth a dedicated engine.

**Rules out:** none permanently — see [ROADMAP.md](ROADMAP.md) Phase 3 for
when this would become worth revisiting.

## System fonts instead of next/font/google

**Decision:** Use a system font stack instead of loading Inter and
JetBrains Mono via `next/font/google`.

**Why:** `next/font/google` fetches font files at build time; in this build
environment that network call failed and broke `npm run build` outright. A
portfolio project whose build is flaky because of an external font CDN is a
worse outcome than a system font stack, which renders essentially
identically on every OS this audience is likely to view it on and removes a
network dependency from the build entirely.

**Rules out:** custom webfont branding — revisit with self-hosted font files
(`next/font/local`) if a specific typeface becomes part of the brand.

## Read-only workflow pipeline viewer, not a drag-and-drop canvas

**Decision:** Represent each workflow's steps as a static vertical pipeline
(trigger → condition → action) rather than building an n8n-style editable
canvas.

**Why:** A real drag-and-drop graph editor (node positions, edges,
serialization, undo/redo) is a multi-week feature in its own right and does
not change whether the underlying product concept is sound. The pipeline
viewer communicates the same idea — "here is the logic that runs
automatically" — at a fraction of the cost, and is honestly labeled as
view-only rather than presented as a working editor.

**Rules out:** authoring new workflows from the UI. Tracked in
[ROADMAP.md](ROADMAP.md).

## One workspace, no multi-tenant agency mode

**Decision:** Model a single tenant ("Northwind Digital") instead of the
dossier's Agency Admin / multi-client hierarchy.

**Why:** Multi-tenancy is a real architectural concern (row-level security,
tenant-scoped queries, cross-tenant reporting) that only matters once there's
a database to secure. Building the UI for switching between clients with no
backend behind it would be decoration, not demonstration.

**Rules out:** Agency Admin and Client User roles from the original dossier.
Deferred to [ROADMAP.md](ROADMAP.md).
