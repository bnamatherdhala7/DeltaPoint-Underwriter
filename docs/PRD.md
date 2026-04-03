# DeltaPoint — Product Requirements Document (PRD)
### Version 1.0 · April 2026 · Research Engineering Team

---

## Executive Summary

DeltaPoint is a deterministic financial co-pilot designed to bridge the gap between **credit health** and **cost of capital**. Where incumbent credit tools treat credit scores as a destination, DeltaPoint treats them as a variable to be optimized — specifically against the cost of borrowing.

This PRD defines the five core features of DeltaPoint, the market evidence supporting each, and the implementation rationale from a research engineering perspective. All market data is sourced from independent research published in 2024–2026.

---

## Market Context

| Metric | Data | Source Year |
|---|---|---|
| U.S. personal loan debt outstanding | **$276 billion** | Q4 2025 |
| Americans currently holding a personal loan | **26.4 million** (+7.8% YoY) | Q4 2025 |
| Global personal loan market (2025) | **$429.78 billion** | 2025 |
| Global personal loan market (2034 projected) | **$1.52 trillion** (CAGR 15.5%) | 2025 forecast |
| Americans more likely to borrow in 2026 | **42%** | 2025 survey |
| Average personal loan balance | **$19,333** | 2025 |
| Average APR (700 FICO / $5K / 36 months) | **12.04%** | April 2026 |
| Spread between excellent and fair credit APR | **8–15 percentage points** | 2026 |
| Lender-to-lender spread (same borrower) | **3–8 percentage points** | 2026 |
| Credit invisible / thin-file Americans | **32–80 million** | 2025 |
| #1 stated use case for personal loans | **Debt consolidation (35%)** | 2025 |

> **Bottom line:** The personal loan market is growing at 15.5% CAGR. 35% of all borrowers are consolidating debt. A 3–8 point APR spread exists between lenders for identical borrowers — meaning most consumers who don't optimize are overpaying. This is the market DeltaPoint serves.

---

## Feature 1: The Rate Optimizer (Core Value Proposition)

### What We Built
A real-time interest rate simulation engine — the **Delta Slider** — that calculates exactly how much a user would save on a personal loan if their credit score improved by a specific number of points. The user inputs their loan principal and term, moves a credit score slider, and sees monthly payments, total interest, and their **Interest Delta** recalculate live using the standard amortization formula:

$$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$

The output is not a credit score. It is a **dollar figure** — the exact savings unlocked by improving from their current credit tier to the next.

### Why We Built This First

**Market signal:** The core consumer pain point is not an abstract credit score. It is a monthly payment they cannot afford or an interest rate they know is too high.

According to Federal Reserve research (September 2025), the relationship between credit risk and loan pricing is **nonlinear and accelerating** — the penalty for each step down in credit tier grows larger. Specifically:
- Moving from **Fair (640–699) → Good (700–739)** saves approximately **8–10 percentage points** in APR
- On a $20,000 / 60-month loan, this translates to **$1,600–$2,400 per year** in interest savings
- The average borrower does not know this number

The incumbent product category (general credit score dashboards) shows a score. It does not tell the user what that score costs them in dollar terms. This is the gap DeltaPoint fills.

**Why this is the right feature to build first:**

1. **Immediate, quantifiable ROI.** Unlike credit education tools that offer vague guidance, the Rate Optimizer produces a specific, verifiable number ("your score at 720 saves you $1,450 vs. your score at 680"). This is a conversion-forcing mechanism — a user who sees their exact savings has a concrete reason to act immediately.

2. **High-interest rate environment amplifies value.** In April 2026, average personal loan APRs sit at 12.04%, with subprime borrowers facing 22–35%+. When rates are high, the dollar spread between credit tiers is maximized. A tool that quantifies this spread generates more urgency now than it would in a low-rate environment.

3. **Rate sensitivity is the primary driver of borrowing behavior.** Survey data shows 59% of Americans say rising prices are straining their finances and 21% feel weighed down by existing debt. These consumers are not credit-score-maximizers — they are payment-minimizers. A product that speaks directly to payment reduction has a direct line to their primary anxiety.

