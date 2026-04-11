/**
 * Generic pay rates sub-page content — works for any award.
 * Renders classification rate table from AwardRateData.
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

export default function GenericPayRatesContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const levels = rates?.levels ?? [];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Current hourly pay rates under the {awardName}, effective from {effectiveDate}. Casual rates include the 25% casual loading.
      </p>

      {levels.length > 0 ? (
        <section style={sectionStyle}>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Classification</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>FT/PT Hourly</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Casual Hourly</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((l, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{l.title}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{l.level}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.ftRate)}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{formatCurrency(l.casualRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={smallStyle}>
            Rates sourced from the Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}.
          </p>
        </section>
      ) : (
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          Pay rate data is not currently available for this award. Check the{' '}
          <a href="https://www.fairwork.gov.au/pay-and-wages/paying-wages" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman</a>{' '}
          pay guide for {awardCode} directly.
        </p>
      )}

      <p style={{ ...pStyle, marginTop: '1.5rem' }}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>Penalty rates</a> | <a href={`/awards/${awardSlug}/casual-employees`} style={linkStyle}>Casual employees</a> | <a href={`/awards/${awardSlug}/classifications`} style={linkStyle}>Classifications</a>
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
