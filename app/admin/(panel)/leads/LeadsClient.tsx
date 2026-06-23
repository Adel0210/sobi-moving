"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";
import type { Lead, LeadNote } from "@/lib/types";

const SIZE: Record<string, string> = { studio: "Studio", "1br": "1 Bedroom", "2br": "2 Bedroom", "3br": "3 Bedroom", "4br": "4+ Bedroom" };
const DIST: Record<string, string> = { local: "Local", metro: "Atlanta metro", long: "Long distance" };
const MTYPE: Record<string, string> = { regular: "Just moving", senior: "Helping a parent move", office: "Office / commercial" };
const SVC: Record<string, string> = { packing: "Full Packing", "white-glove": "White Glove Setup", unpack: "Unpacking", junk: "Junk Removal", assembly: "Furniture Assembly" };
const SUBJECT: Record<string, string> = { general: "General question", quote: "Wants a quote", senior: "Senior move", community: "Community / care partnership", other: "Something else" };

const STAGES = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "quoted", label: "Quoted" },
  { key: "booked", label: "Booked" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];
const STAGE_LABEL = (k: string) => STAGES.find((s) => s.key === k)?.label ?? k;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
function svcLabels(s: string[] | null) {
  return s && s.length ? s.map((x) => SVC[x] ?? x).join(", ") : "Move only";
}
function summary(l: Lead) {
  return l.type === "quote"
    ? `${SIZE[l.move_size ?? ""] ?? l.move_size ?? "?"} · ${DIST[l.move_distance ?? ""] ?? l.move_distance ?? "?"}`
    : SUBJECT[l.subject ?? ""] ?? l.subject ?? "General";
}

