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
		const { searchParams } = new URL(req.url);
		const companyId = searchParams.get('companyId');
		if (!companyId) return new Response(JSON.stringify({ ok: false, error: 'MISSING_COMPANY_ID' }), { status: 400 });
		const reviews = await prisma.companyReview.findMany({
			where: { companyId: String(companyId) },
			orderBy: { createdAt: 'desc' },
			include: { author: true }
		});
		return Response.json({ ok: true, data: reviews });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'COMPANY_REVIEWS_FETCH_FAILED' }), { status: 500 });
	}
}

export async function POST (req) {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });
		const body = await req.json();
		const { companyId, rating, comment } = body || {};
		if (!companyId || typeof rating !== 'number' || rating < 1 || rating > 5 || !comment || !comment.trim()) {
			return new Response(JSON.stringify({ ok: false, error: 'INVALID_INPUT' }), { status: 400 });
		}
		// Prevent duplicate by same author
		const existing = await prisma.companyReview.findFirst({ where: { companyId: String(companyId), authorUserId: String(authUserId) } });
		if (existing) return new Response(JSON.stringify({ ok: false, error: 'ALREADY_REVIEWED' }), { status: 409 });
		const saved = await prisma.companyReview.create({
			data: {
				companyId: String(companyId),
				authorUserId: String(authUserId),
				rating: Math.round(rating),
				comment: comment.trim()
			},
			include: { author: true }
		});
		return Response.json({ ok: true, data: saved });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'COMPANY_REVIEW_CREATE_FAILED' }), { status: 500 });
	}
}

export async function PATCH (req) {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });
		const body = await req.json();
		const { reviewId, rating, comment } = body || {};
		if (!reviewId) return new Response(JSON.stringify({ ok: false, error: 'MISSING_REVIEW_ID' }), { status: 400 });
		if ((rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) || (comment !== undefined && !comment.trim())) {
			return new Response(JSON.stringify({ ok: false, error: 'INVALID_INPUT' }), { status: 400 });
		}
		const existing = await prisma.companyReview.findUnique({ where: { id: String(reviewId) } });
		if (!existing) return new Response(JSON.stringify({ ok: false, error: 'NOT_FOUND' }), { status: 404 });
		if (existing.authorUserId !== authUserId) return new Response(JSON.stringify({ ok: false, error: 'FORBIDDEN' }), { status: 403 });
		const data = {};
		if (rating !== undefined) data.rating = Math.round(rating);
		if (comment !== undefined) data.comment = comment.trim();
		const updated = await prisma.companyReview.update({ where: { id: existing.id }, data, include: { author: true } });
		return Response.json({ ok: true, data: updated });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'COMPANY_REVIEW_UPDATE_FAILED' }), { status: 500 });
	}
}

export async function DELETE (req) {
	try {
		const authUserId = await getAuthUserId();
		if (!authUserId) return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED' }), { status: 401 });
		const { searchParams } = new URL(req.url);
		const reviewId = searchParams.get('reviewId');
		if (!reviewId) return new Response(JSON.stringify({ ok: false, error: 'MISSING_REVIEW_ID' }), { status: 400 });
		const existing = await prisma.companyReview.findUnique({ where: { id: String(reviewId) } });
		if (!existing) return new Response(JSON.stringify({ ok: false, error: 'NOT_FOUND' }), { status: 404 });
		if (existing.authorUserId !== authUserId) return new Response(JSON.stringify({ ok: false, error: 'FORBIDDEN' }), { status: 403 });
		await prisma.companyReview.delete({ where: { id: existing.id } });
		return Response.json({ ok: true });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: 'COMPANY_REVIEW_DELETE_FAILED' }), { status: 500 });
	}
}
