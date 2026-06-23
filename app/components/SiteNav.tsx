"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/senior-moving", label: "Senior Moving" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const SiteNav = ({
  phoneDisplay = "(630) 456-1347",
  phoneTel = "6304561347",
}: {
  phoneDisplay?: string;
  phoneTel?: string;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" aria-label="Sobi Moving home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="" />
          <strong>Sobi Moving</strong>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${pathname === l.href ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <a href={`tel:${phoneTel}`} className="nav-phone" aria-label={`Call ${phoneDisplay}`}>
            <Icon name="phone" size={14} />
            <span>{phoneDisplay}</span>
          </a>
          <Link href="/quote" className="btn btn-accent" style={{ padding: "10px 18px", fontSize: 14 }}>
            Free Quote <Icon name="arrow-right" size={14} />
          </Link>
          <button
            className="nav-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 999,
              padding: 10,
            }}
          >
            <Icon name={open ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>
      {open ? (
        <div
          className="nav-mobile"
          style={{
            borderTop: "1px solid var(--line-soft)",
            background: "var(--bg)",
            padding: "12px 28px 20px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid var(--line-soft)",
                fontSize: 18,
                color: "var(--ink)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
      <style>{`
        @media (max-width: 880px) {
          .nav-menu-btn { display: inline-flex !important; }
          .nav-cta .btn-accent { display: none; }
        }
      `}</style>
    </header>
  );
};
