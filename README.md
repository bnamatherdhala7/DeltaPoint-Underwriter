# DeltaPoint — The Credit-to-Yield Engine

**Live demo:** https://delta-point-underwriter.vercel.app/

> *"Credit Karma shows you a score. DeltaPoint shows you a bill."*

---

## The Problem

The U.S. personal loan market is **$276 billion** and growing at 15.5% annually. Yet most borrowers are systematically overpaying on their debt — and have no idea by how much.

- A 3–8 percentage point APR spread exists between lenders **for the exact same borrower**
- Moving from Fair to Good credit saves **$1,600–$2,400/year** on a $20,000 loan
- **32–80 million Americans** are invisible to traditional credit scoring despite being financially capable

The tools that exist today — Credit Karma, Experian, myFICO — show people their score and walk away. They do not answer the question borrowers actually care about:

> *"What is my credit score costing me in dollars, and what is the fastest way to pay less?"*

DeltaPoint answers that question.

---

## Why We Built This

Every existing credit tool treats your score as the destination. DeltaPoint treats your score as a **variable to optimize against the cost of borrowing**.

The core insight: a credit score by itself is not actionable. The dollar cost of that score is.

A user who learns their 680 score is costing them $4,397 in extra interest has a concrete reason to act today. A user who sees "your score went from 678 to 682" has no idea what that means. We built for the first user.

There is also a second structural gap: incumbents are referral engines. They connect users to loans and collect affiliate commissions. They have no incentive to improve the user's credit profile before the referral — a worse credit profile earns the same commission. **DeltaPoint's incentives are aligned with the user.** We only win if the user gets a lower rate.

---

## Why Our Features vs. Competitors

| Capability | Credit Karma | Experian | NerdWallet | **DeltaPoint** |
|---|---|---|---|---|
| Shows dollar cost of your score | No | No | No | **Yes** |
| Proactive alerts (before damage occurs) | No | No | No | **Yes** |
| Deterministic risk grading (no LLM hallucination) | No | No | No | **Yes** |
| Cashflow-based underwriting (thin-file support) | No | Partial | No | **Yes** |
| AI document verification (sub-60 seconds) | No | No | No | **Yes** |
| Executes debt payoff, not just referral | No | No | No | **Yes** |
| Primary metric | Score | Score | Rate comparison | **$ saved** |
| Business model alignment | Affiliate | Product upsell | Affiliate | **User outcome** |

### Three Structural Advantages

**1. Dollar-first, not score-first.**
Every output in DeltaPoint is denominated in dollars. Not "your score improved 12 points" — "that improvement saves you $1,250 in interest." This is the unit people make financial decisions in. Incumbents show scores because scores are simple to display. We show dollars because dollars drive action.

**2. Proactive, not reactive.**
Existing tools alert you after your score drops. Our Coach Agent monitors leading indicators — utilization approaching a penalty threshold, a Fed rate decision narrowing refinancing windows — and intervenes *before* the damage occurs. This is the difference between a rearview mirror and a dashboard.

**3. Execution, not referral.**
When a user qualifies for a debt consolidation loan, Credit Karma sends them a link. DeltaPoint's Direct Pay routes loan proceeds directly to the user's high-interest accounts — closing the loop from "you qualify" to "your high-interest accounts are paid off" in a single workflow. 35% of all personal loan borrowers are consolidating debt. None of the incumbents execute the consolidation for them.

---

## What We Built

