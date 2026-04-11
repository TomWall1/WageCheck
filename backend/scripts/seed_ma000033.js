/**
 * Seed script — Nursery Industry Award 2020 [MA000033]
 * Pay rates effective 1 July 2025 (published 25 June 2025)
 * Source: Fair Work Ombudsman pay guide MA000033 (G00332889)
 *
 * KEY — All-purpose allowances (marked * in pay guide):
 *   First aid: $0.47/hr
 *
 * These MUST be added to the base rate BEFORE casual loading, penalties,
 * and overtime are calculated. The calculator handles this automatically
 * when allPurposeAllowancesPerHour is passed to the calculate endpoint.
 *
 * Adult rates (FT/PT):
 *   L1 (Grade 1A): $24.28   L2 (Grade 1B): $24.95   L3 (Grade 2): $25.38
 *   L4 (Grade 3):  $26.55   L5 (Grade 4):  $28.12   L6 (Grade 5): $31.06
 *   L7 (Grade 6):  $33.82
 * Casual rates (FT rate × 1.25):
 *   L1: $30.35  L2: $31.19  L3: $31.73  L4: $33.19  L5: $35.15
 *   L6: $38.83  L7: $42.28
 *
 * Penalty rates (FT/PT):
 *   Saturday:     ×1.25 (time and a quarter)
 *   Sunday:       ×2.00 (double time)
 *   Public holiday: ×2.50 (double time and a half)
 *
 * Penalty rates (casual, applied to casual base rate):
 *   Saturday:     ×1.20 of casual base
 *   Sunday:       ×1.80 of casual base
 *   Public holiday: ×2.20 of casual base
 *
 * Overtime (FT/PT, Mon–Sat):
 *   First 3 hrs over ordinary hrs: ×1.50
 *   After 3 hrs of overtime:       ×2.00
 *   Sunday overtime:               ×2.00 (modelled as penalty rate)
 *
 * Overtime (Casual, Mon–Sat):
 *   First 3 hrs: ×1.40 of casual base
 *   After 3 hrs: ×1.80 of casual base
 *
 * Junior rates (adult multiplier):
 *   <16: 50%  16: 60%  17: 70%  18: 80%  19: 90%  20+: 100%
 *
 * Run after migrate.js: node scripts/seed_ma000033.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000033';
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
      'Nursery Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000033.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000033 has 7 grades in a single 'nursery' stream.
    // Grade 1A = level 1 (entry), Grade 1B = level 2 (basic experience),
    // Grades 2–6 = levels 3–7 (increasing skill, qualification, and responsibility).
    const classifications = [
      {
        level: 1, stream: 'nursery',
        title: 'Nursery Employee Grade 1A',
        description: 'Entry-level nursery worker. You perform routine tasks under direct supervision with no prior nursery industry experience required. You are in the first few months of learning the role.',
        duties: [
          'Watering, fertilising, and weeding nursery stock under close supervision',
          'Packing, labelling, and presenting plants for sale',
          'Cleaning and maintaining work areas, benches, and equipment',
          'Moving and handling nursery stock as directed',
          'Assisting more experienced staff with routine daily tasks',
          'Following specific verbal instructions at all times',
        ],
        indicative_tasks: ['Nursery hand (entry level)', 'Garden centre assistant', 'General labourer (nursery)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'nursery',
        title: 'Nursery Employee Grade 1B',
        description: 'Nursery worker with a few months of experience who can apply learned skills under general supervision. You perform a wider range of Grade 1 tasks and may assist in training new starters.',
        duties: [
          'Carrying out established nursery routines with limited direction',
          'Identifying common plant types, pests, and basic care requirements',
          'Operating basic nursery equipment and hand tools',
          'Maintaining and cleaning equipment used in nursery operations',
          'Assisting with potting, propagation, and general nursery duties',
          'Supporting Grade 1A workers and new starters with basic tasks',
        ],
        indicative_tasks: ['Nursery hand (experienced Grade 1)', 'Garden centre team member', 'Wholesale nursery hand'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'nursery',
        title: 'Nursery Employee Grade 2',
        description: 'Experienced nursery worker with at least 12 months industry experience, or who holds a Certificate I or II in a relevant horticultural discipline. You work under general supervision applying practical skills.',
        duties: [
          'Propagating plants by seed, cutting, grafting, or division',
          'Mixing and applying fertilisers, pesticides, and soil mixes to schedules',
          'Operating basic nursery machinery and vehicles under guidance',
          'Maintaining stock records and assisting with ordering',
          'Identifying common plant diseases and reporting issues',
          'Supervising or guiding Grade 1A and 1B employees on specific tasks',
        ],
        indicative_tasks: ['Propagation assistant', 'Nursery production hand', 'Garden centre sales assistant (experienced)', 'Retail nursery hand'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'nursery',
        title: 'Nursery Employee Grade 3',
        description: 'Skilled nursery worker who applies technical knowledge with significant independence. You typically hold a Certificate II in horticulture (or equivalent experience) and can operate machinery and manage plants across all production stages.',
        duties: [
          'Planning and executing propagation schedules across multiple species',
          'Identifying and treating plant diseases, pests, and nutrient deficiencies',
          'Operating a range of nursery vehicles and mechanical equipment',
          'Accurately measuring and applying chemical treatments to schedules',
          'Setting up and maintaining irrigation systems',
          'Coordinating workflow for specific tasks and guiding junior staff',
        ],
        indicative_tasks: ['Senior propagation hand', 'Nursery production specialist', 'Irrigation maintenance officer', 'Retail nursery senior hand'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'nursery',
        title: 'Nursery Employee Grade 4',
        description: 'Advanced nursery worker who exercises a high degree of skill and judgment. You typically hold a Certificate II/III or trade assistant-level qualifications, and can plan and carry out complex nursery programs.',
        duties: [
          'Planning and managing plant production schedules with minimal supervision',
          'Applying a diverse range of technical and trade-level skills',
          'Diagnosing complex plant health problems and implementing solutions',
          'Supervising team members across propagation or production activities',
          'Managing chemical usage and safety compliance for a work area',
          'Providing detailed technical knowledge to customers and colleagues',
        ],
        indicative_tasks: ['Production supervisor (junior)', 'Nursery trades assistant', 'Specialist propagator', 'Advanced nursery hand'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'nursery',
        title: 'Nursery Employee Grade 5',
        description: 'Trade-qualified nursery professional. You hold a Certificate III in horticulture (or an equivalent qualification) and work with a high degree of autonomy, applying trade-level knowledge across the nursery operation.',
        duties: [
          'Independently managing complex propagation or production programs',
          'Applying trade-level expertise across all aspects of nursery operations',
          'Diagnosing and resolving difficult plant health, soil, and growing media issues',
          'Training and mentoring less experienced staff across the team',
          'Designing and implementing crop scheduling and quality assurance programs',
          'Liaising with customers, suppliers, and growers at a technical level',
        ],
        indicative_tasks: ['Qualified horticulturalist', 'Trade-qualified nursery worker (Cert III)', 'Advanced propagation specialist', 'Nursery team leader'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'nursery',
        title: 'Nursery Employee Grade 6',
        description: 'Senior nursery professional or leading hand with the highest level of technical skill and experience. You may hold Certificate III or above and are responsible for coordinating significant aspects of the nursery operation.',
        duties: [
          'Leading a work group or section with full responsibility for outcomes',
          'Planning and overseeing all production, propagation, or retail operations',
          'Developing and implementing crop programs and production targets',
          'Resolving the most complex plant health and operational issues',
          'Managing compliance with all relevant safety and regulatory requirements',
          'Mentoring and supervising staff at all levels of the nursery operation',
        ],
        indicative_tasks: ['Leading hand (nursery)', 'Senior horticulturalist', 'Nursery section supervisor', 'Head grower / production manager (non-management)'],
        sort_order: 70,
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
    // Source: FWO pay guide MA000033, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    // NOTE: When first aid all-purpose allowance applies, the calculator adds
    //       $0.47/hr to the FT base rate FIRST, then applies the 1.25 casual
    //       loading before penalties/overtime are calculated.
    const baseRates = {
      1: 24.28,  // Grade 1A
      2: 24.95,  // Grade 1B
      3: 25.38,  // Grade 2
      4: 26.55,  // Grade 3
      5: 28.12,  // Grade 4
      6: 31.06,  // Grade 5
      7: 33.82,  // Grade 6
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
    // Source: MA000033 pay guide, effective 1 July 2025.
    //
    // FT/PT multipliers (verified from pay guide: Grade 1A $24.28 base):
    //   Saturday:       $30.35 / $24.28 = ×1.25 (time and a quarter)
    //   Sunday:         $48.56 / $24.28 = ×2.00 (double time)
    //   Public holiday: $60.70 / $24.28 = ×2.50 (double time and a half)
    //
    // Casual multipliers (applied to casual base = FT × 1.25):
    //   Saturday:       $36.42 / $30.35 = ×1.20
    //   Sunday:         $54.63 / $30.35 = ×1.80
    //   Public holiday: $66.77 / $30.35 = ×2.20

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Ordinary weekday rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0) from first hour' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time (same as full-time) ─────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Ordinary weekday rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0) from first hour' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ───────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Ordinary casual weekday (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.20, description: 'Casual Saturday — ×1.20 of casual base (= ×1.50 of FT rate)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.80, description: 'Casual Sunday — ×1.80 of casual base (= ×2.25 of FT rate)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.20, description: 'Casual public holiday — ×2.20 of casual base (= ×2.75 of FT rate)' },
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
    // Source: MA000033 pay guide — "Overtime - Monday to Saturday".
    // "First 3 hours" = ×1.50 FT/PT, ×1.40 casual
    // "After 3 hours" = ×2.00 FT/PT, ×1.80 casual
    // Sunday: modelled as penalty rate (×2.0 FT, ×1.80 casual) — no extra OT needed.
    //
    // Weekly model: ordinary = 38hrs/week.
    //   FT/PT: 38–41h → ×1.50 (first 3 OT hours), 41h+ → ×2.00
    //   Casual: 38–41h → ×1.40, 41h+ → ×1.80

    const overtimeRates = [
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50, Mon–Sat)' },
      { employment_type: 'full_time', threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time', threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'casual',    threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 3 hours (×1.40 of casual base)' },
      { employment_type: 'casual',    threshold_hours: 41, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 41 hours (×1.80 of casual base)' },
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
    // Source: MA000033 pay guide, effective 1 July 2025.
    // The first aid allowance is marked * (all-purpose) — it must be added to the
    // base rate BEFORE casual loading, penalty rates, and overtime are calculated.
    const allowances = [
      // All-purpose (is_all_purpose = true)
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance (all-purpose)',
        description: 'If you hold a current first aid certificate and your employer has appointed you as the person responsible for first aid at the workplace, you receive $0.47 per hour as an all-purpose allowance. This amount is added to your base rate before casual loading, penalty rates, and overtime are calculated.',
        trigger_condition: 'Appointed by employer as the responsible first aider, holding a current first aid certificate',
        amount: 0.47, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      // Non-all-purpose
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime, you are entitled to a meal allowance of $17.19 for the first meal, and $17.19 for each additional meal period worked during overtime.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 17.19, amount_type: 'fixed', per_unit: 'per_meal',
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
        allowance_type: 'tool_equipment',
        name: 'Tool and equipment reimbursement',
        description: 'If your employer requires you to supply your own tools or equipment, you are entitled to reimbursement of the cost of those tools and equipment.',
        trigger_condition: 'Employer requires use of employee\'s own tools or equipment',
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
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of 30–60 minutes. If not given this break, you must be paid at double time until the break is provided.',
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
    //   Q1: nursery_experience — entry / basic / experienced (required always)
    //   Q2: nursery_grade — which grade? (only shown when Q1 = 'experienced')
    //
    // Mapping:
    //   entry     → Level 1 (Grade 1A)
    //   basic     → Level 2 (Grade 1B)
    //   experienced + grade2 → Level 3 (Grade 2)
    //   experienced + grade3 → Level 4 (Grade 3)
    //   experienced + grade4 → Level 5 (Grade 4)
    //   experienced + grade5 → Level 6 (Grade 5)
    //   experienced + grade6 → Level 7 (Grade 6)
    const questions = [
      {
        question_key: 'nursery_experience',
        question_text: 'How much nursery industry experience do you have?',
        help_text: 'Grade 1A is for workers very new to the industry. Grade 1B applies after a few months. Grades 2 and above require at least 12 months of experience or formal qualifications.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'entry',      answer_text: 'Less than 3 months — I\'m new to nursery work',                          sort_order: 1 },
          { answer_key: 'basic',      answer_text: '3 months to 12 months — I have some nursery experience',                  sort_order: 2 },
          { answer_key: 'experienced', answer_text: '12 months or more — I have significant experience or a qualification',   sort_order: 3 },
        ],
      },
      {
        question_key: 'nursery_grade',
        question_text: 'Which best describes your role and skill level?',
        help_text: 'Choose the description that best matches your actual duties and qualifications. Your payslip or contract may also state your grade.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'nursery_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'grade2', answer_text: 'General nursery worker — experienced hand, propagation or production work, Certificate I/II level', sort_order: 1 },
          { answer_key: 'grade3', answer_text: 'Skilled nursery hand — operates machinery, applies chemicals, Certificate II/III level skills',    sort_order: 2 },
          { answer_key: 'grade4', answer_text: 'Advanced worker — plans and manages programs independently, trade assistant level (Cert II/III)',   sort_order: 3 },
          { answer_key: 'grade5', answer_text: 'Trade qualified — Certificate III horticulture or equivalent, works with high autonomy',           sort_order: 4 },
          { answer_key: 'grade6', answer_text: 'Senior or leading hand — highest skill level, coordinates section or work group (Cert III+)',      sort_order: 5 },
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
    console.log('\n✅ MA000033 seed complete');
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
