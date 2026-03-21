/**
 * Seed script — Hospitality Industry (General) Award 2020 [MA000009]
 * Pay rates effective 1 July 2024 (following 2024 Annual Wage Review — 3.75% increase)
 * Source: Fair Work Commission / Fair Work Ombudsman pay guide
 *
 * Run after migrate.js: node scripts/seed.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000009';
const EFFECTIVE_DATE = '2024-07-01';
// 2025 Annual Wage Review — 3.5% increase, effective 1 July 2025
// Source: Fair Work Commission Annual Wage Review 2024-25
// Verify current rates at fairwork.gov.au before each July update
const EFFECTIVE_DATE_2025 = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Hospitality Industry (General) Award 2020',
      EFFECTIVE_DATE_2025,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000009-summary'
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Levels 1-5, streams: general, food_beverage, kitchen, front_office
    // Based on Schedule B of the Award

    const classifications = [
      // INTRODUCTORY (Level 0)
      {
        level: 0, stream: 'general',
        title: 'Introductory Level',
        description: 'An introductory level employee is one who has not yet completed 3 months of employment in the hospitality industry.',
        duties: [
          'Basic tasks under close supervision during initial period of employment',
          'Learning basic hospitality operations',
          'Assisting other employees with their duties',
        ],
        indicative_tasks: ['New entrant to the hospitality industry (first 3 months)'],
        sort_order: 1,
      },

      // LEVEL 1
      {
        level: 1, stream: 'general',
        title: 'Hospitality Employee Level 1',
        description: 'Entry-level position. You are new to the industry or working in a simple, clearly defined role with direct supervision. You follow instructions and do basic tasks.',
        duties: [
          'Performing basic cleaning duties (sweeping, mopping, wiping down surfaces)',
          'Setting up and clearing tables under supervision',
          'Collecting and delivering food and beverages under supervision',
          'Basic customer service with supervision',
          'Using simple kitchen equipment like dishwashers',
          'Taking and passing on simple messages',
          'Portioning food under supervision',
        ],
        indicative_tasks: ['Kitchenhand', 'Cleaner', 'Car park attendant', 'Trolley collector'],
        sort_order: 10,
      },
      {
        level: 1, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Level 1',
        description: 'Entry-level food and beverage role. You do basic food and drink service tasks with direct supervision.',
        duties: [
          'Setting up and clearing tables',
          'Delivering food and drinks to tables (not taking orders)',
          'Basic customer greeting and service under supervision',
          'Keeping service areas clean and stocked',
          'Operating basic point-of-sale equipment with supervision',
        ],
        indicative_tasks: ['Food runner', 'Busser', 'Basic counter service assistant'],
        sort_order: 11,
      },
      {
        level: 1, stream: 'kitchen',
        title: 'Kitchen Attendant Level 1',
        description: 'Entry-level kitchen role. You do basic kitchen tasks under direct supervision.',
        duties: [
          'Washing dishes and kitchen equipment',
          'Basic food preparation under supervision (peeling, chopping basic items)',
          'Keeping the kitchen clean',
          'Moving and storing supplies',
          'Portioning food under supervision',
        ],
        indicative_tasks: ['Kitchenhand', 'Dishwasher', 'Kitchen cleaner'],
        sort_order: 12,
      },
      {
        level: 1, stream: 'front_office',
        title: 'Front Office Employee Level 1',
        description: 'Entry-level front office or rooms role. You do basic tasks under direct supervision.',
        duties: [
          'Basic room servicing under supervision',
          'Delivering items to guest rooms',
          'Basic porter duties under supervision',
          'Cleaning public areas under supervision',
        ],
        indicative_tasks: ['Room attendant (in training)', 'Porter assistant', 'Linen room assistant'],
        sort_order: 13,
      },

      // LEVEL 2
      {
        level: 2, stream: 'general',
        title: 'Hospitality Employee Level 2',
        description: 'You can work independently in your area after being shown what to do. You understand the basics of hospitality service and can handle routine situations without being told what to do each time.',
        duties: [
          'Performing hospitality tasks without needing constant supervision',
          'Basic food and beverage service',
          'Handling cash transactions',
          'Providing customer information and assistance',
          'Using point-of-sale systems',
          'Basic preparation and service of non-alcoholic drinks',
          'Cleaning and maintaining work areas',
        ],
        indicative_tasks: ['General hospitality attendant', 'Food and beverage assistant', 'Counter staff'],
        sort_order: 20,
      },
      {
        level: 2, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Level 2',
        description: 'You do food and drink service independently. You take orders, serve food and drinks, handle payments, and give customers information about the menu.',
        duties: [
          'Taking food and beverage orders from customers',
          'Serving food and beverages without supervision',
          'Making basic non-alcoholic drinks (teas, coffees from espresso machines)',
          'Handling cash and electronic payments',
          'Explaining menu items to customers',
          'Clearing and resetting tables',
          'Responsible service of alcohol (RSA required)',
          'Assisting with function setup and service',
          'Cellar duties — receiving, storing and rotating stock',
        ],
        indicative_tasks: ['Waiter/Waitress', 'Bar attendant', 'Café attendant', 'Function attendant'],
        sort_order: 21,
      },
      {
        level: 2, stream: 'kitchen',
        title: 'Cook Level 1 / Kitchen Attendant Level 2',
        description: 'You prepare and cook food using a range of methods under general supervision. You have some cooking skills but still work within set procedures.',
        duties: [
          'Cooking and preparing food using a range of cooking methods',
          'Preparing stocks, sauces and soups from given recipes',
          'Basic pastry and baking tasks',
          'Organising and maintaining kitchen equipment',
          'Following food safety procedures',
          'Basic knife skills and food preparation',
          'Working within a team in a commercial kitchen',
        ],
        indicative_tasks: ['Cook (1st year)', 'Commis chef', 'Pastry assistant'],
        sort_order: 22,
      },
      {
        level: 2, stream: 'front_office',
        title: 'Front Office Employee Level 2',
        description: 'You work in front office, reservations or rooms with some independence. You deal with guests and carry out standard procedures without close supervision.',
        duties: [
          'Checking guests in and out of accommodation',
          'Handling reservations and bookings',
          'Processing guest payments',
          'Providing guest information and concierge-type assistance',
          'Handling guest inquiries and basic complaints',
          'Operating property management systems',
          'Room servicing to standard without supervision',
        ],
        indicative_tasks: ['Receptionist', 'Reservations agent', 'Room attendant (experienced)', 'Night auditor (basic)'],
        sort_order: 23,
      },

      // LEVEL 3
      {
        level: 3, stream: 'general',
        title: 'Hospitality Employee Level 3',
        description: 'You are skilled and experienced. You work independently and may help train or guide newer staff. You can handle complex customer situations.',
        duties: [
          'All Level 2 duties, performed with skill and experience',
          'Training and guiding Level 1 and 2 employees',
          'Handling customer complaints and difficult situations',
          'Organising your own work and the work of others in your area',
          'Operating multiple hospitality functions',
        ],
        indicative_tasks: ['Experienced hospitality attendant', 'Senior counter staff'],
        sort_order: 30,
      },
      {
        level: 3, stream: 'food_beverage',
        title: 'Food and Beverage Supervisor / Specialist Level 3',
        description: 'You are an experienced food and drink specialist. You might specialise in wines, cocktails or fine dining service, or you supervise other service staff.',
        duties: [
          'Preparing and serving a full range of alcoholic and non-alcoholic drinks',
          'Expert knowledge of wines, cocktails, spirits and food-wine matching',
          'Cellar management including ordering, receiving and maintaining wine inventory',
          'Supervising food and beverage staff during service',
          'Training other staff in beverage knowledge and service standards',
          'Planning service rosters and coordinating shifts',
          'Handling complex customer situations and complaints',
          'Assisting with menu and beverage list development',
          'Silver service and other specialist service techniques',
        ],
        indicative_tasks: ['Senior waiter', 'Wine waiter/Sommelier assistant', 'Bar supervisor', 'Functions supervisor', 'Cocktail bartender'],
        sort_order: 31,
      },
      {
        level: 3, stream: 'kitchen',
        title: 'Cook Level 2 / Senior Cook',
        description: 'You are an experienced cook who can prepare a full range of dishes. You work independently and can run a section of the kitchen.',
        duties: [
          'Preparing and cooking a full range of dishes across all sections',
          'Running a section of the kitchen during service (e.g., grill, sauté, pastry)',
          'Creating dishes within established menus',
          'Supervising kitchen attendants and junior cooks',
          'Contributing to menu planning',
          'Managing mise en place for your section',
          'Costing recipes and controlling waste in your section',
          'Training junior kitchen staff',
        ],
        indicative_tasks: ['Chef de partie', 'Senior cook', 'Pastry cook'],
        sort_order: 32,
      },
      {
        level: 3, stream: 'front_office',
        title: 'Front Office Supervisor / Specialist Level 3',
        description: 'You are experienced in front office operations and may supervise other front office staff. You handle complex guest situations.',
        duties: [
          'All Level 2 front office duties, performed with expertise',
          'Supervising front office and reservations staff',
          'Handling complex guest complaints and escalations',
          'Night audit responsibilities',
          'Coordinating with housekeeping and maintenance',
          'Managing overbooking situations and room allocations',
          'Training new front office staff',
        ],
        indicative_tasks: ['Front office supervisor', 'Reservations supervisor', 'Senior receptionist', 'Night auditor (experienced)'],
        sort_order: 33,
      },

      // LEVEL 4
      {
        level: 4, stream: 'general',
        title: 'Hospitality Supervisor Level 4',
        description: 'You supervise other staff and take responsibility for a section or shift. You have significant hospitality experience and skills.',
        duties: [
          'Supervising and coordinating a team of hospitality employees',
          'Planning and allocating work to team members',
          'Training staff',
          'Handling difficult customer situations',
          'Responsibility for opening and/or closing procedures',
          'Cash handling and reconciliation',
          'Reporting to management',
        ],
        indicative_tasks: ['Shift supervisor', 'Duty manager (small venue)', 'Gaming supervisor'],
        sort_order: 40,
      },
      {
        level: 4, stream: 'food_beverage',
        title: 'Food and Beverage Manager Level 4',
        description: 'You manage food and beverage operations, lead a team, and are responsible for service standards, costs and compliance.',
        duties: [
          'Managing food and beverage operations across a venue or section',
          'Leading, training and developing a team',
          'Setting and maintaining service standards',
          'Managing beverage inventory, ordering and stocktaking',
          'Financial responsibilities including budgets and cost control',
          'Liquor licensing compliance and RSA supervision',
          'Menu and beverage list input',
          'Rostering and staff management',
        ],
        indicative_tasks: ['Restaurant manager', 'Bar manager', 'Venue manager (food and beverage focus)', 'Functions manager'],
        sort_order: 41,
      },
      {
        level: 4, stream: 'kitchen',
        title: 'Cook Level 3 / Sous Chef',
        description: 'You are a highly skilled cook or chef who helps run the kitchen. You may be second in charge of the kitchen.',
        duties: [
          'Planning and costing menus in conjunction with the head chef',
          'Running the kitchen in the head chef\'s absence',
          'Supervising and training all kitchen staff',
          'Controlling food costs and minimising waste',
          'Managing kitchen rosters',
          'Maintaining food safety and hygiene standards throughout the kitchen',
          'Ordering supplies and managing stock',
          'Creating new dishes and contributing to menu development',
        ],
        indicative_tasks: ['Sous chef', 'Second chef', 'Head pastry chef'],
        sort_order: 42,
      },
      {
        level: 4, stream: 'front_office',
        title: 'Front Office Manager Level 4',
        description: 'You manage front office operations and lead the front office team.',
        duties: [
          'Managing all front office operations',
          'Leading and developing the front office team',
          'Revenue management and room rate optimisation',
          'Managing relationships with guests and handling complex situations',
          'Financial reporting and reconciliation',
          'Liaising with other departments at management level',
          'OTA and channel management',
        ],
        indicative_tasks: ['Front office manager', 'Rooms division manager (smaller property)'],
        sort_order: 43,
      },

      // LEVEL 5
      {
        level: 5, stream: 'general',
        title: 'Senior Hospitality Manager Level 5',
        description: 'You are a senior manager with broad responsibility across a hospitality venue or department. You make decisions about operations, staff and finances.',
        duties: [
          'Senior management responsibility for a hospitality venue or major department',
          'Strategic planning and operational management',
          'Financial management including P&L responsibility',
          'Leading and developing management teams',
          'Managing compliance with all relevant laws and award requirements',
          'Stakeholder management',
        ],
        indicative_tasks: ['Venue/Hotel manager', 'Operations manager', 'General manager (larger venue)'],
        sort_order: 50,
      },
      {
        level: 5, stream: 'kitchen',
        title: 'Head Chef / Executive Chef Level 5',
        description: 'You are the head of the kitchen. You have full responsibility for all kitchen operations, the menu, and the kitchen team.',
        duties: [
          'Full responsibility for all kitchen and food production',
          'Creating and changing the menu',
          'Recruiting, managing and developing all kitchen staff',
          'Managing the kitchen budget and food costs',
          'Maintaining all food safety systems',
          'Working with management on food strategy',
          'Managing relationships with suppliers',
        ],
        indicative_tasks: ['Head chef', 'Executive chef', 'Executive pastry chef'],
        sort_order: 52,
      },

      // LEVEL 6
      {
        level: 6, stream: 'kitchen',
        title: 'Cook (tradesperson) Grade 5',
        description: 'A cook who has completed an apprenticeship or has equivalent experience and is required to perform work above the level of Cook Grade 4.',
        duties: [
          'All duties of a Level 5 cook plus additional specialised responsibilities',
          'Advanced culinary techniques and menu development',
          'Training and mentoring junior cooking staff',
          'Specialist pastry, larder, or sauce work at a high level',
        ],
        indicative_tasks: ['Senior tradesperson cook', 'Specialist chef (pastry, larder, sauce)'],
        sort_order: 60,
      },

      // MANAGERIAL STAFF — HOTEL (Level 7 internally)
      {
        level: 7, stream: 'general',
        title: 'Managerial Staff (Hotels)',
        description: 'Managerial staff employed in a hotel who are not covered by another classification in this award.',
        duties: [
          'Managing hotel operations or a significant department within a hotel',
          'Budget and financial management responsibilities',
          'Staff supervision and HR management',
          'Ensuring compliance with hotel standards and regulations',
        ],
        indicative_tasks: ['Hotel manager', 'Hotel duty manager', 'Hotel department manager'],
        sort_order: 70,
      },

      // CASINO CLASSIFICATIONS
      {
        level: 1, stream: 'casino',
        title: 'Introductory (Casino)',
        description: 'Introductory-level casino employee within the first 3 months of employment.',
        duties: ['Basic casino floor duties under close supervision', 'Learning casino operations'],
        indicative_tasks: ['New casino entrant (first 3 months)'],
        sort_order: 101,
      },
      {
        level: 2, stream: 'casino',
        title: 'Casino Electronic Gaming Employee Grade 1',
        description: 'Employee operating or attending to electronic gaming machines at an entry level.',
        duties: ['Attending to electronic gaming machines', 'Basic customer assistance on gaming floor', 'Monitoring machine operation'],
        indicative_tasks: ['Gaming floor attendant', 'Slot attendant'],
        sort_order: 102,
      },
      {
        level: 3, stream: 'casino',
        title: 'Casino Electronic Gaming Employee Grade 2',
        description: 'Experienced electronic gaming employee with additional responsibilities.',
        duties: ['Advanced gaming machine operation', 'Customer service and dispute resolution', 'Minor machine maintenance'],
        indicative_tasks: ['Senior gaming attendant', 'Gaming technician assistant'],
        sort_order: 103,
      },
      {
        level: 3, stream: 'casino_equipment',
        title: 'Casino Equipment Technician Grade 1',
        description: 'Technician maintaining and repairing casino equipment.',
        duties: ['Basic maintenance of gaming equipment', 'Equipment setup and configuration', 'Troubleshooting faults'],
        indicative_tasks: ['Gaming machine technician (junior)', 'Equipment maintenance officer'],
        sort_order: 104,
      },
      {
        level: 3, stream: 'casino_table',
        title: 'Casino Table Gaming Employee Grade 1',
        description: 'Entry-level table gaming employee dealing at casino tables.',
        duties: ['Dealing at table games under supervision', 'Handling chips and managing game pace', 'Customer interaction'],
        indicative_tasks: ['Trainee dealer', 'Junior croupier'],
        sort_order: 105,
      },
      {
        level: 3, stream: 'casino_finance',
        title: 'Customer Liaison Officer / Gaming Finance Employee Grade 1',
        description: 'Customer liaison or entry-level gaming finance employee.',
        duties: ['Customer liaison and support', 'Basic gaming finance transactions', 'Record keeping'],
        indicative_tasks: ['Customer liaison officer', 'Gaming cashier'],
        sort_order: 106,
      },
      {
        level: 4, stream: 'casino_equipment',
        title: 'Casino Equipment Technician Grade 2',
        description: 'Experienced equipment technician with advanced skills.',
        duties: ['Complex equipment repairs', 'Equipment installation and commissioning', 'Training junior technicians'],
        indicative_tasks: ['Senior gaming technician'],
        sort_order: 107,
      },
      {
        level: 4, stream: 'casino_finance',
        title: 'Gaming Finance Employee Grade 2 / Security Officer Grade 1',
        description: 'Experienced gaming finance employee or security officer.',
        duties: ['Advanced financial transactions', 'Security monitoring and patrol', 'Compliance reporting'],
        indicative_tasks: ['Gaming finance officer', 'Casino security officer (grade 1)'],
        sort_order: 108,
      },
      {
        level: 5, stream: 'casino_table',
        title: 'Casino Table Gaming Employee Grade 2 (Level 3A)',
        description: 'Experienced table gaming employee with advanced dealing skills.',
        duties: ['Dealing all table games independently', 'Supervising junior dealers', 'Game integrity monitoring'],
        indicative_tasks: ['Experienced dealer', 'Senior croupier'],
        sort_order: 109,
      },
      {
        level: 5, stream: 'casino_equipment',
        title: 'Casino Equipment Technician Grade 3',
        description: 'Senior equipment technician with supervisory responsibilities.',
        duties: ['Supervising equipment maintenance team', 'System-level troubleshooting', 'Project management'],
        indicative_tasks: ['Lead gaming technician', 'Equipment supervisor'],
        sort_order: 110,
      },
      {
        level: 5, stream: 'casino_finance',
        title: 'Gaming Finance Employee Grade 3 / Security Officer Grade 2',
        description: 'Senior gaming finance employee or security officer.',
        duties: ['Supervisory finance role', 'Senior security duties', 'Incident management'],
        indicative_tasks: ['Senior gaming finance officer', 'Senior security officer'],
        sort_order: 111,
      },
      {
        level: 6, stream: 'casino_table',
        title: 'Casino Table Gaming Employee Grade 3',
        description: 'Senior table gaming employee with supervisory or inspector duties.',
        duties: ['Table game inspection', 'Supervising dealing operations', 'High-value game management'],
        indicative_tasks: ['Table inspector', 'Pit supervisor (junior)'],
        sort_order: 112,
      },
      {
        level: 6, stream: 'casino_finance',
        title: 'Gaming Finance Employee Grade 4',
        description: 'Senior gaming finance employee with management responsibilities.',
        duties: ['Managing finance operations', 'Regulatory compliance', 'Staff supervision'],
        indicative_tasks: ['Gaming finance manager', 'Cage supervisor'],
        sort_order: 113,
      },
      {
        level: 7, stream: 'casino_table',
        title: 'Casino Table Gaming Employee Grade 4',
        description: 'Most senior table gaming classification with full supervisory authority.',
        duties: ['Full pit management', 'High-stakes game oversight', 'Compliance and integrity management'],
        indicative_tasks: ['Pit boss', 'Senior table games supervisor'],
        sort_order: 114,
      },
      {
        level: 7, stream: 'casino_finance',
        title: 'Gaming Finance Employee Grade 5 / Surveillance Operator',
        description: 'Most senior gaming finance or surveillance classification.',
        duties: ['Surveillance operations', 'Senior financial management', 'Regulatory liaison'],
        indicative_tasks: ['Surveillance operator', 'Senior gaming finance manager'],
        sort_order: 115,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ─────────────────────────────────────────────────────────────
    // Casual loading: 25% on top of base rate (combined into base_hourly for casual)

    // Rates sourced from Fair Work Ombudsman Pay Guide, MA000009, published 15 Jan 2026.
    // 2025 rates (effective 1 July 2025) verified against official pay guide.
    // 2024 rates back-calculated from 2025 ÷ 1.035 (3.5% AWR) as best estimate.
    const ratesByYear = [
      {
        effectiveDate: EFFECTIVE_DATE,
        label: '2024 (3.75% AWR increase — estimated from 2025 official rates)',
        rates: {
          '0_general': 23.46,
          '1_general': 24.11, '1_food_beverage': 24.11, '1_kitchen': 24.11, '1_front_office': 24.11,
          '2_general': 24.98, '2_food_beverage': 24.98, '2_kitchen': 24.98, '2_front_office': 24.98,
          '3_general': 25.80, '3_food_beverage': 25.80, '3_kitchen': 25.80, '3_front_office': 25.80,
          '4_general': 27.17, '4_food_beverage': 27.17, '4_kitchen': 27.17, '4_front_office': 27.17,
          '5_general': 28.87, '5_kitchen': 28.87,
          '6_kitchen': 29.64,
          '7_general': 29.69,
          // Casino (2024 estimated from 2025 ÷ 1.035)
          '1_casino': 24.11, '2_casino': 25.49, '3_casino': 26.31,
          '3_casino_equipment': 26.31, '3_casino_table': 26.31, '3_casino_finance': 26.31,
          '4_casino_equipment': 27.17, '4_casino_finance': 27.17,
          '5_casino_table': 28.44, '5_casino_equipment': 28.87, '5_casino_finance': 28.87,
          '6_casino_table': 29.73, '6_casino_finance': 29.73,
          '7_casino_table': 30.59, '7_casino_finance': 30.59,
        },
      },
      {
        effectiveDate: EFFECTIVE_DATE_2025,
        label: '2025 (3.5% AWR increase — verified at fairwork.gov.au, published 15 Jan 2026)',
        rates: {
          '0_general': 24.28,
          '1_general': 24.95, '1_food_beverage': 24.95, '1_kitchen': 24.95, '1_front_office': 24.95,
          '2_general': 25.85, '2_food_beverage': 25.85, '2_kitchen': 25.85, '2_front_office': 25.85,
          '3_general': 26.70, '3_food_beverage': 26.70, '3_kitchen': 26.70, '3_front_office': 26.70,
          '4_general': 28.12, '4_food_beverage': 28.12, '4_kitchen': 28.12, '4_front_office': 28.12,
          '5_general': 29.88, '5_kitchen': 29.88,
          '6_kitchen': 30.68,
          '7_general': 30.73,
          // Casino (2025 — from pay guide published 15 Jan 2026)
          '1_casino': 24.95, '2_casino': 26.38, '3_casino': 27.23,
          '3_casino_equipment': 27.23, '3_casino_table': 27.23, '3_casino_finance': 27.23,
          '4_casino_equipment': 28.12, '4_casino_finance': 28.12,
          '5_casino_table': 29.44, '5_casino_equipment': 29.88, '5_casino_finance': 29.88,
          '6_casino_table': 30.77, '6_casino_finance': 30.77,
          '7_casino_table': 31.66, '7_casino_finance': 31.66,
        },
      },
    ];

    // Fetch classification IDs
    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const { effectiveDate, rates } of ratesByYear) {
      for (const cls of classResult.rows) {
        const key = `${cls.level}_${cls.stream}`;
        const baseRate = rates[key];
        if (!baseRate) continue;

        const casualRate = parseFloat((baseRate * 1.25).toFixed(4));

        for (const empType of ['full_time', 'part_time']) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, $3, 'base_hourly', $4, $5)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [AWARD_CODE, cls.id, empType, baseRate, effectiveDate]);
        }

        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, casualRate, effectiveDate]);

        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, effectiveDate]);
      }
    }
    console.log('✓ Inserted pay rates (2024 + 2025)');

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000009 clause 29 — Penalty rates

    // Source: Fair Work Ombudsman pay guide for MA000009, effective 1 July 2025 (published 15 Jan 2026).
    // Evening (7pm–midnight) and night (midnight–7am) are FLAT ADDITIONS per hour, not multipliers.
    // All other day-type penalties are multipliers of the base rate.
    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.0,
        addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty',
      },
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0,
        addition_per_hour: 2.81,
        description: 'Weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'full_time',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0,
        addition_per_hour: 4.22,
        description: 'Weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'full_time',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.25,
        addition_per_hour: null,
        description: 'Saturday — 25% penalty rate (×1.25)',
      },
      {
        employment_type: 'full_time',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.5,
        addition_per_hour: null,
        description: 'Sunday — 50% penalty rate (time and a half, ×1.5)',
      },
      {
        employment_type: 'full_time',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 2.25,
        addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Part-time (same penalty structure as full-time) ────────────────────
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.0,
        addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty',
      },
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0,
        addition_per_hour: 2.81,
        description: 'Weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'part_time',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0,
        addition_per_hour: 4.22,
        description: 'Weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'part_time',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.25,
        addition_per_hour: null,
        description: 'Saturday — 25% penalty rate (×1.25)',
      },
      {
        employment_type: 'part_time',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.5,
        addition_per_hour: null,
        description: 'Sunday — 50% penalty rate (time and a half, ×1.5)',
      },
      {
        employment_type: 'part_time',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 2.25,
        addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Casual ────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% casual loading.
      // Evening/night flat additions confirmed from FWO pay guide casual pay tables.
      // Casual Saturday = casual base × 1.2; Sunday = × 1.4; PH = × 2.0
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.0,
        addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% loading)',
      },
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0,
        addition_per_hour: 2.81,
        description: 'Casual weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'casual',
        day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0,
        addition_per_hour: 4.22,
        description: 'Casual weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'casual',
        day_type: 'saturday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.2,
        addition_per_hour: null,
        description: 'Casual Saturday — ×1.2 of casual base rate',
      },
      {
        employment_type: 'casual',
        day_type: 'sunday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 1.4,
        addition_per_hour: null,
        description: 'Casual Sunday — ×1.4 of casual base rate',
      },
      {
        employment_type: 'casual',
        day_type: 'public_holiday',
        time_band_start: null, time_band_end: null,
        time_band_label: null,
        multiplier: 2.0,
        addition_per_hour: null,
        description: 'Casual public holiday — ×2.0 of casual base rate',
      },
    ];

    // Clear existing penalty rates to avoid duplicate/stale rows — no unique constraint on this table
    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, r.time_band_label,
        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ────────────────────────────────────────────────────────
    // MA000009 clause 28
    const overtimeRates = [
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'First 2 hours of overtime in a week — time and a half',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Overtime after 40 hours in a week — double time',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 10, period: 'daily',
        multiplier: 1.5,
        description: 'First 2 hours overtime in a day (over 10 hours) — time and a half',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 12, period: 'daily',
        multiplier: 2.0,
        description: 'Overtime after 12 hours in a day — double time',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time: hours beyond 38 per week — time and a half',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time: beyond 40 hours per week — double time',
      },
    ];

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000009 clause 19 — Allowances
    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: Fair Work Ombudsman pay guide for MA000009, effective 1 July 2025 (published 15 Jan 2026).
    // 2024 amounts back-calculated from 2025 amounts by dividing by 1.035, rounded to 2dp.
    const allowancesByYear = [
      {
        effectiveDate: EFFECTIVE_DATE,
        allowances: [
          // Split/broken shift — FT/PT only, two tiers. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'split_shift_short', name: 'Split shift allowance (2–3 hour break)', description: 'If your shift is split into 2+ separate periods with a break of 2–3 hours between them (not more than 3 hours), you get a split shift allowance. Does not apply to casual employees.', trigger_condition: 'Shift split, gap 2-3hrs, FT/PT only', amount: 3.41, amount_type: 'fixed', per_unit: 'per_day' },
          { allowance_type: 'split_shift_long', name: 'Split shift allowance (more than 3 hour break)', description: 'If your shift is split into 2+ separate periods with a break of more than 3 hours between them, you get a higher split shift allowance. Does not apply to casual employees.', trigger_condition: 'Shift split, gap >3hrs, FT/PT only', amount: 5.16, amount_type: 'fixed', per_unit: 'per_day' },
          // First aid — different rates by employment type. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'first_aid_ft', name: 'First aid allowance (full-time)', description: 'If you hold a first aid certificate and your employer has appointed you as the responsible first aider, you are entitled to a weekly first aid allowance.', trigger_condition: 'Hold certificate AND appointed as first aider — full-time employees', amount: 12.38, amount_type: 'weekly', per_unit: 'per_week' },
          { allowance_type: 'first_aid_ptcasual', name: 'First aid allowance (part-time or casual)', description: 'If you hold a first aid certificate and your employer has appointed you as the responsible first aider, you are entitled to a daily first aid allowance.', trigger_condition: 'Hold certificate AND appointed as first aider — part-time or casual employees', amount: 2.47, amount_type: 'fixed', per_unit: 'per_day' },
          // Tool allowance — cooks/apprentice cooks only. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'tool', name: 'Tool and equipment allowance', description: 'If you are a cook or apprentice cook and your employer requires you to provide and maintain your own knives or other tools, you are entitled to a tool allowance.', trigger_condition: 'Cook or apprentice cook required to supply own tools/knives', amount: 1.96, amount_type: 'fixed', per_unit: 'per_day' },
          // Airport travel. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'airport_travel', name: 'Airport catering travel allowance', description: 'If you work for an airport catering employer, you are entitled to a travel allowance for each day you attend work.', trigger_condition: 'Works for airport catering employer', amount: 8.16, amount_type: 'fixed', per_unit: 'per_day' },
          // Laundry — catering employees. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'laundry_ft', name: 'Laundry allowance (full-time catering)', description: 'Full-time catering employees required to launder their own uniform or special clothing are entitled to a weekly laundry allowance.', trigger_condition: 'FT catering employee required to launder own uniform', amount: 5.80, amount_type: 'weekly', per_unit: 'per_week' },
          { allowance_type: 'laundry_ptcasual', name: 'Laundry allowance (part-time or casual catering)', description: 'Part-time or casual catering employees required to launder their own uniform or special clothing are entitled to a per-garment laundry allowance.', trigger_condition: 'PT or casual catering employee required to launder own uniform', amount: 1.98, amount_type: 'fixed', per_unit: 'per_uniform' },
          // Meal allowance — overtime only, not casual. 2024 = 2025 / 1.035 rounded to 2dp
          { allowance_type: 'meal', name: 'Meal allowance (overtime)', description: 'If you (FT or PT only, not casual) are required to work overtime without being given the required prior notice, and a meal time falls during that overtime, you are entitled to a meal allowance.', trigger_condition: 'Overtime without prior notice, meal period falls in OT, FT/PT only', amount: 16.17, amount_type: 'fixed', per_unit: 'per_meal' },
          // Vehicle — managerial hotel staff only
          { allowance_type: 'vehicle', name: 'Vehicle/travel allowance', description: 'Managerial hotel staff required to use their own vehicle for work purposes are entitled to a per-kilometre allowance.', trigger_condition: 'Managerial hotel staff using own vehicle for work', amount: 0.99, amount_type: 'per_km', per_unit: 'per_km' },
        ],
      },
      {
        effectiveDate: EFFECTIVE_DATE_2025,
        allowances: [
          // Split/broken shift — FT/PT only, two tiers. Source: FWO pay guide MA000009 eff. 1 Jul 2025
          { allowance_type: 'split_shift_short', name: 'Split shift allowance (2–3 hour break)', description: 'If your shift is split into 2+ separate periods with a break of 2–3 hours between them (not more than 3 hours), you get a split shift allowance. Does not apply to casual employees.', trigger_condition: 'Shift split, gap 2-3hrs, FT/PT only', amount: 3.53, amount_type: 'fixed', per_unit: 'per_day' },
          { allowance_type: 'split_shift_long', name: 'Split shift allowance (more than 3 hour break)', description: 'If your shift is split into 2+ separate periods with a break of more than 3 hours between them, you get a higher split shift allowance. Does not apply to casual employees.', trigger_condition: 'Shift split, gap >3hrs, FT/PT only', amount: 5.34, amount_type: 'fixed', per_unit: 'per_day' },
          // First aid — different rates by employment type
          { allowance_type: 'first_aid_ft', name: 'First aid allowance (full-time)', description: 'If you hold a first aid certificate and your employer has appointed you as the responsible first aider, you are entitled to a weekly first aid allowance.', trigger_condition: 'Hold certificate AND appointed as first aider — full-time employees', amount: 12.82, amount_type: 'weekly', per_unit: 'per_week' },
          { allowance_type: 'first_aid_ptcasual', name: 'First aid allowance (part-time or casual)', description: 'If you hold a first aid certificate and your employer has appointed you as the responsible first aider, you are entitled to a daily first aid allowance.', trigger_condition: 'Hold certificate AND appointed as first aider — part-time or casual employees', amount: 2.56, amount_type: 'fixed', per_unit: 'per_day' },
          // Tool allowance — cooks/apprentice cooks only
          { allowance_type: 'tool', name: 'Tool and equipment allowance', description: 'If you are a cook or apprentice cook and your employer requires you to provide and maintain your own knives or other tools, you are entitled to a tool allowance.', trigger_condition: 'Cook or apprentice cook required to supply own tools/knives', amount: 2.03, amount_type: 'fixed', per_unit: 'per_day' },
          // Airport travel
          { allowance_type: 'airport_travel', name: 'Airport catering travel allowance', description: 'If you work for an airport catering employer, you are entitled to a travel allowance for each day you attend work.', trigger_condition: 'Works for airport catering employer', amount: 8.45, amount_type: 'fixed', per_unit: 'per_day' },
          // Laundry — catering employees
          { allowance_type: 'laundry_ft', name: 'Laundry allowance (full-time catering)', description: 'Full-time catering employees required to launder their own uniform or special clothing are entitled to a weekly laundry allowance.', trigger_condition: 'FT catering employee required to launder own uniform', amount: 6.00, amount_type: 'weekly', per_unit: 'per_week' },
          { allowance_type: 'laundry_ptcasual', name: 'Laundry allowance (part-time or casual catering)', description: 'Part-time or casual catering employees required to launder their own uniform or special clothing are entitled to a per-garment laundry allowance.', trigger_condition: 'PT or casual catering employee required to launder own uniform', amount: 2.05, amount_type: 'fixed', per_unit: 'per_uniform' },
          // Meal allowance — overtime only, not casual
          { allowance_type: 'meal', name: 'Meal allowance (overtime)', description: 'If you (FT or PT only, not casual) are required to work overtime without being given the required prior notice, and a meal time falls during that overtime, you are entitled to a meal allowance.', trigger_condition: 'Overtime without prior notice, meal period falls in OT, FT/PT only', amount: 16.73, amount_type: 'fixed', per_unit: 'per_meal' },
          // Vehicle — managerial hotel staff only
          { allowance_type: 'vehicle', name: 'Vehicle/travel allowance', description: 'Managerial hotel staff required to use their own vehicle for work purposes are entitled to a per-kilometre allowance.', trigger_condition: 'Managerial hotel staff using own vehicle for work', amount: 0.99, amount_type: 'per_km', per_unit: 'per_km' },
        ],
      },
    ];

    // Clear existing allowances to remove old/renamed types (split_shift, uniform_laundry, first_aid, live_in)
    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const { effectiveDate, allowances: yearAllowances } of allowancesByYear) {
      for (const a of yearAllowances) {
        await client.query(`
          INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, effective_date)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
            name = EXCLUDED.name, description = EXCLUDED.description, amount = EXCLUDED.amount
        `, [AWARD_CODE, a.allowance_type, a.name, a.description, a.trigger_condition, a.amount, a.amount_type, a.per_unit, effectiveDate]);
      }
    }
    console.log('✓ Inserted allowances (2024 + 2025)');

    // ── Break entitlements ────────────────────────────────────────────────────
    // MA000009 clause 20 — Meal breaks / clause 21 — Rest breaks
    const breaks = [
      // Rest breaks (paid)
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Roughly in the middle of each 4-hour work period',
        description: 'For every 4 hours you work (or part thereof), you are entitled to a 10-minute paid rest break. These cannot be skipped or "saved up".',
      },
      // Meal breaks (unpaid)
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours straight, you must get an unpaid meal break of at least 30 minutes. It must start no later than 5 hours after you begin your shift.',
      },
    ];

    for (const b of breaks) {
      await client.query(`
        INSERT INTO break_entitlements
          (award_code, employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid, timing_rule, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        AWARD_CODE, b.employment_type, b.shift_hours_min, b.shift_hours_max,
        b.break_type, b.break_duration_min, b.is_paid, b.timing_rule, b.description
      ]);
    }
    console.log(`✓ Inserted ${breaks.length} break entitlement rules`);

    // ── Classification questions ───────────────────────────────────────────────
    const questions = [
      {
        question_key: 'stream',
        question_text: 'Which best describes your main area of work?',
        help_text: 'Pick the one that matches where you spend most of your time.',
        question_type: 'single',
        stream: null,
        sort_order: 1,
        answers: [
          { answer_key: 'food_beverage', answer_text: 'Serving food or drinks to customers (waiter, bartender, café staff)', sort_order: 1 },
          { answer_key: 'kitchen', answer_text: 'Working in the kitchen (cooking, food prep, kitchen hand)', sort_order: 2 },
          { answer_key: 'front_office', answer_text: 'Reception, front desk or guest services (hotel check-in, reservations)', sort_order: 3 },
          { answer_key: 'general', answer_text: 'General venue work, cleaning, or something not listed above', sort_order: 4 },
        ],
      },
      {
        question_key: 'takes_orders',
        question_text: 'Do you take food or drink orders from customers yourself?',
        help_text: null,
        question_type: 'single',
        stream: 'food_beverage',
        sort_order: 10,
        answers: [
          { answer_key: 'yes', answer_text: 'Yes, I take orders from customers directly', sort_order: 1 },
          { answer_key: 'no', answer_text: 'No, I just deliver food or drinks that someone else has ordered', sort_order: 2 },
        ],
      },
      {
        question_key: 'handles_payments',
        question_text: 'Do you handle cash or process payments from customers?',
        help_text: null,
        question_type: 'single',
        stream: 'food_beverage',
        sort_order: 11,
        answers: [
          { answer_key: 'yes', answer_text: 'Yes', sort_order: 1 },
          { answer_key: 'no', answer_text: 'No', sort_order: 2 },
        ],
      },
      {
        question_key: 'beverage_specialist',
        question_text: 'Are you a specialist in wine, cocktails, or other drinks?',
        help_text: 'For example, do you recommend wines to guests, mix complex cocktails, or manage the bar independently?',
        question_type: 'single',
        stream: 'food_beverage',
        sort_order: 12,
        answers: [
          { answer_key: 'yes_wine', answer_text: 'Yes — I specialise in wine and food matching (sommelier-type role)', sort_order: 1 },
          { answer_key: 'yes_cocktails', answer_text: 'Yes — I create and serve cocktails or manage a full bar independently', sort_order: 2 },
          { answer_key: 'no', answer_text: 'No — I serve drinks but I\'m not a specialist', sort_order: 3 },
        ],
      },
      {
        question_key: 'supervises_fb_staff',
        question_text: 'Do you supervise or manage other food and beverage staff?',
        help_text: 'For example, do you direct others during a shift, do rosters, or manage the team?',
        question_type: 'single',
        stream: 'food_beverage',
        sort_order: 13,
        answers: [
          { answer_key: 'manages_operations', answer_text: 'Yes — I manage the whole food and beverage operation (budgets, ordering, rosters)', sort_order: 1 },
          { answer_key: 'supervises_shift', answer_text: 'Yes — I supervise staff during a shift but someone else manages the overall operation', sort_order: 2 },
          { answer_key: 'no', answer_text: 'No — I don\'t supervise anyone', sort_order: 3 },
        ],
      },
      // Kitchen questions
      {
        question_key: 'kitchen_role_type',
        question_text: 'What best describes your kitchen role?',
        help_text: null,
        question_type: 'single',
        stream: 'kitchen',
        sort_order: 20,
        answers: [
          { answer_key: 'kitchenhand', answer_text: 'I mainly wash dishes, clean, or do basic prep under supervision', sort_order: 1 },
          { answer_key: 'cook_basic', answer_text: 'I cook food using recipes with some supervision', sort_order: 2 },
          { answer_key: 'cook_section', answer_text: 'I run my own section of the kitchen (e.g., grill, sauté, pastry) independently', sort_order: 3 },
          { answer_key: 'sous_chef', answer_text: 'I\'m second in charge of the kitchen — I run it when the head chef isn\'t there', sort_order: 4 },
          { answer_key: 'head_chef', answer_text: 'I\'m the head chef — I\'m responsible for everything in the kitchen', sort_order: 5 },
        ],
      },
      {
        question_key: 'kitchen_supervises',
        question_text: 'Do you supervise or train other kitchen staff?',
        help_text: null,
        question_type: 'single',
        stream: 'kitchen',
        sort_order: 21,
        answers: [
          { answer_key: 'yes', answer_text: 'Yes', sort_order: 1 },
          { answer_key: 'no', answer_text: 'No', sort_order: 2 },
        ],
      },
      {
        question_key: 'kitchen_menu',
        question_text: 'Do you contribute to creating or changing the menu?',
        help_text: null,
        question_type: 'single',
        stream: 'kitchen',
        sort_order: 22,
        answers: [
          { answer_key: 'fully_responsible', answer_text: 'Yes — I\'m fully responsible for the menu', sort_order: 1 },
          { answer_key: 'contributes', answer_text: 'Yes — I contribute ideas but the head chef decides', sort_order: 2 },
          { answer_key: 'no', answer_text: 'No — I cook what\'s on the menu but don\'t change it', sort_order: 3 },
        ],
      },
      // Front office questions
      {
        question_key: 'fo_checks_in_guests',
        question_text: 'Do you check guests in and out of the hotel?',
        help_text: null,
        question_type: 'single',
        stream: 'front_office',
        sort_order: 30,
        answers: [
          { answer_key: 'yes', answer_text: 'Yes', sort_order: 1 },
          { answer_key: 'no', answer_text: 'No', sort_order: 2 },
        ],
      },
      {
        question_key: 'fo_supervises',
        question_text: 'Do you supervise or manage other front office staff?',
        help_text: null,
        question_type: 'single',
        stream: 'front_office',
        sort_order: 31,
        answers: [
          { answer_key: 'manages', answer_text: 'Yes — I manage the front office department (rosters, budgets, revenue)', sort_order: 1 },
          { answer_key: 'supervises', answer_text: 'Yes — I supervise staff on shift but don\'t manage the whole department', sort_order: 2 },
          { answer_key: 'no', answer_text: 'No', sort_order: 3 },
        ],
      },
      // General questions
      {
        question_key: 'general_level',
        question_text: 'Which best describes your general role?',
        help_text: null,
        question_type: 'single',
        stream: 'general',
        sort_order: 40,
        answers: [
          { answer_key: 'basic_tasks', answer_text: 'I do basic tasks and need to be told what to do each time', sort_order: 1 },
          { answer_key: 'independent', answer_text: 'I work independently and know what I need to do without being supervised constantly', sort_order: 2 },
          { answer_key: 'supervises', answer_text: 'I supervise or coordinate other staff', sort_order: 3 },
          { answer_key: 'manages', answer_text: 'I manage a team and have significant responsibility for the operation', sort_order: 4 },
        ],
      },
      {
        question_key: 'experience',
        question_text: 'How long have you been working in hospitality?',
        help_text: 'This helps us understand your likely experience level.',
        question_type: 'single',
        stream: null,
        sort_order: 5,
        answers: [
          { answer_key: 'new', answer_text: 'Less than 3 months', sort_order: 1 },
          { answer_key: 'some', answer_text: '3 months to 1 year', sort_order: 2 },
          { answer_key: 'experienced', answer_text: '1 to 3 years', sort_order: 3 },
          { answer_key: 'senior', answer_text: 'More than 3 years', sort_order: 4 },
        ],
      },
    ];

    for (const q of questions) {
      const qResult = await client.query(`
        INSERT INTO classification_questions (award_code, question_key, question_text, help_text, question_type, stream, sort_order)
        VALUES ('MA000009', $1, $2, $3, $4, $5, $6)
        ON CONFLICT (question_key) DO UPDATE SET
          award_code = 'MA000009',
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `, [q.question_key, q.question_text, q.help_text, q.question_type, q.stream, q.sort_order]);

      const questionId = qResult.rows[0].id;

      // Delete old answers and re-insert
      await client.query('DELETE FROM classification_answers WHERE question_id = $1', [questionId]);
      for (const a of q.answers) {
        await client.query(`
          INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
          VALUES ($1, $2, $3, $4)
        `, [questionId, a.answer_key, a.answer_text, a.sort_order]);
      }
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    // ── Content blocks ─────────────────────────────────────────────────────────
    const contentBlocks = [
      {
        block_key: 'disclaimer',
        title: 'Important notice',
        body: `This tool gives you general information about your rights under the Hospitality Industry (General) Award 2020. It is **not legal advice**. Everyone's situation is different, and employment law can be complex.

If you think you have been underpaid or your rights have been breached, you should contact the **Fair Work Ombudsman** (1300 724 690) or get advice from an employment lawyer or union representative.

Pay rates in this tool are current as at 1 July 2024. Rates are updated each year in July following the Annual Wage Review — always check [fairwork.gov.au](https://www.fairwork.gov.au) for the most current rates.`,
        content_type: 'markdown',
      },
      {
        block_key: 'employment_type_full_time',
        title: 'Full-time employment',
        body: `A full-time employee works an average of **38 hours per week** (or up to 38 hours as their ordinary hours).

Full-time employees get:
- Paid annual leave (4 weeks per year)
- Paid personal/carer's leave (10 days per year)
- Paid public holidays
- Access to unfair dismissal protections after 6 months

If you have set hours each week and are not called a casual, you are probably full-time.`,
        content_type: 'markdown',
      },
      {
        block_key: 'employment_type_part_time',
        title: 'Part-time employment',
        body: `A part-time employee works regular, predictable hours that are **less than 38 hours per week**.

Part-time employees get the same entitlements as full-time employees, just on a pro-rata basis (proportional to their hours). So if you work half the hours of a full-timer, you get half the leave.

Key point: **your hours should be agreed in writing** with your employer. If your employer regularly asks you to work more than your agreed hours, those extra hours may need to be paid at overtime rates.`,
        content_type: 'markdown',
      },
      {
        block_key: 'employment_type_casual',
        title: 'Casual employment',
        body: `A casual employee has no guaranteed hours — each shift is a separate engagement with no ongoing commitment from either side.

Because of this uncertainty, casuals are paid a **25% casual loading** on top of the base rate. This is meant to compensate for not getting paid leave, sick leave, or notice of termination.

Important: the casual loading **does not replace** other entitlements like penalty rates and overtime. You still get those on top.

If you work regular, predictable hours over a long period, you may have the right to request conversion to permanent employment. Talk to Fair Work or a union about this.`,
        content_type: 'markdown',
      },
      {
        block_key: 'ifa_warning',
        title: 'Individual Flexibility Arrangements (IFAs)',
        body: `Your employer may have made a deal with you called an **Individual Flexibility Arrangement** (IFA) that changes some of your award conditions.

**An IFA is only valid if:**
- It is in writing and signed by both you and your employer
- It was genuinely agreed to — you cannot be forced into one
- It leaves you **better off overall** compared to the award (not just in some areas — overall)
- It specifies which award conditions it changes
- It is given to you within 14 days of signing
- It includes a dispute resolution process

**You can end an IFA** by giving your employer 13 weeks' written notice — you do not need a reason.

If any of these conditions are not met, the IFA may not be valid, and you may be entitled to the full award conditions.`,
        content_type: 'markdown',
      },
      {
        block_key: 'annualised_salary_warning',
        title: 'Annualised salary arrangements',
        body: `Some employers pay a single annual salary instead of calculating hourly rates, penalties and overtime separately. This is called an **annualised salary arrangement**.

Under the award, if your employer uses an annualised salary, they must:
- Put the arrangement in writing, specifying which award entitlements it covers
- Calculate in advance the number of overtime hours and penalty rate hours included
- Pay you at least what you would have earned under the award
- **Conduct a reconciliation at least every 12 months** (or at the end of the arrangement) comparing what you were paid against what you would have been owed under the award — and pay the difference if you were underpaid

If your employer uses an annualised salary but has not done this reconciliation, or if the salary is less than your award entitlements, you may be owed money.`,
        content_type: 'markdown',
      },
      {
        block_key: 'minimum_engagement_casual',
        title: 'Minimum shift length — casual employees',
        body: `If you are casual, your employer must pay you for a minimum of **2 hours per shift**, even if your shift ends earlier.

So if you are called in for a shift and sent home after 45 minutes, you must still be paid for 2 full hours at your casual rate including any applicable penalty rates.`,
        content_type: 'markdown',
      },
      {
        block_key: 'minimum_engagement_part_time',
        title: 'Minimum shift length — part-time employees',
        body: `If you are part-time, your employer must pay you for a minimum of **3 hours per shift** (or as specified in your written agreement, which must be at least 3 hours).`,
        content_type: 'markdown',
      },
      {
        block_key: 'roster_change_notice',
        title: 'Changing your roster',
        body: `Under the award, your employer must give you **reasonable notice** before changing your roster or requiring you to work different hours. What's "reasonable" depends on the circumstances, but the award requires:

- For casual employees: as much notice as is reasonable in the circumstances
- For part-time and full-time employees: your regular pattern of hours should not be changed without genuine consultation

Your employer cannot simply cancel a shift at the last minute without consequences. If a shift is cancelled with no or very short notice, seek advice about whether you may be entitled to compensation for the cancelled shift.`,
        content_type: 'markdown',
      },
      {
        block_key: 'fair_work_contacts',
        title: 'Where to get help',
        body: `**Fair Work Ombudsman**
- Website: [fairwork.gov.au](https://www.fairwork.gov.au)
- Phone: 13 13 94 (Monday to Friday, 8am–5:30pm)
- Anonymous report: [fairwork.gov.au/workplace-problems/fixing-a-workplace-problem/anonymous-report](https://www.fairwork.gov.au/workplace-problems/fixing-a-workplace-problem/anonymous-report)

**Unite Union (hospitality workers)**
- Website: [uniteunion.org.au](https://www.uniteunion.org.au)

**United Workers Union**
- Website: [unitedworkers.org.au](https://www.unitedworkers.org.au)

You can also contact a community legal centre for free employment law advice.`,
        content_type: 'markdown',
      },
    ];

    for (const block of contentBlocks) {
      await client.query(`
        INSERT INTO content_blocks (block_key, title, body, content_type)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (block_key) DO UPDATE SET
          title = EXCLUDED.title,
          body = EXCLUDED.body,
          updated_at = NOW()
      `, [block.block_key, block.title, block.body, block.content_type]);
    }
    console.log(`✓ Inserted ${contentBlocks.length} content blocks`);

    await client.query('COMMIT');
    console.log('\n✓ Seed complete — Hospitality Award 2020 data loaded');
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
