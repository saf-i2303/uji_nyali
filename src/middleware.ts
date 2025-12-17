import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  //public pages
  const publicPages = ["/", "/login"];

  const isPublic = publicPages.includes(pathname);

  // debug log
  if (
    process.env.NODE_ENV === "development" &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    console.log("ROLE:", token?.role);
    console.log("TOKEN:", token);
  }

 
  if (token && isPublic) {
    const redirectPath = getHomeByRole(token.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }


  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/petugas") ||
    pathname.startsWith("/user");


  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
  if (token && isProtected) {
    const allowed = getHomeByRole(token.role);

    if (!pathname.startsWith(allowed)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

/**
 * Mapping role  default homepage/path
 */
function getHomeByRole(role?: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "guru":
      return "/petugas";
    case "siswa":
      return "/user";
    default:
      return "/";
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/petugas/:path*",
    "/user/:path*",
  ],
};
