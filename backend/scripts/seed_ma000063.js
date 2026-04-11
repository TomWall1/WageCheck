/**
 * Seed script — Passenger Vehicle Transportation Award 2020 [MA000063]
 * Pay rates effective 3 October 2025 (published by FWO)
 * Source: Fair Work Ombudsman pay guide MA000063
 *
 * KEY — No all-purpose allowances in this award.
 *
 * Adult rates (FT/PT):
 *   G1: $26.10  G2: $26.70  G3: $28.21  G4: $29.20  G5: $30.81  G6: $32.17
 * Casual rates (FT rate × 1.25):
 *   G1: $32.63  G2: $33.38  G3: $35.26  G4: $36.50  G5: $38.51  G6: $40.21
 *
 * Penalty rates (FT/PT — not two driver operation):
 *   Weekday ordinary:           ×1.00
 *   Early/late (before 6am / after 7pm Mon–Fri): ×1.15
 *   Saturday:                   ×1.50
 *   Sunday:                     ×2.00
 *   Public holiday:             ×2.50
 *
 * Penalty rates (Casual — not two driver operation, applied to casual base):
 *   Weekday ordinary:           ×1.00
 *   Early/late:                 ×1.12 of casual base
 *   Saturday:                   ×1.40 of casual base
 *   Sunday:                     ×1.80 of casual base
 *   Public holiday:             ×2.20 of casual base
 *
 * Overtime (FT/PT Mon–Sat):
 *   First 3 hours: ×1.50
 *   After 3 hours: ×2.00
 *
 * Overtime (Casual):
 *   First 3 hours: ×1.20 of casual base (= ×1.50 of FT)
 *   After 3 hours: ×1.60 of casual base (= ×2.00 of FT)
 *
 * Junior rates (adult multiplier):
 *   Under 19: 70%   19 years: 80%   20+: 100% (adult)
 *   Note: Junior 18+ driving passenger vehicle in sole control = adult rate
 *
 * Minimum engagement: 2 hours casual
 *
 * Run after migrate.js: node scripts/seed_ma000063.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000063';
const EFFECTIVE_DATE = '2025-10-03';

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
      'Passenger Vehicle Transportation Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000063.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000063 has one stream ('transport') with 6 grades.
    const classifications = [
      {
        level: 1, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 1',
        description: 'Entry-level driver or basic operations employee. You perform routine tasks under close supervision with no prior industry experience required.',
        duties: [
          'Driving a taxi, hire car, or rideshare vehicle under supervision or direction',
          'Performing basic vehicle checks and cleaning',
          'Assisting passengers with luggage and mobility needs',
          'Following dispatch instructions and standard routes',
          'Maintaining basic trip records and logs',
          'Performing general office or depot tasks as directed',
        ],
        indicative_tasks: ['New taxi driver', 'Rideshare driver (entry)', 'Hire car driver (learner)', 'Depot attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 2',
        description: 'Experienced driver or standard operations employee. You work with general supervision and have developed competency in your role.',
        duties: [
          'Driving a taxi, hire car, bus, or charter vehicle competently',
          'Managing passenger interactions and resolving routine issues',
          'Performing pre-trip and post-trip vehicle inspections',
          'Operating dispatch or booking systems',
          'Handling cash, EFTPOS, and electronic fare collection',
          'Maintaining accurate work diaries and log books',
        ],
        indicative_tasks: ['Experienced taxi driver', 'Hire car driver', 'Bus driver (standard route)', 'Dispatch operator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 3',
        description: 'Experienced driver with additional qualifications or responsibilities. You hold relevant licences and can handle more complex driving tasks or operational roles.',
        duties: [
          'Driving larger vehicles (minibuses, coaches) or specialised vehicles',
          'Holding and maintaining additional licences or endorsements',
          'Training or mentoring new drivers in basic duties',
          'Handling complex route planning and scheduling',
          'Managing vehicle maintenance schedules and reporting',
          'Performing intermediate administrative or operations tasks',
        ],
        indicative_tasks: ['Coach driver', 'Minibus driver', 'Senior hire car driver', 'Operations assistant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 4',
        description: 'Senior driver or supervisor. You exercise significant skill and judgment, may supervise other drivers, and handle complex operational responsibilities.',
        duties: [
          'Supervising a small team of drivers or operations staff',
          'Managing fleet scheduling and driver allocation',
          'Handling customer complaints and incident management',
          'Conducting driver assessments and providing feedback',
          'Ensuring compliance with safety and regulatory requirements',
          'Driving specialised or high-value vehicles (limousines, charter)',
        ],
        indicative_tasks: ['Senior driver', 'Shift supervisor', 'Limousine driver', 'Charter car driver'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 5',
        description: 'Fleet coordinator, trainer, or specialist. You manage significant operational areas with a high degree of autonomy and hold advanced qualifications.',
        duties: [
          'Coordinating fleet operations across multiple vehicles or depots',
          'Designing and delivering driver training programs',
          'Managing compliance, licensing, and accreditation processes',
          'Analysing operational data and preparing management reports',
          'Implementing safety management systems and policies',
          'Acting as specialist in a technical area (fleet maintenance, IT systems)',
        ],
        indicative_tasks: ['Fleet coordinator', 'Driver trainer', 'Compliance officer', 'Operations specialist'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'transport',
        title: 'Passenger Vehicle Transport Employee Grade 6',
        description: 'Manager or most senior classification. You are responsible for overall operations management, strategic planning, or managing a large team with full autonomy.',
        duties: [
          'Managing all aspects of a depot, fleet, or operational division',
          'Strategic planning and budget management',
          'Leading and managing a large team of employees across multiple levels',
          'Negotiating contracts and managing key stakeholder relationships',
          'Ensuring regulatory compliance across the operation',
          'Implementing business improvement and efficiency programs',
        ],
        indicative_tasks: ['Operations manager', 'Fleet manager', 'Depot manager', 'Senior operations manager'],
        sort_order: 60,
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

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWO pay guide MA000063, effective 3 October 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      1: 26.10,
      2: 26.70,
      3: 28.21,
      4: 29.20,
      5: 30.81,
      6: 32.17,
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
    // Source: MA000063 — not two driver operation standard penalties.
    //
    // FT/PT multipliers:
    //   Weekday ordinary:           ×1.00
    //   Early/late (before 6am / after 7pm Mon–Fri): ×1.15
    //   Saturday:                   ×1.50
    //   Sunday:                     ×2.00
    //   Public holiday:             ×2.50
    //
    // Casual multipliers (applied to casual base rate = FT × 1.25):
    //   Weekday ordinary:           ×1.00 of casual base
    //   Early/late:                 ×1.12 of casual base
    //   Saturday:                   ×1.40 of casual base
    //   Sunday:                     ×1.80 of casual base
    //   Public holiday:             ×2.20 of casual base

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
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Early morning',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Early morning Mon–Fri (before 6am) — ×1.15',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00', time_band_label: 'Late evening',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Late evening Mon–Fri (after 7pm) — ×1.15',
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
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
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
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Early morning',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Early morning Mon–Fri (before 6am) — ×1.15',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00', time_band_label: 'Late evening',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Late evening Mon–Fri (after 7pm) — ×1.15',
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
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
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
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Early morning',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual early morning (before 6am) — ×1.12 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00', time_band_label: 'Late evening',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual late evening (after 7pm) — ×1.12 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Saturday — ×1.40 of casual base',
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
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base',
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
    // Source: MA000063 — Overtime.
    //
    // FT/PT overtime (Mon–Sat):
    //   First 3 hours: ×1.50
    //   After 3 hours: ×2.00
    //
    // Casual overtime (applied to casual base = FT × 1.25):
    //   First 3 hours: ×1.20 of casual base (= ×1.50 of FT)
    //   After 3 hours: ×1.60 of casual base (= ×2.00 of FT)

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50, Mon–Sat)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      // Casual weekly (×1.20 then ×1.60 of casual base)
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 3 hours ×1.20 of casual base (= 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 41, period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 41 hours ×1.60 of casual base (= 200% of FT)' },
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
    // Source: MA000063 pay guide, effective 3 October 2025.
    // No all-purpose allowances in this award.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed by your employer as the person responsible for first aid duties, you receive $20.37 per week.',
        trigger_condition: 'Appointed by employer as the responsible first aider, and holding a current first aid certificate',
        amount: 20.37, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during overtime, you are entitled to a meal allowance of $16.72 per meal.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 16.72, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own motor vehicle for work purposes, you are entitled to $0.98 per kilometre.',
        trigger_condition: 'Required to use own motor vehicle for work purposes',
        amount: 0.98, amount_type: 'fixed', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'articulated_bus',
        name: 'Articulated bus allowance',
        description: 'If you are required to drive an articulated bus, you are entitled to an allowance of $16.72 per shift.',
        trigger_condition: 'Required to drive an articulated bus during the shift',
        amount: 16.72, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform reimbursement',
        description: 'If your employer requires you to wear a uniform, the employer must reimburse the cost of purchasing and maintaining the uniform.',
        trigger_condition: 'Employer requires wearing of uniform',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'log_book',
        name: 'Log book / work diary reimbursement',
        description: 'If you are required to maintain a log book or work diary, the employer must reimburse the cost.',
        trigger_condition: 'Employer requires maintenance of log book or work diary',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'medical_examination',
        name: 'Medical examination reimbursement',
        description: 'If you are required to undergo a medical examination as a condition of employment, the employer must reimburse the cost.',
        trigger_condition: 'Employer-required medical examination',
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
    console.log(`✓ Inserted ${allowances.length} allowances (${allowances.filter(a => a.is_all_purpose).length} all-purpose)`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    // Rest break: Paid 10-minute rest break per 4 hours.
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
    // Two-level question flow:
    //   1. transport_role_type — what type of transport work do you do?
    //   2. transport_grade — which grade best matches your role? (shown to all)
    // Classification rules: transport_grade maps directly to levels 1–6.
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'transport_role_type',
        question_text: 'What type of transport work do you do?',
        help_text: 'Select the option that best describes your primary role. This helps us understand your work context, but your grade (and therefore pay rate) is determined by the next question.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'driver_taxi', answer_text: 'Taxi, rideshare, or hire car driver', sort_order: 1 },
          { answer_key: 'driver_bus', answer_text: 'Bus, minibus, or coach driver', sort_order: 2 },
          { answer_key: 'driver_limo', answer_text: 'Limousine, wedding, or charter car driver', sort_order: 3 },
          { answer_key: 'operations', answer_text: 'Operations, dispatch, or fleet management', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'transport_grade',
        question_text: 'Which grade best matches your role?',
        help_text: 'Your grade determines your pay rate. If you are unsure, check your employment contract or payslip, or ask your employer. Grade 1 is for new or entry-level employees, while Grade 6 is for the most senior classifications.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'transport_role_type',
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'grade1', answer_text: 'Grade 1 — New driver or basic operations role', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — Experienced driver or standard operations', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — Experienced driver with additional qualifications or responsibilities', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — Senior driver or supervisor', sort_order: 4 },
          { answer_key: 'grade5', answer_text: 'Grade 5 — Fleet coordinator, trainer, or specialist role', sort_order: 5 },
          { answer_key: 'grade6', answer_text: 'Grade 6 — Manager or most senior classification', sort_order: 6 },
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
        AWARD_CODE, q.question_key, q.question_text, q.help_text,
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
    console.log('\n✅ MA000063 seed complete');
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
