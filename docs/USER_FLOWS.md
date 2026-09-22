# User Flows

All flows below are implemented and clickable in the demo.

## 1. Visitor → demo login

```
/ (landing page)
  → click "Explore the interactive demo" or "View demo"
  → /login
  → fill in demo credentials (or click "Use demo credentials")
  → /dashboard
```

## 2. Reviewing competitor threats

```
/dashboard  → "Top competitor moves" card → /competitors
/competitors → filter by threat level → click a competitor card
  → /competitors/[id] → move history + sample overlapping keywords
```

## 3. Investigating an alert

```
/dashboard → "Recent alerts" → /alerts
/alerts → filter by severity / unread-only → "Mark read" or "Mark all as read"
```

## 4. Reviewing a workflow's logic

```
/workflows → toggle a workflow active/paused (local state only)
  → click a workflow name → /workflows/[id] → trigger → condition → action pipeline
```

## 5. Campaign drill-down

```
/campaigns → search or filter by mode (Defense/Attack/Standard)
  → click a campaign → /campaigns/[id] → keyword table (bid, quality score, status)
```

## 6. Reviewing performance

```
/reports → choose a range → view share-of-voice, spend-vs-conversions,
  and defense/attack activity charts
```

## 7. Billing and team review

```
/billing → compare plans, view invoice history, view seat usage
/settings → General | Team & roles | Integrations | API keys | Danger zone
```

## Flow not implemented (documented, not built)

**Onboarding** — the dossier specified: sign-up → verify email → create
tenant → connect Google Ads → invite team. This demo skips straight to a
single pre-seeded workspace behind a demo login, because there is no real
account system to onboard into. See [ROADMAP.md](ROADMAP.md).
