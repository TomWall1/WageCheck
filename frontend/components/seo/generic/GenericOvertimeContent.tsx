/**
 * Generic overtime sub-page content — works for any award.
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

export default function GenericOvertimeContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const l1 = rates?.levels?.[0];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Overtime under the {awardName} is paid when you work beyond your ordinary hours. If you regularly work more than 38 hours a week and your pay does not change, overtime is not being calculated.
      </p>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Overtime thresholds</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Trigger</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>First 2 hours</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>After 2 hours</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Weekly (over 38 hours)</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;1.5</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;2.0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Daily (varies by award)</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;1.5</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;2.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        {l1 && (
          <p style={pStyle}>
            For a Level 1 full-time worker earning {formatCurrency(l1.ftRate)}/hr, the first 2 overtime hours pay {formatCurrency(l1.ftRate * 1.5)}/hr and any hours after that pay {formatCurrency(l1.ftRate * 2)}/hr.
          </p>
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Time off in lieu (TOIL)</h2>
        <p style={pStyle}>
          Some awards allow employers and employees to agree to take time off instead of being paid overtime. TOIL must be agreed in writing and taken at the overtime rate &mdash; for example, 1 hour of overtime at time-and-a-half equals 1.5 hours of TOIL. Hour-for-hour TOIL is underpayment.
        </p>
      </section>

      <p style={pStyle}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>Penalty rates</a> | <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>Full pay rate tables</a> | <a href="/guides/overtime-pay-australia" style={linkStyle}>Overtime pay guide</a>
      </p>

      <p style={smallStyle}>
        Source: <a href="https://www.fairwork.gov.au/pay-and-wages/overtime" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman &mdash; overtime</a>. Overtime thresholds and rates are set by the {awardName} and the Fair Work Act 2009.
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
