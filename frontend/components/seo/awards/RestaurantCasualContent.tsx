/**
 * Restaurant Award Casual Employees content — /awards/restaurant-award/casual-employees
 * Rates: FWO pay guide MA000119 effective 1 July 2025
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500,
  color: 'var(--secondary)', marginBottom: '10px', marginTop: '0',
};
const h3Style: React.CSSProperties = {
  fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0',
};
const pStyle: React.CSSProperties = {
  fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem',
};
const smallStyle: React.CSSProperties = {
  fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6,
};
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = {
  background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
  borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem',
};
const exampleBoxStyle: React.CSSProperties = {
  background: '#f8f9fa', border: '1.5px solid var(--border)',
  borderRadius: '10px', padding: '20px', marginBottom: '1.5rem',
};
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'Does the 25% casual loading cover Sunday rates?', answer: 'No. The casual loading compensates for lack of leave entitlements. Penalty rates are a separate entitlement that applies on top of the casual rate. Both apply every time.' },
  { question: 'Sunday rates vary by level \u2014 how do I check mine?', answer: 'Under the Restaurant Award, Sunday casual rates differ by classification level. Level 1\u20132 workers attract a different multiplier than Level 3\u20136. Check your classification first using the classifications guide, then look up the corresponding Sunday rate.' },
  { question: 'I work the same shifts every week as a casual \u2014 should I be permanent?', answer: 'Possibly. After 12 months of regular and systematic work, you have the right to request conversion to permanent employment. If your employer has never raised this, they may be in breach of the award.' },
];

export default function RestaurantCasualContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);
  const l1 = getLevel(rates, 1);
  const l3Cas = l3?.casualRate ?? 0;
  const l3SunCas = l3?.sundayCasual ?? 0;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a casual worker in a restaurant or caf&eacute;, the odds are strong that your Sunday rate is the biggest source of underpayment. The 25% casual loading does not cover penalty rates &mdash; they are separate entitlements that both apply. This is one of the most common misrepresentations in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual shifts in any restaurant or caf&eacute; &mdash; this applies to you.
        </p>
        <p style={pStyle}>
          For the full Restaurant Award overview, see the <a href="/awards/restaurant-award/" style={linkStyle}>Restaurant Award pay guide</a>.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual food and beverage attendant, Level 3, standalone caf&eacute;. Works every Sunday, 6-hour shift.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l3Cas)}/hr (casual base &mdash; loading included)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Casual Sunday rate at Level 3 &mdash; {formatCurrency(l3SunCas)}/hr</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{formatCurrency((l3SunCas - l3Cas) * 6)} for one shift. ~{formatCurrency((l3SunCas - l3Cas) * 6 * 52)}/year on one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer pays the casual rate every day assuming the loading covers the penalty. It doesn&apos;t.
          </p>
        </div>
      </section>

      {/* What the 25% covers */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What the 25% casual loading covers</h2>
        <p style={pStyle}>
          The casual loading compensates for entitlements you don&apos;t receive as a casual employee:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>No paid annual leave</li>
          <li>No paid personal leave</li>
          <li>No notice of termination</li>
          <li>No redundancy pay</li>
        </ul>
        <p style={pStyle}>
          It is applied to the base rate to produce your casual ordinary hourly rate. That&apos;s your starting point &mdash; not your full entitlement on weekends.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The loading does not replace penalty rates. Both apply.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Casual rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Award casual pay rates 2025 &mdash; by level</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Casual ordinary</th>
                <th style={thStyle}>Saturday</th>
                <th style={thStyle}>Sunday</th>
                <th style={thStyle}>Public holiday</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 6).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td><td style={tdStyle}>{formatCurrency(l.saturdayCasual)}/hr</td><td style={tdStyle}>{formatCurrency(l.sundayCasual)}/hr</td><td style={tdStyle}>{formatCurrency(l.publicHolidayCasual)}/hr</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Sunday casual rates differ by level. Level 1&ndash;2 attract a lower Sunday casual multiplier than Level 3&ndash;6. For the full penalty rate breakdown, see the <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates guide</a>. Not sure of your classification? See the <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications guide</a>. For the full rate table, see <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a>.
        </p>
      </section>

      {/* Minimum engagement */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Minimum casual engagement &mdash; 2 hours per shift</h2>
        <p style={pStyle}>
          Every casual shift under the Restaurant Award must be paid for a minimum of 2 hours, even if you&apos;re sent home early. This is different from the Hospitality Award, which requires 3 hours minimum.
        </p>
        <p style={pStyle}>
          If you&apos;re regularly paid for less than 2 hours on short shifts, you&apos;re owed the difference.
        </p>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common casual underpayments</h2>

          <h3 style={h3Style}>Same rate every day of the week</h3>
          <p style={pStyle}>
            If your payslip shows one rate regardless of Saturday, Sunday, or public holiday, the penalty rates are almost certainly missing. A casual Sunday at Level 1 is not {formatCurrency(l1?.casualRate ?? 0)}/hr &mdash; it&apos;s {formatCurrency(l1?.sundayCasual ?? 0)}/hr.
          </p>

          <h3 style={h3Style}>Loading explained as covering weekends</h3>
          <p style={pStyle}>
            The 25% casual loading and penalty rates are separate entitlements &mdash; both apply. Any employer who says otherwise is wrong.
          </p>

          <h3 style={h3Style}>Wrong classification level</h3>
          <p style={pStyle}>
            Casual workers are entitled to correct classification exactly like permanent staff. Level 1 pay for Level 3 duties means every hour &mdash; including every Sunday &mdash; is underpaid.
          </p>

          <h3 style={h3Style}>No superannuation paid</h3>
          <p style={pStyle}>
            Since November 2022, all casual employees are entitled to super regardless of earnings. If super isn&apos;t appearing on your payslip, it may not be being paid.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Casual conversion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Casual conversion &mdash; your right after 12 months</h2>
        <p style={pStyle}>
          After 12 months of regular and systematic casual work, you have the right to request conversion to permanent part-time or full-time employment.
        </p>
        <p style={pStyle}>
          Ask yourself: are you being rostered on a consistent pattern, trusted with regular responsibilities, and expected to be available week to week? If yes, you may already qualify.
        </p>
        <p style={pStyle}>
          Your employer must respond in writing and, if declining, must provide genuine operational reasons. Vague refusals can be challenged at the Fair Work Commission.
        </p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; including your loading and every applicable penalty rate.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000119).
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Restaurant Industry Award 2020 (MA000119), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
      </p>

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(q => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
      }) }} />
    </>
  );
}
