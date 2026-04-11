/**
 * Reference Calculator — independent oracle for verifying awardCalculator.js
 *
 * This module computes expected pay from raw DB rates using simple, transparent
 * arithmetic. It shares ZERO code with the production calculator. Its job is to
 * be obviously correct, not performant.
 *
 * Every expected value traces back to a pay guide number stored in the DB:
 *   base_hourly × multiplier × hours = expected pay
 *   expected_super = OTE × 0.12
 *
 * Usage:
 *   const ref = require('./referenceCalculator');
 *   await ref.init(pool, 'MA000100');
 *   const expected = ref.calcExpectedPay({ empType, level, stream, dayType, hours, ... });
 */

const SGC_RATE = 0.12;

function round2(n) { return Math.round(n * 100) / 100; }
function round4(n) { return Math.round(n * 10000) / 10000; }

class ReferenceCalculator {
  constructor() {
    this.awardCode = null;
    this.classifications = [];   // { id, level, stream }
    this.payRates = [];          // { classification_id, employment_type, rate_type, rate_amount }
    this.penaltyRates = [];      // { employment_type, day_type, time_band_start, time_band_end, multiplier, addition_per_hour }
    this.overtimeRates = [];     // { employment_type, threshold_hours, period, multiplier }
    this.allowances = [];        // { allowance_type, name, amount, per_unit, is_all_purpose }
    this.breakEntitlements = []; // { employment_type, shift_hours_min, break_type, break_duration_min, is_paid }
    this.juniorRates = {};       // loaded from the calculator's hardcoded tables (verified against pay guide)
    this.minimumShift = {};      // { casual: N, part_time: N } in hours
  }

  /**
   * Load all raw data for an award from the DB.
   */
  async init(pool, awardCode) {
    this.awardCode = awardCode;

    const [clsRes, prRes, penRes, otRes, alRes, brRes] = await Promise.all([
      pool.query('SELECT id, level, stream FROM classifications WHERE award_code = $1 ORDER BY stream, level', [awardCode]),
      pool.query('SELECT DISTINCT ON (classification_id, employment_type, rate_type) classification_id, employment_type, rate_type, rate_amount FROM pay_rates WHERE award_code = $1 ORDER BY classification_id, employment_type, rate_type, effective_date DESC', [awardCode]),
      pool.query('SELECT employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour FROM penalty_rates WHERE award_code = $1 AND (shift_type IS NULL)', [awardCode]),
      pool.query('SELECT employment_type, threshold_hours, period, multiplier FROM overtime_rates WHERE award_code = $1 ORDER BY employment_type, period, threshold_hours', [awardCode]),
      pool.query('SELECT DISTINCT ON (allowance_type) allowance_type, name, amount, amount_type, per_unit, is_all_purpose FROM allowances WHERE award_code = $1 ORDER BY allowance_type, effective_date DESC', [awardCode]),
      pool.query('SELECT employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid FROM break_entitlements WHERE award_code = $1', [awardCode]),
    ]);

    this.classifications = clsRes.rows.map(r => ({ id: r.id, level: r.level, stream: r.stream }));
    this.payRates = prRes.rows.map(r => ({
      classification_id: r.classification_id,
      employment_type: r.employment_type,
      rate_type: r.rate_type,
      rate_amount: parseFloat(r.rate_amount),
    }));
    this.penaltyRates = penRes.rows.map(r => ({
      employment_type: r.employment_type,
      day_type: r.day_type,
      time_band_start: r.time_band_start,
      time_band_end: r.time_band_end,
      time_band_label: r.time_band_label,
      multiplier: parseFloat(r.multiplier),
      addition_per_hour: r.addition_per_hour ? parseFloat(r.addition_per_hour) : 0,
    }));
    this.overtimeRates = otRes.rows.map(r => ({
      employment_type: r.employment_type,
      threshold_hours: parseFloat(r.threshold_hours),
      period: r.period,
      multiplier: parseFloat(r.multiplier),
    }));
    this.allowances = alRes.rows.map(r => ({
      allowance_type: r.allowance_type,
      name: r.name,
      amount: r.amount ? parseFloat(r.amount) : null,
      amount_type: r.amount_type,
      per_unit: r.per_unit,
      is_all_purpose: r.is_all_purpose,
    }));
    this.breakEntitlements = brRes.rows.map(r => ({
      employment_type: r.employment_type,
      shift_hours_min: parseFloat(r.shift_hours_min),
      shift_hours_max: r.shift_hours_max ? parseFloat(r.shift_hours_max) : null,
      break_type: r.break_type,
      break_duration_min: parseInt(r.break_duration_min),
      is_paid: r.is_paid,
    }));
  }

