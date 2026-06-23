import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { PhotoSlot, PhotoPlaceholder, Stat, FAQItem, Marquee } from "@/app/components/ui";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Atlanta Movers — Local & Long-Distance Moving",
  description: "Sobi Moving handles local and long-distance moves across metro Atlanta with honest pricing, careful crews, and full-service packing, setup, and junk removal. Get a free quote.",
};

const SERVICES = [
  { id: "full-moving", icon: "truck", title: "Local & long distance", desc: "Across town or across state lines. Wrapped, padded, and on time." },
  { id: "white-glove", icon: "sparkles", title: "White glove setup", desc: "We don't just unload. Furniture placed, rooms arranged, ready to live in." },
  { id: "packing", icon: "box", title: "Packing", desc: "Every box labeled by room. Fragile items get the extra care they deserve." },
  { id: "unpacking", icon: "package", title: "Unpacking", desc: "Room by room, no boxes left behind. We even haul away the empties." },
  { id: "furniture", icon: "tool", title: "Furniture assembly", desc: "Beds, dressers, dining tables, flat packs. We bring the tools." },
  { id: "junk-removal", icon: "trash", title: "Junk removal", desc: "Donate first, dispose responsibly. Clear out the old before the new arrives." },
];

const TESTIMONIALS = [
  {
    quote: "Moving my mom was something I dreaded for months. Sobi Moving made it feel easy. They packed everything, set up her new room beautifully, and she walked in and said it felt like home.",
    name: "Sarah M.", location: "Sandy Springs",
  },
  {
    quote: "From the quote to the final box, everything was perfect. On time, careful with our furniture, and the white glove setup saved us days of work. Worth every penny.",
    name: "James & Carol T.", location: "Alpharetta",
  },
  {
    quote: "I've moved 4 times in 10 years. This was the first time I actually enjoyed the process. Heebel's team is the real deal.",
    name: "Marcus R.", location: "Buckhead",
  },
];

const SERVICE_AREAS = ["Sandy Springs","Alpharetta","Roswell","Marietta","Dunwoody","Brookhaven","Decatur","Buckhead","Midtown","East Cobb","Johns Creek","Smyrna","Vinings","Cumming","Woodstock"];

