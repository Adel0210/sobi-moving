import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "../AdminHeader";
import { LeadsClient } from "./LeadsClient";
import type { Lead } from "@/lib/types";

export const metadata: Metadata = { title: "Leads" };

// Always fetch fresh on each visit.
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <>
        <AdminHeader title="Leads" sub="Quote and contact submissions from your site." />
        <div className="admin-content">
          <div className="admin-note">
            <strong>The leads table isn&apos;t set up yet.</strong> Run the database schema in
            Supabase (SQL Editor), then submissions will show up here.
          </div>
        </div>
      </>
    );
  }

  const leads = (data ?? []) as Lead[];

  return (
    <>
      <AdminHeader title="Leads" sub={`${leads.length} total submission${leads.length === 1 ? "" : "s"}`} />
      <div className="admin-content">
        <LeadsClient initialLeads={leads} userEmail={user?.email ?? ""} />
      </div>
    </>
  );
}
