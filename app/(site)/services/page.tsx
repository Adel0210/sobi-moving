"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { PhotoPlaceholder } from "@/app/components/ui";

const SERVICES = [
  { id: "full-moving", icon: "truck", title: "Local & long distance", desc: "Across town or across state lines. Wrapped, padded, and on time." },
  { id: "white-glove", icon: "sparkles", title: "White glove setup", desc: "We don't just unload. Furniture placed, rooms arranged, ready to live in." },
  { id: "packing", icon: "box", title: "Packing", desc: "Every box labeled by room. Fragile items get the extra care they deserve." },
  { id: "unpacking", icon: "package", title: "Unpacking", desc: "Room by room, no boxes left behind. We even haul away the empties." },
  { id: "furniture", icon: "tool", title: "Furniture assembly", desc: "Beds, dressers, dining tables, flat packs. We bring the tools." },
  { id: "junk-removal", icon: "trash", title: "Junk removal", desc: "Donate first, dispose responsibly. Clear out the old before the new arrives." },
];

const SERVICES_DETAIL = {
  "full-moving": {
    icon: "truck",
    title: "Full Moving Service",
    tag: "Local · Long Distance",
    blurb: "Local and long-distance moves handled with care, from your current home to your next one.",
    body: "Whether you're moving across Sandy Springs or across state lines, our team handles the entire transport — careful loading, padded blankets, secure tie-downs, clean trucks, and on-time arrival. We treat every box like it's the only box.",
    includes: ["Wrap & protect all furniture", "Floor & doorway protection", "Padded, well-equipped trucks", "Local & long-distance routes", "Real-time updates en route", "Inventory tracking"],
  },
  "packing": {
    icon: "box",
    title: "Full Packing",
    tag: "All Materials Included",
    blurb: "We pack everything professionally with our organized labeling system. Nothing gets lost, nothing gets broken.",
    body: "Packing is where most moves go wrong. We pack room-by-room with high-quality boxes, paper, blankets, and bubble wrap. Every box gets labeled with room and contents so unpacking is just as easy.",
    includes: ["All packing materials included", "Room-by-room labeling system", "Fragile & specialty packing", "Wardrobe boxes for clothes", "China & glassware specialists", "Inventory list provided"],
  },
  "white-glove": {
    icon: "sparkles",
    title: "White Glove Setup",
    tag: "Our Signature Service",
    blurb: "We don't just unload boxes. We set up your entire home the way you want it.",
    body: "This is the difference between moving and arriving. After we deliver, our team places furniture exactly where you want it, makes the bed, organizes the kitchen, and removes every box from the property. You walk in and live. (Note: we don't hang or mount anything on walls — pictures, shelves, TVs, or art.)",
    includes: ["Furniture placement to plan", "Bed making & linen setup", "Kitchen organization", "Closet hanging & arrangement", "Box & debris removal"],
  },
  "unpacking": {
    icon: "package",
    title: "Unpacking Services",
    tag: "Add-On or Standalone",
    blurb: "Room-by-room unpacking and organization. Donation coordination included.",
    body: "Already moved? We can come unpack what's still in boxes — kitchen, closets, garage. We organize as we go, hang what needs hanging, and coordinate donations for what doesn't fit.",
    includes: ["Room-by-room unpacking", "Organization & put-away", "Donation coordination", "Box recycling & removal", "Furniture rearranging", "Single-day or multi-day"],
  },
  "furniture": {
    icon: "tool",
    title: "Furniture Assembly",
    tag: "All Brands",
    blurb: "We disassemble and reassemble all furniture. No tools needed on your end.",
    body: "Beds, dressers, dining tables, IKEA flat-packs, exercise equipment, kids' furniture — we handle the whole assembly process. Available as part of a move or as a standalone service.",
    includes: ["Beds, frames, headboards", "Dressers & wardrobes", "Dining tables & chairs", "IKEA & flat-pack assembly", "Kids' furniture & cribs", "Exercise equipment"],
  },
  "junk-removal": {
    icon: "trash",
    title: "Junk Removal",
    tag: "Donation-First",
    blurb: "Clear out the old before moving into the new. We handle disposal responsibly.",
    body: "We sort, donate, recycle, and dispose responsibly — never just dumped. Donation-first means as much as possible goes to local nonprofits, with receipts back to you.",
    includes: ["Donation-first approach", "Local nonprofit partnerships", "Recycling & e-waste", "Furniture & appliance haul", "Garage & basement cleanouts", "Estate cleanouts"],
  },
};

