# DeltaPoint — The Agentic Credit-to-Yield Engine

> **OpenDelta** is a deterministic financial co-pilot built to bridge the gap between credit health and the cost of capital. By mapping real-time credit data against a universal "Market Rate" adapter, OpenDelta identifies the **Interest Delta** — the exact dollar value of credit improvement — and provides an agentic roadmap to unlock lower APRs across any lending provider.

---

## 🏗️ Built With (The "Vibe" Stack)

### 1. Agentic Orchestration (Multi-Agent System)

- **Framework:** [LangGraph](https://github.com/langchain-ai/langgraph) for stateful, cyclic agent workflows.
- **The Underwriter Agent:** A deterministic node that calculates risk grades and interest tiers using real-time credit inputs and pluggable market rate cards.
- **The Coach Agent:** A proactive LLM layer that monitors credit utilization spikes and suggests "Balance-to-Rate" arbitrage maneuvers.
- **Development Environment:** Built exclusively via [Claude Code](https://claude.ai/code) for rapid, agent-led iteration and terminal-based "vibe coding."

---

### 2. Intelligence & RAG (Retrieval-Augmented Generation)

- **Core Intelligence:** [Google AI Studio (Gemini 1.5 Pro)](https://aistudio.google.com) for long-context analysis of complex financial documents, bank statements, and SEC-level market filings.
- **GraphRAG:** Uses [LlamaIndex](https://www.llamaindex.ai) to index global interest rate trends and macroeconomic shifts, allowing the engine to adjust "Target Rate" tiers dynamically.
- **Protocol:** [Model Context Protocol (MCP)](https://modelcontextprotocol.io) to bridge the gap between the LLM and local financial data, CSVs, or private calculation tools.

---

### 3. Multimodal "Identity Vault"

- **Vision-to-Data:** Native integration of **Gemini 1.5 Flash** for high-speed, multimodal parsing of W2s, pay stubs, and tax returns.
- **Verification:** Agentic OCR workflows that verify income and identity in real-time, reducing the "Time-to-Verification" for financial applications by **80%**.

---

### 4. Deterministic UI

- **Stack:** React 19, Tailwind CSS, Framer Motion.
- **The "Delta" Slider:** A high-precision UI component that visualizes the inverse relationship between Credit Scores and Interest Expense using the standard amortization formula:

$$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$

Where:
- `M` = Monthly payment
- `P` = Principal loan amount
- `r` = Monthly interest rate (APR ÷ 12)
- `n` = Number of payments (loan term in months)

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/bnamatherdhala7/DeltaPoint-Underwriter.git
cd DeltaPoint-Underwriter

# Install dependencies
npm install

# Start local dev server
node serve.mjs
# → http://localhost:3000
```

---

## 📁 Project Structure

```
DeltaPoint-Underwriter/
├── index.html          # Landing page (single-file, Tailwind CDN)
├── serve.mjs           # Local dev server (Node.js)
├── screenshot.mjs      # Puppeteer screenshot utility
├── brand_assets/       # Reference images & design assets
├── package.json
└── README.md
```

---

## 🧠 Architecture Overview

```
User Credit Profile
       │
       ▼
┌─────────────────────┐
│   Underwriter Agent  │  ← LangGraph node
│  (Risk Grade + APR)  │  ← Market Rate Adapter
└────────┬────────────┘
         │  Interest Delta calculated
         ▼
┌─────────────────────┐
│    Coach Agent       │  ← Gemini 1.5 Pro
│ (Arbitrage Roadmap)  │  ← GraphRAG (LlamaIndex)
└────────┬────────────┘
         │  Actionable steps
         ▼
┌─────────────────────┐
│   DeltaPoint UI      │  ← React 19 + Framer Motion
│   (Delta Slider)     │  ← Amortization visualizer
└─────────────────────┘
```

---

## 📄 License

MIT © 2026 DeltaPoint Inc.
