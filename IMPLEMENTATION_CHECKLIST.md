# 🚀 Quick Implementation Checklist

Step-by-step guide to get your Etthos Journal system running in production.

---

## Phase 1: Initial Setup (Day 1) ✅

### 1. Database Setup
- [ ] Create PostgreSQL database (Vercel Postgres / Supabase / Railway)
- [ ] Copy connection string
- [ ] Update `.env.local` with `DATABASE_URL`
- [ ] Confirm `packages/database/prisma/schema.prisma` matches the desired database model
- [ ] Generate Prisma client: `pnpm db:generate`
- [ ] Run migrations: `pnpm prisma migrate dev --name init`
- [ ] Seed database: `pnpm tsx apps/journal/scripts/seed-journal.ts`

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `DATABASE_URL`
- [ ] Generate strong `JWT_SECRET` (32+ chars)
- [ ] Generate `ADMIN_API_KEY`
- [ ] Set `NEXT_PUBLIC_APP_URL`

### 3. Test Locally
- [ ] Run dev server: `pnpm dev --filter=journal`
- [ ] Visit http://localhost:3000
- [ ] Verify homepage loads with seeded data
- [ ] Test article pages: `/articles/efficacy-cbt-treating-depression-meta-analysis`
- [ ] Test issue page: `/issues/volume-1-issue-1`
- [ ] Test editorial board: `/editorial-board`

### 4. Admin Access
- [ ] Login at `/admin` with:
  - Email: `admin@etthos.com`
  - Password: `admin123`
- [ ] **Change password immediately!**
- [ ] Explore admin dashboard
- [ ] Test creating a test article

**✅ Checkpoint:** Journal running locally with sample data

---

## Phase 2: Customization (Days 2-3) 📝

### 1. Update Journal Information
- [ ] Open Prisma Studio: `pnpm prisma studio`
- [ ] Update `Journal` table:
  - [ ] Actual publisher address
  - [ ] Contact information
  - [ ] Subject keywords
- [ ] Update `EditorialBoardMember` table:
  - [ ] Replace seed data with actual board members
  - [ ] Ensure minimum 5 members (ISSN requirement)
  - [ ] Verify institutional emails
  - [ ] Add profile images

### 2. Content Pages
Edit these files in `apps/journal/src/app/`:
- [ ] `about/page.tsx` - About the journal
- [ ] `about/aims-scope/page.tsx` - Research focus
- [ ] `about/publisher/page.tsx` - Publisher details (ISSN requirement)
- [ ] `guidelines/page.tsx` - Author guidelines
- [ ] `policies/ethics/page.tsx` - Ethics policy
- [ ] `contact/page.tsx` - Contact information

### 3. Branding
- [ ] Add journal logo to `public/images/logo.svg`
- [ ] Update favicon: `public/favicon.ico`
- [ ] Customize colors in `tailwind.config.ts`
- [ ] Update header/footer in `components/layout/`

### 4. First Real Issue
- [ ] Prepare first issue with minimum 5 articles
- [ ] For each article:
  - [ ] Add authors (via admin dashboard)
  - [ ] Upload PDF to Vercel Blob
  - [ ] Enter complete metadata
  - [ ] Add keywords (5-8 per article)
  - [ ] Add references
  - [ ] Generate citations
- [ ] Review and publish issue

**✅ Checkpoint:** Customized journal with first real issue

---

## Phase 3: Production Deployment (Day 4) 🌐

### 1. Vercel Setup
- [ ] Create Vercel account (if not exists)
- [ ] Install Vercel CLI: `pnpm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Link project: `vercel link`

### 2. Production Database
- [ ] Create production PostgreSQL database
- [ ] Run migrations: `pnpm prisma migrate deploy`
- [ ] Seed production data (optional): `pnpm tsx apps/journal/scripts/seed-journal.ts`

### 3. Environment Variables
Add to Vercel:
- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET` (generate new for production!)
- [ ] `ADMIN_API_KEY` (generate new for production!)
- [ ] `BLOB_READ_WRITE_TOKEN` (Vercel Blob token)
- [ ] `NEXT_PUBLIC_APP_URL=https://journal.etthos.com`
- [ ] `NEXT_PUBLIC_MAIN_SITE_URL=https://etthos.com`

### 4. Deploy
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Wait for deployment to complete
- [ ] Verify deployment URL works

### 5. Custom Domain
- [ ] Add domain in Vercel: `journal.etthos.com`
- [ ] Configure DNS:
  ```
  Type: CNAME
  Name: journal
  Value: cname.vercel-dns.com
  ```
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify SSL certificate is active

### 6. Post-Deployment Verification
- [ ] Test homepage: https://journal.etthos.com
- [ ] Test article pages
- [ ] Test PDF downloads
- [ ] Test search functionality
- [ ] Test admin login
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit (aim for 90+ scores)

**✅ Checkpoint:** Journal live in production

---

## Phase 4: ISSN Application (Week 2) 📋

### 1. Pre-Application Checklist
Verify all ISSN India requirements:
- [ ] Minimum 5 articles published in first issue
- [ ] Editorial board has minimum 5 members
- [ ] All board members have:
  - [ ] Official institutional email
  - [ ] Complete affiliation details
  - [ ] Designation and department
- [ ] Publisher information page is complete
- [ ] Each article has unique permanent URL
- [ ] Articles displayed individually (not only as PDFs)
- [ ] Clear link to main organization website
- [ ] No misleading information about indexing/impact factor

### 2. Prepare Application Documents
- [ ] Screenshot of homepage
- [ ] Screenshot of issue page
- [ ] Screenshot of sample article page
- [ ] Screenshot of editorial board page
- [ ] Screenshot of publisher information page
- [ ] List of board members (Excel format)
- [ ] List of first issue articles
- [ ] Organization registration documents

