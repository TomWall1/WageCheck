/**
 * Seed script — Aboriginal and Torres Strait Islander Health Workers and Practitioners
 * and Aboriginal Community Controlled Health Services Award [MA000115]
 * Pay rates effective 1 January 2026
 * Source: FWO pay guide MA000115, published 23 December 2025
 *
 * Run after migrate.js: node scripts/seed_ma000115.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000115';
const EFFECTIVE_DATE = '2026-01-01';

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
      'Aboriginal and Torres Strait Islander Health Workers and Practitioners and Aboriginal Community Controlled Health Services Award',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000115-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // 5 streams, 28 unique classifications (deduplicated from 73).
    // Health workers: 12 classifications (grade 1 level 1 through grade 5 level 3)
    // Administrative: 32 pay points mapped as individual levels
    // Dental assistants: 8 classifications
    // Dental/oral health therapists: 4 classifications
    // Ancillary: 4 classifications

    const classifications = [
      // ── Health workers (Aboriginal and/or Torres Strait Islander) ───────────
      // Grade 1 = trainee entry, Grade 2 = trainee, Grade 3-5 = health worker
      { level: 1, stream: 'health_workers', title: 'Health worker trainee (entry) — grade 1 — level 1', description: 'Aboriginal and/or Torres Strait Islander health worker trainee (entry) — grade 1 — level 1.', duties: ['Entry-level trainee health worker duties under close supervision'], indicative_tasks: ['Health worker trainee entry'], sort_order: 10 },
      { level: 2, stream: 'health_workers', title: 'Health worker trainee — grade 2 — level 1', description: 'Aboriginal and/or Torres Strait Islander health worker trainee — grade 2 — level 1.', duties: ['Trainee health worker duties with developing skills'], indicative_tasks: ['Health worker trainee grade 2 level 1'], sort_order: 20 },
      { level: 3, stream: 'health_workers', title: 'Health worker trainee — grade 2 — level 2', description: 'Aboriginal and/or Torres Strait Islander health worker trainee — grade 2 — level 2.', duties: ['Trainee health worker duties with further developed skills'], indicative_tasks: ['Health worker trainee grade 2 level 2'], sort_order: 30 },
      { level: 4, stream: 'health_workers', title: 'Health worker — grade 3 — level 1', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 3 — level 1.', duties: ['Health worker duties at grade 3 entry level'], indicative_tasks: ['Health worker grade 3 level 1'], sort_order: 40 },
      { level: 5, stream: 'health_workers', title: 'Health worker — grade 3 — level 2', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 3 — level 2.', duties: ['Health worker duties at grade 3 with developing competence'], indicative_tasks: ['Health worker grade 3 level 2'], sort_order: 50 },
      { level: 6, stream: 'health_workers', title: 'Health worker — grade 3 — level 3', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 3 — level 3.', duties: ['Health worker duties at grade 3 with established competence'], indicative_tasks: ['Health worker grade 3 level 3'], sort_order: 60 },
      { level: 7, stream: 'health_workers', title: 'Health worker — grade 4 — level 1', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 4 — level 1.', duties: ['Senior health worker duties at grade 4 entry'], indicative_tasks: ['Health worker grade 4 level 1'], sort_order: 70 },
      { level: 8, stream: 'health_workers', title: 'Health worker — grade 4 — level 2', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 4 — level 2.', duties: ['Senior health worker duties at grade 4 mid-level'], indicative_tasks: ['Health worker grade 4 level 2'], sort_order: 80 },
      { level: 9, stream: 'health_workers', title: 'Health worker — grade 4 — level 3', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 4 — level 3.', duties: ['Senior health worker duties at grade 4 top level'], indicative_tasks: ['Health worker grade 4 level 3'], sort_order: 90 },
      { level: 10, stream: 'health_workers', title: 'Health worker — grade 5 — level 1', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 5 — level 1.', duties: ['Advanced health worker duties at grade 5 entry'], indicative_tasks: ['Health worker grade 5 level 1'], sort_order: 100 },
      { level: 11, stream: 'health_workers', title: 'Health worker — grade 5 — level 2', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 5 — level 2.', duties: ['Advanced health worker duties at grade 5 mid-level'], indicative_tasks: ['Health worker grade 5 level 2'], sort_order: 110 },
      { level: 12, stream: 'health_workers', title: 'Health worker — grade 5 — level 3', description: 'Aboriginal and/or Torres Strait Islander health worker — grade 5 — level 3.', duties: ['Advanced health worker duties at grade 5 top level'], indicative_tasks: ['Health worker grade 5 level 3'], sort_order: 120 },

      // ── Administrative ──────────────────────────────────────────────────────
      // 32 pay points: grade 1 (5 levels), grade 2 (5), grade 3 (4), grade 4 (4),
      // grade 5 (3), grade 6 (5), grade 7 (2), grade 8 (4)
      { level: 1, stream: 'administrative', title: 'Administrative grade 1 — level 1', description: 'Administrative grade 1 — level 1.', duties: ['Entry-level administrative duties'], indicative_tasks: ['Admin grade 1 level 1'], sort_order: 130 },
      { level: 2, stream: 'administrative', title: 'Administrative grade 1 — level 2', description: 'Administrative grade 1 — level 2.', duties: ['Administrative duties at grade 1 level 2'], indicative_tasks: ['Admin grade 1 level 2'], sort_order: 140 },
      { level: 3, stream: 'administrative', title: 'Administrative grade 1 — level 3', description: 'Administrative grade 1 — level 3.', duties: ['Administrative duties at grade 1 level 3'], indicative_tasks: ['Admin grade 1 level 3'], sort_order: 150 },
      { level: 4, stream: 'administrative', title: 'Administrative grade 1 — level 4', description: 'Administrative grade 1 — level 4.', duties: ['Administrative duties at grade 1 level 4'], indicative_tasks: ['Admin grade 1 level 4'], sort_order: 160 },
      { level: 5, stream: 'administrative', title: 'Administrative grade 1 — level 5', description: 'Administrative grade 1 — level 5.', duties: ['Administrative duties at grade 1 level 5'], indicative_tasks: ['Admin grade 1 level 5'], sort_order: 170 },
      { level: 6, stream: 'administrative', title: 'Administrative grade 2 — level 1', description: 'Administrative grade 2 — level 1.', duties: ['Administrative duties at grade 2 level 1'], indicative_tasks: ['Admin grade 2 level 1'], sort_order: 180 },
      { level: 7, stream: 'administrative', title: 'Administrative grade 2 — level 2', description: 'Administrative grade 2 — level 2.', duties: ['Administrative duties at grade 2 level 2'], indicative_tasks: ['Admin grade 2 level 2'], sort_order: 190 },
      { level: 8, stream: 'administrative', title: 'Administrative grade 2 — level 3', description: 'Administrative grade 2 — level 3.', duties: ['Administrative duties at grade 2 level 3'], indicative_tasks: ['Admin grade 2 level 3'], sort_order: 200 },
      { level: 9, stream: 'administrative', title: 'Administrative grade 2 — level 4', description: 'Administrative grade 2 — level 4.', duties: ['Administrative duties at grade 2 level 4'], indicative_tasks: ['Admin grade 2 level 4'], sort_order: 210 },
      { level: 10, stream: 'administrative', title: 'Administrative grade 2 — level 5', description: 'Administrative grade 2 — level 5.', duties: ['Administrative duties at grade 2 level 5'], indicative_tasks: ['Admin grade 2 level 5'], sort_order: 220 },
      { level: 11, stream: 'administrative', title: 'Administrative grade 3 — level 1', description: 'Administrative grade 3 — level 1.', duties: ['Administrative duties at grade 3 level 1'], indicative_tasks: ['Admin grade 3 level 1'], sort_order: 230 },
      { level: 12, stream: 'administrative', title: 'Administrative grade 3 — level 2', description: 'Administrative grade 3 — level 2.', duties: ['Administrative duties at grade 3 level 2'], indicative_tasks: ['Admin grade 3 level 2'], sort_order: 240 },
      { level: 13, stream: 'administrative', title: 'Administrative grade 3 — level 3', description: 'Administrative grade 3 — level 3.', duties: ['Administrative duties at grade 3 level 3'], indicative_tasks: ['Admin grade 3 level 3'], sort_order: 250 },
      { level: 14, stream: 'administrative', title: 'Administrative grade 3 — level 4', description: 'Administrative grade 3 — level 4.', duties: ['Administrative duties at grade 3 level 4'], indicative_tasks: ['Admin grade 3 level 4'], sort_order: 260 },
      { level: 15, stream: 'administrative', title: 'Administrative grade 4 — level 1', description: 'Administrative grade 4 — level 1.', duties: ['Administrative duties at grade 4 level 1'], indicative_tasks: ['Admin grade 4 level 1'], sort_order: 270 },
      { level: 16, stream: 'administrative', title: 'Administrative grade 4 — level 2', description: 'Administrative grade 4 — level 2.', duties: ['Administrative duties at grade 4 level 2'], indicative_tasks: ['Admin grade 4 level 2'], sort_order: 280 },
      { level: 17, stream: 'administrative', title: 'Administrative grade 4 — level 3', description: 'Administrative grade 4 — level 3.', duties: ['Administrative duties at grade 4 level 3'], indicative_tasks: ['Admin grade 4 level 3'], sort_order: 290 },
      { level: 18, stream: 'administrative', title: 'Administrative grade 4 — level 4', description: 'Administrative grade 4 — level 4.', duties: ['Administrative duties at grade 4 level 4'], indicative_tasks: ['Admin grade 4 level 4'], sort_order: 300 },
      { level: 19, stream: 'administrative', title: 'Administrative grade 5 — level 1', description: 'Administrative grade 5 — level 1.', duties: ['Administrative duties at grade 5 level 1'], indicative_tasks: ['Admin grade 5 level 1'], sort_order: 310 },
      { level: 20, stream: 'administrative', title: 'Administrative grade 5 — level 2', description: 'Administrative grade 5 — level 2.', duties: ['Administrative duties at grade 5 level 2'], indicative_tasks: ['Admin grade 5 level 2'], sort_order: 320 },
      { level: 21, stream: 'administrative', title: 'Administrative grade 5 — level 3', description: 'Administrative grade 5 — level 3.', duties: ['Administrative duties at grade 5 level 3'], indicative_tasks: ['Admin grade 5 level 3'], sort_order: 330 },
      { level: 22, stream: 'administrative', title: 'Administrative grade 6 — level 1', description: 'Administrative grade 6 — level 1.', duties: ['Administrative duties at grade 6 level 1'], indicative_tasks: ['Admin grade 6 level 1'], sort_order: 340 },
      { level: 23, stream: 'administrative', title: 'Administrative grade 6 — level 2', description: 'Administrative grade 6 — level 2.', duties: ['Administrative duties at grade 6 level 2'], indicative_tasks: ['Admin grade 6 level 2'], sort_order: 350 },
      { level: 24, stream: 'administrative', title: 'Administrative grade 6 — level 3', description: 'Administrative grade 6 — level 3.', duties: ['Administrative duties at grade 6 level 3'], indicative_tasks: ['Admin grade 6 level 3'], sort_order: 360 },
      { level: 25, stream: 'administrative', title: 'Administrative grade 6 — level 4', description: 'Administrative grade 6 — level 4.', duties: ['Administrative duties at grade 6 level 4'], indicative_tasks: ['Admin grade 6 level 4'], sort_order: 370 },
      { level: 26, stream: 'administrative', title: 'Administrative grade 6 — level 5', description: 'Administrative grade 6 — level 5.', duties: ['Administrative duties at grade 6 level 5'], indicative_tasks: ['Admin grade 6 level 5'], sort_order: 380 },
      { level: 27, stream: 'administrative', title: 'Administrative grade 7 — level 1', description: 'Administrative grade 7 — level 1.', duties: ['Administrative duties at grade 7 level 1'], indicative_tasks: ['Admin grade 7 level 1'], sort_order: 390 },
      { level: 28, stream: 'administrative', title: 'Administrative grade 7 — level 2', description: 'Administrative grade 7 — level 2.', duties: ['Administrative duties at grade 7 level 2'], indicative_tasks: ['Admin grade 7 level 2'], sort_order: 400 },
      { level: 29, stream: 'administrative', title: 'Administrative grade 8 — level 1', description: 'Administrative grade 8 — level 1.', duties: ['Administrative duties at grade 8 level 1'], indicative_tasks: ['Admin grade 8 level 1'], sort_order: 410 },
      { level: 30, stream: 'administrative', title: 'Administrative grade 8 — level 2', description: 'Administrative grade 8 — level 2.', duties: ['Administrative duties at grade 8 level 2'], indicative_tasks: ['Admin grade 8 level 2'], sort_order: 420 },
      { level: 31, stream: 'administrative', title: 'Administrative grade 8 — level 3', description: 'Administrative grade 8 — level 3.', duties: ['Administrative duties at grade 8 level 3'], indicative_tasks: ['Admin grade 8 level 3'], sort_order: 430 },
      { level: 32, stream: 'administrative', title: 'Administrative grade 8 — level 4', description: 'Administrative grade 8 — level 4.', duties: ['Administrative duties at grade 8 level 4'], indicative_tasks: ['Admin grade 8 level 4'], sort_order: 440 },

      // ── Dental assistants ───────────────────────────────────────────────────
      { level: 1, stream: 'dental_assistants', title: 'Dental assistant (unqualified) — grade 2 — level 1', description: 'Unqualified dental assistant — grade 2 — level 1.', duties: ['Assisting with dental procedures under supervision'], indicative_tasks: ['Dental assistant unqualified level 1'], sort_order: 450 },
      { level: 2, stream: 'dental_assistants', title: 'Dental assistant (unqualified) — grade 2 — level 2', description: 'Unqualified dental assistant — grade 2 — level 2.', duties: ['Assisting with dental procedures with developing skills'], indicative_tasks: ['Dental assistant unqualified level 2'], sort_order: 460 },
      { level: 3, stream: 'dental_assistants', title: 'Dental assistant (Cert III) — grade 3 — level 1', description: 'Dental assistant qualified with a Certificate III — grade 3 — level 1.', duties: ['Qualified dental assistant duties at grade 3 level 1'], indicative_tasks: ['Dental assistant Cert III level 1'], sort_order: 470 },
      { level: 4, stream: 'dental_assistants', title: 'Dental assistant (Cert III) — grade 3 — level 2', description: 'Dental assistant qualified with a Certificate III — grade 3 — level 2.', duties: ['Qualified dental assistant duties at grade 3 level 2'], indicative_tasks: ['Dental assistant Cert III level 2'], sort_order: 480 },
      { level: 5, stream: 'dental_assistants', title: 'Dental assistant (Cert III) — grade 3 — level 3', description: 'Dental assistant qualified with a Certificate III — grade 3 — level 3.', duties: ['Qualified dental assistant duties at grade 3 level 3'], indicative_tasks: ['Dental assistant Cert III level 3'], sort_order: 490 },
      { level: 6, stream: 'dental_assistants', title: 'Dental assistant (Cert IV) — grade 4 — level 1', description: 'Dental assistant qualified with a Certificate IV — grade 4 — level 1.', duties: ['Advanced dental assistant duties at grade 4 level 1'], indicative_tasks: ['Dental assistant Cert IV level 1'], sort_order: 500 },
      { level: 7, stream: 'dental_assistants', title: 'Dental assistant (Cert IV) — grade 4 — level 2', description: 'Dental assistant qualified with a Certificate IV — grade 4 — level 2.', duties: ['Advanced dental assistant duties at grade 4 level 2'], indicative_tasks: ['Dental assistant Cert IV level 2'], sort_order: 510 },
      { level: 8, stream: 'dental_assistants', title: 'Dental assistant (Cert IV) — grade 4 — level 3', description: 'Dental assistant qualified with a Certificate IV — grade 4 — level 3.', duties: ['Advanced dental assistant duties at grade 4 level 3'], indicative_tasks: ['Dental assistant Cert IV level 3'], sort_order: 520 },

      // ── Dental/oral health therapists ───────────────────────────────────────
      { level: 1, stream: 'dental_therapists', title: 'Dental/Oral health therapist — grade 1 — entry level — 1st year', description: 'Entry-level dental/oral health therapist in their 1st year.', duties: ['Entry-level dental/oral health therapy duties'], indicative_tasks: ['Dental therapist grade 1'], sort_order: 530 },
      { level: 2, stream: 'dental_therapists', title: 'Dental/Oral health therapist — grade 2 — 2nd-3rd year', description: 'Dental/oral health therapist in their 2nd to 3rd year.', duties: ['Dental/oral health therapy duties with developing experience'], indicative_tasks: ['Dental therapist grade 2'], sort_order: 540 },
      { level: 3, stream: 'dental_therapists', title: 'Dental/Oral health therapist — grade 3 — 4th-6th year', description: 'Dental/oral health therapist in their 4th to 6th year.', duties: ['Experienced dental/oral health therapy duties'], indicative_tasks: ['Dental therapist grade 3'], sort_order: 550 },
      { level: 4, stream: 'dental_therapists', title: 'Dental/Oral health therapist — grade 4 — 7th year+', description: 'Dental/oral health therapist with 7 or more years of experience.', duties: ['Senior dental/oral health therapy duties'], indicative_tasks: ['Dental therapist grade 4'], sort_order: 560 },

      // ── Ancillary ───────────────────────────────────────────────────────────
      { level: 1, stream: 'ancillary', title: 'Cleaner', description: 'Ancillary employee — cleaner.', duties: ['Cleaning and maintaining premises'], indicative_tasks: ['Cleaner'], sort_order: 570 },
      { level: 2, stream: 'ancillary', title: 'Driver — grade 1', description: 'Ancillary employee — driver grade 1.', duties: ['Driving and transport duties'], indicative_tasks: ['Driver grade 1'], sort_order: 580 },
      { level: 3, stream: 'ancillary', title: 'Driver — grade 2', description: 'Ancillary employee — driver grade 2.', duties: ['Advanced driving and transport duties'], indicative_tasks: ['Driver grade 2'], sort_order: 590 },
      { level: 4, stream: 'ancillary', title: 'Caretaker', description: 'Ancillary employee — caretaker.', duties: ['Caretaking and property maintenance duties'], indicative_tasks: ['Caretaker'], sort_order: 600 },
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
    // Source: FWO pay guide MA000115, effective 1 January 2026.
    // FT/PT hourly rates. Casual = FT x 1.25.
    const baseRates = {
      // Health workers
      '1_health_workers': 26.83,   // Grade 1 level 1 (trainee entry)
      '2_health_workers': 28.74,   // Grade 2 level 1
      '3_health_workers': 29.72,   // Grade 2 level 2
      '4_health_workers': 31.27,   // Grade 3 level 1
      '5_health_workers': 32.91,   // Grade 3 level 2
      '6_health_workers': 34.51,   // Grade 3 level 3
      '7_health_workers': 35.47,   // Grade 4 level 1
      '8_health_workers': 36.43,   // Grade 4 level 2
      '9_health_workers': 37.27,   // Grade 4 level 3
      '10_health_workers': 38.16,  // Grade 5 level 1
      '11_health_workers': 39.05,  // Grade 5 level 2
      '12_health_workers': 40.00,  // Grade 5 level 3
      // Administrative
      '1_administrative': 26.65,   // Grade 1 level 1
      '2_administrative': 26.74,   // Grade 1 level 2
      '3_administrative': 27.28,   // Grade 1 level 3
      '4_administrative': 27.67,   // Grade 1 level 4
      '5_administrative': 28.47,   // Grade 1 level 5
      '6_administrative': 28.91,   // Grade 2 level 1
      '7_administrative': 29.42,   // Grade 2 level 2
      '8_administrative': 29.93,   // Grade 2 level 3
      '9_administrative': 30.36,   // Grade 2 level 4
      '10_administrative': 30.88,  // Grade 2 level 5
      '11_administrative': 31.44,  // Grade 3 level 1
      '12_administrative': 32.00,  // Grade 3 level 2
      '13_administrative': 32.34,  // Grade 3 level 3
      '14_administrative': 32.93,  // Grade 3 level 4
      '15_administrative': 33.44,  // Grade 4 level 1
      '16_administrative': 34.24,  // Grade 4 level 2
      '17_administrative': 34.86,  // Grade 4 level 3
      '18_administrative': 35.50,  // Grade 4 level 4
      '19_administrative': 36.21,  // Grade 5 level 1
      '20_administrative': 36.96,  // Grade 5 level 2
      '21_administrative': 37.73,  // Grade 5 level 3
      '22_administrative': 38.17,  // Grade 6 level 1
      '23_administrative': 38.88,  // Grade 6 level 2
      '24_administrative': 39.69,  // Grade 6 level 3
      '25_administrative': 41.22,  // Grade 6 level 4
      '26_administrative': 42.44,  // Grade 6 level 5
      '27_administrative': 43.45,  // Grade 7 level 1
      '28_administrative': 44.63,  // Grade 7 level 2
      '29_administrative': 45.09,  // Grade 8 level 1
      '30_administrative': 46.24,  // Grade 8 level 2
      '31_administrative': 47.79,  // Grade 8 level 3
      '32_administrative': 48.93,  // Grade 8 level 4
      // Dental assistants
      '1_dental_assistants': 28.01,  // Grade 2 level 1 (unqualified)
      '2_dental_assistants': 28.56,  // Grade 2 level 2 (unqualified)
      '3_dental_assistants': 29.12,  // Grade 3 level 1 (Cert III)
      '4_dental_assistants': 30.93,  // Grade 3 level 2 (Cert III)
      '5_dental_assistants': 31.98,  // Grade 3 level 3 (Cert III)
      '6_dental_assistants': 29.12,  // Grade 4 level 1 (Cert IV)
      '7_dental_assistants': 30.93,  // Grade 4 level 2 (Cert IV)
      '8_dental_assistants': 31.98,  // Grade 4 level 3 (Cert IV)
      // Dental/oral health therapists
      '1_dental_therapists': 33.46,  // Grade 1 entry 1st year
      '2_dental_therapists': 34.33,  // Grade 2 2nd-3rd year
      '3_dental_therapists': 36.80,  // Grade 3 4th-6th year
      '4_dental_therapists': 41.77,  // Grade 4 7th year+
      // Ancillary
      '1_ancillary': 26.45,  // Cleaner
      '2_ancillary': 27.52,  // Driver grade 1
      '3_ancillary': 28.24,  // Driver grade 2
      '4_ancillary': 28.24,  // Caretaker
    };

    // Casual rates from PDF (health workers stream has explicit casual rates)
    const casualRatesOverride = {
      '1_health_workers': 33.54,
      '2_health_workers': 35.93,
      '3_health_workers': 37.15,
      '4_health_workers': 39.09,
      '5_health_workers': 41.14,
      '6_health_workers': 43.14,
      '7_health_workers': 44.34,
      '8_health_workers': 45.54,
      '9_health_workers': 46.59,
      '10_health_workers': 47.70,
      '11_health_workers': 48.81,
      '12_health_workers': 50.00,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.level}_${cls.stream}`;
      const baseRate = baseRates[key];
      if (!baseRate) continue;

      const casualRate = casualRatesOverride[key] || Math.round(baseRate * 1.25 * 100) / 100;

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
    // Shiftworker penalties from PDF:
    // FT/PT: Saturday x1.5, Sunday x2.0, Public holiday x2.5
    // Casual: Saturday x1.4 of casual, Sunday x1.8 of casual, Public holiday earned at base FT rate
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Shiftworkers — Saturday — Full-time x1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Shiftworkers — Sunday — Full-time x2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees — Public holiday — Full-time x2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Shiftworkers — Saturday — Part-time x1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Shiftworkers — Sunday — Part-time x2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees — Public holiday — Part-time x2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — x1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.4, addition_per_hour: null,
        description: 'Shiftworkers — Saturday — Casual x1.4 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Shiftworkers — Sunday — Casual x1.8 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees — Public holiday — Casual x2.5',
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
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (x2.0)' },
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
        allowance_type: 'laundry_daily',
        name: 'Clothing allowance — Laundry allowance — per day',
        description: 'Laundry allowance payable per day or part thereof.',
        trigger_condition: 'Required to launder own uniform',
        amount: 0.26, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'laundry_weekly',
        name: 'Clothing allowance — Laundry allowance — per week',
        description: 'Laundry allowance payable per week.',
        trigger_condition: 'Required to launder own uniform',
        amount: 1.29, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'uniform_daily',
        name: 'Clothing allowance — Uniform allowance — per day',
        description: 'Uniform allowance payable per day or part thereof.',
        trigger_condition: 'Required to wear a uniform',
        amount: 1.20, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform_weekly',
        name: 'Clothing allowance — Uniform allowance — per week',
        description: 'Uniform allowance payable per week.',
        trigger_condition: 'Required to wear a uniform',
        amount: 5.92, amount_type: 'weekly', per_unit: 'per_week',
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
        question_key: 'a115_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'health_workers', answer_text: 'Aboriginal and/or Torres Strait Islander health worker', sort_order: 1 },
          { answer_key: 'administrative', answer_text: 'Administrative employee', sort_order: 2 },
          { answer_key: 'dental_assistants', answer_text: 'Dental assistant', sort_order: 3 },
          { answer_key: 'dental_therapists', answer_text: 'Dental/Oral health therapist', sort_order: 4 },
          { answer_key: 'ancillary', answer_text: 'Ancillary employee (cleaner, driver, caretaker)', sort_order: 5 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_hw_level',
        question_text: 'What is your grade and level?',
        help_text: 'Select the classification that matches your current grade and pay level.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a115_stream',
        parent_answer_key: 'health_workers',
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Trainee (entry) — grade 1 — level 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Trainee — grade 2 — level 1', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Trainee — grade 2 — level 2', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Health worker — grade 3 — level 1', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Health worker — grade 3 — level 2', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Health worker — grade 3 — level 3', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Health worker — grade 4 — level 1', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Health worker — grade 4 — level 2', sort_order: 8 },
          { answer_key: 'level_9', answer_text: 'Health worker — grade 4 — level 3', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Health worker — grade 5 — level 1', sort_order: 10 },
          { answer_key: 'level_11', answer_text: 'Health worker — grade 5 — level 2', sort_order: 11 },
          { answer_key: 'level_12', answer_text: 'Health worker — grade 5 — level 3', sort_order: 12 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_admin_level',
        question_text: 'What is your administrative grade and level?',
        help_text: 'Select the classification that matches your current grade and pay level.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a115_stream',
        parent_answer_key: 'administrative',
        sort_order: 3,
        answers: Array.from({ length: 32 }, (_, i) => {
          const gradeMap = [
            [1,1],[1,2],[1,3],[1,4],[1,5],
            [2,1],[2,2],[2,3],[2,4],[2,5],
            [3,1],[3,2],[3,3],[3,4],
            [4,1],[4,2],[4,3],[4,4],
            [5,1],[5,2],[5,3],
            [6,1],[6,2],[6,3],[6,4],[6,5],
            [7,1],[7,2],
            [8,1],[8,2],[8,3],[8,4],
          ];
          const [g, l] = gradeMap[i];
          return { answer_key: `level_${i + 1}`, answer_text: `Grade ${g} — level ${l}`, sort_order: i + 1 };
        }),
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_da_level',
        question_text: 'What is your dental assistant classification?',
        help_text: 'Select the classification that matches your qualifications and level.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a115_stream',
        parent_answer_key: 'dental_assistants',
        sort_order: 4,
        answers: [
          { answer_key: 'level_1', answer_text: 'Unqualified — grade 2 — level 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Unqualified — grade 2 — level 2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Certificate III — grade 3 — level 1', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Certificate III — grade 3 — level 2', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Certificate III — grade 3 — level 3', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Certificate IV — grade 4 — level 1', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Certificate IV — grade 4 — level 2', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Certificate IV — grade 4 — level 3', sort_order: 8 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_dt_level',
        question_text: 'What is your dental/oral health therapist grade?',
        help_text: 'Select the grade that matches your years of experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a115_stream',
        parent_answer_key: 'dental_therapists',
        sort_order: 5,
        answers: [
          { answer_key: 'level_1', answer_text: 'Grade 1 — entry level — 1st year', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Grade 2 — 2nd-3rd year', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Grade 3 — 4th-6th year', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Grade 4 — 7th year+', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_anc_level',
        question_text: 'What is your ancillary role?',
        help_text: 'Select the role that matches your position.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'a115_stream',
        parent_answer_key: 'ancillary',
        sort_order: 6,
        answers: [
          { answer_key: 'level_1', answer_text: 'Cleaner', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Driver — grade 1', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Driver — grade 2', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Caretaker', sort_order: 4 },
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
    console.log('\n✅ MA000115 seed complete');
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
