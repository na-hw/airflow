import { getContactSchema } from "@/lib/contactSchema";
import { createRateLimiter } from "@/lib/rateLimit";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const contactSchema = getContactSchema("en");

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "ahmadi@neoskop.de";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Airflow Contact Form <onboarding@resend.dev>";

// Max 3 requests per IP per 10 minutes.
const isRateLimited = createRateLimiter({ max: 3, windowMs: 10 * 60 * 1000 });

let resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend ??= new Resend(apiKey);
  return resend;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Email subjects are plain text: collapse line breaks, don't HTML-escape. */
function toSubjectText(str: string): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5;width:140px">${label}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`;

const jsonError = (error: string, status: number) =>
  Response.json({ error }, { status });

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (process.env.NODE_ENV === "production" && isRateLimited(ip)) {
    return jsonError("Too many requests. Please wait 10 minutes.", 429);
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonError("Invalid request.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid form data.", 422);
  }

  const client = getResend();
  if (!client) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return jsonError("Email could not be sent.", 500);
  }

  const { name, email, phone, company, projectType, message } = parsed.data;

  try {
    const { error } = await client.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: toSubjectText(`New inquiry: ${projectType} – ${name}`),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="background:#0f172a;color:#fff;padding:20px 24px;margin:0">New Contact Inquiry</h2>
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
            ${row("Name", name)}
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${company ? row("Company", company) : ""}
            ${row("Project Type", projectType)}
            <tr>
              <td style="padding:8px 12px;font-weight:600;background:#f5f5f5;vertical-align:top">Message</td>
              <td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(message)}</td>
            </tr>
          </table>
          <p style="color:#94a3b8;font-size:12px;padding:16px">This email was sent via the contact form on airflowsystem.ir.</p>
        </div>
      `,
    });

    if (error) {
      // Log the provider error only — never the submitted personal data.
      console.error("[contact] Resend rejected the email:", error.name, error.message);
      return jsonError("Email could not be sent.", 502);
    }
  } catch (err) {
    console.error("[contact] Sending failed:", err instanceof Error ? err.message : err);
    return jsonError("Email could not be sent.", 502);
  }

  return Response.json({ ok: true });
}
