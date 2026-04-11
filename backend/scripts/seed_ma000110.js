/**
 * Seed script — Corrections and Detention (Private Sector) Award 2020 [MA000110]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000110.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000110';
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
      'Corrections and Detention (Private Sector) Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000110-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Cook (tradesperson) grade 3',
        description: 'Qualified tradesperson cook at grade 3 in a corrections or detention facility, preparing meals for inmates and staff.',
        duties: ['Preparing and cooking meals to institutional menus', 'Managing kitchen operations during service periods', 'Ensuring food safety and hygiene compliance', 'Supervising kitchen attendants and assisting cooks'],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Cook (tradesperson) grade 4',
        description: 'Senior tradesperson cook at grade 4 performing advanced cooking and kitchen management duties in a corrections facility.',
        duties: ['Preparing complex and specialised menus', 'Overseeing food quality and presentation standards', 'Managing food ordering, stock control, and budgets', 'Training and developing kitchen staff'],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Cook (tradesperson) grade 5',
        description: 'Head or executive tradesperson cook at grade 5 managing all catering operations in a corrections or detention facility.',
        duties: ['Managing all catering operations and menu planning', 'Ensuring compliance with nutritional and dietary requirements', 'Managing catering budgets and supplier relationships', 'Leading the entire kitchen team and ensuring service standards'],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Cook grade 2',
        description: 'Cook grade 2 performing standard cooking duties in a corrections or detention facility under supervision of senior cooks.',
        duties: ['Preparing and cooking meals following standard recipes', 'Operating kitchen equipment safely and efficiently', 'Maintaining food safety and hygiene standards', 'Assisting with food preparation and meal service'],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Food and beverage attendant (tradesperson) grade 4',
        description: 'Qualified tradesperson food and beverage attendant at grade 4 in a corrections facility performing advanced food service and supervisory duties.',
        duties: ['Supervising food and beverage service operations', 'Managing dining area setup, service, and clean-up', 'Ensuring responsible service practices and compliance', 'Training and mentoring junior food service staff'],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Food and beverage attendant grade 1',
        description: 'Entry-level food and beverage attendant performing basic serving and dining area duties in a corrections or detention facility.',
        duties: ['Serving meals and beverages to inmates and staff', 'Setting up and clearing dining areas', 'Maintaining cleanliness of service and dining areas', 'Following security and safety procedures during service'],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Food and beverage attendant grade 3',
        description: 'Experienced food and beverage attendant at grade 3 performing skilled service duties and coordinating meal service in a corrections facility.',
        duties: ['Coordinating meal service and managing dining operations', 'Operating point-of-sale and food service equipment', 'Advising on dietary requirements and special meals', 'Monitoring service quality and food safety compliance'],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Food and beverage supervisor',
        description: 'Supervisor overseeing all food and beverage operations in a corrections or detention facility, managing staff and service standards.',
        duties: ['Supervising food and beverage teams and shift operations', 'Managing rosters, training, and staff performance', 'Ensuring compliance with food safety and security requirements', 'Coordinating catering for special events and functions'],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Introductory',
        description: 'New catering employee in a corrections or detention facility undergoing structured training during an introductory period.',
        duties: ['Performing basic tasks under close supervision', 'Learning facility procedures and security requirements', 'Assisting experienced staff with catering duties', 'Maintaining cleanliness of kitchen and service areas'],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Kitchen attendant grade 1',
        description: 'Entry-level kitchen attendant performing basic food preparation, cleaning, and support duties in a corrections facility kitchen.',
        duties: ['Washing dishes, pots, and kitchen equipment', 'Performing basic food preparation tasks', 'Maintaining cleanliness and hygiene of kitchen areas', 'Assisting cooks with basic food production tasks'],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Kitchen attendant grade 3',
        description: 'Experienced kitchen attendant at grade 3 performing a range of food preparation and kitchen duties with skill and autonomy.',
        duties: ['Performing skilled food preparation and cooking tasks', 'Operating kitchen equipment including ovens and mixers', 'Maintaining food safety records and temperature logs', 'Coordinating kitchen workflow and assisting with menu preparation'],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 1',
        description: 'Level 1 catering employee in a corrections or detention facility performing general catering support duties.',
        duties: ['Performing general catering and food service support', 'Assisting with food production and distribution', 'Maintaining hygiene and cleanliness standards', 'Following facility security and safety procedures'],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Storeperson grade 2',
        description: 'Storeperson grade 2 managing food stores and supplies in a corrections or detention facility catering operation.',
        duties: ['Receiving, checking, and storing food deliveries', 'Maintaining stock records and inventory systems', 'Operating materials handling equipment', 'Ensuring proper storage conditions for perishable goods'],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 1, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Storeperson grade 3',
        description: 'Senior storeperson grade 3 overseeing stores management and inventory control in a corrections facility catering operation.',
        duties: ['Managing food inventory and ordering systems', 'Supervising storekeeping staff and operations', 'Coordinating deliveries and managing supplier relationships', 'Ensuring compliance with storage regulations and safety standards'],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 2, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Cook grade 1',
        description: 'Entry-level cook in a corrections or detention facility performing basic cooking duties under the supervision of senior cooks.',
        duties: ['Preparing basic meals and food items to standard recipes', 'Assisting senior cooks with food production', 'Operating basic kitchen equipment and appliances', 'Maintaining food safety and hygiene standards'],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 2, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Officer—Perimeter/Security Level 1',
        description: 'Entry-level perimeter or security correctional officer responsible for maintaining security at the facility perimeter.',
        duties: ['Patrolling and monitoring facility perimeter security', 'Operating security screening and surveillance equipment', 'Controlling entry and exit of persons and vehicles', 'Responding to security incidents and alarms'],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 2, stream: 'corrections_employees_and_detention_services',
        title: 'Court Security Officer',
        description: 'Security officer providing security services at court facilities including prisoner escort and court room security.',
        duties: ['Providing security within court buildings and rooms', 'Escorting prisoners to and from court proceedings', 'Operating security screening equipment at court entries', 'Responding to security incidents in the court environment'],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 2, stream: 'corrections_employees_and_detention_services',
        title: 'Detention Services Officer Level 1',
        description: 'Entry-level detention services officer responsible for the care, supervision, and welfare of detainees in immigration detention facilities.',
        duties: ['Supervising and monitoring detainees in designated areas', 'Conducting headcounts and welfare checks', 'Managing detainee movements within the facility', 'Recording and reporting incidents and observations'],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 2, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Food and beverage attendant grade 2',
        description: 'Food and beverage attendant at grade 2 performing standard service duties in a corrections or detention facility.',
        duties: ['Providing meal service to inmates and facility staff', 'Operating food service equipment and POS systems', 'Handling cash and maintaining service records', 'Monitoring food quality and presentation standards'],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 2, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Kitchen attendant grade 2',
        description: 'Kitchen attendant at grade 2 performing intermediate food preparation and kitchen duties in a corrections facility.',
        duties: ['Performing intermediate food preparation tasks', 'Operating a range of kitchen equipment', 'Assisting with meal production and portioning', 'Maintaining food safety documentation and records'],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 2, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 2',
        description: 'Level 2 catering employee performing developing catering duties with increased responsibility in a corrections or detention facility.',
        duties: ['Performing a wider range of catering and food service duties', 'Assisting with ordering, receiving, and stock management', 'Following security protocols during food service operations', 'Maintaining hygiene and food safety compliance'],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 2, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Storeperson grade 1',
        description: 'Entry-level storeperson in a corrections facility performing basic receiving, storing, and distributing tasks.',
        duties: ['Receiving and storing food and supply deliveries', 'Distributing supplies to kitchen and service areas', 'Maintaining basic stock records', 'Ensuring cleanliness and order in storage areas'],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 3, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Officer Level 1',
        description: 'Correctional officer responsible for the direct supervision, management, and welfare of prisoners within a correctional facility.',
        duties: ['Supervising and managing prisoners in accommodation and work areas', 'Conducting searches, headcounts, and security patrols', 'Managing prisoner behaviour and enforcing facility rules', 'Preparing reports and maintaining prisoner records'],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 3, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Officer—Perimeter/Security Level 2',
        description: 'Experienced perimeter or security correctional officer performing advanced security operations and supervising security staff.',
        duties: ['Coordinating perimeter and facility security operations', 'Supervising and training junior security officers', 'Operating advanced surveillance and security systems', 'Leading security responses and incident management'],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 3, stream: 'corrections_employees_and_detention_services',
        title: 'Detention Services Officer Level 2',
        description: 'Experienced detention services officer performing advanced detainee management and welfare duties in immigration detention.',
        duties: ['Managing complex detainee interactions and welfare needs', 'Coordinating detainee programs and activities', 'Supervising junior detention services officers', 'Handling critical incidents and de-escalation situations'],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 3, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 3',
        description: 'Level 3 catering employee performing experienced catering duties with supervisory responsibilities in a corrections facility.',
        duties: ['Supervising catering staff during meal service', 'Managing food production schedules and quality', 'Coordinating special dietary requirements', 'Ensuring compliance with food safety and security protocols'],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 4, stream: 'corrections_employees_and_detention_services',
        title: 'Custody Officer',
        description: 'Custody officer managing prisoner custody during transport, court appearances, and external movements.',
        duties: ['Managing prisoner custody during external movements', 'Escorting prisoners to court, medical, and other appointments', 'Maintaining security and control during transport', 'Completing custody documentation and chain of evidence records'],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 4, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 4',
        description: 'Level 4 senior catering employee managing catering operations and staff in a corrections or detention facility.',
        duties: ['Managing catering teams and daily operations', 'Developing menus and managing food budgets', 'Ensuring compliance with dietary, health, and safety standards', 'Training and developing catering staff'],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 4, stream: 'corrections_employees_and_detention_services',
        title: 'Operations Co-ordinator',
        description: 'Operations coordinator managing the day-to-day operational activities of a corrections or detention facility.',
        duties: ['Coordinating daily operational activities across the facility', 'Managing staff rosters and resource allocation', 'Liaising with external agencies and service providers', 'Ensuring compliance with operational policies and procedures'],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 4, stream: 'corrections_employees_and_detention_services',
        title: 'Prisoner Escort Transport Officer',
        description: 'Officer responsible for the secure transport and escort of prisoners between facilities, courts, and other locations.',
        duties: ['Conducting secure transport of prisoners in escort vehicles', 'Managing prisoner welfare and security during transit', 'Completing transport documentation and handover procedures', 'Coordinating transport schedules with facilities and courts'],
        indicative_tasks: [],
        sort_order: 300,
      },
      {
        level: 5, stream: 'corrections_employees_and_detention_services',
        title: 'Court Security Supervisor',
        description: 'Supervisor managing court security operations, staff, and procedures across one or more court locations.',
        duties: ['Supervising court security teams and daily operations', 'Developing and implementing court security procedures', 'Managing staff rosters, training, and performance', 'Liaising with court administrators and judicial officers on security'],
        indicative_tasks: [],
        sort_order: 310,
      },
      {
        level: 5, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 5',
        description: 'Level 5 senior catering manager overseeing all catering services in a corrections or detention facility.',
        duties: ['Overseeing all catering services and operations', 'Managing catering budgets, contracts, and procurement', 'Ensuring regulatory compliance across all food services', 'Leading continuous improvement in catering quality and efficiency'],
        indicative_tasks: [],
        sort_order: 320,
      },
      {
        level: 6, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Officer Level 2',
        description: 'Senior correctional officer performing advanced prisoner management, case management, and specialist correctional duties.',
        duties: ['Performing advanced prisoner management and case coordination', 'Managing specialist programs and interventions', 'Mentoring and training junior correctional officers', 'Contributing to operational planning and risk assessment'],
        indicative_tasks: [],
        sort_order: 330,
      },
      {
        level: 6, stream: 'catering_employee_classifications_corrections_and_',
        title: 'Level 6',
        description: 'Level 6 executive catering manager with broad responsibility for catering strategy and service delivery across facilities.',
        duties: ['Managing catering strategy and service delivery standards', 'Leading large catering teams across multiple areas', 'Developing policies and procedures for food services', 'Managing key supplier and stakeholder relationships'],
        indicative_tasks: [],
        sort_order: 340,
      },
      {
        level: 7, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Supervisor Level 1',
        description: 'Correctional supervisor managing a unit or section within a corrections facility, overseeing staff and operational activities.',
        duties: ['Supervising correctional staff within a unit or section', 'Managing operational activities and security procedures', 'Conducting performance reviews and developing staff', 'Coordinating with management on operational planning'],
        indicative_tasks: [],
        sort_order: 350,
      },
      {
        level: 8, stream: 'corrections_employees_and_detention_services',
        title: 'Correctional Supervisor Level 2',
        description: 'Senior correctional supervisor managing multiple units or significant operational functions within a corrections facility.',
        duties: ['Managing multiple units or major operational functions', 'Developing and implementing operational policies', 'Leading incident management and emergency responses', 'Overseeing staff development and training programs'],
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
      '1_catering_employee_classifications_corrections_and_': 28.12,
      '1_catering_employee_classifications_corrections_and_': 29.88,
      '1_catering_employee_classifications_corrections_and_': 30.68,
      '1_catering_employee_classifications_corrections_and_': 26.7,
      '1_catering_employee_classifications_corrections_and_': 28.12,
      '1_catering_employee_classifications_corrections_and_': 24.95,
      '1_catering_employee_classifications_corrections_and_': 26.7,
      '1_catering_employee_classifications_corrections_and_': 29.88,
      '1_catering_employee_classifications_corrections_and_': 24.28,
      '1_catering_employee_classifications_corrections_and_': 24.95,
      '1_catering_employee_classifications_corrections_and_': 26.7,
      '1_catering_employee_classifications_corrections_and_': 24.95,
      '1_catering_employee_classifications_corrections_and_': 26.7,
      '1_catering_employee_classifications_corrections_and_': 28.12,
      '2_catering_employee_classifications_corrections_and_': 25.85,
      '2_corrections_employees_and_detention_services': 26.79,
      '2_corrections_employees_and_detention_services': 26.79,
      '2_corrections_employees_and_detention_services': 26.79,
      '2_catering_employee_classifications_corrections_and_': 25.85,
      '2_catering_employee_classifications_corrections_and_': 25.85,
      '2_catering_employee_classifications_corrections_and_': 25.85,
      '2_catering_employee_classifications_corrections_and_': 25.85,
      '3_corrections_employees_and_detention_services': 27.04,
      '3_corrections_employees_and_detention_services': 27.04,
      '3_corrections_employees_and_detention_services': 28.12,
      '3_catering_employee_classifications_corrections_and_': 26.7,
      '4_corrections_employees_and_detention_services': 28.12,
      '4_catering_employee_classifications_corrections_and_': 28.12,
      '4_corrections_employees_and_detention_services': 30.77,
      '4_corrections_employees_and_detention_services': 28.12,
      '5_corrections_employees_and_detention_services': 28.79,
      '5_catering_employee_classifications_corrections_and_': 29.88,
      '6_corrections_employees_and_detention_services': 29.47,
      '6_catering_employee_classifications_corrections_and_': 30.68,
      '7_corrections_employees_and_detention_services': 33.52,
      '8_corrections_employees_and_detention_services': 34.86,
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
        description: 'Monday to Saturday - After 3 hours — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — Full-time ×2',
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
        description: 'Ordinary weekday — ×1',
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
        description: 'Sunday — Part-time ×2',
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
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Saturday span — Casual ×1.75',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Sunday span — Casual ×2.25',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.75, addition_per_hour: null,
        description: 'Public holiday span — Casual ×2.75',
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
        allowance_type: 'duty_away_from_normal_place_of_work_brea',
        name: 'Duty away from normal place of work—breakfast between 6.00 am and 8.00 am',
        description: 'Duty away from normal place of work—breakfast between 6.00 am and 8.00 am',
        trigger_condition: 'As per award conditions',
        amount: 24.91, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'duty_away_from_normal_place_of_work_dinn',
        name: 'Duty away from normal place of work—dinner after 6.00 pm',
        description: 'Duty away from normal place of work—dinner after 6.00 pm',
        trigger_condition: 'As per award conditions',
        amount: 41.52, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'duty_away_from_normal_place_of_work_lunc',
        name: 'Duty away from normal place of work—lunch between 12 noon and 2.00 pm',
        description: 'Duty away from normal place of work—lunch between 12 noon and 2.00 pm',
        trigger_condition: 'As per award conditions',
        amount: 24.91, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance—meal break at post',
        description: 'Meal allowance—meal break at post',
        trigger_condition: 'As per award conditions',
        amount: 21.28, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance—overtime of more than 2 hours',
        description: 'Meal allowance—overtime of more than 2 hours',
        trigger_condition: 'As per award conditions',
        amount: 21.28, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Travelling—transport and fares—motor cycle allowance',
        description: 'Travelling—transport and fares—motor cycle allowance',
        trigger_condition: 'As per award conditions',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
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
        question_key: 'a110_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'catering_employee_classifications_corrections_and_', answer_text: 'Catering Employee Classifications Corrections And ', sort_order: 1 },
          { answer_key: 'corrections_employees_and_detention_services', answer_text: 'Corrections Employees And Detention Services', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a110_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Cook (tradesperson) grade 3', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Cook grade 1', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Correctional Officer Level 1', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Custody Officer', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Court Security Supervisor', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Correctional Officer Level 2', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Correctional Supervisor Level 1', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Correctional Supervisor Level 2', sort_order: 8 },
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
    console.log('\n✅ MA000110 seed complete');
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
