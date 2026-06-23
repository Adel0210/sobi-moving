import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "../AdminHeader";
import { TasksClient } from "./TasksClient";
import type { Task } from "@/lib/types";

export const metadata: Metadata = { title: "Tasks" };
export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    return (
      <>
        <AdminHeader title="Tasks" sub="Follow-ups and to-dos." />
        <div className="admin-content">
          <div className="admin-note"><strong>The tasks table isn&apos;t set up yet.</strong> Run the CRM schema in Supabase.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Tasks" sub="Follow-ups and to-dos — never let a lead go cold." />
      <div className="admin-content">
        <TasksClient initial={(data ?? []) as Task[]} />
      </div>
    </>
  );
}
