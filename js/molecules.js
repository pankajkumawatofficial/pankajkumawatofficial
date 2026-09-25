// ============================================================
// Molecule Background — atoms & molecular bonds reacting to the pointer
// Decorative canvas fixed behind all content (z-index: -1, non-interactive)
// Respects prefers-reduced-motion: leaves the static grid untouched.
// ============================================================

(function () {
    'use strict';

    var canvas = document.getElementById('moleculeCanvas');
    if (!canvas || !canvas.getContext) return;

    // Reduced-motion users get a still page — no canvas animation
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = canvas.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0;
    var H = 0;

    var pointer = { x: 0, y: 0, active: false };
    var particles = [];
    var atoms = [];

    var LINK_DIST = 125;     // max distance for particle-to-particle bonds
    var POINTER_DIST = 170;  // reach of pointer attraction / bonds
    var isLight = null;
    var palette = null;

    // Teal palette tuned for both themes (re-read each frame so the
    // theme toggle in script.js is picked up immediately)
    function updatePalette() {
        var light = document.documentElement.classList.contains('light');
        if (light === isLight) return;
        isLight = light;
        palette = light
            ? { bond: '13, 148, 136', node: '13, 148, 136', core: '15, 118, 110', electron: '5, 150, 105' }
            : { bond: '45, 212, 191', node: '45, 212, 191', core: '13, 148, 136', electron: '167, 243, 208' };
    }

    function seed() {
        var count = Math.max(34, Math.min(90, Math.round((W * H) / 16000)));
        particles = [];
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 1 + Math.random() * 1.6,
                a: 0.35 + Math.random() * 0.45
            });
        }

        // Decorative "atoms": nucleus + two crossed orbit rings with electrons
        atoms = [];
        var atomCount = W < 700 ? 2 : 3;
        for (var j = 0; j < atomCount; j++) {
            atoms.push({
                x: (0.18 + 0.32 * j) * W + (Math.random() * 60 - 30),
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                rot: Math.random() * Math.PI * 2,
                spin: 0.005 + Math.random() * 0.007,
                rx: 16 + Math.random() * 10,
                ry: 6 + Math.random() * 4,
                orbit: Math.random() * Math.PI * 2,
                orbitSpeed: 0.018 + Math.random() * 0.014,
                depth: 0.5 + Math.random() * 0.9 // mouse-parallax factor
            });
        }
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        seed();
    }

    function step() {
        updatePalette();
        ctx.clearRect(0, 0, W, H);

        // Mouse-parallax offset for the decorative atoms
        var pax = pointer.active ? (pointer.x - W / 2) : 0;
        var pay = pointer.active ? (pointer.y - H / 2) : 0;

        var i, j, p, q, dx, dy, d, d2;

        // ---- 1. Molecular bonds between nearby particles ----
        for (i = 0; i < particles.length; i++) {
            p = particles[i];
            for (j = i + 1; j < particles.length; j++) {
                q = particles[j];
                dx = p.x - q.x;
                dy = p.y - q.y;
                d2 = dx * dx + dy * dy;
                if (d2 < LINK_DIST * LINK_DIST) {
                    d = Math.sqrt(d2);
                    ctx.strokeStyle = 'rgba(' + palette.bond + ',' + ((1 - d / LINK_DIST) * 0.22).toFixed(3) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        // ---- 2. Drift + gentle attraction toward the pointer ----
        for (i = 0; i < particles.length; i++) {
            p = particles[i];

            if (pointer.active) {
                dx = pointer.x - p.x;
                dy = pointer.y - p.y;
                d2 = dx * dx + dy * dy;
                if (d2 < POINTER_DIST * POINTER_DIST) {
                    d = Math.sqrt(d2) || 1;
                    var f = (1 - d / POINTER_DIST) * 0.05;
                    p.vx += (dx / d) * f;
                    p.vy += (dy / d) * f;
                    // Bond line from particle to the pointer
                    ctx.strokeStyle = 'rgba(' + palette.bond + ',' + ((1 - d / POINTER_DIST) * 0.4).toFixed(3) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.stroke();
                }
            }

            p.vx *= 0.985;
            p.vy *= 0.985;
            var sp2 = p.vx * p.vx + p.vy * p.vy;
            if (sp2 > 4) {
                var sp = Math.sqrt(sp2);
                p.vx = (p.vx / sp) * 2;
                p.vy = (p.vy / sp) * 2;
            }
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) { p.x = 0; p.vx *= -1; } else if (p.x > W) { p.x = W; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; } else if (p.y > H) { p.y = H; p.vy *= -1; }

            ctx.fillStyle = 'rgba(' + palette.node + ',' + p.a + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // ---- 3. Decorative atoms (orbiting electrons + mouse parallax) ----
        for (i = 0; i < atoms.length; i++) {
            var a = atoms[i];
            a.x += a.vx;
            a.y += a.vy;
            a.rot += a.spin;
            a.orbit += a.orbitSpeed;
            if (a.x < -70) a.x = W + 70; else if (a.x > W + 70) a.x = -70;
            if (a.y < -70) a.y = H + 70; else if (a.y > H + 70) a.y = -70;

            ctx.save();
            ctx.translate(a.x + pax * 0.014 * a.depth, a.y + pay * 0.014 * a.depth);

            // Orbit ring 1 + electron
            ctx.save();
            ctx.rotate(a.rot);
            ctx.strokeStyle = 'rgba(' + palette.bond + ',0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(0, 0, a.rx, a.ry, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(' + palette.electron + ',0.9)';
            ctx.beginPath();
            ctx.arc(Math.cos(a.orbit) * a.rx, Math.sin(a.orbit) * a.ry, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Orbit ring 2 (crossed) + counter-orbiting electron
            ctx.save();
            ctx.rotate(-a.rot * 0.7 + Math.PI / 3);
            ctx.strokeStyle = 'rgba(' + palette.bond + ',0.22)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(0, 0, a.ry * 1.9, a.ry * 0.8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(' + palette.electron + ',0.8)';
            ctx.beginPath();
            ctx.arc(Math.cos(-a.orbit * 1.3) * a.ry * 1.9, Math.sin(-a.orbit * 1.3) * a.ry * 0.8, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Nucleus
            ctx.fillStyle = 'rgba(' + palette.core + ',0.85)';
            ctx.beginPath();
            ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        window.requestAnimationFrame(step);
    }

    // ---- Pointer tracking (mouse + touch) ----
    window.addEventListener('pointermove', function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
        pointer.active = false;
    });

    window.addEventListener('blur', function () {
        pointer.active = false;
    });

    // ---- Debounced resize ----
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    resize();
    updatePalette();
    window.requestAnimationFrame(step);
})();
