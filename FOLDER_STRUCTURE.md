# Etthos Journal - Folder Structure

## Complete Turborepo Structure

```
etthos-1/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Run tests on PR
│       └── deploy.yml                # Deploy to Vercel
│
├── apps/
│   ├── landing/                      # Main website (etthos.com)
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── journal/                      # Journal system (journal.etthos.com)
│       ├── prisma/
│       │   ├── migrations/           # Generated migrations
│       │   └── seed.ts               # Database seeding script
│       │
│       ├── public/
│       │   ├── images/
│       │   │   ├── logo.svg
│       │   │   └── placeholder.png
│       │   └── favicon.ico
│       │
│       ├── src/
│       │   ├── app/                  # Next.js App Router
│       │   │   ├── layout.tsx        # Root layout
│       │   │   ├── page.tsx          # Homepage
│       │   │   ├── globals.css       # Global styles
│       │   │   ├── error.tsx         # Error boundary
│       │   │   ├── not-found.tsx     # 404 page
│       │   │   │
│       │   │   ├── api/              # API Routes
│       │   │   │   ├── articles/
│       │   │   │   │   ├── route.ts           # GET /api/articles
│       │   │   │   │   ├── [id]/
│       │   │   │   │   │   ├── route.ts       # GET/PUT /api/articles/:id
│       │   │   │   │   │   └── pdf/
│       │   │   │   │   │       └── route.ts   # GET /api/articles/:id/pdf
│       │   │   │   │   └── search/
│       │   │   │   │       └── route.ts       # GET /api/articles/search
│       │   │   │   │
│       │   │   │   ├── issues/
│       │   │   │   │   ├── route.ts           # GET/POST /api/issues
│       │   │   │   │   └── [id]/
│       │   │   │   │       └── route.ts       # GET/PUT /api/issues/:id
│       │   │   │   │
│       │   │   │   ├── board/
│       │   │   │   │   ├── route.ts           # GET/POST /api/board
│       │   │   │   │   └── [id]/
│       │   │   │   │       └── route.ts       # PUT/DELETE /api/board/:id
│       │   │   │   │
│       │   │   │   ├── authors/
│       │   │   │   │   ├── route.ts           # GET /api/authors
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── route.ts       # GET /api/authors/:id
│       │   │   │   │       └── articles/
│       │   │   │   │           └── route.ts   # GET /api/authors/:id/articles
│       │   │   │   │
│       │   │   │   ├── upload/
│       │   │   │   │   └── route.ts           # POST /api/upload (PDF)
│       │   │   │   │
│       │   │   │   ├── search/
│       │   │   │   │   └── route.ts           # GET /api/search
│       │   │   │   │
│       │   │   │   └── admin/
│       │   │   │       ├── auth/
│       │   │   │       │   ├── login/
│       │   │   │       │   │   └── route.ts
│       │   │   │       │   └── logout/
│       │   │   │       │       └── route.ts
│       │   │   │       ├── articles/
│       │   │   │       │   └── route.ts       # CRUD operations
│       │   │   │       ├── issues/
│       │   │   │       │   └── route.ts
│       │   │   │       └── board/
│       │   │   │           └── route.ts
│       │   │   │
│       │   │   ├── about/
│       │   │   │   ├── page.tsx               # About the journal
│       │   │   │   ├── aims-scope/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── publisher/
│       │   │   │       └── page.tsx           # Publisher info (ISSN req)
│       │   │   │
│       │   │   ├── editorial-board/
│       │   │   │   └── page.tsx               # Editorial board (ISSN req)
│       │   │   │
│       │   │   ├── guidelines/
│       │   │   │   ├── page.tsx               # Author guidelines
│       │   │   │   ├── submission/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── formatting/
│       │   │   │       └── page.tsx
│       │   │   │
│       │   │   ├── policies/
│       │   │   │   ├── page.tsx               # All policies overview
│       │   │   │   ├── ethics/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── peer-review/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── open-access/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── plagiarism/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── privacy/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── terms/
│       │   │   │       └── page.tsx
│       │   │   │
│       │   │   ├── issues/
│       │   │   │   ├── page.tsx               # Archive - all issues
│       │   │   │   ├── [slug]/
│       │   │   │   │   └── page.tsx           # Individual issue page
│       │   │   │   └── loading.tsx
│       │   │   │
│       │   │   ├── articles/
│       │   │   │   ├── page.tsx               # All articles (searchable)
│       │   │   │   ├── [slug]/
│       │   │   │   │   ├── page.tsx           # Individual article (ISSN req)
│       │   │   │   │   ├── opengraph-image.tsx # Dynamic OG image
│       │   │   │   │   └── loading.tsx
│       │   │   │   └── loading.tsx
│       │   │   │
│       │   │   ├── authors/
│       │   │   │   ├── page.tsx               # All authors
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx           # Author profile
│       │   │   │
│       │   │   ├── contact/
│       │   │   │   └── page.tsx               # Contact page
│       │   │   │
│       │   │   └── admin/                     # Admin Dashboard (Protected)
│       │   │       ├── layout.tsx             # Admin layout with sidebar
│       │   │       ├── page.tsx               # Dashboard home
│       │   │       │
│       │   │       ├── articles/
│       │   │       │   ├── page.tsx           # List articles
│       │   │       │   ├── new/
│       │   │       │   │   └── page.tsx       # Create article
│       │   │       │   └── [id]/
│       │   │       │       ├── edit/
│       │   │       │       │   └── page.tsx   # Edit article
│       │   │       │       └── upload-pdf/
│       │   │       │           └── page.tsx   # Upload PDF
│       │   │       │
│       │   │       ├── issues/
│       │   │       │   ├── page.tsx           # List issues
│       │   │       │   ├── new/
│       │   │       │   │   └── page.tsx       # Create issue
│       │   │       │   └── [id]/
│       │   │       │       └── edit/
│       │   │       │           └── page.tsx   # Edit issue
│       │   │       │
│       │   │       ├── board/
│       │   │       │   ├── page.tsx           # List board members
│       │   │       │   ├── new/
│       │   │       │   │   └── page.tsx       # Add member
│       │   │       │   └── [id]/
│       │   │       │       └── edit/
│       │   │       │           └── page.tsx   # Edit member
│       │   │       │
│       │   │       ├── authors/
│       │   │       │   ├── page.tsx           # List authors
│       │   │       │   └── [id]/
│       │   │       │       └── edit/
│       │   │       │           └── page.tsx   # Edit author
│       │   │       │
│       │   │       └── settings/
│       │   │           └── page.tsx           # Journal settings
│       │   │
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Header.tsx             # Site header
│       │   │   │   ├── Footer.tsx             # Site footer
│       │   │   │   ├── Navigation.tsx         # Main nav
│       │   │   │   └── AdminSidebar.tsx       # Admin sidebar
│       │   │   │
│       │   │   ├── articles/
│       │   │   │   ├── ArticleCard.tsx        # Article preview card
│       │   │   │   ├── ArticleList.tsx        # List of articles
│       │   │   │   ├── ArticleHeader.tsx      # Article page header
│       │   │   │   ├── ArticleMetadata.tsx    # Metadata display
│       │   │   │   ├── ArticleAuthors.tsx     # Authors list
│       │   │   │   ├── ArticleCitation.tsx    # Citation formats
│       │   │   │   ├── ArticlePDF.tsx         # PDF viewer/download
│       │   │   │   ├── ArticleReferences.tsx  # References section
│       │   │   │   ├── ArticleKeywords.tsx    # Keywords display
│       │   │   │   └── RelatedArticles.tsx    # Related articles
│       │   │   │
│       │   │   ├── issues/
│       │   │   │   ├── IssueCard.tsx          # Issue preview card
│       │   │   │   ├── IssueGrid.tsx          # Grid of issues
│       │   │   │   ├── IssueHeader.tsx        # Issue page header
│       │   │   │   └── IssueTOC.tsx           # Table of contents
│       │   │   │
│       │   │   ├── board/
│       │   │   │   ├── BoardMemberCard.tsx    # Board member card
│       │   │   │   └── BoardGrid.tsx          # Grid of members
│       │   │   │
│       │   │   ├── authors/
│       │   │   │   ├── AuthorCard.tsx         # Author card
│       │   │   │   └── AuthorBio.tsx          # Author biography
│       │   │   │
│       │   │   ├── admin/
│       │   │   │   ├── forms/
│       │   │   │   │   ├── ArticleForm.tsx    # Article creation/edit
│       │   │   │   │   ├── IssueForm.tsx      # Issue creation/edit
│       │   │   │   │   ├── BoardMemberForm.tsx
│       │   │   │   │   ├── AuthorForm.tsx
│       │   │   │   │   ├── PDFUpload.tsx      # PDF upload component
│       │   │   │   │   └── ImageUpload.tsx    # Image upload
│       │   │   │   │
│       │   │   │   ├── tables/
│       │   │   │   │   ├── ArticlesTable.tsx  # Admin articles table
│       │   │   │   │   ├── IssuesTable.tsx
│       │   │   │   │   └── BoardTable.tsx
│       │   │   │   │
│       │   │   │   └── DashboardStats.tsx     # Dashboard statistics
│       │   │   │
│       │   │   ├── search/
│       │   │   │   ├── SearchBar.tsx          # Search input
│       │   │   │   ├── SearchResults.tsx      # Search results display
│       │   │   │   └── SearchFilters.tsx      # Filter options
│       │   │   │
│       │   │   ├── seo/
│       │   │   │   ├── ArticleMetaTags.tsx    # Article SEO tags
│       │   │   │   ├── SchemaOrg.tsx          # Schema.org markup
│       │   │   │   └── GoogleScholar.tsx      # Google Scholar tags
│       │   │   │
│       │   │   └── ui/                        # Reusable UI components
│       │   │       ├── Button.tsx
│       │   │       ├── Input.tsx
│       │   │       ├── Select.tsx
│       │   │       ├── Textarea.tsx
│       │   │       ├── Card.tsx
│       │   │       ├── Badge.tsx
│       │   │       ├── Dialog.tsx
│       │   │       ├── Dropdown.tsx
│       │   │       ├── Table.tsx
│       │   │       ├── Pagination.tsx
│       │   │       ├── Loading.tsx
│       │   │       └── ErrorBoundary.tsx
│       │   │
│       │   ├── lib/
│       │   │   ├── prisma.ts                  # Prisma client instance
│       │   │   ├── auth.ts                    # Authentication helpers
│       │   │   ├── upload.ts                  # File upload helpers
│       │   │   ├── citation.ts                # Citation format generators
│       │   │   ├── doi.ts                     # DOI generation
│       │   │   ├── search.ts                  # Search utilities
│       │   │   ├── validation.ts              # Input validation schemas
│       │   │   ├── constants.ts               # App constants
│       │   │   └── utils.ts                   # Utility functions
│       │   │
│       │   ├── services/
│       │   │   ├── articleService.ts          # Article business logic
│       │   │   ├── issueService.ts            # Issue business logic
│       │   │   ├── authorService.ts           # Author business logic
│       │   │   ├── boardService.ts            # Board business logic
│       │   │   ├── searchService.ts           # Search functionality
│       │   │   └── analyticsService.ts        # Analytics tracking
│       │   │
│       │   ├── types/
│       │   │   ├── article.ts                 # Article types
│       │   │   ├── issue.ts                   # Issue types
│       │   │   ├── author.ts                  # Author types
│       │   │   ├── board.ts                   # Board types
│       │   │   └── api.ts                     # API response types
│       │   │
│       │   └── hooks/
│       │       ├── useArticles.ts             # Articles data hook
│       │       ├── useIssues.ts               # Issues data hook
│       │       ├── useSearch.ts               # Search hook
│       │       └── useAdmin.ts                # Admin utilities hook
│       │
│       ├── scripts/
│       │   ├── seed-journal.ts                # Seed journal data
│       │   └── generate-doi.ts                # Generate DOIs for articles
│       │
│       ├── .env.local                         # Local environment variables
│       ├── .env.example                       # Example env file
│       ├── next.config.ts                     # Next.js configuration
│       ├── package.json
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── postcss.config.mjs
│       └── README.md
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma                  # Active Prisma schema
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   └── client.ts                      # Export Prisma client
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                                     # Shared UI components
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── assets/                                 # Shared assets/images
│   │   ├── index.ts
│   │   └── package.json
│   │
│   ├── typescript-config/                      # Shared TS configs
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── package.json
│   │
│   └── eslint-config/                          # Shared ESLint configs
│       ├── base.js
│       ├── next.js
│       └── package.json
│
├── .env.example                                # Root env example
├── .gitignore
├── package.json                                # Root package.json
├── pnpm-workspace.yaml                         # Workspace config
├── pnpm-lock.yaml
├── turbo.json                                  # Turborepo config
├── JOURNAL_ARCHITECTURE.md                     # This document
├── FOLDER_STRUCTURE.md                         # You are here
├── API_ROUTES.md                               # API documentation
└── README.md

## Key Files Explanation

### Configuration Files

#### `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "db:generate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    }
  }
}
```

#### `apps/journal/.env.example`
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/etthos_journal"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_token"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Admin API Key
ADMIN_API_KEY="your-admin-api-key"

# DOI Prefix (once registered)
DOI_PREFIX="10.xxxxx"

# URLs
NEXT_PUBLIC_APP_URL="https://journal.etthos.com"
NEXT_PUBLIC_MAIN_SITE_URL="https://etthos.com"

# Email (for future notifications)
# RESEND_API_KEY="your-resend-key"
# FROM_EMAIL="journal@etthos.com"
```

