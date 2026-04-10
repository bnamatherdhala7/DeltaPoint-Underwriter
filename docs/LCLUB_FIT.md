# DeltaPoint × Lclub — Strategic Fit Brief

How DeltaPoint's features map to Lclub's existing business, where they extend the platform, and what each stakeholder needs to understand.

---

## Why This Matters to Lclub

Lclub is a personal loan marketplace and digital bank. Its core business depends on three things:

1. **Originating loans** to qualified borrowers at competitive rates
2. **Pricing risk accurately** so loans are profitable across the loan book
3. **Retaining borrowers** who return for refinancing, additional products, and banking services

DeltaPoint was designed to strengthen all three — not as a competing product, but as a borrower activation and optimization layer that sits upstream of origination.

---

## Feature-by-Feature Fit

### Delta Slider → Lclub Rate Tiers

Lclub grades loans A through E. DeltaPoint's Delta Slider maps directly to this model — the rate adapter is a pluggable JSON schema, meaning Lclub's actual rate tiers can replace the default tiers with a single configuration change.

**What this enables:**
- A prospective Lclub borrower can see exactly what their current grade costs them versus an A-grade loan before applying
- The Interest Delta becomes a Lclub-specific dollar figure, tied to Lclub's real APR spread
- The slider becomes an acquisition tool: users who see their specific savings number at Lclub have a dollar-denominated reason to apply now

**Integration complexity:** Low. One JSON file swap. No application code changes required.

---

### Underwriter Agent → Lclub's Pre-Qualification Flow

Lclub currently uses a soft-pull pre-qualification check. The Underwriter Agent adds a layer on top: before the user initiates any pull, they see their likely risk grade, the specific factors dragging it down, and the one action that would move them up a tier.

**What this enables:**
- Users who are borderline (e.g., a DTI of 44% that could be reduced) can act before applying, improving their pre-qualification outcome
- Users who receive a lower-than-expected grade understand why — reducing support volume from confused or frustrated applicants
- The structured output (risk grade, APR tier, penalty factors, next action) is formatted for Regulation B adverse action compliance out of the box

**Integration complexity:** Medium. Underwriter output would need to map to Lclub's internal grade definitions and APR tiers.

---

### Coach Agent → Borrower Retention and Repeat Origination

Lclub's borrower retention challenge: after a loan is originated, the borrower has little reason to re-engage with the platform until they want another loan. The Coach Agent changes this.

**What this enables:**
- Borrowers who stay on the platform receive real-time alerts when their credit profile improves enough to qualify for a refinancing rate better than their current loan
- A refinancing trigger (e.g., "you've reached Grade B+ — you now qualify for 9.99% vs. your current 12.49% — refinance saves you $1,250") is a natural, non-pushy re-origination event
- The Coach monitors utilization spikes that could affect a borrower's standing on an existing Lclub loan — early warning enables early intervention

**What this does for Lclub's unit economics:**
- Repeat borrowers have 40–60% lower acquisition cost than new borrowers
- A borrower who refinances with Lclub rather than a competitor is a retained loan book asset
- Early credit deterioration alerts reduce charge-off rates by enabling proactive outreach before default

**Integration complexity:** Medium-high. Requires a persistent user profile and a connection to credit monitoring data.

---

### Identity Vault → Income Verification Pipeline

Lclub's current income verification process follows industry standard: applicants submit documents that go through a manual or semi-automated review cycle taking 3–7 business days. The Identity Vault replaces this with a sub-60-second AI pipeline.

**What this enables:**
- Applicants receive an income verification decision in under 60 seconds rather than days
- Application abandonment rates drop — studies show abandonment spikes at every hour of verification delay
- Verified income data pre-fills the application form, reducing input errors and re-submissions
- The cross-reference check (document data vs. bureau records) catches income inflation — a primary source of first-party fraud that Lclub's current process catches after manual review

**What the data shows:**
- Banks using automated document processing reduce loan default rates by **25%** — partially because the same system that speeds up verification also catches discrepancies that manual review misses
- Field-level extraction accuracy: **98.7%** (2025 independent benchmark)
- Processing time: **1.8–4.2 seconds** average

**Integration complexity:** Medium. Gemini 1.5 Flash Vision pipeline needs to map extracted fields to Lclub's application schema.

---

### Cashflow Underwriting → Thin-File Market Expansion

