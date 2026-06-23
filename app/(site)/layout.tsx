import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { getContent } from "@/lib/content";

// Layout for the public marketing site. The /admin area lives outside this
// group, so it gets neither the nav nor the footer.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();
  return (
    <>
      <SiteNav phoneDisplay={c.phone_display} phoneTel={c.phone_tel} />
      {children}
      <SiteFooter phoneDisplay={c.phone_display} phoneTel={c.phone_tel} email={c.email} hours={c.hours} />
    </>
  );
}
