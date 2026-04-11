/**
 * Seed script — Local Government Industry Award 2020 [MA000112]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000112
 *
 * One stream:
 *   local_govt — Level 1 through Level 11 (11 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $25.88   L2: $26.70   L3: $27.71   L4: $28.12
 *   L5: $29.88   L6: $32.34   L7: $32.90   L8: $35.55
 *   L9: $38.03   L10: $41.56  L11: $46.87
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.25, Sun x1.75, PH x2.25
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: Under 16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%
 *
 * Allowances:
 *   Meal (OT >2hr): $19.93, Meal (further 4hr OT): $19.93,
 *   Vehicle car: $0.98/km, Vehicle motorcycle: $0.33/km,
 *   First aid: $19.68/week, Tool (tradespersons): $22.25/week
 *
 * Run after migrate.js: node scripts/seed_ma000112.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000112';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // -- Award metadata -----------------------------------------------------------
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Local Government Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000112.html',
    ]);

    // -- Classifications ----------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'local_govt',
        fwc_id: 4393,
        title: 'Level 1',
        description: 'This is the entry-level position in local government. You do not need any previous experience or qualifications. You carry out simple, routine tasks under close supervision. Your work is clearly defined and you follow set procedures. This level is for people who are new to working in council or local government and are learning the basics of the job.',
        duties: [
          'Performing basic cleaning and maintenance of council facilities such as parks, halls, and public toilets',
          'Carrying out routine manual labouring tasks like digging, sweeping, and loading',
          'Collecting and sorting mail, deliveries, and supplies',
          'Assisting other workers by fetching tools, materials, and equipment',
          'Performing simple data entry or filing tasks under direct supervision',
        ],
        indicative_tasks: ['General labourer', 'Cleaner', 'Mail clerk', 'Grounds maintenance assistant', 'Office assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'local_govt',
        fwc_id: 4394,
        title: 'Level 2',
        description: 'You have some experience working in local government or a similar workplace. You can carry out a range of straightforward tasks with limited supervision. You are expected to use basic skills and knowledge to complete your work, and you may help train new Level 1 workers. This level suits people who have been in the job for a while and can work more independently.',
        duties: [
          'Operating basic equipment such as ride-on mowers, line trimmers, and small plant',
          'Performing routine administrative tasks like photocopying, scanning, and answering phones',
          'Assisting with setting up and packing down for community events and council meetings',
          'Carrying out basic stock control and ordering of supplies',
          'Recording simple data and maintaining basic records',
        ],
        indicative_tasks: ['Gardener (entry)', 'Library assistant', 'Customer service officer (entry)', 'Stores assistant', 'Administration assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'local_govt',
        fwc_id: 4395,
        title: 'Level 3',
        description: 'You are an experienced worker or trades assistant. You can work without close supervision and handle tasks that require judgement and problem-solving. You might have completed a Certificate III or have equivalent on-the-job experience. At this level you are expected to organise your own work and may guide less experienced workers.',
        duties: [
          'Performing trades assistant work such as helping qualified tradespeople with plumbing, carpentry, or electrical jobs',
          'Operating medium-sized plant and equipment like backhoes and small trucks',
          'Processing customer enquiries and complaints with some decision-making authority',
          'Preparing basic reports, letters, and council correspondence',
          'Assisting with inspections of council infrastructure like roads, drains, and footpaths',
          'Maintaining records and databases with accuracy and attention to detail',
        ],
        indicative_tasks: ['Trades assistant', 'Plant operator (medium)', 'Customer service officer (experienced)', 'Records officer', 'Animal control assistant', 'Road maintenance worker'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'local_govt',
        fwc_id: 4396,
        title: 'Level 4',
        description: 'You are trade qualified, meaning you have completed a formal apprenticeship or hold a Certificate III trade qualification. You work independently using your trade skills to carry out your duties. You are responsible for the quality of your own work and may supervise assistants. This level is for qualified tradespeople working in council roles.',
        duties: [
          'Performing trade-qualified work such as plumbing, carpentry, electrical, or mechanical repairs on council buildings and infrastructure',
          'Diagnosing faults and carrying out repairs to council plant and equipment',
          'Reading and interpreting plans, drawings, and technical specifications',
          'Ensuring work complies with Australian Standards and council safety procedures',
          'Maintaining tools, equipment, and work vehicles in safe working order',
          'Completing job records, timesheets, and safety checklists',
        ],
        indicative_tasks: ['Plumber', 'Carpenter', 'Electrician', 'Mechanic', 'Qualified gardener/horticulturist', 'Building maintenance officer'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'local_govt',
        fwc_id: 4397,
        title: 'Level 5',
        description: 'You are an experienced tradesperson or technical worker with skills beyond the basic trade qualification. You may hold additional certificates, licences, or specialist training. At this level you work on complex tasks, may lead small teams, and provide technical advice to others. This level is for people who have built significant expertise in their field.',
        duties: [
          'Leading a small team of workers on maintenance, construction, or project tasks',
          'Performing complex or specialised trade work that goes beyond standard trade duties',
          'Providing technical advice and guidance to less experienced tradespeople',
          'Coordinating work schedules and allocating tasks within a team',
          'Carrying out technical inspections and preparing reports on council assets',
          'Training and mentoring apprentices and junior workers',
        ],
        indicative_tasks: ['Senior tradesperson', 'Technical officer', 'Leading hand', 'Building inspector (entry)', 'Environmental health officer (entry)', 'IT support officer'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'local_govt',
        fwc_id: 4398,
        title: 'Level 6',
        description: 'You are an advanced tradesperson or specialist professional. You hold specialist qualifications or have extensive experience that sets you apart from standard trade-qualified workers. You work with a high degree of independence and are responsible for planning and managing your own work. You may supervise teams and contribute to planning and policy.',
        duties: [
          'Managing specialist projects from planning through to completion',
          'Performing advanced diagnostic and repair work on complex council systems and infrastructure',
          'Preparing detailed technical reports, costings, and recommendations for management',
          'Supervising and coordinating teams of tradespeople and labourers',
          'Developing and implementing maintenance programs for council assets',
          'Liaising with contractors, consultants, and other government agencies',
        ],
        indicative_tasks: ['Advanced tradesperson', 'Specialist technician', 'Works supervisor', 'Senior building inspector', 'Town planner (entry)', 'Senior IT officer'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'local_govt',
        fwc_id: 4399,
        title: 'Level 7',
        description: 'You are a senior tradesperson or front-line supervisor. You are responsible for supervising a team, coordinating daily operations, and ensuring work quality. You make decisions about how work is done and handle day-to-day problems. This level is for experienced people who take charge of a work area or crew.',
        duties: [
          'Supervising a crew or section of council workers on a daily basis',
          'Planning and scheduling work programs for your team or area of responsibility',
          'Monitoring work quality and ensuring compliance with council standards and safety requirements',
          'Handling staff issues including rosters, leave, and performance matters',
          'Preparing progress reports and providing updates to management',
          'Managing budgets and resources for your area of operations',
        ],
        indicative_tasks: ['Crew supervisor', 'Depot supervisor', 'Senior technical officer', 'Parks and gardens supervisor', 'Fleet coordinator', 'Senior customer service officer'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'local_govt',
        fwc_id: 4400,
        title: 'Level 8',
        description: 'You are a professional or technical specialist, typically holding a diploma or degree. You work at a high level of expertise and are responsible for significant areas of council operations. You provide expert advice, manage complex projects, and may supervise professional or technical staff. This level requires strong analytical and communication skills.',
        duties: [
          'Managing a functional area or department within council operations',
          'Providing professional or technical advice to council management and elected officials',
          'Developing policies, procedures, and strategic plans for your area of expertise',
          'Managing significant budgets and allocating resources across projects',
          'Preparing complex reports, submissions, and presentations for council meetings',
          'Mentoring and developing professional and technical staff',
        ],
        indicative_tasks: ['Professional engineer', 'Senior town planner', 'Environmental health manager', 'Finance officer', 'Human resources officer', 'Senior project manager'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'local_govt',
        fwc_id: 4401,
        title: 'Level 9',
        description: 'You are a senior professional with extensive experience and high-level qualifications. You are responsible for major areas of council business and contribute to organisational strategy. You manage multiple teams or complex programs and are a key decision-maker. This level is for experienced professionals who shape how the council operates.',
        duties: [
          'Directing multiple teams or a large functional area within council',
          'Contributing to the development of council-wide strategic plans and policies',
          'Managing complex, high-value projects and programs with significant community impact',
          'Representing council in negotiations with government agencies, developers, and community groups',
          'Providing high-level professional advice to senior management and councillors',
          'Overseeing compliance with legislation, regulations, and council governance requirements',
        ],
        indicative_tasks: ['Senior engineer', 'Principal planner', 'Manager community services', 'Manager infrastructure', 'Senior finance manager', 'Manager governance'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'local_govt',
        fwc_id: 4402,
        title: 'Level 10',
        description: 'You are in a management role with broad responsibility for a major division or function of council. You set direction for your area, manage large budgets, and are accountable for outcomes. You work closely with the executive team and play a significant role in shaping council strategy and service delivery.',
        duties: [
          'Managing a major division or directorate of council with multiple teams reporting to you',
          'Setting strategic direction and priorities for your division in line with the council plan',
          'Preparing and managing divisional budgets worth hundreds of thousands or millions of dollars',
          'Leading organisational change and continuous improvement initiatives',
          'Building and maintaining relationships with key external stakeholders and government bodies',
          'Reporting directly to the executive team on divisional performance and strategic issues',
        ],
        indicative_tasks: ['Director of works', 'Director of planning', 'Director of community services', 'Chief financial officer', 'Director of corporate services', 'Director of infrastructure'],
        sort_order: 100,
      },
      {
        level: 11, stream: 'local_govt',
        fwc_id: 4403,
        title: 'Level 11',
        description: 'You are in a senior management role at the highest level covered by this award. You have overall responsibility for major strategic functions and report directly to the chief executive or general manager. You shape the direction of council operations and are accountable for significant organisational outcomes.',
        duties: [
          'Providing strategic leadership across multiple divisions or the entire organisation',
          'Advising the chief executive, general manager, and elected councillors on high-level strategic matters',
          'Leading the development and implementation of long-term plans, policies, and major initiatives',
          'Managing executive-level budgets and ensuring sound financial governance',
          'Representing the council at the highest levels with government, industry, and community leaders',
          'Driving organisational culture, performance, and accountability across the council',
        ],
        indicative_tasks: ['Deputy general manager', 'Executive director', 'Chief operating officer', 'Senior director', 'Assistant general manager'],
        sort_order: 110,
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

    // -- Pay rates ----------------------------------------------------------------
    const baseRates = {
      local_govt: { 1: 25.88, 2: 26.70, 3: 27.71, 4: 28.12, 5: 29.88, 6: 32.34, 7: 32.90, 8: 35.55, 9: 38.03, 10: 41.56, 11: 46.87 },
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

    // -- Penalty rates ------------------------------------------------------------
    const penaltyRates = [
      // Full-time
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.5)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Part-time
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.5)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Casual
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.25, description: 'Casual Saturday — x1.25 of casual base (x1.5 of ordinary, less casual loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.75, description: 'Casual Sunday — x1.75 of casual base (x2.0 of ordinary, less casual loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.25, description: 'Casual public holiday — x2.25 of casual base (x2.5 of ordinary, less casual loading)' },
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

    // -- Overtime rates -----------------------------------------------------------
    // Daily threshold: 7.6 hours/day.
    // First 2 OT hours: x1.50, after 2 OT hours: x2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (x2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (x2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (x2.00)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // -- Allowances ---------------------------------------------------------------
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $19.93.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further overtime)',
        description: 'If you continue working overtime for a further 4 hours after the first meal allowance, you are entitled to an additional meal allowance of $19.93.',
        trigger_condition: 'Further 4 hours overtime after first meal allowance',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.98 per kilometre driven.',
        trigger_condition: 'Required to use own car for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre driven.',
        trigger_condition: 'Required to use own motorcycle for work',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid qualification, you are entitled to $19.68 per week.',
        trigger_condition: 'Appointed as first aid officer with current qualification',
        amount: 19.68, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance (tradespersons)',
        description: 'If you are a tradesperson required to supply and maintain your own tools, you are entitled to a tool allowance of $22.25 per week.',
        trigger_condition: 'Tradesperson required to supply own tools',
        amount: 22.25, amount_type: 'fixed', per_unit: 'per_week',
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

    // -- Break entitlements -------------------------------------------------------
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'After 5 hours of continuous work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.',
      },
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One 10-minute paid rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for every 4 hours you work.',
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

    // -- Classification questions -------------------------------------------------
    const questions = [
      {
        question_key: 'local_govt_level',
        question_text: 'What level best describes your local government role?',
        help_text: 'Your level depends on your qualifications, experience, and the type of work you do. Level 1 is entry-level with no experience needed. Levels 4-6 are for trade-qualified and specialist workers. Levels 7-11 are for supervisors, professionals, and managers.',
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

    // -- Classification answers ---------------------------------------------------
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'local_govt_level', answer_key: 'l1',  answer_text: 'Level 1 — Entry-level, routine tasks, no experience needed (labourer, cleaner, mail clerk)', sort_order: 1 },
      { question_key: 'local_govt_level', answer_key: 'l2',  answer_text: 'Level 2 — Some experience, basic skills (gardener, library assistant, admin assistant)', sort_order: 2 },
      { question_key: 'local_govt_level', answer_key: 'l3',  answer_text: 'Level 3 — Trades assistant or experienced worker (plant operator, customer service, records officer)', sort_order: 3 },
      { question_key: 'local_govt_level', answer_key: 'l4',  answer_text: 'Level 4 — Trade qualified (plumber, carpenter, electrician, mechanic)', sort_order: 4 },
      { question_key: 'local_govt_level', answer_key: 'l5',  answer_text: 'Level 5 — Experienced tradesperson or technical (leading hand, technical officer, building inspector)', sort_order: 5 },
      { question_key: 'local_govt_level', answer_key: 'l6',  answer_text: 'Level 6 — Advanced tradesperson or specialist (works supervisor, senior inspector, town planner entry)', sort_order: 6 },
      { question_key: 'local_govt_level', answer_key: 'l7',  answer_text: 'Level 7 — Senior tradesperson or front-line supervisor (crew supervisor, depot supervisor)', sort_order: 7 },
      { question_key: 'local_govt_level', answer_key: 'l8',  answer_text: 'Level 8 — Professional or technical specialist (engineer, senior planner, finance officer)', sort_order: 8 },
      { question_key: 'local_govt_level', answer_key: 'l9',  answer_text: 'Level 9 — Senior professional (senior engineer, principal planner, manager)', sort_order: 9 },
      { question_key: 'local_govt_level', answer_key: 'l10', answer_text: 'Level 10 — Management (director of works, director of planning, CFO)', sort_order: 10 },
      { question_key: 'local_govt_level', answer_key: 'l11', answer_text: 'Level 11 — Senior management (deputy general manager, executive director)', sort_order: 11 },
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

seed();
