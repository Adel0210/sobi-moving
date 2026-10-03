"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { smsHref, telHref } from "@/lib/contactLinks";

/**
 * Fixed call / text bar for phones.
 *
 * Appears once the hero has scrolled out of view, so the first screen stays
 * clean and every later screen keeps a one-tap way to convert. Hidden on
 * /quote, whose whole above-the-fold is already these two buttons. Phone and
 * text taps are attributed by the delegated listener in Analytics.tsx, so
 * nothing here needs an onClick. Shown only under 880px via mobile-fixes.css.
 */
export function MobileContactBar({
  phoneDisplay,
  phoneTel,
}: {
  phoneDisplay: string;
  phoneTel: string;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/quote") return null;

  return (
    <div className={`mobile-contact-bar${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <a href={telHref(phoneTel)} className="btn btn-primary" tabIndex={visible ? 0 : -1}>
        <Icon name="phone" size={16} /> Call {phoneDisplay}
      </a>
      <a href={smsHref(phoneTel, "Hi Sobi Moving, I'd like a quote for a move.")} className="btn btn-ghost" tabIndex={visible ? 0 : -1}>
        <Icon name="message" size={16} /> Text
      </a>
    </div>
  );
}
