"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";

// Reusable image field: upload a file (to the Supabase "media" bucket) OR paste a URL.
export function ImageUpload({
  value,
  onChange,
  folder = "uploads",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    const supabase = createClient();
    const safe = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
    const path = `${folder}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) {
      setErr("Upload failed — make sure the 'media' storage bucket is set up in Supabase.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {value ? (
        <div style={{ position: "relative", marginBottom: 10, display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ maxWidth: 220, maxHeight: 140, borderRadius: 8, border: "1px solid var(--a-line)", display: "block", objectFit: "cover" }} />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            style={{ position: "absolute", top: 6, right: 6, background: "rgba(26,24,21,0.72)", color: "#fff", border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button type="button" className="btn-sm ghost" disabled={uploading} onClick={() => inputRef.current?.click()}>
          <Icon name="box" size={14} /> {uploading ? "Uploading…" : value ? "Replace file" : "Upload from files"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        <input
          className="note-input"
          style={{ minHeight: 0, flex: "1 1 220px" }}
          placeholder="…or paste an image URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {err ? <div className="t-sub" style={{ color: "#a23b22", marginTop: 6 }}>{err}</div> : null}
    </div>
  );
}
