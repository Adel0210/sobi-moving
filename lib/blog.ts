import { supabasePublic } from "@/lib/supabase/public";
import type { Post } from "@/lib/types";
import { STATIC_POSTS } from "@/lib/posts";

// Blog posts come from two places and are read through this one module.
//
// 1. Supabase `posts` — written in the admin editor. Heebel's own posts.
// 2. `lib/posts/*.ts` — posts shipped with the code. Authored in the repo, so
//    they can be reviewed in a diff and published with a deploy instead of a
//    login. Each file exports one StaticPost.
//
// A Supabase post wins over a static post with the same slug, so a post
// started in the repo can later be taken over in the admin without a code
// change. Only published rows are ever returned from here.

export type StaticPost = Omit<Post, "id" | "created_at" | "updated_at"> & {
  published_at: string; // ISO date; static posts are published by definition
  updated_at?: string; // optional ISO date; defaults to published_at
};

function fromStatic(p: StaticPost): Post {
  return {
    ...p,
    id: `static:${p.slug}`,
    created_at: p.published_at,
    updated_at: p.updated_at ?? p.published_at,
    status: "published",
  };
}

async function supabasePublished(): Promise<Post[]> {
  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("*")
      .eq("status", "published");
    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

// A static post with a published_at in the future is scheduled, not live. The
// blog pages revalidate every 60 seconds, so it appears on its own once the
// date passes; nothing has to be deployed on the day.
function isLive(p: { published_at: string | null }, now = Date.now()): boolean {
  return !!p.published_at && Date.parse(p.published_at) <= now;
}

/** Every published post, newest first. Scheduled posts are excluded until due. */
export async function getPublishedPosts(): Promise<Post[]> {
  const db = await supabasePublished();
  const taken = new Set(db.map((p) => p.slug));
  const merged = [
    ...db,
    ...STATIC_POSTS.filter((p) => !taken.has(p.slug) && isLive(p)).map(fromStatic),
  ];
  return merged.sort((a, b) =>
    (b.published_at ?? "").localeCompare(a.published_at ?? ""),
  );
}

/** One published post by slug, or null. */
export async function getPublishedPost(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (!error && data) return data as Post;
  } catch {
    // fall through to the static set
  }
  const s = STATIC_POSTS.find((p) => p.slug === slug);
  return s && isLive(s) ? fromStatic(s) : null;
}
