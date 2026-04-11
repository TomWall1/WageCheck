/**
 * Seed script — SCHADS Award 2010 [MA000100]
 * Pay rates effective 1 October 2025 (published 04 September 2025)
 * Source: FWO Pay Guide MA000100 PDF + FWC MAPD API
 *
 * Five streams:
 *   social_community     — Social and Community Services L1-L8 (27 classifications with pay points)
 *   crisis_accommodation — Crisis Accommodation L1-L4 (14 classifications with pay points)
 *   family_day_care      — Family Day Care L1-L5 (20 classifications with pay points)
 *   home_care_disability — Home Care Disability L1-L5 (9 classifications with pay points)
 *   home_care_aged       — Home Care Aged Care L1-L6 (6 classifications)
 *
 * Run after migrate.js: node scripts/seed_ma000100.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000100';
const EFFECTIVE_DATE = '2025-10-01';

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
      'Social, Community, Home Care and Disability Services Industry Award 2010',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000100.html',
    ]);

    // ── Clear existing data for this award ─────────────────────────────────────
    await client.query(`DELETE FROM classification_answers WHERE question_id IN (SELECT id FROM classification_questions WHERE award_code = $1)`, [AWARD_CODE]);
    await client.query(`DELETE FROM classification_questions WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM pay_rates WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM break_entitlements WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM classifications WHERE award_code = $1`, [AWARD_CODE]);

    // Add columns if not present (idempotent)
    await client.query(`ALTER TABLE classifications ADD COLUMN IF NOT EXISTS fwc_classification_fixed_id INTEGER`);
    await client.query(`ALTER TABLE classifications ADD COLUMN IF NOT EXISTS pay_point INTEGER NOT NULL DEFAULT 1`);

    // ══════════════════════════════════════════════════════════════════════════════
    // CLASSIFICATIONS — all 5 streams with pay points
    // Source: FWO Pay Guide MA000100 effective 01/10/2025
    // ══════════════════════════════════════════════════════════════════════════════

    // Format: { level, pay_point, stream, title, description, ft_hourly, casual_hourly, ft_afternoon, ft_night, cas_afternoon, cas_night, sort_order }
    // Afternoon shift = specific $/hr, Night shift = specific $/hr (from pay guide tables)
    // 24hr care flat rate (home care only) stored separately in pay_rates

    const classifications = [
      // ── Social and Community Services (SACS) ────────────────────────────────
      // 8 levels × 3-4 pay points = 27 classifications
      { level: 1, pp: 1, stream: 'social_community', title: 'SACS Level 1 - Pay Point 1', ft: 26.30, cas: 32.88, ft_arvo: 29.59, ft_night: 30.25, cas_arvo: 36.16, cas_night: 36.82, sort: 10 },
      { level: 1, pp: 2, stream: 'social_community', title: 'SACS Level 1 - Pay Point 2', ft: 27.15, cas: 33.94, ft_arvo: 30.54, ft_night: 31.22, cas_arvo: 37.33, cas_night: 38.01, sort: 11 },
      { level: 1, pp: 3, stream: 'social_community', title: 'SACS Level 1 - Pay Point 3', ft: 28.12, cas: 35.15, ft_arvo: 31.64, ft_night: 32.34, cas_arvo: 38.67, cas_night: 39.37, sort: 12 },
      { level: 2, pp: 1, stream: 'social_community', title: 'SACS Level 2 - Pay Point 1', ft: 34.58, cas: 43.23, ft_arvo: 38.90, ft_night: 39.77, cas_arvo: 47.55, cas_night: 48.41, sort: 20 },
      { level: 2, pp: 2, stream: 'social_community', title: 'SACS Level 2 - Pay Point 2', ft: 35.67, cas: 44.59, ft_arvo: 40.13, ft_night: 41.02, cas_arvo: 49.05, cas_night: 49.94, sort: 21 },
      { level: 2, pp: 3, stream: 'social_community', title: 'SACS Level 2 - Pay Point 3', ft: 36.75, cas: 45.94, ft_arvo: 41.34, ft_night: 42.26, cas_arvo: 50.53, cas_night: 51.45, sort: 22 },
      { level: 2, pp: 4, stream: 'social_community', title: 'SACS Level 2 - Pay Point 4', ft: 37.73, cas: 47.16, ft_arvo: 42.45, ft_night: 43.39, cas_arvo: 51.88, cas_night: 52.82, sort: 23 },
      { level: 3, pp: 1, stream: 'social_community', title: 'SACS Level 3 - Pay Point 1', ft: 38.65, cas: 48.31, ft_arvo: 43.48, ft_night: 44.45, cas_arvo: 53.14, cas_night: 54.11, sort: 30 },
      { level: 3, pp: 2, stream: 'social_community', title: 'SACS Level 3 - Pay Point 2', ft: 39.77, cas: 49.71, ft_arvo: 44.74, ft_night: 45.74, cas_arvo: 54.68, cas_night: 55.68, sort: 31 },
      { level: 3, pp: 3, stream: 'social_community', title: 'SACS Level 3 - Pay Point 3', ft: 40.62, cas: 50.78, ft_arvo: 45.70, ft_night: 46.71, cas_arvo: 55.85, cas_night: 56.87, sort: 32 },
      { level: 3, pp: 4, stream: 'social_community', title: 'SACS Level 3 - Pay Point 4', ft: 41.45, cas: 51.81, ft_arvo: 46.63, ft_night: 47.67, cas_arvo: 56.99, cas_night: 58.03, sort: 33 },
      { level: 4, pp: 1, stream: 'social_community', title: 'SACS Level 4 - Pay Point 1', ft: 44.58, cas: 55.73, ft_arvo: 50.15, ft_night: 51.27, cas_arvo: 61.30, cas_night: 62.41, sort: 40 },
      { level: 4, pp: 2, stream: 'social_community', title: 'SACS Level 4 - Pay Point 2', ft: 45.75, cas: 57.19, ft_arvo: 51.47, ft_night: 52.61, cas_arvo: 62.91, cas_night: 64.05, sort: 41 },
      { level: 4, pp: 3, stream: 'social_community', title: 'SACS Level 4 - Pay Point 3', ft: 46.93, cas: 58.66, ft_arvo: 52.80, ft_night: 53.97, cas_arvo: 64.53, cas_night: 65.70, sort: 42 },
      { level: 4, pp: 4, stream: 'social_community', title: 'SACS Level 4 - Pay Point 4', ft: 47.97, cas: 59.96, ft_arvo: 53.97, ft_night: 55.17, cas_arvo: 65.96, cas_night: 67.16, sort: 43 },
      { level: 5, pp: 1, stream: 'social_community', title: 'SACS Level 5 - Pay Point 1', ft: 51.00, cas: 63.75, ft_arvo: 57.38, ft_night: 58.65, cas_arvo: 70.13, cas_night: 71.40, sort: 50 },
      { level: 5, pp: 2, stream: 'social_community', title: 'SACS Level 5 - Pay Point 2', ft: 52.10, cas: 65.13, ft_arvo: 58.61, ft_night: 59.92, cas_arvo: 71.64, cas_night: 72.94, sort: 51 },
      { level: 5, pp: 3, stream: 'social_community', title: 'SACS Level 5 - Pay Point 3', ft: 53.31, cas: 66.64, ft_arvo: 59.97, ft_night: 61.31, cas_arvo: 73.30, cas_night: 74.63, sort: 52 },
      { level: 6, pp: 1, stream: 'social_community', title: 'SACS Level 6 - Pay Point 1', ft: 55.72, cas: 69.65, ft_arvo: 62.69, ft_night: 64.08, cas_arvo: 76.62, cas_night: 78.01, sort: 60 },
      { level: 6, pp: 2, stream: 'social_community', title: 'SACS Level 6 - Pay Point 2', ft: 56.95, cas: 71.19, ft_arvo: 64.07, ft_night: 65.49, cas_arvo: 78.31, cas_night: 79.73, sort: 61 },
      { level: 6, pp: 3, stream: 'social_community', title: 'SACS Level 6 - Pay Point 3', ft: 58.19, cas: 72.74, ft_arvo: 65.46, ft_night: 66.92, cas_arvo: 80.01, cas_night: 81.47, sort: 62 },
      { level: 7, pp: 1, stream: 'social_community', title: 'SACS Level 7 - Pay Point 1', ft: 60.27, cas: 75.34, ft_arvo: 67.80, ft_night: 69.31, cas_arvo: 82.87, cas_night: 84.38, sort: 70 },
      { level: 7, pp: 2, stream: 'social_community', title: 'SACS Level 7 - Pay Point 2', ft: 61.53, cas: 76.91, ft_arvo: 69.22, ft_night: 70.76, cas_arvo: 84.60, cas_night: 86.14, sort: 71 },
      { level: 7, pp: 3, stream: 'social_community', title: 'SACS Level 7 - Pay Point 3', ft: 62.79, cas: 78.49, ft_arvo: 70.64, ft_night: 72.21, cas_arvo: 86.34, cas_night: 87.91, sort: 72 },
      { level: 8, pp: 1, stream: 'social_community', title: 'SACS Level 8 - Pay Point 1', ft: 65.39, cas: 81.74, ft_arvo: 73.56, ft_night: 75.20, cas_arvo: 89.91, cas_night: 91.55, sort: 80 },
      { level: 8, pp: 2, stream: 'social_community', title: 'SACS Level 8 - Pay Point 2', ft: 66.67, cas: 83.34, ft_arvo: 75.00, ft_night: 76.67, cas_arvo: 91.67, cas_night: 93.34, sort: 81 },
      { level: 8, pp: 3, stream: 'social_community', title: 'SACS Level 8 - Pay Point 3', ft: 67.96, cas: 84.95, ft_arvo: 76.46, ft_night: 78.15, cas_arvo: 93.45, cas_night: 95.14, sort: 82 },

      // ── Crisis Accommodation ────────────────────────────────────────────────
      // 4 levels × 3-4 pay points = 14 classifications
      { level: 1, pp: 1, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 1 - Pay Point 1', ft: 38.65, cas: 48.31, ft_arvo: 43.48, ft_night: 44.45, cas_arvo: 53.14, cas_night: 54.11, sort: 110 },
      { level: 1, pp: 2, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 1 - Pay Point 2', ft: 39.77, cas: 49.71, ft_arvo: 44.74, ft_night: 45.74, cas_arvo: 54.68, cas_night: 55.68, sort: 111 },
      { level: 1, pp: 3, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 1 - Pay Point 3', ft: 40.62, cas: 50.78, ft_arvo: 45.70, ft_night: 46.71, cas_arvo: 55.85, cas_night: 56.87, sort: 112 },
      { level: 1, pp: 4, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 1 - Pay Point 4', ft: 41.45, cas: 51.81, ft_arvo: 46.63, ft_night: 47.67, cas_arvo: 56.99, cas_night: 58.03, sort: 113 },
      { level: 2, pp: 1, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 2 - Pay Point 1', ft: 44.58, cas: 55.73, ft_arvo: 50.15, ft_night: 51.27, cas_arvo: 61.30, cas_night: 62.41, sort: 120 },
      { level: 2, pp: 2, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 2 - Pay Point 2', ft: 45.75, cas: 57.19, ft_arvo: 51.47, ft_night: 52.61, cas_arvo: 62.91, cas_night: 64.05, sort: 121 },
      { level: 2, pp: 3, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 2 - Pay Point 3', ft: 46.93, cas: 58.66, ft_arvo: 52.80, ft_night: 53.97, cas_arvo: 64.53, cas_night: 65.70, sort: 122 },
      { level: 2, pp: 4, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 2 - Pay Point 4', ft: 47.97, cas: 59.96, ft_arvo: 53.97, ft_night: 55.17, cas_arvo: 65.96, cas_night: 67.16, sort: 123 },
      { level: 3, pp: 1, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 3 - Pay Point 1', ft: 51.00, cas: 63.75, ft_arvo: 57.38, ft_night: 58.65, cas_arvo: 70.13, cas_night: 71.40, sort: 130 },
      { level: 3, pp: 2, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 3 - Pay Point 2', ft: 52.10, cas: 65.13, ft_arvo: 58.61, ft_night: 59.92, cas_arvo: 71.64, cas_night: 72.94, sort: 131 },
      { level: 3, pp: 3, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 3 - Pay Point 3', ft: 53.31, cas: 66.64, ft_arvo: 59.97, ft_night: 61.31, cas_arvo: 73.30, cas_night: 74.63, sort: 132 },
      { level: 4, pp: 1, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 4 - Pay Point 1', ft: 55.72, cas: 69.65, ft_arvo: 62.69, ft_night: 64.08, cas_arvo: 76.62, cas_night: 78.01, sort: 140 },
      { level: 4, pp: 2, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 4 - Pay Point 2', ft: 56.95, cas: 71.19, ft_arvo: 64.07, ft_night: 65.49, cas_arvo: 78.31, cas_night: 79.73, sort: 141 },
      { level: 4, pp: 3, stream: 'crisis_accommodation', title: 'Crisis Accommodation Level 4 - Pay Point 3', ft: 58.19, cas: 72.74, ft_arvo: 65.46, ft_night: 66.92, cas_arvo: 80.01, cas_night: 81.47, sort: 142 },

      // ── Family Day Care ─────────────────────────────────────────────────────
      // 5 levels × 4 pay points = 20 classifications
      { level: 1, pp: 1, stream: 'family_day_care', title: 'Family Day Care Level 1 - Pay Point 1', ft: 26.33, cas: 32.91, ft_arvo: 29.62, ft_night: 30.28, cas_arvo: 36.20, cas_night: 36.86, sort: 210 },
      { level: 1, pp: 2, stream: 'family_day_care', title: 'Family Day Care Level 1 - Pay Point 2', ft: 27.18, cas: 33.98, ft_arvo: 30.58, ft_night: 31.26, cas_arvo: 37.37, cas_night: 38.05, sort: 211 },
      { level: 1, pp: 3, stream: 'family_day_care', title: 'Family Day Care Level 1 - Pay Point 3', ft: 28.16, cas: 35.20, ft_arvo: 31.68, ft_night: 32.38, cas_arvo: 38.72, cas_night: 39.42, sort: 212 },
      { level: 1, pp: 4, stream: 'family_day_care', title: 'Family Day Care Level 1 - Pay Point 4', ft: 29.11, cas: 36.39, ft_arvo: 32.75, ft_night: 33.48, cas_arvo: 40.03, cas_night: 40.75, sort: 213 },
      { level: 2, pp: 1, stream: 'family_day_care', title: 'Family Day Care Level 2 - Pay Point 1', ft: 29.94, cas: 37.43, ft_arvo: 33.68, ft_night: 34.43, cas_arvo: 41.17, cas_night: 41.92, sort: 220 },
      { level: 2, pp: 2, stream: 'family_day_care', title: 'Family Day Care Level 2 - Pay Point 2', ft: 30.91, cas: 38.64, ft_arvo: 34.77, ft_night: 35.55, cas_arvo: 42.50, cas_night: 43.27, sort: 221 },
      { level: 2, pp: 3, stream: 'family_day_care', title: 'Family Day Care Level 2 - Pay Point 3', ft: 31.89, cas: 39.86, ft_arvo: 35.88, ft_night: 36.67, cas_arvo: 43.85, cas_night: 44.65, sort: 222 },
      { level: 2, pp: 4, stream: 'family_day_care', title: 'Family Day Care Level 2 - Pay Point 4', ft: 32.65, cas: 40.81, ft_arvo: 36.73, ft_night: 37.55, cas_arvo: 44.89, cas_night: 45.71, sort: 223 },
      { level: 3, pp: 1, stream: 'family_day_care', title: 'Family Day Care Level 3 - Pay Point 1', ft: 33.48, cas: 41.85, ft_arvo: 37.67, ft_night: 38.50, cas_arvo: 46.04, cas_night: 46.87, sort: 230 },
      { level: 3, pp: 2, stream: 'family_day_care', title: 'Family Day Care Level 3 - Pay Point 2', ft: 34.52, cas: 43.15, ft_arvo: 38.84, ft_night: 39.70, cas_arvo: 47.47, cas_night: 48.33, sort: 231 },
      { level: 3, pp: 3, stream: 'family_day_care', title: 'Family Day Care Level 3 - Pay Point 3', ft: 35.59, cas: 44.49, ft_arvo: 40.04, ft_night: 40.93, cas_arvo: 48.94, cas_night: 49.83, sort: 232 },
      { level: 3, pp: 4, stream: 'family_day_care', title: 'Family Day Care Level 3 - Pay Point 4', ft: 36.57, cas: 45.71, ft_arvo: 41.14, ft_night: 42.06, cas_arvo: 50.28, cas_night: 51.20, sort: 233 },
      { level: 4, pp: 1, stream: 'family_day_care', title: 'Family Day Care Level 4 - Pay Point 1', ft: 37.62, cas: 47.03, ft_arvo: 42.32, ft_night: 43.26, cas_arvo: 51.73, cas_night: 52.67, sort: 240 },
      { level: 4, pp: 2, stream: 'family_day_care', title: 'Family Day Care Level 4 - Pay Point 2', ft: 38.02, cas: 47.53, ft_arvo: 42.77, ft_night: 43.72, cas_arvo: 52.28, cas_night: 53.23, sort: 241 },
      { level: 4, pp: 3, stream: 'family_day_care', title: 'Family Day Care Level 4 - Pay Point 3', ft: 38.91, cas: 48.64, ft_arvo: 43.77, ft_night: 44.75, cas_arvo: 53.50, cas_night: 54.47, sort: 242 },
      { level: 4, pp: 4, stream: 'family_day_care', title: 'Family Day Care Level 4 - Pay Point 4', ft: 39.55, cas: 49.44, ft_arvo: 44.49, ft_night: 45.48, cas_arvo: 54.38, cas_night: 55.37, sort: 243 },
      { level: 5, pp: 1, stream: 'family_day_care', title: 'Family Day Care Level 5 - Pay Point 1', ft: 42.38, cas: 52.98, ft_arvo: 47.68, ft_night: 48.74, cas_arvo: 58.27, cas_night: 59.33, sort: 250 },
      { level: 5, pp: 2, stream: 'family_day_care', title: 'Family Day Care Level 5 - Pay Point 2', ft: 43.56, cas: 54.45, ft_arvo: 49.01, ft_night: 50.09, cas_arvo: 59.90, cas_night: 60.98, sort: 251 },
      { level: 5, pp: 3, stream: 'family_day_care', title: 'Family Day Care Level 5 - Pay Point 3', ft: 44.74, cas: 55.93, ft_arvo: 50.33, ft_night: 51.45, cas_arvo: 61.52, cas_night: 62.64, sort: 252 },
      { level: 5, pp: 4, stream: 'family_day_care', title: 'Family Day Care Level 5 - Pay Point 4', ft: 45.91, cas: 57.39, ft_arvo: 51.65, ft_night: 52.80, cas_arvo: 63.13, cas_night: 64.27, sort: 253 },

      // ── Home Care — Disability ──────────────────────────────────────────────
      // 5 levels × 1-2 pay points = 9 classifications
      { level: 1, pp: 1, stream: 'home_care_disability', title: 'HC Disability Level 1 - Pay Point 1', ft: 26.05, cas: 32.56, ft_arvo: 29.31, ft_night: 29.96, cas_arvo: 35.82, cas_night: 36.47, sort: 310, ft_24hr: 323.04, cas_24hr: 375.12 },
      { level: 2, pp: 1, stream: 'home_care_disability', title: 'HC Disability Level 2 - Pay Point 1', ft: 27.55, cas: 34.44, ft_arvo: 30.99, ft_night: 31.68, cas_arvo: 37.88, cas_night: 38.57, sort: 320, ft_24hr: 341.60, cas_24hr: 396.72 },
      { level: 2, pp: 2, stream: 'home_care_disability', title: 'HC Disability Level 2 - Pay Point 2', ft: 27.74, cas: 34.68, ft_arvo: 31.21, ft_night: 31.90, cas_arvo: 38.14, cas_night: 38.84, sort: 321, ft_24hr: 344.00, cas_24hr: 399.44 },
      { level: 3, pp: 1, stream: 'home_care_disability', title: 'HC Disability Level 3 - Pay Point 1', ft: 28.12, cas: 35.15, ft_arvo: 31.64, ft_night: 32.34, cas_arvo: 38.67, cas_night: 39.37, sort: 330, ft_24hr: 348.72, cas_24hr: 404.96 },
      { level: 3, pp: 2, stream: 'home_care_disability', title: 'HC Disability Level 3 - Pay Point 2', ft: 28.98, cas: 36.23, ft_arvo: 32.60, ft_night: 33.33, cas_arvo: 39.85, cas_night: 40.57, sort: 331, ft_24hr: 359.36, cas_24hr: 417.28 },
      { level: 4, pp: 1, stream: 'home_care_disability', title: 'HC Disability Level 4 - Pay Point 1', ft: 30.67, cas: 38.34, ft_arvo: 34.50, ft_night: 35.27, cas_arvo: 42.17, cas_night: 42.94, sort: 340, ft_24hr: 380.32, cas_24hr: 441.68 },
      { level: 4, pp: 2, stream: 'home_care_disability', title: 'HC Disability Level 4 - Pay Point 2', ft: 31.29, cas: 39.11, ft_arvo: 35.20, ft_night: 35.98, cas_arvo: 43.02, cas_night: 43.81, sort: 341, ft_24hr: 388.00, cas_24hr: 450.56 },
      { level: 5, pp: 1, stream: 'home_care_disability', title: 'HC Disability Level 5 - Pay Point 1', ft: 32.89, cas: 41.11, ft_arvo: 37.00, ft_night: 37.82, cas_arvo: 45.22, cas_night: 46.05, sort: 350, ft_24hr: 407.84, cas_24hr: 473.60 },
      { level: 5, pp: 2, stream: 'home_care_disability', title: 'HC Disability Level 5 - Pay Point 2', ft: 34.19, cas: 42.74, ft_arvo: 38.46, ft_night: 39.32, cas_arvo: 47.01, cas_night: 47.87, sort: 351, ft_24hr: 423.92, cas_24hr: 492.32 },

      // ── Home Care — Aged Care ───────────────────────────────────────────────
      // 6 levels × 1 pay point = 6 classifications
      { level: 1, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Introductory', ft: 31.13, cas: 38.91, ft_arvo: 35.02, ft_night: 35.80, cas_arvo: 42.80, cas_night: 43.58, sort: 410, ft_24hr: 386.00, cas_24hr: 448.24 },
      { level: 2, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Home Carer', ft: 32.86, cas: 41.08, ft_arvo: 36.97, ft_night: 37.79, cas_arvo: 45.18, cas_night: 46.00, sort: 420, ft_24hr: 407.44, cas_24hr: 473.20 },
      { level: 3, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Qualified', ft: 34.59, cas: 43.24, ft_arvo: 38.91, ft_night: 39.78, cas_arvo: 47.56, cas_night: 48.43, sort: 430, ft_24hr: 428.88, cas_24hr: 498.08 },
      { level: 4, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Senior', ft: 35.97, cas: 44.96, ft_arvo: 40.47, ft_night: 41.37, cas_arvo: 49.46, cas_night: 50.36, sort: 440, ft_24hr: 446.00, cas_24hr: 518.00 },
      { level: 5, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Specialist', ft: 37.35, cas: 46.69, ft_arvo: 42.02, ft_night: 42.95, cas_arvo: 51.36, cas_night: 52.29, sort: 450, ft_24hr: 463.12, cas_24hr: 537.84 },
      { level: 6, pp: 1, stream: 'home_care_aged', title: 'HC Aged Care - Team Leader', ft: 38.74, cas: 48.43, ft_arvo: 43.58, ft_night: 44.55, cas_arvo: 53.27, cas_night: 54.24, sort: 460, ft_24hr: 480.40, cas_24hr: 557.84 },
    ];

    // ── Description helper ──────────────────────────────────────────────────
    const streamDescriptions = {
      social_community: {
        prefix: 'Social and community services employee',
        levels: {
          1: 'performing entry-level community services work under close supervision.',
          2: 'performing community services work requiring relevant qualifications and experience.',
          3: 'performing experienced community services work with substantial autonomy.',
          4: 'performing senior community services work with specialist expertise or supervision responsibilities.',
          5: 'performing advanced community services work with significant management or specialist responsibilities.',
          6: 'performing high-level community services work with broad organisational or program management duties.',
          7: 'performing executive-level community services work with strategic leadership responsibilities.',
          8: 'performing the most senior community services work with enterprise-wide leadership and governance.',
        },
      },
      crisis_accommodation: {
        prefix: 'Crisis accommodation worker',
        levels: {
          1: 'providing direct support to residents in crisis accommodation facilities.',
          2: 'coordinating programs and supervising staff in crisis accommodation services.',
          3: 'managing crisis accommodation operations with specialist expertise.',
          4: 'providing senior leadership and strategic management of crisis accommodation services.',
        },
      },
      family_day_care: {
        prefix: 'Family day care worker',
        levels: {
          1: 'performing entry-level coordination and support duties in family day care schemes.',
          2: 'performing experienced coordination duties with developing expertise in family day care.',
          3: 'coordinating family day care programs with significant autonomy and specialist knowledge.',
          4: 'performing senior coordination and management duties in family day care services.',
          5: 'managing family day care programs with broad responsibilities and strategic oversight.',
        },
      },
      home_care_disability: {
        prefix: 'Home care disability worker',
        levels: {
          1: 'providing basic personal care and support to people with a disability in their home.',
          2: 'providing experienced personal care and support services to people with a disability.',
          3: 'performing skilled care work including complex support needs for people with a disability.',
          4: 'performing senior care work with supervisory responsibilities and specialist disability support.',
          5: 'managing disability home care programs with broad expertise and leadership responsibilities.',
        },
      },
      home_care_aged: {
        prefix: 'Home care aged care worker',
        levels: {
          1: 'providing introductory personal care and domestic assistance to elderly clients.',
          2: 'providing experienced personal care and in-home support to aged care clients.',
          3: 'providing qualified care including medication assistance and complex support for aged clients.',
          4: 'performing senior care coordination and specialist support for aged care clients.',
          5: 'providing specialist aged care services with advanced skills and qualifications.',
          6: 'leading aged care home care teams and coordinating complex care programs.',
        },
      },
    };

    function getDescription(c) {
      const sd = streamDescriptions[c.stream];
      if (!sd) return c.title;
      const levelDesc = sd.levels[c.level] || '';
      return `${sd.prefix} at ${c.title.split(' - ')[0] || c.title}, ${levelDesc}`;
    }

    // Insert all classifications
    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, '[]', '[]', $7)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          sort_order = EXCLUDED.sort_order
      `, [AWARD_CODE, c.level, c.stream, c.pp, c.title, getDescription(c), c.sort]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications (5 streams with pay points)`);

    // ── Pay rates ──────────────────────────────────────────────────────────────
    const classResult = await client.query(
      'SELECT id, level, stream, pay_point FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    // Build lookup: stream_level_pp -> classification row
    const clsLookup = {};
    for (const r of classResult.rows) {
      clsLookup[`${r.stream}_${r.level}_${r.pay_point}`] = r;
    }

    for (const c of classifications) {
      const cls = clsLookup[`${c.stream}_${c.level}_${c.pp}`];
      if (!cls) continue;

      // FT/PT base hourly
      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, c.ft, EFFECTIVE_DATE]);
      }

      // Casual base hourly
      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, c.cas, EFFECTIVE_DATE]);

      // Casual loading
      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);

      // 24-hour care flat rate (home care streams only)
      if (c.ft_24hr) {
        for (const empType of ['full_time', 'part_time']) {
          await client.query(`
            INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
            VALUES ($1, $2, $3, '24hr_care_shift', $4, $5)
            ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
            DO UPDATE SET rate_amount = EXCLUDED.rate_amount
          `, [AWARD_CODE, cls.id, empType, c.ft_24hr, EFFECTIVE_DATE]);
        }
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', '24hr_care_shift', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, c.cas_24hr, EFFECTIVE_DATE]);
      }
    }
    console.log('✓ Inserted pay rates (base hourly + 24hr care flat rates)');

    // ── Penalty rates ──────────────────────────────────────────────────────────
    // Standard shift types (shift_type = NULL means standard/default)
    // Penalty multipliers differ for casual vs FT/PT (verified from FWO pay guide PDF):
    //   FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
    //   Casual: Sat ×1.40, Sun ×1.80, PH ×2.20 (of casual base which already includes 25% loading)
    // Evidence: SACS L1 PP1 casual base=$32.88, PDF Sat=$46.03 → 46.03/32.88 = 1.3997 ≈ ×1.40
    const penaltyRates = [];
    for (const empType of ['full_time', 'part_time']) {
      penaltyRates.push(
        { employment_type: empType, day_type: 'weekday', multiplier: 1.00, description: 'Weekday ordinary rate' },
        { employment_type: empType, day_type: 'saturday', multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
        { employment_type: empType, day_type: 'sunday', multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
        { employment_type: empType, day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      );
    }
    // Casual penalty multipliers (from pay guide PDF — different from FT/PT)
    penaltyRates.push(
      { employment_type: 'casual', day_type: 'weekday', multiplier: 1.00, description: 'Casual weekday ordinary rate' },
      { employment_type: 'casual', day_type: 'saturday', multiplier: 1.40, description: 'Casual Saturday (×1.4 of casual base = 175% of FT base)' },
      { employment_type: 'casual', day_type: 'sunday', multiplier: 1.80, description: 'Casual Sunday (×1.8 of casual base = 225% of FT base)' },
      { employment_type: 'casual', day_type: 'public_holiday', multiplier: 2.20, description: 'Casual public holiday (×2.2 of casual base = 275% of FT base)' },
    );

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [AWARD_CODE, r.employment_type, r.day_type, null, null, null, r.multiplier, null, r.description, EFFECTIVE_DATE, null]);
    }

    // Afternoon/night shift loadings — stored as addition_per_hour (difference from base)
    // These apply as time-band penalties. Afternoon = roughly 3pm-midnight, Night = midnight-8am.
    // The exact $/hr amounts are classification-specific (in the pay guide tables).
    // We store an average loading as addition_per_hour for the penalty system.
    // For SCHADS: afternoon ≈ base × 0.125, night ≈ base × 0.15
    // Using the average of SACS L1 PP1 values: arvo_add = 29.59 - 26.30 = $3.29, night_add = 30.25 - 26.30 = $3.95
    // Since these vary by classification, we store them as multiplier-based loadings instead:
    // Afternoon = ×1.125 (approx), Night = ×1.15 (approx)
    // The pay guide publishes exact $/hr which we verify in tests; the multiplier is for the calculator.
    for (const empType of ['full_time', 'part_time']) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '15:00', '00:00', 'afternoon', 1.125, NULL, 'Afternoon shift loading (×1.125)', $3, NULL)
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '00:00', '08:00', 'night', 1.15, NULL, 'Night shift loading (×1.15)', $3, NULL)
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);
    }
    for (const empType of ['casual']) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '15:00', '00:00', 'afternoon', 1.10, NULL, 'Casual afternoon shift loading (×1.10)', $3, NULL)
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '00:00', '08:00', 'night', 1.12, NULL, 'Casual night shift loading (×1.12)', $3, NULL)
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);
    }

    // Remote work penalty rates (shift_type = 'remote')
    for (const empType of ['full_time', 'part_time', 'casual']) {
      // Mon-Fri within 6am-8pm: ordinary rate
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '06:00', '20:00', 'remote_within_span', 1.00, NULL, 'Remote work Mon-Fri within 6am-8pm (×1.0)', $3, 'remote')
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      // Mon-Fri outside 6am-8pm first 2hr: ×1.5
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'weekday', '20:00', '06:00', 'remote_outside_span', 1.50, NULL, 'Remote work Mon-Fri outside 6am-8pm (×1.5/×2.0)', $3, 'remote')
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      // Saturday within span: ×1.5
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'saturday', NULL, NULL, NULL, 1.50, NULL, 'Remote work Saturday (×1.5)', $3, 'remote')
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      // Sunday: ×2.0
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'sunday', NULL, NULL, NULL, 2.00, NULL, 'Remote work Sunday (×2.0)', $3, 'remote')
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);

      // Public holiday: ×2.5
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date, shift_type)
        VALUES ($1, $2, 'public_holiday', NULL, NULL, NULL, 2.50, NULL, 'Remote work public holiday (×2.5)', $3, 'remote')
      `, [AWARD_CODE, empType, EFFECTIVE_DATE]);
    }

    console.log('✓ Inserted penalty rates (standard + afternoon/night + remote work)');

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // SACS FT: first 3hr at ×1.5, after 3hr at ×2.0 (daily and weekly)
    // Disability/PT/Casual: first 2hr at ×1.5, after 2hr at ×2.0
    // PH overtime: ×2.5
    const overtimeRates = [
      // SACS full-time: 3hr first band (from pay guide Table 2 heading)
      { employment_type: 'full_time', stream: 'social_community', threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'SACS FT daily OT — first 3 hours (×1.50)' },
      { employment_type: 'full_time', stream: 'social_community', threshold_hours: 10.6, period: 'daily', multiplier: 2.00, description: 'SACS FT daily OT — after 3 hours (×2.00)' },
      { employment_type: 'full_time', stream: 'social_community', threshold_hours: 38.0, period: 'weekly', multiplier: 1.50, description: 'SACS FT weekly OT — first 3 hours (×1.50)' },
      { employment_type: 'full_time', stream: 'social_community', threshold_hours: 41.0, period: 'weekly', multiplier: 2.00, description: 'SACS FT weekly OT — after 3 hours (×2.00)' },
      // Crisis accommodation FT: same as SACS (3hr first band)
      { employment_type: 'full_time', stream: 'crisis_accommodation', threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Crisis FT daily OT — first 3 hours (×1.50)' },
      { employment_type: 'full_time', stream: 'crisis_accommodation', threshold_hours: 10.6, period: 'daily', multiplier: 2.00, description: 'Crisis FT daily OT — after 3 hours (×2.00)' },
      { employment_type: 'full_time', stream: 'crisis_accommodation', threshold_hours: 38.0, period: 'weekly', multiplier: 1.50, description: 'Crisis FT weekly OT (×1.50)' },
      { employment_type: 'full_time', stream: 'crisis_accommodation', threshold_hours: 41.0, period: 'weekly', multiplier: 2.00, description: 'Crisis FT weekly OT after 3hr (×2.00)' },
      // All other FT streams: 2hr first band (disability, family day care, home care aged)
      { employment_type: 'full_time', stream: null, threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'FT daily OT — first 2 hours (×1.50)' },
      { employment_type: 'full_time', stream: null, threshold_hours: 9.6, period: 'daily', multiplier: 2.00, description: 'FT daily OT — after 2 hours (×2.00)' },
      { employment_type: 'full_time', stream: null, threshold_hours: 38.0, period: 'weekly', multiplier: 1.50, description: 'FT weekly OT (×1.50)' },
      { employment_type: 'full_time', stream: null, threshold_hours: 40.0, period: 'weekly', multiplier: 2.00, description: 'FT weekly OT after 2hr (×2.00)' },
      // Part-time: always 2hr first band
      { employment_type: 'part_time', stream: null, threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'PT daily OT — first 2 hours (×1.50)' },
      { employment_type: 'part_time', stream: null, threshold_hours: 9.6, period: 'daily', multiplier: 2.00, description: 'PT daily OT — after 2 hours (×2.00)' },
      // Casual: always 2hr first band
      { employment_type: 'casual', stream: null, threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours (×1.50)' },
      { employment_type: 'casual', stream: null, threshold_hours: 9.6, period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 2 hours (×2.00)' },
    ];

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date, stream)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE, r.stream]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules (stream-specific)`);

    // ── Allowances ─────────────────────────────────────────────────────────────
    // All amounts from FWO Pay Guide MA000100 effective 01/10/2025
    const allowances = [
      { type: 'broken_shift_1', name: 'Broken shift allowance - 1 unpaid break', description: 'Paid when your shift includes 1 unpaid break (broken shift). Disability services work.', trigger: 'Broken shift with 1 unpaid break', amount: 20.82, amount_type: 'fixed', per_unit: 'per_shift', is_all_purpose: false },
      { type: 'broken_shift_2', name: 'Broken shift allowance - 2 unpaid breaks', description: 'Paid when your shift includes 2 unpaid breaks (broken shift). Disability services work.', trigger: 'Broken shift with 2 unpaid breaks', amount: 27.56, amount_type: 'fixed', per_unit: 'per_shift', is_all_purpose: false },
      { type: 'first_aid_ft', name: 'First aid allowance - full-time', description: 'Paid if you hold a current first aid certificate and are required to perform first aid duties.', trigger: 'Hold current first aid certificate and required to perform first aid', amount: 20.46, amount_type: 'fixed', per_unit: 'per_week', is_all_purpose: true },
      { type: 'first_aid_ptcas', name: 'First aid allowance - part-time or casual', description: 'Paid per hour if you hold a current first aid certificate and are required to perform first aid duties.', trigger: 'Hold current first aid certificate and required to perform first aid', amount: 0.54, amount_type: 'fixed', per_unit: 'per_hour', is_all_purpose: true },
      { type: 'hot_work_40_46', name: 'Hot work allowance - 40°C to 46°C', description: 'Paid per hour if you work in temperatures between 40°C and 46°C.', trigger: 'Working in temperatures 40°C-46°C (employed before 8 August 1991)', amount: 0.61, amount_type: 'fixed', per_unit: 'per_hour', is_all_purpose: false },
      { type: 'hot_work_over_46', name: 'Hot work allowance - over 46°C', description: 'Paid per hour if you work in temperatures over 46°C.', trigger: 'Working in temperatures over 46°C (employed before 8 August 1991)', amount: 0.73, amount_type: 'fixed', per_unit: 'per_hour', is_all_purpose: false },
      { type: 'laundry_shift', name: 'Laundry allowance', description: 'Paid per shift if you are required to launder your own uniform.', trigger: 'Required to launder own uniform', amount: 0.32, amount_type: 'fixed', per_unit: 'per_shift', is_all_purpose: false },
      { type: 'laundry_not_uniform', name: 'Laundry allowance - not a uniform', description: 'Paid per shift for non-uniform required clothing.', trigger: 'Required to launder non-uniform work clothing', amount: 0.32, amount_type: 'fixed', per_unit: 'per_shift', is_all_purpose: false },
      { type: 'meal', name: 'Meal allowance', description: 'Paid when you work overtime for more than 2 hours and your employer did not give you notice the day before.', trigger: 'Overtime of more than 2 hours without notice', amount: 16.62, amount_type: 'fixed', per_unit: 'per_meal', is_all_purpose: false },
      { type: 'on_call_weekday', name: 'On call allowance - Mon-Fri', description: 'Paid for any 24-hour period or part thereof when on call between finishing ordinary duty Monday to finishing ordinary duty Friday.', trigger: 'On call Monday to Friday', amount: 24.50, amount_type: 'fixed', per_unit: 'per_24hr_period', is_all_purpose: false },
      { type: 'on_call_weekend', name: 'On call allowance - weekend/PH', description: 'Paid for any other 24-hour period or public holiday, or part thereof, when on call.', trigger: 'On call weekends or public holidays', amount: 48.51, amount_type: 'fixed', per_unit: 'per_24hr_period', is_all_purpose: false },
      { type: 'sleepover', name: 'Sleepover allowance', description: 'Paid for each sleepover where you are required to sleep at the workplace or client premises overnight.', trigger: 'Required to sleep over at workplace or client premises', amount: 60.02, amount_type: 'fixed', per_unit: 'per_sleepover', is_all_purpose: false },
      { type: 'uniform', name: 'Uniform allowance', description: 'Paid per shift if you are required to wear a uniform and your employer does not provide it.', trigger: 'Required to wear employer-required uniform not provided', amount: 1.23, amount_type: 'fixed', per_unit: 'per_shift', is_all_purpose: false },
      { type: 'vehicle', name: 'Vehicle allowance', description: 'Paid per kilometre if you are required to use your own vehicle for work purposes.', trigger: 'Required to use own vehicle for work', amount: 0.99, amount_type: 'per_km', per_unit: 'per_km', is_all_purpose: false },
    ];

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, is_all_purpose, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          amount = EXCLUDED.amount,
          is_all_purpose = EXCLUDED.is_all_purpose
      `, [AWARD_CODE, a.type, a.name, a.description, a.trigger, a.amount, a.amount_type, a.per_unit, a.is_all_purpose, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO break_entitlements
        (award_code, employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid, timing_rule, description)
      VALUES ($1, NULL, 5.0, NULL, 'meal', 30, false,
        'No earlier than 1 hour and no later than 6 hours after starting work',
        'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.')
    `, [AWARD_CODE]);
    console.log('✓ Inserted break entitlement rules');

    // ── Classification questions ───────────────────────────────────────────────
    // Five-branch question flow:
    //   Q1: schads_stream — which stream?
    //   Q2-Q6: level selection per stream
    //   Q7-Q11: pay point selection per stream (conditional on level)
    const questions = [
      {
        question_key: 'schads_stream',
        question_text: 'Which area best describes your role?',
        help_text: 'Select the area that matches your work.',
        question_type: 'single',
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'schads_sacs_level',
        question_text: 'What level best describes your social and community services role?',
        help_text: 'Your level depends on your qualifications, experience, and responsibilities.',
        question_type: 'single',
        parent_question_key: 'schads_stream',
        parent_answer_key: 'social_community',
        sort_order: 2,
      },
      {
        question_key: 'schads_crisis_level',
        question_text: 'What level best describes your crisis accommodation role?',
        help_text: 'Your level depends on your qualifications, experience, and responsibilities.',
        question_type: 'single',
        parent_question_key: 'schads_stream',
        parent_answer_key: 'crisis_accommodation',
        sort_order: 3,
      },
      {
        question_key: 'schads_fdc_level',
        question_text: 'What level best describes your family day care role?',
        help_text: 'Your level depends on your qualifications, experience, and responsibilities.',
        question_type: 'single',
        parent_question_key: 'schads_stream',
        parent_answer_key: 'family_day_care',
        sort_order: 4,
      },
      {
        question_key: 'schads_hc_disability_level',
        question_text: 'What level best describes your home care (disability) role?',
        help_text: 'Your level depends on your qualifications, experience, and responsibilities.',
        question_type: 'single',
        parent_question_key: 'schads_stream',
        parent_answer_key: 'home_care_disability',
        sort_order: 5,
      },
      {
        question_key: 'schads_hc_aged_level',
        question_text: 'What level best describes your home care (aged care) role?',
        help_text: 'Your level depends on your qualifications and duties.',
        question_type: 'single',
        parent_question_key: 'schads_stream',
        parent_answer_key: 'home_care_aged',
        sort_order: 6,
      },
      {
        question_key: 'schads_pay_point',
        question_text: 'What is your pay point within this level?',
        help_text: 'Pay points represent progression within your level. You typically start at pay point 1 and advance based on time in the role. Check your pay slip or ask your employer if unsure.',
        question_type: 'single',
        parent_question_key: null, // shown for all streams after level is selected
        parent_answer_key: null,
        sort_order: 10,
      },
    ];

    for (const q of questions) {
      await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, NULL, $6, $7, $8)
        ON CONFLICT (question_key) DO UPDATE SET
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
      `, [AWARD_CODE, q.question_key, q.question_text, q.help_text, q.question_type, q.parent_question_key, q.parent_answer_key, q.sort_order]);
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    // ── Classification answers ─────────────────────────────────────────────────
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      // Q1: stream selection
      { qk: 'schads_stream', ak: 'social_community', text: 'Social and community services (case management, advocacy, community support, admin)', sort: 1 },
      { qk: 'schads_stream', ak: 'crisis_accommodation', text: 'Crisis accommodation (emergency housing, refuges, shelters)', sort: 2 },
      { qk: 'schads_stream', ak: 'family_day_care', text: 'Family day care (coordination and support of family day care services)', sort: 3 },
      { qk: 'schads_stream', ak: 'home_care_disability', text: 'Home care — disability services (personal care, support in clients\' homes)', sort: 4 },
      { qk: 'schads_stream', ak: 'home_care_aged', text: 'Home care — aged care (personal care, domestic assistance for older people)', sort: 5 },

      // SACS levels
      { qk: 'schads_sacs_level', ak: 'l1', text: 'Level 1 — Entry-level (admin, reception, general support)', sort: 1 },
      { qk: 'schads_sacs_level', ak: 'l2', text: 'Level 2 — Cert III or experience (community support, client services)', sort: 2 },
      { qk: 'schads_sacs_level', ak: 'l3', text: 'Level 3 — Cert IV (case support, intake, community development)', sort: 3 },
      { qk: 'schads_sacs_level', ak: 'l4', text: 'Level 4 — Diploma (case manager, team leader)', sort: 4 },
      { qk: 'schads_sacs_level', ak: 'l5', text: 'Level 5 — Advanced Diploma/degree (senior case manager, program coordinator)', sort: 5 },
      { qk: 'schads_sacs_level', ak: 'l6', text: 'Level 6 — Degree + experience (service manager, program manager)', sort: 6 },
      { qk: 'schads_sacs_level', ak: 'l7', text: 'Level 7 — Senior manager (director of services)', sort: 7 },
      { qk: 'schads_sacs_level', ak: 'l8', text: 'Level 8 — Executive (executive director, CEO)', sort: 8 },

      // Crisis accommodation levels
      { qk: 'schads_crisis_level', ak: 'l1', text: 'Level 1 — Entry-level support worker', sort: 1 },
      { qk: 'schads_crisis_level', ak: 'l2', text: 'Level 2 — Experienced support, case coordination', sort: 2 },
      { qk: 'schads_crisis_level', ak: 'l3', text: 'Level 3 — Senior practitioner, program coordinator', sort: 3 },
      { qk: 'schads_crisis_level', ak: 'l4', text: 'Level 4 — Manager, senior specialist', sort: 4 },

      // Family day care levels
      { qk: 'schads_fdc_level', ak: 'l1', text: 'Level 1 — Entry-level coordination support', sort: 1 },
      { qk: 'schads_fdc_level', ak: 'l2', text: 'Level 2 — Experienced coordinator, Cert III', sort: 2 },
      { qk: 'schads_fdc_level', ak: 'l3', text: 'Level 3 — Senior coordinator, Cert IV', sort: 3 },
      { qk: 'schads_fdc_level', ak: 'l4', text: 'Level 4 — Scheme coordinator, Diploma', sort: 4 },
      { qk: 'schads_fdc_level', ak: 'l5', text: 'Level 5 — Senior scheme coordinator, manager', sort: 5 },

      // Home care disability levels
      { qk: 'schads_hc_disability_level', ak: 'l1', text: 'Level 1 — Entry-level disability support', sort: 1 },
      { qk: 'schads_hc_disability_level', ak: 'l2', text: 'Level 2 — Cert III disability support worker', sort: 2 },
      { qk: 'schads_hc_disability_level', ak: 'l3', text: 'Level 3 — Cert IV, senior support worker', sort: 3 },
      { qk: 'schads_hc_disability_level', ak: 'l4', text: 'Level 4 — Team leader, coordinator', sort: 4 },
      { qk: 'schads_hc_disability_level', ak: 'l5', text: 'Level 5 — Program manager, specialist', sort: 5 },

      // Home care aged levels
      { qk: 'schads_hc_aged_level', ak: 'l1', text: 'Level 1 — Introductory (entry-level home care)', sort: 1 },
      { qk: 'schads_hc_aged_level', ak: 'l2', text: 'Level 2 — Home carer (personal care worker)', sort: 2 },
      { qk: 'schads_hc_aged_level', ak: 'l3', text: 'Level 3 — Qualified (Cert III, senior carer)', sort: 3 },
      { qk: 'schads_hc_aged_level', ak: 'l4', text: 'Level 4 — Senior (team leader, assessor)', sort: 4 },
      { qk: 'schads_hc_aged_level', ak: 'l5', text: 'Level 5 — Specialist (quality coordinator)', sort: 5 },
      { qk: 'schads_hc_aged_level', ak: 'l6', text: 'Level 6 — Team leader (director of home care)', sort: 6 },

      // Pay point (shared across all streams)
      { qk: 'schads_pay_point', ak: 'pp1', text: 'Pay point 1 (starting rate for this level)', sort: 1 },
      { qk: 'schads_pay_point', ak: 'pp2', text: 'Pay point 2', sort: 2 },
      { qk: 'schads_pay_point', ak: 'pp3', text: 'Pay point 3', sort: 3 },
      { qk: 'schads_pay_point', ak: 'pp4', text: 'Pay point 4', sort: 4 },
    ];

    for (const a of answers) {
      const qId = questionIds[a.qk];
      if (!qId) { console.error(`Question key ${a.qk} not found`); continue; }
      await client.query(`
        INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
        VALUES ($1, $2, $3, $4)
      `, [qId, a.ak, a.text, a.sort]);
    }
    console.log(`✓ Inserted ${answers.length} classification answers`);

    // ── Award features (calculator capabilities for this award) ───────────────
    await client.query(`DELETE FROM award_features WHERE award_code = $1`, [AWARD_CODE]);

    const features = [
      {
        key: 'broken_shift',
        applies_to: { streams: ['home_care_disability', 'social_community', 'crisis_accommodation'] },
        description: 'Broken shift — working beyond a 12-hour span. Double time for hours beyond 12hr span. Allowance: $20.82 (1 break) or $27.56 (2 breaks).',
        test_params: {
          shift_type: 'broken',
          span_threshold_hours: 12,
          penalty_multiplier: 2.0,
          test_spans: [
            { label: '13hr span (1hr beyond threshold)', periods: [{ startTime: '06:00', endTime: '12:00' }, { startTime: '14:00', endTime: '19:00' }], expected_double_time_hours: 1 },
            { label: '14hr span (2hr beyond threshold)', periods: [{ startTime: '06:00', endTime: '12:00' }, { startTime: '15:00', endTime: '20:00' }], expected_double_time_hours: 2 },
          ],
          allowances: [
            { breaks: 1, allowance_type: 'broken_shift_1', expected_amount: 20.82 },
            { breaks: 2, allowance_type: 'broken_shift_2', expected_amount: 27.56 },
          ],
        },
      },
      {
        key: '24hr_care',
        applies_to: { streams: ['home_care_disability', 'home_care_aged'] },
        description: '24-hour care shift — flat per-shift payment. OT on 24hr shifts: Mon-Sat first 2hr ×1.5, after 2hr ×2.0, Sunday ×2.0, PH ×2.5.',
        test_params: {
          shift_type: '24hr_care',
          rate_type: '24hr_care_shift',
          test_scenarios: [
            { label: 'weekday 24hr care', day_type: 'weekday', expected_multiplier: 1.0 },
            { label: 'Saturday 24hr care', day_type: 'saturday', expected_multiplier: 1.5 },
            { label: 'Sunday 24hr care', day_type: 'sunday', expected_multiplier: 2.0 },
            { label: 'PH 24hr care', day_type: 'public_holiday', expected_multiplier: 2.5 },
          ],
        },
      },
      {
        key: 'remote_work',
        applies_to: { streams: ['social_community', 'crisis_accommodation', 'family_day_care', 'home_care_disability', 'home_care_aged'] },
        description: 'Remote work — different penalty rates based on 6am-8pm span. 10 rate variants across day types and time spans.',
        test_params: {
          shift_type: 'remote',
          span: { start: '06:00', end: '20:00' },
          test_scenarios: [
            { label: 'Mon-Fri within span', day_type: 'weekday', time: '09:00-13:00', expected_multiplier: 1.0 },
            { label: 'Saturday', day_type: 'saturday', time: '09:00-13:00', expected_multiplier: 1.5 },
            { label: 'Sunday', day_type: 'sunday', time: '09:00-13:00', expected_multiplier: 2.0 },
            { label: 'Public holiday', day_type: 'public_holiday', time: '09:00-13:00', expected_multiplier: 2.5 },
          ],
        },
      },
      {
        key: '10hr_break_rule',
        applies_to: { streams: ['social_community', 'crisis_accommodation', 'family_day_care', 'home_care_disability', 'home_care_aged'] },
        description: 'Less than 10-hour break after working overtime — double time until 10hr break is provided.',
        test_params: {
          required_gap_hours: 10,
          penalty_multiplier: 2.0,
          test_scenarios: [
            { label: '9hr gap (violation)', shift1_end: '22:00', shift2_start: '07:00', gap_hours: 9, expect_double_time: true },
            { label: '10hr gap (no violation)', shift1_end: '21:00', shift2_start: '07:00', gap_hours: 10, expect_double_time: false },
            { label: '8hr gap (violation)', shift1_end: '23:00', shift2_start: '07:00', gap_hours: 8, expect_double_time: true },
          ],
        },
      },
      {
        key: 'sleepover',
        applies_to: { streams: ['home_care_disability', 'home_care_aged', 'crisis_accommodation'] },
        description: 'Sleepover shift — employee required to sleep at workplace. Flat allowance of $60.02 per sleepover.',
        test_params: {
          shift_type: 'sleepover',
          allowance_type: 'sleepover',
          expected_amount: 60.02,
        },
      },
      {
        key: 'afternoon_night_shift',
        applies_to: { streams: ['social_community', 'crisis_accommodation', 'family_day_care', 'home_care_disability', 'home_care_aged'] },
        description: 'Afternoon and night shift loadings — time-band penalties with specific $/hr rates.',
        test_params: {
          afternoon: { time_band: '15:00-00:00', ft_multiplier: 1.125, cas_multiplier: 1.10 },
          night: { time_band: '00:00-08:00', ft_multiplier: 1.15, cas_multiplier: 1.12 },
        },
      },
    ];

    for (const f of features) {
      await client.query(`
        INSERT INTO award_features (award_code, feature_key, applies_to, description, test_params)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (award_code, feature_key) DO UPDATE SET
          applies_to = EXCLUDED.applies_to,
          description = EXCLUDED.description,
          test_params = EXCLUDED.test_params
      `, [AWARD_CODE, f.key, JSON.stringify(f.applies_to), f.description, JSON.stringify(f.test_params)]);
    }
    console.log(`✓ Inserted ${features.length} award features`);

    await client.query('COMMIT');
    console.log(`\n✓ Seed complete for ${AWARD_CODE} (effective ${EFFECTIVE_DATE})`);
    console.log(`  ${classifications.length} classifications across 5 streams`);
    console.log(`  ${allowances.length} allowances`);
    console.log(`  ${overtimeRates.length} overtime rules (stream-specific)`);
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
