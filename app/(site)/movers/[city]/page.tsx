import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCATIONS, nearbyLocations } from "@/lib/locations";
import { REVIEWS, REVIEW_COUNT, REVIEW_RATING, GBP_URL } from "@/lib/reviews";
import { SERVICE_TYPES } from "@/lib/serviceTypes";
import { Icon } from "@/app/components/Icon";
import { FAQItem } from "@/app/components/ui";

const SITE = "https://www.sobimoving.com";

const SERVICES = [
  { id: "full-moving", icon: "truck", title: "Local & long distance" },
  { id: "white-glove", icon: "sparkles", title: "White glove setup" },
  { id: "packing", icon: "box", title: "Full packing" },
  { id: "unpacking", icon: "package", title: "Unpacking" },
  { id: "furniture", icon: "tool", title: "Furniture assembly" },
  { id: "junk-removal", icon: "trash", title: "Junk removal" },
];

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const loc = LOCATIONS.find((l) => l.slug === city);
  if (!loc) return {};
  return {
    title: `Movers in ${loc.city}, GA`,
    description: loc.depth
      ? `Moving in ${loc.city}? Local and long-distance movers open 24/7, rated 5.0 from ${REVIEW_COUNT} Google reviews. Same-day itemized quotes, no hidden fees.`
      : `Sobi Moving is ${loc.city}'s trusted moving company offering full-service packing, white-glove setup, and a careful, licensed crew for local & long-distance moves. Get a free quote.`,
    alternates: { canonical: `/movers/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const loc = LOCATIONS.find((l) => l.slug === city);
  if (!loc) notFound();
  const nearby = nearbyLocations(loc.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...(loc.depth?.faqExtra ?? []), ...loc.faq].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  // Service schema so the city page is understood as a service offered in a
  // place, not just a page that mentions a city.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Moving services in ${loc.city}, GA`,
    serviceType: "Moving company",
    provider: { "@type": "MovingCompany", name: "Sobi Moving", "@id": `${SITE}/#business` },
    areaServed: { "@type": "City", name: `${loc.city}, GA`, containedInPlace: { "@type": "AdministrativeArea", name: loc.county } },
    description: loc.depth?.answer ?? loc.intro,
    url: `${SITE}/movers/${loc.slug}`,
  };
  // Individual reviews backing the site-wide aggregateRating.
  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE}/#business`,
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      reviewBody: r.body,
    })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE}/movers` },
      { "@type": "ListItem", position: 3, name: `${loc.city} Movers`, item: `${SITE}/movers/${loc.slug}` },
    ],
  };

  return (
    <main className="page-enter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />

      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Sobi Moving · {loc.county}</div>
            <h1 style={{ marginTop: 8 }}>Movers in <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>{loc.city}, GA.</em></h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>
              {loc.depth ? loc.depth.answer : loc.intro}
            </p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
              <Link href="/quote" className="btn btn-primary btn-arrow">Get your free quote</Link>
              <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14} /> (630) 456-1347</a>
            </div>
            <div className="hero-trust" style={{ marginTop: 26 }}>
              <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14} /> Licensed &amp; insured</span>
              <span className="row" style={{ gap: 8 }}><Icon name="check" size={14} /> No hidden fees</span>
              <span className="row" style={{ gap: 8 }}><Icon name="star" size={14} /> 5.0 rated</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* LOCAL DETAIL */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <h2>Moving in {loc.city}, done right</h2>
            <p className="lead" style={{ marginTop: 16, color: "var(--ink-soft)" }}>{loc.local}</p>
            <p style={{ marginTop: 18, fontSize: 14, color: "var(--ink-mute)" }}>
              <strong>Areas we serve in {loc.city}:</strong> {loc.neighborhoods.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="eyebrow">What we do in {loc.city}</div>
          <h2 style={{ marginTop: 8, marginBottom: 28 }}>Full-service, start to finish</h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <Link key={s.id} href={`/services#svc-${s.id}`} className="service-card">
                <div className="service-card-body">
                  <div className="service-icon"><Icon name={s.icon} size={18} /></div>
                  <h3>{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS — named neighbourhoods with a real specific each. Generic metro
          copy is what leaves these pages indistinguishable from every other
          mover's location page. */}
      {loc.depth ? (
        <section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <h2 style={{ marginBottom: 8 }}>Where we move in {loc.city}</h2>
              <p style={{ color: "var(--ink-soft)", marginBottom: 28 }}>
                Access is different in every part of {loc.city}, and it changes how the day is planned.
              </p>
            </div>
            <div className="services-grid">
              {loc.depth.areas.map((a) => (
                <div key={a.name} className="service-card" style={{ cursor: "default" }}>
                  <div className="service-card-body">
                    <div className="service-icon"><Icon name="map" size={18} /></div>
                    <h3>{a.name}</h3>
                    <p>{a.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CHALLENGES */}
      {loc.depth ? (
        <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div className="eyebrow">Local knowledge</div>
              <h2 style={{ marginTop: 8, marginBottom: 28 }}>What makes a {loc.city} move different</h2>
              {loc.depth.challenges.map((c) => (
                <div key={c.title} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 19, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* PROCESS — stages with the durations we can actually stand behind.
          Only on cities that have been built out, so it does not become another
          shared template heading across all fifteen. */}
      {loc.depth ? (
        <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div className="eyebrow">How it works</div>
            <h2 style={{ marginTop: 8, marginBottom: 28 }}>How a {loc.city} move works</h2>
            <div className="process-grid">
              {loc.depth.process.map((p, i) => (
                <div key={p.stage} className="process-step">
                  <div className="process-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{p.stage}</h3>
                  <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 8, fontWeight: 500 }}>{p.when}</div>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* WHAT AFFECTS YOUR QUOTE — the cost question, answered honestly without
          publishing figures we do not have. */}
      {loc.depth ? (
        <section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div className="eyebrow">Pricing</div>
              <h2 style={{ marginTop: 8, marginBottom: 12 }}>How much do movers in {loc.city} cost?</h2>
              <p style={{ color: "var(--ink-soft)", marginBottom: 24, fontSize: 16, lineHeight: 1.65 }}>
                Every quote is itemized, and these are the things that move the number. Tell us about
                your move and you get the figure back the same day, with nothing added later.
              </p>
              <ul className="service-includes">
                {loc.depth.quoteFactors.map((f) => (
                  <li key={f}><Icon name="check" size={15} /> {f}</li>
                ))}
              </ul>
              <div className="row" style={{ marginTop: 28, gap: 12 }}>
                <Link href="/quote" className="btn btn-primary btn-arrow">Get your {loc.city} quote</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* SERVICE PAGES — city-specific anchor text so each service page picks up
          a local relevance signal instead of a bare "learn more". */}
      <section style={{ paddingTop: 8, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <h2 style={{ marginBottom: 8 }}>Moving services in {loc.city}</h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>
              Every kind of move we handle for {loc.city} families and businesses.
            </p>
            <ul className="service-includes">
              {SERVICE_TYPES.map((svc) => (
                <li key={svc.slug}>
                  <Icon name="check" size={15} />
                  <Link href={`/services/${svc.slug}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                    {svc.name} in {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEARBY CITIES */}
      {nearby.length ? (
        <section className="alt" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="container">
            <div className="eyebrow">Nearby</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>We also move around {loc.city}</h2>
            <div className="services-grid">
              {nearby.map((n) => (
                <Link key={n.slug} href={`/movers/${n.slug}`} className="service-card">
                  <div className="service-card-body">
                    <div className="service-icon"><Icon name="map" size={18} /></div>
                    <h3>Movers in {n.city}</h3>
                    <p>{n.county}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">{loc.city} moving FAQ</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>Questions, answered</h2>
            <div className="faq-list">
              {[...(loc.depth?.faqExtra ?? []), ...loc.faq].map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS — real Google reviews. These back the aggregateRating in the
          site-wide schema, which Google expects to be visible on the page. */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">Reviews</div>
              <h2 style={{ marginTop: 8 }}>What customers say</h2>
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
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>Moving in {loc.city}? Let&apos;s make it easy.</h2>
          <p style={{ color: "#c9c2b3", marginTop: 12, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Free, no-obligation quote, usually back to you the same day.
          </p>
          <div className="row" style={{ marginTop: 28, gap: 12, justifyContent: "center" }}>
            <Link href="/quote" className="btn btn-accent btn-arrow">Get your free quote</Link>
            <a href="tel:6304561347" className="btn btn-ghost" style={{ color: "#f5efe4", borderColor: "rgba(245,239,228,0.3)" }}><Icon name="phone" size={14} /> (630) 456-1347</a>
          </div>
        </div>
      </section>
    </main>
  );
}
