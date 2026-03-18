const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { calculateEntitlements } = require('../services/awardCalculator');
const { classifyAndFetch } = require('../services/classificationEngine');

const VALID_AWARDS = ['MA000009', 'MA000003', 'MA000119'];
const DEFAULT_AWARD = 'MA000009';

function getAwardCode(req) {
  const code = req.query.award || req.body?.award || DEFAULT_AWARD;
  return VALID_AWARDS.includes(code) ? code : DEFAULT_AWARD;
}

// GET /api/award/metadata
router.get('/metadata', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const result = await pool.query(
      'SELECT * FROM award_metadata WHERE award_code = $1',
      [awardCode]
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/classifications
// Returns all classifications, optionally filtered by stream
router.get('/classifications', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const { stream } = req.query;
    const query = stream
      ? 'SELECT * FROM classifications WHERE award_code = $1 AND stream = $2 ORDER BY sort_order'
      : 'SELECT * FROM classifications WHERE award_code = $1 ORDER BY sort_order';
    const params = stream ? [awardCode, stream] : [awardCode];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/rates?classification_id=X&employment_type=Y
router.get('/rates', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const { classification_id, employment_type } = req.query;
    if (!classification_id || !employment_type) {
      return res.status(400).json({ error: 'classification_id and employment_type are required' });
    }

    const result = await pool.query(`
      SELECT pr.*, c.title, c.level, c.stream
      FROM pay_rates pr
      JOIN classifications c ON c.id = pr.classification_id
      WHERE pr.award_code = $1
        AND pr.classification_id = $2
        AND pr.employment_type = $3
      ORDER BY pr.effective_date DESC
    `, [awardCode, classification_id, employment_type]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/penalty-rates?employment_type=Y
router.get('/penalty-rates', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const { employment_type } = req.query;
    const query = employment_type
      ? 'SELECT * FROM penalty_rates WHERE award_code = $1 AND employment_type = $2 ORDER BY effective_date DESC'
      : 'SELECT * FROM penalty_rates WHERE award_code = $1 ORDER BY effective_date DESC';
    const params = employment_type ? [awardCode, employment_type] : [awardCode];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/allowances
router.get('/allowances', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const result = await pool.query(
      'SELECT * FROM allowances WHERE award_code = $1 ORDER BY allowance_type',
      [awardCode]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/break-entitlements
router.get('/break-entitlements', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const result = await pool.query(
      'SELECT * FROM break_entitlements WHERE award_code = $1 ORDER BY shift_hours_min',
      [awardCode]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/questions
// Returns classification questionnaire questions and answers
router.get('/questions', async (req, res) => {
  try {
    const awardCode = getAwardCode(req);
    const questions = await pool.query(`
      SELECT * FROM classification_questions WHERE award_code = $1 ORDER BY sort_order
    `, [awardCode]);
    const answers = await pool.query(`
      SELECT ca.* FROM classification_answers ca
      JOIN classification_questions cq ON cq.id = ca.question_id
      WHERE cq.award_code = $1
      ORDER BY ca.question_id, ca.sort_order
    `, [awardCode]);

    const answersByQuestion = {};
    for (const a of answers.rows) {
      if (!answersByQuestion[a.question_id]) answersByQuestion[a.question_id] = [];
      answersByQuestion[a.question_id].push(a);
    }

    const result = questions.rows.map(q => ({
      ...q,
      answers: answersByQuestion[q.id] || [],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/award/classify
// Body: { answers: { [question_key]: answer_key }, employmentType?: string, award?: string }
router.post('/classify', async (req, res) => {
  try {
    const { answers, employmentType } = req.body;
    const awardCode = getAwardCode(req);
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'answers object is required' });
    }
    const empType = ['full_time', 'part_time', 'casual'].includes(employmentType)
      ? employmentType
      : 'full_time';
    const result = await classifyAndFetch(answers, pool, empType, awardCode);
    res.json(result);
  } catch (err) {
    console.error('Classification error:', err);
    res.status(500).json({ error: 'Classification failed' });
  }
});

// POST /api/award/calculate
// Body: { employmentType, classificationId, shifts, publicHolidays? }
router.post('/calculate', async (req, res) => {
  try {
    const { employmentType, classificationId, shifts, publicHolidays, age, period } = req.body;

    if (!employmentType || !classificationId || !Array.isArray(shifts)) {
      return res.status(400).json({ error: 'employmentType, classificationId, and shifts are required' });
    }

    if (!['full_time', 'part_time', 'casual'].includes(employmentType)) {
      return res.status(400).json({ error: 'Invalid employmentType' });
    }

    if (shifts.length === 0) {
      return res.status(400).json({ error: 'At least one shift is required' });
    }

    if (shifts.length > 28) {
      return res.status(400).json({ error: 'Maximum 28 shifts per calculation' });
    }

    // Validate shift structure
    for (const shift of shifts) {
      if (!shift.date || !shift.startTime || !shift.endTime) {
        return res.status(400).json({ error: 'Each shift must have date, startTime, and endTime' });
      }
    }

    const validPeriod = ['weekly', 'fortnightly'].includes(period) ? period : 'weekly';
    const awardCode = getAwardCode(req);
    const result = await calculateEntitlements(
      { employmentType, classificationId, shifts, publicHolidays: publicHolidays || [], age: age || null, period: validPeriod, awardCode },
      pool
    );

    res.json(result);
  } catch (err) {
    console.error('Calculation error:', err);
    res.status(500).json({ error: 'Calculation failed: ' + err.message });
  }
});

// GET /api/award/content/:key
router.get('/content/:key', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM content_blocks WHERE block_key = $1',
      [req.params.key]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Content block not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/award/content (all blocks)
router.get('/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM content_blocks ORDER BY block_key');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
