import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Helper to check auth
async function checkAuth(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    if (!token) return false;
    return await verifyToken(token);
}

export async function POST(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();

        // Validation
        if (!body.titleEn || !body.contentEn || !body.slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newPost = await prisma.blog.create({
            data: {
                titleEn: body.titleEn,
                titleAr: body.titleAr,
                slug: body.slug,
                excerptEn: body.excerptEn,
                excerptAr: body.excerptAr,
                contentEn: body.contentEn,
                contentAr: body.contentAr,
                featuredImage: body.featuredImage,
                published: body.published ?? true,
                author: 'Admin', // Placeholder or from session
                tags: body.tags ?? []
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
