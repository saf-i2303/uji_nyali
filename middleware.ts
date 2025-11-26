import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
      console.log(" MIDDLEWARE JALAN NIH:", req.nextUrl.pathname);
    const token = req.nextauth.token;
    const role = token?.role;
    const url = req.nextUrl.clone();

    if (!role && url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (url.pathname === "/") {
      url.pathname =
        role === "admin"
          ? "/admin"
          : role === "guru"
          ? "/petugas"
          : role === "siswa"
          ? "/user"
          : "/login";

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/admin/:path*", "/petugas/:path*", "/user/:path*"],
};
