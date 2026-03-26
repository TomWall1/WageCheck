/**
 * Server-side API fetch helper for use in Next.js server components.
 * Uses ISR with 1-hour revalidation since award rates change annually.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function serverFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}
