/**
 * Server-side API fetch helper for use in Next.js server components.
 *
 * Caching strategy: fetch once at build time, cache indefinitely.
 * Award rates change once a year (1 July). After updating backend
 * seed data, trigger a manual revalidation:
 *
 *   - Vercel: redeploy, or call the on-demand revalidation API
 *   - Self-hosted: rebuild, or use `res.revalidate()` in an API route
 *
 * Setting revalidate to `false` means Next.js will never automatically
 * refetch — the cached result persists until a new build or manual trigger.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function serverFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: false },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}
