/**
 * Build-time rate data provider — reads directly from backend seed files.
 * No API calls, no network, no rate limiting. Instant at build time.
 *
 * The seed files in backend/scripts/seed_ma000XXX.js are the source of truth.
 * This module extracts the rate data from them using regex parsing.
 */

import fs from 'fs';
import path from 'path';
import type { AwardRateData, LevelRate, PenaltyInfo, AllowanceInfo } from './award-rates';

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Parse a seed file and extract all rate data.
 * Returns the same AwardRateData structure as the API-based getAwardRates().
 */
export function getAwardRatesFromSeed(awardCode: string): AwardRateData {
  const fileName = `seed_${awardCode.toLowerCase()}.js`;

  // Try multiple paths — Vercel root may differ from local dev
  const candidates = [
    path.join(process.cwd(), '..', 'backend', 'scripts', fileName),
    path.join(process.cwd(), 'backend', 'scripts', fileName),
    path.join(process.cwd(), '..', '..', 'backend', 'scripts', fileName),
  ];

  let seedPath = '';
  for (const p of candidates) {
    if (fs.existsSync(p)) { seedPath = p; break; }
  }

  if (!seedPath) {
    console.warn(`[seed-rates] No seed file found for ${awardCode}. Tried: ${candidates.join(', ')}`);
    return { awardCode, levels: [], penalties: [], allowances: [], effectiveDate: '1 July 2025' };
  }

  const content = fs.readFileSync(seedPath, 'utf8');

  // Extract effective date
  const effectiveDateMatch = content.match(/EFFECTIVE_DATE\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
  let effectiveDate = '1 July 2025';
  if (effectiveDateMatch) {
    const d = new Date(effectiveDateMatch[1]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    effectiveDate = `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }

  // Extract classifications
  const classificationsMatch = content.match(/const classifications\s*=\s*\[([\s\S]*?)\];/);
  const classifications: { level: number; stream: string; title: string; description: string; duties: string[] }[] = [];

  if (classificationsMatch) {
    const classBlock = classificationsMatch[1];
    const classEntries = classBlock.match(/\{[\s\S]*?sort_order:\s*\d+[\s\S]*?\}/g) || [];

    for (const entry of classEntries) {
      const level = parseInt(entry.match(/level:\s*(\d+)/)?.[1] || '0');
      const stream = entry.match(/stream:\s*'([^']+)'/)?.[1] || 'general';
      const title = entry.match(/title:\s*'([^']+)'/)?.[1] || `Level ${level}`;
      const description = entry.match(/description:\s*'((?:[^'\\]|\\.)*)'/)?.[1] || '';
      const dutiesMatch = entry.match(/duties:\s*\[([\s\S]*?)\]/);
      const duties: string[] = [];
      if (dutiesMatch) {
        const dutyStrings = dutiesMatch[1].match(/'((?:[^'\\]|\\.)*)'/g) || [];
        for (const d of dutyStrings) duties.push(d.slice(1, -1));
      }

      classifications.push({ level, stream, title, description, duties });
    }
  }

  // Extract base rates
  const ratesMatch = content.match(/const rates\s*=\s*\{([\s\S]*?)\};/);
  const rateMap: Record<string, number> = {};

  if (ratesMatch) {
    const rateEntries = ratesMatch[1].match(/'([^']+)':\s*([\d.]+)/g) || [];
    for (const entry of rateEntries) {
      const m = entry.match(/'([^']+)':\s*([\d.]+)/);
      if (m) rateMap[m[1]] = parseFloat(m[2]);
    }
  }

  // Extract penalty rates
  const penaltyMatch = content.match(/const penaltyRates\s*=\s*\[([\s\S]*?)\];\s*\n/);
  const penalties: PenaltyInfo[] = [];

  if (penaltyMatch) {
    const penaltyBlock = penaltyMatch[1];
    const penaltyEntries = penaltyBlock.match(/\{[\s\S]*?description:[\s\S]*?\}/g) || [];

    for (const entry of penaltyEntries) {
      const empType = entry.match(/employment_type:\s*'([^']+)'/)?.[1] || '';
      const dayType = entry.match(/day_type:\s*'([^']+)'/)?.[1] || '';
      const multiplier = parseFloat(entry.match(/multiplier:\s*([\d.]+)/)?.[1] || '1');
      const additionMatch = entry.match(/addition_per_hour:\s*([\d.]+)/);
      const additionPerHour = additionMatch ? parseFloat(additionMatch[1]) : null;
      const timeBandLabel = entry.match(/time_band_label:\s*'([^']+)'/)?.[1] || null;

      if (empType === 'full_time') {
        // Check if we already have this dayType+timeBandLabel
        const existing = penalties.find(p => p.dayType === dayType && p.timeBandLabel === timeBandLabel);
        if (existing) continue;

        // Find the matching casual entry
        const casualEntry = penaltyEntries.find(e => {
          const et = e.match(/employment_type:\s*'([^']+)'/)?.[1];
          const dt = e.match(/day_type:\s*'([^']+)'/)?.[1];
          const tbl = e.match(/time_band_label:\s*'([^']+)'/)?.[1] || null;
          return et === 'casual' && dt === dayType && tbl === timeBandLabel;
        });

        const casualMultiplier = casualEntry
          ? parseFloat(casualEntry.match(/multiplier:\s*([\d.]+)/)?.[1] || String(multiplier))
          : multiplier;

        penalties.push({
          dayType,
          ftMultiplier: multiplier,
          casualMultiplier,
          additionPerHour,
          timeBandLabel,
        });
      }
    }
  }

  // Extract allowances
  const allowanceMatch = content.match(/const allowances\s*=\s*\[([\s\S]*?)\];\s*\n/);
  const allowances: AllowanceInfo[] = [];

  if (allowanceMatch) {
    const allowanceBlock = allowanceMatch[1];
    const allowanceEntries = allowanceBlock.match(/\{[\s\S]*?amount_type:[\s\S]*?\}/g) || [];

    for (const entry of allowanceEntries) {
      const type = entry.match(/allowance_type:\s*'([^']+)'/)?.[1] || '';
      const name = entry.match(/name:\s*'([^']+)'/)?.[1] || '';
      const amount = parseFloat(entry.match(/amount:\s*([\d.]+)/)?.[1] || '0');
      const perUnit = entry.match(/per_unit:\s*'([^']+)'/)?.[1] || '';
      const description = entry.match(/description:\s*'((?:[^'\\]|\\.)*)'/)?.[1] || '';

      allowances.push({
        type,
        name,
        amount,
        perUnit,
        isAllPurpose: false,
        description,
      });
    }
  }

  // Build level rates
  const ftPenalties = penalties.filter(p => !p.timeBandLabel);
  const getFtMult = (day: string) => ftPenalties.find(p => p.dayType === day)?.ftMultiplier ?? 1;
  const getCasMult = (day: string) => ftPenalties.find(p => p.dayType === day)?.casualMultiplier ?? 1;

  const levels: LevelRate[] = [];
  for (const cls of classifications) {
    const key = `${cls.level}_${cls.stream}`;
    const ft = rateMap[key];
    if (!ft) continue;

    const casual = round2(ft * 1.25);

    levels.push({
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
  }

  return { awardCode, levels, penalties, allowances, effectiveDate };
}
