/**
 * Shared test framework for WageCheck award testing.
 * Usage:
 *   const { createTestRunner } = require('./lib/testFramework');
 *   const t = createTestRunner('MA000009', __dirname + '/MyTests.xlsx');
 *   await t.init();
 *   // ... run tests using t.calcShift, t.record, etc.
 *   t.printSummary();
 *   t.generateExcel();  // auto-creates Excel with results
 *   await t.cleanup();
 */
const path = require('path');
const backendDir = path.join(__dirname, '..', '..', 'backend');
module.paths.unshift(path.join(backendDir, 'node_modules'));
process.chdir(backendDir);
require('dotenv').config({ path: path.join(backendDir, '.env') });

// Use a small pool to avoid exhausting hosted DB session limits when running all awards
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 3,           // only 3 connections (default pg is 10, hosted DBs cap at ~20-60 sessions)
  idleTimeoutMillis: 1000,  // release idle connections quickly between awards
});
const { calculateEntitlements } = require(path.join(backendDir, 'src', 'services', 'awardCalculator'));
const XLSX = require('xlsx');

// Reference dates — a week in July 2025 after rates take effect
const REF_MONDAY    = '2025-07-07';
const REF_TUESDAY   = '2025-07-08';
const REF_WEDNESDAY = '2025-07-09';
const REF_THURSDAY  = '2025-07-10';
const REF_FRIDAY    = '2025-07-11';
const REF_SATURDAY  = '2025-07-12';
const REF_SUNDAY    = '2025-07-13';
const REF_PH        = '2025-12-25';

const TOLERANCE = 0.04;  // max $0.01/hr on a 4hr shift

function round2(n) { return Math.round(n * 100) / 100; }

function comparePay(actual, expected, tolerance = TOLERANCE) {
  if (typeof actual !== 'number' || isNaN(actual)) return 'FAIL';
  const diff = Math.abs(actual - expected);
  if (diff <= 0.005) return 'PASS';
  if (diff <= tolerance) return 'PARTIAL';
  return 'FAIL';
}

function payOnly(r) { return round2(r.summary.totalPayOwed - r.summary.mealAllowancePay); }

