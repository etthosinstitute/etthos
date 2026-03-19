# Deployment & Security Guide

Complete guide for deploying and securing the Etthos Journal system.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Vercel Deployment](#vercel-deployment)
5. [Domain Configuration](#domain-configuration)
6. [Security Implementation](#security-implementation)
7. [Monitoring & Logging](#monitoring--logging)
8. [Backup Strategy](#backup-strategy)
9. [Performance Optimization](#performance-optimization)
10. [Maintenance](#maintenance)

---

## Prerequisites

### Required Accounts
- [ ] Vercel account (Pro plan recommended)
- [ ] GitHub account (for CI/CD)
- [ ] PostgreSQL database (Vercel Postgres, Supabase, or Railway)
- [ ] Domain registrar access (for journal.etthos.com)

### Required Tools
```bash
# Install Node.js 20+
node --version  # Should be v20+

# Install pnpm
npm install -g pnpm

# Install Vercel CLI
pnpm install -g vercel
```

---

## Database Setup

### Option 1: Vercel Postgres (Recommended)

**1. Create Database**
```bash
# Login to Vercel
vercel login

# Create database
vercel postgres create etthos-journal-db

# Get connection string
# Save the DATABASE_URL shown
```

**2. Configure Connection Pooling**
Vercel Postgres includes connection pooling by default. Use the connection string with `?pgbouncer=true` for serverless functions.

```env
# Use these two connection strings:
DATABASE_URL="postgres://..."           # For migrations
DATABASE_DIRECT_URL="postgres://...?pgbouncer=true"  # For queries
```

**3. Update Prisma Schema**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DATABASE_DIRECT_URL")
}
```

---

### Option 2: Supabase

**1. Create Project**
- Go to https://supabase.com
- Create new project
- Note the connection string

**2. Configure Connection**
```env
DATABASE_URL="postgres://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
```

---

### Option 3: Railway

**1. Create Database**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Create database
railway up
railway add --database postgres
```

**2. Get Connection String**
```bash
railway variables
# Copy DATABASE_URL
```

---

### Database Migration

**1. Apply Schema**
```bash
cd packages/database

# Copy the journal schema
cp prisma/schema-journal.prisma prisma/schema.prisma

# Generate Prisma client
pnpm db:generate

# Create migration
pnpm prisma migrate dev --name init

# Apply to production
pnpm prisma migrate deploy
```

**2. Seed Initial Data**
```bash
cd apps/journal
pnpm tsx scripts/seed-journal.ts
```

---

## Environment Configuration

### Local Development (.env.local)

```env
# ==========================================
# DATABASE
# ==========================================
DATABASE_URL="postgresql://user:password@localhost:5432/etthos_journal"
DATABASE_DIRECT_URL="postgresql://user:password@localhost:5432/etthos_journal"

# ==========================================
# VERCEL BLOB STORAGE
# ==========================================
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# ==========================================
# AUTHENTICATION
# ==========================================
JWT_SECRET="your-super-secret-jwt-key-minimum-32-chars"
ADMIN_API_KEY="your-admin-api-key-for-server-to-server"
JWT_EXPIRES_IN="7d"

# ==========================================
# DOI CONFIGURATION
# ==========================================
DOI_PREFIX="10.xxxxx"  # Once you get ISSN and register with DOI agency
DOI_REGISTRAR="crossref"  # or "datacite"

# ==========================================
# APPLICATION URLS
# ==========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_MAIN_SITE_URL="http://localhost:3001"

# ==========================================
# EMAIL (Future - for peer review)
# ==========================================
# RESEND_API_KEY="re_..."
# FROM_EMAIL="journal@etthos.com"
# SUPPORT_EMAIL="support@etthos.com"

# ==========================================
# ANALYTICS
# ==========================================
# GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
# SENTRY_DSN="https://...@sentry.io/..."

# ==========================================
# RATE LIMITING
# ==========================================
RATE_LIMIT_ENABLED="true"
RATE_LIMIT_PUBLIC="100"  # requests per minute
RATE_LIMIT_ADMIN="300"   # requests per minute

# ==========================================
# FILE UPLOAD
# ==========================================
MAX_PDF_SIZE="10485760"  # 10MB in bytes
MAX_IMAGE_SIZE="5242880"  # 5MB in bytes

# ==========================================
# FEATURE FLAGS
# ==========================================
ENABLE_MANUSCRIPT_SUBMISSION="false"  # Future feature
ENABLE_PEER_REVIEW="false"            # Future feature
```

### Production Environment (Vercel)

**1. Set Environment Variables in Vercel Dashboard**
```bash
# Or use CLI
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
# ... add all variables
```

**2. Environment Variable Scope**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Other variables are server-only
- Never commit `.env` files to Git

---

## Vercel Deployment

### Step 1: Connect Repository

**1. Push Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/etthos/journal.git
git push -u origin main
```

**2. Import to Vercel**
- Go to https://vercel.com/new
- Import your repository
- Select root directory
- Detect framework: Next.js

---

### Step 2: Configure Build Settings

**vercel.json**
```json
{
  "version": 2,
  "buildCommand": "pnpm build --filter=journal",
  "devCommand": "pnpm dev --filter=journal",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": "apps/journal/.next",
  "regions": ["bom1", "sin1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret"
  },
  "functions": {
    "apps/journal/src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/articles/:slug",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=31536000, immutable"
        }
      ]
    },
    {
      "source": "/api/articles/:id/pdf",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/www.:path*",
      "destination": "https://journal.etthos.com/:path*",
      "permanent": true
    }
  ]
}
```

---

### Step 3: Configure Turborepo

**turbo.json**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"],
      "env": [
        "DATABASE_URL",
        "NEXT_PUBLIC_APP_URL"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "db:generate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    }
  }
}
```

---

### Step 4: Deploy

**Using Vercel CLI:**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Using GitHub:**
- Push to `main` branch → auto-deploys to production
- Create PR → auto-deploys preview

---

### Step 5: Post-Deployment

**1. Run Database Migrations**
```bash
# Using Vercel CLI
vercel env pull .env.production
pnpm prisma migrate deploy
```

**2. Generate Prisma Client**
This happens automatically during build, but verify:
```bash
pnpm db:generate
```

**3. Verify Deployment**
```bash
curl https://journal.etthos.com/api/articles
```

---

## Domain Configuration

### Step 1: Configure DNS

**Add DNS Records:**
```
Type: CNAME
Name: journal
Value: cname.vercel-dns.com
TTL: 3600
```

Or if using A records:
```
Type: A
Name: journal
Value: 76.76.21.21
TTL: 3600
```

---

### Step 2: Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add `journal.etthos.com`
3. Wait for DNS propagation (can take up to 48 hours)
4. SSL certificate is auto-generated by Vercel

---

### Step 3: Verify Domain

```bash
# Check DNS
dig journal.etthos.com

# Check SSL
curl -I https://journal.etthos.com
```

---

## Security Implementation

### 1. Authentication Middleware

**lib/auth.ts**
```typescript
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function authenticate(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      userId: string;
      role: string;
    };
    
    return { user: decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    return { error: 'Forbidden', status: 403 };
  }
  return { authorized: true };
}
```

**Usage in API Route:**
```typescript
// app/api/admin/articles/route.ts
import { authenticate, requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const auth = await authenticate(request);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  
  const adminCheck = requireAdmin(auth.user);
  if (adminCheck.error) {
    return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
  }
  
  // Process request...
}
```

---

### 2. Rate Limiting

**lib/rate-limit.ts**
```typescript
import { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, number[]>();

export function rateLimit(request: NextRequest, limit: number = 100) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= limit) {
    return { 
      error: 'Too many requests',
      retryAfter: 60,
      status: 429
    };
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  return { 
    remaining: limit - recentRequests.length,
    limit 
  };
}
```

**Alternative: Use @upstash/ratelimit**
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

export async function rateLimit(ip: string) {
  const { success, limit, remaining } = await ratelimit.limit(ip);
  return { success, limit, remaining };
}
```

---

### 3. Input Validation

**lib/validation.ts**
```typescript
import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string().min(10).max(500),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  abstract: z.string().min(150).max(3000),
  type: z.enum([
    'RESEARCH_ARTICLE',
    'REVIEW_ARTICLE',
    'CASE_STUDY',
    'SHORT_COMMUNICATION'
  ]),
  issueId: z.string().cuid(),
  pageStart: z.number().int().positive(),
  pageEnd: z.number().int().positive(),
  doi: z.string().regex(/^10\.\d{4,}\//).optional(),
  authors: z.array(z.object({
    authorId: z.string().cuid(),
    order: z.number().int().positive(),
    isCorresponding: z.boolean(),
  })).min(1),
  keywords: z.array(z.string()).min(3).max(10),
});

export const BoardMemberSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().refine(
    (email) => !email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com'),
    { message: 'Must use institutional email' }
  ),
  role: z.enum([
    'EDITOR_IN_CHIEF',
    'ASSOCIATE_EDITOR',
    'EDITORIAL_BOARD_MEMBER'
  ]),
  designation: z.string().min(2),
  department: z.string().min(2),
});
```

**Usage:**
```typescript
const result = ArticleSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json(
    { error: 'Validation error', details: result.error },
    { status: 400 }
  );
}
```

---

### 4. PDF Upload Security

**lib/upload.ts**
```typescript
import { put } from '@vercel/blob';
import { createHash } from 'crypto';

