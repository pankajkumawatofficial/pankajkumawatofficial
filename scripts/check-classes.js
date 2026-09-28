// Coverage check: every class token used in HTML/JS must be provided by
// css/tailwind.css (generated), the hand-written CSS, or an inline <style>.
// Run after `npm run build:css` when classes change:  node scripts/check-classes.js
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const tw = read('css/tailwind.css');
const custom = read('css/styles.css') + read('tokens.css') + read('css/tokens.css');

// Marker classes that are intentionally unstyled (state hooks / naming only).
const INERT = new Set(['dark', 'group', 'nav-actions', 'chat-msg-', 'rv', 'rv-in', 'visible', 'open', 'active', 'is-tucked', 'service-preselected', 'light',
    // Tailwind v3 never generates opacity-on-var() arbitrary values — these
    // were already no-ops under the Play CDN; kept as-is to preserve visuals.
    'bg-[var(--color-accent)]/8', 'border-[var(--color-accent)]/30']);

const tokens = new Set();
const inlineCss = [];
const collect = (attr) => attr.split(/\s+/).filter(Boolean).forEach((t) => tokens.add(t));

// HTML: class attributes + inline <style> blocks
for (const f of ['index.html', '404.html']) {
    const html = read(f);
    for (const m of html.matchAll(/class="([^"]*)"/g)) collect(m[1]);
    for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) inlineCss.push(m[1]);
}

// JS: className assignments and class strings embedded in HTML fragments
const js = read('js/script.js');
for (const m of js.matchAll(/className\s*=\s*['"`]([^'"`]+)['"`]/g)) collect(m[1]);
for (const m of js.matchAll(/class="([^"]+)"/g)) collect(m[1]);
// 'chat-msg chat-msg-' + kind → collect the static prefix pieces
for (const m of js.matchAll(/['"`]([\w \-:[\]\/().%]+)['"`]\s*\+/g)) collect(m[1]);

// Compare against backslash-stripped CSS so escaped selectors
// (.sm\:text-3xl, .bg-\[var\(--x\)\]) match raw tokens.
const strip = (css) => css.replace(/\\/g, '');
const hasIn = (css, tok) => {
    const esc = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\.${esc}(?![\\w-])`).test(strip(css));
};

const allCss = custom + inlineCss.join('\n');
const missing = [];
for (const tok of [...tokens].sort()) {
    if (!tok || INERT.has(tok)) continue;
    if (!hasIn(tw, tok) && !hasIn(allCss, tok)) missing.push(tok);
}

console.log(`checked ${tokens.size} class tokens`);
if (missing.length) {
    console.log('MISSING:');
    missing.forEach((t) => console.log('  ' + t));
    process.exit(1);
} else {
    console.log('OK — all class tokens covered by tailwind.css or custom CSS');
}
