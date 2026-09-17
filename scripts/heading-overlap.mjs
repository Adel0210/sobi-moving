// Reports how many section headings each built-out city shares with any
// sibling. Grader threshold used during the Phase B rollout: keep overlap
// under 20% so the pages do not read as one template with the city swapped.
import { readFileSync } from "node:fs";
const src = readFileSync(new URL("../lib/locations.ts", import.meta.url), "utf8");
const cities = [...src.matchAll(/slug: "([a-z-]+)",[\s\S]*?(?=\n  \{\n    slug: "|\n\];)/g)].map((m) => {
  const block = m[0];
  const h = block.match(/headings: \{([\s\S]*?)\n\s*\},/);
  if (!h) return null;
  const vals = [...h[1].matchAll(/:\s*"([^"]+)"/g)].map((x) => x[1].toLowerCase());
  return { slug: m[1], vals };
}).filter(Boolean);
let worst = 0;
for (const a of cities) {
  const others = new Set(cities.filter((c) => c !== a).flatMap((c) => c.vals));
  const shared = a.vals.filter((v) => others.has(v));
  const pct = Math.round((shared.length / a.vals.length) * 100);
  worst = Math.max(worst, pct);
  console.log(`${a.slug.padEnd(14)} ${pct}%${shared.length ? "  shared: " + shared.join(" | ") : ""}`);
}
console.log(worst < 20 ? "OK: all under 20%" : "FAIL: overlap at or above 20%");
process.exit(worst < 20 ? 0 : 1);