export async function uploadPDF(file: File): Promise<{ url: string; hash: string }> {
  // Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed');
  }
  
  // Validate file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit');
  }
  
  // Generate content hash
  const buffer = await file.arrayBuffer();
  const hash = createHash('sha256').update(Buffer.from(buffer)).digest('hex');
  
  // Check for duplicate
  // ... check database for existing hash
  
  // Upload to Vercel Blob
  const blob = await put(`articles/${hash}.pdf`, file, {
    access: 'public',
    addRandomSuffix: false,
  });
  
  return { url: blob.url, hash };
}
```

---

### 5. SQL Injection Prevention

Prisma prevents SQL injection by default, but for raw queries:

```typescript
// ❌ NEVER DO THIS
const slug = request.query.slug;
await prisma.$queryRaw`SELECT * FROM articles WHERE slug = '${slug}'`;

// ✅ DO THIS
const slug = request.query.slug;
await prisma.$queryRaw`SELECT * FROM articles WHERE slug = ${slug}`;
```

---

### 6. XSS Prevention

```typescript
// Sanitize HTML content
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}
```

---

### 7. CORS Configuration

**middleware.ts**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // CORS headers
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', 'https://etthos.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://blob.vercel-storage.com; script-src 'self' 'unsafe-inline'"
  );
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

---

### 8. Environment Variable Security

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  BLOB_READ_WRITE_TOKEN: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Validate on startup
envSchema.parse(process.env);

export const env = envSchema.parse(process.env);
```

