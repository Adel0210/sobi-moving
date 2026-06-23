import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { PhotoSlot, PhotoPlaceholder } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "About Sobi Moving",
  description: "Meet Sobi Moving — a metro Atlanta moving company built on honest pricing, background-checked crews, and treating every home like our own.",
};

const AboutPage = () => (
  <main className="page-enter">
    {/* HEADER */}
    <section style={{ paddingTop: 56, paddingBottom: 64 }}>
      <div className="container">
        <div className="about-hero">
          <div>
            <div className="eyebrow">Our Story</div>
            <h1 style={{ marginTop: 8 }}>Built from <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>personal experience.</em></h1>
            <p className="lead" style={{ marginTop: 24, maxWidth: 540 }}>
              Sobi Moving exists because moving doesn't have to feel the way it usually does. We're here to be the part of the process that's calm, careful, and on your side.
            </p>
          </div>
          <div className="about-hero-photo">
            <PhotoSlot id="about-hero" shape="rounded" radius={16} src="/assets/illustrations/about-hero.svg" placeholder="Drop founder portrait, team photo, or truck on location" />
          </div>
        </div>
      </div>
    </section>

    {/* FOUNDER STORY */}
    <section className="alt">
      <div className="container">
        <div className="founder-grid">
          <div className="founder-photo-wrap">
            <PhotoSlot id="about-founder" shape="rounded" radius={14} src="/assets/illustrations/portrait-founder.svg" placeholder="Heebel — portrait or candid on the job" />
            <div className="founder-name-card">
              <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>Heebel Khamissi</div>
              <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>Founder, Sobi Moving</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">From the Founder</div>
            <h2 style={{ marginTop: 8 }}>"I wanted to be the difference I never had as a kid."</h2>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18, fontSize: 17, lineHeight: 1.65, color: "var(--ink-soft)" }}>
              <p>I grew up moving almost twice a year. It was always just my mom and me, dealing with movers and navigating a process that felt stressful and overwhelming every single time.</p>
              <p>Six years ago, I had the opportunity to help a family friend with their move. Seeing how grateful they were — and realizing they felt calm and supported instead of stressed — was a turning point for me.</p>
              <p>That's when I decided I wanted to be that difference for others. I wanted to be the reliable, caring piece of the moving process that I never had as a kid. Today, that mindset is the foundation of everything we do — every quote, every box, every day.</p>
              <p style={{ color: "var(--ink)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.4, marginTop: 8 }}>
                We're not the cheapest. We're the team you'll recommend to your family.
              </p>
            </div>
            <div style={{ marginTop: 24, fontSize: 14, color: "var(--ink-mute)" }}>— Heebel Khamissi, Founder</div>
          </div>
        </div>
      </div>
    </section>

    {/* VALUES */}
    <section>
      <div className="container">
        <div className="section-head" style={{ maxWidth: 760, marginBottom: 56 }}>
          <div className="eyebrow">What We Believe</div>
          <h2>Five things we won't compromise on.</h2>
        </div>
        <div className="values-grid">
          {[
            { n: "01", t: "Care over speed", d: "If we have to choose, we choose careful. A few extra minutes is worth never breaking your grandmother's china." },
            { n: "02", t: "Honest pricing", d: "The number we quote is the number you pay. No surprises on the truck, no day-of upcharges. Period." },
            { n: "03", t: "Real communication", d: "We answer the phone. We update you when we're running early. We tell you the truth, even when it's not what you want to hear." },
            { n: "04", t: "Respect, always", d: "Your home, your belongings, your timeline, your family — we treat all of it the way we'd want ours treated." },
            { n: "05", t: "Show up the same", d: "First quote or fifth move, big house or studio, small job or large — same team, same care, same standard." },
          ].map(v => (
            <div key={v.n} className="value-row">
              <div className="value-num">{v.n}</div>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TEAM */}
    <section className="alt">
      <div className="container">
        <div className="section-head-row">
          <div>
            <div className="eyebrow">The Team</div>
            <h2>Background-checked, trained,<br/>and proud of what we do.</h2>
          </div>
          <p className="lead" style={{ maxWidth: 380 }}>
            Every member of our team is background-checked, trained on our standards, and respected as a professional. No day labor, no last-minute hires.
          </p>
        </div>
        <div className="team-grid">
          {[
            { name: "Heebel Khamissi", role: "Founder & Lead Mover", photo: "/assets/illustrations/portrait-founder.svg" },
            { name: "Team Member", role: "Senior Move Specialist", photo: "/assets/illustrations/portrait-team-1.svg" },
            { name: "Team Member", role: "Lead Packer", photo: "/assets/illustrations/portrait-team-2.svg" },
            { name: "Team Member", role: "White Glove Specialist", photo: "/assets/illustrations/portrait-team-3.svg" },
          ].map((m, i) => (
            <div key={i} className="team-card">
              <PhotoPlaceholder src={m.photo} label={`Team photo · ${m.name}`} ratio="4 / 5" style={{ minHeight: 0 }} />
              <div style={{ padding: "20px 4px 4px" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.2 }}>{m.name}</div>
                <div style={{ fontSize: 14, color: "var(--ink-mute)", marginTop: 4 }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TRUCK / EQUIPMENT */}
    <section>
      <div className="container">
        <div className="truck-grid">
          <div>
            <div className="eyebrow">Trucks &amp; Kit</div>
            <h2 style={{ marginTop: 8 }}>Clean trucks. Right tools.<br/>No half-measures.</h2>
            <p className="lead" style={{ marginTop: 20, maxWidth: 480 }}>
              Our trucks are well-maintained, padded, and stocked with the right materials so we never have to improvise on your move day.
            </p>
            <ul className="truck-list">
              <li><Icon name="check" size={16}/> Padded box trucks, regularly serviced</li>
              <li><Icon name="check" size={16}/> Floor &amp; banister protection on every job</li>
              <li><Icon name="check" size={16}/> Full packing kit on the truck — never run out</li>
              <li><Icon name="check" size={16}/> Tool kit for assembly &amp; small repairs</li>
              <li><Icon name="check" size={16}/> Wardrobe boxes &amp; specialty crates available</li>
            </ul>
          </div>
          <PhotoPlaceholder src="/assets/illustrations/truck.svg" label="Photo · Sobi truck or kit on the job" hint="Branded truck on a residential street, or close-up of the team's labeled boxes and tools." ratio="4 / 5" className="tall" />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-band">
      <div className="container">
        <div className="cta-grid">
          <div>
            <div className="eyebrow">Let's meet</div>
            <h2 style={{ marginTop: 8 }}>Want to talk before you book?</h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: 460 }}>That's exactly how we like it. A free, no-pressure conversation is how almost every Sobi move starts.</p>
          </div>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-primary btn-arrow">Contact us</Link>
            <Link href="/quote" className="btn btn-ghost">Get a quote</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AboutPage;
