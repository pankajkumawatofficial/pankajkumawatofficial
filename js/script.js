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
        if (navPill) navPill.classList.remove('is-tucked');
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

    // ---- Mobile navbar scroll system: tucks above the viewport while
    //      scrolling down, slides back on any scroll up. The transform is
    //      gated to <=1023px in CSS, so desktop is unaffected. ----
    const navPill = document.querySelector('.nav-pill');
    let lastScrollY = window.scrollY;
    let navTuckFrame = false;
    let navTuckSuppressedUntil = 0;

    function updateNavTuck() {
        navTuckFrame = false;
        if (!navPill) return;
        const y = window.scrollY;
        const delta = y - lastScrollY;
        lastScrollY = y;
        if (y <= 80 || delta < -6) {
            // Near the top or any upward scroll: always show the navbar
            navPill.classList.remove('is-tucked');
        } else if (delta > 6 && y > 140 && Date.now() > navTuckSuppressedUntil && !mobileMenuIsOpen()) {
            navPill.classList.add('is-tucked');
        }
    }

    window.addEventListener('scroll', () => {
        if (!navTuckFrame) {
            navTuckFrame = true;
            requestAnimationFrame(updateNavTuck);
        }
    }, { passive: true });

    // Anchor jumps smooth-scroll for a while: keep the navbar available
    // through the jump, and only allow tucking again afterwards.
    window.addEventListener('hashchange', () => {
        navTuckSuppressedUntil = Date.now() + 1200;
        if (navPill) navPill.classList.remove('is-tucked');
    });

    // ---- Hero AI Assistant Mini-Chat (scripted demo — answers are real page facts) ----
    const chatMessages = document.getElementById('chatMessages');
    const chatChips = document.getElementById('chatChips');

    const CHAT_ANSWERS = {
        stack: 'Python 3.12 first — then scikit-learn for ML, Django + REST APIs for backends, MySQL for storage, and NumPy / pandas / Matplotlib for analysis.',
        projects: 'Three shipped: House Price Prediction (scikit-learn regression), Customer Churn Analysis (classification), and ConnectSphere — a Django social platform. Full case cards sit in 02 // Project Portfolio below.',
        available: 'Yes — open to Software Engineer and AI/ML Developer roles: internships, remote contracts, or full-time, from Jaipur or fully remote.',
        contact: 'Fastest is email: pankajkumawat2023@gmail.com — or use the form in the contact section below. GitHub and LinkedIn are linked there too.'
    };

    if (chatMessages && chatChips) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const chipButtons = chatChips.querySelectorAll('.chat-chip');
        let chatBusy = false;

        function addChatBubble(kind, text) {
            const el = document.createElement('div');
            el.className = 'chat-msg chat-msg-' + kind;
            el.textContent = text;
            chatMessages.appendChild(el);
            requestAnimationFrame(() => el.classList.add('visible'));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function botSay(text) {
            chatBusy = true;
            chipButtons.forEach(c => { c.disabled = true; });
            const typing = document.createElement('div');
            typing.className = 'chat-typing';
            typing.setAttribute('aria-hidden', 'true');
            typing.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typing);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(() => {
                typing.remove();
                addChatBubble('bot', text);
                chatBusy = false;
                chipButtons.forEach(c => { c.disabled = false; });
            }, reducedMotion ? 0 : 900);
        }

        chatChips.addEventListener('click', (e) => {
            const chip = e.target.closest('.chat-chip');
            if (!chip || chatBusy) return;
            const answer = CHAT_ANSWERS[chip.dataset.q];
            if (!answer) return;
            addChatBubble('user', chip.textContent.trim());
            botSay(answer);
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