import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "fia_token";

export function middleware (req) {
	const { pathname, search } = req.nextUrl;
	const isProtected = protectedRoutes.some((base) => pathname === base || pathname.startsWith(base + "/"));
	if (!isProtected) return NextResponse.next();

	const token = req.cookies.get(COOKIE_NAME)?.value;
	if (!token) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		url.search = search ? `${search}&from=${encodeURIComponent(pathname)}` : `?from=${encodeURIComponent(pathname)}`;
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

const protectedRoutes = [
	"/dashboard",
	"/add-services",
	"/create-projects",
	"/invoice",
	"/manage-jobs",
	"/manage-projects",
	"/manage-services",
	"/message",
	"/my-profile",
	"/payouts",
	"/proposal",
	"/reviews",
	"/saved",
	"/statements",
];

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/add-services/:path*",
		"/create-projects/:path*",
		"/invoice/:path*",
		"/manage-jobs/:path*",
		"/manage-projects/:path*",
		"/manage-services/:path*",
		"/message/:path*",
		"/my-profile/:path*",
		"/payouts/:path*",
		"/proposal/:path*",
		"/reviews/:path*",
		"/saved/:path*",
		"/statements/:path*",
	],
};
