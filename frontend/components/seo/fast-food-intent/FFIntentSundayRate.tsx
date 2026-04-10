/**
 * High-intent: Not Getting Sunday Rates in Fast Food?
 * URL: /awards/fast-food-award/sunday-rates-fast-food
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function FFIntentSundayRate({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;

  const g1Ft = g1 ? formatCurrency(g1.ftRate) : '&mdash;';
  const g1Casual = g1 ? formatCurrency(g1.casualRate) : '&mdash;';
  const g1SundayFt = g1 ? formatCurrency(g1.sundayFt) : '&mdash;';
  const g1SundayCasual = g1 ? formatCurrency(g1.sundayCasual) : '&mdash;';
  const g1SundayDiff = g1 ? formatCurrency(g1.sundayFt - g1.ftRate) : '&mdash;';
  const g1SundayCasualDiff = g1 ? formatCurrency(g1.sundayCasual - g1.casualRate) : '&mdash;';
  const g1PhCasual = g1 ? formatCurrency(g1.publicHolidayCasual) : '&mdash;';

  // Worked example: 6hr Sunday casual shift
  const exampleCorrect = g1 ? formatCurrency(g1.sundayCasual * 6) : '&mdash;';
  const exampleFlat = g1 ? formatCurrency(g1.casualRate * 6) : '&mdash;';
  const exampleShortfall = g1 ? formatCurrency((g1.sundayCasual - g1.casualRate) * 6) : '&mdash;';
  const exampleYearly = g1 ? formatCurrency((g1.sundayCasual - g1.casualRate) * 6 * 52) : '&mdash;';

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000003
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work Sundays in fast food and your pay looks the same as any other day &mdash; you are almost certainly being underpaid. Sunday is the single most underpaid day in the fast food industry. The penalty rate is significant, and missing it costs you real money every single week.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Sunday is not ordinary time in fast food. It attracts a penalty rate, and that penalty rate is not optional.
        </p>
      </section>

      {/* Saturday vs Sunday - the key distinction */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Saturday is ordinary time. Sunday is not.</h2>
          <p style={pStyle}>
            This is one of the most misunderstood parts of the Fast Food Award. <strong>Saturday is ordinary time</strong> &mdash; you get paid your normal hourly rate, no penalty. This is unusual compared to many other awards, and it confuses workers into thinking Sunday is the same.
          </p>
          <p style={pStyle}>
            <strong>Sunday is completely different.</strong> It carries a penalty rate of 150% for full-time and part-time workers, and 175% for casuals. If your employer pays you the same rate on Sunday as Saturday, they are underpaying you.
          </p>
        </div>
      </section>

      {/* What you should be paid */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid on Sunday (Grade 1)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--secondary)' }}>Employment type</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Weekday rate</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Sunday rate</th>
                <th style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary)' }}>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Full-time / Part-time</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{g1Ft}</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)', fontWeight: 600 }}>{g1SundayFt}</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--accent)', fontWeight: 600 }}>+{g1SundayDiff}/hr</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Casual</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)' }}>{g1Casual}</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--secondary-muted)', fontWeight: 600 }}>{g1SundayCasual}</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--accent)', fontWeight: 600 }}>+{g1SundayCasualDiff}/hr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates shown are Grade 1 adult. Grade 2 Sunday rates are higher. Junior rates are a percentage of these amounts but Sunday penalties still apply.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example: what one Sunday shift is really worth</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Worker:</strong> Casual, Grade 1, adult, 6-hour Sunday shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they should earn:</strong> 6 hours &times; {g1SundayCasual} = <strong>{exampleCorrect}</strong>
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What they often get (flat rate):</strong> 6 hours &times; {g1Casual} = {exampleFlat}
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Shortfall: {exampleShortfall} on a single Sunday shift.
          </p>
          <p style={smallStyle}>
            Work one Sunday a week for a year? That&apos;s roughly <strong>{exampleYearly}</strong> in missing penalty rates.
          </p>
        </div>
      </section>

      {/* Why employers get this wrong */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Why employers get Sunday wrong</h2>
        <p style={pStyle}>
          Because Saturday is ordinary time in fast food, some employers assume Sunday is too. Others use a &quot;flat rate&quot; that they claim &quot;averages out&quot; across the week. Neither is correct. The award is clear: Sunday attracts a specific penalty rate, and it must be applied to every hour worked on that day.
        </p>
        <p style={pStyle}>
          Some employers also argue the 25% casual loading covers Sunday penalties. It does not. The casual loading compensates for no leave and no job security. Penalty rates are a separate entitlement on top of the casual rate.
        </p>
      </section>

      {/* What about public holidays */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Public holidays are even higher</h2>
        <p style={pStyle}>
          If Sunday is bad, public holidays are worse. Full-time and part-time workers earn 250% on public holidays. Casuals earn 275%. That&apos;s {g1PhCasual}/hr for a casual Grade 1 worker. If you worked a public holiday at a flat rate, the gap is enormous.
        </p>
        <p style={pStyle}>
          See the full breakdown: <a href="/awards/fast-food-award/penalty-rates" style={linkStyle}>Fast Food Award penalty rates</a>
        </p>
      </section>

      {/* How to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your Sunday pay</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Look at a payslip from a week you worked Sunday.</li>
          <li style={{ marginBottom: '8px' }}>Check whether the Sunday hours are itemised separately with a higher rate.</li>
          <li style={{ marginBottom: '8px' }}>If they show the same rate as your weekday hours, the penalty is missing.</li>
          <li style={{ marginBottom: '8px' }}>Use our calculator to see exactly what you should have earned. <a href="/check-my-pay?award=MA000003" style={linkStyle}>Check your pay &rarr;</a></li>
        </ol>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Award" />
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Sunday penalty rates exist because you&apos;re giving up your weekend. You deserve every dollar of it.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000003).
        </p>
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Fast Food Industry Award 2010 (MA000003), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>
    </>
  );
}
