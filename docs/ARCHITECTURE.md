# DeltaPoint — Architecture

A complete technical breakdown of the system: how data flows, how agents communicate, and how the math works.

---

## System Overview

DeltaPoint is built on three layers that talk to each other in sequence:

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER INPUT LAYER                          │
│                                                                    │
│   Credit Score · DTI Ratio · Utilization · Hard Inquiries         │
│   Loan Principal · Term · Uploaded Documents                      │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                        AGENT LAYER (LangGraph)                    │
│                                                                    │
│   ┌─────────────────────┐       ┌──────────────────────────┐     │
│   │  UNDERWRITER AGENT  │       │      COACH AGENT          │     │
│   │  (Deterministic)    │◄─────►│  (Gemini 1.5 Pro + RAG)  │     │
│   │                     │       │                           │     │
│   │  Input:             │       │  Input:                   │     │
│   │  • FICO score       │       │  • Live utilization       │     │
│   │  • DTI ratio        │       │  • Balance history        │     │
│   │  • Utilization %    │       │  • Macro rate data        │     │
│   │  • Hard inquiries   │       │                           │     │
│   │                     │       │  Output:                  │     │
│   │  Output:            │       │  • Spike alerts           │     │
│   │  • Risk grade A+→D  │       │  • Arbitrage moves        │     │
│   │  • APR tier         │       │  • Dollar savings         │     │
│   │  • Approval odds    │       │  • Chat responses         │     │
│   │  • Next action      │       │                           │     │
│   └────────┬────────────┘       └──────────────┬────────────┘     │
│            │                                   │                  │
│            └────────────────┬──────────────────┘                  │
│                             │                                      │
│                    LangGraph State Machine                         │
│                    ← Stateful · Cyclic · MCP ←                    │
└─────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      INTELLIGENCE LAYER                           │
│                                                                    │
│   ┌──────────────────┐   ┌───────────────────┐  ┌─────────────┐ │
│   │  Gemini 1.5 Pro  │   │  LlamaIndex       │  │     MCP     │ │
│   │                  │   │  GraphRAG         │  │  Protocol   │ │
│   │  Long-context    │   │                   │  │             │ │
│   │  financial doc   │   │  Indexes:         │  │  Bridges    │ │
│   │  analysis        │   │  • Fed rate data  │  │  LLM to     │ │
│   │                  │   │  • Lender spreads │  │  local data │ │
│   │  Used by:        │   │  • Market filings │  │  CSVs       │ │
│   │  Coach Agent     │   │  • SOFR / Prime   │  │  Tools      │ │
│   │  Identity Vault  │   │                   │  │             │ │
│   └──────────────────┘   └───────────────────┘  └─────────────┘ │
└─────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                     IDENTITY VAULT LAYER                          │
│                                                                    │
│   User uploads document (W2 / Pay Stub / Tax Return)             │
│                         │                                         │
│                         ▼                                         │
│             Gemini 1.5 Flash Vision                               │
│             ← Multimodal OCR · Sub-60s · 99% accuracy →          │
│                         │                                         │
│                         ▼                                         │
│             Structured Data Extraction                            │
│             { gross_income, employer, dti, identity }             │
│                         │                                         │
│                         ▼                                         │
│             Bureau Cross-Reference                                │
│             ← confidence ≥ 90%? → VERIFIED : request re-upload → │
└─────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                          UI LAYER                                 │
│                                                                    │
│   React 19 · Tailwind CSS · Framer Motion                        │
│                                                                    │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│   │ Delta Slider │  │  Agent Panel │  │   Identity Vault UI  │  │
│   │              │  │              │  │                      │  │
│   │ Live amort.  │  │ Editable     │  │  Upload zone         │  │
│   │ calculation  │  │ inputs +     │  │  Progress bar        │  │
│   │ Score → APR  │  │ live output  │  │  Extracted data      │  │
│   │ Tier table   │  │ Chat panel   │  │  Vault status        │  │
│   └──────────────┘  └──────────────┘  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