---

## Monitoring & Logging

### 1. Vercel Analytics

Already included, no setup needed. View in Vercel dashboard.

---

### 2. Sentry Error Tracking

**Install:**
```bash
pnpm add @sentry/nextjs
```

**sentry.client.config.ts**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

**sentry.server.config.ts**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
});
```

---

### 3. Custom Logging

**lib/logger.ts**
```typescript
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta, timestamp: new Date() }));
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({ level: 'error', message, error: error?.message, timestamp: new Date() }));
  },
  warn: (message: string, meta?: any) => {
    console.warn(JSON.stringify({ level: 'warn', message, ...meta, timestamp: new Date() }));
  },
};
```

---

### 4. Uptime Monitoring

Use services like:
- Better Uptime
- Checkly
- UptimeRobot (free tier available)

Configure to check:
- Homepage: `https://journal.etthos.com`
- API: `https://journal.etthos.com/api/articles`
- Frequency: Every 5 minutes

---

## Backup Strategy

### 1. Database Backups

**Automated Backups (Vercel Postgres):**
- Automatic daily backups (included)
- Point-in-time recovery available

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20240315.sql
```

---

### 2. File Backups (PDFs)

Vercel Blob has built-in redundancy, but for extra safety:

```typescript
// scripts/backup-blobs.ts
import { list } from '@vercel/blob';
import { writeFileSync } from 'fs';