4. **Creates product stickiness through goal-setting.** A user who learns they are $1,250 away from saving $1,450/year has a concrete goal. They return to the product to track progress toward that goal. This is the foundation of long-term retention.

5. **Validated by AI credit tool outcomes.** Independent data shows AI-powered credit optimization tools generate an average 93-point credit score increase for engaged users. The Rate Optimizer creates the motivation that drives that engagement.

### Market Sizing for This Feature
- **Credit Score Tracking Service Market:** $3.09 billion (2025) → $4.9 billion (2029), CAGR 12.2%
- **Broader Credit Scoring Market:** $17.47 billion (2024) → $55.64 billion (2032), CAGR 15.58%
- **67% of lenders** now use alternative data in scoring decisions — confirming score optimization has direct lender impact

---

## Feature 2: Cashflow-Based Underwriting (The 2026 Edge)

### What This Feature Does
Instead of relying solely on lagging bureau-reported credit scores, DeltaPoint integrates real-time banking data (direct deposits, income-to-expense ratios, recurring payment patterns) to generate a **Boosted Approval Odds** score. This allows users with thin credit files but strong cash flow to receive pre-approvals that traditional bureau-only underwriting would deny. A companion **Burn Rate Tracker** warns users if taking a new loan would push their monthly free cash flow into deficit.

### Why This Feature Is Important

**The problem traditional credit scoring creates:** Standard credit bureau scores are based on historical repayment behavior. They systematically exclude or underrate:
- Consumers with limited credit history (thin files)
- Recent immigrants with no domestic credit history
- Young adults who pay in cash or via debit
- Self-employed individuals with irregular but strong income

The result: **32–80 million Americans** are either fully credit-invisible or have thin files insufficient for standard underwriting. These are not high-risk borrowers — they are **unscored** borrowers.

**The cashflow underwriting solution:**

Research published by a major credit bureau in November 2025 demonstrated that a combined score using traditional credit data **plus** consumer-permissioned cash flow data **outperforms conventional credit scores by over 40% in predictive accuracy** across all major lending products. This is the single most significant development in consumer credit modeling in a decade.

Key 2025–2026 data points:
- **90% of lenders** identify alternative data as key to approving more applicants (Nova Credit State of Alternative Data Report, 2024)
- The U.S. Consumer Financial Protection Bureau confirmed that cash flow data is "useful in assessing credit risk" and consistent with safe and sound practices
- Open Banking regulatory frameworks in the U.S. are enabling consumer-permissioned data access at scale — the infrastructure is now available

**The Burn Rate Tracker specifically:**
This is the responsible lending component. A borrower who qualifies for a loan but whose cash flow cannot absorb the monthly payment is a default risk. The Burn Rate Tracker:
- Calculates monthly free cash flow (income minus fixed expenses)
- Models the post-loan cash flow impact
- Issues a warning before the user completes an application if the loan creates a cash flow deficit

This protects both the user and the platform. It also differentiates DeltaPoint from predatory lending tools that approve borrowers regardless of their ability to repay.

### Market Sizing
- **Credit decisioning software market:** Projected to reach $24.6 billion by 2033
- **Underserved addressable market:** 32–80 million credit-invisible / thin-file U.S. adults — a massive unlocked segment
- **Accuracy improvement:** 40% better predictive accuracy vs. bureau-only scoring is a competitive moat — lenders will preferentially route applications through platforms that deliver better underwriting signals

---

## Feature 3: Automated Debt Consolidation "One-Click" Setup

### What This Feature Does
When a user is approved for a personal loan for debt consolidation purposes, DeltaPoint identifies the user's highest-interest accounts and facilitates a **Direct Pay** workflow — allowing the user to authorize the lender to pay those creditors directly within the interface. The loan proceeds are routed automatically; the user never receives a disbursement check.

### Why This Feature Is Important

**The core problem:** The #1 stated use case for personal loans is debt consolidation (35% of all borrowers). Yet the majority of debt consolidation loans fail to achieve their purpose — not because the loan terms are wrong, but because the borrower receives the funds as cash, does not immediately pay off their high-interest accounts, and ends up carrying **both** the new loan and the original high-interest debt.

