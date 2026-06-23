import type { MetadataRoute } from "next";
import { supabasePublic } from "@/lib/supabase/public";

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
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
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
