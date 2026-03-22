/**
 * Award Completeness Validator
 *
 * Run after seeding a new award to verify all required entitlements are present.
 * This catches missing overtime rates, penalty rates, and other gaps BEFORE
 * they reach production.
 *
 * Usage:
 *   node testing/validate_award_completeness.js                 # validate ALL awards
 *   node testing/validate_award_completeness.js MA000080        # validate one award
 *
 * Exit code: 0 = all pass, 1 = failures found
 */
const path = require('path');
const backendDir = path.resolve(__dirname, '..', 'backend');
process.chdir(backendDir);
// Add backend's node_modules to require path so dotenv resolves
module.paths.unshift(path.join(backendDir, 'node_modules'));
require('dotenv').config({ path: path.join(backendDir, '.env') });
const pool = require(path.join(backendDir, 'src', 'db', 'pool'));

const EMP_TYPES = ['full_time', 'part_time', 'casual'];
const PERIODS = ['daily', 'weekly'];

async function validate(awardCode) {
  const errors = [];
  const warnings = [];

  // 1. Award metadata exists
  const meta = await pool.query('SELECT * FROM award_metadata WHERE award_code = $1', [awardCode]);
  if (!meta.rows.length) {
    errors.push('No award_metadata row');
    return { awardCode, errors, warnings };
  }

  // 2. Classifications exist
  const cls = await pool.query('SELECT COUNT(*) AS n FROM classifications WHERE award_code = $1', [awardCode]);
  if (parseInt(cls.rows[0].n) === 0) errors.push('No classifications');

  // 3. Pay rates exist for all employment types
  for (const et of EMP_TYPES) {
    const rates = await pool.query(
      "SELECT COUNT(*) AS n FROM pay_rates WHERE award_code = $1 AND employment_type = $2 AND rate_type = 'base_hourly'",
      [awardCode, et]
    );
    if (parseInt(rates.rows[0].n) === 0) errors.push(`No base_hourly pay rates for ${et}`);
  }

  // 4. Penalty rates exist for all employment types
  for (const et of EMP_TYPES) {
    const pen = await pool.query(
      'SELECT COUNT(*) AS n FROM penalty_rates WHERE award_code = $1 AND employment_type = $2',
      [awardCode, et]
    );
    if (parseInt(pen.rows[0].n) === 0) errors.push(`No penalty rates for ${et}`);
  }

  // 5. CRITICAL: Overtime rates exist for ALL employment types × periods
  for (const et of EMP_TYPES) {
    for (const period of PERIODS) {
      const ot = await pool.query(
        'SELECT COUNT(*) AS n FROM overtime_rates WHERE award_code = $1 AND employment_type = $2 AND period = $3',
        [awardCode, et, period]
      );
      if (parseInt(ot.rows[0].n) === 0) {
        if (awardCode === 'MA000030' && et === 'casual') {
          warnings.push(`No ${period} OT for casual (intentional — pay guide shows no casual OT premium)`);
        } else {
          errors.push(`No ${period} overtime rates for ${et}`);
        }
      }
    }
  }

  // 6. At least 2 overtime rate tiers per employment type × period (first band + second band)
  for (const et of EMP_TYPES) {
    for (const period of PERIODS) {
      const ot = await pool.query(
        'SELECT COUNT(*) AS n FROM overtime_rates WHERE award_code = $1 AND employment_type = $2 AND period = $3',
        [awardCode, et, period]
      );
      const n = parseInt(ot.rows[0].n);
      if (n === 1) warnings.push(`Only 1 OT tier for ${et} ${period} (expected 2: first band + second band)`);
    }
  }

  // 7. Penalty rates cover key day types
  for (const et of EMP_TYPES) {
    for (const dayType of ['weekday', 'saturday', 'sunday', 'public_holiday']) {
      const pen = await pool.query(
        'SELECT COUNT(*) AS n FROM penalty_rates WHERE award_code = $1 AND employment_type = $2 AND day_type = $3',
        [awardCode, et, dayType]
      );
      if (parseInt(pen.rows[0].n) === 0) {
        warnings.push(`No penalty rate for ${et} on ${dayType}`);
      }
    }
  }

  // 8. Break entitlements exist
  const breaks = await pool.query('SELECT COUNT(*) AS n FROM break_entitlements WHERE award_code = $1', [awardCode]);
  if (parseInt(breaks.rows[0].n) === 0) warnings.push('No break entitlements');

  // 9. Allowances exist
  const allow = await pool.query('SELECT COUNT(*) AS n FROM allowances WHERE award_code = $1', [awardCode]);
  if (parseInt(allow.rows[0].n) === 0) warnings.push('No allowances');

  // 10. Classification questions exist
  const questions = await pool.query('SELECT COUNT(*) AS n FROM classification_questions WHERE award_code = $1', [awardCode]);
  if (parseInt(questions.rows[0].n) === 0) warnings.push('No classification questions');

  return { awardCode, errors, warnings };
}

async function main() {
  const targetAward = process.argv[2];

  let awards;
  if (targetAward) {
    awards = [{ award_code: targetAward }];
  } else {
    const r = await pool.query('SELECT award_code FROM award_metadata ORDER BY award_code');
    awards = r.rows;
  }

  console.log('Award Completeness Validator');
  console.log('═'.repeat(60));

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const { award_code } of awards) {
    const { errors, warnings } = await validate(award_code);
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✓ ${award_code} — complete`);
    } else {
      if (errors.length > 0) {
        console.log(`  ✗ ${award_code} — ${errors.length} ERROR(s):`);
        for (const e of errors) console.log(`      ERROR: ${e}`);
      }
      if (warnings.length > 0) {
        if (errors.length === 0) console.log(`  ⚠ ${award_code} — ${warnings.length} warning(s):`);
        for (const w of warnings) console.log(`      WARN:  ${w}`);
      }
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`Total: ${awards.length} awards, ${totalErrors} errors, ${totalWarnings} warnings`);

  await pool.end();
  process.exit(totalErrors > 0 ? 1 : 0);
}

main().catch(e => { console.error('Fatal:', e); pool.end(); process.exit(1); });
