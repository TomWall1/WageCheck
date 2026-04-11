/**
 * Seed script — Graphic Arts, Printing and Publishing Award 2020 [MA000026]
 * Pay rates effective 31 October 2025
 * Source: Fair Work Ombudsman pay guide, effective 31 October 2025
 *
 * Award covers: employees in the graphic arts, printing, and publishing
 * industry (other than newspaper offices section only).
 *
 * Classification structure (simplified — single 'general' stream, 8 levels):
 *   L1 = Level 1 — $24.28/hr
 *   L2 = Level 2 — $24.95/hr
 *   L3 = Level 3 — $25.85/hr
 *   L4 = Level 4 — $26.70/hr
 *   L5 = Level 5 — $28.12/hr
 *   L6 = Level 6 — $29.00/hr
 *   L7 = Level 7 — $29.88/hr
 *   L8 = Level 8 — $30.68/hr
 *
 * Junior rates: same as MA000009 default — under 17=50%, 17=60%, 18=70%,
 * 19=85%, 20+=adult.
 *
 * Run after migrate.js: node scripts/seed_ma000026.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000026';
const EFFECTIVE_DATE = '2025-10-31';

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
      'Graphic Arts, Printing and Publishing Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000026-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Single 'general' stream with 8 levels (other than newspaper offices).

    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Level 1',
        description: 'Entry-level employee performing basic tasks under direct supervision. You are new to the graphic arts, printing, or publishing industry.',
        duties: [
          'Performing basic manual tasks under direct supervision',
          'Sorting, collating, and packaging printed materials',
          'Loading and unloading stock and materials',
          'General cleaning and housekeeping of work areas',
          'Operating simple equipment after basic training',
          'Following written and verbal instructions',
        ],
        indicative_tasks: ['New industry worker', 'General hand', 'Packer', 'Warehouse assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Level 2',
        description: 'Employee with some experience performing routine tasks with limited supervision. You can operate basic equipment and follow established procedures.',
        duties: [
          'Operating basic printing or finishing equipment',
          'Performing routine quality checks on output',
          'Basic machine feeding, stacking, and monitoring',
          'Stock handling and inventory tasks',
          'Following production schedules and job tickets',
          'Assisting higher-level operators with setup',
        ],
        indicative_tasks: ['Machine assistant', 'Bindery worker', 'Print finisher (basic)', 'Stock controller'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'general',
        title: 'Level 3',
        description: 'Skilled employee who can work independently on a range of tasks. You have developed competency in your area and require minimal supervision.',
        duties: [
          'Operating a range of printing or finishing equipment independently',
          'Setting up machines for standard production runs',
          'Performing quality control throughout production',
          'Basic troubleshooting of equipment issues',
          'Data entry and basic pre-press tasks',
          'Training Level 1 and 2 employees in basic tasks',
        ],
        indicative_tasks: ['Machine operator (basic)', 'Digital print operator', 'Finishing operator', 'Pre-press assistant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'general',
        title: 'Level 4',
        description: 'Experienced employee with technical skills in printing, publishing, or graphic arts. You work with a high degree of independence.',
        duties: [
          'Operating complex printing or finishing equipment',
          'Performing colour matching and quality adjustments',
          'Setting up and calibrating equipment for production runs',
          'Diagnosing and resolving production issues',
          'Pre-press file preparation and proofing',
          'Maintaining production records and reports',
        ],
        indicative_tasks: ['Experienced machine operator', 'Pre-press technician', 'Estimator (junior)', 'Production coordinator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'general',
        title: 'Level 5',
        description: 'Trade-qualified or highly experienced employee. You hold relevant trade qualifications or have equivalent experience and skills.',
        duties: [
          'Performing trade-level printing, pre-press, or finishing work',
          'Advanced colour management and calibration',
          'Complex machine setup and operation across multiple equipment types',
          'Training and supervising less experienced employees',
          'Quality assurance and process improvement',
          'Customer liaison on technical specifications',
        ],
        indicative_tasks: ['Qualified printer', 'Trade-qualified pre-press operator', 'Graphic designer (trade)', 'Senior machine operator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'general',
        title: 'Level 6',
        description: 'Senior trade-qualified employee with additional responsibilities. You have advanced technical skills and may supervise a team.',
        duties: [
          'Advanced trade-level work requiring specialist knowledge',
          'Supervising a team of trade and non-trade employees',
          'Managing complex production workflows',
          'Advanced troubleshooting and equipment maintenance',
          'Developing and implementing production procedures',
          'Estimating and job costing',
        ],
        indicative_tasks: ['Senior printer', 'Production supervisor', 'Senior pre-press operator', 'Estimator'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'general',
        title: 'Level 7',
        description: 'Leading hand or specialist with high-level technical expertise. You coordinate work across a section or hold advanced specialist qualifications.',
        duties: [
          'Coordinating work across a production section',
          'Advanced specialist technical work',
          'Mentoring and training trade-qualified staff',
          'Production planning and scheduling',
          'Managing quality systems and compliance',
          'Liaising with clients on complex technical requirements',
        ],
        indicative_tasks: ['Leading hand', 'Technical specialist', 'Production planner', 'Senior estimator'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'general',
        title: 'Level 8',
        description: 'Supervisor or senior specialist with the highest level of responsibility under the award. You oversee significant production areas or hold advanced specialist qualifications.',
        duties: [
          'Supervising multiple production teams or departments',
          'Overall responsibility for production quality and output',
          'Budget management and cost control for production area',
          'Strategic production planning and capacity management',
          'Managing staff performance, training, and development',
          'Ensuring regulatory compliance across all operations',
        ],
        indicative_tasks: ['Production manager', 'Senior supervisor', 'Operations coordinator', 'Technical manager'],
        sort_order: 80,
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
    // Source: FWO pay guide, effective 31 October 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 24.28,
      2: 24.95,
      3: 25.85,
      4: 26.70,
      5: 28.12,
      6: 29.00,
      7: 29.88,
      8: 30.68,
    };

    // Casual rates (FT × 1.25, as published):
    const casualRates = {
      1: 30.35,
      2: 31.19,
      3: 32.31,
      4: 33.38,
      5: 35.15,
      6: 36.25,
      7: 37.35,
      8: 38.35,
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
    // Source: MA000026 pay guide — "other than newspaper offices" section.
    //
    // FT/PT:
    //   Saturday or Sunday (agreed ordinary hours): ×2.00
    //   Public holiday: ×2.50
    //   Morning/afternoon/night shift Mon–Fri: ×1.20
    //   Non-rotating night shift: ×1.30
    //
    // Casual (multiplied against casual base which includes 25% loading):
    //   Saturday or Sunday: ×2.00 of casual base
    //   Public holiday: ×2.50 of casual base
    //   Shift Mon–Fri: ×1.20 of casual base
    //   Non-rotating night shift: ×1.30 of casual base

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty (day work Mon–Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'shift_mon_fri',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Morning/afternoon/night shift Mon–Fri — ×1.20 (rotating shift)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'non_rotating_night',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Non-rotating night shift Mon–Fri — ×1.30',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Saturday — ×2.00 penalty rate',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00 penalty rate',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 penalty rate',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty (day work Mon–Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'shift_mon_fri',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Morning/afternoon/night shift Mon–Fri — ×1.20 (rotating shift)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'non_rotating_night',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Non-rotating night shift Mon–Fri — ×1.30',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Saturday — ×2.00 penalty rate',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00 penalty rate',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 penalty rate',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'shift_mon_fri',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual shift Mon–Fri — ×1.20 of casual base rate (rotating shift)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: 'non_rotating_night',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Casual non-rotating night shift Mon–Fri — ×1.30 of casual base rate',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual Saturday — ×2.00 of casual base rate',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual Sunday — ×2.00 of casual base rate',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Casual public holiday — ×2.50 of casual base rate',
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
    // Mon–Fri day work: first 3 hours ×1.50, after 3 hours ×2.00.
    // Weekly threshold: 38 hours, second band: 41 hours (3hr band).
    // No casual overtime specified.

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
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
    // Source: MA000026 & FWO pay guide, effective 31 October 2025.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 14.62, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work purposes',
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
    //   1. gapp_experience — Are you new to the industry? (new → L1, experienced → Q2)
    //   2. gapp_role — Which best describes your role? (maps to L2–L8)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'gapp_experience',
        question_text: 'How much experience do you have in the graphic arts, printing, or publishing industry?',
        help_text: 'If you are new to the industry with less than 12 months experience, you will be classified as Level 1. Otherwise, the next question will determine your level based on your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'I am new to the industry (less than 12 months experience)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'I have 12 months or more experience', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'gapp_role',
        question_text: 'Which best describes your role and qualifications?',
        help_text: 'Select the option that best matches your current duties, qualifications, and level of responsibility. If unsure, check your employment contract or payslip.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'gapp_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'general', answer_text: 'General worker — routine tasks with limited supervision (operating basic equipment, stock handling)', sort_order: 1 },
          { answer_key: 'skilled', answer_text: 'Skilled worker — independent work on a range of tasks (machine operation, quality control)', sort_order: 2 },
          { answer_key: 'technician', answer_text: 'Technician — technical skills, experienced operator (colour matching, pre-press, complex equipment)', sort_order: 3 },
          { answer_key: 'trade', answer_text: 'Trade-qualified — holding relevant trade qualifications (qualified printer, pre-press operator)', sort_order: 4 },
          { answer_key: 'senior_trade', answer_text: 'Senior trade — advanced trade skills, may supervise others (senior printer, estimator)', sort_order: 5 },
          { answer_key: 'leading', answer_text: 'Leading hand — coordinating a section, specialist technical expertise', sort_order: 6 },
          { answer_key: 'supervisor', answer_text: 'Supervisor — overseeing teams, managing production areas, budget responsibility', sort_order: 7 },
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
    console.log('\n✅ MA000026 seed complete');
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
