#!/usr/bin/env node
/**
 * sync_from_fwc.js — Sync pay rates, allowances, and penalties from the
 * FWC Modern Awards Pay Database API.
 *
 * Usage:
 *   node scripts/sync_from_fwc.js MA000002              # dry-run (shows what would change)
 *   node scripts/sync_from_fwc.js MA000002 --apply       # apply changes to DB
 *   node scripts/sync_from_fwc.js MA000002 --map-only    # just map classifications and exit
 *   node scripts/sync_from_fwc.js --list                 # list all awards available from FWC
 *
 * What it syncs (auto-updatable data):
 *   ✓ Pay rates      — base hourly rates for each classification × employment type
 *   ✓ Allowances     — expense and wage allowances with amounts
 *
 * What it does NOT sync (requires manual authoring):
 *   ✗ Classification descriptions, duties, indicative_tasks
 *   ✗ Classification questions & answers
 *   ✗ Penalty rates  — API penalty model doesn't map cleanly to our time-band schema;
 *                       logged for reference but not auto-applied
 *   ✗ Overtime rates  — not a separate API endpoint
 *   ✗ Break entitlements — not in the API
 */
require('dotenv').config();
const pool = require('../src/db/pool');
const fwc = require('../src/services/fwcApi');

// ── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const listMode = args.includes('--list');
const applyMode = args.includes('--apply');
const mapOnly = args.includes('--map-only');
const awardCode = args.find(a => /^MA\d+$/i.test(a))?.toUpperCase();

