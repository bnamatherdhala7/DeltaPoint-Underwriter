# DeltaPoint — Getting Started

Everything you need to run DeltaPoint locally, take screenshots, and understand the project layout.

---

## Prerequisites

| Tool | Minimum version | Check |
|---|---|---|
| Node.js | 18+ | `node --version` |
| npm | 8+ | `npm --version` |
| A modern browser | Chrome / Firefox / Safari | — |

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/bnamatherdhala7/DeltaPoint-Underwriter.git
cd DeltaPoint-Underwriter

# 2. Install dependencies (only needed for the screenshot utility)
npm install

# 3. Start the local server
node serve.mjs
```

You should see:
```
Server running at http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## Local Server

The `serve.mjs` file is a lightweight Node.js HTTP server. It:
- Serves all files from the project root
- Handles all MIME types (HTML, CSS, JS, PNG, SVG, fonts)
- Runs on port **3000**
- Does **not** need a build step — changes to `index.html` are visible immediately on refresh

```bash
node serve.mjs
# Server running at http://localhost:3000
```

If port 3000 is already in use, edit line 4 of `serve.mjs`:
```js
const PORT = 3001; // change to any available port
```

---

## Screenshot Utility

`screenshot.mjs` uses Puppeteer to take automated screenshots of the running site.

```bash
# Basic screenshot (auto-increments: screenshot-1.png, screenshot-2.png, ...)
node screenshot.mjs http://localhost:3000

# Screenshot with a label
node screenshot.mjs http://localhost:3000 hero
# → saves as: temporary screenshots/screenshot-1-hero.png

# Screenshot a specific section
node screenshot.mjs http://localhost:3000 delta-slider
```

Screenshots are saved to `./temporary screenshots/` and never overwrite existing files.

**Note:** The server must be running before taking screenshots.

---

## Project Structure

```
DeltaPoint-Underwriter/
│
├── index.html                    ← The entire application (single file)
│   │
│   ├── <nav>                     Nav bar — links to all sections
│   ├── <section> Hero            Value prop, phone mockups, market ticker
│   ├── <div> Market Ticker       Live rates: Fed, SOFR, Prime, Treasury
│   ├── <section id="delta-slider">
│   │       Delta Slider          Amortization calculator + tier table
│   ├── <section id="underwriter">
│   │       Underwriter Agent     Credit inputs → risk grade + APR
│   ├── <section>                 Coach Agent — alerts + live chat
│   ├── <section id="vault">
│   │       Identity Vault        OCR document upload + extracted data
│   ├── <section id="features">   4-module vibe stack overview
│   ├── <section id="plans">      Pricing tiers (Free / Optimizer / Pro)
│   ├── <section>                 Final CTA
│   └── <footer>
│
├── serve.mjs                     ← Local dev server (Node.js, port 3000)
├── screenshot.mjs                ← Puppeteer screenshot utility
│
├── docs/
│   ├── README.md                 ← You are here
│   ├── FEATURES.md               All 5 features explained with screenshots
│   ├── ARCHITECTURE.md           System diagrams, data flow, formula breakdown
│   ├── GETTING-STARTED.md        This file
│   ├── PRD.md                    Product requirements + market research
│   └── screenshots/
│       ├── 00-full-page.png      Full-page render
│       ├── 01-hero.png           Hero section
│       ├── 02-delta-slider.png   Delta Slider section
│       ├── 03-underwriter.png    Underwriter Agent section
│       ├── 04-coach-agent.png    Coach Agent section
│       ├── 05-identity-vault.png Identity Vault section
│       ├── 06-features.png       Features overview section
│       └── 07-pricing.png        Pricing section
│
├── brand_assets/                 ← Design reference images
│   └── Gemini_Generated_Image_9sw3mg9sw3mg9sw3 (1).png
│
├── package.json                  ← npm config (puppeteer dependency)
├── package-lock.json
└── README.md                     ← Project landing page
```

---

## Making Changes

The entire app lives in `index.html`. It uses:
- **Tailwind CSS** via CDN — no build step, changes reflect on browser refresh
- **Vanilla JavaScript** — all interactivity (Delta Slider, Underwriter Agent, Coach chat, Identity Vault animations) is in a `<script>` block at the bottom of `index.html`
- **Google Fonts** via CDN (Sora + Inter + JetBrains Mono)

### Editing the Delta Slider APR tiers

Find the `TIERS` array in the `<script>` block:

```js
const TIERS = [
  { min:300, max:579, apr:24.99, grade:'D',  label:'Very Poor'  },
  { min:580, max:619, apr:22.49, grade:'C-', label:'Poor'       },
  // ... 8 more tiers
  { min:780, max:850, apr:6.49,  grade:'A+', label:'Exceptional'},
];
```

Change any `apr` value and the slider, payment cards, and tier table all update automatically.

### Editing the Underwriter Agent penalty rules

Find `runUnderwriter()` in the `<script>` block. The penalty logic is at the top:

```js
if (dti > 43) tier = UW_TIERS[Math.max(0, UW_TIERS.indexOf(tier)-2)] || tier;
else if (dti > 36) tier = UW_TIERS[Math.max(0, UW_TIERS.indexOf(tier)-1)] || tier;
if (util > 75) tier = UW_TIERS[Math.max(0, UW_TIERS.indexOf(tier)-1)] || tier;
if (inq > 4) tier = UW_TIERS[Math.max(0, UW_TIERS.indexOf(tier)-1)] || tier;
```

Adjust thresholds or penalty magnitudes here.

---

## Deploying

This is a static single-file application. Deploy to any static host:

**Netlify (drag and drop):**
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire project folder into the Netlify dashboard
3. Live in under 60 seconds

**GitHub Pages:**
```bash
# From the repo root
gh-pages -d .
```

**Vercel:**
```bash
npx vercel
```

No build configuration needed — just point to `index.html`.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `Cannot find package 'puppeteer'` | Run `npm install` first |
| Port 3000 already in use | Change `PORT` in `serve.mjs` |
| Screenshot is blank | Make sure `node serve.mjs` is running before screenshotting |
| Fonts not loading | Requires internet connection (Google Fonts CDN) |
| Tailwind styles missing | Requires internet connection (Tailwind CDN) |

---

*[← Back to README](../README.md) · [Features →](FEATURES.md) · [Architecture →](ARCHITECTURE.md) · [PRD →](PRD.md)*
