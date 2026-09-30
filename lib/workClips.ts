import { supabasePublic } from "@/lib/supabase/public";

/**
 * Job clips for /our-work — the "proof of work" page.
 *
 * These are the same clips the owner posts to Instagram, but the files are
 * OURS: exported from the phone, uploaded through the admin panel, and served
 * from our own storage. Nothing here calls an Instagram or Meta API, and
 * nothing here needs a developer once a clip exists.
 *
 * Why not pull straight from Instagram: see docs/work-proof.md. Short version —
 * every Instagram API route needs a Meta developer app, App Review and a token
 * that expires, and the media URLs it hands back expire too, so the page would
 * eventually go blank on its own. A file we host does not.
 *
 * Source of truth, in order:
 *   1. the `work_clips` table in Supabase (edited at /admin/work), when present
 *   2. WORK_CLIP_SEED below, as the fallback so the page can never break
 *
 * This is the same defaults-plus-overrides shape as lib/content.ts.
 */
export type WorkClip = {
  /** Stable id. Used for the anchor, the React key and the JSON-LD @id. */
  slug: string;
  /** Headline for the clip. Specific beats clever: "Third-floor walk-up, Midtown". */
  title: string;
  /** One to three sentences saying what the visitor is actually watching. */
  description: string;
  /** Public URL of the video file (mp4, H.264 + AAC — plays everywhere). */
  src: string;
  /**
   * Public URL of the still frame shown before play. Required: without it the
   * card is an empty grey box, and Google will not treat the clip as a video.
   */
  poster: string;
  /** Metro Atlanta city the job was in, when it is known. Shown as a tag. */
  city?: string;
  /** Slug from lib/serviceTypes.ts, so the card can link to the service page. */
  service?: string;
  /** Clip length in seconds. Feeds VideoObject.duration. */
  durationSeconds?: number;
  /** ISO date (YYYY-MM-DD) the job was filmed. Feeds VideoObject.uploadDate. */
  filmedOn?: string;
};

/**
 * Curated fallback clips.
 *
 * DELIBERATELY EMPTY. Real job footage has to come from the owner — inventing a
 * caption for a move that may not have happened is exactly the kind of claim
 * this site does not make. Add clips at /admin/work (preferred), or paste them
 * here if you would rather they live in the repo.
 *
 * The shape, for reference:
 *
 *   {
 *     slug: "midtown-third-floor-walkup",
 *     title: "Third-floor walk-up in Midtown",
 *     description:
 *       "A two-bedroom carried down three flights with no elevator. Watch the
 *        blanket-wrap go on before anything leaves the apartment.",
 *     src: "https://<project>.supabase.co/storage/v1/object/public/media/work/midtown.mp4",
 *     poster: "https://<project>.supabase.co/storage/v1/object/public/media/work/midtown.jpg",
 *     city: "Midtown",
 *     service: "residential-moving",
 *     durationSeconds: 34,
 *     filmedOn: "2026-08-14",
 *   }
 */
export const WORK_CLIP_SEED: WorkClip[] = [];

/** A clip with no file or no still frame renders as a broken box — drop it. */
function isPublishable(clip: WorkClip): boolean {
  return Boolean(clip.slug && clip.title && clip.src.trim() && clip.poster.trim());
}

type ClipRow = {
  slug: string | null;
  title: string | null;
  description: string | null;
  src: string | null;
  poster: string | null;
  city: string | null;
  service: string | null;
  duration_seconds: number | null;
  filmed_on: string | null;
};

function fromRow(row: ClipRow): WorkClip {
  return {
    slug: row.slug ?? "",
    title: row.title ?? "",
    description: row.description ?? "",
    src: row.src ?? "",
    poster: row.poster ?? "",
    city: row.city ?? undefined,
    service: row.service ?? undefined,
    durationSeconds: row.duration_seconds ?? undefined,
    filmedOn: row.filmed_on ?? undefined,
  };
}

/**
 * Published clips, newest first.
 *
 * Every failure path returns the seed rather than throwing: a Supabase outage,
 * a missing table or a bad row must never take the page down, exactly as
 * getContent() does for site copy.
 */
export async function getWorkClips(): Promise<WorkClip[]> {
  try {
    const { data, error } = await supabasePublic
      .from("work_clips")
      .select("slug,title,description,src,poster,city,service,duration_seconds,filmed_on")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("filmed_on", { ascending: false });

    if (error || !data || data.length === 0) return WORK_CLIP_SEED.filter(isPublishable);
    return (data as ClipRow[]).map(fromRow).filter(isPublishable);
  } catch {
    return WORK_CLIP_SEED.filter(isPublishable);
  }
}

/** ISO 8601 duration for VideoObject.duration — 94 seconds becomes "PT1M34S". */
export function isoDuration(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `PT${minutes ? `${minutes}M` : ""}${rest || !minutes ? `${rest}S` : ""}`;
}

/** "0:34" for the badge on the card. */
export function clockDuration(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}
