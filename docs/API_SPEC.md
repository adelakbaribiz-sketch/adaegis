# API Specification

## Current state: no API

This demo makes zero network calls to any backend. There are no Next.js
Route Handlers, no REST endpoints, no GraphQL schema. Every page reads
directly from `src/lib/mock-data.ts` at render time. Anything you see in the
UI — campaigns, alerts, workflows — is compiled into the app itself.

## Proposed API surface (not built)

If a real backend were added (see [ROADMAP.md](ROADMAP.md) Phase 1), the
REST surface would likely look like this, matching the entities in
[DATA_MODEL.md](DATA_MODEL.md):

```
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PATCH  /api/campaigns/:id

GET    /api/competitors
GET    /api/competitors/:id

GET    /api/alerts
PATCH  /api/alerts/:id            { read: true }
POST   /api/alerts/read-all

GET    /api/workflows
PATCH  /api/workflows/:id/status  { status: "active" | "paused" }

GET    /api/reports?range=7d|30d|90d

GET    /api/billing/invoices
GET    /api/billing/plan

Webhook receivers (inbound, not built):
POST   /api/webhooks/google-ads
POST   /api/webhooks/stripe
```

Auth: every real endpoint above would require a session (see
[SECURITY.md](SECURITY.md)) and would be scoped to `tenant_id`.

Rate limiting, pagination, and error-response shape are all TODO — no
decisions have been made because no endpoint has been built yet.
