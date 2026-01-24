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

export async function GET (req) {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });
		const { searchParams } = new URL(req.url);
		const withId = searchParams.get('with');
		if (!withId) return new Response(JSON.stringify({ ok: false, error: 'MISSING_WITH_ID' }), { status: 400 });

		const messages = await prisma.directMessage.findMany({
			where: {
				OR: [
					{ senderId: String(authUserId), recipientId: String(withId) },
					{ senderId: String(withId), recipientId: String(authUserId) }
				]
			},
			orderBy: { createdAt: 'asc' },
			include: { sender: true }
		});

		// Mark unread incoming messages as read
		await prisma.directMessage.updateMany({
			where: { senderId: String(withId), recipientId: String(authUserId), readAt: null },
			data: { readAt: new Date() }
		});

		return Response.json({ ok: true, data: messages });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'MESSAGES_FETCH_FAILED' }), { status: 500 });
	}
}

export async function POST (req) {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });
		const body = await req.json();
		const { recipientId, text } = body || {};
		if (!recipientId || !text || !text.trim()) {
			return new Response(JSON.stringify({ ok: false, error: 'INVALID_INPUT' }), { status: 400 });
		}
		if (recipientId === authUserId) {
			return new Response(JSON.stringify({ ok: false, error: 'CANNOT_MESSAGE_SELF' }), { status: 400 });
		}

		// Ensure recipient exists
		const recipient = await prisma.user.findUnique({ where: { id: String(recipientId) } });
		if (!recipient) return new Response(JSON.stringify({ ok: false, error: 'RECIPIENT_NOT_FOUND' }), { status: 404 });

		const saved = await prisma.directMessage.create({
			data: {
				senderId: String(authUserId),
				recipientId: String(recipientId),
				body: text.trim()
			},
			include: { sender: true }
		});

		return Response.json({ ok: true, data: saved });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'MESSAGE_CREATE_FAILED' }), { status: 500 });
	}
}
