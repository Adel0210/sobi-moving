import { Resend } from "resend";
import {
  DISTANCE_LABELS,
  MOVE_TYPE_LABELS,
  SERVICE_LABELS,
  SIZE_LABELS,
  SUBJECT_LABELS,
  labelFor,
  type LeadPayload,
} from "@/lib/leads";

// Emails the owner the moment a form is submitted, because a lead sitting in
// the `leads` table is worth nothing until a human sees it.
//
// The row in `leads` is written by the browser before this route is called, so
// notification here is strictly best effort. Every failure path answers 200:
// a 5xx would only teach the browser to retry a send that already went out,
// and the customer must never be told their move request failed when it did
// not. Failures are logged instead.

const MAX_BODY_CHARS = 20_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_KEYS = 500;

// Per-instance memory, NOT a shared store. On Vercel every serverless instance
// keeps its own copy and a cold start wipes it, so this thins out an obvious
// flood from a single address and nothing more. Treat it as a speed bump, not
// as protection. Anything stronger needs Redis or Vercel's own rate limiter.
const recentHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Keep the map from growing without bound on a long-lived instance.
  if (recentHits.size > RATE_LIMIT_MAX_KEYS) {
    for (const [key, times] of recentHits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentHits.delete(key);
    }
  }

  const times = (recentHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (times.length >= RATE_LIMIT_MAX) {
    recentHits.set(ip, times);
    return true;
  }
  times.push(now);
  recentHits.set(ip, times);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/* ---------- validation ---------- */

// Deliberately hand rolled. The payload is fifteen flat fields, so a schema
// library would be a dependency and a bundle for no extra safety.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE_CHARS = 4000;

type ValidationResult =
  | { ok: true; lead: LeadPayload; stored: boolean }
  | { ok: false; reason: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function cleanNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function validate(body: unknown): ValidationResult {
  if (!isRecord(body)) return { ok: false, reason: "body is not an object" };
  if (!isRecord(body.lead)) return { ok: false, reason: "missing lead object" };

  const raw = body.lead;
  const type = raw.type;
  if (type !== "contact" && type !== "quote") return { ok: false, reason: "unknown lead type" };

  const name = cleanString(raw.name, 120);
  if (!name) return { ok: false, reason: "missing name" };

  const email = cleanString(raw.email, 200);
  const phone = cleanString(raw.phone, 40);
  if (!email && !phone) return { ok: false, reason: "no email and no phone" };
  if (email && !EMAIL_RE.test(email)) return { ok: false, reason: "malformed email" };

  // A clipped note that reads as the whole story is worse than no note, so say
  // when there is more of it sitting on the row.
  const fullMessage = typeof raw.message === "string" ? raw.message.trim() : "";
  const message = !fullMessage
    ? null
    : fullMessage.length > MAX_MESSAGE_CHARS
      ? `${fullMessage.slice(0, MAX_MESSAGE_CHARS)}\n\n[Trimmed for this email. The full note is on the lead in /admin/leads.]`
      : fullMessage;

  const services = Array.isArray(raw.services)
    ? raw.services
        .filter((s): s is string => typeof s === "string")
        .slice(0, 20)
        .map((s) => s.slice(0, 40))
    : [];

  return {
    ok: true,
    // `stored: false` only when the browser tells us the insert failed, so an
    // unflagged payload is never treated as a lost lead by mistake.
    stored: body.stored !== false,
    lead: {
      type,
      name,
      email,
      phone,
      subject: cleanString(raw.subject, 60),
      message,
      move_size: cleanString(raw.move_size, 40),
      move_distance: cleanString(raw.move_distance, 40),
      move_type: cleanString(raw.move_type, 40),
      move_date: cleanString(raw.move_date, 20),
      from_zip: cleanString(raw.from_zip, 12),
      to_zip: cleanString(raw.to_zip, 12),
      services: services.length ? services : null,
      estimate_low: cleanNumber(raw.estimate_low),
      estimate_high: cleanNumber(raw.estimate_high),
    },
  };
}

/* ---------- formatting ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// move_date arrives as YYYY-MM-DD from a date input. Feeding that to `new
// Date()` lands on UTC midnight, which renders as the day before in Atlanta,
// so read the parts straight off the string instead.
function splitMoveDate(iso: string): { month: string; day: number; year: string } | null {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!parts) return null;
  const month = MONTHS[Number(parts[2]) - 1];
  if (!month) return null;
  return { month, day: Number(parts[3]), year: parts[1] };
}

function longDate(iso: string): string {
  const d = splitMoveDate(iso);
  return d ? `${d.month} ${d.day}, ${d.year}` : iso;
}

function shortDate(iso: string): string {
  const d = splitMoveDate(iso);
  return d ? `${d.month} ${d.day}` : iso;
}

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return `tel:${digits || phone}`;
}

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- the email ---------- */

function routeLabel(lead: LeadPayload): string | null {
  if (lead.from_zip && lead.to_zip) return `${lead.from_zip} to ${lead.to_zip}`;
  if (lead.from_zip) return `From ${lead.from_zip}`;
  if (lead.to_zip) return `To ${lead.to_zip}`;
  return null;
}

// The subject carries enough to triage from a lock screen without opening it.
function buildSubject(lead: LeadPayload, stored: boolean): string {
  const bits: string[] = [lead.name];

  if (lead.type === "quote") {
    const size = labelFor(SIZE_LABELS, lead.move_size);
    if (size) bits.push(size);
    const route = routeLabel(lead);
    if (route) bits.push(route);
  } else {
    const subject = labelFor(SUBJECT_LABELS, lead.subject);
    if (subject) bits.push(subject);
  }

  if (lead.move_date) bits.push(shortDate(lead.move_date));

  const heading = lead.type === "quote" ? "New quote request" : "New message";
  // Flagged loudly, because an unsaved lead exists in this email and nowhere
  // else. Losing it means losing the customer.
  const flag = stored ? "" : "[NOT SAVED] ";
  return `${flag}${heading}: ${bits.join(", ")}`;
}

// Ordered for someone standing in a driveway with one hand free: the date and
// the scope first, the long notes last.
function detailRows(lead: LeadPayload): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const push = (label: string, value: string | null | undefined) => {
    if (value) rows.push({ label, value });
  };

  if (lead.move_date) push("Target move date", longDate(lead.move_date));
  push("Asking about", labelFor(SUBJECT_LABELS, lead.subject));
  push("Home size", labelFor(SIZE_LABELS, lead.move_size));
  push("Distance", labelFor(DISTANCE_LABELS, lead.move_distance));
  push("Kind of move", labelFor(MOVE_TYPE_LABELS, lead.move_type));
  push("Route", routeLabel(lead));

  if (lead.services?.length) {
    push("Services wanted", lead.services.map((s) => labelFor(SERVICE_LABELS, s)).join(", "));
  }
  const low = lead.estimate_low;
  const high = lead.estimate_high;
  if (typeof low === "number" && typeof high === "number") {
    // What the calculator promised them. Quoting under it starts an argument.
    push("Estimate shown on site", `${money(low)} to ${money(high)}`);
  }

  push(lead.type === "quote" ? "Notes from the customer" : "Message", lead.message);
  return rows;
}

function receivedStamp(): string {
  return `${new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  })} ET`;
}

function buildHtml(lead: LeadPayload, stored: boolean): string {
  const eyebrow = lead.type === "quote" ? "New quote request" : "New website message";
  const tap =
    "display:block;margin:0 0 10px;padding:14px 16px;background:#f4f1ea;border:1px solid #ded8cb;" +
    "border-radius:10px;font-size:18px;font-weight:600;color:#1c1a17;text-decoration:none;";

  const parts: string[] = [];

  parts.push(
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;` +
      `font-size:16px;line-height:1.5;color:#1c1a17;max-width:600px;margin:0 auto;padding:24px 20px;">`
  );

  if (!stored) {
    parts.push(
      `<p style="margin:0 0 20px;padding:14px 16px;background:#fbeae5;border:1px solid #e0a897;` +
        `border-radius:10px;font-weight:600;">Heads up: saving this lead to the database failed. ` +
        `This email is the only copy, so reply or call before you delete it.</p>`
    );
  }

  parts.push(
    `<p style="margin:0 0 4px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a7264;">${esc(eyebrow)}</p>`
  );
  parts.push(`<p style="margin:0 0 18px;font-size:26px;font-weight:700;">${esc(lead.name)}</p>`);

  if (lead.phone) {
    parts.push(`<a href="${esc(telHref(lead.phone))}" style="${tap}">Call ${esc(lead.phone)}</a>`);
  }
  if (lead.email) {
    parts.push(
      `<a href="mailto:${esc(lead.email)}" style="${tap}">Email ${esc(lead.email)}</a>`
    );
  }

  const rows = detailRows(lead);
  if (rows.length) {
    parts.push(`<div style="margin-top:22px;border-top:1px solid #ded8cb;">`);
    for (const row of rows) {
      parts.push(
        `<div style="padding:12px 0;border-bottom:1px solid #eee9de;">` +
          `<div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#7a7264;">${esc(row.label)}</div>` +
          `<div style="margin-top:3px;white-space:pre-wrap;">${esc(row.value).replace(/\n/g, "<br />")}</div>` +
          `</div>`
      );
    }
    parts.push(`</div>`);
  }

  parts.push(
    `<p style="margin:20px 0 0;font-size:13px;color:#7a7264;">Submitted ${esc(receivedStamp())} ` +
      `from the ${lead.type === "quote" ? "quote" : "contact"} form on sobimoving.com.</p>`
  );
  parts.push(`</div>`);

  return parts.join("");
}

function buildText(lead: LeadPayload, stored: boolean): string {
  const lines: string[] = [];
  if (!stored) {
    lines.push("HEADS UP: saving this lead to the database failed. This email is the only copy.", "");
  }
  lines.push(lead.type === "quote" ? "NEW QUOTE REQUEST" : "NEW WEBSITE MESSAGE", "", lead.name);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.email) lines.push(`Email: ${lead.email}`);
  lines.push("");
  for (const row of detailRows(lead)) lines.push(`${row.label}: ${row.value}`);
  lines.push("", `Submitted ${receivedStamp()} from the ${lead.type} form on sobimoving.com.`);
  return lines.join("\n");
}

