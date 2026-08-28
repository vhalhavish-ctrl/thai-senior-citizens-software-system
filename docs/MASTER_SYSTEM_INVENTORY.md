# MASTER SYSTEM INVENTORY

Last verified: 2026-08-28 (Asia/Bangkok)

## Purpose

Authoritative cross-platform inventory for the connected GitHub, Vercel, and Supabase estate. The goal is to prevent naming drift, accidental cross-deployment, incorrect recovery assumptions, and confusion between account/workspace names, repositories, projects, deployments, and database backends.

## Naming model

- GitHub `vhalhavish-ctrl/<repository>` = repository owner + repository name.
- Supabase `vhalhavish-ctrl's Org` = Supabase organization display name, not a GitHub username.
- Vercel `vhalhavish-1099's projects` = Vercel team/workspace display name, not a GitHub repository.
- `'s` is a possessive display-name convention; it is not part of the GitHub login `vhalhavish-ctrl`.

## GitHub

Authenticated owner: `vhalhavish-ctrl`

| Repository | Visibility | Default branch | Current role | Governance status |
|---|---|---|---|---|
| `vhalhavish-ctrl/thai-senior-citizens-software-system` | Public | `main` | Current source repository; `main` presently contains S08 Management OS frontend | ACTIVE / NEEDS SOURCE ISOLATION |
| `vhalhavish-ctrl/lovable` | Public | `main` | Empty repository (size 0; no current contents) | UNUSED / VERIFY BEFORE ARCHIVE |

### Verified branches / protected recovery points

- `main` — current S08 Management OS baseline.
- `release/s08-known-good-20260828` — frozen rollback snapshot of the known-good S08 baseline.
- `management-os-rebuild` — S08 rebuild branch; PR #1 was merged into `main`.
- `recovery/s02-production-artifact` — historical/misleading branch name. **Verified contents are Thai Senior Care V2 / Thai Senior Citizens recovery, not ECOSTORY.** The recovery build fingerprints `<title>Thai Senior Care V2</title>`, reads a historical deployment, rewrites legacy Supabase ref `bigoboqntynuiyqfxjgz`, and targets dedicated Thai Senior Citizens ref `ohwewoqfhxucnwtslybf`.
- `recovery/tsc-known-good-artifact-20260828` — canonical safety copy created from the verified Thai Senior Citizens recovery branch. Preserve until TSC recovery is formally closed.
- `ops/master-system-governance-20260828` — initial governance/inventory branch.
- `ops/recovery-map-correction-20260828` — correction branch used to repair the recovery mapping after source inspection.

## Critical recovery correction

Earlier governance text associated `recovery/s02-production-artifact` with ECOSTORY. Direct inspection of `package.json` and `scripts/recover-build.mjs` proves that association was incorrect. The branch is a Thai Senior Care V2 / Thai Senior Citizens recovery artifact. ECOSTORY has a known-good Vercel deployment, but **no accessible GitHub branch has yet been verified as the authoritative ECOSTORY source**.

This correction changes documentation and recovery routing only. It does not delete or overwrite any production/recovery artifact.

## Vercel

Team: `vhalhavish-1099's projects`

Team ID: `team_X1D8wEIAnFgClnQkfCp3hOJ6`

| Vercel Project | Project ID | Git source currently linked | Production intent | Current governance assessment |
|---|---|---|---|---|
| `management-os-webapp` | `prj_Mf2eYrSpBNQ9Pn1svgtELtMr3Vom` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Management OS | KEEP; current known-good application mapping |
| `safezone-v3-webapp` | `prj_bpzzhlZJLApCib6KR4HS9zGSnFQa` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | SafeZone V3 | SOURCE COLLISION; isolate before production use |
| `ecostory-content-os` | `prj_XcpGijNhvbc9Tl1Su7IQWbxzUxlN` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | ECOSTORY | SOURCE COLLISION; current alias is not authoritative; preserve known-good ECOSTORY deployment separately |
| `eldercare-center-operating-system` | `prj_boVLYc2g9QZVMO8fokTjsmDOsHxy` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | ElderCare Center OS | SOURCE COLLISION |
| `eldercare-liquidglass-smoke` | `prj_78hUGSrQ8zSz4QmS1GBy6CmCypJa` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Smoke/UI test | TEST ONLY |
| `eldercare-deploy-contract-smoke` | `prj_I9GtJ75zuWQqmYbDFFLvlKbF5toA` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Deployment smoke test | TEST ONLY |
| `thesafezone-performance-assessment` | `prj_bBdPmrVwrziN6QZFPXR8021FQVc6` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Performance Assessment | SOURCE COLLISION |
| `thai-senior-citizens-software-system` | `prj_5trgETpsR4S8RRYV9nQDB2soeggx` | Metadata points to `vhalhavish-ctrl/gos-platform` | Thai Senior Citizens | RECOVERY SOURCE EXISTS, but current Git linkage/build is NO-GO |

Known canonical/production domains:

- Management OS: `https://management-os-webapp.vercel.app`
- SafeZone V3 alias: `https://safezone-v3-webapp.vercel.app`
- ECOSTORY alias: `https://ecostory-content-os.vercel.app`
- ElderCare Center OS alias: `https://eldercare-center-operating-system.vercel.app`
- Performance Assessment alias: `https://thesafezone-performance-assessment.vercel.app`
- Thai Senior Citizens alias: `https://thai-senior-citizens-software-syste.vercel.app`

