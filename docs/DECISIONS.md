# DeltaPoint — Architectural Decisions

Key design choices and the reasoning behind them.

---

## Why LangGraph over a simple prompt chain?

A single prompt chain runs top-to-bottom and stops. LangGraph gives us a **stateful, cyclic graph** — meaning the Underwriter and Coach agents can run in parallel, write back to shared state, and re-trigger when inputs change. This is critical for a financial tool where a single slider move needs to cascade through risk grading, payment calculation, and alert evaluation simultaneously. A chain can't do that cleanly without brittle glue code.

---

## Why deterministic logic for the Underwriter Agent, not an LLM?

The Underwriter Agent applies penalty rules to financial inputs and returns a risk grade and APR. This math is exact — there is a correct answer. Putting an LLM in this path introduces hallucination risk on financial outputs, which is both a regulatory and trust problem. The Agent Layer architecture lets us be deliberate: **use LLMs where reasoning and language generation add value (Coach Agent chat, GraphRAG queries), use deterministic code where correctness is non-negotiable (risk grading, payment math).**

---

## Why Gemini 1.5 Flash for OCR instead of GPT-4V?

Three reasons:
1. **Context window** — Flash handles long documents (multi-page W2s, tax returns) natively
2. **Speed** — sub-60s processing is a product requirement; Flash is optimized for throughput
3. **Cost** — at scale, OCR is a high-volume operation; Flash's price point is significantly better for per-document processing than GPT-4V

Gemini 1.5 Pro handles the Coach Agent's complex reasoning. Flash handles the high-volume, latency-sensitive Vision pipeline. Right tool for each job.

---

## Why a pluggable JSON rate adapter instead of hardcoded APR tiers?

Lender rate sheets change. If we hardcode tiers, every rate update requires a code change, a review, and a deploy. By externalizing the rate card as a JSON schema, any lender can swap in their own rate sheet and the Underwriter Agent and Delta Slider automatically re-run against the new data. This also makes the lender integration story simple: "send us your rate sheet in this format, plug it in, done."

---

## Why is the entire UI a single `index.html`?

For the prototype phase, this is the right tradeoff. A React build pipeline adds tooling overhead that slows iteration. The goal in prototype is proving the concept and testing the UX — not production-grade bundling. Tailwind via CDN gives us the full utility system without a build step. When we move to production (React 19 + Vite), the component structure is already implicit in the HTML sections.

---

## Why show the Interest Delta as a dollar number, not a percentage?

Users don't feel percentages. A 6% APR difference sounds small. `$4,397 in extra interest` over a loan life is concrete and immediate. Every design decision in DeltaPoint anchors on dollar amounts because that is the unit people actually make financial decisions in. The Delta is the product.

---

## Why MCP (Model Context Protocol)?

The Coach Agent needs to query local financial data (rate CSVs, lender spreads, user balance history) from inside the LLM inference loop. MCP provides a standard bridge between the LLM and local tools/data — without it, you're writing bespoke function-call glue for every data source. Using the protocol also means the agent is forward-compatible with any MCP-native tooling that ships in the ecosystem.

---

## Why LlamaIndex GraphRAG over a flat vector store?

Macroeconomic rate data has **relationships** — Fed decisions affect SOFR, SOFR affects lender spreads, spreads affect the APR tiers we show users. A flat vector store retrieves similar documents but loses the graph structure. GraphRAG indexes entities and relationships, so a query like "how does this week's Fed decision affect my refinancing window?" traverses the rate graph rather than just returning the most similar document chunk.

---

*[← Back to README](../README.md) · [Architecture →](ARCHITECTURE.md) · [Features →](FEATURES.md)*
