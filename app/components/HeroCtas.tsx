import Link from "next/link";
import { Icon } from "./Icon";
import { smsHref, telHref } from "@/lib/contactLinks";

/**
 * Hero call-to-action pair, rendered twice and switched by CSS.
 *
 * On a phone the primary action is the call itself and the secondary is a
 * text, because /quote is now a call-or-text page and sending a phone visitor
 * there first was one tap too many. On desktop, where tel: and sms: links do
 * nothing useful, the pair stays "Get your free quote" plus a secondary link.
 * The switch is in app/mobile-fixes.css (.cta-desktop / .cta-mobile).
 */
export function HeroCtas({
  phoneDisplay,
  phoneTel,
  quoteLabel = "Get your free quote",
  secondaryHref = "/services",
  secondaryLabel = "View services",
  smsBody = "Hi Sobi Moving, I'd like a quote for a move.",
  marginTop = 32,
}: {
  phoneDisplay: string;
  phoneTel: string;
  quoteLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  smsBody?: string;
  marginTop?: number;
}) {
  return (
    <>
      <div className="row cta-desktop" style={{ marginTop, gap: 12 }}>
        <Link href="/quote" className="btn btn-primary btn-arrow">{quoteLabel}</Link>
        {secondaryHref.startsWith("tel:") ? (
          <a href={secondaryHref} className="btn btn-ghost"><Icon name="phone" size={14} /> {secondaryLabel}</a>
        ) : (
          <Link href={secondaryHref} className="btn btn-ghost">{secondaryLabel}</Link>
        )}
      </div>
      <div className="row cta-mobile" style={{ marginTop, gap: 10 }}>
        <a href={telHref(phoneTel)} className="btn btn-primary">
          <Icon name="phone" size={15} /> Call {phoneDisplay}
        </a>
        <a href={smsHref(phoneTel, smsBody)} className="btn btn-ghost">
          <Icon name="message" size={15} /> Text us for a quote
        </a>
      </div>
    </>
  );
}