if (!listMode && !awardCode) {
  console.error('Usage: node scripts/sync_from_fwc.js <AWARD_CODE> [--apply] [--map-only]');
  console.error('       node scripts/sync_from_fwc.js --list');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get the latest published_year entry for each unique fixed_id. */
function dedupeByFixedId(results, fixedIdKey) {
  const map = new Map();
  for (const r of results) {
    const id = r[fixedIdKey];
    const existing = map.get(id);
    if (!existing || r.published_year > existing.published_year) {
      map.set(id, r);
    }
  }
  return [...map.values()];
}

/** Normalise a classification name for matching: lowercase, collapse whitespace,
 *  replace em-dashes with hyphens, strip trailing punctuation. */
function normaliseName(name) {
  return name
    .toLowerCase()
    .replace(/\u2014/g, '-')   // em-dash → hyphen
    .replace(/\u2013/g, '-')   // en-dash → hyphen
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Try to match an FWC API classification to a DB classification.
 * Returns the DB classification row or null.
 *
 * Matching strategy (in priority order):
 *   1. If DB row already has fwc_classification_fixed_id — use that
 *   2. Parse the API classification name and match to DB level/stream/title
 */
function matchClassification(apiClassification, dbClassifications) {
  const fixedId = apiClassification.classification_fixed_id;

  // 1. Direct match by stored fixed ID
  const directMatch = dbClassifications.find(c => c.fwc_classification_fixed_id === fixedId);
  if (directMatch) return directMatch;

  // 2. Parse name and match
  const apiName = normaliseName(apiClassification.classification);

  for (const db of dbClassifications) {
    const dbTitle = normaliseName(db.title);

    // Exact substring match (API name is usually shorter, e.g. "Level 1-Year 1"
    // vs DB title "Clerical/Administrative Employee Level 1, Year 1")
    if (dbTitle.includes(apiName.replace(/-/g, '').replace(/,/g, '').replace(/\s+/g, ' '))) {
      return db;
    }

    // Try matching level pattern: "level N-year M" or "level N"
    const apiLevelMatch = apiName.match(/level\s+(\d+)(?:\s*-\s*year\s+(\d+))?/);
    if (apiLevelMatch) {
      const apiLevel = parseInt(apiLevelMatch[1]);
      const apiYear = apiLevelMatch[2] ? parseInt(apiLevelMatch[2]) : null;

      if (apiYear) {
        // Level X Year Y → match by title containing both
        if (dbTitle.includes(`level ${apiLevel}`) && dbTitle.includes(`year ${apiYear}`)) {
          return db;
        }
      } else {
        // Level X only (no year) → match by title containing "level X" but not "year"
        if (dbTitle.includes(`level ${apiLevel}`) && !dbTitle.includes('year')) {
          return db;
        }
      }
    }

    // Call centre / other special names — fuzzy match
    const apiWords = apiName.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const dbWords = dbTitle.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const overlap = apiWords.filter(w => dbWords.includes(w));
    if (overlap.length >= 3 && overlap.length >= apiWords.length * 0.6) {
      return db;
    }
  }

  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function listAwards() {
  console.log('Fetching award list from FWC API...\n');
  const results = await fwc.getAward('');
  // The API doesn't have a "list all" — we'd need to search. Instead, show info.
  console.log('The FWC API requires an award code to look up. Use a code like MA000009.');
  console.log('Full list: https://www.fwc.gov.au/agreements-awards/awards/find-award');
}

async function syncAward(awardCode) {
  const client = await pool.connect();

  try {
    // ── 1. Verify award exists in our DB ──────────────────────────────────────
    const awardResult = await client.query(
      'SELECT * FROM award_metadata WHERE award_code = $1', [awardCode]
    );
    if (awardResult.rows.length === 0) {
      console.error(`Award ${awardCode} not found in local DB. Run the seed script first.`);
      process.exit(1);
    }
    const award = awardResult.rows[0];
    console.log(`\n═══ Syncing ${awardCode}: ${award.award_name} ═══`);
    console.log(`Current effective date: ${award.effective_date}`);
    console.log(`Mode: ${applyMode ? 'APPLY (will write to DB)' : 'DRY RUN (no changes)'}\n`);

    // ── 2. Ensure fwc_classification_fixed_id column exists ─────────────────
    await client.query(`
      ALTER TABLE classifications
      ADD COLUMN IF NOT EXISTS fwc_classification_fixed_id INTEGER
    `);

    // ── 3. Load DB classifications ──────────────────────────────────────────
    const dbClassResult = await client.query(
      'SELECT * FROM classifications WHERE award_code = $1 ORDER BY sort_order',
      [awardCode]
    );
    const dbClassifications = dbClassResult.rows;
    console.log(`Local DB has ${dbClassifications.length} classifications\n`);

    // ── 4. Fetch API classifications (adult only, current year) ─────────────
    console.log('Fetching classifications from FWC API...');
    const apiClassifications = await fwc.getClassifications(awardCode, {
      operativeFrom: award.effective_date,
    });

    // Filter to adult, non-special classifications and deduplicate.
    // Exclude junior, apprentice, casino gaming, and penalty-table-specific entries.
    const adultClassifications = dedupeByFixedId(
      apiClassifications.filter(c => {
        const desc = (c.clause_description || '').toLowerCase();
        if (desc.includes('junior') || desc.includes('apprentice')) return false;
        if (desc.includes('casino gaming')) return false;
        if (desc.includes('penalty table')) return false;
        if (desc.includes('loaded rate')) return false;
        return true;
      }),
      'classification_fixed_id'
    );
    console.log(`FWC API returned ${apiClassifications.length} total, ${adultClassifications.length} adult classifications\n`);

    // ── 5. Map API classifications → DB classifications ─────────────────────
    console.log('── Classification Mapping ──');
    const mappings = []; // { apiClass, dbClass }
    const unmapped = [];
    const matchedDbIds = new Set(); // prevent 1:many mapping

    for (const apiClass of adultClassifications) {
      // Only try to match against DB classifications not yet claimed
      const available = dbClassifications.filter(c => !matchedDbIds.has(c.id));
      const dbClass = matchClassification(apiClass, available);
      if (dbClass) {
        matchedDbIds.add(dbClass.id);
        mappings.push({ apiClass, dbClass });
        console.log(`  ✓ API "${apiClass.classification}" → DB L${dbClass.level} ${dbClass.stream} "${dbClass.title}"`);
      } else {
        unmapped.push(apiClass);
        console.log(`  ✗ API "${apiClass.classification}" (${apiClass.clause_description}) — NO MATCH`);
      }
    }

    if (unmapped.length > 0) {
      console.log(`\n  ⚠ ${unmapped.length} API classifications could not be matched.`);
      console.log('  These may need manual mapping or are not relevant to WageCheck.');
    }

    // Store the fixed IDs for future syncs
    if (applyMode) {
      for (const { apiClass, dbClass } of mappings) {
        if (dbClass.fwc_classification_fixed_id !== apiClass.classification_fixed_id) {
          await client.query(
            'UPDATE classifications SET fwc_classification_fixed_id = $1 WHERE id = $2',
            [apiClass.classification_fixed_id, dbClass.id]
          );
        }
      }
      console.log('\n  ✓ Stored classification_fixed_id mappings');
    }

    if (mapOnly) {
      console.log('\n--map-only mode: exiting after classification mapping.');
      return;
    }

    // ── 6. Fetch and sync pay rates ─────────────────────────────────────────
    console.log('\n── Pay Rates ──');
    const rateChanges = [];
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const { apiClass, dbClass } of mappings) {
      await wait(200); // respect API rate limits
      const payRates = await fwc.getPayRateForClassification(
        awardCode, apiClass.classification_fixed_id
      );

      // Find the current (latest published_year) rate
      const currentRate = payRates.reduce((best, r) =>
        (!best || r.published_year > best.published_year) ? r : best, null
      );

      // Some awards use calculated_rate (hourly derived from weekly), others use
      // base_rate directly (base_rate_type = "Hourly"). Handle both.
      const hourlyRate = currentRate.calculated_rate ?? (
        currentRate.base_rate_type === 'Hourly' ? currentRate.base_rate : null
      );

      if (!currentRate || hourlyRate === null) {
        console.log(`  ? ${apiClass.classification} — no rate data from API`);
        continue;
      }

      const apiRate = parseFloat(hourlyRate);
      const apiEffective = currentRate.operative_from;

      // Get current DB rate for this classification (FT base)
      const dbRateResult = await client.query(
        `SELECT rate_amount, effective_date FROM pay_rates
         WHERE classification_id = $1 AND employment_type = 'full_time'
           AND rate_type = 'base_hourly'
         ORDER BY effective_date DESC LIMIT 1`,
        [dbClass.id]
      );
      const dbRate = dbRateResult.rows[0];
      const dbAmount = dbRate ? parseFloat(dbRate.rate_amount) : null;

      if (dbAmount === apiRate) {
        console.log(`  ✓ ${apiClass.classification}: $${apiRate}/hr (unchanged)`);
      } else {
        console.log(`  ⬆ ${apiClass.classification}: $${dbAmount || '?'} → $${apiRate}/hr (effective ${apiEffective})`);
        rateChanges.push({ dbClass, apiRate, apiEffective });
      }
    }

    if (applyMode && rateChanges.length > 0) {
      await client.query('BEGIN');
      for (const { dbClass, apiRate, apiEffective } of rateChanges) {
        const casualRate = parseFloat((apiRate * 1.25).toFixed(4));

        // Upsert FT and PT base rates
        for (const empType of ['full_time', 'part_time']) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, $3, 'base_hourly', $4, $5)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [awardCode, dbClass.id, empType, apiRate, apiEffective]);
        }

        // Upsert casual base rate
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [awardCode, dbClass.id, casualRate, apiEffective]);

        // Upsert casual loading
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [awardCode, dbClass.id, apiEffective]);
      }

      // Update effective date in award_metadata
      const latestEffective = rateChanges
        .map(r => r.apiEffective)
        .sort()
        .pop();
      await client.query(
        `UPDATE award_metadata SET effective_date = $1, updated_at = NOW() WHERE award_code = $2`,
        [latestEffective, awardCode]
      );

      await client.query('COMMIT');
      console.log(`\n  ✓ Applied ${rateChanges.length} pay rate updates`);
    } else if (rateChanges.length > 0) {
      console.log(`\n  ℹ ${rateChanges.length} rate change(s) found. Run with --apply to update.`);
    } else {
      console.log('\n  All pay rates are up to date.');
    }

    // ── 7. Fetch and sync allowances ────────────────────────────────────────
    console.log('\n── Allowances ──');

    const [expenseAllowances, wageAllowances] = await Promise.all([
      fwc.getExpenseAllowances(awardCode, { operativeFrom: award.effective_date }),
      fwc.getWageAllowances(awardCode, { operativeFrom: award.effective_date }),
    ]);

    // Deduplicate to latest published_year
    const latestExpense = dedupeByFixedId(expenseAllowances, 'expense_allowance_fixed_id');
    const latestWage = dedupeByFixedId(wageAllowances, 'wage_allowance_fixed_id');

    console.log(`  FWC API: ${latestExpense.length} expense allowances, ${latestWage.length} wage allowances`);

    // Get current DB allowances
    const dbAllowances = await client.query(
      'SELECT * FROM allowances WHERE award_code = $1', [awardCode]
    );
    console.log(`  Local DB: ${dbAllowances.rows.length} allowances\n`);

    // Show comparison
    const allApiAllowances = [
      ...latestExpense.map(a => ({
        name: a.allowance,
        amount: a.allowance_amount,
        frequency: a.payment_frequency,
        isAllPurpose: a.is_all_purpose,
        source: 'expense',
        fixedId: a.expense_allowance_fixed_id,
      })),
      ...latestWage.map(a => ({
        name: a.allowance,
        amount: a.allowance_amount,
        frequency: a.payment_frequency,
        isAllPurpose: a.is_all_purpose,
        source: 'wage',
        fixedId: a.wage_allowance_fixed_id,
      })),
    ];

    const allowanceChanges = [];
    const matchedAllowanceIds = new Set(); // prevent double-matching
    for (const apiAllow of allApiAllowances) {
      // Try to match to DB by name similarity.
      // Use keyword overlap but exclude generic words like "allowance".
      const genericWords = new Set(['allowance', 'employee', 'employees', 'per', 'the', 'and', 'for']);
      const dbMatch = dbAllowances.rows.find(db => {
        if (matchedAllowanceIds.has(db.id)) return false;
        const apiNorm = normaliseName(apiAllow.name);
        const dbNorm = normaliseName(db.name);
        const apiWords = apiNorm.split(/[\s\-,()]+/).filter(w => w.length > 2 && !genericWords.has(w));
        const dbWords = dbNorm.split(/[\s\-,()]+/).filter(w => w.length > 2 && !genericWords.has(w));
        const overlap = apiWords.filter(w => dbWords.some(dw => dw.includes(w) || w.includes(dw)));
        return overlap.length >= 2;
      });
      if (dbMatch) matchedAllowanceIds.add(dbMatch.id);

      if (dbMatch) {
        const dbAmount = dbMatch.amount ? parseFloat(dbMatch.amount) : null;
        if (dbAmount === apiAllow.amount) {
          console.log(`  ✓ ${apiAllow.name}: $${apiAllow.amount} (unchanged)`);
        } else {
          console.log(`  ⬆ ${apiAllow.name}: $${dbAmount || '?'} → $${apiAllow.amount}`);
          allowanceChanges.push({ dbMatch, apiAllow });
        }
      } else {
        console.log(`  ⊕ ${apiAllow.name}: $${apiAllow.amount} ${apiAllow.frequency} (new — not in DB)`);
      }
    }

    if (applyMode && allowanceChanges.length > 0) {
      await client.query('BEGIN');
      for (const { dbMatch, apiAllow } of allowanceChanges) {
        await client.query(
          `UPDATE allowances SET amount = $1, updated_at = NOW() WHERE id = $2`,
          [apiAllow.amount, dbMatch.id]
        );
      }
      await client.query('COMMIT');
      console.log(`\n  ✓ Applied ${allowanceChanges.length} allowance updates`);
    } else if (allowanceChanges.length > 0) {
      console.log(`\n  ℹ ${allowanceChanges.length} allowance change(s) found. Run with --apply to update.`);
    } else {
      console.log('\n  All allowances are up to date.');
    }

    // ── 8. Show penalty rates (reference only — not auto-applied) ───────────
    console.log('\n── Penalty Rates (reference only) ──');
    console.log('  Penalty rates are logged for reference but NOT auto-applied.');
    console.log('  The API penalty model uses percentage rates per clause, which');
    console.log('  don\'t map directly to our time-band multiplier schema.\n');

    const apiPenalties = await fwc.getPenalties(awardCode, {
      operativeFrom: award.effective_date,
    });

    // Show unique adult non-shiftworker penalty patterns
    const adultPenalties = apiPenalties.filter(r => {
      const d = r.clause_description.toLowerCase();
      return d.includes('adult') && !d.includes('apprentice');
    });

    const seenPenalties = new Set();
    const uniquePenalties = adultPenalties.filter(r => {
      const k = `${r.clause_description}|${r.penalty_description}|${r.rate}`;
      if (seenPenalties.has(k)) return false;
      seenPenalties.add(k);
      return true;
    });

    for (const p of uniquePenalties) {
      const multiplier = (p.rate / 100).toFixed(2);
      console.log(`  ${p.clause_description}`);
      console.log(`    ${p.penalty_description}: ${p.rate}% (×${multiplier})`);
    }

    // ── Done ──────────────────────────────────────────────────────────────────
    console.log('\n═══ Sync complete ═══\n');

  } finally {
    client.release();
    await pool.end();
  }
}

// ── Entry point ──────────────────────────────────────────────────────────────
(async () => {
  try {
    if (listMode) {
      await listAwards();
    } else {
      await syncAward(awardCode);
    }
  } catch (err) {
    console.error('Sync failed:', err.message);
    if (err.response) {
      console.error('API response:', err.response.status, err.response.data);
    }
    process.exit(1);
  }
})();
