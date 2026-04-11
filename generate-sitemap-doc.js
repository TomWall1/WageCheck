const fs = require('fs');

// Read awards
const awardsFile = fs.readFileSync('C:/Documents/WageCheck/frontend/lib/awards.ts', 'utf8');
const awardMatches = [...awardsFile.matchAll(/code: '(MA\d+)', slug: '([^']+)', shortName: '([^']+)'/g)];
const awards = awardMatches.map(m => ({ code: m[1], slug: m[2], name: m[3] }));

// Read guides
const guidesFile = fs.readFileSync('C:/Documents/WageCheck/frontend/lib/guides.ts', 'utf8');
const guideMatches = [...guidesFile.matchAll(/slug: '([^']+)', title: '([^']+)'/g)];

// Hand-crafted awards
const premium = ['hospitality-award','restaurant-award','fast-food-award','retail-award','cleaning-award','clerks-award','security-award','fitness-award'];

// Generic slugs
const intentSlugs = ['am-i-being-underpaid','not-getting-overtime','hourly-rate-check','pay-too-low','flat-rate-legal','no-penalty-rates'];
const scenarioSlugs = ['public-holiday','sent-home-early','cash-in-hand','no-payslip','overtime-not-paid','below-award','super-not-paid','casual-conversion'];
const subPages = ['pay-rates','penalty-rates','casual-employees','overtime','allowances','classifications'];

// Read premium pages
function readPages(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const intentM = [...content.matchAll(/slug: '([^']+)'[^}]*type: 'intent'/g)];
    const scenarioM = [...content.matchAll(/slug: '([^']+)'[^}]*type: 'scenario'/g)];
    const roleM = [...content.matchAll(/slug: '([^']+)'[^}]*type: 'role'/g)];
    return { intents: intentM.map(m=>m[1]), scenarios: scenarioM.map(m=>m[1]), roles: roleM.map(m=>m[1]) };
  } catch(e) { return { intents: [], scenarios: [], roles: [] }; }
}

const premiumPages = {};
const pageFiles = {
  'hospitality-award': 'hospitality-pages.ts',
  'restaurant-award': 'restaurant-pages.ts',
  'fast-food-award': 'fast-food-pages.ts',
  'retail-award': 'retail-pages.ts',
  'cleaning-award': 'cleaning-pages.ts',
  'clerks-award': 'clerks-pages.ts',
  'security-award': 'security-pages.ts',
  'fitness-award': 'fitness-pages.ts',
};
for (const [slug, file] of Object.entries(pageFiles)) {
  premiumPages[slug] = readPages('C:/Documents/WageCheck/frontend/lib/' + file);
}

const base = 'https://reviewmypay.com';
let totalPages = 0;
let html = '';

html += '<!DOCTYPE html><html><head><meta charset="utf-8"><title>ReviewMyPay.com - Complete Sitemap</title>';
html += '<style>';
html += 'body{font-family:Segoe UI,Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;color:#1a1a1a;font-size:13px;line-height:1.6}';
html += 'h1{font-size:24px;border-bottom:2px solid #1a1a1a;padding-bottom:10px}';
html += 'h2{font-size:18px;margin-top:30px;color:#2e7d32;border-bottom:1px solid #ccc;padding-bottom:5px}';
html += 'h3{font-size:14px;margin-top:15px;color:#555}';
html += 'a{color:#1565c0;text-decoration:none}a:hover{text-decoration:underline}';
html += '.url{font-family:Consolas,monospace;font-size:12px;color:#555;display:block;margin:2px 0 2px 20px}';
html += '.section-count{color:#888;font-weight:normal;font-size:13px}';
html += '.toc{background:#f5f5f5;padding:15px 25px;border-radius:8px;margin:20px 0}.toc li{margin:4px 0}';
html += '.award-block{margin:10px 0 10px 10px;padding-left:10px;border-left:2px solid #e0e0e0}';
html += '.summary{background:#e8f5e9;padding:20px;border-radius:8px;margin:30px 0;font-size:15px}';
html += '@media print{body{font-size:11px}.url{font-size:10px}}';
html += '</style></head><body>';

html += '<h1>ReviewMyPay.com &mdash; Complete Sitemap</h1>';
html += '<p>Generated: 11 April 2026 &nbsp;|&nbsp; Total awards: ' + awards.length + '</p>';

// TOC
html += '<div class="toc"><strong>Contents</strong><ol>';
html += '<li><a href="#static">Static Pages</a></li>';
html += '<li><a href="#guides">Guides</a></li>';
html += '<li><a href="#wizard">Check Pay Wizard</a></li>';
html += '<li><a href="#premium">Premium Awards (hand-crafted content)</a></li>';
html += '<li><a href="#standard">Standard Awards (generic content)</a></li>';
html += '<li><a href="#summary">Summary</a></li>';
html += '</ol></div>';

// 1. Static
html += '<h2 id="static">1. Static Pages <span class="section-count">(8 pages)</span></h2>';
['', 'check-my-pay', 'awards', 'guides', 'resources', 'about', 'contact', 'privacy'].forEach(s => {
  html += '<span class="url">' + base + '/' + s + '</span>';
  totalPages++;
});

// 2. Guides
html += '<h2 id="guides">2. Guides <span class="section-count">(' + guideMatches.length + ' pages)</span></h2>';
guideMatches.forEach(g => {
  html += '<span class="url">' + base + '/guides/' + g[1] + ' &mdash; ' + g[2] + '</span>';
  totalPages++;
});

