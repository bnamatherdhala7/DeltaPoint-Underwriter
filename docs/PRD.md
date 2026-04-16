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

Segments are defined by primary motivation — not demographics. Each represents a fundamentally different job-to-be-done with a distinct problem and solution path.

---

### Persona 1 — "The Overpayer" · Primary · 26.4M addressable

**Profile:** Marcus, 34, $62K income, 668 credit score, $22K personal loan at 18.4% APR. Has used Credit Karma. Knows his score is "not great." Has no idea what it's costing him.

**Needs:**
- Know the dollar cost of his current credit score
- A prioritized action plan — not generic tips
- A feedback loop that shows progress in dollars, not points

**Pain Points:**
- Credit Karma shows "668 — Fair" with no dollar context or action priority
- Googles "how to improve credit score" — gets "pay on time, lower utilization" with no dollar impact per action
- Has $500 to put toward debt but can't tell whether paying Card A or Card B moves the needle more
- Score moves 3 points after a payment — no idea if that shifted his APR tier or saved him anything

**Key Problem:**
> "I have no way to know what my score is costing me in dollars, so I have no reason to act."

The obstacle isn't motivation — it's that the output (a score) is disconnected from the decision (should I do something about it today). Marcus needs a dollar figure, not a tier label.

**Solution — Rate Optimizer (Delta Slider):**
Input loan amount + current score → see the exact dollar gap between your score and the best available rate, live. Move the slider → watch Interest Delta recalculate. Marcus sees $4,397 on first load. That number creates a concrete goal and a reason to return.

**Why we picked this first:**
This is the highest-severity, highest-frequency problem across all three segments. It requires no external integrations — just user-input data. It validates the core hypothesis (dollar framing drives activation) before we invest in complex pipelines. And it's the prerequisite for every other feature: a user who doesn't know their Interest Delta has no reason to use the Coach Agent, pursue verification, or execute a consolidation. The Rate Optimizer is not Feature 1 — it's the activation event that makes the rest of the product meaningful.

---

### Persona 2 — "The Consolidator" · High-intent · 9.2M addressable

**Profile:** Diana, 41, $78K income, $28K spread across 4 accounts — 2 credit cards at 22–24% APR, medical debt, store card. Has been approved for a consolidation loan before. Never followed through.

**Needs:**
- One lower monthly payment instead of four
- Confirmation that the consolidation will actually happen, not just be approved
- Confidence that she won't end up holding both the new loan and the old balances

**Pain Points:**
- Credit Karma sent her a referral link. She got the loan, deposited the proceeds into checking, and never paid off the cards. Six months later she holds both the $20K loan and $18K in card balances — total debt increased.
- This happens to the majority of consolidation loan borrowers. It is a product design failure, not a willpower failure.
- No incumbent closes the loop between "you're approved" and "your accounts are paid off."

**Key Problem:**
> "Loan approval and debt payoff are two separate events — and nobody handles the second one."

Diana doesn't need a better referral. She needs the execution to happen automatically.

**Solution — Direct Pay:**
When Diana qualifies for a consolidation loan, DeltaPoint identifies her highest-interest accounts and routes the loan proceeds directly to those creditors within the interface. She authorizes it once. The payoff happens mechanically. She never receives a disbursement check that could sit undeployed.

**Why we picked this:**
35% of all personal loan borrowers are consolidating debt — the single largest use case. None of the incumbents execute the consolidation. They refer and collect the commission regardless of whether the user's debt actually gets paid off. Direct Pay is where DeltaPoint's incentive alignment (we win when you save) becomes most tangible. We deprioritize it in v1 only because it requires lender settlement API partnerships — it's the highest-effort feature on the board. When the partnerships are in place, it becomes the product's most defensible moat.

---

### Persona 3 — "The Invisible" · Underserved · 32–80M addressable

**Profile:** Amir, 27, $58K gig income, no credit history. Arrived from abroad 18 months ago. Has paid rent and bills on time via debit every month. Has never held a credit product in the U.S.

**Needs:**
- A path to loan approval that doesn't rely on a credit history he doesn't have
- A way to use his actual financial behavior (income, cash flow, payment history) as evidence of creditworthiness
- An answer faster than "build credit over the next 2–3 years"

**Pain Points:**
- Denied by every traditional lender. Bureau scores don't see him — not because he's a bad borrower, but because he's never been scored.
- 32–80 million Americans are in the same position. They're not high-risk; they're unscored.
- Existing tools have no path forward for this user. "Build your credit" is not a same-year solution.
- His on-time rent payments, positive cash flow, and stable income are invisible to the system.

**Key Problem:**
> "I can't prove I'm creditworthy using a system that has never seen me."

The obstacle is structural, not behavioral. Bureau-only underwriting cannot solve this by design.

**Solution — Cashflow-Based Underwriting + Identity Vault:**
DeltaPoint connects Amir's banking data to generate a Boosted Approval Odds score from direct deposits, income-to-expense ratios, and recurring payment patterns. The Identity Vault parses a W-2 or pay stub in under 60 seconds and cross-references it against bureau records. Together, these create an underwriting signal that is 40% more predictive than bureau data alone — and it sees Amir.

**Why we picked this:**
This is the largest underserved addressable market in consumer finance — 32–80 million Americans that incumbents structurally cannot reach. The CFPB has explicitly sanctioned cashflow data in underwriting, so the regulatory risk is cleared. And this segment creates a compounding moat: a user who gets approved through DeltaPoint's cashflow model, builds a repayment history, and eventually becomes scoreable has strong loyalty to the platform that gave them their first approval. We deprioritize in v1 due to Open Banking integration complexity — but it is the segment with the highest long-term platform value.

---

## Why The Overpayer First

Three personas, each with a legitimate problem. We start with the Overpayer because:

1. **Largest addressable market with immediate pain.** 26.4M Americans holding personal loans today are overpaying. The pain is active, not hypothetical.
2. **Zero integration dependencies.** The Rate Optimizer runs on user-input data alone — no banking APIs, no lender partnerships, no bureau connections. We can ship and learn before committing to infrastructure.
3. **Validates the core bet.** Everything DeltaPoint does is built on one hypothesis: borrowers respond to dollar framing more than score framing. The Rate Optimizer tests that hypothesis at minimum cost.
4. **Creates the motivation that makes the other two personas relevant.** The Consolidator needs to know her Interest Delta before Direct Pay means anything. The Invisible needs to understand what a score improvement is worth before Cashflow Underwriting is compelling. Persona 1 is the on-ramp for Personas 2 and 3.

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
