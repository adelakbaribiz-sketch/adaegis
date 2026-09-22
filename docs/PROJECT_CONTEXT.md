# Project Context

## What this is

AdAegis is a product concept and interactive frontend demo for a Google Ads
competitive-intelligence and automation platform. It grew out of a technical
dossier (see "Origin" below) that captured an idea, a feature wishlist, and a
proposed architecture, but contained no code, no design, and no validated
decisions.

This repository turns that dossier into something concrete: a working,
navigable product experience built on realistic mock data, plus documentation
that is honest about what is real, what is simulated, and what is still
undecided.

## Origin

The idea started from a practical question: how do advertisers defend their
brand terms and attack competitors' terms in Google Ads without stitching
together five different tools? A prior planning pass expanded that into a
full "Technical Project Dossier" — personas, a 12-module architecture, an
18-feature backlog, a 6-month roadmap — all proposed, none confirmed by a
real user, none built.

## What changed in this pass

Rather than implementing the dossier's full proposed architecture (NestJS +
FastAPI + embedded n8n + Kafka + ClickHouse + multi-region Kubernetes) against
zero real requirements, this pass:

1. Classified the project as **Hybrid: SaaS product concept + portfolio
   demo**, not a funded engineering effort with real infrastructure needs yet.
2. Prioritized a credible, fully-navigable **frontend** over a speculative
   backend — see [DECISIONS.md](DECISIONS.md) for why.
3. Built one cohesive **visual identity** ("tactical intelligence" — dark,
   amber/cyan, data-dense) instead of a generic SaaS template.
4. Replaced unconfirmed backend claims with clearly labeled **mock data**
   (`src/lib/mock-data.ts`) and documented exactly what a real implementation
   would still need.

## Who this is for

- **Portfolio reviewers** — see [PORTFOLIO](../README.md#portfolio-case-study)
  section of the README.
- **A future engineering team** picking this up — start with
  [ARCHITECTURE.md](ARCHITECTURE.md), [DATA_MODEL.md](DATA_MODEL.md), and
  [ROADMAP.md](ROADMAP.md).
- **A prospective customer or investor** — start with the landing page
  (`/`) and [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md).

## Non-goals of this pass

- No real Google Ads, SEMrush, SpyFu, or Stripe integration.
- No authentication system beyond a demo gate (see [SECURITY.md](SECURITY.md)).
- No drag-and-drop workflow canvas (n8n-style editing) — the workflow builder
  is a read-only visual representation of pipelines; see
  [LIMITATIONS.md](LIMITATIONS.md).
- No claims of real customers, revenue, or usage data.