export function LeadsClient({ initialLeads, userEmail }: { initialLeads: Lead[]; userEmail: string }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [view, setView] = useState<"board" | "table">("board");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [noteBody, setNoteBody] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [busy, setBusy] = useState(false);

  const supabase = createClient();

  const logActivity = useCallback(
    async (leadId: string, kind: string, body: string) => {
      await supabase.from("lead_notes").insert({ lead_id: leadId, kind, body, author: userEmail });
    },
    [supabase, userEmail]
  );

  const loadNotes = useCallback(
    async (leadId: string) => {
      const { data } = await supabase.from("lead_notes").select("*").eq("lead_id", leadId).order("created_at", { ascending: false });
      setNotes((data ?? []) as LeadNote[]);
    },
    [supabase]
  );

  useEffect(() => {
    if (selected) loadNotes(selected.id);
    else setNotes([]);
  }, [selected, loadNotes]);

  const moveStage = async (lead: Lead, stage: string) => {
    if (lead.status === stage) return;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: stage } : l)));
    setSelected((s) => (s && s.id === lead.id ? { ...s, status: stage } : s));
    await supabase.from("leads").update({ status: stage }).eq("id", lead.id);
    await logActivity(lead.id, "stage", `Stage changed to ${STAGE_LABEL(stage)}`);
    if (selected && selected.id === lead.id) loadNotes(lead.id);
  };

  const addNote = async () => {
    if (!selected || !noteBody.trim()) return;
    setSavingNote(true);
    await supabase.from("lead_notes").insert({ lead_id: selected.id, kind: "note", body: noteBody.trim(), author: userEmail });
    setNoteBody("");
    await loadNotes(selected.id);
    setSavingNote(false);
  };

  const convertToBooking = async (lead: Lead) => {
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      lead_id: lead.id,
      customer_name: lead.name,
      email: lead.email,
      phone: lead.phone,
      amount: lead.estimate_low,
      status: "scheduled",
      notes: lead.message,
    });
    if (!error) {
      await moveStage(lead, "booked");
      await logActivity(lead.id, "system", "Converted to a booking");
      if (selected) loadNotes(lead.id);
    }
    setBusy(false);
    alert(error ? "Couldn't create booking (is the bookings table set up?)." : "Booking created — see the Bookings tab.");
  };

  const addTask = async (lead: Lead, title: string, due: string) => {
    if (!title.trim()) return;
    const { error } = await supabase.from("tasks").insert({ lead_id: lead.id, title: title.trim(), due_date: due || null, assignee: userEmail });
    if (!error) await logActivity(lead.id, "system", `Follow-up task added: ${title.trim()}`);
    if (selected) loadNotes(lead.id);
    alert(error ? "Couldn't add task (is the tasks table set up?)." : "Follow-up task added.");
  };

  if (!leads.length) {
    return (
      <div className="admin-panel">
        <div className="admin-empty">
          <div><Icon name="mail" size={34} /></div>
          No leads yet — submissions from your Contact and Quote forms will appear here.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-toggle">
          <button className={view === "board" ? "active" : ""} onClick={() => setView("board")}><Icon name="box" size={15} /> Board</button>
          <button className={view === "table" ? "active" : ""} onClick={() => setView("table")}><Icon name="menu" size={15} /> Table</button>
        </div>
        <div className="t-sub">{leads.length} leads</div>
      </div>

      {view === "board" ? (
        <div className="admin-board">
          {STAGES.map((stage) => {
            const col = leads.filter((l) => l.status === stage.key);
            return (
              <div className="board-col" key={stage.key}>
                <div className="board-col-head">
                  <span>{stage.label}</span>
                  <span className="count">{col.length}</span>
                </div>
                {col.length === 0 ? <div className="board-col-empty">—</div> : null}
                {col.map((l) => (
                  <div className="board-card" key={l.id} onClick={() => setSelected(l)}>
                    <div className="bc-name">{l.name || "—"}</div>
                    <div className="bc-meta">{summary(l)}</div>
                    <div className="bc-foot">
                      <span className={`type-pill ${l.type}`}>{l.type}</span>
                      <select
                        className="bc-stage-select"
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => moveStage(l, e.target.value)}
                      >
                        {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr><th>When</th><th>Name</th><th>Type</th><th>Summary</th><th>Stage</th></tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} onClick={() => setSelected(l)}>
                  <td className="t-when">{fmtDate(l.created_at)}</td>
                  <td><div className="t-name">{l.name || "—"}</div><div className="t-sub">{l.email}</div></td>
                  <td><span className={`type-pill ${l.type}`}>{l.type}</span></td>
                  <td>{summary(l)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select className={`status-pill status-${l.status}`} value={l.status} onChange={(e) => moveStage(l, e.target.value)}>
                      {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <LeadDrawer
          lead={selected}
          notes={notes}
          noteBody={noteBody}
          setNoteBody={setNoteBody}
          savingNote={savingNote}
          busy={busy}
          onClose={() => setSelected(null)}
          onAddNote={addNote}
          onMoveStage={moveStage}
          onConvert={convertToBooking}
          onAddTask={addTask}
        />
      ) : null}
    </>
  );
}

function LeadDrawer(props: {
  lead: Lead; notes: LeadNote[]; noteBody: string; setNoteBody: (v: string) => void;
  savingNote: boolean; busy: boolean; onClose: () => void; onAddNote: () => void;
  onMoveStage: (l: Lead, s: string) => void; onConvert: (l: Lead) => void;
  onAddTask: (l: Lead, title: string, due: string) => void;
}) {
  const { lead, notes } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [showTask, setShowTask] = useState(false);

  return (
    <div className="admin-modal-overlay" onClick={props.onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <h2>{lead.name || "Lead"}</h2>
            <div className="t-sub" style={{ marginTop: 4 }}>
              <span className={`type-pill ${lead.type}`}>{lead.type}</span> · {fmtDate(lead.created_at)}
            </div>
          </div>
          <button className="admin-modal-close" onClick={props.onClose}><Icon name="x" size={22} /></button>
        </div>
        <div className="admin-modal-body">
          <Detail k="Email" v={lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "—"} />
          <Detail k="Phone" v={lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"} />
          {lead.type === "quote" ? (
            <>
              {lead.estimate_low ? <Detail k="Internal estimate" v={<span className="admin-est">${lead.estimate_low?.toLocaleString()}–${lead.estimate_high?.toLocaleString()}</span>} /> : null}
              <Detail k="Home size" v={SIZE[lead.move_size ?? ""] ?? lead.move_size ?? "—"} />
              <Detail k="Distance" v={DIST[lead.move_distance ?? ""] ?? lead.move_distance ?? "—"} />
              <Detail k="Move type" v={MTYPE[lead.move_type ?? ""] ?? lead.move_type ?? "—"} />
              <Detail k="Services" v={svcLabels(lead.services)} />
              <Detail k="From → To" v={`${lead.from_zip || "—"} → ${lead.to_zip || "—"}`} />
              {lead.move_date ? <Detail k="Target date" v={lead.move_date} /> : null}
            </>
          ) : (
            <Detail k="Subject" v={SUBJECT[lead.subject ?? ""] ?? lead.subject ?? "—"} />
          )}
          {lead.message ? <Detail k="Message" v={lead.message} /> : null}

          <div className="admin-detail-row">
            <div className="dk">Stage</div>
            <div className="dv" style={{ marginTop: 8 }}>
              <select className={`status-pill status-${lead.status}`} value={lead.status} onChange={(e) => props.onMoveStage(lead, e.target.value)}>
                {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Quick actions */}
          <div className="note-actions" style={{ marginTop: 18, flexWrap: "wrap" }}>
            <button className="btn-sm" disabled={props.busy} onClick={() => props.onConvert(lead)}><Icon name="calendar" size={14} /> Convert to booking</button>
            <button className="btn-sm ghost" onClick={() => setShowTask((v) => !v)}><Icon name="check" size={14} /> Follow-up task</button>
          </div>
          {showTask ? (
            <div style={{ marginTop: 12 }}>
              <input className="note-input" style={{ minHeight: 0 }} placeholder="Task — e.g. Call to confirm date" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              <div className="note-actions">
                <input type="date" className="bc-stage-select" value={taskDue} onChange={(e) => setTaskDue(e.target.value)} />
                <button className="btn-sm" onClick={() => { props.onAddTask(lead, taskTitle, taskDue); setTaskTitle(""); setTaskDue(""); setShowTask(false); }}>Add task</button>
              </div>
            </div>
          ) : null}

          {/* Activity */}
          <div className="admin-section-label">Notes &amp; activity</div>
          <textarea className="note-input" placeholder="Add a note, log a call…" value={props.noteBody} onChange={(e) => props.setNoteBody(e.target.value)} />
          <div className="note-actions">
            <button className="btn-sm" disabled={props.savingNote || !props.noteBody.trim()} onClick={props.onAddNote}>{props.savingNote ? "Saving…" : "Add note"}</button>
          </div>

          <div className="timeline">
            {notes.length === 0 ? <div className="t-sub" style={{ paddingTop: 8 }}>No activity yet.</div> : null}
            {notes.map((n) => (
              <div className="tl-item" key={n.id}>
                <div className={`tl-dot ${n.kind === "stage" ? "stage" : n.kind === "system" ? "system" : ""}`}>
                  <Icon name={n.kind === "stage" ? "arrow-right" : n.kind === "call" ? "phone" : n.kind === "system" ? "check" : "mail"} size={14} />
                </div>
                <div className="tl-body">
                  <div className="tl-text">{n.body}</div>
                  <div className="tl-when">{fmtDate(n.created_at)}{n.author ? ` · ${n.author}` : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="admin-detail-row">
      <div className="dk">{k}</div>
      <div className="dv">{v}</div>
    </div>
  );
}
