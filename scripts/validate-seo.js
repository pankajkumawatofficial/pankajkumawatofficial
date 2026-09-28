// SEO validation: JSON-LD parses, FAQ schema matches visible copy,
// title/description lengths, canonical consistency.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let fail = 0;
const ok = (msg) => console.log('  OK  ' + msg);
const bad = (msg) => { console.log('  FAIL ' + msg); fail++; };

// 1. All JSON-LD blocks parse
console.log('\n[1] JSON-LD parse');
const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const graphs = [];
ldBlocks.forEach((blk, i) => {
    try {
        const parsed = JSON.parse(blk);
        graphs.push(parsed);
        ok(`block ${i + 1} valid JSON (${parsed['@graph'] ? parsed['@graph'].length + ' graph nodes' : parsed['@type']})`);
    } catch (e) {
        bad(`block ${i + 1}: ${e.message}`);
    }
});

// 2. Title & meta description lengths
console.log('\n[2] Meta lengths');
const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
const plainTitle = title.replace(/&amp;/g, '&');
const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
console.log(`  title (${plainTitle.length} chars): ${plainTitle}`);
console.log(`  description (${desc.length} chars): ${desc}`);
plainTitle.length <= 62 ? ok('title ≤ 62 chars (no truncation in SERPs)') : bad(`title too long: ${plainTitle.length}`);
desc.length >= 140 && desc.length <= 165 ? ok('description in 140–165 char sweet spot') : bad(`description length ${desc.length}`);

// 3. FAQ schema ↔ visible FAQ sync
console.log('\n[3] FAQ schema vs visible copy');
const faqNode = graphs.flatMap((g) => g['@graph'] || [g]).find((n) => n['@type'] === 'FAQPage');
if (!faqNode) {
    bad('FAQPage node not found');
} else {
    const schemaQs = faqNode.mainEntity.map((q) => q.name.trim());
    const faqSection = html.match(/<section id="faq"[\s\S]*?<\/section>/);
    const visibleQs = faqSection ? [...faqSection[0].matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => m[1].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim()) : [];
    if (schemaQs.length !== visibleQs.length) {
        bad(`question count: schema ${schemaQs.length} vs visible ${visibleQs.length}`);
    }
    schemaQs.forEach((q, i) => {
        if (visibleQs[i] === q) ok(`Q${i + 1} synced`);
        else bad(`Q${i + 1} mismatch:\n        schema: ${q}\n        visible: ${visibleQs[i]}`);
    });
}

// 4. Canonical / OG / sitemap URL consistency
console.log('\n[4] URL consistency');
const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
const ogUrl = (html.match(/property="og:url" content="([^"]*)"/) || [])[1];
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapLoc = (sitemap.match(/<loc>([^<]*)<\/loc>/) || [])[1];
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
const robotsSitemap = (robots.match(/Sitemap:\s*(\S+)/) || [])[1];
[[canonical, 'canonical', 'https://pankajkumawat.in/'], [ogUrl, 'og:url', 'https://pankajkumawat.in/'], [sitemapLoc, 'sitemap loc', 'https://pankajkumawat.in/'], [robotsSitemap, 'robots.txt sitemap', 'https://pankajkumawat.in/sitemap.xml']]
    .forEach(([u, label, want]) => u === want ? ok(`${label} = ${u}`) : bad(`${label} = ${u} (expected ${want})`));

// 5. Required tags present
console.log('\n[5] Required tags');
const checks = [
    [/<meta name="robots" content="index, follow/, 'robots index,follow'],
    [/<meta name="viewport"/, 'viewport'],
    [/rel="canonical"/, 'canonical'],
    [/<meta property="og:image"/, 'og:image'],
    [/<meta name="twitter:card"/, 'twitter:card'],
    [/application\/ld\+json/, 'JSON-LD'],
    [/<html lang="en"/, 'lang attribute'],
    [/<h1[\s>]/, 'single H1'],
];
checks.forEach(([re, label]) => (re.test(html) ? ok(label) : bad(label)));
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
h1Count === 1 ? ok('exactly one H1') : bad(`${h1Count} H1 tags`);

// 6. Person hasOfferCatalog resolves
console.log('\n[6] Schema references');
const person = graphs.map((g) => (g['@graph'] || []).find((n) => n['@type'] === 'Person') || (g['@type'] === 'Person' ? g : null)).find(Boolean);
const allIds = new Set(graphs.flatMap((g) => (g['@graph'] || []).map((n) => n['@id']).filter(Boolean)));
if (person && person.hasOfferCatalog && person.hasOfferCatalog['@id']) {
    allIds.has(person.hasOfferCatalog['@id']) ? ok(`hasOfferCatalog → ${person.hasOfferCatalog['@id']} resolves`) : bad(`hasOfferCatalog → ${person.hasOfferCatalog['@id']} NOT found in graph`);
} else {
    bad('Person.hasOfferCatalog missing');
}

console.log(fail ? `\n${fail} check(s) FAILED` : '\nAll checks passed');
process.exit(fail ? 1 : 0);