This is not a willpower failure — it is a product design failure. The incumbent process creates unnecessary friction between loan approval and debt payoff.

**Market evidence:**
- Over **65 million Americans** carry unsecured debt across multiple accounts
- The primary motivation is simplicity: one monthly payment at a lower rate vs. multiple payments at various rates
- The average U.S. household holds debt across 3–5 accounts with varying APRs and payment dates
- Replacing $20,000 of credit card debt (avg APR 24%) with a personal loan at 12% saves **~$2,400/year** — a clear, compelling value proposition

**Why Direct Pay solves the execution gap:**
- Removes the behavioral risk of loan proceeds not reaching their intended destination
- Creates a closed-loop product: the user's stated goal (lower debt) is executed mechanically, not aspirationally
- Reduces the platform's default risk — a user who actually consolidates their debt has lower total obligations than one who added a new loan without paying off existing debt
- Builds trust: the platform executes on behalf of the user rather than simply advising

**The competitive differentiation:**
Incumbent credit tools refer users to loans. They do not execute the consolidation. DeltaPoint's Direct Pay closes the loop — from "you qualify for a lower rate" to "your high-interest accounts are now paid off" in a single workflow. This is the difference between a referral engine and a financial co-pilot.

### Market Sizing
- **Debt consolidation market:** $1.27 billion (2025) → $1.92 billion (2033)
- **Debt management services market:** $47.17 billion (2025) → $99.9 billion (2035)
- **Personal loan originations for consolidation:** Over 15% of all U.S. personal loan originations — the largest single segment

---

## Feature 4: AI-Driven Credit Simulation (Agentic UI)

### What This Feature Does
An AI agent — **the Coach Agent** — continuously monitors the user's credit profile and proactively generates **Action Alerts** when meaningful events occur. Rather than waiting for users to log in and check their score, the Coach Agent pushes notifications such as:

> *"Your utilization on Card X reached 71%. This will likely drop your score 18 points next month, potentially moving you from the 9.9% APR tier to the 12.5% tier. Paying $1,600 now prevents this and saves $1,250 in interest. Want me to model a repayment plan?"*

The agent uses **GraphRAG** (graph-based retrieval-augmented generation) to maintain awareness of macroeconomic conditions — Fed rate changes, lender spread movements, and refinancing windows — so its recommendations account for market timing, not just credit score mechanics.

### Why This Feature Is Important

**From passive monitoring to active co-piloting:**
The fundamental limitation of existing credit monitoring products is that they are **reactive** — they notify the user after something has happened. A score drop is reported after the reporting cycle. A missed payment is flagged after the derogatory mark appears.

DeltaPoint's Coach Agent operates on **leading indicators** — it identifies conditions that will cause a future score change and intervenes before the penalty occurs. This is the difference between a rearview mirror and a dashboard.

**Market evidence:**
- The AI risk management market is projected to reach **$38.6 billion in 2025**
- AI platform lending grew **44% in a single year** (2024 → 2025), from $109.73 billion to $158.22 billion — the fastest-growing segment in fintech infrastructure
- Users of AI-powered credit optimization tools report an average **93-point credit score increase** — demonstrating that actionable AI guidance produces measurable outcomes

**The proactive alert mechanism creates multiple product benefits:**

1. **Retention:** Users who receive personalized, timely alerts have a reason to re-engage with the product weekly rather than quarterly. Active engagement is the primary predictor of retention in financial apps.

2. **Monetization:** An alert that says "you qualify for a refinancing rate 2% lower than your current loan" is a natural, non-pushy conversion trigger. The user has context, a specific recommendation, and a dollar value — all before a sales interaction begins.

3. **Default prevention:** By monitoring Burn Rate and utilization in real-time, the Coach Agent can identify users approaching financial stress before they default — enabling early intervention (payment plan suggestions, deferral options) that reduces charge-off rates.

4. **Trust building:** A financial tool that warns users about risks they weren't aware of — before those risks materialize — is a qualitatively different product category. It creates the perception of a trusted advisor rather than a data aggregator.

