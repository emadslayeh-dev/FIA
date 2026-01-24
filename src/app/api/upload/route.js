import { writeFile, mkdir, stat } from "fs/promises";
import { join, extname } from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic"; // ensure node runtime

export async function POST (req) {
	try {
		const form = await req.formData();
		const file = form.get("file");
		if (!file || typeof file === "string") {
			return new Response(JSON.stringify({ ok: false, error: "FILE_REQUIRED" }), { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const uploadsDir = join(process.cwd(), "public", "uploads");
		try {
			await stat(uploadsDir);
		} catch {
			await mkdir(uploadsDir, { recursive: true });
		}

		const hash = crypto.createHash("sha1").update(buffer).digest("hex");
		const ext = extname(file.name || "") || ".bin";
		const filename = `${hash}${ext}`;
		const filePath = join(uploadsDir, filename);
		await writeFile(filePath, buffer);

		const url = `/uploads/${filename}`;
		return Response.json({ ok: true, url });
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ ok: false, error: "UPLOAD_FAILED" }), { status: 500 });
	}
}
