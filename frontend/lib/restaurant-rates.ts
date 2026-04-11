/**
 * Restaurant Award rate data provider.
 * Reads directly from seed file — no API calls.
 *
 * Re-exports the generic types so existing components don't break.
 */
import { getAwardRates } from './award-rates';
import type { AwardRateData, LevelRate, PenaltyInfo, AllowanceInfo } from './award-rates';

// Re-export types under the old names for backward compatibility
export type RestaurantRateData = AwardRateData;
export type { LevelRate, PenaltyInfo, AllowanceInfo };

export async function getRestaurantRates(): Promise<RestaurantRateData> {
  return getAwardRates('MA000119');
}

// ── Convenience getters (used by restaurant content components) ──────────

export function getLevel(rates: RestaurantRateData, level: number): LevelRate | undefined {
  return rates.levels.find(l => l.level === level);
}

export function getAllowance(rates: RestaurantRateData, type: string): number {
  return rates.allowances.find(a => a.type === type)?.amount ?? 0;
}

export function getEveningLoading(rates: RestaurantRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'evening_7pm_to_midnight')?.additionPerHour ?? 0;
}

export function getNightLoading(rates: RestaurantRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'night_midnight_to_7am')?.additionPerHour ?? 0;
}
