import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import { serverFetch } from '@/lib/api-server';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import HospitalityClassificationsContent from '@/components/seo/awards/HospitalityClassificationsContent';

interface Props { params: Promise<{ awardSlug: string }>; }

export function generateStaticParams() {
  return getAllAwardSlugs().map(slug => ({ awardSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  if (awardSlug === 'hospitality-award') {
    return {
      title: 'Hospitality Award Classifications 2025\u201326 | Review My Pay',
      description: 'Hospitality Award classification levels explained: Level 1 through Level 5, with duties, indicative job titles, and base rates for each. MA000009.',
    };
  }
  return {
    title: `${award.shortName} Classification Levels 2025 — Which Level Are You? | Review My Pay`,
    description: `${award.shortName} classification levels explained: duties, indicative tasks, and base rates for each level. Find out if you're correctly classified.`,
  };
}

interface Classification {
  id: number; level: number; stream: string; title: string;
  description: string; duties: string[]; indicative_tasks: string[];
}

export default async function ClassificationsPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  let classifications: Classification[] = [];
  try {
    classifications = await serverFetch<Classification[]>(`/api/award/classifications?award=${award.code}`);
  } catch { /* API unavailable */ }

  const sorted = [...classifications].sort((a, b) => a.level - b.level);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Classifications', href: `/awards/${awardSlug}/classifications` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="classifications" />

      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
        {awardSlug === 'hospitality-award' ? 'Hospitality Award Classifications 2025\u201326' : `${award.shortName} — Classification Levels`}
      </h1>

      {awardSlug === 'hospitality-award' ? (
        <HospitalityClassificationsContent />
      ) : (
      <>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Your classification level determines your minimum pay rate. Being classified one level too low can cost you $2–4 per hour — more than $3,000 per year for a full-time worker.
      </p>

      {sorted.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {sorted.map(c => (
            <div key={c.id} style={{ border: '1.5px solid var(--border)', borderRadius: '10px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                  color: '#ffffff', background: 'var(--primary)', padding: '2px 6px', borderRadius: '4px',
                }}>
                  Level {c.level}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--secondary)' }}>{c.title}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                {c.description}
              </p>
              {c.duties && c.duties.length > 0 && (
                <ul style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
                  {c.duties.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          Classification data is being loaded. Please check back shortly.
        </p>
      )}

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Pay rates by classification</a> | <a href="/guides/am-i-being-underpaid" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Am I being underpaid?</a>
      </p>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
      </>
      )}
    </div>
  );
}
