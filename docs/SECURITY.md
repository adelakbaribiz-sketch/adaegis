# Security

## What actually exists in this demo

- **Auth**: `src/lib/auth.ts` checks a hardcoded email/password pair
  (`demo@adaegis.io` / `adaegis-demo`, shown openly on the login screen) and
  sets a plain `localStorage` flag on success. This is **not a real
  authentication system**: there is no password hashing, no session token, no
  server-side check, and no protection against someone editing
  `localStorage` directly to bypass the gate. It exists solely to give the
  demo a login screen and a logout action for presentation purposes.
- **No secrets in the repository.** There are no API keys, tokens, or
  credentials anywhere in this codebase — the "API key" shown on
  `/settings` is a static display string, not a working credential.
- **No user input reaches a backend.** Every form in the demo (login,
  workspace name, search boxes) either short-circuits to a client-side
  check or is disabled with an explanatory tooltip. There is no SQL, no
  server-executed code, and no file upload anywhere in the app, so the
  standard web injection classes (SQLi, path traversal, unrestricted upload)
  do not apply to the current build.
- **XSS surface**: all rendered data comes from the app's own static
  TypeScript constants, never from user input or an external API, so there
  is no untrusted-string-into-the-DOM path in this build.

## What a real product would need (not built)

- Real authentication (NextAuth.js or equivalent) with hashed credentials,
  session/JWT handling, and CSRF protection on any mutating endpoint.
- Row-level tenant isolation in the database (`tenant_id` + Postgres RLS),
  since this is designed as multi-tenant SaaS.
- OAuth2 credential storage for Google Ads / SEMrush / SpyFu / Stripe —
  encrypted at rest, likely via a secrets manager (Vault or the cloud
  provider's equivalent), never in application code or `.env` committed to
  git.
- Input validation on every real endpoint listed in
  [API_SPEC.md](API_SPEC.md) once it's built.
- Dependency vulnerability scanning in CI (not yet set up — see
  [TESTING.md](TESTING.md)).
- A real audit log for permission-sensitive actions (bid changes, workflow
  activation, billing changes) — currently only a UI concept, not a working
  table.

## Compliance

GDPR/SOC2/ISO 27001 are aspirational roadmap items from the original dossier,
not claims about this codebase. No compliance work has been done, and none
should be implied by anything in this repository.
