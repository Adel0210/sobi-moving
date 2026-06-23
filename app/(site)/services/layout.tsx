import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Services — Packing, Setup & More",
  description: "Full-service moving, packing, white-glove setup, unpacking, furniture assembly, and junk removal across metro Atlanta — transparent pricing from Sobi Moving.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
