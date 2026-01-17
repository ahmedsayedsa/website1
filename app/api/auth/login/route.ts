import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Hardcoded admin check for prototype
        // In production, fetch user from DB and compare hashes
        if (email === 'admin@elmaali.com' && password === 'admin123') {
            const user = { email, role: 'ADMIN' };
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
            const token = await signToken({ user, expires });

            // Set cookie
            (await cookies()).set('session', token, { expires, httpOnly: true, path: '/' });

            return NextResponse.json({ success: true, user });
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
