"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";
import { ImageUpload } from "../ImageUpload";
import { LOCATIONS } from "@/lib/locations";
import { SERVICE_TYPES } from "@/lib/serviceTypes";

export type WorkClipRow = {
  id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  src: string | null;
  poster: string | null;
  city: string | null;
  service: string | null;
  duration_seconds: number | null;
  filmed_on: string | null;
  sort_order: number | null;
  status: string | null;
};

// Slug is what the anchor and the JSON-LD @id are built from, so it has to be
// url-safe and it has to stay put once a clip is published.
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function blankRow(): WorkClipRow {
  return {
    id: "",
    slug: "",
    title: "",
    description: "",
    src: "",
    poster: "",
    city: "",
    service: "",
    duration_seconds: null,
    filmed_on: "",
    sort_order: 0,
    status: "draft",
  };
}

export function WorkClient({ initial }: { initial: WorkClipRow[] }) {
  const [rows, setRows] = useState<WorkClipRow[]>(initial);
  const [editing, setEditing] = useState<WorkClipRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const published = rows.filter((r) => r.status === "published").length;

  const patch = (fields: Partial<WorkClipRow>) =>
    setEditing((prev) => (prev ? { ...prev, ...fields } : prev));

  const save = async () => {
    if (!editing) return;
    setError(null);

    const slug = (editing.slug || slugify(editing.title ?? "")).trim();
    if (!editing.title?.trim()) return setError("Give the clip a title.");
    if (!slug) return setError("Give the clip a title that contains some letters or numbers.");
    if (!editing.src?.trim()) return setError("Upload the video file, or paste its URL.");
    if (!editing.poster?.trim()) return setError("Upload a still frame. Without one the card is a black box and Google will not treat it as a video.");
    // Google counts uploadDate among the required VideoObject fields, so a clip
    // without a date is a clip that will not be indexed as video.
    if (!editing.filmed_on?.trim()) return setError("Set the date the clip was filmed — Google needs it before it will index the video.");
    if (!editing.description?.trim()) return setError("Write a sentence or two saying what the visitor is watching. It shows on the card and it goes into the page's structured data.");

    setSaving(true);
    const supabase = createClient();
    const payload = {
      slug,
      title: editing.title.trim(),
      description: editing.description?.trim() ?? "",
      src: editing.src.trim(),
      poster: editing.poster.trim(),
      city: editing.city?.trim() || null,
      service: editing.service?.trim() || null,
      duration_seconds: editing.duration_seconds ?? null,
      filmed_on: editing.filmed_on?.trim() || null,
      sort_order: editing.sort_order ?? 0,
      status: editing.status ?? "draft",
    };

    const query = editing.id
      ? supabase.from("work_clips").update(payload).eq("id", editing.id).select().single()
      : supabase.from("work_clips").insert(payload).select().single();

    const { data, error: err } = await query;
    setSaving(false);

    if (err || !data) {
      setError(
        err?.message?.includes("duplicate")
          ? "Another clip already uses that slug. Change the title or the slug."
          : "Couldn't save — check the work_clips table exists in Supabase."
      );
      return;
    }

    const saved = data as WorkClipRow;
    setRows((prev) => {
      const next = editing.id ? prev.map((r) => (r.id === saved.id ? saved : r)) : [saved, ...prev];
      return next.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    });
    setEditing(null);
  };

  const remove = async (row: WorkClipRow) => {
    // Deliberately a confirm(): this removes the clip from a live public page,
    // and the video file itself stays in storage either way.
    if (!window.confirm(`Remove "${row.title}" from the Our Work page? The video file stays in storage.`)) return;
    const { error: err } = await createClient().from("work_clips").delete().eq("id", row.id);
    if (err) return setError("Couldn't delete that clip.");
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <>
      <div className="admin-note">
        <strong>These clips appear on sobimoving.com/our-work.</strong> Only clips marked
        Published are shown. Changes go live within about an hour, or immediately after the next
        deploy. Every clip needs a video file <em>and</em> a still frame — the still is what
        visitors and Google see before anyone presses play.
      </div>

      <div className="admin-toolbar">
        <div className="t-sub">{rows.length} total · {published} published</div>
        <button className="btn-sm" onClick={() => setEditing(blankRow())}>
          <Icon name="plus" size={14} /> New clip
        </button>
      </div>

      {error ? <div className="admin-note" style={{ color: "#a23b22" }}>{error}</div> : null}

      {rows.length === 0 ? (
        <div className="admin-panel">
          <div className="admin-empty">
            <div><Icon name="play" size={34} /></div>
            No job clips yet — add the first one and the Our Work page fills in.
          </div>
        </div>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead><tr><th>Clip</th><th>Where</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <button
                      onClick={() => setEditing(r)}
                      style={{ background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer" }}
                    >
                      <div className="t-name">{r.title || "Untitled"}</div>
                      <div className="t-sub">/our-work#clip-{r.slug}</div>
                    </button>
                  </td>
                  <td className="t-sub">{r.city || "—"}</td>
                  <td>
                    <span className={`status-pill ${r.status === "published" ? "status-won" : "status-new"}`}>
                      {r.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <button className="btn-sm ghost" onClick={() => remove(r)}>
                      <Icon name="trash" size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2>{editing.id ? "Edit clip" : "New clip"}</h2>
              <button className="admin-modal-close" onClick={() => setEditing(null)} aria-label="Close">
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ marginBottom: 16 }}>
                <div className="dk" style={{ marginBottom: 6 }}>Video file (mp4)</div>
                <ImageUpload
                  kind="video"
                  folder="work"
                  value={editing.src ?? ""}
                  onChange={(url) => patch({ src: url })}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div className="dk" style={{ marginBottom: 6 }}>Still frame (jpg) — required</div>
                <ImageUpload
                  folder="work"
                  value={editing.poster ?? ""}
                  onChange={(url) => patch({ poster: url })}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <div className="dk" style={{ marginBottom: 6 }}>Title — say what the job was</div>
                <input
                  className="note-input"
                  style={{ minHeight: 0 }}
                  placeholder="Third-floor walk-up in Midtown"
                  value={editing.title ?? ""}
                  onChange={(e) => patch({ title: e.target.value, slug: editing.id ? editing.slug : slugify(e.target.value) })}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <div className="dk" style={{ marginBottom: 6 }}>What is the visitor watching? (1–3 sentences)</div>
                <textarea
                  className="note-input"
                  placeholder="A two-bedroom carried down three flights with no elevator. Watch the blanket-wrap go on before anything leaves the apartment."
                  value={editing.description ?? ""}
                  onChange={(e) => patch({ description: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <div className="dk" style={{ marginBottom: 6 }}>City</div>
                  <select
                    className="note-input"
                    style={{ minHeight: 0 }}
                    value={editing.city ?? ""}
                    onChange={(e) => patch({ city: e.target.value })}
                  >
                    <option value="">— none —</option>
                    {LOCATIONS.map((l) => <option key={l.slug} value={l.city}>{l.city}</option>)}
                  </select>
                </div>
                <div>
                  <div className="dk" style={{ marginBottom: 6 }}>Service</div>
                  <select
                    className="note-input"
                    style={{ minHeight: 0 }}
                    value={editing.service ?? ""}
                    onChange={(e) => patch({ service: e.target.value })}
                  >
                    <option value="">— none —</option>
                    {SERVICE_TYPES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <div className="dk" style={{ marginBottom: 6 }}>Length (seconds)</div>
                  <input
                    className="note-input"
                    style={{ minHeight: 0 }}
                    type="number"
                    min={0}
                    value={editing.duration_seconds ?? ""}
                    onChange={(e) => patch({ duration_seconds: e.target.value === "" ? null : Number(e.target.value) })}
                  />
                </div>
                <div>
                  <div className="dk" style={{ marginBottom: 6 }}>Date filmed — required</div>
                  <input
                    className="note-input"
                    style={{ minHeight: 0 }}
                    type="date"
                    value={editing.filmed_on ?? ""}
                    onChange={(e) => patch({ filmed_on: e.target.value })}
                  />
                </div>
                <div>
                  <div className="dk" style={{ marginBottom: 6 }}>Order (low first)</div>
                  <input
                    className="note-input"
                    style={{ minHeight: 0 }}
                    type="number"
                    value={editing.sort_order ?? 0}
                    onChange={(e) => patch({ sort_order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div className="dk" style={{ marginBottom: 6 }}>Status</div>
                <div className="admin-toggle">
                  {["draft", "published"].map((s) => (
                    <button
                      key={s}
                      className={editing.status === s ? "active" : ""}
                      onClick={() => patch({ status: s })}
                    >
                      {s === "draft" ? "Draft" : "Published"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="note-actions">
                <button className="btn-sm" disabled={saving} onClick={save}>
                  {saving ? "Saving…" : "Save clip"}
                </button>
                <button className="btn-sm ghost" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
