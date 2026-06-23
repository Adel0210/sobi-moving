import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_TYPES } from "@/lib/serviceTypes";
import { Icon } from "@/app/components/Icon";
import { FAQItem } from "@/app/components/ui";

const SITE = "https://www.sobimoving.com";

export function generateStaticParams() {
  return SERVICE_TYPES.map((s) => ({ type: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const svc = SERVICE_TYPES.find((s) => s.slug === type);
  if (!svc) return {};
  return {
    title: `${svc.name} in Metro Atlanta`,
    description: svc.intro,
    alternates: { canonical: `/services/${svc.slug}` },
  };
}

export default async function ServiceTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const svc = SERVICE_TYPES.find((s) => s.slug === type);
  if (!svc) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    serviceType: svc.name,
    provider: { "@type": "MovingCompany", name: "Sobi Moving", url: SITE },
    areaServed: { "@type": "City", name: "Atlanta, GA" },
    description: svc.intro,
  };

  return (
    <main className="page-enter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">{svc.tagline}</div>
            <h1 style={{ marginTop: 8 }}>{svc.name} <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>in metro Atlanta.</em></h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>{svc.intro}</p>
            <div className="row" style={{ marginTop: 30, gap: 12 }}>
              <Link href="/quote" className="btn btn-primary btn-arrow">Get your free quote</Link>
              <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14} /> (630) 456-1347</a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* BODY + INCLUDES */}
      <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="service-detail-grid">
            <div>
              {svc.body.split("\n\n").map((p, i) => (
                <p key={i} style={{ marginTop: i ? 16 : 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>{p}</p>
              ))}
            </div>
            <div>
              <h4 style={{ marginBottom: 16, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mute)" }}>What&apos;s included</h4>
              <ul className="service-includes">
                {svc.includes.map((x) => (
                  <li key={x}><Icon name="check" size={15} /> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">FAQ</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>{svc.name} questions</h2>
            <div className="faq-list">
              {svc.faq.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>Ready to move?</h2>
          <p style={{ color: "#c9c2b3", marginTop: 12, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Tell us about your move and we&apos;ll send a clear, no-obligation quote.
          </p>
          <div className="row" style={{ marginTop: 28, gap: 12, justifyContent: "center" }}>
            <Link href="/quote" className="btn btn-accent btn-arrow">Get your free quote</Link>
            <Link href="/movers" className="btn btn-ghost" style={{ color: "#f5efe4", borderColor: "rgba(245,239,228,0.3)" }}>See service areas</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
