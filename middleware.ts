import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if path is protected (starts with /en/admin or /ar/admin)
    // AND is not the login page
    const isProtected = (pathname.startsWith('/en/admin') || pathname.startsWith('/ar/admin'))
        && !pathname.includes('/login');

    if (isProtected) {
        const token = request.cookies.get('session')?.value;
        const verifiedToken = token && await verifyToken(token);

        if (!verifiedToken) {
            // Redirect to login page for the current locale
            const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
            const url = new URL(`/${locale}/admin/login`, request.url);
            return NextResponse.redirect(url);
        }
    }

    // 2. Run i18n middleware
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ar|en)/:path*']
};
