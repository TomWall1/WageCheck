/**
 * Seed script — Business Equipment Award 2020 [MA000021]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000021
 *
 * Two streams:
 *   technical           — Levels 1-6
 *   commercial_traveller — Salesperson Levels 1-3
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   Tech L1: $24.95   L2: $25.84   L3: $26.69   L4: $28.12   L5: $29.86   L6: $31.51
 *   Sales L1: $27.39   L2: $30.05   L3: $34.77
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.50, Sun x2.00, PH x2.50
 *   Afternoon shift: +$4.13/hr
 *   Night shift: +$4.95/hr
 *   Permanent night shift: +$5.91/hr
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: Under 16=42%, 16=42%, 17=55%, 18=75%, 19=95%, 20=100%
 *
 * Run after migrate.js: node scripts/seed_ma000021.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000021';
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
      'Business Equipment Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000021.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Technical stream ────────────────────────────────────────────────────
      {
        level: 1, stream: 'technical',
        fwc_id: 814,
        title: 'Technical Level 1',
        description: 'You are an entry-level technical worker in the business equipment industry. No previous experience is required. You carry out basic tasks under close supervision, such as simple assembly work, packing, basic testing, or assisting more experienced technicians. This is where most people start when they join the industry.',
        duties: [
          'Performing basic assembly, packing, or sorting of business equipment and parts',
          'Assisting experienced technicians with routine maintenance and repairs',
          'Carrying out simple testing and quality checks under supervision',
          'Keeping your work area clean, tidy, and safe',
          'Following instructions and standard operating procedures',
        ],
        indicative_tasks: ['Assembly worker', 'Packer', 'Technical assistant (entry)', 'Workshop labourer'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'technical',
        fwc_id: 815,
        title: 'Technical Level 2',
        description: 'You have some experience or basic training in the business equipment industry. You can perform routine technical tasks with limited supervision and may be learning a trade or building on initial training.',
        duties: [
          'Performing routine maintenance and basic repair tasks on business equipment',
          'Operating standard workshop tools and diagnostic equipment',
          'Recording job details, parts used, and time worked',
          'Following service manuals and standard repair procedures',
          'Assisting with deliveries, installations, and pick-ups of equipment',
        ],
        indicative_tasks: ['Junior technician', 'Service assistant', 'Workshop hand (experienced)', 'Stores worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'technical',
        fwc_id: 817,
        title: 'Technical Level 3',
        description: 'You are a competent technical worker who can handle a range of tasks independently. You have completed relevant training or have enough experience to work without constant supervision. You may help train newer workers.',
        duties: [
          'Independently diagnosing and repairing faults in business equipment',
          'Performing installations, upgrades, and preventive maintenance',
          'Using diagnostic software and specialised testing equipment',
          'Providing on-the-job guidance to Level 1 and Level 2 workers',
          'Communicating with customers about repairs and maintenance needs',
        ],
        indicative_tasks: ['Technician', 'Field service technician', 'Workshop technician', 'Installer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'technical',
        fwc_id: 818,
        title: 'Technical Level 4',
        description: 'You are an experienced technician with trade qualifications or equivalent skills. You handle complex repairs, may specialise in particular equipment types, and can work unsupervised on most jobs.',
        duties: [
          'Performing complex fault diagnosis and repair on advanced business equipment',
          'Specialising in particular equipment types, brands, or technologies',
          'Training and mentoring less experienced technicians',
          'Managing your own workload and scheduling service calls',
          'Providing technical advice to customers and sales staff',
        ],
        indicative_tasks: ['Senior technician', 'Specialist technician', 'Trade-qualified repairer', 'Technical trainer'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'technical',
        fwc_id: 819,
        title: 'Technical Level 5',
        description: 'You are a highly skilled technician or technical team leader. You have deep expertise in your area and may supervise a team of technicians. You are trusted to handle the most difficult jobs and to make decisions about repair methods and parts.',
        duties: [
          'Leading a team of technicians and coordinating their daily work',
          'Handling escalated or unusually complex technical problems',
          'Making decisions about repair versus replacement of equipment',
          'Reviewing work quality and providing feedback to team members',
          'Liaising with manufacturers and suppliers on technical issues',
        ],
        indicative_tasks: ['Team leader (technical)', 'Lead technician', 'Technical coordinator', 'Quality controller'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'technical',
        fwc_id: 820,
        title: 'Technical Level 6',
        description: 'You are at the most senior technical classification. You have extensive experience and advanced qualifications. You may manage a workshop or technical department, or serve as the top technical authority in your organisation.',
        duties: [
          'Managing a workshop, service department, or technical team',
          'Setting technical standards, procedures, and training programs',
          'Managing budgets, parts inventory, and service contracts',
          'Providing expert-level technical advice to management and customers',
          'Overseeing compliance with safety and quality standards across the department',
        ],
        indicative_tasks: ['Workshop manager', 'Technical manager', 'Service department head', 'Senior technical specialist'],
        sort_order: 60,
      },
      // ── Commercial Traveller stream ─────────────────────────────────────────
      {
        level: 1, stream: 'commercial_traveller',
        fwc_id: 826,
        title: 'Salesperson Level 1',
        description: 'You are an entry-level salesperson in the business equipment industry. You sell or demonstrate business equipment to customers, either in a showroom, at trade events, or by visiting customers at their workplace. No previous sales experience is required — training is provided on the job.',
        duties: [
          'Demonstrating business equipment features and benefits to potential customers',
          'Answering customer enquiries about products, pricing, and availability',
          'Processing sales orders, quotes, and basic paperwork',
          'Maintaining product displays and ensuring showroom presentation',
          'Learning product ranges, specifications, and competitive offerings',
        ],
        indicative_tasks: ['Junior salesperson', 'Showroom sales assistant', 'Sales trainee', 'Product demonstrator'],
        sort_order: 70,
      },
      {
        level: 2, stream: 'commercial_traveller',
        fwc_id: 827,
        title: 'Salesperson Level 2',
        description: 'You are an experienced salesperson who manages your own territory or customer accounts. You have a good understanding of the products you sell and can negotiate deals, handle objections, and close sales independently.',
        duties: [
          'Managing a defined sales territory or portfolio of customer accounts',
          'Identifying new business opportunities and prospecting for new customers',
          'Preparing and presenting formal proposals and quotations',
          'Negotiating pricing, terms, and service agreements with customers',
          'Meeting sales targets and reporting on pipeline and activity',
        ],
        indicative_tasks: ['Sales representative', 'Account manager', 'Territory manager', 'Business development representative'],
        sort_order: 80,
      },
      {
        level: 3, stream: 'commercial_traveller',
        fwc_id: 828,
        title: 'Salesperson Level 3',
        description: 'You are a senior salesperson who handles major accounts, complex deals, or manages a sales team. You have extensive industry experience and a proven track record. You may be responsible for strategic sales planning and mentoring junior sales staff.',
        duties: [
          'Managing major or strategic customer accounts with high-value contracts',
          'Leading complex sales processes involving multiple stakeholders',
          'Mentoring and coaching junior sales staff',
          'Contributing to sales strategy, pricing decisions, and market planning',
          'Representing the company at industry events, trade shows, and key meetings',
        ],
        indicative_tasks: ['Senior sales representative', 'Key account manager', 'Sales team leader', 'Business development manager'],
        sort_order: 90,
      },
    ];

    // Clear existing data for this award
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
    const baseRates = {
      technical:            { 1: 24.95, 2: 25.84, 3: 26.69, 4: 28.12, 5: 29.86, 6: 31.51 },
      commercial_traveller: { 1: 27.39, 2: 30.05, 3: 34.77 },
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
      { employment_type: 'full_time',  day_type: 'weekday',        time_start: null, time_end: null, time_label: null,                  multiplier: 1.00, addition: null, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_start: null, time_end: null, time_label: null,                  multiplier: 1.50, addition: null, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'full_time',  day_type: 'sunday',         time_start: null, time_end: null, time_label: null,                  multiplier: 2.00, addition: null, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', time_start: null, time_end: null, time_label: null,                  multiplier: 2.50, addition: null, description: 'Public holiday — double time and a half (×2.50)' },
      // Note: Afternoon shift (+$4.13/hr), Night shift (+$4.95/hr), and Permanent night shift (+$5.91/hr)
      // loadings apply to designated shiftworkers only. Not included here as the calculator cannot
      // distinguish shiftworkers from day workers. These loadings are documented in the allowances section.
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        time_start: null, time_end: null, time_label: null,                  multiplier: 1.00, addition: null, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_start: null, time_end: null, time_label: null,                  multiplier: 1.50, addition: null, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'part_time',  day_type: 'sunday',         time_start: null, time_end: null, time_label: null,                  multiplier: 2.00, addition: null, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', time_start: null, time_end: null, time_label: null,                  multiplier: 2.50, addition: null, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        time_start: null, time_end: null, time_label: null,                  multiplier: 1.00, addition: null, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_start: null, time_end: null, time_label: null,                  multiplier: 1.50, addition: null, description: 'Casual Saturday — time and a half (×1.50 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         time_start: null, time_end: null, time_label: null,                  multiplier: 2.00, addition: null, description: 'Casual Sunday — double time (×2.00 of casual base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', time_start: null, time_end: null, time_label: null,                  multiplier: 2.50, addition: null, description: 'Casual public holiday — double time and a half (×2.50 of casual base)' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_start, r.time_end, r.time_label,
        r.multiplier, r.addition, r.description, EFFECTIVE_DATE,
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
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $25.11 per week.',
        trigger_condition: 'Appointed as first aid officer with current certificate',
        amount: 25.11, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_small',
        name: 'Leading hand allowance (2-5 employees)',
        description: 'If you are appointed to supervise 2 to 5 employees, you are entitled to a leading hand allowance of $34.30 per week. This is an all-purpose allowance, which means it is included when calculating overtime, penalties, and leave.',
        trigger_condition: 'Appointed leading hand supervising 2-5 employees',
        amount: 34.30, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_medium',
        name: 'Leading hand allowance (6-10 employees)',
        description: 'If you are appointed to supervise 6 to 10 employees, you are entitled to a leading hand allowance of $50.75 per week. This is an all-purpose allowance, which means it is included when calculating overtime, penalties, and leave.',
        trigger_condition: 'Appointed leading hand supervising 6-10 employees',
        amount: 50.75, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_large',
        name: 'Leading hand allowance (10+ employees)',
        description: 'If you are appointed to supervise more than 10 employees, you are entitled to a leading hand allowance of $66.24 per week. This is an all-purpose allowance, which means it is included when calculating overtime, penalties, and leave.',
        trigger_condition: 'Appointed leading hand supervising 10+ employees',
        amount: 66.24, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: true,
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
        timing_rule: 'After 5 hours of continuous work',
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
    const questions = [
      {
        question_key: 'business_equip_stream',
        question_text: 'What type of work do you do in the business equipment industry?',
        help_text: 'Technical workers install, maintain, repair, and service business equipment like printers, copiers, and IT hardware. Commercial travellers (salespersons) sell, demonstrate, or take orders for business equipment — either in a showroom, at trade events, or by visiting customers.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'be_tech_level',
        question_text: 'What is your technical level?',
        help_text: 'Level 1 is entry-level with no experience needed. Level 2 has some experience. Level 3 is competent and works independently. Level 4 is trade-qualified or specialist. Level 5 is a team leader or advanced specialist. Level 6 is the most senior — managing a workshop or department.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'business_equip_stream',
        parent_answer_key: 'technical',
        sort_order: 2,
      },
      {
        question_key: 'be_sales_level',
        question_text: 'What is your salesperson level?',
        help_text: 'Level 1 is entry-level sales. Level 2 is an experienced salesperson managing their own territory or accounts. Level 3 is a senior salesperson handling major accounts or managing a sales team.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'business_equip_stream',
        parent_answer_key: 'commercial_traveller',
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
      // Q1: business_equip_stream
      { question_key: 'business_equip_stream', answer_key: 'technical',            answer_text: 'Technical (install, maintain, repair, or service business equipment)', sort_order: 1 },
      { question_key: 'business_equip_stream', answer_key: 'commercial_traveller', answer_text: 'Commercial traveller / salesperson (sell or demonstrate business equipment)', sort_order: 2 },
      // Q2: be_tech_level
      { question_key: 'be_tech_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level, no experience needed (assembly, packing, basic assisting)', sort_order: 1 },
      { question_key: 'be_tech_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience or basic training (routine maintenance, stores)', sort_order: 2 },
      { question_key: 'be_tech_level', answer_key: 'l3', answer_text: 'Level 3 — Competent, works independently (technician, installer)', sort_order: 3 },
      { question_key: 'be_tech_level', answer_key: 'l4', answer_text: 'Level 4 — Trade-qualified or specialist (senior technician)', sort_order: 4 },
      { question_key: 'be_tech_level', answer_key: 'l5', answer_text: 'Level 5 — Team leader or advanced specialist (lead technician)', sort_order: 5 },
      { question_key: 'be_tech_level', answer_key: 'l6', answer_text: 'Level 6 — Workshop or department manager (most senior technical role)', sort_order: 6 },
      // Q3: be_sales_level
      { question_key: 'be_sales_level', answer_key: 'sales1', answer_text: 'Level 1 — Entry-level salesperson (showroom sales, product demos)', sort_order: 1 },
      { question_key: 'be_sales_level', answer_key: 'sales2', answer_text: 'Level 2 — Experienced salesperson (own territory, account management)', sort_order: 2 },
      { question_key: 'be_sales_level', answer_key: 'sales3', answer_text: 'Level 3 — Senior salesperson (major accounts, team leadership)', sort_order: 3 },
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
