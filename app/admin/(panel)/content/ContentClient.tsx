"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CONTENT_FIELDS, type SiteContent } from "@/lib/content";

export function ContentClient({ initial }: { initial: SiteContent }) {
  const [values, setValues] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groups = Array.from(new Set(CONTENT_FIELDS.map((f) => f.group)));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    const supabase = createClient();
    const rows = CONTENT_FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setError("Couldn't save — is the site_content table set up in Supabase?");
      return;
    }
    setSaved(true);
  };

  return (
    <>
      <div className="admin-note" style={{ background: "#eef3ef", borderColor: "#cfe0d3", color: "#3f5c46" }}>
        Changes go live on the public site within ~1 minute (after re-deploy or revalidation). Leave a field as-is to keep the current text.
      </div>

      {groups.map((g) => (
        <div className="admin-panel" key={g} style={{ marginBottom: 18 }}>
          <div className="admin-panel-head"><h2>{g}</h2></div>
          <div className="admin-panel-body">
            {CONTENT_FIELDS.filter((f) => f.group === g).map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <div className="dk" style={{ marginBottom: 6 }}>{f.label}</div>
                {f.multiline ? (
                  <textarea className="note-input" value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                ) : (
                  <input className="note-input" style={{ minHeight: 0 }} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="note-actions" style={{ alignItems: "center" }}>
        <button className="btn-sm" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save changes"}</button>
        {saved ? <span className="t-sub" style={{ color: "var(--a-green)" }}>Saved ✓</span> : null}
        {error ? <span className="t-sub" style={{ color: "#a23b22" }}>{error}</span> : null}
      </div>
    </>
  );
}
