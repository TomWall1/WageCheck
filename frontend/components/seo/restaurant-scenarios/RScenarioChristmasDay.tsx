/**
 * Scenario: Christmas Day Pay — /awards/restaurant-award/scenarios/christmas-day
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'The restaurant is closed Christmas Day and I\'m permanent — do I still get paid?', answer: 'Yes. If you\'re a permanent (full-time or part-time) employee and Christmas Day falls on a day you would normally work, you\'re entitled to a paid day off at your ordinary rate. You don\'t lose pay because the business chooses to close.' },
  { question: 'I worked 3 hours on Christmas Day as a permanent employee — do I get paid for 4?', answer: 'Yes. The minimum engagement for permanent and part-time employees on a public holiday is 4 hours. Even if you only work 3 hours, you must be paid for 4 hours at the public holiday rate (2.25\u00d7).' },
  { question: 'I\'m part-time and was rostered off on Christmas Day — am I entitled to anything?', answer: 'If Christmas Day falls on a day you would normally work under your regular roster, you\'re entitled to a paid day off at your ordinary rate. If it doesn\'t fall on one of your normal working days, there\'s generally no entitlement.' },
];

export default function RScenarioChristmasDay({ rates }: { rates?: RestaurantRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l2Ft = l2?.ftRate ?? 24.10;
  const l2Ph = l2?.publicHolidayFt ?? 54.23;
  const l2PhShift = Math.round(l2Ph * 4 * 100) / 100;
  const l2OrdShift = Math.round(l2Ft * 4 * 100) / 100;
  const l2Shortfall = Math.round((l2Ph - l2Ft) * 4 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Christmas Day pay under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> is 2.25&times; the ordinary rate for permanent employees, with the applicable casual <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>public holiday rate</a> for casuals. Minimum engagement is 4 hours for permanent employees and 2 hours for casuals.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Working Christmas Day at your normal rate? You&apos;re being significantly underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Christmas Day is a national public holiday. Under the Restaurant Industry Award (MA000119), public holiday rates apply to all work performed on this day. Permanent employees receive 2.25&times; their ordinary hourly rate. Casuals receive the applicable casual public holiday rate. Minimum engagement is 4 hours for permanent/part-time and 2 hours for casuals.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 2 permanent working Christmas Day</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: {formatCurrency(l2Ft)}/hr</li>
            <li>Christmas Day rate (2.25&times;): {formatCurrency(l2Ph)}/hr</li>
            <li>Minimum 4-hour shift: {formatCurrency(l2PhShift)}</li>
          </ul>
          <p style={smallStyle}>
            If paid at the ordinary rate instead, you&apos;d receive only {formatCurrency(l2OrdShift)} for 4 hours &mdash; a shortfall of {formatCurrency(l2Shortfall)} for a single shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is Christmas Day shown as a public holiday line item?</li>
          <li>Is the rate 2.25&times; your ordinary rate (permanent)?</li>
          <li>Were you paid for at least 4 hours (permanent) or 2 hours (casual)?</li>
          <li>If you didn&apos;t work but it&apos;s your normal day, were you paid your ordinary rate?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section style={sectionStyle}>
        <p style={pStyle}>Check your Christmas Day rate matches the public holiday entitlement.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at fairwork.gov.au.
      </p>

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
