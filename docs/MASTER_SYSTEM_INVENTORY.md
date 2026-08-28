# MASTER SYSTEM INVENTORY

Last verified: 2026-08-28 (Asia/Bangkok)

## Purpose

This document is the authoritative cross-platform inventory for the connected GitHub, Vercel, and Supabase resources. It exists to prevent naming drift, accidental cross-deployment, and confusion between account/workspace names, repositories, projects, deployments, and database backends.

## Naming model

- GitHub `vhalhavish-ctrl/<repository>` = repository owner + repository name.
- Supabase `vhalhavish-ctrl's Org` = Supabase organization display name, not a GitHub username.
- Vercel `vhalhavish-1099's projects` = Vercel team/workspace display name, not a GitHub repository.
- `'s` is a display-name possessive in English; it is not part of the GitHub login `vhalhavish-ctrl`.

## GitHub

Authenticated owner: `vhalhavish-ctrl`

| Repository | Visibility | Default branch | Current role | Governance status |
|---|---|---|---|---|
| `vhalhavish-ctrl/thai-senior-citizens-software-system` | Public | `main` | Current source repository; `main` presently contains S08 Management OS frontend | ACTIVE / NEEDS SOURCE ISOLATION |
| `vhalhavish-ctrl/lovable` | Public | `main` | Empty repository (size 0; no current contents) | UNUSED / VERIFY BEFORE ARCHIVE |

Known branches in the active repository:

- `main` — current S08 Management OS baseline.
- `management-os-rebuild` — S08 rebuild branch; PR #1 was merged into `main`.
- `recovery/s02-production-artifact` — recovery branch; preserve until ECOSTORY recovery/migration is formally closed.
- `ops/master-system-governance-20260828` — governance/inventory branch created to organize the estate without changing production application code directly.

## Vercel

Team: `vhalhavish-1099's projects`

Team ID: `team_X1D8wEIAnFgClnQkfCp3hOJ6`

| Vercel Project | Project ID | Git source currently linked | Production intent | Current governance assessment |
|---|---|---|---|---|
| `management-os-webapp` | `prj_Mf2eYrSpBNQ9Pn1svgtELtMr3Vom` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Management OS | KEEP; current known-good application mapping |
| `safezone-v3-webapp` | `prj_bpzzhlZJLApCib6KR4HS9zGSnFQa` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | SafeZone V3 | SOURCE COLLISION; must be isolated before production use |
| `ecostory-content-os` | `prj_XcpGijNhvbc9Tl1Su7IQWbxzUxlN` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | ECOSTORY | SOURCE COLLISION; preserve known-good ECOSTORY deployment separately |
| `eldercare-center-operating-system` | `prj_boVLYc2g9QZVMO8fokTjsmDOsHxy` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | ElderCare Center OS | SOURCE COLLISION |
| `eldercare-liquidglass-smoke` | `prj_78hUGSrQ8zSz4QmS1GBy6CmCypJa` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Smoke/UI test | TEST ONLY; do not treat as production |
| `eldercare-deploy-contract-smoke` | `prj_I9GtJ75zuWQqmYbDFFLvlKbF5toA` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Deployment smoke test | TEST ONLY; do not treat as production |
| `thesafezone-performance-assessment` | `prj_bBdPmrVwrziN6QZFPXR8021FQVc6` | `vhalhavish-ctrl/thai-senior-citizens-software-system` | Performance Assessment | SOURCE COLLISION |
| `thai-senior-citizens-software-system` | `prj_5trgETpsR4S8RRYV9nQDB2soeggx` | Metadata points to `vhalhavish-ctrl/gos-platform` | Thai Senior Citizens | BROKEN LINKAGE / latest known build error; repair before use |

Known canonical/production domains:

- Management OS: `https://management-os-webapp.vercel.app`
- SafeZone V3: `https://safezone-v3-webapp.vercel.app`
- ECOSTORY alias: `https://ecostory-content-os.vercel.app`
- ElderCare Center OS: `https://eldercare-center-operating-system.vercel.app`
- Performance Assessment: `https://thesafezone-performance-assessment.vercel.app`
- Thai Senior Citizens alias: `https://thai-senior-citizens-software-syste.vercel.app`

Known-good recovered ECOSTORY deployment to preserve until replacement passes UAT:

