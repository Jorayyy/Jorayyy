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

**Frontend**<br>
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-087EA4?style=flat-square&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**Backend and data**<br>
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)

**Auth and validation**<br>
![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

**Testing and delivery**<br>
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

**Also fluent**<br>
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)

## Contributions

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Jorayyy/Jorayyy/output/snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Jorayyy/Jorayyy/output/snake.svg" />
    <img alt="Contribution snake" src="https://raw.githubusercontent.com/Jorayyy/Jorayyy/output/snake.svg" width="100%" />
  </picture>
</div>

<details>
<summary>Off the clock</summary>

The [arcade](https://jorayyy.github.io/Jorayyy/) in this profile is a canvas game I built for fun — character select, collision, and save state with no engine.

</details>

<div align="center">
<sub>Open to senior full-stack roles — <a href="mailto:makoyjorey@gmail.com">makoyjorey@gmail.com</a></sub>
</div>
