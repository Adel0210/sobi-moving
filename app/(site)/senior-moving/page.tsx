import type { Metadata } from "next";
import { Icon } from "@/app/components/Icon";
import { PhotoSlot, PhotoPlaceholder, FAQItem } from "@/app/components/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Senior & Downsizing Moves",
  description: "Compassionate senior moving and downsizing help across metro Atlanta — patient crews, full packing and setup, and coordination with families and care teams.",
};

const SeniorMovingPage = () => {
  return (
    <main className="page-enter">
      {/* HERO */}
      <section style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="hero-copy">
              <div className="eyebrow">Senior Moving · A Sobi Specialty</div>
              <h1>Moving with care.<br/><em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>At every stage of life.</em></h1>
              <p className="lead" style={{ marginTop: 24, maxWidth: 540 }}>
                Senior moves are different. Decades of belongings, complicated logistics, real emotion. Our team is patient, careful, and trained specifically for this — so families can focus on each other.
              </p>
              <div className="row" style={{ marginTop: 32, gap: 12 }}>
                <Link href="/quote" className="btn btn-accent btn-arrow">Get a free senior move quote</Link>
                <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14}/> (630) 456-1347</a>
              </div>
              <div className="hero-trust">
                <span className="row" style={{ gap: 8 }}><Icon name="heart" size={14}/> Compassionate, never rushed</span>
                <span className="row" style={{ gap: 8 }}><Icon name="users" size={14}/> Family-facing communication</span>
                <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14}/> Licensed &amp; insured</span>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <PhotoSlot
                id="senior-hero"
                shape="rounded"
                radius={18}
                src="/assets/illustrations/senior-moving.svg"
                placeholder="Drop senior moving hero photo — couple at door, downsizing, or warm interior"
              />
              <div className="hero-photo-badge">
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.1, color: "var(--accent)" }}>"Mom said it felt like home."</div>
                <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 4 }}>— Sarah M., Sandy Springs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR THE ADULT CHILD */}
      <section style={{ paddingTop: 16, paddingBottom: 56 }}>
        <div className="container">
          <div className="adult-child-block" style={{
            maxWidth: 880,
            margin: "0 auto",
            background: "var(--bg-alt)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "44px 48px",
            position: "relative"
          }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>If you're reading this for Mom or Dad</div>
            <h2 style={{ fontSize: "clamp(26px, 2.6vw, 36px)", lineHeight: 1.2, marginBottom: 18 }}>
              You don't have to figure this out alone.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: 14 }}>
              Most of the people who call us aren't the ones moving — they're an adult son or daughter trying to coordinate from across town, across state, or across a long week of decisions. We get it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: 22 }}>
              We'll talk you through what a senior move actually looks like, what to expect on the day, and how to prepare your parent without overwhelming them. We can coordinate with the community, the family, and anyone else you need us to. You can be there for the move — or trust us with the keys and the photos when it's done.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 15 }}>
              <li className="row" style={{ gap: 10 }}><Icon name="check" size={16}/> We'll call the community for you</li>
              <li className="row" style={{ gap: 10 }}><Icon name="check" size={16}/> Sort &amp; donate what doesn't fit</li>
              <li className="row" style={{ gap: 10 }}><Icon name="check" size={16}/> Photos &amp; updates if you can't be there</li>
              <li className="row" style={{ gap: 10 }}><Icon name="check" size={16}/> Familiar layout in the new space</li>
            </ul>
            <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
              <a href="tel:6304561347" className="btn btn-accent btn-arrow"><Icon name="phone" size={14}/> Call us — we'll walk you through it</a>
              <Link href="/quote" className="btn btn-ghost">Start a quote for your parent</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS IS DIFFERENT */}
      <section className="alt">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 820, marginBottom: 48 }}>
            <div className="eyebrow">Why a Senior Move Is Different</div>
            <h2>This isn't just a move. <em style={{ fontStyle: "italic", color: "var(--accent)" }}>It's a transition.</em></h2>
            <p className="lead" style={{ marginTop: 12 }}>
              We've helped hundreds of seniors and their families through every kind of move — independent home to a community, full-time home to assisted living, downsizing closer to family. Here's what we bring to it.
            </p>
          </div>
          <div className="senior-pillars">
            {[
              { icon: "heart", title: "Patience first", body: "We move at the pace that feels right. No rushing, no pressure. If the day needs to slow down, we slow down." },
              { icon: "users", title: "Family-facing", body: "We coordinate with adult children, care teams, and community staff so no one feels left out of the loop." },
              { icon: "home", title: "Familiar layouts", body: "When it helps, we recreate the old home in the new one — same furniture arrangement, same bedside setup." },
              { icon: "package", title: "Sorting & downsizing", body: "We help decide what stays, what goes to family, what's donated, and what gets sold. With care, not pressure." },
              { icon: "sparkles", title: "Fully set up", body: "Bed made, kitchen stocked, favorite chair in the right spot. Day one feels like home." },
              { icon: "shield", title: "Trained & checked", body: "Every team member is background-checked and trained specifically for working with senior clients and families." },
            ].map(p => (
              <div key={p.title} className="pillar">
                <div className="pillar-icon"><Icon name={p.icon} size={20} /></div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">Real Senior Moves</div>
              <h2>From boxes to "home"<br/>— in a single day.</h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>
              A glimpse at a few recent senior moves we've completed across Atlanta. Photos shared with permission.
            </p>
          </div>
          <div className="gallery-grid">
            <PhotoPlaceholder src="/assets/illustrations/senior-livingroom.svg" className="g-1" label="Before & after · living room" hint="Wide shot of a fully set-up senior living room — favorite chair, photos, lamp on." ratio="4 / 5" />
            <PhotoPlaceholder src="/assets/illustrations/senior-kitchen.svg" className="g-2" label="Team in action · packing kitchen" hint="Sobi team carefully wrapping china or kitchen items, candid." ratio="1 / 1" />
            <PhotoPlaceholder src="/assets/illustrations/senior-bedroom.svg" className="g-3" label="Bedroom setup" hint="Bed made, nightstand arranged with familiar items." ratio="1 / 1" />
            <PhotoPlaceholder src="/assets/illustrations/senior-family.svg" className="g-4" label="Family moment" hint="Adult child and parent sharing a moment in the new space." ratio="4 / 5" />
            <PhotoPlaceholder src="/assets/illustrations/truck.svg" className="g-5" label="Truck arrival" hint="Branded truck arriving at a senior community." ratio="3 / 2" />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="alt">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 760, marginBottom: 56 }}>
            <div className="eyebrow">Our Senior Moving Process</div>
            <h2>A plan built for the family,<br/>not just the move.</h2>
          </div>
          <div className="senior-process">
            {[
              { n: "01", t: "Family consultation", d: "We sit down with the family — in-person or video — to understand the move, the timeline, and what matters most." },
              { n: "02", t: "Floor plan & sort", d: "We measure the new space and walk through what fits, what stays with family, and what gets donated or sold." },
              { n: "03", t: "Pack with care", d: "Decades of belongings get packed slowly, labeled clearly, and protected like our own. Heirlooms get extra attention." },
              { n: "04", t: "Move day", d: "We transport everything in clean, padded trucks. Family can be there, or trust us with the keys — we'll send updates." },
              { n: "05", t: "White glove setup", d: "Furniture placed exactly as planned. Bed made, kitchen organized, closet hung. Ready for day one." },
              { n: "06", t: "Day-after check-in", d: "We follow up the next day. Anything that needs to be moved, adjusted, or returned, we handle." },
            ].map(s => (
              <div key={s.n} className="senior-process-step">
                <div className="senior-process-num">{s.n}</div>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL FEATURE */}
      <section>
        <div className="container">
          <div className="senior-quote-block">
            <div className="senior-quote-photo">
              <PhotoSlot id="senior-testimonial" shape="rounded" radius={14} src="/assets/illustrations/portrait-senior.svg" placeholder="Senior client portrait or family photo" />
            </div>
            <figure>
              <div className="quote-mark" style={{ fontSize: 96 }}>"</div>
              <blockquote style={{ fontFamily: "var(--serif)", fontSize: 32, lineHeight: 1.25, margin: 0, color: "var(--ink)", letterSpacing: "-0.015em", fontWeight: 400 }}>
                Moving my mom was something I dreaded for months. Sobi made it feel easy. They packed everything, set up her new room beautifully, and she walked in and said it felt like home.
              </blockquote>
              <figcaption style={{ marginTop: 28, fontSize: 15, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 36, height: 1, background: "var(--accent)" }}></span>
                <strong style={{ color: "var(--ink)" }}>Sarah M.</strong>
                <span style={{ color: "var(--ink-mute)" }}>· Sandy Springs · Mother's move to assisted living</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="dark">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--accent)" }}>For Communities & Care Teams</div>
              <h2>We work hand-in-hand with<br/>Atlanta's senior communities.</h2>
              <p className="lead" style={{ marginTop: 20, maxWidth: 480 }}>
                Independent living, assisted living, memory care. We coordinate directly with community staff, handle move-in paperwork, and follow community move-in protocols.
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-accent btn-arrow">Partner with us</Link>
                <Link href="/quote" className="btn btn-ghost" style={{ borderColor: "#2f2b25", color: "#f5efe4" }}>Get a quote</Link>
              </div>
            </div>
            <ul className="why-list">
              {[
                "Community move-in coordination",
                "Estate sale & donation partnerships",
                "Memory care–trained team",
                "Care team & POA communication",
                "Flexible day-of scheduling",
                "Insurance & paperwork handled",
                "Furniture donation pickups",
                "Hoarding & deep declutter support",
              ].map(w => (
                <li key={w}><Icon name="check" size={16}/>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="container-narrow">
          <div className="section-head" style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow">Senior Moving FAQ</div>
            <h2>What families ask us most.</h2>
          </div>
          <div className="faq-list">
            <FAQItem defaultOpen q="My parent isn't sure they want to move yet. Can you still help us plan?" a="Yes. Many of our senior moves start months before the actual move date. We can help with the conversation, the floor plan, the sorting, and the timeline — and we won't pressure anyone into anything." />
            <FAQItem q="Can you coordinate directly with the senior living community?" a="Absolutely. We work with most major communities across Atlanta. We handle the move-in window, the loading dock logistics, and the paperwork so your family doesn't have to." />
            <FAQItem q="What about items that won't fit in the new place?" a="We coordinate donations to local nonprofits, can refer estate sale partners, and arrange furniture pickups for family members. Nothing gets thrown out without family approval." />
            <FAQItem q="Can you replicate my parent's old layout in the new home?" a="Yes — and we recommend it when possible. A familiar bedside table, the same favorite chair angle, familiar pieces in their usual spots... it makes day one feel like home, not a hospital room." />
            <FAQItem q="Do you do memory care moves?" a="Yes. Our team is trained for memory care moves specifically. We move slowly, communicate clearly, and follow the care team's lead." />
            <FAQItem q="Can adult children manage this remotely?" a="Often, yes. We can be your eyes and hands on the ground — sending photos, video walkthroughs, and updates throughout the move. Many of our families coordinate from out of state." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-grid">
            <div>
              <div className="eyebrow">Let's start with a conversation</div>
              <h2 style={{ marginTop: 8 }}>Ready when your family is.</h2>
              <p className="lead" style={{ marginTop: 16, maxWidth: 480 }}>
                Call us directly or request a free in-home consultation. No pressure, no obligation, no rushing — that's a promise.
              </p>
            </div>
            <div className="cta-buttons">
              <Link href="/quote" className="btn btn-accent btn-arrow">Request consultation</Link>
              <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14}/> (630) 456-1347</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SeniorMovingPage;
