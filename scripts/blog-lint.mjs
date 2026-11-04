// House lint for repo-authored blog posts (lib/posts/*.ts). Deterministic checks
// only; it cannot judge whether a fact is true. Usage: node scripts/blog-lint.mjs [files...]
import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

const BANNED = ["delve", "navigate", "crucial", "comprehensive", "in today's fast-paced world", "look no further", "at the end of the day", "seamless", "elevate", "unlock", "game-changer", "robust", "leverage"];
const files = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync("lib/posts").filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => `lib/posts/${f}`);

let failed = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  // Evaluate the literal without the type import.
  const js = src.replace(/import type .*\n/, "").replace("export const post: StaticPost =", "export const post =");
  const mod = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
  const p = mod.post;
  const body = p.body ?? "";
  const words = body.replace(/[#*>`\-]/g, " ").split(/\s+/).filter(Boolean).length;
  const links = [...new Set([...body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]))];
  const h2s = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  const kw = (p.focus_keyword ?? "").toLowerCase();
  const first50 = body.split(/\s+/).slice(0, 50).join(" ").toLowerCase();
  const firstPara = body.split(/\n\s*\n/)[0] ?? "";
  const lower = body.toLowerCase();
  const kwCount = kw ? lower.split(kw).length - 1 : 0;
  const checks = [
    ["words >= 1300", words >= 1300, words],
    ["internal links >= 6 unique (house target 8)", links.length >= 6, links.length],
    ["meta_title <= 60", (p.meta_title ?? "").length <= 60, (p.meta_title ?? "").length],
    ["meta_description 130-160", (p.meta_description ?? "").length >= 130 && (p.meta_description ?? "").length <= 160, (p.meta_description ?? "").length],
    ["title <= 65", (p.title ?? "").length <= 65, (p.title ?? "").length],
    ["no H1 in body", !/^# /m.test(body), ""],
    ["no em dash / curly quotes", !/[—‘’“”]/.test(JSON.stringify(p)), ""],
    ["no brand in first paragraph", !/sobi/i.test(firstPara), ""],
    ["keyphrase in first 50 words", kw && first50.includes(kw), kw],
    ["keyphrase in an H2", kw && h2s.some((h) => h.toLowerCase().includes(kw)), ""],
    ["keyphrase in meta_title", kw && (p.meta_title ?? "").toLowerCase().includes(kw.split(" ")[0]), ""],
    ["keyphrase used 3-8 times", kwCount >= 3 && kwCount <= 8, kwCount],
    ["banned words", !BANNED.some((b) => lower.includes(b)), BANNED.filter((b) => lower.includes(b)).join(",")],
    ["faq 3-5", (p.faq ?? []).length >= 3 && (p.faq ?? []).length <= 5, (p.faq ?? []).length],
    ["sources >= 2", (p.sources ?? []).length >= 2, (p.sources ?? []).length],
    ["cover image set", !!p.cover_image && !!p.cover_alt, p.cover_image ?? "none"],
    ["published_at ISO", /^\d{4}-\d{2}-\d{2}T/.test(p.published_at ?? ""), p.published_at],
  ];
  console.log(`\n${f}`);
  for (const [name, ok, info] of checks) {
    if (!ok) failed++;
    console.log(`  ${ok ? "ok  " : "FAIL"} ${name}${info !== "" ? `  (${info})` : ""}`);
  }
}
process.exit(failed ? 1 : 0);
