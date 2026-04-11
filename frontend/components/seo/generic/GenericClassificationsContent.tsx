/**
 * Generic classifications sub-page content — works for any award.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericClassificationsContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const levels = rates?.levels ?? [];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Your classification level under the {awardName} determines your minimum pay rate. Being classified one level too low can cost you $2&ndash;4 per hour &mdash; more than $3,000 per year for a full-time worker.
      </p>

      {levels.length > 0 ? (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Classification levels</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {levels.map((l, i) => (
              <div key={i} style={{ border: '1.5px solid var(--border)', borderRadius: '10px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                    color: '#ffffff', background: 'var(--primary)', padding: '2px 6px', borderRadius: '4px',
                  }}>
                    Level {l.level}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--secondary)' }}>{l.title}</span>
                  {l.stream !== 'general' && (
                    <span style={{ fontSize: '11px', color: 'var(--secondary-muted)' }}>({l.stream})</span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', margin: 0 }}>
                  Base rate: {formatCurrency(l.ftRate)}/hr &middot; Casual: {formatCurrency(l.casualRate)}/hr
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          Classification data is not currently available for this award. Check the{' '}
          <a href="https://www.fairwork.gov.au/find-help-for/industries-and-jobs" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman</a>{' '}
          for {awardCode} directly.
        </p>
      )}

      <p style={pStyle}>
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>Pay rates by classification</a> | <a href="/guides/am-i-being-underpaid" style={linkStyle}>Am I being underpaid?</a>
      </p>

      <p style={smallStyle}>
        Source: Classification levels are defined in the {awardName} ({awardCode}), published by the Fair Work Commission.
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