How a single user action (moving the credit score slider) propagates through the system:

```
User drags slider to score = 720
              │
              ▼
      JS event listener fires
              │
              ▼
      getTier(720) → { grade: "B+", apr: 9.99% }
              │
              ▼
      calcPayment(P, r=9.99/12/100, n=60)
      M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)
              │
              ├──→ Update: monthly payment display
              ├──→ Update: total interest display
              ├──→ Update: APR display (color-coded)
              ├──→ Update: Interest Delta card
              ├──→ Update: thumb position on gradient track
              ├──→ Rebuild: tier comparison table (all 10 rows)
              └──→ Highlight: current tier row in table
```

---

## Agent Communication Graph

How the Underwriter and Coach agents interact inside the LangGraph state machine:

```
                    ┌─────────────────────┐
                    │   CreditState       │
                    │                     │
                    │  fico_score: int    │
                    │  dti: float         │
                    │  utilization: float │
                    │  inquiries: int     │
                    │  principal: float   │
                    │  term: int          │
                    └──────────┬──────────┘
                               │
              ┌────────────────┤
              │                │
              ▼                ▼
  ┌────────────────┐   ┌──────────────────┐
  │  UNDERWRITER   │   │     COACH        │
  │  NODE          │   │     NODE         │
  │                │   │                  │
  │  Runs first    │   │  Runs in         │
  │  on every      │   │  parallel with   │
  │  state change  │   │  background      │
  │                │   │  monitoring      │
  │  Output →      │   │                  │
  │  risk_grade    │   │  Output →        │
  │  interest_tier │   │  alerts[]        │
  │  approval_prob │   │  arbitrage{}     │
  │  action        │   │  chat_response   │
  └────────┬───────┘   └────────┬─────────┘
           │                    │
           └─────────┬──────────┘
                     │
                     ▼
            ┌────────────────┐
            │  STATE UPDATE  │
            │                │
            │  Merged output │
            │  written back  │
            │  to CreditState│
            └────────┬───────┘
                     │
                     ▼
              ┌─────────────┐
              │  UI RENDER  │
              │  (React 19) │
              └─────────────┘
                     │
             Did state change?
                     │
             YES ────┘ loop back
             NO  → idle, wait for next input
```

---

## The Delta Formula

The entire value proposition of DeltaPoint rests on one formula — the standard loan amortization equation:

```
         r(1+r)ⁿ
M = P × ─────────
         (1+r)ⁿ−1
```

| Variable | Meaning | Example |
|---|---|---|
| `M` | Monthly payment | $562.21 |
| `P` | Principal (loan amount) | $25,000 |
| `r` | Monthly interest rate = APR ÷ 12 ÷ 100 | 0.001041 (12.49% APR) |
| `n` | Number of months (loan term) | 60 months |

### The Interest Delta

The **Interest Delta (Δ)** is the dollar difference in total interest paid between two APR tiers:

```
Total interest at current APR  =  (M_current × n) − P
Total interest at target APR   =  (M_target  × n) − P

Δ = (M_current − M_target) × n
```

**Worked example** ($25,000 / 60 months, Grade B → Grade A−):

```
Grade B  (12.49% APR):  M = $562  ·  Total interest = $8,739
Grade A− ( 8.24% APR):  M = $510  ·  Total interest = $5,600

Δ = ($562 − $510) × 60 = $52 × 60 = $3,120 saved
```

---

## Market Rate Adapter

The Market Rate Adapter is a pluggable layer that maps credit grades to APR tiers. It is defined as a JSON array that can be swapped without changing any application code:

