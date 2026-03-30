/**
 * Restaurant Award Overtime content — /awards/restaurant-award/overtime
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
  { question: 'I\'m on a salary \u2014 do I still get overtime?', answer: 'Only if your salary genuinely covers all award obligations including overtime in every week you work. If you regularly work well beyond 38 hours, ask your employer to show you the calculation. If they can\'t, you may be owed the difference.' },
  { question: 'Can I claim back unpaid overtime from previous years?', answer: 'Yes \u2014 up to 6 years under the Fair Work Act. The Fair Work Ombudsman can investigate and recover this on your behalf.' },
  { question: 'Long hours are just part of working in a kitchen \u2014 right?', answer: 'No. The award exists precisely because the industry has a history of excessive hours without proper compensation. Every hour beyond the overtime threshold must be paid at the higher rate, regardless of culture or expectations.' },
];

export default function RestaurantOvertimeContent({ rates }: { rates: RestaurantRateData }) {
  const l4 = getLevel(rates, 4);
  const l4Base = l4?.ftRate ?? 0;
  const l4Ot15 = Math.round(l4Base * 1.5 * 100) / 100;
  const l4Ot20 = Math.round(l4Base * 2.0 * 100) / 100;
  // 45hr week: 38 ordinary + 2 at 1.5x + 5 at 2x
  const weeklyPaid = l4Base * 45;
  const weeklyOwed = (l4Base * 38) + (l4Ot15 * 2) + (l4Ot20 * 5);
  const weeklyDiff = Math.round((weeklyOwed - weeklyPaid) * 100) / 100;
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000119
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work long shifts or long weeks at a restaurant or caf&eacute; and your pay looks the same every period, overtime almost certainly isn&apos;t being applied. Extra hours are common in the industry. Not being paid for them is just as common.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work more than 38 hours a week or more than 7.6 hours in a single shift &mdash; overtime applies to you.
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
            <strong>Scenario:</strong> Full-time cook, Level 4. Works 45 hours across one week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> {formatCurrency(l4Base)}/hr flat for all 45 hours = {formatCurrency(weeklyPaid)}</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> 38 hours at {formatCurrency(l4Base)}/hr; first 2 overtime hours at {formatCurrency(l4Ot15)}/hr; remaining 5 hours at {formatCurrency(l4Ot20)}/hr = {formatCurrency(weeklyOwed)}</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~{formatCurrency(weeklyDiff)} that week. ~{formatCurrency(Math.round(weeklyDiff * 52))}/year if this happens weekly.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer treats any extra hours as &quot;part of the job.&quot; The overtime calculation is never run.
          </p>
        </div>
      </section>

      {/* When overtime applies */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When does overtime apply?</h2>
        <p style={pStyle}>
          Under the Restaurant Award, overtime is triggered by two thresholds:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Daily:</strong> After more than 7.6 hours worked in a single day (permanent employees), or after 12 hours (casual employees)</li>
          <li><strong>Weekly:</strong> After more than 38 ordinary hours in a week</li>
        </ul>
        <p style={pStyle}>
          Both thresholds operate independently. Exceed either one &mdash; overtime applies to the excess hours.
        </p>
        <p style={pStyle}>
          If your payslip never shows overtime despite regularly working past these thresholds, that&apos;s a red flag.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Overtime rates */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Restaurant Award overtime rates 2025</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Hours worked</th>
                <th style={thStyle}>Rate</th>
                <th style={thStyle}>Level 4 example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Ordinary (up to threshold)</td><td style={tdStyle}>1&times;</td><td style={tdStyle}>{formatCurrency(l4Base)}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; first 2 hours</td><td style={tdStyle}>1.5&times;</td><td style={tdStyle}>{formatCurrency(l4Ot15)}/hr</td></tr>
              <tr><td style={tdStyle}>Overtime &mdash; after 2 hours</td><td style={tdStyle}>2&times;</td><td style={tdStyle}>{formatCurrency(l4Ot20)}/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates for permanent employees. Based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          Overtime interacts with penalty rates on weekends and public holidays. See the <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Restaurant Award penalty rates guide</a> for the full breakdown, or check the <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>Restaurant Award pay rates</a> for base rates by level.
        </p>
      </section>

      {/* TOIL */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Time off in lieu (TOIL)</h2>
        <p style={pStyle}>
          Under some conditions, TOIL can substitute for overtime pay &mdash; but only if:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Agreed in writing before the overtime is worked</li>
          <li>Taken at the overtime rate &mdash; 1 hour at time-and-a-half equals 1.5 hours TOIL, not 1 hour</li>
          <li>Taken within 6 months of accrual</li>
        </ul>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Hour-for-hour TOIL is underpayment.
        </p>
        <p style={pStyle}>
          If you&apos;ve been taking TOIL on a 1:1 basis, the difference is owed.
        </p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Award" />
      </section>

      {/* Common overtime underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common overtime underpayments</h2>

          <h3 style={h3Style}>Long shifts with no daily overtime applied</h3>
          <p style={pStyle}>
            A permanent employee working a 10-hour shift has 2.4 hours of overtime under this award. Many employers pay a flat shift rate regardless of length.
          </p>

          <h3 style={h3Style}>Kitchen salary that &quot;absorbs&quot; all hours</h3>
          <p style={pStyle}>
            A salary only covers overtime if it demonstrably exceeds total award obligations across every week worked. Most don&apos;t &mdash; especially during peak periods.
          </p>

          <h3 style={h3Style}>TOIL taken 1:1</h3>
          <p style={pStyle}>
            1 hour at time-and-a-half = 1.5 hours TOIL minimum. Anything less is underpayment.
          </p>

          <h3 style={h3Style}>Casual daily overtime threshold ignored</h3>
          <p style={pStyle}>
            Casual employees trigger daily overtime after 12 hours. If a casual works a 14-hour shift, the last 2 hours must be paid at overtime rates.
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
          Enter your shifts below and see exactly what you should have been paid &mdash; including every overtime threshold.
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
