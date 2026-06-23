"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";
import type { Task } from "@/lib/types";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const fmtDay = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "No date");

export function TasksClient({ initial }: { initial: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const supabase = createClient();
  const today = todayStr();

  const add = async () => {
    if (!title.trim()) return;
    const { data } = await supabase.from("tasks").insert({ title: title.trim(), due_date: due || null }).select().single();
    if (data) setTasks((p) => [...p, data as Task]);
    setTitle("");
    setDue("");
  };
  const toggle = async (t: Task) => {
    setTasks((p) => p.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)));
    await supabase.from("tasks").update({ done: !t.done }).eq("id", t.id);
  };
  const remove = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks((p) => p.filter((x) => x.id !== id));
  };

  const open = tasks.filter((t) => !t.done);
  const groups: { label: string; items: Task[] }[] = [
    { label: "Overdue", items: open.filter((t) => t.due_date && t.due_date < today) },
    { label: "Today", items: open.filter((t) => t.due_date === today) },
    { label: "Upcoming", items: open.filter((t) => t.due_date && t.due_date > today) },
    { label: "No date", items: open.filter((t) => !t.due_date) },
    { label: "Done", items: tasks.filter((t) => t.done) },
  ];

  return (
    <>
      <div className="admin-panel" style={{ marginBottom: 18 }}>
        <div className="admin-panel-body" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input className="note-input" style={{ minHeight: 0, flex: "1 1 240px" }} placeholder="Add a follow-up…" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <input type="date" className="note-input" style={{ minHeight: 0, flex: "0 0 auto" }} value={due} onChange={(e) => setDue(e.target.value)} />
          <button className="btn-sm" onClick={add}><Icon name="plus" size={14} /> Add</button>
        </div>
      </div>

      {open.length === 0 && tasks.length === 0 ? (
        <div className="admin-panel"><div className="admin-empty"><div><Icon name="check" size={34} /></div>No tasks yet — add follow-ups here or from a lead.</div></div>
      ) : null}

      {groups.map((g) =>
        g.items.length ? (
          <div key={g.label} style={{ marginBottom: 22 }}>
            <div className="admin-section-label" style={{ margin: "0 0 10px", color: g.label === "Overdue" ? "#a23b22" : undefined }}>{g.label} ({g.items.length})</div>
            <div className="admin-panel">
              {g.items.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderBottom: "1px solid var(--a-line-soft)" }}>
                  <button onClick={() => toggle(t)} aria-label="toggle" style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${t.done ? "var(--a-green)" : "var(--a-line)"}`, background: t.done ? "var(--a-green)" : "#fff", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {t.done ? <Icon name="check" size={14} /> : null}
                  </button>
                  <div style={{ flex: 1, textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--a-muted)" : "var(--a-text)" }}>{t.title}</div>
                  <div className="t-sub" style={{ whiteSpace: "nowrap" }}>{fmtDay(t.due_date)}</div>
                  <button onClick={() => remove(t.id)} aria-label="delete" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--a-muted)" }}><Icon name="trash" size={15} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </>
  );
}
