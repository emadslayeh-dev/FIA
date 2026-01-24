import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signSession, authConstants } from "@/lib/auth";

export async function POST (req) {
	try {
		const body = await req.json();
		const email = (body.email || "").toLowerCase().trim();
		const password = body.password || "";
		if (!email || !password) return new Response(JSON.stringify({ ok: false, error: "MISSING_FIELDS" }), { status: 400 });

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return new Response(JSON.stringify({ ok: false, error: "INVALID_CREDENTIALS" }), { status: 401 });

		if (!user.emailVerifiedAt) {
			return new Response(JSON.stringify({ ok: false, error: "EMAIL_NOT_VERIFIED" }), { status: 403 });
		}

		const match = await bcrypt.compare(password, user.passwordHash || "");
		if (!match) return new Response(JSON.stringify({ ok: false, error: "INVALID_CREDENTIALS" }), { status: 401 });

		const token = signSession({ sub: user.id, email: user.email });

		const res = NextResponse.json({ ok: true });
		res.cookies.set(authConstants.COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
		return res;
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "LOGIN_FAILED" }), { status: 500 });
	}
}