#### `apps/journal/next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['blob.vercel-storage.com'], // For Vercel Blob
    formats: ['image/avif', 'image/webp'],
  },
  
  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.journal.etthos.com' }],
        destination: 'https://journal.etthos.com/:path*',
        permanent: true,
      },
    ];
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/articles/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/articles/:id/pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Environment Setup Instructions

### Step 1: Install Dependencies
```bash
cd etthos-1
pnpm install
```

### Step 2: Setup Database
```bash
# Generate Prisma client
cd packages/database
pnpm db:generate

# Create and apply migrations
pnpm prisma migrate dev --name init

# Seed initial data
cd ../../apps/journal
pnpm tsx scripts/seed-journal.ts
```

### Step 3: Configure Environment Variables
```bash
# Copy example env file
cp apps/journal/.env.example apps/journal/.env.local

# Edit .env.local with your values
```

### Step 4: Run Development Server
```bash
# From root directory
pnpm dev

# Or run specific app
pnpm dev --filter=journal
```

### Step 5: Build for Production
```bash
# Build all apps
pnpm build

# Or build specific app
pnpm build --filter=journal
```

## Import Patterns

### Importing from Shared Packages

```typescript
// UI components
import { Button, Card } from "@repo/ui";

// Database
import { prisma } from "@repo/database";

// Assets
import { Logo } from "@etthos/assets";
```

