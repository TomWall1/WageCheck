/**
 * Admin routes — protected by secret key
 * Used to trigger re-scrapes and check data freshness
 */
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { runScrape } = require('../../scripts/scrape');

// Middleware — require admin secret header
function requireAdmin(req, res, next) {
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  next();
}

// POST /api/admin/scrape — trigger a fresh scrape of Fair Work pages
router.post('/scrape', requireAdmin, async (req, res) => {
  // Respond immediately, run scrape in background
  res.json({ message: 'Scrape job started. Check /api/admin/scrape-log for status.' });

  try {
    await runScrape('admin');
  } catch (err) {
    console.error('Admin-triggered scrape failed:', err);
  }
});

// GET /api/admin/scrape-log — view recent scrape results
router.get('/scrape-log', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM scrape_log ORDER BY started_at DESC LIMIT 20
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/data-status — check freshness of data
router.get('/data-status', requireAdmin, async (req, res) => {
  try {
    const metadata = await pool.query('SELECT * FROM award_metadata WHERE award_code = $1', ['MA000009']);
    const pageCount = await pool.query('SELECT COUNT(*) FROM scraped_pages');
    const rateCount = await pool.query('SELECT COUNT(*) FROM pay_rates');
    const lastScrape = await pool.query('SELECT * FROM scrape_log ORDER BY started_at DESC LIMIT 1');

    const effectiveDate = metadata.rows[0]?.effective_date;
    const now = new Date();
    const lastJuly = new Date(now.getFullYear(), 6, 1); // July 1 current year
    if (lastJuly > now) lastJuly.setFullYear(now.getFullYear() - 1);

    const needsRateUpdate = effectiveDate ? new Date(effectiveDate) < lastJuly : true;

    res.json({
      awardMetadata: metadata.rows[0] || null,
      scrapedPageCount: parseInt(pageCount.rows[0].count),
      payRateCount: parseInt(rateCount.rows[0].count),
      lastScrape: lastScrape.rows[0] || null,
      needsRateUpdate,
      rateUpdateNote: needsRateUpdate
        ? 'Pay rates may be out of date. After the annual Fair Work wage review, update seed.js and re-run: node scripts/seed.js'
        : 'Pay rates appear current.',
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── Analytics routes ────────────────────────────────────────────────────────

function testFilter(req) {
  return req.query.include_test === 'true' ? '' : 'AND is_test = false';
}

// GET /api/admin/analytics/summary
router.get('/analytics/summary', requireAdmin, async (req, res) => {
  try {
    const tf = testFilter(req);
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_calculations,
        COUNT(actual_pay_entered)::int AS comparisons_entered,
        COUNT(*) FILTER (WHERE appears_underpaid = true)::int AS underpaid_count,
        ROUND(AVG(calculated_gross), 2) AS avg_calculated_gross,
        ROUND(AVG(gap_amount) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap,
        ROUND(AVG(gap_percent) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap_percent
      FROM calculation_logs WHERE 1=1 ${tf}
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/analytics/by-award
router.get('/analytics/by-award', requireAdmin, async (req, res) => {
  try {
    const tf = testFilter(req);
    const result = await pool.query(`
      SELECT award_code,
        COUNT(*)::int AS calculations,
        COUNT(actual_pay_entered)::int AS comparisons,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid,
        ROUND(AVG(gap_amount) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap,
        ROUND(AVG(gap_percent) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap_pct
      FROM calculation_logs WHERE 1=1 ${tf}
      GROUP BY award_code ORDER BY calculations DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Analytics by-award error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/analytics/by-classification
router.get('/analytics/by-classification', requireAdmin, async (req, res) => {
  try {
    const tf = testFilter(req);
    const result = await pool.query(`
      SELECT award_code, classification_level, classification_stream, employment_type,
        COUNT(*)::int AS calculations,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid,
        ROUND(AVG(gap_amount) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap,
        ROUND(AVG(gap_percent) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap_pct
      FROM calculation_logs WHERE 1=1 ${tf}
      GROUP BY award_code, classification_level, classification_stream, employment_type
      ORDER BY calculations DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Analytics by-classification error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/analytics/trends
router.get('/analytics/trends', requireAdmin, async (req, res) => {
  try {
    const tf = testFilter(req);
    const result = await pool.query(`
      SELECT DATE_TRUNC('day', created_at)::date AS date,
        COUNT(*)::int AS calculations,
        COUNT(actual_pay_entered)::int AS comparisons,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid
      FROM calculation_logs WHERE 1=1 ${tf}
      GROUP BY date ORDER BY date DESC LIMIT 90
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Analytics trends error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/analytics/report/:award — publishable report data
router.get('/analytics/report/:award', requireAdmin, async (req, res) => {
  try {
    const tf = testFilter(req);
    const award = req.params.award;
    const days = parseInt(req.query.days) || 90;
    const since = new Date(Date.now() - days * 86400000).toISOString();

    const summary = await pool.query(`
      SELECT
        COUNT(*)::int AS total_calculations,
        COUNT(actual_pay_entered)::int AS comparisons_entered,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid_count,
        ROUND(AVG(calculated_gross), 2) AS avg_calculated_gross,
        ROUND(AVG(gap_amount) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap,
        ROUND(AVG(gap_percent) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap_pct
      FROM calculation_logs
      WHERE award_code = $1 AND created_at >= $2 ${tf}
    `, [award, since]);

    const byLevel = await pool.query(`
      SELECT classification_level, classification_stream, employment_type,
        COUNT(*)::int AS calculations,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid,
        ROUND(AVG(gap_amount) FILTER (WHERE actual_pay_entered IS NOT NULL), 2) AS avg_gap
      FROM calculation_logs
      WHERE award_code = $1 AND created_at >= $2 ${tf}
      GROUP BY classification_level, classification_stream, employment_type
      ORDER BY calculations DESC
    `, [award, since]);

    const byAge = await pool.query(`
      SELECT age_bracket,
        COUNT(*)::int AS calculations,
        COUNT(*) FILTER (WHERE appears_underpaid)::int AS underpaid
      FROM calculation_logs
      WHERE award_code = $1 AND created_at >= $2 ${tf}
      GROUP BY age_bracket ORDER BY calculations DESC
    `, [award, since]);

    const shiftStats = await pool.query(`
      SELECT sl.day_type,
        COUNT(*)::int AS total_shifts,
        ROUND(AVG(sl.total_shift_pay), 2) AS avg_shift_pay,
        COUNT(*) FILTER (WHERE sl.missed_break_penalty)::int AS missed_breaks,
        ROUND(AVG(sl.overtime_hours), 2) AS avg_overtime_hours
      FROM calculation_shift_logs sl
      JOIN calculation_logs cl ON cl.id = sl.calculation_id
      WHERE cl.award_code = $1 AND cl.created_at >= $2 ${tf.replace('is_test', 'cl.is_test')}
      GROUP BY sl.day_type ORDER BY total_shifts DESC
    `, [award, since]);

    const allowanceStats = await pool.query(`
      SELECT al.allowance_type,
        COUNT(*)::int AS total_entries,
        COUNT(*) FILTER (WHERE al.qualified)::int AS qualified_count,
        ROUND(AVG(al.allowance_amount) FILTER (WHERE al.qualified), 2) AS avg_amount
      FROM calculation_allowance_logs al
      JOIN calculation_logs cl ON cl.id = al.calculation_id
      WHERE cl.award_code = $1 AND cl.created_at >= $2 ${tf.replace('is_test', 'cl.is_test')}
      GROUP BY al.allowance_type ORDER BY total_entries DESC
    `, [award, since]);

    res.json({
      award,
      period_days: days,
      since,
      summary: summary.rows[0],
      byLevel: byLevel.rows,
      byAge: byAge.rows,
      shiftStats: shiftStats.rows,
      allowanceStats: allowanceStats.rows,
    });
  } catch (err) {
    console.error('Analytics report error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
