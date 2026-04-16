# DeltaPoint — Product Requirements Document
### Version 1.0 · April 2026

---

## The One-Sentence Pitch
DeltaPoint tells you exactly what your credit score is costing you in dollars — and then executes the moves to lower that cost.

---

## Problem

The U.S. personal loan market is $276B and growing at 15.5% CAGR. A 3–8 percentage point APR spread exists between lenders for the **same borrower**. Moving from Fair to Good credit saves $1,600–$2,400/year on a $20K loan. Most borrowers don't know any of this.

The tools that exist today — Credit Karma, Experian, NerdWallet — are referral businesses. They collect affiliate commissions regardless of what rate the user gets. There is no structural incentive to optimize the user's profile before the referral. The advice is generic. The outcomes are unmeasured.

**The gap:** No product tells a borrower what their score is costing them in dollars, or executes the steps to reduce that cost.

---

## North Star
> **Average Interest Delta realized per user: $1,200+/year**

Every feature is evaluated against one question: does this move the user closer to realizing their Interest Delta?

---

## Why Now
- Personal loan APRs average **12.04%** — high rates maximize the dollar spread between credit tiers, amplifying our value proposition
- The CFPB has explicitly sanctioned cashflow data in underwriting — regulatory risk is cleared
- Multimodal AI (Gemini 1.5 Flash) has reached **99% OCR accuracy at 1.8–4s latency** — Identity Vault is now feasible
- Open Banking infrastructure is available at scale for consumer-permissioned data

---

## Stakeholder Ecosystem

| Stakeholder | What They Want | DeltaPoint's Value |
|---|---|---|
| **Borrowers** (v1 focus) | Lower rates, clear next steps | Dollar cost of their score; prioritized actions |
| **Lenders / Banks** | Qualified applicants, lower default risk | Higher-quality leads with verified income + cashflow signals |
| **Regulators (CFPB)** | Transparency, fair access | Aligned — dollar-first framing and cashflow underwriting explicitly sanctioned |

**v1 builds for borrowers only.** Lenders are a monetization layer, not a product design driver.

---

## Target Users

Three segments, each defined by a distinct motivation and problem — not demographics.

---

### "The Overpayer" · Primary · 26.4M addressable
**Marcus, 34, $62K income, 668 score, $22K loan at 18.4% APR.**

| | |
|---|---|
| **Needs** | Know the dollar cost of his score; a prioritized action plan; progress feedback in dollars not points |
| **Pain points** | Credit Karma shows "668 — Fair" with no dollar context. Generic tips ("pay on time") with no impact ranking. Has $500 to pay down debt but can't tell if Card A or Card B moves his APR tier. |
| **Key problem** | *"I have no way to know what my score is costing me — so I have no reason to act."* |
| **Solution** | Rate Optimizer: input loan + score → see exact Interest Delta live. Marcus sees $4,397 on first load. Concrete goal, reason to return. |
| **Why we start here** | Highest severity + highest frequency of any problem across all three segments. Zero integration dependencies — validates the core hypothesis before investing in pipelines. And it's the prerequisite: a user who doesn't know their Interest Delta has no motivation to use any other feature. |

---

### "The Consolidator" · High-intent · 9.2M addressable
**Diana, 41, $78K income, $28K across 4 accounts at 22–24% APR.**

| | |
|---|---|
| **Needs** | One lower payment; certainty that the consolidation will actually execute; no double-debt scenario |
| **Pain points** | Got a Credit Karma referral loan, deposited proceeds into checking, never paid off the cards. Now holds both the new loan and original balances. This is a product design failure, not a willpower failure. |
| **Key problem** | *"Loan approval and debt payoff are two separate events — and nobody handles the second one."* |
| **Solution** | Direct Pay: loan proceeds routed to her highest-interest creditors automatically. She authorizes once. The payoff closes. |
| **Why we deprioritize in v1** | 35% of all personal loan borrowers are consolidating — the largest single use case, and no incumbent executes it. We deprioritize only because lender settlement API partnerships take time. When in place, Direct Pay becomes the product's most defensible moat. |

