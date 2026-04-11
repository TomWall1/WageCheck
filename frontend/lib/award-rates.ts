/**
 * Award rate data provider — reads directly from backend seed files.
 * No API calls, no network, no rate limiting. Instant at build time.
 *
 * Usage:
 *   const rates = await getAwardRates('MA000003');
 *   const level1 = getLevel(rates, 1);
 *   formatCurrency(level1?.casualRate ?? 0);
 */
import { getAwardRatesFromSeed } from './seed-rates';

// ── Public types ──────────────────────────────────────────────────────────

export interface LevelRate {
  level: number;
  stream: string;
  title: string;
  ftRate: number;
  casualRate: number;
  saturdayFt: number;
  saturdayCasual: number;
  sundayFt: number;
  sundayCasual: number;
  publicHolidayFt: number;
  publicHolidayCasual: number;
}

export interface PenaltyInfo {
  dayType: string;
  ftMultiplier: number;
  casualMultiplier: number;
  additionPerHour: number | null;
  timeBandLabel: string | null;
}

export interface AllowanceInfo {
  type: string;
  name: string;
  amount: number;
  perUnit: string;
  isAllPurpose: boolean;
  description: string;
}

export interface AwardRateData {
  awardCode: string;
  levels: LevelRate[];
  penalties: PenaltyInfo[];
  allowances: AllowanceInfo[];
  effectiveDate: string;
  /** 'hourly' (default) or 'daily' for seagoing/maritime awards */
  rateType: 'hourly' | 'daily';
}

// ── Main function ─────────────────────────────────────────────────────────

/**
 * Get rate data for any award code.
 * Reads directly from the seed file — no API call needed.
 */
export async function getAwardRates(awardCode: string): Promise<AwardRateData> {
  return getAwardRatesFromSeed(awardCode);
}

// ── Convenience getters ───────────────────────────────────────────────────

export function getLevel(rates: AwardRateData, level: number): LevelRate | undefined {
  return rates.levels.find(l => l.level === level);
}

export function getLevelByStream(rates: AwardRateData, level: number, stream: string): LevelRate | undefined {
  return rates.levels.find(l => l.level === level && l.stream === stream);
}

export function getAllowance(rates: AwardRateData, type: string): AllowanceInfo | undefined {
  return rates.allowances.find(a => a.type === type);
}

export function getAllowanceAmount(rates: AwardRateData, type: string): number {
  return rates.allowances.find(a => a.type === type)?.amount ?? 0;
}

export function getPenalty(rates: AwardRateData, dayType: string): PenaltyInfo | undefined {
  return rates.penalties.find(p => p.dayType === dayType && !p.timeBandLabel);
}

export function getTimeBandLoading(rates: AwardRateData, timeBand: string): number {
  return rates.penalties.find(p => p.timeBandLabel === timeBand)?.additionPerHour ?? 0;
}

export function getTimeBandMultiplier(rates: AwardRateData, timeBand: string): number {
  return rates.penalties.find(p => p.timeBandLabel === timeBand)?.ftMultiplier ?? 0;
}
