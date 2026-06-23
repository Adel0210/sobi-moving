"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";
import type { Booking } from "@/lib/types";

const STATUSES = [
  { key: "scheduled", label: "Scheduled" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];
const fmtDay = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "No date");

const empty: Partial<Booking> = { customer_name: "", email: "", phone: "", move_date: "", time_window: "", from_address: "", to_address: "", crew: "", amount: null, status: "scheduled", notes: "" };

export function BookingsClient({ initial }: { initial: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [editing, setEditing] = useState<Partial<Booking> | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const upcoming = bookings.filter((b) => b.status === "scheduled" || b.status === "in_progress").length;

  const setStatus = async (id: string, status: string) => {
    setBookings((p) => p.map((b) => (b.id === id ? { ...b, status } : b)));
    await supabase.from("bookings").update({ status }).eq("id", id);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing, amount: editing.amount ? Number(editing.amount) : null, move_date: editing.move_date || null };
    if (editing.id) {
      const { data } = await supabase.from("bookings").update(payload).eq("id", editing.id).select().single();
      if (data) setBookings((p) => p.map((b) => (b.id === data.id ? (data as Booking) : b)));
    } else {
      const { data } = await supabase.from("bookings").insert(payload).select().single();
      if (data) setBookings((p) => [...p, data as Booking]);
    }
    setSaving(false);
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    setBookings((p) => p.filter((b) => b.id !== id));
    setEditing(null);
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="t-sub">{bookings.length} total · {upcoming} upcoming</div>
        <button className="btn-sm" onClick={() => setEditing({ ...empty })}><Icon name="plus" size={14} /> New booking</button>
      </div>

      {bookings.length === 0 ? (
        <div className="admin-panel"><div className="admin-empty"><div><Icon name="calendar" size={34} /></div>No bookings yet — convert a lead to a booking, or add one manually.</div></div>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead><tr><th>Move date</th><th>Customer</th><th>Route</th><th>Crew</th><th>Status</th></tr></thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} onClick={() => setEditing(b)}>
                  <td className="t-when">{fmtDay(b.move_date)}{b.time_window ? ` · ${b.time_window}` : ""}</td>
                  <td><div className="t-name">{b.customer_name || "—"}</div><div className="t-sub">{b.phone || b.email}</div></td>
                  <td className="t-sub">{b.from_address || "—"} → {b.to_address || "—"}</td>
                  <td className="t-sub">{b.crew || "—"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select className={`status-pill status-${b.status === "in_progress" ? "booked" : b.status === "completed" ? "won" : b.status === "cancelled" ? "lost" : "new"}`} value={b.status} onChange={(e) => setStatus(b.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
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
              <h2>{editing.id ? "Edit booking" : "New booking"}</h2>
              <button className="admin-modal-close" onClick={() => setEditing(null)}><Icon name="x" size={22} /></button>
            </div>
            <div className="admin-modal-body">
              <Field label="Customer name"><input className="note-input" style={{ minHeight: 0 }} value={editing.customer_name ?? ""} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Phone"><input className="note-input" style={{ minHeight: 0 }} value={editing.phone ?? ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></Field>
                <Field label="Email"><input className="note-input" style={{ minHeight: 0 }} value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Move date"><input type="date" className="note-input" style={{ minHeight: 0 }} value={editing.move_date ?? ""} onChange={(e) => setEditing({ ...editing, move_date: e.target.value })} /></Field>
                <Field label="Time window"><input className="note-input" style={{ minHeight: 0 }} placeholder="8:00–10:00 AM" value={editing.time_window ?? ""} onChange={(e) => setEditing({ ...editing, time_window: e.target.value })} /></Field>
              </div>
              <Field label="From address"><input className="note-input" style={{ minHeight: 0 }} value={editing.from_address ?? ""} onChange={(e) => setEditing({ ...editing, from_address: e.target.value })} /></Field>
              <Field label="To address"><input className="note-input" style={{ minHeight: 0 }} value={editing.to_address ?? ""} onChange={(e) => setEditing({ ...editing, to_address: e.target.value })} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Crew"><input className="note-input" style={{ minHeight: 0 }} placeholder="Heebel + 2" value={editing.crew ?? ""} onChange={(e) => setEditing({ ...editing, crew: e.target.value })} /></Field>
                <Field label="Quoted amount ($)"><input type="number" className="note-input" style={{ minHeight: 0 }} value={editing.amount ?? ""} onChange={(e) => setEditing({ ...editing, amount: e.target.value === "" ? null : Number(e.target.value) })} /></Field>
              </div>
              <Field label="Status">
                <select className="note-input" style={{ minHeight: 0 }} value={editing.status ?? "scheduled"} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                  {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </Field>
              <Field label="Notes"><textarea className="note-input" value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></Field>

              <div className="note-actions" style={{ marginTop: 16, justifyContent: "space-between" }}>
                <button className="btn-sm" disabled={saving} onClick={save}>{saving ? "Saving…" : editing.id ? "Save changes" : "Create booking"}</button>
                {editing.id ? <button className="btn-sm ghost" onClick={() => remove(editing.id!)} style={{ color: "#a23b22" }}><Icon name="trash" size={14} /> Delete</button> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="dk" style={{ marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}
