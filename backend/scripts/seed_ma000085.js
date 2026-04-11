/**
 * Seed script — Dredging Industry Award 2020 [MA000085]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000085.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000085';
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
      'Dredging Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000085-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        description: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        duties: [],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        description: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        duties: [],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        description: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman',
        duties: [],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Assistant driller',
        description: 'Assistant driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Crew attendant',
        description: 'Crew attendant',
        duties: [],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Crew attendant',
        description: 'Crew attendant',
        duties: [],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Crew attendant',
        description: 'Crew attendant',
        duties: [],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 1, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Crew attendant',
        description: 'Crew attendant',
        duties: [],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Deckhand, assistant driller',
        description: 'Deckhand, assistant driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Deckhand, assistant driller',
        description: 'Deckhand, assistant driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Deckhand, assistant driller',
        description: 'Deckhand, assistant driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 1, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Dredgehand',
        description: 'Dredgehand',
        duties: [],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 1, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Greaser',
        description: 'Greaser',
        duties: [],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Second cook',
        description: 'Second cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Second cook',
        description: 'Second cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 1, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Second cook',
        description: 'Second cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Assistant pump operator',
        description: 'Assistant pump operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Assistant pump operator',
        description: 'Assistant pump operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Assistant pump operator',
        description: 'Assistant pump operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Bosun',
        description: 'Bosun',
        duties: [],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Bosun',
        description: 'Bosun',
        duties: [],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Bosun',
        description: 'Bosun',
        duties: [],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Chief cook',
        description: 'Chief cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Chief cook',
        description: 'Chief cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Chief cook',
        description: 'Chief cook',
        duties: [],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Driller, deckhand/driller',
        description: 'Driller, deckhand/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Driller, deckhand/driller',
        description: 'Driller, deckhand/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 2, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Driller, deckhand/driller',
        description: 'Driller, deckhand/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 2, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Third engineer',
        description: 'Third engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 3, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Driller',
        description: 'Driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 300,
      },
      {
        level: 3, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Launch driver',
        description: 'Launch driver',
        duties: [],
        indicative_tasks: [],
        sort_order: 310,
      },
      {
        level: 3, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Launch driver',
        description: 'Launch driver',
        duties: [],
        indicative_tasks: [],
        sort_order: 320,
      },
      {
        level: 3, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Launch driver',
        description: 'Launch driver',
        duties: [],
        indicative_tasks: [],
        sort_order: 330,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Bosun/driller',
        description: 'Bosun/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 340,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Bosun/driller',
        description: 'Bosun/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 350,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Bosun/driller',
        description: 'Bosun/driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 360,
      },
      {
        level: 4, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Leading hand (reclamation)',
        description: 'Leading hand (reclamation)',
        duties: [],
        indicative_tasks: [],
        sort_order: 370,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        description: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        duties: [],
        indicative_tasks: [],
        sort_order: 380,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        description: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        duties: [],
        indicative_tasks: [],
        sort_order: 390,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        description: 'Pump operator, welder, deckhand/welder, dredgehand/welder',
        duties: [],
        indicative_tasks: [],
        sort_order: 400,
      },
      {
        level: 4, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Second engineer',
        description: 'Second engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 410,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Second engineer, electrical engineer',
        description: 'Second engineer, electrical engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 420,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Second engineer, electrical engineer',
        description: 'Second engineer, electrical engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 430,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Second engineer, electrical engineer',
        description: 'Second engineer, electrical engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 440,
      },
      {
        level: 4, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Second operator',
        description: 'Second operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 450,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer mate',
        description: 'Trailer mate',
        duties: [],
        indicative_tasks: [],
        sort_order: 460,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer mate',
        description: 'Trailer mate',
        duties: [],
        indicative_tasks: [],
        sort_order: 470,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Trailer mate',
        description: 'Trailer mate',
        duties: [],
        indicative_tasks: [],
        sort_order: 480,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Tug master, tug engineer',
        description: 'Tug master, tug engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 490,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Tug master, tug engineer',
        description: 'Tug master, tug engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 500,
      },
      {
        level: 4, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Tug master, tug engineer',
        description: 'Tug master, tug engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 510,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Electrical engineer Humber River or equivalent',
        description: 'Electrical engineer Humber River or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 520,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Electrical engineer Humber River or equivalent',
        description: 'Electrical engineer Humber River or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 530,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Electrical engineer Humber River or equivalent',
        description: 'Electrical engineer Humber River or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 540,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'First engineer',
        description: 'First engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 550,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'First engineer',
        description: 'First engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 560,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'First engineer',
        description: 'First engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 570,
      },
      {
        level: 5, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Leading driller',
        description: 'Leading driller',
        duties: [],
        indicative_tasks: [],
        sort_order: 580,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer shift master',
        description: 'Trailer shift master',
        duties: [],
        indicative_tasks: [],
        sort_order: 590,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer shift master',
        description: 'Trailer shift master',
        duties: [],
        indicative_tasks: [],
        sort_order: 600,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Trailer shift master',
        description: 'Trailer shift master',
        duties: [],
        indicative_tasks: [],
        sort_order: 610,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Tug master W.H. Reliance or equivalent',
        description: 'Tug master W.H. Reliance or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 620,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Tug master W.H. Reliance or equivalent',
        description: 'Tug master W.H. Reliance or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 630,
      },
      {
        level: 5, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Tug master W.H. Reliance or equivalent',
        description: 'Tug master W.H. Reliance or equivalent',
        duties: [],
        indicative_tasks: [],
        sort_order: 640,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Chief engineer',
        description: 'Chief engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 650,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Chief engineer',
        description: 'Chief engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 660,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Chief engineer',
        description: 'Chief engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 670,
      },
      {
        level: 6, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Electrician',
        description: 'Electrician',
        duties: [],
        indicative_tasks: [],
        sort_order: 680,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer master',
        description: 'Trailer master',
        duties: [],
        indicative_tasks: [],
        sort_order: 690,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_not_fully',
        title: 'Trailer master',
        description: 'Trailer master',
        duties: [],
        indicative_tasks: [],
        sort_order: 700,
      },
      {
        level: 6, stream: 'dredge_other_than_a_non_propelled_dredge_fully_ope',
        title: 'Trailer master',
        description: 'Trailer master',
        duties: [],
        indicative_tasks: [],
        sort_order: 710,
      },
      {
        level: 7, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Crane operator/mechanical',
        description: 'Crane operator/mechanical',
        duties: [],
        indicative_tasks: [],
        sort_order: 720,
      },
      {
        level: 8, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Engineer',
        description: 'Engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 730,
      },
      {
        level: 8, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Mechanical attendant',
        description: 'Mechanical attendant',
        duties: [],
        indicative_tasks: [],
        sort_order: 740,
      },
      {
        level: 9, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Drilling technician',
        description: 'Drilling technician',
        duties: [],
        indicative_tasks: [],
        sort_order: 750,
      },
      {
        level: 10, stream: 'employees_on_a_non_propelled_dredge',
        title: 'First engineer',
        description: 'First engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 760,
      },
      {
        level: 10, stream: 'employees_on_a_non_propelled_dredge',
        title: 'First operator',
        description: 'First operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 770,
      },
      {
        level: 11, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Chief engineer',
        description: 'Chief engineer',
        duties: [],
        indicative_tasks: [],
        sort_order: 780,
      },
      {
        level: 11, stream: 'employees_on_a_non_propelled_dredge',
        title: 'Chief operator',
        description: 'Chief operator',
        duties: [],
        indicative_tasks: [],
        sort_order: 790,
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
      '1_dredge_other_than_a_non_propelled_dredge_not_fully': 28.19,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.55,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 28.72,
      '1_employees_on_a_non_propelled_dredge': 26.99,
      '1_dredge_other_than_a_non_propelled_dredge_not_fully': 28.19,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.55,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 28.72,
      '1_employees_on_a_non_propelled_dredge': 26.99,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 28.72,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.55,
      '1_dredge_other_than_a_non_propelled_dredge_not_fully': 28.19,
      '1_employees_on_a_non_propelled_dredge': 26.99,
      '1_employees_on_a_non_propelled_dredge': 26.99,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 28.72,
      '1_dredge_other_than_a_non_propelled_dredge_not_fully': 28.19,
      '1_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.55,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 31.29,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 29.42,
      '2_dredge_other_than_a_non_propelled_dredge_not_fully': 28.9,
      '2_dredge_other_than_a_non_propelled_dredge_not_fully': 28.9,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 29.42,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 31.29,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 31.29,
      '2_dredge_other_than_a_non_propelled_dredge_not_fully': 28.9,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 29.42,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 31.29,
      '2_dredge_other_than_a_non_propelled_dredge_not_fully': 28.9,
      '2_dredge_other_than_a_non_propelled_dredge_fully_ope': 29.42,
      '2_employees_on_a_non_propelled_dredge': 27.43,
      '3_employees_on_a_non_propelled_dredge': 27.93,
      '3_dredge_other_than_a_non_propelled_dredge_fully_ope': 31.9,
      '3_dredge_other_than_a_non_propelled_dredge_fully_ope': 29.99,
      '3_dredge_other_than_a_non_propelled_dredge_not_fully': 29.48,
      '4_dredge_other_than_a_non_propelled_dredge_not_fully': 30.43,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 32.89,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.93,
      '4_employees_on_a_non_propelled_dredge': 28.7,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.93,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 32.89,
      '4_dredge_other_than_a_non_propelled_dredge_not_fully': 30.43,
      '4_employees_on_a_non_propelled_dredge': 28.7,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.93,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 32.89,
      '4_dredge_other_than_a_non_propelled_dredge_not_fully': 30.43,
      '4_employees_on_a_non_propelled_dredge': 28.7,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 32.89,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.93,
      '4_dredge_other_than_a_non_propelled_dredge_not_fully': 30.43,
      '4_dredge_other_than_a_non_propelled_dredge_not_fully': 30.43,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 32.89,
      '4_dredge_other_than_a_non_propelled_dredge_fully_ope': 30.93,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 33.56,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 35.7,
      '5_dredge_other_than_a_non_propelled_dredge_not_fully': 33.09,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 33.56,
      '5_dredge_other_than_a_non_propelled_dredge_not_fully': 33.09,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 35.7,
      '5_employees_on_a_non_propelled_dredge': 29.35,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 33.56,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 35.7,
      '5_dredge_other_than_a_non_propelled_dredge_not_fully': 33.09,
      '5_dredge_other_than_a_non_propelled_dredge_not_fully': 33.09,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 35.7,
      '5_dredge_other_than_a_non_propelled_dredge_fully_ope': 33.56,
      '6_dredge_other_than_a_non_propelled_dredge_fully_ope': 34.5,
      '6_dredge_other_than_a_non_propelled_dredge_not_fully': 34.04,
      '6_dredge_other_than_a_non_propelled_dredge_fully_ope': 36.7,
      '6_employees_on_a_non_propelled_dredge': 29.56,
      '6_dredge_other_than_a_non_propelled_dredge_fully_ope': 34.5,
      '6_dredge_other_than_a_non_propelled_dredge_not_fully': 34.04,
      '6_dredge_other_than_a_non_propelled_dredge_fully_ope': 36.7,
      '7_employees_on_a_non_propelled_dredge': 29.64,
      '8_employees_on_a_non_propelled_dredge': 29.92,
      '8_employees_on_a_non_propelled_dredge': 29.92,
      '9_employees_on_a_non_propelled_dredge': 30.52,
      '10_employees_on_a_non_propelled_dredge': 31.38,
      '10_employees_on_a_non_propelled_dredge': 31.38,
      '11_employees_on_a_non_propelled_dredge': 32.02,
      '11_employees_on_a_non_propelled_dredge': 32.02,
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Monday to Sunday — Full-time ×2',
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
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Monday to Sunday — Part-time ×2',
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
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
        allowance_type: 'accommodation_allowance_living_away_from',
        name: 'Accommodation allowance—living away from agreed home port—per night',
        description: 'Accommodation allowance—living away from agreed home port—per night',
        trigger_condition: 'As per award conditions',
        amount: 231.23, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'accommodation_allowance_living_away_from',
        name: 'Accommodation allowance—living away from agreed home port—per week',
        description: 'Accommodation allowance—living away from agreed home port—per week',
        trigger_condition: 'As per award conditions',
        amount: 615.39, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'accommodation_allowance_per_week',
        name: 'Accommodation allowance—per week',
        description: 'Accommodation allowance—per week',
        trigger_condition: 'As per award conditions',
        amount: 615.39, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance—more than 1.5 hours’ overtime',
        description: 'Meal allowance—more than 1.5 hours’ overtime',
        trigger_condition: 'As per award conditions',
        amount: 63.17, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance—more than 1.5 hours’ overtime—second/subsequent meal',
        description: 'Meal allowance—more than 1.5 hours’ overtime—second/subsequent meal',
        trigger_condition: 'As per award conditions',
        amount: 63.17, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Protective and industrial clothing allowance',
        description: 'Protective and industrial clothing allowance',
        trigger_condition: 'As per award conditions',
        amount: 24.5, amount_type: 'weekly', per_unit: 'per_week',
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
        question_key: 'a85_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'dredge_other_than_a_non_propelled_dredge_not_fully', answer_text: 'Dredge Other Than A Non Propelled Dredge Not Fully', sort_order: 1 },
          { answer_key: 'dredge_other_than_a_non_propelled_dredge_fully_ope', answer_text: 'Dredge Other Than A Non Propelled Dredge Fully Ope', sort_order: 2 },
          { answer_key: 'employees_on_a_non_propelled_dredge', answer_text: 'Employees On A Non Propelled Dredge', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a85_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Able seaman, deckhand, dredgehand, greaser, firefighter, motorman', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Assistant pump operator', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Driller', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Bosun/driller', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Electrical engineer Humber River or equivalent', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Chief engineer', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Crane operator/mechanical', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Engineer', sort_order: 8 },
          { answer_key: 'level_9', answer_text: 'Drilling technician', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'First engineer', sort_order: 10 },
          { answer_key: 'level_11', answer_text: 'Chief engineer', sort_order: 11 },
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
    console.log('\n✅ MA000085 seed complete');
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
