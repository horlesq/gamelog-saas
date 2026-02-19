import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token");
    const { pathname } = request.nextUrl;

    const authRoutes = ["/login", "/register"];
    const protectedRoutes = ["/dashboard", "/profile", "/settings"];
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // Logged-in user visiting login/register → send to dashboard
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Guest visiting protected page → send to login
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|3d|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
    ],
};
