import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;


  if (pathname === '/signin' && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.startsWith('/dashboard') && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin'],
};
