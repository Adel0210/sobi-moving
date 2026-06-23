import type { Metadata } from "next";
// Order matters — fonts first, then the approved site stylesheets, unchanged.
import "./globals.css";
import "./legacy-styles/styles.css";
import "./legacy-styles/styles-pages.css";
import "./legacy-styles/styles-extras.css";
import "./legacy-styles/mobile.css";
import "./mobile-fixes.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sobimoving.com"),
  title: {
    default: "Sobi Moving — Atlanta's Trusted Moving Company",
    template: "%s | Sobi Moving",
  },
  description:
    "Local and long-distance movers across metro Atlanta — honest pricing, a careful crew, and full-service packing, moving, and setup.",
  icons: { icon: "/assets/logo.png" },
  openGraph: {
    type: "website",
    siteName: "Sobi Moving",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
