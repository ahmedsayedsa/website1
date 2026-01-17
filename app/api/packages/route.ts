import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const packages = await prisma.package.findMany({
            where: {
                published: true,
                ...(category ? { category } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newPackage = await prisma.package.create({
            data: {
                titleEn: body.titleEn,
                titleAr: body.titleAr,
                descriptionEn: body.descriptionEn,
                descriptionAr: body.descriptionAr,
                price: body.price,
                duration: body.duration,
                category: body.category,
                featuredImage: body.featuredImage,
                published: body.published ?? true,
                gallery: body.gallery ?? [],
                itineraryEn: body.itineraryEn ?? '',
                itineraryAr: body.itineraryAr ?? '',
                // Ensure defaults
                featured: body.featured ?? false,
            },
        });

        return NextResponse.json(newPackage, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
    }
}
