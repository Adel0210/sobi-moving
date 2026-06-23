import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "./AdminShell";
import "../admin.css";

// Auth gate for the whole panel. The proxy already redirects unauthenticated
// requests, but we re-check here (never rely on the proxy alone for auth).
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="admin-root">
      <AdminShell userEmail={user.email ?? ""} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
