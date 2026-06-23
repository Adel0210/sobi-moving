import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "./AdminHeader";
import { Icon } from "@/app/components/Icon";
import type { Lead, Task, Booking } from "@/lib/types";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const fmtDay = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No date");

export default async function DashboardPage() {
  const supabase = await createClient();
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const today = todayStr();

  // Resilient fetches — each degrades to null/[] if its table is missing.
  const safe = async <T,>(p: PromiseLike<{ data: T | null; error: unknown }>): Promise<T | null> => {
    try { const { data, error } = await p; return error ? null : data; } catch { return null; }
  };

  const leads = (await safe<Lead[]>(supabase.from("leads").select("*").order("created_at", { ascending: false }))) ?? null;
  const tasks = (await safe<Task[]>(supabase.from("tasks").select("*").eq("done", false).order("due_date", { ascending: true }))) ?? null;
  const bookings = (await safe<Booking[]>(supabase.from("bookings").select("*").in("status", ["scheduled", "in_progress"]).order("move_date", { ascending: true }))) ?? null;

  const leadsReady = leads !== null;
  const newLeads = leads ? leads.filter((l) => l.created_at >= weekAgo).length : null;
  const openPipeline = leads ? leads.filter((l) => ["new", "contacted", "quoted", "booked"].includes(l.status)).length : null;
  const dueTasks = tasks ? tasks.filter((t) => t.due_date && t.due_date <= today) : [];
  const fmt = (n: number | null) => (n === null ? "—" : String(n));

  const kpis = [
    { label: "New leads · 7 days", icon: "sparkles", value: fmt(newLeads) },
    { label: "Open pipeline", icon: "users", value: fmt(openPipeline) },
    { label: "Upcoming moves", icon: "calendar", value: fmt(bookings ? bookings.length : null) },
    { label: "Tasks due", icon: "check", value: fmt(tasks ? dueTasks.length : null) },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" sub="Your leads, follow-ups, and upcoming moves at a glance." />
      <div className="admin-content">
        {!leadsReady ? (
          <div className="admin-note"><strong>Database not fully set up.</strong> Run the schema in Supabase to bring these live.</div>
        ) : null}

        <div className="admin-kpis">
          {kpis.map((k) => (
            <div className="admin-kpi" key={k.label}>
              <div className="admin-kpi-label"><Icon name={k.icon} size={15} />{k.label}</div>
              <div className="admin-kpi-value">{k.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "start" }} className="admin-dash-grid">
          {/* Recent leads */}
          <div className="admin-panel">
            <div className="admin-panel-head"><h2>Recent leads</h2><Link href="/admin/leads" className="t-sub" style={{ color: "var(--a-accent)" }}>View pipeline →</Link></div>
            {leads && leads.length ? (
              <table className="admin-table">
                <tbody>
                  {leads.slice(0, 6).map((l) => (
                    <tr key={l.id}>
                      <td><div className="t-name">{l.name || "—"}</div><div className="t-sub">{l.email}</div></td>
                      <td><span className={`type-pill ${l.type}`}>{l.type}</span></td>
                      <td><span className={`status-pill status-${l.status}`} style={{ pointerEvents: "none" }}>{l.status}</span></td>
                      <td className="t-when">{new Date(l.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty"><div><Icon name="mail" size={30} /></div>{leadsReady ? "No leads yet." : "Connect the database to see leads."}</div>
            )}
          </div>

          {/* Tasks + bookings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="admin-panel">
              <div className="admin-panel-head"><h2>Due &amp; overdue</h2><Link href="/admin/tasks" className="t-sub" style={{ color: "var(--a-accent)" }}>All →</Link></div>
              <div style={{ padding: "8px 0" }}>
                {dueTasks.length ? dueTasks.slice(0, 5).map((t) => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 18px" }}>
                    <span style={{ fontSize: 14 }}>{t.title}</span>
                    <span className="t-sub" style={{ color: t.due_date && t.due_date < today ? "#a23b22" : undefined, whiteSpace: "nowrap" }}>{fmtDay(t.due_date)}</span>
                  </div>
                )) : <div className="admin-empty" style={{ padding: "26px 16px" }}>Nothing due. 🎉</div>}
              </div>
            </div>
            <div className="admin-panel">
              <div className="admin-panel-head"><h2>Upcoming moves</h2><Link href="/admin/bookings" className="t-sub" style={{ color: "var(--a-accent)" }}>All →</Link></div>
              <div style={{ padding: "8px 0" }}>
                {bookings && bookings.length ? bookings.slice(0, 5).map((b) => (
                  <div key={b.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 18px" }}>
                    <span style={{ fontSize: 14 }}>{b.customer_name || "—"}</span>
                    <span className="t-sub" style={{ whiteSpace: "nowrap" }}>{fmtDay(b.move_date)}</span>
                  </div>
                )) : <div className="admin-empty" style={{ padding: "26px 16px" }}>No upcoming moves.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