`https://ecostory-content-60rd87uja-vhalhavish-1099s-projects.vercel.app`

## Supabase

Organization: `vhalhavish-ctrl's Org`

Organization ID: `nxcpbsqxzuqxnqrnvbyx`

| Supabase Project | Ref / Project ID | Region | Verified status | Intended role | Governance status |
|---|---|---|---|---|---|
| `management-os` | `ijdlppmdjrapisckllfh` | `ap-southeast-1` | ACTIVE_HEALTHY | Dedicated Management OS backend | PRIMARY / KEEP ACTIVE |
| `vhalhavish-ctrl's Project` | `uxooqjhhzlxwhnrypnhl` | `ap-northeast-1` | ACTIVE_HEALTHY | Legacy shared backend holding multiple historical modules | PRESERVE / DO NOT DELETE |
| `thesafezone-performance-assessment` | `rxdfsyiqzxyenwmfpeih` | `ap-southeast-1` | INACTIVE | Dedicated Performance Assessment backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |
| `thai-senior-citizens-software-system` | `ohwewoqfhxucnwtslybf` | `ap-southeast-1` | INACTIVE | Dedicated Thai Senior Citizens backend | RESTORE ONLY WHEN APP BUILD IS READY |
| `eos-core` | `xcteqgmaugdkfylrdvxa` | `ap-southeast-1` | INACTIVE | EOS core backend | PRESERVE / ON HOLD |
| `eldercare-center-operating-system` | `witsarmjqvzwksdrjjvd` | `ap-southeast-1` | INACTIVE | ElderCare Center backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |
| `ecostory-content-os` | `raeohopqmbjpzjwlcaon` | `ap-southeast-1` | INACTIVE | Dedicated ECOSTORY backend | MIGRATION TARGET; DO NOT CUT OVER YET |
| `EOS Full Restore Drill TEMP` | `feorlngegcidubynulgs` | `ap-northeast-1` | INACTIVE | Restore/recovery drill | TEST / RECOVERY ONLY |
| `gos-platform` | `bigoboqntynuiyqfxjgz` | `ap-southeast-1` | INACTIVE | GOS platform | ON HOLD / PRESERVE |
| `wearezero-ip-register` | `wpetskaqrsmrtgihrjhl` | `ap-southeast-1` | INACTIVE | WEAREZERO IP register | PRESERVE; activate when frontend is isolated |
| `safezone-v3` | `ishjkptjhjgcuxxvqglh` | `ap-southeast-1` | INACTIVE | Dedicated SafeZone backend | RESTORE ONLY WHEN SOURCE IS ISOLATED |

## Current root cause

Multiple Vercel projects are linked to the same GitHub repository and branch. The current `main` branch contains the S08 Management OS frontend. A push to `main` therefore causes multiple Vercel projects to rebuild from the same Management OS source, even when their Vercel project names imply ECOSTORY, SafeZone, Performance Assessment, or ElderCare.

This is a source-isolation problem, not a data-loss problem.

## Required target architecture

For each production system, target a controlled 1:1 mapping:

`System-specific Git source -> system-specific Vercel project -> system-specific Supabase project`

Shared backends are allowed only when explicitly designated and documented.

## Change-control rules

1. Do not create additional production projects until the current estate is mapped and isolated.
2. Do not delete `uxooqjhhzlxwhnrypnhl`, recovery branches, or known-good deployments during cleanup.
3. Do not merge application source into `main` unless the target Vercel blast radius is known.
4. Use feature/repair branches and pull requests.
5. CI/security gates must pass before merge.
6. Smoke-test projects must never be presented as production systems.
7. A Vercel status of `READY` means the deployment built successfully; it does not prove that the correct business application was deployed.
8. A Supabase status of `INACTIVE` means the project is paused/inactive, not deleted.

## Priority order

P0: Freeze accidental cross-deployment and preserve known-good artifacts.

P1: Isolate Management OS, ECOSTORY, SafeZone, Performance Assessment, ElderCare Center, and Thai Senior Citizens source/deployment mappings.

P1: Repair Thai Senior Citizens build/linkage.

P1: Add UAT and release checklists per system.

P2: Migrate legacy shared-backend modules to dedicated backends only after application-level validation.

P2: Archive temporary resources only after retention evidence and rollback paths are verified.
