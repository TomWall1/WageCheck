/**
 * Seed script — State Government Agencies Award 2020 [MA000121]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000121
 *
 * NOTE: This is a complex award with many streams. Rates are APPROXIMATE
 * and should be updated via sync_from_fwc.js when API data is available.
 *
 * Five streams:
 *   admin        — APS 1-6, EL 1-2 (8 levels)
 *   technical    — TO 1-4 (4 levels)
 *   professional — ES 1-2 (2 levels)
 *   it           — ITO 1-2 (2 levels)
 *   legal        — LO 1-2 (2 levels)
 *
 * Adult FT/PT hourly rates (APPROXIMATE):
 *   APS1: $25.54  APS2: $28.12  APS3: $31.19  APS4: $34.96
 *   APS5: $38.45  APS6: $43.28  EL1: $52.46   EL2: $60.56
 *   TO1: $25.54   TO2: $28.12   TO3: $31.19   TO4: $34.96
 *   ES1: $28.98   ES2: $34.01
 *   ITO1: $28.12  ITO2: $34.96
 *   LO1: $38.45   LO2: $52.46
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.50, Sun x2.00, PH x2.50
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: None (government employment typically requires 18+)
 *
 * Run after migrate.js: node scripts/seed_ma000121.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000121';
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
      'State Government Agencies Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000121.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Admin stream ────────────────────────────────────────────────────────
      {
        level: 1, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 1',
        description: 'You are an entry-level administrative worker in a state government agency. No previous experience is needed. You do basic office tasks like data entry, filing, photocopying, answering phones, and sorting mail. You work under close supervision and follow clear instructions.',
        duties: [
          'Performing routine data entry, filing, and record-keeping tasks',
          'Answering phones, taking messages, and directing enquiries',
          'Sorting and distributing incoming and outgoing mail',
          'Photocopying, scanning, and collating documents',
          'Assisting other staff with basic administrative tasks as directed',
        ],
        indicative_tasks: ['Administrative assistant (entry)', 'Receptionist (entry)', 'Data entry clerk', 'Mail room officer'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 2',
        description: 'You have some experience or training in office administration. You handle a broader range of tasks than Level 1, with less direct supervision. You may be responsible for a specific administrative function like records, accounts payable, or reception duties.',
        duties: [
          'Processing forms, applications, and basic financial transactions',
          'Maintaining filing systems, databases, and office records',
          'Providing front-counter or reception services to the public',
          'Preparing routine correspondence, reports, and spreadsheets',
          'Coordinating meeting rooms, travel bookings, and supplies',
        ],
        indicative_tasks: ['Administrative officer', 'Receptionist', 'Accounts clerk', 'Records officer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 3',
        description: 'You are an experienced administrative worker who can handle a variety of tasks with minimal supervision. You may coordinate a small team or be responsible for a defined area of work. You solve everyday problems and make routine decisions on your own.',
        duties: [
          'Coordinating administrative processes for a team or section',
          'Preparing more complex documents, briefings, and reports',
          'Providing advice to colleagues and the public on standard procedures',
          'Maintaining and improving office systems and processes',
          'Handling enquiries and complaints that require some judgement',
        ],
        indicative_tasks: ['Senior administrative officer', 'Executive assistant', 'Project support officer', 'Accounts officer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 4',
        description: 'You work at a higher level of responsibility, often coordinating a function or small team. You are expected to use your own judgement, interpret policies, and handle non-routine situations. You may be involved in project work or policy implementation.',
        duties: [
          'Supervising a small team of administrative staff',
          'Interpreting and applying policies, procedures, and legislation',
          'Coordinating projects, events, or specific programs',
          'Preparing complex reports, submissions, and correspondence',
          'Managing budgets, procurement, or contract administration for your area',
        ],
        indicative_tasks: ['Team leader (admin)', 'Project officer', 'Policy officer (junior)', 'Finance officer', 'Contracts officer'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 5',
        description: 'You are a senior administrative officer or team leader. You manage a team, a program, or a significant function. You are expected to contribute to planning, provide expert advice, and solve complex problems.',
        duties: [
          'Managing a team and being responsible for their performance and development',
          'Contributing to operational planning and resource allocation',
          'Providing specialist advice in your area of expertise',
          'Leading or contributing to projects with broader organisational impact',
          'Representing your section in meetings and working groups',
        ],
        indicative_tasks: ['Senior project officer', 'Section leader', 'Senior finance officer', 'Program coordinator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'admin',
        fwc_id: null,
        title: 'APS Level 6',
        description: 'You are a highly experienced officer, often managing a unit or leading a specialised function. You have significant autonomy and are expected to provide expert advice, develop policy, and manage significant resources.',
        duties: [
          'Managing a unit, branch, or significant program area',
          'Developing policies, strategies, and operational plans',
          'Managing substantial budgets and overseeing financial reporting',
          'Providing expert-level advice to senior management',
          'Leading cross-functional projects and managing stakeholder relationships',
        ],
        indicative_tasks: ['Unit manager', 'Senior policy officer', 'Branch coordinator', 'Senior program manager'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'admin',
        fwc_id: null,
        title: 'Executive Level 1 (EL 1)',
        description: 'You are a senior manager responsible for a branch or major function within the agency. You lead large teams, set direction, and are accountable for significant outcomes. You are expected to think strategically and manage complex stakeholder relationships.',
        duties: [
          'Leading and managing a branch or large team',
          'Setting strategic direction and priorities for your area',
          'Managing significant budgets, contracts, and resources',
          'Providing high-level strategic and policy advice to executives',
          'Representing the agency externally and managing key partnerships',
        ],
        indicative_tasks: ['Branch manager', 'Director', 'Senior manager', 'Principal policy adviser'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'admin',
        fwc_id: null,
        title: 'Executive Level 2 (EL 2)',
        description: 'You are at the most senior classification level in the administrative stream. You lead a major division or are responsible for whole-of-agency functions. You report to the agency head or equivalent and are accountable for strategic outcomes, major programs, and large teams.',
        duties: [
          'Leading a division or multiple branches within the agency',
          'Setting whole-of-agency policy direction in your portfolio',
          'Managing very large budgets and being accountable for financial outcomes',
          'Providing strategic advice to the agency head and government ministers',
          'Leading organisational change, reform programs, and major initiatives',
        ],
        indicative_tasks: ['Division head', 'Assistant secretary', 'General manager', 'Chief operating officer'],
        sort_order: 80,
      },
      // ── Technical stream ────────────────────────────────────────────────────
      {
        level: 1, stream: 'technical',
        fwc_id: null,
        title: 'Technical Officer Level 1 (TO 1)',
        description: 'You are an entry-level technical worker in a state government agency. You perform basic technical or scientific tasks under supervision, such as collecting samples, operating simple lab equipment, conducting routine tests, or assisting with field work. No previous experience is required.',
        duties: [
          'Collecting samples, specimens, or data in the field or laboratory',
          'Operating basic laboratory or technical equipment under supervision',
          'Recording observations, measurements, and test results accurately',
          'Maintaining equipment, tools, and work areas in clean and safe condition',
          'Assisting more experienced technical officers with their work',
        ],
        indicative_tasks: ['Laboratory assistant', 'Field assistant', 'Technical aide', 'Survey assistant'],
        sort_order: 90,
      },
      {
        level: 2, stream: 'technical',
        fwc_id: null,
        title: 'Technical Officer Level 2 (TO 2)',
        description: 'You have some experience or relevant qualifications (such as a Certificate III or IV). You can carry out standard technical procedures independently and may be responsible for maintaining specific equipment or processes.',
        duties: [
          'Performing standard technical tests, analyses, and measurements independently',
          'Operating and maintaining specialist technical equipment',
          'Preparing reports on test results and technical findings',
          'Calibrating and maintaining instruments to ensure accuracy',
          'Providing technical support to professional and scientific staff',
        ],
        indicative_tasks: ['Technical officer', 'Laboratory technician', 'Survey technician', 'Environmental monitoring officer'],
        sort_order: 100,
      },
      {
        level: 3, stream: 'technical',
        fwc_id: null,
        title: 'Technical Officer Level 3 (TO 3)',
        description: 'You are an experienced technical officer who can handle complex tasks and may supervise junior technical staff. You have significant technical knowledge and may hold a diploma or advanced certificate in your field.',
        duties: [
          'Performing complex technical analyses and investigations',
          'Supervising and training junior technical staff',
          'Developing and improving technical procedures and methods',
          'Providing technical advice to management and professional staff',
          'Managing technical projects and coordinating fieldwork programs',
        ],
        indicative_tasks: ['Senior technical officer', 'Laboratory supervisor', 'Senior survey technician', 'Technical coordinator'],
        sort_order: 110,
      },
      {
        level: 4, stream: 'technical',
        fwc_id: null,
        title: 'Technical Officer Level 4 (TO 4)',
        description: 'You are at the most senior technical officer level. You manage a technical team or laboratory, or serve as the principal technical expert in your field. You have extensive experience and advanced qualifications.',
        duties: [
          'Managing a technical team, laboratory, or field operations unit',
          'Setting technical standards, quality assurance, and safety protocols',
          'Providing expert-level technical advice to senior management',
          'Managing budgets, procurement, and resourcing for your technical area',
          'Representing the agency on technical matters with external organisations',
        ],
        indicative_tasks: ['Principal technical officer', 'Laboratory manager', 'Chief surveyor', 'Technical services manager'],
        sort_order: 120,
      },
      // ── Professional/ES stream ──────────────────────────────────────────────
      {
        level: 1, stream: 'professional',
        fwc_id: 4743,
        title: 'Education Support Level 1 (ES 1)',
        description: 'You are an entry-level professional or education support worker in a state government agency. You have relevant qualifications (such as a degree or diploma) and provide professional services in your field. You work under supervision while building your professional skills and knowledge.',
        duties: [
          'Providing professional support services in your area of expertise',
          'Assisting with program delivery, assessments, and reporting',
          'Maintaining professional records and documentation',
          'Participating in team meetings and professional development activities',
          'Applying your professional knowledge under the guidance of senior staff',
        ],
        indicative_tasks: ['Education support officer', 'Graduate professional officer', 'Program support officer', 'Research assistant'],
        sort_order: 130,
      },
      {
        level: 2, stream: 'professional',
        fwc_id: 4748,
        title: 'Education Support Level 2 (ES 2)',
        description: 'You are an experienced professional or education support worker with significant expertise. You work independently, may supervise others, and contribute to program development and policy in your area.',
        duties: [
          'Independently managing professional workloads and caseloads',
          'Supervising and mentoring junior professional staff',
          'Contributing to program design, evaluation, and improvement',
          'Providing expert professional advice to management and stakeholders',
          'Leading projects or specialist functions within your area',
        ],
        indicative_tasks: ['Senior education support officer', 'Senior professional officer', 'Program leader', 'Senior research officer'],
        sort_order: 140,
      },
      // ── IT stream ───────────────────────────────────────────────────────────
      {
        level: 1, stream: 'it',
        fwc_id: null,
        title: 'IT Officer Level 1 (ITO 1)',
        description: 'You are an entry-level IT worker in a state government agency. You provide basic IT support, help desk services, or assist with system administration tasks. You may have a relevant certificate or diploma, or be learning on the job.',
        duties: [
          'Providing first-level help desk and desktop support to agency staff',
          'Installing, configuring, and troubleshooting standard hardware and software',
          'Logging and tracking IT support requests and incidents',
          'Assisting with user account management and access permissions',
          'Following IT security procedures and escalating complex issues',
        ],
        indicative_tasks: ['IT help desk officer', 'Desktop support technician', 'Junior systems administrator', 'IT support officer'],
        sort_order: 150,
      },
      {
        level: 2, stream: 'it',
        fwc_id: null,
        title: 'IT Officer Level 2 (ITO 2)',
        description: 'You are an experienced IT professional who handles more complex work. You may specialise in an area such as systems administration, networking, database management, or software development. You work with significant independence and may supervise junior IT staff.',
        duties: [
          'Managing and maintaining server infrastructure, networks, or databases',
          'Developing, testing, and deploying software applications or scripts',
          'Providing second-level or specialist technical support',
          'Supervising and mentoring junior IT staff',
          'Contributing to IT project planning, security reviews, and system upgrades',
        ],
        indicative_tasks: ['Systems administrator', 'Network engineer', 'Database administrator', 'Software developer', 'IT project officer'],
        sort_order: 160,
      },
      // ── Legal stream ────────────────────────────────────────────────────────
      {
        level: 1, stream: 'legal',
        fwc_id: null,
        title: 'Legal Officer Level 1 (LO 1)',
        description: 'You are an entry-level or junior legal officer in a state government agency. You hold a law degree and may be admitted to practice. You provide legal research, draft documents, and assist senior legal officers with matters. You work under supervision.',
        duties: [
          'Conducting legal research on legislation, case law, and regulatory matters',
          'Drafting legal documents, briefs, and correspondence',
          'Assisting with the preparation of legal advice and opinions',
          'Reviewing contracts, agreements, and legislative instruments',
          'Supporting senior legal officers in litigation and dispute resolution matters',
        ],
        indicative_tasks: ['Legal officer', 'Junior solicitor', 'Legal research officer', 'Legislative drafter (junior)'],
        sort_order: 170,
      },
      {
        level: 2, stream: 'legal',
        fwc_id: null,
        title: 'Legal Officer Level 2 (LO 2)',
        description: 'You are a senior legal officer with significant experience and expertise. You provide independent legal advice, manage complex legal matters, and may lead a small legal team. You are expected to exercise a high degree of professional judgement.',
        duties: [
          'Providing independent legal advice on complex matters to senior management',
          'Managing litigation, disputes, and regulatory proceedings',
          'Supervising and mentoring junior legal staff',
          'Drafting and reviewing significant legislation, policy, and contracts',
          'Representing the agency in legal proceedings, negotiations, and inter-agency forums',
        ],
        indicative_tasks: ['Senior legal officer', 'Principal solicitor', 'Legal team leader', 'Senior legislative drafter'],
        sort_order: 180,
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
    // NOTE: These rates are APPROXIMATE. Update via sync_from_fwc.js for exact API values.
    const baseRates = {
      admin:        { 1: 25.54, 2: 28.12, 3: 31.19, 4: 34.96, 5: 38.45, 6: 43.28, 7: 52.46, 8: 60.56 },
      technical:    { 1: 25.54, 2: 28.12, 3: 31.19, 4: 34.96 },
      professional: { 1: 28.98, 2: 34.01 },
      it:           { 1: 28.12, 2: 34.96 },
      legal:        { 1: 38.45, 2: 52.46 },
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
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Casual Saturday — time and a half (×1.50 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Casual Sunday — double time (×2.00 of casual base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — double time and a half (×2.50 of casual base)' },
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
        allowance_type: 'meal_ot',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime and are not given a meal, you are entitled to a meal allowance of $22.67.',
        trigger_condition: 'Required to work overtime without meal provided',
        amount: 22.67, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.99 per kilometre driven.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $15.12 per week ($786.05 per year).',
        trigger_condition: 'Appointed as first aid officer with current certificate',
        amount: 15.12, amount_type: 'fixed', per_unit: 'per_week',
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
        question_key: 'state_govt_stream',
        question_text: 'What type of work do you do in the state government agency?',
        help_text: 'Administrative covers general office and management roles (APS/EL). Technical covers laboratory, survey, and scientific support work (TO). Professional/ES covers education support and other professional roles (ES). IT covers information technology roles (ITO). Legal covers solicitors, legal researchers, and legislative drafters (LO).',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'sga_admin_level',
        question_text: 'What is your administrative classification level?',
        help_text: 'APS 1 is entry-level (data entry, filing). APS 2-3 are experienced admin officers. APS 4-5 are team leaders or senior officers. APS 6 manages a unit. EL 1 is a branch manager or director. EL 2 is the most senior level — division head or general manager.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'state_govt_stream',
        parent_answer_key: 'admin',
        sort_order: 2,
      },
      {
        question_key: 'sga_tech_level',
        question_text: 'What is your technical officer level?',
        help_text: 'TO 1 is entry-level (lab assistant, field assistant). TO 2 has some experience or qualifications. TO 3 is experienced, may supervise others. TO 4 is the most senior — manages a lab or technical team.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'state_govt_stream',
        parent_answer_key: 'technical',
        sort_order: 3,
      },
      {
        question_key: 'sga_es_level',
        question_text: 'What is your education support / professional level?',
        help_text: 'ES 1 is entry-level professional or education support. ES 2 is experienced, works independently and may supervise others.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'state_govt_stream',
        parent_answer_key: 'professional',
        sort_order: 4,
      },
      {
        question_key: 'sga_ito_level',
        question_text: 'What is your IT officer level?',
        help_text: 'ITO 1 is entry-level IT support (help desk, desktop support). ITO 2 is experienced — systems admin, developer, network engineer, or IT team leader.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'state_govt_stream',
        parent_answer_key: 'it',
        sort_order: 5,
      },
      {
        question_key: 'sga_lo_level',
        question_text: 'What is your legal officer level?',
        help_text: 'LO 1 is a junior legal officer — legal research, drafting, and assisting senior lawyers. LO 2 is a senior legal officer — provides independent advice, manages complex matters, may lead a legal team.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'state_govt_stream',
        parent_answer_key: 'legal',
        sort_order: 6,
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
      // Q1: state_govt_stream
      { question_key: 'state_govt_stream', answer_key: 'admin',        answer_text: 'Administrative (general office, management, policy, finance — APS/EL)', sort_order: 1 },
      { question_key: 'state_govt_stream', answer_key: 'technical',    answer_text: 'Technical (laboratory, survey, scientific, environmental — TO)', sort_order: 2 },
      { question_key: 'state_govt_stream', answer_key: 'professional', answer_text: 'Professional / Education Support (ES)', sort_order: 3 },
      { question_key: 'state_govt_stream', answer_key: 'it',           answer_text: 'Information Technology (help desk, systems, development — ITO)', sort_order: 4 },
      { question_key: 'state_govt_stream', answer_key: 'legal',        answer_text: 'Legal (solicitor, legal researcher, legislative drafter — LO)', sort_order: 5 },
      // Q2: sga_admin_level
      { question_key: 'sga_admin_level', answer_key: 'aps1', answer_text: 'APS 1 — Entry-level (data entry, filing, phones, mail)', sort_order: 1 },
      { question_key: 'sga_admin_level', answer_key: 'aps2', answer_text: 'APS 2 — Some experience (processing forms, reception, accounts)', sort_order: 2 },
      { question_key: 'sga_admin_level', answer_key: 'aps3', answer_text: 'APS 3 — Experienced, handles varied tasks with minimal supervision', sort_order: 3 },
      { question_key: 'sga_admin_level', answer_key: 'aps4', answer_text: 'APS 4 — Coordinates a function or small team, uses own judgement', sort_order: 4 },
      { question_key: 'sga_admin_level', answer_key: 'aps5', answer_text: 'APS 5 — Senior officer or team leader, manages a program', sort_order: 5 },
      { question_key: 'sga_admin_level', answer_key: 'aps6', answer_text: 'APS 6 — Unit manager, develops policy, manages significant resources', sort_order: 6 },
      { question_key: 'sga_admin_level', answer_key: 'el1',  answer_text: 'EL 1 — Branch manager or director, leads large teams', sort_order: 7 },
      { question_key: 'sga_admin_level', answer_key: 'el2',  answer_text: 'EL 2 — Division head or general manager (most senior)', sort_order: 8 },
      // Q3: sga_tech_level
      { question_key: 'sga_tech_level', answer_key: 'to1', answer_text: 'TO 1 — Entry-level (lab assistant, field assistant, survey aide)', sort_order: 1 },
      { question_key: 'sga_tech_level', answer_key: 'to2', answer_text: 'TO 2 — Some experience, performs standard procedures independently', sort_order: 2 },
      { question_key: 'sga_tech_level', answer_key: 'to3', answer_text: 'TO 3 — Experienced, handles complex tasks, may supervise juniors', sort_order: 3 },
      { question_key: 'sga_tech_level', answer_key: 'to4', answer_text: 'TO 4 — Senior, manages a lab or technical team (most senior)', sort_order: 4 },
      // Q4: sga_es_level
      { question_key: 'sga_es_level', answer_key: 'es1', answer_text: 'ES 1 — Entry-level professional or education support', sort_order: 1 },
      { question_key: 'sga_es_level', answer_key: 'es2', answer_text: 'ES 2 — Experienced, works independently, may supervise others', sort_order: 2 },
      // Q5: sga_ito_level
      { question_key: 'sga_ito_level', answer_key: 'ito1', answer_text: 'ITO 1 — Entry-level IT (help desk, desktop support)', sort_order: 1 },
      { question_key: 'sga_ito_level', answer_key: 'ito2', answer_text: 'ITO 2 — Experienced IT (sysadmin, developer, network engineer)', sort_order: 2 },
      // Q6: sga_lo_level
      { question_key: 'sga_lo_level', answer_key: 'lo1', answer_text: 'LO 1 — Junior legal officer (research, drafting, assisting)', sort_order: 1 },
      { question_key: 'sga_lo_level', answer_key: 'lo2', answer_text: 'LO 2 — Senior legal officer (independent advice, manages matters)', sort_order: 2 },
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
