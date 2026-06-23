import { createClient } from "@supabase/supabase-js";

// Cookieless Supabase client for PUBLIC reads (published posts, site content,
// sitemap). No next/headers dependency, so it's safe in metadata routes and
// keeps public pages cacheable. RLS still restricts what anon can read.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