### Internal Imports (within journal app)

```typescript
// Components
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Header } from "@/components/layout/Header";

// Services
import { articleService } from "@/services/articleService";

// Utils
import { formatDate } from "@/lib/utils";

// Types
import type { Article } from "@/types/article";
```

## File Naming Conventions

### Components
- PascalCase: `ArticleCard.tsx`, `IssueGrid.tsx`
- Use `.tsx` for React components
- Use `.ts` for utilities/services

### Routes
- lowercase with hyphens: `editorial-board/`, `aims-scope/`
- Always use `page.tsx` for route files
- Use `loading.tsx` for loading states
- Use `error.tsx` for error boundaries

### API Routes
- RESTful naming: `route.ts` in appropriate folder
- Use HTTP methods (GET, POST, PUT, DELETE)

### Utils/Services
- camelCase: `articleService.ts`, `searchService.ts`

## Code Organization Best Practices

### 1. Component Structure
```typescript
// ArticleCard.tsx
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  showAuthors?: boolean;
}

export function ArticleCard({ article, showAuthors = true }: ArticleCardProps) {
  // Component logic
}
```

### 2. Service Layer
```typescript
// articleService.ts
import { prisma } from "@repo/database";

export const articleService = {
  async getPublished() {
    return prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedDate: 'desc' },
    });
  },
  
  async getBySlug(slug: string) {
    return prisma.article.findUnique({
      where: { slug },
      include: {
        authors: {
          include: { author: true }
        },
        keywords: {
          include: { keyword: true }
        },
      },
    });
  },
};
```

### 3. API Route Structure
```typescript
// app/api/articles/route.ts
import { NextResponse } from "next/server";
import { articleService } from "@/services/articleService";

export async function GET(request: Request) {
  try {
    const articles = await articleService.getPublished();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
```

## Testing Structure (Future)

```
apps/journal/
├── __tests__/
│   ├── components/
│   │   └── ArticleCard.test.tsx
│   ├── services/
│   │   └── articleService.test.ts
│   ├── api/
│   │   └── articles.test.ts
│   └── e2e/
│       └── article-flow.test.ts
├── jest.config.js
└── playwright.config.ts
```

## Documentation Files

```
├── docs/
│   ├── SETUP.md                    # Setup instructions
│   ├── DEPLOYMENT.md               # Deployment guide
│   ├── API.md                      # API documentation
│   ├── ISSN_COMPLIANCE.md          # ISSN checklist
│   └── CONTRIBUTING.md             # Contribution guidelines
```
