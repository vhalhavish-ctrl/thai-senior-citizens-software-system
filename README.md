# THAI SENIOR CITIZENS SOFTWARE SYSTEM — Repository Governance Notice

> Important: the repository name is historical. The current `main` branch presently contains the **S08 Management OS / Delegation & Control System** frontend. Other systems must not assume this repository root is their production source.

## Current authoritative mapping

- GitHub owner: `vhalhavish-ctrl`
- Repository: `vhalhavish-ctrl/thai-senior-citizens-software-system`
- Default branch: `main`
- Current `main` application: **S08 Management OS**
- S08 Supabase: `management-os` / `ijdlppmdjrapisckllfh`
- S08 Vercel: `management-os-webapp`
- S08 production URL: `https://management-os-webapp.vercel.app`

## Why this notice exists

Multiple Vercel projects are currently linked to this repository. If they all build the repository root from `main`, they can deploy the same Management OS application even when their project names imply ECOSTORY, SafeZone, Performance Assessment, or ElderCare. Treat this as a deployment-governance issue until each system is isolated.

## Governance documents

- `docs/MASTER_SYSTEM_INVENTORY.md` — cross-platform inventory and status.
- `docs/DEPLOYMENT_GOVERNANCE.md` — release, UAT, rollback, and isolation rules.
- `ops/system-registry.json` — machine-readable resource registry.

## Protected branches / artifacts

- `main` — current S08 production baseline.
- `management-os-rebuild` — merged S08 rebuild branch; retain until cleanup closure.
- `recovery/s02-production-artifact` — ECOSTORY recovery branch; **do not delete** until migration and UAT are complete.

## Change-control rule

Do not merge unrelated application source into `main` without first confirming the intended GitHub -> Vercel -> Supabase mapping and blast radius.

## Security

The repository contains a GitHub Actions release gate under `.github/workflows/s08-ci.yml` that checks source presence, JavaScript syntax, S08 fingerprinting, the correct S08 Supabase reference, and obvious administrative-secret patterns. Browser-delivered code must never contain Supabase service-role keys or other private credentials.