---

### "The Invisible" · Underserved · 32–80M addressable
**Amir, 27, $58K gig income, no U.S. credit history.**

| | |
|---|---|
| **Needs** | Loan approval based on actual financial behavior, not a score he doesn't have; a same-year solution |
| **Pain points** | Denied by every lender despite 18 months of on-time rent payments and positive cash flow. Bureau scores don't see him — not because he's risky, but because he's unscored. "Build credit" is a 2–3 year answer. |
| **Key problem** | *"I can't prove I'm creditworthy using a system that has never seen me."* |
| **Solution** | Cashflow Underwriting + Identity Vault: banking data + verified income generates a Boosted Approval Odds score that is 40% more predictive than bureau-only — and it sees Amir. |
| **Why we deprioritize in v1** | Largest underserved market in consumer finance, and the CFPB has cleared the regulatory path. Deprioritized only due to Open Banking integration complexity. Long-term this segment has the highest loyalty upside — first approval creates a durable relationship. |

---

## Why The Overpayer First

We start with the Overpayer because the Rate Optimizer requires no external integrations, targets the largest segment with active pain, and tests the core product hypothesis at minimum cost. Critically, it's the on-ramp for every other persona: the Consolidator needs to know her Interest Delta before Direct Pay is meaningful, and the Invisible needs to see what a score improvement is worth before Cashflow Underwriting is compelling. Persona 1 activates the entire product.

---

## Problem Priority

| Problem | Severity | Frequency | Feature |
|---|---|---|---|
| "I don't know what my score is costing me in dollars" | ★★★★★ | ★★★★★ | Rate Optimizer |
| "I don't know which action to take first" | ★★★★★ | ★★★★☆ | Coach Agent |
| "I was approved but never executed the payoff" | ★★★★★ | ★★★☆☆ | Direct Pay |
| "I was denied despite being financially capable" | ★★★★★ | ★★★☆☆ | Cashflow Underwriting |
| "Verification takes 3–7 days and stalls my application" | ★★★★☆ | ★★★☆☆ | Identity Vault |

---

## Features & Build Order

| Feature | What It Does | Impact | Effort | Priority |
|---|---|---|---|---|
| **Rate Optimizer** | Live amortization engine — move a score slider, see exact dollar cost vs. best available rate | ★★★★★ | Low — no integrations | **1 ✅ Built** |
| **Coach Agent** | Proactive alerts on leading indicators (utilization spikes, refi windows) — fires before damage occurs, not after | ★★★★★ | Medium — GraphRAG + webhooks | **2** |
| **Identity Vault** | AI doc parsing (W-2, pay stubs) — 99% accuracy, <60s, pre-fills loan applications | ★★★★☆ | Medium — Gemini Vision | **3** |
| **Cashflow Underwriting** | Bureau + banking data = 40% more accurate scoring; unlocks thin-file approvals | ★★★★☆ | High — Open Banking API | **4** |
| **Direct Pay** | Loan proceeds routed directly to creditors — closes the execution gap incumbents leave open | ★★★★★ | High — lender settlement rails | **5** |

**Build logic:** Features 1–2 validate the product thesis (dollar framing drives activation and retention) before committing to the high-complexity integrations in 3–5. This is deliberate de-risking.

---

## Out of Scope (v1)

| Not building | Why |
|---|---|
| Credit monitoring / bureau dispute | Different problem. Adds regulatory surface area without moving the North Star. |
| General financial planning (budgeting, net worth) | Dilutes the dollar-cost-of-credit framing — our sharpest differentiator. |
| B2B lender SaaS | Different buyer, different GTM, different sales cycle. Post-v1. |
| Credit card rewards optimization | Affiliate model — structurally misaligned with our outcome-based business model. |

---

## V1 Go-to-Market

**Who first:** The Overpayer. Immediate verifiable pain, zero integration dependencies to activate (just loan amount + score), highest frequency of the core problem.

