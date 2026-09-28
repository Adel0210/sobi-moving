// Google Ads conversion tracking for the public site.
//
// The conversion id and label are not secrets: gtag.js ships them in the page
// source of every site that runs Ads, and Google's own setup flow hands them
// out by email. They live here as constants so the tag, the event and any
// future conversion action all read from one place.
//
// This is the client's own Google Ads account. Nothing here is shared with, or
// routed through, any other property.
export const GOOGLE_ADS_ID = "AW-18424228441";

// Two conversion actions exist in the Ads account, one per form. Both fire on
// the success branch of their form, because the site confirms a lead in place
// rather than redirecting to a separate thank-you page.
//
// "Contact" for the contact form.
export const CONTACT_CONVERSION_LABEL = "0B7UCKDbuPscENnUrdFE";
// "Quote Form Submit" for the quote wizard.
export const QUOTE_CONVERSION_LABEL = "2FPMCJrbuPscENnUrdFE";

export const CONVERSION_SEND_TO = {
  contact: `${GOOGLE_ADS_ID}/${CONTACT_CONVERSION_LABEL}`,
  quote: `${GOOGLE_ADS_ID}/${QUOTE_CONVERSION_LABEL}`,
} as const;

export type LeadFormKind = keyof typeof CONVERSION_SEND_TO;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Reports one completed lead form to Google Ads.
 *
 * Takes which form it was, so the contact form and the quote wizard land on
 * their own conversion actions instead of being merged into one number.
 *
 * A no-op unless gtag.js has loaded, so an ad blocker, a blocked request or a
 * dropped script costs nothing and breaks nothing. No name, email, phone
 * number or address is ever passed: the payload is the conversion label and a
 * flat value, exactly as Google's snippet defines it.
 */
export function trackLeadConversion(form: LeadFormKind): void {
  try {
    window.gtag?.("event", "conversion", {
      send_to: CONVERSION_SEND_TO[form],
      value: 1.0,
      currency: "USD",
    });
  } catch {
    // Swallowed on purpose: tracking must never be the reason a form fails.
  }
}
