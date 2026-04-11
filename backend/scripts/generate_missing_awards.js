/**
 * Generator script — fetches data from the FWC MAPD API and creates seed files
 * for the 25 missing industry awards.
 *
 * Usage: node scripts/generate_missing_awards.js
 */
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.FWC_API_KEY;
const BASE = 'https://api.fwc.gov.au/api/v1/awards';
const EFFECTIVE_DATE = '2025-07-01';

const MISSING_AWARDS = [
  { code: 'MA000049', name: 'Airport Employees Award 2020' },
  { code: 'MA000052', name: 'Ports, Harbours and Enclosed Water Vessels Award 2020' },
  { code: 'MA000053', name: 'Stevedoring Industry Award 2020' },
  { code: 'MA000055', name: 'Cement, Lime and Quarrying Award 2020' },
  { code: 'MA000056', name: 'Concrete Products Award 2020' },
  { code: 'MA000057', name: 'Premixed Concrete Award 2020' },
  { code: 'MA000068', name: 'Seafood Processing Award 2020' },
  { code: 'MA000069', name: 'Pharmaceutical Industry Award 2020' },
  { code: 'MA000071', name: 'Timber Industry Award 2020' },
  { code: 'MA000072', name: 'Oil Refining and Manufacturing Award 2020' },
  { code: 'MA000085', name: 'Dredging Industry Award 2020' },
  { code: 'MA000086', name: 'Maritime Offshore Oil and Gas Award 2020' },
  { code: 'MA000087', name: 'Sugar Industry Award 2020' },
  { code: 'MA000088', name: 'Electrical Power Industry Award 2020' },
  { code: 'MA000093', name: 'Marine Tourism and Charter Vessels Award 2020' },
  { code: 'MA000097', name: 'Pest Control Industry Award 2020' },
  { code: 'MA000107', name: 'Salt Industry Award 2020' },
  { code: 'MA000108', name: 'Professional Diving Industry (Industrial) Award 2020' },
  { code: 'MA000109', name: 'Professional Diving Industry (Recreational) Award 2020' },
  { code: 'MA000110', name: 'Corrections and Detention (Private Sector) Award 2020' },
  { code: 'MA000111', name: 'Fire Fighting Industry Award 2020' },
  { code: 'MA000114', name: 'Aquaculture Industry Award 2020' },
  { code: 'MA000115', name: 'Aboriginal and Torres Strait Islander Health Workers and Practitioners Award 2020' },
  { code: 'MA000117', name: 'Mannequins and Models Award 2020' },
  { code: 'MA000122', name: 'Seagoing Industry Award 2020' },
];

// ── HTTP helper ──────────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          reject(new Error(`JSON parse error for ${url}: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function fetchAllPages(url, maxPages = 20) {
  const results = [];
  let page = 1;
  while (page <= maxPages) {
    const sep = url.includes('?') ? '&' : '?';
    const resp = await fetchJSON(`${url}${sep}limit=100&page=${page}`);
    if (!resp.data || !resp.data.results) {
      // API error (403, rate limit, etc) — return what we have
      if (page === 1) console.log(`    API error on ${url}: ${JSON.stringify(resp.data).substring(0, 100)}`);
      break;
    }
    results.push(...resp.data.results);
    if (!resp.data._meta || !resp.data._meta.has_more_results) break;
    page++;
    // Small delay between pages
    await new Promise(r => setTimeout(r, 200));
  }
  return results;
}

// ── Penalty mapping ─────────────────────────────────────────────────────────
function mapPenaltyDescription(desc) {
  const d = (desc || '').toLowerCase();
  if (d.includes('public holiday')) return 'public_holiday';
  if (d.includes('sunday')) return 'sunday';
  if (d.includes('saturday')) return 'saturday';
  // "Day", "Day shift", "Day work" etc = weekday
  if (d === 'day' || d === 'day shift' || d === 'day work' || d.startsWith('monday') || d.includes('weekday')) return 'weekday';
  return null; // skip overtime, afternoon shift, night shift etc. (handled separately)
}

