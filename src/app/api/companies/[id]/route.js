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

export async function GET (req, context) {
	try {
		const p = await context.params;
		const id = p?.id;
		if (!id) return new Response(JSON.stringify({ ok: false, error: "ID_REQUIRED" }), { status: 400 });
		const company = await prisma.company.findUnique({ where: { id: String(id) } });
		if (!company) return new Response(JSON.stringify({ ok: false, error: "NOT_FOUND" }), { status: 404 });
		return Response.json({ ok: true, data: company });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "COMPANY_FETCH_FAILED" }), { status: 500 });
	}
}

export async function PATCH (req, context) {
	try {
		const userId = await getAuthUserId();
		if (!userId) return new Response(JSON.stringify({ ok: false, error: "UNAUTHORIZED" }), { status: 401 });
		const p = await context.params;
		const id = p?.id ? String(p.id) : null;
		if (!id) return new Response(JSON.stringify({ ok: false, error: "ID_REQUIRED" }), { status: 400 });

		// Ensure the current user belongs to this company
		const user = await prisma.user.findUnique({ where: { id: String(userId) } });
		if (!user?.companyId || user.companyId !== id) {
			return new Response(JSON.stringify({ ok: false, error: "FORBIDDEN" }), { status: 403 });
		}

		const body = await req.json().catch(() => ({}));
		const data = {};
		if (body.nameHe !== undefined) data.nameHe = String(body.nameHe || "");
		if (body.nameEn !== undefined) data.nameEn = body.nameEn ? String(body.nameEn) : null;
		if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ? String(body.imageUrl) : null;
		if (body.parentName !== undefined) data.parentName = body.parentName ? String(body.parentName) : null;
		if (body.country !== undefined) data.country = body.country ? String(body.country) : null;
		if (body.region !== undefined) data.region = body.region ? String(body.region) : null;
		if (body.city !== undefined) data.city = body.city ? String(body.city) : null;
		if (body.postal !== undefined) data.postal = body.postal ? String(body.postal) : null;
		if (body.addressLine !== undefined) data.addressLine = body.addressLine ? String(body.addressLine) : null;
		if (body.employeesRange !== undefined) data.employeesRange = body.employeesRange ? String(body.employeesRange) : null;
		if (body.website !== undefined) data.website = body.website ? String(body.website) : null;
		if (body.about !== undefined) data.about = body.about ? String(body.about) : null;

		const updated = await prisma.company.update({ where: { id }, data });
		return Response.json({ ok: true, data: updated });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "COMPANY_UPDATE_FAILED" }), { status: 500 });
	}
}
