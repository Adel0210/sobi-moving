import Link from "next/link";
import { Icon } from "./Icon";
import { LOCATIONS } from "@/lib/locations";

export const SiteFooter = ({
  phoneDisplay = "(630) 456-1347",
  phoneTel = "6304561347",
  email = "hello@sobimoving.com",
  hours = "Open 24 hours · 7 days a week",
}: {
  phoneDisplay?: string;
  phoneTel?: string;
  email?: string;
  hours?: string;
}) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="Sobi Moving" />
            <strong>Sobi Moving</strong>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, color: "#c9c2b3" }}>
            Atlanta&apos;s trusted moving company. We handle every detail so you can focus on what matters — feeling at home.
          </p>
          <div style={{ fontSize: 13, color: "#908a7f", lineHeight: 1.7 }}>
            Serving the Metro Atlanta area · Georgia
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <a href={`tel:${phoneTel}`} style={{ fontSize: 14, fontWeight: 500, color: "#f5efe4" }}>
              {phoneDisplay}
            </a>
            <a href={`mailto:${email}`} style={{ fontSize: 14 }}>{email}</a>
            <span style={{ fontSize: 13, color: "#908a7f" }}>{hours}</span>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <ul className="footer-list">
            <li><Link href="/services">All services</Link></li>
            <li><Link href="/services/local-moving">Local Moving</Link></li>
            <li><Link href="/services/long-distance-moving">Long-Distance Moving</Link></li>
            <li><Link href="/services/residential-moving">Residential Moving</Link></li>
            <li><Link href="/services/commercial-moving">Commercial Moving</Link></li>
            <li><Link href="/senior-moving">Senior Moving</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul className="footer-list">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/senior-moving">Senior Moving</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/movers">Service Areas</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/quote">Get a Quote</Link></li>
          </ul>
          <h4 style={{ marginTop: 32 }}>Service Areas</h4>
          {/* Driven off LOCATIONS so every city page gets a footer link. Six of
              them used to be missing here and were earning almost no
              impressions as a result. */}
          <p style={{ fontSize: 13, lineHeight: 1.9, color: "#908a7f" }}>
            {LOCATIONS.map((l, i) => (
              <span key={l.slug}>
                {i > 0 ? " · " : null}
                <Link href={`/movers/${l.slug}`}>{l.city}</Link>
              </span>
            ))}
          </p>
        </div>
        <div>
          <h4>Get Started</h4>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Free consultation, no pressure. We&apos;ll answer every question before you book.
          </p>
          <Link href="/quote" className="btn btn-accent" style={{ marginBottom: 10 }}>
            Get a Free Quote <Icon name="arrow-right" size={14} />
          </Link>
          <div>
            <a href={`tel:${phoneTel}`} style={{ fontSize: 14 }}>Or call {phoneDisplay}</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Sobi Moving. All rights reserved. Metro Atlanta, GA.</span>
        <span>Licensed &amp; Insured · Background-Checked Team · No Hidden Fees</span>
      </div>
    </div>
  </footer>
);