export default async function HomePage() {
  const content = await getContent();
  const seniorEmphasis: string = "featured";
  return (
    <main className="page-enter">
      {/* HERO */}
      <section style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">{content.hero_eyebrow}</div>
              <h1>{content.hero_headline} <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>{content.hero_em}</em></h1>
              <p className="lead" style={{ marginTop: 24, maxWidth: 520 }}>
                {content.hero_sub}
              </p>
              <div className="row" style={{ marginTop: 32, gap: 12 }}>
                <Link href="/quote" className="btn btn-primary btn-arrow">Get your free quote</Link>
                <Link href="/services" className="btn btn-ghost">View services</Link>
              </div>
              <div className="hero-trust">
                <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14}/> Licensed &amp; Insured</span>
                <span className="row" style={{ gap: 8 }}><Icon name="check" size={14}/> No Hidden Fees</span>
                <span className="row" style={{ gap: 8 }}><Icon name="phone" size={14}/> Free Consultation</span>
              </div>
              <div className="hero-promo">
                <span className="dot" />
                <strong>Licensed &amp; insured</strong>&nbsp;· background-checked crew · same-day quotes
              </div>
            </div>
            <div className="hero-photo-wrap">
              <PhotoSlot
                id="hero-main"
                shape="rounded"
                radius={18}
                src="/assets/hero-brand.svg"
                placeholder="Drop hero photo · move in progress, family at door, or branded truck"
              />
              <div className="hero-photo-badge">
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} stroke={1.5} />)}
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.1 }}>5.0</div>
                <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{content.moves_stat} moves completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={["Stress-Free Move","White Glove Setup","Same-Day Quotes","Background-Checked Team","Atlanta's Trusted Movers","No Hidden Fees","Licensed & Insured"]} />

      {/* PROMISE */}
      <section className="alt">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <div className="eyebrow muted">The Sobi Promise</div>
            <h2>Imagine walking into your new home <em style={{ fontStyle: "italic", color: "var(--accent)" }}>already set up.</em></h2>
            <p className="lead" style={{ marginTop: 12 }}>That's exactly what we deliver. Not just a move — a complete fresh start.</p>
          </div>
          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-icon"><Icon name="home" size={22} /></div>
              <h3>Everything in its place</h3>
              <p>You arrive to a fully set up home. Furniture arranged, boxes unpacked, every room ready for living.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon"><Icon name="heart" size={22} /></div>
              <h3>Zero stress. Zero hassle.</h3>
              <p>We handle packing, moving, assembly, and setup from start to finish. You just show up.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon"><Icon name="shield" size={22} /></div>
              <h3>A team you can trust</h3>
              <p>Background-checked, careful, and respectful of your home and everything inside it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">What We Do</div>
              <h2>Everything that goes into<br/>a smooth move day.</h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>
              From the first box to the final setup — we do it all. Pick what you need or let us run the whole move.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Link key={s.id} href={`/services?s=${s.id}`} className="service-card">
                <div className="service-card-photo">
                  <PhotoPlaceholder
                    src={`/assets/illustrations/svc-${s.id}.svg`}
                    label={`Service photo · ${s.title}`}
                    style={{ minHeight: 0, height: "100%", borderRadius: 10 }}
                  />
                </div>
                <div className="service-card-body">
                  <div className="service-icon"><Icon name={s.icon} size={18} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="btn-link" style={{ fontSize: 14 }}>Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SENIOR MOVING FEATURE */}
      {seniorEmphasis !== "subtle" ? (
        <section className="alt senior-feature">
          <div className="container">
            <div className="senior-feature-grid">
              <div className="senior-photo">
                <PhotoSlot
                  id="senior-feature"
                  shape="rounded"
                  radius={16}
                  src="/assets/illustrations/senior-moving.svg"
                  placeholder="Drop a senior moving photo — couple, downsizing setup, or warm interior"
                />
              </div>
              <div>
                <div className="eyebrow">Senior Moving · A Sobi Specialty</div>
                <h2>Moving a parent. Downsizing a home.<br/><em style={{ fontStyle: "italic", color: "var(--accent)" }}>We've done this hundreds of times.</em></h2>
                <p className="lead" style={{ marginTop: 20 }}>
                  Senior moves carry a lot — decades of belongings, complicated logistics, real emotion. Our team is patient, careful, and trained specifically for this. We coordinate with family, communities, and care teams so you don't have to manage it alone.
                </p>
                <ul className="senior-list">
                  <li><Icon name="check" size={16}/> Compassionate, patient, never rushed</li>
                  <li><Icon name="check" size={16}/> Furniture placed exactly like the old home, when that helps</li>
                  <li><Icon name="check" size={16}/> Donation, estate sale, &amp; downsizing coordination</li>
                  <li><Icon name="check" size={16}/> Family-facing communication every step of the way</li>
                </ul>
                <div className="row" style={{ marginTop: 28, gap: 12 }}>
                  <Link href="/senior-moving" className="btn btn-accent btn-arrow">Learn about Senior Moving</Link>
                  <Link href="/quote" className="btn btn-ghost">Get a free quote</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* TESTIMONIALS */}
      <section>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">What Families Say</div>
              <h2>Atlanta families<br/>trust Sobi Moving.</h2>
            </div>
            <div className="row" style={{ gap: 4 }}>
              {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={20}/>) }
              <span style={{ marginLeft: 10, color: "var(--ink-soft)", fontSize: 14 }}>5.0 average — 100+ verified reviews</span>
            </div>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="testimonial-card">
                <div className="quote-mark">"</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <div className="t-avatar"></div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>{t.location}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="stats-row">
            <Stat value={content.moves_stat} label="Moves completed" />
            <Stat value="5★" label="Average rating" />
            <Stat value="6+ yrs" label="Experience" />
            <Stat value="7 days" label="Per week" />
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="alt">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-photo-wrap">
              <PhotoSlot
                id="founder-portrait"
                shape="rounded"
                radius={14}
                src="/assets/illustrations/portrait-founder.svg"
                placeholder="Drop founder portrait — Heebel, on the truck, on the job"
              />
              <div className="founder-name-card">
                <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>Heebel Khamissi</div>
                <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>Founder, Sobi Moving</div>
              </div>
            </div>
            <div>
              <div className="eyebrow">Our Story</div>
              <h2>Built from personal experience.</h2>
              <div className="lead" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                <p>"I grew up moving almost twice a year. It was always just my mom and me, dealing with movers and navigating a process that felt stressful and overwhelming every single time."</p>
                <p>"Six years ago, I had the opportunity to help a family friend with their move. Seeing how grateful they were — and realizing they felt calm and supported instead of stressed — was a turning point for me."</p>
                <p>"That's when I decided I wanted to be that difference for others. I wanted to be the reliable, caring piece of the moving process that I never had as a kid. Today, that mindset is the foundation of everything we do."</p>
              </div>
              <div style={{ marginTop: 24, fontSize: 14, color: "var(--ink-mute)" }}>— Heebel Khamissi, Founder</div>
              <div style={{ marginTop: 28 }}>
                <Link href="/about" className="btn btn-link">Read the full story</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="eyebrow">How It Works</div>
              <h2>Simple. Seamless.<br/><em style={{ fontStyle: "italic", color: "var(--accent)" }}>Done.</em></h2>
            </div>
            <p className="lead" style={{ maxWidth: 380 }}>
              Four steps from "I'm thinking about moving" to "this already feels like home."
            </p>
          </div>
          <div className="process-grid">
            {[
              { n: "01", t: "Free Quote", d: "Tell us about your move and we'll send a clear, itemized quote — no guesswork." },
              { n: "02", t: "Custom Plan", d: "We build a detailed moving plan around your schedule and specific needs." },
              { n: "03", t: "Moving Day", d: "Our team handles everything. You don't lift a finger unless you want to." },
              { n: "04", t: "You're Home", d: "We set everything up and leave your space feeling like it's always been yours." },
            ].map((p, i) => (
              <div key={p.n} className="process-step">
                <div className="process-num">{p.n}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="dark">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--accent)" }}>Why Choose Us</div>
              <h2>The Sobi difference.</h2>
              <p className="lead" style={{ marginTop: 20, maxWidth: 480 }}>
                Eight reasons families across Atlanta choose us over the cheap option, the famous option, and the in-laws-with-a-truck option.
              </p>
              <div style={{ marginTop: 32 }}>
                <Link href="/quote" className="btn btn-accent btn-arrow">Get a free quote</Link>
              </div>
            </div>
            <ul className="why-list">
              {[
                "Compassionate &amp; patient team",
                "Background-checked movers",
                "Full packing &amp; white glove setup",
                "Floor &amp; furniture protection",
                "No hidden fees — ever",
                "Licensed &amp; insured",
                "Clean, well-equipped trucks",
                "Same-day free quotes",
              ].map((w, i) => (
                <li key={i}>
                  <Icon name="check" size={16} />
                  <span dangerouslySetInnerHTML={{ __html: w }}></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section>
        <div className="container">
          <div className="areas-head">
            <div>
              <div className="eyebrow">Service Areas</div>
              <h2>We come to you.</h2>
              <p className="lead" style={{ marginTop: 12 }}>Serving the entire Atlanta metro area — and beyond, by request.</p>
            </div>
            <div className="areas-photo">
              <PhotoPlaceholder
                src="/assets/illustrations/neighborhood.svg"
                label="Map / neighborhood photo"
                hint="Optional: aerial of Atlanta, branded truck on the road, or a custom service-area map."
                ratio="4 / 3"
              />
            </div>
          </div>
          <div className="areas-list">
            {SERVICE_AREAS.map(a => (
              <span key={a} className="area-pill">
                <Icon name="map" size={13} />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="container-narrow">
          <div className="section-head" style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow">FAQ</div>
            <h2>Questions? We have answers.</h2>
          </div>
          <div className="faq-list">
            <FAQItem defaultOpen q="How do you price a move?" a="Every move is priced to your specifics — home size, services needed, and distance. Tell us about your move and we'll send a transparent, itemized quote with no hidden fees, so you know exactly what to expect before you book." />
            <FAQItem q="What areas do you serve?" a="We serve the entire Atlanta metro area: Sandy Springs, Alpharetta, Roswell, Marietta, Dunwoody, Brookhaven, Decatur, Buckhead, Midtown, East Cobb, Johns Creek, Smyrna, Vinings, Cumming, Woodstock, and more." />
            <FAQItem q="How far in advance should I book?" a="We recommend 2–4 weeks for most moves. That said, we accommodate last-minute bookings based on availability — call us directly for urgent needs." />
            <FAQItem q="Do you provide packing materials?" a="Yes. Our full packing service includes all materials — boxes, bubble wrap, packing paper, furniture blankets, and wardrobe boxes. Everything is included in your quote." />
            <FAQItem q="Are your movers background-checked?" a="Absolutely. Every member of our team is thoroughly background-checked and trained. Your home and your belongings are in safe hands." />
            <FAQItem q="What does White Glove Setup include?" a="White glove means we don't just deliver boxes — we set up your entire home. Furniture placed exactly where you want it, rooms arranged, beds made. You walk in and it feels like home." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-grid">
            <div>
              <div className="eyebrow">Ready when you are</div>
              <h2 style={{ marginTop: 8 }}>Ready for your <em style={{ fontStyle: "italic", color: "var(--accent)" }}>fresh start?</em></h2>
              <p className="lead" style={{ marginTop: 16, maxWidth: 460 }}>
                Get a free quote in minutes. No pressure, no obligation. We'll answer every question before you book.
              </p>
            </div>
            <div className="cta-buttons">
              <Link href="/quote" className="btn btn-primary btn-arrow">Get a free quote</Link>
              <a href="tel:6304561347" className="btn btn-ghost">
                <Icon name="phone" size={14}/> (630) 456-1347
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