// 3. Wizard
html += '<h2 id="wizard">3. Check Pay Wizard <span class="section-count">(6 pages)</span></h2>';
['employment','role','shifts','allowances','rights','results'].forEach(s => {
  html += '<span class="url">' + base + '/check/' + s + '</span>';
  totalPages++;
});

// 4. Premium awards
let premiumTotal = 0;
html += '<h2 id="premium">4. Premium Awards &mdash; Hand-Crafted Content</h2>';
html += '<p>These 8 awards have individually written content components with award-specific copy, worked examples, and tailored FAQs.</p>';

premium.forEach(slug => {
  const award = awards.find(a => a.slug === slug);
  if (!award) return;
  const pages = premiumPages[slug] || { intents:[], scenarios:[], roles:[] };
  const count = 7 + pages.intents.length + pages.scenarios.length + pages.roles.length;
  premiumTotal += count;

  html += '<h3>' + award.name + ' (' + award.code + ') &mdash; ' + count + ' pages</h3>';
  html += '<div class="award-block">';
  html += '<span class="url">' + base + '/awards/' + slug + ' (hub)</span>';
  subPages.forEach(s => {
    html += '<span class="url">' + base + '/awards/' + slug + '/' + s + '</span>';
  });
  if (pages.intents.length) {
    html += '<br><em style="font-size:11px;color:#888;margin-left:20px">Intent pages:</em>';
    pages.intents.forEach(s => {
      html += '<span class="url">' + base + '/awards/' + slug + '/' + s + '</span>';
    });
  }
  if (pages.scenarios.length) {
    html += '<br><em style="font-size:11px;color:#888;margin-left:20px">Scenario pages:</em>';
    pages.scenarios.forEach(s => {
      html += '<span class="url">' + base + '/awards/' + slug + '/scenarios/' + s + '</span>';
    });
  }
  if (pages.roles.length) {
    html += '<br><em style="font-size:11px;color:#888;margin-left:20px">Role pages:</em>';
    pages.roles.forEach(s => {
      html += '<span class="url">' + base + '/awards/' + slug + '/' + s + '</span>';
    });
  }
  html += '</div>';
});
totalPages += premiumTotal;
html += '<p><strong>Premium subtotal: ' + premiumTotal + ' pages across ' + premium.length + ' awards</strong></p>';

// 5. Standard awards
const standardAwards = awards.filter(a => !premium.includes(a.slug));
const perAward = 7 + intentSlugs.length + scenarioSlugs.length;
const standardTotal = standardAwards.length * perAward;

html += '<h2 id="standard">5. Standard Awards &mdash; Generic Content <span class="section-count">(' + standardAwards.length + ' awards, ' + standardTotal + ' pages)</span></h2>';
html += '<p>Each standard award has <strong>' + perAward + ' pages</strong>: 1 hub + 6 sub-pages + ' + intentSlugs.length + ' intent pages + ' + scenarioSlugs.length + ' scenario pages. All use parameterized generic components with live API rates.</p>';

standardAwards.forEach(award => {
  html += '<h3>' + award.name + ' (' + award.code + ') &mdash; ' + perAward + ' pages</h3>';
  html += '<div class="award-block">';
  html += '<span class="url">' + base + '/awards/' + award.slug + ' (hub)</span>';
  subPages.forEach(s => {
    html += '<span class="url">' + base + '/awards/' + award.slug + '/' + s + '</span>';
  });
  intentSlugs.forEach(s => {
    html += '<span class="url">' + base + '/awards/' + award.slug + '/' + s + '</span>';
  });
  scenarioSlugs.forEach(s => {
    html += '<span class="url">' + base + '/awards/' + award.slug + '/scenarios/' + s + '</span>';
  });
  html += '</div>';
});
totalPages += standardTotal;

// Summary
html += '<h2 id="summary">6. Summary</h2>';
html += '<div class="summary">';
html += '<strong style="font-size:20px">Total pages: ' + totalPages + '</strong><br><br>';
html += '<table style="font-size:14px;border-collapse:collapse">';
html += '<tr><td style="padding:4px 20px 4px 0">Static pages</td><td style="text-align:right">8</td></tr>';
html += '<tr><td style="padding:4px 20px 4px 0">Guides</td><td style="text-align:right">' + guideMatches.length + '</td></tr>';
html += '<tr><td style="padding:4px 20px 4px 0">Check wizard</td><td style="text-align:right">6</td></tr>';
html += '<tr><td style="padding:4px 20px 4px 0">Premium awards (' + premium.length + ' awards)</td><td style="text-align:right">' + premiumTotal + '</td></tr>';
html += '<tr><td style="padding:4px 20px 4px 0">Standard awards (' + standardAwards.length + ' awards)</td><td style="text-align:right">' + standardTotal + '</td></tr>';
html += '<tr style="border-top:2px solid #333;font-weight:bold"><td style="padding:8px 20px 4px 0">Total</td><td style="text-align:right;padding-top:8px">' + totalPages + '</td></tr>';
html += '</table>';
html += '</div>';

html += '<p style="color:#888;font-size:11px;margin-top:40px">Generated from frontend/lib/awards.ts, frontend/lib/*-pages.ts, and frontend/lib/generic-pages.ts</p>';
html += '</body></html>';

fs.writeFileSync('C:/Documents/WageCheck/ReviewMyPay_Sitemap.html', html);
console.log('Done: ' + totalPages + ' total pages written to ReviewMyPay_Sitemap.html');
