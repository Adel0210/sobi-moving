import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_TYPES } from "@/lib/serviceTypes";
import { CITY_SERVICES } from "@/lib/cityServices";
import { LOCATIONS } from "@/lib/locations";
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
    title: svc.depth?.headings.title ?? `${svc.name} in Metro Atlanta`,
    // svc.intro runs well past the 155-char limit, so trim to the first
    // sentence and top up with the proof that earns the click.
    description: svc.depth?.headings.description ?? `${svc.intro.split(". ")[0]}. Open 24/7, rated 5.0 from 32 Google reviews.`.slice(0, 155),
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
    mainEntity: [...(svc.depth?.faqExtra ?? []), ...svc.faq].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    serviceType: svc.name,
    provider: { "@type": "MovingCompany", name: "Sobi Moving", url: SITE },
    areaServed: { "@type": "City", name: "Atlanta, GA" },
    // svc.intro runs well past the 155-char limit, so trim to the first
    // sentence and top up with the proof that earns the click.
    description: svc.depth?.answer ?? `${svc.intro.split(". ")[0]}. Open 24/7, rated 5.0 from 32 Google reviews.`.slice(0, 155),
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
            <h1 style={{ marginTop: 8 }}>
              {svc.depth?.headings.h1 ? (
                svc.depth.headings.h1
              ) : (
                <>{svc.name} <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>in metro Atlanta.</em></>
              )}
            </h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>{svc.depth ? svc.depth.answer : svc.intro}</p>
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

      {/* EXPLAINER SECTIONS — the decisions a customer actually has to make for
          this service. Only on services that have been built out. */}
      {svc.depth ? (
        <section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div className="eyebrow">What to know</div>
              <h2 style={{ marginTop: 8, marginBottom: 28 }}>{svc.depth.headings.sections}</h2>
              {svc.depth.sections.map((c) => (
                <div key={c.heading} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 19, marginBottom: 8 }}>{c.heading}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* PROCESS */}
      {svc.depth ? (
        <section className="alt" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div className="eyebrow">How it works</div>
            <h2 style={{ marginTop: 8, marginBottom: 28 }}>{svc.depth.headings.process}</h2>
            <div className="process-grid">
              {svc.depth.process.map((p, i) => (
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

      {/* WHAT AFFECTS YOUR QUOTE — the cost question, answered without
          publishing figures we do not have. */}
      {svc.depth ? (
        <section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div className="eyebrow">Pricing</div>
              <h2 style={{ marginTop: 8, marginBottom: 12 }}>{svc.depth.headings.cost}</h2>
              <p style={{ color: "var(--ink-soft)", marginBottom: 24, fontSize: 16, lineHeight: 1.65 }}>
                Every quote is itemized, and these are the things that move the number. Tell us about
                your move and you get the figure back the same day, with nothing added later.
              </p>
              <ul className="service-includes">
                {svc.depth.quoteFactors.map((f) => (
                  <li key={f}><Icon name="check" size={15} /> {f}</li>
                ))}
              </ul>
              <div className="row" style={{ marginTop: 28, gap: 12 }}>
                <Link href="/quote" className="btn btn-primary btn-arrow">Get your {svc.name.toLowerCase()} quote</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className={svc.depth ? "alt" : undefined} style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">FAQ</div>
            <h2 style={{ marginTop: 8, marginBottom: 24 }}>{svc.depth?.headings.faq ?? `${svc.name} questions`}</h2>
            <div className="faq-list">
              {[...(svc.depth?.faqExtra ?? []), ...svc.faq].map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CITY PAGES for this service, so the metro page hands equity down
          instead of competing with the city+service pages. */}
      {CITY_SERVICES.filter((x) => x.serviceSlug === svc.slug).length ? (
        <section style={{ paddingTop: 8, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <h2 style={{ marginBottom: 16 }}>{svc.name} by city</h2>
              <ul className="service-includes">
                {CITY_SERVICES.filter((x) => x.serviceSlug === svc.slug).map((cs) => {
                  const loc = LOCATIONS.find((l) => l.slug === cs.citySlug);
                  if (!loc) return null;
                  return (
                    <li key={cs.citySlug}>
                      <Icon name="check" size={15} />
                      <Link href={`/movers/${cs.citySlug}/${cs.serviceSlug}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                        {svc.name} in {loc.city}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#f5efe4" }}>{svc.depth?.headings.cta ?? "Ready to move?"}</h2>
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
