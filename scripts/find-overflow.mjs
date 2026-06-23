import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE || "http://localhost:3001";
const pages = ["/", "/quote", "/contact", "/senior-moving"];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});

for (const path of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 1 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  const result = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.width > vw + 1) {
        // skip if an ancestor already reported wider (keep it simple: report all, we'll read top ones)
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString ? el.className.toString() : "").slice(0, 60),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    });
    return { vw, scrollW: document.documentElement.scrollWidth, offenders };
  });
  const shotName = path === "/" ? "home" : path.replace(/\//g, "");
  await page.screenshot({ path: `${process.env.OUT}/acc-${shotName}.png`, fullPage: true });
  console.log(`\n=== ${path}  (viewport ${result.vw}, scrollWidth ${result.scrollW}) ===`);
  // show the narrowest offenders first (likely the leaf cause), de-dupe-ish
  result.offenders
    .sort((a, b) => a.width - b.width)
    .slice(0, 14)
    .forEach((o) => console.log(`  ${o.tag}.${o.cls}  right=${o.right} width=${o.width}`));
  await page.close();
}
await browser.close();
