import prisma from '@/lib/prisma';

export async function GET (req) {
	try {
		const { searchParams } = new URL(req.url);
		const companyId = searchParams.get('companyId');
		if (!companyId) return new Response(JSON.stringify({ ok: false, error: 'MISSING_COMPANY_ID' }), { status: 400 });
		const reviews = await prisma.companyReview.findMany({ where: { companyId: String(companyId) }, select: { rating: true } });
		if (!reviews.length) return Response.json({ ok: true, data: { count: 0, average: null } });
		const count = reviews.length;
		const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
		const average = +(sum / count).toFixed(2);
		return Response.json({ ok: true, data: { count, average } });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'COMPANY_REVIEW_SUMMARY_FAILED' }), { status: 500 });
	}
}
