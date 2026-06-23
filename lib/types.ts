export type Lead = {
  id: string;
  created_at: string;
  type: string; // 'contact' | 'quote'
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  move_size: string | null;
  move_distance: string | null;
  move_type: string | null;
  move_date: string | null;
  from_zip: string | null;
  to_zip: string | null;
  services: string[] | null;
  estimate_low: number | null;
  estimate_high: number | null;
  details: Record<string, unknown> | null;
  status: string; // 'new' | 'contacted' | 'quoted' | 'booked' | 'won' | 'lost'
  source: string;
};

export type LeadNote = {
  id: string;
  created_at: string;
  lead_id: string;
  author: string | null;
  kind: string; // 'note' | 'call' | 'email' | 'stage' | 'system'
  body: string;
};

export type Booking = {
  id: string;
  created_at: string;
  lead_id: string | null;
  customer_name: string | null;
  email: string | null;
  phone: string | null;
  move_date: string | null;
  time_window: string | null;
  from_address: string | null;
  to_address: string | null;
  crew: string | null;
  amount: number | null;
  status: string; // 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  notes: string | null;
};

export type FaqItem = { q: string; a: string };
export type Source = { label: string; url: string };

export type Post = {
  id: string;
  created_at: string;
  updated_at: string;
  // content
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null; // markdown
  cover_image: string | null;
  cover_alt: string | null;
  author_name: string | null;
  author_bio: string | null;
  author_credentials: string | null;
  category: string | null;
  tags: string[] | null;
  // publishing
  status: string; // 'draft' | 'published'
  published_at: string | null;
  reviewed_at: string | null;
  reading_minutes: number | null;
  // SEO
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  focus_keyword: string | null;
  noindex: boolean | null;
  og_image: string | null;
  // GEO / AEO
  tldr: string | null;
  key_takeaways: string[] | null;
  faq: FaqItem[] | null;
  sources: Source[] | null;
  service_area: string | null;
};

export type Task = {
  id: string;
  created_at: string;
  lead_id: string | null;
  title: string;
  due_date: string | null;
  done: boolean;
  assignee: string | null;
};
