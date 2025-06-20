import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) {
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (pathname.startsWith('/auth')) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/:path*'],
};
