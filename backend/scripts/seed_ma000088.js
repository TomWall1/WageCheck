/**
 * Seed script — Electrical Power Industry Award 2020 [MA000088]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000088.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000088';
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
      'Electrical Power Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000088-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Administrative Grade 1',
        description: 'Entry-level administrative employee in the electrical power industry performing basic clerical and office support duties.',
        duties: ['Performing general filing, data entry, and reception duties', 'Handling incoming and outgoing correspondence', 'Assisting with basic record keeping and document management', 'Operating standard office equipment'],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'general',
        title: 'Pay level 1',
        description: 'Entry-level general employee in the electrical power industry at Pay level 1, performing basic operational or support tasks.',
        duties: ['Performing basic operational and labouring tasks', 'Maintaining cleanliness and order in work areas', 'Assisting with materials handling and transport', 'Following safety procedures and instructions'],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'general',
        title: 'Technical Grade 1',
        description: 'Entry-level technical employee in the electrical power industry performing basic technical support and maintenance assistance.',
        duties: ['Assisting tradespeople with maintenance tasks', 'Performing basic testing and measurement duties', 'Maintaining tools, equipment, and work areas', 'Recording technical data and readings'],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 2, stream: 'general',
        title: 'Administrative Grade 2',
        description: 'Administrative employee performing a range of clerical duties with developing skills in the electrical power industry.',
        duties: ['Processing financial documents and purchase orders', 'Maintaining databases and information systems', 'Preparing correspondence and routine reports', 'Providing administrative support to operational teams'],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 2, stream: 'general',
        title: 'Operations Grade 2',
        description: 'Operations employee in the electrical power industry performing developing operational duties in generation, transmission, or distribution.',
        duties: ['Operating basic power industry plant and equipment', 'Monitoring gauges, meters, and control systems', 'Performing routine operational checks and inspections', 'Assisting with switching and isolation procedures'],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 2, stream: 'general',
        title: 'Pay level 2',
        description: 'General employee at Pay level 2 in the electrical power industry performing operational or support tasks with some experience.',
        duties: ['Performing operational tasks with limited supervision', 'Operating basic plant and materials handling equipment', 'Completing routine maintenance and inspection tasks', 'Maintaining work records and reporting issues'],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 2, stream: 'general',
        title: 'Technical Grade 2',
        description: 'Technical employee with developing trade-level skills performing maintenance and technical support in the electrical power industry.',
        duties: ['Performing routine maintenance on electrical power equipment', 'Using test instruments and diagnostic tools', 'Assisting with fault finding and repair work', 'Maintaining technical records and documentation'],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 3, stream: 'general',
        title: 'Administrative Grade 3',
        description: 'Experienced administrative employee performing complex clerical duties and providing procedural advice in the electrical power industry.',
        duties: ['Coordinating administrative workflows and processes', 'Preparing complex reports and financial summaries', 'Providing advice on administrative procedures', 'Managing records and information management systems'],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 3, stream: 'general',
        title: 'Operations Grade 3',
        description: 'Experienced operations employee performing skilled power system operations including switching, monitoring, and control duties.',
        duties: ['Operating power generation or distribution equipment', 'Performing switching and isolation operations', 'Monitoring power system performance and parameters', 'Responding to alarms and operational incidents'],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 3, stream: 'general',
        title: 'Pay level 3',
        description: 'General employee at Pay level 3 with trade or equivalent qualifications performing skilled work in the electrical power industry.',
        duties: ['Performing trade-level work in power industry operations', 'Operating specialised equipment and machinery', 'Conducting quality checks and compliance inspections', 'Training and guiding lower-level employees'],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 3, stream: 'general',
        title: 'Technical Grade 3',
        description: 'Qualified technical employee performing trade-level maintenance and repair on power generation, transmission, or distribution equipment.',
        duties: ['Performing trade-level electrical and mechanical maintenance', 'Diagnosing faults on power industry equipment', 'Interpreting technical drawings and specifications', 'Ensuring compliance with electrical safety standards'],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 4, stream: 'general',
        title: 'Administrative Grade 4',
        description: 'Senior administrative employee supervising staff and managing administrative functions in the electrical power industry.',
        duties: ['Supervising administrative staff and allocating work', 'Managing budgets and financial processes', 'Developing administrative procedures and policies', 'Preparing high-level reports and briefings'],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 4, stream: 'general',
        title: 'Pay level 4',
        description: 'Senior employee at Pay level 4 performing advanced operational or supervisory duties in the electrical power industry.',
        duties: ['Performing advanced operational and supervisory duties', 'Coordinating team activities and resource allocation', 'Conducting risk assessments and safety audits', 'Providing technical guidance to team members'],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 4, stream: 'general',
        title: 'Technical Grade 4',
        description: 'Advanced technical employee performing complex maintenance, fault diagnosis, and technical coordination in the electrical power industry.',
        duties: ['Performing complex fault diagnosis and high-voltage maintenance', 'Coordinating technical work and maintenance programs', 'Providing technical expertise on power equipment', 'Supervising technical staff on maintenance projects'],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 5, stream: 'general',
        title: 'Administrative Grade 5',
        description: 'Management-level administrative employee leading programs and policy development in the electrical power industry.',
        duties: ['Leading administrative programs and policy development', 'Managing staff and departmental budgets', 'Preparing strategic reports and policy documents', 'Coordinating cross-functional initiatives'],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 5, stream: 'general',
        title: 'Operations Grade 5',
        description: 'Senior operations employee managing shift operations and overseeing power system control in generation, transmission, or distribution.',
        duties: ['Managing shift operations at power stations or control centres', 'Overseeing power system control and dispatch', 'Coordinating emergency response procedures', 'Mentoring and developing operations staff'],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 5, stream: 'general',
        title: 'Pay level 5',
        description: 'Senior employee at Pay level 5 performing specialist or supervisory roles in the electrical power industry.',
        duties: ['Performing specialist operational or technical duties', 'Supervising teams and managing work programs', 'Contributing to operational planning and strategy', 'Ensuring compliance with industry standards and regulations'],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 5, stream: 'general',
        title: 'Professional/Manager/Specialist Grade 5',
        description: 'Professional, manager, or specialist at Grade 5 providing expert knowledge and managing functions in the electrical power industry.',
        duties: ['Providing professional or specialist expertise', 'Managing teams, projects, or functional areas', 'Developing policies and technical standards', 'Liaising with stakeholders and regulatory bodies'],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 5, stream: 'general',
        title: 'Technical Grade 5',
        description: 'Senior specialist technical employee managing maintenance programs and providing expert technical leadership in the electrical power industry.',
        duties: ['Managing specialist maintenance programs', 'Leading technical teams on complex projects', 'Developing maintenance strategies and procedures', 'Providing expert technical advice across the organisation'],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 6, stream: 'general',
        title: 'Administrative Grade 6',
        description: 'Executive-level administrative employee leading major functions and contributing to organisational strategy in the electrical power industry.',
        duties: ['Leading major administrative functions or branches', 'Contributing to corporate strategy and governance', 'Managing significant budgets and resources', 'Developing enterprise-level policies and procedures'],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 6, stream: 'general',
        title: 'Operations Grade 6',
        description: 'Operations manager overseeing major generation, transmission, or distribution operations and managing significant teams.',
        duties: ['Overseeing major power operations and service delivery', 'Managing operations budgets and capital programs', 'Developing operational strategies and risk management plans', 'Representing operations in regulatory and industry forums'],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 6, stream: 'general',
        title: 'Pay level 6',
        description: 'Senior specialist or manager at Pay level 6 performing advanced management or specialist roles in the electrical power industry.',
        duties: ['Managing departments or specialist functions', 'Developing strategic plans and business cases', 'Overseeing compliance with regulatory requirements', 'Leading organisational development initiatives'],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 6, stream: 'general',
        title: 'Technical Grade 6',
        description: 'Technical manager overseeing multiple technical disciplines and driving maintenance strategy in the electrical power industry.',
        duties: ['Overseeing multiple technical teams and disciplines', 'Driving maintenance strategy and asset management', 'Managing major contracts and vendor relationships', 'Ensuring regulatory compliance across technical operations'],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 7, stream: 'general',
        title: 'Operations Grade 7',
        description: 'Senior operations manager directing power operations strategy and managing large operational programs.',
        duties: ['Directing power operations strategy and planning', 'Managing large operational teams and programs', 'Driving continuous improvement in safety and efficiency', 'Negotiating with regulators and market operators'],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 7, stream: 'general',
        title: 'Pay level 7',
        description: 'Senior manager or executive at Pay level 7 in the electrical power industry with broad management responsibilities.',
        duties: ['Managing major business units or programs', 'Setting strategic direction and performance targets', 'Overseeing significant budgets and capital investment', 'Leading enterprise-level change and improvement programs'],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 7, stream: 'general',
        title: 'Professional/Manager/Specialist Grade 7',
        description: 'Senior professional, manager, or specialist providing strategic leadership and expert guidance in the electrical power industry.',
        duties: ['Providing strategic leadership in specialist areas', 'Managing complex programs and cross-functional teams', 'Developing enterprise policies and technical standards', 'Advising executive leadership on industry matters'],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 7, stream: 'general',
        title: 'Technical Grade 7',
        description: 'Senior technical director managing all technical services and providing strategic technical leadership in the electrical power industry.',
        duties: ['Managing all technical services and engineering functions', 'Setting technical strategy and investment priorities', 'Leading innovation and technology adoption programs', 'Overseeing enterprise technical governance and compliance'],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 8, stream: 'general',
        title: 'Operations Grade 8',
        description: 'Executive operations leader with broad accountability for power operations, safety, and service delivery across the organisation.',
        duties: ['Leading enterprise-wide power operations', 'Setting operational strategy and performance frameworks', 'Managing executive-level stakeholder relationships', 'Overseeing enterprise safety and risk management'],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 8, stream: 'general',
        title: 'Pay level 8',
        description: 'Executive-level employee at Pay level 8 with significant leadership responsibilities in the electrical power industry.',
        duties: ['Leading major divisions or enterprise functions', 'Developing and implementing organisational strategy', 'Managing enterprise-level budgets and resources', 'Representing the organisation in industry and government forums'],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 8, stream: 'general',
        title: 'Professional/Manager/Specialist Grade 8',
        description: 'Executive professional, manager, or specialist providing the highest level of expertise and leadership in the electrical power industry.',
        duties: ['Providing executive-level professional or specialist leadership', 'Managing enterprise-wide programs and initiatives', 'Developing corporate governance and compliance frameworks', 'Advising the board or CEO on strategic matters'],
        indicative_tasks: [],
        sort_order: 300,
      },
      {
        level: 9, stream: 'general',
        title: 'Pay level 9',
        description: 'Senior executive at Pay level 9 in the electrical power industry with enterprise-wide leadership accountability.',
        duties: ['Leading enterprise-wide strategic initiatives', 'Setting organisational direction and culture', 'Managing the most significant budgets and investment programs', 'Representing the organisation at the highest industry levels'],
        indicative_tasks: [],
        sort_order: 310,
      },
      {
        level: 10, stream: 'general',
        title: 'Operations Grade 10',
        description: 'Top-level operations executive with ultimate accountability for all power operations across the enterprise.',
        duties: ['Ultimate accountability for all power operations', 'Defining long-term operational strategy and vision', 'Managing the highest-level regulatory and government relationships', 'Overseeing enterprise-wide operational risk and compliance'],
        indicative_tasks: [],
        sort_order: 320,
      },
      {
        level: 10, stream: 'general',
        title: 'Pay level 10',
        description: 'Top-level executive at Pay level 10 with the broadest leadership responsibilities in the electrical power industry.',
        duties: ['Leading the broadest organisational functions', 'Setting enterprise vision and strategic priorities', 'Managing the most significant stakeholder relationships', 'Driving enterprise transformation and performance'],
        indicative_tasks: [],
        sort_order: 330,
      },
      {
        level: 10, stream: 'general',
        title: 'Professional/Manager/Specialist Grade 10',
        description: 'Top-level professional, manager, or specialist with the highest expertise and leadership in the electrical power industry.',
        duties: ['Providing the highest level of professional expertise', 'Leading the most complex enterprise programs', 'Setting industry-leading standards and practices', 'Advising on the most critical strategic decisions'],
        indicative_tasks: [],
        sort_order: 340,
      },
      {
        level: 11, stream: 'general',
        title: 'Pay level 11',
        description: 'Highest pay level in the electrical power industry for the most senior executive or specialist roles.',
        duties: ['Performing the most senior executive or specialist functions', 'Setting enterprise-wide strategic direction', 'Managing the organisation at the highest leadership level', 'Driving innovation and industry leadership'],
        indicative_tasks: [],
        sort_order: 350,
      },
      {
        level: 11, stream: 'general',
        title: 'Professional/Manager/Specialist Grade 11',
        description: 'Highest grade professional, manager, or specialist in the electrical power industry with ultimate expertise and organisational leadership.',
        duties: ['Providing ultimate professional or specialist leadership', 'Managing enterprise-wide functions at the most senior level', 'Developing industry-leading strategies and governance', 'Representing the organisation at national and international forums'],
        indicative_tasks: [],
        sort_order: 360,
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
    const baseRates = {
      '1_general': 25.39,
      '2_general': 26.94,
      '3_general': 28.51,
      '4_general': 31.21,
      '5_general': 33.96,
      '6_general': 36.71,
      '7_general': 39.45,
      '8_general': 42.2,
      '9_general': 44.95,
      '10_general': 47.7,
      '11_general': 50.4,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[`${cls.level}_${cls.stream}`];
      if (!baseRate) continue;

      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;

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
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Continuous shiftworkers: Monday to Saturday - all hours — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'All employees - Sunday — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees - Public holidays — Full-time ×2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Continuous shiftworkers: Monday to Saturday - all hours — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'All employees - Sunday — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees - Public holidays — Part-time ×2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Saturday — Casual ×1.75',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Sunday — Casual ×2.25',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.75, addition_per_hour: null,
        description: 'Public holiday — Casual ×2.75',
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
    const overtimeRates = [
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (×2.0)' },
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
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'Meal allowance',
        trigger_condition: 'As per award conditions',
        amount: 20.33, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Motor vehicle allowance—Motor vehicle',
        description: 'Motor vehicle allowance—Motor vehicle',
        trigger_condition: 'As per award conditions',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Motor vehicle allowance—Motorcycle',
        description: 'Motor vehicle allowance—Motorcycle',
        trigger_condition: 'As per award conditions',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'Tool allowance',
        trigger_condition: 'As per award conditions',
        amount: 23.55, amount_type: 'weekly', per_unit: 'per_week',
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
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes.',
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
        award_code: AWARD_CODE,
        question_key: 'a88_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'level_1', answer_text: 'Administrative Grade 1', sort_order: 1 },
          { answer_key: 'level_1', answer_text: 'Pay level 1', sort_order: 2 },
          { answer_key: 'level_1', answer_text: 'Technical Grade 1', sort_order: 3 },
          { answer_key: 'level_2', answer_text: 'Administrative Grade 2', sort_order: 4 },
          { answer_key: 'level_2', answer_text: 'Operations Grade 2', sort_order: 5 },
          { answer_key: 'level_2', answer_text: 'Pay level 2', sort_order: 6 },
          { answer_key: 'level_2', answer_text: 'Technical Grade 2', sort_order: 7 },
          { answer_key: 'level_3', answer_text: 'Administrative Grade 3', sort_order: 8 },
          { answer_key: 'level_3', answer_text: 'Operations Grade 3', sort_order: 9 },
          { answer_key: 'level_3', answer_text: 'Pay level 3', sort_order: 10 },
          { answer_key: 'level_3', answer_text: 'Technical Grade 3', sort_order: 11 },
          { answer_key: 'level_4', answer_text: 'Administrative Grade 4', sort_order: 12 },
          { answer_key: 'level_4', answer_text: 'Pay level 4', sort_order: 13 },
          { answer_key: 'level_4', answer_text: 'Technical Grade 4', sort_order: 14 },
          { answer_key: 'level_5', answer_text: 'Administrative Grade 5', sort_order: 15 },
          { answer_key: 'level_5', answer_text: 'Operations Grade 5', sort_order: 16 },
          { answer_key: 'level_5', answer_text: 'Pay level 5', sort_order: 17 },
          { answer_key: 'level_5', answer_text: 'Professional/Manager/Specialist Grade 5', sort_order: 18 },
          { answer_key: 'level_5', answer_text: 'Technical Grade 5', sort_order: 19 },
          { answer_key: 'level_6', answer_text: 'Administrative Grade 6', sort_order: 20 },
          { answer_key: 'level_6', answer_text: 'Operations Grade 6', sort_order: 21 },
          { answer_key: 'level_6', answer_text: 'Pay level 6', sort_order: 22 },
          { answer_key: 'level_6', answer_text: 'Technical Grade 6', sort_order: 23 },
          { answer_key: 'level_7', answer_text: 'Operations Grade 7', sort_order: 24 },
          { answer_key: 'level_7', answer_text: 'Pay level 7', sort_order: 25 },
          { answer_key: 'level_7', answer_text: 'Professional/Manager/Specialist Grade 7', sort_order: 26 },
          { answer_key: 'level_7', answer_text: 'Technical Grade 7', sort_order: 27 },
          { answer_key: 'level_8', answer_text: 'Operations Grade 8', sort_order: 28 },
          { answer_key: 'level_8', answer_text: 'Pay level 8', sort_order: 29 },
          { answer_key: 'level_8', answer_text: 'Professional/Manager/Specialist Grade 8', sort_order: 30 },
          { answer_key: 'level_9', answer_text: 'Pay level 9', sort_order: 31 },
          { answer_key: 'level_10', answer_text: 'Operations Grade 10', sort_order: 32 },
          { answer_key: 'level_10', answer_text: 'Pay level 10', sort_order: 33 },
          { answer_key: 'level_10', answer_text: 'Professional/Manager/Specialist Grade 10', sort_order: 34 },
          { answer_key: 'level_11', answer_text: 'Pay level 11', sort_order: 35 },
          { answer_key: 'level_11', answer_text: 'Professional/Manager/Specialist Grade 11', sort_order: 36 },
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
    console.log('\n✅ MA000088 seed complete');
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
