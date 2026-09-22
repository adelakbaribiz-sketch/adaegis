# Product Requirements

## Problem statement

Teams running Google Ads against named competitors currently split their
workflow across a competitor-intelligence tool (SEMrush/SpyFu), a bid/rules
tool (Optmyzr/Adalysis), a scraper or spreadsheet for competitor pricing, and
Slack for alerts. Nothing reacts to a competitor's move in real time, and
"defense" (protecting brand terms) and "attack" (targeting competitor terms)
are managed as unrelated workstreams.

## Target customer

Digital marketing agencies and in-house PPC teams managing roughly
$10k–$250k/month in Google Ads spend, who can name specific competitors they
compete with for search terms. This is a hypothesis, not a validated segment
— no customer interviews have been conducted.

## In scope for this demo (implemented)

| # | Capability | Where |
|---|---|---|
| 1 | Dashboard: share-of-voice trend, alert summary, campaign health | `/dashboard` |
| 2 | Campaign list + detail with keywords, filtered by Defense/Attack/Standard | `/campaigns` |
| 3 | Competitor tracking: threat level, share-of-voice trend, move history | `/competitors` |
| 4 | Workflow automation library with visual pipeline viewer | `/workflows` |
| 5 | Severity-ranked alert center with read/unread state | `/alerts` |
| 6 | Reporting: share of voice, spend vs. conversions, automation activity | `/reports` |
| 7 | Billing: plan comparison, invoice history, seat usage | `/billing` |
| 8 | Settings: workspace, team & roles, integrations, API keys | `/settings` |
| 9 | Marketing/landing page with problem, solution, and business overview | `/` |
| 10 | Demo authentication gate | `/login` |

## Explicitly out of scope for this demo

- Live Google Ads / Microsoft Ads / Meta integration
- Live competitor scraping or SEMrush/SpyFu data
- Real billing (Stripe) or payment collection
- Drag-and-drop workflow authoring (the builder is view-only)
- Multi-tenant agency mode (only one workspace, "Northwind Digital," exists)
- Real-time notifications (Slack/Telegram/email)

See [LIMITATIONS.md](LIMITATIONS.md) for the full real-vs-mock breakdown.

## User roles modeled in the UI

The dossier proposed 10 roles. This demo models the 6 most load-bearing ones
in the Team & Roles table (`/settings`) and reserves the rest as a documented
`Role` union in `src/lib/mock-data.ts` for future RBAC work:

- **Owner** — billing and workspace lifecycle
- **Admin** — not yet distinct from Owner in this demo
- **Marketing Manager** — reviews alerts, approves automations (current demo user)
- **PPC Specialist** — executes bid/keyword changes
- **Analyst** — reporting access
- **Viewer** — read-only

Agency Admin, Client User, API Client, and Billing-only roles from the
original dossier are deferred — see [ROADMAP.md](ROADMAP.md).

## Success criteria for a future real MVP

Not measured in this demo (no real usage exists), but the metric a real
pilot should track: reduction in time-to-reaction after a competitor bids on
a brand term, and share-of-voice recovery time. Both require a live Google
Ads connection to measure.
