import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET (req) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get("token");
		if (!token) return new Response("Missing token", { status: 400 });

		const record = await prisma.verificationToken.findUnique({ where: { token } });
		if (!record) return NextResponse.redirect(new URL("/login?verified=0", req.url));
		if (new Date(record.expiresAt).getTime() < Date.now()) {
			// expired - delete and redirect
			await prisma.verificationToken.delete({ where: { id: record.id } });
			return NextResponse.redirect(new URL("/login?verified=expired", req.url));
		}

		await prisma.user.update({ where: { id: record.userId }, data: { emailVerifiedAt: new Date() } });
		await prisma.verificationToken.delete({ where: { id: record.id } });

		return NextResponse.redirect(new URL("/login?verified=1", req.url));
	} catch (e) {
		console.error(e);
		return new Response("VERIFY_FAILED", { status: 500 });
	}
}
