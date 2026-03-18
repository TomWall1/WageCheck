const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

function awardParam(awardCode?: string | null, prefix = '?') {
  if (!awardCode || awardCode === 'MA000009') return '';
  return `${prefix}award=${awardCode}`;
}

export const api = {
  getMetadata: (awardCode?: string | null) =>
    apiFetch(`/api/award/metadata${awardParam(awardCode)}`),
  getClassifications: (stream?: string, awardCode?: string | null) => {
    const params = new URLSearchParams();
    if (stream) params.set('stream', stream);
    if (awardCode && awardCode !== 'MA000009') params.set('award', awardCode);
    const qs = params.toString();
    return apiFetch(`/api/award/classifications${qs ? `?${qs}` : ''}`);
  },
  getRates: (classificationId: number, employmentType: string, awardCode?: string | null) => {
    const params = new URLSearchParams({ classification_id: String(classificationId), employment_type: employmentType });
    if (awardCode && awardCode !== 'MA000009') params.set('award', awardCode);
    return apiFetch(`/api/award/rates?${params.toString()}`);
  },
  getPenaltyRates: (employmentType?: string, awardCode?: string | null) => {
    const params = new URLSearchParams();
    if (employmentType) params.set('employment_type', employmentType);
    if (awardCode && awardCode !== 'MA000009') params.set('award', awardCode);
    const qs = params.toString();
    return apiFetch(`/api/award/penalty-rates${qs ? `?${qs}` : ''}`);
  },
  getAllowances: (awardCode?: string | null) =>
    apiFetch(`/api/award/allowances${awardParam(awardCode)}`),
  getBreakEntitlements: (awardCode?: string | null) =>
    apiFetch(`/api/award/break-entitlements${awardParam(awardCode)}`),
  getQuestions: (awardCode?: string | null) =>
    apiFetch(`/api/award/questions${awardParam(awardCode)}`),
  getContent: (key?: string) =>
    apiFetch(key ? `/api/award/content/${key}` : '/api/award/content'),

  classify: (answers: Record<string, string>, employmentType?: string, awardCode?: string | null) =>
    apiFetch('/api/award/classify', {
      method: 'POST',
      body: JSON.stringify({ answers, employmentType, award: awardCode }),
    }),

  calculate: (payload: {
    employmentType: string;
    classificationId: number;
    shifts: unknown[];
    publicHolidays?: string[];
    age?: number;
    period?: string;
    awardCode?: string | null;
  }) => {
    const { awardCode, ...rest } = payload;
    return apiFetch('/api/award/calculate', {
      method: 'POST',
      body: JSON.stringify({ ...rest, award: awardCode }),
    });
  },
};
