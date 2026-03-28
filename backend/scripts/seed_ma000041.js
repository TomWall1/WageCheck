/**
 * Seed script — Telecommunications Services Award 2020 [MA000041]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000041
 *
 * Two streams:
 *   telecom_clerical  — Clerical & Administrative Levels 1–5 (5 classifications)
 *   telecom_technical  — Technical Levels 1–6 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   C&A L1: $25.85   L2: $26.70   L3: $28.12   L4: $30.68   L5: $32.90
 *   Tech Trainee: $25.85   Tech Employee: $28.12   Technician: $29.85
 *   Advanced Tech: $30.68   Principal Tech: $32.90   Associate: $35.55
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
 * Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
 *
 * Allowances:
 *   Meal: $18.08, Tool: $18.13/wk, Vehicle: $0.98/km
 *
 * Run after migrate.js: node scripts/seed_ma000041.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000041';
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
      'Telecommunications Services Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000041.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Clerical & Administrative stream ────────────────────────────────────
      {
        level: 1, stream: 'telecom_clerical',
        fwc_id: 1525,
        title: 'Clerical & Administrative Level 1',
        description: 'Entry-level clerical and administrative employee. You perform routine tasks under direct supervision with structured on-the-job training.',
        duties: [
          'Performing basic data entry and filing',
          'Answering telephones and directing enquiries',
          'Processing standard forms and documents',
          'Assisting with general office duties under supervision',
        ],
        indicative_tasks: ['Receptionist (entry)', 'Filing clerk', 'Data entry operator'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'telecom_clerical',
        fwc_id: 1526,
        title: 'Clerical & Administrative Level 2',
        description: 'Clerical and administrative employee with some experience. You perform a range of tasks with limited supervision and may provide guidance to Level 1 employees.',
        duties: [
          'Processing accounts and maintaining financial records',
          'Coordinating correspondence and mail distribution',
          'Operating office equipment and specialised software',
          'Assisting with scheduling and diary management',
        ],
        indicative_tasks: ['Administrative assistant', 'Accounts clerk', 'Office coordinator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'telecom_clerical',
        fwc_id: 1527,
        title: 'Clerical & Administrative Level 3',
        description: 'Experienced clerical and administrative employee. You work with a degree of autonomy and may coordinate the work of others.',
        duties: [
          'Maintaining complex records and database systems',
          'Preparing reports and correspondence with minimal direction',
          'Coordinating administrative processes across sections',
          'Providing training and guidance to lower-level clerical staff',
        ],
        indicative_tasks: ['Senior administrative officer', 'Office manager (junior)', 'Records coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'telecom_clerical',
        fwc_id: 1528,
        title: 'Clerical & Administrative Level 4',
        description: 'Senior clerical and administrative employee with specialist knowledge. You manage complex administrative functions and supervise other staff.',
        duties: [
          'Managing budgets and financial reporting for a section',
          'Supervising clerical and administrative staff',
          'Developing and implementing administrative procedures',
          'Coordinating projects and liaising with management',
        ],
        indicative_tasks: ['Office manager', 'Executive assistant', 'Project coordinator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'telecom_clerical',
        fwc_id: 1529,
        title: 'Clerical & Administrative Level 5',
        description: 'The most senior clerical and administrative classification. You have significant responsibility for administrative operations and staff management.',
        duties: [
          'Managing a department or functional area',
          'Developing organisational policies and procedures',
          'Overseeing complex projects and strategic initiatives',
          'Reporting directly to senior management on operational matters',
        ],
        indicative_tasks: ['Administration manager', 'Senior executive assistant', 'Operations coordinator'],
        sort_order: 50,
      },
      // ── Technical stream ────────────────────────────────────────────────────
      {
        level: 1, stream: 'telecom_technical',
        fwc_id: 1530,
        title: 'Technical Employee — Trainee',
        description: 'Entry-level technical employee undergoing training. You perform basic technical tasks under direct supervision while developing your skills.',
        duties: [
          'Assisting with basic installation and maintenance tasks',
          'Learning to use telecommunications equipment and tools',
          'Following standard procedures under direct supervision',
          'Completing structured training programs',
        ],
        indicative_tasks: ['Technical trainee', 'Installation assistant'],
        sort_order: 60,
      },
      {
        level: 2, stream: 'telecom_technical',
        fwc_id: 1531,
        title: 'Technical Employee',
        description: 'Technical employee with foundational skills. You perform standard technical tasks with general supervision and apply basic telecommunications knowledge.',
        duties: [
          'Installing and maintaining telecommunications equipment',
          'Testing and troubleshooting basic faults',
          'Maintaining records of work completed',
          'Following technical specifications and procedures',
        ],
        indicative_tasks: ['Technical employee', 'Installation technician (entry)'],
        sort_order: 70,
      },
      {
        level: 3, stream: 'telecom_technical',
        fwc_id: 1532,
        title: 'Technician',
        description: 'Qualified technician with trade-level skills. You work with limited supervision on a range of telecommunications installations and repairs.',
        duties: [
          'Performing complex installations and commissioning',
          'Diagnosing and repairing telecommunications faults',
          'Reading and interpreting technical drawings and specifications',
          'Ensuring compliance with industry standards and regulations',
        ],
        indicative_tasks: ['Telecommunications technician', 'Network technician'],
        sort_order: 80,
      },
      {
        level: 4, stream: 'telecom_technical',
        fwc_id: 1533,
        title: 'Advanced Technician',
        description: 'Advanced technician with specialist expertise. You handle complex technical work and may provide guidance to less experienced technicians.',
        duties: [
          'Performing advanced diagnostics and repairs on complex systems',
          'Designing and planning telecommunications installations',
          'Mentoring and training junior technical staff',
          'Liaising with clients on technical requirements',
        ],
        indicative_tasks: ['Senior technician', 'Lead installer'],
        sort_order: 90,
      },
      {
        level: 5, stream: 'telecom_technical',
        fwc_id: 1534,
        title: 'Principal Technician',
        description: 'Principal technician with extensive experience and qualifications. You oversee technical operations and lead teams of technicians.',
        duties: [
          'Overseeing major installation and maintenance projects',
          'Supervising teams of technicians',
          'Developing technical procedures and standards',
          'Managing quality assurance for technical operations',
        ],
        indicative_tasks: ['Principal technician', 'Technical team leader'],
        sort_order: 100,
      },
      {
        level: 6, stream: 'telecom_technical',
        fwc_id: 1535,
        title: 'Associate',
        description: 'The most senior technical classification. You have advanced qualifications and are responsible for high-level technical and engineering functions.',
        duties: [
          'Performing professional-level engineering and design work',
          'Managing complex technical projects from conception to completion',
          'Providing expert technical advice to management',
          'Setting technical direction for the organisation',
        ],
        indicative_tasks: ['Associate engineer', 'Senior technical specialist'],
        sort_order: 110,
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
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order, fwc_classification_fixed_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
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
      telecom_clerical:  { 1: 25.85, 2: 26.70, 3: 28.12, 4: 30.68, 5: 32.90 },
      telecom_technical: { 1: 25.85, 2: 28.12, 3: 29.85, 4: 30.68, 5: 32.90, 6: 35.55 },
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
    // Daily threshold: 7.6 hours/day.
    // First 2 OT hours: ×1.50, after 2 OT hours: ×2.00.
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $18.08.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 18.08, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are required to supply and maintain your own tools, you are entitled to a tool allowance of $18.13 per week.',
        trigger_condition: 'Employee required to supply own tools',
        amount: 18.13, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.98 per kilometre.',
        trigger_condition: 'Employee required to use own vehicle for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
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
    // Two-branch question flow:
    //   Q1: telecom_stream — clerical & admin OR technical
    //   Q2: telecom_clerical_level — level for clerical (conditional on Q1=telecom_clerical)
    //   Q3: telecom_technical_level — level for technical (conditional on Q1=telecom_technical)
    const questions = [
      {
        question_key: 'telecom_stream',
        question_text: 'What type of work do you do in the telecommunications industry?',
        help_text: 'Clerical & administrative covers office-based roles such as data entry, accounts, reception, and administration. Technical covers installation, maintenance, repair, and engineering of telecommunications equipment and networks.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'telecom_clerical_level',
        question_text: 'What is your clerical and administrative level?',
        help_text: 'Your level depends on your experience, qualifications, and the complexity of your duties. Level 1 is entry-level. Higher levels involve more responsibility, autonomy, and supervisory duties.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'telecom_stream',
        parent_answer_key: 'telecom_clerical',
        sort_order: 2,
      },
      {
        question_key: 'telecom_technical_level',
        question_text: 'What is your technical classification level?',
        help_text: 'Your level depends on your qualifications, experience, and the type of technical work you perform. Trainee is entry-level. Associate is the highest level with advanced qualifications.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'telecom_stream',
        parent_answer_key: 'telecom_technical',
        sort_order: 3,
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
      // Q1: telecom_stream
      { question_key: 'telecom_stream', answer_key: 'telecom_clerical',  answer_text: 'Clerical & administrative (office, accounts, reception, administration)', sort_order: 1 },
      { question_key: 'telecom_stream', answer_key: 'telecom_technical', answer_text: 'Technical (installation, maintenance, repair, engineering)', sort_order: 2 },
      // Q2: telecom_clerical_level
      { question_key: 'telecom_clerical_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (data entry, filing, basic reception)', sort_order: 1 },
      { question_key: 'telecom_clerical_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience (accounts clerk, office coordinator)', sort_order: 2 },
      { question_key: 'telecom_clerical_level', answer_key: 'l3', answer_text: 'Level 3 — Experienced (senior admin, records coordinator)', sort_order: 3 },
      { question_key: 'telecom_clerical_level', answer_key: 'l4', answer_text: 'Level 4 — Senior/specialist (office manager, executive assistant)', sort_order: 4 },
      { question_key: 'telecom_clerical_level', answer_key: 'l5', answer_text: 'Level 5 — Department manager (administration manager, operations coordinator)', sort_order: 5 },
      // Q3: telecom_technical_level
      { question_key: 'telecom_technical_level', answer_key: 'l1', answer_text: 'Trainee — Entry-level technical trainee', sort_order: 1 },
      { question_key: 'telecom_technical_level', answer_key: 'l2', answer_text: 'Technical Employee — Standard technical work with general supervision', sort_order: 2 },
      { question_key: 'telecom_technical_level', answer_key: 'l3', answer_text: 'Technician — Qualified, working with limited supervision', sort_order: 3 },
      { question_key: 'telecom_technical_level', answer_key: 'l4', answer_text: 'Advanced Technician — Specialist expertise, may guide others', sort_order: 4 },
      { question_key: 'telecom_technical_level', answer_key: 'l5', answer_text: 'Principal Technician — Team leader, oversees technical operations', sort_order: 5 },
      { question_key: 'telecom_technical_level', answer_key: 'l6', answer_text: 'Associate — Senior technical/engineering specialist', sort_order: 6 },
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
