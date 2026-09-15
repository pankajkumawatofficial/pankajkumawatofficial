// ============================================================
// Lucky Yaduvanshi Official — FastAPI Developer Scripts
// Hallmark modern-minimal workbench microinteractions
// ============================================================

(function () {
    'use strict';

    // ---- Theme Toggle (Default: Obsidian Dark) ----
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.add('light');
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = html.classList.toggle('light');
            html.classList.toggle('dark', !isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            const icon = themeToggle.querySelector('.iconify');
            if (icon) {
                icon.setAttribute('data-icon', isLight ? 'lucide:moon' : 'lucide:sun');
            }
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
            if (targetPane) {
                targetPane.classList.remove('hidden');
            }
        });
    });

    // ---- Live Test Endpoint Simulator ----
    const testBtn = document.getElementById('btnTestEndpoint');
    const latencyEl = document.getElementById('workbenchLatency');
    const responsePayloadEl = document.getElementById('responsePayload');

    if (testBtn && latencyEl && responsePayloadEl) {
        testBtn.addEventListener('click', () => {
            testBtn.disabled = true;
            testBtn.innerHTML = '<span class="animate-spin inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full"></span> Executing...';
            
            // Simulate sub-5ms async call
            setTimeout(() => {
                const simulatedLatency = (Math.random() * 2.8 + 1.4).toFixed(1);
                latencyEl.textContent = `${simulatedLatency}ms`;
                
                // Switch to response tab
                const responseTabBtn = document.querySelector('[data-tab="response"]');
                if (responseTabBtn) responseTabBtn.click();

                // Update response timestamp
                const now = new Date().toISOString();
                const samplePayload = {
                    status: "delivered",
                    channel: "telegram_safety_valve",
                    cost_inr: 0.00,
                    provider_latency_ms: parseFloat(simulatedLatency),
                    otp_hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                    timestamp: now
                };
                responsePayloadEl.textContent = JSON.stringify(samplePayload, null, 2);

                testBtn.disabled = false;
                testBtn.innerHTML = '<span class="iconify" data-icon="lucide:play" data-width="12"></span> Test Endpoint';
            }, 320);
        });
    }

    // ---- Active Nav Link Scroll Spy ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 140;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
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
            submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></span> Sending...';

            setTimeout(() => {
                formMessage.classList.remove('hidden');
                formMessage.className = 'text-xs text-center py-2 px-4 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono mt-3';
                formMessage.textContent = 'HTTP 200 OK: Inbound message dispatched to Lucky Yaduvanshi. I will respond within 24 hours.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="iconify" data-icon="lucide:send" data-width="14"></span> Send Message';
            }, 600);
        });
    }

    // ---- Footer Year ----
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
