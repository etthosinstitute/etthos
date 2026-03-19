# Etthos Journal System Architecture

## Overview
Production-grade academic journal system for psychology research, fully compliant with ISSN India guidelines.

**Domain**: journal.etthos.com  
**Main Site**: etthos.com (already deployed landing page)

## System Architecture

### Technology Stack
```
Frontend:          Next.js 14+ (App Router, RSC)
Monorepo:          Turborepo
Database:          PostgreSQL 15+
ORM:               Prisma
Storage:           Vercel Blob Storage (PDFs)
Hosting:           Vercel
Authentication:    JWT + NextAuth.js (future)
Email:             Resend / SendGrid (future peer review)
Search:            PostgreSQL Full-Text Search
CDN:               Vercel Edge Network
Analytics:         Vercel Analytics
```

### Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    journal.etthos.com                    │
│                    (Next.js App Router)                  │
└─────────────────────────────────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                      │
┌────────▼────────┐                  ┌─────────▼────────┐
│  Public Routes  │                  │  Admin Dashboard  │
│                 │                  │   (Protected)     │
│ - Homepage      │                  │                   │
│ - Issues        │                  │ - Manage Issues   │
│ - Articles      │                  │ - Upload PDFs     │
│ - Board         │                  │ - Edit Articles   │
│ - Guidelines    │                  │ - Board Mgmt      │
└────────┬────────┘                  └─────────┬────────┘
         │                                      │
         └──────────────────┬──────────────────┘
                            │
                  ┌─────────▼──────────┐
                  │    API Routes      │
                  │                    │
                  │ /api/issues        │
                  │ /api/articles      │
                  │ /api/board         │
                  │ /api/admin/*       │
                  └─────────┬──────────┘
                            │
                  ┌─────────▼──────────┐
                  │   Prisma ORM       │
                  │                    │
                  │ - Type Safety      │
                  │ - Migrations       │
                  │ - Relations        │
                  └─────────┬──────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                      │
┌────────▼────────┐                  ┌─────────▼────────┐
│   PostgreSQL    │                  │  Vercel Blob     │
│                 │                  │                  │
│ - Journal Data  │                  │ - Article PDFs   │
│ - Metadata      │                  │ - Images         │
│ - Relations     │                  │ - Supplementary  │
└─────────────────┘                  └──────────────────┘
```

## ISSN India Compliance Checklist

### ✅ Mandatory Requirements

1. **Unique Article URLs** ✓
   - Format: `journal.etthos.com/articles/[slug]`
   - Permanent, SEO-friendly slugs
   - Each article has dedicated page

2. **Minimum 5 Articles per Issue** ✓
   - Enforced at database level
   - Admin validation before publishing

3. **Editorial Board (5+ members)** ✓
   - Minimum 5 members required
   - Stored with full details:
     * Name
     * Designation
     * Department
     * Institution
     * Official email
     * Country
   - Public board page: `journal.etthos.com/editorial-board`

4. **Publisher Information** ✓
   - Dedicated page: `journal.etthos.com/about/publisher`
   - Contains:
     * Full organization name
     * Complete postal address
     * Contact information
     * Registration details

5. **Permanent URL** ✓
   - Domain: journal.etthos.com
   - Permanent article URLs with proper redirects
   - Archive maintained indefinitely

6. **Individual Article Display** ✓
   - Each article viewable separately
   - Full metadata on article page
   - Not limited to issue PDFs

7. **Focused Subject Area** ✓
   - Psychology and related fields
   - Clear aims & scope documentation

8. **Linked to Organization** ✓
   - Clear branding
   - Links to etthos.com
   - Consistent identity

9. **No Misleading Information** ✓
   - Accurate impact factor display (once available)
   - Proper indexing status
   - Transparent policies

## Database Schema Design

### Core Entities

```
Journal (singleton)
  ↓
Volume (2024, 2025, etc.)
  ↓
Issue (Issue 1, Issue 2, etc.)
  ↓
Article (individual papers)
  ↓
[Authors, Keywords, References, Citations]

Editorial Board (separate hierarchy)
  ↓
[Editor-in-Chief, Associate Editors, Reviewers]
```

### Key Relations

- Journal: 1 (singleton record)
- Volume: Many (one per year)
- Issue: Many per Volume (quarterly, bi-annual, etc.)
- Article: Many per Issue (minimum 5)
- Author: Many-to-Many with Article (co-authors)
- EditorialBoard: Many members
- Affiliation: Many (shared by authors)
- Keyword: Many-to-Many with Article
- Reference: Many per Article

## URL Structure

### Public Routes

```
journal.etthos.com/
├── /                                    # Homepage (latest issue)
├── /about                               # About the journal
├── /about/aims-scope                    # Research focus
├── /about/publisher                     # Publisher info (ISSN requirement)
├── /editorial-board                     # Board members (ISSN requirement)
├── /guidelines                          # Author guidelines
│   ├── /submission                      # How to submit
│   └── /formatting                      # Article format
├── /policies                            # Ethics & publication policies
│   ├── /ethics                          # Ethical guidelines
│   ├── /peer-review                     # Review process
│   ├── /open-access                     # Access policy
│   └── /plagiarism                      # Plagiarism policy
├── /issues                              # Archive - all issues
├── /issues/volume-[n]-issue-[n]         # Individual issue page
├── /articles                            # All articles (searchable)
├── /articles/[slug]                     # Individual article (ISSN requirement)
├── /authors/[id]                        # Author profile
└── /contact                             # Contact information
```

### Admin Routes (Protected)

```
journal.etthos.com/admin
├── /dashboard                           # Overview
├── /issues                              # Manage issues
│   ├── /new                             # Create new issue
│   └── /[id]/edit                       # Edit issue
├── /articles                            # Manage articles
│   ├── /new                             # Upload article
│   ├── /[id]/edit                       # Edit article
│   └── /[id]/upload-pdf                 # PDF management
├── /board                               # Manage editorial board
│   ├── /new                             # Add member
│   └── /[id]/edit                       # Edit member
├── /authors                             # Manage authors
└── /settings                            # Journal settings
```

### API Routes

```
/api/
├── /articles
│   ├── GET  /api/articles               # List articles (paginated)
│   ├── GET  /api/articles/[id]          # Single article
│   ├── POST /api/articles               # Create article (admin)
│   ├── PUT  /api/articles/[id]          # Update article (admin)
│   └── GET  /api/articles/[id]/pdf      # PDF download
├── /issues
│   ├── GET  /api/issues                 # List issues
│   ├── GET  /api/issues/[id]            # Single issue with articles
│   ├── POST /api/issues                 # Create issue (admin)
│   └── PUT  /api/issues/[id]            # Update issue (admin)
├── /board
│   ├── GET  /api/board                  # Editorial board members
│   ├── POST /api/board                  # Add member (admin)
│   ├── PUT  /api/board/[id]             # Update member (admin)
│   └── DELETE /api/board/[id]           # Remove member (admin)
├── /authors
│   ├── GET  /api/authors                # List authors
│   ├── GET  /api/authors/[id]           # Author profile
│   └── GET  /api/authors/[id]/articles  # Author's articles
├── /upload
│   └── POST /api/upload/pdf             # Upload PDF to Vercel Blob
└── /search
    └── GET  /api/search?q=query         # Full-text search
```

## Article Metadata Structure

Each article must include:

### Required Fields
- Title
- Abstract (150-300 words)
- Keywords (5-8 keywords)
- Authors (with ORCID if available)
- Affiliations
- Publication date
- Volume number
- Issue number
- Page range (e.g., 1-15)
- DOI (format: 10.xxxxx/etthos.vXiY.articleID)
- PDF URL
- Article type (Research, Review, Case Study)

### Optional Fields
- Corresponding author
- Funding information
- Conflict of interest statement
- Acknowledgments
- Supplementary materials
- Data availability statement

### Citation Formats
Each article page provides:
- APA 7th edition
- MLA 9th edition
- Chicago
- IEEE
- BibTeX
- RIS (for reference managers)

## SEO & Schema.org Implementation

### Article Page Metadata

```typescript
// Every article page includes:

1. HTML Meta Tags
   - <title>Article Title | Etthos Journal of Psychology</title>
   - <meta name="description" content="Abstract..." />
   - <meta name="keywords" content="..." />
   - <meta name="author" content="..." />
   - <meta name="citation_*" /> (Google Scholar)

2. OpenGraph Tags
   - og:title
   - og:description
   - og:type: article
   - og:url
   - og:image
   - article:published_time
   - article:author
   - article:section

3. Twitter Cards
   - twitter:card: summary_large_image
   - twitter:title
   - twitter:description
   - twitter:image

4. Schema.org JSON-LD
   - @type: ScholarlyArticle
   - headline
   - abstract
   - author (Person)
   - publisher (Organization)
   - datePublished
   - citation
   - identifier (DOI)
   - url
```

### Google Scholar Meta Tags

```html
<meta name="citation_title" content="Article Title" />
<meta name="citation_author" content="Author Name" />
<meta name="citation_publication_date" content="2024/03/15" />
<meta name="citation_journal_title" content="Etthos Journal of Psychology" />
<meta name="citation_volume" content="1" />
<meta name="citation_issue" content="1" />
<meta name="citation_firstpage" content="1" />
<meta name="citation_lastpage" content="15" />
<meta name="citation_pdf_url" content="https://..." />
<meta name="citation_doi" content="10.xxxxx/..." />
```

## Performance Optimization

### Static Generation Strategy

```typescript
// Pre-render at build time:
- Homepage (ISR: revalidate every 1 hour)
- Issues archive
- Individual issue pages (ISR: revalidate every 24 hours)
- Individual article pages (SSG - permanent content)
- Editorial board page (ISR: revalidate every 24 hours)
- Static pages (about, guidelines, policies)

// Server-side render:
- Search results
- Admin dashboard
- Dynamic filters

// Client-side only:
- Admin forms
- Interactive components
```

### Caching Strategy

```
Article Pages:      Cache-Control: public, max-age=31536000
PDF Downloads:      Cache-Control: public, max-age=31536000
Issue Pages:        Cache-Control: public, s-maxage=86400
Homepage:           Cache-Control: public, s-maxage=3600
API Routes:         Cache-Control: private, no-cache (admin)
                    Cache-Control: public, s-maxage=3600 (public)
```

### Image Optimization
- Use Next.js Image component
- WebP/AVIF formats
- Responsive images
- Lazy loading
- Proper alt text for accessibility

## Security Implementation

### Authentication & Authorization

```typescript
// Roles:
- PUBLIC:  Read-only access
- AUTHOR:  Submit manuscripts (future)
- EDITOR:  Review submissions (future)
- ADMIN:   Full access to dashboard

// Implementation:
- JWT tokens for admin sessions
- HttpOnly cookies
- CSRF protection
- Rate limiting on API routes
```

### Data Protection

```typescript
1. Input Validation
   - Zod schemas for all inputs
   - Sanitize HTML content
   - File upload restrictions
   - SQL injection prevention (Prisma)

2. PDF Security
   - Verify file types
   - Scan for malware (ClamAV or service)
   - Size limits (max 10MB)
   - Signed URLs for downloads

3. API Security
   - Rate limiting (Vercel rate limit)
   - CORS configuration
   - API key for admin routes
   - Request signing for sensitive operations

4. Environment Variables
   - DATABASE_URL
   - JWT_SECRET
   - BLOB_READ_WRITE_TOKEN
   - ADMIN_API_KEY
   - Never expose in client code
```

### Compliance & Privacy

```
- GDPR compliance for author data
- Privacy policy page
- Cookie consent (if analytics used)
- Data retention policy
- Right to be forgotten implementation
```

## Deployment Architecture

### Vercel Configuration

```yaml
# vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/journal/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/articles/(.+)",
      "dest": "/articles/$1",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "BLOB_READ_WRITE_TOKEN": "@blob-token"
  }
}
```

### Database (PostgreSQL)

```
Options:
1. Vercel Postgres (Recommended)
   - Integrated with Vercel
   - Connection pooling included
   - Automatic backups
   
2. Supabase
   - Generous free tier
   - Built-in admin panel
   - Real-time capabilities (future)
   
3. Railway / Render
   - Affordable
   - Easy setup
   
4. AWS RDS
   - Enterprise-grade
   - More control
```

### File Storage (PDFs)

```
Vercel Blob Storage (Recommended):
- Integrated with Vercel
- Global CDN
- Simple API
- Pay per use

Alternative: AWS S3 + CloudFront
```

### Domain Setup

```
1. Add Custom Domain in Vercel
   - journal.etthos.com

2. DNS Configuration
   - CNAME: journal.etthos.com → cname.vercel-dns.com
   - Wait for SSL certificate

3. Redirect Configuration
   - www.journal.etthos.com → journal.etthos.com
```

## Future-Proofing for Peer Review

### Database Design Considerations

```
Current tables are designed to extend:

Article:
- Currently stores published articles
- Can add: submissionDate, revisionDate
- Links to Manuscript table (future)

Manuscript (future):
- Submitted papers
- Links to Article when published
- Tracks workflow status

Review (future):
- Reviewer assignments
- Review content
- Decision tracking
- Timeline tracking

Workflow (future):
- Submission → Review → Revision → Decision
- Email notifications
- Deadline tracking
```

### API Extensibility

```typescript
// Design APIs with versioning:
/api/v1/articles  (current)
/api/v2/articles  (future - backward compatible)

// Separate submission APIs:
/api/submit/*     (future peer review)
/api/review/*     (future reviewer portal)
```

## Monitoring & Analytics

### Recommended Tools

```
1. Vercel Analytics
   - Page views
   - Performance metrics
   - Core Web Vitals

2. Google Analytics 4
   - Article engagement
   - Download tracking
   - User behavior

3. Google Search Console
   - SEO monitoring
   - Indexing status
   - Search performance

4. Sentry (Error Tracking)
   - Runtime errors
   - Performance monitoring
   - Alert notifications

5. Uptime Monitoring
   - Better Uptime / Checkly
   - 99.9% SLA target
```

### Key Metrics to Track

```
- Article page views
- PDF downloads
- Search queries
- Submission rate (future)
- Review turnaround time (future)
- Citation count (external tools)
- Geographic distribution
- Referral sources
```

## Maintenance Plan

### Regular Tasks

```
Daily:
- Monitor error logs
- Check PDF uploads
- Verify site uptime

Weekly:
- Review analytics
- Check storage usage
- Database backup verification

Monthly:
- Update dependencies
- Security audit
- Performance review
- Content audit

Quarterly:
- Database optimization
- Archive old logs
- Review access controls
- Update documentation

Annually:
- Renew domain/SSL
- Major version updates
- Compliance review
- Disaster recovery test
```

## Cost Estimation

```
Vercel:
- Pro Plan: $20/month (includes team features)
- Bandwidth: ~$20-40/month (with PDF downloads)

Database (Vercel Postgres):
- Pro Plan: $20/month
- Storage: ~$10/month (depends on volume)

Blob Storage:
- ~$5-15/month (PDF storage + bandwidth)

Domain:
- $10-15/year

Total: ~$75-100/month for production
```

## Success Criteria

### Phase 1: Launch (MVP)
✅ Journal website live at journal.etthos.com
✅ At least 1 published issue (minimum 5 articles)
✅ Editorial board page (minimum 5 members)
✅ All ISSN India requirements met
✅ Publisher information displayed
✅ Proper SEO implementation

### Phase 2: Growth (3-6 months)
- 3+ published issues
- Google Scholar indexing
- Apply for ISSN
- 50+ articles published
- Analytics dashboard

### Phase 3: Advanced (6-12 months)
- Manuscript submission system
- Peer review workflow
- Reviewer portal
- Apply for other indexing (Scopus, etc.)
- Impact factor tracking

## Supporting Documentation

Additional documents to create:
1. Author Guidelines (detailed)
2. Peer Review Policy (future)
3. Ethics Statement
4. Open Access Policy
5. Data Sharing Policy
6. Plagiarism Policy
7. Retraction Policy
8. Editorial Board Roles & Responsibilities
