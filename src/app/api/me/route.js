import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { authConstants, verifySession } from "@/lib/auth";

async function getAuthUserId () {
	const cookieStore = await cookies();
	const token = cookieStore.get(authConstants.COOKIE_NAME)?.value;
	if (!token) return null;
	const payload = verifySession(token);
	return payload?.sub || null;
}

export async function GET () {
	try {
		const userId = await getAuthUserId();
		if (!userId) return new Response(JSON.stringify({ ok: false, error: "UNAUTHORIZED" }), { status: 401 });
		const user = await prisma.user.findUnique({ where: { id: String(userId) }, include: { company: true } });
		if (!user) return new Response(JSON.stringify({ ok: false, error: "NOT_FOUND" }), { status: 404 });
		return Response.json({ ok: true, data: user });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "ME_FETCH_FAILED" }), { status: 500 });
	}
}

export async function PATCH (req) {
	try {
		const userId = await getAuthUserId();
		if (!userId) return new Response(JSON.stringify({ ok: false, error: "UNAUTHORIZED" }), { status: 401 });
		const body = await req.json();

		const update = {};
		if (body.firstName !== undefined) update.firstName = String(body.firstName);
		if (body.lastName !== undefined) update.lastName = String(body.lastName);
		if (body.userType !== undefined) update.userType = String(body.userType);
		if (body.userTypeOther !== undefined) update.userTypeOther = body.userTypeOther ? String(body.userTypeOther) : null;
		if (body.role !== undefined) update.role = body.role ? String(body.role) : null;
		if (body.country !== undefined) update.country = body.country ? String(body.country) : null;
		if (body.department !== undefined) update.department = body.department ? String(body.department) : null;
		if (body.noBusiness !== undefined) update.noBusiness = !!body.noBusiness;
		if (body.companyId !== undefined) update.companyId = body.companyId || null;
		if (Array.isArray(body.categories)) update.categoriesCsv = body.categories.map(String).join(",");
		if (body.profileImageUrl !== undefined) update.profileImageUrl = body.profileImageUrl || null;
		if (body.description !== undefined) update.description = body.description ? String(body.description) : null;

		const saved = await prisma.user.update({ where: { id: String(userId) }, data: update, include: { company: true } });
		return Response.json({ ok: true, data: saved });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "ME_UPDATE_FAILED" }), { status: 500 });
	}
}
