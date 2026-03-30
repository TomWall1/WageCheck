/**
 * Restaurant Award Pay Rates content — /awards/restaurant-award/pay-rates
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
  { question: 'My payslip doesn\'t show a classification level \u2014 is that a problem?', answer: 'Yes. Your employer is required to tell you your classification level. If it\'s not on your payslip, you have no way of verifying your rate is correct. Ask your employer to confirm your level in writing.' },
  { question: 'I have a Certificate III \u2014 does that mean I\'m at least Level 4?', answer: 'If you hold a Certificate III (or equivalent trade qualification) and use it in your role, you must be classified at Level 4 minimum under the Restaurant Industry Award. Being paid at Level 2 or 3 with a trade qualification is a common source of underpayment.' },
  { question: 'Can my employer set my level lower than what my duties require?', answer: 'No. Your classification is determined by the work you actually perform, not what your employer decides. If your duties match a higher level, you must be paid at that level \u2014 and you may be owed back pay for the difference.' },
];

export default function RestaurantPayRatesContent({ rates }: { rates: RestaurantRateData }) {
  const l3 = getLevel(rates, 3);
  const l4 = getLevel(rates, 4);
  const l3Ft = l3?.ftRate ?? 0;
  const l4Ft = l4?.ftRate ?? 0;
  const diffPerHour = Math.round((l4Ft - l3Ft) * 100) / 100;
  const diffPerWeek = Math.round(diffPerHour * 38 * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in a restaurant or caf&eacute; and have never checked your classification level against the award, there&apos;s a high chance your base rate is wrong. Classification determines your minimum hourly rate &mdash; and every penalty, overtime, and leave payment flows from it. Get the base wrong and everything else is wrong too.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work under the Restaurant Industry Award &mdash; this applies to you.
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
            <strong>Scenario:</strong> Permanent cook, Certificate III qualified, 2 years in the role. Classified and paid as Level 3.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l3Ft)}/hr (Level 3 base rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Level 4 base rate &mdash; {formatCurrency(l4Ft)}/hr (trade qualification = Level 4 minimum)</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: {formatCurrency(diffPerHour)}/hr &times; 38hrs = ~{formatCurrency(diffPerWeek)}/week. ~{formatCurrency(Math.round(diffPerWeek * 52))}/year &mdash; before penalties.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer never updates the classification when the cook completes their qualification. The worker assumes Level 3 is correct because they&apos;ve been there two years.
          </p>
        </div>
      </section>

      {/* Multiplier summary */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How penalty multipliers affect your base rate</h2>
        <p style={pStyle}>
          Your base rate is just the starting point. On Saturdays it&apos;s multiplied by 1.25&times;, on Sundays by 1.5&times;, and on public holidays by 2.25&times;. Casual employees receive their casual rate (base + 25% loading) as the starting point for these multipliers. This means a small difference in base rate compounds significantly across penalty shifts.
        </p>
        <p style={pStyle}>
          For the full breakdown of penalty rates, see the <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates guide</a>.
        </p>
      </section>

      {/* Pay rates table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Award pay rates 2025 &mdash; all levels</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>FT/PT Rate</th>
                <th style={thStyle}>Casual Rate</th>
              </tr>
            </thead>
            <tbody>
              {rates.levels.filter(l => l.level >= 1 && l.level <= 6).map(l => (
                <tr key={l.level}><td style={tdStyle}>Level {l.level}</td><td style={tdStyle}>{l.title}</td><td style={tdStyle}>{formatCurrency(l.ftRate)}/hr</td><td style={tdStyle}>{formatCurrency(l.casualRate)}/hr</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Sunday casual rates differ by level. Level 1&ndash;2 attract a lower Sunday casual multiplier than Level 3&ndash;6. See the <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates guide</a> for the full breakdown. Not sure of your level? Check the <a href="/awards/restaurant-award/classifications" style={linkStyle}>Restaurant Award classifications guide</a>. For overtime rules, see the <a href="/awards/restaurant-award/overtime" style={linkStyle}>Restaurant Award overtime guide</a>.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Introductory level */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Introductory level &mdash; first 3 months only</h2>
        <p style={pStyle}>
          The Restaurant Industry Award includes an introductory classification level for employees in their first 3 months of employment who have no prior relevant experience. After 3 months, the employee must be reclassified to at least Level 1.
        </p>
        <p style={pStyle}>
          If you&apos;ve been employed for longer than 3 months and are still being paid at the introductory rate, you&apos;re being underpaid on every hour worked since that point.
        </p>
      </section>

      {/* Red flags */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Red flags for incorrect pay rates</h2>

          <h3 style={h3Style}>Your level hasn&apos;t changed since you started</h3>
          <p style={pStyle}>
            If your duties have expanded but your classification hasn&apos;t moved, there&apos;s a good chance your base rate is too low.
          </p>

          <h3 style={h3Style}>Trade qualification but below Level 4</h3>
          <p style={pStyle}>
            If you hold a Certificate III or equivalent and use it in your role, you must be at least Level 4. Many qualified cooks are paid at Level 2 or 3.
          </p>

          <h3 style={h3Style}>You supervise staff but aren&apos;t classified Level 5</h3>
          <p style={pStyle}>
            Supervisory duties &mdash; managing shifts, directing other employees, handling complaints &mdash; indicate Level 5 classification.
          </p>

          <h3 style={h3Style}>Your payslip doesn&apos;t show your classification</h3>
          <p style={pStyle}>
            If your payslip doesn&apos;t state your classification level, you have no way to verify your rate. Ask your employer to confirm it in writing.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and because classification affects your base rate, even a one-level error compounds across every penalty, overtime, and leave payment.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
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
          Don&apos;t guess &mdash; a wrong base rate affects every hour you work.
        </p>
        <p style={pStyle}>
          Enter your shifts below and see exactly what you should have been paid &mdash; at the correct classification level, with every penalty rate and loading applied.
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
