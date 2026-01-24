import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { authConstants, verifySession } from '@/lib/auth';

async function getAuthUserId () {
	const cookieStore = await cookies();
	const token = cookieStore.get(authConstants.COOKIE_NAME)?.value;
	if (!token) return null;
	const payload = verifySession(token);
	return payload?.sub || null;
}

export async function GET () {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });

		// Fetch recent messages involving the user (limit for MVP)
		const recent = await prisma.directMessage.findMany({
			where: { OR: [ { senderId: String(authUserId) }, { recipientId: String(authUserId) } ] },
			orderBy: { createdAt: 'desc' },
			take: 300,
			include: { sender: true, recipient: true }
		});

		// Fetch all unread incoming messages once
		const unread = await prisma.directMessage.findMany({
			where: { recipientId: String(authUserId), readAt: null },
			select: { senderId: true }
		});
		const unreadCounts = unread.reduce((acc, m) => {
			acc[ m.senderId ] = (acc[ m.senderId ] || 0) + 1;
			return acc;
		}, {});

		const threadMap = new Map();
		for (const msg of recent) {
			const partnerId = msg.senderId === authUserId ? msg.recipientId : msg.senderId;
			if (!threadMap.has(partnerId)) {
				const partnerUser = msg.senderId === authUserId ? msg.recipient : msg.sender;
				threadMap.set(partnerId, {
					partnerId,
					partner: {
						id: partnerUser.id,
						firstName: partnerUser.firstName,
						lastName: partnerUser.lastName,
						profileImageUrl: partnerUser.profileImageUrl || null,
						userType: partnerUser.userType || null,
						department: partnerUser.department || null,
						companyId: partnerUser.companyId || null
					},
					lastMessage: { id: msg.id, body: msg.body, createdAt: msg.createdAt, fromSelf: msg.senderId === authUserId },
					unreadCount: unreadCounts[ partnerId ] || 0
				});
			}
		}

		const threads = Array.from(threadMap.values()).sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);

		return Response.json({ ok: true, data: threads });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'THREADS_FETCH_FAILED' }), { status: 500 });
	}
}
