// Example API Route Implementation
// Path: apps/journal/src/app/api/articles/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { z } from 'zod';

// ============================================================================
// TYPES
// ============================================================================

const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(20),
  sort: z.enum(['date', 'title', 'views', 'downloads']).default('date'),
  order: z.enum(['asc', 'desc']).default('desc'),
  type: z.enum(['RESEARCH_ARTICLE', 'REVIEW_ARTICLE', 'CASE_STUDY', 'SHORT_COMMUNICATION']).optional(),
  issueId: z.string().cuid().optional(),
  year: z.coerce.number().min(2024).max(2100).optional(),
});

// ============================================================================
// GET /api/articles - List published articles with pagination
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query parameters
    const params = QuerySchema.safeParse({
      page: searchParams.get('page'),
      perPage: searchParams.get('perPage'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
      type: searchParams.get('type'),
      issueId: searchParams.get('issueId'),
      year: searchParams.get('year'),
    });
    
    if (!params.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: params.error.flatten(),
          success: false,
        },
        { status: 400 }
      );
    }
    
    const { page, perPage, sort, order, type, issueId, year } = params.data;
    
    // Build where clause
    const where: any = {
      published: true,
    };
    
    if (type) {
      where.type = type;
    }
    
    if (issueId) {
      where.issueId = issueId;
    }
    
    if (year) {
      where.issue = {
        volume: {
          year,
        },
      };
    }
    
    // Build orderBy clause
    let orderBy: any;
    switch (sort) {
      case 'date':
        orderBy = { publishedDate: order };
        break;
      case 'title':
        orderBy = { title: order };
        break;
      case 'views':
        orderBy = { views: order };
        break;
      case 'downloads':
        orderBy = { downloads: order };
        break;
      default:
        orderBy = { publishedDate: 'desc' };
    }
    
    // Calculate pagination
    const skip = (page - 1) * perPage;
    
    // Execute queries in parallel
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        include: {
          issue: {
            include: {
              volume: {
                select: {
                  number: true,
                  year: true,
                },
              },
            },
          },
          authors: {
            include: {
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  orcid: true,
                },
              },
            },
            orderBy: {
              order: 'asc',
            },
          },
          keywords: {
            include: {
              keyword: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ]);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / perPage);
    
    // Return response with caching headers
    return NextResponse.json(
      {
        data: articles,
        pagination: {
          page,
          perPage,
          total,
          totalPages,
        },
        success: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
    
  } catch (error) {
    console.error('Error fetching articles:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch articles',
        success: false,
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// Example: GET /api/articles/[id]/route.ts - Get single article
// ============================================================================

/*
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Try to find by ID or slug
    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
        published: true,
      },
      include: {
        issue: {
          include: {
            volume: {
              include: {
                journal: {
                  select: {
                    name: true,
                    issn: true,
                  },
                },
              },
            },
          },
        },
        authors: {
          include: {
            author: {
              include: {
                affiliations: {
                  where: { current: true },
                  include: {
                    affiliation: true,
                  },
                },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        keywords: {
          include: {
            keyword: true,
          },
        },
        references: {
          orderBy: { order: 'asc' },
        },
        citations: true,
      },
    });
    
    if (!article) {
      return NextResponse.json(
        {
          error: 'Article not found',
          success: false,
        },
        { status: 404 }
      );
    }
    
    // Increment view count (async, don't wait)
    prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    }).catch(err => console.error('Failed to increment views:', err));
    
    return NextResponse.json(
      {
        data: article,
        success: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
    
  } catch (error) {
    console.error('Error fetching article:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch article',
        success: false,
      },
      { status: 500 }
    );
  }
}
*/

// ============================================================================
// Example: POST /api/admin/articles/route.ts - Create article (Protected)
// ============================================================================

/*
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { authenticate, requireAdmin } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

const ArticleSchema = z.object({
  title: z.string().min(10).max(500),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  abstract: z.string().min(150).max(3000),
  type: z.enum(['RESEARCH_ARTICLE', 'REVIEW_ARTICLE', 'CASE_STUDY', 'SHORT_COMMUNICATION']),
  issueId: z.string().cuid(),
  pageStart: z.number().int().positive(),
  pageEnd: z.number().int().positive(),
  doi: z.string().regex(/^10\.\d{4,}\//).optional(),
  authors: z.array(z.object({
    authorId: z.string().cuid(),
    order: z.number().int().positive(),
    isCorresponding: z.boolean(),
    correspondingEmail: z.string().email().optional(),
    affiliationAtPublication: z.string().optional(),
  })).min(1),
  keywords: z.array(z.string()).min(3).max(10),
  references: z.array(z.object({
    order: z.number().int().positive(),
    text: z.string(),
    doi: z.string().optional(),
    pmid: z.string().optional(),
    url: z.string().url().optional(),
  })).optional(),
  fundingInfo: z.string().optional(),
  conflictOfInterest: z.string().optional(),
  acknowledgments: z.string().optional(),
  ethicsApproval: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json(
        { error: auth.error, success: false },
        { status: auth.status }
      );
    }
    
    // Check admin role
    const adminCheck = requireAdmin(auth.user);
    if (adminCheck.error) {
      return NextResponse.json(
        { error: adminCheck.error, success: false },
        { status: adminCheck.status }
      );
    }
    
    // Parse and validate body
    const body = await request.json();
    const result = ArticleSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: result.error.flatten(),
          success: false,
        },
        { status: 400 }
      );
    }
    
    const data = result.data;
    
    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title);
    
    // Check if slug already exists
    const existing = await prisma.article.findUnique({
      where: { slug },
    });
    
    if (existing) {
      return NextResponse.json(
        {
          error: 'Article with this slug already exists',
          success: false,
        },
        { status: 409 }
      );
    }
    
    // Create article with all relations
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        abstract: data.abstract,
        type: data.type,
        issueId: data.issueId,
        pageStart: data.pageStart,
        pageEnd: data.pageEnd,
        doi: data.doi,
        fundingInfo: data.fundingInfo,
        conflictOfInterest: data.conflictOfInterest,
        acknowledgments: data.acknowledgments,
        ethicsApproval: data.ethicsApproval,
        published: false, // Draft by default
        
        // Create author relationships
        authors: {
          create: data.authors.map(author => ({
            authorId: author.authorId,
            order: author.order,
            isCorresponding: author.isCorresponding,
            correspondingEmail: author.correspondingEmail,
            affiliationAtPublication: author.affiliationAtPublication,
          })),
        },
        
        // Create or connect keywords
        keywords: {
          create: await Promise.all(
            data.keywords.map(async keyword => {
              const existing = await prisma.keyword.findUnique({
                where: { name: keyword },
              });
              
              if (existing) {
                return { keywordId: existing.id };
              }
              
              const newKeyword = await prisma.keyword.create({
                data: { name: keyword },
              });
              
              return { keywordId: newKeyword.id };
            })
          ),
        },
        
        // Create references if provided
        ...(data.references && {
          references: {
            create: data.references,
          },
        }),
      },
      include: {
        authors: {
          include: { author: true },
        },
        keywords: {
          include: { keyword: true },
        },
      },
    });
    
    return NextResponse.json(
      {
        data: article,
        success: true,
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating article:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to create article',
        success: false,
      },
      { status: 500 }
    );
  }
}
*/