**Balance-to-Rate Arbitrage:**
A specific mechanism unique to DeltaPoint. When the Coach Agent detects a utilization spike, it calculates the exact payment amount that would lower utilization below the next penalty threshold, the resulting score recovery, and the interest savings from maintaining the better APR tier. This turns a generic "pay down your cards" recommendation into a precise, dollar-denominated action plan.

### Market Sizing
- **AI-powered credit tools:** 44% YoY market growth — fastest-growing fintech infrastructure segment
- **Global Digital Lending Platforms:** $507.27 billion (2025)
- **Consumer outcome validation:** 93-point average score improvement with AI-powered optimization tools

---

## Feature 5: Verified Identity Vault

### What This Feature Does
A secure document parsing system powered by multimodal AI vision that allows users to upload W-2s, pay stubs, and tax returns. The system extracts structured income and employment data in under 60 seconds with 99%+ accuracy, cross-references it against credit bureau records, and outputs a **Verified Identity** status that pre-populates loan applications — reducing final application time to effectively one click.

### Why This Feature Is Important

**The time-to-verification problem:**
Traditional income verification requires manual review of documents submitted by fax, email, or physical mail. Industry standard time-to-verification is **3–7 business days**. In a consumer market where instant gratification is the norm, this is a catastrophic conversion bottleneck — studies show application abandonment rates spike at every hour of delay.

Modern OCR + multimodal AI brings this to **under 10 seconds** with 99% accuracy. The technical barrier is solved. The only remaining question is whether a product implements it.

**Market evidence:**
- Independent 2025 benchmark testing shows leading AI document processing platforms achieving **99% extraction accuracy** with **1.8–4 second** average processing time
- The global OCR market is projected to grow from **$13.95 billion (2024) to $46 billion (2033)**
- Banks using automated document processing reduce **loan default rates by 25%** — the accuracy improvement has direct risk management value, not just UX benefit
- Field-level accuracy in financial document processing: **98.7%** (2025 independent benchmark)

**Why this creates a competitive moat:**

1. **Network effect on trust:** A user who has uploaded and verified their income documents with DeltaPoint has invested in the platform. This creates switching cost — they would need to re-verify elsewhere. The Vault becomes a sticky asset.

2. **One-click application:** Pre-verified income + identity data means the user's loan application is essentially pre-filled and pre-approved. The application becomes a confirmation step rather than a data entry exercise. This directly increases conversion rates.

3. **Fraud reduction:** Cross-referencing uploaded document data against bureau records catches income inflation — a primary source of first-party loan application fraud. The 25% default rate reduction from automated document processing is partially explained by this fraud detection capability.

4. **Unlocks the thin-file market:** For users whose credit scores underrepresent their creditworthiness (the 32–80 million credit-invisible consumers identified in Feature 2), verified income documents provide the supplementary evidence needed for cashflow-based underwriting. The Vault feeds directly into Feature 2's approval engine.

5. **Regulatory alignment:** The CFPB's confirmation that income and cash flow data is appropriate for credit underwriting decisions provides regulatory cover for this feature. The Vault is not a workaround — it is an explicitly sanctioned underwriting data source.

**The compounding effect:** Features 2 and 5 are mutually reinforcing. The Identity Vault provides verified income data. Cashflow-Based Underwriting incorporates that data to generate Boosted Approval Odds. Together, they create an underwriting pipeline that is more accurate, faster, and more inclusive than bureau-only models — simultaneously improving user outcomes and platform risk quality.

### Market Sizing
- **OCR market:** $13.95 billion (2024) → $46 billion (2033), CAGR ~14%
- **Default rate reduction:** 25% improvement from automated document processing — direct unit economics impact
- **Addressable segment via thin-file underwriting:** 32–80 million U.S. adults

---

## Feature Priority Matrix

| Feature | User Value | Platform Value | Technical Complexity | Build Priority |
|---|---|---|---|---|
| Rate Optimizer (Delta Slider) | ★★★★★ | ★★★★★ | Medium | **1 — Built ✅** |
| AI Credit Simulation (Coach Agent) | ★★★★★ | ★★★★☆ | High | **2** |
| Identity Vault | ★★★★☆ | ★★★★★ | Medium-High | **3** |
| Cashflow-Based Underwriting | ★★★★☆ | ★★★★★ | High | **4** |
| Direct Pay / Debt Consolidation | ★★★★★ | ★★★☆☆ | High | **5** |

