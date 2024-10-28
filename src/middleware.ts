import { NextRequest, NextResponse } from 'next/server';

const guestRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
const adminRoutes = ['/admin'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;


    // Guest route token validation
    if (pathname.startsWith('/login')) {
        const token = req.cookies.get('token');
        if (token) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
    }

    // Admin route token validation
    if (pathname.startsWith('/admin')) {
        const token = req.cookies.get('token');

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

    }
    // Allow the request to proceed
    return NextResponse.next();
}

