/**
 * Seed script — Fast Food Industry Award 2020 [MA000003]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000003, effective 1 July 2025, published 24 December 2025
 *
 * Run after migrate.js: node scripts/seed_ma000003.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000003';
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
      'Fast Food Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000003-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000003 Schedule A — Classifications
    // Grade 1: entry level (new employees, less than 3 months)
    // Grade 2: experienced (3+ months), working with others
    // Grade 3 (solo): works alone or opens/closes without other staff
    // Grade 3 (responsible): responsible for supervising 2+ employees
    //
    // "stream" is used here to differentiate the two Grade 3 variants:
    //   stream='general'     → Grade 1 and Grade 2
    //   stream='solo'        → Grade 3 (working alone rate)
    //   stream='responsible' → Grade 3 (responsible for 2+ employees rate)

    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Fast Food Employee Grade 1',
        description: 'Entry-level position — you are new to the role or industry (generally less than 3 months experience). You are still learning the job and work under direction.',
        duties: [
          'Taking orders at the counter or drive-through under supervision',
          'Basic food and drink preparation using set procedures (e.g. making burgers, fries)',
          'Operating registers and EFTPOS terminals with supervision',
          'Cleaning tables, floors, and work areas',
          'Restocking condiments, packaging and supplies',
          'Following food safety and hygiene procedures',
          'Receiving deliveries and checking stock under supervision',
        ],
        indicative_tasks: ['Counter service team member (new)', 'Drive-through operator (new)', 'Kitchen team member (new)', 'Cleaner'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Fast Food Employee Grade 2',
        description: 'Experienced team member — you have at least 3 months of experience and can perform your duties competently without constant supervision.',
        duties: [
          'Taking and processing orders independently at counter or drive-through',
          'Preparing food and drinks independently using established procedures',
          'Handling cash and electronic payments without supervision',
          'Opening and closing the store alongside other staff',
          'Training and guiding new Grade 1 employees in routine tasks',
          'Managing stock and ordering supplies under general direction',
          'Handling routine customer inquiries and complaints',
          'Following and enforcing food safety and hygiene procedures',
        ],
        indicative_tasks: ['Counter service team member (experienced)', 'Drive-through operator (experienced)', 'Kitchen team member (experienced)', 'Delivery crew member'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'solo',
        title: 'Fast Food Employee Grade 3 — Working alone',
        description: 'Experienced Grade 2 employee who works at the establishment without other employees present, or who opens or closes the store without other staff present.',
        duties: [
          'All Grade 2 duties, performed without other employees present',
          'Opening and/or closing the store independently',
          'Managing all aspects of store operations alone during the shift',
          'Sole responsibility for cash handling and security during the shift',
          'Making judgment calls about customer and operational matters without other staff available',
        ],
        indicative_tasks: ['Sole trader on shift', 'Early opener (alone)', 'Late closer (alone)'],
        sort_order: 30,
      },
      {
        level: 3, stream: 'responsible',
        title: 'Fast Food Employee Grade 3 — Responsible for 2+ employees',
        description: 'Experienced Grade 2 employee who is required to supervise or instruct 2 or more other employees during their shift.',
        duties: [
          'All Grade 2 duties, plus supervising and instructing 2 or more other employees',
          'Directing team members in their tasks during a shift',
          'Responsibility for team performance and standards during the shift',
          'Handling escalated customer complaints and operational issues',
          'Assisting with opening and closing procedures',
          'Reporting on shift operations to management',
        ],
        indicative_tasks: ['Shift supervisor', 'Team leader', 'Senior team member in charge of others'],
        sort_order: 31,
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
    // Source: FWO pay guide MA000003, effective 1 July 2025, published 24 December 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% loading).
    const rates = {
      '1_general':    26.55,
      '2_general':    28.12,
      '3_solo':       28.55,
      '3_responsible': 28.90,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.level}_${cls.stream}`;
      const baseRate = rates[key];
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
    // Source: MA000003 clause 29 — Penalty rates
    //
    // IMPORTANT NOTES:
    // 1. Evening/night loadings are MULTIPLIERS in MA000003 (unlike MA000009 which uses flat additions).
    //    10pm–midnight: ×1.10; midnight–6am: ×1.15
    // 2. Grade 1 (Level 1) Sunday rate is the same as Saturday (×1.25 FT/PT, ×1.20 casual).
    //    Grade 2 and 3 Sunday: ×1.50 FT/PT, ×1.40 casual.
    //    The Grade 1 override is applied in the calculator (awardCalculator.js) based on classification level.
    //    Rates stored here are for Grade 2/3 (the default).

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Weekday evening (10pm–midnight) — ×1.10',
      },
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Weekday night (midnight–6am) — ×1.15',
      },
      {
        employment_type: 'full_time',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'full_time',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50 (Grade 2/3); Grade 1 is ×1.25 — applied by calculator',
      },
      {
        employment_type: 'full_time',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Part-time (same penalty structure as full-time) ────────────────────
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Weekday evening (10pm–midnight) — ×1.10',
      },
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Weekday night (midnight–6am) — ×1.15',
      },
      {
        employment_type: 'part_time',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'part_time',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50 (Grade 2/3); Grade 1 is ×1.25 — applied by calculator',
      },
      {
        employment_type: 'part_time',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Casual ────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% casual loading.
      // Penalty multipliers apply relative to the casual base rate.
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% loading)',
      },
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Casual weekday evening (10pm–midnight) — ×1.10',
      },
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Casual weekday night (midnight–6am) — ×1.15',
      },
      {
        employment_type: 'casual',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday — ×1.20 of casual base rate',
      },
      {
        employment_type: 'casual',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday — ×1.40 (Grade 2/3); Grade 1 is ×1.20 — applied by calculator',
      },
      {
        employment_type: 'casual',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Casual public holiday — ×2.0 of casual base rate',
      },
      // ── Grade 1 Sunday overrides (lower than L2/L3 per clause 29.3) ───────
      // Level-scoped rows; the calculator prefers these over the generic
      // Sunday rows above when the user's classification level is 1.
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        applies_to_levels: [1],
        description: 'Sunday — Grade 1 (×1.25, lower than L2/L3)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        applies_to_levels: [1],
        description: 'Sunday — Grade 1 (×1.25, lower than L2/L3)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        applies_to_levels: [1],
        description: 'Casual Sunday — Grade 1 (×1.20, lower than L2/L3)',
      },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, applies_to_levels, applies_to_streams)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, r.time_band_label,
        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE,
        r.applies_to_levels || null, r.applies_to_streams || null,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ────────────────────────────────────────────────────────
    // MA000003 clause 32 — Overtime
    // Overtime triggered when daily hours exceed ordinary hours, or weekly hours exceed 38.
    // First 2 hours OT: ×1.5; thereafter: ×2.0.
    const overtimeRates = [
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — first 2 hours (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Weekly overtime — after 40 hours (×2.0)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — first 2 hours (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time weekly overtime — after 40 hours (×2.0)',
      },
    ];

    // Clear existing and re-insert (no unique constraint on overtime_rates)
    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000003 clause 20 — Allowances; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'cold_work',
        name: 'Cold work allowance',
        description: 'If you are required to work in a cold work environment (e.g. cool rooms, freezer rooms), you are entitled to an additional hourly allowance.',
        trigger_condition: 'Working in cool room (0°C to 16°C) or freezer room (below 0°C)',
        amount: 0.37, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'cold_work_freezer',
        name: 'Cold work allowance (below freezing)',
        description: 'If required to work in temperatures below 0°C, you receive an additional allowance on top of the cool room rate.',
        trigger_condition: 'Working in freezer room at temperatures below 0°C',
        amount: 0.56, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'district',
        name: 'District allowance (Broken Hill)',
        description: 'Employees working in the Broken Hill district are entitled to an additional weekly allowance.',
        trigger_condition: 'Employed in the Broken Hill district',
        amount: 45.73, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_ft',
        name: 'Laundry allowance (full-time)',
        description: 'If you are required to launder your own uniform or special clothing, you are entitled to a weekly laundry allowance.',
        trigger_condition: 'FT employee required to launder own uniform',
        amount: 6.25, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_ptcasual',
        name: 'Laundry allowance (part-time or casual)',
        description: 'If you are required to launder your own uniform or special clothing, you are entitled to a per-shift laundry allowance.',
        trigger_condition: 'PT or casual employee required to launder own uniform',
        amount: 1.25, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you are required to work overtime without being given the required prior notice, you are entitled to a meal allowance. Not payable to casual employees.',
        trigger_condition: 'Overtime worked without prior notice, FT/PT only — first meal when OT starts',
        amount: 16.65, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_second',
        name: 'Meal allowance (overtime — second meal)',
        description: 'If you work more than 4 hours of overtime, you are entitled to a further meal allowance of $15.04 in addition to the first meal allowance.',
        trigger_condition: 'Overtime exceeds 4 hours without prior notice, FT/PT only — second meal',
        amount: 15.04, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle_delivery',
        name: 'Vehicle allowance (delivery driver)',
        description: 'If you use your own vehicle for delivery purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own vehicle for delivery',
        amount: 0.52, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_other',
        name: 'Vehicle allowance (non-delivery)',
        description: 'If you use your own vehicle for other work purposes (not delivery), you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own vehicle for non-delivery work purposes',
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
    // MA000003 clause 31 — Breaks
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Roughly in the middle of each 4-hour work period',
        description: 'For every 4 hours you work (or part thereof), you are entitled to a 10-minute paid rest break. These cannot be skipped or "saved up".',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours straight, you must get an unpaid meal break of at least 30 minutes.',
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
    // Two questions for MA000003:
    // 1. ff_experience — always shown first
    // 2. ff_role — shown only when ff_experience = 'experienced'
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'ff_experience',
        question_text: 'How long have you been working in fast food or similar service work?',
        help_text: 'Your classification level is partly based on how long you have been doing this type of work.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'Less than 3 months (I\'m still learning the ropes)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: '3 months or more (I can do my job without being told each step)', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'ff_role',
        question_text: 'Which best describes your role during a typical shift?',
        help_text: 'This determines whether you qualify for the higher Grade 3 rate.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'ff_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'team_member', answer_text: 'I work as a team member alongside other staff', sort_order: 1 },
          { answer_key: 'works_alone', answer_text: 'I often work at the store alone, or I open or close without any other staff present', sort_order: 2 },
          { answer_key: 'supervises_2plus', answer_text: 'I am responsible for supervising or instructing 2 or more other employees during my shifts', sort_order: 3 },
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
    console.log('✓ MA000003 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('MA000003 seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
