"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "./Icon";

// Image slot — in the approved site this was a drag-and-drop <image-slot>
// authoring tool. In production it renders the real image when provided,
// otherwise the styled placeholder (identical look to an empty slot).
export const PhotoSlot = ({
  label,
  radius = 14,
  style,
  placeholder,
  src,
}: {
  id?: string;
  label?: string;
  shape?: string;
  radius?: number;
  style?: CSSProperties;
  placeholder?: string;
  src?: string;
}) => {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={placeholder || label || ""}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius, display: "block", ...style }}
      />
    );
  }
  return (
    <div className="photo-placeholder" style={{ width: "100%", height: "100%", borderRadius: radius, ...style }}>
      <div>
        <div className="ph-label">{placeholder || label}</div>
      </div>
    </div>
  );
};

export const PhotoPlaceholder = ({
  label,
  hint,
  className = "",
  style,
  ratio,
  src,
}: {
  label?: ReactNode;
  hint?: ReactNode;
  className?: string;
  style?: CSSProperties;
  ratio?: string;
  src?: string;
}) => {
  const aspectStyle = ratio ? { aspectRatio: ratio } : null;
  // When an image is provided, keep the exact same box (layout class + aspect
  // ratio) but drop the placeholder chrome and cover it with the illustration.
  if (src) {
    return (
      <div
        className={`photo-placeholder ${className}`}
        style={{ ...aspectStyle, ...style, border: "none", background: "none", padding: 0, overflow: "hidden", position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={typeof label === "string" ? label : ""}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div className={`photo-placeholder ${className}`} style={{ ...aspectStyle, ...style }}>
      <div>
        <div className="ph-label">{label}</div>
        {hint ? <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-mute)", maxWidth: 280 }}>{hint}</div> : null}
      </div>
    </div>
  );
};

export const Stat = ({ value, label }: { value: ReactNode; label: ReactNode }) => (
  <div className="stat">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export const Pill = ({ children, accent }: { children: ReactNode; accent?: boolean }) => (
  <span className={`tag ${accent ? "accent" : ""}`}>{children}</span>
);

export const FAQItem = ({ q, a, defaultOpen = false }: { q: ReactNode; a: ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon"><Icon name={open ? "minus" : "plus"} size={18} /></span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? 400 : 0 }}>
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  );
};

export const Marquee = ({ items }: { items: ReactNode[]; accent?: boolean }) => (
  <div className="marquee">
    <div className="marquee-track">
      {[...items, ...items, ...items].map((t, i) => (
        <span key={i} className="marquee-item">
          <span className="dot" />
          {t}
        </span>
      ))}
    </div>
  </div>
);
