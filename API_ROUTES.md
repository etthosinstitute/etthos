# Etthos Journal API Routes Documentation

Complete API specification for the Etthos Journal system.

## Base URL
```
Production:  https://journal.etthos.com/api
Local:       http://localhost:3000/api
```

## Authentication

### Admin Routes
Protected routes require authentication header:
```
Authorization: Bearer <JWT_TOKEN>
```

Or API key for server-to-server:
```
X-API-Key: <ADMIN_API_KEY>
```

## Response Format

### Success Response
```json
{
  "data": { ... },
  "success": true
}
```

### Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "success": false
}
```

### Paginated Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 100,
    "totalPages": 5
  },
  "success": true
}
```

---

## Public API Routes

### Articles

#### `GET /api/articles`
Get list of published articles with pagination.

**Query Parameters:**
```typescript
{
  page?: number          // Default: 1
  perPage?: number       // Default: 20, Max: 100
  sort?: "date" | "title" | "views" | "downloads"  // Default: "date"
  order?: "asc" | "desc" // Default: "desc"
  type?: ArticleType     // Filter by article type
  issueId?: string       // Filter by issue
  year?: number          // Filter by publication year
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "title": "Cognitive Behavioral Therapy Study",
      "slug": "cognitive-behavioral-therapy-study",
      "abstract": "Abstract text...",
      "type": "RESEARCH_ARTICLE",
      "publishedDate": "2024-03-15T00:00:00Z",
      "doi": "10.xxxxx/etthos.v1i1.001",
      "views": 150,
      "downloads": 45,
      "issue": {
        "id": "clx...",
        "number": 1,
        "volume": {
          "number": 1,
          "year": 2024
        }
      },
      "authors": [
        {
          "author": {
            "id": "clx...",
            "firstName": "John",
            "lastName": "Doe",
            "orcid": "0000-0002-1234-5678"
          },
          "order": 1,
          "isCorresponding": true
        }
      ],
      "keywords": [
        { "keyword": { "name": "CBT" } },
        { "keyword": { "name": "Depression" } }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 50,
    "totalPages": 3
  },
  "success": true
}
```

**Example:**
```bash
curl "https://journal.etthos.com/api/articles?page=1&perPage=10&sort=date"
```

---

#### `GET /api/articles/[id]`
Get single article by ID or slug.

**Path Parameters:**
- `id` - Article ID or slug

**Query Parameters:**
```typescript
{
  includeReferences?: boolean  // Default: true
  includeCitations?: boolean   // Default: true
}
```

**Response:**
```json
{
  "data": {
    "id": "clx...",
    "title": "Cognitive Behavioral Therapy Study",
    "slug": "cognitive-behavioral-therapy-study",
    "abstract": "Full abstract...",
    "type": "RESEARCH_ARTICLE",
    "publishedDate": "2024-03-15T00:00:00Z",
    "doi": "10.xxxxx/etthos.v1i1.001",
    "pdfUrl": "https://blob.vercel-storage.com/...",
    "pageStart": 1,
    "pageEnd": 15,
    "views": 150,
    "downloads": 45,
    "issue": {
      "id": "clx...",
      "number": 1,
      "title": null,
      "volume": {
        "number": 1,
        "year": 2024
      }
    },
    "authors": [
      {
        "author": {
          "id": "clx...",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@university.edu",
          "orcid": "0000-0002-1234-5678",
          "profileImageUrl": "https://..."
        },
        "order": 1,
        "isCorresponding": true,
        "correspondingEmail": "john.doe@university.edu",
        "affiliationAtPublication": "University of Delhi"
      }
    ],
    "keywords": [
      { "keyword": { "name": "Cognitive Behavioral Therapy" } },
      { "keyword": { "name": "Depression" } },
      { "keyword": { "name": "Mental Health" } }
    ],
    "references": [
      {
        "order": 1,
        "text": "Smith, J. (2020). Psychology Today...",
        "doi": "10.1234/example"
      }
    ],
    "citations": [
      {
        "format": "APA",
        "text": "Doe, J. (2024). Cognitive Behavioral Therapy Study..."
      },
      {
        "format": "MLA",
        "text": "Doe, John. \"Cognitive Behavioral Therapy Study.\""
      }
    ],
    "funding": null,
    "conflictOfInterest": "The authors declare no conflicts of interest.",
    "acknowledgments": "We thank...",
    "ethicsApproval": "Approved by IRB #12345"
  },
  "success": true
}
```

