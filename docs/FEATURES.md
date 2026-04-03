# DeltaPoint — Features

Five features that together form a complete credit-to-yield optimization system. Each one is explained below in plain English — what it does, how it works, and why it exists.

---

## Feature 1 — Delta Slider

**Plain English:** A live calculator. You set your loan amount and term, move a credit score slider, and the app instantly shows you your monthly payment, total interest, and the exact dollar amount you would save by reaching the best available rate. No estimates. Real math.

![Delta Slider](screenshots/02-delta-slider.png)

### How It Works

The slider runs the standard loan amortization formula on every position change:

```
M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)

M = monthly payment
P = loan principal
r = monthly rate (APR ÷ 12)
n = number of months
```

Your credit score determines your APR tier (10 tiers from D at 24.99% to A+ at 6.49%). As you move the slider, the formula recalculates and you see:

- **Monthly payment (M)** — what you pay each month right now
- **Total interest** — what you pay over the full loan life
- **Best available rate** — the payment at the A+ tier
- **Your Interest Delta (Δ)** — the dollar gap between your current cost and the best available rate

### Score → APR Tier Table

| Score Range | Grade | APR | Monthly ($25k/60mo) | Total Interest |
|---|---|---|---|---|
| 780–850 | A+ | 6.49% | $489 | $4,340 |
| 760–779 | A  | 7.24% | $497 | $4,820 |
| 740–759 | A− | 8.24% | $510 | $5,600 |
| 720–739 | B+ | 9.99% | $530 | $6,820 |
| 700–719 | B  | 12.49% | $562 | $8,739 |
| 680–699 | B− | 13.99% | $581 | $9,860 |
| 660–679 | C+ | 15.49% | $600 | $11,000 |
| 620–659 | C  | 18.99% | $648 | $13,880 |
| 580–619 | C− | 22.49% | $698 | $16,880 |
| 300–579 | D  | 24.99% | $734 | $19,040 |

> Moving from Grade B (700–719) to Grade A− (740–759) on a $25,000 / 60-month loan saves **$3,139 in total interest**.

### What You Can Adjust
- **Principal** — $5,000 to $100,000
- **Term** — 24 / 36 / 48 / 60 months
- **Credit score** — 500 to 800 (slider)

---

## Feature 2 — Underwriter Agent

**Plain English:** You type in your credit inputs — score, debt-to-income ratio, utilization, hard inquiries — and an AI agent immediately tells you your risk grade, the interest rate you qualify for, how likely you are to be approved, and the one specific action that would move you to the next grade up.

![Underwriter Agent](screenshots/03-underwriter.png)

### How It Works

The Underwriter Agent is a **deterministic LangGraph node** — meaning it produces the same output every time for the same inputs. No randomness. No hallucination. Pure calculation.

It starts with your FICO score, finds your base APR tier, then applies penalty rules:

```
Base tier  ←  FICO score (500–850 mapped to 10 tiers)

Penalty rules (each lowers your grade by 1 step):
  DTI > 43%          → −2 grades
  DTI 37–43%         → −1 grade
  Utilization > 75%  → −1 grade
  Hard inquiries > 4 → −1 grade
```

### Output Fields

| Field | What it means |
|---|---|
| `risk_grade` | Your letter grade: A+ (best) down to D |
| `interest_tier` | The APR you qualify for at this grade |
| `approval_prob` | Estimated probability of loan approval |
| `score_to_upgrade` | Exact points needed to reach the next grade |
| `delta_saved` | Dollar savings vs. the best available rate |
| `action` | One specific recommended action (e.g., "reduce Chase utilization to 30%") |

### Market Rate Adapter

The agent compares your rate across multiple lenders simultaneously using pluggable JSON rate cards. Swap in any lender's rate sheet and the agent re-runs instantly — giving you the optimal provider for your specific credit profile.

---

## Feature 3 — Coach Agent

**Plain English:** An AI that watches your credit profile 24/7 and alerts you the moment something changes that affects your rate. Instead of you checking your score and hoping nothing bad happened, the Coach finds the problem first — and tells you exactly what to do about it in dollar terms.

![Coach Agent](screenshots/04-coach-agent.png)

### How It Works

The Coach Agent runs as a second LangGraph node alongside the Underwriter. It has two modes:

**1. Utilization Spike Monitor**
When your credit utilization crosses a penalty threshold, the agent:
- Calculates the score penalty you're about to receive
- Computes the exact payment amount that keeps you below the threshold
- Shows you the dollar savings from making that payment before the reporting date

