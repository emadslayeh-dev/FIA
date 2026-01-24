import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST (req) {
	try {
		const body = await req.json();
		const rawPassword = body.password || body.pass || body.pwd || null;
		if (!rawPassword || String(rawPassword).length < 6) {
			return new Response(JSON.stringify({ ok: false, error: "PASSWORD_TOO_SHORT" }), { status: 400 });
		}
		const passwordHash = await bcrypt.hash(String(rawPassword), 10);
		const data = {
			userType: body.user_type || body.userType || "",
			userTypeOther: body.user_type_other || body.userTypeOther || null,
			firstName: body.first_name || body.firstName || "",
			lastName: body.last_name || body.lastName || "",
			email: (body.email || "").toLowerCase().trim(),
			passwordHash,
			companyName: body.company || body.companyName || null,
			companySelectedId: body.company_selected_id || body.companySelectedId || null,
			noBusiness: body.noBusiness === "1" || body.noBusiness === true,
			country: body.country || null,
			department: body.department || null,
			role: body.role || null,
		};

		if (!data.userType) return new Response(JSON.stringify({ ok: false, error: "USER_TYPE_REQUIRED" }), { status: 400 });
		if (!data.email) return new Response(JSON.stringify({ ok: false, error: "EMAIL_REQUIRED" }), { status: 400 });
		if (!data.firstName) return new Response(JSON.stringify({ ok: false, error: "FIRST_NAME_REQUIRED" }), { status: 400 });
		if (!data.lastName) return new Response(JSON.stringify({ ok: false, error: "LAST_NAME_REQUIRED" }), { status: 400 });
		// Business selection logic: either companySelectedId / companyName provided OR noBusiness must be true
		const hasCompanyInfo = !!data.companySelectedId || (!!data.companyName && !data.noBusiness);
		if (!hasCompanyInfo && !data.noBusiness) {
			return new Response(JSON.stringify({ ok: false, error: "COMPANY_OR_NO_BUSINESS_REQUIRED" }), { status: 400 });
		}

		const created = await prisma.tempRegistration.create({ data });
		return Response.json({ ok: true, data: { id: created.id } });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "REG_CREATE_FAILED" }), { status: 500 });
	}
}

export async function GET (req) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ ok: false, error: "ID_REQUIRED" }), { status: 400 });
		const temp = await prisma.tempRegistration.findUnique({ where: { id } });
		if (!temp) return new Response(JSON.stringify({ ok: false, error: "NOT_FOUND" }), { status: 404 });
		return Response.json({ ok: true, data: temp });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "REG_FETCH_FAILED" }), { status: 500 });
	}
}