function createTestRunner(awardCode, xlsxPath) {
  const results = [];
  let classMap = {};
  const labelContradictions = [];

  function checkLabelsForResult(r) {
    for (const shift of r.shifts || []) {
      for (const seg of shift.segments || []) {
        const label = (seg.rateLabel || '').toLowerCase();
        const dt = seg.dayType;
        if (!label || !dt || seg.missedBreakPenalty || dt === 'overtime') continue;
        let issue = null;
        if (dt === 'saturday' && (label.includes('sunday') || label.includes('public holiday'))) issue = 'Sat→Sun/PH';
        else if (dt === 'sunday' && (label.includes('saturday') || label.includes('public holiday'))) issue = 'Sun→Sat/PH';
        else if (dt === 'public_holiday' && (label.includes('saturday') || label.includes('sunday'))) issue = 'PH→Sat/Sun';
        else if (dt === 'weekday' && (label.includes('saturday') || label.includes('sunday') || label.includes('public holiday'))) issue = 'Wkdy→Sat/Sun/PH';
        if (issue) labelContradictions.push(`${shift.date} (${dt}): "${seg.rateLabel}" [${issue}]`);
      }
    }
  }

  function record(testId, expected, actual, notes = '') {
    const result = comparePay(actual, expected);
    results.push({ testId, expected, actual: round2(actual), result, notes });
    const icon = result === 'PASS' ? '✓' : result === 'PARTIAL' ? '~' : '✗';
    console.log(`  ${icon} ${testId}: expected $${expected.toFixed(2)}, got $${round2(actual).toFixed(2)} [${result}]${notes ? ' — ' + notes : ''}`);
  }

  function recordText(testId, expected, actual, result, notes = '') {
    results.push({ testId, expected: String(expected), actual: String(actual), result, notes });
    const icon = result === 'PASS' ? '✓' : result === 'PARTIAL' ? '~' : '✗';
    console.log(`  ${icon} ${testId}: ${result}${notes ? ' — ' + notes : ''}`);
  }

  function skip(testId, reason) {
    results.push({ testId, expected: 'N/A', actual: 'SKIPPED', result: 'SKIP', notes: reason });
    console.log(`  ⊘ ${testId}: SKIPPED — ${reason}`);
  }

  // Sanity check: the rate label for each segment should not contradict its dayType.
  // e.g. a Saturday segment should never be labelled "Sunday penalty" or "Public holiday".
  // Catches mislabelling bugs where the label switch ignores dayType.
  function assertLabelsMatchDayType(testId, result) {
    const contradictions = [];
    for (const shift of result.shifts || []) {
      for (const seg of shift.segments || []) {
        const label = (seg.rateLabel || '').toLowerCase();
        const dt = seg.dayType;
        if (!label || !dt || seg.missedBreakPenalty) continue;
        if (dt === 'saturday' && (label.includes('sunday') || label.includes('public holiday'))) {
          contradictions.push(`${shift.date} (${dt}): "${seg.rateLabel}"`);
        } else if (dt === 'sunday' && (label.includes('saturday') || label.includes('public holiday'))) {
          contradictions.push(`${shift.date} (${dt}): "${seg.rateLabel}"`);
        } else if (dt === 'public_holiday' && (label.includes('saturday') || label.includes('sunday'))) {
          contradictions.push(`${shift.date} (${dt}): "${seg.rateLabel}"`);
        } else if (dt === 'weekday' && (label.includes('saturday') || label.includes('sunday') || label.includes('public holiday'))) {
          contradictions.push(`${shift.date} (${dt}): "${seg.rateLabel}"`);
        }
      }
    }
    if (contradictions.length === 0) {
      recordText(testId, 'no label/dayType contradictions', 'clean', 'PASS');
    } else {
      recordText(testId, 'no contradictions', `${contradictions.length} mislabelled`, 'FAIL', contradictions.join('; '));
    }
  }

  async function init() {
    const res = await pool.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [awardCode]
    );
    classMap = {};
    for (const r of res.rows) {
      classMap[`${r.level}_${r.stream}`] = r.id;
    }
  }

  function classId(level, stream = 'general') {
    const id = classMap[`${level}_${stream}`];
    if (!id) throw new Error(`No classification for level=${level} stream=${stream} in ${awardCode}`);
    return id;
  }

  async function calcShift(empType, clsId, date, start, end, opts = {}) {
    const shift = {
      date, startTime: start, endTime: end,
      mealBreakTaken: opts.mealBreakTaken ?? true,
      mealBreakDuration: opts.mealBreakDuration ?? (opts.mealBreakTaken === false ? 0 : 30),
      restBreakTaken: opts.restBreakTaken ?? true,
    };
    const r = await calculateEntitlements({
      employmentType: empType, classificationId: clsId,
      shifts: [shift],
      publicHolidays: opts.publicHolidays || [],
      age: opts.age || null,
      period: opts.period || 'weekly',
      awardCode,
    }, pool);
    checkLabelsForResult(r);
    return r;
  }

  async function calcMultiShift(empType, clsId, shifts, opts = {}) {
    const formatted = shifts.map(s => ({
      date: s.date, startTime: s.startTime, endTime: s.endTime,
      mealBreakTaken: s.mealBreakTaken ?? true,
      mealBreakDuration: s.mealBreakDuration ?? (s.mealBreakTaken === false ? 0 : 30),
      restBreakTaken: s.restBreakTaken ?? true,
    }));
    const r = await calculateEntitlements({
      employmentType: empType, classificationId: clsId,
      shifts: formatted,
      publicHolidays: opts.publicHolidays || [],
      age: opts.age || null,
      period: opts.period || 'weekly',
      awardCode,
    }, pool);
    checkLabelsForResult(r);
    return r;
  }

  function finalizeLabelCheck() {
    if (labelContradictions.length === 0) {
      recordText('LB-001', 'no label/dayType contradictions', 'clean', 'PASS', 'rate labels consistent with dayType across all shifts');
    } else {
      const unique = Array.from(new Set(labelContradictions));
      recordText('LB-001', 'no contradictions', `${unique.length} mislabelled segment(s)`, 'FAIL', unique.slice(0, 10).join(' | '));
    }
  }

  function printSummary() {
    finalizeLabelCheck();
    console.log('\n' + '═'.repeat(60));
    const pass = results.filter(r => r.result === 'PASS').length;
    const partial = results.filter(r => r.result === 'PARTIAL').length;
    const fail = results.filter(r => r.result === 'FAIL').length;
    const skipped = results.filter(r => r.result === 'SKIP').length;
    console.log(`\nRESULTS: ${pass} PASS, ${partial} PARTIAL, ${fail} FAIL, ${skipped} SKIPPED (${results.length} total)`);
    if (fail > 0) {
      console.log('\nFAILURES:');
      for (const r of results.filter(r => r.result === 'FAIL')) {
        console.log(`  ✗ ${r.testId}: expected ${r.expected}, got ${r.actual}${r.notes ? ' — ' + r.notes : ''}`);
      }
    }
  }

  function generateExcel() {
    const wb = XLSX.utils.book_new();
    // Group results by section (prefix before the dash, e.g. BR, CL, PR)
    const sections = new Map();
    for (const r of results) {
      const prefix = r.testId.replace(/-.*/, '');
      // Map prefixes to sheet names
      let sheet = prefix;
      if (['BR', 'CL', 'JR', 'AP'].includes(prefix)) sheet = 'Base Rates';
      else if (['PR', 'PC', 'OS', 'RD'].includes(prefix)) sheet = 'Penalty Rates';
      else if (['OT', 'DO', 'WO'].includes(prefix)) sheet = 'Overtime';
      else if (['RB', 'MB'].includes(prefix)) sheet = 'Breaks';
      else if (['AL', 'AI'].includes(prefix)) sheet = 'Allowances';
      else if (['ME'].includes(prefix)) sheet = 'Min Engagement';
      else if (['CS'].includes(prefix)) sheet = 'Complex Scenarios';
      else if (['RT'].includes(prefix)) sheet = 'Regression';
      else if (['SU'].includes(prefix)) sheet = 'Superannuation';
      else if (['CAS'].includes(prefix)) sheet = 'Casino';
      else if (['CJ'].includes(prefix)) sheet = 'Casual Junior';
      else if (['FN'].includes(prefix)) sheet = 'Fortnightly';
      else if (['DW'].includes(prefix)) sheet = 'Daily Weekly OT';
      else if (['MA'].includes(prefix)) sheet = 'Meal Allowance';
      if (!sections.has(sheet)) sections.set(sheet, []);
      sections.get(sheet).push(r);
    }
    for (const [sheetName, rows] of sections) {
      const data = [['Test ID', 'Expected', 'Actual Output', 'Result', 'Notes']];
      for (const r of rows) {
        data.push([r.testId, String(r.expected), String(r.actual), r.result, r.notes]);
      }
      const ws = XLSX.utils.aoa_to_sheet(data);
      // Set column widths
      ws['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 60 }];
      XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31));
    }
    XLSX.writeFile(wb, xlsxPath);
    console.log(`\n✓ Results written to ${xlsxPath}`);
  }

  // Also support updating an existing Excel (for HIGA compatibility)
  function updateExistingExcel() {
    try {
      const wb = XLSX.readFile(xlsxPath);
      const resultMap = {};
      for (const r of results) resultMap[r.testId] = r;
      for (const sheetName of wb.SheetNames) {
        const ws = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        for (let row = 0; row < data.length; row++) {
          const testId = String(data[row][0] || '').trim();
          const r = resultMap[testId];
          if (!r) continue;
          let headerRow = -1;
          for (let h = Math.max(0, row - 10); h < row; h++) {
            const cells = data[h] || [];
            for (let c = 0; c < cells.length; c++) {
              if (String(cells[c]).toLowerCase().includes('actual')) { headerRow = h; break; }
            }
            if (headerRow >= 0) break;
          }
          if (headerRow >= 0) {
            const headers = data[headerRow];
            let actualCol = -1, resultCol = -1;
            for (let c = 0; c < headers.length; c++) {
              const h = String(headers[c]).toLowerCase();
              if (h.includes('actual')) actualCol = c;
              if (h === 'result' || h.includes('result')) resultCol = c;
            }
            if (actualCol >= 0) ws[XLSX.utils.encode_cell({ r: row, c: actualCol })] = { t: 's', v: String(r.actual) + (r.notes ? ` (${r.notes})` : '') };
            if (resultCol >= 0) ws[XLSX.utils.encode_cell({ r: row, c: resultCol })] = { t: 's', v: r.result };
          }
        }
      }
      XLSX.writeFile(wb, xlsxPath);
      console.log(`\n✓ Results written to ${xlsxPath}`);
    } catch (e) {
      console.log('No existing Excel found, generating new one...');
      generateExcel();
    }
  }

  async function cleanup() {
    // Drain idle connections but keep pool alive for next award in 'all' mode.
    // pool._clients tracks checked-out clients; wait for them to return.
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return {
    // State
    results, pool, awardCode,
    // Classification
    init, classId,
    // Calculation helpers
    calcShift, calcMultiShift,
    // Result recording
    record, recordText, skip, assertLabelsMatchDayType,
    // Utilities
    round2, comparePay, payOnly,
    // Constants
    REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
    REF_SATURDAY, REF_SUNDAY, REF_PH, TOLERANCE,
    // Output
    printSummary, generateExcel, updateExistingExcel, cleanup,
  };
}

module.exports = { createTestRunner };
