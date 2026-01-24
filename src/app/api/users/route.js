import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST (req) {
	try {
		const body = await req.json();
		const tempId = body.tempId || body.temp_id;
		if (!tempId) return new Response(JSON.stringify({ ok: false, error: "TEMP_ID_REQUIRED" }), { status: 400 });

		const temp = await prisma.tempRegistration.findUnique({ where: { id: String(tempId) } });
		if (!temp) return new Response(JSON.stringify({ ok: false, error: "TEMP_NOT_FOUND" }), { status: 404 });

		// Create or connect company (when provided and not noBusiness)
		let companyId = null;
		if (!temp.noBusiness) {
			if (temp.companySelectedId) {
				// If selected by id, prefer it
				const exists = await prisma.company.findUnique({ where: { id: temp.companySelectedId } });
				companyId = exists?.id || null;
			}
			if (!companyId && temp.companyName) {
				// Try find or create by Hebrew name
				const existed = await prisma.company.findFirst({ where: { nameHe: temp.companyName } });
				if (existed) companyId = existed.id;
				else {
					const created = await prisma.company.create({ data: { nameHe: temp.companyName } });
					companyId = created.id;
				}
			}
		}

		// Categories MVP: accept categories array of ids, store as CSV
		let categoriesCsv = null;
		if (Array.isArray(body.categories) && body.categories.length) {
			categoriesCsv = body.categories.map(String).join(",");
		}

		// If user already exists by email, update instead of creating to avoid P2002
		let user = await prisma.user.findUnique({ where: { email: temp.email } });
		if (user) {
			const updateData = {
				firstName: temp.firstName || user.firstName,
				lastName: temp.lastName || user.lastName,
				userType: temp.userType || user.userType,
				userTypeOther: temp.userTypeOther ?? user.userTypeOther,
				role: temp.role ?? user.role,
				country: temp.country ?? user.country,
				department: temp.department ?? user.department,
				noBusiness: typeof temp.noBusiness === "boolean" ? temp.noBusiness : user.noBusiness,
				categoriesCsv: categoriesCsv ?? user.categoriesCsv,
				profileImageUrl: body.profileImageUrl || user.profileImageUrl || null,
			};
			if (!user.companyId && companyId) updateData.companyId = companyId;
			if (!user.passwordHash && temp.passwordHash) updateData.passwordHash = temp.passwordHash;
			user = await prisma.user.update({ where: { id: user.id }, data: updateData });
		} else {
			user = await prisma.user.create({
				data: {
					firstName: temp.firstName,
					lastName: temp.lastName,
					email: temp.email,
					passwordHash: temp.passwordHash || undefined,
					userType: temp.userType,
					userTypeOther: temp.userTypeOther,
					role: temp.role,
					country: temp.country,
					department: temp.department,
					noBusiness: temp.noBusiness,
					companyId,
					categoriesCsv,
					profileImageUrl: body.profileImageUrl || null,
				},
			});
		}

		// If company details were provided, update company record
		if (companyId) {
			const companyUpdate = {};
			if (body.businessImageUrl) {
				const comp = await prisma.company.findUnique({ where: { id: companyId } });
				if (comp && !comp.imageUrl) companyUpdate.imageUrl = body.businessImageUrl;
			}
			if (body.parent_company !== undefined) companyUpdate.parentName = body.parent_company ? String(body.parent_company) : null;
			if (body.country !== undefined) companyUpdate.country = body.country ? String(body.country) : null;
			if (body.region !== undefined) companyUpdate.region = body.region ? String(body.region) : null;
			if (body.city !== undefined) companyUpdate.city = body.city ? String(body.city) : null;
			if (body.postal !== undefined) companyUpdate.postal = body.postal ? String(body.postal) : null;
			if (body.address !== undefined) companyUpdate.addressLine = body.address ? String(body.address) : null;
			if (body.employees_range !== undefined) companyUpdate.employeesRange = body.employees_range ? String(body.employees_range) : null;
			if (body.website !== undefined) companyUpdate.website = body.website ? String(body.website) : null;
			if (Object.keys(companyUpdate).length) {
				await prisma.company.update({ where: { id: companyId }, data: companyUpdate });
			}
		}

		// Create verification token and send email
		try {
			if (!user.emailVerifiedAt) {
				const token = crypto.randomBytes(32).toString("hex");
				// 24 hours from now using native Date math
				const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
				await prisma.verificationToken.create({
					data: { token, userId: user.id, expiresAt },
				});
				await sendVerificationEmail({
					to: user.email,
					name: user.firstName || "",
					token,
				});
			}
		} catch (e) {
			console.error("Failed to send verification email", e);
		}

		// Clean up temp
		await prisma.tempRegistration.delete({ where: { id: temp.id } });

		return Response.json({ ok: true, data: user });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "USER_CREATE_FAILED" }), { status: 500 });
	}
}
