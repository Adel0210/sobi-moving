import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "../AdminHeader";
import { Icon } from "@/app/components/Icon";
import type { Post } from "@/lib/types";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <>
        <AdminHeader title="Blog" sub="Write and publish SEO-optimized posts." />
        <div className="admin-content">
          <div className="admin-note">
            <strong>The posts table isn&apos;t set up yet.</strong> Run the blog schema in Supabase, then
            your posts will appear here.
          </div>
        </div>
      </>
    );
  }

  const posts = (data ?? []) as Post[];
  const published = posts.filter((p) => p.status === "published").length;

  return (
    <>
      <AdminHeader title="Blog" sub="Write and publish SEO-optimized posts." />
      <div className="admin-content">
        <div className="admin-toolbar">
          <div className="t-sub">{posts.length} total · {published} published</div>
          <Link className="btn-sm" href="/admin/blog/new"><Icon name="plus" size={14} /> New post</Link>
        </div>

        {posts.length === 0 ? (
          <div className="admin-panel">
            <div className="admin-empty">
              <div><Icon name="sparkles" size={34} /></div>
              No posts yet — write your first SEO-optimized article.
            </div>
          </div>
        ) : (
          <div className="admin-panel">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Status</th><th>Updated</th></tr></thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/blog/${p.id}`}>
                        <div className="t-name">{p.title || "Untitled"}</div>
                        <div className="t-sub">/{p.slug || "no-slug"}</div>
                      </Link>
                    </td>
                    <td>
                      <span className={`status-pill ${p.status === "published" ? "status-won" : "status-new"}`}>
                        {p.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="t-sub">{fmtDate(p.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
