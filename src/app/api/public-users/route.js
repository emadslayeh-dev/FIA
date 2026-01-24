import prisma from '@/lib/prisma';

export async function GET () {
	try {
		// Basic public listing: limit to recent 40 users
		const users = await prisma.user.findMany({
			take: 40,
			orderBy: { createdAt: 'desc' },
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
			}
		});
		return Response.json({ ok: true, data: users });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'PUBLIC_USERS_FETCH_FAILED' }), { status: 500 });
	}
}
