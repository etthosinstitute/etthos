# Etthos Platform Monorepo 🚀

<div align="center">

**Production-grade academic journal and public landing platform**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444)](https://turbo.build/repo)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![ISSN Compliant](https://img.shields.io/badge/ISSN-Compliant-green)](https://www.issn.org/)

[Quick Start](#quick-start) • [Workspace Structure](#workspace-structure) • [Journal System](#journal-system) • [Deployment](#deployment)

</div>

---

## Overview

Etthos is a comprehensive, production-ready web ecosystem built upon a modern Turborepo monorepo architecture. 

It powers two core applications:
1. **Etthos Landing (`apps/landing`)**: The public-facing corporate platform providing general information about the Etthos broader ecosystem.
2. **Etthos Journal System (`apps/journal`)**: A comprehensive, **ISSN India-compliant** academic journal platform specifically engineered to drive psychology research dissemination and peer-reviewed publishing.

---

## Workspace Structure

This repository uses [Turborepo](https://turbo.build/repo) to manage a full-stack Next.js environment.

```text
etthos-1/
├── apps/
│   ├── landing/          # Main corporate website (etthos.com)
│   └── journal/          # Journal system (etthosjournal.com)
└── packages/
    ├── database/         # Shared Prisma schema & bindings
    ├── ui/               # Shared Radix/Tailwind components
    ├── assets/           # Shared static assets 
    ├── eslint-config/    # Shared linting
    └── typescript-config/# Shared tsconfig configurations
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- `pnpm` 8+
- PostgreSQL 15+ (Local or Vercel Postgres)

### Installation

```bash
# 1. Clone & Install
git clone <repository-url>
cd etthos-1
pnpm install

# 2. Setup Environment Variables
cp apps/journal/.env.example apps/journal/.env.local
# Edit .env.local with your standard database strings

# 3. Provision Database
cd packages/database
pnpm db:generate
pnpm prisma migrate dev --name init

# 4. Optional: Seed Journal Data
cd ../../apps/journal
pnpm tsx scripts/seed-journal.ts

# 5. Start Development Servers
cd ../..
pnpm dev
# Alternatively, start an individual app:
# pnpm dev --filter=journal
```

---

## The Journal System 📚

The **Etthos Journal System** (`etthosjournal.com`) is the flagship application in this ecosystem. It serves as an end-to-end management and public-viewing platform tailored specifically to peer-reviewed Psychology research.

### Core Features
- ✅ **ISSN India Compliant:** Designed natively to meet rigorous regulatory demands including hardcoded minimum issues, volume tracking, publisher verifications, and permanent URLs.
- 📄 **Article Management:** End-to-end PDF processing, DOIs, references, and citation extraction (APA, MLA, IEEE, BibTeX).
- 👥 **Editorial Control:** Detailed public profiles for editorial boards linking affiliations and ORCIDs.
- 🚀 **SEO & Schema.org Optimization:** Integrated metadata specifically formatted for Google Scholar (`citation_*` tags) and OpenGraph indexing.
- 🔒 **Secure Architecture:** Built on JWTs, Vercel Blob security protocols for PDFs, and robust ORM injection protection.

### Journal Architecture

The architecture functions atop a hierarchical data model leveraging **Prisma** to manage publishing cycles:
`Journal (Singleton) → Volumes (Annual) → Issues (Periodic) → Articles (Specific Papers)`

#### Directory Access (Routing)
- **`/`**: Issue spotlights and hero discovery.
- **`/issues`**: Archive directories.
- **`/articles`**: Paginable research tables including rich PDF viewer routes (`/articles/[slug]`).
- **`/editorial-board`**: Mandated board visualization.
- **`/admin/*`**: Secured (JWT) administration panels covering Issue generation, author management, and PDF assignments.

### Security & Data Protection
- **Vercel Blob Storage:** Used securely for hosting PDFs; implements URL signing against unauthorized access.
- **Rate-Limiting:** Active Next.js API route rate limiters guarding open APIs.
- **Type-Safety:** 100% end-to-end safety spanning from PostgreSQL tables through tRPC/Next-API responses into React Server Components via Zod validation.

---

## Deployment Configuration

Both applications deploy seamlessly to the Vercel edge network using native Next.js build integrations.

1. **Connect & Authenticate:** Ensure Vercel CLI binds your target to `journal` and `landing`.
2. **Environment Synchronization:** Apply `DATABASE_URL` (Postgres pooling required) and `BLOB_READ_WRITE_TOKEN`.
3. **Execution:** 
   ```bash
   pnpm build
   # turbo manages cache pipelines for rapid deployments.
   ```
4. **Caching & Optimizations:** The Journal relies heavily on Incremental Static Regeneration (ISR). Article sheets are `SSG` permanently, whereas Issue dashboards revalidate periodically (`s-maxage=86400`) maximizing edge global performance.

---

<div align="center">
  <b>Built with ❤️ by the Etthos Engineering Team</b>
</div>
