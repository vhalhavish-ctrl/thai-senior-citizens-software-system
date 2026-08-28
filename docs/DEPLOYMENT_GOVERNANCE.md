# DEPLOYMENT GOVERNANCE

## Objective

Prevent one system's source code from being deployed into another system's Vercel project, establish a repeatable release process across GitHub/Vercel/Supabase, and ensure recovery artifacts are identified by evidence rather than branch names alone.

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
- Frozen rollback branch: `release/s08-known-good-20260828`
- Supabase: `management-os` / `ijdlppmdjrapisckllfh`
- Vercel: `management-os-webapp`
- Production URL: `https://management-os-webapp.vercel.app`
- CI workflow: `.github/workflows/s08-ci.yml`
- Governance: do not change application source during estate cleanup unless the change is explicitly for S08.

### Thai Senior Citizens recovered artifact

Direct inspection proves the historical branch `recovery/s02-production-artifact` is a **Thai Senior Care V2 / Thai Senior Citizens recovery artifact**, despite its ambiguous branch name.

Verified evidence:

- `package.json` name: `thai-senior-care-v2-recovery`
- recovery fingerprint: `<title>Thai Senior Care V2</title>`
- historical Supabase ref embedded by the source artifact: `bigoboqntynuiyqfxjgz`
- dedicated recovery target: `ohwewoqfhxucnwtslybf`
- canonical safety copy: `recovery/tsc-known-good-artifact-20260828`

Governance: preserve both historical and canonical recovery branches until Thai Senior Citizens recovery passes build, auth, workflow, backend, UAT, and rollback acceptance.

### ECOSTORY recovered deployment

- Preserve Vercel deployment: `https://ecostory-content-60rd87uja-vhalhavish-1099s-projects.vercel.app`
- Historical/shared backend observed for the working artifact: `uxooqjhhzlxwhnrypnhl`
- Dedicated migration target: `raeohopqmbjpzjwlcaon`
- No accessible GitHub branch has yet been verified as the authoritative ECOSTORY source.
- Governance: do not switch production alias to a new ECOSTORY build until source reconstruction/verification and UAT confirm feature parity and data access.

## Recovery evidence rule

A branch, project, or deployment name is not sufficient proof of application identity. Before assigning a recovery artifact to a system, inspect at least two independent fingerprints such as:

- HTML title / application name
- package/app metadata
- Supabase project ref/host
- application-specific route or module names
- deployment ID and source URL
- schema/table namespace

If names and fingerprints disagree, the fingerprint evidence wins and the governance registry must be corrected before any production action.

## Branch strategy

- `main`: production baseline for the application currently hosted by this repository.
- `release/<system>/<date>` or equivalent: frozen known-good rollback point.
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

1. matching application source is isolated or recovery source is verified;
2. required schema/migrations are verified;
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
- `GO-WITH-UAT` — runtime works; production remains under controlled UAT.
- `NO-GO` — blocking defect or mapping error exists.
- `HOLD` — intentionally paused; preserve resources.
- `RECOVERY` — artifact retained for restoration/rollback.
- `TEST-ONLY` — smoke/temporary resource; not a production system.

## Current release decisions

- Management OS: `GO-WITH-UAT` — infrastructure is working; frozen rollback point exists.
- Thai Senior Citizens: `RECOVERY / NO-GO FOR CURRENT LINKAGE` — verified recovery source exists, but Vercel Git/build linkage must be repaired before backend restore/cutover.
- ECOSTORY: `RECOVERY / NO-GO FOR CURRENT ALIAS` — preserve known-good Vercel artifact; authoritative Git source still needs verification/reconstruction.
- SafeZone V3: `NO-GO` — source collision.
- Performance Assessment: `NO-GO` — source collision.
- ElderCare Center OS: `NO-GO` — source collision.
- GOS: `HOLD/PRESERVE` — legacy ref is currently required as evidence/input for Thai Senior Citizens recovery; do not delete during recovery.
- EOS Full Restore Drill TEMP: `TEST-ONLY`.

## Recovery sequence

1. Preserve S08 rollback and avoid runtime changes.
2. Repair Thai Senior Citizens using the verified recovery artifact and dedicated target backend.
3. Recover/verify ECOSTORY source against the known-good Vercel artifact.
4. Reconstruct/isolate SafeZone V3.
5. Reconstruct/isolate Performance Assessment.
6. Reconstruct/isolate ElderCare Center OS.

Each system must pass its own source fingerprint, backend mapping, UAT, and rollback gate before the next production cutover is promoted.
