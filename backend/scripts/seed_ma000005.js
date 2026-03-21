/**
 * Seed script — Hair and Beauty Industry Award 2020 [MA000005]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide, effective 1 July 2025
 *
 * Award covers: employees in the hair and beauty industry, including
 * hairdressing, barbering, beauty therapy, and nail services.
 *
 * Classification structure:
 *   Internal levels 1–6 map to award levels:
 *   L1 = Level 1 — $26.55/hr ($1,008.90/wk)
 *   L2 = Level 2 — $27.16/hr ($1,032.00/wk)
 *   L3 = Level 3 — $28.12/hr ($1,068.40/wk)
 *   L4 = Level 4 — $28.64/hr ($1,088.20/wk)
 *   L5 = Level 5 — $29.49/hr ($1,120.80/wk)
 *   L6 = Level 6 — $30.55/hr ($1,160.80/wk)
 *
 * Junior rates: under 17=50%, 17=75%, 18+=adult rate
 *
 * Run after migrate.js: node scripts/seed_ma000005.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000005';
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
      'Hair and Beauty Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000005-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000005 has a single 'hair_beauty' stream with 6 levels.

    const classifications = [
      {
        level: 1, stream: 'hair_beauty',
        title: 'Level 1',
        description: 'Entry-level employee in hair and beauty. You perform basic tasks under direct supervision, including reception duties, cleaning, and assisting senior staff.',
        duties: [
          'Greeting clients and managing appointments',
          'Shampooing and preparing clients for services',
          'Cleaning and maintaining salon equipment and workstations',
          'Folding towels and restocking supplies',
          'Assisting senior stylists with basic tasks',
          'General reception and administrative duties',
        ],
        indicative_tasks: ['Salon assistant', 'Receptionist', 'Junior apprentice', 'Trainee'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'hair_beauty',
        title: 'Level 2',
        description: 'Employee who has completed initial training or holds relevant qualifications. You perform hairdressing, barbering, or beauty services with some supervision.',
        duties: [
          'Performing basic hairdressing services (cutting, blow-drying)',
          'Applying hair colours and treatments under guidance',
          'Providing basic beauty treatments (facials, waxing)',
          'Operating salon equipment and tools',
          'Maintaining hygiene and safety standards',
          'Advising clients on products and services',
        ],
        indicative_tasks: ['Junior stylist', 'Junior beautician', 'Qualified apprentice', 'Barber (qualified)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'hair_beauty',
        title: 'Level 3',
        description: 'Experienced and qualified employee. You independently perform a full range of hairdressing or beauty services without supervision.',
        duties: [
          'Performing all hairdressing services independently (cutting, colouring, styling)',
          'Providing advanced beauty treatments',
          'Consulting with clients on styles, treatments, and products',
          'Training and mentoring junior staff',
          'Managing own client bookings and schedules',
          'Ensuring compliance with health and safety regulations',
        ],
        indicative_tasks: ['Stylist', 'Beautician', 'Senior barber', 'Nail technician (experienced)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'hair_beauty',
        title: 'Level 4',
        description: 'Senior employee with specialist skills or additional qualifications. You perform complex or advanced services and may have supervisory responsibilities.',
        duties: [
          'Performing advanced and specialist hair or beauty services',
          'Colour correction and complex chemical treatments',
          'Supervising and coordinating work of other employees',
          'Managing product ordering and stock control',
          'Handling client complaints and service recovery',
          'Contributing to staff training programs',
        ],
        indicative_tasks: ['Senior stylist', 'Senior beautician', 'Colour specialist', 'Salon coordinator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'hair_beauty',
        title: 'Level 5',
        description: 'Manager of a small salon or a specialist with significant industry experience. You manage day-to-day operations and staff in a smaller establishment.',
        duties: [
          'Managing daily salon operations and staff rosters',
          'Recruiting, training, and supervising employees',
          'Managing salon budgets and financial reporting',
          'Ensuring regulatory compliance and workplace safety',
          'Building and maintaining client relationships',
          'Developing marketing and promotional strategies',
        ],
        indicative_tasks: ['Salon manager (small)', 'Senior specialist', 'Head stylist', 'Business manager (small salon)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'hair_beauty',
        title: 'Level 6',
        description: 'Manager of a large salon or multi-site operation. You have overall responsibility for business operations, multiple staff, and strategic direction.',
        duties: [
          'Managing operations across a large salon or multiple locations',
          'Overall responsibility for staff performance and development',
          'Strategic business planning and financial management',
          'Negotiating supplier contracts and managing major budgets',
          'Ensuring compliance across all areas of operations',
          'Representing the business at industry events and with stakeholders',
        ],
        indicative_tasks: ['Salon manager (large)', 'Multi-site manager', 'Operations manager', 'General manager'],
        sort_order: 60,
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
      1: 26.55, // Level 1
      2: 27.16, // Level 2
      3: 28.12, // Level 3
      4: 28.64, // Level 4
      5: 29.49, // Level 5
      6: 30.55, // Level 6
    };

    // Casual rates from pay guide (FT × 1.25, as published):
    const casualRates = {
      1: 33.19,
      2: 33.95,
      3: 35.15,
      4: 35.80,
      5: 36.86,
      6: 38.19,
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
    // Source: MA000005 & FWO pay guide, effective 1 July 2025.
    //
    // FT/PT:
    //   Weekday: ×1.0 (no evening/night penalties)
    //   Saturday 7am–6pm: ×1.33 (time and a third)
    //   Sunday: ×2.0
    //   Public holiday: ×2.50
    //
    // Casual (multiplier of casual base rate):
    //   Weekday ordinary: ×1.0
    //   Weekday before 7am or after 9pm: ×1.20
    //   Saturday 7am–6pm: ×1.264
    //   Saturday outside 7am–6pm: ×1.20
    //   Sunday: ×1.80
    //   Public holiday: ×2.0

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
        time_band_start: '07:00', time_band_end: '18:00', time_band_label: 'day',
        multiplier: 1.33, addition_per_hour: null,
        description: 'Saturday 7am–6pm — time and a third (×1.33)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
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
        time_band_start: '07:00', time_band_end: '18:00', time_band_label: 'day',
        multiplier: 1.33, addition_per_hour: null,
        description: 'Saturday 7am–6pm — time and a third (×1.33)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '07:00', time_band_end: '21:00', time_band_label: 'day',
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual weekday 7am–9pm — ordinary rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'early_morning',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual weekday before 7am — ×1.20 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '21:00', time_band_end: '23:59', time_band_label: 'night',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual weekday after 9pm — ×1.20 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: '07:00', time_band_end: '18:00', time_band_label: 'day',
        multiplier: 1.264, addition_per_hour: null,
        description: 'Casual Saturday 7am–6pm — ×1.264 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'early_morning',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday before 7am — ×1.20 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: '18:00', time_band_end: '23:59', time_band_label: 'evening',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday after 6pm — ×1.20 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual Sunday — ×1.80 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Casual public holiday — ×2.0 of casual base',
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
    // MA000005 — Overtime
    // Mon–Sat first 3 hours: ×1.50, after 3 hours: ×2.00.
    // Sunday: ×2.00.
    // Weekly threshold: 38 hours, second band: 41 hours (3-hour band).
    // Casual overtime is calculated on FT base rate (not casual rate).
    // Casual OT multipliers relative to casual base:
    //   First 3 hrs: 1.50/1.25 = 1.20 of casual base
    //   After 3 hrs: 2.00/1.25 = 1.60 of casual base

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      // Casual: OT is on FT base rate, so relative to casual base (which includes 25% loading):
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 3 hours (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 41, period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 41 hours (×1.60 of casual base = 200% of FT)' },
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
    // Source: MA000005 & FWO pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive a weekly allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 13.89, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'manager',
        name: "Manager's allowance",
        description: 'If you are required to manage a salon or business, you receive a weekly allowance.',
        trigger_condition: 'Required to manage a salon or business',
        amount: 53.42, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance. A second meal allowance applies if overtime exceeds 4 hours.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 23.74, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are required to provide and maintain your own tools and equipment, you receive a weekly allowance.',
        trigger_condition: 'Required to provide and maintain own tools',
        amount: 10.52, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'district',
        name: 'District allowance — Broken Hill',
        description: 'If you work in the Broken Hill district, you receive a weekly district allowance.',
        trigger_condition: 'Working in the Broken Hill district',
        amount: 45.73, amount_type: 'weekly', per_unit: 'per_week',
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
    //   1. hb_experience — how long have you worked in hair and beauty? (new=Level 1, experienced=Q2)
    //   2. hb_role — which best describes your role? (assistant=L1, stylist=L2, senior=L3, specialist=L4, manager_small=L5, manager_large=L6)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'hb_experience',
        question_text: 'How long have you worked in hair and beauty?',
        help_text: 'If you are new to the industry, you will be classified as Level 1. If you have experience, the next question will determine your level based on your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'I am new to hair and beauty (less than 12 months experience)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'I have 12 months or more experience in hair and beauty', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'hb_role',
        question_text: 'Which best describes your role?',
        help_text: 'Select the option that best matches your current duties and qualifications. If unsure, check your employment contract or payslip.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'hb_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'assistant', answer_text: 'Salon assistant — reception, shampooing, cleaning, assisting stylists', sort_order: 1 },
          { answer_key: 'stylist', answer_text: 'Junior stylist/beautician — performing basic services with some supervision', sort_order: 2 },
          { answer_key: 'senior', answer_text: 'Stylist/beautician — independently performing a full range of services', sort_order: 3 },
          { answer_key: 'specialist', answer_text: 'Senior stylist/specialist — advanced services, colour correction, some supervisory duties', sort_order: 4 },
          { answer_key: 'manager_small', answer_text: 'Manager (small salon) — managing daily operations and staff in a small salon', sort_order: 5 },
          { answer_key: 'manager_large', answer_text: 'Manager (large salon) — managing a large salon or multiple locations', sort_order: 6 },
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
    console.log('\n✅ MA000005 seed complete');
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
