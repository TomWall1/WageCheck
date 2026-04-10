/**
 * Generic Award rate data provider — fetches live rates from the API
 * for ANY award code. All dollar amounts in content pages should come
 * from this provider, not be hardcoded.
 *
 * Usage:
 *   const rates = await getAwardRates('MA000003');
 *   const level1 = getLevel(rates, 1);
 *   formatCurrency(level1?.casualRate ?? 0);
 */
import { serverFetch } from './api-server';

// ── API types ─────────────────────────────────────────────────────────────

interface ApiClassification {
  id: number; level: number; stream: string; title: string;
  description: string; duties: string[]; indicative_tasks: string[];
}

interface ApiPayRate {
  classification_id: number; employment_type: string;
  rate_type: string; rate_amount: string; effective_date: string;
  title?: string; level?: number; stream?: string;
}

interface ApiPenaltyRate {
  employment_type: string; day_type: string; multiplier: string;
  addition_per_hour: string | null; time_band_label: string | null;
  description: string;
}

interface ApiAllowance {
  allowance_type: string; name: string; description: string;
  amount: string | null; amount_type: string; per_unit: string | null;
  is_all_purpose: boolean;
}

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
}

// ── Helpers ───────────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ── Main fetch function ───────────────────────────────────────────────────

/**
 * Fetch all rate data for any award code.
 * Returns structured data with computed penalty dollar amounts.
 * Called from server components — uses ISR caching.
 */
export async function getAwardRates(awardCode: string): Promise<AwardRateData> {
  const [classifications, penalties, allowancesRaw] = await Promise.all([
    serverFetch<ApiClassification[]>(`/api/award/classifications?award=${awardCode}`).catch(() => [] as ApiClassification[]),
    serverFetch<ApiPenaltyRate[]>(`/api/award/penalty-rates?award=${awardCode}`).catch(() => [] as ApiPenaltyRate[]),
    serverFetch<ApiAllowance[]>(`/api/award/allowances?award=${awardCode}`).catch(() => [] as ApiAllowance[]),
  ]);

  // Include all classifications so non-general streams (e.g. MA000003
  // Grade 3 solo / responsible) are available in rates.levels.
  const targetCls = [...classifications].sort((a, b) => a.level - b.level || a.stream.localeCompare(b.stream));

  // Get penalty multipliers
  const ftPenalties = penalties.filter(p => p.employment_type === 'full_time' && !p.time_band_label);
  const casualPenalties = penalties.filter(p => p.employment_type === 'casual' && !p.time_band_label);
  const getFtMult = (day: string) => parseFloat(ftPenalties.find(p => p.day_type === day)?.multiplier || '1');
  const getCasMult = (day: string) => parseFloat(casualPenalties.find(p => p.day_type === day)?.multiplier || '1');

  // Build level rates
  const levelRates: LevelRate[] = [];
  for (const cls of targetCls) {
    try {
      const rates = await serverFetch<ApiPayRate[]>(
        `/api/award/rates?award=${awardCode}&classification_id=${cls.id}&employment_type=full_time`
      );
      const ftRate = rates.find(r => r.rate_type === 'base_hourly');
      if (!ftRate) continue;

      const ft = parseFloat(ftRate.rate_amount);
      const casual = round2(ft * 1.25);

      levelRates.push({
        level: cls.level,
        stream: cls.stream,
        title: cls.title,
        ftRate: ft,
        casualRate: casual,
        saturdayFt: round2(ft * getFtMult('saturday')),
        saturdayCasual: round2(casual * getCasMult('saturday')),
        sundayFt: round2(ft * getFtMult('sunday')),
        sundayCasual: round2(casual * getCasMult('sunday')),
        publicHolidayFt: round2(ft * getFtMult('public_holiday')),
        publicHolidayCasual: round2(casual * getCasMult('public_holiday')),
      });
    } catch {
      // Skip classifications where rate fetch fails
    }
  }

  // Transform penalties
  const penaltyInfo: PenaltyInfo[] = penalties
    .filter(p => p.employment_type === 'full_time')
    .map(p => {
      const casualMatch = penalties.find(
        cp => cp.employment_type === 'casual' && cp.day_type === p.day_type && cp.time_band_label === p.time_band_label
      );
      return {
        dayType: p.day_type,
        ftMultiplier: parseFloat(p.multiplier),
        casualMultiplier: casualMatch ? parseFloat(casualMatch.multiplier) : parseFloat(p.multiplier),
        additionPerHour: p.addition_per_hour ? parseFloat(p.addition_per_hour) : null,
        timeBandLabel: p.time_band_label,
      };
    });

  // Transform allowances
  const allowanceInfo: AllowanceInfo[] = allowancesRaw
    .filter(a => a.amount !== null)
    .map(a => ({
      type: a.allowance_type,
      name: a.name,
      amount: parseFloat(a.amount!),
      perUnit: a.per_unit || '',
      isAllPurpose: a.is_all_purpose,
      description: a.description,
    }));

  // Determine effective date
  let effectiveDate = '1 July 2025';
  if (levelRates.length > 0 && targetCls.length > 0) {
    try {
      const rates = await serverFetch<ApiPayRate[]>(
        `/api/award/rates?award=${awardCode}&classification_id=${targetCls[0].id}&employment_type=full_time`
      );
      const r = rates.find(r2 => r2.rate_type === 'base_hourly');
      if (r?.effective_date) {
        const d = new Date(r.effective_date);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        effectiveDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      }
    } catch { /* use default */ }
  }

  return { awardCode, levels: levelRates, penalties: penaltyInfo, allowances: allowanceInfo, effectiveDate };
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

/**
 * Get the full multiplier for a time-band loading entry (e.g. 1.10 for 10% evening).
 * For awards that store loadings as multipliers (like MA000003) rather than addition_per_hour.
 */
export function getTimeBandMultiplier(rates: AwardRateData, timeBand: string): number {
  return rates.penalties.find(p => p.timeBandLabel === timeBand)?.ftMultiplier ?? 1;
}
