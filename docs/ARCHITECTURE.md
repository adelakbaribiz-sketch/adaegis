# Architecture

## Current implementation (real)

```
Next.js 16 (App Router, React 19, TypeScript)
├─ src/app/                  routes (marketing site, login, authenticated app)
├─ src/components/ui/        design-system primitives (Badge, Button, Card, …)
├─ src/components/shell/     app shell (Sidebar, Topbar)
├─ src/components/charts/    Recharts wrappers (share of voice, spend, activity)
└─ src/lib/
   ├─ mock-data.ts           all product data — typed, static, in-memory
   ├─ auth.ts                client-side demo session gate (localStorage)
   └─ utils.ts                formatting helpers
```

There is **no server, no database, and no external API call** anywhere in
this codebase. Every page is either statically prerendered or rendered from
the static data in `mock-data.ts`. This is a deliberate scope decision — see
[DECISIONS.md](DECISIONS.md) — not an oversight.

Rendering split:
- Marketing page (`/`) and the two dynamic detail routes
  (`/campaigns/[id]`, `/competitors/[id]`, `/workflows/[id]`) are **Server
  Components** reading directly from `mock-data.ts`.
- Interactive list/filter pages (`/campaigns`, `/competitors`, `/alerts`,
  `/reports`, `/settings`, `/workflows`) are **Client Components** using
  local `useState` for filters, toggles, and tab state.
- `(app)/layout.tsx` is a client-side auth gate: it checks a `localStorage`
  flag and redirects to `/login` if absent.

## Styling

Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`). All design
tokens (`--color-canvas`, `--color-amber`, `--color-cyan`, …) are defined in
`src/app/globals.css` under `@theme inline` and used as ordinary Tailwind
utilities (`bg-canvas`, `text-amber`, `border-border`). No component library
(shadcn/MUI/etc.) is used — every primitive in `src/components/ui/` is
hand-built for this project's visual identity, per the "no generic AI
template look" requirement.

## Proposed architecture for a real product (not built)

The original dossier proposed a NestJS + FastAPI + embedded n8n + Kafka +
ClickHouse + multi-region Kubernetes stack. That proposal is preserved here
as a **reference target**, re-scoped to what a first real backend would
actually need — see [ROADMAP.md](ROADMAP.md) for a phased version:

```
Phase 1 (real MVP):
  Next.js (this frontend, evolved)  →  API routes / a single Node service
                                     →  PostgreSQL (campaigns, competitors, users)
                                     →  Google Ads API (OAuth2 + Developer Token)
                                     →  Scheduled job (Auction Insights polling)

Phase 2 (once Phase 1 has real users):
  + Workflow execution engine (queue + workers, not necessarily embedded n8n)
  + SEMrush/SpyFu integration
  + Stripe billing
  + Real auth (NextAuth or equivalent) + RBAC

Phase 3 (only if usage justifies it):
  + ClickHouse/analytics warehouse for reporting at scale
  + Multi-region deployment
  + Multi-tenant agency mode
```

The jump straight to Kafka/ClickHouse/Kubernetes described in the original
dossier is explicitly **not recommended** before Phase 1 has real customers —
see [DECISIONS.md](DECISIONS.md), "Why not build the full proposed backend."

## Data flow (current demo)

```
mock-data.ts (typed constants)
   │
   ├─→ Server Components (read directly, render HTML)
   │
   └─→ Client Components (imported once, held in useState, filtered/toggled
       locally — no persistence; a refresh resets any local edits)
```
