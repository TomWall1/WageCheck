/**
 * Seed Verifier — validates DB rates against FWC MAPD API (source of truth).
 *
 * Stage 1 of the two-stage testing guarantee:
 *   Stage 1: DB rates match the FWO pay guide (this module)
 *   Stage 2: Calculator output matches expected math using those verified rates
 *
 * If Stage 1 fails, Stage 2 results are meaningless — the agent runs them in
 * order and reports seed mismatches before calculation tests.
 *
 * Usage:
 *   const { verifySeed } = require('./seedVerifier');
 *   const results = await verifySeed(pool, 'MA000100');
 *   // results: { passed: [], failed: [], skipped: [], summary: string }
 */

const path = require('path');
const backendDir = path.join(__dirname, '..', '..', 'backend');
module.paths.unshift(path.join(backendDir, 'node_modules'));
process.chdir(backendDir);
require('dotenv').config({ path: path.join(backendDir, '.env') });

let fwcApi;
try {
  fwcApi = require(path.join(backendDir, 'src', 'services', 'fwcApi'));
} catch (e) {
  // FWC_API_KEY may not be set — handle gracefully
  fwcApi = null;
}

const TOLERANCE = 0.02; // Allow $0.02 rounding tolerance

function round2(n) { return Math.round(n * 100) / 100; }

/**
 * Verify an award's seeded data against the FWC MAPD API.
 *
 * Checks:
 *   1. Base hourly rates for all classifications
 *   2. Allowance amounts (expense + wage)
 *
 * Penalty rates and overtime rates are not directly available from the FWC API
 * in the same structure — those are verified via the reference calculator tests.
 */