| Module | What It Does | Why It Matters |
|---|---|---|
| **Delta Slider** | Live amortization calculator. Move a credit score slider, watch monthly payment and total interest recalculate in real time. Outputs the exact dollar gap between your score and the best available rate. | Makes the cost of a credit score concrete. Average user sees a $2,000–$5,000 gap on first load. |
| **Underwriter Agent** | Deterministic AI risk grader — takes score, DTI, utilization, and inquiry count; outputs risk grade, APR tier, approval probability, and the single action that moves you up one tier. | No LLM hallucination on financial outputs. Same inputs always produce the same grade. Regulatory-safe. |
| **Coach Agent** | 24/7 AI monitor that fires proactive alerts when utilization spikes, refinancing windows open, or lender spreads shift. Backed by GraphRAG indexed against live macroeconomic data. | Turns a passive dashboard into an active co-pilot. Drives weekly re-engagement vs. quarterly. |
| **Identity Vault** | AI document parser — upload a W2, pay stub, or tax return. Gemini 1.5 Flash extracts income and employment data in under 60 seconds, cross-references against bureau records, pre-fills loan applications. | Replaces a 3–7 day manual verification process. Banks using automated doc processing reduce default rates by 25%. |
| **Cashflow Underwriting** *(roadmap)* | Connects banking data to generate a Boosted Approval Odds score for the 32–80M thin-file Americans. Cashflow + bureau data is 40% more predictive than bureau alone. | Unlocks an underserved market segment that incumbents structurally cannot reach. |

---

## Market Opportunity

| Metric | Number |
|---|---|
| U.S. personal loan debt outstanding | $276 billion |
| Americans holding personal loans | 26.4 million (+7.8% YoY) |
| Global personal loan market CAGR | 15.5% through 2034 |
| Credit-invisible / thin-file Americans | 32–80 million |
| APR spread between excellent and fair credit | 8–15 percentage points |
| Lender-to-lender spread, same borrower | 3–8 percentage points |
| Borrowers using loans for debt consolidation | 35% |
| Credit score services market (2025 → 2029) | $3.09B → $4.9B |

Every borrower who doesn't optimize is overpaying. The addressable population is 26 million active borrowers, growing 7.8% per year, in a high-rate environment that maximizes the dollar spread between credit tiers.

---

## Tech Stack

```
Orchestration  →  LangGraph (stateful multi-agent graph)
Intelligence   →  Gemini 1.5 Pro + LlamaIndex GraphRAG
Vision / OCR   →  Gemini 1.5 Flash (document parsing pipeline)
Protocol       →  Model Context Protocol (MCP)
UI             →  React 19 · Tailwind CSS · Framer Motion
Dev Env        →  Claude Code
```

---

## Quick Start

```bash
git clone https://github.com/bnamatherdhala7/DeltaPoint-Underwriter.git
cd DeltaPoint-Underwriter
npm install
node serve.mjs
```

Open **http://localhost:3000** in your browser.

---

## Documentation

| Doc | Contents |
|---|---|
| [Features](docs/FEATURES.md) | All 5 features with screenshots, formulas, and data tables |
| [Architecture](docs/ARCHITECTURE.md) | System diagrams, agent graph, data flow |
| [PRD & Market Research](docs/PRD.md) | Full product requirements, sourced market data, competitive analysis, success metrics |
| [Architectural Decisions](docs/DECISIONS.md) | Why LangGraph, why deterministic Underwriter, why Gemini Flash |
| [Getting Started](docs/GETTING-STARTED.md) | Setup guide, dev server, project structure |

---

## Project Structure

```
DeltaPoint-Underwriter/
├── index.html              ← Full single-page application
├── serve.mjs               ← Local dev server (port 3000)
├── screenshot.mjs          ← Puppeteer screenshot utility
├── docs/
│   ├── PRD.md              ← Product requirements & market research
│   ├── FEATURES.md         ← Feature documentation
│   ├── ARCHITECTURE.md     ← System architecture
│   ├── DECISIONS.md        ← Architectural decisions & rationale
│   ├── GETTING-STARTED.md  ← Setup guide
│   └── screenshots/        ← Section screenshots
├── brand_assets/
└── package.json
```

---

## License

MIT © 2026 DeltaPoint Inc.

*Built with [Claude Code](https://claude.ai/code) · Gemini 1.5 Pro · LangGraph*
