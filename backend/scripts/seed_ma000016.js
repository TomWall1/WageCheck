/**
 * Seed script — Security Services Industry Award 2020 [MA000016]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Source: Fair Work Ombudsman pay guide MA000016, effective 1 July 2025
 *
 * Run after migrate.js: node scripts/seed_ma000016.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000016';
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
      'Security Services Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000016-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000016 uses a single stream ('security') with 5 levels.

    const classifications = [
      {
        level: 1, stream: 'security',
        title: 'Security Officer Level 1',
        description: 'Entry-level security officer performing basic duties such as static guarding, gatehouse duties, crowd control, and patrolling.',
        duties: [
          'Static guarding of premises and property',
          'Gatehouse duties including visitor sign-in and vehicle checks',
          'Crowd control at events and venues',
          'Patrolling designated areas on foot or by vehicle',
          'Monitoring CCTV under supervision',
          'Reporting incidents and completing basic incident logs',
        ],
        indicative_tasks: ['Security guard (new)', 'Static guard', 'Crowd controller (entry)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'security',
        title: 'Security Officer Level 2',
        description: 'Security officer with at least 12 months experience or holding additional certifications. Can work independently and handle incidents.',
        duties: [
          'Performing all Level 1 duties independently without supervision',
          'Handling security incidents and preparing detailed incident reports',
          'Operating basic security systems and alarm panels',
          'Conducting risk assessments of assigned posts',
          'Liaising with clients and the public on security matters',
          'Holding additional certifications (e.g. CPP20218 Certificate II in Security Operations)',
        ],
        indicative_tasks: ['Security officer (experienced)', 'Mobile patrol officer', 'Alarm response officer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'security',
        title: 'Security Officer Level 3',
        description: 'Senior security officer responsible for a specific post, able to operate security systems and coordinate with emergency services.',
        duties: [
          'Managing a specific security post or location',
          'Operating and monitoring integrated security systems (CCTV, access control, alarms)',
          'Coordinating with emergency services during incidents',
          'Training and mentoring junior security officers',
          'Conducting detailed security assessments and audits',
          'Preparing comprehensive security reports for management',
        ],
        indicative_tasks: ['Senior security officer', 'Control room operator', 'Post manager'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'security',
        title: 'Security Officer Level 4',
        description: 'Leading security officer overseeing a team on shift, managing access control, and handling security incidents independently.',
        duties: [
          'Overseeing a team of security officers on shift',
          'Managing access control systems and procedures',
          'Handling all security incidents independently and making operational decisions',
          'Conducting shift briefings and debriefings',
          'Monitoring team performance and providing feedback',
          'Liaising with site management on security operations',
        ],
        indicative_tasks: ['Leading security officer', 'Shift leader', 'Team leader (security)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'security',
        title: 'Security Officer Level 5',
        description: 'Supervisor/controller managing security operations across a site or multiple sites, responsible for rostering and incident management.',
        duties: [
          'Managing security operations across a site or multiple sites',
          'Preparing and managing rosters for security staff',
          'Overall responsibility for incident management and reporting',
          'Developing and implementing security procedures and protocols',
          'Managing relationships with clients and stakeholders',
          'Conducting performance reviews and managing staff development',
        ],
        indicative_tasks: ['Security supervisor', 'Site controller', 'Operations supervisor'],
        sort_order: 50,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
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
    // Source: FWO pay guide MA000016, effective 1 July 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 27.13,
      2: 27.91,
      3: 28.38,
      4: 28.86,
      5: 29.79,
    };

    const casualRates = {
      1: 33.91,
      2: 34.89,
      3: 35.48,
      4: 36.08,
      5: 37.24,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (!baseRate) continue;

      const casualRate = casualRates[cls.level];

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
    // Source: MA000016 — Penalty rates
    //
    // FT/PT penalty multipliers:
    //   Weekday ordinary:                      ×1.0
    //   Night span (18:00–06:00 Mon–Fri):      ×1.217
    //   Saturday:                              ×1.5
    //   Sunday:                                ×2.0
    //   Public holiday:                        ×2.5
    //
    // Casual penalty multipliers (applied to casual base rate which already includes 25% loading):
    //   Night span (18:00–06:00 Mon–Fri):      ×1.1736
    //   Saturday:                              ×1.4
    //   Sunday:                                ×1.8
    //   Public holiday:                        ×2.2

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '06:00',
        time_band_label: 'night_span_6pm_to_6am',
        multiplier: 1.217, addition_per_hour: null,
        description: 'Night span (Mon–Fri 6pm–6am) — ×1.217',
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
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.0',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '06:00',
        time_band_label: 'night_span_6pm_to_6am',
        multiplier: 1.217, addition_per_hour: null,
        description: 'Night span (Mon–Fri 6pm–6am) — ×1.217',
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
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.0',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading. Multipliers relative to casual base.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '06:00',
        time_band_label: 'night_span_6pm_to_6am',
        multiplier: 1.1736, addition_per_hour: null,
        description: 'Casual night span (Mon–Fri 6pm–6am) — ×1.1736 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.4, addition_per_hour: null,
        description: 'Casual Saturday — ×1.4 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Casual Sunday — ×1.8 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.2, addition_per_hour: null,
        description: 'Casual public holiday — ×2.2 of casual base',
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
    // MA000016 — Overtime
    // FT/PT: Daily threshold 7.6hr — first 2hr ×1.5, after ×2.0
    //        Weekly threshold 38hr — first 2hr ×1.5, after ×2.0
    // Casual: Daily threshold 7.6hr — first 2hr ×1.2, after ×1.6
    //         Weekly threshold 38hr — first 2hr ×1.2, after ×1.6
    // Note: Casual OT rates are based on FT rates (expressed as multipliers of casual base).
    const overtimeRates = [
      // ── Full-time ────────────────────────────────────────────────────────
      {
        employment_type: 'full_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Daily overtime — first 2 hours over 7.6 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 2.0,
        description: 'Daily overtime — after 9.6 hours (×2.0)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Weekly overtime — after 40 hours (×2.0)',
      },
      // ── Part-time ────────────────────────────────────────────────────────
      {
        employment_type: 'part_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Part-time daily overtime — first 2 hours over 7.6 (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 2.0,
        description: 'Part-time daily overtime — after 9.6 hours (×2.0)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time weekly overtime — after 40 hours (×2.0)',
      },
      // ── Casual ───────────────────────────────────────────────────────────
      {
        employment_type: 'casual',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.2,
        description: 'Casual daily overtime — first 2 hours over 7.6 (×1.2 of casual base)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 1.6,
        description: 'Casual daily overtime — after 9.6 hours (×1.6 of casual base)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.2,
        description: 'Casual weekly overtime — first 2 hours over 38 (×1.2 of casual base)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 40, period: 'weekly',
        multiplier: 1.6,
        description: 'Casual weekly overtime — after 40 hours (×1.6 of casual base)',
      },
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
    // Source: MA000016 — Allowances; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid qualification, you are entitled to a per-shift first aid allowance (max $36.46/week).',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 7.33, amount_type: 'per_shift', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and are not given a meal break, you are entitled to a meal allowance.',
        trigger_condition: 'Required to work overtime without a meal break',
        amount: 21.27, amount_type: 'per_shift', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own car for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own motorcycle for work purposes',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'firearm',
        name: 'Firearm allowance',
        description: 'If you are required to carry a firearm as part of your duties, you are entitled to a per-shift firearm allowance (max $18.34/week).',
        trigger_condition: 'Required to carry a firearm on duty',
        amount: 3.67, amount_type: 'per_shift', per_unit: 'per_shift',
      },
      {
        allowance_type: 'aviation',
        name: 'Aviation allowance',
        description: 'If you are required to perform security duties at an airport or aviation facility, you are entitled to an hourly aviation allowance.',
        trigger_condition: 'Performing security duties at an airport or aviation facility',
        amount: 2.02, amount_type: 'per_hour', per_unit: 'per_hour',
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
    // MA000016 — Breaks
    // Rest break: 10 min paid per 4 hours worked.
    // Meal break: 30 min unpaid after 5 hours.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break per 4 hours worked.',
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
    // Single question — no parent gating needed.
    // Q1: security_level — "What is your classification level?"
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'security_level',
        question_text: 'What is your classification level?',
        help_text: 'Security officers are classified from Level 1 (entry) to Level 5 (supervisor/controller). Choose the level that best matches your role and responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'level_1', answer_text: 'Level 1 — entry-level security officer (static guarding, patrols, crowd control)', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Level 2 — experienced security officer (12+ months, additional certifications)', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Level 3 — senior security officer (systems operation, post management)', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Level 4 — leading security officer (team oversight, shift management)', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Level 5 — supervisor/controller (site operations, multi-site management)', sort_order: 5 },
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
    console.log('\n✅ MA000016 seed complete');
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
