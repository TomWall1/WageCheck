/**
 * Server-side API fetch helper for use in Next.js server components.
 *
 * Includes retry with exponential backoff for 429 (rate limit) and
 * 5xx errors. Successful responses are cached for 24 hours by ISR.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function serverFetch<T>(path: string): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const waitMs = BASE_DELAY_MS * Math.pow(2, attempt - 1);
      await delay(waitMs);
    }

    try {
      const res = await fetch(`${API_URL}${path}`, {
        next: { revalidate: 86400 },
      });

      if (res.status === 429) {
        lastError = new Error(`API rate limited (429): ${path}`);
        continue; // retry
      }

      if (res.status >= 500) {
        lastError = new Error(`API server error (${res.status}): ${path}`);
        continue; // retry
      }

      if (!res.ok) {
        throw new Error(`API error ${res.status}: ${path}`);
      }

      return res.json();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      // Network errors — retry
      if (attempt < MAX_RETRIES) continue;
    }
  }

  throw lastError || new Error(`API fetch failed after ${MAX_RETRIES} retries: ${path}`);
}