**Example:**
```bash
curl "https://journal.etthos.com/api/articles/cognitive-behavioral-therapy-study"
```

---

#### `GET /api/articles/[id]/pdf`
Download article PDF.

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="article-title.pdf"`

**Headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Example:**
```bash
curl -OJ "https://journal.etthos.com/api/articles/clx.../pdf"
```

---

#### `POST /api/articles/[id]/track-view`
Track article view (for analytics).

**Body:**
```json
{
  "referrer": "https://google.com",
  "country": "IN"  // Optional, can be determined server-side
}
```

**Response:**
```json
{
  "success": true
}
```

---

### Issues

#### `GET /api/issues`
Get list of published issues.

**Query Parameters:**
```typescript
{
  page?: number
  perPage?: number
  volumeId?: string    // Filter by volume
  year?: number        // Filter by year
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "number": 1,
      "title": "Special Issue on Trauma Psychology",
      "published": true,
      "publishedDate": "2024-03-01T00:00:00Z",
      "coverImageUrl": "https://...",
      "volume": {
        "number": 1,
        "year": 2024
      },
      "_count": {
        "articles": 8
      }
    }
  ],
  "pagination": { ... },
  "success": true
}
```

---

#### `GET /api/issues/[id]`
Get single issue with articles.

**Response:**
```json
{
  "data": {
    "id": "clx...",
    "number": 1,
    "title": "Special Issue on Trauma Psychology",
    "description": "This special issue...",
    "published": true,
    "publishedDate": "2024-03-01T00:00:00Z",
    "coverImageUrl": "https://...",
    "volume": {
      "number": 1,
      "year": 2024,
      "journal": {
        "name": "Etthos Journal of Psychology"
      }
    },
    "articles": [
      {
        "id": "clx...",
        "title": "Article Title",
        "slug": "article-slug",
        "abstract": "Abstract...",
        "type": "RESEARCH_ARTICLE",
        "publishedDate": "2024-03-15T00:00:00Z",
        "pageStart": 1,
        "pageEnd": 15,
        "authors": [...]
      }
    ]
  },
  "success": true
}
```

---

### Editorial Board

#### `GET /api/board`
Get editorial board members.

**Query Parameters:**
```typescript
{
  role?: BoardRole     // Filter by role
  active?: boolean     // Default: true
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "firstName": "Jane",
      "lastName": "Smith",
      "title": "Prof.",
      "email": "jane.smith@university.edu",
      "role": "EDITOR_IN_CHIEF",
      "position": "Editor-in-Chief",
      "designation": "Professor",
      "department": "Department of Psychology",
      "affiliation": {
        "institution": "University of Delhi",
        "city": "New Delhi",
        "country": "India"
      },
      "country": "India",
      "orcid": "0000-0002-5678-1234",
      "biography": "Prof. Smith has...",
      "expertise": ["Clinical Psychology", "Trauma"],
      "profileImageUrl": "https://...",
      "displayOrder": 1
    }
  ],
  "success": true
}
```

---

### Authors

#### `GET /api/authors`
Get list of authors.

**Query Parameters:**
```typescript
{
  page?: number
  perPage?: number
  search?: string      // Search by name
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "firstName": "John",
      "lastName": "Doe",
      "title": "Dr.",
      "email": "john.doe@university.edu",
      "orcid": "0000-0002-1234-5678",
      "biography": "Dr. Doe is...",
      "profileImageUrl": "https://...",
      "_count": {
        "articles": 5
      }
    }
  ],
  "pagination": { ... },
  "success": true
}
```

---

#### `GET /api/authors/[id]`
Get author profile.

**Response:**
```json
{
  "data": {
    "id": "clx...",
    "firstName": "John",
    "lastName": "Doe",
    "title": "Dr.",
    "email": "john.doe@university.edu",
    "orcid": "0000-0002-1234-5678",
    "biography": "Full biography...",
    "website": "https://johndoe.com",
    "profileImageUrl": "https://...",
    "affiliations": [
      {
        "affiliation": {
          "institution": "University of Delhi",
          "department": "Department of Psychology",
          "city": "New Delhi",
          "country": "India"
        },
        "position": "Associate Professor",
        "isPrimary": true,
        "current": true
      }
    ]
  },
  "success": true
}
```

---

#### `GET /api/authors/[id]/articles`
Get articles by author.

**Query Parameters:**
```typescript
{
  page?: number
  perPage?: number
}
```

**Response:**
```json
{
  "data": [
    {
      "article": {
        "id": "clx...",
        "title": "Article Title",
        "slug": "article-slug",
        "publishedDate": "2024-03-15T00:00:00Z",
        "issue": { ... }
      },
      "order": 1,
      "isCorresponding": true
    }
  ],
  "pagination": { ... },
  "success": true
}
```

---

### Search

#### `GET /api/search`
Full-text search across articles.

**Query Parameters:**
```typescript
{
  q: string            // Required: search query
  page?: number
  perPage?: number
  type?: ArticleType   // Filter by type
  year?: number        // Filter by year
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "title": "Article Title",
      "slug": "article-slug",
      "abstract": "Abstract with highlighted terms...",
      "relevance": 0.85,
      "publishedDate": "2024-03-15T00:00:00Z",
      "issue": { ... },
      "authors": [ ... ]
    }
  ],
  "query": "cognitive therapy",
  "pagination": { ... },
  "success": true
}
```

**Example:**
```bash
curl "https://journal.etthos.com/api/search?q=cognitive+therapy&page=1"
```

---

## Admin API Routes

All admin routes require authentication.

### Authentication

#### `POST /api/admin/auth/login`
Admin login.

**Body:**
```json
{
  "email": "admin@etthos.com",
  "password": "password"
}
```

**Response:**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "clx...",
      "email": "admin@etthos.com",
      "role": "ADMIN",
      "firstName": "Admin",
      "lastName": "User"
    }
  },
  "success": true
}
```

