/**
 * Server-side API fetch helper for use in Next.js server components.
 *
 * Caching strategy: cache successful responses for 24 hours.
 * If the API is unavailable, the fetch throws (no caching of failures).
 * Next.js ISR will retry on the next request after the revalidation window.
 *
 * Award rates change once a year (1 July). 24-hour caching ensures
 * minimal API load while allowing corrections to propagate within a day.
 * To force immediate refresh: redeploy on Vercel.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function serverFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}
