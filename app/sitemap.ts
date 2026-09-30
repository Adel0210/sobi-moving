import type { MetadataRoute } from "next";
import { supabasePublic } from "@/lib/supabase/public";
import { LOCATIONS } from "@/lib/locations";
import { SERVICE_TYPES } from "@/lib/serviceTypes";
import { CITY_SERVICES } from "@/lib/cityServices";
import { getWorkClips } from "@/lib/workClips";

// Regenerate hourly so newly published blog posts appear in the sitemap
// without needing a redeploy.
export const revalidate = 3600;

const SITE_URL = "https://www.sobimoving.com";

const STATIC_ROUTES = [
  "",
  "/services",
  "/senior-moving",
  "/about",
  "/contact",
  "/quote",
  "/blog",
  "/movers",
  ...SERVICE_TYPES.map((s) => `/services/${s.slug}`),
  ...LOCATIONS.map((l) => `/movers/${l.slug}`),
  ...CITY_SERVICES.map((x) => `/movers/${x.citySlug}/${x.serviceSlug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // /our-work is submitted only once it actually has footage on it. An empty
  // proof-of-work page is a thin page, and asking Google to index one is how a
  // site teaches it to expect thin pages.
  const clips = await getWorkClips();
  const routes = clips.length ? [...STATIC_ROUTES, "/our-work"] : STATIC_ROUTES;

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("slug, updated_at")
      .eq("status", "published");

    if (!error && data) {
      postEntries = data.map((post: { slug: string; updated_at: string | null }) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    }
  } catch {
    /* Supabase unavailable — return static routes only */
  }

  return [...staticEntries, ...postEntries];
}
