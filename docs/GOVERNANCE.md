# DeltaPoint — Regulatory & Governance Framework

How DeltaPoint approaches compliance, fair lending, data privacy, and model governance.

---

## Overview

DeltaPoint touches three regulatory domains: **credit data** (FCRA), **fair lending** (ECOA / Regulation B), and **financial data privacy** (CFPB / GLBA). Every architectural decision in the platform was made with these constraints in mind — not retrofitted after the fact.

---

## 1. FCRA — Fair Credit Reporting Act

### What It Requires
Any system that accesses, processes, or uses consumer credit data must:
- Obtain permissioned consumer consent before accessing bureau data
- Maintain data accuracy and a process to dispute errors
- Restrict use of credit data to permissible purposes (underwriting, credit monitoring)
- Not retain raw credit data beyond the permissible use window

### How DeltaPoint Complies

**Consent-first architecture.** The Delta Slider and Underwriter Agent operate on **user-provided inputs** — the user types their own score, DTI, and utilization. No bureau pull is triggered unless the user explicitly initiates a Vault verification or approval-odds request. This is a deliberate design choice: zero bureau pulls without affirmative consent.

**Permissible purpose scoping.** When bureau data is accessed (Identity Vault cross-reference), it is scoped strictly to income verification for underwriting — a named permissible purpose under FCRA § 604(a)(3)(A).

**No raw data retention.** Extracted Identity Vault fields (income, employer, DTI) are stored as structured verification results, not raw document images or raw bureau report data.

**Dispute pathway.** The Identity Vault's confidence threshold system (≥ 90% = VERIFIED; < 90% = flag and re-upload) creates a natural dispute pathway. Any mismatch between uploaded documents and bureau records is flagged to the user with specific fields identified — enabling the user to correct inaccuracies before they affect an underwriting decision.

---

## 2. ECOA / Regulation B — Equal Credit Opportunity Act

### What It Requires
Credit decisions must not discriminate based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance. When adverse action is taken, the applicant must receive a specific written notice explaining the reasons.

### How DeltaPoint Complies

**Deterministic, explainable risk grading.** The Underwriter Agent applies a fixed, transparent penalty logic:

```
Base tier  ←  FICO score
DTI > 43%          → −2 grades
DTI 37–43%         → −1 grade
Utilization > 75%  → −1 grade
Hard inquiries > 4 → −1 grade
```

Every input is a financial variable, not a demographic proxy. The same inputs always produce the same output. There are no hidden weights, no LLM inference in the decision path, and no variables correlated with protected characteristics.

This is why the Underwriter Agent is **deterministic code, not an LLM**. An LLM's implicit reasoning cannot be audited for disparate impact. A deterministic rule set can.

**Adverse Action Notice generation.** For any user who receives a grade below their expected tier, the system generates a structured explanation:

```
Your risk grade: B− (13.99% APR)
Factors applied:
  • DTI ratio of 41% → −1 grade applied
  • Credit utilization of 78% → −1 grade applied
Actions to reach next tier (B at 12.49%):
  • Reduce utilization below 75%
  • Reduce DTI below 37%
```

This output is structured to satisfy Regulation B adverse action notice requirements: specific reasons, stated clearly, actionable.

**No protected-class inputs.** The system accepts: FICO score, DTI, utilization percentage, hard inquiry count, loan principal, and term. No age, no marital status, no geographic data, no proxy variables. The input schema is the compliance boundary.

---

## 3. CFPB — Consumer Financial Protection Bureau

### Cashflow Data and Open Banking

The CFPB has explicitly confirmed that consumer-permissioned cash flow data is appropriate for use in credit underwriting decisions and is consistent with safe and sound practices (CFPB guidance, 2024).

DeltaPoint's Cashflow-Based Underwriting feature is designed around the CFPB's framework:
- **Consumer-permissioned only.** Banking data is accessed via OAuth-based Open Banking APIs. The user initiates and can revoke consent at any time.
- **Purpose-limited.** Cash flow data is used exclusively to generate Boosted Approval Odds. It is not sold, shared with third parties, or used for targeted advertising.
- **Transparent modeling.** The Burn Rate Tracker shows the user the exact cash flow calculation before any underwriting decision is made — the model is not a black box.

