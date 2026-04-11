/**
 * Seed script — Mannequins and Models Award 2020 [MA000117]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000117.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000117';
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
      'Mannequins and Models Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000117-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'adult_rates_house_mannequins_and_models',
        title: 'Adult rates—house mannequin or model (18 years of age or over)',
        description: 'Adult rates—house mannequin or model (18 years of age or over)',
        duties: [],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'adult_rates_house_mannequins_and_models',
        title: 'Adult rates—house mannequin or model (18 years of age or over)',
        description: 'Adult rates—house mannequin or model (18 years of age or over)',
        duties: [],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'trade_showings_or_parades',
        title: 'Day extended beyond 5.30 pm (minimum 1 hour payment)—per hour',
        description: 'Day extended beyond 5.30 pm (minimum 1 hour payment)—per hour',
        duties: [],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'general',
        title: 'Fitting payment',
        description: 'Fitting payment',
        duties: [],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 1, stream: 'mannequins_showing_foundation_garments',
        title: 'Half day (maximum 4 consecutive hours)—per half day',
        description: 'Half day (maximum 4 consecutive hours)—per half day',
        duties: [],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 1, stream: 'rehearsals',
        title: 'Hourly rate where work performed continues  beyond the 2 hour engagement',
        description: 'Hourly rate where work performed continues  beyond the 2 hour engagement',
        duties: [],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 1, stream: 'repetitive_parades_paradettes_other_than_manufactu',
        title: 'Hourly rate where work performed continues beyond the 2 hour engagement—per hour',
        description: 'Hourly rate where work performed continues beyond the 2 hour engagement—per hour',
        duties: [],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 1, stream: 'type_duration_of_rehearsal',
        title: 'Not dress rehearsal, immediately preceding parade—per hour or part thereof',
        description: 'Not dress rehearsal, immediately preceding parade—per hour or part thereof',
        duties: [],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 1, stream: 'modelling_for_still_photography_tv_or_movie_appear',
        title: 'One hour or part thereof',
        description: 'One hour or part thereof',
        duties: [],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 1, stream: 'mannequins_other_than_manufacturers_and_agents_sho',
        title: 'Single parade finishing prior to or at 6.00 pm—(maximum 2 consecutive hours)—per parade',
        description: 'Single parade finishing prior to or at 6.00 pm—(maximum 2 consecutive hours)—per parade',
        duties: [],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 1, stream: 'store_or_public_parades',
        title: 'Store or public parades (maximum 2 consecutive hours)',
        description: 'Store or public parades (maximum 2 consecutive hours)',
        duties: [],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 2, stream: 'rehearsals',
        title: 'Engagement of maximum of 2 consecutive hours on 3 or more days (Monday to Friday)',
        description: 'Engagement of maximum of 2 consecutive hours on 3 or more days (Monday to Friday)',
        duties: [],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 2, stream: 'repetitive_parades_paradettes_other_than_manufactu',
        title: 'Engagement of maximum of 2 consecutive hours on 3 or more days (Monday to Friday)—per day',
        description: 'Engagement of maximum of 2 consecutive hours on 3 or more days (Monday to Friday)—per day',
        duties: [],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 2, stream: 'mannequins_showing_foundation_garments',
        title: 'Evening show parade starting after 5.30 pm—(maximum 2 consecutive hours)—per parade',
        description: 'Evening show parade starting after 5.30 pm—(maximum 2 consecutive hours)—per parade',
        duties: [],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 2, stream: 'type_duration_of_rehearsal',
        title: 'Not dress rehearsal, other than immediately preceding parade (maximum 2 consecutive hours)—per rehearsal',
        description: 'Not dress rehearsal, other than immediately preceding parade (maximum 2 consecutive hours)—per rehearsal',
        duties: [],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 2, stream: 'mannequins_other_than_manufacturers_and_agents_sho',
        title: 'Single parade finishing after 6.00 pm—(maximum 2 consecutive hours)—per parade',
        description: 'Single parade finishing after 6.00 pm—(maximum 2 consecutive hours)—per parade',
        duties: [],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 2, stream: 'trade_showings_or_parades',
        title: 'Single showing (maximum 1 hour)—commencing after 5.30 pm—per showing',
        description: 'Single showing (maximum 1 hour)—commencing after 5.30 pm—per showing',
        duties: [],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 2, stream: 'modelling_for_still_photography_tv_or_movie_appear',
        title: 'Up to 2 hours',
        description: 'Up to 2 hours',
        duties: [],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 3, stream: 'repetitive_parades_paradettes_other_than_manufactu',
        title: 'Engagement of maximum of 2 consecutive hours on 1 or 2 days (Monday to Friday)—per day',
        description: 'Engagement of maximum of 2 consecutive hours on 1 or 2 days (Monday to Friday)—per day',
        duties: [],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 3, stream: 'rehearsals',
        title: 'Engagement of maximum of 2 consecutive hours on a Saturday',
        description: 'Engagement of maximum of 2 consecutive hours on a Saturday',
        duties: [],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 3, stream: 'repetitive_parades_paradettes_other_than_manufactu',
        title: 'Engagement of maximum of 2 consecutive hours on a Saturday—per engagement',
        description: 'Engagement of maximum of 2 consecutive hours on a Saturday—per engagement',
        duties: [],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 3, stream: 'mannequins_showing_foundation_garments',
        title: 'Full day—9.00 am to 5.30 pm—per day',
        description: 'Full day—9.00 am to 5.30 pm—per day',
        duties: [],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 3, stream: 'trade_showings_or_parades',
        title: 'Half day—(maximum 4 consecutive hours)—per half day',
        description: 'Half day—(maximum 4 consecutive hours)—per half day',
        duties: [],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 3, stream: 'modelling_for_still_photography_tv_or_movie_appear',
        title: 'Up to 4 hours',
        description: 'Up to 4 hours',
        duties: [],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 4, stream: 'trade_showings_or_parades',
        title: 'Evening showing—(maximum time—2 consecutive hours)—per showing',
        description: 'Evening showing—(maximum time—2 consecutive hours)—per showing',
        duties: [],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 4, stream: 'modelling_for_still_photography_tv_or_movie_appear',
        title: 'Half day rate',
        description: 'Half day rate',
        duties: [],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 5, stream: 'trade_showings_or_parades',
        title: '9.00 am to 5.30 pm—(ready to start at 9.00 am)—per day',
        description: '9.00 am to 5.30 pm—(ready to start at 9.00 am)—per day',
        duties: [],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 5, stream: 'modelling_for_still_photography_tv_or_movie_appear',
        title: 'Full day rate',
        description: 'Full day rate',
        duties: [],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 29, stream: 'type_duration_of_rehearsal',
        title: 'Full dress (maximum 2 consecutive hours)',
        description: 'Full dress (maximum 2 consecutive hours)',
        duties: [],
        indicative_tasks: [],
        sort_order: 290,
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
    const baseRates = {
      '1_adult_rates_house_mannequins_and_models': 26.67,
      '1_general': 71.39,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[`${cls.level}_${cls.stream}`];
      if (!baseRate) continue;

      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);
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
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ─────────────────────────────────────────────────────────
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
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
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (×2.0)' },
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
        allowance_type: 'casual_employees',
        name: 'Casual employees:',
        description: 'Casual employees:',
        trigger_condition: 'As per award conditions',
        amount: null, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'full_time_and_part_time_employees',
        name: 'Full-time and part-time employees:',
        description: 'Full-time and part-time employees:',
        trigger_condition: 'As per award conditions',
        amount: null, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowances—Late night—second meal break',
        description: 'Meal allowances—Late night—second meal break',
        trigger_condition: 'As per award conditions',
        amount: 17.03, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowances—Overtime on Sunday',
        description: 'Meal allowances—Overtime on Sunday',
        trigger_condition: 'As per award conditions',
        amount: 17.03, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowances—Overtime on Sunday—more than 8 hours’ work',
        description: 'Meal allowances—Overtime on Sunday—more than 8 hours’ work',
        trigger_condition: 'As per award conditions',
        amount: 15.29, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowances—Overtime—at least one hour',
        description: 'Meal allowances—Overtime—at least one hour',
        trigger_condition: 'As per award conditions',
        amount: 17.03, amount_type: 'fixed', per_unit: 'per_shift',
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
        question_key: 'a117_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'adult_rates_house_mannequins_and_models', answer_text: 'Adult Rates House Mannequins And Models', sort_order: 1 },
          { answer_key: 'trade_showings_or_parades', answer_text: 'Trade Showings Or Parades', sort_order: 2 },
          { answer_key: 'general', answer_text: 'General', sort_order: 3 },
          { answer_key: 'mannequins_showing_foundation_garments', answer_text: 'Mannequins Showing Foundation Garments', sort_order: 4 },
          { answer_key: 'rehearsals', answer_text: 'Rehearsals', sort_order: 5 },
          { answer_key: 'repetitive_parades_paradettes_other_than_manufactu', answer_text: 'Repetitive Parades Paradettes Other Than Manufactu', sort_order: 6 },
          { answer_key: 'type_duration_of_rehearsal', answer_text: 'Type Duration Of Rehearsal', sort_order: 7 },
          { answer_key: 'modelling_for_still_photography_tv_or_movie_appear', answer_text: 'Modelling For Still Photography Tv Or Movie Appear', sort_order: 8 },
          { answer_key: 'mannequins_other_than_manufacturers_and_agents_sho', answer_text: 'Mannequins Other Than Manufacturers And Agents Sho', sort_order: 9 },
          { answer_key: 'store_or_public_parades', answer_text: 'Store Or Public Parades', sort_order: 10 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a117_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Adult rates—house mannequin or model (18 years of age or over)', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Engagement of maximum of 2 consecutive hours on 3 or more days (Monday to Friday)', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Engagement of maximum of 2 consecutive hours on 1 or 2 days (Monday to Friday)—per day', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Evening showing—(maximum time—2 consecutive hours)—per showing', sort_order: 4 },
          { answer_key: 'level_5', answer_text: '9.00 am to 5.30 pm—(ready to start at 9.00 am)—per day', sort_order: 5 },
          { answer_key: 'level_29', answer_text: 'Full dress (maximum 2 consecutive hours)', sort_order: 6 },
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
    console.log('\n✅ MA000117 seed complete');
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
