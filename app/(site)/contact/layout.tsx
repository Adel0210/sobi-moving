import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sobi Moving",
  description: "Call or text Sobi Moving in metro Atlanta on (630) 456-1347. Woman-owned, licensed and insured, open 24 hours a day. Free quote in one short conversation.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
