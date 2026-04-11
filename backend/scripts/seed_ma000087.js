/**
 * Seed script — Sugar Industry Award 2020 [MA000087]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000087.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000087';
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
      'Sugar Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000087-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'bulk_terminal_employees',
        title: 'BT1',
        description: 'Bulk terminal employee Level 1 performing basic duties at sugar bulk terminals including loading, unloading, and general maintenance.',
        duties: ['Performing basic loading and unloading of bulk sugar', 'Maintaining cleanliness of terminal areas and conveyors', 'Assisting with equipment checks and basic maintenance', 'Following safety procedures in bulk handling environments'],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'milling_distillery_refinery_and_maintenance_employ',
        title: 'C14/L2',
        description: 'Entry-level milling, distillery, refinery, or maintenance employee at classification C14/Level 2, performing basic production duties.',
        duties: ['Performing basic production tasks in the sugar mill or refinery', 'Cleaning and maintaining processing equipment and areas', 'Assisting with raw material handling and storage', 'Following standard operating procedures under supervision'],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CT1 (Level 1)',
        description: 'Entry-level cane tester at field experiment stations performing basic testing and sampling duties under supervision.',
        duties: ['Collecting cane samples from deliveries for testing', 'Performing basic laboratory tests on cane samples', 'Recording test results and maintaining logs', 'Maintaining cleanliness of testing equipment and areas'],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'general',
        title: 'CT1 (Level 1)',
        description: 'General stream cane tester Level 1 performing basic cane testing and sampling duties in the sugar industry.',
        duties: ['Collecting and preparing cane samples for analysis', 'Operating basic testing equipment', 'Recording results and maintaining sample records', 'Following standard testing procedures'],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 1, stream: 'general',
        title: 'Supervisor/Trainer/Coordinator Level I',
        description: 'Level I supervisor, trainer, or coordinator in the sugar industry providing basic supervision and training to production or field staff.',
        duties: ['Supervising small teams of production or field workers', 'Delivering basic training on work procedures and safety', 'Coordinating daily work activities and task allocation', 'Reporting on team performance and operational issues'],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 1, stream: 'general',
        title: 'Supervisor/Trainer/Coordinator Level II',
        description: 'Level II supervisor, trainer, or coordinator in the sugar industry with broader responsibilities for team management and training programs.',
        duties: ['Managing larger teams and coordinating shift operations', 'Developing and delivering structured training programs', 'Monitoring compliance with safety and quality standards', 'Liaising with management on operational planning'],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 2, stream: 'bulk_terminal_employees',
        title: 'BT2',
        description: 'Bulk terminal employee Level 2 with developing skills performing equipment operation and handling duties at sugar terminals.',
        duties: ['Operating bulk handling and conveyor equipment', 'Performing quality checks on sugar storage and loading', 'Conducting routine maintenance on terminal machinery', 'Coordinating loading operations with transport crews'],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 2, stream: 'milling_distillery_refinery_and_maintenance_employ',
        title: 'C13/L3',
        description: 'Milling, distillery, refinery, or maintenance employee at classification C13/Level 3, performing developing production and maintenance duties.',
        duties: ['Operating production machinery in the mill or refinery', 'Performing routine maintenance and servicing tasks', 'Monitoring processing parameters and reporting issues', 'Assisting with equipment changeovers and shutdowns'],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 2, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CHAR1 (Level 1)',
        description: 'Field experiment station employee at CHAR1 Level 1 performing charcoal or chemical analysis duties in sugar cane research.',
        duties: ['Performing chemical analyses on cane and sugar samples', 'Operating laboratory instruments and equipment', 'Recording analytical results and maintaining databases', 'Preparing reagents and maintaining laboratory supplies'],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 2, stream: 'general',
        title: 'CHAR1 (Level 1)',
        description: 'General stream CHAR1 Level 1 employee performing analytical and testing duties in the sugar industry.',
        duties: ['Conducting routine chemical and physical analyses', 'Operating analytical equipment and instruments', 'Maintaining testing records and quality documentation', 'Calibrating and maintaining laboratory equipment'],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 2, stream: 'general',
        title: 'CHAU1 (Level 1)',
        description: 'General stream CHAU1 Level 1 employee performing chauffeur and transport duties in the sugar industry.',
        duties: ['Driving and operating transport vehicles', 'Performing vehicle inspections and basic maintenance', 'Transporting personnel and materials between sites', 'Maintaining vehicle logs and transport records'],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 2, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CHAU1 (Level 1)',
        description: 'Field experiment station CHAU1 Level 1 employee performing transport and support duties at cane testing and research facilities.',
        duties: ['Transporting samples and equipment between field sites', 'Assisting with field experiment setup and logistics', 'Operating utility vehicles and maintaining them', 'Supporting research staff with transport requirements'],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 2, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CP1 (Level 1)',
        description: 'Field experiment station cane production employee at CP1 Level 1 performing basic field research and trial management duties.',
        duties: ['Assisting with planting and maintaining field trials', 'Collecting field data and recording observations', 'Operating basic agricultural machinery and tools', 'Maintaining field trial areas and equipment'],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 2, stream: 'general',
        title: 'CP1 (Level 1)',
        description: 'General stream cane production employee at CP1 Level 1 performing basic sugar cane cultivation and production duties.',
        duties: ['Performing basic cane cultivation and planting tasks', 'Operating basic farm machinery and tools', 'Assisting with irrigation and crop maintenance', 'Following instructions for weed and pest management'],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 2, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CT2 (Level 2)',
        description: 'Cane tester at Level 2 in field experiment stations with developing skills performing a range of testing and analytical duties.',
        duties: ['Performing a wider range of cane quality tests', 'Operating more complex analytical equipment', 'Interpreting test results and identifying anomalies', 'Training Level 1 cane testers on basic procedures'],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 2, stream: 'general',
        title: 'CT2 (Level 2)',
        description: 'General stream cane tester Level 2 performing experienced testing and quality assessment duties in the sugar industry.',
        duties: ['Conducting comprehensive cane quality assessments', 'Operating and calibrating testing instruments', 'Analysing results and preparing quality reports', 'Ensuring compliance with testing standards and procedures'],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 3, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'CHAU2 (Level 2)',
        description: 'Senior field experiment station CHAU2 Level 2 employee performing experienced transport, logistics, and field support duties.',
        duties: ['Coordinating transport and logistics for field operations', 'Operating specialised vehicles and heavy equipment', 'Managing fleet maintenance and scheduling', 'Supporting research teams with complex logistics'],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 23, stream: 'general',
        title: 'Cane Harvesting',
        description: 'Sugar cane harvesting employee in the general stream operating harvesting machinery and performing cane cutting operations.',
        duties: ['Operating mechanical cane harvesters in the field', 'Performing pre-start checks on harvesting equipment', 'Coordinating with haulout operators for efficient harvesting', 'Maintaining harvester components and reporting faults'],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 24, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'Cane Harvesting',
        description: 'Cane harvesting employee at field experiment stations performing harvesting operations for research trials and experiments.',
        duties: ['Harvesting cane from experimental plots carefully', 'Operating small-scale harvesting equipment for trials', 'Ensuring sample integrity during harvest collection', 'Recording harvest data for research purposes'],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 25, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'Cane Haulage',
        description: 'Cane haulage employee at field experiment stations transporting harvested cane from experimental fields to testing or milling facilities.',
        duties: ['Driving cane haulage vehicles between fields and facilities', 'Loading and securing cane for transport', 'Maintaining haulage vehicles and trailers', 'Coordinating haulage schedules with field teams'],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 26, stream: 'general',
        title: 'Cane Haulage',
        description: 'General stream cane haulage employee transporting harvested sugar cane from farms to mills using trucks and rail systems.',
        duties: ['Operating cane haulage trucks and rolling stock', 'Loading and unloading cane bins at farms and mills', 'Performing daily vehicle inspections and maintenance', 'Following designated routes and transport schedules'],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 27, stream: 'general',
        title: 'Cane Testers',
        description: 'General stream cane tester performing quality assessment of sugar cane deliveries to determine sugar content and payment calculations.',
        duties: ['Testing sugar cane samples for commercial sugar content (CCS)', 'Operating cane testing laboratory equipment', 'Calculating payment data based on cane quality results', 'Maintaining testing records and reporting to growers'],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 28, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'Cane Testers',
        description: 'Cane tester at field experiment stations performing quality testing on experimental and commercial cane varieties.',
        duties: ['Testing experimental cane varieties for sugar content', 'Comparing quality data across different cane cultivars', 'Operating specialist laboratory instruments', 'Preparing analytical reports for research programs'],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 29, stream: 'general',
        title: 'Cultivation/Cane Production (adult)',
        description: 'Adult general stream employee performing sugar cane cultivation and production duties including planting, irrigation, and crop management.',
        duties: ['Performing cane planting and cultivation operations', 'Operating agricultural machinery for field preparation', 'Managing irrigation systems and crop maintenance', 'Applying fertilisers and conducting weed management'],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 30, stream: 'field_experiment_stations_and_cane_tester_employee',
        title: 'Cultivation/Cane Production (adult)',
        description: 'Adult field experiment station employee performing cane cultivation and production duties for research trials and variety testing.',
        duties: ['Cultivating experimental cane plots for research programs', 'Operating agricultural equipment for trial management', 'Recording crop growth data and field observations', 'Managing trial plots including planting, fertilising, and harvesting'],
        indicative_tasks: [],
        sort_order: 300,
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
      '1_bulk_terminal_employees': 24.28,
      '1_milling_distillery_refinery_and_maintenance_employ': 24.28,
      '1_field_experiment_stations_and_cane_tester_employee': 24.95,
      '1_general': 31.8,
      '2_bulk_terminal_employees': 25.12,
      '2_milling_distillery_refinery_and_maintenance_employ': 24.95,
      '2_field_experiment_stations_and_cane_tester_employee': 25.77,
      '2_general': 25.77,
      '3_field_experiment_stations_and_cane_tester_employee': 27.12,
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
        description: 'Monday to Saturday - After 3 hours — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Overtime - Monday to Sunday — Full-time ×2',
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
        description: 'Monday to Saturday - After 3 hours — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Overtime - Monday to Sunday — Part-time ×2',
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
        multiplier: 1.2, addition_per_hour: null,
        description: 'Saturday — Casual ×1.2',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.6, addition_per_hour: null,
        description: 'Sunday — Casual ×1.6',
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
        allowance_type: 'tool',
        name: 'Annual value of tools—Assembly and Servicing Tradesperson - Electrical',
        description: 'Annual value of tools—Assembly and Servicing Tradesperson - Electrical',
        trigger_condition: 'As per award conditions',
        amount: 526.82, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tool',
        name: 'Annual value of tools—Electricity Supply Tradesperson',
        description: 'Annual value of tools—Electricity Supply Tradesperson',
        trigger_condition: 'As per award conditions',
        amount: 526.82, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tool',
        name: 'Annual value of tools—Engineering Tradesperson (Electrical)',
        description: 'Annual value of tools—Engineering Tradesperson (Electrical)',
        trigger_condition: 'As per award conditions',
        amount: 526.82, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tool',
        name: 'Annual value of tools—Engineering Tradesperson (Electronic)',
        description: 'Annual value of tools—Engineering Tradesperson (Electronic)',
        trigger_condition: 'As per award conditions',
        amount: 526.82, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tool',
        name: 'Annual value of tools—Engineering Tradesperson (Fabrication)',
        description: 'Annual value of tools—Engineering Tradesperson (Fabrication)',
        trigger_condition: 'As per award conditions',
        amount: 395.12, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'tool',
        name: 'Annual value of tools—Engineering Tradesperson (Mechanical)',
        description: 'Annual value of tools—Engineering Tradesperson (Mechanical)',
        trigger_condition: 'As per award conditions',
        amount: 526.82, amount_type: 'fixed', per_unit: 'per_shift',
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
        question_key: 'a87_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'bulk_terminal_employees', answer_text: 'Bulk Terminal Employees', sort_order: 1 },
          { answer_key: 'milling_distillery_refinery_and_maintenance_employ', answer_text: 'Milling Distillery Refinery And Maintenance Employ', sort_order: 2 },
          { answer_key: 'field_experiment_stations_and_cane_tester_employee', answer_text: 'Field Experiment Stations And Cane Tester Employee', sort_order: 3 },
          { answer_key: 'general', answer_text: 'General', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a87_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'BT1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'BT2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'CHAU2 (Level 2)', sort_order: 3 },
          { answer_key: 'level_23', answer_text: 'Cane Harvesting', sort_order: 4 },
          { answer_key: 'level_24', answer_text: 'Cane Harvesting', sort_order: 5 },
          { answer_key: 'level_25', answer_text: 'Cane Haulage', sort_order: 6 },
          { answer_key: 'level_26', answer_text: 'Cane Haulage', sort_order: 7 },
          { answer_key: 'level_27', answer_text: 'Cane Testers', sort_order: 8 },
          { answer_key: 'level_28', answer_text: 'Cane Testers', sort_order: 9 },
          { answer_key: 'level_29', answer_text: 'Cultivation/Cane Production (adult)', sort_order: 10 },
          { answer_key: 'level_30', answer_text: 'Cultivation/Cane Production (adult)', sort_order: 11 },
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
    console.log('\n✅ MA000087 seed complete');
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
