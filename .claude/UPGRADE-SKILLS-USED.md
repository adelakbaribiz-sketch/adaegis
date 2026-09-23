# Upgrade Pass — Skills Used

Task → Skill used → Reason

| Task | Skill used | Reason |
|---|---|---|
| Depth/3D visual language, editorial copy pass on landing page | `frontend-design` | Directly covers avoiding generic "AI-generated" visual/copy tells and gives concrete depth/elevation guidance |

## Skills considered and not used, with reason

| Skill | Why not used |
|---|---|
| `architecture-review` | Codebase is a single Next.js app with no service boundaries to review — nothing to apply it to |
| `project-recovery` / `project-takeover` | Not applicable — this is a from-scratch build I made in the prior pass, not an inherited/broken codebase |
| `production-readiness` | Considered; skipped running the full gate because there is no backend/deployment target yet (see `docs/ROADMAP.md`) — most of its checklist (backups, health checks, secrets rotation) is N/A until Phase 1 |
| `ai-project-engineering` | No AI/ML integration exists in this project (documented as PROPOSED only in `docs/LIMITATIONS.md`) |
| `coolify-deployment` | Not deployed anywhere in this pass |
| `webapp-testing` (Playwright) | Would have added a real dependency for interaction tests; deferred per token/dependency-hygiene constraints in this pass — logged as a real gap in `docs/TESTING.md`, not silently skipped |

No custom skill was created — nothing in this pass repeated enough or was
niche enough to justify one.
