import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "../AdminHeader";
import { WorkClient, type WorkClipRow } from "./WorkClient";

export const metadata: Metadata = { title: "Our Work" };
export const dynamic = "force-dynamic";

export default async function WorkAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work_clips")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <>
        <AdminHeader title="Our Work" sub="Job clips shown on sobimoving.com/our-work." />
        <div className="admin-content">
          <div className="admin-note">
            <strong>The work_clips table isn&apos;t set up yet.</strong> Run the SQL in
            docs/work-proof.md against this Supabase project, then your clips will appear here.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Our Work" sub="Job clips shown on sobimoving.com/our-work." />
      <div className="admin-content">
        <WorkClient initial={(data ?? []) as WorkClipRow[]} />
      </div>
    </>
  );
}
