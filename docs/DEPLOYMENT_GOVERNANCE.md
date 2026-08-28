# DEPLOYMENT GOVERNANCE

## Objective

Prevent one system's source code from being deployed into another system's Vercel project, and establish a repeatable release process across GitHub, Vercel, and Supabase.

## Release model

Every production application must have an explicit release chain:

1. GitHub source scope is known.
2. Target Vercel project is known.
3. Target Supabase project is known.
4. Environment variables reference only the intended Supabase project.
5. CI validates the system fingerprint and rejects secrets.
6. Preview deployment passes smoke tests.
7. UAT sign-off is recorded.
8. Production is promoted.
9. Rollback target is documented.

## Current protected baselines

### S08 Management OS

- GitHub repository: `vhalhavish-ctrl/thai-senior-citizens-software-system`
- Current production source baseline: `main`
- Supabase: `management-os` / `ijdlppmdjrapisckllfh`
- Vercel: `management-os-webapp`
- Production URL: `https://management-os-webapp.vercel.app`
- CI workflow: `.github/workflows/s08-ci.yml`
- Governance: do not change application source during estate cleanup unless the change is explicitly for S08.

### ECOSTORY recovered artifact

- Preserve deployment: `https://ecostory-content-60rd87uja-vhalhavish-1099s-projects.vercel.app`
- Current historical backend: `uxooqjhhzlxwhnrypnhl`
- Dedicated migration target: `raeohopqmbjpzjwlcaon`
- Governance: do not switch production alias to a new ECOSTORY build until UAT confirms feature parity and data access.

## Branch strategy

- `main`: production baseline for the application currently hosted by this repository.
- `feature/<system>/<change>`: normal feature work.
- `fix/<system>/<issue>`: defect fixes.
- `recovery/<system>/<artifact>`: recovery work; retain until closure.
- `ops/<topic>`: governance, documentation, inventory, and non-application operational changes.

Never use a generic branch name such as `fix-all` for multi-system work.

## Vercel isolation rule

A Vercel project must not be considered production-ready when it points to a shared repository root whose current application fingerprint belongs to another system.

Before production use, verify:

- Git repository / branch / root directory
- framework and build command
- production domain
- environment variables
- Supabase URL/ref
- deployment title/fingerprint
- latest build status
- runtime errors

## Supabase activation rule

Do not restore a dedicated inactive Supabase project solely because a frontend project exists. Restore only when:

1. the matching application source is isolated;
2. the required schema/migrations are verified;
3. environment variables are ready;
4. UAT requires the dedicated backend;
5. rollback is defined.

## Security gates

All browser-delivered source must reject:

- Supabase service-role keys
- `sb_secret_` keys
- passwords or private tokens
- unscoped administrative credentials

Publishable frontend keys are allowed only with appropriate RLS policies.

## UAT minimum checklist

For every system:

- login/logout
- role/permission checks
- create/read/update workflow
- tenant/branch data isolation where applicable
- mobile layout
- error handling
- production domain
- correct Supabase backend
- audit trail
- backup/rollback path
- no browser-visible administrative secret

## Release decision codes

- `GO` — production promotion approved.
- `NO-GO` — blocking defect or mapping error exists.
- `HOLD` — intentionally paused; preserve resources.
- `RECOVERY` — artifact retained for restoration/rollback.
- `TEST-ONLY` — smoke/temporary resource; not a production system.

## Current release decisions

- Management OS: `GO-WITH-UAT` — infrastructure is working; continue operational UAT.
- ECOSTORY: `RECOVERY / NO-GO FOR CURRENT ALIAS` — preserve known-good artifact; isolate source before cutover.
- SafeZone V3: `NO-GO` — source collision.
- Performance Assessment: `NO-GO` — source collision.
- ElderCare Center OS: `NO-GO` — source collision.
- Thai Senior Citizens: `NO-GO` — linkage/build requires repair.
- GOS: `HOLD`.
- EOS Full Restore Drill TEMP: `TEST-ONLY`.