---

## Why This Feature Order?

**Rate Optimizer first** because it:
- Requires no external data integrations (works on user-input data)
- Produces immediate, demonstrable value (a dollar savings figure)
- Creates the behavioral motivation that makes all subsequent features useful
- Has the lowest technical risk of the five features
- Validates the core hypothesis ("users care about the dollar cost of their score") before investing in complex integrations

Once users understand their Interest Delta, they have a reason to:
- Engage with the Coach Agent's alerts (to close that delta faster)
- Upload identity documents (to access better rates sooner)
- Connect banking data (to qualify for cashflow-boosted approval)
- Execute the Direct Pay consolidation (to capture the savings they calculated)

**The Rate Optimizer is the activation event. Every other feature is an acceleration mechanism.**

---

## Competitive Positioning

| Dimension | Incumbent Credit Tools | DeltaPoint |
|---|---|---|
| Core focus | General credit health | Loan cost optimization |
| Data sources | Bureau reports (delayed) | Bureau + real-time banking (live) |
| Primary insight | "Your score changed" | "Your rate just changed by X%, saving you $Y" |
| User action | Click referral link | Execute debt paydown via Direct Pay |
| Underwriting | Bureau score only | Bureau + cashflow + verified income |
| Agent behavior | Reactive (post-event alerts) | Proactive (pre-event intervention) |
| Identity verification | Manual form entry | Sub-60-second AI document parsing |
| Primary metric | Score increase | Interest savings ($) |

---

## Success Metrics

| Feature | Primary KPI | Target |
|---|---|---|
| Rate Optimizer | % users who move to next APR tier within 90 days | 35% |
| Cashflow Underwriting | Approval rate for thin-file users vs. bureau-only baseline | +40% |
| Direct Pay | % of consolidation loan proceeds correctly deployed | 95% |
| Coach Agent | Monthly active alert engagement rate | 60% |
| Identity Vault | Time-to-verification | < 60 seconds |
| Platform | Average Interest Delta realized per user (annual) | $1,200+ |

---

## Risk & Mitigation

| Risk | Likelihood | Mitigation |
|---|---|---|
| Regulatory: cash flow data use challenged | Medium | CFPB has explicitly sanctioned; maintain audit trail of user consent |
| Data accuracy: OCR errors in income extraction | Low | 99% accuracy with human-review escalation for <95% confidence scores |
| Behavioral: users don't act on Coach Agent alerts | Medium | Dollar-denominated framing; one-tap action from alert to execution |
| Technical: real-time credit data latency | Low | Cache score data; use webhooks for bureau change events |
| Market: rising rates reduce refinancing incentive | Low | Higher rates increase the dollar spread between tiers, amplifying DeltaPoint's value |

---

## Appendix: Key Data Sources

| Statistic | Source |
|---|---|
| $276B personal loan debt, 26.4M borrowers | LendingTree Personal Loan Statistics 2026 |
| CAGR 15.5% personal loan market | Fortune Business Insights |
| 42% more likely to borrow in 2026 | Bankrate Consumer Survey |
| 40% accuracy improvement from cashflow scoring | Experian Combined Score Press Release, Nov 2025 |
| 90% of lenders support alternative data | Nova Credit State of Alternative Data Report 2024 |
| 32M credit invisible | CFPB Credit Invisible Report 2025 |
| 93-point avg score improvement | Dovly AI Platform Data 2025 |
| 99% OCR accuracy, 1.8s latency | Shufti Pro / Veryfi 2025 Benchmark |
| 25% default rate reduction from automated doc processing | Klearstack Lending OCR Guide 2025 |
| AI lending platform +44% YoY | CoinLaw Fintech Lending Statistics 2025 |
| 35% use personal loans for consolidation | Experian Personal Loan Usage Statistics 2025 |
| Federal Reserve APR/risk nonlinear relationship | Federal Reserve FEDS Notes, September 2025 |

---

*DeltaPoint PRD v1.0 · Research Engineering Team · April 2026*
*Built with Claude Code · Powered by Gemini 1.5 Pro · Orchestrated by LangGraph*