  // ── Classification lookup ─────────────────────────────────────────────────
  getClassId(level, stream = 'general') {
    const cls = this.classifications.find(c => c.level === level && c.stream === stream);
    if (!cls) throw new Error(`No classification for level=${level} stream=${stream} in ${this.awardCode}`);
    return cls.id;
  }

  // ── Base rate lookup ──────────────────────────────────────────────────────
  getBaseRate(classificationId, employmentType) {
    const rate = this.payRates.find(r =>
      r.classification_id === classificationId &&
      r.employment_type === employmentType &&
      r.rate_type === 'base_hourly'
    );
    if (!rate) return null;
    return rate.rate_amount;
  }

  getFTBaseRate(classificationId) {
    const rate = this.getBaseRate(classificationId, 'full_time');
    if (!rate) throw new Error(`No full_time base_hourly rate for cls=${classificationId}`);
    return rate;
  }

  // ── Penalty multiplier lookup ─────────────────────────────────────────────
  // For a simple day-type penalty (no time bands), returns the multiplier.
  // Optional classificationId for classification-specific overrides (e.g., MA000003 L1 Sunday).
  /**
   * Returns { multiplier, additionPerHour } for a given penalty context.
   * Some awards (e.g. MA000030) use addition-based penalties (multiplier=1.0, addition=$X/hr).
   */
  getPenaltyInfo(employmentType, dayType, classificationId = null) {
    // Award-specific classification overrides
    if (this.awardCode === 'MA000003' && dayType === 'sunday' && classificationId) {
      const cls = this.classifications.find(c => c.id === classificationId);
      if (cls && cls.level === 1) {
        return this.getPenaltyInfo(employmentType, 'saturday', null);
      }
    }
    if (this.awardCode === 'MA000119' && dayType === 'sunday' && employmentType === 'casual' && classificationId) {
      const cls = this.classifications.find(c => c.id === classificationId);
      if (cls && cls.level <= 2) return { multiplier: 1.20, additionPerHour: 0 };
    }

    const rates = this.penaltyRates.filter(r =>
      r.employment_type === employmentType &&
      r.day_type === dayType &&
      !r.time_band_start
    );
    if (rates.length) {
      // Pick the rate with the highest effective impact
      const best = rates.reduce((a, b) => {
        const aEff = a.multiplier + (parseFloat(a.addition_per_hour) || 0);
        const bEff = b.multiplier + (parseFloat(b.addition_per_hour) || 0);
        return bEff > aEff ? b : a;
      });
      return { multiplier: best.multiplier, additionPerHour: parseFloat(best.addition_per_hour) || 0 };
    }

    const tbRates = this.penaltyRates.filter(r =>
      r.employment_type === employmentType &&
      r.day_type === dayType &&
      r.time_band_start
    );
    if (!tbRates.length) return { multiplier: 1.0, additionPerHour: 0 };
    const ordinaryBand = tbRates.find(r =>
      (r.time_band_label && (r.time_band_label.includes('ordinary') || r.time_band_label === 'day')) ||
      (r.multiplier === 1.0 && !parseFloat(r.addition_per_hour)) ||
      (r.time_band_start && r.time_band_start.substring(0, 5) === '07:00')
    );
    const chosen = ordinaryBand || tbRates.reduce((a, b) => b.multiplier < a.multiplier ? b : a);
    return { multiplier: chosen.multiplier, additionPerHour: parseFloat(chosen.addition_per_hour) || 0 };
  }

  getPenaltyMultiplier(employmentType, dayType, classificationId = null) {
    return this.getPenaltyInfo(employmentType, dayType, classificationId).multiplier;
  }

  // Get all time-band penalties for a given employment type and day type
  getTimeBandPenalties(employmentType, dayType) {
    return this.penaltyRates.filter(r =>
      r.employment_type === employmentType &&
      r.day_type === dayType &&
      r.time_band_start
    );
  }

  // Get all unique penalty configurations for this award
  getAllPenaltyConfigs() {
    const configs = [];
    const seen = new Set();
    for (const r of this.penaltyRates) {
      const key = `${r.employment_type}_${r.day_type}_${r.time_band_start || 'all'}_${r.time_band_end || 'all'}`;
      if (seen.has(key)) continue;
      seen.add(key);
      configs.push(r);
    }
    return configs;
  }