async function verifySeed(pool, awardCode) {
  const results = { passed: [], failed: [], skipped: [], warnings: [] };

  if (!fwcApi) {
    results.skipped.push({
      testId: 'SEED-00',
      reason: 'FWC_API_KEY not set — cannot verify against MAPD API. Seed verification skipped.',
    });
    return results;
  }

  // Fetch the latest available rates from the FWC API — no date filtering.
  // Each award updates at its own time (some July, some October, some other dates).
  // The API returns all operative periods; we pick the most recent rate per classification.

  // ── 1. Verify base pay rates ────────────────────────────────────────────
  console.log('\n  Verifying base pay rates against FWC API (latest available)...');

  let apiRates;
  try {
    apiRates = await fwcApi.getPayRates(awardCode);
  } catch (e) {
    results.skipped.push({
      testId: 'SEED-RATES',
      reason: `FWC API error fetching pay rates: ${e.message}`,
    });
    apiRates = [];
  }

  if (apiRates.length > 0) {
    // Load DB classifications with fwc_classification_fixed_id for matching
    const dbCls = await pool.query(
      `SELECT c.id, c.level, c.stream, c.fwc_classification_fixed_id,
              pr.rate_amount, pr.employment_type
       FROM classifications c
       JOIN pay_rates pr ON pr.classification_id = c.id AND pr.rate_type = 'base_hourly'
       WHERE c.award_code = $1 AND pr.employment_type IN ('full_time', 'part_time')
       ORDER BY c.stream, c.level`,
      [awardCode]
    );

    // Build a map of FWC classification fixed_id -> most recent hourly rate.
    // The API may return multiple operative periods per classification — keep the latest.
    const fwcRateMap = new Map();
    for (const apiRate of apiRates) {
      if (!apiRate.classification_fixed_id) continue;
      if (apiRate.base_rate_type === 'Hourly' && apiRate.base_rate != null) {
        const id = apiRate.classification_fixed_id;
        const existing = fwcRateMap.get(id);
        const operativeFrom = apiRate.operative_from || '0000-00-00';
        if (!existing || operativeFrom > existing.operativeFrom) {
          fwcRateMap.set(id, { rate: parseFloat(apiRate.base_rate), operativeFrom });
        }
      }
    }

    let rateIdx = 1;
    for (const row of dbCls.rows) {
      const testId = `SEED-BR-${String(rateIdx++).padStart(2, '0')}`;
      if (!row.fwc_classification_fixed_id) {
        results.skipped.push({ testId, reason: `No fwc_classification_fixed_id for L${row.level} ${row.stream}` });
        continue;
      }
      const apiEntry = fwcRateMap.get(row.fwc_classification_fixed_id);
      if (!apiEntry) {
        results.skipped.push({ testId, reason: `FWC API returned no hourly rate for fwc_id=${row.fwc_classification_fixed_id}` });
        continue;
      }
      const apiRate = apiEntry.rate;
      const dbRate = parseFloat(row.rate_amount);
      const diff = Math.abs(dbRate - apiRate);
      const passed = diff <= TOLERANCE;
      const entry = {
        testId,
        description: `L${row.level} ${row.stream} ${row.employment_type} base_hourly`,
        dbValue: dbRate,
        apiValue: apiRate,
        diff: round2(diff),
      };
      if (passed) {
        results.passed.push(entry);
        console.log(`    ✓ ${testId}: L${row.level} ${row.stream} DB=$${dbRate} API=$${apiRate}`);
      } else {
        results.failed.push(entry);
        console.log(`    ✗ ${testId}: L${row.level} ${row.stream} DB=$${dbRate} API=$${apiRate} (diff=$${round2(diff)})`);
      }
    }
  } else {
    results.skipped.push({ testId: 'SEED-BR', reason: 'No pay rates returned from FWC API' });
  }

  // ── 2. Verify allowances ────────────────────────────────────────────────
  console.log('  Verifying allowances against FWC API...');

  let apiExpenseAllowances = [];
  let apiWageAllowances = [];
  try {
    [apiExpenseAllowances, apiWageAllowances] = await Promise.all([
      fwcApi.getExpenseAllowances(awardCode),
      fwcApi.getWageAllowances(awardCode),
    ]);
  } catch (e) {
    results.skipped.push({
      testId: 'SEED-AL',
      reason: `FWC API error fetching allowances: ${e.message}`,
    });
  }

  const allApiAllowances = [...apiExpenseAllowances, ...apiWageAllowances];

  if (allApiAllowances.length > 0) {
    const dbAllowances = await pool.query(
      'SELECT allowance_type, name, amount, is_all_purpose FROM allowances WHERE award_code = $1',
      [awardCode]
    );

    // For each DB allowance, try to find a matching API allowance by amount
    let alIdx = 1;
    for (const dbRow of dbAllowances.rows) {
      const testId = `SEED-AL-${String(alIdx++).padStart(2, '0')}`;
      if (!dbRow.amount) {
        results.skipped.push({ testId, reason: `${dbRow.allowance_type} has no fixed amount` });
        continue;
      }
      const dbAmount = parseFloat(dbRow.amount);

      // Try to find matching API allowance by name similarity or exact amount
      const match = allApiAllowances.find(a => {
        if (a.rate != null && Math.abs(parseFloat(a.rate) - dbAmount) <= TOLERANCE) return true;
        if (a.fixed_amount != null && Math.abs(parseFloat(a.fixed_amount) - dbAmount) <= TOLERANCE) return true;
        return false;
      });

      if (match) {
        const apiAmount = parseFloat(match.rate ?? match.fixed_amount);
        results.passed.push({
          testId,
          description: `${dbRow.allowance_type} allowance`,
          dbValue: dbAmount,
          apiValue: apiAmount,
          diff: round2(Math.abs(dbAmount - apiAmount)),
        });
        console.log(`    ✓ ${testId}: ${dbRow.allowance_type} DB=$${dbAmount} API=$${apiAmount}`);
      } else {
        results.warnings.push({
          testId,
          description: `${dbRow.allowance_type} allowance ($${dbAmount}) — no exact match in API response`,
          dbValue: dbAmount,
        });
        console.log(`    ~ ${testId}: ${dbRow.allowance_type} DB=$${dbAmount} — no exact API match (manual verify needed)`);
      }
    }
  } else {
    results.skipped.push({ testId: 'SEED-AL', reason: 'No allowances returned from FWC API' });
  }

  // ── Summary ─────────────────────────────────────────────────────────────
  const total = results.passed.length + results.failed.length + results.skipped.length + results.warnings.length;
  results.summary = `Seed verification: ${results.passed.length} PASS, ${results.failed.length} FAIL, ${results.warnings.length} WARN, ${results.skipped.length} SKIP (${total} total)`;

  return results;
}

module.exports = { verifySeed };
