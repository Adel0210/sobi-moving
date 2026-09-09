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
        opens: "00:00",
        closes: "23:59",
      },
    ],
    // Mirrors the real Google Business Profile (5.0 from 32 reviews). Keep this
    // in step with the profile — an inflated count is a manual-action risk, and
    // Google expects the same reviews to be visible on the page.
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "32", bestRating: "5" },
    // Ties the site to the profiles Google already knows about, so the website
    // and the Business Profile are understood as the same entity. Nothing
    // linked these before, which is most of why the domain reads as unknown.
    sameAs: [
      "https://maps.google.com/?cid=7966170982154440477",
      "https://www.yelp.com/biz/sobi-moving-sandy-springs-2",
      "https://www.instagram.com/sobimoving/",
      "https://www.mapquest.com/us/georgia/sobi-moving-796212179",
    ],
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
