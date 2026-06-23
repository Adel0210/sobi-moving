"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";
import type { Post, FaqItem, Source } from "@/lib/types";

type PostForm = Partial<Post>;

const emptyPost: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image: "",
  cover_alt: "",
  category: "",
  tags: [],
  author_name: "",
  author_credentials: "",
  author_bio: "",
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  focus_keyword: "",
  noindex: false,
  og_image: "",
  tldr: "",
  key_takeaways: [],
  faq: [],
  sources: [],
  service_area: "",
  status: "draft",
  reviewed_at: "",
  reading_minutes: null,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const estimateMinutes = (body: string) => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return words > 0 ? Math.max(1, Math.round(words / 200)) : null;
};

export function PostEditor({ postId }: { postId: string | null }) {
  const supabase = createClient();
  const [form, setForm] = useState<PostForm>({ ...emptyPost });
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  // comma-separated tags as a raw string for friendly editing
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    let active = true;
    if (!postId) return;
    (async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
      if (!active) return;
      if (error || !data) {
        setMsg({ kind: "err", text: error?.message ?? "Post not found." });
      } else {
        const p = data as Post;
        setForm(p);
        setTagsInput((p.tags ?? []).join(", "));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const set = <K extends keyof PostForm>(key: K, value: PostForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // title → slug auto-fill while slug is empty
  const onTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug ? f.slug : slugify(title) }));
  };

  // ---- repeater helpers ----
  const takeaways = form.key_takeaways ?? [];
  const setTakeaway = (i: number, v: string) =>
    set("key_takeaways", takeaways.map((t, idx) => (idx === i ? v : t)));
  const addTakeaway = () => set("key_takeaways", [...takeaways, ""]);
  const removeTakeaway = (i: number) => set("key_takeaways", takeaways.filter((_, idx) => idx !== i));

  const faqs: FaqItem[] = form.faq ?? [];
  const setFaq = (i: number, field: keyof FaqItem, v: string) =>
    set("faq", faqs.map((f, idx) => (idx === i ? { ...f, [field]: v } : f)));
  const addFaq = () => set("faq", [...faqs, { q: "", a: "" }]);
  const removeFaq = (i: number) => set("faq", faqs.filter((_, idx) => idx !== i));

  const sources: Source[] = form.sources ?? [];
  const setSource = (i: number, field: keyof Source, v: string) =>
    set("sources", sources.map((s, idx) => (idx === i ? { ...s, [field]: v } : s)));
  const addSource = () => set("sources", [...sources, { label: "", url: "" }]);
  const removeSource = (i: number) => set("sources", sources.filter((_, idx) => idx !== i));

  const save = async () => {
    setSaving(true);
    setMsg(null);
    const now = new Date().toISOString();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: PostForm = {
      ...form,
      tags,
      slug: form.slug || slugify(form.title ?? ""),
      key_takeaways: takeaways.filter((t) => t.trim()),
      faq: faqs.filter((f) => f.q.trim() || f.a.trim()),
      sources: sources.filter((s) => s.label.trim() || s.url.trim()),
      reading_minutes: form.reading_minutes ?? estimateMinutes(form.body ?? ""),
      reviewed_at: form.reviewed_at || null,
      updated_at: now,
    };
    if (payload.status === "published" && !payload.published_at) {
      payload.published_at = now;
    }
    // drop fields the DB manages on insert/identity
    delete payload.id;
    delete payload.created_at;

    if (postId) {
      const { error } = await supabase.from("posts").update(payload).eq("id", postId);
      setSaving(false);
      if (error) {
        setMsg({ kind: "err", text: error.message });
      } else {
        setForm((f) => ({ ...f, ...payload }));
        setMsg({ kind: "ok", text: "Saved." });
      }
    } else {
      const { data, error } = await supabase.from("posts").insert(payload).select().single();
      setSaving(false);
      if (error || !data) {
        setMsg({ kind: "err", text: error?.message ?? "Could not create post." });
      } else {
        window.location.assign(`/admin/blog/${(data as Post).id}`);
      }
    }
  };

  const remove = async () => {
    if (!postId) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      setMsg({ kind: "err", text: error.message });
    } else {
      window.location.assign("/admin/blog");
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="admin-empty">Loading post…</div>
      </div>
    );
  }

  const inputStyle = { minHeight: 0 } as const;

  return (
    <div className="admin-panel" style={{ padding: 20, maxWidth: 820 }}>
      {/* CONTENT */}
      <div className="admin-section-label">Content</div>
      <Field label="Title">
        <input className="note-input" style={inputStyle} value={form.title ?? ""} onChange={(e) => onTitleChange(e.target.value)} />
      </Field>
      <Field label="Slug">
        <input className="note-input" style={inputStyle} value={form.slug ?? ""} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="auto-generated-from-title" />
      </Field>
      <Field label="Excerpt">
        <textarea className="note-input" value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
      </Field>
      <Field label="Body" hint="Markdown supported">
        <textarea className="note-input" rows={16} value={form.body ?? ""} onChange={(e) => set("body", e.target.value)} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Cover image (URL)">
          <input className="note-input" style={inputStyle} value={form.cover_image ?? ""} onChange={(e) => set("cover_image", e.target.value)} />
        </Field>
        <Field label="Cover alt text">
          <input className="note-input" style={inputStyle} value={form.cover_alt ?? ""} onChange={(e) => set("cover_alt", e.target.value)} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Category">
          <input className="note-input" style={inputStyle} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} />
        </Field>
        <Field label="Tags" hint="comma-separated">
          <input className="note-input" style={inputStyle} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="moving, packing, tips" />
        </Field>
      </div>

      {/* AUTHOR */}
      <div className="admin-section-label">Author (E-E-A-T)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Author name">
          <input className="note-input" style={inputStyle} value={form.author_name ?? ""} onChange={(e) => set("author_name", e.target.value)} />
        </Field>
        <Field label="Credentials">
          <input className="note-input" style={inputStyle} value={form.author_credentials ?? ""} onChange={(e) => set("author_credentials", e.target.value)} placeholder="15+ years, licensed mover" />
        </Field>
      </div>
      <Field label="Author bio">
        <textarea className="note-input" value={form.author_bio ?? ""} onChange={(e) => set("author_bio", e.target.value)} />
      </Field>

      {/* SEO */}
      <div className="admin-section-label">SEO</div>
      <Field label="Meta title" hint="50–60 characters">
        <input className="note-input" style={inputStyle} value={form.meta_title ?? ""} onChange={(e) => set("meta_title", e.target.value)} />
      </Field>
      <Field label="Meta description" hint="150–160 characters">
        <textarea className="note-input" value={form.meta_description ?? ""} onChange={(e) => set("meta_description", e.target.value)} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Canonical URL">
          <input className="note-input" style={inputStyle} value={form.canonical_url ?? ""} onChange={(e) => set("canonical_url", e.target.value)} />
        </Field>
        <Field label="Focus keyword">
          <input className="note-input" style={inputStyle} value={form.focus_keyword ?? ""} onChange={(e) => set("focus_keyword", e.target.value)} />
        </Field>
      </div>
      <Field label="OG image (URL)">
        <input className="note-input" style={inputStyle} value={form.og_image ?? ""} onChange={(e) => set("og_image", e.target.value)} />
      </Field>
      <div className="dk" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <input type="checkbox" checked={!!form.noindex} onChange={(e) => set("noindex", e.target.checked)} />
        noindex (hide this post from search engines)
      </div>

      {/* GEO / AEO */}
      <div className="admin-section-label">GEO / AEO</div>
      <Field label="TL;DR" hint="quick answer for AI engines">
        <textarea className="note-input" value={form.tldr ?? ""} onChange={(e) => set("tldr", e.target.value)} />
      </Field>

      <div className="dk" style={{ marginBottom: 6 }}>Key takeaways</div>
      {takeaways.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input className="note-input" style={inputStyle} value={t} onChange={(e) => setTakeaway(i, e.target.value)} />
          <button className="btn-sm ghost" type="button" onClick={() => removeTakeaway(i)}><Icon name="trash" size={14} /></button>
        </div>
      ))}
      <button className="btn-sm ghost" type="button" onClick={addTakeaway} style={{ marginBottom: 16 }}><Icon name="plus" size={14} /> Add takeaway</button>

      <div className="dk" style={{ marginBottom: 6 }}>FAQ</div>
      {faqs.map((f, i) => (
        <div key={i} style={{ border: "1px solid var(--a-line, #e6e1d8)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <input className="note-input" style={{ ...inputStyle, marginBottom: 8 }} placeholder="Question" value={f.q} onChange={(e) => setFaq(i, "q", e.target.value)} />
          <textarea className="note-input" placeholder="Answer" value={f.a} onChange={(e) => setFaq(i, "a", e.target.value)} />
          <div style={{ marginTop: 6 }}>
            <button className="btn-sm ghost" type="button" onClick={() => removeFaq(i)}><Icon name="trash" size={14} /> Remove</button>
          </div>
        </div>
      ))}
      <button className="btn-sm ghost" type="button" onClick={addFaq} style={{ marginBottom: 16 }}><Icon name="plus" size={14} /> Add FAQ</button>

      <div className="dk" style={{ marginBottom: 6 }}>Sources</div>
      {sources.map((s, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 8 }}>
          <input className="note-input" style={inputStyle} placeholder="Label" value={s.label} onChange={(e) => setSource(i, "label", e.target.value)} />
          <input className="note-input" style={inputStyle} placeholder="https://…" value={s.url} onChange={(e) => setSource(i, "url", e.target.value)} />
          <button className="btn-sm ghost" type="button" onClick={() => removeSource(i)}><Icon name="trash" size={14} /></button>
        </div>
      ))}
      <button className="btn-sm ghost" type="button" onClick={addSource} style={{ marginBottom: 16 }}><Icon name="plus" size={14} /> Add source</button>

      <Field label="Service area">
        <input className="note-input" style={inputStyle} value={form.service_area ?? ""} onChange={(e) => set("service_area", e.target.value)} placeholder="Sydney, NSW" />
      </Field>

      {/* PUBLISH */}
      <div className="admin-section-label">Publish</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Field label="Status">
          <select className="note-input" style={inputStyle} value={form.status ?? "draft"} onChange={(e) => set("status", e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Reviewed at">
          <input type="date" className="note-input" style={inputStyle} value={(form.reviewed_at ?? "").slice(0, 10)} onChange={(e) => set("reviewed_at", e.target.value)} />
        </Field>
        <Field label="Reading minutes" hint="blank = auto-estimate">
          <input type="number" className="note-input" style={inputStyle} value={form.reading_minutes ?? ""} onChange={(e) => set("reading_minutes", e.target.value === "" ? null : Number(e.target.value))} />
        </Field>
      </div>

      {msg ? (
        <div className={msg.kind === "ok" ? "admin-note" : "admin-note"} style={{ color: msg.kind === "err" ? "#a23b22" : undefined, marginBottom: 12 }}>
          {msg.text}
        </div>
      ) : null}

      <div className="note-actions" style={{ marginTop: 16, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-sm" disabled={saving} onClick={save}>
            {saving ? "Saving…" : postId ? "Save changes" : "Create post"}
          </button>
          {postId && form.status === "published" && form.slug ? (
            <a className="btn-sm ghost" href={`/blog/${form.slug}`} target="_blank" rel="noreferrer">
              <Icon name="arrow-right" size={14} /> View
            </a>
          ) : null}
        </div>
        {postId ? (
          <button className="btn-sm ghost" type="button" onClick={remove} style={{ color: "#a23b22" }}>
            <Icon name="trash" size={14} /> Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="dk" style={{ marginBottom: 6 }}>
        {label}
        {hint ? <span className="t-sub" style={{ marginLeft: 8, fontWeight: 400 }}>{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
