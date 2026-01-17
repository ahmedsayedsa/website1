import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

async function checkAuth(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    if (!token) return false;
    return await verifyToken(token);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { field, value } = body;

        if (!field || value === undefined) {
            return NextResponse.json(
                { error: 'Field and value are required' },
                { status: 400 }
            );
        }

        // Validate field is allowed to be edited
        const allowedFields = [
            'titleEn',
            'titleAr',
            'descriptionEn',
            'descriptionAr',
            'price',
            'duration',
            'category',
        ];

        if (!allowedFields.includes(field)) {
            return NextResponse.json(
                { error: 'Field not allowed for inline editing' },
                { status: 400 }
            );
        }

        const updatedPackage = await prisma.package.update({
            where: { id: params.id },
            data: { [field]: value },
        });

        return NextResponse.json(updatedPackage);
    } catch (error) {
        console.error('Inline edit error:', error);
        return NextResponse.json(
            { error: 'Failed to update package' },
            { status: 500 }
        );
    }
}
