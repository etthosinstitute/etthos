# Etthos Journal Workflow

This app now runs on PostgreSQL and supports a stored review workflow with dashboard state plus SMTP notifications.

## Current Stack

- App: Next.js journal app in `/Users/riteshhooda/Desktop/etthos-1/apps/journal`
- Database: PostgreSQL `journal`
- Prisma schema: `/Users/riteshhooda/Desktop/etthos-1/packages/database/prisma/schema.prisma`
- Mail transport: Gmail SMTP via `nodemailer`

## Environment

The journal app expects these values in `/Users/riteshhooda/Desktop/etthos-1/apps/journal/.env`:

```env
DATABASE_URL="postgresql://ritesh:ritesh25@localhost:5432/journal"
APP_URL="http://localhost:3000"
EMAIL_USER=etthosjournal@gmail.com
EMAIL_PASS="..."
REVIEW_INBOX_EMAIL=spider20251@gmail.com
CONTACT_INBOX_EMAIL=spider20251@gmail.com
JWT_SECRET="use-a-long-random-secret-at-least-32-chars"
UPLOAD_DIR="/absolute/path/for/manuscript-uploads"
MAX_UPLOAD_MB=10
```

## Dashboard Roles

### Author

The author can:

- sign up and log in
- submit a manuscript
- open `/dashboard`
- track manuscript status
- see assigned reviewers and review progress

### Editor

The editor can:

- log in and open `/dashboard`
- view all manuscripts
- assign a reviewer
- set due date and editorial notes
- trigger review invitation emails
- track reviewer responses and submitted reviews

### Reviewer

The reviewer can:

- log in and open `/dashboard`
- see assigned manuscripts
- accept or decline invitations
- submit review comments and decision
- send review content to the editorial inbox through SMTP

## End-to-End Flow

### 1. Author submission

1. Sign up or log in as an author.
2. Open `/submit`.
3. Upload the manuscript file plus title and abstract.
4. The system stores the file and creates the manuscript in PostgreSQL with status `SUBMITTED`.

### 2. Editor assignment

1. Log in as editor.
2. Open `/dashboard`.
3. In the editorial assignment board, select a reviewer.
4. Optionally add due date and editorial notes.
5. Click `Assign Reviewer`.
6. The system:
   - creates a `review_assignments` row
   - updates the manuscript to `UNDER_REVIEW`
   - sends a review invitation email to the reviewer

### 3. Reviewer response

1. Log in as reviewer.
2. Open `/dashboard`.
3. Accept or decline the invitation.
4. The system:
   - updates assignment status
   - emails the editorial inbox with the reviewer response

### 4. Reviewer submission

1. The reviewer writes comments in the dashboard.
2. The reviewer chooses a decision:
   - `ACCEPT`
   - `MINOR_REVISIONS`
   - `MAJOR_REVISIONS`
   - `REJECT`
3. Click `Submit Review`.
4. The system:
   - creates a `reviews` row
   - links it to the assignment
   - updates manuscript status
   - emails the editorial inbox at `spider20251@gmail.com`

## Mail Behavior

Mail is handled in `/Users/riteshhooda/Desktop/etthos-1/apps/journal/src/lib/mail.ts`.

Current events that send email:

- manuscript submission
- reviewer assignment
- reviewer accept or decline
- reviewer review submission

Current recipient behavior:

- manuscript submission goes to the editorial inbox
- reviewer invitation goes to the reviewer
- reviewer response goes to the editorial inbox
- submitted review goes to the editorial inbox

## Production Notes

- `JWT_SECRET` is now required and validated at startup.
- Mail links use `APP_URL`, so set it to your production domain before launch.
- Manuscript uploads now go through `/api/uploads/manuscript`.
- Local-disk upload storage works for a traditional server deployment. If you deploy on ephemeral/serverless infrastructure, move the storage layer to S3, R2, or similar object storage.
- Real editorial board and journal metadata can be reapplied to the Postgres database with `/Users/riteshhooda/Desktop/etthos-1/apps/journal/scripts/sync-production-content.sql`.

## Important Routes

- Public submit page: `/submit`
- Dashboard: `/dashboard`
- Auth login API: `/api/auth/login`
- Auth signup API: `/api/auth/signup`
- Manuscripts API: `/api/manuscripts`
- Assign reviewer API: `/api/manuscripts/[id]/assign`
- Submit review API: `/api/reviews`
- Reviewer pending API: `/api/reviews/pending`
- Reviewer response API: `/api/review-assignments/[id]/respond`
- Dashboard data API: `/api/dashboard`

## Local Test Accounts

These accounts are seeded for workflow testing:

- Editor: `editor@journal.com / Editor@123`
- Reviewer: `reviewer@journal.com / Reviewer@123`

You can create an author from the signup page, or add one manually for testing.

## Start the App

From the repo root:

```bash
pnpm --dir apps/journal dev
```

Open [http://localhost:3000](http://localhost:3000).

## Suggested Test Flow

1. Start the app.
2. Sign up a fresh author account.
3. Submit one manuscript.
4. Log in as `editor@journal.com`.
5. Assign `reviewer@journal.com`.
6. Check that the reviewer receives the invitation email.
7. Log in as `reviewer@journal.com`.
8. Accept the invitation.
9. Submit the review.
10. Confirm that the review reaches `spider20251@gmail.com`.

## Notes

- The review workflow is now DB-backed and mail-backed.
- The public article and issue pages may still use static site data in some places; the dashboard and workflow use PostgreSQL.
- If `.next` has stale route artifacts, remove the app cache and restart the dev server.
