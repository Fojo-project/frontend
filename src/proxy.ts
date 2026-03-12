import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const session = await getSessionCookie();

  const token = typeof session === "string" ? session : session?.token;
  const roles = typeof session === "string" ? [] : session?.roles ?? [];

  const { pathname, searchParams } = request.nextUrl;

  const authPages = ["/signin", "/signup"];
  const protectedRoutes = ["/dashboard"];
  const adminOnlyRoutes = ["/dashboard/admin"];

  const isAuthPage = authPages.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdmin = roles.includes("admin");

  /**
   * Prevent logged-in users from accessing auth pages
   */
  if (token && isAuthPage) {
    const redirectPath = searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  /**
   * Redirect unauthenticated users to signin
   */
  if (!token && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  /**
   * Block non-admin users from admin routes
   */
  if (token && isAdminRoute && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};