### Thin-File Borrowers

The CFPB has identified credit-invisible consumers (estimated 26–45 million Americans) as a priority group for financial inclusion. DeltaPoint's cashflow underwriting directly addresses this gap — giving consumers with limited credit history a pathway to approval based on demonstrated financial behavior rather than the absence of a bureau record.

---

## 4. GLBA — Gramm-Leach-Bliley Act

### What It Requires
Financial institutions must protect the privacy and security of consumers' nonpublic personal information (NPI). This includes income, account numbers, credit history, and any data derived from financial transactions.

### How DeltaPoint Complies

**Data minimization.** The Identity Vault extracts the minimum fields required for underwriting (gross income, employer, DTI, identity match confidence). Raw document images are processed in-memory and not persisted after extraction.

**Encryption at rest and in transit.** All NPI is encrypted (AES-256 at rest, TLS 1.3 in transit). The Vault's confidence score and verification status are stored separately from the underlying financial data.

**Privacy notice.** Users receive a clear disclosure of what data is collected, how it is used, and how it can be deleted before the Vault upload flow begins.

---

## 5. Model Governance

### The Deterministic / LLM Split

DeltaPoint makes a deliberate architectural choice about where AI models are and are not used:

| Component | Type | Reason |
|---|---|---|
| Underwriter Agent (risk grading) | Deterministic code | Financial outputs require correctness, auditability, and reproducibility |
| Delta Slider (amortization math) | Deterministic formula | Standard financial math — no inference needed or wanted |
| Coach Agent (alerts, chat) | LLM (Gemini 1.5 Pro) | Language generation, nuanced explanation — no hard financial output |
| Identity Vault (OCR) | Multimodal AI (Gemini Flash) | Extraction task with explicit confidence threshold; human review on low confidence |

**Why this matters for governance:** Any model that produces a number that influences a credit decision must be auditable. The Underwriter Agent's penalty rules are readable, versionable, and testable — a compliance team can review them line by line. The LLM components (Coach Agent, OCR) produce language and extracted fields, not credit decisions. The separation is intentional.

### Bias Testing

The Underwriter Agent accepts only financial variables as inputs. Bias testing for this model consists of verifying that:
1. No demographic proxies are present in the input schema
2. The penalty rules apply identically for identical financial inputs regardless of who submits them
3. Output distributions across synthetic user profiles show no correlation with protected-class proxies

Because the logic is fully deterministic and the input schema is constrained, bias testing is straightforward and auditable.

### Model Change Control

The rate adapter (APR tier mapping) is externalized as a versioned JSON schema. Any change to tier boundaries or APR values:
- Requires an explicit version bump
- Is logged with timestamp and rationale
- Triggers a re-run of the full Underwriter test suite
- Does not require application code changes (reducing deployment risk)

---

## 6. Consumer Consent Architecture

```
User action required before any data access:

  FICO / financial inputs  →  User types manually (no bureau pull)
  Identity Vault           →  Explicit upload action + disclosure screen
  Cashflow underwriting    →  OAuth consent flow (bank connection)
  Bureau cross-reference   →  Triggered only by user-initiated Vault verification
```

No data access is passive. Every access requires an affirmative user action with a disclosure shown before the action is taken.

---

## Summary

| Regulation | Key Requirement | DeltaPoint's Approach |
|---|---|---|
| FCRA | Permissioned access, permissible purpose | User-input first; bureau pull only on explicit consent |
| ECOA / Reg B | No discrimination; adverse action notice | Deterministic logic only; structured explanation output |
| CFPB | Cashflow data use sanctioned with consent | OAuth-based, purpose-limited, user-revocable |
| GLBA | NPI protection | Data minimization, encryption, in-memory processing |
| Model governance | Auditability, fairness, change control | Deterministic credit logic; LLM only for language tasks |

---

*[← Back to README](../README.md) · [Architecture →](ARCHITECTURE.md) · [Decisions →](DECISIONS.md) · [PRD →](PRD.md)*
