# Our Work — how the job clips work

The page at `/our-work` is the site's proof of work: the same footage the owner
posts to Instagram, but served from our own storage.

**It does not talk to Instagram.** Nothing here calls a Meta API, there is no
Meta developer app, no OAuth token and no Instagram embed script. Read
"Why not pull from Instagram" at the bottom if you want the reasoning.

---

## Adding a clip (the normal path — no developer needed)

1. **Export the clip from the phone.** Save the original video, not a
   screen recording. MP4 (H.264 video + AAC audio) plays everywhere; a `.mov`
   straight off an iPhone usually works too but MP4 is safer.
2. **Trim it.** 15–45 seconds. Nobody watches a three-minute moving video, and
   a long file is a slow page.
3. **Make a still frame.** Take a screenshot of the best frame, or use the
   video's own cover. Portrait, roughly 720 × 1280. Save it as a JPEG under
   about 150 KB — this image loads for every visitor whether or not they press
   play, so it is the one file worth compressing properly.
4. **Go to `/admin/work`** and press **New clip**.
5. Upload the video and the still, fill in the title, the description, the city
   and the date filmed, then set the status to **Published** and save.
6. The public page picks it up **within an hour** (it rebuilds hourly), or
   immediately after the next deploy.

### Writing the title and description

These are not decoration. They go into the page's `VideoObject` structured data,
which is how Google decides whether the clip counts as video at all.

- **Title** — what the job actually was. *"Third-floor walk-up in Midtown"*
  beats *"Another happy customer"*. Every clip needs a different title.
- **Description** — one to three sentences telling the visitor what they are
  about to watch, and why it is worth watching. Say the real thing:
  *"A two-bedroom carried down three flights with no elevator. Watch the
  blanket-wrap go on before anything leaves the apartment."*
- **Date filmed** — becomes `uploadDate`. Google treats this as required.
- Do not write a claim the footage does not show.

### Music

If a clip has a commercial track over it, mute it or replace the audio before
uploading. Instagram has licensing deals for music inside Instagram. Your
website does not, and the file is being served from our own domain.

---

## Where the files live

| Thing | Where | Why |
|---|---|---|
| Video files and stills | Supabase Storage, `media` bucket, `work/` folder | Uploaded from the admin panel. |
| Clip records (title, description, city, order, status) | Supabase, `work_clips` table | Editable at `/admin/work`. |
| Fallback clips | `lib/workClips.ts` → `WORK_CLIP_SEED` | Only used if the table is missing or empty. Currently empty on purpose. |

**Video files are deliberately not committed to this repo.** The repo is public
and Git stores video badly — it cannot delta-compress it, so every MP4 ever
added stays in the clone size forever. Storage handles it, and the admin panel
uploads there already.

If you would rather a clip lived in the repo anyway (for example a short,
heavily-compressed hero clip), put it in `public/work/` and add it to
`WORK_CLIP_SEED` in `lib/workClips.ts` with `src: "/work/name.mp4"`.

## Setting up the table (one time)

Run this against the Supabase project, in the SQL editor:

```sql
create table if not exists public.work_clips (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  description      text not null default '',
  src              text not null,
  poster           text not null,
  city             text,
  service          text,
  duration_seconds integer,
  filmed_on        date,
  sort_order       integer not null default 0,
  status           text not null default 'draft'
                     check (status in ('draft', 'published')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists work_clips_published_idx
  on public.work_clips (status, sort_order);

alter table public.work_clips enable row level security;

-- The public site reads published clips with the anon key, and nothing else.
create policy "work_clips public read published"
  on public.work_clips for select
  to anon
  using (status = 'published');

-- Signed-in admins do everything. Mirrors the policy on the posts table.
create policy "work_clips admin all"
  on public.work_clips for all
  to authenticated
  using (true)
  with check (true);
```

The `media` storage bucket already exists (the blog uses it). If video uploads
fail, check the bucket's per-file size limit in Supabase — the default is small
and moving clips are tens of megabytes.

---

## How the page is built

- `app/(site)/our-work/page.tsx` — the page. Rebuilt hourly (`revalidate = 3600`),
  so it is static for every visitor.
- `app/components/WorkClipPlayer.tsx` — one clip. A plain `<video>` with
  `preload="none"`: zero JavaScript, and zero bytes of video until the visitor
  presses play.
- `lib/workClips.ts` — the type, the fallback seed, and the Supabase read.
  Every failure path returns the seed, so the page cannot break.
- `app/(site)/our-work/work.css` — page styles, brand tokens only.
- `app/sitemap.ts` — `/our-work` is submitted **only once it has at least one
  published clip.** An empty proof page is a thin page.

### Why `<video preload="none">` and not a click-to-load poster

A poster that swaps itself for a `<video>` on tap is slightly lighter. It is
also invisible to Google, which states plainly that a page must not rely on a
click to load the video and that the video has to be measurable in the rendered
HTML. Since the whole SEO point of this page is video indexing, the video
element stays in the HTML and `preload="none"` does the saving instead.

The one cost: the browser fetches every poster image up front, because a
`<video>` poster cannot be lazy-loaded. Keep posters small, and keep the page to
roughly 6–9 clips. Past that, the next move is a second page, not more rows.

---

## Why not pull from Instagram

All four options were checked as of **2026-09-30**. Summary of why each was
rejected:

**Instagram API with Instagram Login** — works, and does *not* need App Review
for the owner's own account, but it needs a Meta developer app created under the
owner's personal Meta account, and its access token lives 60 days. Miss a
refresh and the feed stops; there is no automatic recovery, only redoing the
OAuth flow by hand. Worse, the `media_url` it returns is a signed CDN link that
expires in **hours** — so you cannot put it in a static page at all. You would
have to download the bytes at build time and serve them yourself, which is the
self-hosted setup above, plus a token to babysit.

**Facebook Graph API via a linked Page** — same as above and strictly more
fragile: it additionally requires the Instagram account to stay linked to a
Facebook Page, which is one more thing that can quietly come undone.

**Instagram oEmbed / the embed script** — no token needed any more (Meta made
oEmbed tokenless again around mid-2026), so it is the cheapest to set up. It was
still rejected on three counts. It costs roughly **1.9 MB of third-party
JavaScript** from a domain we do not control, on a site whose performance rules
exist for a reason. Meta decides at runtime whether the embed renders a player
or a "View on Instagram" card, so the page can degrade to a dead link without
anybody touching it. And the video earns **no indexing credit**: the bytes live
behind Instagram's robots.txt, and Google only indexes video on pages where the
video is the main content and the file is fetchable.

**Self-hosting curated clips** — chosen. No account, no app, no token, no
review, nothing that expires. The footage is the owner's own property, so
Meta's platform terms never enter the picture. It is the only option that
produces a real `contentUrl` for Google, and the only one that still works in
two years without anybody remembering to do anything.

The cost is honest: **somebody has to export and upload the clips.** That is the
whole maintenance burden, and it is a burden that only appears when there is new
footage worth showing.
