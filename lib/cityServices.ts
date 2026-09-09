import { LOCATIONS, type Location } from "./locations";
import { SERVICE_TYPES, type ServiceType } from "./serviceTypes";

// City + service pages.
//
// Search Console showed "marietta commercial moving" sitting at position 10.3
// with 453 impressions, claimed by both /movers/marietta and
// /services/commercial-moving and owned by neither. It is the closest term on
// the site to page one, and nothing existed to catch it. These pages take the
// city+service intent so the city page can keep residential intent and the
// service page can keep metro-wide intent.
export type CityService = {
  citySlug: string;
  serviceSlug: string;
  h1: string;
  title: string; // the root layout appends the brand, so do not add it here
  description: string; // 130-155 chars
  answer: string; // direct answer, first thing on the page, no brand name
  headings: {
    areas: string;
    challenges: string;
    process: string;
    cost: string; // carries the primary term
    faq: string;
    reviews: string;
    cta: string;
  };
  areas: { name: string; note: string }[];
  challenges: { title: string; body: string }[];
  process: { stage: string; when: string; body: string }[];
  quoteFactors: string[];
  faq: { q: string; a: string }[];
};

export const CITY_SERVICES: CityService[] = [
  {
    citySlug: "marietta",
    serviceSlug: "commercial-moving",
    h1: "Commercial movers in Marietta, GA",
    title: "Commercial Movers in Marietta, GA",
    description:
      "Office, retail and warehouse moves in Marietta. Open 24/7 so you relocate outside trading hours. Rated 5.0 from 32 Google reviews.",
    answer:
      "A commercial move in Marietta is scheduled around the hours you are closed, not the hours you are open. That usually means an evening or a weekend, a loading dock or elevator booked with building management in advance, and every workstation labelled so it lands in the right department instead of a pile in the new space.",
    headings: {
      areas: "Where we move businesses in Marietta",
      challenges: "What slows a commercial move down here",
      process: "How an office relocation runs",
      cost: "How much does commercial moving in Marietta cost?",
      faq: "Questions from Marietta businesses",
      reviews: "What customers say",
      cta: "Planning an office move in Marietta?",
    },
    areas: [
      {
        name: "Marietta Square",
        note: "Professional offices, restaurants and retail around Glover Park. On-street loading only, and the Square's event closures land on exactly the weekends a retail move would otherwise want.",
      },
      {
        name: "Franklin Gateway",
        note: "Redeveloped office and light-industrial space along the corridor. Dock height varies a lot between buildings here, so we confirm it rather than turning up and finding out.",
      },
      {
        name: "Powers Ferry & Interstate North",
        note: "Multi-tenant office parks close to I-75. Freight elevators are shared between tenants and get booked out, which usually decides the date before anything else does.",
      },
      {
        name: "Roswell Street & Cobb Parkway",
        note: "Retail and showroom space along the main commercial arteries. Fixtures, shelving and display cases need dismantling and rebuilding rather than just carrying.",
      },
      {
        name: "Canton Road industrial",
        note: "Warehouse and light-manufacturing units. Racking, inventory and equipment move differently to desks, and the sequence matters more than the speed.",
      },
      {
        name: "Kennestone medical district",
        note: "Medical and dental practices around the hospital. Records, equipment and reception build-outs come with their own handling and access requirements.",
      },
    ],
    challenges: [
      {
        title: "The clock is the cost",
        body: "For a business the expensive part of a move is not the truck, it is the hours the doors are shut. Everything gets sequenced so the new space is usable the moment your team walks in, rather than unpacked around them over the following week.",
      },
      {
        title: "Freight elevators are shared and booked",
        body: "In the Powers Ferry and Interstate North office parks the freight elevator is shared with every other tenant and with commercial deliveries. The window you get is the window you get, so we size the crew to it instead of stretching the day.",
      },
      {
        title: "Labelling decides how fast you reopen",
        body: "Desks, monitors, files and equipment get labelled by department and destination before anything is loaded. Without that, a move that took a night to carry takes a week to sort out.",
      },
      {
        title: "The Square closes for events",
        body: "Street festivals and market days shut sections around Glover Park. For a retail or restaurant move on or near the Square, the event calendar is checked against your date at booking.",
      },
    ],
    process: [
      {
        stage: "Walk-through and quote",
        when: "Quote back the same day",
        body: "We look at both spaces, the access at each end, and what has to stay running until the last minute. You get an itemized quote back the same day with nothing added later.",
      },
      {
        stage: "Schedule around your trading hours",
        when: "Evenings and weekends",
        body: "The date is built around when you are closed. We are open 24 hours, so an overnight or weekend relocation is a normal booking rather than a special request.",
      },
      {
        stage: "Building access and labelling",
        when: "Before the move",
        body: "Freight elevator or dock booked with management, certificate of insurance provided where the building asks for one, and a labelling plan agreed by department so everything lands where it belongs.",
      },
      {
        stage: "Move and reinstate",
        when: "Outside your opening hours",
        body: "Workstations come apart and go back together, equipment is reconnected, and old furniture and packing debris are hauled away so your team walks into a working space.",
      },
    ],
    quoteFactors: [
      "Headcount and how many workstations come apart and go back together",
      "Whether the move runs overnight, at a weekend, or across several phases",
      "Freight elevator or dock access, and the length of the window each building allows",
      "Specialist equipment: servers, medical or dental kit, machinery, safes",
      "Retail fixtures, shelving and display cases that need dismantling",
      "Whether old furniture and fit-out debris are cleared as part of the job",
      "How much is packed and labelled by your team before we arrive",
    ],
    faq: [
      {
        q: "Can you move our office overnight so we do not lose a trading day?",
        a: "Yes, and it is the usual pattern. We are open 24 hours, so overnight and weekend relocations are standard bookings. The schedule is built backwards from the hour you need to reopen.",
      },
      {
        q: "How much does commercial moving in Marietta cost?",
        a: "There is no flat rate, because headcount, access windows and equipment change the job far more than floor area does. Tell us both addresses, your headcount and when you need to be trading again, and you get an itemized quote back the same day with no hidden fees.",
      },
      {
        q: "Do you handle the certificate of insurance our building requires?",
        a: "Yes. We provide the certificate naming your building's management company and book the freight elevator or loading dock with them ahead of the move.",
      },
      {
        q: "Can you move IT equipment and reconnect workstations?",
        a: "We disconnect, transport and reconnect desks, monitors and standard office equipment, and everything is labelled by department so it lands in the right place. For specialist servers or medical equipment tell us in advance so it is handled correctly.",
      },
      {
        q: "Do you move retail stores and warehouses, or only offices?",
        a: "Both. Retail fixtures, shelving and display cases get dismantled and rebuilt, and warehouse moves are sequenced around racking and inventory so the new space comes online in a usable order.",
      },
      {
        q: "Can you clear out the furniture we are not taking?",
        a: "Yes. Old furniture, fit-out debris and packing materials can be hauled away as part of the job, which usually matters for handing the old space back.",
      },
    ],
  },
];

export function findCityService(citySlug: string, serviceSlug: string) {
  const cs = CITY_SERVICES.find((x) => x.citySlug === citySlug && x.serviceSlug === serviceSlug);
  if (!cs) return null;
  const location = LOCATIONS.find((l) => l.slug === citySlug);
  const service = SERVICE_TYPES.find((s) => s.slug === serviceSlug);
  if (!location || !service) return null;
  return { cs, location, service } as { cs: CityService; location: Location; service: ServiceType };
}
