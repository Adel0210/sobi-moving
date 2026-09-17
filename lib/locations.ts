// Optional deep-content block. City pages started as one shared template, which
// left every page at ~317 unique words against competitors running 2,000+.
// A city gets upgraded by filling this in; pages without it render as before,
// so the rollout can happen one city at a time.
export type CityDepth = {
  answer: string; // direct answer to "movers in <city>" — first thing on the page, no brand name
  areas: { name: string; note: string }[]; // named areas with a real, checkable specific
  challenges: { title: string; body: string }[]; // what actually makes a move here different
  quoteFactors: string[]; // what moves the price, without quoting figures
  process: { stage: string; when: string; body: string }[]; // real stages, real durations only
  faqExtra?: { q: string; a: string }[]; // city-specific questions beyond the shared three
  // Section headings, authored per city rather than templated.
  //
  // A grader flagged that city-token-swapped headings ("Where we move in X")
  // still count as duplicates across sibling pages, so building out more cities
  // on one heading template would have pushed every page past the overlap
  // threshold. Each city names its own sections after what is actually
  // distinctive there instead.
  headings: {
    title?: string; // overrides the templated SEO title (brand is appended by the layout)
    h1?: string;    // overrides the templated H1; must agree with the title
    description?: string; // 130-155 chars, written for the click, not boilerplate
    local: string;   // the existing "Moving in X, done right" slot
    capabilities: string; // the six-capability grid
    areas: string;
    challenges: string;
    process: string;
    cost: string;    // must contain the primary term, e.g. "movers in X"
    services: string;
    nearby: string;
    faq: string;
    reviews: string;
    cta: string;
  };
};

export type Location = {
  slug: string; // url slug, e.g. "sandy-springs"
  city: string; // "Sandy Springs"
  full: string; // "Sandy Springs, GA"
  county: string; // "Fulton County"
  neighborhoods: string[]; // 4-6 real neighborhoods/landmarks in that city
  intro: string; // 2-3 sentence UNIQUE intro for the city's moving page
  local: string; // 1 paragraph (~3-4 sentences) about what moving IN/TO this specific city is like
  faq: { q: string; a: string }[]; // 3 Q&As, at least one city-specific
  depth?: CityDepth; // present once the city has been built out properly
};

