import { EmploymentType } from '@/types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatHours(decimalHours: number): string {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function getDayLabel(dayType: string): string {
  const labels: Record<string, string> = {
    weekday: 'Weekday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    public_holiday: 'Public holiday',
  };
  return labels[dayType] || dayType;
}

export function getMultiplierLabel(multiplier: number): string {
  if (multiplier === 1.0) return 'Ordinary rate';
  if (multiplier === 1.15) return 'Early morning (×1.15)';
  if (multiplier === 1.2) return '20% penalty (×1.2)';
  if (multiplier === 1.25) return '25% penalty (×1.25)';
  if (multiplier === 1.4) return '40% penalty (×1.4)';
  if (multiplier === 1.5) return 'Time and a half (×1.5)';
  if (multiplier === 2.0) return 'Double time (×2.0)';
  if (multiplier === 2.25) return 'Double time and a quarter (×2.25)';
  return `×${multiplier}`;
}

export function employmentTypeLabel(type: EmploymentType): string {
  const labels: Record<EmploymentType, string> = {
    full_time: 'Full-time',
    part_time: 'Part-time',
    casual: 'Casual',
  };
  return labels[type];
}

export function generateShiftId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')}${suffix}`;
}

export function getAustralianPublicHolidays(year: number, state: string = 'national'): string[] {
  // National public holidays only (state-specific require location input)
  const holidays = [
    `${year}-01-01`,  // New Year's Day
    `${year}-01-27`,  // Australia Day observed (2025 — varies by year)
    `${year}-04-18`,  // Good Friday (varies — 2025 date)
    `${year}-04-19`,  // Easter Saturday
    `${year}-04-20`,  // Easter Sunday
    `${year}-04-21`,  // Easter Monday
    `${year}-04-25`,  // Anzac Day
    `${year}-12-25`,  // Christmas Day
    `${year}-12-26`,  // Boxing Day
  ];
  return holidays;
}
