# AdAegis

**Defend your brand. Attack the competition. One Google Ads platform.**

AdAegis is a product concept and interactive frontend demo for a Google Ads
competitive-intelligence and automation platform. It unifies competitor
monitoring, brand-term defense, conquest ("attack") campaigns, and workflow
automation — areas most teams currently manage across four or five
disconnected tools.

> **Status: interactive demo, not a live product.** Every number in this app
> is synthetic sample data. There is no real Google Ads connection, no
> backend, and no real customers. See [docs/LIMITATIONS.md](docs/LIMITATIONS.md)
> for the full, explicit real-vs-mock breakdown before drawing any
> conclusions from what you see here.

## Problem → Solution

Competitive Google Ads strategy today is split across a competitor-intel
tool (SEMrush/SpyFu), a bid/rules tool (Optmyzr/Adalysis), a spreadsheet for
price tracking, and Slack for alerts — with nothing reacting to a
competitor's move in real time. AdAegis proposes one workflow engine that
watches competitors and reacts (or recommends a reaction) automatically. See
[docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) for the full
scope and [docs/DECISIONS.md](docs/DECISIONS.md) for why it's built this way.

## Features (this demo)

| Module | What it shows |
|---|---|
| **Dashboard** | Share-of-voice trend, alert summary, campaign health |
| **Campaigns** | Defense / Attack / Standard campaigns, filterable, with keyword-level detail |
| **Competitors** | Threat-ranked tracking, share-of-voice trend, move history |
| **Workflows** | An automation library with a visual trigger → condition → action pipeline viewer |
| **Alerts** | Severity-ranked alert center with read/unread state |
| **Reports** | Share of voice, spend vs. conversions, defense/attack activity over time |
| **Billing** | Plan comparison, invoice history, seat usage |
| **Settings** | Workspace, team & roles, integrations, API keys |

Every disabled button in the app (New campaign, Export CSV, Connect
integration, Upgrade plan, …) has a tooltip explaining that it needs a real
backend — nothing fakes success.

## Screenshots

Not included as static images in this repository — the fastest way to see
it is to run it locally (zero configuration, no environment variables
required):

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` and sign in at `/login` with:

```
demo@adaegis.io / adaegis-demo
```

(also available via the "Use demo credentials" button on the login screen).
See [docs/DEMO.md](docs/DEMO.md) for a suggested walkthrough.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, reading
from a typed, static mock-data module — no database, no API calls, no
external services. Full breakdown, including the proposed architecture for
a real backend, in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Recharts ·
lucide-react

## Installation

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No environment variables are required to run this build — see
`.env.example` for the variables a real backend integration would need.

## Project structure

```
src/
├─ app/
│  ├─ page.tsx                 marketing landing page
│  ├─ login/                   demo auth screen
│  └─ (app)/                   authenticated app shell + 8 modules
├─ components/
│  ├─ ui/                      design-system primitives
│  ├─ shell/                   sidebar, topbar, mobile nav
│  └─ charts/                  Recharts wrappers
└─ lib/
   ├─ mock-data.ts             all product data (typed, static)
   ├─ auth.ts                  demo session gate
   └─ utils.ts                 formatting helpers
docs/                          full documentation suite (see below)
```

## API

None exists yet. Proposed REST surface for a real backend is documented in
[docs/API_SPEC.md](docs/API_SPEC.md).

## Security

Demo-only auth, no secrets in the repo, no server-side attack surface in the
current build. Full notes, including what a real product would still need,
in [docs/SECURITY.md](docs/SECURITY.md).

## Roadmap

Phased plan from this demo to a real MVP, deliberately scoped smaller than
the original proposal — see [docs/ROADMAP.md](docs/ROADMAP.md) and
[docs/DECISIONS.md](docs/DECISIONS.md) for why.

## Limitations

[docs/LIMITATIONS.md](docs/LIMITATIONS.md) is the single source of truth for
what's real, mocked, proposed, or not implemented in this repository.

## Documentation index

| Doc | Contents |
|---|---|
| [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) | Where this came from, what changed |
| [PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) | Scope, personas, in/out of scope |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Real implementation + proposed backend |
| [USER_FLOWS.md](docs/USER_FLOWS.md) | Every clickable flow in the demo |
| [API_SPEC.md](docs/API_SPEC.md) | Proposed REST surface (not built) |
| [DATA_MODEL.md](docs/DATA_MODEL.md) | Current types + proposed schema |
| [SECURITY.md](docs/SECURITY.md) | What's real, what a real product needs |
| [ROADMAP.md](docs/ROADMAP.md) | Phase 0 → 3 |
| [DECISIONS.md](docs/DECISIONS.md) | Why it's scoped this way |
| [DEMO.md](docs/DEMO.md) | Credentials + walkthrough |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | How to deploy, what's needed for real deploy |
| [TESTING.md](docs/TESTING.md) | What was checked, what was fixed, what's missing |
| [LIMITATIONS.md](docs/LIMITATIONS.md) | Honest real/mock/proposed status |

## Portfolio case study

**What I built:** a fully-navigable SaaS product demo — 9 modules, an
original visual identity, and a documentation suite — from a rough product
dossier that had no code, no design, and no validated requirements.

**Approach:** classify the project honestly (concept-stage SaaS, not a
funded build), gap-analyze the dossier against what a real MVP needs, then
prioritize a credible frontend experience over speculative backend
infrastructure. See [docs/DECISIONS.md](docs/DECISIONS.md) for the specific
trade-offs and why each was made.

**Key features:** competitor threat tracking with move history, a
workflow-pipeline visualization for automation logic, and a reporting suite
— all backed by a realistic, internally-consistent mock dataset rather than
placeholder Lorem Ipsum.

**Challenges:** the biggest one was resisting the urge to build the
dossier's full proposed backend (NestJS + FastAPI + Kafka + ClickHouse +
Kubernetes) before any real requirement justified it — see
[DECISIONS.md](docs/DECISIONS.md) for the reasoning against that.

**Current status:** Demo / interactive prototype. Not production, not
connected to any real service, no real users.

**Limitations:** see [LIMITATIONS.md](docs/LIMITATIONS.md).

**Future roadmap:** see [ROADMAP.md](docs/ROADMAP.md).

## Business & product overview

- **Problem:** Google Ads defense and attack strategy is manual and split
  across disconnected tools.
- **Target customer:** agencies and in-house PPC teams managing roughly
  $10k–$250k/month in Google Ads spend against named competitors
  (hypothesis, not validated).
- **Differentiation:** one workflow engine for both monitoring and
  execution, instead of separate intelligence and automation tools.
- **Monetization:** tiered SaaS subscription by managed spend and seats
  (illustrative pricing shown in the demo, not customer-validated).
- **Current stage:** concept / interactive demo, no revenue, no customers.

## License

MIT — see [LICENSE](LICENSE).