```json
[
  { "grade": "A+", "min_score": 780, "max_score": 850, "apr": 6.49 },
  { "grade": "A",  "min_score": 760, "max_score": 779, "apr": 7.24 },
  { "grade": "A-", "min_score": 740, "max_score": 759, "apr": 8.24 },
  { "grade": "B+", "min_score": 720, "max_score": 739, "apr": 9.99 },
  { "grade": "B",  "min_score": 700, "max_score": 719, "apr": 12.49 },
  { "grade": "B-", "min_score": 680, "max_score": 699, "apr": 13.99 },
  { "grade": "C+", "min_score": 660, "max_score": 679, "apr": 15.49 },
  { "grade": "C",  "min_score": 620, "max_score": 659, "apr": 18.99 },
  { "grade": "C-", "min_score": 580, "max_score": 619, "apr": 22.49 },
  { "grade": "D",  "min_score": 300, "max_score": 579, "apr": 24.99 }
]
```

To integrate a new lender, replace this file with that lender's rate sheet. The Underwriter Agent and Delta Slider automatically re-run against the new tiers.

---

## Underwriter Agent — Penalty Logic

```
function underwriter(score, dti, utilization, inquiries):

    tier = lookup_tier(score)           # base tier from rate adapter

    if dti > 43:
        tier = downgrade(tier, steps=2)
    elif dti > 36:
        tier = downgrade(tier, steps=1)

    if utilization > 75:
        tier = downgrade(tier, steps=1)

    if inquiries > 4:
        tier = downgrade(tier, steps=1)

    next_tier = upgrade(tier, steps=1)
    pts_needed = next_tier.min_score − score

    return {
        risk_grade:     tier.grade,
        interest_tier:  tier.apr,
        approval_prob:  tier.base_prob,
        score_to_next:  pts_needed,
        next_grade:     next_tier.grade,
        delta:          calculate_delta(tier.apr, BEST_APR, principal=25000, n=60),
        action:         generate_action(tier, utilization, dti)
    }
```

---

## Coach Agent — Alert Decision Tree

```
Every monitoring cycle:

  Check utilization
  ├── > 75%?  → CRITICAL alert: "Immediate payment needed"
  ├── > 70%?  → WARNING alert:  "Balance-to-rate arbitrage available"
  └── ≤ 70%?  → No alert

  Check macro data (GraphRAG query)
  ├── Spread narrowing?  → "Refinancing window open"
  ├── Fed rate change?   → "Target APR tiers adjusted"
  └── No change         → No alert

  On each alert:
  ├── Calculate exact payment amount to fix threshold breach
  ├── Calculate score points recovered
  ├── Calculate dollar savings over loan life
  └── Push formatted alert to user
```

---

## Identity Vault — Verification Pipeline

```
Document uploaded
      │
      ▼
Gemini 1.5 Flash
      │
      ▼ (< 60 seconds)
Structured extraction
{ gross_income, monthly_income, employer,
  employment_type, tax_year, identity_fields }
      │
      ▼
Bureau cross-reference
      │
      ├── Confidence ≥ 90%  →  VERIFIED ✓
      │                        Pre-fill loan application
      │
      └── Confidence < 90%  →  Flag mismatch fields
                                Request re-upload
                                Log discrepancy for fraud review
```

---

## Tech Stack Reference

| Layer | Tool | Version | Purpose |
|---|---|---|---|
| Agent orchestration | LangGraph | v0.1+ | Stateful cyclic multi-agent graph |
| LLM intelligence | Gemini 1.5 Pro | 2025 | Long-context financial reasoning |
| OCR / Vision | Gemini 1.5 Flash | 2025 | Document parsing |
| RAG index | LlamaIndex GraphRAG | latest | Global rate data retrieval |
| LLM bridge | Model Context Protocol | latest | LLM ↔ local data / tools |
| UI framework | React | 19 | Component rendering |
| Styling | Tailwind CSS | CDN | Utility-first CSS |
| Animation | Framer Motion | latest | Spring-physics UI transitions |
| Dev environment | Claude Code | latest | Terminal-based agentic iteration |

---

*[← Back to README](../README.md) · [Features →](FEATURES.md) · [Getting Started →](GETTING-STARTED.md) · [PRD →](PRD.md)*
