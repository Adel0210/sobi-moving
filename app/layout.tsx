import type { Metadata } from "next";
// Order matters — fonts first, then the approved site stylesheets, unchanged.
import "./globals.css";
import "./legacy-styles/styles.css";
import "./legacy-styles/styles-pages.css";
import "./legacy-styles/styles-extras.css";
import "./legacy-styles/mobile.css";
import "./mobile-fixes.css";
// Imported after the stylesheets so it cannot inject anything ahead of them and
// disturb the cascade order above.
import { SiteAnalytics } from "./components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sobimoving.com"),
  title: {
    default: "Sobi Moving | Atlanta's Trusted Moving Company",
    template: "%s | Sobi Moving",
  },
  description:
    "Local and long-distance movers across metro Atlanta. Honest pricing, a careful crew, and full-service packing, moving, and setup.",
  openGraph: {
    type: "website",
    siteName: "Sobi Moving",
    locale: "en_US",
    // Placeholder until a real 1200x630 share image exists. The logo is square,
    // so it letterboxes, but an imageless share card is worse.
    images: [{ url: "/assets/logo.png", width: 512, height: 512, alt: "Sobi Moving" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Last in the body so instrumentation never sits ahead of the page
            content it measures. */}
        <SiteAnalytics />
      </body>
    </html>
  );
}
