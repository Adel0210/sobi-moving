import { CONTENT_DEFAULTS, type SiteContent } from "./content";

const SITE = "https://www.sobimoving.com";

const SERVICE_AREAS = [
  "Sandy Springs", "Alpharetta", "Roswell", "Marietta", "Dunwoody",
  "Brookhaven", "Decatur", "Buckhead", "Midtown", "East Cobb",
  "Johns Creek", "Smyrna", "Vinings", "Cumming", "Woodstock",
];

// schema.org MovingCompany (a LocalBusiness subtype). Helps Google rich results
// + AI answer engines understand Sobi Moving as an Atlanta moving company.
export function movingCompanySchema(c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE}/#business`,
    name: "Sobi Moving",
    description:
      "Local and long-distance movers serving metro Atlanta — full-service moving, white-glove setup, packing, unpacking, furniture assembly, junk removal, and senior moving.",
    url: SITE,
    logo: `${SITE}/assets/logo.png`,
    image: `${SITE}/assets/logo.png`,
    telephone: c.phone_display ?? CONTENT_DEFAULTS.phone_display,
    email: c.email ?? CONTENT_DEFAULTS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2208 Treelodge Pkwy",
      addressLocality: "Sandy Springs",
      addressRegion: "GA",
      postalCode: "30350",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 33.9304, longitude: -84.3733 },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name: `${name}, GA` })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:30",
        closes: "20:00",
      },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "100", bestRating: "5" },
    knowsAbout: [
      "Local moving", "Long distance moving", "Senior moving", "Packing services",
      "White glove setup", "Furniture assembly", "Junk removal",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: [
        "Full Moving Service", "White Glove Setup", "Full Packing",
        "Unpacking Services", "Furniture Assembly", "Junk Removal",
      ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
    },
  };
}
