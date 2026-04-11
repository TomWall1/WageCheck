/**
 * Hospitality Award rate data provider.
 * Reads directly from seed file — no API calls.
 *
 * Re-exports the generic types so existing components don't break.
 */
import { getAwardRates } from './award-rates';
import type { AwardRateData, LevelRate, PenaltyInfo, AllowanceInfo } from './award-rates';

// Re-export types under the old names for backward compatibility
export type HospitalityRateData = AwardRateData;
export type { LevelRate, PenaltyInfo, AllowanceInfo };

export async function getHospitalityRates(): Promise<HospitalityRateData> {
  return getAwardRates('MA000009');
}

// ── Convenience getters (used by hospitality content components) ──────────

export function getLevel(rates: HospitalityRateData, level: number): LevelRate | undefined {
  return rates.levels.find(l => l.level === level);
}

export function getAllowance(rates: HospitalityRateData, type: string): number {
  return rates.allowances.find(a => a.type === type)?.amount ?? 0;
}

export function getEveningLoading(rates: HospitalityRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'evening_7pm_to_midnight')?.additionPerHour ?? 0;
}

export function getNightLoading(rates: HospitalityRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'night_midnight_to_7am')?.additionPerHour ?? 0;
}
