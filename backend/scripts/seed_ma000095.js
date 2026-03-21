/**
 * Seed script — Car Parking Award 2020 [MA000095]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000095
 *
 * Classification structure (single stream 'car_parking', 3 levels):
 *   Level 1 — Entry-level parking officer, basic duties under supervision
 *   Level 2 — Experienced officer, cash handling, works independently
 *   Level 3 — Senior officer, supervises others, manages operations
 *
 * Adult rates (FT/PT):
 *   L1: $25.52  L2: $26.33  L3: $27.30
 * Casual rates (FT rate × 1.25):
 *   L1: $31.90  L2: $32.91  L3: $34.13
 *
 * Penalty rates (FT/PT — day worker):
 *   Weekday ordinary:            ×1.00
 *   Afternoon shift Mon–Fri:     ×1.125
 *   Night shift Mon–Fri:         ×1.125
 *   Permanent night shift Mon–Fri: ×1.25
 *   Saturday (day worker):       ×1.50
 *   Sunday (day worker):         ×2.00
 *   Public holiday:              ×2.50
 *
 * Penalty rates (casual, applied to casual base rate):
 *   Mon–Fri ordinary:            ×1.00
 *   Afternoon/Night shift Mon–Fri: ×1.10 of casual base
 *   Permanent night Mon–Fri:     ×1.20 of casual base
 *   Saturday (day worker):       ×1.40 of casual base
 *   Sunday (day worker):         ×1.80 of casual base
 *   Public holiday:              ×2.20 of casual base
 *
 * Overtime (FT/PT Mon–Sat):
 *   First 2 hours: ×1.50
 *   After 2 hours: ×2.00
 *
 * Overtime (Casual):
 *   First 2 hours: ×1.40 of casual base
 *   After 2 hours: ×1.80 of casual base
 *
 * No junior rates.
 * Minimum engagement: 3 hours casual.
 *
 * Run after migrate.js: node scripts/seed_ma000095.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000095';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ─────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Car Parking Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000095-summary',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000095 has one stream ('car_parking') with 3 levels.
    const classifications = [
      {
        level: 1, stream: 'car_parking',
        title: 'Car Parking Officer Level 1',
        description: 'Entry-level parking officer. Collects fees, directs traffic, basic customer service. Under supervision.',
        duties: [
          'Collecting parking fees and issuing tickets',
          'Directing traffic within car parks',
          'Providing basic customer service and directions',
          'Monitoring car park entry and exit points',
          'Reporting incidents and irregularities to supervisor',
          'Performing duties under direct supervision',
        ],
        indicative_tasks: ['Car park attendant', 'Parking officer (entry level)', 'Ticket booth operator', 'Traffic director'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'car_parking',
        title: 'Car Parking Officer Level 2',
        description: 'Experienced officer. Cash handling, minor maintenance, some supervisory duties. Works independently.',
        duties: [
          'All Level 1 duties',
          'Cash handling, reconciliation, and banking procedures',
          'Minor maintenance of parking equipment and facilities',
          'Some supervisory duties over Level 1 officers',
          'Handling customer complaints and queries independently',
          'Working independently without direct supervision',
        ],
        indicative_tasks: ['Senior parking attendant', 'Cash handling officer', 'Parking supervisor (small site)', 'Experienced car park operator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'car_parking',
        title: 'Car Parking Officer Level 3',
        description: 'Senior officer. Supervises others, handles complaints, manages operations. May train other staff.',
        duties: [
          'All Level 1 and Level 2 duties',
          'Supervising and coordinating other parking officers',
          'Handling escalated complaints and complex customer issues',
          'Managing daily car park operations',
          'Training and mentoring other staff',
          'Preparing operational reports and documentation',
        ],
        indicative_tasks: ['Car park supervisor', 'Senior parking officer', 'Operations coordinator', 'Shift manager (car parking)'],
        sort_order: 30,
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

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWO pay guide MA000095, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      1: 25.52,
      2: 26.33,
      3: 27.30,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (!baseRate) continue;

      const casualRate = parseFloat((baseRate * 1.25).toFixed(4));

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

    // ── Penalty rates ──────────────────────────────────────────────────────────
    // Source: MA000095 pay guide, effective 1 July 2025.
    //
    // FT/PT multipliers (day worker):
    //   Weekday ordinary:            ×1.00
    //   Afternoon shift Mon–Fri:     ×1.125 ($28.71/$25.52)
    //   Night shift Mon–Fri:         ×1.125 ($28.71/$25.52)
    //   Permanent night shift Mon–Fri: ×1.25 ($31.90/$25.52)
    //   Saturday:                    ×1.50
    //   Sunday:                      ×2.00
    //   Public holiday:              ×2.50
    //
    // Casual multipliers (applied to casual base = FT × 1.25):
    //   Mon–Fri ordinary:            ×1.00
    //   Afternoon/Night shift:       ×1.10 of casual ($35.09/$31.90)
    //   Permanent night:             ×1.20 of casual ($38.28/$31.90)
    //   Saturday:                    ×1.40 of casual ($44.66/$31.90)
    //   Sunday:                      ×1.80 of casual ($57.42/$31.90)
    //   Public holiday:              ×2.20 of casual ($70.18/$31.90)

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.125, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri — ×1.125',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Night shift',
        multiplier: 1.125, addition_per_hour: null,
        description: 'Night shift Mon–Fri — ×1.125',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — ×1.50',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },

      // ── Part-time (same as full-time) ────────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.125, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri — ×1.125',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Night shift',
        multiplier: 1.125, addition_per_hour: null,
        description: 'Night shift Mon–Fri — ×1.125',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — ×1.50',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },

      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Casual afternoon shift Mon–Fri — ×1.10 of casual base ($35.09/$31.90)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Night shift',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Casual night shift Mon–Fri — ×1.10 of casual base ($35.09/$31.90)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Saturday — ×1.40 of casual base ($44.66/$31.90)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual Sunday — ×1.80 of casual base ($57.42/$31.90)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base ($70.18/$31.90)',
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

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Source: MA000095 pay guide — Overtime.
    //
    // FT/PT overtime (Mon–Sat):
    //   First 2 hours: ×1.50
    //   After 2 hours: ×2.00
    //
    // Casual overtime (applied to casual base = FT × 1.25):
    //   First 2 hours: ×1.40 of casual base ($44.66/$31.90)
    //   After 2 hours: ×1.80 of casual base ($57.42/$31.90)

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 2 hours (×1.40 of casual base)' },
      { employment_type: 'casual',     threshold_hours: 40, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 40 hours (×1.80 of casual base)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ─────────────────────────────────────────────────────────────
    // Source: MA000095 pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and your employer has appointed you as the person responsible for first aid, you receive $0.67 per hour (up to a maximum of $25.41 per week).',
        trigger_condition: 'Appointed by employer as the responsible first aider, and holding a current first aid certificate',
        amount: 0.67, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry_ft',
        name: 'Laundry allowance (full-time)',
        description: 'If your employer requires you to launder your own uniform or special clothing, you are entitled to a weekly laundry allowance of $16.85.',
        trigger_condition: 'Full-time employee required to launder own uniform',
        amount: 16.85, amount_type: 'weekly', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry_ptcasual',
        name: 'Laundry allowance (part-time or casual)',
        description: 'If your employer requires you to launder your own uniform or special clothing, you are entitled to a per-shift laundry allowance of $3.31.',
        trigger_condition: 'Part-time or casual employee required to launder own uniform',
        amount: 3.31, amount_type: 'per_occurrence', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime, you are entitled to a meal allowance of $13.18 per meal period during overtime.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 13.18, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'accommodation',
        name: 'Accommodation reimbursement',
        description: 'If your employer requires you to stay away from home overnight for work, you are entitled to reimbursement of the demonstrable cost of suitable accommodation.',
        trigger_condition: 'Employer-directed overnight stay away from usual residence',
        amount: null, amount_type: 'reimbursement', per_unit: 'per_night',
        is_all_purpose: false,
      },
      {
        allowance_type: 'transfer_travel_time',
        name: 'Transfer travel time allowance',
        description: 'If your employer requires you to transfer to a different work location, you are entitled to payment at the appropriate rate for the time spent travelling.',
        trigger_condition: 'Employer-directed transfer travel between work locations',
        amount: null, amount_type: 'at_ordinary_rate', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'transfer_travel_costs',
        name: 'Transfer travel costs reimbursement',
        description: 'If your employer requires you to transfer to a different work location, you are entitled to reimbursement of reasonable travel costs.',
        trigger_condition: 'Employer-directed transfer travel between work locations',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
    ];

    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, is_all_purpose, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          amount = EXCLUDED.amount,
          is_all_purpose = EXCLUDED.is_all_purpose
      `, [
        AWARD_CODE, a.allowance_type, a.name, a.description,
        a.trigger_condition, a.amount, a.amount_type, a.per_unit,
        a.is_all_purpose, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    // Rest break: Paid 10-minute rest break every 4 hours.
    // Meal break: Unpaid 30 minutes after 5 hours of work.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for each 4-hour block of work.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of 30 minutes.',
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
    // Single question: parking_level — which best describes your role?
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'parking_level',
        question_text: 'Which best describes your role?',
        help_text: 'Level 1 is for entry-level parking officers working under supervision. Level 2 applies to experienced officers who handle cash and work independently. Level 3 is for senior officers who supervise others and manage operations.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'level1', answer_text: 'Level 1 — Entry-level car parking officer, basic duties under supervision', sort_order: 1 },
          { answer_key: 'level2', answer_text: 'Level 2 — Experienced officer, cash handling, works independently', sort_order: 2 },
          { answer_key: 'level3', answer_text: 'Level 3 — Senior officer, supervises others, manages operations', sort_order: 3 },
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
    console.log('\n✅ MA000095 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
