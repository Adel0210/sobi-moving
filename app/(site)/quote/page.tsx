"use client";
import { useState, useMemo } from "react";
import { Icon } from "@/app/components/Icon";
import { createClient } from "@/lib/supabase/client";

interface QuoteData {
  size: string;
  distance: string;
  addons: string[];
  moveDate: string;
  name: string;
  email: string;
  phone: string;
  fromZip: string;
  toZip: string;
  notes: string;
  moveType: string;
}

const HOME_SIZES = [
  { v: "studio", label: "Studio", base: 800, factor: 0.6 },
  { v: "1br", label: "1 Bedroom", base: 1100, factor: 1 },
  { v: "2br", label: "2 Bedroom", base: 1500, factor: 1.4 },
  { v: "3br", label: "3 Bedroom", base: 2000, factor: 1.9 },
  { v: "4br", label: "4+ Bedroom", base: 2700, factor: 2.5 },
];
const ADD_ONS = [
  { v: "packing", label: "Full Packing", price: 600 },
  { v: "white-glove", label: "White Glove Setup", price: 450 },
  { v: "unpack", label: "Unpacking", price: 400 },
  { v: "junk", label: "Junk Removal", price: 250 },
  { v: "assembly", label: "Furniture Assembly", price: 200 },
];

const QuotePage = () => {
  const [step, setStep] = useState(1);
  const [d, setD] = useState<QuoteData>({
    size: "2br",
    distance: "local",
    addons: ["packing", "white-glove"],
    moveDate: "",
    name: "", email: "", phone: "",
    fromZip: "", toZip: "",
    notes: "",
    moveType: "regular",
  });
  const set = (k: keyof QuoteData, v: QuoteData[keyof QuoteData]) => setD({ ...d, [k]: v });
  const toggleAddon = (v: string) => set("addons", d.addons.includes(v) ? d.addons.filter(x => x !== v) : [...d.addons, v]);

  const estimate = useMemo(() => {
    const size = HOME_SIZES.find(s => s.v === d.size)!;
    let total = size.base;
    if (d.distance === "long") total *= 2.4;
    else if (d.distance === "metro") total *= 1.3;
    if (d.moveType === "senior") total *= 1.05; // slightly higher care
    d.addons.forEach(a => {
      const ad = ADD_ONS.find(x => x.v === a);
      if (ad) total += ad.price * size.factor;
    });
    const low = Math.round((total * 0.85) / 50) * 50;
    const high = Math.round((total * 1.15) / 50) * 50;
    return { low, high };
  }, [d]);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuote = async () => {
    setSending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      type: "quote",
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      move_size: d.size,
      move_distance: d.distance,
      move_type: d.moveType,
      move_date: d.moveDate || null,
      from_zip: d.fromZip || null,
      to_zip: d.toZip || null,
      services: d.addons,
      estimate_low: estimate.low,
      estimate_high: estimate.high,
      message: d.notes || null,
    });
    setSending(false);
    if (error) {
      setError("Sorry — something went wrong. Please call us at (630) 456-1347.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container-narrow" style={{ maxWidth: 1080 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="eyebrow">Free Quote · Same-Day Reply</div>
            <h1 style={{ marginTop: 8 }}>Get your <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>free quote.</em></h1>
            <p className="lead" style={{ marginTop: 16, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Three quick steps. Tell us about your move and we&apos;ll follow up fast with a custom quote — no spam, no hard sell.
            </p>
          </div>

          {/* PROGRESS */}
          <div className="quote-progress">
            {[1,2,3].map(n => (
              <div key={n} className={`qp-step ${step >= n ? "active" : ""} ${step === n ? "current" : ""}`}>
                <div className="qp-num">{step > n ? <Icon name="check" size={16}/> : `0${n}`}</div>
                <div className="qp-label">{n === 1 ? "Your Move" : n === 2 ? "Services" : "Contact"}</div>
              </div>
            ))}
          </div>

          <div className="quote-grid">
            <div className="quote-form">
              {step === 1 ? (
                <div>
                  <h2 style={{ fontSize: 28, marginBottom: 24 }}>Tell us about your move.</h2>

                  <div className="form-block">
                    <label className="form-label">What are we moving?</label>
                    <div className="radio-cards">
                      {HOME_SIZES.map(s => (
                        <button type="button" key={s.v} className={`radio-card ${d.size === s.v ? "active" : ""}`} onClick={() => set("size", s.v)}>
                          <Icon name="home" size={18}/>
                          <span>{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-block">
                    <label className="form-label">How far?</label>
                    <div className="radio-cards two">
                      {[
                        { v: "local", label: "Local", sub: "Same city / under 20 mi" },
                        { v: "metro", label: "Metro", sub: "Across Atlanta · 20–60 mi" },
                        { v: "long", label: "Long Distance", sub: "Out of state" },
                      ].map(o => (
                        <button type="button" key={o.v} className={`radio-card stack ${d.distance === o.v ? "active" : ""}`} onClick={() => set("distance", o.v)}>
                          <div style={{ fontWeight: 500, fontSize: 15 }}>{o.label}</div>
                          <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>{o.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-block">
                    <label className="form-label">What's the move?</label>
                    <div className="radio-cards two">
                      {[
                        { v: "regular", label: "Just moving", icon: "truck" },
                        { v: "senior", label: "Helping a parent move", icon: "heart" },
                        { v: "office", label: "Office or commercial", icon: "box" },
                      ].map(o => (
                        <button type="button" key={o.v} className={`radio-card ${d.moveType === o.v ? "active" : ""}`} onClick={() => set("moveType", o.v)}>
                          <Icon name={o.icon} size={16}/>
                          <span>{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <label>
                      <span>From ZIP</span>
                      <input value={d.fromZip} onChange={e => set("fromZip", e.target.value)} placeholder="30350" />
                    </label>
                    <label>
                      <span>To ZIP</span>
                      <input value={d.toZip} onChange={e => set("toZip", e.target.value)} placeholder="30327" />
                    </label>
                  </div>

                  <label>
                    <span>Target move date</span>
                    <input type="date" value={d.moveDate} onChange={e => set("moveDate", e.target.value)} />
                  </label>
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <h2 style={{ fontSize: 28, marginBottom: 8 }}>What do you want us to handle?</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>Pick any combination. Most families pick at least packing + white glove setup.</p>

                  <div className="addons-list">
                    {ADD_ONS.map(a => {
                      const active = d.addons.includes(a.v);
                      return (
                        <button type="button" key={a.v} className={`addon-row ${active ? "active" : ""}`} onClick={() => toggleAddon(a.v)}>
                          <div className="addon-check">{active ? <Icon name="check" size={14}/> : null}</div>
                          <div style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontWeight: 500 }}>{a.label}</div>
                            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 2 }}>
                              {a.v === "packing" ? "All materials, room-by-room labeling" :
                               a.v === "white-glove" ? "Furniture placement, bed making, kitchen organized" :
                               a.v === "unpack" ? "Box-to-shelf unpacking, donation coordination" :
                               a.v === "junk" ? "Donation-first removal of unwanted items" :
                               "We disassemble & reassemble all furniture"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <label style={{ marginTop: 20 }}>
                    <span>Anything else we should know?</span>
                    <textarea rows={4} value={d.notes} onChange={e => set("notes", e.target.value)} placeholder="Stairs, elevators, fragile items, parking situation, special requests..." />
                  </label>
                </div>
              ) : null}

              {step === 3 && submitted ? (
                <div className="contact-success" style={{ textAlign: "center", padding: "30px 0" }}>
                  <div className="contact-icon" style={{ background: "var(--accent-soft)", color: "var(--accent-deep)", width: 56, height: 56, borderRadius: 16, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={26}/>
                  </div>
                  <h3 style={{ marginTop: 20 }}>Quote request received!</h3>
                  <p style={{ marginTop: 8, color: "var(--ink-soft)" }}>Thanks{d.name ? `, ${d.name.split(" ")[0]}` : ""} — we&apos;ll reach out within a few hours with your detailed quote. Need us sooner? Call <a href="tel:6304561347" style={{ color: "var(--accent)" }}>(630) 456-1347</a>.</p>
                </div>
              ) : step === 3 ? (
                <div>
                  <h2 style={{ fontSize: 28, marginBottom: 8 }}>Where should we send your quote?</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>We'll get back to you within a few hours, usually faster.</p>

                  <label>
                    <span>Your name</span>
                    <input required value={d.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" />
                  </label>
                  <div className="form-row">
                    <label>
                      <span>Email</span>
                      <input type="email" required value={d.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" />
                    </label>
                    <label>
                      <span>Phone</span>
                      <input type="tel" required value={d.phone} onChange={e => set("phone", e.target.value)} placeholder="(404) 555-0123" />
                    </label>
                  </div>

                  <div className="quote-confirm">
                    <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 16 }}>Your move at a glance</div>
                    <ul className="confirm-list">
                      <li><span>Home size</span><strong>{HOME_SIZES.find(s=>s.v===d.size)!.label}</strong></li>
                      <li><span>Distance</span><strong>{d.distance === "long" ? "Long distance" : d.distance === "metro" ? "Atlanta metro" : "Local"}</strong></li>
                      <li><span>What's the move</span><strong>{d.moveType === "senior" ? "Helping a parent move" : d.moveType === "office" ? "Office or commercial" : "Just moving"}</strong></li>
                      <li><span>Services</span><strong>{d.addons.length ? d.addons.map(a => ADD_ONS.find(x=>x.v===a)!.label).join(", ") : "Move only"}</strong></li>
                      {d.moveDate ? <li><span>Target date</span><strong>{new Date(d.moveDate).toLocaleDateString("en-US", { dateStyle: "medium" })}</strong></li> : null}
                    </ul>
                  </div>
                </div>
              ) : null}

              {!submitted ? (
                <div className="quote-nav">
                  {step > 1 ? <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button> : <span/>}
                  {step < 3 ? (
                    <button type="button" className="btn btn-primary btn-arrow" onClick={() => setStep(step + 1)}>Continue</button>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      {error ? <span style={{ fontSize: 13, color: "#a23b22" }}>{error}</span> : null}
                      <button type="button" disabled={sending} className="btn btn-accent btn-arrow" style={{ opacity: sending ? 0.7 : 1 }} onClick={submitQuote}>{sending ? "Sending…" : "Send my quote request"}</button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* ESTIMATE SIDECAR */}
            <aside className="quote-aside">
              <div className="estimate-card">
                <div className="eyebrow">What happens next</div>
                <ol style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { t: "We review your move", d: "A real person looks at your details — home size, distance, and the services you need." },
                    { t: "You get a custom, itemized quote", d: "Clear pricing for your exact move — no hidden fees, no guesswork." },
                    { t: "We lock in your date", d: "Pick a day that works and our crew handles the rest." },
                  ].map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 12 }}>
                      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 999, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>{i + 1}</span>
                      <div>
                        <strong>{s.t}</strong>
                        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 9, fontSize: 13.5, color: "var(--ink-soft)" }}>
                  <span className="row" style={{ gap: 8 }}><Icon name="shield" size={14}/> Licensed &amp; insured · background-checked crew</span>
                  <span className="row" style={{ gap: 8 }}><Icon name="clock" size={14}/> Same-day reply — usually within a few hours</span>
                </div>
              </div>

              <div style={{ marginTop: 20, padding: 24, background: "var(--bg-deep)", borderRadius: 14, color: "#c9c2b3" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#f5efe4", marginBottom: 8 }}>Prefer to talk?</div>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>Some moves are easier to scope on the phone — especially senior moves and complex packs.</p>
                <a href="tel:6304561347" className="btn btn-accent btn-arrow" style={{ marginTop: 16 }}><Icon name="phone" size={14}/> (630) 456-1347</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuotePage;
