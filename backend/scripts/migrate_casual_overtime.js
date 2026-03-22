/**
 * Migration: Add missing casual overtime rates across all awards.
 *
 * Problem: Many awards only had FT/PT overtime rates seeded, not casual.
 * The calculator skips daily/weekly OT entirely when no rates exist for the
 * employment type, so casuals working 13+ hours got zero overtime.
 *
 * Pattern: Casual OT multipliers use the "FT-equivalent dollar amount" method:
 *   FT ×1.50 → Casual ×1.20 of casual base  (since 1.50 / 1.25 = 1.20)
 *   FT ×2.00 → Casual ×1.60 of casual base  (since 2.00 / 1.25 = 1.60)
 * This ensures casuals receive the SAME dollar amount per OT hour as FT workers.
 *
 * Daily OT thresholds for casuals come from the specific award clause
 * (casual max ordinary hours/day), NOT the FT daily threshold.
 *
 * Run: node scripts/migrate_casual_overtime.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

// Casual OT rates to insert.
// Multipliers are applied to the casual base rate (which includes 25% loading).
// ×1.20 of casual = ×1.50 of FT base (same dollar amount as FT time-and-a-half)
// ×1.60 of casual = ×2.00 of FT base (same dollar amount as FT double time)
const CASUAL_OT_RATES = [
  // ── MA000009 (Hospitality) ─────────────────────────────────────────────
  // Clause 33.1: casual OT = hours in excess of 12/day or 38/week.
  // FT daily: 10hr → ×1.50, 12hr → ×2.00. Casual daily max = 12hr (clause 15.2).
  { award: 'MA000009', period: 'daily',  threshold: 12,  mult: 1.20, desc: 'Casual daily OT — over 12hr/day (×1.20 of casual base = ×1.50 of FT)' },
  { award: 'MA000009', period: 'daily',  threshold: 14,  mult: 1.60, desc: 'Casual daily OT — over 14hr/day (×1.60 of casual base = ×2.00 of FT)' },
  { award: 'MA000009', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000009', period: 'weekly', threshold: 40,  mult: 1.60, desc: 'Casual weekly OT — over 40hr/week (×1.60 of casual base)' },

  // ── MA000080 (Amusement, Events and Recreation) ────────────────────────
  // Clause 11.3: casual max 10 ordinary hours/day. OT = excess of 10hr/day or 38hr/week.
  // FT daily: 7.6hr → ×1.50, 10.6hr → ×2.00 (3hr first band).
  { award: 'MA000080', period: 'daily',  threshold: 10,  mult: 1.20, desc: 'Casual daily OT — over 10hr/day (×1.20 of casual base = ×1.50 of FT)' },
  { award: 'MA000080', period: 'daily',  threshold: 13,  mult: 1.60, desc: 'Casual daily OT — over 13hr/day (×1.60 of casual base = ×2.00 of FT)' },
  { award: 'MA000080', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000080', period: 'weekly', threshold: 41,  mult: 1.60, desc: 'Casual weekly OT — over 41hr/week (×1.60 of casual base)' },

  // ── MA000003 (Fast Food) ───────────────────────────────────────────────
  // Clause 25.1: casual OT = excess of 38hr/week or 10hr/day.
  // FT weekly: 38hr → ×1.50, 40hr → ×2.00. No FT daily OT in DB.
  { award: 'MA000003', period: 'daily',  threshold: 10,  mult: 1.20, desc: 'Casual daily OT — over 10hr/day (×1.20 of casual base)' },
  { award: 'MA000003', period: 'daily',  threshold: 12,  mult: 1.60, desc: 'Casual daily OT — over 12hr/day (×1.60 of casual base)' },
  { award: 'MA000003', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000003', period: 'weekly', threshold: 40,  mult: 1.60, desc: 'Casual weekly OT — over 40hr/week (×1.60 of casual base)' },

  // ── MA000004 (Retail) ──────────────────────────────────────────────────
  // Clause 28.1: casual OT = excess of 38hr/week or 11hr/day.
  // FT weekly: 38hr → ×1.50, 40hr → ×2.00. No FT daily OT in DB.
  { award: 'MA000004', period: 'daily',  threshold: 11,  mult: 1.20, desc: 'Casual daily OT — over 11hr/day (×1.20 of casual base)' },
  { award: 'MA000004', period: 'daily',  threshold: 13,  mult: 1.60, desc: 'Casual daily OT — over 13hr/day (×1.60 of casual base)' },
  { award: 'MA000004', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000004', period: 'weekly', threshold: 40,  mult: 1.60, desc: 'Casual weekly OT — over 40hr/week (×1.60 of casual base)' },

  // ── MA000119 (Restaurant) ──────────────────────────────────────────────
  // Already has casual daily OT (11hr/14hr). Missing casual weekly only.
  // Casual daily OT uses ×1.50/×2.00 (same as FT multipliers, applied to casual base).
  // Weekly should follow the same pattern.
  { award: 'MA000119', period: 'weekly', threshold: 38,  mult: 1.50, desc: 'Casual weekly OT — over 38hr/week (×1.50 — mirrors FT)' },
  { award: 'MA000119', period: 'weekly', threshold: 40,  mult: 2.00, desc: 'Casual weekly OT — over 40hr/week (×2.00 — mirrors FT)' },

  // ── MA000026 (Graphic Arts) ────────────────────────────────────────────
  // FT weekly: 38hr → ×1.50, 40hr → ×2.00.
  { award: 'MA000026', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000026', period: 'weekly', threshold: 40,  mult: 1.60, desc: 'Casual weekly OT — over 40hr/week (×1.60 of casual base)' },

  // ── MA000058 (Registered and Licensed Clubs) ───────────────────────────
  // FT weekly: 38hr → ×1.50, 40hr → ×2.00.
  { award: 'MA000058', period: 'weekly', threshold: 38,  mult: 1.20, desc: 'Casual weekly OT — over 38hr/week (×1.20 of casual base)' },
  { award: 'MA000058', period: 'weekly', threshold: 40,  mult: 1.60, desc: 'Casual weekly OT — over 40hr/week (×1.60 of casual base)' },

  // ── MA000095 (Car Parking) ─────────────────────────────────────────────
  // Clause 11.3: casual OT for all hours in excess of ordinary hours on any day.
  // Ordinary hours = 7.6hr/day (38hr/5). Also need FT/PT daily OT (was missing entirely).
  // FT/PT daily: 7.6hr → ×1.50, 9.6hr → ×2.00.
  // Casual daily: 7.6hr → ×1.20, 9.6hr → ×1.60.
  { award: 'MA000095', period: 'daily',  threshold: 7.6, mult: 1.20, desc: 'Casual daily OT — first 2hr over 7.6hr (×1.20 of casual base)' },
  { award: 'MA000095', period: 'daily',  threshold: 9.6, mult: 1.60, desc: 'Casual daily OT — after 9.6hr (×1.60 of casual base)' },
];

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Also clean up duplicate OT rates from multiple seed runs
    const dupes = await client.query(`
      DELETE FROM overtime_rates a USING overtime_rates b
      WHERE a.id > b.id
        AND a.award_code = b.award_code
        AND a.employment_type = b.employment_type
        AND a.period = b.period
        AND a.threshold_hours = b.threshold_hours
      RETURNING a.id, a.award_code, a.employment_type, a.period, a.threshold_hours
    `);
    if (dupes.rowCount > 0) {
      console.log(`✓ Cleaned ${dupes.rowCount} duplicate overtime_rates rows`);
    }

    let inserted = 0;
    for (const r of CASUAL_OT_RATES) {
      // Check if it already exists
      const existing = await client.query(
        `SELECT 1 FROM overtime_rates WHERE award_code = $1 AND employment_type = 'casual' AND period = $2 AND threshold_hours = $3 LIMIT 1`,
        [r.award, r.period, r.threshold]
      );
      if (existing.rows.length > 0) {
        console.log(`  skip ${r.award} casual ${r.period} ${r.threshold}hr (already exists)`);
        continue;
      }

      // Get effective_date from an existing FT row for this award
      const dateRow = await client.query(
        `SELECT effective_date FROM overtime_rates WHERE award_code = $1 AND employment_type = 'full_time' LIMIT 1`,
        [r.award]
      );
      const effectiveDate = dateRow.rows[0]?.effective_date || '2025-07-01';

      await client.query(
        `INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
         VALUES ($1, 'casual', $2, $3, $4, $5, $6)`,
        [r.award, r.threshold, r.period, r.mult, r.desc, effectiveDate]
      );
      console.log(`  + ${r.award} casual ${r.period} ${r.threshold}hr ×${r.mult}`);
      inserted++;
    }

    await client.query('COMMIT');
    console.log(`\n✅ Migration complete: inserted ${inserted} casual OT rates`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
