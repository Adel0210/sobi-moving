export type ServiceType = {
  slug: string; // "long-distance-moving"
  name: string; // "Long-Distance Moving"
  tagline: string; // short phrase under the H1
  intro: string; // 2-3 sentence unique intro
  body: string; // 1-2 paragraphs of detail (use \n\n between paragraphs)
  includes: string[]; // 5-6 bullet points of what's included
  faq: { q: string; a: string }[]; // 3 Q&As specific to this service
};

export const SERVICE_TYPES: ServiceType[] = [
  {
    slug: "local-moving",
    name: "Local Moving",
    tagline: "Trusted local movers across metro Atlanta",
    intro:
      "When you are moving across town, you want a crew that knows the streets, the traffic, and the neighborhoods of metro Atlanta. Sobi Moving handles local moves from Sandy Springs to Decatur to Marietta with the same care we would give our own homes. You get a friendly, background-checked team and a smooth move from door to door.",
    body:
      "A short move can still go sideways without the right plan, which is why we map out your local move before we ever load the truck. Our crew arrives on time, protects your floors and doorways, and pads and wraps your furniture so it arrives in the same shape it left. Because we know metro Atlanta well, we route around the worst of the I-285 and downtown traffic to keep your day on schedule.\n\nLocal moving is also where our full-service options shine. We can pack your kitchen the day before, disassemble and reassemble your beds and tables, and even haul away the junk and packing debris when we are done. You decide how much help you want, and we handle the heavy lifting with a clear, no-hidden-fees quote up front.",
    includes: [
      "On-time arrival with a careful, background-checked local crew",
      "Floor, doorway, and furniture protection throughout the move",
      "Full furniture disassembly and reassembly",
      "Optional packing and unpacking services",
      "White-glove placement so everything lands where you want it",
      "Junk and packing-debris removal when the move is done",
    ],
    faq: [
      {
        q: "What areas around Atlanta do you cover for local moves?",
        a: "We serve the entire metro Atlanta area, including Sandy Springs, Marietta, Decatur, Roswell, Alpharetta, and the surrounding suburbs. If you are moving within the metro region, we can almost certainly help.",
      },
      {
        q: "Can you handle a small one-bedroom move?",
        a: "Absolutely. We move everything from studios and one-bedroom apartments to large family homes, and we size the crew and truck to fit your move so you are never paying for more than you need.",
      },
      {
        q: "Do you provide moving supplies for a local move?",
        a: "Yes. We bring blankets, pads, shrink wrap, and dollies on every job, and we can supply boxes and packing materials if you would like us to pack for you.",
      },
    ],
  },
  {
    slug: "long-distance-moving",
    name: "Long-Distance Moving",
    tagline: "Reliable interstate moves that go the distance",
    intro:
      "Leaving metro Atlanta for a new city or state is a big step, and the right movers make it feel easy instead of overwhelming. Sobi Moving plans, packs, and transports your belongings across state lines with a dedicated crew and clear communication from start to finish. You always know where your things are and when they will arrive.",
    body:
      "Long-distance moves have more moving parts than a local job, so we build a detailed plan that covers your timeline, your route, and the safest way to load every item for a longer haul. Your belongings are inventoried, padded, and secured for the drive, and the same trusted, background-checked team that loads your home is part of the journey to your destination. We stay in touch along the way, so there are no surprises on delivery day.\n\nBecause we are licensed and insured for interstate moving, you get real protection and accountability, not a faceless broker handing your move off to strangers. We can pack everything, set up your new home with white-glove care, reassemble your furniture, and clear out the leftover boxes so you can settle in fast. Every long-distance quote is free and transparent, with no hidden fees added later.",
    includes: [
      "Custom long-distance moving plan with a clear timeline",
      "Full inventory of your belongings for peace of mind",
      "Heavy-duty padding and secure loading for the long haul",
      "Licensed and insured interstate transport",
      "White-glove unpacking and furniture reassembly at your new home",
      "Progress updates so you know when your belongings arrive",
    ],
    faq: [
      {
        q: "Are you licensed for interstate moves out of Georgia?",
        a: "Yes. Sobi Moving is fully licensed and insured for long-distance and interstate moves, so your belongings are protected and accounted for from pickup to delivery.",
      },
      {
        q: "How long does a long-distance move take to deliver?",
        a: "Delivery time depends on the distance and route, but we give you a clear estimated window before the move and keep you updated along the way so you are never left guessing.",
      },
      {
        q: "Will the same crew handle both pickup and delivery?",
        a: "We keep your move with a dedicated, background-checked team rather than handing it off to a chain of unknown contractors, so the people who carefully load your home are the people you can count on at the other end.",
      },
    ],
  },
  {
    slug: "residential-moving",
    name: "Residential Moving",
    tagline: "Moving services for homes, apartments, and condos",
    intro:
      "Your home is full of the things that matter most, and moving them deserves more than a couple of strangers and a rented truck. Sobi Moving specializes in residential moves for houses, apartments, and condos across metro Atlanta, treating every box and every heirloom with real care. From the first walk-through to the last item placed, you are in steady hands.",
    body:
      "Every home moves differently, so we tailor the plan to your space. High-rise condos with elevators and loading-dock rules, walk-up apartments with tight stairwells, and family homes with garages and attics all get an approach that fits. Our background-checked crew protects your floors and entryways, pads and wraps your furniture, and handles fragile items, electronics, and bulky pieces with patience instead of a rush.\n\nWe make the new place feel like home faster with full-service options you can mix and match. Let us pack ahead of time, disassemble and reassemble your beds, tables, and dressers, and set everything in place with white-glove care. When the boxes are empty, we can haul away the clutter and packing debris so you walk into a clean, settled home with an honest, no-hidden-fees quote behind it.",
    includes: [
      "Tailored plans for houses, apartments, and high-rise condos",
      "Careful handling of fragile items, electronics, and heirlooms",
      "Furniture disassembly, reassembly, and white-glove placement",
      "Optional full-service packing and unpacking",
      "Floor and entryway protection on move day",
      "Junk and debris removal so your new home starts fresh",
    ],
    faq: [
      {
        q: "Do you move both houses and apartments?",
        a: "Yes. We handle single-family homes, townhomes, apartments, and high-rise condos, and we adjust our crew and equipment to match the layout, stairs, or elevator access of your building.",
      },
      {
        q: "Can you pack up my whole home for me?",
        a: "We can. Our full-service packing covers everything from your kitchen to your closets, and we can also unpack and set up your new home so you skip the stressful part entirely.",
      },
      {
        q: "How do you protect fragile and valuable items?",
        a: "Delicate pieces are individually wrapped, padded, and packed in the right materials, and our trained crew handles electronics, glass, and heirlooms with extra care throughout the move.",
      },
    ],
  },
  {
    slug: "commercial-moving",
    name: "Commercial & Office Moving",
    tagline: "Office and commercial moves with minimal downtime",
    intro:
      "Every hour your business is offline costs you, so a commercial move has to be fast, organized, and dependable. Sobi Moving relocates offices, retail spaces, and commercial properties across metro Atlanta with a plan built around keeping your downtime to a minimum. Your team gets back to work in a space that is ready to go.",
    body:
      "We start by understanding how your business runs, then schedule the move around it, including evenings and weekends when that keeps your operation open longer. Our background-checked crew carefully handles desks, conference tables, filing systems, and sensitive equipment, labeling and organizing everything so it lands in the right department at the new location. Clear coordination means fewer surprises and a faster restart.\n\nFull-service options keep the project simple from one point of contact. We can pack and crate your office, disassemble and reassemble workstations and furniture, set up the new space with white-glove care, and clear out old furniture and junk you are leaving behind. You get a transparent, no-hidden-fees quote and a licensed, insured team that respects your timeline and your bottom line.",
    includes: [
      "Move planning scheduled around your business hours",
      "Careful handling of desks, equipment, and sensitive electronics",
      "Labeling and organized placement by department or workstation",
      "Workstation and furniture disassembly and reassembly",
      "White-glove setup so your team can get straight back to work",
      "Removal of old furniture and junk you are leaving behind",
    ],
    faq: [
      {
        q: "Can you move our office after hours to avoid downtime?",
        a: "Yes. We regularly schedule commercial moves for evenings and weekends so your business stays open longer and your team walks into a ready workspace on the next day.",
      },
      {
        q: "Do you move office equipment and electronics?",
        a: "We do. Our crew carefully packs, transports, and reconnects desks, monitors, servers, and other office equipment, and we label everything so it ends up exactly where it belongs.",
      },
      {
        q: "Can you handle a retail or warehouse relocation?",
        a: "Absolutely. We move retail stores, warehouses, and other commercial spaces, sizing the crew and plan to your inventory, fixtures, and timeline so the transition stays smooth.",
      },
    ],
  },
];