async function backupBlobs() {
  const { blobs } = await list();
  const manifest = blobs.map(blob => ({
    url: blob.url,
    pathname: blob.pathname,
    size: blob.size,
  }));
  
  writeFileSync(
    `backup-manifest-${Date.now()}.json`,
    JSON.stringify(manifest, null, 2)
  );
}
```

---

### 3. Configuration Backup

Keep in version control:
- `.env.example` (without secrets)
- `vercel.json`
- All configuration files

---

## Performance Optimization

### 1. Database Indexing

Already optimized in schema, but verify:
```sql
-- Check slow queries
EXPLAIN ANALYZE SELECT * FROM articles WHERE slug = 'article-slug';

-- Check indexes
SELECT * FROM pg_indexes WHERE tablename = 'articles';
```

---

### 2. Caching Strategy

**API Routes:**
```typescript
export const revalidate = 3600; // 1 hour

export async function GET() {
  const articles = await getArticles();
  
  return NextResponse.json(articles, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
```

**Static Pages:**
```typescript
// app/articles/[slug]/page.tsx
export const revalidate = false; // Never revalidate (ISG)

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
```

---

### 3. Image Optimization

```typescript
import Image from 'next/image';

export function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

---

### 4. Bundle Size Optimization

```bash
# Analyze bundle
pnpm add -D @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true pnpm build
```

---

## Maintenance

### Daily Tasks
- [ ] Monitor error logs (Sentry)
- [ ] Check uptime status
- [ ] Review failed deployments

### Weekly Tasks
- [ ] Review analytics
- [ ] Check storage usage
- [ ] Review API rate limits
- [ ] Update content

### Monthly Tasks
- [ ] Update dependencies
- [ ] Security audit
- [ ] Database performance review
- [ ] Backup verification
- [ ] Cost analysis

### Quarterly Tasks
- [ ] Major feature releases
- [ ] Compliance review (ISSN requirements)
- [ ] User feedback review
- [ ] Disaster recovery test

---

## Disaster Recovery Plan

### Step 1: Identify Issue
- Check Vercel dashboard
- Review Sentry errors
- Check database connectivity

### Step 2: Rollback (if needed)
```bash
# Rollback Vercel deployment
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push
```

### Step 3: Restore Database (if needed)
```bash
# From backup
psql $DATABASE_URL < backup-latest.sql

# Or use Vercel Postgres restore feature
```

### Step 4: Verify
```bash
# Test critical endpoints
curl https://journal.etthos.com/api/articles
curl https://journal.etthos.com/articles/test-slug
```

---

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] Database credentials are secure
- [ ] Admin routes require authentication
- [ ] Rate limiting is enabled
- [ ] CORS is configured correctly
- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] Input validation is implemented
- [ ] File uploads are validated
- [ ] SQL injection prevention verified
- [ ] XSS prevention implemented
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies are up to date
- [ ] `.env` files are in `.gitignore`

---

## Go-Live Checklist

- [ ] Domain configured and SSL active
- [ ] Database migrated and seeded
- [ ] All environment variables set
- [ ] Editorial board added (minimum 5 members)
- [ ] First issue published (minimum 5 articles)
- [ ] Publisher information page complete
- [ ] All ISSN requirements met
- [ ] Analytics configured
- [ ] Error monitoring active
- [ ] Uptime monitoring configured
- [ ] Backups scheduled
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Documentation complete
- [ ] Team trained on admin dashboard

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Prisma Discord](https://discord.gg/prisma)

### Etthos Support
- Technical Issues: dev@etthos.com
- ISSN Questions: journal@etthos.com
