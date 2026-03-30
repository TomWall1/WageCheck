/**
 * Scenario: Kitchen Overtime — /awards/restaurant-award/scenarios/kitchen-overtime
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

export default function RScenarioKitchenOvertime({ rates }: { rates?: RestaurantRateData }) {
  const l4 = rates ? getLevel(rates, 4) : undefined;

  const l4ft = l4?.ftRate ?? 0;
  const ot15 = Math.round(l4ft * 1.5 * 100) / 100;
  const ot2 = Math.round(l4ft * 2 * 100) / 100;
  const ordinaryPay = Math.round(l4ft * 7.6 * 100) / 100;
  const ot15Pay = Math.round(ot15 * 2 * 100) / 100;
  const ot2Pay = Math.round(ot2 * 0.4 * 100) / 100;
  const correctTotal = Math.round((ordinaryPay + ot15Pay + ot2Pay) * 100) / 100;
  const flatTotal = Math.round(l4ft * 10 * 100) / 100;
  const dailyShortfall = Math.round((correctTotal - flatTotal) * 100) / 100;
  const weeklyShortfall = Math.round(dailyShortfall * 5 * 100) / 100;
  const yearlyShortfall = Math.round(weeklyShortfall * 50 * 100) / 100;

  const faqData = [
    { question: 'Does the 7.6-hour trigger apply to casual employees?', answer: 'No. For casual employees, the daily overtime trigger is 12 hours, not 7.6 hours. The 7.6-hour daily trigger applies to permanent (full-time and part-time) employees.' },
    { question: 'My employer calls it "a long shift" — does the label matter?', answer: 'No. What your employer calls the shift is irrelevant. If you are a permanent employee and work more than 7.6 hours in a day, the excess hours are overtime under the award, regardless of labelling.' },
    { question: 'Can I claim back unpaid overtime?', answer: 'Yes. You can claim unpaid overtime for up to 6 years under the Fair Work Act. Kitchen workers regularly doing 10+ hour shifts without overtime pay can be owed very substantial amounts.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your kitchen shifts regularly exceed 7.6 hours and there&apos;s no overtime on your payslip, you&apos;re almost certainly being underpaid. The daily <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a> trigger under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> is 7.6 hours for permanent employees &mdash; much lower than many kitchen workers realise.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work 10-hour kitchen shifts &mdash; check your overtime now.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119) for permanent employees:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Daily overtime triggers after 7.6 hours</li>
          <li>First 2 hours of overtime: paid at 1.5&times; the ordinary rate</li>
          <li>After 2 hours of overtime: paid at 2&times; the ordinary rate</li>
          <li>A 10-hour shift = 7.6 ordinary hours + 2 hours at 1.5&times; + 0.4 hours at 2&times;</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 4 permanent &mdash; 10-hour shift</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary rate: {formatCurrency(l4ft)}/hr</li>
            <li>7.6 hours ordinary: {formatCurrency(ordinaryPay)}</li>
            <li>2 hours at 1.5&times; ({formatCurrency(ot15)}/hr): {formatCurrency(ot15Pay)}</li>
            <li>0.4 hours at 2&times; ({formatCurrency(ot2)}/hr): {formatCurrency(ot2Pay)}</li>
            <li>Correct total for 10-hour shift: {formatCurrency(correctTotal)}</li>
            <li>If paid flat rate for 10 hours: {formatCurrency(flatTotal)}</li>
            <li>Daily shortfall: {formatCurrency(dailyShortfall)}</li>
          </ul>
          <p style={smallStyle}>
            Five 10-hour shifts per week at the wrong rate: {formatCurrency(weeklyShortfall)}/week, or {formatCurrency(yearlyShortfall)}/year in missed overtime.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Kitchen culture often normalises long shifts without overtime pay. But a chef working five 10-hour shifts per week without proper overtime is losing roughly {formatCurrency(weeklyShortfall)}/week &mdash; close to {formatCurrency(yearlyShortfall)}/year. The longer the shift, the worse it gets: hours beyond the 2-hour overtime mark are at double time.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are your hours split into ordinary and overtime on each shift?</li>
          <li>Does overtime appear at 1.5&times; for the first 2 hours, then 2&times; after?</li>
          <li>Does the daily trigger match 7.6 hours (not 8 or 10)?</li>
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
        <p style={pStyle}>Working long kitchen shifts? Check what your overtime should actually be.</p>
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
