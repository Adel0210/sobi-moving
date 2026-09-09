"use client";

import { useEffect } from "react";
import {
  Analytics as VercelAnalytics,
  type BeforeSend,
} from "@vercel/analytics/next";
import {
  CONVERSION_EVENTS,
  trackConversion,
  type ConversionEvent,
} from "@/lib/analytics";

// Hosts that resolve to the Google Business Profile. A click on one of these is
// map pack adjacent: the visitor is heading for the profile, where the next step
// is usually a call placed from Google rather than from the site.
function isBusinessProfileLink(hostname: string, pathname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "maps.google.com" || host === "maps.app.goo.gl") return true;
  // google.com/maps and the country domains resolve the same profile.
  if (/^(www\.)?google\.[a-z]{2,3}(\.[a-z]{2,3})?$/.test(host)) {
    return pathname.startsWith("/maps");
  }
  return host === "goo.gl" && pathname.startsWith("/maps");
}

function conversionFor(link: HTMLAnchorElement): ConversionEvent | null {
  // protocol and hostname are read off the resolved href, so a relative link can
  // never be mistaken for an outbound one.
  if (link.protocol === "tel:") return CONVERSION_EVENTS.phone;
  if (link.protocol === "mailto:") return CONVERSION_EVENTS.email;
  if (isBusinessProfileLink(link.hostname, link.pathname)) {
    return CONVERSION_EVENTS.businessProfile;
  }
  return null;
}

// Staff traffic, on urls that carry lead and blog post ids. Dropping it keeps a
// clean public-site baseline and keeps internal urls off the wire. Anything that
// fails to parse is let through, because a broken guard must not be able to
// silently empty the pageview data.
const dropAdminTraffic: BeforeSend = (event) => {
  let path = "";
  try {
    path = new URL(event.url, window.location.origin).pathname;
  } catch {
    return event;
  }
  return path.startsWith("/admin") ? null : event;
};

/**
 * Site-wide analytics, mounted once in the root layout.
 *
 * The phone number appears in the nav, the footer, hero rows, CTAs and the
 * forms, spread across a lot of files. Rather than an onClick on every one of
 * them, this uses a single delegated listener on document, so a phone link added
 * anywhere on the site is attributed from the moment it ships.
 */
export function SiteAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      try {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest("a");
        if (!link) return;
        const conversion = conversionFor(link);
        if (!conversion) return;
        // Read at click time rather than from a render closure, so the pathname
        // is right even though the root layout does not rerender on navigation.
        // Sent synchronously, with no preventDefault and nothing awaited, so a
        // phone tap reaches the dialer exactly as fast as it did before.
        trackConversion(conversion, window.location.pathname);
      } catch {
        // A tracking failure must never swallow or break the click itself.
      }
    };

    // Capture phase on document: one listener covers the whole site, and it runs
    // before any stopPropagation deeper in the tree could hide the click.
    // passive states what is true, that the handler never calls preventDefault.
    document.addEventListener("click", onClick, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return <VercelAnalytics beforeSend={dropAdminTraffic} />;
}
