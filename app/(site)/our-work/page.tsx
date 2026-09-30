import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { FAQItem } from "@/app/components/ui";
import { WorkClipPlayer } from "@/app/components/WorkClipPlayer";
import { getContent } from "@/lib/content";
import { LOCATIONS } from "@/lib/locations";
import { REVIEWS, REVIEW_COUNT, REVIEW_RATING, GBP_URL } from "@/lib/reviews";
import { getWorkClips, isoDuration } from "@/lib/workClips";
import "./work.css";

const SITE = "https://www.sobimoving.com";
const INSTAGRAM = "https://www.instagram.com/sobimoving/";

// Rebuilt hourly so a clip uploaded in the admin appears without a redeploy,
// while every visitor in between is served a static page. Same trade the
// sitemap already makes.
export const revalidate = 3600;

/**
 * JSON-LD, with "<" escaped.
 *
 * Clip titles and descriptions are typed by the owner in the admin, and
 * JSON.stringify happily passes "</script>" straight through — which would end
 * the script block early and put whatever followed into the document. The
 * \u003c escape is valid JSON and closes that off.
 */
function ldJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  // 43 chars here, 57 once the root layout appends " | Sobi Moving" —
  // which is the length that actually reaches a search result.
  title: "Our Work: Real Atlanta Moving Jobs on Video",
  description:
    "Watch real metro Atlanta moves: furniture wrapped before it moves, stairs and tight turns handled, trucks loaded tight. See how we work before you book.",
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: "Our Work: Real Atlanta Moving Jobs on Video | Sobi Moving",
    description:
      "Watch real metro Atlanta moves: furniture wrapped before it moves, stairs and tight turns handled, trucks loaded tight. See how we work before you book.",
    url: `${SITE}/our-work`,
    type: "website",
  },
};

// What a customer is actually trying to judge from a job video. This is the
// buyer's checklist, not a claim about us — it tells you what to watch for and
// lets the footage answer it.
const LOOK_FOR = [
  {
    icon: "package",
    title: "How your furniture gets wrapped",
    body: "Blankets and shrink go on before anything leaves the room, not in the truck. Watch when the wrapping happens — that is the whole difference between a scratched dresser and a clean one.",
  },
  {
    icon: "home",
    title: "How stairs and tight turns are handled",
    body: "Atlanta is full of walk-ups, split-levels and doorways that a sofa does not fit through on the first try. Watch how a crew reads the turn before they lift, instead of forcing it.",
  },
  {
    icon: "truck",
    title: "How the truck gets loaded",
    body: "A truck packed tight does not shift on I-285. Look for the tiers built floor to ceiling and the straps going on as the wall fills, not at the end when there is no room left.",
  },
  {
    icon: "sparkles",
    title: "How the place is left",
    body: "The last five minutes tell you the most. Floors protected on the way in, debris and wrapping taken away on the way out, and furniture set down where you actually want it.",
  },
];

const FAQ = [
  {
    q: "Are these real Sobi Moving jobs?",
    a: "Yes. Every clip here was filmed on one of our own metro Atlanta jobs, by the crew doing the work. There is no stock footage on this page and nothing is re-created for the camera.",
  },
  {
    q: "Where can I see more?",
    a: (
      <>
        We post job footage to Instagram as we go. The clips on this page are the ones worth
        keeping, but{" "}
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
          @sobimoving on Instagram
        </a>{" "}
        has the rest.
      </>
    ),
  },
  {
    // PLACEHOLDER — the actual filming/consent policy has not been confirmed
    // with the owner. Replace this answer before the page goes live; do not
    // guess at it, because it is a promise made to a customer.
    q: "Will you film my move?",
    a: "[PLACEHOLDER — confirm the filming and consent policy with the owner before publishing. What we need: whether crews film by default, how a customer opts out, and whether anything is posted without asking first.]",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Sobi Moving is licensed and insured, and every mover on your job is background-checked. Ask us for the paperwork on the call and we will send it over.",
  },
  {
    q: "How fast can I get a price?",
    a: "Same day, in most cases. Tell us what you are moving and from where, and you get an itemized quote back with nothing added later. Calling is fastest — we answer 24 hours a day.",
  },
];

