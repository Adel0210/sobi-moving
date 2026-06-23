import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCATIONS } from "@/lib/locations";
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
    title: `Movers in ${loc.city}, GA — Local & Long-Distance`,
    description: `Sobi Moving is ${loc.city}'s trusted moving company — full-service packing, white-glove setup, and a careful, licensed crew for local & long-distance moves. Get a free quote.`,
    alternates: { canonical: `/movers/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const loc = LOCATIONS.find((l) => l.slug === city);
  if (!loc) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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

      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">Sobi Moving · {loc.county}</div>
            <h1 style={{ marginTop: 8 }}>Movers in <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>{loc.city}, GA.</em></h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>{loc.intro}</p>
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
              <Link key={s.id} href={`/services?s=${s.id}`} className="service-card">
                <div className="service-card-body">
                  <div className="service-icon"><Icon name={s.icon} size={18} /></div>
                  <h3>{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">{loc.city} moving FAQ</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>Questions, answered</h2>
            <div className="faq-list">
              {loc.faq.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>Moving in {loc.city}? Let&apos;s make it easy.</h2>
          <p style={{ color: "#c9c2b3", marginTop: 12, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Free, no-obligation quote — usually back to you the same day.
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
