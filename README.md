<div align="center">

## Mark Jory Andrade

**Full-stack engineer — HRIS, payroll, and operations systems**

Tacloban City, Philippines · open to remote and Cebu/Tacloban roles

[Email](mailto:makoyjorey@gmail.com) · [LinkedIn](https://www.linkedin.com/in/mark-jory-andrade-58003b343/) · [Arcade](https://jorayyy.github.io/Jorayyy/)

</div>

I build the software a BPO actually runs on: time and attendance, Philippine statutory payroll, leave, and multi-site inventory. Most of these systems are designed, built, and shipped solo end to end — data model, permissions, payroll math, UI, and deployment.

## Selected work

### [prime-hris](https://github.com/Jorayyy/prime-hris) · [live](https://prime-hris.vercel.app) — HRIS and payroll for multi-site BPO operations
`Next.js 16` · `React 19` · `Prisma 6` · `PostgreSQL` · `Socket.IO`

33-model HRIS covering employees, shift templates, attendance, leave, and payroll.

- **Philippine payroll engine** — DOLE, SSS (RA 11199), PhilHealth UHC, Pag-IBIG, and TRAIN withholding computed from bracket tables stored in the database, so a rate change is a data update, not a redeploy.
- **Attendance to payslip pipeline** — shift assignments, overtime and holiday rules, payroll exceptions, payslips with adjustments, and an audit entry for every mutation.
- **Real-time layer** — Socket.IO chat and HR inbox on a custom Next server, with online presence and typing state tracked server-side.

### [mebs_inventory](https://github.com/Jorayyy/mebs_inventory) · [live](https://mebs-inventory.vercel.app) — asset and inventory management for multi-site BPOs
`Next.js` · `Prisma` · `Auth.js v5` · `Vitest`

36-model inventory system: assets, consumables, transfers, maintenance, and offboarding clearance.

- **Authorization is server-side only** — 52 permissions across 8 roles, enforced by `requirePermission` in every action and page, with `siteScope` keeping site admins inside their own sites.
- **Custody trail** — multi-line site-to-site transfers and an exit clearance workflow that blocks offboarding until equipment comes back.
- **Tested** — 8 Vitest suites plus a smoke script that boots the production build and asserts routes, login, and CSV exports.

### [qr](https://github.com/Jorayyy/qr) · [live](https://qr-psi-drab.vercel.app) — QR visitor management with check-in/check-out
`Next.js 16` · `Prisma 7` · `Argon2` · `TOTP`

- **Security first** — Argon2 password hashing, TOTP MFA for staff, server-side RBAC matrix, audit log, and validated uploads.
- **Rate limiting that survives serverless** — Postgres counters with an in-memory short-circuit per instance, so a burst of traffic stops hammering the database.
- **Retention by policy** — visitor photos live in private blob storage and are purged by a scheduled retention job.
- **CI on every push** — lint, typecheck, 9 Vitest suites, and a production build.

### [hrweb](https://github.com/Jorayyy/hrweb) · [live](https://hrweb-eight.vercel.app) — payroll and timekeeping, rebuilt end to end
`Next.js 16` · `Drizzle ORM` · `Neon` · `Vitest`

- **Statutory contributions** with timezone-correct daily cutoffs (Asia/Manila) and a manual DTR review step before pay runs.
- **Sensitive identifiers encrypted at rest** — AES-256-GCM with a key that hard-fails in production if missing.
- **12 Vitest suites** covering payroll math, leave, lockout, and access scope.

**Also shipping:** [saripos](https://github.com/Jorayyy/saripos) (multi-store POS), [jorify](https://github.com/Jorayyy/jorify) (multi-tenant commerce SaaS), plus client storefronts for retail, food, and gym businesses.

## How I build

- **Typed boundaries.** Zod at every input, server actions for every mutation, nothing trusted from the browser. Permissions are checked in the data layer, not in the component.
- **Money and access control get tests.** Payroll arithmetic, statutory tables, and permission checks are the code I refuse to ship on vibes.
- **Boring infrastructure.** Postgres, migrations in version control, CI that runs lint, typecheck, tests, and a build on every push.
- **Readable over clever.** Every repo here is something a new hire could pick up.

## Stack

`TypeScript` · `Next.js` · `React` · `Tailwind CSS` · `Prisma` / `Drizzle` · `PostgreSQL` · `Auth.js` · `Vitest` · `Docker` · `Laravel` / `PHP` · `MySQL`

<details>
<summary>Off the clock</summary>

The [arcade](https://jorayyy.github.io/Jorayyy/) in this profile is a canvas game I built for fun — character select, collision, and save state with no engine.

</details>

<div align="center">
<sub>Open to senior full-stack roles — <a href="mailto:makoyjorey@gmail.com">makoyjorey@gmail.com</a></sub>
</div>
