import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = process.env.OUT;
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args:["--no-sandbox"] });
for (const [name, w, h] of [["login-desk",1280,860],["login-mob",390,800]]) {
  const p = await b.newPage();
  await p.setViewport({ width:w, height:h, deviceScaleFactor:1 });
  await p.goto("http://localhost:3000/admin/login", { waitUntil:"networkidle0" });
  await p.screenshot({ path: `${OUT}/${name}.png` });
  await p.close();
}
await b.close();
console.log("login screenshots done");