export const LOCATIONS: Location[] = [
  {
    slug: "sandy-springs",
    city: "Sandy Springs",
    full: "Sandy Springs, GA",
    county: "Fulton County",
    neighborhoods: ["City Springs", "North Springs", "High Point", "Riverside", "Dunwoody Springs", "Huntcliff"],
    intro:
      "Sandy Springs sits right along the Chattahoochee with a mix of established mid-century homes and sleek new builds around City Springs. Sobi Moving knows these streets, and we handle every move here with the same careful, full-service approach. From a townhome near GA-400 to a riverside estate, we make the day feel easy.",
    local:
      "Moving in Sandy Springs means everything from gated communities like Huntcliff to busy condo corridors near Roswell Road and the Perimeter office district. Many homes here are split-levels and ranches on wooded, sloping lots, so our crew comes ready for steep driveways and long carries. The newer mixed-use buildings around City Springs often require elevator reservations and certificate-of-insurance paperwork, which we handle for you in advance. We also time loading around the GA-400 and I-285 crunch so the truck is never stuck while the clock runs.",
    faq: [
      {
        q: "Do you handle moves into the City Springs high-rise and condo buildings?",
        a: "Yes. We coordinate elevator and loading-dock reservations with building management and provide any certificate of insurance they require, so move day stays on schedule.",
      },
      {
        q: "Can Sobi Moving pack everything for me?",
        a: "Absolutely. Our full-service packing covers the whole home or just the rooms you choose, and our crew unpacks on the other end too.",
      },
      {
        q: "Are you licensed and insured?",
        a: "We are fully licensed and insured for both local and long-distance moves, with no hidden fees on your estimate.",
      },
    ],
    depth: {
      headings: {
        title: "Sandy Springs Movers & Relocation Specialists",
        description: "From Perimeter high-rises to Huntcliff, the building sets the plan. Elevator and COI paperwork handled. Open 24/7, rated 5.0 from 32 reviews.",
        h1: "Sandy Springs movers and relocation specialists",
        local: "Here, the building matters more than the address",
        capabilities: "The parts people forget to budget for",
        areas: "Perimeter towers to riverside ranches",
        challenges: "Elevator buildings, gated streets and the 400/285 squeeze",
        process: "How a Sandy Springs move runs",
        cost: "What your Sandy Springs quote depends on",
        services: "What a relocation specialist in Sandy Springs actually does",
        nearby: "We also cover the northern Perimeter",
        faq: "Questions from Perimeter and City Springs",
        reviews: "What people say after the truck leaves",
        cta: "Ready when your building is",
      },
      answer:
        "Sandy Springs has one of the widest mixes of building types in the metro. A relocation here can mean a Perimeter high-rise with a booked loading dock and a certificate of insurance, a gated estate off the Chattahoochee, or a 1960s split-level on a steep wooded lot. The building decides the plan more than the address does.",
      areas: [
        {
          name: "City Springs & the civic center",
          note: "Newer mixed-use condos and apartments around the civic center. Elevator reservations and a certificate of insurance are standard requirements, and management usually wants both booked days ahead.",
        },
        {
          name: "Perimeter Center",
          note: "High-rise residential wrapped around the office district and the hospitals. Loading docks are shared with commercial deliveries, so the move window is fixed and worth protecting.",
        },
        {
          name: "Huntcliff & the river estates",
          note: "Gated communities off the Chattahoochee with guard-house entry, long private drives and multi-level homes. Gate access has to be arranged in the resident's name before the truck arrives.",
        },
        {
          name: "Riverside & High Point",
          note: "Mid-century split-levels and ranches on sloping, wooded lots. Split-levels mean short flights of stairs in several directions rather than one clean staircase.",
        },
        {
          name: "Roswell Road corridor",
          note: "Older apartment stock and townhomes along the main artery. Parking is curbside and traffic is constant, so the truck position gets sorted before the crew starts carrying.",
        },
        {
          name: "Dunwoody Springs & the 285 edge",
          note: "Condos and townhomes tight to the interchange. Access windows here are shaped almost entirely by peak-hour traffic on GA-400 and I-285.",
        },
      ],
      challenges: [
        {
          title: "The building sets the rules, not the mover",
          body: "A lot of Sandy Springs is elevator-access. Buildings require a booked freight elevator, a protected lobby route and a certificate of insurance naming the management company. We arrange all three in advance, because a move that turns up without them does not start.",
        },
        {
          title: "Gated communities need access arranged in your name",
          body: "Huntcliff and the river estates run guard-house entry. The crew and the vehicle have to be on the list, and the private drives inside are often long and narrow with limited turning room.",
        },
        {
          title: "Split-levels are stairs in every direction",
          body: "The mid-century housing stock through Riverside and High Point splits over three or four half-levels. It reads as a small house and moves like a large one, which is the most common underestimate here.",
        },
        {
          title: "GA-400 and I-285 meet in the middle of the job",
          body: "The interchange is one of the busiest in Georgia, carrying around 420,000 vehicles a day on a design built for far fewer, and almost every route in Sandy Springs touches it. Load and travel times are planned around the peak rather than through it.",
        },
      ],
      process: [
        { stage: "Free quote", when: "Back the same day", body: "Send the addresses, the date and roughly what is moving. You get an itemized quote back the same day with nothing added later." },
        { stage: "Book the date", when: "2 to 4 weeks ahead for most moves", body: "Two to four weeks is comfortable. If your building only releases the freight elevator on certain days, that usually decides the date before anything else does." },
        { stage: "Building and access paperwork", when: "Before move day", body: "We book the elevator or dock, provide the certificate of insurance the management company asks for, and get the crew and vehicle onto the gate list where there is one." },
        { stage: "Move day", when: "Any day, any start time", body: "Lobby routes and floors get protected first, furniture is padded and wrapped, and large pieces come apart and go back together at the other end. We are open 24 hours, which matters when a building restricts moves to a set window." },
      ],
      quoteFactors: [
        "How much there is to move, and how much is packed before the crew arrives",
        "Whether it is an elevator building, and how far the unit is from the freight lift",
        "Split-level layouts, which add short flights in several directions",
        "Carry distance from the door to where the truck can legally park",
        "Gate and guard-house access on the private communities",
        "Packing, unpacking or furniture disassembly added to the move",
        "Specialty items: pianos, safes, oversized glass, gym equipment",
        "The date, and any window your building restricts moves to",
      ],
      faqExtra: [
        { q: "How much do movers in Sandy Springs cost?", a: "No flat rate is honest here, because a Perimeter high-rise and a split-level off Riverside are completely different jobs even at the same square footage. Send the address, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees." },
        { q: "Do you handle the certificate of insurance my building asks for?", a: "Yes. We provide the certificate naming your management company and book the freight elevator or loading dock with them ahead of the day. It is a standard requirement across City Springs and Perimeter, and it is on us to sort, not you." },
        { q: "Can you get into a gated community like Huntcliff?", a: "Yes, as long as the crew and vehicle are added to the gate list in your name before the move. Tell us the community when you book and we will confirm what the guard house needs." },
        { q: "My building only allows moves in a four-hour window. Is that enough?", a: "Usually, and it is why we size the crew to the window rather than to the house. Tell us the window when you book so the plan is built around it." },
        { q: "Are you available on weekends and outside business hours?", a: "We are open 24 hours, 7 days a week. Many Perimeter buildings only permit moves outside business hours, so early starts and weekends are routine for us." },
      ],
    },
  },
  {
    slug: "roswell",
    city: "Roswell",
    full: "Roswell, GA",
    county: "Fulton County",
    neighborhoods: ["Historic Roswell", "Canton Street", "Martin's Landing", "Willeo", "Crabapple", "Roswell Mill"],
    intro:
      "Roswell blends a beloved historic district with leafy family subdivisions stretching toward the river. Sobi Moving treats the antique-filled bungalows off Canton Street with the same care as the larger homes in Martin's Landing. Wherever you are settling, our crew shows up prepared and protective of your things.",
    local:
      "Roswell's historic core has narrow streets, mature trees, and older homes with tight staircases and original hardwood floors that demand extra protection and patience. Out toward Martin's Landing and Willeo, you find sprawling traditional homes on wooded lots near the Chattahoochee, where long walkways and basement levels are common. Weekend events and foot traffic around Canton Street can complicate parking, so we plan truck placement ahead of time. Our team pads doorways and floors carefully in these older properties to keep every piece and surface intact.",
    faq: [
      {
        q: "My home is in the historic district with tight staircases. Can you handle it?",
        a: "Yes. We frequently move antiques and large furniture through Historic Roswell's older homes, using floor runners, door padding, and extra hands to protect both your belongings and the house.",
      },
      {
        q: "Do you offer furniture assembly and disassembly?",
        a: "We do. Our crew breaks down beds, tables, and other large pieces before transport and reassembles them in your new home.",
      },
      {
        q: "Can you help with junk removal during the move?",
        a: "Yes, we can haul away unwanted items and debris so you start fresh in your new place without the clutter.",
      },
    ],
    depth: {
      headings: {
        title: "Roswell Moving Company & Local Movers",
        description: "Historic district or river-side subdivision, a Roswell move turns on access. Open 24/7, rated 5.0 from 32 Google reviews. Same-day quotes.",
        h1: "Roswell moving company",
        local: "What a Roswell moving company has to plan for",
        capabilities: "The work either side of the drive",
        areas: "From Canton Street to Martin's Landing",
        challenges: "Antebellum houses, event weekends and river-side lots",
        process: "How a Roswell move runs",
        cost: "What drives the price of a Roswell move",
        services: "Pick the Roswell service that fits",
        nearby: "We also cover north Fulton",
        faq: "Questions we get from Roswell",
        reviews: "5.0 from 32 Google reviews",
        cta: "Let's plan your Roswell move",
      },
      answer:
        "Choosing a Roswell moving company comes down to which Roswell you are moving in, because the city splits into two very different jobs. The historic district around Canton Street is 1800s houses on narrow streets with event closures most weekends, and the subdivisions out toward the Chattahoochee are large homes on deep, wooded lots. One needs patience and protection, the other needs a plan for the carry.",
      areas: [
        {
          name: "Historic Roswell & Canton Street",
          note: "Antebellum and Victorian homes near Bulloch Hall and Barrington Hall. Narrow streets, tight stair turns, and original floors that get runners before anything moves. Canton Street events close roads on weekends, so truck placement is agreed in advance.",
        },
        {
          name: "Roswell Mill & Vickery Creek",
          note: "Converted mill lofts and older homes on steep ground above the creek. Access is often stairs rather than a level walk to the door, which changes crew size more than square footage does.",
        },
        {
          name: "Martin's Landing",
          note: "Large traditional homes on wooded lots near the river, most with finished basements. Long driveways and multi-level carries are the norm here.",
        },
        {
          name: "Willeo & the river corridor",
          note: "Deep lots off winding two-lane roads with no shoulder. A full-size truck cannot always turn or park close, so we confirm the approach before the day.",
        },
        {
          name: "Crabapple",
          note: "Newer construction on the Milton and Alpharetta edge, much of it under active HOAs with move-in windows and insurance paperwork we arrange with management first.",
        },
        {
          name: "Holcomb Bridge & Alpharetta Highway",
          note: "Apartments and condos along the GA-400 corridor. Elevator reservations and loading-zone timing matter more here than anywhere else in Roswell.",
        },
      ],
      challenges: [
        {
          title: "The historic district is a protected streetscape, not just old houses",
          body: "Roswell's historic core has design guidelines, mature trees close to the curb, and on-street parking that fills early. Where a truck can legally sit is a real constraint, and getting it wrong means a much longer carry than anyone planned for.",
        },
        {
          title: "Canton Street events reshape a weekend",
          body: "Street festivals and market days close sections of Canton Street and push parking blocks away. We check the event calendar against your date rather than finding out on the morning.",
        },
        {
          title: "Basements and river-side slopes add a level",
          body: "Homes toward Martin's Landing and Willeo commonly have finished basements and sloped approaches. That is an extra flight in both directions, and it is the single thing most often missed when people estimate their own move.",
        },
        {
          title: "GA-400 sets the clock",
          body: "Holcomb Bridge Road and the GA-400 ramps back up hard at peak in both directions. Load times get planned around that, not into it.",
        },
      ],
      process: [
        { stage: "Free quote", when: "Back the same day", body: "Send the addresses, the date and roughly what is moving. You get an itemized quote back the same day with nothing added later." },
        { stage: "Book the date", when: "2 to 4 weeks ahead for most moves", body: "Two to four weeks is comfortable for Roswell. Weekends during the Canton Street event season go first, and month-end fills early year round." },
        { stage: "Access plan", when: "Before move day", body: "We confirm where the truck can legally park in the historic district, whether the driveway takes a full-size vehicle, and what any HOA or building requires. Paperwork is handled with management ahead of the day." },
        { stage: "Move day", when: "Any day, any start time", body: "Floors and doorways get protected first, furniture is padded and wrapped, and large pieces come apart and go back together at the other end. We are open 24 hours, so early starts and weekends are normal." },
      ],
      quoteFactors: [
        "How much there is to move, and how much is packed before the crew arrives",
        "Stairs and levels. Finished basements near the river effectively add a floor",
        "Carry distance from the door to where the truck can legally park",
        "Whether the historic district restricts where that truck can sit on your street",
        "Elevator or loading-dock booking along the Holcomb Bridge corridor",
        "Packing, unpacking or furniture disassembly added to the move",
        "Specialty items: pianos, safes, oversized glass, gym equipment",
        "The date. Weekends, month-end and event weekends are the busiest windows",
      ],
      faqExtra: [
        { q: "How much do movers in Roswell cost?", a: "No flat rate is honest across Roswell, because the things that actually drive the number vary so much between a Canton Street cottage and a Martin's Landing house with a finished basement. Send the address, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees." },
        { q: "Can you move a home in the Roswell historic district?", a: "Yes, and it is worth a walk-through first. Narrow streets, limited parking, tight stair turns and original floors all change how the day runs, and knowing that in advance is what keeps the house and the furniture intact." },
        { q: "What happens if there is an event on Canton Street on my move date?", a: "We check the event calendar against your date when you book. If a closure affects your street, we plan truck placement and the carry route around it beforehand rather than improvising." },
        { q: "Do you handle homes with finished basements?", a: "Regularly. A finished basement is an extra level in both directions, so we size the crew for it up front instead of running long on the day." },
        { q: "Are you available on weekends and outside business hours?", a: "We are open 24 hours, 7 days a week. Early starts, evenings and weekends are all normal, which matters when a building only allows moves in a set window." },
      ],
    },
  },
  {
    slug: "alpharetta",
    city: "Alpharetta",
    full: "Alpharetta, GA",
    county: "Fulton County",
    neighborhoods: ["Avalon", "Downtown Alpharetta", "Windward", "Halcyon", "Crabapple", "Webb Bridge"],
    intro:
      "Alpharetta is one of metro Atlanta's fastest-growing hubs, anchored by Avalon and a revitalized downtown. Sobi Moving serves the newer subdivisions and luxury townhomes that define this area with a polished, full-service experience. We make settling into your Alpharetta home smooth from the first box to the last.",
    local:
      "Much of Alpharetta is newer construction, from the upscale townhomes and lofts around Avalon to large two-story homes in Windward and Webb Bridge subdivisions. Many of these communities have active HOAs with move-in rules, designated parking, and elevator buildings near downtown that need advance scheduling. The tech corridor along GA-400 means weekday traffic builds quickly, so we plan timing to keep your move efficient. Our white-glove setup is popular here, where homeowners want furniture placed and rooms arranged before they walk in.",
    faq: [
      {
        q: "Do you know the HOA move-in rules for communities like Avalon and Windward?",
        a: "We work with these HOAs regularly and handle parking permits, elevator reservations, and any insurance paperwork the community requires before move day.",
      },
      {
        q: "What does white-glove setup include?",
        a: "It means we place furniture where you want it, assemble large pieces, and arrange the rooms so your home is ready to live in, not just full of boxes.",
      },
      {
        q: "Do you handle long-distance moves out of Alpharetta?",
        a: "Yes. We do both local and long-distance moves, fully licensed and insured, with a single careful crew handling your belongings end to end.",
      },
    ],
    depth: {
          headings: {
            title: "Movers in Alpharetta, GA for Local and Long-Distance Moves",
            description: "Avalon elevators, Windward HOA gates and GA-400 timing shape every Alpharetta move. Movers open 24/7, rated 5.0 from 32 Google reviews. Same-day quotes.",
            h1: "Movers in Alpharetta, GA for local and long-distance moves",
            local: "Why Alpharetta moves run on paperwork and timing",
            capabilities: "Alpharetta moving services, past the truck",
            areas: "Where in Alpharetta, exit by exit",
            challenges: "The Alpharetta details that catch people out",
            process: "Four steps from quote to keys in Alpharetta",
            cost: "What movers in Alpharetta, GA are actually pricing",
            services: "Local, long-distance or white-glove: the Alpharetta options",
            nearby: "Alpharetta's neighbors on our route",
            faq: "Asked before booking in Alpharetta",
            reviews: "Thirty-two reviews, one rating: 5.0",
            cta: "Send the Alpharetta addresses, get the quote back today",
          },
          answer:
            "Movers in Alpharetta, GA are working three very different kinds of address. There are the mixed-use buildings at Avalon and downtown, where the elevator reservation and the certificate of insurance decide the day. There are the master-planned communities like Windward, where a gate and a sub-neighborhood HOA set the move-in window. And there are the newer subdivisions off Webb Bridge, Kimball Bridge and Haynes Bridge, where the job is mostly volume and a two-story carry. All three sit on GA-400 between exits 9 and 11, so the clock matters as much as the address.",
          areas: [
            {
              name: "Avalon",
              note: "Mixed-use on Old Milton Parkway at GA-400 exit 10, with apartments and residences stacked above retail and restaurants. Moves here go through a freight or service elevator on a booked slot, and the truck has to work around delivery bays and shoppers during retail hours. The certificate of insurance and elevator reservation are arranged with management before the day.",
            },
            {
              name: "Downtown Alpharetta and City Center",
              note: "New townhomes and condos within a few blocks of the Town Green, between North and South Broad Streets. On Saturday mornings from April to November the Farmers Market fills the green and the surrounding street parking from 8:30 to 12:30, so a downtown move in that window is planned around the Milton Avenue and City Center parking decks rather than the curb.",
            },
            {
              name: "Windward",
              note: "A master-planned community started in the mid-1980s around the 195-acre Lake Windward, split into roughly 20 neighborhoods that each carry their own rules on top of the master association. Some sections are gated, some are lakefront, and Windward Parkway at exit 11 is also where the Milton city line runs at Highway 9. Gate access and any move-in window are confirmed with the specific sub-neighborhood, not just the master HOA.",
            },
            {
              name: "Webb Bridge and Kimball Bridge",
              note: "Two-story subdivisions on the Johns Creek edge, around the 109-acre Webb Bridge Park. The Big Creek Greenway runs under Webb Bridge Road here, and the roads into the neighborhoods are two-lane with school traffic in the morning and afternoon. For local movers in Alpharetta, most of these homes are a straightforward volume job once the truck is in the driveway.",
            },
            {
              name: "Haynes Bridge and North Point",
              note: "Apartment and townhome communities along Haynes Bridge Road at exit 9 and up North Point Parkway, which parallels GA-400 from Mansell Road to Windward. Gated complexes, assigned parking and third-floor walk-ups are common, and the loading area is often a shared drive that other residents need to get through.",
            },
            {
              name: "Halcyon and the Forsyth edge",
              note: "Halcyon is a mixed-use village off GA-400 at McFarland Parkway with townhomes and apartments above the shops. It carries an Alpharetta mailing address but sits in Forsyth County, not the City of Alpharetta, which matters for schools and taxes. The new McGinnis Ferry interchange at exit 11A has changed how a truck approaches from the south.",
            },
          ],
          challenges: [
            {
              title: "Mixed-use buildings run on reservations",
              body: "At Avalon and the newer downtown buildings, the elevator is shared with residents, deliveries and retail, and it is booked in windows. Miss the slot and the crew is waiting, not moving. We lock in the elevator time, the loading position and the certificate of insurance with the building before move day, so the only thing left to do on the day is the work.",
            },
            {
              title: "Windward is one community and twenty rulebooks",
              body: "The master association covers the whole of Windward, but each neighborhood inside it can set its own gate procedure, guest-truck rules and move-in hours. A plan that works for a lakefront section may not work for a gated one two streets over. We ask for the specific neighborhood, not just the Windward name, and confirm access with that office.",
            },
            {
              title: "GA-400 exits 9 to 11 and concert nights",
              body: "Haynes Bridge, Old Milton and Windward Parkway all back up onto GA-400 at peak, and on show nights the Ameris Bank Amphitheatre puts 12,000 people onto Encore Parkway through a single venue access road. A load time set for late afternoon on a concert evening near Westside Parkway is a long sit in traffic. We check the amphitheatre calendar against your date and set the start time around it.",
            },
            {
              title: "Corporate start dates and the Fulton County Schools calendar",
              body: "Alpharetta has more than 700 technology companies, and Windward is the largest office district in metro Atlanta, so a large share of moves here are tied to a start date at ADP, Fiserv, Equifax or one of the other corridor employers. Families on top of that are working toward the Fulton County Schools first day in the first week of August. Late July books out first, and a fixed start date is the point we schedule backward from.",
            },
          ],
          quoteFactors: [
            "How much is moving, and how much of it is boxed before the crew arrives",
            "Whether the building needs a freight elevator reservation, a loading-dock slot or a certificate of insurance, as at Avalon and downtown",
            "Gate access and any HOA move-in window in Windward and the other master-planned communities",
            "Stairs and levels, including third-floor walk-ups along Haynes Bridge and North Point and two-story homes off Webb Bridge",
            "Carry distance from the front door to where the truck can legally sit",
            "Packing, unpacking, furniture disassembly or white-glove setup added to the move",
            "Specialty items: pianos, safes, oversized glass, gym equipment, large TVs",
            "The date. Month-end, weekends, late July and amphitheatre concert nights are the tight windows",
          ],
          process: [
            {
              stage: "Free quote",
              when: "Back the same day",
              body: "Send both addresses, the date and roughly what is moving. If either end is Avalon, a downtown building or a gated Windward neighborhood, say so, because that changes the plan. You get an itemized quote back the same day with nothing added later.",
            },
            {
              stage: "Book the date",
              when: "2 to 4 weeks ahead for most moves",
              body: "Two to four weeks is comfortable for Alpharetta. Late July fills first as families work toward the Fulton County Schools start, and month-end weekends go early year round. Corporate relocations with a fixed start date should book as soon as the date is known. We are open 24 hours, so short-notice dates are worth asking about.",
            },
            {
              stage: "Access plan",
              when: "Before move day",
              body: "We confirm the elevator reservation and certificate of insurance with the building at Avalon or downtown, the gate procedure and move-in window with your Windward neighborhood office, and where the truck can sit at a Haynes Bridge or North Point complex. We also check the Ameris Bank Amphitheatre schedule and the Farmers Market calendar against your date.",
            },
            {
              stage: "Move day",
              when: "Any day, any start time",
              body: "Floors, door jambs and elevator cabs get protected first, furniture is padded and wrapped, and beds and tables come apart and go back together at the other end. If you booked white-glove setup, furniture is placed and rooms are arranged before the crew leaves. Early starts to beat the GA-400 backup are normal.",
            },
          ],
          faqExtra: [
            {
              q: "How much do movers in Alpharetta cost?",
              a: "There is no single honest number, and any moving company in Alpharetta, GA that quotes one before seeing the details is guessing. An Avalon apartment with a booked freight elevator, a gated Windward lakefront house and a two-story home off Webb Bridge are three different jobs even at the same square footage. What moves the price is volume, stairs and elevators, carry distance, building paperwork, added packing or setup, and the date. Send the addresses, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees.",
            },
            {
              q: "Do you handle long-distance moves out of Alpharetta?",
              a: "Yes. We are licensed and insured for both local and long-distance moves, and one crew handles your belongings from the Alpharetta address to the destination. Long-distance moves out of Alpharetta are often tied to a corporate transfer, so the schedule is built backward from the start date on the other end, and the quote is itemized the same way a local move is.",
            },
            {
              q: "Can you move me into or out of Avalon?",
              a: "Yes, and the building paperwork is the main part of it. Avalon residences use booked elevator slots and require a certificate of insurance from the mover, and the truck has to be positioned around retail deliveries and shoppers on Old Milton Parkway. We handle the reservation and the insurance paperwork with management ahead of time and arrive in the window that was booked.",
            },
            {
              q: "Is Halcyon inside your Alpharetta service area?",
              a: "Yes. Halcyon has an Alpharetta address but sits in Forsyth County off GA-400 at McFarland Parkway, and we treat it as part of the same north Fulton and south Forsyth run. Like Avalon, its apartments and townhomes above the shops need elevator timing and loading coordination with the property, which we arrange before the day.",
            },
            {
              q: "My company gave me a start date. Can you work to it?",
              a: "That is a normal Alpharetta move for us. Corporate relocations along the Windward Parkway and GA-400 corridor come with a fixed first day, so we schedule the move, and any packing or white-glove setup, backward from that date. If the new home is not ready in time, tell us early and we will plan the sequence around it. We are open 24 hours, 7 days a week, so evening and weekend moves are available when a weekday will not work.",
            },
          ],
        },
  },
  {
    slug: "dunwoody",
    city: "Dunwoody",
    full: "Dunwoody, GA",
    county: "DeKalb County",
    neighborhoods: ["Dunwoody Village", "Perimeter Center", "Branches", "Kingsley", "Georgetown", "Vanderlyn"],
    intro:
      "Dunwoody pairs established family neighborhoods with the busy Perimeter Center business district. Sobi Moving understands the rhythm of this community, from quiet cul-de-sacs to high-rise apartments near the mall. Our crew brings care and professionalism to every Dunwoody address.",
    local:
      "Dunwoody's residential streets are full of mature traditional homes on generous lots in neighborhoods like Branches and Vanderlyn, many with basements and multiple staircases. Near Perimeter Center and the Dunwoody MARTA station, high-rise apartments and condos require loading-dock and elevator coordination during set windows. Traffic around I-285 and Ashford-Dunwoody Road peaks at rush hour, so we schedule loading to avoid the worst of it. Whether it is a wooded family home or a Perimeter condo, our team adapts to the site and protects every doorway and floor.",
    faq: [
      {
        q: "Can you move me into a Perimeter Center high-rise apartment?",
        a: "Yes. We reserve the freight elevator and loading dock with building management and provide a certificate of insurance so everything is approved before we arrive.",
      },
      {
        q: "Do you provide packing materials?",
        a: "We bring all the boxes, padding, and supplies needed, and full-service packing is available for as much or as little as you like.",
      },
      {
        q: "Will the same crew handle my whole move?",
        a: "Yes. A consistent, careful crew loads, transports, and unloads your belongings so nothing gets lost in a handoff.",
      },
    ],
    depth: {
      headings: {
        title: "Movers in Dunwoody, GA: Perimeter Condos to Houses",
        h1: "Movers in Dunwoody, GA: Perimeter condos to houses",
        description: "High Street towers, Dunwoody Village cul-de-sacs, HOA and elevator paperwork done for you. Dunwoody movers open 24/7, rated 5.0 from 32 Google reviews.",
        local: "Perimeter towers on one side, swim and tennis streets on the other",
        capabilities: "Packing, paperwork and the pieces that come apart",
        areas: "Dunwoody by neighborhood, Georgetown to Dunwoody North",
        challenges: "The four things that catch a Dunwoody move out",
        process: "Your Dunwoody move, quote to last box",
        cost: "Dunwoody movers pricing, line by line",
        services: "Condo, apartment or house move in Dunwoody",
        nearby: "Just across I-285 and GA-400",
        reviews: "Thirty-two Google reviews, all five stars",
        faq: "Asked before a Dunwoody move",
        cta: "Send us your Dunwoody addresses",
      },
      answer:
        "Movers in Dunwoody, GA deal with two very different jobs, often in the same week. Around Perimeter Center and the Dunwoody MARTA station the work is apartments and condos in elevator buildings, where the freight elevator reservation, the shared loading dock and the certificate of insurance decide how the day goes. West of Ashford-Dunwoody Road, in Dunwoody Village, the Branches, Kingsley and Dunwoody North, it is 1960s and 1970s ranches, split-levels and two-stories on wooded lots with basements, where the stairs and the driveway decide it instead. A Dunwoody moving company earns its fee by planning for whichever one you are in before anything is loaded.",
      areas: [
        {
          name: "Perimeter Center & High Street",
          note: "Apartment and condo towers around Perimeter Mall, Perimeter Center Parkway and Hammond Drive, including the new High Street buildings beside the Dunwoody MARTA station. Freight elevators are booked in set windows, docks are shared with deliveries, and management wants a certificate of insurance on file before a crew is let in. That paperwork is arranged with the building ahead of the day.",
        },
        {
          name: "Dunwoody Village & Mount Vernon Road",
          note: "The commercial center at Mount Vernon Road and Chamblee-Dunwoody Road, with streets like Mount Vernon Woods off it. Single-family homes from the 1960s and 1970s on wooded lots with driveways that were laid out for a sedan, not a moving truck. Mount Vernon Road closes between Jett Ferry Road and the Village on the morning of the Fourth of July parade, so a move that day is routed around it.",
        },
        {
          name: "The Branches & Vanderlyn",
          note: "Swim and tennis neighborhoods between Mount Vernon Road and Spalding Drive, with the Branches straddling the Sandy Springs line. Traditional two-stories and split-levels, many with finished basements and rear decks that sit a full level below the front door. That adds a flight in both directions and a longer carry than the street view suggests.",
        },
        {
          name: "Kingsley & Redfield",
          note: "Off Tilly Mill Road and Womack Road, close to Dunwoody High School and Peachtree Middle. Family houses on curving streets that end in cul-de-sacs tight enough that a full-size truck has to be positioned before anything comes out. Moves here tend to follow the DeKalb County Schools calendar.",
        },
        {
          name: "Dunwoody North",
          note: "About 1,250 homes bounded by North Peachtree Road, Peachtree Industrial and both sides of Tilly Mill Road, next to Brook Run Park. Ranches and split-levels where the half flight inside the front door is the detail people forget to mention when they describe the house.",
        },
        {
          name: "Georgetown & Chamblee-Dunwoody Road",
          note: "Early 1960s ranches and split-levels tucked between I-285 and Chamblee-Dunwoody Road, with townhomes around the Georgetown shopping district. Being this close to the interstate makes a long-distance load-out simple, but the on-ramp backs up at peak, so the truck is timed around it.",
        },
      ],
      challenges: [
        {
          title: "Perimeter buildings run on reservations, not arrival times",
          body: "The towers along Perimeter Center Parkway, Hammond Drive and Ashford-Dunwoody Road book the freight elevator in fixed windows, and several want the truck in a specific dock bay with a certificate of insurance already approved. Miss the window and the move does not happen that day. Elevator reservations, dock access and building paperwork get confirmed with management before the date is locked, and the crew arrives sized to finish inside the window.",
        },
        {
          title: "The I-285 and GA-400 interchange is Dunwoody's front door",
          body: "Ashford-Dunwoody Road meets I-285 at a diverging diamond that carries Perimeter Mall traffic on top of the commuter load, and Hammond Drive and Perimeter Center Parkway feed the same knot. At peak, and through the holiday shopping weeks, a truck can sit a long time covering a single mile. Load and unload times are set around that, so the clock runs while furniture is moving, not while the truck idles.",
        },
        {
          title: "Basements and wooded lots hide a level from the quote",
          body: "In the Branches, Vanderlyn, Kingsley and Mount Vernon Woods, a house that reads as two stories from the street often has a finished basement opening onto a sloped back yard. That is a third level and frequently a second door. It is the single most common thing left out when people describe their own home, and it is why the crew size and the quote are based on the whole house, not the front elevation.",
        },
        {
          title: "One school calendar and one parade shape the busy dates",
          body: "Dunwoody has no city school system. Its schools, from Austin and Vanderlyn up to Dunwoody High, are DeKalb County Schools, so families here move in the same late-July stretch before the first day of class. Then the Fourth of July parade closes Mount Vernon Road between Jett Ferry Road and Dunwoody Village from mid-morning. Both are known well in advance, which is exactly why the date gets checked against them when you book.",
        },
      ],
      process: [
        {
          stage: "Free quote",
          when: "Back the same day",
          body: "Send both addresses, the date and roughly what is moving. If either end is a Perimeter Center building, mention the floor and whether there is a freight elevator. You get an itemized quote back the same day with every line written out and nothing added afterward.",
        },
        {
          stage: "Book the date",
          when: "2 to 4 weeks ahead for most moves",
          body: "Two to four weeks is comfortable for Dunwoody. The late-July window before DeKalb County Schools start goes first, month-end weekends go early all year, and High Street and Perimeter buildings can only take so many moves per day because of the elevator schedule. Last-minute dates are worth asking about, since we are open 24 hours.",
        },
        {
          stage: "Access plan",
          when: "Before move day",
          body: "For a condo or apartment, we reserve the freight elevator, confirm the dock and send the certificate of insurance to management. For a house in the Branches, Kingsley or Dunwoody North, we confirm whether the driveway takes a full-size truck, how many levels are in play including the basement, and what the HOA requires. Nothing is left to be discovered on the morning.",
        },
        {
          stage: "Move day",
          when: "Any day, any start time",
          body: "Floors, door jambs and elevator cabs are protected first. Furniture is padded and wrapped, beds and tables come apart and go back together at the other end, and the truck is loaded in the order it will unload. Early starts to beat the Ashford-Dunwoody traffic, evening moves for buildings with late windows, and weekends are all normal for us.",
        },
      ],
      quoteFactors: [
        "How much there is to move, and how much of it is boxed before the crew arrives",
        "Levels, including the finished basement that most Branches and Vanderlyn homes have",
        "Carry distance from the door to where the truck can legally sit, whether that is a Kingsley cul-de-sac or a Perimeter dock",
        "Freight elevator and loading dock booking in Perimeter Center and High Street buildings",
        "Whether packing, unpacking or furniture disassembly is added to the move",
        "Specialty items: pianos, safes, oversized glass, treadmills and gym equipment",
        "Local versus long-distance. An interstate move out of Dunwoody is quoted on the full route, not the hourly clock",
        "The date. Late July, month-end weekends and the holiday shopping weeks around Perimeter Mall are the busiest windows",
      ],
      faqExtra: [
        {
          q: "How much do movers in Dunwoody cost?",
          a: "No flat rate is honest across Dunwoody, because a studio in a High Street building and a four-bedroom with a finished basement in the Branches are different jobs with different crews. What moves the number is volume, levels, carry distance, elevator and dock booking, packing, and the date. Send the addresses, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees.",
        },
        {
          q: "Do you offer moving and storage in Dunwoody?",
          a: "We are movers, not a storage facility, so we do not have units to rent. What we do is move you in stages: if you have rented a storage unit, we load from your home and deliver to the unit, and later collect from the unit and deliver to the new address. Tell us the unit location and access hours when you request the quote and both legs get itemized.",
        },
        {
          q: "Can you handle an interstate move out of Dunwoody?",
          a: "Yes. We are licensed and insured for local and long-distance moves, and Dunwoody sits right on I-285 and GA-400, which makes the load-out straightforward once the truck is past the peak traffic. The long-distance quote is itemized the same way as a local one, so the full route is priced before you commit.",
        },
        {
          q: "What do Perimeter Center condo and apartment buildings require from movers?",
          a: "Almost all of them want a certificate of insurance naming the building, a reserved freight elevator window, and sometimes a specific dock bay or a move-in deposit. We handle the certificate and the elevator and dock reservations with management before the date, so the only thing left for you is to be there with the keys.",
        },
        {
          q: "My house has a finished basement and a steep driveway. Does that change the plan?",
          a: "It changes the crew size and the parking, and it is common on the wooded lots in the Branches, Vanderlyn and Mount Vernon Woods. If a loaded truck cannot use the driveway safely, it stays on the street and the carry gets longer, and the basement adds a level in both directions. Both go into the quote up front, which is what keeps the day on schedule.",
        },
      ],
    },
  },
  {
    slug: "johns-creek",
    city: "Johns Creek",
    full: "Johns Creek, GA",
    county: "Fulton County",
    neighborhoods: ["St. Ives", "Medlock Bridge", "Seven Oaks", "Sugar Mill", "Newtown", "Abbotts Bridge"],
    intro:
      "Johns Creek is known for its golf-course communities and spacious family homes in top-rated school districts. Sobi Moving delivers a calm, organized experience for families settling into this sought-after suburb. From packing to final furniture placement, we handle the heavy lifting.",
    local:
      "Johns Creek is dominated by large single-family homes in master-planned communities like St. Ives and Medlock Bridge, often with long driveways, multiple levels, and bonus rooms over the garage. Many are gated golf communities with HOA move-in procedures and gate access that we coordinate in advance. The winding subdivision roads and distance from major highways mean route planning matters for an efficient day. Our crew is well-suited to these big homes, carefully handling everything from formal dining sets to home-office and basement gear.",
    faq: [
      {
        q: "Do you handle gated golf communities like St. Ives and Medlock Bridge?",
        a: "Yes. We arrange gate access and follow each community's HOA move-in rules so there are no delays at the entrance on move day.",
      },
      {
        q: "Can you move large, multi-level family homes?",
        a: "Definitely. Our crew is staffed and equipped for big homes with basements, upper floors, and bonus rooms, and we protect stairs and floors throughout.",
      },
      {
        q: "Do you offer unpacking too?",
        a: "We do. After delivery we can unpack boxes, assemble furniture, and set up rooms so your family can settle in right away.",
      },
    ],
    depth: {
          headings: {
            title: "Movers in Johns Creek, GA: Gates, HOAs, Big Homes",
            description: "Gate lists, HOA move-in windows and the long drive from GA-400 shape a Johns Creek move. Open 24/7, 5.0 from 32 Google reviews, same-day itemized quotes.",
            h1: "Movers in Johns Creek, GA: gates, HOAs and big homes",
            local: "Behind the gate, the move is already half planned",
            capabilities: "Packing, setup and the paperwork nobody enjoys",
            areas: "Golf communities, swim-tennis streets and the 141 corridor",
            challenges: "Guard gates, three-level houses and no interstate of your own",
            process: "A Johns Creek move, start to finish",
            cost: "Movers in Johns Creek, GA: where the quote comes from",
            services: "Local, long-distance or office: which Johns Creek move is this?",
            nearby: "Across the river and up the 141",
            faq: "Asked by Johns Creek homeowners and office managers",
            reviews: "Thirty-two five-star reviews, none of them ours",
            cta: "Send the address and the gate name",
          },
          answer:
            "Movers in Johns Creek, GA are mostly working inside master-planned communities, and that changes the job before a single box is lifted. St Ives Country Club, Country Club of the South and Bellmoore Park sit behind staffed gates with their own move-in rules. Medlock Bridge, Seven Oaks and Sugar Mill are large swim-tennis subdivisions of two-story homes with finished basements and bonus rooms over the garage. Add the fact that Johns Creek has no interstate of its own, so every truck arrives by way of GA-141, State Bridge Road or McGinnis Ferry Road, and a local moving company in Johns Creek needs a plan for access and timing as much as for the furniture.",
          areas: [
            {
              name: "St Ives Country Club",
              note: "A gated golf, swim and tennis community east of Medlock Bridge Road and south of Parsons Road, built out between 1987 and 2013. The clubhouse sits on one of the highest points in North Fulton, and the lots around it slope with it, so driveways are steep and the carry from the truck is rarely level. Gate access and the HOA move-in procedure are settled with the office before the crew arrives.",
            },
            {
              name: "Medlock Bridge & Seven Oaks",
              note: "Two of the big swim-tennis subdivisions off the GA-141 corridor, Seven Oaks between State Bridge Road and McGinnis Ferry Road. Traditional two-story homes with daylight basements and a bonus room over the garage are the norm, which makes three levels of stairs the standard here rather than the exception.",
            },
            {
              name: "Sugar Mill & the Abbotts Bridge corridor",
              note: "Sugar Mill runs off Abbotts Bridge Road between Medlock Bridge Road and Peachtree Industrial, with homes built from 1993 to 2006. Abbotts Bridge Road is also GA-120, the crossing into Gwinnett at the Chattahoochee, and it backs up at the bridge in both rush hours. We load around that rather than into it.",
            },
            {
              name: "Country Club of the South & Rivermont",
              note: "Country Club of the South is over 900 acres of estate homes behind a gate that is staffed 24 hours a day, entered from Old Alabama Road, with an Alpharetta mailing address despite sitting inside Johns Creek. Rivermont is between the club and the Chattahoochee, with wooded hillside lots and the Holcomb Bridge Road back route toward GA-400. Both need the guest list and the certificate of insurance filed ahead of the date.",
            },
            {
              name: "Newtown & Doublegate",
              note: "The established heart of the city around Newtown Park on Old Alabama Road and the Doublegate swim-tennis neighborhood, which grew out of the old Autrey Mill farmland next to the 46-acre nature preserve. Mature trees hang low over the subdivision roads here, and a full-height truck has to be routed around a few of them.",
            },
            {
              name: "Bellmoore Park & Technology Park",
              note: "Bellmoore Park is the newest gated community in the city, more than 600 homes at Bell Road and Medlock Bridge Road with 24/7 security at the entrance. Across McGinnis Ferry Road, Johns Creek Technology Park holds the office buildings along Medlock Bridge Road and Emory Johns Creek Hospital on Hospital Parkway. Office moves here happen outside trading hours so the building stays open for everyone else.",
            },
          ],
          challenges: [
            {
              title: "The gate is the first stop, and it has a process",
              body: "Country Club of the South, St Ives and Bellmoore Park all run staffed gates, and most of the ungated subdivisions still have an HOA with a written move-in procedure. That usually means the crew on a guest list by name, a certificate of insurance on file with the management office, and sometimes a set window for trucks. We collect the requirements when the date is booked and file everything in advance, so the truck is waved through rather than parked at the guardhouse while someone makes phone calls.",
            },
            {
              title: "Johns Creek has no interstate, so the approach is long",
              body: "GA-400 is west of the city and I-85 is east of it, and neither touches Johns Creek. Everything comes in on Medlock Bridge Road, State Bridge Road, Abbotts Bridge Road or McGinnis Ferry Road, all of which slow to a crawl at peak, and McGinnis Ferry is in the middle of a widening project. A long approach in both directions is built into the schedule, and start times are chosen so the loaded truck is not sitting on GA-141 at five o'clock.",
            },
            {
              title: "Three levels is the standard house here",
              body: "The typical Johns Creek home in Medlock Bridge, Seven Oaks or Sugar Mill is a two-story with a finished daylight basement and a bonus room over the garage. That is three flights in both directions, often with a long driveway on top, and it is the thing people most often leave out when they guess the size of their own move. The crew is sized for the levels, not the square footage.",
            },
            {
              title: "The Fulton County school calendar decides the busy weeks",
              body: "Johns Creek families are zoned to Northview on Parsons Road, Chattahoochee on Taylor Road or Johns Creek High on State Bridge Road, and most want to be in the new house before Fulton County Schools starts in early August. Late July fills first, then the month-end weekends. Booking earlier keeps the choice of date and start time with you.",
            },
          ],
          quoteFactors: [
            "How much is moving, and how much of it is boxed before the crew arrives",
            "Levels. A finished basement plus a bonus room over the garage is three flights each way",
            "Carry distance from the front door to where the truck can sit, which on sloped St Ives and Rivermont lots is often the street",
            "Whether the community is gated and what its HOA requires: guest list, certificate of insurance, a move-in window",
            "The drive itself. Local moves within Johns Creek and long-distance moves out of Georgia are priced very differently",
            "Packing, unpacking, furniture disassembly or white-glove setup added to the move",
            "Specialty pieces: pianos, safes, home gym equipment, oversized glass and stone tops",
            "The date. Late July, month-end and weekends are the busiest windows in Johns Creek",
          ],
          process: [
            {
              stage: "Free quote",
              when: "Back the same day",
              body: "Send both addresses, the date, roughly what is moving and the name of the community if there is a gate. You get an itemized quote back the same day with every line written out and no hidden fees added afterward.",
            },
            {
              stage: "Book the date",
              when: "2 to 4 weeks ahead for most moves",
              body: "Two to four weeks is comfortable for Johns Creek. The weeks before the Fulton County Schools start date go first, and month-end weekends fill early all year. We are open 24 hours, so a short-notice date is still worth asking about.",
            },
            {
              stage: "Access plan",
              when: "Before move day",
              body: "We contact the HOA or gatehouse for St Ives, Country Club of the South, Bellmoore Park or whichever community you are in, get the crew on the guest list, file the certificate of insurance and confirm any move-in window. We also check whether the driveway takes a full-size truck or the load goes from the street, and for office moves in Technology Park, book the loading dock and elevator.",
            },
            {
              stage: "Move day",
              when: "Any day, any start time",
              body: "The truck arrives with the gate already expecting it. Floors, stair rails and door jambs are protected first, furniture is padded and wrapped, and beds, tables and sectionals come apart and go back together in the new house. Early starts that beat the Medlock Bridge Road traffic and evening or weekend office moves are normal for us.",
            },
          ],
          faqExtra: [
            {
              q: "How much do movers in Johns Creek cost?",
              a: "There is no single honest number for Johns Creek, because a townhome near Medlock Corners and a three-level estate behind the gate at Country Club of the South are not the same job. What moves the price is volume, the number of levels, carry distance, whether packing or setup is added, the gate and HOA requirements, and the date. Send the address, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees.",
            },
            {
              q: "Do you handle gated communities like St Ives and Country Club of the South?",
              a: "Yes, and the gate is where the planning starts. We get the crew on the guest list, file the certificate of insurance with the management office and confirm any move-in window before the date, so the truck goes straight through on the morning. Bellmoore Park, St Ives and Country Club of the South each have their own procedure and we follow whichever applies.",
            },
            {
              q: "Do you do long-distance moves out of Johns Creek?",
              a: "Yes. We are licensed and insured for both local and long-distance moves, and a full-service long-distance move out of Johns Creek can include packing, furniture disassembly, loading, the drive and unpacking at the other end. Relocations tied to a start date get scheduled backwards from that date, and the long approach out to GA-400 or I-85 is part of the plan, not a surprise on the day.",
            },
            {
              q: "Can you move a small office in Technology Park or along Medlock Bridge Road?",
              a: "Yes. Office moves in Johns Creek Technology Park and the buildings along Medlock Bridge Road are done outside trading hours, on evenings or weekends, so the business is open as normal the next morning. We arrange the loading dock, freight elevator and certificate of insurance with building management in advance, and desks and workstations are disassembled, labeled and set back up in the new suite.",
            },
            {
              q: "When should a Johns Creek family book a summer move?",
              a: "As early as the closing or lease date is known. Most families zoned to Northview, Chattahoochee or Johns Creek High want to be settled before Fulton County Schools starts in early August, so late July is the first thing to fill on the calendar. Two to four weeks ahead is comfortable most of the year, but for a July date, sooner is better.",
            },
          ],
        },
  },
  {
    slug: "marietta",
    city: "Marietta",
    full: "Marietta, GA",
    county: "Cobb County",
    neighborhoods: ["Marietta Square", "Kennesaw Mountain", "East Cobb border", "Whitlock Avenue", "Church-Cherokee", "Fair Oaks"],
    intro:
      "Marietta centers on its historic square and stretches across diverse neighborhoods from older in-town homes to newer suburban builds. Sobi Moving brings reliable, full-service care to every corner of this Cobb County city. We treat your move with the attention it deserves, big or small.",
    local:
      "Around Marietta Square you find historic Victorians and craftsman homes with original details, narrow streets, and on-street parking that takes planning. Move outward toward Kennesaw Mountain and the Whitlock corridor and the homes get larger and newer, often on hilly, wooded lots. Antebellum and early-1900s properties near the square need extra padding and patience on their older staircases and floors. Our crew scouts access ahead of time and protects these historic surfaces while keeping the day moving.",
    faq: [
      {
        q: "Can you move antiques and furniture out of older homes near Marietta Square?",
        a: "Yes. We routinely handle antiques and heavy pieces in Marietta's historic homes, using extra padding and floor protection on older staircases and hardwoods.",
      },
      {
        q: "Do you do both local and long-distance moves from Marietta?",
        a: "We handle both, fully licensed and insured, with transparent estimates and no hidden fees.",
      },
      {
        q: "Can you remove junk and old furniture I don't want to keep?",
        a: "Yes. We can haul away unwanted items as part of your move so you don't have to deal with the leftovers.",
      },
    ],
    depth: {
      headings: {
        title: "Movers in Marietta, GA",
        description: "Historic Square parking, west-side driveway grades, Dobbins report dates. Marietta movers open 24/7, rated 5.0 from 32 Google reviews.",
        local: "Marietta moves, from the Square outward",
        capabilities: "More than a truck and a crew",
        areas: "Marietta, block by block",
        challenges: "Historic streets, hillside driveways, two school calendars",
        process: "How a Marietta move runs",
        cost: "How much do movers in Marietta cost?",
        services: "Which kind of Marietta move is yours?",
        nearby: "We also cover the rest of Cobb County",
        faq: "Marietta moving questions",
        reviews: "Rated 5.0 across metro Atlanta",
        cta: "Tell us about your Marietta move",
      },
      answer:
        "Moving in Marietta means dealing with three very different kinds of property: historic homes around Marietta Square with narrow streets and original staircases, hillside houses on wooded lots toward Kennesaw Mountain, and newer apartments and townhomes along the Cobb Parkway and I-75 corridor. Each needs a different access plan.",
      areas: [
        {
          name: "Marietta Square & Church-Cherokee",
          note: "Late-1800s and early-1900s homes in the historic district. Narrow streets, on-street-only parking, original staircases and heart-pine floors that need runners and door padding before anything is carried. Square events close streets on weekends, so truck placement gets arranged ahead of the day.",
        },
        {
          name: "Whitlock Avenue corridor",
          note: "Antebellum and Victorian properties on deep lots. Long walkways from the street to the door mean a longer carry, and the crew sizes up for it rather than dragging the day out.",
        },
        {
          name: "Kennesaw Mountain & west Marietta",
          note: "Larger homes on hilly, wooded lots. Steep and curved driveways are common, and a full-size truck often cannot get to the door, so we shuttle with a smaller vehicle when that is the case.",
        },
        {
          name: "East Cobb border",
          note: "Established subdivisions with HOA move-in rules. Where a certificate of insurance or a booked move-in window is required, we handle that paperwork with the management office before move day.",
        },
        {
          name: "Cobb Parkway & Roswell Street",
          note: "Apartments and townhomes near the Big Chicken and the I-75 interchange. Elevator buildings need reservations, and loading zones here fill up fast during weekday rush.",
        },
        {
          name: "Fair Oaks & Dobbins",
          note: "Close to Dobbins Air Reserve Base and the Lockheed Martin plant, where relocations run to fixed report dates. Moves here are scheduled around a deadline that does not move.",
        },
      ],
      challenges: [
        {
          title: "Historic homes need a slower, protected approach",
          body: "Homes near the Square and along Whitlock predate modern doorways and stair widths. Large furniture often will not clear a turn that looks fine on paper. The crew measures access first, protects floors and jambs, and disassembles more than a typical move needs rather than forcing a piece through.",
        },
        {
          title: "Hills and driveways decide where the truck parks",
          body: "West Marietta lots slope, and a loaded truck cannot safely use a steep or curved driveway. Where the truck has to stay on the street, the carry gets longer. Planning it up front is the difference between a normal day and an overtime one.",
        },
        {
          title: "I-75 and the Loop set the schedule",
          body: "I-75, the South Marietta Loop and Cobb Parkway all back up hard at peak. Load times get set around the traffic instead of into it, so hours are not spent sitting in a truck.",
        },
        {
          title: "Two school systems, two calendars",
          body: "Marietta City Schools and Cobb County Schools run separate calendars, and families time moves to them. Late July and early August book out first, so the earlier the date is set, the more of the day is yours to choose.",
        },
      ],
      quoteFactors: [
        "How much there is to move, and how much of it is packed before the crew arrives",
        "Stairs, and how many flights. Historic homes near the Square are frequently three levels",
        "Carry distance from the door to where the truck can legally and safely park",
        "Elevator or loading-dock booking in apartment and condo buildings",
        "Whether packing, unpacking, or furniture disassembly is added to the move",
        "Specialty items: pianos, safes, oversized glass, gym equipment",
        "The date itself: weekends, month-end and the August school-year rush are the busiest windows",
      ],
      process: [
        {
          stage: "Free quote",
          when: "Back the same day",
          body: "Send the addresses, the date, and roughly what is moving. You get an itemized quote back the same day, with every line written out and nothing added later.",
        },
        {
          stage: "Book the date",
          when: "2 to 4 weeks ahead for most moves",
          body: "Two to four weeks is the comfortable window for a Marietta move. Late July and early August fill first around the school calendars, and month-end weekends go early year round. Last-minute dates are worth asking about, because we are open 24 hours and can often fit them.",
        },
        {
          stage: "Access plan",
          when: "Before move day",
          body: "We confirm where the truck can legally park, whether the driveway takes a full-size vehicle, and what the building or HOA requires. Elevator reservations and certificates of insurance get arranged with management before the day, not on it.",
        },
        {
          stage: "Move day",
          when: "Any day, any start time",
          body: "Floors and doorways get protected first, furniture is padded and wrapped, and large pieces come apart and go back together at the other end. Early starts, evenings and weekends are all normal for us.",
        },
      ],
      faqExtra: [
        {
          q: "How much do movers in Marietta cost?",
          a: "There is no flat rate that is honest for every home, because the things that actually drive the number vary so much across Marietta: volume, stairs, carry distance, packing, and the date. Tell us the address, the date, and roughly what is moving, and you get an itemized quote back the same day with no hidden fees.",
        },
        {
          q: "Can you move a historic home near Marietta Square?",
          a: "Yes, and it is worth booking a walk-through first. Older doorways, tight stair turns and original floors change how a move is run, and knowing the access in advance is what keeps the house and the furniture intact.",
        },
        {
          q: "Do you handle military and corporate relocations from Dobbins or Lockheed?",
          a: "Yes. Relocations tied to a report date or a start date get scheduled backwards from that date, including long-distance moves out of Georgia, so the deadline is the fixed point everything else works around.",
        },
        {
          q: "My driveway is steep. Is that a problem?",
          a: "It is common in west Marietta and it is not a problem as long as we know beforehand. If a loaded truck cannot use the driveway safely, we park on the street and shuttle, and that gets built into the plan rather than discovered on the day.",
        },
        {
          q: "Are you available on weekends and outside business hours?",
          a: "We are open 24 hours, 7 days a week. Early starts, evenings and weekends are all normal for us, which matters for commercial moves and for buildings that only allow moves in a set window.",
        },
      ],
    },
  },
  {
    slug: "smyrna",
    city: "Smyrna",
    full: "Smyrna, GA",
    county: "Cobb County",
    neighborhoods: ["Smyrna Market Village", "Vinings border", "Jonquil", "Williams Park", "Belmont", "Argyle"],
    intro:
      "Smyrna, the Jonquil City, has grown into a popular spot for young professionals and families thanks to its walkable Market Village and easy access to the Battery. Sobi Moving serves its townhomes, new builds, and established neighborhoods with friendly, full-service care. We make your Smyrna move organized and stress-free.",
    local:
      "Smyrna is full of newer townhome and live-work communities around Market Village, along with established ranch and split-level homes in older neighborhoods like Williams Park. The townhomes often have three stories and narrow garages, so stair carries and tight turns are part of the job here. Proximity to I-285, I-75, and the Truist Park area means traffic and event-day congestion can affect timing, which we plan around. Our crew handles the multi-level townhomes efficiently and protects shared walls and stairwells in attached communities.",
    faq: [
      {
        q: "Can you handle a three-story townhome in Smyrna?",
        a: "Yes. Three-story townhomes are common here, and our crew is staffed to manage the stair carries safely while protecting railings, walls, and floors.",
      },
      {
        q: "Do you provide furniture assembly?",
        a: "We do. We disassemble large furniture before the move and reassemble it in your new home as part of our full-service offering.",
      },
      {
        q: "Are there any hidden fees on the estimate?",
        a: "No. Our estimates are clear and upfront, with no surprise charges added on move day.",
      },
    ],
  },
  {
    slug: "brookhaven",
    city: "Brookhaven",
    full: "Brookhaven, GA",
    county: "DeKalb County",
    neighborhoods: ["Brookhaven Village", "Historic Brookhaven", "Ashford Park", "Lynwood Park", "Town Brookhaven", "Drew Valley"],
    intro:
      "Brookhaven mixes the stately estates of its historic country-club section with lively apartment communities near Town Brookhaven and the MARTA station. Sobi Moving adapts to both worlds with a careful, professional crew. From bungalow to high-rise, we handle your move with respect for your home and your time.",
    local:
      "Historic Brookhaven around the country club features large, established estates on wide lots, while neighborhoods like Ashford Park and Drew Valley are full of renovated bungalows and new infill construction. Closer to Town Brookhaven and the Brookhaven-Oglethorpe MARTA station, you find mid-rise apartments and condos that need elevator and loading-dock scheduling. Peachtree Road traffic and tight in-town parking call for careful truck placement, which we arrange ahead. Our crew moves comfortably between grand older homes and modern apartment buildings, protecting each property along the way.",
    faq: [
      {
        q: "Do you serve both Historic Brookhaven estates and the apartments near Town Brookhaven?",
        a: "Yes. We handle large estate homes and mid-rise apartment buildings alike, coordinating elevators and parking wherever they are needed.",
      },
      {
        q: "Can you pack fragile and valuable items?",
        a: "We specialize in careful packing for fragile and high-value pieces, using proper materials so everything arrives safely.",
      },
      {
        q: "Is Sobi Moving licensed and insured?",
        a: "Yes, we are fully licensed and insured for local and long-distance moves throughout metro Atlanta.",
      },
    ],
  },
  {
    slug: "decatur",
    city: "Decatur",
    full: "Decatur, GA",
    county: "DeKalb County",
    neighborhoods: ["Decatur Square", "Oakhurst", "Winnona Park", "MAK Historic District", "Clairemont", "Agnes Scott"],
    intro:
      "Decatur is famously walkable, with a charming square, historic bungalows, and a tight-knit, community feel. Sobi Moving works its narrow streets and beloved older homes with care. We bring a full-service, neighborly approach to every move in this distinctive city.",
    local:
      "Decatur is defined by early-1900s craftsman bungalows and cottages in neighborhoods like Oakhurst, Winnona Park, and the MAK Historic District, many with narrow doorways, steep porch steps, and original hardwood floors. The compact, walkable streets near Decatur Square leave little room for large trucks, so we plan parking and shuttle access carefully. These older homes reward patience and protection, and our crew pads tight hallways and staircases to keep both the house and your furniture safe. Where lots are small and on-street parking is tight, we coordinate timing to avoid blocking neighbors.",
    faq: [
      {
        q: "My Decatur bungalow has narrow doorways and tight stairs. Can you work with that?",
        a: "Yes. We move through older Decatur homes regularly and use careful disassembly, padding, and extra hands to get large pieces through tight spaces without damage.",
      },
      {
        q: "Parking near Decatur Square is limited. How do you handle the truck?",
        a: "We scout access in advance and plan truck placement or a shuttle approach so we can load efficiently without blocking the narrow streets.",
      },
      {
        q: "Do you offer full packing and unpacking?",
        a: "We do. Our crew can pack your whole home, transport it carefully, and unpack and set up rooms at your new place.",
      },
    ],
  },
  {
    slug: "buckhead",
    city: "Buckhead",
    full: "Buckhead, GA",
    county: "Fulton County",
    neighborhoods: ["Tuxedo Park", "Peachtree Road", "Garden Hills", "Buckhead Village", "Chastain Park", "Lenox"],
    intro:
      "Buckhead is Atlanta's address for luxury, from gated estates in Tuxedo Park to glassy high-rise condos along Peachtree Road. Sobi Moving delivers the discreet, white-glove service this neighborhood expects. We protect your home and your valuables with a meticulous, professional crew.",
    local:
      "Buckhead spans grand estates on Tuxedo Park's wooded lots and a dense cluster of luxury high-rise condos and towers near Peachtree and Lenox. The high-rises require strict freight-elevator reservations, loading-dock windows, and certificates of insurance that we manage with building concierge teams in advance. Peachtree Road congestion and limited street access mean precise timing keeps your move smooth. Whether it is a sprawling estate or a top-floor condo, our crew brings the careful, white-glove handling that high-value furnishings and finishes demand.",
    faq: [
      {
        q: "Do you coordinate freight elevators and certificates of insurance for Buckhead high-rises?",
        a: "Yes. We handle freight-elevator and loading-dock reservations and provide the certificate of insurance buildings along Peachtree and Lenox require before move day.",
      },
      {
        q: "Can you provide white-glove service for high-value furnishings?",
        a: "Absolutely. We specialize in careful, white-glove handling, including custom padding and protection for fine furniture, art, and delicate finishes.",
      },
      {
        q: "Do you handle long-distance moves from Buckhead?",
        a: "Yes. We manage both local and long-distance luxury moves with a single, careful crew and no hidden fees.",
      },
    ],
  },
  {
    slug: "east-cobb",
    city: "East Cobb",
    full: "East Cobb, GA",
    county: "Cobb County",
    neighborhoods: ["Indian Hills", "Sope Creek", "Johnson Ferry", "Roswell Road corridor", "Sewell Mill", "Chimney Springs"],
    intro:
      "East Cobb is a family favorite, known for top schools, swim-tennis communities, and spacious homes on quiet wooded streets. Sobi Moving brings organized, full-service care to these established neighborhoods. We make moving into your East Cobb home calm and efficient.",
    local:
      "East Cobb is largely made up of established swim-tennis subdivisions like Indian Hills and Chimney Springs, with two-story traditional homes on sloping, wooded lots and full basements. Many homes have long driveways, side-entry garages, and multiple staircases that our crew is well prepared to handle. The Johnson Ferry and Roswell Road corridors get congested at rush hour, so we time loading and routing to stay efficient. These large family homes often mean a lot of furniture and storage to move, and we plan crew size and protection accordingly.",
    faq: [
      {
        q: "Can you move a large East Cobb home with a full basement?",
        a: "Yes. Basements, bonus rooms, and multi-level homes are routine for us, and we staff the crew to handle the volume and the stair carries safely.",
      },
      {
        q: "Do you offer furniture assembly and disassembly?",
        a: "We do. We take apart beds, sectionals, and large tables for transport and reassemble them in your new home.",
      },
      {
        q: "Can you help downsize with junk removal?",
        a: "Yes. We can haul away furniture and items you no longer want as part of the move so you only bring what you need.",
      },
    ],
    depth: {
      headings: {
        title: "East Cobb Moving Company & Movers",
        description: "Split-foyers, wooded driveways and school-zone timing shape every East Cobb move. Open 24/7, rated 5.0 from 32 Google reviews. Same-day quotes.",
        h1: "East Cobb moving company",
        local: "What an East Cobb moving company has to plan for",
        capabilities: "Packing, assembly and clearing out",
        areas: "Johnson Ferry, Sandy Plains and the school lines",
        challenges: "Wooded lots, split foyers and a school-year deadline",
        process: "How an East Cobb move runs",
        cost: "What changes the price of an East Cobb move",
        services: "Find the right East Cobb service",
        nearby: "Other areas we cover near East Cobb",
        faq: "Questions from East Cobb families",
        reviews: "The last word goes to customers",
        cta: "Book your East Cobb date",
      },
      answer:
        "An East Cobb moving company is working an area, not a city: East Cobb is a stretch of unincorporated Cobb County, and moves here are shaped by two things: mature subdivisions of split-foyer and two-story homes on wooded, sloping lots, and a school-attendance calendar that concentrates most family moves into a few summer weeks.",
      areas: [
        {
          name: "Johnson Ferry Road corridor",
          note: "The spine of East Cobb, lined with established subdivisions and the shopping centers at Merchants Walk and The Avenue. Traffic here is heavy through the school run in both directions, which shapes start times.",
        },
        {
          name: "Indian Hills",
          note: "1970s and 80s homes on large wooded lots around the country club. Long driveways, mature trees close to the curb, and split-level layouts are all common.",
        },
        {
          name: "Sandy Plains & Sewell Mill",
          note: "Family subdivisions with basements and two-story plans. Most have an HOA, and some ask for a move-in window to be booked with the board.",
        },
        {
          name: "Chimney Springs & Sope Creek",
          note: "Wooded lots on rolling ground near the creek. Driveways can be steep enough that a loaded truck stays on the street and we shuttle the last stretch.",
        },
        {
          name: "Roswell Road & the Chattahoochee edge",
          note: "Older ranches and newer infill along the river side of East Cobb, with narrow two-lane approaches and limited turning room for a full-size truck.",
        },
        {
          name: "Walton, Pope and Lassiter attendance zones",
          note: "School zones drive both home prices and move timing here. Families move to land inside a specific zone before the year starts, which makes late July and early August the tightest booking window of the year.",
        },
      ],
      challenges: [
        {
          title: "Split-foyers and basements are extra levels, not extra rooms",
          body: "Much of the East Cobb housing stock is split-foyer or two-story with a finished basement. A short flight up and a short flight down from the entry means almost nothing gets carried on the flat, and that is the biggest single driver of how long a day here takes.",
        },
        {
          title: "Wooded lots decide where the truck can sit",
          body: "Mature trees, steep driveways and long approaches are the norm rather than the exception. Where a loaded truck cannot safely use the driveway, we park on the street and shuttle, and that gets planned rather than discovered.",
        },
        {
          title: "The school calendar compresses the whole season",
          body: "Because attendance zones drive so many moves here, late July and early August book out before anywhere else in the metro. A date set early is worth more in East Cobb than almost anywhere we work.",
        },
        {
          title: "It is unincorporated, so the rules come from the HOA",
          body: "There is no city hall setting move rules in East Cobb. Requirements come from individual HOAs instead, and they vary street to street. We confirm what yours asks for before the day rather than assuming.",
        },
      ],
      process: [
        { stage: "Free quote", when: "Back the same day", body: "Send the addresses, the date and roughly what is moving. You get an itemized quote back the same day with nothing added later." },
        { stage: "Book the date", when: "2 to 4 weeks ahead, earlier for August", body: "Two to four weeks works most of the year. For a move tied to the start of the school year, book further out than that, because the last two weeks of summer are the tightest window in East Cobb." },
        { stage: "Access plan", when: "Before move day", body: "We confirm whether the driveway takes a full-size truck, how many levels the carry involves, and what your HOA requires. Anything the board needs is sorted ahead of the day." },
        { stage: "Move day", when: "Any day, any start time", body: "Floors and doorways get protected first, furniture is padded and wrapped, and large pieces come apart and go back together at the other end. We are open 24 hours, so we can start before the school run rather than in it." },
      ],
      quoteFactors: [
        "How much there is to move, and how much is packed before the crew arrives",
        "Levels. Split-foyers and finished basements mean stairs in both directions from the entry",
        "Whether a loaded truck can safely use the driveway, or has to stay on the street",
        "Carry distance on the longer wooded lots",
        "HOA move-in requirements where the subdivision has them",
        "Packing, unpacking or furniture disassembly added to the move",
        "Specialty items: pianos, safes, oversized glass, gym equipment",
        "The date. Late July and early August are the busiest weeks of the East Cobb year",
      ],
      faqExtra: [
        { q: "How much do movers in East Cobb cost?", a: "No flat rate is honest across East Cobb, because levels and driveway access change the day more than square footage does. A split-foyer with a finished basement is a different job to a ranch of the same size. Send the address, the date and roughly what is moving, and you get an itemized quote back the same day with no hidden fees." },
        { q: "Do you cover all of East Cobb, or only certain subdivisions?", a: "All of it. East Cobb is unincorporated Cobb County rather than a city, so we work the whole area from Johnson Ferry through Sandy Plains to the river side, including the gated and HOA communities." },
        { q: "My driveway is steep and wooded. Can a truck get up it?", a: "Sometimes, and where it cannot we park on the street and shuttle the last stretch with a smaller vehicle. It is common here and it is not a problem as long as we know before the day so it is in the plan." },
        { q: "We are moving before the school year starts. How early should we book?", a: "Earlier than you would anywhere else in the metro. Attendance zones drive a lot of moves in East Cobb, so the last two weeks of summer fill first. If your date is tied to the school calendar, set it as soon as you know it." },
        { q: "Are you available on weekends and outside business hours?", a: "We are open 24 hours, 7 days a week. Early starts are popular here specifically to get loaded before Johnson Ferry backs up with the school run." },
      ],
    },
  },
  {
    slug: "vinings",
    city: "Vinings",
    full: "Vinings, GA",
    county: "Cobb County",
    neighborhoods: ["Vinings Village", "Paces Ferry", "Riverside", "Vinings Estates", "Cumberland border", "Log Cabin Drive"],
    intro:
      "Vinings is a tucked-away enclave along the Chattahoochee, blending historic charm with upscale condos and townhomes near the river. Sobi Moving handles its mix of riverside condos and estate homes with attentive, full-service care. We make settling into this scenic community effortless.",
    local:
      "Vinings is known for its condo and townhome communities clustered near the Chattahoochee River and Paces Ferry Road, alongside larger estate homes in Vinings Estates. The riverside condos and mid-rise buildings often require elevator reservations and have limited loading areas that we coordinate in advance. The winding, hilly roads near Vinings Village and proximity to the busy Cumberland and I-285 interchange make route timing important. Our crew is comfortable threading furniture through condo corridors and managing the area's sloped, narrow driveways with care.",
    faq: [
      {
        q: "Do you move into the riverside condos and townhomes in Vinings?",
        a: "Yes. We coordinate elevator access and loading areas with these buildings in advance and protect shared hallways and stairwells during the move.",
      },
      {
        q: "Can you pack everything for me?",
        a: "We offer full-service packing for the whole home or specific rooms, and we unpack at your new place too.",
      },
      {
        q: "Are your estimates free of hidden fees?",
        a: "Yes. We give clear, upfront estimates with no surprise charges, for both local and long-distance moves.",
      },
    ],
  },
  {
    slug: "midtown",
    city: "Midtown Atlanta",
    full: "Midtown Atlanta, GA",
    county: "Fulton County",
    neighborhoods: ["Atlantic Station", "Piedmont Park", "Peachtree Street", "Ansley Park", "Home Park", "Tech Square"],
    intro:
      "Midtown is the dense, energetic heart of the city, packed with high-rise condos, walk-up lofts, and historic Ansley Park homes. Sobi Moving is built for the logistics of in-town moves like these. We plan around the towers, traffic, and tight streets so your move stays smooth.",
    local:
      "Midtown is dominated by high-rise condo towers and apartments along Peachtree and West Peachtree, plus older walk-up lofts and historic homes in Ansley Park and Home Park. Nearly every high-rise requires reserved freight elevators, narrow loading-dock windows, and certificates of insurance, all of which we arrange with building staff ahead of time. Street parking is scarce and traffic is constant, so precise scheduling and truck placement are essential to keep the day on track. Our crew is experienced with walk-up lofts that have no elevator, carrying carefully up and down multiple flights without damaging stairwells.",
    faq: [
      {
        q: "Can you handle a Midtown high-rise condo with strict elevator windows?",
        a: "Yes. We reserve the freight elevator and loading dock, provide the building's required certificate of insurance, and plan the move within your assigned window.",
      },
      {
        q: "What about a walk-up loft with no elevator?",
        a: "We handle walk-ups regularly. Our crew is staffed for the extra stair carries and protects railings and stairwells throughout the building.",
      },
      {
        q: "Do you move both locally and long-distance from Midtown?",
        a: "Yes, we do both, fully licensed and insured, with a careful crew handling your belongings from start to finish.",
      },
    ],
  },
  {
    slug: "cumming",
    city: "Cumming",
    full: "Cumming, GA",
    county: "Forsyth County",
    neighborhoods: ["The Collection", "Lake Lanier", "Vickery", "Polo Fields", "Sawnee Mountain", "Coal Mountain"],
    intro:
      "Cumming has boomed into a popular Forsyth County destination, with master-planned communities, lake access, and plenty of new construction. Sobi Moving serves its growing neighborhoods with friendly, full-service care. We help families settle into their Cumming homes with ease.",
    local:
      "Cumming is full of newer master-planned communities like Vickery and Polo Fields, plus lakefront and lake-access homes near Lake Lanier. Many homes are large two-story builds with basements on roomy lots, and several communities have HOA move-in procedures we coordinate ahead of time. The area's spread-out layout and distance up GA-400 make route planning and timing important for an efficient move. Our crew is equipped for big suburban homes and the long driveways and basement levels that come with them.",
    faq: [
      {
        q: "Do you serve lake-access communities and homes near Lake Lanier?",
        a: "Yes. We move throughout Cumming and Forsyth County, including lakefront and lake-access neighborhoods, and plan routes for the more spread-out properties.",
      },
      {
        q: "Can you handle a large home with a full basement?",
        a: "Definitely. Big two-story homes with basements are common here, and we staff and equip our crew to handle the volume and stair carries.",
      },
      {
        q: "Do you offer packing and unpacking services?",
        a: "We do. Our full-service options cover packing, transport, unpacking, and furniture assembly so you can settle in quickly.",
      },
    ],
  },
  {
    slug: "woodstock",
    city: "Woodstock",
    full: "Woodstock, GA",
    county: "Cherokee County",
    neighborhoods: ["Downtown Woodstock", "Towne Lake", "Woodstock Knoll", "Bradshaw Farm", "Eagle Watch", "Olde Rope Mill"],
    intro:
      "Woodstock has become a Cherokee County hotspot, anchored by a thriving downtown and the popular Towne Lake area. Sobi Moving brings dependable, full-service care to its lively new developments and established subdivisions alike. We make moving into Woodstock simple and stress-free.",
    local:
      "Woodstock pairs a walkable, fast-growing downtown full of new townhomes and apartments with large family subdivisions like Towne Lake, Eagle Watch, and Bradshaw Farm. The downtown townhomes are often multi-story with tight garages, while the subdivisions feature spacious two-story homes on wooded lots with basements. Foot traffic and event crowds around downtown Woodstock can limit parking, so we plan truck placement in advance. Our crew adapts easily between compact downtown units and big suburban homes, protecting stairs, floors, and shared walls throughout.",
    faq: [
      {
        q: "Can you move into the new townhomes in downtown Woodstock?",
        a: "Yes. We handle multi-story downtown townhomes regularly, planning parking around event crowds and protecting stairwells and shared walls during the carry.",
      },
      {
        q: "Do you serve the larger Towne Lake and Eagle Watch subdivisions?",
        a: "We do. Our crew is well-suited to big two-story homes with basements on wooded lots throughout Woodstock and Cherokee County.",
      },
      {
        q: "Are you licensed and insured with no hidden fees?",
        a: "Yes. We are fully licensed and insured, and our estimates are clear and upfront with no surprise charges.",
      },
    ],
  },
];

