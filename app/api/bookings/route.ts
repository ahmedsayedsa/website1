import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // In a real app, validate body with Zod

        const booking = await prisma.booking.create({
            data: {
                ...body,
                status: 'PENDING',
            },
        });

        // Future: Send email notification here

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