const ServicesContent = () => {
  const searchParams = useSearchParams();
  const s = searchParams.get("s");

  // jump to anchor on params
  useEffect(() => {
    if (s) {
      const el = document.getElementById(`svc-${s}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [s]);

  return (
    <main className="page-enter">
      {/* HEADER */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 820 }}>
            <div className="eyebrow">Our Services</div>
            <h1 style={{ marginTop: 8 }}>Six services. <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>One team that does it all.</em></h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>
              Pick the services you need or hand us the whole move. Either way, you get the same careful, background-checked, no-hidden-fees team.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES LIST */}
      {SERVICES.map((s, i) => {
        const detail = SERVICES_DETAIL[s.id as keyof typeof SERVICES_DETAIL];
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={`svc-${s.id}`} className={i % 2 === 1 ? "alt" : ""} style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div className="container">
              <div className="service-detail-grid" style={{ direction: flip ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr" }}>
                  <PhotoPlaceholder
                    src={`/assets/illustrations/svc-${s.id}.svg`}
                    label={`Service photo · ${detail.title}`}
                    hint="Action shot — team in motion, kit in use, finished result."
                    ratio="4 / 5"
                    className="tall"
                  />
                </div>
                <div style={{ direction: "ltr" }}>
                  <div className="service-icon" style={{ width: 48, height: 48, borderRadius: 14, marginBottom: 20 }}>
                    <Icon name={detail.icon} size={22} />
                  </div>
                  <h2>{detail.title}</h2>
                  <p className="lead" style={{ marginTop: 16, color: "var(--ink-soft)" }}>{detail.blurb}</p>
                  <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>{detail.body}</p>
                  <h4 style={{ marginTop: 32, marginBottom: 16, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mute)" }}>What's included</h4>
                  <ul className="service-includes">
                    {detail.includes.map(x => (
                      <li key={x}><Icon name="check" size={15}/>{x}</li>
                    ))}
                  </ul>
                  <div className="row" style={{ marginTop: 32, gap: 12 }}>
                    <Link href="/quote" className="btn btn-primary btn-arrow">Get a quote for this</Link>
                    <a href="tel:6304561347" className="btn btn-ghost"><Icon name="phone" size={14}/> Call to discuss</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* PRICING NOTE */}
      <section className="dark">
        <div className="container">
          <div className="pricing-note">
            <div>
              <div className="eyebrow" style={{ color: "var(--accent)" }}>Transparent Pricing</div>
              <h2 style={{ marginTop: 8 }}>No hidden fees.<br/>Ever. Period.</h2>
            </div>
            <div className="pricing-bullets">
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--accent)" }}>Free</div>
                <div style={{ fontSize: 14, color: "#c9c2b3", marginTop: 4 }}>No-obligation quotes</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--accent)" }}>Same Day</div>
                <div style={{ fontSize: 14, color: "#c9c2b3", marginTop: 4 }}>Free quote turnaround</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--accent)" }}>Itemized</div>
                <div style={{ fontSize: 14, color: "#c9c2b3", marginTop: 4 }}>Every line documented</div>
              </div>
            </div>
            <div style={{ marginTop: 32 }}>
              <Link href="/quote" className="btn btn-accent btn-arrow">Get your free quote</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  );
}
