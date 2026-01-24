import prisma from '@/lib/prisma';

export async function GET (req) {
	try {
		const { searchParams } = new URL(req.url);
		const idsParam = searchParams.get('userIds');
		if (!idsParam) return new Response(JSON.stringify({ ok: false, error: 'MISSING_USER_IDS' }), { status: 400 });
		const userIds = idsParam.split(',').map(s => s.trim()).filter(Boolean);
		if (!userIds.length) return new Response(JSON.stringify({ ok: false, error: 'EMPTY_USER_IDS' }), { status: 400 });

		const reviews = await prisma.review.findMany({
			where: { userId: { in: userIds } },
			select: { userId: true, rating: true }
		});

		const aggregate = {};
		for (const r of reviews) {
			if (!aggregate[ r.userId ]) aggregate[ r.userId ] = { count: 0, sum: 0 };
			aggregate[ r.userId ].count += 1;
			aggregate[ r.userId ].sum += r.rating;
		}
		const result = userIds.map(id => {
			const data = aggregate[ id ];
			if (!data) return { userId: id, count: 0, average: null };
			return { userId: id, count: data.count, average: +(data.sum / data.count).toFixed(2) };
		});
		return Response.json({ ok: true, data: result });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'SUMMARY_FETCH_FAILED' }), { status: 500 });
	}
}
