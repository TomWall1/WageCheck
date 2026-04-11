/**
 * Seed script — General Retail Industry Award 2020 [MA000004]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000004, effective 1 July 2025, published 16 February 2026
 *
 * Run after migrate.js: node scripts/seed_ma000004.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000004';
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
      'General Retail Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000004 uses a single stream ('retail') with 8 levels.
    // There are no separate named streams — all retail employees are classified
    // on a single scale from Level 1 (new/entry) to Level 8 (senior manager).

    const classifications = [
      {
        level: 1, stream: 'retail',
        title: 'Retail Employee Level 1',
        description: 'You are new to retail (generally less than 3 months). You perform basic retail duties under supervision while learning the role.',
        duties: [
          'Serving customers and processing sales at the register under supervision',
          'Handling cash and EFTPOS transactions under supervision',
          'Basic product presentation — ticketing, facing, restocking shelves',
          'Gift-wrapping and basic packaging',
          'Cleaning and maintaining the store and work areas',
          'Receiving and putting away stock under direction',
          'Performing stockroom duties under supervision',
        ],
        indicative_tasks: ['New sales assistant', 'Checkout operator (new)', 'Store hand (new)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'retail',
        title: 'Retail Employee Level 2',
        description: 'You have at least 3 months of retail experience and can perform your duties competently with limited supervision.',
        duties: [
          'Independently serving customers and handling all types of transactions',
          'Operating point-of-sale systems and handling cash independently',
          'Some product knowledge to assist customers with purchasing decisions',
          'Basic visual merchandising and stock presentation',
          'Stocktaking and stock replenishment',
          'Lay-by, lay-away, and basic customer service functions',
          'Assisting with the opening and closing of the store',
        ],
        indicative_tasks: ['Sales assistant (experienced)', 'Checkout operator', 'Retail associate'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'retail',
        title: 'Retail Employee Level 3',
        description: 'You have specialist product knowledge or perform more complex retail duties. You may deal with a technical product range or perform stockroom management tasks.',
        duties: [
          'Advising customers on products requiring specialist knowledge (e.g. electronics, hardware, pharmacy items)',
          'Operating and maintaining specialist equipment',
          'Stockroom management — receiving, checking, and processing deliveries',
          'Handling customer complaints and returns independently',
          'Conducting stocktakes and maintaining inventory records',
          'Mentoring or assisting newer staff in their duties',
          'Handling complex cash-office procedures',
        ],
        indicative_tasks: ['Specialist product adviser', 'Stockroom supervisor', 'Senior sales assistant', 'Cash office operator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'retail',
        title: 'Retail Employee Level 4',
        description: 'You perform higher-level specialist functions, provide significant customer service, and may have some supervisory or coordination responsibilities.',
        duties: [
          'Advanced specialist product knowledge — advising on complex purchases',
          'Training and guiding junior employees in the workplace',
          'Handling all types of customer service issues independently',
          'Complex visual merchandising and display planning',
          'Assisting with performance monitoring of junior staff',
          'Complex stock control functions including shrinkage monitoring',
        ],
        indicative_tasks: ['Senior specialist (electronics, hardware, pharmacy)', 'Visual merchandiser', 'Leading retail associate'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'retail',
        title: 'Retail Employee Level 5',
        description: 'You have supervisory duties — you may be a key holder or leading hand, responsible for the store or department when the manager is absent.',
        duties: [
          'Supervising staff on shift or in a section',
          'Opening and/or closing the store as a key holder',
          'Delegating tasks and overseeing workloads',
          'Handling staff issues and escalated customer complaints',
          'Assisting with stock ordering and inventory management',
          'Training and inducting new employees',
          'Cash reconciliation and banking procedures',
        ],
        indicative_tasks: ['Key holder', 'Leading hand', 'Senior team member in charge', 'Supervisor (without full management responsibility)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'retail',
        title: 'Retail Employee Level 6',
        description: 'You are a department head or section supervisor with responsibility for ordering, rostering, and managing a team.',
        duties: [
          'Managing a department or section of the store',
          'Responsibility for stock ordering and management within your department',
          'Preparing rosters and managing team hours',
          'Performance management of staff in your department',
          'Setting and maintaining visual merchandising standards',
          'Reporting on department performance to management',
        ],
        indicative_tasks: ['Department head', 'Section manager', 'Senior department supervisor'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'retail',
        title: 'Retail Employee Level 7',
        description: 'You manage a department with full accountability for staffing, operations, and performance.',
        duties: [
          'Full responsibility for a department including budget and targets',
          'Hiring, managing, and developing department staff',
          'Complex stock management, ordering, and shrinkage control',
          'Reporting to store management on departmental KPIs',
          'Implementing store-wide retail strategies in your department',
          'Managing relationships with suppliers and service providers',
        ],
        indicative_tasks: ['Department manager', 'Major department head', 'Senior section manager'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'retail',
        title: 'Retail Employee Level 8',
        description: 'You hold the highest award classification — typically responsible for multiple departments or have significant store-wide management responsibilities.',
        duties: [
          'Managing multiple departments or having store-wide operations responsibility',
          'Senior management duties covering staffing, operations, and compliance',
          'Strategic planning at the store or department level',
          'Significant financial accountability (budgets, targets, reporting)',
          'Complex employee relations and people management',
          'Liaison with head office on store performance and operations',
        ],
        indicative_tasks: ['Senior store manager', 'Multi-department manager', 'Senior retail manager (award-level)'],
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
    // Source: FWO pay guide MA000004, effective 1 July 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 26.55,
      2: 27.16,
      3: 27.58,
      4: 28.12,
      5: 29.27,
      6: 29.70,
      7: 31.19,
      8: 32.45,
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

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000004 clause 29 — Penalty rates (non-shiftworkers)
    //
    // FT/PT penalty multipliers:
    //   Weekday daytime:            ×1.00
    //   Weekday evening (after 6pm):×1.25
    //   Saturday:                   ×1.25
    //   Sunday:                     ×1.50
    //   Public holiday:             ×2.25
    //
    // Casual penalty multipliers (applied to casual base rate which already includes 25% loading):
    //   Weekday daytime:            ×1.00 (casual base)
    //   Weekday evening (after 6pm):×1.20 of casual base  (= 150% of FT rate)
    //   Saturday:                   ×1.20 of casual base  (= 150% of FT rate)
    //   Sunday:                     ×1.40 of casual base  (= 175% of FT rate)
    //   Public holiday:             ×2.00 of casual base  (= 250% of FT rate)
    //
    // Shiftworker rates are not implemented here — they are rare in the context of this tool.

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
        time_band_start: '18:00', time_band_end: '00:00',
        time_band_label: 'evening_6pm_to_midnight',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday evening (Mon–Fri after 6pm) — ×1.25',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
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
        time_band_start: '18:00', time_band_end: '00:00',
        time_band_label: 'evening_6pm_to_midnight',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday evening (Mon–Fri after 6pm) — ×1.25',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
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
        time_band_start: '18:00', time_band_end: '00:00',
        time_band_label: 'evening_6pm_to_midnight',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual weekday evening (after 6pm) — ×1.20 of casual base (150% of FT)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday — ×1.20 of casual base (150% of FT rate)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday — ×1.40 of casual base (175% of FT rate)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual public holiday — ×2.00 of casual base (250% of FT rate)',
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
    // MA000004 clause 28 — Overtime
    // Mon–Sat: first 3 hours ×1.5, thereafter ×2.0
    // Sunday: ×2.0 | Public holiday: ×2.5
    // Overtime is triggered after 38 ordinary hours per week (or outside agreed ordinary hours).
    const overtimeRates = [
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — first 3 hours over 38 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 41, period: 'weekly',
        multiplier: 2.0,
        description: 'Weekly overtime — after 41 hours (×2.0)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — first 3 hours (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 41, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time weekly overtime — after 41 hours (×2.0)',
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
    // Source: MA000004 clause 20 — Allowances; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'cold_work_above_zero',
        name: 'Cold work allowance (0°C and above)',
        description: 'If you are required to work in a cold environment at or above 0°C (e.g. cool rooms, refrigerated areas), you are entitled to an additional hourly allowance.',
        trigger_condition: 'Working in a cool or refrigerated area at or above 0°C',
        amount: 0.37, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'cold_work_below_zero',
        name: 'Cold work allowance (below 0°C)',
        description: 'If you are required to work in a freezer or other environment below 0°C, you are entitled to a higher hourly allowance.',
        trigger_condition: 'Working in a freezer or environment below 0°C',
        amount: 0.93, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are designated as the first aid officer and hold a current first aid qualification, you are entitled to a weekly first aid allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 13.89, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_ft',
        name: 'Laundry allowance (full-time)',
        description: 'If your employer requires you to launder your own uniform or work clothing, you are entitled to a weekly laundry allowance.',
        trigger_condition: 'Full-time employee required to launder own uniform or work clothing',
        amount: 6.25, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_ptcasual',
        name: 'Laundry allowance (part-time or casual)',
        description: 'If your employer requires you to launder your own uniform or work clothing, you are entitled to a per-shift laundry allowance.',
        trigger_condition: 'Part-time or casual employee required to launder own uniform or work clothing',
        amount: 1.25, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'liquor_licence',
        name: 'Liquor licence allowance',
        description: 'If you work in a store that holds a liquor licence, you are entitled to a weekly allowance.',
        trigger_condition: 'Working in a retail store that holds a liquor licence',
        amount: 33.12, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime — first meal)',
        description: 'If you are required to work overtime without prior notice, you are entitled to a meal allowance when overtime commences. Not payable to casual employees.',
        trigger_condition: 'Overtime worked without prior notice — FT/PT only. First meal on commencement of overtime.',
        amount: 23.59, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_second',
        name: 'Meal allowance (overtime — second meal)',
        description: 'If overtime extends beyond 4 hours, an additional meal allowance applies. Not payable to casual employees.',
        trigger_condition: 'Overtime exceeds 4 hours — FT/PT only. Second meal after 4 hours of overtime.',
        amount: 21.39, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to a per-kilometre allowance.',
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
    // MA000004 clause 31 — Breaks
    // Rest break: 1 paid 10-minute break for shifts of 3.5 to <7 hours;
    //             2 paid 10-minute breaks for shifts of 7 hours or more.
    //             Using shift_hours_min=3.5 with Math.floor gives correct 1 and 2 break counts.
    // Meal break: Unpaid 30–60 min meal break after no more than 5 hours of continuous work.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 3.5, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One break per 3.5 hours worked (or part thereof); two breaks for shifts of 7+ hours',
        description: 'For shifts of 3.5 hours or more, you are entitled to a paid 10-minute rest break. For shifts of 7 hours or more, you are entitled to two paid 10-minute rest breaks.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes (and no more than 60 minutes).',
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
    // Two-level parent-based question flow for MA000004:
    //   1. retail_experience — new to retail or experienced?
    //   2. retail_role — what describes your role? (shown when retail_experience = 'experienced')
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'retail_experience',
        question_text: 'Are you new to retail work?',
        help_text: 'Retail Employee Level 1 applies to employees in their first three months, while they are learning the role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'Yes — I\'m new to retail (generally less than 3 months)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'No — I have retail experience (3+ months)', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'retail_role',
        question_text: 'Which best describes your role?',
        help_text: 'Pick the option that best matches what you actually do most of the time.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'retail_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'cashier_sales', answer_text: 'General sales or cashier — I serve customers and operate the register', sort_order: 1 },
          { answer_key: 'specialist', answer_text: 'Specialist product adviser — I help customers with complex or technical products (e.g. electronics, hardware, pharmacy)', sort_order: 2 },
          { answer_key: 'senior_specialist', answer_text: 'Senior specialist — I have 3+ years experience or trade qualifications relevant to my product area', sort_order: 3 },
          { answer_key: 'key_holder', answer_text: 'Key holder / leading hand — I open or close the store, and I\'m the go-to person on shift', sort_order: 4 },
          { answer_key: 'supervisor', answer_text: 'Department supervisor — I manage stock ordering and have rostering responsibilities for a team', sort_order: 5 },
          { answer_key: 'dept_manager', answer_text: 'Department manager — I\'m fully responsible for a department including staffing and performance', sort_order: 6 },
          { answer_key: 'senior_manager', answer_text: 'Senior manager — I\'m responsible for multiple departments or have significant store-wide management responsibility', sort_order: 7 },
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
    console.log('\n✅ MA000004 seed complete');
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