  // ── OT thresholds ─────────────────────────────────────────────────────────
  getOvertimeRates(employmentType) {
    return this.overtimeRates.filter(r => r.employment_type === employmentType);
  }

  getDailyOTThreshold(employmentType) {
    const daily = this.overtimeRates.filter(r => r.employment_type === employmentType && r.period === 'daily');
    if (!daily.length) return null;
    daily.sort((a, b) => a.threshold_hours - b.threshold_hours);
    return {
      threshold: daily[0].threshold_hours,
      tier1Mult: daily[0].multiplier,
      tier2Threshold: daily[1] ? daily[1].threshold_hours : null,
      tier2Mult: daily[1] ? daily[1].multiplier : null,
    };
  }

  getWeeklyOTThreshold(employmentType) {
    const weekly = this.overtimeRates.filter(r => r.employment_type === employmentType && r.period === 'weekly');
    if (!weekly.length) return null;
    weekly.sort((a, b) => a.threshold_hours - b.threshold_hours);
    return {
      threshold: weekly[0].threshold_hours,
      tier1Mult: weekly[0].multiplier,
      tier2Threshold: weekly[1] ? weekly[1].threshold_hours : null,
      tier2Mult: weekly[1] ? weekly[1].multiplier : null,
    };
  }

  // ── Simple shift pay (no OT, no time-band crossings) ─────────────────────
  // For a shift entirely within one penalty zone.
  calcSimpleShiftPay(baseRate, hours, multiplier, additionPerHour = 0) {
    return round2(hours * (baseRate * multiplier + additionPerHour));
  }

  // ── Expected pay for a simple shift on a known day type ───────────────────
  // No OT, no time-band crossing, no missed breaks. Pure rate × hours.
  calcExpectedPay({ classificationId, employmentType, dayType, hours, age = null }) {
    let baseRate = this.getBaseRate(classificationId, employmentType);

    // Junior adjustment — applied to FT rate, then casual loading reapplied
    if (age && this.juniorRates[age] !== undefined && this.juniorRates[age] < 1.0) {
      if (employmentType === 'casual') {
        const ftRate = this.getFTBaseRate(classificationId);
        baseRate = round4(ftRate * this.juniorRates[age] * 1.25);
      } else {
        const ftRate = this.getFTBaseRate(classificationId);
        baseRate = round4(ftRate * this.juniorRates[age]);
      }
    }

    const pi = this.getPenaltyInfo(employmentType, dayType);
    const totalPay = this.calcSimpleShiftPay(baseRate, hours, pi.multiplier, pi.additionPerHour);
    return { baseRate, multiplier: pi.multiplier, additionPerHour: pi.additionPerHour, totalPay };
  }

  // ── Expected base hourly rate (what the calculator should return) ─────────
  calcExpectedBaseRate({ classificationId, employmentType, age = null }) {
    let baseRate = this.getBaseRate(classificationId, employmentType);
    if (age && this.juniorRates[age] !== undefined && this.juniorRates[age] < 1.0) {
      if (employmentType === 'casual') {
        const ftRate = this.getFTBaseRate(classificationId);
        baseRate = round4(ftRate * this.juniorRates[age] * 1.25);
      } else {
        const ftRate = this.getFTBaseRate(classificationId);
        baseRate = round4(ftRate * this.juniorRates[age]);
      }
    }
    return baseRate;
  }

  // ── Expected super ────────────────────────────────────────────────────────
  // Super applies to OTE = ordinary + penalty on ordinary hours.
  // Super does NOT apply to: overtime premium, missed-break penalty, expense allowances.
  calcExpectedSuper(otePay) {
    return round2(otePay * SGC_RATE);
  }

