/**
 * Seed script — Ambulance and Patient Transport Industry Award 2020 [MA000098]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000098
 *
 * One stream:
 *   ambulance — 8 key operational classifications (Year 1 rates)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   Patient Transport Officer: $29.00   Communications Call Taker: $30.60
 *   Clinical Transport Officer: $29.85   Ambulance Attendant: $32.66
 *   Ambulance Officer: $32.90   Asst Station Officer: $34.92
 *   Station Officer: $36.00   Mechanic: $32.90
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   Saturday: ×1.50 (FT/PT), ×1.50 (casual)
 *   Sunday: ×2.00 (FT/PT), ×2.00 (casual)
 *   Public holiday: ×2.50 (FT/PT), ×2.50 (casual)
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates: None (ambulance roles require qualifications)
 *
 * Allowances:
 *   Meal (OT): $25.13, Meal (away): $20.08, Incidental: $20.18/day
 *
 * Run after migrate.js: node scripts/seed_ma000098.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000098';
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
      'Ambulance and Patient Transport Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000098.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'ambulance',
        fwc_id: 3977,
        title: 'Patient Transport Officer',
        description: 'Entry-level patient transport officer. You transport patients between facilities and provide basic care and comfort during transport.',
        duties: [
          'Transporting patients between hospitals, clinics, and care facilities',
          'Assisting patients in and out of transport vehicles safely',
          'Monitoring patient comfort and reporting changes in condition',
          'Maintaining patient transport vehicles and equipment in clean and ready condition',
        ],
        indicative_tasks: ['Patient transport officer', 'Ambulance transport attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'ambulance',
        fwc_id: 3978,
        title: 'Communications Call Taker',
        description: 'Communications centre employee. You receive emergency and non-emergency calls, assess priority, and dispatch ambulance resources.',
        duties: [
          'Receiving and prioritising emergency and non-emergency calls',
          'Dispatching ambulance crews and coordinating response resources',
          'Maintaining communication with field crews during incidents',
          'Recording and maintaining accurate call and dispatch logs',
        ],
        indicative_tasks: ['Call taker', 'Dispatcher', 'Communications officer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'ambulance',
        fwc_id: 3979,
        title: 'Clinical Transport Officer',
        description: 'Transport officer with clinical training. You provide a higher level of patient care during transport and may administer basic clinical interventions.',
        duties: [
          'Providing clinical care to patients during transport including vital sign monitoring',
          'Administering basic clinical interventions as authorised',
          'Assessing patient condition and escalating to paramedic support when required',
          'Maintaining and checking clinical equipment and medications',
        ],
        indicative_tasks: ['Clinical transport officer', 'Advanced transport attendant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'ambulance',
        fwc_id: 3973,
        title: 'Ambulance Attendant',
        description: 'Qualified ambulance attendant. You work alongside paramedics responding to emergency calls and providing patient care at the scene.',
        duties: [
          'Responding to emergency calls and providing initial patient assessment',
          'Assisting paramedics with clinical procedures and patient management',
          'Operating ambulance vehicles under emergency conditions',
          'Maintaining ambulance equipment, supplies, and vehicle readiness',
        ],
        indicative_tasks: ['Ambulance attendant', 'Emergency medical technician'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'ambulance',
        fwc_id: 3972,
        title: 'Ambulance Officer',
        description: 'Qualified ambulance officer with paramedic-level training. You provide advanced pre-hospital care and lead ambulance crews.',
        duties: [
          'Providing advanced pre-hospital emergency care',
          'Administering medications and performing clinical procedures',
          'Leading ambulance crews and making clinical decisions at scene',
          'Completing patient care records and clinical documentation',
        ],
        indicative_tasks: ['Ambulance officer', 'Paramedic'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'ambulance',
        fwc_id: 3971,
        title: 'Assistant Station Officer',
        description: 'Senior ambulance officer who assists with station management. You supervise crews and support the station officer in operational duties.',
        duties: [
          'Supervising ambulance crews and coordinating shift operations',
          'Assisting the station officer with rostering and resource management',
          'Mentoring and training junior ambulance officers and attendants',
          'Managing station equipment, supplies, and vehicle fleet',
        ],
        indicative_tasks: ['Assistant station officer', 'Deputy station officer', 'Senior paramedic'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'ambulance',
        fwc_id: null,
        title: 'Station Officer',
        description: 'The officer in charge of an ambulance station. You manage all operational, administrative, and clinical activities at the station level.',
        duties: [
          'Managing all station operations including rostering, staffing, and logistics',
          'Overseeing clinical standards and quality of patient care',
          'Conducting performance reviews and managing staff development',
          'Liaising with regional management and other emergency services',
        ],
        indicative_tasks: ['Station officer', 'Station manager'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'ambulance',
        fwc_id: 3982,
        title: 'Mechanic',
        description: 'Qualified mechanic responsible for maintaining and repairing ambulance fleet vehicles and equipment.',
        duties: [
          'Performing scheduled maintenance and repairs on ambulance vehicles',
          'Diagnosing and repairing mechanical, electrical, and hydraulic faults',
          'Maintaining specialised ambulance equipment and stretcher systems',
          'Ensuring vehicles meet roadworthiness and compliance standards',
        ],
        indicative_tasks: ['Fleet mechanic', 'Ambulance vehicle technician'],
        sort_order: 80,
      },
    ];

    // Clear existing classifications for this award
    await client.query(`DELETE FROM classification_answers WHERE question_id IN (SELECT id FROM classification_questions WHERE award_code = $1)`, [AWARD_CODE]);
    await client.query(`DELETE FROM classification_questions WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM pay_rates WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM classifications WHERE award_code = $1`, [AWARD_CODE]);

    // Add fwc_classification_fixed_id column if not present
    await client.query(`ALTER TABLE classifications ADD COLUMN IF NOT EXISTS fwc_classification_fixed_id INTEGER`);

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order, fwc_classification_fixed_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order,
          fwc_classification_fixed_id = EXCLUDED.fwc_classification_fixed_id
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order, c.fwc_id,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWC MAPD API, base_rate_type = Hourly, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      ambulance: { 1: 29.00, 2: 30.60, 3: 29.85, 4: 32.66, 5: 32.90, 6: 34.92, 7: 36.00, 8: 32.90 },
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const streamRates = baseRates[cls.stream];
      if (!streamRates) continue;
      const baseRate = streamRates[cls.level];
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
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual ×1.50 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual ×2.00 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — ×2.50 (incl. loading)' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        null, null, null,
        r.multiplier, null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ─────────────────────────────────────────────────────────
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (×2.00)' },
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
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $25.13.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 25.13, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_away',
        name: 'Meal allowance (away from station)',
        description: 'If you are required to be away from your station at a meal time and cannot return, you are entitled to a meal allowance of $20.08.',
        trigger_condition: 'Away from station at meal time and unable to return',
        amount: 20.08, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'incidental',
        name: 'Incidental allowance',
        description: 'If you are required to stay overnight away from your usual station, you are entitled to an incidental allowance of $20.18 per day.',
        trigger_condition: 'Required to stay overnight away from usual station',
        amount: 20.18, amount_type: 'fixed', per_unit: 'per_day',
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
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No earlier than 1 hour and no later than 6 hours after starting work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.',
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
    // Single-branch question flow:
    //   Q1: ambulance_role — patient transport through mechanic
    const questions = [
      {
        question_key: 'ambulance_role',
        question_text: 'What is your role in the ambulance and patient transport industry?',
        help_text: 'Your classification depends on your qualifications and the type of work you perform. Patient transport officers move patients between facilities. Clinical roles require specific medical qualifications. Communications roles handle dispatch. Mechanics maintain the ambulance fleet.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
    ];

    for (const q of questions) {
      await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (question_key) DO UPDATE SET
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, q.question_key, q.question_text, q.help_text,
        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,
      ]);
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    // ── Classification answers ─────────────────────────────────────────────────
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'ambulance_role', answer_key: 'patient_transport',    answer_text: 'Patient Transport Officer — transporting patients between facilities', sort_order: 1 },
      { question_key: 'ambulance_role', answer_key: 'comms_call_taker',     answer_text: 'Communications Call Taker — receiving calls and dispatching crews', sort_order: 2 },
      { question_key: 'ambulance_role', answer_key: 'clinical_transport',   answer_text: 'Clinical Transport Officer — patient transport with clinical care', sort_order: 3 },
      { question_key: 'ambulance_role', answer_key: 'ambulance_attendant',  answer_text: 'Ambulance Attendant — responding to emergencies alongside paramedics', sort_order: 4 },
      { question_key: 'ambulance_role', answer_key: 'ambulance_officer',    answer_text: 'Ambulance Officer — qualified paramedic providing advanced care', sort_order: 5 },
      { question_key: 'ambulance_role', answer_key: 'asst_station_officer', answer_text: 'Assistant Station Officer — supervising crews and supporting station management', sort_order: 6 },
      { question_key: 'ambulance_role', answer_key: 'station_officer',      answer_text: 'Station Officer — managing all station operations', sort_order: 7 },
      { question_key: 'ambulance_role', answer_key: 'mechanic',             answer_text: 'Mechanic — maintaining and repairing ambulance vehicles', sort_order: 8 },
    ];

    for (const a of answers) {
      const qId = questionIds[a.question_key];
      if (!qId) { console.error(`Question key ${a.question_key} not found`); continue; }
      await client.query(`
        INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
        VALUES ($1, $2, $3, $4)
      `, [qId, a.answer_key, a.answer_text, a.sort_order]);
    }
    console.log(`✓ Inserted ${answers.length} classification answers`);

    await client.query('COMMIT');
    console.log(`\n✓ Seed complete for ${AWARD_CODE}`);
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
