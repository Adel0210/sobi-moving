import { movingCompanySchema } from "@/lib/schema";
import type { SiteContent } from "@/lib/content";

// Emits the site-wide MovingCompany / LocalBusiness JSON-LD.
export function BusinessSchema({ content }: { content: SiteContent }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompanySchema(content)) }}
    />
  );
}
