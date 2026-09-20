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

// Conversion action: "Contact". Fired when a visitor completes either public
// form, because the site confirms a lead in place rather than redirecting to a
// separate thank-you page.
export const LEAD_CONVERSION_LABEL = "0B7UCKDbuPscENnUrdFE";
export const LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/${LEAD_CONVERSION_LABEL}`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Reports one completed lead form to Google Ads.
 *
 * A no-op unless gtag.js has loaded, so an ad blocker, a blocked request or a
 * dropped script costs nothing and breaks nothing. No name, email, phone
 * number or address is ever passed: the payload is the conversion label and a
 * flat value, exactly as Google's snippet defines it.
 */
export function trackLeadConversion(): void {
  try {
    window.gtag?.("event", "conversion", {
      send_to: LEAD_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
    });
  } catch {
    // Swallowed on purpose: tracking must never be the reason a form fails.
  }
}
