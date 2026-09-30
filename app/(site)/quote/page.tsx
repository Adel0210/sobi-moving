import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { getContent } from "@/lib/content";
import { smsHref, telHref } from "@/lib/contactLinks";

/**
 * Free quote.
 *
 * This used to be a three-step form. It is now a phone and text page, because
 * that is how this business actually quotes: the details that move a price are
 * the ones a customer does not think to type, and a mover who asks them on the
 * phone wins the job before a form is even read.
 *
 * The URL is kept because 27 links across the site point at it, and because it
 * ranks. The promise in the nav is still "free quote" — this page just delivers
 * it in one conversation instead of three screens.
 *
 * Server component, zero JavaScript. The phone and text links are reported to
 * Google Ads by the site-wide listener in Analytics.tsx.
 */

const STEPS = [
  {
    n: "1",
    title: "Tell us about the move",
    body: "One short call or a few texts. Where it is going, roughly how much there is, and when you need it done.",
  },
  {
    n: "2",
    title: "You get a real number",
    body: "Itemised and in writing, usually the same day. What is included, what is not, and what would change it.",
  },
  {
    n: "3",
    title: "We lock in your date",
    body: "Pick a day that works. The crew arrives with the pads, the tools and the paperwork already sorted.",
  },
];

const READY = [
  "Where you are moving from and to",
  "Roughly how many bedrooms",
  "Your target date, even a rough one",
  "Stairs, elevators, or a long carry to the truck",
  "Anything heavy or fragile — piano, safe, artwork",
  "Whether you want us packing as well as moving",
];

export default async function QuotePage() {
  const c = await getContent();
  const tel = telHref(c.phone_tel);
  const sms = smsHref(c.phone_tel, "Hi Sobi Moving, I'd like a quote for a move.");

  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="container-narrow" style={{ maxWidth: 1080 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="eyebrow">Free Quote · Same-Day Reply</div>
            <h1 style={{ marginTop: 8 }}>
              Get your{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
                free quote.
              </em>
            </h1>
            <p className="lead" style={{ marginTop: 16, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
              One call or one text and you have a number. No forms to fill in, no
              waiting on an email that lands tomorrow. We answer 24 hours a day.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
              <a href={tel} className="btn btn-accent btn-arrow">
                <Icon name="phone" size={15} /> Call {c.phone_display}
              </a>
              <a href={sms} className="btn btn-ghost">
                <Icon name="message" size={15} /> Text us instead
              </a>
            </div>

            <div className="hero-trust" style={{ justifyContent: "center", marginTop: 24 }}>
              <span><Icon name="shield" size={14} /> Licensed &amp; insured</span>
              <span><Icon name="star" size={14} /> 5.0 from 32 Google reviews</span>
              <span><Icon name="clock" size={14} /> Open 24 hours, 7 days</span>
            </div>
          </div>

          <div className="divider" />

          {/* contact-grid is the site's existing two-up: 1fr 1fr above 980px,
              a single stacked column below it. Reused rather than adding a
              near-identical rule. */}
          <div className="contact-grid" style={{ gap: 56, marginTop: 44 }}>
            <div>
              <div className="eyebrow">What to have ready</div>
              <h2 style={{ marginTop: 8, marginBottom: 18 }}>Six things that decide your price</h2>
              <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>
                You do not need all of it. The more you have, the tighter the
                number, and the less likely anything changes on the day.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {READY.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15.5, color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}><Icon name="check" size={16} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 14, color: "var(--ink-mute)", marginTop: 20 }}>
                Moving a parent, or handling it from another state? Read{" "}
                <Link href="/senior-moving" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                  how we handle senior moves
                </Link>{" "}
                before you call.
              </p>
            </div>

            <div>
              <div className="eyebrow">What happens next</div>
              <h2 style={{ marginTop: 8, marginBottom: 22 }}>Three steps, no pressure</h2>
              <div style={{ display: "grid", gap: 20 }}>
                {STEPS.map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div className="service-icon" style={{ flexShrink: 0, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 16 }}>
                      {s.n}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                      <p style={{ fontSize: 14.5, color: "var(--ink-soft)", margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>Ready when you are.</h2>
          <p style={{ color: "rgba(245,239,228,0.72)", maxWidth: 520, margin: "14px auto 0" }}>
            Call and talk it through, or send a text with a couple of photos of
            the big items. Either way you hear back the same day.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <a href={tel} className="btn btn-accent btn-arrow">
              <Icon name="phone" size={15} /> Call {c.phone_display}
            </a>
            <a href={sms} className="btn btn-ghost" style={{ color: "#f5efe4", borderColor: "rgba(245,239,228,0.3)" }}>
              <Icon name="message" size={15} /> Text us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
