# Roadmap

Status key: ✅ done in this demo · 🔜 next · 🧊 deferred until there's a reason

## Phase 0 — Demo (this repository)

- ✅ Frontend product experience across 9 modules, on mock data
- ✅ Original visual identity, responsive layout, empty/loading/error states
- ✅ Documentation suite with an honest real-vs-mock breakdown

## Phase 1 — Real MVP (not started)

- 🔜 Real auth (NextAuth or equivalent), replacing the localStorage demo gate
- 🔜 PostgreSQL schema per [DATA_MODEL.md](DATA_MODEL.md)
- 🔜 Google Ads API integration: OAuth2 connect flow, campaign/keyword sync,
  Auction Insights polling (this is the one integration validated as
  necessary from day one — everything else can wait for a paying customer
  to ask for it)
- 🔜 One real workflow end-to-end: "Brand Hijack Auto-Response" wired to a
  live Google Ads account, since it's the clearest defense use case
- 🔜 Replace the pipeline *viewer* with the same steps running for real
  (still not a visual editor — see [DECISIONS.md](DECISIONS.md))

## Phase 2 — Once Phase 1 has real users

- 🧊 SEMrush/SpyFu competitor intelligence integration
- 🧊 Stripe billing, replacing the static plan/invoice display
- 🧊 Slack/email alert delivery, replacing the in-app-only alert center
- 🧊 RBAC enforcement matching the roles in
  [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md)
- 🧊 Drag-and-drop workflow authoring canvas

## Phase 3 — Only if usage justifies it

- 🧊 Multi-tenant agency mode (Agency Admin, Client User roles)
- 🧊 Multi-region deployment, data residency selection
- 🧊 Analytics warehouse (ClickHouse or equivalent) if Postgres reporting
  queries actually become a bottleneck — not assumed in advance
- 🧊 SOC2/ISO 27001 compliance work, if enterprise customers require it

## Explicitly not planned

- Kafka/RabbitMQ event streaming — no phase above generates event volume
  that justifies it; revisit only if a specific bottleneck is measured.