function mapEmploymentType(clauseDesc) {
  const d = (clauseDesc || '').toLowerCase();
  if (d.includes('casual')) return 'casual';
  if (d.includes('full-time and part-time') || d.includes('full time and part time')) return 'ft_pt';
  if (d.includes('full-time') || d.includes('full time')) return 'full_time';
  if (d.includes('part-time') || d.includes('part time')) return 'part_time';
  return 'ft_pt'; // default
}

// ── Slugify stream name ──────────────────────────────────────────────────────
function slugify(str) {
  return (str || 'general')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50) || 'general';
}

// ── Fetch and process one award ──────────────────────────────────────────────
async function fetchAwardData(code) {
  console.log(`  Fetching ${code}...`);

  // Fetch data sequentially to avoid rate limiting
  const clsAll = await fetchAllPages(`${BASE}/${code}/classifications`);
  await new Promise(r => setTimeout(r, 300));
  const ratesAll = await fetchAllPages(`${BASE}/${code}/pay-rates`);
  await new Promise(r => setTimeout(r, 300));
  const penAll = await fetchAllPages(`${BASE}/${code}/penalties`, 5);
  await new Promise(r => setTimeout(r, 300));
  const expAll = await fetchAllPages(`${BASE}/${code}/expense-allowances`, 3);
  await new Promise(r => setTimeout(r, 300));
  const wageAll = await fetchAllPages(`${BASE}/${code}/wage-allowances`, 3);

  // ── Classifications: current year, unique by classification_fixed_id ──
  const seenCls = new Set();
  const classifications = [];
  for (const c of clsAll) {
    if (c.operative_to !== null) continue; // only current
    if (seenCls.has(c.classification_fixed_id)) continue;
    // Skip NTW / trainee / apprentice classifications
    const desc = (c.clause_description || '').toLowerCase();
    const name = (c.classification || '').toLowerCase();
    if (desc.includes('national training') || desc.includes('trainee') || desc.includes('apprentice')) continue;
    if (name.includes('national training') || name.includes('trainee') || name.includes('apprentice')) continue;
    seenCls.add(c.classification_fixed_id);
    classifications.push(c);
  }

  // Sort by classification_level, then by classification name
  classifications.sort((a, b) => {
    const la = a.classification_level || 999;
    const lb = b.classification_level || 999;
    if (la !== lb) return la - lb;
    return (a.classification || '').localeCompare(b.classification || '');
  });

  // ── Pay rates: current year, adult only ──
  const adultRates = ratesAll.filter(r =>
    r.employee_rate_type_code === 'AD' &&
    r.operative_to === null &&
    r.calculated_rate != null
  );

  // Build rate map: classification_fixed_id -> hourly rate
  const rateMap = {};
  for (const r of adultRates) {
    if (r.calculated_rate_type === 'Hourly') {
      rateMap[r.classification_fixed_id] = r.calculated_rate;
    } else if (r.calculated_rate_type === 'Weekly' && !rateMap[r.classification_fixed_id]) {
      // Convert weekly to hourly (38hr week)
      rateMap[r.classification_fixed_id] = Math.round((r.calculated_rate / 38) * 100) / 100;
    }
  }

  // ── Penalties: current year, adult, map to day types ──
  const penCurrent = penAll.filter(p =>
    p.operative_to === null &&
    (p.employee_rate_type_code === 'AD' || p.employee_rate_type_code === null)
  );

  // Deduplicate penalties by clause_description + penalty_description
  // Extract unique penalty rules (we want multipliers, not per-classification values)
  const penaltyMap = new Map();
  for (const p of penCurrent) {
    const dayType = mapPenaltyDescription(p.penalty_description);
    if (!dayType) continue; // skip overtime/shift penalties
    const empType = mapEmploymentType(p.clause_description);
    const key = `${empType}|${dayType}`;
    if (!penaltyMap.has(key)) {
      penaltyMap.set(key, {
        empType,
        dayType,
        multiplier: p.rate / 100,
        description: p.penalty_description,
        clauseDesc: p.clause_description,
      });
    }
  }

  // ── Allowances: merge expense + wage, current only ──
  const allowances = [];
  const seenAllowances = new Set();

  for (const a of expAll) {
    if (a.operative_to !== null) continue;
    const key = a.allowance;
    if (seenAllowances.has(key)) continue;
    seenAllowances.add(key);
    allowances.push({
      name: a.allowance,
      amount: a.allowance_amount,
      frequency: a.payment_frequency || 'per_shift',
      is_all_purpose: a.is_all_purpose || false,
      type: guessAllowanceType(a.allowance),
    });
  }

  for (const a of wageAll) {
    if (a.operative_to !== null) continue;
    const key = a.allowance;
    if (seenAllowances.has(key)) continue;
    seenAllowances.add(key);
    allowances.push({
      name: a.allowance,
      amount: a.allowance_amount,
      frequency: a.payment_frequency || 'per week',
      is_all_purpose: a.is_all_purpose || false,
      type: guessAllowanceType(a.allowance),
    });
  }

  return { classifications, rateMap, penaltyMap, allowances };
}

