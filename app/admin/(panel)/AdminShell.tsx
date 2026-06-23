"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/app/components/Icon";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/leads", label: "Pipeline", icon: "users" },
  { href: "/admin/tasks", label: "Tasks", icon: "check" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar" },
  { href: "/admin/blog", label: "Blog", icon: "sparkles" },
  { href: "/admin/content", label: "Content", icon: "tool" },
];

export function AdminShell({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  const signOut = async () => {
    await createClient().auth.signOut();
    window.location.assign("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.png" alt="" />
        <div>
          <strong>Sobi Moving</strong>
          <span>Admin</span>
        </div>
      </div>

      <nav className="admin-nav">
        {NAV.map((n) => {
          const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={active ? "active" : ""}>
              <Icon name={n.icon} size={18} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-foot">
        <div className="admin-user">{userEmail}</div>
        <button className="admin-signout" onClick={signOut}>
          <Icon name="arrow-right" size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
