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

module.exports = router;