Known-good ECOSTORY deployment to preserve until replacement passes UAT:

`https://ecostory-content-60rd87uja-vhalhavish-1099s-projects.vercel.app`

Important: this ECOSTORY deployment is a Vercel recovery/rollback asset and must not be confused with the GitHub branch `recovery/s02-production-artifact`, which has now been verified as Thai Senior Citizens recovery.

## Supabase

Organization: `vhalhavish-ctrl's Org`

Organization ID: `nxcpbsqxzuqxnqrnvbyx`

| Supabase Project | Ref / Project ID | Region | Verified status | Intended role | Governance status |
|---|---|---|---|---|---|
| `management-os` | `ijdlppmdjrapisckllfh` | `ap-southeast-1` | ACTIVE_HEALTHY | Dedicated Management OS backend | PRIMARY / KEEP ACTIVE |
| `vhalhavish-ctrl's Project` | `uxooqjhhzlxwhnrypnhl` | `ap-northeast-1` | ACTIVE_HEALTHY | Legacy shared backend holding multiple historical modules | PRESERVE / DO NOT DELETE |
| `thesafezone-performance-assessment` | `rxdfsyiqzxyenwmfpeih` | `ap-southeast-1` | INACTIVE | Dedicated Performance Assessment backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |
| `thai-senior-citizens-software-system` | `ohwewoqfhxucnwtslybf` | `ap-southeast-1` | INACTIVE | Dedicated Thai Senior Citizens backend | RECOVERY TARGET; restore only when recovery build/linkage is ready for UAT |
| `eos-core` | `xcteqgmaugdkfylrdvxa` | `ap-southeast-1` | INACTIVE | EOS core backend | PRESERVE / ON HOLD |
| `eldercare-center-operating-system` | `witsarmjqvzwksdrjjvd` | `ap-southeast-1` | INACTIVE | ElderCare Center backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |
| `ecostory-content-os` | `raeohopqmbjpzjwlcaon` | `ap-southeast-1` | INACTIVE | Dedicated ECOSTORY backend | MIGRATION TARGET; DO NOT CUT OVER YET |
| `EOS Full Restore Drill TEMP` | `feorlngegcidubynulgs` | `ap-northeast-1` | INACTIVE | Restore/recovery drill | TEST / RECOVERY ONLY |
| `gos-platform` | `bigoboqntynuiyqfxjgz` | `ap-southeast-1` | INACTIVE | Historical GOS backend; also the legacy Supabase ref embedded in the recovered Thai Senior Care V2 artifact | HOLD / PRESERVE; DO NOT DELETE DURING TSC RECOVERY |
| `wearezero-ip-register` | `wpetskaqrsmrtgihrjhl` | `ap-southeast-1` | INACTIVE | WEAREZERO IP register | PRESERVE; activate when frontend is isolated |
| `safezone-v3` | `ishjkptjhjgcuxxvqglh` | `ap-southeast-1` | INACTIVE | Dedicated SafeZone backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |

## Current root causes

1. Multiple Vercel projects are linked to the same GitHub repository and branch. Since `main` contains S08 Management OS, unrelated Vercel projects rebuild S08 when `main` changes.
2. Thai Senior Citizens has a separate problem: a recovery artifact exists, but Vercel linkage/build configuration remains broken or historically coupled to `gos-platform`.
3. ECOSTORY has a preserved working Vercel artifact, but its authoritative source branch has not yet been verified in the accessible GitHub repository.

These are source/linkage/recovery-control problems, not evidence of data deletion.

## Required target architecture

For each production system, target a controlled mapping:

`System-specific Git source -> system-specific Vercel project -> system-specific Supabase project`

Shared backends are allowed only when explicitly designated and documented.

## Recovery order

1. S08 Management OS — keep stable; rollback branch now frozen.
2. Thai Senior Citizens — use verified recovery artifact as the reconstruction baseline; repair linkage/build before restoring dedicated Supabase.
3. ECOSTORY — preserve known-good Vercel deployment; identify/reconstruct authoritative source before cutover.
4. SafeZone V3 — reconstruct/isolate source, then UAT against dedicated Supabase.
5. Performance Assessment — reconstruct/isolate source, then UAT against dedicated Supabase.
6. ElderCare Center OS — reconstruct/isolate source, then UAT against dedicated Supabase.

## Change-control rules

1. Do not create additional production projects merely to bypass an unresolved mapping problem.
2. Do not delete `uxooqjhhzlxwhnrypnhl`, `bigoboqntynuiyqfxjgz`, recovery branches, or known-good deployments during recovery.
3. Do not merge unrelated application source into `main` unless the target Vercel blast radius is known.
4. Use feature/repair/recovery branches and pull requests.
5. CI/security gates must pass before merge.
6. Smoke-test projects must never be presented as production systems.
7. Vercel `READY` proves a build completed, not that the correct business application was deployed.
8. Supabase `INACTIVE` means paused/inactive, not deleted.
9. A recovery branch name is not authoritative evidence of application identity; inspect its application fingerprint and backend references.
