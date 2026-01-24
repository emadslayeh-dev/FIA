import { cookies } from "next/headers";
import { authConstants } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST () {
	try {
		const cookieStore = await cookies();
		// Best effort delete
		try { cookieStore.delete(authConstants.COOKIE_NAME); } catch { }
		// Build explicit response and set expired cookie
		const res = NextResponse.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
		res.cookies.set(authConstants.COOKIE_NAME, "", {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			expires: new Date(0), // explicit past date
			maxAge: 0,
		});
		return res;
	} catch (e) {
		console.error(e);
		return new NextResponse(JSON.stringify({ ok: false, error: "LOGOUT_FAILED" }), { status: 500 });
	}
}
