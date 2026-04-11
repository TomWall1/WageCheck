/**
 * Seed script — Wine Industry Award 2020 [MA000090]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000090
 *
 * One stream:
 *   wine — Grade 1 (first 6 months) through Grade 5 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API):
 *   G1 new: $24.62   G1 exp: $24.95   G2: $25.63   G3: $26.65   G4: $28.12   G5: $29.88
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
 * Junior rates: Under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *
 * Allowances:
 *   Meal (OT >2hr): $18.38, Vehicle: $0.98/km, First aid (day): $4.25,
 *   First aid (week): $21.26, Wet work: $6.36/day, Wine vats: $1.18/hr,
 *   Confined spaces: $0.39/hr, Dirty work: $0.22/hr
 *
 * Run after migrate.js: node scripts/seed_ma000090.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000090';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // -- Award metadata -------------------------------------------------------
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Wine Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000090.html',
    ]);

    // -- Classifications ------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'wine',
        fwc_id: 3834,
        title: 'Grade 1 (first 6 months)',
        description: 'You are new to the wine industry and have been in your role for less than 6 months. You perform basic tasks under close supervision. No previous experience or qualifications are needed — you learn on the job. After 6 months you automatically move up to the next pay level.',
        duties: [
          'Picking and sorting grapes during harvest season',
          'Cleaning tanks, barrels, equipment and winery floors',
          'Loading and unloading deliveries of grapes, bottles and supplies',
          'Assisting experienced workers with basic cellar tasks',
          'Packing bottles, labelling and preparing orders for dispatch',
        ],
        indicative_tasks: ['Vineyard labourer (new)', 'Cellar hand (entry-level)', 'Winery cleaner', 'Packer', 'General labourer'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'wine',
        fwc_id: 192280,
        title: 'Grade 1 (after 6 months)',
        description: 'You have completed at least 6 months in the wine industry at Grade 1 level. You still perform similar tasks but your extra experience means you can work a bit more independently. You know your way around the winery or vineyard and need less guidance on day-to-day tasks.',
        duties: [
          'Performing vineyard work such as pruning, tying and suckering under direction',
          'Operating basic winery equipment such as pumps and hoses',
          'Monitoring tank temperatures and reporting readings to your supervisor',
          'Carrying out cleaning and sanitation procedures to food safety standards',
          'Assisting with bottling runs and quality checks on the line',
          'Maintaining tools and reporting any equipment problems',
        ],
        indicative_tasks: ['Vineyard worker (experienced)', 'Cellar hand', 'Bottling line worker', 'Winery assistant', 'Vineyard labourer (after 6 months)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'wine',
        fwc_id: 3835,
        title: 'Grade 2',
        description: 'You are an experienced worker who can handle more complex tasks and may be responsible for a particular area of the winery or vineyard. You have built up practical skills through on-the-job experience and can work with limited supervision on most tasks.',
        duties: [
          'Operating specialised winery equipment such as crushers, presses and filters',
          'Performing vineyard operations including pruning, canopy management and irrigation',
          'Conducting basic laboratory tests such as sugar levels, pH and acidity',
          'Driving tractors and other vineyard machinery',
          'Monitoring fermentation and reporting any issues to the winemaker',
          'Training and guiding Grade 1 workers on tasks and procedures',
        ],
        indicative_tasks: ['Senior cellar hand', 'Vineyard operator', 'Tractor driver', 'Laboratory assistant', 'Experienced winery worker'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'wine',
        fwc_id: 3836,
        title: 'Grade 3',
        description: 'You are a tradesperson or hold an equivalent level of skill gained through extensive experience. You perform skilled work that requires formal training or deep knowledge of winemaking, viticulture or a relevant trade such as fitting, electrical or refrigeration.',
        duties: [
          'Performing trade-qualified maintenance work on winery or vineyard equipment',
          'Managing cellar operations including racking, fining and blending under direction',
          'Operating and maintaining complex machinery such as bottling lines and refrigeration',
          'Conducting detailed laboratory analysis and interpreting results',
          'Supervising Grade 1 and Grade 2 workers in day-to-day tasks',
          'Ensuring compliance with food safety, OH&S and environmental standards',
        ],
        indicative_tasks: ['Tradesperson (fitter, electrician, refrigeration mechanic)', 'Senior cellar worker', 'Vineyard supervisor (small team)', 'Laboratory technician', 'Maintenance worker (qualified)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'wine',
        fwc_id: 3837,
        title: 'Grade 4',
        description: 'You are an advanced tradesperson or highly skilled worker with additional qualifications or extensive experience beyond trade level. You handle the most complex technical tasks and may supervise other tradespeople or skilled workers.',
        duties: [
          'Performing advanced trade work requiring additional certification or specialisation',
          'Managing complex winemaking processes such as blending, barrel management and quality control',
          'Planning and coordinating maintenance schedules for the winery or vineyard',
          'Training and mentoring tradespeople and technical staff',
          'Troubleshooting and resolving complex technical problems across the operation',
          'Contributing to production planning and process improvement',
        ],
        indicative_tasks: ['Advanced tradesperson', 'Senior maintenance worker', 'Assistant winemaker', 'Vineyard manager (small operation)', 'Senior laboratory technician'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'wine',
        fwc_id: 3838,
        title: 'Grade 5',
        description: 'You are a supervisor or principal tradesperson with broad responsibility for a major area of the winery or vineyard operation. You manage staff, plan work and make decisions that affect production outcomes. You report directly to senior management or the winemaker.',
        duties: [
          'Supervising a team of workers across cellar, vineyard or maintenance operations',
          'Planning and scheduling work to meet production targets and harvest deadlines',
          'Managing budgets and controlling costs for your area of responsibility',
          'Hiring, training and performance-managing staff in your team',
          'Liaising with winemakers, vineyard managers and external contractors',
          'Ensuring all operations meet food safety, regulatory and quality standards',
        ],
        indicative_tasks: ['Cellar supervisor', 'Vineyard manager', 'Principal tradesperson', 'Production supervisor', 'Winery operations supervisor'],
        sort_order: 60,
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

    // -- Pay rates ------------------------------------------------------------
    const baseRates = {
      wine: { 1: 24.62, 2: 24.95, 3: 25.63, 4: 26.65, 5: 28.12, 6: 29.88 },
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

    // -- Penalty rates --------------------------------------------------------
    const penaltyRates = [
      // Full-time
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.50)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Part-time
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.50)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Casual
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — x1.25 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.75, description: 'Sunday — x1.75 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.25, description: 'Casual public holiday — x2.25 of casual base (incl. loading)' },
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

    // -- Overtime rates -------------------------------------------------------
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

    // -- Allowances -----------------------------------------------------------
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime >2 hours)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $18.38.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_meal',
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
        allowance_type: 'first_aid_day',
        name: 'First aid allowance (per day)',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $4.25 per day.',
        trigger_condition: 'Appointed as first aid officer with current certificate (daily rate)',
        amount: 4.25, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid_week',
        name: 'First aid allowance (per week)',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $21.26 per week.',
        trigger_condition: 'Appointed as first aid officer with current certificate (weekly rate)',
        amount: 21.26, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'wet_work',
        name: 'Wet work allowance',
        description: 'If you are required to work in wet conditions where your clothing or footwear becomes saturated, you are entitled to $6.36 per day.',
        trigger_condition: 'Working in wet conditions that saturate clothing or footwear',
        amount: 6.36, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'wine_vats',
        name: 'Wine vats allowance',
        description: 'If you are required to enter and work inside wine vats, you are entitled to an extra $1.18 per hour while doing so.',
        trigger_condition: 'Required to enter and work inside wine vats',
        amount: 1.18, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'confined_spaces',
        name: 'Confined spaces allowance',
        description: 'If you are required to work in confined spaces such as tanks or enclosed areas, you are entitled to an extra $0.39 per hour.',
        trigger_condition: 'Required to work in confined spaces',
        amount: 0.39, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'dirty_work',
        name: 'Dirty work allowance',
        description: 'If you are required to perform work that is unusually dirty or unpleasant, you are entitled to an extra $0.22 per hour.',
        trigger_condition: 'Required to perform unusually dirty or unpleasant work',
        amount: 0.22, amount_type: 'per_hour', per_unit: 'per_hour',
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

    // -- Break entitlements ---------------------------------------------------
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

    // -- Classification questions ---------------------------------------------
    const questions = [
      {
        question_key: 'wine_grade',
        question_text: 'What grade best describes your role in the wine industry?',
        help_text: 'Your grade depends on your experience, skills and qualifications. Grade 1 is for new workers in their first 6 months, or workers with 6+ months who still do basic tasks. Grade 5 is for supervisors or principal tradespeople running a major area of the operation.',
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

    // -- Classification answers -----------------------------------------------
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'wine_grade', answer_key: 'g1_new',  answer_text: 'Grade 1 (first 6 months) — New to the industry, basic tasks like picking, cleaning, packing', sort_order: 1 },
      { question_key: 'wine_grade', answer_key: 'g1_exp',  answer_text: 'Grade 1 (after 6 months) — Same basic work but with 6+ months experience', sort_order: 2 },
      { question_key: 'wine_grade', answer_key: 'g2',      answer_text: 'Grade 2 — Experienced worker, operates equipment like crushers, presses, tractors', sort_order: 3 },
      { question_key: 'wine_grade', answer_key: 'g3',      answer_text: 'Grade 3 — Tradesperson or equivalent (fitter, electrician, senior cellar worker)', sort_order: 4 },
      { question_key: 'wine_grade', answer_key: 'g4',      answer_text: 'Grade 4 — Advanced tradesperson or highly skilled worker (assistant winemaker, senior maintenance)', sort_order: 5 },
      { question_key: 'wine_grade', answer_key: 'g5',      answer_text: 'Grade 5 — Supervisor or principal tradesperson (cellar supervisor, vineyard manager)', sort_order: 6 },
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
