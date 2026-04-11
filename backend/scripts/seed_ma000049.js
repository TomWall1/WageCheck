/**
 * Seed script — Airport Employees Award 2020 [MA000049]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000049.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000049';
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
      'Airport Employees Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000049-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 1',
        description: 'Entry-level airport administrative employee performing routine clerical and reception duties under direct supervision.',
        duties: ['Performing general filing, photocopying, and data entry', 'Answering and directing telephone calls', 'Receiving and distributing mail and documents', 'Assisting with basic record keeping'],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'ground_services_officers',
        title: 'Ground services officer Level 1',
        description: 'Entry-level airport ground services employee performing basic ramp, baggage, or terminal duties under close supervision.',
        duties: ['Loading and unloading baggage and cargo', 'Marshalling aircraft on the apron', 'Assisting passengers with mobility needs', 'Maintaining cleanliness of terminal and ramp areas'],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'professional_engineers',
        title: 'Professional engineer Level 1—Pay point 1',
        description: 'Graduate professional engineer at Pay point 1, applying engineering knowledge under guidance in airport infrastructure or systems.',
        duties: ['Assisting with engineering design and analysis tasks', 'Preparing technical reports and documentation', 'Conducting inspections under supervision', 'Applying basic engineering principles to airport systems'],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'technical_services_officers',
        title: 'Technical services assistant',
        description: 'Entry-level technical assistant performing basic maintenance and support tasks in airport facilities under direct supervision.',
        duties: ['Assisting tradespeople with maintenance tasks', 'Carrying tools and materials to work sites', 'Performing basic cleaning and upkeep of technical areas', 'Recording maintenance activities and readings'],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 1, stream: 'technical_services_officers',
        title: 'Technical services officer Level 1',
        description: 'Technical services officer performing routine technical and maintenance duties in airport facilities with limited supervision.',
        duties: ['Performing routine preventive maintenance on airport systems', 'Operating basic test and measuring equipment', 'Maintaining records of technical work performed', 'Assisting with fault diagnosis on building services'],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 2, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 2',
        description: 'Administrative employee performing a range of clerical and office duties with some autonomy, including processing and basic coordination tasks.',
        duties: ['Processing invoices, purchase orders, and financial documents', 'Maintaining filing systems and databases', 'Preparing correspondence and routine reports', 'Coordinating bookings and scheduling'],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 2, stream: 'ground_services_officers',
        title: 'Ground services officer Level 2',
        description: 'Ground services employee with experience performing operational duties including passenger check-in, baggage handling, and ramp operations.',
        duties: ['Operating baggage handling equipment', 'Performing passenger check-in and boarding procedures', 'Conducting aircraft turnaround tasks', 'Monitoring and reporting safety hazards on the ramp'],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 2, stream: 'professional_engineers',
        title: 'Professional engineer Level 1—Pay point 2',
        description: 'Professional engineer at Pay point 2 with developing experience, contributing to engineering projects for airport operations or infrastructure.',
        duties: ['Contributing to design and analysis of airport infrastructure', 'Preparing engineering calculations and specifications', 'Participating in project planning and reviews', 'Conducting site inspections and reporting findings'],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 2, stream: 'technical_services_officers',
        title: 'Technical services officer Level 1',
        description: 'Technical services officer with developing skills performing maintenance and minor repair work on airport plant and equipment.',
        duties: ['Performing scheduled maintenance on mechanical and electrical systems', 'Diagnosing and rectifying minor faults', 'Using a range of hand and power tools', 'Completing work orders and maintenance logs'],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 3, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 3',
        description: 'Experienced administrative employee performing complex clerical duties, providing advice, and coordinating administrative functions.',
        duties: ['Coordinating administrative workflows and processes', 'Preparing complex reports and correspondence', 'Providing procedural advice to junior staff', 'Managing records and information systems'],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 3, stream: 'ground_services_officers',
        title: 'Ground services officer Level 3',
        description: 'Experienced ground services employee performing skilled operational tasks and providing guidance to lower-level staff.',
        duties: ['Operating specialised ground support equipment', 'Coordinating aircraft loading and weight balance', 'Training and mentoring junior ground staff', 'Handling irregular operations and passenger issues'],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 3, stream: 'professional_engineers',
        title: 'Professional engineer Level 1—Pay point 3',
        description: 'Professional engineer at Pay point 3 with solid experience, undertaking engineering work with increasing independence.',
        duties: ['Managing defined engineering work packages', 'Reviewing and approving technical documentation', 'Liaising with contractors and stakeholders on engineering matters', 'Applying relevant standards and codes to airport projects'],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 3, stream: 'technical_services_officers',
        title: 'Technical services officer Level 2',
        description: 'Technical officer with trade-level skills performing maintenance, repair, and installation work on airport systems and infrastructure.',
        duties: ['Performing trade-level maintenance and repairs', 'Interpreting technical drawings and specifications', 'Conducting fault diagnosis on complex equipment', 'Ensuring compliance with safety and technical standards'],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 4, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 4',
        description: 'Senior administrative employee supervising staff and managing administrative programs or projects within the airport environment.',
        duties: ['Supervising and allocating work to administrative staff', 'Managing budgets and financial processes for a section', 'Developing and implementing administrative procedures', 'Preparing briefings and high-level reports'],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 4, stream: 'ground_services_officers',
        title: 'Ground services officer Level 4',
        description: 'Senior ground services employee with specialist knowledge, leading teams and coordinating complex ground operations.',
        duties: ['Supervising ground handling teams during shifts', 'Coordinating responses to operational disruptions', 'Conducting safety briefings and compliance checks', 'Managing equipment allocation and serviceability'],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 4, stream: 'professional_engineers',
        title: 'Professional engineer Level 2',
        description: 'Experienced professional engineer independently managing engineering projects and providing expert technical advice for airport operations.',
        duties: ['Leading engineering projects from design to completion', 'Providing specialist technical advice to management', 'Reviewing and certifying engineering work of others', 'Managing project budgets, timelines, and resources'],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 4, stream: 'technical_services_officers',
        title: 'Technical services officer Level 3',
        description: 'Advanced technical officer performing complex technical work and providing guidance to other technical staff in airport maintenance.',
        duties: ['Performing complex fault diagnosis and repair', 'Planning and scheduling preventive maintenance programs', 'Providing technical advice and guidance to junior officers', 'Coordinating work with external contractors'],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 5, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 5',
        description: 'Senior administrative officer managing significant programs, policy development, and staff across multiple airport administrative functions.',
        duties: ['Managing administrative programs and policy implementation', 'Leading and developing a team of administrative staff', 'Preparing strategic reports and policy documents', 'Coordinating cross-functional administrative initiatives'],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 5, stream: 'ground_services_officers',
        title: 'Ground services officer Level 5',
        description: 'Senior ground services officer managing ground operations functions and overseeing service delivery standards.',
        duties: ['Managing ground operations across multiple service areas', 'Developing operational procedures and work instructions', 'Monitoring and reporting on service performance metrics', 'Liaising with airlines and airport authorities on operations'],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 5, stream: 'professional_engineers',
        title: 'Professional engineer Level 3',
        description: 'Senior professional engineer with substantial experience, managing major projects and providing high-level engineering leadership.',
        duties: ['Managing complex multi-disciplinary engineering projects', 'Developing engineering policies and technical standards', 'Mentoring and supervising junior engineers', 'Providing expert advice on strategic infrastructure planning'],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 5, stream: 'technical_services_officers',
        title: 'Technical services officer Level 4',
        description: 'Senior technical officer supervising technical teams and managing specialist maintenance programs for airport infrastructure.',
        duties: ['Supervising technical staff and allocating work', 'Managing specialist maintenance programs and contracts', 'Developing maintenance procedures and standards', 'Conducting technical investigations and preparing reports'],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 6, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 6',
        description: 'Executive-level administrative officer leading major administrative functions, contributing to organisational strategy and managing significant resources.',
        duties: ['Leading major administrative functions or branches', 'Contributing to corporate strategy and planning', 'Managing significant budgets and staff resources', 'Developing high-level policies and procedures'],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 6, stream: 'ground_services_officers',
        title: 'Ground services officer Level 6',
        description: 'Management-level ground services officer overseeing major ground operations programs and leading significant teams.',
        duties: ['Overseeing major ground operations programs', 'Developing and implementing operational strategies', 'Managing staff rosters, budgets, and KPIs', 'Representing ground services in airport coordination meetings'],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 6, stream: 'professional_engineers',
        title: 'Professional engineer Level 4',
        description: 'Principal professional engineer leading engineering functions, setting technical direction, and managing major capital works programs.',
        duties: ['Leading an engineering discipline or function', 'Setting technical direction and engineering standards', 'Managing major capital works and infrastructure programs', 'Advising executive leadership on engineering matters'],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 6, stream: 'technical_services_officers',
        title: 'Technical services officer Level 5',
        description: 'Senior specialist technical officer managing complex technical operations and contributing to maintenance strategy.',
        duties: ['Managing complex technical operations across multiple systems', 'Contributing to asset management and maintenance strategy', 'Overseeing compliance with technical regulations', 'Leading technical investigations into major equipment failures'],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 7, stream: 'administrative_services_officers',
        title: 'Administrative services officer Level 7',
        description: 'Senior executive administrative officer providing strategic leadership and managing large-scale administrative operations across the airport.',
        duties: ['Providing strategic leadership across administrative divisions', 'Managing large-scale operational and administrative programs', 'Developing corporate governance and compliance frameworks', 'Leading organisational change and process improvement'],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 7, stream: 'ground_services_officers',
        title: 'Ground services officer Level 7',
        description: 'Senior management ground services officer directing ground operations strategy and managing large operational teams.',
        duties: ['Directing ground operations strategy and service delivery', 'Managing large operational teams and budgets', 'Negotiating service agreements with airlines and partners', 'Driving continuous improvement in safety and efficiency'],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 7, stream: 'professional_engineers',
        title: 'Professional engineer Level 5',
        description: 'Chief/senior principal professional engineer providing executive-level engineering leadership and strategic direction for airport infrastructure.',
        duties: ['Providing executive-level engineering leadership', 'Setting long-term infrastructure strategy and investment priorities', 'Managing relationships with regulatory bodies and key stakeholders', 'Overseeing engineering governance across the organisation'],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 7, stream: 'technical_services_officers',
        title: 'Technical services officer Level 6',
        description: 'Technical manager overseeing multiple technical disciplines and driving maintenance strategy for airport infrastructure.',
        duties: ['Overseeing multiple technical disciplines and teams', 'Driving maintenance strategy and asset lifecycle planning', 'Managing major contracts and vendor relationships', 'Ensuring regulatory compliance across all technical operations'],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 8, stream: 'ground_services_officers',
        title: 'Ground services officer Level 8',
        description: 'Senior manager of ground services operations with broad responsibility for service delivery, safety, and workforce management.',
        duties: ['Managing all ground services operations across the airport', 'Developing and implementing safety management systems', 'Leading workforce planning and development initiatives', 'Reporting on operational performance to executive leadership'],
        indicative_tasks: [],
        sort_order: 300,
      },
      {
        level: 8, stream: 'technical_services_officers',
        title: 'Technical services officer Level 7',
        description: 'Senior technical manager with advanced specialist expertise, managing major technical programs and leading innovation in airport systems.',
        duties: ['Managing major technical programs and capital projects', 'Leading innovation and technology adoption initiatives', 'Providing expert advisory services on complex technical matters', 'Developing and implementing technical standards and policies'],
        indicative_tasks: [],
        sort_order: 310,
      },
      {
        level: 9, stream: 'ground_services_officers',
        title: 'Ground services officer Level 9',
        description: 'Director-level ground services officer with strategic responsibility for ground operations policy, planning, and governance.',
        duties: ['Setting strategic direction for ground operations', 'Developing policy frameworks and governance structures', 'Managing executive-level stakeholder relationships', 'Overseeing large-scale operational change programs'],
        indicative_tasks: [],
        sort_order: 320,
      },
      {
        level: 9, stream: 'technical_services_officers',
        title: 'Technical services officer Level 8',
        description: 'Senior technical director providing strategic oversight of all technical services and infrastructure management.',
        duties: ['Providing strategic oversight of all technical services', 'Directing infrastructure management and capital investment', 'Leading enterprise-level technical governance', 'Managing executive relationships with regulators and partners'],
        indicative_tasks: [],
        sort_order: 330,
      },
      {
        level: 10, stream: 'ground_services_officers',
        title: 'Ground services officer Level 10',
        description: 'Executive ground services officer with enterprise-wide responsibility for ground operations strategy and performance.',
        duties: ['Leading enterprise-wide ground operations strategy', 'Driving organisational performance and efficiency programs', 'Managing significant budgets and commercial outcomes', 'Representing the organisation in industry forums'],
        indicative_tasks: [],
        sort_order: 340,
      },
      {
        level: 10, stream: 'technical_services_officers',
        title: 'Technical services officer Level 9',
        description: 'Executive technical officer with enterprise-level responsibility for technical strategy, innovation, and infrastructure development.',
        duties: ['Leading enterprise technical strategy and innovation', 'Overseeing all infrastructure development and maintenance', 'Managing enterprise-level budgets and resource allocation', 'Setting organisational technical direction and standards'],
        indicative_tasks: [],
        sort_order: 350,
      },
      {
        level: 11, stream: 'ground_services_officers',
        title: 'Ground services officer Level 11',
        description: 'Top-level ground services executive with ultimate accountability for all ground operations, safety, and service standards.',
        duties: ['Ultimate accountability for all ground operations', 'Defining organisational vision and long-term strategy', 'Managing the highest-level stakeholder and regulatory relationships', 'Overseeing enterprise risk and compliance frameworks'],
        indicative_tasks: [],
        sort_order: 360,
      },
      {
        level: 11, stream: 'technical_services_officers',
        title: 'Technical services officer Level 10',
        description: 'Top-level technical executive with ultimate responsibility for all technical services, asset management, and engineering governance.',
        duties: ['Ultimate responsibility for all technical services and assets', 'Defining long-term technical strategy and investment', 'Leading enterprise engineering and maintenance governance', 'Driving organisation-wide safety and sustainability programs'],
        indicative_tasks: [],
        sort_order: 370,
      },
      {
        level: 38, stream: 'professional_engineers',
        title: 'Professional engineer Level 1',
        description: 'Professional engineer at the base Level 1 classification, performing engineering work under supervision in airport infrastructure and systems.',
        duties: ['Performing engineering work under supervision', 'Preparing technical documentation and drawings', 'Conducting basic engineering analysis and calculations', 'Supporting senior engineers with project delivery'],
        indicative_tasks: [],
        sort_order: 380,
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
      '1_administrative_services_officers': 26.48,
      '1_ground_services_officers': 25.17,
      '1_professional_engineers': 34.87,
      '1_technical_services_officers': 27.05,
      '1_technical_services_officers': 28.11,
      '2_administrative_services_officers': 29.9,
      '2_ground_services_officers': 25.73,
      '2_professional_engineers': 36.22,
      '2_technical_services_officers': 28.11,
      '3_administrative_services_officers': 32.63,
      '3_ground_services_officers': 26.29,
      '3_professional_engineers': 37.54,
      '3_technical_services_officers': 29.1,
      '4_administrative_services_officers': 35.1,
      '4_ground_services_officers': 27.05,
      '4_professional_engineers': 39.41,
      '4_technical_services_officers': 30.98,
      '5_administrative_services_officers': 38.27,
      '5_ground_services_officers': 28.11,
      '5_professional_engineers': 43.36,
      '5_technical_services_officers': 32.83,
      '6_administrative_services_officers': 42.44,
      '6_ground_services_officers': 29.1,
      '6_professional_engineers': 47.3,
      '6_technical_services_officers': 33.58,
      '7_administrative_services_officers': 45.75,
      '7_ground_services_officers': 30,
      '7_professional_engineers': 52.89,
      '7_technical_services_officers': 34.57,
      '8_ground_services_officers': 30.59,
      '8_technical_services_officers': 36.46,
      '9_ground_services_officers': 30.98,
      '9_technical_services_officers': 37.44,
      '10_ground_services_officers': 31.38,
      '10_technical_services_officers': 40.4,
      '11_ground_services_officers': 31.97,
      '11_technical_services_officers': 43.36,
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
        description: 'Day — Full-time ×1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Monday to Saturday - After first 3 hours — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Saturday and Sunday - All hours worked — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Full-time ×2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Day — Part-time ×1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Monday to Saturday - After first 3 hours — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Saturday and Sunday - All hours worked — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Part-time ×2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Day — Casual ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.4, addition_per_hour: null,
        description: 'Saturday — Casual ×1.4',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Sunday — Casual ×1.8',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.2, addition_per_hour: null,
        description: 'Public holiday — Casual ×2.2',
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
        amount: 19.11, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Tool allowance—tradesperson—Carpenter/Plumber',
        description: 'Tool allowance—tradesperson—Carpenter/Plumber',
        trigger_condition: 'As per award conditions',
        amount: 24.54, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance—tradesperson—Electrician/Mechanic',
        description: 'Tool allowance—tradesperson—Electrician/Mechanic',
        trigger_condition: 'As per award conditions',
        amount: 17.76, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance—tradesperson—Painter',
        description: 'Tool allowance—tradesperson—Painter',
        trigger_condition: 'As per award conditions',
        amount: 6.06, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'travel',
        name: 'Travel allowance',
        description: 'Travel allowance',
        trigger_condition: 'As per award conditions',
        amount: 7, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'disability',
        name: 'Disability allowance—confined space (boiler)',
        description: 'Disability allowance—confined space (boiler)',
        trigger_condition: 'As per award conditions',
        amount: 2.47, amount_type: 'fixed', per_unit: 'per_hour',
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
        question_key: 'a49_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'administrative_services_officers', answer_text: 'Administrative Services Officers', sort_order: 1 },
          { answer_key: 'ground_services_officers', answer_text: 'Ground Services Officers', sort_order: 2 },
          { answer_key: 'professional_engineers', answer_text: 'Professional Engineers', sort_order: 3 },
          { answer_key: 'technical_services_officers', answer_text: 'Technical Services Officers', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a49_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Administrative services officer Level 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Administrative services officer Level 2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Administrative services officer Level 3', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Administrative services officer Level 4', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Administrative services officer Level 5', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Administrative services officer Level 6', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Administrative services officer Level 7', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Ground services officer Level 8', sort_order: 8 },
          { answer_key: 'level_9', answer_text: 'Ground services officer Level 9', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Ground services officer Level 10', sort_order: 10 },
          { answer_key: 'level_11', answer_text: 'Ground services officer Level 11', sort_order: 11 },
          { answer_key: 'level_38', answer_text: 'Professional engineer Level 1', sort_order: 12 },
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
    console.log('\n✅ MA000049 seed complete');
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
