import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Services in Atlanta — Packing & Setup",
  description: "Moving, packing, white-glove setup, furniture assembly and junk removal across metro Atlanta — pick only what you need. Woman-owned, 5.0 from 32 reviews.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
