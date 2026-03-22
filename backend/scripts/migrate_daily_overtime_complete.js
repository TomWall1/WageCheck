/**
 * Migration: Complete daily overtime coverage for ALL awards and employment types.
 *
 * This is the definitive daily OT migration. It addresses:
 * 1. Awards with NO daily OT at all (Group 1: hard daily threshold)
 * 2. Awards with partial coverage (e.g. FT only, missing PT/casual)
 * 3. Conditional/indirect daily OT awards (Group 2: reasonable defaults)
 *
 * Multiplier conventions:
 *   FT/PT:  first band ×1.50, second band ×2.00
 *   Casual: first band ×1.20, second band ×1.60 (FT-equivalent dollar amounts)
 *     (because casual base = FT × 1.25, so 1.20 × 1.25 = 1.50 = same $/hr as FT OT)
 *
 * Run: node scripts/migrate_daily_overtime_complete.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

// Daily OT definitions per award.
// daily_hrs: [firstBandThreshold, secondBandThreshold]
// Source: each award's Hours of Work + Overtime clauses.
const DAILY_OT_DEFS = [
  // ═══ GROUP 1: Hard daily threshold OT ═══════════════════════════════════
  // These awards explicitly trigger OT based on daily hours worked.

  // MA000005 (Hair & Beauty) — Clause 28: OT for hours in excess of ordinary daily hours
  // Max 10hr/day (clause 25.2). Casual max 10hr/day.
  { award: 'MA000005', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 28 — OT for work outside spread or in excess of daily hours. Max 10hr/day.' },

  // MA000022 (Cleaning) — Clause 28: OT for work outside ordinary hours or in excess of rostered daily hours
  // Max 8hr/day (or 10hr by agreement, clause 25). Use 8hr as default.
  { award: 'MA000022', ft_daily: [8, 10], pt_daily: [8, 10], cas_daily: [8, 10],
    note: 'Clause 28 — OT for exceeding rostered daily hours. Standard max 8hr/day.' },

  // MA000023 (Call Centres) — Clause 27: OT for work beyond ordinary daily hours or outside span
  // Max 10hr/day (clause 24). Casual max 10hr/day.
  { award: 'MA000023', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 27 — OT for work beyond ordinary daily hours. Max 10hr/day.' },

  // MA000026 (Graphic Arts) — Clause 30: OT for exceeding ordinary hours per day or outside spread
  // Max 7.6hr/day (38hr/5). Or up to 10hr by agreement.
  { award: 'MA000026', ft_daily: [7.6, 9.6], pt_daily: [7.6, 9.6], cas_daily: [7.6, 9.6],
    note: 'Clause 30 — OT for exceeding daily ordinary hours. Standard 7.6hr/day.' },

  // MA000058 (Registered Clubs) — Clause 28: OT for exceeding daily ordinary hours or outside spread
  // Max 10hr/day (or 11.5hr by agreement, clause 25). Casual limited (mainly weekly + span).
  { award: 'MA000058', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 28 — OT for exceeding daily ordinary hours. Max 10hr/day.' },

  // MA000084 (Storage & Wholesale) — Clause 32: OT for exceeding ordinary hours on any day or outside span
  // Max 8hr/day (or 10hr by agreement, clause 28). Use 8hr as default.
  { award: 'MA000084', ft_daily: [8, 10], pt_daily: [8, 10], cas_daily: [8, 10],
    note: 'Clause 32 — OT for exceeding ordinary hours on any day. Standard max 8hr/day.' },

  // MA000105 (Funeral) — Clause 27: OT for work beyond ordinary hours per day or outside spread
  // Max 7.6hr/day (clause 24) or 10hr by agreement. Use 7.6hr.
  { award: 'MA000105', ft_daily: [7.6, 10.6], pt_daily: [7.6, 10.6], cas_daily: [7.6, 10.6],
    note: 'Clause 27 — OT for exceeding daily ordinary hours. Standard 7.6hr/day (3hr first band).' },

  // ═══ GROUP 1 CONTINUED: Fix partial coverage ═══════════════════════════
  // These already have SOME daily OT but are missing employment types.

  // MA000003 (Fast Food) — Has casual daily only. Need FT/PT daily.
  // Clause 25.1: OT for hours in excess of 10hr/day. Max 10hr/day (clause 22.2).
  { award: 'MA000003', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: null,
    note: 'Clause 25.1 — FT/PT daily OT. Casual already exists.' },

  // MA000004 (Retail) — Has casual daily only. Need FT/PT daily.
  // Clause 28.1: OT for hours in excess of 11hr/day. Max 9hr (or 11hr by agreement).
  { award: 'MA000004', ft_daily: [11, 13], pt_daily: [11, 13], cas_daily: null,
    note: 'Clause 28.1 — FT/PT daily OT. Casual already exists.' },

  // MA000009 (Hospitality) — Has FT daily + casual daily. Need PT daily.
  // PT daily threshold = same as FT (10hr/day, clause 15.1).
  { award: 'MA000009', ft_daily: null, pt_daily: [10, 12], cas_daily: null,
    note: 'PT daily OT to match FT. FT and casual already exist.' },

  // MA000119 (Restaurant) — Has casual daily only. Need FT/PT daily.
  // Clause 30: OT for hours in excess of 11hr/day or outside spread.
  { award: 'MA000119', ft_daily: [11, 14], pt_daily: [11, 14], cas_daily: null,
    note: 'Clause 30 — FT/PT daily OT. Casual already exists.' },

  // ═══ GROUP 2: Conditional/indirect daily OT ═════════════════════════════
  // These awards trigger daily OT mainly via span breaches or PT contract
  // breaches, but a reasonable daily cap still applies.

  // MA000028 (Horticulture) — Clause 27: OT mostly weekly-based, but daily via span.
  // Max 10hr/day or 12hr by agreement (clause 24). Use 10hr.
  { award: 'MA000028', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 27 — daily OT via span/excess hours. Max 10hr/day.' },

  // MA000033 (Nursery) — Similar to Horticulture. Clause 27.
  // Max 10hr/day or 12hr by agreement (clause 24). Use 10hr.
  { award: 'MA000033', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 27 — daily OT via span/excess hours. Max 10hr/day.' },

  // MA000063 (Passenger Vehicle) — Clause 28: fatigue + span driven.
  // Max 10hr/day for bus/coach, 12hr for other (clause 25). Use 10hr default.
  { award: 'MA000063', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 28 — daily OT. Max 10hr/day (bus/coach). Fatigue rules also apply.' },

  // MA000082 (Sporting Orgs) — Clause 26: mostly weekly but daily via excess.
  // Max 10hr/day (clause 23). Use 10hr.
  { award: 'MA000082', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 26 — daily OT via excess hours. Max 10hr/day.' },

  // MA000101 (Gardening & Landscaping) — Clause 27: similar to Horticulture.
  // Max 10hr/day or 12hr by agreement (clause 24). Use 10hr.
  { award: 'MA000101', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 27 — daily OT via span/excess hours. Max 10hr/day.' },

  // MA000102 (Travelling Shows) — Clause 25: irregular hours, event-based.
  // Max 10hr/day (clause 22) or 12hr by agreement. Use 10hr.
  { award: 'MA000102', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 25 — daily OT for excess hours. Max 10hr/day.' },

  // MA000120 (Children's Services) — Clause 28: mostly weekly but daily via excess.
  // Max 10hr/day (clause 22). Use 10hr.
  { award: 'MA000120', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: [10, 12],
    note: 'Clause 28 — daily OT for excess hours. Max 10hr/day.' },

  // MA000030 (Market & Social Research) — Clause 29: mostly weekly OT.
  // This award is unusual — no standard daily hours. OT is 1.25× flat (not tiered).
  // The pay guide shows a single OT rate column. Daily threshold unclear.
  // Use 10hr as a conservative default.
  { award: 'MA000030', ft_daily: [10, 12], pt_daily: [10, 12], cas_daily: null,
    note: 'Clause 29 — mostly weekly. 10hr daily default. Casual has no OT premium per pay guide.' },
];

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Clean duplicates first
    const dupes = await client.query(`
      DELETE FROM overtime_rates a USING overtime_rates b
      WHERE a.id > b.id
        AND a.award_code = b.award_code
        AND a.employment_type = b.employment_type
        AND a.period = b.period
        AND a.threshold_hours = b.threshold_hours
      RETURNING a.id
    `);
    if (dupes.rowCount > 0) console.log(`✓ Cleaned ${dupes.rowCount} duplicate rows`);

    let inserted = 0;
    let skipped = 0;

    for (const def of DAILY_OT_DEFS) {
      const empTypes = [
        { type: 'full_time',  thresholds: def.ft_daily,  m1: 1.50, m2: 2.00 },
        { type: 'part_time',  thresholds: def.pt_daily,  m1: 1.50, m2: 2.00 },
        { type: 'casual',     thresholds: def.cas_daily, m1: 1.20, m2: 1.60 },
      ];

      // Get effective_date from existing rows
      const dateRow = await client.query(
        `SELECT effective_date FROM overtime_rates WHERE award_code = $1 LIMIT 1`, [def.award]
      );
      const ed = dateRow.rows[0]?.effective_date || '2025-07-01';

      for (const emp of empTypes) {
        if (!emp.thresholds) continue; // null = skip (already exists)

        const [t1, t2] = emp.thresholds;

        for (const { hrs, mult, band } of [
          { hrs: t1, mult: emp.m1, band: 'first' },
          { hrs: t2, mult: emp.m2, band: 'second' },
        ]) {
          // Check if exists
          const existing = await client.query(
            `SELECT 1 FROM overtime_rates WHERE award_code = $1 AND employment_type = $2 AND period = 'daily' AND threshold_hours = $3 LIMIT 1`,
            [def.award, emp.type, hrs]
          );
          if (existing.rows.length > 0) {
            skipped++;
            continue;
          }

          const desc = `${emp.type === 'casual' ? 'Casual' : emp.type === 'part_time' ? 'PT' : 'FT'} daily OT — ${band} band over ${hrs}hr (×${mult})`;
          await client.query(
            `INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
             VALUES ($1, $2, $3, 'daily', $4, $5, $6)`,
            [def.award, emp.type, hrs, mult, desc, ed]
          );
          console.log(`  + ${def.award} ${emp.type.padEnd(9)} daily ${hrs}hr ×${mult}`);
          inserted++;
        }
      }
    }

    await client.query('COMMIT');
    console.log(`\n✅ Migration complete: ${inserted} inserted, ${skipped} skipped (already existed)`);
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
