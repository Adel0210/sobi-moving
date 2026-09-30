import { Icon } from "@/app/components/Icon";
import { getContent } from "@/lib/content";
import { smsHref, telHref } from "@/lib/contactLinks";

/**
 * Contact.
 *
 * There is deliberately no form here. Moving is a phone business: the questions
 * that decide a quote are conversational, and a customer who types five fields
 * into a box then waits is a customer who has already called somebody else.
 * Call and text are the whole page.
 *
 * A server component, so it ships no JavaScript. The phone and text links are
 * picked up by the site-wide click listener in Analytics.tsx, which reports the
 * Google Ads "Contact" conversion, so nothing extra is wired here.
 */
export default async function ContactPage() {
  const c = await getContent();
  const tel = telHref(c.phone_tel);
  const sms = smsHref(c.phone_tel, "Hi Sobi Moving, I'd like a quote for a move.");

  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">Get in Touch</div>
              <h1 style={{ marginTop: 8 }}>
                Call or text,{" "}
                <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
                  we pick up.
                </em>
              </h1>
              <p className="lead" style={{ marginTop: 20, maxWidth: 460 }}>
                No forms, no waiting on an email. Tell us what you are moving and
                where it is going, and you get a real answer from a real person.
                Open 24 hours, 7 days a week.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="phone" size={18} /></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Call us</div>
                    <a href={tel} style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--ink)", display: "block", marginTop: 4 }}>{c.phone_display}</a>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>Open 24 hours · 7 days a week</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="message" size={18} /></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Text us</div>
                    <a href={sms} style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--ink)", display: "block", marginTop: 4 }}>{c.phone_display}</a>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>Send photos of the big items if you like</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="mail" size={18} /></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Email</div>
                    <a href={`mailto:${c.email}`} style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--ink)", display: "block", marginTop: 4 }}>{c.email}</a>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>Slower than a text, but we read every one</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="map" size={18} /></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Service area</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)", display: "block", marginTop: 4, lineHeight: 1.3 }}>
                      Serving all of metro Atlanta<br />Based in Sandy Springs, GA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, marginBottom: 6 }}>Get your quote now</div>
              <p style={{ fontSize: 14, color: "var(--ink-mute)", marginBottom: 24 }}>
                Most quotes take one short conversation. Pick whichever you prefer.
              </p>

              <a href={tel} className="btn btn-primary btn-arrow" style={{ width: "100%", justifyContent: "center" }}>
                <Icon name="phone" size={16} /> Call {c.phone_display}
              </a>
              <a href={sms} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
                <Icon name="message" size={16} /> Text us instead
              </a>

              <div className="divider" style={{ margin: "28px 0 22px" }} />

              <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>
                Have this ready
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {[
                  "Where you are moving from and to",
                  "Roughly how many bedrooms",
                  "Your target date, even approximate",
                  "Stairs, elevators or a long walk to the truck",
                  "Anything heavy or fragile — piano, safe, artwork",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}><Icon name="check" size={15} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 20 }}>
                Do not have the details yet? Call anyway. We will talk it through.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
