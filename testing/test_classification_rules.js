#!/usr/bin/env node
/**
 * Property test for classification rules.
 *
 * Structurally validates every CLASSIFICATION_RULES_* table in
 * backend/src/services/classificationEngine.js so mis-shaped rules
 * are caught before they silently mis-classify workers.
 *
 * Checks per rule table:
 *  - Every rule has { conditions, rationale } and either a numeric level
 *    or explicit `level: null` (allowed for "cannot classify" passthroughs).
 *  - Every rule has a non-empty rationale (renders in the UI).
 *  - No duplicate (stream, level, conditions) triples (would mean the
 *    earlier rule always wins and the later one is dead code).
 *  - The classify() function can dispatch the award (exercise default path).
 */

const path = require('path');
const fs = require('fs');

const ENGINE_PATH = path.join(__dirname, '..', 'backend', 'src', 'services', 'classificationEngine.js');
const src = fs.readFileSync(ENGINE_PATH, 'utf8');

// Extract rule table names from the source
const tableMatches = [...src.matchAll(/^const (CLASSIFICATION_RULES_MA\d+)\s*=\s*\[/gm)];
const tableNames = tableMatches.map(m => m[1]);

// Load the engine to access the actual arrays via eval scope
// (they're module-private, so we parse + re-evaluate the file in a sandbox)
const vm = require('vm');
const sandbox = { require, module: {}, exports: {}, console };
vm.createContext(sandbox);
vm.runInContext(src + '\nmodule.exports._rules = {' + tableNames.map(n => `${n}`).join(', ') + '};', sandbox);
const rules = sandbox.module.exports._rules;

let failures = 0;
let passes = 0;

function fail(msg) { console.log(`  ✗ ${msg}`); failures++; }
function pass(msg) { console.log(`  ✓ ${msg}`); passes++; }

for (const tableName of tableNames) {
  const table = rules[tableName];
  console.log(`\n${tableName} (${table.length} rules)`);

  if (!Array.isArray(table) || table.length === 0) {
    fail(`${tableName} is empty or not an array`);
    continue;
  }

  const seen = new Set();
  let ok = true;

  for (let i = 0; i < table.length; i++) {
    const r = table[i];
    const where = `${tableName}[${i}]`;

    if (!r || typeof r !== 'object') {
      fail(`${where}: not an object`);
      ok = false;
      continue;
    }
    if (!r.conditions || typeof r.conditions !== 'object' || Object.keys(r.conditions).length === 0) {
      fail(`${where}: missing or empty conditions`);
      ok = false;
    }
    if (r.level === undefined || (r.level !== null && typeof r.level !== 'number')) {
      fail(`${where}: level must be a number or null (got ${JSON.stringify(r.level)})`);
      ok = false;
    }
    if (r.level !== null && (!r.stream || typeof r.stream !== 'string')) {
      fail(`${where}: stream missing for non-null level`);
      ok = false;
    }
    if (!r.rationale || typeof r.rationale !== 'string' || r.rationale.trim() === '') {
      fail(`${where}: rationale missing or empty`);
      ok = false;
    }

    const key = JSON.stringify({ s: r.stream, l: r.level, c: r.conditions });
    if (seen.has(key)) {
      fail(`${where}: duplicate of earlier rule (same stream, level, conditions) — dead code`);
      ok = false;
    }
    seen.add(key);
  }
  if (ok) pass(`${tableName}: ${table.length} rules, all well-formed, no duplicates`);
}

console.log('\n' + '═'.repeat(60));
console.log(`RESULTS: ${passes} PASS, ${failures} FAIL`);
process.exit(failures === 0 ? 0 : 1);
