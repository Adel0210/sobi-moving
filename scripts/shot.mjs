import puppeteer from "puppeteer-core";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT=process.env.OUT;
const b=await puppeteer.launch({executablePath:CHROME,headless:true,args:["--no-sandbox"]});
for (const [n,path,w] of [["fix-quote","/quote",1280],["fix-services","/services",1280],["fix-home","/",1280]]) {
  const p=await b.newPage(); await p.setViewport({width:w,height:900,deviceScaleFactor:1});
  await p.goto("http://localhost:3000"+path,{waitUntil:"networkidle0"});
  await p.screenshot({path:`${OUT}/${n}.png`, fullPage:true});
  await p.close();
}
await b.close(); console.log("shots done");
