/**
 * Generic allowances sub-page content — works for any award.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

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

export default function GenericAllowancesContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const allowances = rates?.allowances ?? [];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Allowances under the {awardName} are extra payments for specific conditions, skills, or expenses. They are one of the most commonly missed entitlements after penalty rates.
      </p>

      {allowances.length > 0 ? (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Current allowances</h2>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Allowance</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>When it applies</th>
                </tr>
              </thead>
              <tbody>
                {allowances.map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{a.name}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>
                      ${a.amount.toFixed(2)} {a.perUnit?.replace(/_/g, ' ') || ''}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)', fontSize: '12.5px' }}>{a.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          Allowance data is not currently available for this award. Check the{' '}
          <a href="https://www.fairwork.gov.au/pay-and-wages/paying-wages" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman</a>{' '}
          pay guide for {awardCode} directly.
        </p>
      )}

      <p style={pStyle}>
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>Pay rates</a> | <a href="/guides/allowances-and-loadings" style={linkStyle}>Allowances &amp; loadings guide</a>
      </p>

      <p style={smallStyle}>
        Source: Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}.
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
