import nodemailer from "nodemailer";
import { Resend } from "resend";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
const resendKey = process.env.RESEND_API_KEY;

let transporter;
let resendClient;
function getTransporter () {
	if (!transporter) {
		const enableDebug = process.env.SMTP_DEBUG === "1";
		const ignoreTLS = process.env.SMTP_IGNORE_TLS === "1"; // rarely needed
		const requireTLS = process.env.SMTP_REQUIRE_TLS === "1"; // force STARTTLS
		transporter = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			secure: smtpPort === 465,
			auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
			tls: ignoreTLS ? { rejectUnauthorized: false } : undefined,
			requireTLS,
			connectionTimeout: Number(process.env.SMTP_CONN_TIMEOUT || 10000),
			greetingTimeout: Number(process.env.SMTP_GREET_TIMEOUT || 8000),
			socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 15000),
			debug: enableDebug,
		});
		if (enableDebug) {
			transporter.on("log", (info) => {
				console.log("[SMTP]", info);
			});
		}
	}
	return transporter;
}

function getResend () {
	if (!resendClient && resendKey) {
		resendClient = new Resend(resendKey);
	}
	return resendClient;
}

export async function sendVerificationEmail ({ to, name, token }) {
	if (!smtpHost) {
		console.warn("SMTP not configured; skipping email send.");
		// Try Resend as fallback if available
		if (!resendKey) return;
	}
	const verifyLink = `${appUrl}/api/auth/verify?token=${encodeURIComponent(token)}`;
	const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>אימות כתובת האימייל</h2>
      <p>${name ? `${name}, ` : ""}תודה על ההרשמה ל-FIA.</p>
      <p>לחצו על הקישור הבא כדי לאמת את כתובת האימייל שלכם:</p>
      <p><a href="${verifyLink}">לאימות לחץ כאן</a></p>
      <p>אם הלחיצה לא עובדת, העתיקו והדביקו את הכתובת לדפדפן:</p>
      <p>${verifyLink}</p>
    </div>
  `;
	const text = `אימות כתובת האימייל\n\nכדי לאמת את החשבון שלכם, גשו ל: ${verifyLink}`;
	const subject = "אימות הרשמה ל-FIA";
	// First try SMTP if configured
	if (smtpHost) {
		try {
			await getTransporter().sendMail({ from: smtpFrom, to, subject, text, html });
			return;
		} catch (e) {
			console.error("sendVerificationEmail failed (SMTP)", {
				message: e.message,
				code: e.code,
				errno: e.errno,
				command: e.command,
			});
			// fall through to Resend if available
		}
	}
	// Fallback to Resend (HTTP API) if key present
	if (resendKey) {
		const resend = getResend();
		const from = smtpFrom || "onboarding@resend.dev"; // Resend test sender
		try {
			await resend.emails.send({ from, to, subject, html, text });
			return;
		} catch (e) {
			console.error("sendVerificationEmail failed (Resend)", e);
			throw e;
		}
	}
}

export async function sendPasswordResetEmail ({ to, name, token }) {
	if (!smtpHost) {
		console.warn("SMTP not configured; skipping email send.");
		if (!resendKey) return;
	}
	const resetLink = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;
	const html = `
		<div style="font-family:Arial,sans-serif;line-height:1.6">
			<h2>איפוס סיסמה</h2>
			<p>${name ? `${name}, ` : ""}ביקשת לאפס את הסיסמה ל-FIA.</p>
			<p>לחצו על הקישור הבא כדי לבחור סיסמה חדשה:</p>
			<p><a href="${resetLink}">לאיפוס סיסמה לחץ כאן</a></p>
			<p>אם הלחיצה לא עובדת, העתיקו והדביקו את הכתובת לדפדפן:</p>
			<p>${resetLink}</p>
			<p style="color:#666">קישור זה תקף לשעה אחת.</p>
		</div>
	`;
	const text = `איפוס סיסמה\n\nכדי לאפס את הסיסמה, גשו ל: ${resetLink}`;
	const subject = "איפוס סיסמה ל-FIA";
	if (smtpHost) {
		try {
			await getTransporter().sendMail({ from: smtpFrom, to, subject, text, html });
			return;
		} catch (e) {
			console.error("sendPasswordResetEmail failed (SMTP)", {
				message: e.message,
				code: e.code,
				errno: e.errno,
				command: e.command,
			});
		}
	}
	if (resendKey) {
		const resend = getResend();
		const from = smtpFrom || "onboarding@resend.dev";
		try {
			await resend.emails.send({ from, to, subject, html, text });
			return;
		} catch (e) {
			console.error("sendPasswordResetEmail failed (Resend)", e);
			throw e;
		}
	}
}
