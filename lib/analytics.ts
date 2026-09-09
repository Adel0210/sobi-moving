import { track } from "@vercel/analytics";

// Browser-only analytics helpers. Every call here is a no-op unless the Vercel
// Analytics script has loaded, so an ad blocker, a blocked request or a project
// with Web Analytics switched off costs nothing and breaks nothing.

// Conversion event names, exactly as they read in the Vercel dashboard. Held as
// constants so the dashboard filters and the code cannot drift apart.
export const CONVERSION_EVENTS = {
  phone: "Phone Call Click",
  email: "Email Click",
  businessProfile: "Business Profile Click",
} as const;

export type ConversionEvent =
  (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS];

/**
 * Records a conversion click against the page that produced it.
 *
 * The payload is deliberately two fields: an event name and a pathname. No
 * phone number, email address, name, address, query string or hash is ever
 * sent, so nothing here identifies a visitor and nothing needs a cookie banner.
 */
export function trackConversion(event: ConversionEvent, path: string): void {
  // Staff activity is not a customer conversion. The admin lead table renders a
  // tel: link for the customer's own number, so a callback placed from the panel
  // would otherwise land in the data as an inbound call on an /admin page.
  if (path.startsWith("/admin")) return;

  try {
    track(event, { path });
  } catch {
    // Swallowed on purpose: tracking must never be the reason a click fails.
  }
}

// GA4 seam, deliberately left empty.
//
// No GA4 property exists for this site, and the ownership rules in AGENTS.md
// forbid wiring a shared or third-party analytics account into this project. If
// this site ever gets a property of its own, this is the single place that needs
// a second send:
//
//   window.gtag?.("event", event, { page_path: path });
//
// Doing that also means adding a gtag loader and settling consent first, since
// GA4 sets cookies and nothing in the current setup does. Do not add either
// without re-reading the ownership rules.
