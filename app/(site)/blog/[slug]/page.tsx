import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { supabasePublic } from "@/lib/supabase/public";
import type { Post } from "@/lib/types";
import "../blog.css";

export const revalidate = 60;

const SITE_URL = "https://www.sobimoving.com";
const LOGO_URL = `${SITE_URL}/assets/logo.png`;

type Params = { params: Promise<{ slug: string }> };

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function absolute(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return data as Post;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("slug")
      .eq("status", "published");
    if (error || !data) return [];
    return data.map((row: { slug: string }) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || undefined;
  const canonical = post.canonical_url || `/blog/${slug}`;
  const ogImage = absolute(post.og_image || post.cover_image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: ogImage ? [ogImage] : undefined,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: post.author_name ? [post.author_name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: post.noindex ? { index: false, follow: false } : undefined,
  };
}

const PostPage = async ({ params }: Params) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const html = await marked.parse(post.body ?? "");
  const canonical = post.canonical_url || `${SITE_URL}/blog/${slug}`;
  const canonicalAbs = absolute(canonical) || `${SITE_URL}/blog/${slug}`;
  const coverAbs = absolute(post.cover_image);

  // ── JSON-LD ──────────────────────────────────────────────────────────
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: coverAbs ? [coverAbs] : undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: {
      "@type": "Person",
      name: post.author_name || "Sobi Moving",
      description: post.author_credentials || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Sobi Moving",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalAbs },
  };

  const faqLd =
    post.faq && post.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalAbs },
    ],
  };

  return (
    <main className="page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="blog-article">
        {/* Breadcrumb */}
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="sep">/</span>
          <span className="current">{post.title}</span>
        </nav>

        {post.category && (
          <div className="eyebrow" style={{ marginTop: 22 }}>
            {post.category}
          </div>
        )}
        <h1>{post.title}</h1>

        {/* Byline */}
        <div className="blog-byline">
          {post.author_name && <span className="author">{post.author_name}</span>}
          {post.author_credentials && (
            <span className="creds">, {post.author_credentials}</span>
          )}
          {post.published_at && (
            <>
              <span className="dot">·</span>
              <span>{formatDate(post.published_at)}</span>
            </>
          )}
          {post.reading_minutes ? (
            <>
              <span className="dot">·</span>
              <span>{post.reading_minutes} min read</span>
            </>
          ) : null}
        </div>
        {post.reviewed_at && (
          <div className="blog-reviewed">Reviewed {formatDate(post.reviewed_at)}</div>
        )}

        {/* Cover */}
        {post.cover_image && (
          <div className="blog-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image} alt={post.cover_alt || post.title} />
          </div>
        )}

        {/* TL;DR / Quick answer */}
        {post.tldr && (
          <div className="blog-tldr">
            <div className="label">Quick answer</div>
            <p>{post.tldr}</p>
          </div>
        )}

        {/* Key takeaways */}
        {post.key_takeaways && post.key_takeaways.length > 0 && (
          <div className="blog-takeaways">
            <h2>Key takeaways</h2>
            <ul>
              {post.key_takeaways.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Body */}
        <div className="blog-body" dangerouslySetInnerHTML={{ __html: html }} />

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="blog-faq">
            <h2>Frequently asked questions</h2>
            {post.faq.map((f, i) => (
              <div key={i} className="blog-faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        {/* Sources */}
        {post.sources && post.sources.length > 0 && (
          <section className="blog-sources">
            <h2>Sources</h2>
            <ol>
              {post.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* End CTA */}
        <section className="blog-cta">
          <h2>Ready for a calmer move?</h2>
          <p>
            Get an honest, no-pressure quote from a metro Atlanta crew that
            treats your home like their own.
          </p>
          <Link href="/quote" className="btn btn-primary btn-arrow">
            Get your free quote
          </Link>
        </section>
      </article>
    </main>
  );
};

export default PostPage;
