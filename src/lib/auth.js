import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "fia_token";

export function signSession (payload, opts = {}) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: opts.expiresIn || "7d" });
}

export function verifySession (token) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}

export const authConstants = { COOKIE_NAME };
