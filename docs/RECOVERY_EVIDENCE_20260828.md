# RECOVERY EVIDENCE — 2026-08-28

## Purpose

Forensic record used to distinguish Thai Senior Citizens recovery assets from ECOSTORY recovery assets before any production cutover.

## Finding A — `recovery/s02-production-artifact` is Thai Senior Citizens / Thai Senior Care V2

Evidence inspected directly from the branch:

1. `package.json`
   - package name: `thai-senior-care-v2-recovery`
   - recovery version: `2.0.1-recovery`
   - build entry: `node scripts/recover-build.mjs`

2. `scripts/recover-build.mjs`
   - source deployment URL: `https://thai-senior-citizens-software-system-fd4xzqgs8.vercel.app/`
   - source deployment ID: `dpl_7g183HhfepRKR6kDfBL29hgEgcnV`
   - HTML fingerprint required by the script: `<title>Thai Senior Care V2</title>`
   - historical Supabase ref: `bigoboqntynuiyqfxjgz`
   - dedicated target Supabase ref: `ohwewoqfhxucnwtslybf`
   - strategy: build-time recovery of an immutable production artifact plus runtime transport rewriting to the dedicated target backend.

Conclusion: the historical branch name `recovery/s02-production-artifact` must not be interpreted as proof that it belongs to ECOSTORY. Its contents identify it as Thai Senior Citizens / Thai Senior Care V2 recovery.

## Finding B — ECOSTORY recovery is currently represented by a preserved Vercel deployment, not a verified GitHub recovery branch

Preserved known-good ECOSTORY deployment:

`https://ecostory-content-60rd87uja-vhalhavish-1099s-projects.vercel.app`

Observed ECOSTORY application fingerprint from prior verification: `ECOSTORY Content Operating System`.

Dedicated ECOSTORY Supabase migration target:

- project: `ecostory-content-os`
- ref: `raeohopqmbjpzjwlcaon`

Historical/shared backend used by the working artifact during prior verification:

- ref: `uxooqjhhzlxwhnrypnhl`

Conclusion: ECOSTORY source must be recovered or reconstructed independently. Do not repoint ECOSTORY to the Thai Senior Citizens recovery branch.

## Safety actions completed

- Frozen S08 rollback branch: `release/s08-known-good-20260828`
- Canonical TSC recovery copy: `recovery/tsc-known-good-artifact-20260828`
- Original historical recovery branch preserved unchanged.
- No Supabase project restored or deleted.
- No Vercel production alias changed.

## Next release gates

### Thai Senior Citizens

1. Validate recovery build reproducibility.
2. Repair/replace Vercel Git linkage.
3. Confirm target backend `ohwewoqfhxucnwtslybf` schema and auth readiness.
4. Preview/UAT.
5. Controlled production promotion with rollback retained.

### ECOSTORY

1. Preserve known-good Vercel deployment.
2. Recover/reconstruct authoritative source independently.
3. Fingerprint source against the working deployment.
4. Validate dedicated backend `raeohopqmbjpzjwlcaon` before migration/cutover.
5. UAT then controlled production promotion.
