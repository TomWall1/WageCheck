/**
 * Seed script — Dredging Industry Award 2020 [MA000085]
 * Pay rates effective 11 November 2025
 * Rates sourced from FWO Pay Guide published 11 November 2025.
 *
 * Run after migrate.js: node scripts/seed_ma000085.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000085';
const EFFECTIVE_DATE = '2025-11-11';

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
      'Dredging Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000085-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // 4 streams from the PDF:
    //   non_propelled_dredge — 19 unique classifications
    //   other_dredge_not_fully_operational — 31 unique classifications
    //   other_dredge_fully_operational_day — same 31 roles (day workers)
    //   other_dredge_fully_operational_shift — same 31 roles (shiftworkers)
    //
    // To keep it clean, we model each unique role per dredge type.
    // Non-propelled dredge roles (19 unique)
    // Other dredge (not fully operational) roles (31 unique)
    // Other dredge (fully operational) day workers and shiftworkers share the same roles
    // but have different weekly rates. We use separate streams.

    const classifications = [
      // Non-propelled dredge (19 roles)
      { level: 1, stream: 'non_propelled_dredge', title: 'Chief engineer', description: 'Chief engineer on non-propelled dredge', sort_order: 10 },
      { level: 2, stream: 'non_propelled_dredge', title: 'Chief operator', description: 'Chief operator on non-propelled dredge', sort_order: 20 },
      { level: 3, stream: 'non_propelled_dredge', title: 'First engineer', description: 'First engineer on non-propelled dredge', sort_order: 30 },
      { level: 4, stream: 'non_propelled_dredge', title: 'First operator', description: 'First operator on non-propelled dredge', sort_order: 40 },
      { level: 5, stream: 'non_propelled_dredge', title: 'Drilling technician', description: 'Drilling technician on non-propelled dredge', sort_order: 50 },
      { level: 6, stream: 'non_propelled_dredge', title: 'Engineer', description: 'Engineer on non-propelled dredge', sort_order: 60 },
      { level: 7, stream: 'non_propelled_dredge', title: 'Mechanical attendant', description: 'Mechanical attendant on non-propelled dredge', sort_order: 70 },
      { level: 8, stream: 'non_propelled_dredge', title: 'Crane operator (mechanical)', description: 'Crane operator (mechanical) on non-propelled dredge', sort_order: 80 },
      { level: 9, stream: 'non_propelled_dredge', title: 'Electrician', description: 'Electrician on non-propelled dredge', sort_order: 90 },
      { level: 10, stream: 'non_propelled_dredge', title: 'Leading driller', description: 'Leading driller on non-propelled dredge', sort_order: 100 },
      { level: 11, stream: 'non_propelled_dredge', title: 'Second engineer', description: 'Second engineer on non-propelled dredge', sort_order: 110 },
      { level: 12, stream: 'non_propelled_dredge', title: 'Second operator', description: 'Second operator on non-propelled dredge', sort_order: 120 },
      { level: 13, stream: 'non_propelled_dredge', title: 'Leading hand (reclamation)', description: 'Leading hand (reclamation) on non-propelled dredge', sort_order: 130 },
      { level: 14, stream: 'non_propelled_dredge', title: 'Driller', description: 'Driller on non-propelled dredge', sort_order: 140 },
      { level: 15, stream: 'non_propelled_dredge', title: 'Third engineer', description: 'Third engineer on non-propelled dredge', sort_order: 150 },
      { level: 16, stream: 'non_propelled_dredge', title: 'Dredgehand', description: 'Dredgehand on non-propelled dredge', sort_order: 160 },
      { level: 17, stream: 'non_propelled_dredge', title: 'Greaser', description: 'Greaser on non-propelled dredge', sort_order: 170 },
      { level: 18, stream: 'non_propelled_dredge', title: 'Assistant driller', description: 'Assistant driller on non-propelled dredge', sort_order: 180 },
      { level: 19, stream: 'non_propelled_dredge', title: 'Crew attendant', description: 'Crew attendant on non-propelled dredge', sort_order: 190 },

      // Other dredge — not fully operational (31 roles)
      { level: 1, stream: 'other_dredge_not_fully_operational', title: 'Trailer master', description: 'Trailer master — dredge not fully operational', sort_order: 200 },
      { level: 2, stream: 'other_dredge_not_fully_operational', title: 'Chief engineer', description: 'Chief engineer — dredge not fully operational', sort_order: 210 },
      { level: 3, stream: 'other_dredge_not_fully_operational', title: 'Trailer shift master', description: 'Trailer shift master — dredge not fully operational', sort_order: 220 },
      { level: 4, stream: 'other_dredge_not_fully_operational', title: 'Tug master (W.H. Reliance or equivalent)', description: 'Tug master (W.H. Reliance or equivalent) — dredge not fully operational', sort_order: 230 },
      { level: 5, stream: 'other_dredge_not_fully_operational', title: 'First engineer', description: 'First engineer — dredge not fully operational', sort_order: 240 },
      { level: 6, stream: 'other_dredge_not_fully_operational', title: 'Electrical engineer (Humber River or equivalent)', description: 'Electrical engineer (Humber River or equivalent) — dredge not fully operational', sort_order: 250 },
      { level: 7, stream: 'other_dredge_not_fully_operational', title: 'Trailer mate', description: 'Trailer mate — dredge not fully operational', sort_order: 260 },
      { level: 8, stream: 'other_dredge_not_fully_operational', title: 'Tug master', description: 'Tug master — dredge not fully operational', sort_order: 270 },
      { level: 9, stream: 'other_dredge_not_fully_operational', title: 'Tug engineer', description: 'Tug engineer — dredge not fully operational', sort_order: 280 },
      { level: 10, stream: 'other_dredge_not_fully_operational', title: 'Second engineer', description: 'Second engineer — dredge not fully operational', sort_order: 290 },
      { level: 11, stream: 'other_dredge_not_fully_operational', title: 'Electrical engineer', description: 'Electrical engineer — dredge not fully operational', sort_order: 300 },
      { level: 12, stream: 'other_dredge_not_fully_operational', title: 'Pump operator', description: 'Pump operator — dredge not fully operational', sort_order: 310 },
      { level: 13, stream: 'other_dredge_not_fully_operational', title: 'Welder', description: 'Welder — dredge not fully operational', sort_order: 320 },
      { level: 14, stream: 'other_dredge_not_fully_operational', title: 'Deckhand/welder', description: 'Deckhand/welder — dredge not fully operational', sort_order: 330 },
      { level: 15, stream: 'other_dredge_not_fully_operational', title: 'Dredgehand/welder', description: 'Dredgehand/welder — dredge not fully operational', sort_order: 340 },
      { level: 16, stream: 'other_dredge_not_fully_operational', title: 'Bosun/driller', description: 'Bosun/driller — dredge not fully operational', sort_order: 350 },
      { level: 17, stream: 'other_dredge_not_fully_operational', title: 'Launch driver', description: 'Launch driver — dredge not fully operational', sort_order: 360 },
      { level: 18, stream: 'other_dredge_not_fully_operational', title: 'Assistant pump operator', description: 'Assistant pump operator — dredge not fully operational', sort_order: 370 },
      { level: 19, stream: 'other_dredge_not_fully_operational', title: 'Driller', description: 'Driller — dredge not fully operational', sort_order: 380 },
      { level: 20, stream: 'other_dredge_not_fully_operational', title: 'Deckhand/driller', description: 'Deckhand/driller — dredge not fully operational', sort_order: 390 },
      { level: 21, stream: 'other_dredge_not_fully_operational', title: 'Bosun', description: 'Bosun — dredge not fully operational', sort_order: 400 },
      { level: 22, stream: 'other_dredge_not_fully_operational', title: 'Chief cook', description: 'Chief cook — dredge not fully operational', sort_order: 410 },
      { level: 23, stream: 'other_dredge_not_fully_operational', title: 'Deckhand', description: 'Deckhand — dredge not fully operational', sort_order: 420 },
      { level: 24, stream: 'other_dredge_not_fully_operational', title: 'Assistant driller', description: 'Assistant driller — dredge not fully operational', sort_order: 430 },
      { level: 25, stream: 'other_dredge_not_fully_operational', title: 'Able seaman', description: 'Able seaman — dredge not fully operational', sort_order: 440 },
      { level: 26, stream: 'other_dredge_not_fully_operational', title: 'Dredgehand', description: 'Dredgehand — dredge not fully operational', sort_order: 450 },
      { level: 27, stream: 'other_dredge_not_fully_operational', title: 'Greaser', description: 'Greaser — dredge not fully operational', sort_order: 460 },
      { level: 28, stream: 'other_dredge_not_fully_operational', title: 'Firefighter', description: 'Firefighter — dredge not fully operational', sort_order: 470 },
      { level: 29, stream: 'other_dredge_not_fully_operational', title: 'Motorman', description: 'Motorman — dredge not fully operational', sort_order: 480 },
      { level: 30, stream: 'other_dredge_not_fully_operational', title: 'Crew attendant', description: 'Crew attendant — dredge not fully operational', sort_order: 490 },
      { level: 31, stream: 'other_dredge_not_fully_operational', title: 'Second cook', description: 'Second cook — dredge not fully operational', sort_order: 500 },
    ];

    // Add duties/indicative_tasks to each
    for (const c of classifications) {
      c.duties = c.duties || [];
      c.indicative_tasks = c.indicative_tasks || [];
    }

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
    // Non-propelled dredge FT/PT hourly rates from PDF page 2
    // Casual rates from PDF page 10
    const baseRates = {
      // Non-propelled dredge
      '1_non_propelled_dredge':  { ft: 32.02, casual: 40.03 },
      '2_non_propelled_dredge':  { ft: 32.02, casual: 40.03 },
      '3_non_propelled_dredge':  { ft: 31.38, casual: 39.23 },
      '4_non_propelled_dredge':  { ft: 31.38, casual: 39.23 },
      '5_non_propelled_dredge':  { ft: 30.52, casual: 38.15 },
      '6_non_propelled_dredge':  { ft: 29.92, casual: 37.40 },
      '7_non_propelled_dredge':  { ft: 29.92, casual: 37.40 },
      '8_non_propelled_dredge':  { ft: 29.64, casual: 37.05 },
      '9_non_propelled_dredge':  { ft: 29.56, casual: 36.95 },
      '10_non_propelled_dredge': { ft: 29.35, casual: 36.69 },
      '11_non_propelled_dredge': { ft: 28.70, casual: 35.88 },
      '12_non_propelled_dredge': { ft: 28.70, casual: 35.88 },
      '13_non_propelled_dredge': { ft: 28.70, casual: 35.88 },
      '14_non_propelled_dredge': { ft: 27.93, casual: 34.91 },
      '15_non_propelled_dredge': { ft: 27.43, casual: 34.29 },
      '16_non_propelled_dredge': { ft: 26.99, casual: 33.74 },
      '17_non_propelled_dredge': { ft: 26.99, casual: 33.74 },
      '18_non_propelled_dredge': { ft: 26.99, casual: 33.74 },
      '19_non_propelled_dredge': { ft: 26.99, casual: 33.74 },

      // Other dredge — not fully operational (FT/PT from PDF page 3-4)
      // Casual rates from PDF page 10-11
      '1_other_dredge_not_fully_operational':  { ft: 34.04, casual: 42.55 },
      '2_other_dredge_not_fully_operational':  { ft: 34.04, casual: 42.55 },
      '3_other_dredge_not_fully_operational':  { ft: 33.09, casual: 41.36 },
      '4_other_dredge_not_fully_operational':  { ft: 33.09, casual: 41.36 },
      '5_other_dredge_not_fully_operational':  { ft: 33.09, casual: 41.36 },
      '6_other_dredge_not_fully_operational':  { ft: 33.09, casual: 41.36 },
      '7_other_dredge_not_fully_operational':  { ft: 30.43, casual: 38.04 },
      '8_other_dredge_not_fully_operational':  { ft: 30.43, casual: 38.04 },
      '9_other_dredge_not_fully_operational':  { ft: 30.43, casual: 38.04 },
      '10_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '11_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '12_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '13_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '14_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '15_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '16_other_dredge_not_fully_operational': { ft: 30.43, casual: 38.04 },
      '17_other_dredge_not_fully_operational': { ft: 29.48, casual: 36.85 },
      '18_other_dredge_not_fully_operational': { ft: 28.90, casual: 36.13 },
      '19_other_dredge_not_fully_operational': { ft: 28.90, casual: 36.13 },
      '20_other_dredge_not_fully_operational': { ft: 28.90, casual: 36.13 },
      '21_other_dredge_not_fully_operational': { ft: 28.90, casual: 36.13 },
      '22_other_dredge_not_fully_operational': { ft: 28.90, casual: 36.13 },
      '23_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '24_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '25_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '26_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '27_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '28_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '29_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '30_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
      '31_other_dredge_not_fully_operational': { ft: 28.19, casual: 35.24 },
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const rates = baseRates[`${cls.level}_${cls.stream}`];
      if (!rates) continue;

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, rates.ft, EFFECTIVE_DATE]);
      }

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, rates.casual, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ─────────────────────────────────────────────────────────
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — full-time x1',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Overtime Monday to Sunday — full-time x2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — full-time x2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — part-time x1',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Overtime Monday to Sunday — part-time x2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — part-time x2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — casual x1',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Overtime Monday to Sunday — casual x2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — casual x2.5',
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
    const overtimeRates = [
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — Monday to Sunday (x2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — over 38 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — Monday to Sunday (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — over 38 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — Monday to Sunday (x2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — over 38 hours (x2.0)' },
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
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'Meal allowance when required to work overtime',
        trigger_condition: 'As per award conditions',
        amount: 18.27, amount_type: 'fixed', per_unit: 'per_shift',
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
        question_key: 'a85_stream',
        question_text: 'What type of dredge do you work on?',
        help_text: 'Select the type of dredge that matches your vessel.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'non_propelled_dredge', answer_text: 'Non-propelled dredge', sort_order: 1 },
          { answer_key: 'other_dredge_not_fully_operational', answer_text: 'Dredge (other than non-propelled) — not fully operational', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a85_role',
        question_text: 'What is your role/classification?',
        help_text: 'Select the role that matches your position on the vessel.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'chief_engineer', answer_text: 'Chief engineer', sort_order: 1 },
          { answer_key: 'chief_operator', answer_text: 'Chief operator', sort_order: 2 },
          { answer_key: 'trailer_master', answer_text: 'Trailer master', sort_order: 3 },
          { answer_key: 'first_engineer', answer_text: 'First engineer', sort_order: 4 },
          { answer_key: 'driller', answer_text: 'Driller', sort_order: 5 },
          { answer_key: 'dredgehand', answer_text: 'Dredgehand', sort_order: 6 },
          { answer_key: 'crew_attendant', answer_text: 'Crew attendant', sort_order: 7 },
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
    console.log('\n✅ MA000085 seed complete');
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
