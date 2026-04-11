/**
 * Seed script — Aboriginal and Torres Strait Islander Health Workers and Practitioners Award 2020 [MA000115]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000115.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000115';
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
      'Aboriginal and Torres Strait Islander Health Workers and Practitioners Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000115-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'ancillary',
        title: 'Cleaner',
        description: 'Cleaner',
        duties: [],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'dental_oral_health_therapists',
        title: 'Grade 1—Entry Level—1st year',
        description: 'Grade 1—Entry Level—1st year',
        duties: [],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 1, stream: 'aboriginal_health_workers',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 1, stream: 'aboriginal_health_workers',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 1, stream: 'aboriginal_health_workers',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 1, stream: 'aboriginal_and_or_torres_strait_islander_health_wo',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 1, stream: 'dental_assistants',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 1, stream: 'administrative',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 150,
      },
      {
        level: 1, stream: 'aboriginal_and_or_torres_strait_islander_health_wo',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 160,
      },
      {
        level: 1, stream: 'dental_assistants',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 170,
      },
      {
        level: 1, stream: 'dental_assistants',
        title: 'Level 1',
        description: 'Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 180,
      },
      {
        level: 2, stream: 'ancillary',
        title: 'Driver—Grade 1',
        description: 'Driver—Grade 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 190,
      },
      {
        level: 2, stream: 'dental_oral_health_therapists',
        title: 'Grade 2—2nd–3rd year',
        description: 'Grade 2—2nd–3rd year',
        duties: [],
        indicative_tasks: [],
        sort_order: 200,
      },
      {
        level: 2, stream: 'aboriginal_health_workers',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 210,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 220,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 230,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 240,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 250,
      },
      {
        level: 2, stream: 'aboriginal_and_or_torres_strait_islander_health_wo',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 260,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 270,
      },
      {
        level: 2, stream: 'aboriginal_health_workers',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 280,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 290,
      },
      {
        level: 2, stream: 'aboriginal_health_workers',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 300,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 310,
      },
      {
        level: 2, stream: 'administrative',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 320,
      },
      {
        level: 2, stream: 'dental_assistants',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 330,
      },
      {
        level: 2, stream: 'dental_assistants',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 340,
      },
      {
        level: 2, stream: 'dental_assistants',
        title: 'Level 2',
        description: 'Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 350,
      },
      {
        level: 3, stream: 'ancillary',
        title: 'Caretaker',
        description: 'Caretaker',
        duties: [],
        indicative_tasks: [],
        sort_order: 360,
      },
      {
        level: 3, stream: 'dental_oral_health_therapists',
        title: 'Grade 3—4th–6th year',
        description: 'Grade 3—4th–6th year',
        duties: [],
        indicative_tasks: [],
        sort_order: 370,
      },
      {
        level: 3, stream: 'administrative',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 380,
      },
      {
        level: 3, stream: 'administrative',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 390,
      },
      {
        level: 3, stream: 'aboriginal_and_or_torres_strait_islander_health_wo',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 400,
      },
      {
        level: 3, stream: 'administrative',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 410,
      },
      {
        level: 3, stream: 'aboriginal_health_workers',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 420,
      },
      {
        level: 3, stream: 'administrative',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 430,
      },
      {
        level: 3, stream: 'aboriginal_and_or_torres_strait_islander_health_wo',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 440,
      },
      {
        level: 3, stream: 'administrative',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 450,
      },
      {
        level: 3, stream: 'dental_assistants',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 460,
      },
      {
        level: 3, stream: 'dental_assistants',
        title: 'Level 3',
        description: 'Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 470,
      },
      {
        level: 4, stream: 'dental_oral_health_therapists',
        title: 'Grade 4—7th year+',
        description: 'Grade 4—7th year+',
        duties: [],
        indicative_tasks: [],
        sort_order: 480,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 490,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 500,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 510,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 520,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 530,
      },
      {
        level: 4, stream: 'administrative',
        title: 'Level 4',
        description: 'Level 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 540,
      },
      {
        level: 5, stream: 'administrative',
        title: 'Level 5',
        description: 'Level 5',
        duties: [],
        indicative_tasks: [],
        sort_order: 550,
      },
      {
        level: 5, stream: 'administrative',
        title: 'Level 5',
        description: 'Level 5',
        duties: [],
        indicative_tasks: [],
        sort_order: 560,
      },
      {
        level: 5, stream: 'administrative',
        title: 'Level 5',
        description: 'Level 5',
        duties: [],
        indicative_tasks: [],
        sort_order: 570,
      },
      {
        level: 58, stream: 'aboriginal_health_workers',
        title: 'Grade 1',
        description: 'Grade 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 580,
      },
      {
        level: 59, stream: 'administrative',
        title: 'Grade 1',
        description: 'Grade 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 590,
      },
      {
        level: 60, stream: 'aboriginal_health_workers',
        title: 'Grade 2',
        description: 'Grade 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 600,
      },
      {
        level: 61, stream: 'administrative',
        title: 'Grade 2',
        description: 'Grade 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 610,
      },
      {
        level: 62, stream: 'dental_assistants',
        title: 'Grade 2—Dental Assistant (unqualified)',
        description: 'Grade 2—Dental Assistant (unqualified)',
        duties: [],
        indicative_tasks: [],
        sort_order: 620,
      },
      {
        level: 63, stream: 'aboriginal_health_workers',
        title: 'Grade 3',
        description: 'Grade 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 630,
      },
      {
        level: 64, stream: 'administrative',
        title: 'Grade 3',
        description: 'Grade 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 640,
      },
      {
        level: 65, stream: 'dental_assistants',
        title: 'Grade 3—Dental Assistant (qualified with a Certificate III or assessed equivalent)',
        description: 'Grade 3—Dental Assistant (qualified with a Certificate III or assessed equivalent)',
        duties: [],
        indicative_tasks: [],
        sort_order: 650,
      },
      {
        level: 66, stream: 'aboriginal_health_workers',
        title: 'Grade 4',
        description: 'Grade 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 660,
      },
      {
        level: 67, stream: 'administrative',
        title: 'Grade 4',
        description: 'Grade 4',
        duties: [],
        indicative_tasks: [],
        sort_order: 670,
      },
      {
        level: 68, stream: 'dental_assistants',
        title: 'Grade 4—Dental Assistant (qualified with a Certificate IV or assessed equivalent)',
        description: 'Grade 4—Dental Assistant (qualified with a Certificate IV or assessed equivalent)',
        duties: [],
        indicative_tasks: [],
        sort_order: 680,
      },
      {
        level: 69, stream: 'aboriginal_health_workers',
        title: 'Grade 5',
        description: 'Grade 5',
        duties: [],
        indicative_tasks: [],
        sort_order: 690,
      },
      {
        level: 70, stream: 'administrative',
        title: 'Grade 5',
        description: 'Grade 5',
        duties: [],
        indicative_tasks: [],
        sort_order: 700,
      },
      {
        level: 71, stream: 'administrative',
        title: 'Grade 6',
        description: 'Grade 6',
        duties: [],
        indicative_tasks: [],
        sort_order: 710,
      },
      {
        level: 72, stream: 'administrative',
        title: 'Grade 7',
        description: 'Grade 7',
        duties: [],
        indicative_tasks: [],
        sort_order: 720,
      },
      {
        level: 73, stream: 'administrative',
        title: 'Grade 8',
        description: 'Grade 8',
        duties: [],
        indicative_tasks: [],
        sort_order: 730,
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
      '1_ancillary': 26.45,
      '1_dental_oral_health_therapists': 33.46,
      '1_administrative': 38.17,
      '1_administrative': 28.91,
      '1_aboriginal_health_workers': 38.16,
      '1_aboriginal_health_workers': 35.47,
      '1_administrative': 26.65,
      '1_aboriginal_health_workers': 28.74,
      '1_aboriginal_and_or_torres_strait_islander_health_wo': 26.83,
      '1_administrative': 36.21,
      '1_administrative': 45.09,
      '1_dental_assistants': 29.12,
      '1_administrative': 31.44,
      '1_administrative': 33.44,
      '1_administrative': 43.45,
      '1_aboriginal_and_or_torres_strait_islander_health_wo': 31.27,
      '1_dental_assistants': 28.01,
      '1_dental_assistants': 29.12,
      '2_ancillary': 27.52,
      '2_dental_oral_health_therapists': 34.33,
      '2_aboriginal_health_workers': 39.05,
      '2_administrative': 36.96,
      '2_administrative': 38.88,
      '2_administrative': 46.24,
      '2_administrative': 44.63,
      '2_aboriginal_and_or_torres_strait_islander_health_wo': 32.91,
      '2_administrative': 26.74,
      '2_aboriginal_health_workers': 29.72,
      '2_administrative': 29.42,
      '2_aboriginal_health_workers': 36.43,
      '2_administrative': 32,
      '2_administrative': 34.24,
      '2_dental_assistants': 28.56,
      '2_dental_assistants': 30.93,
      '2_dental_assistants': 30.93,
      '3_ancillary': 28.24,
      '3_dental_oral_health_therapists': 36.8,
      '3_administrative': 34.86,
      '3_administrative': 32.34,
      '3_aboriginal_and_or_torres_strait_islander_health_wo': 37.27,
      '3_administrative': 29.93,
      '3_aboriginal_health_workers': 34.51,
      '3_aboriginal_and_or_torres_strait_islander_health_wo': 40,
      '3_dental_assistants': 31.98,
      '3_dental_assistants': 31.98,
      '4_dental_oral_health_therapists': 41.77,
      '4_administrative': 48.93,
      '4_administrative': 30.36,
      '4_administrative': 35.5,
      '4_administrative': 41.22,
      '4_administrative': 27.67,
      '4_administrative': 32.93,
      '5_administrative': 28.47,
      '5_administrative': 42.44,
      '5_administrative': 30.88,
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
        description: 'Shiftworkers - Saturday — Full-time ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Shiftworkers - Sunday — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees - Public holiday — Full-time ×2.5',
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
        description: 'Shiftworkers - Saturday — Part-time ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Shiftworkers - Sunday — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'All employees - Public holiday — Part-time ×2.5',
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
        description: 'Shiftworkers - Saturday — Casual ×1.75',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.25, addition_per_hour: null,
        description: 'Shiftworkers - Sunday — Casual ×2.25',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'All employees - Public holiday — Casual ×1.5',
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
        allowance_type: 'uniform',
        name: 'Clothing allowance—Laundry allowance—Per day or part thereof',
        description: 'Clothing allowance—Laundry allowance—Per day or part thereof',
        trigger_condition: 'As per award conditions',
        amount: 0.26, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Clothing allowance—Laundry allowance—Per week',
        description: 'Clothing allowance—Laundry allowance—Per week',
        trigger_condition: 'As per award conditions',
        amount: 1.29, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'uniform',
        name: 'Clothing allowance—Laundry allowance—the lesser of:',
        description: 'Clothing allowance—Laundry allowance—the lesser of:',
        trigger_condition: 'As per award conditions',
        amount: null, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Clothing allowance—Uniform allowance—Per day or part thereof',
        description: 'Clothing allowance—Uniform allowance—Per day or part thereof',
        trigger_condition: 'As per award conditions',
        amount: 1.2, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Clothing allowance—Uniform allowance—Per week',
        description: 'Clothing allowance—Uniform allowance—Per week',
        trigger_condition: 'As per award conditions',
        amount: 5.92, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'uniform',
        name: 'Clothing allowance—Uniform allowance—the lesser of:',
        description: 'Clothing allowance—Uniform allowance—the lesser of:',
        trigger_condition: 'As per award conditions',
        amount: null, amount_type: 'fixed', per_unit: 'per_shift',
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
          { answer_key: 'ancillary', answer_text: 'Ancillary', sort_order: 1 },
          { answer_key: 'dental_oral_health_therapists', answer_text: 'Dental Oral Health Therapists', sort_order: 2 },
          { answer_key: 'administrative', answer_text: 'Administrative', sort_order: 3 },
          { answer_key: 'aboriginal_health_workers', answer_text: 'Aboriginal Health Workers', sort_order: 4 },
          { answer_key: 'aboriginal_and_or_torres_strait_islander_health_wo', answer_text: 'Aboriginal And Or Torres Strait Islander Health Wo', sort_order: 5 },
          { answer_key: 'dental_assistants', answer_text: 'Dental Assistants', sort_order: 6 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a115_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Cleaner', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Driver—Grade 1', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Caretaker', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Grade 4—7th year+', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Level 5', sort_order: 5 },
          { answer_key: 'level_58', answer_text: 'Grade 1', sort_order: 6 },
          { answer_key: 'level_59', answer_text: 'Grade 1', sort_order: 7 },
          { answer_key: 'level_60', answer_text: 'Grade 2', sort_order: 8 },
          { answer_key: 'level_61', answer_text: 'Grade 2', sort_order: 9 },
          { answer_key: 'level_62', answer_text: 'Grade 2—Dental Assistant (unqualified)', sort_order: 10 },
          { answer_key: 'level_63', answer_text: 'Grade 3', sort_order: 11 },
          { answer_key: 'level_64', answer_text: 'Grade 3', sort_order: 12 },
          { answer_key: 'level_65', answer_text: 'Grade 3—Dental Assistant (qualified with a Certificate III or assessed equivalent)', sort_order: 13 },
          { answer_key: 'level_66', answer_text: 'Grade 4', sort_order: 14 },
          { answer_key: 'level_67', answer_text: 'Grade 4', sort_order: 15 },
          { answer_key: 'level_68', answer_text: 'Grade 4—Dental Assistant (qualified with a Certificate IV or assessed equivalent)', sort_order: 16 },
          { answer_key: 'level_69', answer_text: 'Grade 5', sort_order: 17 },
          { answer_key: 'level_70', answer_text: 'Grade 5', sort_order: 18 },
          { answer_key: 'level_71', answer_text: 'Grade 6', sort_order: 19 },
          { answer_key: 'level_72', answer_text: 'Grade 7', sort_order: 20 },
          { answer_key: 'level_73', answer_text: 'Grade 8', sort_order: 21 },
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
