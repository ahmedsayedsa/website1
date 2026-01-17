import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

async function checkAuth(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    if (!token) return false;
    return await verifyToken(token);
}

export async function GET(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const links = await prisma.socialMediaLinks.findMany({
            orderBy: { displayOrder: 'asc' },
        });
        return NextResponse.json(links);
    } catch (error) {
        console.error('Error fetching social links:', error);
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { platform, url, enabled, displayOrder } = body;

        const link = await prisma.socialMediaLinks.create({
            data: { platform, url, enabled, displayOrder },
        });

        return NextResponse.json(link, { status: 201 });
    } catch (error) {
        console.error('Error creating social link:', error);
        return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...updates } = body;

        const link = await prisma.socialMediaLinks.update({
            where: { id },
            data: updates,
        });

        return NextResponse.json(link);
    } catch (error) {
        console.error('Error updating social link:', error);
        return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.socialMediaLinks.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting social link:', error);
        return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
    }
}
