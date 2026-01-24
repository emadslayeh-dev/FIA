import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST (req) {
	try {
		const body = await req.json().catch(() => ({}));
		const email = (body.email || "").toLowerCase().trim();
		if (!email) return new Response(JSON.stringify({ ok: true }), { status: 200 });

		const user = await prisma.user.findUnique({ where: { email } });
		// Always respond ok to avoid leaking which emails exist
		if (!user) return Response.json({ ok: true });

		// Create token valid for 1 hour
		const token = crypto.randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

		// Optionally: remove existing tokens for this user
		await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }).catch(() => { });

		await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } });

		try {
			await sendPasswordResetEmail({ to: user.email, name: user.firstName || "", token });
		} catch (e) {
			// Swallow email errors to avoid hinting about account existence
			console.error("sendPasswordResetEmail failed", e);
		}

		return Response.json({ ok: true });
	} catch (e) {
		console.error(e);
		// Still return ok to avoid enumeration
		return Response.json({ ok: true });
	}
}
