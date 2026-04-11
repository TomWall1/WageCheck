import { serverFetch } from './api-server';

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
}

export interface RestaurantRateData {
  levels: LevelRate[];
  penalties: PenaltyInfo[];
  allowances: AllowanceInfo[];
  effectiveDate: string;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const AWARD_CODE = 'MA000119';

export async function getRestaurantRates(): Promise<RestaurantRateData> {
  const [classifications, penalties, allowances] = await Promise.all([
    serverFetch<ApiClassification[]>(`/api/award/classifications?award=${AWARD_CODE}`),
    serverFetch<ApiPenaltyRate[]>(`/api/award/penalty-rates?award=${AWARD_CODE}`),
    serverFetch<ApiAllowance[]>(`/api/award/allowances?award=${AWARD_CODE}`),
  ]);

  const generalCls = classifications
    .filter(c => c.stream === 'general')
    .sort((a, b) => a.level - b.level);

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

  const allowanceInfo: AllowanceInfo[] = allowances
    .filter(a => a.amount !== null)
    .map(a => ({
      type: a.allowance_type,
      name: a.name,
      amount: parseFloat(a.amount!),
      perUnit: a.per_unit || '',
      isAllPurpose: a.is_all_purpose,
    }));

  let effectiveDate = '1 July 2025';
  if (levelRates.length > 0) {
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

export function getLevel(rates: RestaurantRateData, level: number): LevelRate | undefined {
  return rates.levels.find(l => l.level === level);
}

export function getAllowance(rates: RestaurantRateData, type: string): number {
  return rates.allowances.find(a => a.type === type)?.amount ?? 0;
}

export function getLateNightLoading(rates: RestaurantRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'latenight_10pm_to_midnight')?.additionPerHour ?? 0;
}

export function getEarlyMorningLoading(rates: RestaurantRateData): number {
  return rates.penalties.find(p => p.timeBandLabel === 'earlymorning_midnight_to_6am')?.additionPerHour ?? 0;
}
