import Link from "next/link";
import { Icon } from "./Icon";
import { smsHref, telHref } from "@/lib/contactLinks";

/**
 * Mid-page conversion strip. Long pages went seven phone screens between
 * CTAs; this drops a call / text / quote row wherever a section ends.
 */
export function CtaStrip({
  phoneDisplay,
  phoneTel,
  title = "Want a number for your move?",
  body = "Call or text and you have an itemized quote the same day. No form, no waiting.",
  smsBody = "Hi Sobi Moving, I'd like a quote for a move.",
}: {
  phoneDisplay: string;
  phoneTel: string;
  title?: string;
  body?: string;
  smsBody?: string;
}) {
  return (
    <section className="cta-strip-wrap" aria-label="Get a quote">
      <div className="container">
        <div className="cta-strip">
          <div className="cta-strip-copy">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          <div className="cta-strip-actions">
            <a href={telHref(phoneTel)} className="btn btn-primary"><Icon name="phone" size={15} /> Call {phoneDisplay}</a>
            <a href={smsHref(phoneTel, smsBody)} className="btn btn-ghost"><Icon name="message" size={15} /> Text us</a>
            <Link href="/quote" className="btn btn-link cta-strip-quote">What to have ready →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
