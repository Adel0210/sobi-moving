// Phone and text links, built in one place so every page dials and messages the
// same number in the same format.
//
// The site stores the number as bare digits (see lib/content.ts). tel: is happy
// with that; sms: is not, reliably — iOS and Android both want the full E.164
// form before they will prefill a recipient, so the country code goes on here.

function e164(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return `+${d}`;
}

export function telHref(digits: string): string {
  return `tel:${digits.replace(/\D/g, "")}`;
}

/**
 * A text link, optionally carrying a first message.
 *
 * The `?&body=` spelling is deliberate and is not a typo: iOS historically
 * wants `&body=` while Android wants `?body=`, and this form is the one both
 * accept. A phone that ignores the body still opens a message to the right
 * number, which is the part that matters.
 */
export function smsHref(digits: string, body?: string): string {
  const to = e164(digits);
  return body ? `sms:${to}?&body=${encodeURIComponent(body)}` : `sms:${to}`;
}
