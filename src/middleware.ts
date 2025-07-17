import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from './lib/session';

export async function middleware(request: NextRequest) {
  const token = await getSessionCookie();
  const { pathname } = request.nextUrl;
  const authPages = ['/signin', '/signup'];
  const protectedRoutes = ['/dashboard'];

  if (token && authPages.includes(pathname)) {
    const url = request.nextUrl.clone();
    const redirect = url.searchParams.get('redirect');
    return NextResponse.redirect(
      redirect
        ? new URL(redirect, request.url)
        : new URL('/dashboard', request.url)
    );
  }

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
};
