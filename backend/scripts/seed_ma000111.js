/**
 * Seed script — Fire Fighting Industry Award 2020 [MA000111]
 * Pay rates effective 6 February 2026
 * Source: Fair Work Ombudsman pay guide MA000111 (published 06 February 2026)
 *
 * Two streams: public_sector and private_sector
 *
 * Public sector — Full-time (rates include shift loading + average 40 hrs loading):
 *   Recruit: $25.25/hr ($959.50/wk)
 *   FF Level 1: $36.28/hr ($1,378.65/wk)
 *   FF Level 2: $36.77/hr ($1,397.33/wk)
 *   FF Level 3: $37.37/hr ($1,419.89/wk)
 *   Qualified FF: $40.40/hr ($1,535.12/wk)
 *   Leading FF: $46.22/hr ($1,756.40/wk)
 *   Station Officer: $50.11/hr ($1,904.10/wk)
 *   Senior Station Officer: $53.98/hr ($2,051.24/wk)
 *   Fire Service Comms Controller: $53.98/hr ($2,051.24/wk)
 *
 * Public sector — Part-time (hourly, same as FT hourly):
 *   Qualified FF: $40.40, Leading FF: $46.22, Station Officer: $50.11,
 *   Senior Station Officer: $53.98, Fire Service Comms Controller: $53.98
 *
 * Private sector — Full-time & Part-time:
 *   Recruit: $25.25/hr ($959.50/wk)
 *   FF Level 1: $25.25/hr ($959.50/wk)
 *   FF Level 2: $25.59/hr ($972.50/wk)
 *   FF Level 3: $26.01/hr ($988.20/wk)
 *   Qualified FF: $28.12/hr ($1,068.40/wk)
 *   Leading FF: $32.17/hr ($1,222.40/wk)
 *   Station Officer: $34.87/hr ($1,325.20/wk)
 *   Senior Station Officer: $37.57/hr ($1,427.60/wk)
 *
 * Private sector penalties: Saturday ×1.50, Sunday ×2.00, Public Holiday ×2.50
 *
 * Casual rates = hourly rate × 1.25
 *
 * Key allowances:
 *   First aid: $20.83/week
 *   Heavy rescue appliance: $25.64/week
 *   Meal: $19.93/meal
 *   Qualification (IFE Grad Cert): $18.16/week
 *   Qualification (IFE + Cert Fire Tech): $26.71/week
 *   Qualification (IFE + Membership): $33.12/week
 *   Relieving: $33.98/shift
 *   Special admin duties: $77.99/week
 *   Vehicle (motor vehicle): $0.99/km
 *   Vehicle (motorcycle): $0.33/km
 *
 * Run after migrate.js: node scripts/seed_ma000111.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000111';
const EFFECTIVE_DATE = '2026-02-06';

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
      'Fire Fighting Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000111-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Public sector: 9 classifications (Recruit through Fire Service Comms Controller)
    // Private sector: 8 classifications (Recruit through Senior Station Officer)
    const classifications = [
      // ── Public sector stream ─────────────────────────────────────────────────
      {
        level: 1, stream: 'public_sector',
        title: 'Recruit',
        description: 'Entry-level firefighter trainee in the public sector. You are undergoing initial training and induction, learning fundamental firefighting skills under close supervision.',
        duties: [
          'Participating in recruit training courses and drills',
          'Learning to operate firefighting equipment under supervision',
          'Assisting qualified firefighters at emergency scenes as directed',
          'Maintaining personal protective equipment and station cleanliness',
          'Studying fire behaviour, hazardous materials awareness, and rescue techniques',
        ],
        indicative_tasks: ['Recruit firefighter', 'Trainee firefighter'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'public_sector',
        title: 'Firefighter Level 1',
        description: 'Firefighter who has completed recruit training in the public sector. You perform operational firefighting duties under general supervision, responding to emergency calls and maintaining station readiness.',
        duties: [
          'Responding to fire and emergency calls as a crew member',
          'Operating pumps, hoses, ladders, and other firefighting apparatus',
          'Performing search and rescue operations in structural fires',
          'Conducting fire safety inspections and community education activities',
          'Maintaining and testing firefighting equipment and vehicles',
          'Participating in ongoing training and skills development',
        ],
        indicative_tasks: ['Firefighter', 'Operational firefighter'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'public_sector',
        title: 'Firefighter Level 2',
        description: 'Experienced firefighter in the public sector who has progressed beyond Level 1. You demonstrate increased competency in firefighting operations and may assist with mentoring junior members.',
        duties: [
          'Performing all Level 1 firefighting duties with greater independence',
          'Assisting in the training and mentoring of recruits and Level 1 firefighters',
          'Operating specialised firefighting and rescue equipment',
          'Conducting pre-incident planning and fire safety assessments',
          'Contributing to community fire safety programs and public education',
          'Maintaining detailed records and reports of incidents attended',
        ],
        indicative_tasks: ['Senior firefighter', 'Experienced operational firefighter'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'public_sector',
        title: 'Firefighter Level 3',
        description: 'Advanced firefighter in the public sector with significant operational experience. You may hold specialist qualifications and take on additional responsibilities within the crew.',
        duties: [
          'Performing advanced firefighting, rescue, and hazmat operations',
          'Operating as a specialist in areas such as technical rescue or hazmat response',
          'Providing on-scene guidance to less experienced crew members',
          'Assisting officers with incident management and crew coordination',
          'Conducting detailed post-incident analysis and reporting',
          'Delivering training sessions to junior firefighters',
        ],
        indicative_tasks: ['Advanced firefighter', 'Specialist firefighter'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'public_sector',
        title: 'Qualified Firefighter',
        description: 'Fully qualified firefighter in the public sector who has completed all required competencies. You work with a high degree of autonomy and may supervise small teams during operations.',
        duties: [
          'Performing all operational firefighting duties autonomously',
          'Supervising small teams during emergency response activities',
          'Leading community fire safety and prevention programs',
          'Mentoring and assessing firefighters progressing through lower levels',
          'Participating in multi-agency emergency responses',
          'Maintaining specialist qualifications and certifications',
        ],
        indicative_tasks: ['Qualified firefighter', 'Senior operational firefighter'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'public_sector',
        title: 'Leading Firefighter',
        description: 'Senior firefighter in the public sector who leads a crew or team. You hold a supervisory role on the fireground and are responsible for crew safety and task coordination.',
        duties: [
          'Leading a firefighting crew during emergency operations',
          'Ensuring crew safety and welfare during incidents',
          'Coordinating task assignments and resource deployment at incidents',
          'Conducting crew performance assessments and providing feedback',
          'Acting as officer-in-charge of a station in the absence of a Station Officer',
          'Overseeing equipment maintenance programs and readiness checks',
        ],
        indicative_tasks: ['Leading firefighter', 'Crew leader'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'public_sector',
        title: 'Station Officer',
        description: 'Officer in charge of a fire station in the public sector. You manage station operations, supervise all personnel, and command incidents of moderate complexity.',
        duties: [
          'Commanding firefighting and rescue operations at incident scenes',
          'Managing day-to-day operations of a fire station',
          'Supervising and developing all station personnel',
          'Ensuring compliance with operational procedures and safety standards',
          'Preparing and delivering station-level training programs',
          'Liaising with other emergency services and community stakeholders',
        ],
        indicative_tasks: ['Station officer', 'Watch commander'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'public_sector',
        title: 'Senior Station Officer',
        description: 'Senior officer in the public sector with responsibility for multiple stations or specialised operational areas. You command complex incidents and provide leadership across a district or zone.',
        duties: [
          'Commanding complex, multi-crew emergency operations',
          'Overseeing operations across multiple fire stations in a district',
          'Developing and implementing operational policies and procedures',
          'Managing personnel performance, development, and welfare programs',
          'Coordinating with senior management on strategic planning',
          'Representing the service at inter-agency planning and coordination meetings',
        ],
        indicative_tasks: ['Senior station officer', 'District officer'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'public_sector',
        title: 'Fire Service Communications Controller',
        description: 'Communications specialist in the public sector responsible for managing fire service communications centres. You coordinate emergency dispatch and maintain communication systems.',
        duties: [
          'Managing fire service communications and dispatch operations',
          'Coordinating deployment of resources to emergency incidents',
          'Operating and maintaining complex communications systems and equipment',
          'Supervising communications centre personnel',
          'Ensuring accurate logging and recording of all incident communications',
          'Liaising with other emergency services communication centres',
        ],
        indicative_tasks: ['Fire service communications controller', 'Dispatch centre manager'],
        sort_order: 90,
      },
      // ── Private sector stream ────────────────────────────────────────────────
      {
        level: 1, stream: 'private_sector',
        title: 'Recruit - private sector',
        description: 'Entry-level firefighter trainee in the private sector. You are undergoing initial training and induction into private sector firefighting operations.',
        duties: [
          'Participating in recruit training courses and induction programs',
          'Learning to operate firefighting equipment under close supervision',
          'Assisting qualified firefighters during emergency responses',
          'Maintaining personal protective equipment and station facilities',
          'Studying fire behaviour, safety procedures, and emergency protocols',
        ],
        indicative_tasks: ['Private sector recruit', 'Trainee firefighter (private)'],
        sort_order: 100,
      },
      {
        level: 2, stream: 'private_sector',
        title: 'Firefighter Level 1',
        description: 'Firefighter who has completed recruit training in the private sector. You perform operational firefighting duties at industrial sites, airports, or other private facilities.',
        duties: [
          'Responding to fire and emergency incidents at the assigned facility',
          'Operating firefighting pumps, hoses, and specialised suppression systems',
          'Performing first response and basic rescue operations',
          'Conducting routine fire safety patrols and inspections',
          'Maintaining firefighting equipment, vehicles, and suppression systems',
          'Participating in regular training exercises and drills',
        ],
        indicative_tasks: ['Private sector firefighter', 'Industrial firefighter', 'Airport firefighter'],
        sort_order: 110,
      },
      {
        level: 3, stream: 'private_sector',
        title: 'Firefighter Level 2',
        description: 'Experienced firefighter in the private sector with demonstrated competency beyond Level 1. You take on additional operational responsibilities and may assist with training.',
        duties: [
          'Performing all Level 1 duties with increased independence and skill',
          'Operating specialised firefighting and hazmat response equipment',
          'Assisting in training and mentoring of recruits and Level 1 firefighters',
          'Conducting fire risk assessments and pre-incident planning',
          'Maintaining records and preparing incident reports',
          'Participating in emergency planning and response exercises',
        ],
        indicative_tasks: ['Experienced private sector firefighter', 'Senior industrial firefighter'],
        sort_order: 120,
      },
      {
        level: 4, stream: 'private_sector',
        title: 'Firefighter Level 3',
        description: 'Advanced firefighter in the private sector with significant experience and specialist skills. You may lead teams during emergency operations.',
        duties: [
          'Performing advanced firefighting, rescue, and hazmat operations',
          'Leading small teams during emergency response activities',
          'Operating as a specialist in technical rescue or hazmat',
          'Conducting detailed fire investigations and incident analysis',
          'Delivering training programs to junior firefighting staff',
          'Assisting with the development of emergency response plans',
        ],
        indicative_tasks: ['Advanced private sector firefighter', 'Specialist industrial firefighter'],
        sort_order: 130,
      },
      {
        level: 5, stream: 'private_sector',
        title: 'Qualified Firefighter',
        description: 'Fully qualified firefighter in the private sector who has completed all required competencies and works autonomously across all operational areas.',
        duties: [
          'Performing all operational firefighting duties with full autonomy',
          'Supervising crews during emergency operations',
          'Leading fire safety and prevention programs at the facility',
          'Mentoring and assessing firefighters at lower classification levels',
          'Coordinating with external emergency services during major incidents',
          'Maintaining specialist certifications and operational readiness',
        ],
        indicative_tasks: ['Qualified private sector firefighter', 'Senior qualified firefighter'],
        sort_order: 140,
      },
      {
        level: 6, stream: 'private_sector',
        title: 'Leading Firefighter',
        description: 'Senior firefighter in the private sector who leads a crew or team. You hold a supervisory role and are responsible for crew coordination and safety.',
        duties: [
          'Leading a firefighting crew during emergency operations at the facility',
          'Ensuring crew safety, welfare, and task coordination',
          'Conducting crew performance reviews and providing development guidance',
          'Overseeing equipment maintenance and operational readiness programs',
          'Acting as officer-in-charge in the absence of a Station Officer',
          'Coordinating with facility management on fire safety compliance',
        ],
        indicative_tasks: ['Leading firefighter (private)', 'Crew leader (private sector)'],
        sort_order: 150,
      },
      {
        level: 7, stream: 'private_sector',
        title: 'Station Officer',
        description: 'Officer in charge of firefighting operations at a private sector facility. You manage all station operations, supervise personnel, and command incidents.',
        duties: [
          'Commanding firefighting and rescue operations at incident scenes',
          'Managing day-to-day operations of the fire station or facility fire service',
          'Supervising and developing all firefighting personnel',
          'Ensuring compliance with regulatory and operational safety standards',
          'Preparing and delivering training programs',
          'Liaising with external emergency services and facility management',
        ],
        indicative_tasks: ['Station officer (private)', 'Fire service manager'],
        sort_order: 160,
      },
      {
        level: 8, stream: 'private_sector',
        title: 'Senior Station Officer',
        description: 'Senior officer in the private sector with responsibility for overall fire service management at a facility or across multiple sites.',
        duties: [
          'Commanding complex emergency operations across the facility',
          'Overseeing fire service operations across multiple sites or areas',
          'Developing and implementing operational policies and emergency plans',
          'Managing personnel performance, training, and welfare programs',
          'Coordinating with senior facility management on safety strategy',
          'Representing the fire service at regulatory and inter-agency meetings',
        ],
        indicative_tasks: ['Senior station officer (private)', 'Chief fire officer (private sector)'],
        sort_order: 170,
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
    // Public sector FT rates (include shift loading + average 40hr loading)
    // Public sector PT rates only for Qualified FF and above
    // Private sector FT/PT rates are standard hourly
    const baseRates = {
      // Public sector hourly rates
      '1_public_sector': 25.25,   // Recruit
      '2_public_sector': 36.28,   // Firefighter Level 1
      '3_public_sector': 36.77,   // Firefighter Level 2
      '4_public_sector': 37.37,   // Firefighter Level 3
      '5_public_sector': 40.40,   // Qualified Firefighter
      '6_public_sector': 46.22,   // Leading Firefighter
      '7_public_sector': 50.11,   // Station Officer
      '8_public_sector': 53.98,   // Senior Station Officer
      '9_public_sector': 53.98,   // Fire Service Communications Controller
      // Private sector hourly rates
      '1_private_sector': 25.25,  // Recruit - private sector
      '2_private_sector': 25.25,  // Firefighter Level 1
      '3_private_sector': 25.59,  // Firefighter Level 2
      '4_private_sector': 26.01,  // Firefighter Level 3
      '5_private_sector': 28.12,  // Qualified Firefighter
      '6_private_sector': 32.17,  // Leading Firefighter
      '7_private_sector': 34.87,  // Station Officer
      '8_private_sector': 37.57,  // Senior Station Officer
    };

    // Public sector PT is only available for Qualified FF and above
    const publicSectorPTLevels = new Set([5, 6, 7, 8, 9]);

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[`${cls.level}_${cls.stream}`];
      if (!baseRate) continue;

      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;

      if (cls.stream === 'public_sector') {
        // Public sector full-time — all levels
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'full_time', 'base_hourly', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, baseRate, EFFECTIVE_DATE]);

        // Public sector part-time — only Qualified FF and above
        if (publicSectorPTLevels.has(cls.level)) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, 'part_time', 'base_hourly', $3, $4)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [AWARD_CODE, cls.id, baseRate, EFFECTIVE_DATE]);
        }
      } else {
        // Private sector — full-time and part-time at same rate
        for (const empType of ['full_time', 'part_time']) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, $3, 'base_hourly', $4, $5)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);
        }
      }

      // Casual rate for all classifications in both streams
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
    // Private sector: Saturday ×1.50, Sunday ×2.00, Public Holiday ×2.50
    // These multipliers apply to the base hourly rate for FT/PT and casual base for casual
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — Full-time ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — Full-time ×2.0',
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — Part-time ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — Part-time ×2.0',
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
        description: 'Ordinary weekday — ×1 (casual base)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — Casual ×1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — Casual ×2.0',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Casual ×2.5',
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
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'Paid to an employee who holds a current first aid certificate and is appointed as a first aid officer.',
        trigger_condition: 'Employee holds a current first aid certificate and is appointed as first aid officer',
        amount: 20.83, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'heavy_rescue',
        name: 'Heavy rescue appliance allowance',
        description: 'Paid to employees assigned to operate or crew a heavy rescue appliance.',
        trigger_condition: 'Employee is assigned to a heavy rescue appliance',
        amount: 25.64, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'Paid when an employee is required to work overtime and a meal break falls during the overtime period.',
        trigger_condition: 'Employee works overtime through a meal break',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'qualification_ife_grad',
        name: 'Qualification allowance — IFE Graduate Certificate',
        description: 'Paid to an employee who holds an Institution of Fire Engineers (IFE) Graduate Certificate.',
        trigger_condition: 'Employee holds an IFE Graduate Certificate',
        amount: 18.16, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'qualification_ife_cert',
        name: 'Qualification allowance — IFE + Certificate in Fire Technology',
        description: 'Paid to an employee who holds both an IFE qualification and a Certificate in Fire Technology.',
        trigger_condition: 'Employee holds both IFE qualification and Certificate in Fire Technology',
        amount: 26.71, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'qualification_ife_member',
        name: 'Qualification allowance — IFE + Membership',
        description: 'Paid to an employee who holds an IFE qualification and maintains IFE membership.',
        trigger_condition: 'Employee holds IFE qualification and maintains IFE membership',
        amount: 33.12, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'relieving',
        name: 'Relieving allowance',
        description: 'Paid when an employee is required to relieve in a higher classification or at another station.',
        trigger_condition: 'Employee relieves in a higher classification or at another station',
        amount: 33.98, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'special_admin',
        name: 'Special administrative duties allowance',
        description: 'Paid to an employee who is required to perform special administrative duties in addition to normal duties.',
        trigger_condition: 'Employee performs special administrative duties',
        amount: 77.99, amount_type: 'fixed', per_unit: 'per_week',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance — motor vehicle',
        description: 'Paid per kilometre when an employee uses their own motor vehicle for work purposes.',
        trigger_condition: 'Employee uses own motor vehicle for work',
        amount: 0.99, amount_type: 'fixed', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance — motorcycle',
        description: 'Paid per kilometre when an employee uses their own motorcycle for work purposes.',
        trigger_condition: 'Employee uses own motorcycle for work',
        amount: 0.33, amount_type: 'fixed', per_unit: 'per_km',
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
        question_key: 'a111_stream',
        question_text: 'Which sector do you work in?',
        help_text: 'Public sector firefighters work for state or territory fire services. Private sector firefighters work for private companies such as industrial or airport fire services.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'public_sector', answer_text: 'Public Sector', sort_order: 1 },
          { answer_key: 'private_sector', answer_text: 'Private Sector', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a111_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role, experience, and responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Recruit', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Firefighter Level 1', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Firefighter Level 2', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Firefighter Level 3', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Qualified Firefighter', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Leading Firefighter', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Station Officer', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Senior Station Officer', sort_order: 8 },
          { answer_key: 'level_9', answer_text: 'Fire Service Communications Controller (public sector only)', sort_order: 9 },
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
    console.log('\n✅ MA000111 seed complete');
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