---

#### `POST /api/admin/auth/logout`
Admin logout (invalidate token).

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true
}
```

---

### Admin Articles

#### `POST /api/admin/articles`
Create new article.

**Body:**
```json
{
  "title": "Article Title",
  "slug": "article-title",
  "abstract": "Article abstract...",
  "type": "RESEARCH_ARTICLE",
  "issueId": "clx...",
  "pageStart": 1,
  "pageEnd": 15,
  "doi": "10.xxxxx/etthos.v1i1.001",
  "authors": [
    {
      "authorId": "clx...",
      "order": 1,
      "isCorresponding": true,
      "correspondingEmail": "author@example.com",
      "affiliationAtPublication": "University Name"
    }
  ],
  "keywords": ["keyword1", "keyword2"],
  "references": [
    {
      "order": 1,
      "text": "Reference text...",
      "doi": "10.1234/example"
    }
  ],
  "fundingInfo": "Funded by...",
  "conflictOfInterest": "None",
  "acknowledgments": "We thank...",
  "ethicsApproval": "IRB #12345"
}
```

**Response:**
```json
{
  "data": {
    "id": "clx...",
    "title": "Article Title",
    "slug": "article-title",
    ...
  },
  "success": true
}
```

---

#### `PUT /api/admin/articles/[id]`
Update article.

**Body:** Same as POST, all fields optional.

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

#### `DELETE /api/admin/articles/[id]`
Delete article (soft delete - unpublish).

**Response:**
```json
{
  "success": true
}
```

---

#### `POST /api/admin/articles/[id]/publish`
Publish article.

**Body:**
```json
{
  "publishedDate": "2024-03-15T00:00:00Z"  // Optional, defaults to now
}
```

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

#### `POST /api/admin/articles/[id]/unpublish`
Unpublish article.

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

### Admin Issues

#### `POST /api/admin/issues`
Create new issue.

**Body:**
```json
{
  "number": 1,
  "volumeId": "clx...",
  "title": "Special Issue Title",  // Optional
  "description": "Issue description...",  // Optional
  "coverImageUrl": "https://..."  // Optional
}
```

**Validation:**
- Issue must have at least 5 articles before publishing (ISSN requirement)

**Response:**
```json
{
  "data": {
    "id": "clx...",
    "number": 1,
    "title": "Special Issue Title",
    ...
  },
  "success": true
}
```

---

#### `PUT /api/admin/issues/[id]`
Update issue.

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

#### `POST /api/admin/issues/[id]/publish`
Publish issue.

**Validation:**
- Must have at least 5 articles (ISSN requirement)

**Body:**
```json
{
  "publishedDate": "2024-03-01T00:00:00Z"
}
```

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

### Admin Board

#### `POST /api/admin/board`
Add editorial board member.

**Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "title": "Prof.",
  "email": "jane.smith@university.edu",
  "role": "EDITOR_IN_CHIEF",
  "position": "Editor-in-Chief",
  "designation": "Professor",
  "department": "Department of Psychology",
  "affiliationId": "clx...",  // Or create new affiliation
  "country": "India",
  "orcid": "0000-0002-5678-1234",
  "biography": "Biography...",
  "expertise": ["Clinical Psychology"],
  "displayOrder": 1
}
```