/* ---------- handler ---------- */

export async function POST(request: Request) {
  try {
    if (rateLimited(clientIp(request))) {
      return Response.json({ ok: false, error: "too many requests" }, { status: 429 });
    }

    const body = await request.text();
    if (body.length > MAX_BODY_CHARS) {
      return Response.json({ ok: false, error: "payload too large" }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
    }

    const result = validate(parsed);
    if (!result.ok) {
      return Response.json({ ok: false, error: result.reason }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.LEAD_NOTIFY_TO;
    if (!apiKey || !notifyTo) {
      // Not an error state yet: the site ships before the mailbox is wired up.
      console.warn(
        "[leads] Lead notification skipped. Set RESEND_API_KEY and LEAD_NOTIFY_TO to turn it on. " +
          "The lead is still saved in Supabase and visible at /admin/leads."
      );
      return Response.json({ ok: true, notified: false, reason: "not_configured" });
    }

    const recipients = notifyTo
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    if (!recipients.length) {
      console.warn("[leads] LEAD_NOTIFY_TO is set but holds no usable address. Notification skipped.");
      return Response.json({ ok: true, notified: false, reason: "not_configured" });
    }

    const { lead, stored } = result;
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_NOTIFY_FROM || "Sobi Moving Website <leads@sobimoving.com>",
      to: recipients,
      // Hitting reply in a mail app answers the customer, not the robot.
      replyTo: lead.email ?? undefined,
      subject: buildSubject(lead, stored),
      html: buildHtml(lead, stored),
      text: buildText(lead, stored),
    });

    if (error) {
      // Log the provider's message only. Never the key.
      console.error(`[leads] Resend refused the notification: ${error.name}: ${error.message}`);
      return Response.json({ ok: true, notified: false, reason: "send_failed" });
    }

    return Response.json({ ok: true, notified: true });
  } catch (err) {
    // Last resort. Answering 200 keeps a broken notifier invisible to the
    // customer, whose lead is already saved.
    console.error("[leads] Unexpected failure while notifying:", err instanceof Error ? err.message : err);
    return Response.json({ ok: true, notified: false, reason: "unexpected_error" });
  }
}
