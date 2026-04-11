/**
 * Hospitality Award rate data provider — fetches live rates from the API
 * for use in SEO content components. All dollar amounts in content pages
 * should come from this provider, not be hardcoded.
 */
import { serverFetch } from './api-server';

// ── Types ──────────────────────────────────────────────────────────────────

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

/** A single classification level with computed rates */
export interface LevelRate {
  level: number;
  stream: string;
  title: string;
  ftRate: number;
  casualRate: number;
  /** Penalty dollar amounts: base × multiplier */
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
}

export interface HospitalityRateData {
  /** General stream levels 0–5 + level 7 (Managerial) */
  levels: LevelRate[];
  /** Penalty rate multipliers */
  penalties: PenaltyInfo[];
  /** Allowance amounts */
  allowances: AllowanceInfo[];
  /** e.g. "1 July 2025" */
  effectiveDate: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ── Main fetch function ────────────────────────────────────────────────────

const AWARD_CODE = 'MA000009';

/**
 * Fetch all rate data needed for hospitality content components.
 * Returns structured data with computed penalty dollar amounts.
 * Called from server components — uses ISR caching.
 */
export async function getHospitalityRates(): Promise<HospitalityRateData> {
  // Fetch in parallel
  const [classifications, penalties, allowances] = await Promise.all([
    serverFetch<ApiClassification[]>(`/api/award/classifications?award=${AWARD_CODE}`),
    serverFetch<ApiPenaltyRate[]>(`/api/award/penalty-rates?award=${AWARD_CODE}`),
    serverFetch<ApiAllowance[]>(`/api/award/allowances?award=${AWARD_CODE}`),
  ]);

  // Get the "general" stream classifications (main levels 0–5 + 7 for Managerial)
  const generalCls = classifications
    .filter(c => c.stream === 'general')
    .sort((a, b) => a.level - b.level);

  // Fetch FT rates for each general classification
  const levelRates: LevelRate[] = [];
  for (const cls of generalCls) {
    try {
      const rates = await serverFetch<ApiPayRate[]>(
        `/api/award/rates?award=${AWARD_CODE}&classification_id=${cls.id}&employment_type=full_time`
      );
      const ftRate = rates.find(r => r.rate_type === 'base_hourly');
      if (!ftRate) continue;

      const ft = parseFloat(ftRate.rate_amount);
      const casual = round2(ft * 1.25);

      // Get penalty multipliers for FT and casual
      const ftPenalties = penalties.filter(p => p.employment_type === 'full_time' && !p.time_band_label);
      const casualPenalties = penalties.filter(p => p.employment_type === 'casual' && !p.time_band_label);

      const getFtMult = (day: string) => parseFloat(ftPenalties.find(p => p.day_type === day)?.multiplier || '1');
      const getCasMult = (day: string) => parseFloat(casualPenalties.find(p => p.day_type === day)?.multiplier || '1');

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
  const allowanceInfo: AllowanceInfo[] = allowances
    .filter(a => a.amount !== null)
    .map(a => ({
      type: a.allowance_type,
      name: a.name,
      amount: parseFloat(a.amount!),
      perUnit: a.per_unit || '',
      isAllPurpose: a.is_all_purpose,
    }));

  // Determine effective date from first rate
  let effectiveDate = '1 July 2025';
  if (levelRates.length > 0) {
    // Get from DB
    try {
      const rates = await serverFetch<ApiPayRate[]>(
        `/api/award/rates?award=${AWARD_CODE}&classification_id=${generalCls[0]?.id}&employment_type=full_time`
      );
      const r = rates.find(r2 => r2.rate_type === 'base_hourly');
      if (r?.effective_date) {
        const d = new Date(r.effective_date);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        effectiveDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      }
    } catch { /* use default */ }
  }

  return { levels: levelRates, penalties: penaltyInfo, allowances: allowanceInfo, effectiveDate };
}

// ── Convenience getters ────────────────────────────────────────────────────

/** Get a specific level's data (levels 0–5 in the general stream) */
export function getLevel(rates: HospitalityRateData, level: number): LevelRate | undefined {
  return rates.levels.find(l => l.level === level);
}

/** Get a specific allowance amount */
export function getAllowance(rates: HospitalityRateData, type: string): number {
  return rates.allowances.find(a => a.type === type)?.amount ?? 0;
}

/** Get evening loading (addition_per_hour for evening band) */
export function getEveningLoading(rates: HospitalityRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'evening_7pm_to_midnight')?.additionPerHour ?? 0;
}

/** Get night loading (addition_per_hour for night band) */
export function getNightLoading(rates: HospitalityRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'night_midnight_to_7am')?.additionPerHour ?? 0;
}
