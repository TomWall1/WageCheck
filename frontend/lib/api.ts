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

export const api = {
  getMetadata: () => apiFetch('/api/award/metadata'),
  getClassifications: (stream?: string) =>
    apiFetch(`/api/award/classifications${stream ? `?stream=${stream}` : ''}`),
  getRates: (classificationId: number, employmentType: string) =>
    apiFetch(`/api/award/rates?classification_id=${classificationId}&employment_type=${employmentType}`),
  getPenaltyRates: (employmentType?: string) =>
    apiFetch(`/api/award/penalty-rates${employmentType ? `?employment_type=${employmentType}` : ''}`),
  getAllowances: () => apiFetch('/api/award/allowances'),
  getBreakEntitlements: () => apiFetch('/api/award/break-entitlements'),
  getQuestions: () => apiFetch('/api/award/questions'),
  getContent: (key?: string) =>
    apiFetch(key ? `/api/award/content/${key}` : '/api/award/content'),

  classify: (answers: Record<string, string>, employmentType?: string) =>
    apiFetch('/api/award/classify', {
      method: 'POST',
      body: JSON.stringify({ answers, employmentType }),
    }),

  calculate: (payload: {
    employmentType: string;
    classificationId: number;
    shifts: unknown[];
    publicHolidays?: string[];
    age?: number;
  }) =>
    apiFetch('/api/award/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
