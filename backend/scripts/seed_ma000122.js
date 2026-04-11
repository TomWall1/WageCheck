/**
 * Seed script — Seagoing Industry Award 2020 [MA000122]
 * Pay rates effective 1 July 2025
 * Source: FWO pay guide MA000122, published 4 September 2025
 *
 * Run after migrate.js: node scripts/seed_ma000122.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000122';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Seagoing Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000122-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Vessel types (streams):
    //   dc_cat1_18  = Dry cargo up to 19,000t, manned at 18 or below (7 ranks)
    //   dc_cat1_aov = Dry cargo up to 19,000t, all other vessels (8 ranks)
    //   dc_cat2_18  = Dry cargo 19,000-39,000t, manned at 18 or below (7 ranks)
    //   dc_cat2_aov = Dry cargo 19,000-39,000t, all other vessels (8 ranks)
    //   dc_cat3_18  = Dry cargo over 39,000t, manned at 18 or below (7 ranks)
    //   dc_cat3_aov = Dry cargo over 39,000t, all other vessels (8 ranks)
    //   crude_18    = Crude tankers, manned at 18 or below (7 ranks)
    //   crude_aov   = Crude tankers, all other vessels (8 ranks)
    //   product_18  = Other product tankers, manned at 18 or below (7 ranks)
    //   product_aov = Other product tankers, all other vessels (8 ranks)
    //   gas_18      = Gas carriers, manned at 18 or below (7 ranks)
    //   gas_aov     = Gas carriers, all other vessels (8 ranks)
    //   research    = Research vessels (7 ranks)
    //   temp_licence = Vessels granted a temporary licence (10 ranks)
    //
    // Total: 12*7.5 + 7 + 10 = 31 unique classification entries per stream pattern
    // Grand total: 13 streams with varying counts = 31 unique entries
    //
    // Ranks for "manned at 18 or below" (7 each):
    //   1=Master, 2=Chief engineer, 3=First mate/First engineer,
    //   4=Second mate/Second engineer/ETO, 5=Third mate/Third engineer/Electrician,
    //   6=Chief integrated rating/Chief cook/Chief steward,
    //   7=Integrated rating/Assistant steward/Catering attendant
    //
    // Ranks for "all other vessels" (8 each, adds Second cook):
    //   1-7 same as above, 8=Second cook

    // Helper to build classifications for a vessel type
    function buildVesselClassifications(stream, label, hasCook, startOrder) {
      const ranks18 = [
        'Master',
        'Chief engineer',
        'First mate / First engineer',
        'Second mate / Second engineer / Electro-technical officer',
        'Third mate / Third engineer / Electrician',
        'Chief integrated rating / Chief cook / Chief steward',
        'Integrated rating / Assistant steward / Catering attendant',
      ];
      const ranksAOV = [
        ...ranks18.slice(0, 6),
        'Second cook',
        'Integrated rating / Assistant steward / Catering attendant',
      ];
      const ranks = hasCook ? ranksAOV : ranks18;
      return ranks.map((title, i) => ({
        level: i + 1,
        stream,
        title,
        description: `${title} — ${label}.`,
        duties: [],
        indicative_tasks: [],
        sort_order: startOrder + (i * 10),
      }));
    }

    const classifications = [
      // Dry cargo Cat 1 (up to 19,000t)
      ...buildVesselClassifications('dc_cat1_18', 'Dry cargo up to 19,000t, manned at 18 or below', false, 10),
      ...buildVesselClassifications('dc_cat1_aov', 'Dry cargo up to 19,000t, all other vessels', true, 80),
      // Dry cargo Cat 2 (19,000-39,000t)
      ...buildVesselClassifications('dc_cat2_18', 'Dry cargo 19,000-39,000t, manned at 18 or below', false, 160),
      ...buildVesselClassifications('dc_cat2_aov', 'Dry cargo 19,000-39,000t, all other vessels', true, 240),
      // Dry cargo Cat 3 (over 39,000t)
      ...buildVesselClassifications('dc_cat3_18', 'Dry cargo over 39,000t, manned at 18 or below', false, 320),
      ...buildVesselClassifications('dc_cat3_aov', 'Dry cargo over 39,000t, all other vessels', true, 400),
      // Crude tankers
      ...buildVesselClassifications('crude_18', 'Crude tankers, manned at 18 or below', false, 480),
      ...buildVesselClassifications('crude_aov', 'Crude tankers, all other vessels', true, 560),
      // Other product tankers
      ...buildVesselClassifications('product_18', 'Other product tankers, manned at 18 or below', false, 640),
      ...buildVesselClassifications('product_aov', 'Other product tankers, all other vessels', true, 720),
      // Gas carriers
      ...buildVesselClassifications('gas_18', 'Gas carriers, manned at 18 or below', false, 800),
      ...buildVesselClassifications('gas_aov', 'Gas carriers, all other vessels', true, 880),
      // Research vessels (single roster, 7 ranks)
      {
        level: 1, stream: 'research',
        title: 'Master', description: 'Master — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 960,
      },
      {
        level: 2, stream: 'research',
        title: 'Chief engineer', description: 'Chief engineer — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 970,
      },
      {
        level: 3, stream: 'research',
        title: 'First mate / First engineer', description: 'First mate / First engineer — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 980,
      },
      {
        level: 4, stream: 'research',
        title: 'Second mate / Second engineer / Electrical engineer / Electro-technical officer',
        description: 'Second mate / Second engineer / Electrical engineer / Electro-technical officer — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 990,
      },
      {
        level: 5, stream: 'research',
        title: 'Third mate / Third engineer / Electrician',
        description: 'Third mate / Third engineer / Electrician — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 1000,
      },
      {
        level: 6, stream: 'research',
        title: 'Bosun / Chief steward / Chief cook / Chief integrated rating',
        description: 'Bosun / Chief steward / Chief cook / Chief integrated rating — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 1010,
      },
      {
        level: 7, stream: 'research',
        title: 'Integrated rating / AB / Greaser / Second cook',
        description: 'Integrated rating / AB / Greaser / Second cook — Research vessel.',
        duties: [], indicative_tasks: [], sort_order: 1020,
      },
      // Vessels granted a temporary licence (10 ranks, hourly rates)
      {
        level: 1, stream: 'temp_licence',
        title: 'Master', description: 'Master — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1030,
      },
      {
        level: 2, stream: 'temp_licence',
        title: 'Chief engineer', description: 'Chief engineer — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1040,
      },
      {
        level: 3, stream: 'temp_licence',
        title: 'First mate / First engineer', description: 'First mate / First engineer — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1050,
      },
      {
        level: 4, stream: 'temp_licence',
        title: 'Second mate / Second engineer / Radio officer / Electrical engineer',
        description: 'Second mate / Second engineer / Radio officer / Electrical engineer — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1060,
      },
      {
        level: 5, stream: 'temp_licence',
        title: 'Third mate / Third engineer',
        description: 'Third mate / Third engineer — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1070,
      },
      {
        level: 6, stream: 'temp_licence',
        title: 'Chief integrated rating / Bosun / Chief cook / Chief steward',
        description: 'Chief integrated rating / Bosun / Chief cook / Chief steward — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1080,
      },
      {
        level: 7, stream: 'temp_licence',
        title: 'Carpenter / Fitter / Repairer / Donkeyman / Electrician',
        description: 'Carpenter / Fitter / Repairer / Donkeyman / Electrician — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1090,
      },
      {
        level: 8, stream: 'temp_licence',
        title: 'Integrated rating / Able seaman / Fireman / Motorman / Pumpman / Oiler greaser / Steward',
        description: 'Integrated rating / Able seaman / Fireman / Motorman / Pumpman / Oiler greaser / Steward — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1100,
      },
      {
        level: 9, stream: 'temp_licence',
        title: 'OS / Wiper / Deckboy / Catering boy / 2nd cook / Messroom steward (first 6 months)',
        description: 'OS / Wiper / Deckboy / Catering boy / 2nd cook / Messroom steward (first 6 months of employment) — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1110,
      },
      {
        level: 10, stream: 'temp_licence',
        title: 'OS / Wiper / Deckboy / Catering boy / 2nd cook / Messroom steward (after 6 months)',
        description: 'OS / Wiper / Deckboy / Catering boy / 2nd cook / Messroom steward (after 6 months of employment) — Vessels granted a temporary licence.',
        duties: [], indicative_tasks: [], sort_order: 1120,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, 1, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ─────────────────────────────────────────────────────────────
    // Source: FWO pay guide MA000122, effective 1 July 2025.
    // Most streams use DAILY rates (not hourly). temp_licence uses HOURLY rates.
    // We store the daily rate as 'base_daily' for non-temp-licence streams
    // and 'base_hourly' for temp_licence.

    // Daily rates for each stream (level -> daily rate)
    // 7-rank streams (manned at 18 or below): Master, Chief eng, 1st mate, 2nd mate, 3rd mate, Chief IR, IR
    // 8-rank streams (AOV): same + Second cook at rank 7, IR at rank 8
    const dailyRates = {
      // DC Cat 1 — manned at 18
      dc_cat1_18: { 1: 346.91, 2: 341.20, 3: 295.67, 4: 273.51, 5: 262.13, 6: 247.91, 7: 225.77 },
      // DC Cat 1 — AOV
      dc_cat1_aov: { 1: 338.60, 2: 333.07, 3: 288.88, 4: 267.38, 5: 256.33, 6: 242.51, 7: 226.50, 8: 220.97 },
      // DC Cat 2 — manned at 18
      dc_cat2_18: { 1: 357.57, 2: 351.66, 3: 304.41, 4: 280.79, 5: 269.61, 6: 251.90, 7: 229.01 },
      // DC Cat 2 — AOV
      dc_cat2_aov: { 1: 348.96, 2: 343.23, 3: 297.35, 4: 275.06, 5: 263.59, 6: 246.40, 7: 229.85, 8: 224.12 },
      // DC Cat 3 — manned at 18
      dc_cat3_18: { 1: 370.11, 2: 363.96, 3: 314.69, 4: 290.07, 5: 275.32, 6: 253.76, 7: 230.01 },
      // DC Cat 3 — AOV
      dc_cat3_aov: { 1: 361.15, 2: 355.19, 3: 307.35, 4: 283.45, 5: 269.13, 6: 248.20, 7: 234.05, 8: 225.08 },
      // Crude tankers — manned at 18
      crude_18: { 1: 419.44, 2: 412.31, 3: 351.59, 4: 326.58, 5: 305.15, 6: 273.63, 7: 245.06 },
      // Crude tankers — AOV
      crude_aov: { 1: 405.70, 2: 398.84, 3: 340.47, 4: 316.42, 5: 295.81, 6: 265.54, 7: 248.35, 8: 235.85 },
      // Product tankers — manned at 18
      product_18: { 1: 435.80, 2: 428.32, 3: 361.09, 4: 334.95, 5: 316.27, 6: 282.63, 7: 257.14 },
      // Product tankers — AOV
      product_aov: { 1: 418.01, 2: 410.88, 3: 346.87, 4: 321.95, 5: 304.17, 6: 272.79, 7: 255.00, 8: 247.88 },
      // Gas carriers — manned at 18
      gas_18: { 1: 425.97, 2: 424.13, 3: 357.68, 4: 331.84, 5: 318.90, 6: 291.20, 7: 265.98 },
      // Gas carriers — AOV
      gas_aov: { 1: 420.77, 2: 413.62, 3: 349.07, 4: 323.98, 5: 311.43, 6: 284.53, 7: 270.84, 8: 260.08 },
      // Research vessels (daily)
      research: { 1: 315.55, 2: 309.85, 3: 263.93, 4: 241.47, 5: 231.58, 6: 220.97, 7: 204.06 },
    };

    // Hourly rates for temp_licence stream
    const hourlyRates = {
      temp_licence: { 1: 43.91, 2: 43.18, 3: 37.44, 4: 34.65, 5: 33.21, 6: 31.43, 7: 31.43, 8: 28.64, 9: 24.28, 10: 24.95 },
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      if (cls.stream === 'temp_licence') {
        // Hourly rates for temp licence vessels
        const rate = hourlyRates.temp_licence[cls.level];
        if (!rate) continue;

        const casualRate = Math.round(rate * 1.25 * 100) / 100;

        for (const empType of ['full_time', 'part_time']) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, $3, 'base_hourly', $4, $5)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [AWARD_CODE, cls.id, empType, rate, EFFECTIVE_DATE]);
        }

        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, casualRate, EFFECTIVE_DATE]);

        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);
      } else {
        // Daily rates for all other vessel types
        const streamRates = dailyRates[cls.stream];
        if (!streamRates) continue;
        const rate = streamRates[cls.level];
        if (!rate) continue;

        // Store as base_daily for FT only (seagoing employees don't have casual/PT in the traditional sense)
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'full_time', 'base_daily', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, rate, EFFECTIVE_DATE]);
      }
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Temp licence vessels use standard overtime rates from the PDF.
    // Non-temp-licence vessels have different rules per the award.
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — x1.25 (temp licence vessels)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Sunday — x1.25 (temp licence vessels)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Public holiday — x1.25 (temp licence vessels)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — x1.25',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Sunday — x1.25',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Public holiday — x1.25',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — x1.25 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Sunday — x1.25 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Public holiday — x1.25 of casual base',
      },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, r.time_band_label,
        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ────────────────────────────────────────────────────────
    // Temp licence vessels: overtime x1.25 of base hourly
    const overtimeRates = [
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.25, description: 'Full-time daily overtime — after 7.6 hours (x1.25)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.25, description: 'Full-time weekly overtime — after 38 hours (x1.25)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.25, description: 'Part-time daily overtime — after 7.6 hours (x1.25)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.25, description: 'Part-time weekly overtime — after 38 hours (x1.25)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.25, description: 'Casual daily overtime — after 7.6 hours (x1.25)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.25, description: 'Casual weekly overtime — after 38 hours (x1.25)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    const allowances = [
      {
        allowance_type: 'accommodation',
        name: 'Accommodation allowance',
        description: 'Accommodation allowance for vessels not granted a temporary licence.',
        trigger_condition: 'Accommodation required as per award conditions',
        amount: 203.07, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance — breakfast',
        description: 'Breakfast meal allowance.',
        trigger_condition: 'Meal not provided as per award conditions',
        amount: 27.00, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_lunch',
        name: 'Meal allowance — lunch',
        description: 'Lunch meal allowance.',
        trigger_condition: 'Meal not provided as per award conditions',
        amount: 32.58, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_dinner',
        name: 'Meal allowance — dinner',
        description: 'Dinner meal allowance.',
        trigger_condition: 'Meal not provided as per award conditions',
        amount: 53.98, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'disturbance_sleep',
        name: 'Disturbance of sleep allowance',
        description: 'Allowance for disturbance of sleep.',
        trigger_condition: 'Sleep disturbed as per award conditions',
        amount: 28.92, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tanker',
        name: 'Tanker allowance',
        description: 'Tanker allowance per day.',
        trigger_condition: 'Working on a tanker vessel',
        amount: 12.84, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'damage_personal_effects',
        name: 'Damage to personal effects allowance',
        description: 'Compensation for damage to personal effects up to $5,439.',
        trigger_condition: 'Personal effects damaged as per award conditions',
        amount: 5439.00, amount_type: 'fixed', per_unit: 'per_event',
      },
    ];

    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name, description = EXCLUDED.description, amount = EXCLUDED.amount
      `, [AWARD_CODE, a.allowance_type, a.name, a.description, a.trigger_condition, a.amount, a.amount_type, a.per_unit, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ────────────────────────────────────────────────────
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes.',
      },
    ];

    await client.query(`DELETE FROM break_entitlements WHERE award_code = $1`, [AWARD_CODE]);

    for (const b of breaks) {
      await client.query(`
        INSERT INTO break_entitlements
          (award_code, employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid, timing_rule, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        AWARD_CODE, b.employment_type, b.shift_hours_min, b.shift_hours_max,
        b.break_type, b.break_duration_min, b.is_paid, b.timing_rule, b.description,
      ]);
    }
    console.log(`✓ Inserted ${breaks.length} break entitlement rules`);

    // ── Classification questions ───────────────────────────────────────────────
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'a122_vessel_type',
        question_text: 'What type of vessel do you work on?',
        help_text: 'Select the vessel category that matches your employment.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'dc_cat1', answer_text: 'Dry cargo vessel up to 19,000 tonnes (D.C. Cat 1)', sort_order: 1 },
          { answer_key: 'dc_cat2', answer_text: 'Dry cargo vessel 19,000-39,000 tonnes (D.C. Cat 2)', sort_order: 2 },
          { answer_key: 'dc_cat3', answer_text: 'Dry cargo vessel over 39,000 tonnes (D.C. Cat 3)', sort_order: 3 },
          { answer_key: 'crude', answer_text: 'Crude tanker', sort_order: 4 },
          { answer_key: 'product', answer_text: 'Other (product) tanker', sort_order: 5 },
          { answer_key: 'gas', answer_text: 'Gas carrier', sort_order: 6 },
          { answer_key: 'research', answer_text: 'Research vessel', sort_order: 7 },
          { answer_key: 'temp_licence', answer_text: 'Vessel granted a temporary licence', sort_order: 8 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a122_crew_size',
        question_text: 'What is your vessel crew size?',
        help_text: 'Select whether the vessel is manned at 18 or below, or has more crew.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: '18', answer_text: 'Manned at 18 or below', sort_order: 1 },
          { answer_key: 'aov', answer_text: 'All other vessels (more than 18)', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a122_rank',
        question_text: 'What is your rank/classification?',
        help_text: 'Select the rank that matches your position on the vessel.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 3,
        answers: [
          { answer_key: 'master', answer_text: 'Master', sort_order: 1 },
          { answer_key: 'chief_eng', answer_text: 'Chief engineer', sort_order: 2 },
          { answer_key: 'first_mate', answer_text: 'First mate / First engineer', sort_order: 3 },
          { answer_key: 'second_mate', answer_text: 'Second mate / Second engineer / ETO', sort_order: 4 },
          { answer_key: 'third_mate', answer_text: 'Third mate / Third engineer / Electrician', sort_order: 5 },
          { answer_key: 'chief_ir', answer_text: 'Chief integrated rating / Chief cook / Chief steward', sort_order: 6 },
          { answer_key: 'second_cook', answer_text: 'Second cook', sort_order: 7 },
          { answer_key: 'ir', answer_text: 'Integrated rating / Assistant steward / Catering attendant', sort_order: 8 },
        ],
      },
    ];

    for (const q of questions) {
      const qResult = await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (question_key) DO UPDATE SET
          award_code = EXCLUDED.award_code,
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `, [
        q.award_code, q.question_key, q.question_text, q.help_text,
        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,
      ]);

      const questionId = qResult.rows[0].id;
      await client.query('DELETE FROM classification_answers WHERE question_id = $1', [questionId]);
      for (const a of q.answers) {
        await client.query(`
          INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
          VALUES ($1, $2, $3, $4)
        `, [questionId, a.answer_key, a.answer_text, a.sort_order]);
      }
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    await client.query('COMMIT');
    console.log('\n✅ MA000122 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