Lclub's underwriting today relies heavily on bureau scores. This excludes an estimated **32–80 million Americans** who are credit-invisible or thin-file — not because they are bad credit risks, but because they lack the bureau history to be scored.

**What this enables:**
- Borrowers with strong cash flow but limited credit history can receive a Boosted Approval Odds score based on income-to-expense patterns, direct deposit consistency, and free cash flow
- Lclub gains access to an underserved market segment that competitors relying on bureau-only models cannot reach
- A combined score (bureau + cashflow) outperforms bureau-only by **40% in predictive accuracy** (Experian research, Nov 2025) — meaning Lclub prices risk more accurately, not just more inclusively

**Regulatory note:** The CFPB has explicitly sanctioned consumer-permissioned cash flow data for underwriting decisions. Lclub's regulatory team has a clear pathway to implement this under existing guidance.

**Integration complexity:** High. Requires Open Banking API integrations (Plaid or equivalent) and incorporation into Lclub's risk model.

---

## Stakeholder Talking Points

### For the VP of Product

DeltaPoint is a **borrower activation layer**. It answers the question every prospective Lclub borrower has but cannot easily answer today: "What does my credit profile cost me in dollars, and what do I need to do before I apply?"

The key metric this drives is **application quality** — borrowers who interact with the Delta Slider and Underwriter before applying arrive with:
- A clear understanding of their expected rate
- Reduced surprise at the offer they receive
- In many cases, a better credit profile than they would have had without the nudge

This reduces post-offer abandonment (a major conversion leak in marketplace lending) and improves the debt-to-income composition of the applicant pool.

The Coach Agent addresses a second problem: **retention**. Marketplace lenders spend 40–60% more acquiring a new borrower than retaining an existing one. The Coach creates a reason for borrowers to stay on the platform between loan events — and converts natural credit improvement milestones into refinancing conversations.

---

### For the VP of Engineering

Three architectural decisions are directly relevant to Lclub's engineering team:

**1. The rate adapter is an API contract, not hardcoded logic.**
The APR tier mapping is a versioned JSON schema. Lclub's rate sheet can be ingested without touching application code. Any rate changes, new tiers, or product-specific overrides are configuration changes, not deployments.

**2. The deterministic/LLM split is a compliance design pattern.**
The Underwriter Agent uses no LLM inference. The risk grading logic is deterministic code that produces the same output for the same inputs every time. This is auditable, testable, and regulatorily safe in a way that an LLM-driven credit decision is not. The LLM (Coach Agent) is used exclusively for language generation and explanation — never for credit decisions.

**3. LangGraph enables stateful multi-agent workflows without brittle glue.**
The Underwriter and Coach agents run in parallel, write back to shared state, and re-trigger on input change. This is not achievable cleanly with a prompt chain or a single-pass architecture. LangGraph's state machine model scales to additional agents (e.g., a Direct Pay execution agent, a market-timing agent) without architectural refactoring.

---

### For the Governance Head

Three points cover the full regulatory surface:

**1. Credit decisions are deterministic, not AI-inferred.**
The Underwriter Agent's penalty rules are explicit, finite, and contain only financial variables (FICO, DTI, utilization, inquiries). No demographic proxies. No hidden weights. The same inputs always produce the same output. Disparate impact testing is straightforward because the input schema is the compliance boundary.

**2. Adverse action output is compliance-ready.**
The Underwriter Agent generates a structured adverse action explanation with specific factors cited for every below-expected outcome. This is formatted to satisfy Regulation B requirements out of the box.

**3. Data access requires affirmative user consent at every step.**
No bureau data is accessed without explicit user initiation. No banking data is accessed without OAuth consent. No documents are stored after extraction. Every data access event maps to a specific user action and a disclosed purpose.

For a full breakdown, see [GOVERNANCE.md](GOVERNANCE.md).

---

## Summary

| DeltaPoint Feature | Lclub Business Line | Value |
|---|---|---|
| Delta Slider | Loan origination | Converts rate curiosity into applications |
| Underwriter Agent | Pre-qualification | Improves applicant quality; reduces post-offer abandonment |
| Coach Agent | Borrower retention | Drives repeat origination; early default warning |
| Identity Vault | Income verification | Sub-60s vs. 3–7 days; 25% default rate reduction |
| Cashflow Underwriting | Risk modeling | 40% accuracy improvement; thin-file market access |

---

*[← Back to README](../README.md) · [PRD →](PRD.md) · [Governance →](GOVERNANCE.md) · [Architecture →](ARCHITECTURE.md)*
