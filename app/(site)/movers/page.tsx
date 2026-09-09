import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/locations";
import { CITY_SERVICES } from "@/lib/cityServices";
import { SERVICE_TYPES } from "@/lib/serviceTypes";
import { Icon } from "@/app/components/Icon";

export const metadata: Metadata = {
  title: "Service Areas — Metro Atlanta Movers",
  description:
    "Sobi Moving serves communities across metro Atlanta — Sandy Springs, Roswell, Alpharetta, Dunwoody, Johns Creek, Marietta and more. Find your city for local & long-distance moving.",
  alternates: { canonical: "/movers" },
};

export default function MoversIndexPage() {
  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow">Service Areas</div>
            <h1 style={{ marginTop: 8 }}>Metro Atlanta movers, <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>neighbor to neighbor.</em></h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 600 }}>
              We move families and businesses across the metro every day. Find your city below — or just{" "}
              <Link href="/quote" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>get a free quote</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* City + service pages. Without a link here they are reachable only from
          the sitemap, which is how the first one shipped orphaned. */}
      {CITY_SERVICES.length ? (
        <section style={{ paddingBottom: 8 }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <h2 style={{ marginBottom: 16 }}>Specialist moves by city</h2>
              <ul className="service-includes">
                {CITY_SERVICES.map((cs) => {
                  const loc = LOCATIONS.find((l) => l.slug === cs.citySlug);
                  const svc = SERVICE_TYPES.find((x) => x.slug === cs.serviceSlug);
                  if (!loc || !svc) return null;
                  return (
                    <li key={`${cs.citySlug}-${cs.serviceSlug}`}>
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

      <section style={{ paddingBottom: 72 }}>
        <div className="container">
          <div className="services-grid">
            {LOCATIONS.map((l) => (
              <Link key={l.slug} href={`/movers/${l.slug}`} className="service-card">
                <div className="service-card-body">
                  <div className="service-icon"><Icon name="map" size={18} /></div>
                  <h3>{l.city}</h3>
                  <p>{l.county}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
