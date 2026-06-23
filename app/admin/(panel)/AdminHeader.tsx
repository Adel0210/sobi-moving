export function AdminHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="admin-topbar">
      <div>
        <h1>{title}</h1>
        {sub ? <div className="admin-sub">{sub}</div> : null}
      </div>
    </div>
  );
}
