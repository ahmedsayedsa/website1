import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key-change-this-in-env';
const key = new TextEncoder().encode(SECRET_KEY);

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function login(formData: FormData) {
    // In a real app, verify credentials against DB
    // For prototype/initial admin, we can check env vars or hardcoded first
    const email = formData.get('email');
    const password = formData.get('password');

    // Hardcoded Admin for initial setup
    if (email === 'admin@elmaali.com' && password === 'admin123') {
        const user = { email, role: 'ADMIN' };

        // Create the session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const session = await signToken({ user, expires });

        // Save the session in a cookie
        const cookieStore = await cookies();
        cookieStore.set('session', session, { expires, httpOnly: true });

        return true;
    }

    return false;
}

export async function logout() {
    (await cookies()).set('session', '', { expires: new Date(0) });
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if (!session) return null;
    return await verifyToken(session);
}