Example alert:
> *"Chase Sapphire hit 71% utilization. This drops your score 18 points and moves you from the 9.99% tier to the 12.49% tier. Paying $1,600 now prevents this and saves $1,250 in interest over your loan life."*

**2. Rate Arbitrage Alerts**
The Coach monitors macroeconomic conditions via **GraphRAG** (a retrieval system indexed against global interest rate data using LlamaIndex). When Fed rate decisions, lender spread changes, or refinancing windows appear:
> *"Lender spreads narrowed 0.25% this week. At your current Grade B+, you qualify for 8.24%. This window is open for 14 days."*

### Live Chat
The Coach Agent includes a conversational interface. Ask it anything about your credit:
- "What would happen if I paid off my Citi card?"
- "Am I better off waiting 60 days to apply?"
- "What's the fastest way to hit the A− tier?"

It responds with specific numbers, not generic advice.

---

## Feature 4 — Identity Vault

**Plain English:** Instead of filling out a loan application from scratch, you upload a photo of your W2, pay stub, or tax return. The AI reads it in under 60 seconds, pulls out your income and employment data, and verifies it against credit bureau records. When you apply for a loan, the form is already filled out. Verified. Ready.

![Identity Vault](screenshots/05-identity-vault.png)

### How It Works

The Identity Vault uses **Gemini 1.5 Flash** — a multimodal AI model that can read images of documents the same way a human would, but in seconds.

Upload pipeline:
```
1. User uploads W2, pay stub, or tax return (PDF or photo)
2. Gemini 1.5 Flash extracts structured data fields
3. Extracted data is cross-referenced against credit bureau records
4. If confidence ≥ 90%: "VERIFIED" status granted
5. If confidence < 90%: user is prompted to re-upload a clearer image
```

### Data Extracted

| Field | Example |
|---|---|
| `gross_income` | $94,200 / year |
| `monthly_income` | $7,850 |
| `employer` | Acme Corp (verified ✓) |
| `employment_type` | W-2 Full-Time |
| `dti_ratio` | 28.4% |
| `identity_match` | 98.7% confidence |
| `parse_time` | 4.2 seconds |

### Why This Matters

| Traditional process | DeltaPoint |
|---|---|
| Email or fax documents | Upload photo or PDF |
| 3–7 business days for review | Under 60 seconds |
| Manual data entry into application | Pre-filled automatically |
| No cross-verification | Cross-referenced against bureau data |
| High fraud risk | Income inflation flagged automatically |

The 80% reduction in time-to-verification is not just a UX improvement — banks using automated document processing reduce loan default rates by 25%, because the same system that speeds up verification also catches fraudulent income claims.

---

## Feature 5 — Cashflow-Based Underwriting *(Roadmap)*

**Plain English:** Traditional credit scores are based on your past. Cashflow underwriting is based on your present. By linking your bank account (with your permission), DeltaPoint can see your actual income deposits, your monthly expenses, and your free cash flow — and use that to generate a "Boosted Approval Odds" score. This helps people who have good financial habits but limited credit history.

### Who This Helps

- First-time borrowers with thin credit files
- Self-employed individuals with irregular but strong income
- People who primarily use debit and cash (no credit history)
- Recent arrivals with no domestic credit record

These groups represent **32–80 million Americans** who are either fully credit-invisible or have insufficient credit history for standard underwriting — despite being financially capable of repaying a loan.

### The Burn Rate Tracker

A companion safeguard: before approving a loan, the system models the user's post-loan monthly cash flow. If the new payment would push their free cash flow below zero, they receive a warning — not a denial, but a transparent view of the affordability math so they can make an informed decision.

---

## How the Features Connect

```
User enters credit profile
         │
         ▼
   [Delta Slider]
   Calculates Interest Delta →  "You're overpaying $4,397"
         │
         ▼
   [Underwriter Agent]
   Risk grade + APR tier  →  "Grade B · 12.49% · Pay Chase to reach B+"
         │
         ▼
   [Coach Agent]
   24/7 monitoring        →  "Utilization spike — act now, save $1,250"
         │
         ▼
   [Identity Vault]
   Verified income        →  "One-click application ready"
         │
         ▼
   [Cashflow Underwriting]
   Boosted approval odds  →  "Thin file? Strong cash flow unlocks your loan"
```

Each feature answers a different question, but they all serve the same goal: **close the gap between your credit profile today and the lowest rate available to you.**

---

*[← Back to README](../README.md) · [Architecture →](ARCHITECTURE.md) · [Getting Started →](GETTING-STARTED.md) · [PRD →](PRD.md)*