**Validation:**
- Email must be institutional (not gmail, yahoo, etc.) per ISSN requirements
- Minimum 5 board members required

**Response:**
```json
{
  "data": {
    "id": "clx...",
    ...
  },
  "success": true
}
```

---

#### `PUT /api/admin/board/[id]`
Update board member.

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

#### `DELETE /api/admin/board/[id]`
Remove board member (soft delete - set isActive: false).

**Validation:**
- Cannot delete if it would result in fewer than 5 active members (ISSN requirement)

**Response:**
```json
{
  "success": true
}
```

---

### Admin Authors

#### `POST /api/admin/authors`
Create author.

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@university.edu",
  "title": "Dr.",
  "orcid": "0000-0002-1234-5678",
  "biography": "Biography...",
  "website": "https://johndoe.com",
  "affiliations": [
    {
      "affiliationId": "clx...",
      "position": "Professor",
      "isPrimary": true
    }
  ]
}
```

**Response:**
```json
{
  "data": {
    "id": "clx...",
    ...
  },
  "success": true
}
```

---

#### `PUT /api/admin/authors/[id]`
Update author.

**Response:**
```json
{
  "data": { ... },
  "success": true
}
```

---

### File Upload

#### `POST /api/admin/upload`
Upload file to Vercel Blob Storage.

**Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>
```

**Body (FormData):**
```
file: <file>
type: "pdf" | "image"
```

**Validation:**
- PDF files: max 10MB, must be valid PDF
- Images: max 5MB, must be jpg/png/webp

**Response:**
```json
{
  "data": {
    "url": "https://blob.vercel-storage.com/...",
    "size": 1234567,
    "contentType": "application/pdf"
  },
  "success": true
}
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', pdfFile);
formData.append('type', 'pdf');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

### Dashboard Statistics

#### `GET /api/admin/stats`
Get dashboard statistics.

**Response:**
```json
{
  "data": {
    "articles": {
      "total": 50,
      "published": 45,
      "draft": 5
    },
    "issues": {
      "total": 10,
      "published": 8
    },
    "authors": 30,
    "boardMembers": 12,
    "views": {
      "total": 15000,
      "thisMonth": 2500
    },
    "downloads": {
      "total": 5000,
      "thisMonth": 800
    },
    "topArticles": [
      {
        "id": "clx...",
        "title": "Most Viewed Article",
        "views": 500
      }
    ]
  },
  "success": true
}
```

---

## Rate Limiting

All API routes have rate limiting:

**Public Routes:**
- 100 requests per minute per IP
- 1000 requests per hour per IP

**Admin Routes:**
- 300 requests per minute
- 3000 requests per hour

**Upload Route:**
- 10 requests per minute
- 100 requests per hour

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

**Rate Limit Exceeded Response:**
```json
{
  "error": "Too many requests",
  "retryAfter": 60,
  "success": false
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Missing or invalid authentication |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Invalid input data |
| `DUPLICATE_ERROR` | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `SERVER_ERROR` | Internal server error |
| `ISSN_VALIDATION_ERROR` | ISSN requirement not met |

---

## Webhooks (Future)

For external integrations:

#### Article Published
```json
{
  "event": "article.published",
  "data": {
    "articleId": "clx...",
    "title": "Article Title",
    "doi": "10.xxxxx/...",
    "publishedAt": "2024-03-15T00:00:00Z"
  }
}
```

---

## SDKs & Client Libraries (Future)

```typescript
// TypeScript/JavaScript SDK
import { EtthosJournal } from '@etthos/journal-sdk';

const client = new EtthosJournal({
  baseUrl: 'https://journal.etthos.com',
  apiKey: 'API_KEY'
});

const articles = await client.articles.list({ page: 1 });
const article = await client.articles.get('article-slug');
```

---

## Testing

### Example Test (Jest)
```typescript
describe('GET /api/articles', () => {
  it('should return published articles', async () => {
    const response = await fetch('/api/articles?page=1');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeInstanceOf(Array);
    expect(data.pagination).toBeDefined();
  });
});
```

---

## API Versioning (Future)

When breaking changes are needed:
```
/api/v1/articles  (current)
/api/v2/articles  (future)
```

Maintain backward compatibility for at least 6 months.
