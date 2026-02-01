import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const session = req.auth;

    // Public routes — always allow
    if (
        pathname === "/" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/auth/")
    ) {
        return NextResponse.next();
    }

    // Not authenticated or refresh token failed — redirect to home
    if (!session || (session as any).error === "RefreshTokenError") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    const roles = (session as any).roles as string[] | undefined;
    const isSysAdmin = roles?.includes("sysAdmin") ?? false;

    // Admin routes — only sysAdmin
    if (pathname.startsWith("/dashboard/admin")) {
        if (!isSysAdmin) {
            const url = req.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // Dashboard routes (non-admin) — authenticated users
    if (pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
