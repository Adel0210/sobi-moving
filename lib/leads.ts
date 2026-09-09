// Shared between the two public forms and the notification route.
//
// The label maps live here rather than in each page so the owner's email reads
// back the same wording the customer saw on the form. A lead that says
// "white-glove" instead of "White Glove Setup" costs a phone call to decode.

export type LeadType = "contact" | "quote";

// Mirrors the columns of the `leads` table that the public forms write. Every
// field past `name` is optional because the contact form and the quote form
// fill in different halves of the row.
export type LeadPayload = {
  type: LeadType;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  move_size?: string | null;
  move_distance?: string | null;
  move_type?: string | null;
  move_date?: string | null;
  from_zip?: string | null;
  to_zip?: string | null;
  services?: string[] | null;
  estimate_low?: number | null;
  estimate_high?: number | null;
};

export const SIZE_LABELS: Record<string, string> = {
  studio: "Studio",
  "1br": "1 Bedroom",
  "2br": "2 Bedroom",
  "3br": "3 Bedroom",
  "4br": "4+ Bedroom",
};

export const DISTANCE_LABELS: Record<string, string> = {
  local: "Local, same city or under 20 mi",
  metro: "Atlanta metro, 20 to 60 mi",
  long: "Long distance, out of state",
};

export const MOVE_TYPE_LABELS: Record<string, string> = {
  regular: "Just moving",
  senior: "Helping a parent move",
  office: "Office or commercial",
};

export const SERVICE_LABELS: Record<string, string> = {
  packing: "Full Packing",
  "white-glove": "White Glove Setup",
  unpack: "Unpacking",
  junk: "Junk Removal",
  assembly: "Furniture Assembly",
};

export const SUBJECT_LABELS: Record<string, string> = {
  general: "General question",
  quote: "I want a quote",
  senior: "Planning a senior move",
  community: "Community or care team partnership",
  other: "Something else",
};

// Falls back to the raw stored value so an option added to a form later still
// shows up in the email instead of vanishing.
export function labelFor(map: Record<string, string>, value: string | null | undefined): string | null {
  if (!value) return null;
  return map[value] ?? value;
}

/**
 * Hand the lead to the notification route.
 *
 * Deliberately swallows every failure. The row in `leads` is the record of
 * truth, so a dead notification must never surface to the person filling in
 * the form, and must never be awaited on the path to their confirmation screen.
 */
export async function notifyLead(lead: LeadPayload, stored: boolean): Promise<void> {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead, stored }),
      // keepalive so the request still leaves the browser if the visitor
      // closes the tab the moment the confirmation screen appears.
      keepalive: true,
    });
  } catch {
    /* best effort only: the lead is already saved */
  }
}
