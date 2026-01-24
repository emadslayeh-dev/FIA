import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { authConstants, verifySession } from "@/lib/auth";

async function getAuthUserId () {
	const cookieStore = await cookies();
	const token = cookieStore.get(authConstants.COOKIE_NAME)?.value;
	if (!token) return null;
	const payload = verifySession(token);
	return payload?.sub || null;
}

export async function POST (req) {
	try {
		const userId = await getAuthUserId();
		if (!userId) return new Response(JSON.stringify({ ok: false, error: "UNAUTHORIZED" }), { status: 401 });
		const body = await req.json().catch(() => ({}));
		const oldPassword = body.oldPassword ? String(body.oldPassword) : "";
		const newPassword = body.newPassword ? String(body.newPassword) : "";
		if (!newPassword || newPassword.length < 6) {
			return new Response(JSON.stringify({ ok: false, error: "PASSWORD_TOO_SHORT" }), { status: 400 });
		}
		const user = await prisma.user.findUnique({ where: { id: String(userId) } });
		if (!user) return new Response(JSON.stringify({ ok: false, error: "NOT_FOUND" }), { status: 404 });
		if (user.passwordHash) {
			const ok = await bcrypt.compare(oldPassword, user.passwordHash);
			if (!ok) return new Response(JSON.stringify({ ok: false, error: "WRONG_OLD_PASSWORD" }), { status: 400 });
		}
		const passwordHash = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
		return Response.json({ ok: true });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "CHANGE_FAILED" }), { status: 500 });
	}
}
