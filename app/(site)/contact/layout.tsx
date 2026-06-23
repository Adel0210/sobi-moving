import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sobi Moving",
  description: "Get in touch with Sobi Moving in metro Atlanta. Call (630) 456-1347 or send a message — free consultation, fast same-day replies, no pressure.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
