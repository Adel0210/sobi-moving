import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args:["--no-sandbox"] });
const p = await b.newPage();
await p.goto("http://localhost:3000/quote", { waitUntil:"networkidle0" });
const clickByText = async (txt) => { await p.evaluate((t)=>{ const el=[...document.querySelectorAll("button")].find(b=>b.textContent.trim().startsWith(t)); el && el.click(); }, txt); await new Promise(r=>setTimeout(r,400)); };
await clickByText("Continue");      // step 1 -> 2
await clickByText("Continue");      // step 2 -> 3
await p.type('input[placeholder="Jane Smith"]', "TEST Quote — Claude");
await p.type('input[placeholder="jane@example.com"]', "test+quote@sobimoving.com");
await p.type('input[placeholder="(404) 555-0123"]', "(404) 555-0001");
await clickByText("Send my quote request");
await new Promise(r=>setTimeout(r,2500));
const txt = await p.evaluate(()=>document.body.innerText);
console.log(txt.includes("Quote request received") ? "RESULT: SUCCESS — quote lead saved" : txt.includes("something went wrong") ? "RESULT: ERROR shown" : "RESULT: UNKNOWN");
await b.close();
