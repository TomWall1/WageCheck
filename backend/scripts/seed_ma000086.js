/**
 * Seed script — Maritime Offshore Oil and Gas Award 2020 [MA000086]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWO Pay Guide published 25 June 2025.
 *
 * Run after migrate.js: node scripts/seed_ma000086.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000086';
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
      'Maritime Offshore Oil and Gas Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000086-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Vessel types from the PDF:
    //   facilities, support_vessels_div1, support_vessels_div2, supply_vessels,
    //   standby_utility_vessels, semi_submersible, drill_ships,
    //   seismic_survey, non_propelled_modu, nw_shelf_mary_anne,
    //   nw_shelf_utility, nw_shelf_mooring
    //
    // Each vessel type has its own set of roles with specific hourly rates.
    // This is full-time & relief employment only (no casual in this award).

    const classifications = [
      // Facilities
      { level: 1, stream: 'facilities', title: 'Master', description: 'Master on facilities', sort_order: 10 },
      { level: 2, stream: 'facilities', title: 'Facility master', description: 'Facility master on facilities', sort_order: 20 },
      { level: 3, stream: 'facilities', title: 'Chief engineer', description: 'Chief engineer on facilities', sort_order: 30 },
      { level: 4, stream: 'facilities', title: 'Chief officer', description: 'Chief officer on facilities', sort_order: 40 },
      { level: 5, stream: 'facilities', title: 'Second officer', description: 'Second officer on facilities', sort_order: 50 },
      { level: 6, stream: 'facilities', title: 'First engineer', description: 'First engineer (previously Second engineer) on facilities', sort_order: 60 },
      { level: 7, stream: 'facilities', title: 'Second engineer', description: 'Second engineer (previously Third engineer) on facilities', sort_order: 70 },
      { level: 8, stream: 'facilities', title: 'Electrical engineer', description: 'Electrical engineer on facilities', sort_order: 80 },
      { level: 9, stream: 'facilities', title: 'Deck / communication officer', description: 'Deck / communication officer on facilities', sort_order: 90 },
      { level: 10, stream: 'facilities', title: 'Chief integrated rating', description: 'Chief integrated rating on facilities', sort_order: 100 },
      { level: 11, stream: 'facilities', title: 'Integrated rating', description: 'Integrated rating on facilities', sort_order: 110 },
      { level: 12, stream: 'facilities', title: 'Chief cook / Chief caterer', description: 'Chief cook / Chief caterer on facilities', sort_order: 120 },
      { level: 13, stream: 'facilities', title: 'Cook', description: 'Cook on facilities', sort_order: 130 },
      { level: 14, stream: 'facilities', title: 'Chief steward', description: 'Chief steward on facilities', sort_order: 140 },
      { level: 15, stream: 'facilities', title: 'Caterer', description: 'Caterer on facilities', sort_order: 150 },

      // Support vessels — Division 1 (64 metres or less)
      { level: 1, stream: 'support_vessels_div1', title: 'Master', description: 'Master on support vessel Division 1', sort_order: 160 },
      { level: 2, stream: 'support_vessels_div1', title: 'First mate', description: 'First mate on support vessel Division 1', sort_order: 170 },
      { level: 3, stream: 'support_vessels_div1', title: 'Second mate', description: 'Second mate on support vessel Division 1', sort_order: 180 },
      { level: 4, stream: 'support_vessels_div1', title: 'Chief engineer', description: 'Chief engineer on support vessel Division 1', sort_order: 190 },
      { level: 5, stream: 'support_vessels_div1', title: 'First engineer', description: 'First engineer on support vessel Division 1', sort_order: 200 },
      { level: 6, stream: 'support_vessels_div1', title: 'Second engineer', description: 'Second engineer on support vessel Division 1', sort_order: 210 },
      { level: 7, stream: 'support_vessels_div1', title: 'Integrated rating', description: 'Integrated rating on support vessel Division 1', sort_order: 220 },

      // Support vessels — Division 2 (more than 64 metres)
      { level: 1, stream: 'support_vessels_div2', title: 'Master', description: 'Master on support vessel Division 2', sort_order: 230 },
      { level: 2, stream: 'support_vessels_div2', title: 'First mate', description: 'First mate on support vessel Division 2', sort_order: 240 },
      { level: 3, stream: 'support_vessels_div2', title: 'Second mate', description: 'Second mate on support vessel Division 2', sort_order: 250 },
      { level: 4, stream: 'support_vessels_div2', title: 'Chief engineer', description: 'Chief engineer on support vessel Division 2', sort_order: 260 },
      { level: 5, stream: 'support_vessels_div2', title: 'First engineer', description: 'First engineer on support vessel Division 2', sort_order: 270 },
      { level: 6, stream: 'support_vessels_div2', title: 'Second engineer', description: 'Second engineer on support vessel Division 2', sort_order: 280 },
      { level: 7, stream: 'support_vessels_div2', title: 'Integrated rating', description: 'Integrated rating on support vessel Division 2', sort_order: 290 },

      // Supply vessels
      { level: 1, stream: 'supply_vessels', title: 'Master', description: 'Master on supply vessel', sort_order: 300 },
      { level: 2, stream: 'supply_vessels', title: 'Chief engineer', description: 'Chief engineer on supply vessel', sort_order: 310 },
      { level: 3, stream: 'supply_vessels', title: 'First mate / First engineer', description: 'First mate / First engineer on supply vessel', sort_order: 320 },
      { level: 4, stream: 'supply_vessels', title: 'Second mate / Second engineer', description: 'Second mate / Second engineer on supply vessel', sort_order: 330 },
      { level: 5, stream: 'supply_vessels', title: 'Integrated rating', description: 'Integrated rating on supply vessel', sort_order: 340 },

      // Stand-by / utility vessels
      { level: 1, stream: 'standby_utility_vessels', title: 'Master', description: 'Master on stand-by / utility vessel', sort_order: 350 },
      { level: 2, stream: 'standby_utility_vessels', title: 'Chief engineer', description: 'Chief engineer on stand-by / utility vessel', sort_order: 360 },
      { level: 3, stream: 'standby_utility_vessels', title: 'First mate / First engineer', description: 'First mate / First engineer on stand-by / utility vessel', sort_order: 370 },
      { level: 4, stream: 'standby_utility_vessels', title: 'Integrated rating', description: 'Integrated rating on stand-by / utility vessel', sort_order: 380 },

      // Self-propelled drilling vessels — semi-submersible
      { level: 1, stream: 'semi_submersible', title: 'Master', description: 'Master on semi-submersible', sort_order: 390 },
      { level: 2, stream: 'semi_submersible', title: 'First mate', description: 'First mate on semi-submersible', sort_order: 400 },
      { level: 3, stream: 'semi_submersible', title: 'Second mate', description: 'Second mate on semi-submersible', sort_order: 410 },
      { level: 4, stream: 'semi_submersible', title: 'Radio officer', description: 'Radio officer on semi-submersible', sort_order: 420 },
      { level: 5, stream: 'semi_submersible', title: 'Chief engineer', description: 'Chief engineer on semi-submersible', sort_order: 430 },
      { level: 6, stream: 'semi_submersible', title: 'First engineer', description: 'First engineer on semi-submersible', sort_order: 440 },
      { level: 7, stream: 'semi_submersible', title: 'Second engineer', description: 'Second engineer on semi-submersible', sort_order: 450 },
      { level: 8, stream: 'semi_submersible', title: 'Marine electrician', description: 'Marine electrician on semi-submersible', sort_order: 460 },
      { level: 9, stream: 'semi_submersible', title: 'Bosun / chief integrated rating', description: 'Bosun / chief integrated rating on semi-submersible', sort_order: 470 },
      { level: 10, stream: 'semi_submersible', title: 'Bosun\'s mate', description: 'Bosun\'s mate on semi-submersible', sort_order: 480 },
      { level: 11, stream: 'semi_submersible', title: 'Integrated rating', description: 'Integrated rating on semi-submersible', sort_order: 490 },
      { level: 12, stream: 'semi_submersible', title: 'Provisional integrated rating — under 18', description: 'Provisional integrated rating — under 18 years on semi-submersible', sort_order: 500 },
      { level: 13, stream: 'semi_submersible', title: 'Provisional integrated rating — 18+', description: 'Provisional integrated rating — 18 years or above on semi-submersible', sort_order: 510 },
      { level: 14, stream: 'semi_submersible', title: 'Chief cook / Chief caterer', description: 'Chief cook / Chief caterer on semi-submersible', sort_order: 520 },
      { level: 15, stream: 'semi_submersible', title: 'Second cook', description: 'Second cook on semi-submersible', sort_order: 530 },
      { level: 16, stream: 'semi_submersible', title: 'Caterer', description: 'Caterer on semi-submersible', sort_order: 540 },

      // Self-propelled drilling vessels — drill ships
      { level: 1, stream: 'drill_ships', title: 'Master', description: 'Master on drill ship', sort_order: 550 },
      { level: 2, stream: 'drill_ships', title: 'First mate', description: 'First mate on drill ship', sort_order: 560 },
      { level: 3, stream: 'drill_ships', title: 'Second mate', description: 'Second mate on drill ship', sort_order: 570 },
      { level: 4, stream: 'drill_ships', title: 'Radio officer', description: 'Radio officer on drill ship', sort_order: 580 },
      { level: 5, stream: 'drill_ships', title: 'Chief engineer', description: 'Chief engineer on drill ship', sort_order: 590 },
      { level: 6, stream: 'drill_ships', title: 'First engineer', description: 'First engineer on drill ship', sort_order: 600 },
      { level: 7, stream: 'drill_ships', title: 'Second engineer', description: 'Second engineer on drill ship', sort_order: 610 },
      { level: 8, stream: 'drill_ships', title: 'Marine electrician', description: 'Marine electrician on drill ship', sort_order: 620 },
      { level: 9, stream: 'drill_ships', title: 'Bosun / chief integrated rating', description: 'Bosun / chief integrated rating on drill ship', sort_order: 630 },
      { level: 10, stream: 'drill_ships', title: 'Bosun\'s mate', description: 'Bosun\'s mate on drill ship', sort_order: 640 },
      { level: 11, stream: 'drill_ships', title: 'Integrated rating', description: 'Integrated rating on drill ship', sort_order: 650 },
      { level: 12, stream: 'drill_ships', title: 'Provisional integrated rating — under 18', description: 'Provisional integrated rating — under 18 years on drill ship', sort_order: 660 },
      { level: 13, stream: 'drill_ships', title: 'Provisional integrated rating — 18+', description: 'Provisional integrated rating — 18 years or above on drill ship', sort_order: 670 },
      { level: 14, stream: 'drill_ships', title: 'Chief cook / Chief caterer', description: 'Chief cook / Chief caterer on drill ship', sort_order: 680 },
      { level: 15, stream: 'drill_ships', title: 'Second cook', description: 'Second cook on drill ship', sort_order: 690 },
      { level: 16, stream: 'drill_ships', title: 'Caterer', description: 'Caterer on drill ship', sort_order: 700 },

      // Seismic survey vessels
      { level: 1, stream: 'seismic_survey', title: 'Master', description: 'Master on seismic survey vessel', sort_order: 710 },
      { level: 2, stream: 'seismic_survey', title: 'First mate / First engineer', description: 'First mate / First engineer on seismic survey vessel', sort_order: 720 },
      { level: 3, stream: 'seismic_survey', title: 'Second mate / Second engineer', description: 'Second mate / Second engineer on seismic survey vessel', sort_order: 730 },
      { level: 4, stream: 'seismic_survey', title: 'Integrated rating', description: 'Integrated rating on seismic survey vessel', sort_order: 740 },
      { level: 5, stream: 'seismic_survey', title: 'Chief cook / Chief caterer', description: 'Chief cook / Chief caterer on seismic survey vessel', sort_order: 750 },
      { level: 6, stream: 'seismic_survey', title: 'Caterer cook', description: 'Caterer cook on seismic survey vessel', sort_order: 760 },
      { level: 7, stream: 'seismic_survey', title: 'Provisional integrated rating — under 18', description: 'Provisional integrated rating — under 18 on seismic survey vessel', sort_order: 770 },
      { level: 8, stream: 'seismic_survey', title: 'Provisional integrated rating — 18+', description: 'Provisional integrated rating — 18+ on seismic survey vessel', sort_order: 780 },

      // Non-propelled MODUs under tow
      { level: 1, stream: 'non_propelled_modu', title: 'Master', description: 'Master on non-propelled MODU under tow', sort_order: 790 },
      { level: 2, stream: 'non_propelled_modu', title: 'Mate', description: 'Mate on non-propelled MODU under tow', sort_order: 800 },
      { level: 3, stream: 'non_propelled_modu', title: 'Integrated rating', description: 'Integrated rating on non-propelled MODU under tow', sort_order: 810 },

      // NW Shelf — Mary Anne tide or equivalent
      { level: 1, stream: 'nw_shelf_mary_anne', title: 'Master', description: 'Master on NW Shelf Mary Anne tide or equivalent', sort_order: 820 },
      { level: 2, stream: 'nw_shelf_mary_anne', title: 'Mate', description: 'Mate on NW Shelf Mary Anne tide or equivalent', sort_order: 830 },
      { level: 3, stream: 'nw_shelf_mary_anne', title: 'Chief engineer', description: 'Chief engineer on NW Shelf Mary Anne tide or equivalent', sort_order: 840 },
      { level: 4, stream: 'nw_shelf_mary_anne', title: 'Deckhand / Integrated rating', description: 'Deckhand / Integrated rating on NW Shelf Mary Anne tide or equivalent', sort_order: 850 },

      // NW Shelf — Utility vessels including landing barges
      { level: 1, stream: 'nw_shelf_utility', title: 'Master', description: 'Master on NW Shelf utility vessel', sort_order: 860 },
      { level: 2, stream: 'nw_shelf_utility', title: 'Mate', description: 'Mate on NW Shelf utility vessel', sort_order: 870 },
      { level: 3, stream: 'nw_shelf_utility', title: 'Chief engineer', description: 'Chief engineer on NW Shelf utility vessel', sort_order: 880 },
      { level: 4, stream: 'nw_shelf_utility', title: 'Deckhand / Integrated rating', description: 'Deckhand / Integrated rating on NW Shelf utility vessel', sort_order: 890 },

      // NW Shelf — Mooring assistant/utility vessels
      { level: 1, stream: 'nw_shelf_mooring', title: 'Master', description: 'Master on NW Shelf mooring assistant/utility vessel', sort_order: 900 },
      { level: 2, stream: 'nw_shelf_mooring', title: 'Chief engineer', description: 'Chief engineer on NW Shelf mooring assistant/utility vessel', sort_order: 910 },
      { level: 3, stream: 'nw_shelf_mooring', title: 'Mate', description: 'Mate on NW Shelf mooring assistant/utility vessel', sort_order: 920 },
      { level: 4, stream: 'nw_shelf_mooring', title: 'Deckhand / Integrated rating', description: 'Deckhand / Integrated rating on NW Shelf mooring assistant/utility vessel', sort_order: 930 },
    ];

    for (const c of classifications) {
      c.duties = c.duties || [];
      c.indicative_tasks = c.indicative_tasks || [];
    }

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
    // All rates from the FWO pay guide — full-time & relief employment only
    // This award does not have casual employment or standard casual loading
    const baseRates = {
      // Facilities
      '1_facilities':  52.60, // Master
      '2_facilities':  52.60, // Facility master
      '3_facilities':  55.15, // Chief engineer
      '4_facilities':  44.04, // Chief officer
      '5_facilities':  42.16, // Second officer
      '6_facilities':  47.51, // First engineer
      '7_facilities':  45.63, // Second engineer
      '8_facilities':  45.63, // Electrical engineer
      '9_facilities':  42.16, // Deck / communication officer
      '10_facilities': 42.82, // Chief integrated rating
      '11_facilities': 40.68, // Integrated rating
      '12_facilities': 42.82, // Chief cook / Chief caterer
      '13_facilities': 40.68, // Cook
      '14_facilities': 42.82, // Chief steward
      '15_facilities': 40.68, // Caterer

      // Support vessels — Division 1
      '1_support_vessels_div1': 47.02, // Master
      '2_support_vessels_div1': 42.35, // First mate
      '3_support_vessels_div1': 38.53, // Second mate
      '4_support_vessels_div1': 46.17, // Chief engineer
      '5_support_vessels_div1': 42.35, // First engineer
      '6_support_vessels_div1': 38.53, // Second engineer
      '7_support_vessels_div1': 32.58, // Integrated rating

      // Support vessels — Division 2
      '1_support_vessels_div2': 50.00, // Master
      '2_support_vessels_div2': 45.00, // First mate
      '3_support_vessels_div2': 40.91, // Second mate
      '4_support_vessels_div2': 49.09, // Chief engineer
      '5_support_vessels_div2': 45.00, // First engineer
      '6_support_vessels_div2': 40.91, // Second engineer
      '7_support_vessels_div2': 34.54, // Integrated rating

      // Supply vessels
      '1_supply_vessels': 44.05, // Master
      '2_supply_vessels': 43.26, // Chief engineer
      '3_supply_vessels': 39.70, // First mate / First engineer
      '4_supply_vessels': 36.15, // Second mate / Second engineer
      '5_supply_vessels': 32.58, // Integrated rating

      // Stand-by / utility vessels
      '1_standby_utility_vessels': 42.78, // Master
      '2_standby_utility_vessels': 42.01, // Chief engineer
      '3_standby_utility_vessels': 38.57, // First mate / First engineer
      '4_standby_utility_vessels': 32.58, // Integrated rating

      // Semi-submersible
      '1_semi_submersible':  47.02, // Master
      '2_semi_submersible':  42.35, // First mate
      '3_semi_submersible':  38.53, // Second mate
      '4_semi_submersible':  38.53, // Radio officer
      '5_semi_submersible':  46.17, // Chief engineer
      '6_semi_submersible':  42.35, // First engineer
      '7_semi_submersible':  38.53, // Second engineer
      '8_semi_submersible':  38.53, // Marine electrician
      '9_semi_submersible':  36.40, // Bosun / chief integrated rating
      '10_semi_submersible': 35.13, // Bosun's mate
      '11_semi_submersible': 34.28, // Integrated rating
      '12_semi_submersible': 20.09, // Provisional integrated rating — under 18
      '13_semi_submersible': 26.34, // Provisional integrated rating — 18+
      '14_semi_submersible': 36.40, // Chief cook / Chief caterer
      '15_semi_submersible': 34.28, // Second cook
      '16_semi_submersible': 34.28, // Caterer

      // Drill ships
      '1_drill_ships':  49.57, // Master
      '2_drill_ships':  44.62, // First mate
      '3_drill_ships':  40.56, // Second mate
      '4_drill_ships':  40.56, // Radio officer
      '5_drill_ships':  48.67, // Chief engineer
      '6_drill_ships':  44.62, // First engineer
      '7_drill_ships':  40.56, // Second engineer
      '8_drill_ships':  40.56, // Marine electrician
      '9_drill_ships':  38.32, // Bosun / chief integrated rating
      '10_drill_ships': 36.96, // Bosun's mate
      '11_drill_ships': 36.06, // Integrated rating
      '12_drill_ships': 20.09, // Provisional integrated rating — under 18
      '13_drill_ships': 26.34, // Provisional integrated rating — 18+
      '14_drill_ships': 38.32, // Chief cook / Chief caterer
      '15_drill_ships': 36.06, // Second cook
      '16_drill_ships': 36.06, // Caterer

      // Seismic survey vessels
      '1_seismic_survey': 47.02, // Master
      '2_seismic_survey': 46.17, // First mate / First engineer
      '3_seismic_survey': 42.35, // Second mate / Second engineer
      '4_seismic_survey': 38.53, // Integrated rating
      '5_seismic_survey': 35.55, // Chief cook / Chief caterer
      '6_seismic_survey': 32.58, // Caterer cook
      '7_seismic_survey': 19.73, // Provisional integrated rating — under 18
      '8_seismic_survey': 26.32, // Provisional integrated rating — 18+

      // Non-propelled MODUs under tow
      '1_non_propelled_modu': 47.02, // Master
      '2_non_propelled_modu': 42.35, // Mate
      '3_non_propelled_modu': 32.58, // Integrated rating

      // NW Shelf — Mary Anne tide or equivalent
      '1_nw_shelf_mary_anne': 44.05, // Master
      '2_nw_shelf_mary_anne': 39.70, // Mate
      '3_nw_shelf_mary_anne': 43.26, // Chief engineer
      '4_nw_shelf_mary_anne': 32.58, // Deckhand / Integrated rating

      // NW Shelf — Utility vessels
      '1_nw_shelf_utility': 41.92, // Master
      '2_nw_shelf_utility': 37.39, // Mate
      '3_nw_shelf_utility': 40.88, // Chief engineer
      '4_nw_shelf_utility': 32.58, // Deckhand / Integrated rating

      // NW Shelf — Mooring assistant/utility vessels
      '1_nw_shelf_mooring': 39.93, // Master
      '2_nw_shelf_mooring': 39.04, // Chief engineer
      '3_nw_shelf_mooring': 35.33, // Mate
      '4_nw_shelf_mooring': 32.58, // Deckhand / Integrated rating
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[`${cls.level}_${cls.stream}`];
      if (!baseRate) continue;

      // This award covers full-time and relief employment only
      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);
      }

      // Casual rate = base x 1.25 (standard casual loading)
      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;
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
        description: 'Ordinary weekday — full-time x1',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday / overtime — full-time x2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — full-time x2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — part-time x1',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday / overtime — part-time x2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — part-time x2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — casual x1',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday / overtime — casual x2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — casual x2.5',
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
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime (x2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — over 38 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — over 38 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime (x2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — over 38 hours (x2.0)' },
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
        allowance_type: 'accommodation',
        name: 'Accommodation allowance — living ashore',
        description: 'Accommodation allowance — employee providing own accommodation',
        trigger_condition: 'As per award conditions',
        amount: 194.35, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'hard_lying_2_berth',
        name: 'Hard-lying allowance — 2 berth cabin',
        description: 'Hard-lying allowance — not floating production facilities — 2 berth cabin',
        trigger_condition: 'As per award conditions',
        amount: 59.15, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'hard_lying_4_berth',
        name: 'Hard-lying allowance — 4 berth cabin',
        description: 'Hard-lying allowance — not floating production facilities — 4 berth cabin',
        trigger_condition: 'As per award conditions',
        amount: 94.71, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'shared_accommodation',
        name: 'Shared accommodation allowance',
        description: 'Shared accommodation allowance — not floating production facilities',
        trigger_condition: 'As per award conditions',
        amount: 47.30, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'vessel_cargo',
        name: 'Vessel temporarily engaged in carriage & handling of cargo',
        description: 'Vessel temporarily engaged in carriage & handling of cargo allowance',
        trigger_condition: 'As per award conditions',
        amount: 62.88, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'special_efforts_wrecked',
        name: 'Special efforts when vessel wrecked or stranded',
        description: 'Special efforts when vessel wrecked or stranded allowance',
        trigger_condition: 'As per award conditions',
        amount: 33.19, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'communication_floating',
        name: 'Communication allowance — floating production facilities',
        description: 'Communication allowance — floating production facilities',
        trigger_condition: 'As per award conditions',
        amount: 5.64, amount_type: 'fixed', per_unit: 'per_fortnight',
      },
      {
        allowance_type: 'living_away_study',
        name: 'Living away from home allowance — approved study',
        description: 'Living away from home allowance — employee undertaking approved study',
        trigger_condition: 'As per award conditions',
        amount: 175.90, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'living_away_study_family',
        name: 'Living away from home allowance — approved study (with family)',
        description: 'Living away from home allowance — employee with spouse/dependants undertaking approved study',
        trigger_condition: 'As per award conditions',
        amount: 248.04, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'rest_recreation',
        name: 'Rest and recreation day allowance',
        description: 'Rest and recreation day allowance — employer does not provide meals and accommodation',
        trigger_condition: 'As per award conditions',
        amount: 190.23, amount_type: 'daily', per_unit: 'per_day',
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
        question_key: 'a86_stream',
        question_text: 'What type of vessel do you work on?',
        help_text: 'Select the vessel type that matches your workplace.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'facilities', answer_text: 'Facilities', sort_order: 1 },
          { answer_key: 'support_vessels_div1', answer_text: 'Support Vessels — Division 1 (64m or less)', sort_order: 2 },
          { answer_key: 'support_vessels_div2', answer_text: 'Support Vessels — Division 2 (more than 64m)', sort_order: 3 },
          { answer_key: 'supply_vessels', answer_text: 'Supply Vessels', sort_order: 4 },
          { answer_key: 'standby_utility_vessels', answer_text: 'Stand-by / Utility Vessels', sort_order: 5 },
          { answer_key: 'semi_submersible', answer_text: 'Self-propelled Drilling — Semi-submersible', sort_order: 6 },
          { answer_key: 'drill_ships', answer_text: 'Self-propelled Drilling — Drill Ships', sort_order: 7 },
          { answer_key: 'seismic_survey', answer_text: 'Seismic Survey Vessels', sort_order: 8 },
          { answer_key: 'non_propelled_modu', answer_text: 'Non-propelled MODUs Under Tow', sort_order: 9 },
          { answer_key: 'nw_shelf_mary_anne', answer_text: 'NW Shelf — Mary Anne Tide or Equivalent', sort_order: 10 },
          { answer_key: 'nw_shelf_utility', answer_text: 'NW Shelf — Utility Vessels / Landing Barges', sort_order: 11 },
          { answer_key: 'nw_shelf_mooring', answer_text: 'NW Shelf — Mooring Assistant/Utility Vessels', sort_order: 12 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a86_role',
        question_text: 'What is your role?',
        help_text: 'Select the role that matches your position.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'master', answer_text: 'Master', sort_order: 1 },
          { answer_key: 'chief_engineer', answer_text: 'Chief Engineer', sort_order: 2 },
          { answer_key: 'first_mate', answer_text: 'First Mate', sort_order: 3 },
          { answer_key: 'first_engineer', answer_text: 'First Engineer', sort_order: 4 },
          { answer_key: 'second_mate', answer_text: 'Second Mate', sort_order: 5 },
          { answer_key: 'second_engineer', answer_text: 'Second Engineer', sort_order: 6 },
          { answer_key: 'integrated_rating', answer_text: 'Integrated Rating', sort_order: 7 },
          { answer_key: 'caterer', answer_text: 'Caterer / Cook', sort_order: 8 },
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
    console.log('\n✅ MA000086 seed complete');
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