// Real geographic adjacency, used to cross-link the city pages.
//
// Search Console showed why this matters: the 9 cities linked from the footer
// earned 9,573 impressions, while the 6 that weren't linked from anywhere
// earned 30 between them. Internal links are the cheapest ranking lever we
// have, so every city now points at its actual neighbours instead of relying
// on the footer alone.
const NEARBY: Record<string, string[]> = {
  "sandy-springs": ["dunwoody", "roswell", "buckhead", "brookhaven"],
  roswell: ["alpharetta", "sandy-springs", "east-cobb", "johns-creek"],
  alpharetta: ["roswell", "johns-creek", "cumming", "woodstock"],
  dunwoody: ["sandy-springs", "brookhaven", "johns-creek", "roswell"],
  "johns-creek": ["alpharetta", "roswell", "cumming", "dunwoody"],
  marietta: ["east-cobb", "smyrna", "vinings", "woodstock"],
  smyrna: ["vinings", "marietta", "buckhead", "east-cobb"],
  brookhaven: ["buckhead", "dunwoody", "decatur", "sandy-springs"],
  decatur: ["brookhaven", "midtown", "buckhead", "dunwoody"],
  buckhead: ["midtown", "brookhaven", "sandy-springs", "vinings"],
  "east-cobb": ["marietta", "roswell", "woodstock", "smyrna"],
  vinings: ["smyrna", "buckhead", "marietta", "midtown"],
  midtown: ["buckhead", "decatur", "vinings", "brookhaven"],
  cumming: ["alpharetta", "johns-creek", "woodstock", "roswell"],
  woodstock: ["marietta", "east-cobb", "cumming", "alpharetta"],
};

export function nearbyLocations(slug: string): Location[] {
  return (NEARBY[slug] ?? [])
    .map((s) => LOCATIONS.find((l) => l.slug === s))
    .filter((l): l is Location => Boolean(l));
}
