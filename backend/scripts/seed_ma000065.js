/**
 * Seed script — Professional Employees Award 2020 [MA000065]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000065
 *
 * One stream:
 *   professional — Graduate Professional through Level 5 (9 classifications)
 *
 * Adult FT/PT hourly rates (from API):
 *   PP1.1 (3yr): $32.18   PP1.1 (4/5yr): $33.01   PP1.2: $33.56
 *   PP1.3: $34.96          PP1.4: $36.73            L2: $37.97
 *   L3: $41.49             L4: $46.80               L5: $56.38
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
 * Junior rates: None (professional employees are degree-qualified adults)
 *
 * Allowances:
 *   Vehicle: $0.98/km
 *
 * Run after migrate.js: node scripts/seed_ma000065.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000065';
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
      'Professional Employees Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000065.html',
    ]);

    // -- Classifications ----------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'professional',
        fwc_id: 2326,
        title: 'Graduate Professional Pay Point 1.1 (3-year degree)',
        description: 'You are a graduate professional who has completed a 3-year university degree (such as a Bachelor of Science or Bachelor of Arts). This is your first professional role after graduating and you work under the guidance of more experienced professionals. You are learning how to apply your university knowledge to real-world tasks and building your practical skills.',
        duties: [
          'Carrying out professional tasks under supervision of a senior professional',
          'Applying theoretical knowledge from your degree to practical workplace problems',
          'Preparing basic reports, analysis, and documentation',
          'Attending professional development and training activities',
          'Assisting senior professionals with research and project work',
        ],
        indicative_tasks: ['Graduate engineer', 'Graduate scientist', 'Graduate IT professional', 'Graduate environmental scientist', 'Junior analyst'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'professional',
        fwc_id: 2327,
        title: 'Graduate Professional Pay Point 1.1 (4 or 5-year degree)',
        description: 'You are a graduate professional who has completed a 4-year or 5-year university degree (such as a Bachelor of Engineering with Honours or a combined degree). This is your first professional role and you work under guidance, but your longer degree means you start at a slightly higher pay point than 3-year graduates. You are developing your practical skills in the workplace.',
        duties: [
          'Performing professional work under the direction of experienced professionals',
          'Applying advanced theoretical knowledge from your extended degree program',
          'Preparing technical reports, calculations, and project documentation',
          'Participating in professional development and building industry knowledge',
          'Contributing to team projects and supporting senior staff with complex tasks',
        ],
        indicative_tasks: ['Graduate engineer (honours)', 'Graduate architect', 'Graduate pharmacist', 'Graduate quantity surveyor', 'Graduate geologist'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'professional',
        fwc_id: 2328,
        title: 'Graduate Professional Pay Point 1.2',
        description: 'You are a graduate professional who has gained some experience since starting your first professional role. You have progressed beyond the initial entry point and are taking on more responsibility. You still work under supervision but are becoming more independent in your daily tasks. This pay point recognises your growing competence.',
        duties: [
          'Carrying out professional tasks with increasing independence',
          'Managing small work packages or sections of larger projects',
          'Preparing more detailed technical reports and documentation',
          'Liaising with clients, contractors, or other stakeholders on routine matters',
          'Mentoring newer graduates and sharing workplace knowledge',
        ],
        indicative_tasks: ['Engineer (1+ years)', 'Scientist (1+ years)', 'IT professional (1+ years)', 'Environmental consultant (junior)', 'Quality assurance officer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'professional',
        fwc_id: 2329,
        title: 'Graduate Professional Pay Point 1.3',
        description: 'You are a graduate professional with solid experience and growing expertise. You handle more complex tasks and make more decisions on your own. You are expected to work with less supervision and contribute meaningfully to projects. This pay point recognises that you are well on your way to becoming a fully competent professional.',
        duties: [
          'Managing defined project components or workstreams independently',
          'Providing technical input and advice on matters within your area of expertise',
          'Reviewing work of less experienced graduates for quality and accuracy',
          'Preparing and presenting findings to clients or management',
          'Identifying problems and proposing solutions within your professional discipline',
          'Contributing to the improvement of work processes and procedures',
        ],
        indicative_tasks: ['Engineer (2+ years)', 'Scientist (2+ years)', 'IT developer (experienced)', 'Environmental assessor', 'Project coordinator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'professional',
        fwc_id: 2330,
        title: 'Graduate Professional Pay Point 1.4',
        description: 'You are the most experienced graduate professional before progressing to Level 2. You have developed strong competence in your field and can handle complex professional tasks. You work independently and may lead small teams or project components. You are ready to take on the responsibilities of an experienced professional.',
        duties: [
          'Leading small project teams or coordinating work across disciplines',
          'Making professional judgements and decisions on complex technical matters',
          'Preparing comprehensive reports and recommendations for management or clients',
          'Managing client relationships and stakeholder communications',
          'Training and supervising junior graduates and support staff',
          'Contributing to proposals, tenders, and business development activities',
        ],
        indicative_tasks: ['Senior graduate engineer', 'Senior graduate scientist', 'Senior IT developer', 'Project leader (junior)', 'Technical specialist (developing)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'professional',
        fwc_id: 2331,
        title: 'Level 2 — Experienced Professional',
        description: 'You are an experienced professional who has completed the graduate development phase and works largely independently. You have demonstrated competence across your professional discipline and can handle complex projects and problems. You are a reliable technical authority in your area and may supervise graduate professionals.',
        duties: [
          'Managing projects or significant workstreams from start to finish',
          'Providing expert professional advice within your area of specialisation',
          'Supervising and developing graduate professionals and support staff',
          'Preparing and reviewing complex technical reports, designs, and specifications',
          'Representing the organisation in meetings with clients, regulators, and stakeholders',
          'Ensuring work complies with professional standards, regulations, and best practice',
        ],
        indicative_tasks: ['Project engineer', 'Senior scientist', 'Senior IT professional', 'Senior environmental consultant', 'Experienced architect', 'Senior analyst'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'professional',
        fwc_id: 2332,
        title: 'Level 3 — Professional/Senior Professional',
        description: 'You are a senior professional with extensive experience and high-level expertise. You lead teams, manage complex projects, and are recognised as an authority in your field. You make significant decisions that affect project outcomes and organisational direction. This level is for professionals who have built a strong reputation through years of practice.',
        duties: [
          'Leading and managing professional teams across multiple projects',
          'Making high-level technical and professional decisions with significant consequences',
          'Developing strategies, policies, and procedures for your professional area',
          'Managing key client relationships and major stakeholder engagements',
          'Providing expert guidance and mentoring to less experienced professionals',
          'Contributing to business planning, resource allocation, and organisational development',
        ],
        indicative_tasks: ['Principal engineer', 'Principal scientist', 'IT manager', 'Senior project manager', 'Practice leader', 'Technical director (junior)'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'professional',
        fwc_id: 2333,
        title: 'Level 4 — Professional',
        description: 'You are a highly experienced professional at a senior management or principal level. You have broad responsibility for a major function, discipline, or portfolio of work. You shape the strategic direction of your professional area and are accountable for significant outcomes. This level requires exceptional expertise and leadership ability.',
        duties: [
          'Directing a major professional function or discipline within the organisation',
          'Setting strategic direction and priorities for your area of responsibility',
          'Managing large budgets, complex programs, and high-value projects',
          'Representing the organisation at the highest levels with clients, regulators, and industry bodies',
          'Leading innovation and continuous improvement across professional practice',
          'Developing and implementing organisational policies and professional standards',
        ],
        indicative_tasks: ['Director of engineering', 'Head of science', 'Chief technology officer', 'Principal consultant', 'Head of professional services'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'professional',
        fwc_id: 70289,
        title: 'Level 5 — Experienced Medical Research Professional',
        description: 'You are a highly experienced professional working specifically in medical research. You have extensive postgraduate qualifications and years of research experience. You lead significant research programs and are a recognised expert in your field. This classification applies specifically to experienced medical research professionals.',
        duties: [
          'Leading and directing major medical research programs and clinical trials',
          'Securing research funding through grants, partnerships, and industry collaboration',
          'Publishing research findings in peer-reviewed journals and presenting at conferences',
          'Supervising research teams including postdoctoral researchers and research assistants',
          'Ensuring research complies with ethics requirements, regulatory standards, and best practice',
          'Collaborating with national and international research institutions and industry partners',
        ],
        indicative_tasks: ['Senior medical researcher', 'Principal research scientist', 'Research program director', 'Clinical research leader', 'Head of research laboratory'],
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
      professional: { 1: 32.18, 2: 33.01, 3: 33.56, 4: 34.96, 5: 36.73, 6: 37.97, 7: 41.49, 8: 46.80, 9: 56.38 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Casual Saturday — x1.50 of casual base' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Casual Sunday — x2.00 of casual base' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — x2.50 of casual base' },
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
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.98 per kilometre driven.',
        trigger_condition: 'Required to use own vehicle for work',
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
        question_key: 'professional_level',
        question_text: 'What level best describes your professional employee role?',
        help_text: 'Your level depends on your qualifications and experience. Pay Points 1.1 through 1.4 are for graduate professionals in their early career. Level 2 is for experienced professionals. Levels 3-4 are for senior and principal professionals. Level 5 is specifically for experienced medical research professionals.',
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
      { question_key: 'professional_level', answer_key: 'pp1_3yr', answer_text: 'Pay Point 1.1 (3-year degree) — Graduate professional, first role after a 3-year degree', sort_order: 1 },
      { question_key: 'professional_level', answer_key: 'pp1_4yr', answer_text: 'Pay Point 1.1 (4 or 5-year degree) — Graduate professional, first role after a 4 or 5-year degree', sort_order: 2 },
      { question_key: 'professional_level', answer_key: 'pp1_2',   answer_text: 'Pay Point 1.2 — Graduate with some professional experience', sort_order: 3 },
      { question_key: 'professional_level', answer_key: 'pp1_3',   answer_text: 'Pay Point 1.3 — Graduate with solid experience, increasing independence', sort_order: 4 },
      { question_key: 'professional_level', answer_key: 'pp1_4',   answer_text: 'Pay Point 1.4 — Most experienced graduate, ready for Level 2', sort_order: 5 },
      { question_key: 'professional_level', answer_key: 'level2',  answer_text: 'Level 2 — Experienced professional, works independently', sort_order: 6 },
      { question_key: 'professional_level', answer_key: 'level3',  answer_text: 'Level 3 — Senior professional, leads teams and complex projects', sort_order: 7 },
      { question_key: 'professional_level', answer_key: 'level4',  answer_text: 'Level 4 — Principal professional, directs a major function', sort_order: 8 },
      { question_key: 'professional_level', answer_key: 'level5',  answer_text: 'Level 5 — Experienced medical research professional', sort_order: 9 },
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
