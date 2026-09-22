# Data Model

## Current implementation

All types below are defined and implemented in `src/lib/mock-data.ts`. This
is the actual, working data model for the demo — not a proposal.

| Entity | Key fields | Notes |
|---|---|---|
| `TeamMember` | id, name, email, role, initials, accent, lastActive | 6 seeded members |
| `Competitor` | id, name, domain, threatLevel, shareOfVoice(+Delta), overlapKeywords, trend[], lastMove, moveHistory[], sampleOverlapKeywords[] | 5 seeded competitors |
| `Campaign` | id, name, mode (Defense/Attack/Standard), status, dailyBudget, spend30d, clicks30d, impressions30d, ctr, avgCpc, conversions30d, keywords[] | 6 seeded campaigns |
| `AlertItem` | id, severity, category, title, description, relatedCampaign/Competitor, createdAt, read | 6 seeded alerts |
| `Workflow` | id, name, description, category, status, runsLast30d, lastRun, successRate, steps[] | 5 seeded workflows |
| `WorkflowStep` | id, kind (trigger/condition/action), label, detail | 2–4 steps per workflow |
| `Invoice` | id, date, amount, status, plan | 4 seeded invoices |
| `ReportPoint` | date, shareOfVoice, spend, conversions, defenseActions, attackActions | 10 time-series points |

There is no database. Data lives in memory as TypeScript constants, imported
directly by Server Components and copied into `useState` by Client
Components that need local interactivity (toggles, filters).

## Proposed schema for a real backend (not built)

If this became a real product, the entities above would map roughly to
PostgreSQL tables, with these additions the demo doesn't need:

```
tenants (id, name, plan, region, created_at)
users (id, tenant_id, email, role, password_hash, mfa_enabled)
campaigns (id, tenant_id, google_ads_campaign_id, mode, status, …)
keywords (id, campaign_id, text, match_type, bid, quality_score)
competitors (id, tenant_id, name, domain, threat_level)
competitor_snapshots (id, competitor_id, share_of_voice, captured_at)  -- time series
alerts (id, tenant_id, severity, category, payload, read, created_at)
workflows (id, tenant_id, name, category, status, definition_json)
workflow_runs (id, workflow_id, started_at, finished_at, success)
invoices (id, tenant_id, stripe_invoice_id, amount, status, period)
audit_log (id, tenant_id, user_id, action, target, created_at)
```

Row-level tenancy (`tenant_id` on every table + Postgres RLS) is assumed for
any real multi-tenant version — this is a TODO, not implemented.

## Explicit TODOs before real implementation

- Foreign key and index design
- Migration tool choice (Prisma/Drizzle/raw SQL) — not decided
- Retention policy for `competitor_snapshots` (this is the table most likely
  to grow unbounded)
- Decide whether `workflow_runs` needs to be queryable at Kafka-scale or if
  Postgres is sufficient at expected volume (almost certainly the latter for
  an MVP — see [DECISIONS.md](DECISIONS.md))
