import type { Metadata } from "next";
export const metadata: Metadata = { title: "Get a Free Moving Quote", description: "Call or text (630) 456-1347 for a free moving quote across metro Atlanta. Itemized, same day, no obligation. Woman-owned, 5.0 from 32 Google reviews.", alternates: { canonical: "/quote" } };
export default function QuoteLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
