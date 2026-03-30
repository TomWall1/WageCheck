/**
 * Scenario: Saturday Rate — /awards/restaurant-award/scenarios/saturday-rate
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

export default function RScenarioSaturdayRate({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const casualRate = l3?.casualRate ?? 0;
  const satCasualRate = l3?.saturdayCasual ?? 0;
  const satGapPerHour = Math.round((satCasualRate - casualRate) * 100) / 100;
  const satShiftGap = Math.round(satGapPerHour * 6 * 100) / 100;
  const satYearlyGap = Math.round(satShiftGap * 50 * 100) / 100;
  const ftRate = l3?.ftRate ?? 0;
  const satFtRate = l3?.saturdayFt ?? 0;

  const faqData = [
    { question: 'What\'s the exact Saturday multiplier for permanent employees?', answer: '1.25\u00d7 the ordinary hourly rate for permanent employees under the Restaurant Industry Award. Casual Saturday rates include the casual loading plus the Saturday penalty.' },
    { question: 'My employer pays the same rate all week — is that allowed?', answer: 'Only if the single rate demonstrably exceeds all penalty rates including Saturdays, Sundays, and public holidays. Check your Saturday rate specifically — if it matches your Tuesday rate, the Saturday penalty hasn\'t been applied.' },
    { question: 'Can I claim back unpaid Saturday penalties?', answer: 'Yes. Under the Fair Work Act, you can claim up to 6 years of underpayments. Regular Saturday workers who\'ve been paid at the weekday rate can be owed thousands.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your Saturday rate is the same as your Tuesday rate, Saturday <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a> haven&apos;t been applied. The <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> requires a 1.25&times; multiplier for permanent employees working Saturdays.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If your Saturday pay matches your weekday pay &mdash; you&apos;re being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Permanent Saturday rate: 1.25&times; the ordinary hourly rate</li>
          <li>Casual Saturday rate: applicable casual Saturday multiplier</li>
          <li>Saturday penalties are mandatory &mdash; they cannot be absorbed into the base rate unless the rate demonstrably exceeds all entitlements</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Casual Level 3 &mdash; Saturday 6-hour shift</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary casual L3 rate (weekday): {formatCurrency(casualRate)}/hr</li>
            <li>Saturday casual L3 rate: {formatCurrency(satCasualRate)}/hr</li>
            <li>Gap per hour on a Saturday shift: {formatCurrency(satGapPerHour)}/hr</li>
            <li>6-hour Saturday shift underpaid: {formatCurrency(satShiftGap)}</li>
          </ul>
          <p style={smallStyle}>
            Working one Saturday per week at the wrong rate: {formatCurrency(satYearlyGap)}/year. Exact figures depend on your classification level.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Saturday is the busiest day in most restaurants, so many workers do regular Saturday shifts. The 1.25&times; multiplier for permanent employees means a Level 3 worker earning {formatCurrency(ftRate)}/hr ordinary should receive {formatCurrency(satFtRate)}/hr on Saturdays. Being paid at the weekday rate on a 6-hour shift means losing roughly {formatCurrency(Math.round((satFtRate - ftRate) * 6 * 100) / 100)} per shift. Over 50 weeks: {formatCurrency(Math.round((satFtRate - ftRate) * 6 * 50 * 100) / 100)}/year from Saturdays alone.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate rate line for Saturday hours?</li>
          <li>Is the Saturday rate higher than your weekday rate?</li>
          <li>Does it reflect the 1.25&times; multiplier (permanent) or casual Saturday rate?</li>
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
        <p style={pStyle}>Work Saturdays? Check your rate is correct.</p>
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
