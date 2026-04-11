/**
 * Generic penalty rates sub-page content — works for any award.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const dayLabels: Record<string, string> = {
  weekday: 'Monday \u2013 Friday', saturday: 'Saturday',
  sunday: 'Sunday', public_holiday: 'Public Holiday',
};
const dayOrder = ['weekday', 'saturday', 'sunday', 'public_holiday'];

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericPenaltyContent({ rates, awardCode, awardName, awardSlug }: Props) {
  const effectiveDate = rates?.effectiveDate ?? '1 July 2025';
  const penalties = rates?.penalties ?? [];

  const basePenalties = penalties.filter(p => !p.timeBandLabel);
  const ftPenalties = basePenalties.filter(p => p.ftMultiplier !== p.casualMultiplier || dayOrder.includes(p.dayType));
  const timeBands = penalties.filter(p => p.timeBandLabel);

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Rates effective {effectiveDate} &middot; {awardCode}
      </p>
      <p style={pStyle}>
        Penalty rates are higher pay rates for working at particular times &mdash; weekends, public holidays, evenings, and late nights. These multipliers are applied to your base hourly rate under the {awardName}.
      </p>

      {basePenalties.length > 0 ? (
        <>
          <section style={sectionStyle}>
            <h2 style={h2Style}>Penalty rate multipliers</h2>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Day</th>
                    <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>FT/PT</th>
                    <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Casual</th>
                  </tr>
                </thead>
                <tbody>
                  {dayOrder.map(day => {
                    const p = basePenalties.find(r => r.dayType === day);
                    if (!p) return null;
                    return (
                      <tr key={day} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{dayLabels[day] || day}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;{p.ftMultiplier.toFixed(2)}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;{p.casualMultiplier.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={smallStyle}>
              Casual multipliers are applied to the casual base rate (which already includes the 25% loading).
            </p>
          </section>

          {timeBands.length > 0 && (
            <section style={sectionStyle}>
              <h2 style={h2Style}>Time-based loadings</h2>
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                      <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Time Band</th>
                      <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Loading</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeBands.map((tb, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{tb.timeBandLabel?.replace(/_/g, ' ') || 'Other'}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>
                          {tb.additionPerHour ? `+$${tb.additionPerHour.toFixed(2)}/hr` : `\u00d7${tb.ftMultiplier.toFixed(2)}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      ) : (
        <p style={{ ...pStyle, fontStyle: 'italic' }}>
          Penalty rate data is not currently available for this award. Check the{' '}
          <a href="https://www.fairwork.gov.au/pay-and-wages/paying-wages" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fair Work Ombudsman</a>{' '}
          pay guide for {awardCode} directly.
        </p>
      )}

      <p style={pStyle}>
        <strong>Tip:</strong> Sunday shifts are the most commonly underpaid across most awards. If you regularly work weekends, use our calculator to check your pay is correct.
      </p>

      <p style={pStyle}>
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>Pay rates</a> | <a href={`/awards/${awardSlug}/overtime`} style={linkStyle}>Overtime</a> | <a href={`/awards/${awardSlug}/casual-employees`} style={linkStyle}>Casual employees</a>
      </p>

      <p style={smallStyle}>
        Source: Fair Work Commission pay guide for {awardCode}, effective {effectiveDate}.
      </p>

      <CheckPayCTA awardCode={awardCode} awardName={awardName} />
    </>
  );
}
