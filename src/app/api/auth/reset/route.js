import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST (req) {
	try {
		const body = await req.json().catch(() => ({}));
		const token = String(body.token || "").trim();
		const newPassword = String(body.password || body.newPassword || "");
		if (!token || !newPassword) return new Response(JSON.stringify({ ok: false, error: "INVALID_INPUT" }), { status: 400 });
		if (newPassword.length < 6) return new Response(JSON.stringify({ ok: false, error: "PASSWORD_TOO_SHORT" }), { status: 400 });

		const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
		if (!reset) return new Response(JSON.stringify({ ok: false, error: "TOKEN_INVALID" }), { status: 400 });

		if (reset.usedAt) return new Response(JSON.stringify({ ok: false, error: "TOKEN_USED" }), { status: 400 });
		if (reset.expiresAt && reset.expiresAt.getTime() < Date.now()) {
			return new Response(JSON.stringify({ ok: false, error: "TOKEN_EXPIRED" }), { status: 400 });
		}

		const user = await prisma.user.findUnique({ where: { id: reset.userId } });
		if (!user) return new Response(JSON.stringify({ ok: false, error: "USER_NOT_FOUND" }), { status: 404 });

		const passwordHash = await bcrypt.hash(newPassword, 10);
		await prisma.$transaction([
			prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
			prisma.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } }),
			prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null, NOT: { token } } }),
		]);

		return Response.json({ ok: true });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "RESET_FAILED" }), { status: 500 });
	}
}

export async function GET (req) {
	try {
		const { searchParams } = new URL(req.url);
		const token = String(searchParams.get("token") || "").trim();
		if (!token) return new Response(JSON.stringify({ ok: false, error: "TOKEN_REQUIRED" }), { status: 400 });
		const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
		if (!reset) return new Response(JSON.stringify({ ok: false, error: "TOKEN_INVALID" }), { status: 400 });
		if (reset.usedAt) return new Response(JSON.stringify({ ok: false, error: "TOKEN_USED" }), { status: 400 });
		if (reset.expiresAt && reset.expiresAt.getTime() < Date.now()) {
			return new Response(JSON.stringify({ ok: false, error: "TOKEN_EXPIRED" }), { status: 400 });
		}
		return Response.json({ ok: true });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "CHECK_FAILED" }), { status: 500 });
	}
}
