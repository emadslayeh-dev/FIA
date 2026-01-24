import prisma from "@/lib/prisma";

export async function GET (req) {
	const { searchParams } = new URL(req.url);
	const q = (searchParams.get("q") || "").trim();
	try {
		// SQLite doesn't support `mode: "insensitive"` in Prisma string filters.
		// Build a case-flexible query by including lower/upper variants for ASCII queries.
		let where = {};
		if (q) {
			const qLower = q.toLowerCase();
			const qUpper = q.toUpperCase();
			const ors = [
				{ nameHe: { contains: q } },
				{ nameEn: { contains: q } },
			];
			if (qLower !== q) {
				ors.push({ nameHe: { contains: qLower } });
				ors.push({ nameEn: { contains: qLower } });
			}
			if (qUpper !== q && qUpper !== qLower) {
				ors.push({ nameHe: { contains: qUpper } });
				ors.push({ nameEn: { contains: qUpper } });
			}
			where = { OR: ors };
		}
		const companies = await prisma.company.findMany({ where, take: 20, orderBy: { createdAt: "desc" } });
		return Response.json({ ok: true, data: companies });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "COMPANY_LIST_FAILED" }), { status: 500 });
	}
}

export async function POST (req) {
	try {
		const body = await req.json();
		const nameHe = (body?.nameHe || body?.name_he || "").trim();
		const nameEn = (body?.nameEn || body?.name_en || "").trim() || null;
		if (!nameHe) return new Response(JSON.stringify({ ok: false, error: "NAME_HE_REQUIRED" }), { status: 400 });

		// avoid exact duplicate by Hebrew name
		const exists = await prisma.company.findFirst({ where: { nameHe } });
		if (exists) return Response.json({ ok: true, data: exists, duplicated: true });

		const created = await prisma.company.create({ data: { nameHe, nameEn } });
		return Response.json({ ok: true, data: created });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "COMPANY_CREATE_FAILED" }), { status: 500 });
	}
}
