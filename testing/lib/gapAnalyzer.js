/**
 * Gap Analyzer — Stage 0
 *
 * Reads a pay guide spec JSON (extracted from the FWO PDF) and diffs it against
 * the database. Reports:
 *   1. Missing streams (entire employee categories not seeded)
 *   2. Missing classifications (levels/pay points not in DB)
 *   3. Missing rate categories (shift types, penalties, OT variants not modelled)
 *   4. Missing allowances (pay guide amounts with no DB row)
 *   5. Stale effective dates (DB rates older than pay guide effective date)
 *   6. Rate mismatches (DB rate differs from pay guide amount)
 *
 * Usage:
 *   const { analyzeGaps } = require('./gapAnalyzer');
 *   const report = await analyzeGaps(pool, 'MA000100');
 */

const fs = require('fs');
const path = require('path');

function round2(n) { return Math.round(n * 100) / 100; }

async function analyzeGaps(pool, awardCode) {
  const specPath = path.join(__dirname, '..', 'pay_guides', `${awardCode}.spec.json`);

  if (!fs.existsSync(specPath)) {
    return {
      available: false,
      message: `No pay guide spec found at ${specPath}. Add ${awardCode}.spec.json to testing/pay_guides/ to enable Stage 0.`,
      gaps: [],
      summary: { total: 0, missing_streams: 0, missing_classifications: 0, missing_rates: 0, missing_allowances: 0, stale_dates: 0, rate_mismatches: 0 },
    };
  }

  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const gaps = [];
  const summary = {
    total: 0,
    missing_streams: 0,
    missing_classifications: 0,
    missing_rates: 0,
    missing_allowances: 0,
    stale_dates: 0,
    rate_mismatches: 0,
  };

  // ── 1. Check effective date ────────────────────────────────────────────
  const metaRes = await pool.query(
    'SELECT effective_date FROM award_metadata WHERE award_code = $1',
    [awardCode]
  );
  if (metaRes.rows.length) {
    const rawDate = metaRes.rows[0].effective_date;
    // Postgres DATE fields lose timezone info — use local date parts to avoid UTC shift
    let dbDate;
    if (rawDate instanceof Date) {
      dbDate = `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')}`;
    } else {
      dbDate = String(rawDate).split('T')[0];
    }
    const specDate = spec.effective_date;
    if (dbDate < specDate) {
      gaps.push({
        type: 'stale_date',
        severity: 'critical',
        message: `DB effective date (${dbDate}) is older than pay guide (${specDate}). All rates may be outdated. Run: node backend/scripts/seed_${awardCode.toLowerCase()}.js with updated rates, or sync from FWC API.`,
        db_value: dbDate,
        spec_value: specDate,
      });
      summary.stale_dates++;
    }
  }

  // ── 2. Check streams and classifications ───────────────────────────────
  const dbStreams = await pool.query(
    'SELECT DISTINCT stream FROM classifications WHERE award_code = $1',
    [awardCode]
  );
  const dbStreamSet = new Set(dbStreams.rows.map(r => r.stream));

  const dbClassifications = await pool.query(
    'SELECT id, level, stream FROM classifications WHERE award_code = $1 ORDER BY stream, level',
    [awardCode]
  );
  const dbClassMap = new Map();
  for (const row of dbClassifications.rows) {
    const key = `${row.stream}_${row.level}`;
    if (!dbClassMap.has(key)) dbClassMap.set(key, []);
    dbClassMap.get(key).push(row);
  }

  for (const stream of spec.streams) {
    if (!dbStreamSet.has(stream.stream)) {
      gaps.push({
        type: 'missing_stream',
        severity: 'critical',
        message: `Stream "${stream.label}" (${stream.stream}) — ${stream.classifications.length} classifications not in DB`,
        spec_value: stream.stream,
      });
      summary.missing_streams++;
      // Count all classifications in this stream as missing
      summary.missing_classifications += stream.classifications.length;
      continue;
    }

    // Check individual classifications
    for (const cls of stream.classifications) {
      const key = `${stream.stream}_${cls.level}`;
      const dbRows = dbClassMap.get(key);
      if (!dbRows || dbRows.length === 0) {
        gaps.push({
          type: 'missing_classification',
          severity: 'high',
          message: `${stream.label} Level ${cls.level} PP${cls.pay_point} ($${cls.ft_hourly}/hr) — not in DB`,
          spec_value: `L${cls.level} PP${cls.pay_point} stream=${stream.stream}`,
        });
        summary.missing_classifications++;
        continue;
      }

      // Check if pay point granularity exists (DB typically has 1 rate per level, pay guide has multiple)
      if (cls.pay_point > 1) {
        // DB likely only has pay point 1 — this is a known limitation
        // Only flag if this is pay_point 2+ and the DB only has 1 entry for this level
        if (dbRows.length < cls.pay_point) {
          gaps.push({
            type: 'missing_pay_point',
            severity: 'medium',
            message: `${stream.label} Level ${cls.level} pay point ${cls.pay_point} ($${cls.ft_hourly}/hr) — DB only has ${dbRows.length} entry for this level`,
            spec_value: `L${cls.level} PP${cls.pay_point} $${cls.ft_hourly}`,
          });
          summary.missing_classifications++;
        }
      }

      // Check rate accuracy for pay point 1 (the one most likely to be in DB)
      if (cls.pay_point === 1 && dbRows.length > 0) {
        // Find the DB classification matching pay point 1 specifically
        const pp1Row = dbRows.find(r => true); // dbRows filtered by level already; pick the first (lowest pay_point)
        const dbRateRes = await pool.query(
          `SELECT pr.rate_amount FROM pay_rates pr
           JOIN classifications c ON c.id = pr.classification_id
           WHERE pr.award_code = $1 AND c.level = $2 AND c.stream = $3
             AND c.pay_point = 1
             AND pr.employment_type = 'full_time' AND pr.rate_type = 'base_hourly'
           ORDER BY pr.effective_date DESC LIMIT 1`,
          [awardCode, cls.level, stream.stream]
        );
        if (dbRateRes.rows.length) {
          const dbRate = parseFloat(dbRateRes.rows[0].rate_amount);
          const specRate = cls.ft_hourly;
          if (Math.abs(dbRate - specRate) > 0.02) {
            gaps.push({
              type: 'rate_mismatch',
              severity: 'high',
              message: `${stream.label} L${cls.level} FT base rate: DB=$${dbRate}, pay guide=$${specRate} (diff=$${round2(Math.abs(dbRate - specRate))})`,
              db_value: dbRate,
              spec_value: specRate,
            });
            summary.rate_mismatches++;
          }
        }
      }
    }
  }

  // ── 3. Check special shift types against award_features table ────────────
  if (spec.special_shift_types) {
    // Map spec shift type keys to award_features feature_keys
    const specToFeatureKey = {
      twenty_four_hour_care: '24hr_care',
      broken_shift: 'broken_shift',
      remote_work: 'remote_work',
    };

    for (const [shiftType, config] of Object.entries(spec.special_shift_types)) {
      const featureKey = specToFeatureKey[shiftType];
      if (!featureKey) continue;

      // Check if this feature is registered in award_features
      const featureRes = await pool.query(
        `SELECT feature_key, test_params FROM award_features WHERE award_code = $1 AND feature_key = $2`,
        [awardCode, featureKey]
      );

      if (featureRes.rows.length === 0) {
        gaps.push({
          type: 'missing_rate_category',
          severity: 'high',
          message: `${config.description || shiftType} — no award_features entry for '${featureKey}'. Calculator feature not registered.`,
          spec_value: shiftType,
        });
        summary.missing_rates++;
      }
      // If feature IS registered, also check that the underlying data exists
      else if (featureKey === '24hr_care') {
        const res = await pool.query(
          `SELECT COUNT(*) as cnt FROM pay_rates WHERE award_code = $1 AND rate_type = '24hr_care_shift'`,
          [awardCode]
        );
        if (parseInt(res.rows[0].cnt) === 0) {
          gaps.push({
            type: 'missing_rate_category',
            severity: 'high',
            message: `24-hour care feature registered but no 24hr_care_shift rates in pay_rates table`,
            spec_value: shiftType,
          });
          summary.missing_rates++;
        }
      } else if (featureKey === 'remote_work') {
        const res = await pool.query(
          `SELECT COUNT(*) as cnt FROM penalty_rates WHERE award_code = $1 AND shift_type = 'remote'`,
          [awardCode]
        );
        if (parseInt(res.rows[0].cnt) === 0) {
          gaps.push({
            type: 'missing_rate_category',
            severity: 'high',
            message: `Remote work feature registered but no shift_type='remote' penalty rates in DB`,
            spec_value: shiftType,
          });
          summary.missing_rates++;
        }
      }
    }
  }

  // ── 4. Check shift loadings (afternoon/night) ─────────────────────────
  if (spec.shift_loadings) {
    // Check if penalty_rates has afternoon/night time bands
    const timeBandRes = await pool.query(
      `SELECT COUNT(*) as cnt FROM penalty_rates WHERE award_code = $1 AND time_band_start IS NOT NULL`,
      [awardCode]
    );
    if (parseInt(timeBandRes.rows[0].cnt) === 0) {
      gaps.push({
        type: 'missing_rate_category',
        severity: 'high',
        message: `Afternoon/night shift loadings — specific $/hr rates in pay guide but no time-band penalties in DB`,
        spec_value: 'shift_loadings',
      });
      summary.missing_rates++;
    }
  }

  // ── 5. Check OT variants ──────────────────────────────────────────────
  if (spec.overtime) {
    // Check if DB distinguishes FT 3hr first band vs disability/PT 2hr first band
    if (spec.overtime.social_community_full_time?.mon_sat_first_hours?.hours === 3) {
      // Check if stream-specific OT rules exist
      const streamOTRes = await pool.query(
        `SELECT COUNT(*) as cnt FROM overtime_rates WHERE award_code = $1 AND stream IS NOT NULL`,
        [awardCode]
      );
      if (parseInt(streamOTRes.rows[0].cnt) === 0) {
        gaps.push({
          type: 'missing_rate_category',
          severity: 'high',
          message: `OT first band: SACS full-time = 3 hours at ×1.5, but disability/PT = 2 hours at ×1.5 — DB has no stream-specific OT rules`,
          spec_value: 'ot_band_distinction',
        });
        summary.missing_rates++;
      }
    }

    if (spec.overtime.less_than_10hr_break) {
      const featureRes = await pool.query(
        `SELECT feature_key FROM award_features WHERE award_code = $1 AND feature_key = '10hr_break_rule'`,
        [awardCode]
      );
      if (featureRes.rows.length === 0) {
        gaps.push({
          type: 'missing_rate_category',
          severity: 'high',
          message: `Less than 10hr break after OT — no award_features entry for '10hr_break_rule'. Calculator feature not registered.`,
          spec_value: 'less_than_10hr_break',
        });
        summary.missing_rates++;
      }
    }
  }

  // ── 6. Check allowances ───────────────────────────────────────────────
  if (spec.allowances) {
    const dbAllowances = await pool.query(
      'SELECT allowance_type, name, amount FROM allowances WHERE award_code = $1',
      [awardCode]
    );
    const dbAlMap = new Map();
    for (const row of dbAllowances.rows) {
      dbAlMap.set(row.allowance_type, { name: row.name, amount: row.amount ? parseFloat(row.amount) : null });
    }

    for (const al of spec.allowances) {
      // Try to find a matching DB allowance by amount
      let found = false;
      for (const [type, dbAl] of dbAlMap) {
        if (dbAl.amount && Math.abs(dbAl.amount - al.amount) <= 0.02) {
          found = true;
          break;
        }
      }
      if (!found) {
        gaps.push({
          type: 'missing_allowance',
          severity: al.amount >= 10 ? 'high' : 'medium',
          message: `Allowance: "${al.name}" — $${al.amount} ${al.per_unit} — not in DB`,
          spec_value: `$${al.amount}`,
        });
        summary.missing_allowances++;
      }
    }
  }

  summary.total = gaps.length;

  return {
    available: true,
    award_code: awardCode,
    spec_effective_date: spec.effective_date,
    gaps,
    summary,
  };
}