  // ── Daily OT expected pay ─────────────────────────────────────────────────
  // For a single shift exceeding the daily OT threshold on a weekday.
  // Returns { ordinaryPay, otPay, totalPay }
  calcDailyOTExpected({ classificationId, employmentType, totalWorkedHours, dayType = 'weekday' }) {
    const baseRate = this.getBaseRate(classificationId, employmentType);
    const pi = this.getPenaltyInfo(employmentType, dayType);
    const effectiveRate = baseRate * pi.multiplier + pi.additionPerHour;
    const ot = this.getDailyOTThreshold(employmentType);
    if (!ot || totalWorkedHours <= ot.threshold) {
      const pay = this.calcSimpleShiftPay(baseRate, totalWorkedHours, pi.multiplier, pi.additionPerHour);
      return { ordinaryPay: pay, otPay: 0, totalPay: pay };
    }

    const ordinaryHours = ot.threshold;
    const otHours = totalWorkedHours - ordinaryHours;

    // Ordinary portion at penalty rate
    const ordinaryPay = this.calcSimpleShiftPay(baseRate, ordinaryHours, pi.multiplier, pi.additionPerHour);

    // OT portion: higher of OT multiplier vs penalty multiplier (compare effective rates)
    let otPay = 0;
    if (ot.tier2Threshold) {
      const tier1Hours = Math.min(otHours, ot.tier2Threshold - ot.threshold);
      const tier2Hours = Math.max(0, otHours - tier1Hours);
      const tier1EffRate = Math.max(baseRate * ot.tier1Mult, effectiveRate);
      const tier2EffRate = Math.max(baseRate * ot.tier2Mult, effectiveRate);
      otPay = round2(tier1Hours * tier1EffRate + tier2Hours * tier2EffRate);
    } else {
      const otEffRate = Math.max(baseRate * ot.tier1Mult, effectiveRate);
      otPay = round2(otHours * otEffRate);
    }

    return { ordinaryPay, otPay, totalPay: round2(ordinaryPay + otPay) };
  }

  // ── Weekly OT expected pay ────────────────────────────────────────────────
  // For N weekday shifts totalling more than the weekly threshold.
  // Returns the OT premium only (base pay already counted in per-shift totals).
  calcWeeklyOTPremium({ classificationId, employmentType, totalWeeklyHours }) {
    const baseRate = this.getBaseRate(classificationId, employmentType);
    const wot = this.getWeeklyOTThreshold(employmentType);
    if (!wot || totalWeeklyHours <= wot.threshold) return 0;

    const otHours = totalWeeklyHours - wot.threshold;
    if (wot.tier2Threshold) {
      const tier1Cap = wot.tier2Threshold - wot.threshold;
      const tier1Hours = Math.min(otHours, tier1Cap);
      const tier2Hours = Math.max(0, otHours - tier1Hours);
      // Premium = (OT multiplier - 1.0) × base × hours
      // because base pay for these hours is already included in ordinary totals
      return round2(
        tier1Hours * baseRate * (wot.tier1Mult - 1.0) +
        tier2Hours * baseRate * (wot.tier2Mult - 1.0)
      );
    }
    return round2(otHours * baseRate * (wot.tier1Mult - 1.0));
  }

  // ── Time-band shift crossing expected pay ─────────────────────────────────
  // For shifts that cross time-band boundaries (e.g., evening into night).
  // segments: [{ hours, multiplier, additionPerHour }]
  calcTimeBandShiftPay(baseRate, segments) {
    let total = 0;
    for (const seg of segments) {
      total += seg.hours * (baseRate * seg.multiplier + (seg.additionPerHour || 0));
    }
    return round2(total);
  }

  // ── Minimum engagement expected pay ───────────────────────────────────────
  calcMinimumEngagementPay({ classificationId, employmentType, actualHours, dayType = 'weekday' }) {
    const baseRate = this.getBaseRate(classificationId, employmentType);
    const pi = this.getPenaltyInfo(employmentType, dayType);
    return this.calcSimpleShiftPay(baseRate, actualHours, pi.multiplier, pi.additionPerHour);
  }

  // ── Missed break expected pay ─────────────────────────────────────────────
  // If no meal break taken and shift > 5 hours: hours after 5hr mark at double time.
  calcMissedBreakPay({ classificationId, employmentType, totalWorkedHours, dayType = 'weekday' }) {
    const baseRate = this.getBaseRate(classificationId, employmentType);
    const pi = this.getPenaltyInfo(employmentType, dayType);

    if (totalWorkedHours <= 5) {
      return this.calcSimpleShiftPay(baseRate, totalWorkedHours, pi.multiplier, pi.additionPerHour);
    }

    const normalHours = 5;
    const penaltyHours = totalWorkedHours - 5;
    const normalPay = this.calcSimpleShiftPay(baseRate, normalHours, pi.multiplier, pi.additionPerHour);
    const effectiveRate = baseRate * pi.multiplier + pi.additionPerHour;
    const doubleTimeRate = Math.max(baseRate * 2.0, effectiveRate);
    const penaltyPay = round2(penaltyHours * doubleTimeRate);
    return round2(normalPay + penaltyPay);
  }
}

module.exports = { ReferenceCalculator, SGC_RATE, round2, round4 };
