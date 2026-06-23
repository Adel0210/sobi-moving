import { supabasePublic } from "@/lib/supabase/public";

export type SiteContent = Record<string, string>;

// Current site copy = the defaults. Editing a field in the admin overrides it;
// anything not overridden falls back here, so the site never breaks.
export const CONTENT_DEFAULTS: SiteContent = {
  phone_display: "(630) 456-1347",
  phone_tel: "6304561347",
  email: "hello@sobimoving.com",
  hours: "Mon–Sun · 7:30am–8:00pm",
  address: "2208 Treelodge Pkwy, Sandy Springs, GA 30350",
  hero_eyebrow: "Atlanta Moving Company · Locally Owned",
  hero_headline: "Atlanta movers",
  hero_em: "you'll actually recommend.",
  hero_sub: "Local and long distance moves across metro Atlanta, done with honest pricing and a careful crew.",
  moves_stat: "2000+",
};

// Friendly labels + grouping for the admin Content editor.
export const CONTENT_FIELDS: { group: string; key: string; label: string; multiline?: boolean }[] = [
  { group: "Business info", key: "phone_display", label: "Phone (shown)" },
  { group: "Business info", key: "phone_tel", label: "Phone (dial — digits only)" },
  { group: "Business info", key: "email", label: "Email" },
  { group: "Business info", key: "hours", label: "Hours" },
  { group: "Business info", key: "address", label: "Address" },
  { group: "Homepage hero", key: "hero_eyebrow", label: "Eyebrow (small label)" },
  { group: "Homepage hero", key: "hero_headline", label: "Headline (line 1)" },
  { group: "Homepage hero", key: "hero_em", label: "Headline accent (line 2)" },
  { group: "Homepage hero", key: "hero_sub", label: "Sub-headline", multiline: true },
  { group: "Homepage hero", key: "moves_stat", label: "Moves-completed stat" },
];

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabasePublic.from("site_content").select("key,value");
    if (error || !data) return { ...CONTENT_DEFAULTS };
    const overrides = Object.fromEntries(data.map((r) => [r.key as string, r.value as string]));
    return { ...CONTENT_DEFAULTS, ...overrides };
  } catch {
    return { ...CONTENT_DEFAULTS };
  }
}
