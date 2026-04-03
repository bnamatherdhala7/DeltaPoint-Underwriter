import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Find next available screenshot number
let n = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${n}${label ? '-' + label : ''}.png`))) {
  n++;
}
const filename = `screenshot-${n}${label ? '-' + label : ''}.png`;
const filepath = path.join(screenshotDir, filename);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

// Trigger scroll-reveal animations by scrolling through the page
await page.evaluate(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const scrollHeight = document.body.scrollHeight;
  for (let y = 0; y < scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await sleep(80);
  }
  window.scrollTo(0, 0);
  await sleep(300);
});

await page.screenshot({ path: filepath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: temporary screenshots/${filename}`);