### 3. Submit ISSN Application
- [ ] Visit: https://issn.org/ or your national center
- [ ] Fill out application form
- [ ] Upload required documents
- [ ] Pay application fee (if applicable)
- [ ] Submit application

### 4. After ISSN Approval
- [ ] Update `Journal` table with ISSN and e-ISSN
- [ ] Display ISSN on website header
- [ ] Add ISSN to all article metadata
- [ ] Update DOI registration (if applicable)

**✅ Checkpoint:** ISSN application submitted

---

## Phase 5: SEO & Indexing (Week 3-4) 🔍

### 1. Google Search Console
- [ ] Add property: https://journal.etthos.com
- [ ] Verify ownership
- [ ] Submit sitemap: `/sitemap.xml`
- [ ] Request indexing for key pages

### 2. Google Scholar
- [ ] Ensure meta tags are correct (`citation_*` tags)
- [ ] Publish at least 10 articles
- [ ] Wait for automatic indexing (2-3 months)
- [ ] Or apply manually after meeting requirements

### 3. Analytics Setup
- [ ] Setup Google Analytics 4
- [ ] Add tracking code
- [ ] Configure events (article views, downloads)
- [ ] Setup Search Console integration

### 4. Monitoring
- [ ] Setup Sentry for error tracking
- [ ] Configure uptime monitoring (Better Uptime / Checkly)
- [ ] Setup alerts for downtime
- [ ] Configure backup monitoring

**✅ Checkpoint:** SEO optimized and monitored

---

## Phase 6: Growth & Optimization (Ongoing) 📈

### Weekly Tasks
- [ ] Publish new articles
- [ ] Review analytics
- [ ] Check error logs
- [ ] Respond to author inquiries
- [ ] Update content

### Monthly Tasks
- [ ] Update dependencies: `pnpm update`
- [ ] Review security alerts
- [ ] Database performance audit
- [ ] Content audit
- [ ] SEO review

### Quarterly Tasks
- [ ] Publish new issue
- [ ] Review editorial board
- [ ] Apply to additional indexes
- [ ] User feedback survey
- [ ] Feature planning

**✅ Checkpoint:** Sustainable operations

---

## Common Issues & Solutions 🔧

### Issue: Database connection fails
```bash
# Solution: Check connection string format
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Issue: Prisma client not found
```bash
# Solution: Regenerate Prisma client
pnpm db:generate
```

### Issue: "Module not found" errors
```bash
# Solution: Install dependencies
pnpm install
```

### Issue: Build fails on Vercel
```bash
# Solution: Check environment variables are set in Vercel dashboard
# Ensure DATABASE_URL is set correctly
```

### Issue: PDF upload fails
```bash
# Solution: Check BLOB_READ_WRITE_TOKEN is set
# Verify file size is under 10MB
```

### Issue: Can't login to admin
```bash
# Solution: Reset password in database
# Or reseed database to get default credentials
```

---

## Performance Targets 🎯

### Lighthouse Scores (aim for 90+)
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

### Load Times
- [ ] Homepage: < 2 seconds
- [ ] Article page: < 2 seconds
- [ ] PDF download: < 3 seconds
- [ ] Search results: < 1 second

### Uptime
- [ ] Target: 99.9% uptime
- [ ] Monitor with: Better Uptime / Pingdom

---

## Security Checklist 🔒

### Pre-Production
- [ ] Change default admin password
- [ ] Generate new JWT_SECRET for production
- [ ] Generate new ADMIN_API_KEY for production
- [ ] Review all environment variables
- [ ] Remove any test/debug code
- [ ] Enable rate limiting
- [ ] Configure CORS correctly

### Post-Production
- [ ] Regular dependency updates
- [ ] Monitor security alerts
- [ ] Review access logs
- [ ] Regular backups
- [ ] Incident response plan

---

## Support Resources 📚

### Documentation
- [System Architecture](./JOURNAL_ARCHITECTURE.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [API Reference](./API_ROUTES.md)
- [Deployment Guide](./DEPLOYMENT_SECURITY.md)

### External Resources
- [ISSN India Guidelines](https://niscair.res.in/issn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

### Getting Help
- Technical Issues: Check error logs in Vercel dashboard
- Database Issues: Check Prisma Studio
- Deployment Issues: Check Vercel build logs
- Questions: Refer to documentation first

---

## Success Metrics 📊

### Launch Targets
- [ ] Website live and accessible
- [ ] First issue published (5+ articles)
- [ ] Editorial board complete (5+ members)
- [ ] ISSN application submitted
- [ ] All pages indexed by Google

### 3-Month Targets
- [ ] 3 issues published
- [ ] 20+ articles published
- [ ] Google Scholar indexed
- [ ] 1000+ monthly visitors
- [ ] 500+ PDF downloads

### 6-Month Targets
- [ ] ISSN received
- [ ] 5+ issues published
- [ ] 40+ articles published
- [ ] DOI registration complete
- [ ] 5000+ monthly visitors

### 12-Month Targets
- [ ] 8+ issues published
- [ ] 60+ articles published
- [ ] Indexed in major databases
- [ ] Apply for more indexing (Scopus, etc.)
- [ ] Manuscript submission system live

---

## 🎉 Congratulations!

You now have a production-ready, ISSN-compliant academic journal system!

### Next Steps
1. ✅ Complete Phase 1-3 checklist
2. 📝 Customize content
3. 🚀 Deploy to production
4. 📋 Apply for ISSN
5. 📈 Grow your journal

### Remember
- Quality over quantity
- ISSN compliance is critical
- Regular content updates
- Engage with your community
- Monitor and optimize continuously

**Need help?** Refer to the comprehensive documentation or contact support.

---

Good luck with your journal! 🎓📚
