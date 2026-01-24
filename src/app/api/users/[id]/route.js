import prisma from '@/lib/prisma';

// New Next.js dynamic API handlers may pass an async context; await it before using params.
export async function GET (req, contextPromise) {
	try {
		const { params } = await contextPromise;
		const id = params?.id;
		if (!id) {
			return new Response(JSON.stringify({ ok: false, error: 'MISSING_ID' }), { status: 400 });
		}
		const user = await prisma.user.findUnique({
			where: { id: String(id) },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				role: true,
				country: true,
				profileImageUrl: true,
				userType: true,
				categoriesCsv: true,
				department: true,
				company: { select: { nameHe: true, nameEn: true } },
				description: true,
				createdAt: true
			}
		});
		if (!user) {
			return new Response(JSON.stringify({ ok: false, error: 'NOT_FOUND' }), { status: 404 });
		}
		return Response.json({ ok: true, data: user });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'USER_FETCH_FAILED' }), { status: 500 });
	}
}
