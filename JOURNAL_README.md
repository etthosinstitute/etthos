# Etthos Journal System 📚

<div align="center">

**Production-grade academic journal platform for psychology research**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)
[![ISSN Compliant](https://img.shields.io/badge/ISSN-Compliant-green)](https://www.issn.org/)

[Documentation](#documentation) • [Quick Start](#quick-start) • [Features](#features) • [Architecture](#architecture)

</div>

---

## Overview

Etthos Journal System is a comprehensive, ISSN India-compliant academic journal platform designed specifically for psychology research. Built with modern technologies and following industry best practices, it provides a robust foundation for publishing scholarly articles.

### Key Highlights

- ✅ **ISSN India Compliant** - Meets all requirements for online journal registration
- 📄 **Article Management** - Complete system for publishing and managing research articles
- 👥 **Editorial Board** - Comprehensive board management with institutional affiliations
- 🔍 **SEO Optimized** - Full schema.org markup, OpenGraph tags, and Google Scholar metadata
- 🚀 **Production Ready** - Deployed on Vercel with PostgreSQL database
- 📱 **Responsive Design** - Mobile-first, accessible interface
- 🔒 **Secure** - JWT authentication, rate limiting, input validation
- 📊 **Analytics Ready** - Built-in tracking for views and downloads

---

## Documentation

Comprehensive documentation is available:

- 📖 [**System Architecture**](./JOURNAL_ARCHITECTURE.md) - Complete system design and specifications
- 📁 [**Folder Structure**](./FOLDER_STRUCTURE.md) - Detailed project organization
- 🔌 [**API Documentation**](./API_ROUTES.md) - Complete API reference
- 🚀 [**Deployment & Security**](./DEPLOYMENT_SECURITY.md) - Production deployment guide
- 💾 [**Database Schema**](./packages/database/prisma/schema-journal.prisma) - Full Prisma schema

---

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 15+ (or Vercel Postgres account)
- Vercel account (for deployment)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd etthos-1

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp apps/journal/.env.example apps/journal/.env.local
# Edit .env.local with your database credentials

# 4. Setup database schema
cd packages/database
cp prisma/schema-journal.prisma prisma/schema.prisma
pnpm db:generate
pnpm prisma migrate dev --name init

# 5. Seed the database
cd ../../apps/journal
pnpm tsx scripts/seed-journal.ts

# 6. Start development server
cd ../..
pnpm dev --filter=journal
```

Your journal is now running at `http://localhost:3000`

### Default Admin Credentials

```
Email: admin@etthos.com
Password: admin123
```

**⚠️ Change this password immediately in production!**

---

## Features

### Public Features

#### Homepage
- Latest issue prominently displayed
- Recent articles
- Journal information
- Quick navigation

#### Article System
- Individual article pages with permanent URLs
- Full metadata (title, abstract, authors, keywords)
- PDF download
- Multiple citation formats (APA, MLA, Chicago, IEEE, BibTeX)
- View and download tracking
- Related articles suggestions

#### Issues Archive
- Browse all published issues
- Volume and issue organization
- Issue table of contents
- Cover images

#### Editorial Board
- Complete board member profiles
- Institutional affiliations
- Areas of expertise
- ORCID integration

#### Search & Discovery
- Full-text search across articles
- Filter by type, year, keywords
- Author profiles
- Related articles

#### Static Pages
- About the Journal
- Aims & Scope
- Publisher Information (ISSN requirement)
- Author Guidelines
- Submission Guidelines
- Ethics & Publication Policies
- Peer Review Process
- Open Access Policy
- Contact Information

### Admin Features

#### Dashboard
- Overview statistics
- Quick actions
- Recent activity
- Analytics summary

#### Article Management
- Create and edit articles
- Upload PDFs to Vercel Blob
- Manage metadata
- Assign authors
- Add keywords
- Publish/unpublish
- Generate DOIs

#### Issue Management
- Create volumes and issues
- Organize articles
- Set cover images
- Publish issues (validates minimum 5 articles)

#### Editorial Board Management
- Add/edit board members
- Manage affiliations
- Set display order
- Activate/deactivate members

#### Author Management
- Create author profiles
- Link affiliations
- ORCID integration
- Track publications

---

## Tech Stack

### Frontend
- **Next.js 16** - App Router with React Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **Lucide Icons** - Beautiful icons

### Backend
- **Next.js API Routes** - RESTful API
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database
- **Vercel Blob** - PDF and image storage
- **JWT** - Authentication
- **Zod** - Input validation

### Infrastructure
- **Vercel** - Hosting and deployment
- **Turborepo** - Monorepo management
- **GitHub Actions** - CI/CD (planned)

---

## Architecture

### Project Structure

```
etthos-1/
├── apps/
│   ├── landing/          # Main website (etthos.com)
│   └── journal/          # Journal system (journal.etthos.com)
│       ├── src/
│       │   ├── app/      # Next.js App Router
│       │   ├── components/
│       │   ├── lib/
│       │   ├── services/
│       │   └── types/
│       └── scripts/
│           └── seed-journal.ts
│
└── packages/
    ├── database/         # Shared Prisma schema
    ├── ui/              # Shared UI components
    ├── assets/          # Shared assets
    └── typescript-config/
```

### Database Design

```
Journal (singleton)
  ↓
Volume (yearly)
  ↓
Issue (periodic)
  ↓
Article (papers)
  ↓
[Authors, Keywords, References, Citations]

Editorial Board (separate)
  ↓
[Editor-in-Chief, Associate Editors, Board Members]
```

### URL Structure

```
journal.etthos.com/
├── /                                    # Homepage
├── /about                               # About journal
├── /editorial-board                     # Board members
├── /guidelines                          # Author guidelines
├── /policies                            # Publication policies
├── /issues                              # All issues
├── /issues/volume-1-issue-1             # Individual issue
├── /articles                            # All articles
├── /articles/article-slug               # Individual article
└── /admin                               # Admin dashboard
```

---

## ISSN India Compliance

This system fully complies with ISSN India requirements:

### ✅ Checklist

- [x] **Unique Article URLs** - Each article has permanent slug-based URL
- [x] **Minimum 5 Articles per Issue** - Validated at database level
- [x] **Editorial Board (5+ members)** - Required institutional details
- [x] **Publisher Information** - Dedicated page with full address
- [x] **Permanent URLs** - Proper redirects and SEO
- [x] **Individual Article Display** - Not limited to issue PDFs
- [x] **Focused Subject Area** - Psychology specialization
- [x] **Linked to Organization** - Clear connection to etthos.com
- [x] **No Misleading Information** - Transparent policies

### Required Information Displayed

1. **Editorial Board Page**
   - Name, designation, department
   - Institutional affiliation
   - Official institutional email
   - Country

2. **Publisher Information Page**
   - Organization name
   - Complete postal address
   - Contact email and phone
   - Link to main website

3. **Each Article Page**
   - Complete metadata
   - Author affiliations
   - Publication date
   - DOI (once registered)
   - PDF download
   - Citation formats

---

## Development

### Available Commands

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev --filter=journal   # Start journal only

# Building
pnpm build                  # Build all apps
pnpm build --filter=journal # Build journal only

# Database
pnpm db:generate           # Generate Prisma client
pnpm db:push               # Push schema changes
pnpm db:migrate            # Create migration
pnpm db:seed               # Seed database

# Code Quality
pnpm lint                  # Lint all apps
pnpm type-check            # TypeScript check
```

### Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="postgresql://..."

# Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Authentication
JWT_SECRET="your-secret-key"
ADMIN_API_KEY="your-api-key"

# Application
NEXT_PUBLIC_APP_URL="https://journal.etthos.com"
```

---

## Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Configure Environment**
   ```bash
   vercel env add DATABASE_URL production
   vercel env add JWT_SECRET production
   # Add all environment variables
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Domain**
   - Add custom domain: `journal.etthos.com`
   - DNS: CNAME → `cname.vercel-dns.com`
   - SSL certificate auto-generated

See [DEPLOYMENT_SECURITY.md](./DEPLOYMENT_SECURITY.md) for detailed instructions.

---

## Security

### Implemented Security Measures

- ✅ JWT authentication for admin routes
- ✅ Rate limiting (100 req/min for public, 300 for admin)
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Secure headers (CSP, X-Frame-Options, etc.)
- ✅ PDF upload validation (type, size, malware scanning)
- ✅ HTTPS enforcement
- ✅ Environment variable validation

---

## API Reference

### Public Endpoints

```
GET  /api/articles              # List articles
GET  /api/articles/[id]         # Get article
GET  /api/articles/[id]/pdf     # Download PDF
GET  /api/issues                # List issues
GET  /api/issues/[id]           # Get issue
GET  /api/board                 # Editorial board
GET  /api/authors               # List authors
GET  /api/authors/[id]          # Author profile
GET  /api/search                # Search articles
```

### Admin Endpoints (Protected)

```
POST   /api/admin/articles      # Create article
PUT    /api/admin/articles/[id] # Update article
POST   /api/admin/issues        # Create issue
POST   /api/admin/board         # Add board member
POST   /api/admin/upload        # Upload file
GET    /api/admin/stats         # Dashboard stats
```

See [API_ROUTES.md](./API_ROUTES.md) for complete documentation.

---

## Future Features

### Phase 1 (Current)
- [x] Public journal website
- [x] Article management
- [x] Editorial board
- [x] Admin dashboard

### Phase 2 (3-6 months)
- [ ] Manuscript submission system
- [ ] Author dashboard
- [ ] Email notifications
- [ ] Advanced search

### Phase 3 (6-12 months)
- [ ] Peer review workflow
- [ ] Reviewer portal
- [ ] Review tracking
- [ ] Decision management
- [ ] Automated notifications

### Phase 4 (12+ months)
- [ ] Indexing applications (Scopus, etc.)
- [ ] Impact factor tracking
- [ ] Citation analytics
- [ ] Author metrics

---

## Contributing

### Development Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

---

## Support

### Documentation
- [Architecture](./JOURNAL_ARCHITECTURE.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [API Reference](./API_ROUTES.md)
- [Deployment Guide](./DEPLOYMENT_SECURITY.md)

### Contact
- Technical Issues: dev@etthos.com
- Journal Inquiries: journal@etthos.com
- General: info@etthos.com

---

## License

Copyright © 2024 Etthos. All rights reserved.

---

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

Special thanks to the open-source community.

---

<div align="center">

**Made with ❤️ by Etthos**

[Website](https://etthos.com) • [Journal](https://journal.etthos.com)

</div>
