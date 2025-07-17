import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from './lib/session';

export async function middleware(request: NextRequest) {
  const token = await getSessionCookie();
  const pathname = request.nextUrl.pathname;
  const authPages = ['/signin', '/signup'];

  if (token && authPages.includes(pathname))
    return NextResponse.redirect(new URL('/dashboard', request.url));

  if (pathname.startsWith('/dashboard') && !token)
    return NextResponse.redirect(new URL('/signin', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin'],
};
