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
        cost: "How much do movers in Sandy Springs cost?",
        services: "What a relocation specialist in Sandy Springs actually does",
        nearby: "We also cover the northern Perimeter",
        faq: "Questions from Perimeter and City Springs",
        reviews: "What people say after the truck leaves",
        cta: "Ready when your building is",
      },
      answer:
        "Sandy Springs is the densest mix of building types in the metro. A relocation here can mean a Perimeter high-rise with a booked loading dock and a certificate of insurance, a gated estate off the Chattahoochee, or a 1960s split-level on a steep wooded lot. The building decides the plan more than the address does.",
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
          body: "More of Sandy Springs is elevator-access than anywhere else we work. Buildings require a booked freight elevator, a protected lobby route and a certificate of insurance naming the management company. We arrange all three in advance, because a move that turns up without them does not start.",
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
          body: "The interchange is the busiest point in the metro at peak, and almost every route in Sandy Springs touches it. Load and travel times are planned around the peak rather than through it.",
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
        cost: "How much do movers in Roswell cost?",
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
        cost: "How much do movers in East Cobb cost?",
        services: "Find the right East Cobb service",
        nearby: "We also cover the rest of Cobb County",
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
          note: "School zones drive both prices and timing here. Families move to land inside a specific zone before the year starts, which makes late July and early August the tightest booking window of the year.",
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