function guessAllowanceType(name) {
  const n = name.toLowerCase();
  if (n.includes('meal')) return 'meal';
  if (n.includes('first aid')) return 'first_aid';
  if (n.includes('vehicle') || n.includes('motor') || n.includes('car')) return 'vehicle_car';
  if (n.includes('tool')) return 'tool';
  if (n.includes('uniform') || n.includes('clothing') || n.includes('laundry')) return 'uniform';
  if (n.includes('leading hand') || n.includes('supervisor')) return 'leading_hand';
  if (n.includes('travel')) return 'travel';
  if (n.includes('height') || n.includes('dirty') || n.includes('confined')) return 'disability';
  // Use slugified name as type
  return slugify(name).substring(0, 40);
}

function mapFrequency(freq) {
  const f = (freq || '').toLowerCase();
  if (f.includes('hour')) return { amount_type: 'fixed', per_unit: 'per_hour' };
  if (f.includes('day') || f.includes('shift')) return { amount_type: 'fixed', per_unit: 'per_shift' };
  if (f.includes('week')) return { amount_type: 'weekly', per_unit: 'per_week' };
  if (f.includes('meal')) return { amount_type: 'fixed', per_unit: 'per_shift' };
  if (f.includes('km') || f.includes('kilomet')) return { amount_type: 'per_km', per_unit: 'per_km' };
  if (f.includes('night')) return { amount_type: 'fixed', per_unit: 'per_shift' };
  if (f.includes('wash') || f.includes('garment')) return { amount_type: 'fixed', per_unit: 'per_wash' };
  return { amount_type: 'fixed', per_unit: 'per_shift' };
}

