import type { Metadata } from "next";
export const metadata: Metadata = { title: "Get a Free Moving Quote", description: "Tell us about your move — size, distance, and services — and get a custom, no-obligation quote from Sobi Moving, metro Atlanta's trusted movers." };
export default function QuoteLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
