// Real Google Business Profile reviews, read from the live profile on 2026-09-08.
// Only reviews that actually exist go in here — the aggregateRating in
// lib/schema.ts claims 5.0 from 32 reviews, and Google expects the reviews
// behind an aggregate rating to be visible on the page.
//
// The other 29 still need pulling from the GBP dashboard.
export type Review = {
  author: string;
  body: string;
  when: string; // as displayed on the profile
  rating: 5;
};

export const REVIEWS: Review[] = [
  {
    author: "Diego Cantu",
    body: "Moved me from Atlanta to San Diego, great service, great communication and everything arrived to my new home perfectly safe. 10/10 would recommend",
    when: "4 months ago",
    rating: 5,
  },
  {
    author: "Shirin Sobi",
    body: "Amazing work with excellent customer service. Helped me move a 2 story home. I recommend them to everyone!",
    when: "4 months ago",
    rating: 5,
  },
  {
    author: "James Monk",
    body: "Great company! Can't say enough about their work ethic and drive. Highly recommended!",
    when: "a month ago",
    rating: 5,
  },
];

export const GBP_URL = "https://maps.google.com/?cid=7966170982154440477";
export const REVIEW_COUNT = 32;
export const REVIEW_RATING = "5.0";

// Themes Google itself extracted from the 32 reviews, with the number of
// reviews mentioning each. Useful as messaging — it is what customers say
// unprompted, rather than what we would like them to say.
export const REVIEW_THEMES = [
  { theme: "smooth process", count: 5 },
  { theme: "careful handling", count: 4 },
  { theme: "reliable moving company", count: 2 },
  { theme: "justified pricing", count: 2 },
];
