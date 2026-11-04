// Cover photos for blog posts, from Pexels (license: free for commercial use,
// no attribution required; credits are still recorded in public/blog/credits.json).
//
//   node scripts/pexels-cover.mjs search "<query>"          list candidates
//   node scripts/pexels-cover.mjs fetch <slug> <photoId>     download + brand-grade to public/blog/<slug>.jpg
//
// Reads PEXELS_API_KEY from .env.local. Output is 1600x900 JPEG with a light
// warm grade so stock photos sit inside the site's cream and terracotta palette.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
const KEY = env.PEXELS_API_KEY;
if (!KEY) throw new Error("PEXELS_API_KEY missing from .env.local");
const H = { Authorization: KEY };
const OUT = new URL("../public/blog/", import.meta.url);
const CREDITS = new URL("../public/blog/credits.json", import.meta.url);

const [cmd, a, b] = process.argv.slice(2);

if (cmd === "search") {
  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(a)}&orientation=landscape&per_page=${b || 12}`, { headers: H });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  const j = await r.json();
  for (const p of j.photos) console.log(`${p.id}\t${p.width}x${p.height}\t${p.avg_color}\t${p.photographer}\t${p.alt?.slice(0, 90)}`);
} else if (cmd === "fetch") {
  const slug = a, id = b;
  const r = await fetch(`https://api.pexels.com/v1/photos/${id}`, { headers: H });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  const p = await r.json();
  const img = await fetch(p.src.large2x).then((x) => x.arrayBuffer());
  mkdirSync(OUT, { recursive: true });
  // Light warm cast: a 10% terracotta-cream layer over a slightly desaturated
  // photo. Enough to sit in the palette, not enough to read as a filter.
  const warm = await sharp({ create: { width: 1600, height: 900, channels: 4, background: { r: 196, g: 120, b: 80, alpha: 0.10 } } }).png().toBuffer();
  await sharp(Buffer.from(img))
    .resize(1600, 900, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.82, brightness: 1.02 })
    .composite([{ input: warm, blend: "over" }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(new URL(`${slug}.jpg`, OUT).pathname);
  const credits = existsSync(CREDITS) ? JSON.parse(readFileSync(CREDITS, "utf8")) : {};
  credits[slug] = { pexels_id: p.id, photographer: p.photographer, url: p.url, alt: p.alt };
  writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + "\n");
  console.log(`wrote public/blog/${slug}.jpg  (${p.photographer}, ${p.url})`);
} else {
  console.log("usage: search <query> [n] | fetch <slug> <photoId>");
}
