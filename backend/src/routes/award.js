const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');
const { calculateEntitlements, getDayType } = require('../services/awardCalculator');
const { classifyAndFetch } = require('../services/classificationEngine');

function bucketAge(age) {
  if (!age) return null;
  if (age < 18) return 'under_18';
  if (age <= 20) return '18_20';
  return '21_plus';
}

const VALID_AWARDS = ['MA000009', 'MA000003', 'MA000119', 'MA000004', 'MA000094', 'MA000080', 'MA000081', 'MA000084', 'MA000022', 'MA000028', 'MA000033', 'MA000002', 'MA000104', 'MA000013', 'MA000120', 'MA000102', 'MA000023', 'MA000005', 'MA000026', 'MA000058', 'MA000082', 'MA000030', 'MA000063', 'MA000095', 'MA000105', 'MA000101', 'MA000091', 'MA000106', 'MA000079', 'MA000016', 'MA000042', 'MA000032', 'MA000103', 'MA000092', 'MA000019', 'MA000021', 'MA000027', 'MA000065', 'MA000074', 'MA000083', 'MA000090', 'MA000099', 'MA000112', 'MA000121'];
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
    console.error('Questions route error:', err);
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
// Body: { employmentType, classificationId, shifts, publicHolidays?, allPurposeAllowancesPerHour? }
router.post('/calculate', async (req, res) => {
  try {
    const { employmentType, classificationId, shifts, publicHolidays, age, period, allPurposeAllowancesPerHour } = req.body;

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
    const validAllPurpose = typeof allPurposeAllowancesPerHour === 'number' && allPurposeAllowancesPerHour >= 0
      ? allPurposeAllowancesPerHour : 0;
    const result = await calculateEntitlements(
      { employmentType, classificationId, shifts, publicHolidays: publicHolidays || [], age: age || null, period: validPeriod, awardCode, allPurposeAllowancesPerHour: validAllPurpose },
      pool
    );

    // ── Anonymous analytics logging (fire-and-forget) ──────────────────────
    const calculationId = uuidv4();
    result.calculationId = calculationId;
    const isTest = req.headers['x-test-mode'] === process.env.ADMIN_SECRET;

    (async () => {
      try {
        const classRow = await pool.query(
          'SELECT level, stream FROM classifications WHERE id = $1 AND award_code = $2',
          [classificationId, awardCode]
        );
        const cl = classRow.rows[0] || {};

        await pool.query(`
          INSERT INTO calculation_logs (id, award_code, classification_level, classification_stream, employment_type, age_bracket, total_shifts, calculated_gross, is_test)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `, [
          calculationId, awardCode, cl.level || null, cl.stream || null,
          employmentType, bucketAge(age), shifts.length,
          result.summary.totalPayOwed, isTest
        ]);

        // Log each shift
        for (const sh of result.shifts) {
          const penaltyHours = sh.segments
            .filter(s => s.multiplier > 1 && !s.missedBreakPenalty)
            .reduce((sum, s) => sum + s.hours, 0);
          const overtimeSegments = sh.segments.filter(s => s.rateLabel && s.rateLabel.toLowerCase().includes('overtime'));
          const otHours = overtimeSegments.reduce((sum, s) => sum + s.hours, 0);
          const otPay = overtimeSegments.reduce((sum, s) => sum + s.pay, 0);

          await pool.query(`
            INSERT INTO calculation_shift_logs (id, calculation_id, day_type, shift_duration_hours, break_minutes, ordinary_hours, ordinary_pay, penalty_hours, penalty_pay, overtime_hours, overtime_pay, total_shift_pay, missed_break_penalty, missed_break_amount)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
          `, [
            uuidv4(), calculationId,
            getDayType(sh.date, publicHolidays || []),
            sh.workedHours, sh.mealBreakMinutes,
            sh.workedHours, sh.ordinaryPay,
            penaltyHours, sh.penaltyExtra,
            otHours, otPay,
            sh.totalPay, sh.missedBreakApplied || false, sh.missedBreakExtra
          ]);
        }

        // Log allowances if provided in request body
        const { allowances } = req.body;
        if (Array.isArray(allowances)) {
          for (const a of allowances) {
            await pool.query(`
              INSERT INTO calculation_allowance_logs (id, calculation_id, allowance_type, allowance_amount, qualified)
              VALUES ($1,$2,$3,$4,$5)
            `, [uuidv4(), calculationId, a.type, a.amount || 0, a.qualified || false]);
          }
        }
      } catch (err) {
        console.error('Analytics log error:', err.message);
      }
    })();

    res.json(result);
  } catch (err) {
    console.error('Calculation error:', err);
    res.status(500).json({ error: 'Calculation failed: ' + err.message });
  }
});

// POST /api/award/log-comparison
// Body: { calculationId, actualPay }
router.post('/log-comparison', async (req, res) => {
  try {
    const { calculationId, actualPay } = req.body;
    if (!calculationId || typeof actualPay !== 'number' || actualPay < 0) {
      return res.status(400).json({ error: 'calculationId and actualPay (number >= 0) are required' });
    }

    const existing = await pool.query(
      'SELECT calculated_gross FROM calculation_logs WHERE id = $1', [calculationId]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    const calculatedGross = parseFloat(existing.rows[0].calculated_gross);
    const gapAmount = Math.round((calculatedGross - actualPay) * 100) / 100;
    const gapPercent = calculatedGross > 0
      ? Math.round((gapAmount / calculatedGross) * 10000) / 100
      : 0;
    const appearsUnderpaid = gapAmount > 0.50;

    await pool.query(`
      UPDATE calculation_logs
      SET actual_pay_entered = $2, gap_amount = $3, gap_percent = $4, appears_underpaid = $5
      WHERE id = $1
    `, [calculationId, actualPay, gapAmount, gapPercent, appearsUnderpaid]);

    res.json({ ok: true, gapAmount, gapPercent, appearsUnderpaid });
  } catch (err) {
    console.error('Log comparison error:', err);
    res.status(500).json({ error: 'Failed to log comparison' });
  }
});

// POST /api/award/log-allowances
// Body: { calculationId, allowances: [{ type, amount, qualified }] }
router.post('/log-allowances', async (req, res) => {
  try {
    const { calculationId, allowances } = req.body;
    if (!calculationId || !Array.isArray(allowances)) {
      return res.status(400).json({ error: 'calculationId and allowances array are required' });
    }

    // Verify the calculation exists
    const existing = await pool.query(
      'SELECT id FROM calculation_logs WHERE id = $1', [calculationId]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    for (const a of allowances) {
      if (!a.type) continue;
      await pool.query(`
        INSERT INTO calculation_allowance_logs (id, calculation_id, allowance_type, allowance_amount, qualified)
        VALUES ($1,$2,$3,$4,$5)
      `, [uuidv4(), calculationId, a.type, a.amount || 0, a.qualified || false]);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Log allowances error:', err);
    res.status(500).json({ error: 'Failed to log allowances' });
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
