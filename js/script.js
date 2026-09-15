// ============================================================
// Lucky Yaduvanshi Official — FastAPI Portfolio Scripts
// Hallmark modern-minimal workbench microinteractions
// ============================================================

(function () {
    'use strict';

    // ---- Configure Tailwind Dark Mode ----
    if (window.tailwind) {
        window.tailwind.config = { darkMode: 'class' };
    }

    // ---- Theme Toggle (Dual Dark / Light class synchronization) ----
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    // Apply saved theme or system preference on load
    const savedTheme = localStorage.getItem('lky-theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        html.classList.add('light');
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
    }
    updateThemeIcon();

    function updateThemeIcon() {
        if (!themeToggle) return;
        const isLight = html.classList.contains('light');
        themeToggle.innerHTML = `<span class="iconify" data-icon="${isLight ? 'lucide:moon' : 'lucide:sun'}" data-width="15"></span>`;
        if (window.Iconify) {
            window.Iconify.scan(themeToggle);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const willBeLight = !html.classList.contains('light');
            if (willBeLight) {
                html.classList.add('light');
                html.classList.remove('dark');
                localStorage.setItem('lky-theme', 'light');
            } else {
                html.classList.add('dark');
                html.classList.remove('light');
                localStorage.setItem('lky-theme', 'dark');
            }
            updateThemeIcon();
        });
    }

    // ---- Mobile Nav Drawer ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('.iconify');
            if (icon) {
                icon.setAttribute('data-icon', isOpen ? 'lucide:menu' : 'lucide:x');
            }
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('.iconify');
                if (icon) icon.setAttribute('data-icon', 'lucide:menu');
            });
        });
    }

    // ---- FastAPI Workbench Code Tabs ----
    const tabButtons = document.querySelectorAll('.code-tab-btn');
    const tabPanes = document.querySelectorAll('.code-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.add('hidden'));
            btn.classList.add('active');
            const targetPane = document.getElementById(`tab-${targetTab}`);
            if (targetPane) targetPane.classList.remove('hidden');
        });
    });

    // ---- Creative Resume Download / Stream API Endpoint Simulator ----
    const testBtn = document.getElementById('btnTestEndpoint');
    const latencyEl = document.getElementById('workbenchLatency');
    const responsePayloadEl = document.getElementById('responsePayload');

    function triggerResumeDownload() {
        // Generate a cleanly formatted technical resume snapshot text/markdown file
        const resumeContent = `================================================================================
LUCKY YADUVANSHI — PYTHON FASTAPI BACKEND ENGINEER
================================================================================
Location: Jaipur, Rajasthan, India
Email: contact@luckyyaduvanshi.in
GitHub: https://github.com/Luckyyaduvanshiofficial
LinkedIn: https://linkedin.com/in/lucky-yaduvanshi
Portfolio: https://luckyyaduvanshi.in

--------------------------------------------------------------------------------
CORE COMPETENCIES & TECHNICAL ARCHITECTURE
--------------------------------------------------------------------------------
- Frameworks & Runtimes: FastAPI, Python 3.12+, ASGI, UVloop, AnyIO, Pydantic v2
- Databases & ORM: PostgreSQL, SQLAlchemy 2.0 Async, Alembic, SQLite WAL, Redis
- Low-Level Systems: C++ (llama.cpp), GGUF Quantization (Q4_K_M), AVX2 SIMD, Win32 API
- DevOps & Tools: Docker, Podman, Nginx reverse proxy, Linux systemd, GitHub Actions CI/CD
- Concurrency & Security: asyncio.Lock barriers, SHA-256 state hashing, HMAC validation

--------------------------------------------------------------------------------
SHIPPED PRODUCTION SYSTEMS (CODAIPRO)
--------------------------------------------------------------------------------
1. CodAI — 100% Offline AI Coding Assistant
   - Decoupled 4-layer architecture running localized GGUF models on CPU via C++ llama.cpp.
   - Win32 Named Mutex and PID lock guards preventing orphaned background processes.

2. WA OTP — WhatsApp & Telegram Phone Verification Gateway
   - Two-endpoint verification gateway bypassing India TRAI DLT registration.
   - Strict asyncio.Lock concurrency isolation preventing quota bypass race conditions.

3. TempMail — Disposable Email & Live SSE Streaming API
   - Event-driven Server-Sent Events push feed (<500ms latency) with zero client polling.
   - Automated regex MIME parser extracting verification codes from raw HTML payloads.

4. AutoDM — Instagram DM Automation Platform
   - Resilient webhook consumer with token-bucket jittered rate-limiter for Meta Graph API.
   - Repeat-protection deduplication ledger preventing redundant automated direct messages.

5. LLMs.txt Generator — AI Search Crawler & Validator
   - Asynchronous sitemap crawler stripping boilerplate into llms.txt standard files.

6. RankLLMs — AI Model Benchmark & Comparison Engine
   - Multi-metric benchmark normalization pipeline tracking 80+ AI models at the edge.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
- Computer Science & Engineering (Core: Distributed Systems, DBMS, OS, Data Structures)
- Python & FastAPI Backend Engineering Specialization
- PostgreSQL Advanced Architecture & Database Design
- Postman API Fundamentals Student Expert
- Docker Containerization & Microservices

Generated via FastAPI /v1/developer/lucky/resume stream at ${new Date().toISOString()}
================================================================================`;

        const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = downloadUrl;
        downloadAnchor.download = 'Lucky_Yaduvanshi_FastAPI_Resume.txt';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000);
    }

    if (testBtn && latencyEl && responsePayloadEl) {
        testBtn.addEventListener('click', () => {
            testBtn.disabled = true;
            testBtn.innerHTML = '<span class="animate-spin inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full mr-1.5"></span> Streaming...';

            // Simulate sub-3ms async streaming coroutine execution
            setTimeout(() => {
                const simulatedLatency = (Math.random() * 1.8 + 1.2).toFixed(1);
                latencyEl.textContent = `${simulatedLatency}ms`;

                // Switch to response tab
                const responseTabBtn = document.querySelector('[data-tab="response"]');
                if (responseTabBtn) responseTabBtn.click();

                // Build response payload
                const now = new Date().toISOString();
                const samplePayload = {
                    status: 200,
                    status_text: "OK",
                    stream_type: "application/octet-stream",
                    content_disposition: "attachment; filename=\"Lucky_Yaduvanshi_FastAPI_Resume.pdf\"",
                    endpoint: "/v1/developer/lucky/resume?format=pdf&track=backend_systems",
                    telemetry: {
                        latency_ms: parseFloat(simulatedLatency),
                        runtime: "uvloop / Python 3.12.3",
                        concurrency_mode: "asyncio.to_thread (non-blocking file stream)",
                        cache_hit: true
                    },
                    candidate: {
                        name: "Lucky Yaduvanshi",
                        role: "Python FastAPI Backend Engineer",
                        specialization: ["High-Throughput APIs", "PostgreSQL & SQLAlchemy", "Async Concurrency", "Docker"],
                        location: "Jaipur, Rajasthan, India",
                        availability: "Immediate for Backend & API Roles",
                        contact: "contact@luckyyaduvanshi.in",
                        shipped_production_products: 6,
                        github: "https://github.com/Luckyyaduvanshiofficial"
                    },
                    download_status: "initiated",
                    sha256_checksum: "a8f3b92c4e51786012d987e6fa543210bcdea9182374650fadcbe456712398ab",
                    generated_at: now
                };
                responsePayloadEl.textContent = JSON.stringify(samplePayload, null, 2);

                // Auto-trigger the download
                triggerResumeDownload();

                testBtn.disabled = false;
                testBtn.innerHTML = '<span class="iconify mr-1" data-icon="lucide:download" data-width="12"></span> Re-download Resume';
                if (window.Iconify) window.Iconify.scan(testBtn);
            }, 360);
        });
    }

    // ---- Active Nav Link Scroll Spy ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 140;
        let matched = false;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height && !matched) {
                matched = true;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + id || href === `index.html#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('contactSubmit');

    if (contactForm && formMessage && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></span> Dispatching...';

            setTimeout(() => {
                formMessage.classList.remove('hidden');
                formMessage.className = 'text-xs text-center py-2 px-4 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono mt-3';
                formMessage.textContent = '✓ Inbound payload dispatched to Lucky Yaduvanshi. Response ETA: < 24h.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="iconify" data-icon="lucide:send" data-width="14"></span> Dispatch Inbound Message';
                if (window.Iconify) window.Iconify.scan(submitBtn);
            }, 750);
        });
    }

    // ---- Year Footer ----
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
