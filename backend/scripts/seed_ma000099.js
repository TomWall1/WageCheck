/**
 * Seed script — Labour Market Assistance Industry Award 2020 [MA000099]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000099
 *
 * One stream:
 *   labour_market — Administrative Assistant through Manager Grade 2 (7 classifications)
 *
 * Adult FT/PT hourly rates (from API, Pay Point 1 for each):
 *   Admin Assistant: $27.34   Admin Officer: $31.49   ESO Grade 1: $30.57
 *   ESO Grade 2: $32.89      ES Coordinator: $36.47   Manager G1: $36.47
 *   Manager G2: $41.90
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
 * Junior rates: Under 18=70%, 18=80%, 19=90%, 20+=adult
 *
 * Allowances:
 *   Meal (OT >2hr): $19.64, Vehicle: $0.98/km,
 *   First aid: $17.65/week, Sleepover (excursions): $82.00/night
 *
 * Run after migrate.js: node scripts/seed_ma000099.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000099';
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
      'Labour Market Assistance Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000099.html',
    ]);

    // -- Classifications ----------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'labour_market',
        fwc_id: 4023,
        title: 'Administrative Assistant',
        description: 'You are an entry-level administrative worker in an employment services organisation. You carry out basic office and clerical tasks under close supervision. No prior experience in the industry is required. This role suits people who are new to office work or the employment services sector and are learning the basics of how the organisation operates.',
        duties: [
          'Answering phones, greeting visitors, and directing enquiries to the right person',
          'Performing basic data entry, filing, photocopying, and scanning',
          'Sorting and distributing incoming mail and preparing outgoing mail',
          'Maintaining office supplies and keeping the reception and common areas tidy',
          'Assisting other staff with simple administrative tasks as directed',
        ],
        indicative_tasks: ['Receptionist', 'Office junior', 'Filing clerk', 'Data entry operator', 'Mail room assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'labour_market',
        fwc_id: 4027,
        title: 'Administrative Officer',
        description: 'You are an experienced administrative worker who handles a range of office tasks with limited supervision. You have a good understanding of office systems and procedures. You may be responsible for specific administrative functions and can solve routine problems on your own. This role is for people who have built up their skills through experience or training.',
        duties: [
          'Managing office databases, records, and filing systems with accuracy',
          'Preparing correspondence, reports, and other documents for staff and management',
          'Coordinating meeting schedules, room bookings, and travel arrangements',
          'Processing invoices, purchase orders, and basic financial transactions',
          'Providing support to employment services staff with administrative aspects of their work',
          'Handling enquiries from job seekers, employers, and government agencies',
        ],
        indicative_tasks: ['Office administrator', 'Executive assistant', 'Accounts clerk', 'Records manager', 'Customer service officer', 'Administrative coordinator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'labour_market',
        fwc_id: 4031,
        title: 'Employment Services Officer Grade 1',
        description: 'You are a frontline case worker who helps job seekers find employment. You work directly with people who are looking for work, helping them understand their skills, prepare resumes, and connect with employers. You follow established procedures and work under the guidance of more experienced staff. This is an entry-level case management role.',
        duties: [
          'Meeting with job seekers to assess their skills, experience, and barriers to employment',
          'Helping job seekers prepare resumes, cover letters, and job applications',
          'Searching for job vacancies and matching them with suitable job seekers',
          'Entering case notes, activity records, and outcomes into the computer system',
          'Conducting group workshops on job search skills, interview techniques, and workplace readiness',
          'Liaising with employers to identify job opportunities and arrange interviews',
        ],
        indicative_tasks: ['Employment consultant (entry)', 'Case worker (junior)', 'Job placement officer', 'Intake officer', 'Workshop facilitator (entry)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'labour_market',
        fwc_id: 4034,
        title: 'Employment Services Officer Grade 2',
        description: 'You are an experienced case worker who manages a caseload of job seekers independently. You deal with more complex cases, including people with significant barriers to employment such as long-term unemployment, disability, or limited English. You make decisions about the best approach for each person and can handle difficult situations.',
        duties: [
          'Managing a caseload of job seekers with diverse and complex needs',
          'Developing individualised employment plans and strategies for each client',
          'Providing intensive support to job seekers facing significant barriers to employment',
          'Building and maintaining relationships with local employers and industry contacts',
          'Monitoring client progress and adjusting plans based on outcomes',
          'Mentoring and supporting less experienced employment services officers',
        ],
        indicative_tasks: ['Senior employment consultant', 'Case manager', 'Disability employment officer', 'Employer engagement officer', 'Program officer'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'labour_market',
        fwc_id: 4039,
        title: 'Employment Services Coordinator',
        description: 'You coordinate the delivery of employment services across a team or program area. You ensure that services are delivered effectively and that performance targets are met. You support and guide other staff, manage day-to-day operations, and report on outcomes. This role requires strong organisational skills and a thorough understanding of employment services.',
        duties: [
          'Coordinating the daily operations of an employment services team or program',
          'Monitoring team performance against contractual targets and key performance indicators',
          'Providing guidance, coaching, and support to employment services officers',
          'Preparing reports on service delivery outcomes for management and funding bodies',
          'Managing relationships with key employers, community organisations, and government agencies',
          'Identifying and implementing improvements to service delivery processes',
        ],
        indicative_tasks: ['Team coordinator', 'Program coordinator', 'Service delivery coordinator', 'Quality assurance coordinator', 'Community liaison coordinator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'labour_market',
        fwc_id: 4043,
        title: 'Manager Grade 1',
        description: 'You manage a team or office delivering employment services. You are responsible for staff performance, service quality, and meeting contractual obligations. You handle budgets, recruitment, and reporting. This role is for people who have moved into management and are accountable for the results of their team or site.',
        duties: [
          'Managing and leading a team of employment services staff at one or more sites',
          'Recruiting, training, and developing staff to ensure high-quality service delivery',
          'Managing the site or team budget and ensuring resources are used effectively',
          'Ensuring compliance with government contracts, regulations, and organisational policies',
          'Reporting on team performance, financial outcomes, and service delivery to senior management',
          'Handling escalated client complaints and complex stakeholder issues',
        ],
        indicative_tasks: ['Site manager', 'Office manager', 'Team leader', 'Operations manager (junior)', 'Branch manager'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'labour_market',
        fwc_id: 4049,
        title: 'Manager Grade 2',
        description: 'You are a senior manager responsible for multiple teams, sites, or a major function within the organisation. You shape strategy, manage significant budgets, and are accountable for outcomes across a broad area. You work closely with the executive team and represent the organisation with government and industry stakeholders.',
        duties: [
          'Managing multiple sites, teams, or a major organisational function',
          'Developing and implementing strategic plans for your area of responsibility',
          'Managing large budgets and ensuring financial accountability across your portfolio',
          'Building and maintaining high-level relationships with government departments, peak bodies, and major employers',
          'Leading organisational change, innovation, and continuous improvement initiatives',
          'Reporting to the executive team on performance, strategy, and risk',
        ],
        indicative_tasks: ['Regional manager', 'State manager', 'Director of operations', 'Head of programs', 'General manager (division)'],
        sort_order: 70,
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

    // -- Pay rates ----------------------------------------------------------------
    const baseRates = {
      labour_market: { 1: 27.34, 2: 31.49, 3: 30.57, 4: 32.89, 5: 36.47, 6: 36.47, 7: 41.90 },
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $19.64.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 19.64, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.98 per kilometre driven.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid qualification, you are entitled to $17.65 per week.',
        trigger_condition: 'Appointed as first aid officer with current qualification',
        amount: 17.65, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'sleepover',
        name: 'Sleepover allowance (excursions)',
        description: 'If you are required to sleep over at a location away from your usual workplace during an excursion or camp, you are entitled to $82.00 per night.',
        trigger_condition: 'Required to sleep over during excursion or camp',
        amount: 82.00, amount_type: 'fixed', per_unit: 'per_night',
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
        question_key: 'lma_role',
        question_text: 'What role best describes your position in the employment services organisation?',
        help_text: 'Administrative roles cover office and clerical work. Employment Services Officers work directly with job seekers as case workers. Coordinators oversee service delivery. Managers run teams or sites.',
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
      { question_key: 'lma_role', answer_key: 'admin_assistant', answer_text: 'Administrative Assistant — entry-level office and clerical work (receptionist, filing, data entry)', sort_order: 1 },
      { question_key: 'lma_role', answer_key: 'admin_officer',   answer_text: 'Administrative Officer — experienced admin (office admin, accounts, records, executive assistant)', sort_order: 2 },
      { question_key: 'lma_role', answer_key: 'eso_grade1',      answer_text: 'Employment Services Officer Grade 1 — frontline case worker helping job seekers', sort_order: 3 },
      { question_key: 'lma_role', answer_key: 'eso_grade2',      answer_text: 'Employment Services Officer Grade 2 — experienced case worker with complex caseload', sort_order: 4 },
      { question_key: 'lma_role', answer_key: 'coordinator',     answer_text: 'Employment Services Coordinator — coordinates team or program delivery', sort_order: 5 },
      { question_key: 'lma_role', answer_key: 'manager1',        answer_text: 'Manager Grade 1 — manages a team or office (site manager, branch manager)', sort_order: 6 },
      { question_key: 'lma_role', answer_key: 'manager2',        answer_text: 'Manager Grade 2 — senior manager of multiple sites or a major function (regional manager, director)', sort_order: 7 },
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
