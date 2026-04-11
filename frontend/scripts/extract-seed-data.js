/**
 * Extracts rate data from all backend seed files into a single JSON file.
 * Run before build: node scripts/extract-seed-data.js
 *
 * Output: lib/seed-data.json
 *
 * This avoids parsing .js files with fragile regex at build time.
 * Instead we evaluate each seed file's data structures directly.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SEEDS_DIR = path.join(__dirname, '..', '..', 'backend', 'scripts');
const OUTPUT = path.join(__dirname, '..', 'lib', 'seed-data.json');

function extractFromSeed(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const code = content.match(/const AWARD_CODE[\s\S]*/)?.[0] || '';

  // Extract AWARD_CODE and EFFECTIVE_DATE
  const awardCode = content.match(/AWARD_CODE\s*=\s*'([^']+)'/)?.[1];
  const effectiveDate = content.match(/EFFECTIVE_DATE\s*=\s*'([^']+)'/)?.[1];
  if (!awardCode) return null;

  // Extract classifications array
  const classMatch = content.match(/const classifications\s*=\s*\[([\s\S]*?)\];\s*\n/);
  const classifications = [];
  if (classMatch) {
    // Use a sandboxed eval to parse the array
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(`result = [${classMatch[1]}]`, sandbox);
      for (const c of sandbox.result) {
        classifications.push({
          level: c.level,
          stream: c.stream || 'general',
          title: c.title,
          description: c.description || '',
          duties: c.duties || [],
          ftRate: c.ft || 0, // Some seeds embed rates directly in classification objects
        });
      }
    } catch (e) {
      console.warn(`  Warning: could not parse classifications for ${awardCode}: ${e.message}`);
    }
  }

  // Extract rates - try all known variable names and patterns
  const rateMap = {}; // key: "level_stream" -> ftRate

  // Try multiple variable name patterns for the rates object
  const rateVarPatterns = [
    /const rates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const baseRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const BASE_RATES\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const ftRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const rateByLevel\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const nonLiquorRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const coachBaseRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const clericalBaseRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const adultRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
    /const payRates\s*=\s*\{([\s\S]*?)\};\s*\n/,
  ];

  // Try ALL patterns — some awards have multiple rate variables
  const allRatesMatches = [];
  for (const pattern of rateVarPatterns) {
    const m = content.match(pattern);
    if (m) allRatesMatches.push(m);
  }

  for (const ratesMatch of allRatesMatches) {
    // Check if it has quoted keys like '1_general': 26.55
    const quotedEntries = ratesMatch[1].match(/'([^']+)':\s*([\d.]+)/g) || [];
    if (quotedEntries.length > 0) {
      for (const e of quotedEntries) {
        const m = e.match(/'([^']+)':\s*([\d.]+)/);
        if (m) {
          const rate = parseFloat(m[2]);
          const rawKey = m[1];
          // Store under multiple key formats for matching flexibility
          rateMap[rawKey] = rate;
          // Normalize: 'stream:level' -> 'level_stream' and vice versa
          if (rawKey.includes(':')) {
            const [stream, level] = rawKey.split(':');
            rateMap[`${level}_${stream}`] = rate;
          } else if (rawKey.includes('_')) {
            const parts = rawKey.split('_');
            // Could be 'level_stream' or 'stream_level' - store both
            rateMap[`${parts[1]}_${parts[0]}`] = rate;
          }
        }
      }
    } else {
      // Try eval for numeric or nested object formats
      try {
        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(`result = {${ratesMatch[1]}}`, sandbox);
        const br = sandbox.result;
        for (const [key, val] of Object.entries(br)) {
          if (typeof val === 'number') {
            // Simple: { 1: 26.55 } — key is level
            rateMap[`${key}_general`] = val;
          } else if (typeof val === 'object' && val.ft) {
            // Object with ft/casual: { ft: 24.28, casual: 30.35 }
            // Key format may be 'stream:level' or 'level_stream'
            const parts = key.includes(':') ? key.split(':') : key.split('_');
            if (parts.length === 2) {
              // Determine which part is level vs stream
              const isFirstNum = /^\d+$/.test(parts[0]);
              const level = isFirstNum ? parts[0] : parts[1];
              const stream = isFirstNum ? parts[1] : parts[0];
              rateMap[`${level}_${stream}`] = val.ft;
            }
          } else if (typeof val === 'object') {
            // Nested: { admin: { 1: 25.54 } } — key is stream
            for (const [level, rate] of Object.entries(val)) {
              if (typeof rate === 'number') {
                rateMap[`${level}_${key}`] = rate;
              }
            }
          }
        }
      } catch (e) {
        console.warn(`  Warning: could not parse rates for ${awardCode}: ${e.message}`);
      }
    }
  }

  // Match rates to classifications
  // Skip if rate was already embedded in the classification object (ftRate > 0)
  // Otherwise: exact key first, then general key, then any-stream fallback
  const allStreamsInRates = [...new Set(Object.keys(rateMap).map(k => k.split('_').slice(1).join('_')))];

  for (const cls of classifications) {
    if (cls.ftRate > 0) continue; // Already has embedded rate

    const exactKey = `${cls.level}_${cls.stream}`;
    const generalKey = `${cls.level}_general`;

    if (rateMap[exactKey]) {
      cls.ftRate = rateMap[exactKey];
    } else if (rateMap[generalKey]) {
      cls.ftRate = rateMap[generalKey];
    } else {
      // Fallback: try matching by level against any stream in the rate map
      for (const stream of allStreamsInRates) {
        const fallbackKey = `${cls.level}_${stream}`;
        if (rateMap[fallbackKey]) {
          cls.ftRate = rateMap[fallbackKey];
          break;
        }
      }
    }
  }

  // Extract penalty rates
  const penaltyMatch = content.match(/const penaltyRates\s*=\s*\[([\s\S]*?)\];\s*\n/);
  const penalties = [];
  if (penaltyMatch) {
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(`result = [${penaltyMatch[1]}]`, sandbox);
      // Collect FT penalties and match with casual
      const ftEntries = sandbox.result.filter(p => p.employment_type === 'full_time');
      const casualEntries = sandbox.result.filter(p => p.employment_type === 'casual');

      for (const ft of ftEntries) {
        const casual = casualEntries.find(c =>
          c.day_type === ft.day_type && c.time_band_label === ft.time_band_label
        );
        penalties.push({
          dayType: ft.day_type,
          ftMultiplier: ft.multiplier,
          casualMultiplier: casual ? casual.multiplier : ft.multiplier,
          additionPerHour: ft.addition_per_hour || null,
          timeBandLabel: ft.time_band_label || null,
        });
      }
    } catch (e) {
      console.warn(`  Warning: could not parse penaltyRates for ${awardCode}: ${e.message}`);
    }
  }

  // Extract allowances
  const allowanceMatch = content.match(/const allowances\s*=\s*\[([\s\S]*?)\];\s*\n/);
  const allowances = [];
  if (allowanceMatch) {
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(`result = [${allowanceMatch[1]}]`, sandbox);
      for (const a of sandbox.result) {
        allowances.push({
          type: a.allowance_type,
          name: a.name,
          amount: a.amount || 0,
          perUnit: a.per_unit || '',
          isAllPurpose: false,
          description: a.description || '',
        });
      }
    } catch (e) {
      console.warn(`  Warning: could not parse allowances for ${awardCode}: ${e.message}`);
    }
  }

  return { awardCode, effectiveDate, classifications, penalties, allowances };
}

// Main
console.log('Extracting seed data...');
const seedFiles = fs.readdirSync(SEEDS_DIR)
  .filter(f => f.match(/^seed_ma\d+\.js$/))
  .sort();

const allData = {};
let success = 0;
let failed = 0;

for (const file of seedFiles) {
  const filePath = path.join(SEEDS_DIR, file);
  try {
    const data = extractFromSeed(filePath);
    if (data && data.awardCode) {
      allData[data.awardCode] = data;
      const rateCount = data.classifications.filter(c => c.ftRate > 0).length;
      if (rateCount === 0) {
        console.log(`  ${data.awardCode}: ${data.classifications.length} classifications, 0 rates (no rate data found)`);
      }
      success++;
    }
  } catch (e) {
    console.warn(`  Failed: ${file}: ${e.message}`);
    failed++;
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(allData, null, 2));
console.log(`\nDone: ${success} awards extracted, ${failed} failed`);
console.log(`Output: ${OUTPUT} (${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB)`);
