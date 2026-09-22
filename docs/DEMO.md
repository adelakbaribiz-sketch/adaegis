# Demo Guide

## Running it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo credentials

The login screen at `/login` accepts exactly one email/password pair, shown
openly on the screen itself:

```
Email:    demo@adaegis.io
Password: adaegis-demo
```

There's also a "Use demo credentials" button that fills the form for you.
This is not a real account system — see [SECURITY.md](SECURITY.md).

## Suggested walkthrough

1. **`/`** — read the landing page: problem, features, competitor
   positioning, and the "Business & product overview" section.
2. **Sign in** and land on **`/dashboard`** — share-of-voice trend, unread
   alerts, managed spend, active automations.
3. **`/competitors`** — filter by threat level, open "BidForge" to see its
   move history (it's the one flagged for a possible brand hijack).
4. **`/alerts`** — filter to "critical" to see the brand-hijack alert
   referenced above; try "Mark as read."
5. **`/workflows`** — open "Brand Hijack Auto-Response" to see the
   trigger → condition → action pipeline that would react to that alert.
6. **`/campaigns`** — filter to "Attack" campaigns to see conquest
   campaigns targeting named competitors.
7. **`/reports`** — switch the range selector and watch the charts update.
8. **`/billing`** and **`/settings`** — note the disabled buttons; each has
   a tooltip explaining why (no backend to act on).

## What to expect to be disabled

Every button that would require a real backend (New campaign, Track
competitor, New workflow, Export CSV, Upgrade plan, Connect integration,
Invite member, Regenerate key, Delete workspace) is intentionally disabled
with an explanatory `title` tooltip, rather than silently doing nothing or
faking success.
