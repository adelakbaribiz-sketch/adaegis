# Limitations — Honest Status

This is the single source of truth for what is real vs. simulated in this
repository. If another document appears to contradict this one, this one
wins.

## REAL

- The Next.js application: routing, layouts, components, styling, and
  interactivity (filters, tabs, toggles, sort) all genuinely work as coded.
- The build: `npm run build` and `npm run lint` both pass with zero errors
  (verified — see [TESTING.md](TESTING.md) for the actual output).
- The visual design system (colors, typography, spacing, components) is
  original to this project, not copied from a template.

## MOCKED / SIMULATED (clearly synthetic, shown as real-looking data)

- Every campaign, competitor, alert, workflow, invoice, and report number in
  the app (`src/lib/mock-data.ts`). None of it describes a real business,
  real ad spend, or a real competitor's actual behavior.
- The "API key" on the Settings page is a static display string.
- Workflow "runs," "success rate," and "last run" timestamps are invented
  for narrative plausibility, not measured executions.

## PROPOSED (documented, not implemented)

- Real Google Ads / Microsoft Ads / SEMrush / SpyFu / Stripe integrations
- A real backend, database, and authentication system
- Multi-tenant agency mode, RBAC enforcement, audit logging
- Drag-and-drop workflow authoring (only a read-only pipeline viewer exists)
- Onboarding flow, notification delivery (Slack/Telegram/email)
- GDPR/SOC2/ISO 27001 compliance work

## NOT IMPLEMENTED

- Automated tests (unit/integration/e2e) — see [TESTING.md](TESTING.md) for
  what was checked instead and why this is a gap.
- CI/CD pipeline
- Any deployment (this app has not been deployed to a public URL as part of
  this work)

## Business claims

No real customers, no revenue, no investor commitments, and no usage
metrics exist for this project. Any business framing in the README or
landing page (target customer, differentiation, monetization) is a stated
hypothesis for a concept-stage project, not a validated result.
