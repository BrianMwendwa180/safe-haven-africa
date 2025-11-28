export type SendResult = { ok: true } | { ok: false; error: string };

// sendEmail: Sends OTP via backend email relay server using Nodemailer.
// The server is running on http://localhost:4000 (configurable via env).
// Server uses SMTP credentials from server/.env (never exposed to client).
const SERVER_URL = (import.meta.env.VITE_EMAIL_SERVER_URL as string) || 'http://localhost:4000';

export async function sendEmail(email: string, subject: string, body: string): Promise<SendResult> {
  try {
    console.log(`[Email] Sending to ${SERVER_URL}/send-email`, { to: email, subject });
    const resp = await fetch(`${SERVER_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject, body })
    });
    const data = await resp.json();
    console.log(`[Email] Server responded with status ${resp.status}`, data);
    if (!resp.ok) {
      return { ok: false, error: data?.error || `Email server responded ${resp.status}` };
    }
    if (data?.ok) return { ok: true };
    return { ok: false, error: data?.error || 'Unknown email server error' };
  } catch (err: any) {
    console.error(`[Email] Error:`, err);
    return { ok: false, error: err?.message || String(err) };
  }
}