/**
 * Print a formatted gap report to console.
 */
function printGapReport(report) {
  if (!report.available) {
    console.log(`  ⊘ ${report.message}`);
    return;
  }

  const s = report.summary;
  console.log(`\n  Pay guide: ${report.award_code} (effective ${report.spec_effective_date})`);
  console.log(`  Total gaps found: ${s.total}`);

  if (s.total === 0) {
    console.log('  ✓ DB fully covers the pay guide — no gaps detected');
    return;
  }

  // Group by severity
  const critical = report.gaps.filter(g => g.severity === 'critical');
  const high = report.gaps.filter(g => g.severity === 'high');
  const medium = report.gaps.filter(g => g.severity === 'medium');

  if (critical.length) {
    console.log(`\n  CRITICAL (${critical.length}):`);
    for (const g of critical) console.log(`    ✗ [${g.type}] ${g.message}`);
  }
  if (high.length) {
    console.log(`\n  HIGH (${high.length}):`);
    for (const g of high) console.log(`    ✗ [${g.type}] ${g.message}`);
  }
  if (medium.length) {
    console.log(`\n  MEDIUM (${medium.length}):`);
    for (const g of medium) console.log(`    ~ [${g.type}] ${g.message}`);
  }

  console.log(`\n  Summary: ${s.missing_streams} missing streams, ${s.missing_classifications} missing classifications, ${s.missing_rates} missing rate categories, ${s.missing_allowances} missing allowances, ${s.stale_dates} stale dates, ${s.rate_mismatches} rate mismatches`);
}

module.exports = { analyzeGaps, printGapReport };
