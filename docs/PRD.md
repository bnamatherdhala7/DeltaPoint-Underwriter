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

Segments are defined by primary motivation — not demographics. Each user has one dominant job-to-be-done.

### "The Overpayer" — Primary (26.4M addressable)
**Marcus, 34, $62K income, 668 score, $22K loan at 18.4% APR.**
Knows his score is "not great" but has no idea what it's costing him.

*Day in the life:*
| Moment | What he does | Where he gets stuck |
|---|---|---|
| Sees a credit card rejection | Opens Credit Karma | "668 — Fair." No dollar context. Closes in 30 seconds. |
| Googles "how to improve my score" | Reads generic tips | "Pay on time." No prioritization, no dollar impact per action. |
| Has $500 to pay down debt | Tries to pick Card A vs. Card B | No tool tells him which move saves him more in interest. Guesses. |
| Makes a payment, checks a month later | Score moved 3 points | Still no idea if that changed his APR tier. Disengages for 3 months. |

**DeltaPoint:** Opens the Delta Slider, inputs $22K loan, sees a $4,397 gap between his current score and the best available rate. Has a concrete goal for the first time.

---

### "The Consolidator" — High-intent (9.2M addressable)
**Diana, 41, $78K income, $28K spread across 4 accounts.**
Primary motivation: *"Execute the consolidation for me — don't just refer me."*

Was sent a Credit Karma referral link, got the loan, deposited proceeds into checking, never paid off the cards. Now holds both the new loan and the original balances. This is a product design failure, not a willpower failure.

**DeltaPoint:** Direct Pay routes loan proceeds to high-interest accounts automatically. The consolidation actually closes.

---

### "The Invisible" — Underserved (32–80M addressable)
**Amir, 27, $58K gig income, no credit history.**
Primary motivation: *"Prove I'm creditworthy even though the system hasn't seen me."*

18 months of on-time rent payments. Positive cash flow. Denied by every lender because bureau scores don't see him. Existing tools say "build credit" — not a same-year solution.

**DeltaPoint:** Cashflow-Based Underwriting + Identity Vault generates a Boosted Approval Odds score from bank statements and verified income. Bureau-only models structurally cannot serve this user.

---

## Core Problems & Prioritization

Ranked by severity × frequency for the Overpayer (primary segment):

| Problem | Severity | Frequency | Feature |
|---|---|---|---|
| "I don't know what my score is costing me in dollars" | ★★★★★ | ★★★★★ | Rate Optimizer |
| "I don't know which action to take first" | ★★★★★ | ★★★★☆ | Coach Agent |
| "I was approved for a loan but never executed the payoff" | ★★★★★ | ★★★☆☆ | Direct Pay |
| "I was denied despite being financially capable" | ★★★★★ | ★★★☆☆ | Cashflow Underwriting |
| "Verification takes 3–7 days and kills my momentum" | ★★★★☆ | ★★★☆☆ | Identity Vault |

Problem #1 is the activation event. A user who doesn't understand their Interest Delta has no reason to use any other feature.

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
