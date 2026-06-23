import type { Metadata } from "next";
import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/public";
import type { Post } from "@/lib/types";
import "./blog.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Moving Tips & Guides",
  description:
    "Practical moving advice for metro Atlanta — packing guides, cost breakdowns, senior-move tips, and checklists from the Sobi Moving crew.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const BlogIndexPage = async () => {
  let posts: Post[] = [];

  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data) posts = data as Post[];
  } catch {
    /* table missing or connection error — fall through to empty state */
  }

  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="container">
          <div className="blog-head">
            <div className="eyebrow">Sobi Moving Blog</div>
            <h1 style={{ marginTop: 8 }}>Moving tips &amp; guides for metro Atlanta.</h1>
            <p className="lead">
              Honest advice from the crew that does this every day — how to pack
              smart, what a move really costs, and how to make moving day calm
              instead of chaotic.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="blog-empty">
              <h2>No posts yet</h2>
              <p>
                We&apos;re putting together our best moving guides right now.
                Check back soon for tips, checklists, and cost breakdowns.
              </p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-media">
                    {post.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_image}
                        alt={post.cover_alt || post.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="blog-card-fallback">Sobi Moving</div>
                    )}
                  </div>
                  <div className="blog-card-body">
                    {post.category && <div className="eyebrow">{post.category}</div>}
                    <h2 className="blog-card-title">{post.title}</h2>
                    {post.excerpt && (
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                    )}
                    <div className="blog-card-meta">
                      {post.published_at && <span>{formatDate(post.published_at)}</span>}
                      {post.published_at && post.reading_minutes ? (
                        <span className="dot">·</span>
                      ) : null}
                      {post.reading_minutes ? (
                        <span>{post.reading_minutes} min read</span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogIndexPage;
