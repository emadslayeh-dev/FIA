import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST (req) {
	try {
		const body = await req.json();
		const email = (body.email || "").toLowerCase().trim();
		if (!email) return new Response(JSON.stringify({ ok: false, error: "EMAIL_REQUIRED" }), { status: 400 });

		const user = await prisma.user.findUnique({ where: { email } });
		// To avoid user enumeration, always respond ok. But only send if user exists and not verified.
		if (!user) return Response.json({ ok: true });

		if (user.emailVerifiedAt) {
			return Response.json({ ok: true, alreadyVerified: true });
		}

		await prisma.verificationToken.deleteMany({ where: { userId: user.id } });
		const token = crypto.randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
		await prisma.verificationToken.create({ data: { token, userId: user.id, expiresAt } });
		await sendVerificationEmail({ to: user.email, name: user.firstName || "", token });

		return Response.json({ ok: true, resent: true });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "RESEND_FAILED" }), { status: 500 });
	}
}
