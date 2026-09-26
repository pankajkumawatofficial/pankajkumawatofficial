// ============================================================
// Pankaj Kumawat Official — Software Engineer Portfolio Scripts
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
    const savedTheme = localStorage.getItem('pk-theme');
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
                localStorage.setItem('pk-theme', 'light');
            } else {
                html.classList.add('dark');
                html.classList.remove('light');
                localStorage.setItem('pk-theme', 'dark');
            }
            updateThemeIcon();
        });
    }

    // ---- Mobile Nav Drawer (animated, with backdrop) ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

    function mobileMenuIsOpen() {
        return !!(mobileMenu && mobileMenu.classList.contains('open'));
    }

    function lockScroll(lock) {
        const value = lock ? 'hidden' : '';
        document.body.style.overflow = value;
        document.documentElement.style.overflow = value;
    }

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('open');
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('open');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.setAttribute('aria-label', 'Close Navigation Menu');
        }
        lockScroll(true);
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('open');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open Navigation Menu');
        }
        lockScroll(false);
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenuIsOpen()) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
        }

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuIsOpen()) closeMobileMenu();
        });

        // If the viewport grows past the mobile breakpoint, drop the drawer
        window.addEventListener('resize', () => {
            if (mobileMenuIsOpen() && window.innerWidth >= 1024) closeMobileMenu();
        });
    }

    // ---- Workbench Code Tabs ----
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

    // ---- ML Pipeline Run / Resume Export Simulator ----
    const testBtn = document.getElementById('btnTestEndpoint');
    const latencyEl = document.getElementById('workbenchLatency');
    const responsePayloadEl = document.getElementById('responsePayload');

    function openResumePdf() {
        // Open the real PDF resume (stored in /resume) in a new browser tab
        const resumeAnchor = document.createElement('a');
        resumeAnchor.href = 'resume/Pankaj_Kumawat.pdf';
        resumeAnchor.target = '_blank';
        resumeAnchor.rel = 'noopener';
        document.body.appendChild(resumeAnchor);
        resumeAnchor.click();
        document.body.removeChild(resumeAnchor);
    }

    if (testBtn && latencyEl && responsePayloadEl) {
        testBtn.addEventListener('click', () => {
            testBtn.disabled = true;
            testBtn.innerHTML = '<span class="animate-spin inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full mr-1.5"></span> Training...';

            // Simulate sub-3ms async pipeline execution
            setTimeout(() => {
                const simulatedLatency = (Math.random() * 1.8 + 1.2).toFixed(1);
                latencyEl.textContent = `${simulatedLatency}ms`;

                // Switch to response tab
                const responseTabBtn = document.querySelector('[data-tab="response"]');
                if (responseTabBtn) responseTabBtn.click();

                // Build response payload
                const now = new Date().toISOString();
                const samplePayload = {
                    pipeline: "house_price_regression",
                    model: "RandomForestRegressor",
                    metrics: {
                        r2_score: 0.9142,
                        mae: 18420.55,
                        rmse: 24710.83,
                        cv_mean: 0.9138,
                        cv_std: 0.0182
                    },
                    telemetry: {
                        latency_ms: parseFloat(simulatedLatency),
                        runtime: "scikit-learn 1.5 / Python 3.12",
                        concurrency_mode: "asyncio.to_thread (non-blocking training)",
                        cache_hit: true
                    },
                    engineer: {
                        name: "Pankaj Kumawat",
                        role: "Software Engineer",
                        specialization: ["AI/ML Engineering", "Data Science & Analytics", "Python / Django Backend"],
                        location: "Jaipur, Rajasthan, India",
                        availability: "Open to Software Engineer, AI/ML & Data Science roles",
                        contact: "pankajkumawat2023@gmail.com",
                        projects_built: 3,
                        github: "https://github.com/pankajkumawatofficial"
                    },
                    download_status: "initiated",
                    generated_at: now
                };
                responsePayloadEl.textContent = JSON.stringify(samplePayload, null, 2);

                // Open the PDF resume in a new browser tab
                openResumePdf();

                testBtn.disabled = false;
                testBtn.innerHTML = '<span class="iconify mr-1" data-icon="lucide:rotate-ccw" data-width="12"></span> Re-run Pipeline';
                if (window.Iconify) window.Iconify.scan(testBtn);
            }, 360);
        });
    }

    // ---- Active Nav Link Scroll Spy ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item, .mobile-nav-link');

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
                formMessage.textContent = '✓ Inbound payload dispatched to Pankaj Kumawat. Response ETA: < 24h.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="iconify" data-icon="lucide:send" data-width="14"></span> Dispatch Inbound Message';
                if (window.Iconify) window.Iconify.scan(submitBtn);
            }, 750);
        });
    }

    // ---- Scroll Reveal (IntersectionObserver) ----
    // Reveal units are item-level: cards, workflow rows, timeline entries,
    // cert frames, and plain text blocks — grids cascade through to their
    // cards instead of animating as one slab. Elements entering the viewport
    // together stagger (200ms apart); solo elements appear immediately.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const ITEM_SELECTOR = '.tech-card, .api-spec-row, .timeline-item, .cert-frame';
        const STAGGER_MS = 200;

        const collectUnits = (container, out) => {
            Array.from(container.children).forEach((child) => {
                if (child.matches(ITEM_SELECTOR)) {
                    out.push(child);
                    return;
                }
                const cs = window.getComputedStyle(child);
                const isRow = cs.display.indexOf('flex') === 0 &&
                    cs.flexDirection.indexOf('column') !== 0;
                const stacked = cs.display === 'grid' || !isRow;
                const hasOwnBox = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                    (cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none');
                const hasDirectText = Array.from(child.childNodes)
                    .some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
                if (child.childElementCount >= 2 && stacked && !hasOwnBox && !hasDirectText) {
                    collectUnits(child, out); // transparent wrapper: cascade through it
                } else {
                    out.push(child);
                }
            });
        };

        const units = [];
        document.querySelectorAll('section[id]:not(#home), footer').forEach((scope) => {
            collectUnits(scope, units);
        });

        const revealObserver = new IntersectionObserver((entries) => {
            const batch = entries.filter((e) => e.isIntersecting);
            if (!batch.length) return;
            batch.sort((a, b) => {
                if (a.target === b.target) return 0;
                return (a.target.compareDocumentPosition(b.target) &
                    Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            batch.forEach((entry, i) => {
                revealObserver.unobserve(entry.target);
                entry.target.style.transitionDelay = (Math.min(i, 6) * STAGGER_MS) + 'ms';
                entry.target.classList.add('rv-in');
            });
        }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

        units.forEach((el) => {
            el.classList.add('rv');
            revealObserver.observe(el);
        });
    }

    // ---- Year Footer ----
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();