export default async function OurWorkPage() {
  const [clips, c] = await Promise.all([getWorkClips(), getContent()]);
  const phoneTel = c.phone_tel;
  const phoneDisplay = c.phone_display;

  // One VideoObject per clip. name, description, thumbnailUrl and uploadDate
  // are the four Google treats as required; contentUrl points at a file we
  // actually serve, which is what makes the clip eligible as video at all.
  const videoLd = clips.map((clip) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE}/our-work#clip-${clip.slug}`,
    name: clip.title,
    description: clip.description,
    thumbnailUrl: [clip.poster],
    uploadDate: clip.filmedOn ?? undefined,
    contentUrl: clip.src,
    ...(clip.durationSeconds ? { duration: isoDuration(clip.durationSeconds) } : {}),
    publisher: { "@type": "MovingCompany", name: "Sobi Moving", "@id": `${SITE}/#business` },
    ...(clip.city
      ? { contentLocation: { "@type": "Place", name: `${clip.city}, GA` } }
      : {}),
  }));

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // The placeholder answer is deliberately excluded: shipping a bracketed
    // note into structured data would be a bad answer served to a machine.
    mainEntity: FAQ.filter((f) => typeof f.a === "string" && !f.a.startsWith("[PLACEHOLDER")).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a as string },
    })),
  };

  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Our Work", item: `${SITE}/our-work` },
    ],
  };

  return (
    <main className="page-enter">
      {videoLd.map((ld) => (
        <script key={ld["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(ld) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(crumbLd) }} />

      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Our Work · Metro Atlanta</div>
            <h1 style={{ marginTop: 8 }}>
              Real Atlanta moving jobs,{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>on video.</em>
            </h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>
              Anyone can say they are careful. These are our own crews on real jobs across metro
              Atlanta — filmed on the day, posted as they happened. Watch a couple before you call
              anybody, ours included.
            </p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
              <a href={`tel:${phoneTel}`} className="btn btn-primary">
                <Icon name="phone" size={14} /> Call {phoneDisplay}
              </a>
              <Link href="/quote" className="btn btn-ghost btn-arrow">Get your free quote</Link>
            </div>
            <div className="hero-trust" style={{ marginTop: 26 }}>
              <span className="row" style={{ gap: 8 }}><Icon name="star" size={14} /> {REVIEW_RATING} from {REVIEW_COUNT} Google reviews</span>
              <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14} /> Licensed &amp; insured</span>
              <span className="row" style={{ gap: 8 }}><Icon name="check" size={14} /> No hidden fees</span>
              <span className="row" style={{ gap: 8 }}><Icon name="heart" size={14} /> Woman-owned</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* THE CLIPS */}
      <section style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ maxWidth: 760, marginBottom: 36 }}>
            <div className="eyebrow">The footage</div>
            <h2 style={{ marginTop: 8 }}>Watch a Sobi move, start to finish</h2>
            <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>
              Not a byte of video loads until you press play, so this page opens fast on a phone.
              Tap any clip to watch it right here — no Instagram account needed.
            </p>
          </div>

          {clips.length ? (
            <div className="work-grid">
              {clips.map((clip) => (
                <WorkClipPlayer key={clip.slug} clip={clip} />
              ))}
            </div>
          ) : (
            <div className="work-empty">
              <h3>New clips are on the way</h3>
              <p>
                We are pulling the latest job footage together. In the meantime,{" "}
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                  @sobimoving on Instagram
                </a>{" "}
                has what we have shot this month.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHAT TO LOOK FOR */}
      <section className="alt" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ maxWidth: 760, marginBottom: 36 }}>
            <div className="eyebrow">How to watch these</div>
            <h2 style={{ marginTop: 8 }}>Four things worth watching for</h2>
            <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>
              Most moving companies look identical on a website. On video they do not. Here is what
              separates a careful crew from a fast one — check it against any mover you are
              considering, not just us.
            </p>
          </div>
          <div className="work-look">
            {LOOK_FOR.map((item) => (
              <div key={item.title} className="work-look-card">
                <div className="service-icon"><Icon name={item.icon} size={18} /></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="stats-row">
            <div className="stat">
              <div className="stat-value">{c.moves_stat}</div>
              <div className="stat-label">Moves completed</div>
            </div>
            <div className="stat">
              <div className="stat-value">{REVIEW_RATING}</div>
              <div className="stat-label">
                From{" "}
                <a href={GBP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  {REVIEW_COUNT} Google reviews
                </a>
              </div>
            </div>
            <div className="stat">
              <div className="stat-value">{LOCATIONS.length}</div>
              <div className="stat-label">Metro Atlanta cities served</div>
            </div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Phones open, seven days</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS — the written half of the same proof. These back the
          aggregateRating in the site-wide schema, which Google expects to see
          on the page rather than asserted from nowhere. */}
      <section className="alt" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">Reviews</div>
              <h2 style={{ marginTop: 8 }}>What the footage does not show</h2>
            </div>
            <div className="row" style={{ gap: 4 }}>
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={20} />)}
              <span style={{ marginLeft: 10, color: "var(--ink-soft)", fontSize: 14 }}>
                {REVIEW_RATING} from{" "}
                <a href={GBP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                  {REVIEW_COUNT} Google reviews
                </a>
              </span>
            </div>
          </div>
          <div className="testimonial-grid">
            {REVIEWS.map((r) => (
              <figure key={r.author} className="testimonial-card">
                <div className="quote-mark">&ldquo;</div>
                <blockquote>{r.body}</blockquote>
                <figcaption>
                  <div className="t-avatar"></div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{r.author}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>Google review · {r.when}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="row" style={{ marginTop: 32, gap: 12 }}>
            <a href={`tel:${phoneTel}`} className="btn btn-primary">
              <Icon name="phone" size={14} /> Call {phoneDisplay}
            </a>
            <Link href="/movers" className="btn btn-ghost btn-arrow">See where we move</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Questions about these videos</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>Straight answers</h2>
            <div className="faq-list">
              {FAQ.map((f, i) => (
                <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>Seen enough? Let&rsquo;s talk about your move.</h2>
          <p style={{ color: "#c9c2b3", marginTop: 12, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Tell us what you are moving and where it is going. You get an itemized quote back, usually
            the same day, with nothing added later.
          </p>
          <div className="row" style={{ marginTop: 28, gap: 12, justifyContent: "center" }}>
            <a href={`tel:${phoneTel}`} className="btn btn-accent">
              <Icon name="phone" size={14} /> Call {phoneDisplay}
            </a>
            <Link href="/quote" className="btn btn-ghost btn-arrow" style={{ color: "#f5efe4", borderColor: "rgba(245,239,228,0.3)" }}>
              Get your free quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
