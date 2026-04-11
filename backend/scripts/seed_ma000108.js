/**
 * Seed script — Professional Diving Industry (Industrial) Award 2020 [MA000108]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Source: FWO pay guide MA000108, effective 1 July 2025
 *
 * Run after migrate.js: node scripts/seed_ma000108.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000108';
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
      'Professional Diving Industry (Industrial) Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000108-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Two streams: offshore_divers (10 classifications) and inshore_divers (4 classifications).
    // 14 unique classifications total (deduplicated from original 34).
    // Offshore divers use hourly rates for our purposes.

    const classifications = [
      // ── Inshore divers ─────────────────────────────────────────────────────
      {
        level: 1, stream: 'inshore_divers',
        title: 'Diver\'s Attendant',
        description: 'Inshore diver\'s attendant. Assists divers during inshore diving operations.',
        duties: [
          'Attending to divers during inshore operations',
          'Maintaining diving equipment on site',
          'Assisting with surface support tasks',
        ],
        indicative_tasks: ['Inshore diver\'s attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'inshore_divers',
        title: 'Diver',
        description: 'Inshore diver. Performs diving work in inshore environments.',
        duties: [
          'Performing diving tasks in inshore waters',
          'Conducting underwater inspections and maintenance',
          'Operating diving equipment',
        ],
        indicative_tasks: ['Inshore diver'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'inshore_divers',
        title: 'Hyperbaric Welder',
        description: 'Inshore hyperbaric welder. Performs welding tasks in hyperbaric environments.',
        duties: [
          'Performing hyperbaric welding in inshore environments',
          'Inspecting underwater structures',
          'Operating specialist welding equipment',
        ],
        indicative_tasks: ['Inshore hyperbaric welder'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'inshore_divers',
        title: 'Diving Supervisor',
        description: 'Inshore diving supervisor. Supervises inshore diving operations.',
        duties: [
          'Supervising inshore diving operations',
          'Managing dive teams and safety procedures',
          'Coordinating diving work schedules',
        ],
        indicative_tasks: ['Inshore diving supervisor'],
        sort_order: 40,
      },
      // ── Offshore divers ────────────────────────────────────────────────────
      {
        level: 1, stream: 'offshore_divers',
        title: 'Diver\'s Attendant',
        description: 'Offshore diver\'s attendant. Assists divers during offshore diving operations.',
        duties: [
          'Attending to divers during offshore operations',
          'Maintaining diving equipment on support vessels',
          'Assisting with surface support and safety tasks',
        ],
        indicative_tasks: ['Offshore diver\'s attendant'],
        sort_order: 50,
      },
      {
        level: 2, stream: 'offshore_divers',
        title: 'Diver',
        description: 'Offshore diver. Performs diving work in offshore environments.',
        duties: [
          'Performing diving tasks in offshore waters',
          'Conducting underwater inspections, maintenance and repairs',
          'Operating diving equipment in offshore conditions',
        ],
        indicative_tasks: ['Offshore diver'],
        sort_order: 60,
      },
      {
        level: 3, stream: 'offshore_divers',
        title: 'ADS Operations — Operator',
        description: 'Operator in atmospheric diving suit (ADS) operations.',
        duties: [
          'Operating atmospheric diving suits',
          'Performing tasks during ADS operations',
          'Maintaining ADS equipment',
        ],
        indicative_tasks: ['ADS operations operator'],
        sort_order: 70,
      },
      {
        level: 4, stream: 'offshore_divers',
        title: 'Systems Maintenance Technician',
        description: 'Offshore systems maintenance technician. Maintains diving systems and equipment.',
        duties: [
          'Maintaining and repairing diving systems',
          'Conducting technical inspections of equipment',
          'Ensuring diving system integrity and safety',
        ],
        indicative_tasks: ['Offshore systems maintenance technician'],
        sort_order: 80,
      },
      {
        level: 5, stream: 'offshore_divers',
        title: 'Life Support Technician',
        description: 'Offshore life support technician. Operates and maintains life support systems.',
        duties: [
          'Operating life support systems during diving operations',
          'Monitoring and maintaining gas supply systems',
          'Ensuring safety of saturation diving systems',
        ],
        indicative_tasks: ['Offshore life support technician'],
        sort_order: 90,
      },
      {
        level: 6, stream: 'offshore_divers',
        title: 'OMB Operations — Senior Operator',
        description: 'Senior operator in one-man-bell (OMB) operations.',
        duties: [
          'Operating one-man-bell diving systems',
          'Supervising OMB diving operations',
          'Managing OMB equipment and safety',
        ],
        indicative_tasks: ['OMB operations senior operator'],
        sort_order: 100,
      },
      {
        level: 7, stream: 'offshore_divers',
        title: 'Hyperbaric Welder',
        description: 'Offshore hyperbaric welder. Performs welding in hyperbaric offshore environments.',
        duties: [
          'Performing hyperbaric welding in offshore environments',
          'Welding underwater structures and pipelines',
          'Operating specialist offshore welding equipment',
        ],
        indicative_tasks: ['Offshore hyperbaric welder'],
        sort_order: 110,
      },
      {
        level: 8, stream: 'offshore_divers',
        title: 'Diving Supervisor',
        description: 'Offshore diving supervisor. Supervises offshore diving operations.',
        duties: [
          'Supervising offshore diving operations',
          'Managing offshore dive teams',
          'Ensuring compliance with offshore diving safety regulations',
        ],
        indicative_tasks: ['Offshore diving supervisor'],
        sort_order: 120,
      },
      {
        level: 9, stream: 'offshore_divers',
        title: 'ADS Operations — Supervisor',
        description: 'Supervisor of atmospheric diving suit (ADS) operations.',
        duties: [
          'Supervising ADS diving operations',
          'Managing ADS dive teams and equipment',
          'Coordinating ADS operational safety',
        ],
        indicative_tasks: ['ADS operations supervisor'],
        sort_order: 130,
      },
      {
        level: 10, stream: 'offshore_divers',
        title: 'Diving Superintendent',
        description: 'Offshore diving superintendent. Manages all diving operations.',
        duties: [
          'Managing all offshore diving operations',
          'Overseeing diving safety and compliance',
          'Coordinating with vessel operations and clients',
        ],
        indicative_tasks: ['Offshore diving superintendent'],
        sort_order: 140,
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
    // Source: FWO pay guide MA000108, effective 1 July 2025.
    // Inshore divers — FT hourly rates from PDF.
    // Offshore divers — FT hourly rates from PDF.
    // Casual rates from PDF (offshore) or base x 1.25 (inshore).
    const baseRates = {
      '1_inshore_divers': 27.77,
      '2_inshore_divers': 33.78,
      '3_inshore_divers': 35.33,
      '4_inshore_divers': 45.53,
      '1_offshore_divers': 50.81,
      '2_offshore_divers': 58.95,
      '3_offshore_divers': 58.95,   // ADS Operations Operator — same rate as Diver
      '4_offshore_divers': 63.31,   // Systems Maintenance Technician
      '5_offshore_divers': 67.93,   // Life Support Technician
      '6_offshore_divers': 67.93,   // OMB Operations Senior Operator — same rate as Life Support Tech
      '7_offshore_divers': 72.32,   // Hyperbaric Welder
      '8_offshore_divers': 74.94,   // Diving Supervisor
      '9_offshore_divers': 74.94,   // ADS Operations Supervisor — same rate as Diving Supervisor
      '10_offshore_divers': 80.55,  // Diving Superintendent
    };

    // Offshore casual rates from PDF (not base x 1.25; they use a different formula)
    const offshoreCasualRates = {
      '1_offshore_divers': 30.54,
      '2_offshore_divers': 34.93,
      '3_offshore_divers': 34.93,
      '4_offshore_divers': 37.15,
      '5_offshore_divers': 39.68,
      '6_offshore_divers': 39.68,
      '7_offshore_divers': 41.85,
      '8_offshore_divers': 43.36,
      '9_offshore_divers': 43.36,
      '10_offshore_divers': 46.40,
    };

    // Inshore casual rates from PDF
    const inshoreCasualRates = {
      '1_inshore_divers': 34.71,
      '2_inshore_divers': 42.23,
      '3_inshore_divers': 44.16,
      '4_inshore_divers': 56.91,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.level}_${cls.stream}`;
      const baseRate = baseRates[key];
      if (!baseRate) continue;

      const casualRate = cls.stream === 'offshore_divers'
        ? offshoreCasualRates[key]
        : inshoreCasualRates[key];

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);
      }

      if (casualRate) {
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
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ─────────────────────────────────────────────────────────
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
        multiplier: 2, addition_per_hour: null,
        description: 'Monday to Saturday — after 2 hours — full-time x2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — all day — full-time x2',
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
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — x1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — x2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — x2.5',
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — x1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — x2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Casual x2.5',
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
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (x2.0)' },
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
        allowance_type: 'clothing_casual',
        name: 'Clothing and equipment allowance — Casual employees',
        description: 'Clothing and equipment allowance for casual employees.',
        trigger_condition: 'Casual employees as per award conditions',
        amount: 8.75, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'clothing_fulltime',
        name: 'Clothing and equipment allowance — Full-time employees',
        description: 'Clothing and equipment allowance for full-time employees.',
        trigger_condition: 'Full-time employees as per award conditions',
        amount: 108.61, amount_type: 'fixed', per_unit: 'per_month',
      },
      {
        allowance_type: 'distant_work_accommodation',
        name: 'Distant work allowance — Accommodation and meals',
        description: 'Allowance for accommodation and meals when working away from home.',
        trigger_condition: 'Working distant from home as per award conditions',
        amount: 487.71, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'distant_work_broken',
        name: 'Distant work allowance — Accommodation and meals (broken parts of the week)',
        description: 'Daily rate for broken parts of the week when working distant.',
        trigger_condition: 'Working distant from home, broken parts of the week',
        amount: 69.73, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'distant_work_expenses',
        name: 'Distant work allowance — Expenses',
        description: 'Expenses allowance for distant work.',
        trigger_condition: 'Working distant from home as per award conditions',
        amount: 9.34, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Distant work allowance — Use of own vehicle',
        description: 'Vehicle allowance for using own vehicle for work purposes.',
        trigger_condition: 'Using own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
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
        question_key: 'a108_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select whether you work in inshore or offshore diving operations.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'inshore_divers', answer_text: 'Inshore divers', sort_order: 1 },
          { answer_key: 'offshore_divers', answer_text: 'Offshore divers', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a108_inshore_level',
        question_text: 'What is your classification?',
        help_text: 'Select the classification that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a108_stream',
        parent_answer_key: 'inshore_divers',
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Diver\'s Attendant', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Diver', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Hyperbaric Welder', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Diving Supervisor', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a108_offshore_level',
        question_text: 'What is your classification?',
        help_text: 'Select the classification that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a108_stream',
        parent_answer_key: 'offshore_divers',
        sort_order: 3,
        answers: [
          { answer_key: 'level_1', answer_text: 'Diver\'s Attendant', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Diver', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'ADS Operations — Operator', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Systems Maintenance Technician', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Life Support Technician', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'OMB Operations — Senior Operator', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Hyperbaric Welder', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Diving Supervisor', sort_order: 8 },
          { answer_key: 'level_9', answer_text: 'ADS Operations — Supervisor', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Diving Superintendent', sort_order: 10 },
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
    console.log('\n✅ MA000108 seed complete');
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