// ── Generate seed file content ──────────────────────────────────────────────
function generateSeedFile(award, data) {
  const { code, name } = award;
  const { classifications, rateMap, penaltyMap, allowances } = data;

  // Determine streams from clause_description groupings
  const streamMap = new Map();
  for (const c of classifications) {
    const streamName = c.clause_description || 'General';
    if (!streamMap.has(streamName)) {
      streamMap.set(streamName, slugify(streamName));
    }
  }
  const usesSingleStream = streamMap.size <= 1;
  const defaultStream = usesSingleStream ? 'general' : null;

  // Build classification objects
  const clsObjs = classifications.map((c, i) => {
    const stream = defaultStream || slugify(c.clause_description || 'general');
    const level = c.classification_level || (i + 1);
    return {
      level,
      stream,
      title: c.classification,
      fixedId: c.classification_fixed_id,
      sort_order: (i + 1) * 10,
    };
  });

  // Build penalty rate entries
  const penaltyEntries = [];
  const empTypes = ['full_time', 'part_time', 'casual'];

  // Find penalties from API data
  for (const [, pen] of penaltyMap) {
    if (pen.empType === 'ft_pt') {
      // Expand to full_time and part_time
      for (const et of ['full_time', 'part_time']) {
        penaltyEntries.push({
          employment_type: et,
          day_type: pen.dayType,
          multiplier: pen.multiplier,
          description: `${pen.description} — ${et === 'full_time' ? 'Full-time' : 'Part-time'} ×${pen.multiplier}`,
        });
      }
    } else {
      penaltyEntries.push({
        employment_type: pen.empType,
        day_type: pen.dayType,
        multiplier: pen.multiplier,
        description: `${pen.description} — ${pen.empType === 'casual' ? 'Casual' : pen.empType} ×${pen.multiplier}`,
      });
    }
  }

  // Ensure we have all day_type entries for all emp types; fill defaults if missing
  for (const et of empTypes) {
    for (const dt of ['weekday', 'saturday', 'sunday', 'public_holiday']) {
      const existing = penaltyEntries.find(p => p.employment_type === et && p.day_type === dt);
      if (!existing) {
        // Default multipliers
        const defaults = {
          full_time: { weekday: 1.0, saturday: 1.5, sunday: 2.0, public_holiday: 2.5 },
          part_time: { weekday: 1.0, saturday: 1.5, sunday: 2.0, public_holiday: 2.5 },
          casual: { weekday: 1.0, saturday: 1.5, sunday: 2.0, public_holiday: 2.5 },
        };
        penaltyEntries.push({
          employment_type: et,
          day_type: dt,
          multiplier: defaults[et][dt],
          description: `${dt === 'weekday' ? 'Ordinary weekday' : dt.charAt(0).toUpperCase() + dt.slice(1).replace('_', ' ')} — ×${defaults[et][dt]}`,
        });
      }
    }
  }

  // Sort penalties: FT weekday, sat, sun, PH, then PT, then casual
  const empOrder = { full_time: 0, part_time: 1, casual: 2 };
  const dayOrder = { weekday: 0, saturday: 1, sunday: 2, public_holiday: 3 };
  penaltyEntries.sort((a, b) => {
    const eo = (empOrder[a.employment_type] || 0) - (empOrder[b.employment_type] || 0);
    if (eo !== 0) return eo;
    return (dayOrder[a.day_type] || 0) - (dayOrder[b.day_type] || 0);
  });

  // Build allowance entries (limit to most relevant ones, max 6)
  const allowanceEntries = allowances.slice(0, 6).map(a => {
    const freq = mapFrequency(a.frequency);
    return {
      allowance_type: a.type,
      name: a.name,
      amount: a.amount,
      ...freq,
      is_all_purpose: a.is_all_purpose,
    };
  });

  // ── Generate the file content ──────────────────────────────────────────────
  let out = '';
  out += `/**\n`;
  out += ` * Seed script — ${name} [${code}]\n`;
  out += ` * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)\n`;
  out += ` * Rates sourced from FWC MAPD API.\n`;
  out += ` *\n`;
  out += ` * Run after migrate.js: node scripts/seed_${code.toLowerCase()}.js\n`;
  out += ` */\n`;
  out += `require('dotenv').config();\n`;
  out += `const pool = require('../src/db/pool');\n\n`;
  out += `const AWARD_CODE = '${code}';\n`;
  out += `const EFFECTIVE_DATE = '${EFFECTIVE_DATE}';\n\n`;
  out += `async function seed() {\n`;
  out += `  const client = await pool.connect();\n`;
  out += `  try {\n`;
  out += `    await client.query('BEGIN');\n\n`;

  // Metadata
  out += `    // ── Award metadata ────────────────────────────────────────────────────────\n`;
  out += `    await client.query(\`\n`;
  out += `      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)\n`;
  out += `      VALUES ($1, $2, $3, $4)\n`;
  out += `      ON CONFLICT (award_code) DO UPDATE SET\n`;
  out += `        award_name = EXCLUDED.award_name,\n`;
  out += `        effective_date = EXCLUDED.effective_date,\n`;
  out += `        updated_at = NOW()\n`;
  out += `    \`, [\n`;
  out += `      AWARD_CODE,\n`;
  out += `      '${name.replace(/'/g, "\\'")}',\n`;
  out += `      EFFECTIVE_DATE,\n`;
  out += `      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/${code.toLowerCase()}-summary',\n`;
  out += `    ]);\n\n`;

  // Classifications
  out += `    // ── Classifications ───────────────────────────────────────────────────────\n`;
  out += `    const classifications = [\n`;
  for (const c of clsObjs) {
    out += `      {\n`;
    out += `        level: ${c.level}, stream: '${c.stream}',\n`;
    out += `        title: '${c.title.replace(/'/g, "\\'")}',\n`;
    out += `        description: '${c.title.replace(/'/g, "\\'")}',\n`;
    out += `        duties: [],\n`;
    out += `        indicative_tasks: [],\n`;
    out += `        sort_order: ${c.sort_order},\n`;
    out += `      },\n`;
  }
  out += `    ];\n\n`;

  // Insert classifications loop
  out += `    for (const c of classifications) {\n`;
  out += `      await client.query(\`\n`;
  out += `        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order)\n`;
  out += `        VALUES ($1, $2, $3, 1, $4, $5, $6, $7, $8)\n`;
  out += `        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET\n`;
  out += `          title = EXCLUDED.title,\n`;
  out += `          description = EXCLUDED.description,\n`;
  out += `          duties = EXCLUDED.duties,\n`;
  out += `          indicative_tasks = EXCLUDED.indicative_tasks,\n`;
  out += `          sort_order = EXCLUDED.sort_order\n`;
  out += `      \`, [\n`;
  out += `        AWARD_CODE, c.level, c.stream, c.title, c.description,\n`;
  out += `        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order,\n`;
  out += `      ]);\n`;
  out += `    }\n`;
  out += `    console.log(\`✓ Inserted \${classifications.length} classifications\`);\n\n`;

  // Pay rates
  out += `    // ── Pay rates ─────────────────────────────────────────────────────────────\n`;
  out += `    const baseRates = {\n`;
  for (const c of clsObjs) {
    const rate = rateMap[c.fixedId];
    if (rate) {
      out += `      '${c.level}_${c.stream}': ${rate},\n`;
    }
  }
  out += `    };\n\n`;

  out += `    const classResult = await client.query(\n`;
  out += `      'SELECT id, level, stream FROM classifications WHERE award_code = $1',\n`;
  out += `      [AWARD_CODE]\n`;
  out += `    );\n\n`;

  out += `    for (const cls of classResult.rows) {\n`;
  out += `      const baseRate = baseRates[\`\${cls.level}_\${cls.stream}\`];\n`;
  out += `      if (!baseRate) continue;\n\n`;
  out += `      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;\n\n`;

  out += `      for (const empType of ['full_time', 'part_time']) {\n`;
  out += `        await client.query(\`\n`;
  out += `          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)\n`;
  out += `          VALUES ($1, $2, $3, 'base_hourly', $4, $5)\n`;
  out += `          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)\n`;
  out += `          DO UPDATE SET rate_amount = EXCLUDED.rate_amount\n`;
  out += `        \`, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);\n`;
  out += `      }\n\n`;

  out += `      await client.query(\`\n`;
  out += `        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)\n`;
  out += `        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)\n`;
  out += `        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)\n`;
  out += `        DO UPDATE SET rate_amount = EXCLUDED.rate_amount\n`;
  out += `      \`, [AWARD_CODE, cls.id, casualRate, EFFECTIVE_DATE]);\n\n`;

  out += `      await client.query(\`\n`;
  out += `        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)\n`;
  out += `        VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)\n`;
  out += `        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)\n`;
  out += `        DO UPDATE SET rate_amount = EXCLUDED.rate_amount\n`;
  out += `      \`, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);\n`;
  out += `    }\n`;
  out += `    console.log('✓ Inserted pay rates');\n\n`;

  // Penalty rates
  out += `    // ── Penalty rates ─────────────────────────────────────────────────────────\n`;
  out += `    const penaltyRates = [\n`;
  for (const p of penaltyEntries) {
    out += `      {\n`;
    out += `        employment_type: '${p.employment_type}', day_type: '${p.day_type}',\n`;
    out += `        time_band_start: null, time_band_end: null, time_band_label: null,\n`;
    out += `        multiplier: ${p.multiplier}, addition_per_hour: null,\n`;
    out += `        description: '${p.description.replace(/'/g, "\\'")}',\n`;
    out += `      },\n`;
  }
  out += `    ];\n\n`;

  out += `    await client.query(\`DELETE FROM penalty_rates WHERE award_code = $1\`, [AWARD_CODE]);\n\n`;

  out += `    for (const r of penaltyRates) {\n`;
  out += `      await client.query(\`\n`;
  out += `        INSERT INTO penalty_rates\n`;
  out += `          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)\n`;
  out += `        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n`;
  out += `      \`, [\n`;
  out += `        AWARD_CODE, r.employment_type, r.day_type,\n`;
  out += `        r.time_band_start, r.time_band_end, r.time_band_label,\n`;
  out += `        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE,\n`;
  out += `      ]);\n`;
  out += `    }\n`;
  out += `    console.log(\`✓ Inserted \${penaltyRates.length} penalty rate rules\`);\n\n`;

  // Overtime rates (standard defaults)
  out += `    // ── Overtime rates ────────────────────────────────────────────────────────\n`;
  out += `    const overtimeRates = [\n`;
  for (const et of empTypes) {
    const etLabel = et === 'full_time' ? 'Full-time' : et === 'part_time' ? 'Part-time' : 'Casual';
    out += `      { employment_type: '${et}', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: '${etLabel} daily overtime — first 2 hours over 7.6 (×1.5)' },\n`;
    out += `      { employment_type: '${et}', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: '${etLabel} daily overtime — after 9.6 hours (×2.0)' },\n`;
    out += `      { employment_type: '${et}', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: '${etLabel} weekly overtime — first 2 hours over 38 (×1.5)' },\n`;
    out += `      { employment_type: '${et}', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: '${etLabel} weekly overtime — after 40 hours (×2.0)' },\n`;
  }
  out += `    ];\n\n`;

  out += `    await client.query(\`DELETE FROM overtime_rates WHERE award_code = $1\`, [AWARD_CODE]);\n\n`;

  out += `    for (const r of overtimeRates) {\n`;
  out += `      await client.query(\`\n`;
  out += `        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)\n`;
  out += `        VALUES ($1, $2, $3, $4, $5, $6, $7)\n`;
  out += `      \`, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);\n`;
  out += `    }\n`;
  out += `    console.log(\`✓ Inserted \${overtimeRates.length} overtime rules\`);\n\n`;

  // Allowances
  out += `    // ── Allowances ────────────────────────────────────────────────────────────\n`;
  if (allowanceEntries.length > 0) {
    out += `    const allowances = [\n`;
    for (const a of allowanceEntries) {
      out += `      {\n`;
      out += `        allowance_type: '${a.allowance_type}',\n`;
      out += `        name: '${a.name.replace(/'/g, "\\'")}',\n`;
      out += `        description: '${a.name.replace(/'/g, "\\'")}',\n`;
      out += `        trigger_condition: 'As per award conditions',\n`;
      out += `        amount: ${a.amount}, amount_type: '${a.amount_type}', per_unit: '${a.per_unit}',\n`;
      out += `      },\n`;
    }
    out += `    ];\n\n`;

    out += `    await client.query(\`DELETE FROM allowances WHERE award_code = $1\`, [AWARD_CODE]);\n\n`;

    out += `    for (const a of allowances) {\n`;
    out += `      await client.query(\`\n`;
    out += `        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, effective_date)\n`;
    out += `        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)\n`;
    out += `        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET\n`;
    out += `          name = EXCLUDED.name, description = EXCLUDED.description, amount = EXCLUDED.amount\n`;
    out += `      \`, [AWARD_CODE, a.allowance_type, a.name, a.description, a.trigger_condition, a.amount, a.amount_type, a.per_unit, EFFECTIVE_DATE]);\n`;
    out += `    }\n`;
    out += `    console.log(\`✓ Inserted \${allowances.length} allowances\`);\n\n`;
  } else {
    out += `    // No allowances sourced from API for this award.\n\n`;
  }

  // Break entitlements (standard)
  out += `    // ── Break entitlements ────────────────────────────────────────────────────\n`;
  out += `    const breaks = [\n`;
  out += `      {\n`;
  out += `        employment_type: null,\n`;
  out += `        shift_hours_min: 4.0, shift_hours_max: null,\n`;
  out += `        break_type: 'rest', break_duration_min: 10, is_paid: true,\n`;
  out += `        timing_rule: 'One paid 10-minute rest break per 4 hours worked',\n`;
  out += `        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break.',\n`;
  out += `      },\n`;
  out += `      {\n`;
  out += `        employment_type: null,\n`;
  out += `        shift_hours_min: 5.0, shift_hours_max: null,\n`;
  out += `        break_type: 'meal', break_duration_min: 30, is_paid: false,\n`;
  out += `        timing_rule: 'No later than 5 hours after starting work',\n`;
  out += `        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes.',\n`;
  out += `      },\n`;
  out += `    ];\n\n`;

  out += `    await client.query(\`DELETE FROM break_entitlements WHERE award_code = $1\`, [AWARD_CODE]);\n\n`;

  out += `    for (const b of breaks) {\n`;
  out += `      await client.query(\`\n`;
  out += `        INSERT INTO break_entitlements\n`;
  out += `          (award_code, employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid, timing_rule, description)\n`;
  out += `        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)\n`;
  out += `      \`, [\n`;
  out += `        AWARD_CODE, b.employment_type, b.shift_hours_min, b.shift_hours_max,\n`;
  out += `        b.break_type, b.break_duration_min, b.is_paid, b.timing_rule, b.description,\n`;
  out += `      ]);\n`;
  out += `    }\n`;
  out += `    console.log(\`✓ Inserted \${breaks.length} break entitlement rules\`);\n\n`;

  // Classification questions (simple level question)
  const questionKey = code.toLowerCase().replace('ma0000', 'a').replace('ma000', 'a') + '_level';
  out += `    // ── Classification questions ───────────────────────────────────────────────\n`;

  // Group classifications by stream
  const streamGroups = new Map();
  for (const c of clsObjs) {
    if (!streamGroups.has(c.stream)) streamGroups.set(c.stream, []);
    streamGroups.get(c.stream).push(c);
  }

  if (streamGroups.size > 1) {
    // Multiple streams: ask stream first, then level
    const streamQKey = questionKey.replace('_level', '_stream');
    out += `    const questions = [\n`;
    out += `      {\n`;
    out += `        award_code: AWARD_CODE,\n`;
    out += `        question_key: '${streamQKey}',\n`;
    out += `        question_text: 'What area do you work in?',\n`;
    out += `        help_text: 'Select the stream that best matches your role.',\n`;
    out += `        question_type: 'single',\n`;
    out += `        stream: null,\n`;
    out += `        parent_question_key: null,\n`;
    out += `        parent_answer_key: null,\n`;
    out += `        sort_order: 1,\n`;
    out += `        answers: [\n`;
    let si = 1;
    for (const [sName] of streamGroups) {
      out += `          { answer_key: '${sName}', answer_text: '${sName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}', sort_order: ${si++} },\n`;
    }
    out += `        ],\n`;
    out += `      },\n`;
    out += `      {\n`;
    out += `        award_code: AWARD_CODE,\n`;
    out += `        question_key: '${questionKey}',\n`;
    out += `        question_text: 'What is your classification level?',\n`;
    out += `        help_text: 'Select the level that best matches your role and experience.',\n`;
    out += `        question_type: 'single',\n`;
    out += `        stream: null,\n`;
    out += `        parent_question_key: null,\n`;
    out += `        parent_answer_key: null,\n`;
    out += `        sort_order: 2,\n`;
    out += `        answers: [\n`;
    // Deduplicate levels across streams
    const seenLevels = new Set();
    let li = 1;
    for (const c of clsObjs) {
      const key = `${c.level}`;
      if (seenLevels.has(key)) continue;
      seenLevels.add(key);
      out += `          { answer_key: 'level_${c.level}', answer_text: '${c.title.replace(/'/g, "\\'")}', sort_order: ${li++} },\n`;
    }
    out += `        ],\n`;
    out += `      },\n`;
    out += `    ];\n\n`;
  } else {
    // Single stream: just level question
    out += `    const questions = [\n`;
    out += `      {\n`;
    out += `        award_code: AWARD_CODE,\n`;
    out += `        question_key: '${questionKey}',\n`;
    out += `        question_text: 'What is your classification level?',\n`;
    out += `        help_text: 'Select the level that best matches your role and experience.',\n`;
    out += `        question_type: 'single',\n`;
    out += `        stream: null,\n`;
    out += `        parent_question_key: null,\n`;
    out += `        parent_answer_key: null,\n`;
    out += `        sort_order: 1,\n`;
    out += `        answers: [\n`;
    clsObjs.forEach((c, i) => {
      out += `          { answer_key: 'level_${c.level}', answer_text: '${c.title.replace(/'/g, "\\'")}', sort_order: ${i + 1} },\n`;
    });
    out += `        ],\n`;
    out += `      },\n`;
    out += `    ];\n\n`;
  }

  // Insert questions
  out += `    for (const q of questions) {\n`;
  out += `      const qResult = await client.query(\`\n`;
  out += `        INSERT INTO classification_questions\n`;
  out += `          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)\n`;
  out += `        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)\n`;
  out += `        ON CONFLICT (question_key) DO UPDATE SET\n`;
  out += `          award_code = EXCLUDED.award_code,\n`;
  out += `          question_text = EXCLUDED.question_text,\n`;
  out += `          help_text = EXCLUDED.help_text,\n`;
  out += `          parent_question_key = EXCLUDED.parent_question_key,\n`;
  out += `          parent_answer_key = EXCLUDED.parent_answer_key,\n`;
  out += `          sort_order = EXCLUDED.sort_order\n`;
  out += `        RETURNING id\n`;
  out += `      \`, [\n`;
  out += `        q.award_code, q.question_key, q.question_text, q.help_text,\n`;
  out += `        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,\n`;
  out += `      ]);\n\n`;

  out += `      const questionId = qResult.rows[0].id;\n`;
  out += `      await client.query('DELETE FROM classification_answers WHERE question_id = $1', [questionId]);\n`;
  out += `      for (const a of q.answers) {\n`;
  out += `        await client.query(\`\n`;
  out += `          INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)\n`;
  out += `          VALUES ($1, $2, $3, $4)\n`;
  out += `        \`, [questionId, a.answer_key, a.answer_text, a.sort_order]);\n`;
  out += `      }\n`;
  out += `    }\n`;
  out += `    console.log(\`✓ Inserted \${questions.length} classification questions\`);\n\n`;

  // Commit
  out += `    await client.query('COMMIT');\n`;
  out += `    console.log('\\n✅ ${code} seed complete');\n`;
  out += `  } catch (err) {\n`;
  out += `    await client.query('ROLLBACK');\n`;
  out += `    console.error('Seed failed:', err);\n`;
  out += `    throw err;\n`;
  out += `  } finally {\n`;
  out += `    client.release();\n`;
  out += `    await pool.end();\n`;
  out += `  }\n`;
  out += `}\n\n`;
  out += `seed();\n`;

  return out;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  // Skip awards that already have seed files
  const toGenerate = MISSING_AWARDS.filter(a => {
    const filePath = path.join(__dirname, `seed_${a.code.toLowerCase()}.js`);
    if (fs.existsSync(filePath)) {
      console.log(`  ⏭ ${a.code}: seed file already exists, skipping.`);
      return false;
    }
    return true;
  });

  console.log(`Generating seed files for ${toGenerate.length} awards...\n`);

  let success = 0;
  let failed = 0;

  for (const award of toGenerate) {
    try {
      const data = await fetchAwardData(award.code);

      if (data.classifications.length === 0) {
        console.log(`  ⚠ ${award.code}: No classifications found, skipping.`);
        failed++;
        continue;
      }

      const content = generateSeedFile(award, data);
      const filePath = path.join(__dirname, `seed_${award.code.toLowerCase()}.js`);
      fs.writeFileSync(filePath, content);
      console.log(`  ✓ ${award.code}: ${data.classifications.length} classifications, ${Object.keys(data.rateMap).length} rates → ${path.basename(filePath)}`);
      success++;

      // Delay between awards to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ✗ ${award.code}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done: ${success} generated, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
