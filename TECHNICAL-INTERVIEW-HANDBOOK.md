# Master Technical Interview Handbook & Systems Deep Dive
**The 6 Codaipro Products: Architecture, Code Deep Dive, Portfolio Copy & Interview Defense**

---

## SECTION 1: PORTFOLIO PRODUCT SUMMARY

### Project 1: CodAI — 100% Offline AI Coding Assistant
- **Badge**: `Flagship · Desktop & Systems`
- **Tagline**: Offline AI coding assistant running quantized GGUF models on consumer hardware.
- **Live Demo**: [https://codaipro.com/codai](https://codaipro.com/codai)
- **GitHub**: [https://github.com/Luckyyaduvanshiofficial/Codaipro](https://github.com/Luckyyaduvanshiofficial/Codaipro)
- **Tech Stack**: `C++ (llama.cpp)` · `Python` · `GGUF Quantization` · `AVX2 SIMD` · `Windows Win32 Mutex` · `FastAPI/Browser GUI`
- **Short Portfolio Description**:
  An open-source, local AI coding companion designed for university lab environments and low-connectivity regions with strict privacy requirements. Runs localized GGUF language models directly on CPU with zero internet connection, zero external API calls, and zero administrative permissions.
- **Key Technical Highlights**:
  - Engineered a 4-layer decoupled architecture separating the inference engine (C++ `llama.cpp`), process watchdog controller, and streaming user interface.
  - Implemented 4-level single-instance concurrency guards (Win32 Named Mutex, socket port binding, PID lockfiles, and OS signal traps) preventing orphaned background processes.
  - Optimized 4-bit integer quantization (`Q4_K_M`) models to execute within 2 GB – 4 GB RAM on standard dual-core CPUs without requiring dedicated GPUs.

---

### Project 2: WA OTP — WhatsApp & Telegram OTP Gateway
- **Badge**: `Backend & Infrastructure · Open Source (AGPL-3.0)`
- **Tagline**: Two-call phone verification gateway over WhatsApp and Telegram with zero DLT registration.
- **Live Demo**: [https://waotp.codaipro.com](https://waotp.codaipro.com)
- **GitHub**: [https://github.com/Luckyyaduvanshiofficial/wa-otp](https://github.com/Luckyyaduvanshiofficial/wa-otp)
- **Tech Stack**: `FastAPI` · `Python 3.12` · `PocketBase (Go/SQLite)` · `Meta Graph API v25.0` · `Telegram Bot API` · `Next.js 16` · `Docker`
- **Short Portfolio Description**:
  A lightweight, self-hostable OTP delivery gateway built to solve India's developer telecom barrier (TRAI DLT registration and Meta corporate verification). Delivers one-time verification codes over Telegram (100% free forever) and WhatsApp with an honest two-endpoint REST API.
- **Key Technical Highlights**:
  - Architected a high-throughput hot-path in FastAPI (:8000) coupled with an isolated PocketBase (:8090) control plane for zero-code audit ledgers.
  - Implemented strict concurrency safety using per-key and per-(owner, phone) `asyncio.Lock` primitives, eliminating race-condition quota bypasses and duplicate verification.
  - Built a zero-friction mock delivery engine (`WAOTP_MOCK_DELIVERY=1`) enabling realistic local integration testing without third-party credentials.

---

### Project 3: TempMail — Disposable Email Service & Real-Time API
- **Badge**: `Full-Stack & Event-Driven`
- **Tagline**: Disposable temporary email with a live SSE inbox, automated OTP parser, and public API.
- **Live Demo**: [https://tempmail.codaipro.com](https://tempmail.codaipro.com)
- **Landing Page**: [https://codaipro.com/tempmail](https://codaipro.com/tempmail)
- **Tech Stack**: `TypeScript` · `Next.js` · `Server-Sent Events (SSE)` · `MIME Parser Engine` · `Tailwind CSS` · `REST API`
- **Short Portfolio Description**:
  A privacy-focused temporary email platform designed for disposable account testing and OTP extraction. Features real-time push message delivery, zero telemetry, and automated extraction of verification codes and magic links.
- **Key Technical Highlights**:
  - Designed an event-driven Server-Sent Events (SSE) streaming pipeline delivering incoming emails to browser clients with sub-500ms latency, eliminating client-side polling.
  - Engineered an automated regex MIME parser extracting 4–8 digit verification codes and magic links directly from raw HTML payloads.
  - Implemented a strict receive-only policy with a 10-minute automated TTL data-purge daemon, preventing abuse, spam relaying, and IP blacklisting.

---

### Project 4: AutoDM — Instagram DM Automation Platform
- **Badge**: `SaaS & Social API Automation`
- **Tagline**: Automated Instagram DM delivery built on Meta's official Graph API.
- **Live Demo**: [https://autodm.codaipro.com](https://autodm.codaipro.com)
- **Landing Page**: [https://codaipro.com/autodm](https://codaipro.com/autodm)
- **Tech Stack**: `Meta Instagram Graph API` · `Webhooks` · `Node.js/TypeScript` · `OAuth 2.0` · `Token Bucket Rate Limiting`
- **Short Portfolio Description**:
  A free, production-grade social automation tool that converts Instagram comments, mentions, and story replies into direct messages in real time using Meta's official Graph API.
- **Key Technical Highlights**:
  - Built a resilient webhook event consumer processing comment streams, story mentions, and keyword triggers (regex, exact, contains, whole-word).
  - Implemented a token-bucket rate limiter with randomized jitter to strictly respect Meta Graph API burst and hourly quotas while preserving account reputation.
  - Created an in-memory & persisted deduplication ledger providing repeat-protection, ensuring no user ever receives duplicate automated DMs.

---

### Project 5: LLMs.txt Generator — AI Discoverability & Crawling Suite
- **Badge**: `Developer Tooling & AI Search`
- **Tagline**: Automated crawler and validator generating `llms.txt` and `llms-full.txt` files for AI search engine indexing.
- **Live Demo**: [https://llms-txt-generator.in](https://llms-txt-generator.in)
- **Landing Page**: [https://codaipro.com/llms-txt-generator](https://codaipro.com/llms-txt-generator)
- **Tech Stack**: `TypeScript` · `Fast Asynchronous Crawler` · `DOM Parser` · `AST Markdown Compiler` · `SEO Validation Engine`
- **Short Portfolio Description**:
  A developer utility that crawls website sitemaps, extracts clean content stripped of HTML boilerplate, categorizes pages into structured topics, and generates standardized `llms.txt` and `llms-full.txt` files for consumption by LLM search agents (ChatGPT, Claude, Perplexity).
- **Key Technical Highlights**:
  - Engineered an asynchronous recursive crawler that parses XML sitemaps, extracts semantic DOM nodes, and converts HTML to clean Markdown with boilerplate stripping.
  - Developed a deterministic classification engine categorizing URLs into Docs, Blog, Product, Support, and Legal sections.
  - Built a linting validator that parses generated markdown, flags broken internal/external references, highlights thin descriptions, and scores compliance.

---

### Project 6: RankLLMs — AI Model Benchmark & Leaderboard Engine
- **Badge**: `Data Engineering & Performance Analytics`
- **Tagline**: Independent AI model leaderboard and multi-dimensional benchmark comparison engine.
- **Live Demo**: [https://rankllms.com](https://rankllms.com)
- **Landing Page**: [https://codaipro.com/rankllms](https://codaipro.com/rankllms)
- **Tech Stack**: `TypeScript` · `Edge Caching / CDN` · `High-Performance Data Visualization` · `Multi-Metric Normalization` · `REST API`
- **Short Portfolio Description**:
  An independent analytics and comparison platform tracking 80+ proprietary and open-weights AI models across reasoning benchmarks, coding accuracy, agentic performance, token latency, and blended API pricing.
- **Key Technical Highlights**:
  - Architected a multi-metric aggregation pipeline standardizing benchmarks (MMLU-Pro, HumanEval, SWE-bench, Arena Elo) into comparable arithmetic indices.
  - Built responsive 2D dynamic scatter visualization engines plotting intelligence vs. latency and performance vs. blended cost per million tokens.
  - Deployed an edge-cached read-heavy architecture and public JSON API delivering sub-50ms global leaderboard queries without backend database overhead.

---

## SECTION 2: TECHNICAL DEEP DIVE & INTERVIEW PREPARATION

### PROJECT 1: CodAI (Offline AI Coding Assistant)

#### 1. What problem does it solve?
In university computer science labs and competitive programming exams across India, computers are frequently disconnected from the internet or strictly firewalled to prevent cheating. Furthermore, developers working on sensitive codebases (defense, banking, healthcare) cannot use cloud-based assistants like GitHub Copilot or ChatGPT. CodAI provides a full coding assistant that runs completely inside the machine with 0KB of network traffic.

#### 2. How it works under the hood (Architecture & Data Flow):
```
[User Browser / GUI]
        │
        ▼ (HTTP / SSE on localhost:8080)
[Layer 2: Codai Controller Watchdog]
        │
        ▼ (Spawns & Healthchecks Process)
[Layer 3: C++ llama.cpp llama-server]
        │
        ▼ (Loads into CPU Memory via AVX2 / SIMD)
[Quantized GGUF Model (e.g. Qwen2.5-Coder Q4_K_M)]
```
1. **Startup**: User launches `run.bat`. The controller initializes Layer 4 (Process Safety: checks named mutex, acquires localhost port).
2. **Model Ingestion**: The controller starts `llama-server` in the background with flags specifying CPU thread count (`-t 4`), context size (`-c 2048`), and model path.
3. **Execution**: The model is mapped into RAM using memory-mapped I/O (`mmap`). As prompt tokens enter, `llama.cpp` executes AVX2 vector SIMD operations on CPU registers.
4. **Streaming**: As tokens are predicted, `llama-server` streams them back chunk-by-chunk via Server-Sent Events (SSE) to the desktop UI.

#### 3. Key Technical Decisions & Why:
- **Why GGUF format?** GGUF (GPT-Generated Unified Format) stores tensors and metadata in a single file and enables 4-bit integer quantization (`Q4_K_M`). This reduces a 7B model from ~14 GB of FP16 RAM down to ~4 GB with negligible loss in coding precision.
- **Why llama.cpp instead of Ollama or vLLM?** Ollama requires system-level background daemon installation and admin privileges. `llama.cpp` compiles to a single self-contained portable executable with zero external dependencies, perfect for running off a USB stick.
- **Why 4-layer cleanup?** Lab PCs freeze if orphaned C++ processes consume RAM. CodAI implements Win32 Named Mutex (`CreateMutexW`), OS signal trapping (SIGINT/SIGTERM), socket locking, and a companion `kill.bat` script to guarantee zero zombie processes.

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "Did you just download llama.cpp and call it a project?"**
  - **Your Answer**: *"No. `llama.cpp` provides the raw inference engine, but packaging offline AI into a robust consumer product requires systems engineering:
    1. Built the watchdog controller that detects machine hardware (RAM/CPU cores) and dynamically tunes thread allocations and context windows.
    2. Solved the orphaned process problem on Windows using Win32 named mutexes and signal traps so student lab machines never get bricked by hanging C++ processes.
    3. Designed the streaming UI and context-buffer manager that formats multi-turn chat history into prompt templates matching each specific model's chat format (ChatML for Qwen, Llama-3 format)."*

---

### PROJECT 2: WA OTP (WhatsApp & Telegram OTP Gateway)

#### 1. What problem does it solve?
In India, users use WhatsApp and do not check email. Building a small app (society app, community portal) requires phone verification. But SMS gateways in India require Telecom Regulatory Authority (TRAI) DLT registration, business entity documents, approved headers, and expensive per-SMS costs. WhatsApp Business Cloud API has complex onboarding and international card requirements. WA OTP solves this by combining a self-hostable gateway with **Telegram OTP as an unmetered ₹0 forever safety valve** and WhatsApp as a universal reach channel.

#### 2. How it works under the hood (Architecture & Data Flow):
```
[Client Mini-App / Backend]
        │
        ▼ (POST /v1/otp/send with X-Api-Key)
[FastAPI Hot Path :8000]
  ├── 1. Rate Limiter (Token Bucket per key)
  ├── 2. Phone Hourly Throttle (Max 5/hr per phone)
  ├── 3. asyncio.Lock(key_id) [Concurrency Barrier]
  ├── 4. Generate 6-digit random code + SHA-256 hash
  ├── 5. Channel Router
         ├── If Telegram: Call Telegram Bot API (or deep link if unlinked)
         └── If WhatsApp: Call Meta Graph API v25.0 auth template
  └── 6. Superuser REST write to PocketBase ledger
        │
[PocketBase SQLite Engine :8090]
  └── Stores api_keys, settings, otps, ledger, users
```

#### 3. Key Technical Decisions & Why:
- **Why FastAPI + PocketBase instead of PostgreSQL + Django/Node?**
  - FastAPI provides high asynchronous I/O performance on the hot path (dispatching outbound HTTP calls and handling concurrency locks).
  - PocketBase provides an instant, production-ready admin dashboard/back-office out of the box with zero boilerplate, bundled as a single Go binary on SQLite.
- **Why asyncio.Lock per API key and per phone?**
  - A classic race condition in OTP systems is a double-spend attack: calling `/v1/otp/send` concurrently 5 times in the same millisecond to bypass the monthly quota before the ledger updates. Wrapping the send pipeline in a per-key lock serializes quota evaluation and provider delivery.
- **Why SHA-256 hash for codes?**
  - If the database is compromised, plaintext OTP codes are never exposed. Codes are stored as `hash(code + salt)` and validated using constant-time string comparison (`hmac.compare_digest`) to prevent timing attacks.

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "Why would anyone use Telegram for OTP? What if the user doesn't have the bot open?"**
  - **Your Answer**: *"That was the primary engineering challenge. Telegram bots cannot initiate unsolicited messages to phone numbers. I designed a platform-wide contact linking handshake:
    1. If a number is unlinked, the send API returns HTTP 409 with a cryptographically signed deep link (`t.me/bot?start=token`).
    2. The user taps the link and sends their contact card.
    3. The webhook verifies `contact.user_id == from.id` (preventing an attacker from sharing someone else's phone number).
    4. Once linked in `tg_links`, Telegram OTPs deliver instantly at ₹0 forever, serving as an unmetered cost valve."*

---

### PROJECT 3: TempMail (Disposable Email & Real-Time API)

#### 1. What problem does it solve?
Users testing online services, downloading gated whitepapers, or QA teams running automated E2E tests need throwaway email addresses. Most temp-mail services are ad-infested, slow, and lack programmatic APIs for integration into automated test suites.

#### 2. How it works under the hood (Architecture & Data Flow):
```
[Inbound SMTP / Mail Delivery Webhook]
        │
        ▼ (Parses Raw RFC 822 / MIME Stream)
[TempMail Ingestion Engine]
  ├── 1. Regex OTP & Magic Link Extraction Engine
  ├── 2. Ephemeral Storage Write (10-minute auto-purge)
  └── 3. SSE Broadcast Event Dispatcher
        │
        ▼ (text/event-stream)
[Active Browser Clients / Automated Playwright E2E Tests]
```

#### 3. Key Technical Decisions & Why:
- **Why Server-Sent Events (SSE) instead of WebSockets or Polling?**
  - Polling every 2 seconds wastes server CPU and bandwidth for hundreds of idle inboxes.
  - WebSockets are bidirectional and require protocol upgrade handshakes and stateful connection management.
  - SSE is unidirectional (server -> client), operates over standard HTTP/2, auto-reconnects natively in browsers via `EventSource`, and easily passes through corporate firewalls.
- **Why receive-only?**
  - Allowing outbound email from disposable inboxes turns your infrastructure into a spam cannon within hours, destroying domain reputation and triggering IP blocklists (Spamhaus). Enforcing receive-only at the mail server boundary guarantees service longevity.

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "How did you extract OTP codes accurately from raw email HTML?"**
  - **Your Answer**: *"Email HTML is notoriously inconsistent across providers. I designed a multi-stage parser:
    1. Stripped HTML entities and tags down to normalized plaintext.
    2. Ran contextual regular expressions matching common verification patterns (e.g. 'code is: 123456', 'verification code: \b\d{4,8}\b').
    3. Filtered false positives (such as phone numbers, dates, or zip codes) by validating token proximity to keywords like 'verify', 'confirm', 'security code', and 'login'."*

---

### PROJECT 4: AutoDM (Instagram DM Automation on Graph API)

#### 1. What problem does it solve?
Creators and businesses lose sales because comments like 'link please' or 'price?' on Instagram go unanswered for hours. Commercial tools (ManyChat, etc.) charge $10–$70/month and gate basic keyword triggers behind expensive tiers. AutoDM provides high-speed, rate-aware automation on Meta's official API for free.

#### 2. How it works under the hood (Architecture & Data Flow):
```
[Instagram User Comments on Post]
        │
        ▼ (HTTP POST Webhook with X-Hub-Signature-256)
[AutoDM Webhook Ingestion Receiver]
  ├── 1. HMAC-SHA256 Payload Signature Verification
  ├── 2. Match Keyword Engine (Exact, Contains, Whole-Word, RegEx)
  ├── 3. Deduplication Check (Has this user been messaged for this campaign?)
  ├── 4. Token Bucket Queue with Random Jitter Throttling
  └── 5. POST to Meta Graph API /v21.0/me/messages
```

#### 3. Key Technical Decisions & Why:
- **Why HMAC-SHA256 signature verification on webhooks?**
  - Anyone can send a fake POST request to your webhook URL. Verifying the `X-Hub-Signature-256` header using the Meta app secret ensures only authentic Instagram events are processed.
- **How to prevent account bans?**
  - Burst-sending 1,000 DMs in 30 seconds triggers Meta's automated spam filters. I implemented a rate-aware queue using a leaky-bucket algorithm that spaces out DM delivery with randomized delays (jitter: 1.5s – 3.8s) to mimic human response latency.

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "What happens if a reel goes viral and you get 5,000 comments in 2 minutes?"**
  - **Your Answer**: *"An unbuffered webhook endpoint would crash or trigger Meta timeouts (which drop webhooks after 5 seconds). I decoupled event ingestion from message dispatch:
    1. The webhook handler immediately validates the HMAC signature, enqueues the event payload, and returns HTTP 200 within 50ms.
    2. Background worker processes consume events from the queue asynchronously.
    3. Deduplication prevents multiple DMs to the same user, and rate limiters throttle outbound API calls to stay comfortably within Meta's hourly threshold."*

---

### PROJECT 5: LLMs.txt Generator (AI Discoverability & Web Crawler)

#### 1. What problem does it solve?
AI models (Perplexity, Claude, ChatGPT Search) increasingly browse the web to answer user queries. Traditional HTML pages are bloated with navigations, footers, and scripts that waste context tokens and cause hallucinations. The emerging `/llms.txt` standard provides an AI-curated Markdown map of website knowledge.

#### 2. How it works under the hood (Architecture & Data Flow):
```
[User provides Sitemap / Domain]
        │
        ▼
[Async Sitemap Parser & Crawler]
  ├── Recursive sitemap-index XML resolution
  ├── Parallel page fetching with concurrency semaphore (max 10)
  ├── DOM extraction: removes <nav>, <footer>, <script>, <style>
  └── HTML-to-Markdown normalization
        │
        ▼
[Heuristic Classifier & Compiler]
  ├── Categorizes pages into Docs, Blog, Product, Support, Legal
  ├── Compiles llms.txt (index with 1-line summaries)
  └── Compiles llms-full.txt (complete bundled knowledge corpus)
        │
        ▼
[Validation Engine]
  └── Lints for broken links, missing descriptions, and structural defects
```

#### 3. Key Technical Decisions & Why:
- **Why stream and limit concurrency with an async semaphore?**
  - Blasting an external server with 500 simultaneous HTTP requests gets your IP blocked via Cloudflare 429 errors. Using an `asyncio.Semaphore(10)` ensures polite crawling while maintaining fast throughput.
- **Why DOM subtree extraction instead of simple regex stripping?**
  - Regex cannot reliably parse nested HTML. Parsing into an Abstract Syntax Tree (AST) allows targeted pruning of noisy DOM elements (`<nav>`, `<footer>`, `<aside>`, modals) while preserving semantic document hierarchy (`h1`-`h6`, code blocks, lists).

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "How does llms.txt differ from robots.txt or sitemap.xml?"**
  - **Your Answer**: *"robots.txt tells crawlers what NOT to visit. sitemap.xml provides a list of URLs with timestamps for indexing. Neither explains content semantics to a large language model. `llms.txt` is specifically engineered for LLM inference context windows: it provides a concise, structured markdown hierarchy explaining what each page contains in plain language so agents can choose the exact resource to fetch."*

---

### PROJECT 6: RankLLMs (AI Model Leaderboard & Analytics Engine)

*(Note: Proprietary ranking algorithms and internal weight vectors are kept private as requested; the discussion focuses on systems architecture, caching, and data pipelines).*

#### 1. What problem does it solve?
There are hundreds of LLMs available, each boasting cherry-picked benchmarks. AI engineers need an independent, arithmetic comparison platform that plots real-world trade-offs: intelligence vs. speed (tok/sec) vs. blended API cost ($/1M tokens).

#### 2. How it works under the hood (Architecture & Systems Design):
```
[Benchmark Aggregation & Pipeline]
  ├── Ingests standardized benchmarks (MMLU-Pro, HumanEval, SWE-bench, Elo)
  ├── Ingests provider latency metrics (time-to-first-token, generation tok/s)
  └── Normalizes pricing across input/output token cost
        │
        ▼
[High-Performance Cache Layer]
  └── Pre-computed JSON payloads distributed via CDN Edge
        │
        ▼
[Client Interactive Visualization]
  ├── Dynamic 2D Scatter Charts (Intelligence vs. Speed, Cost vs. Quality)
  ├── Side-by-side Head-to-Head Comparison Matrix
  └── Public Programmatic REST API
```

#### 3. Key Technical Decisions & Why:
- **Why edge caching over traditional relational database queries?**
  - Leaderboard datasets update periodically (daily/weekly), but read traffic is extremely high and analytical. Serving static, versioned JSON payloads cached across CDN edge nodes provides sub-50ms worldwide response times and zero server database CPU load.
- **Why multi-metric normalization?**
  - Different benchmarks have different scales (0-100 percentages, Elo ratings from 1000-1400, cost from $0.05 to $15.00). Normalizing metrics into standard z-scores and composite weighted indices allows fair comparisons between proprietary frontier models (GPT-4o, Claude 3.5 Sonnet) and open-weights models (DeepSeek-R1, Qwen2.5).

#### 4. Recruiter / Senior Engineer Interview Q&A:
- **Q: "How do you handle API cost comparisons when input and output token prices differ?"**
  - **Your Answer**: *"Raw token prices are misleading because output tokens are typically 3x–4x more expensive than input tokens. I implemented a blended cost calculation modeled on standard industry usage ratios (typically a 3:1 input-to-output ratio for general tasks, and 5:1 for RAG/agentic workflows). This gives developers a realistic estimated blended cost per million tokens rather than an artificial marketing number."*

---

## SECTION 3: RECRUITER "FORK PROJECT" OBJECTION DEFENSE

> [!IMPORTANT]
> **What to say if an interviewer asks: *"Did you just fork existing open-source projects or use AI to generate this?"***
> 
> **The Battle-Tested Response:**
> *"I use modern AI tools (Cursor, Claude, Antigravity) the same way senior engineers use IDEs, compilers, and stack overflow — to accelerate development. But an AI cannot make architectural trade-offs, solve edge-case concurrency bugs, or design systems that scale.
> 
> For example:
> - In **WA OTP**, an AI suggested storing OTPs in plaintext in memory; I replaced that with SHA-256 hashed codes, Fernet encrypted tokens, and per-key `asyncio.Lock` primitives to prevent race-condition double-spend attacks.
> - In **CodAI**, getting an LLM to run is trivial, but keeping lab computers from crashing required writing a 4-layer watchdog with Win32 Named Mutexes and socket port locking to prevent zombie processes.
> - In **TempMail**, instead of polling a database, I engineered an event-driven Server-Sent Events (SSE) streaming pipeline with MIME regex extraction to deliver sub-500ms code delivery.
> 
> I own every architecture decision, every error code, and every data model across these six products. They are live, tested, and actively solving real-world developer problems."*
