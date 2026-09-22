# Deployment

## Current status: not deployed

This app has not been deployed anywhere as part of this work. No production
URL exists.

## How it could be deployed today (static demo, no backend needed)

Because this build has zero server-side dependencies (no database, no env
vars actually read at runtime), it can be deployed as-is to any Next.js
host:

```bash
npm run build
npm run start   # or deploy the .next output to Vercel/Netlify/etc.
```

**Vercel** (simplest path, zero config needed): connect the repository and
deploy — no environment variables are required for the current build.

## What deployment would need once a real backend exists

Per the proposed architecture in [ARCHITECTURE.md](ARCHITECTURE.md) Phase 1:

- A Postgres instance (managed — e.g. RDS, Supabase, Neon)
- The environment variables listed in `.env.example`
- A scheduled job runner for Auction Insights polling (a cron-triggered
  serverless function is sufficient at MVP scale — no Kafka/queue needed
  yet, see [DECISIONS.md](DECISIONS.md))
- HTTPS enforced at the edge (default on Vercel/most managed hosts)

Multi-region deployment, Kubernetes, and CDN strategy from the original
dossier are deferred until there's real traffic to justify them — see
[ROADMAP.md](ROADMAP.md).
