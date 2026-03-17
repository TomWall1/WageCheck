/**
 * Fair Work scraper — Hospitality Industry (General) Award 2020
 * Scrapes and stores raw content from Fair Work Ombudsman website.
 * Run: node scripts/scrape.js
 *
 * Note: This stores raw content for reference and rate verification.
 * The structured data (pay rates, penalties, etc.) is maintained in seed.js
 * and should be manually updated after each Annual Wage Review (July each year).
 */
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const pool = require('../src/db/pool');

const SOURCES = [
  {
    url: 'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000009-summary',
    page_type: 'award_summary',
    description: 'Hospitality Award summary page',
  },
  {
    url: 'https://www.fairwork.gov.au/pay-and-wages/minimum-wages/hospitality-industry-general-award-pay-guide',
    page_type: 'pay_guide',
    description: 'Hospitality Award pay guide (current rates)',
  },
  {
    url: 'https://www.fairwork.gov.au/employment-conditions/awards/find-my-award/hospitality-industry-general-award',
    page_type: 'find_award',
    description: 'Find your award — Hospitality',
  },
  {
    url: 'https://www.fairwork.gov.au/tools-and-resources/fact-sheets/rights-and-obligations/penalty-rates',
    page_type: 'fact_sheet',
    description: 'Penalty rates fact sheet',
  },
  {
    url: 'https://www.fairwork.gov.au/employment-conditions/hours-of-work-breaks-and-rosters/breaks',
    page_type: 'fact_sheet',
    description: 'Breaks fact sheet',
  },
  {
    url: 'https://www.fairwork.gov.au/employment-conditions/awards/award-flexibility/individual-flexibility-arrangements',
    page_type: 'fact_sheet',
    description: 'Individual flexibility arrangements',
  },
];

const HEADERS = {
  'User-Agent': 'WageCheck/1.0 (Australian wage compliance tool; contact admin@wagecheck.com.au)',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-AU,en;q=0.9',
};

async function extractText(html) {
  const $ = cheerio.load(html);
  // Remove nav, header, footer, scripts, styles
  $('nav, header, footer, script, style, .breadcrumb, .back-to-top, .site-footer, .site-header').remove();
  // Get main content
  const main = $('main, [role="main"], .content-area, article').first();
  return (main.length ? main.text() : $('body').text())
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeUrl(url, pageType, logId, client) {
  console.log(`  Scraping: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      timeout: 30000,
      maxRedirects: 5,
    });

    const rawText = await extractText(response.data);

    await client.query(`
      INSERT INTO scraped_pages (url, page_type, raw_html, raw_text)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (url) DO UPDATE SET
        raw_html = EXCLUDED.raw_html,
        raw_text = EXCLUDED.raw_text,
        scraped_at = NOW()
    `, [url, pageType, response.data.substring(0, 5000000), rawText]);

    return true;
  } catch (err) {
    console.error(`  ✗ Failed to scrape ${url}: ${err.message}`);
    return false;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runScrape(triggeredBy = 'manual') {
  const client = await pool.connect();
  let logId;

  try {
    const logResult = await client.query(`
      INSERT INTO scrape_log (triggered_by, status)
      VALUES ($1, 'running')
      RETURNING id
    `, [triggeredBy]);
    logId = logResult.rows[0].id;

    console.log(`\nScrape job #${logId} started\n`);

    let pagesScraped = 0;
    for (const source of SOURCES) {
      const success = await scrapeUrl(source.url, source.page_type, logId, client);
      if (success) pagesScraped++;
      // Be polite — 2 second delay between requests
      await sleep(2000);
    }

    // Update award metadata last scraped time
    await client.query(`
      UPDATE award_metadata SET last_scraped_at = NOW() WHERE award_code = 'MA000009'
    `);

    await client.query(`
      UPDATE scrape_log SET status = 'success', completed_at = NOW(), pages_scraped = $1 WHERE id = $2
    `, [pagesScraped, logId]);

    console.log(`\n✓ Scrape complete — ${pagesScraped}/${SOURCES.length} pages scraped`);
    console.log('Note: Pay rates in the database are NOT automatically updated from scraped content.');
    console.log('After the annual July rate review, update seed.js with new rates and re-run: node scripts/seed.js');

  } catch (err) {
    if (logId) {
      await client.query(`
        UPDATE scrape_log SET status = 'failed', completed_at = NOW(), error_message = $1 WHERE id = $2
      `, [err.message, logId]);
    }
    throw err;
  } finally {
    client.release();
  }
}

// Run if called directly
if (require.main === module) {
  runScrape('manual')
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      pool.end();
      process.exit(1);
    });
}

module.exports = { runScrape };
