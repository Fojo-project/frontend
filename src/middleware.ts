import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authPages = ['/signin', '/signup'];
  const protectedRoutes = ['/dashboard'];
  const token = request.cookies.get('SESSION_COOKIE')?.value;

  if (token && authPages.includes(pathname)) {
    const redirectPath =
      request.nextUrl.searchParams.get('redirect') || '/dashboard';
    const redirectUrl = new URL(redirectPath, request.url);
    return NextResponse.redirect(redirectUrl);
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
