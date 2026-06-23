import type { ReactElement, SVGProps } from "react";

// Tiny inline SVG icons — purposeful, not decorative slop.
// Ported verbatim from the approved site (assets/components/icons.jsx).
export function Icon({
  name,
  size = 18,
  stroke = 1.6,
}: {
  name: string;
  size?: number;
  stroke?: number;
}): ReactElement | null {
  const props: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "phone":
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" /></svg>;
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "check":
      return <svg {...props}><path d="M20 6 9 17l-5-5" /></svg>;
    case "shield":
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "star": {
      const filled: SVGProps<SVGSVGElement> = { ...props, fill: "currentColor", stroke: "currentColor", strokeWidth: 0.5 };
      return <svg {...filled}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    }
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "box":
      return <svg {...props}><path d="m21 16-9 5-9-5V8l9-5 9 5v8z" /><path d="m3.27 6.96 8.73 5.04 8.73-5.04M12 22V12" /></svg>;
    case "home":
      return <svg {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><path d="M9 22V12h6v10" /></svg>;
    case "heart":
      return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
    case "truck":
      return <svg {...props}><path d="M14 18V6a2 2 0 0 0-2-2H3v14h11z" /><path d="M14 8h4l3 3v7h-7z" /><circle cx="7.5" cy="18.5" r="2.5" /><circle cx="17.5" cy="18.5" r="2.5" /></svg>;
    case "package":
      return <svg {...props}><path d="M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" /></svg>;
    case "sparkles":
      return <svg {...props}><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3z" /><path d="M19 14l-.7 2.1L16 17l2.3.7.7 2.3.7-2.3 2.3-.7-2.3-.9z" /></svg>;
    case "users":
      return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "map":
      return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "tool":
      return <svg {...props}><path d="M14.7 6.3a4 4 0 1 0 5 5l-3 3 3 3-5-5-3 3-3-3 5-5z" transform="translate(-1 -1)" /></svg>;
    case "trash":
      return <svg {...props}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>;
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14" /></svg>;
    case "minus":
      return <svg {...props}><path d="M5 12h14" /></svg>;
    case "calendar":
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "mail":
      return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>;
    case "leaf":
      return <svg {...props}><path d="M11 20A7 7 0 0 1 4 13c0-4.97 4-10 12-10 0 8-5 12-9 12-2.21 0-4-1.79-4-4" /></svg>;
    case "menu":
      return <svg {...props}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    case "x":
      return <svg {...props}><path d="M18 6 6 18M6 6l12 12" /></svg>;
    default:
      return null;
  }
}
