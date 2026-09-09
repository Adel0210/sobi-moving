import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITY_SERVICES, findCityService } from "@/lib/cityServices";
import { nearbyLocations } from "@/lib/locations";
import { REVIEWS, REVIEW_COUNT, REVIEW_RATING, GBP_URL } from "@/lib/reviews";
import { Icon } from "@/app/components/Icon";
import { FAQItem } from "@/app/components/ui";

const SITE = "https://www.sobimoving.com";

export function generateStaticParams() {
  return CITY_SERVICES.map((x) => ({ city: x.citySlug, service: x.serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city, service } = await params;
  const found = findCityService(city, service);
  if (!found) return {};
  return {
    title: found.cs.title,
    description: found.cs.description,
    alternates: { canonical: `/movers/${city}/${service}` },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city, service } = await params;
  const found = findCityService(city, service);
  if (!found) notFound();
  const { cs, location, service: svc } = found;
  const url = `${SITE}/movers/${city}/${service}`;
  const nearby = nearbyLocations(location.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cs.h1,
    serviceType: svc.name,
    provider: { "@type": "MovingCompany", name: "Sobi Moving", "@id": `${SITE}/#business` },
    areaServed: {
      "@type": "City",
      name: `${location.city}, GA`,
      containedInPlace: { "@type": "AdministrativeArea", name: location.county },
    },
    description: cs.answer,
    url,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cs.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE}/movers` },
      { "@type": "ListItem", position: 3, name: `${location.city} Movers`, item: `${SITE}/movers/${city}` },
      { "@type": "ListItem", position: 4, name: cs.h1, item: url },
    ],
  };
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

  return (
    <main className="page-enter">
      {[serviceLd, faqLd, crumbLd, reviewLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <nav className="blog-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
              <Link href="/movers">Service Areas</Link> <span className="sep">/</span>{" "}
              <Link href={`/movers/${city}`}>{location.city}</Link> <span className="sep">/</span>{" "}
              <span className="current">Commercial</span>
            </nav>
            <h1>{cs.h1}</h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 660 }}>{cs.answer}</p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
              <Link href="/quote" className="btn btn-primary btn-arrow">Get your free quote</Link>
              <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14} /> (630) 456-1347</a>
            </div>
            <div className="hero-trust" style={{ marginTop: 26 }}>
              <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14} /> Licensed &amp; insured</span>
              <span className="row" style={{ gap: 8 }}><Icon name="clock" size={14} /> Open 24 hours</span>
              <span className="row" style={{ gap: 8 }}><Icon name="star" size={14} /> {REVIEW_RATING} from {REVIEW_COUNT} reviews</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* AREAS */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 style={{ marginBottom: 28 }}>{cs.headings.areas}</h2>
          <div className="services-grid">
            {cs.areas.map((a) => (
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

      {/* CHALLENGES */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Local knowledge</div>
            <h2 style={{ marginTop: 8, marginBottom: 28 }}>{cs.headings.challenges}</h2>
            {cs.challenges.map((c) => (
              <div key={c.title} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 19, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 style={{ marginTop: 8, marginBottom: 28 }}>{cs.headings.process}</h2>
          <div className="process-grid">
            {cs.process.map((p, i) => (
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

      {/* COST */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Pricing</div>
            <h2 style={{ marginTop: 8, marginBottom: 12 }}>{cs.headings.cost}</h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: 24, fontSize: 16, lineHeight: 1.65 }}>
              Every quote is itemized, and these are the things that move the number.
            </p>
            <ul className="service-includes">
              {cs.quoteFactors.map((f) => (<li key={f}><Icon name="check" size={15} /> {f}</li>))}
            </ul>
            <div className="row" style={{ marginTop: 28, gap: 12 }}>
              <Link href="/quote" className="btn btn-primary btn-arrow">Get your quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="alt" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <h2 style={{ marginBottom: 20 }}>Related moving services</h2>
            <ul className="service-includes">
              <li>
                <Icon name="check" size={15} />
                <Link href={`/movers/${city}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                  Home and apartment moves in {location.city}
                </Link>
              </li>
              <li>
                <Icon name="check" size={15} />
                <Link href={`/services/${service}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                  {svc.name} across metro Atlanta
                </Link>
              </li>
              {nearby.slice(0, 3).map((n) => (
                <li key={n.slug}>
                  <Icon name="check" size={15} />
                  <Link href={`/movers/${n.slug}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                    Movers in {n.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <h2 style={{ marginBottom: 24 }}>{cs.headings.faq}</h2>
            <div className="faq-list">
              {cs.faq.map((f, i) => (<FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="section-head-row">
            <div><h2>{cs.headings.reviews}</h2></div>
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
          <h2 style={{ color: "#f5efe4" }}>{cs.headings.cta}</h2>
          <p style={{ color: "#c9c2b3", marginTop: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Tell us your headcount, both addresses and when you need to be trading again. Quote back the same day.
          </p>
          <div className="row" style={{ marginTop: 28, gap: 12, justifyContent: "center" }}>
            <Link href="/quote" className="btn btn-accent btn-arrow">Get your free quote</Link>
            <a href="tel:6304561347" className="btn btn-ghost" style={{ color: "#f5efe4", borderColor: "rgba(245,239,228,0.3)" }}>
              <Icon name="phone" size={14} /> (630) 456-1347
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
