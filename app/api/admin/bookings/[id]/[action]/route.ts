import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Helper to check auth
async function checkAuth(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    if (!token) return false;
    return await verifyToken(token);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const isAuth = await checkAuth(request);
    if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const bookingId = params.id;
    const action = request.nextUrl.pathname.split('/').pop(); // 'approve' or 'cancel'

    let status: 'CONFIRMED' | 'CANCELLED';
    if (action === 'approve') status = 'CONFIRMED';
    else if (action === 'cancel') status = 'CANCELLED';
    else return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    try {
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });

        // Return redirect to refresh the page
        return NextResponse.redirect(new URL(`/admin/bookings/${bookingId}`, request.url));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