**Discovery:**
- SEO: "what APR can I get with a 680 score" — high-intent queries with no dominant incumbent
- Earned media: the Interest Delta number is inherently shareable ("my credit score is costing me $4,397/year")
- Reddit r/personalfinance — users actively seeking the exact answer DeltaPoint provides

**Activation:**
1. Delta Slider — zero sign-up required
2. Input loan amount + score → see Interest Delta in 3 seconds
3. "Save this number" sign-up prompt → Coach Agent onboarding
4. Connect banking data for proactive alerts

**v1 scope boundary:** Rate Optimizer + Coach Agent. Identity Vault and Cashflow Underwriting require lender integrations. Direct Pay requires banking settlement partnerships. These ship when v1 validates the core hypothesis.

---

## Competitive Landscape

| Dimension | Credit Karma | Experian | NerdWallet | myFICO | **DeltaPoint** |
|---|---|---|---|---|---|
| Primary output | Credit score | Credit score | Loan comparison | Credit score | **Dollar savings** |
| Business model | Affiliate referral | Product upsell | Affiliate referral | Subscription | **User outcome** |
| Alerts | Reactive | Reactive | None | Reactive | **Proactive** |
| Underwriting | None | Bureau only | None | None | **Bureau + cashflow + income** |
| Debt payoff execution | Referral link | None | Referral link | None | **Direct Pay** |
| Thin-file support | None | Partial | None | None | **Cashflow-based approval** |

Every incumbent monetizes the loan application. DeltaPoint monetizes the savings.

---

## Market Size

| Metric | Data |
|---|---|
| U.S. personal loan debt | **$276B** (Q4 2025) |
| Americans holding personal loans | **26.4M** (+7.8% YoY) |
| Global market CAGR through 2034 | **15.5%** |
| APR spread: excellent vs. fair credit | **8–15 percentage points** |
| Lender-to-lender spread, same borrower | **3–8 percentage points** |
| Credit-invisible / thin-file Americans | **32–80M** |
| #1 personal loan use case | **Debt consolidation (35%)** |

---

## Success Metrics

| Feature | Primary KPI | Target |
|---|---|---|
| Rate Optimizer | % users reaching next APR tier within 90 days | 35% |
| Coach Agent | Monthly active alert engagement rate | 60% |
| Identity Vault | Time-to-verification | < 60s |
| Cashflow Underwriting | Thin-file approval rate vs. bureau-only baseline | +40% |
| Direct Pay | % of consolidation proceeds correctly deployed | 95% |
| **Platform** | **Average Interest Delta realized per user (annual)** | **$1,200+** |

---

## Risk & Mitigation

| Risk | Likelihood | Mitigation |
|---|---|---|
| Cashflow data use challenged by regulators | Medium | CFPB has explicitly sanctioned; maintain full consent audit trail |
| OCR errors in income extraction | Low | 99% accuracy; human review escalation at <95% confidence |
| Users don't act on Coach Agent alerts | Medium | Dollar framing + one-tap action from alert to execution |
| Rising rates reduce refinancing incentive | Low | Higher rates widen the dollar spread between tiers — amplifies our value |

---

## Key Data Sources

| Statistic | Source |
|---|---|
| $276B personal loan debt, 26.4M borrowers | LendingTree Personal Loan Statistics 2026 |
| CAGR 15.5% personal loan market | Fortune Business Insights |
| 40% accuracy improvement from cashflow scoring | Experian Combined Score Press Release, Nov 2025 |
| 90% of lenders support alternative data | Nova Credit State of Alternative Data Report 2024 |
| 32M credit invisible | CFPB Credit Invisible Report 2025 |
| 93-point avg score improvement with AI tools | Dovly AI Platform Data 2025 |
| 99% OCR accuracy, 1.8s latency | Shufti Pro / Veryfi 2025 Benchmark |
| 25% default rate reduction from automated doc processing | Klearstack Lending OCR Guide 2025 |
| 35% use personal loans for consolidation | Experian Personal Loan Usage Statistics 2025 |
| Fed Reserve APR/risk nonlinear relationship | Federal Reserve FEDS Notes, September 2025 |

---

*DeltaPoint PRD v1.0 · April 2026*
