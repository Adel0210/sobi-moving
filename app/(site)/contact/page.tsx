"use client";
import { useState } from "react";
import { Icon } from "@/app/components/Icon";
import { createClient } from "@/lib/supabase/client";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const update = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      type: "contact",
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message || null,
    });
    setSending(false);
    if (error) {
      setError("Sorry — something went wrong sending your message. Please call us at (630) 456-1347.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="page-enter">
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">Get in Touch</div>
              <h1 style={{ marginTop: 8 }}>Let's <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>start a conversation.</em></h1>
              <p className="lead" style={{ marginTop: 20, maxWidth: 460 }}>
                Whether you have questions, want a free quote, or are planning a senior move for a parent — reach out. We answer the phone and reply to every message, usually same day.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="phone" size={18}/></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Call us</div>
                    <a href="tel:6304561347" style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--ink)", display: "block", marginTop: 4 }}>(630) 456-1347</a>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>Mon–Sun · 7:30am–8:00pm</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="mail" size={18}/></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Email</div>
                    <a href="mailto:hello@sobimoving.com" style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--ink)", display: "block", marginTop: 4 }}>hello@sobimoving.com</a>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>Same-day replies, weekends included</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><Icon name="map" size={18}/></div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Visit</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)", display: "block", marginTop: 4, lineHeight: 1.3 }}>
                      2208 Treelodge Pkwy<br/>Sandy Springs, GA 30350
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={submit}>
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-icon" style={{ background: "var(--accent-soft)", color: "var(--accent-deep)", width: 56, height: 56, borderRadius: 16 }}>
                    <Icon name="check" size={26}/>
                  </div>
                  <h3 style={{ marginTop: 20 }}>Message received.</h3>
                  <p style={{ marginTop: 8, color: "var(--ink-soft)" }}>We'll be in touch within a few hours. If it's urgent, give us a call at <a href="tel:6304561347" style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>(630) 456-1347</a>.</p>
                  <button type="button" className="btn btn-ghost" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "general", message: "" }); }}>Send another</button>
                </div>
              ) : (
                <>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 28, marginBottom: 6 }}>Send us a message</div>
                  <p style={{ fontSize: 14, color: "var(--ink-mute)", marginBottom: 24 }}>Fill in what you can — we'll follow up to fill in the rest.</p>

                  <label>
                    <span>Your name</span>
                    <input required value={form.name} onChange={update("name")} placeholder="Jane Smith" />
                  </label>
                  <div className="form-row">
                    <label>
                      <span>Email</span>
                      <input type="email" required value={form.email} onChange={update("email")} placeholder="jane@example.com" />
                    </label>
                    <label>
                      <span>Phone</span>
                      <input type="tel" value={form.phone} onChange={update("phone")} placeholder="(404) 555-0123" />
                    </label>
                  </div>
                  <label>
                    <span>What can we help with?</span>
                    <select value={form.subject} onChange={update("subject")}>
                      <option value="general">General question</option>
                      <option value="quote">I want a quote</option>
                      <option value="senior">Planning a senior move</option>
                      <option value="community">Community / care team partnership</option>
                      <option value="other">Something else</option>
                    </select>
                  </label>
                  <label>
                    <span>Tell us a bit more</span>
                    <textarea rows={5} value={form.message} onChange={update("message")} placeholder="Move date, locations, what you're moving, anything else we should know..." />
                  </label>
                  {error ? <p style={{ fontSize: 13.5, color: "#a23b22", marginBottom: 12 }}>{error}</p> : null}
                  <button type="submit" disabled={sending} className="btn btn-primary btn-arrow" style={{ marginTop: 8, width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}>{sending ? "Sending…" : "Send message"}</button>
                  <p style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 14, textAlign: "center" }}>
                    Or call us directly: <a href="tel:6304561347" style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}>(630) 456-1347</a>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
