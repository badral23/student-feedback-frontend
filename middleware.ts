import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken?.exp && decodedToken.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Optionally, specify which paths this middleware should run on
export const config = {
  matcher: [
    // Add paths that require authentication
    "/dashboard/:path*",
    "/profile/:path*",
    // Exclude paths that don't need authentication
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
