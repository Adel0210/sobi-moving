export type Location = {
  slug: string; // url slug, e.g. "sandy-springs"
  city: string; // "Sandy Springs"
  full: string; // "Sandy Springs, GA"
  county: string; // "Fulton County"
  neighborhoods: string[]; // 4-6 real neighborhoods/landmarks in that city
  intro: string; // 2-3 sentence UNIQUE intro for the city's moving page
  local: string; // 1 paragraph (~3-4 sentences) about what moving IN/TO this specific city is like
  faq: { q: string; a: string }[]; // 3 Q&As, at least one city-specific
};

export const LOCATIONS: Location[] = [
  {
    slug: "sandy-springs",
    city: "Sandy Springs",
    full: "Sandy Springs, GA",
    county: "Fulton County",
    neighborhoods: ["City Springs", "Sandy Springs Heights", "High Point", "Riverside", "Dunwoody Springs", "Huntcliff"],
    intro:
      "Sandy Springs sits right along the Chattahoochee with a mix of established mid-century homes and sleek new builds around City Springs. Sobi Moving knows these streets, and we handle every move here with the same careful, full-service approach. From a townhome near GA-400 to a riverside estate, we make the day feel easy.",
    local:
      "Moving in Sandy Springs means navigating everything from gated communities like Huntcliff to busy condo corridors near Roswell Road and the Perimeter office district. Many homes here are split-levels and ranches on wooded, sloping lots, so our crew comes ready for steep driveways and long carries. The newer mixed-use buildings around City Springs often require elevator reservations and certificate-of-insurance paperwork, which we handle for you in advance. We also time loading around the GA-400 and I-285 crunch so the truck is never stuck while the clock runs.",
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
      "Decatur is famously walkable, with a charming square, historic bungalows, and a tight-knit, community feel. Sobi Moving knows how to navigate its narrow streets and beloved older homes with care. We bring a full-service, neighborly approach to every move in this distinctive city.",
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
      "Midtown is the dense, energetic heart of the city, packed with high-rise condos, walk-up lofts, and historic Ansley Park homes. Sobi Moving is built for the logistics of in-town moves like these. We navigate the towers, traffic, and tight streets so your move stays smooth.",
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
