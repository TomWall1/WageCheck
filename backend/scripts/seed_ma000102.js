/**
 * Seed script — Travelling Shows Award 2020 [MA000102]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide, effective 1 July 2025
 *
 * Award covers: employees in the travelling amusement industry, including
 * travelling shows, carnivals, and amusement parks.
 *
 * Classification structure:
 *   Internal levels 1–4 map to award grades:
 *   L1 = Grade 1 — $24.28/hr ($922.70/wk)
 *   L2 = Grade 2 — $25.85/hr ($982.40/wk)
 *   L3 = Grade 3 — $26.70/hr ($1,014.70/wk)
 *   L4 = Grade 4 — $29.00/hr ($1,102.00/wk)
 *
 * Run after migrate.js: node scripts/seed_ma000102.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000102';
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
      'Travelling Shows Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000102-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000102 has a single 'general' stream with 4 grades.

    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Grade 1',
        description: 'Entry-level employee in a travelling show. You perform basic tasks under direct supervision, including general labour, assisting with ride operations, and basic maintenance duties.',
        duties: [
          'General labouring and manual handling tasks',
          'Assisting with the assembly and dismantling of rides and attractions',
          'Basic cleaning and maintenance of show equipment and grounds',
          'Operating simple rides or games under supervision',
          'Loading and unloading show equipment for transport',
          'Following safety procedures and directions from supervisors',
        ],
        indicative_tasks: ['New show worker', 'General labourer', 'Ride assistant', 'Grounds attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Grade 2',
        description: 'Experienced show worker performing skilled tasks with less supervision. You may operate more complex rides, perform mechanical repairs, or handle cash and customer interactions independently.',
        duties: [
          'Operating rides and attractions independently',
          'Performing routine mechanical maintenance and repairs',
          'Handling cash, tickets, and customer enquiries',
          'Supervising Grade 1 employees in basic tasks',
          'Driving show vehicles (non-heavy)',
          'Setting up and testing ride equipment',
        ],
        indicative_tasks: ['Experienced ride operator', 'Show mechanic (non-trade)', 'Cashier/ticket seller', 'Senior show hand'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'general',
        title: 'Grade 3',
        description: 'Trade-qualified or highly skilled employee. You hold relevant trade qualifications or have extensive experience in show operations, maintenance, or technical work.',
        duties: [
          'Trade-level mechanical, electrical, or structural work on rides and attractions',
          'Diagnosing and repairing complex equipment faults',
          'Conducting safety inspections and compliance checks on rides',
          'Training and supervising less experienced employees',
          'Managing specific areas of show operations',
          'Maintaining records of inspections and maintenance',
        ],
        indicative_tasks: ['Trade-qualified mechanic', 'Electrician (show rides)', 'Senior ride technician', 'Show operations coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'general',
        title: 'Grade 4',
        description: 'Supervisory or specialist employee with the highest level of responsibility under the award. You oversee teams, manage complex operations, or hold advanced specialist qualifications.',
        duties: [
          'Supervising a team of employees across multiple grades',
          'Overall responsibility for ride safety and compliance',
          'Managing logistics, transport, and site setup/teardown',
          'Advanced technical and engineering work on rides and structures',
          'Liaising with regulatory authorities and inspectors',
          'Coordinating show schedules and workforce planning',
        ],
        indicative_tasks: ['Show supervisor', 'Chief mechanic', 'Ride safety manager', 'Logistics/transport supervisor'],
        sort_order: 40,
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
    // Source: FWO pay guide, effective 1 July 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading), pre-calculated in pay guide.
    const baseRates = {
      1: 24.28, // Grade 1
      2: 25.85, // Grade 2
      3: 26.70, // Grade 3
      4: 29.00, // Grade 4
    };

    // Casual rates from pay guide (FT × 1.25, as published):
    const casualRates = {
      1: 30.35,
      2: 32.31,
      3: 33.38,
      4: 36.25,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      const casualRate = casualRates[cls.level];
      if (!baseRate) continue;

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
    // Source: MA000102 & FWO pay guide, effective 1 July 2025.
    //
    // Weekday: ordinary rate (×1.0) for FT/PT and casual.
    // Saturday: ordinary rate (×1.0) — no Saturday penalty.
    // No Sunday rate listed in pay guide.
    // Public holiday: ×1.50 (+ additional day off) for FT/PT and casual.
    // No evening/night time bands.

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Public holiday — ×1.50 (plus additional day off)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Public holiday — ×1.50 (plus additional day off)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Casual public holiday — ×1.50 (plus additional day off)',
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
    // MA000102 — Overtime
    // First 2 hours: ×1.50, after 2 hours: ×2.00.
    // Weekly threshold: 38 hours, second band: 40 hours.
    // Casual overtime is calculated on FT base rate (not casual rate).
    // Casual OT multipliers relative to casual base:
    //   First 2 hrs: 1.50/1.25 = 1.20 of casual base
    //   After 2 hrs: 2.00/1.25 = 1.60 of casual base

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual: OT is on FT base rate, so relative to casual base (which includes 25% loading):
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 2 hours (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 40 hours (×1.60 of casual base = 200% of FT)' },
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
    // Source: MA000102 & FWO pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'heavy_vehicle',
        name: 'Driver heavy vehicle allowance',
        description: 'If you are required to drive a heavy vehicle as part of your duties, you receive a daily allowance.',
        trigger_condition: 'Required to drive a heavy vehicle',
        amount: 14.74, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive an hourly allowance (maximum $19.65 per week).',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 0.52, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'laundry',
        name: 'Laundry allowance',
        description: 'If you are required to launder your own uniform or special clothing, you receive a weekly laundry allowance.',
        trigger_condition: 'Required to launder own uniform or special clothing',
        amount: 7.20, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 16.03, amount_type: 'fixed', per_unit: 'per_meal',
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
    // Rest: 10 min paid per 4 hours worked.
    // Meal: 30 min unpaid after 5 hours.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Once in each 4-hour period of work',
        description: 'You are entitled to a paid 10-minute rest break in each 4-hour work period.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must get an unpaid meal break of at least 30 minutes.',
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
    // Two-question flow:
    //   1. ts_experience — how long have you been working in travelling shows? (new=Grade 1, experienced=Q2)
    //   2. ts_role — which best describes your role? (general_labour=Grade 1, skilled=Grade 2, trade_qualified=Grade 3, supervisor=Grade 4)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'ts_experience',
        question_text: 'How long have you been working in travelling shows?',
        help_text: 'If you are new to the industry, you will be classified as Grade 1. If you have experience, the next question will determine your grade based on your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'I am new to travelling shows (less than 12 months experience)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'I have 12 months or more experience in travelling shows', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'ts_role',
        question_text: 'Which best describes your role?',
        help_text: 'Select the option that best matches your current duties and qualifications. If unsure, check your employment contract or payslip.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'ts_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'general_labour', answer_text: 'General labour — basic tasks, assisting with rides, cleaning, loading/unloading', sort_order: 1 },
          { answer_key: 'skilled', answer_text: 'Skilled worker — operating rides independently, routine maintenance, handling cash', sort_order: 2 },
          { answer_key: 'trade_qualified', answer_text: 'Trade-qualified — holding a relevant trade qualification (mechanic, electrician, etc.)', sort_order: 3 },
          { answer_key: 'supervisor', answer_text: 'Supervisor — overseeing teams, managing operations, advanced specialist duties', sort_order: 4 },
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
    console.log('\n✅ MA000102 seed complete');
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
