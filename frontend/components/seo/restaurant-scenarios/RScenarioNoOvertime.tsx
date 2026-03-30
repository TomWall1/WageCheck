/**
 * Scenario: No Overtime Paid — /awards/restaurant-award/scenarios/no-overtime
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

export default function RScenarioNoOvertime({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const ftRate = l3?.ftRate ?? 0;
  const ot15 = Math.round(ftRate * 1.5 * 100) / 100;
  const ot2 = Math.round(ftRate * 2 * 100) / 100;
  // 45hr week = 38 ordinary + 2 at 1.5x + 5 at 2x
  const otOwed = Math.round((ot15 * 2 + ot2 * 5) * 100) / 100;
  const otYearly = Math.round(otOwed * 50 * 100) / 100;

  const faqData = [
    { question: 'Does weekly overtime apply to casual employees the same way?', answer: 'For casuals, the weekly overtime threshold generally doesn\'t apply in the same way. However, daily overtime thresholds do apply — if you work beyond the maximum daily hours, overtime rates kick in regardless of your employment type.' },
    { question: 'My employer says the hours are reasonable so overtime doesn\'t apply — is that right?', answer: 'No. Whether hours are "reasonable" is a separate question under the NES. The award overtime rates apply regardless — every hour beyond 38 in a week (or 7.6 in a day for permanent employees) must be paid at overtime rates. Reasonableness doesn\'t override the award.' },
    { question: 'How far back can I claim unpaid overtime?', answer: 'You can claim up to 6 years of unpaid overtime under the Fair Work Act. If you\'ve been working 40+ hours per week without overtime for years, the total recovery can be substantial.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re almost certainly owed <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a>. Every hour beyond 38 in a week triggers overtime under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>. If you&apos;re working 40+ hours and being paid flat rates for all of them, those extra hours should be at 1.5&times; or 2&times;.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No overtime line on your payslip when you&apos;re working over 38 hours? That&apos;s underpayment.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Weekly overtime: triggered after 38 hours per week</li>
          <li>First 2 overtime hours: paid at 1.5&times; ordinary rate</li>
          <li>After 2 overtime hours: paid at 2&times; ordinary rate</li>
          <li>Daily overtime for permanent employees: triggered after 7.6 hours per day</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Full-time Level 3 working 45 hours/week</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: {formatCurrency(ftRate)}/hr</li>
            <li>First 2 overtime hours (1.5&times;): {formatCurrency(ot15)}/hr</li>
            <li>Remaining 5 overtime hours (2&times;): {formatCurrency(ot2)}/hr</li>
            <li>Overtime owed per week: {formatCurrency(otOwed)}</li>
          </ul>
          <p style={smallStyle}>
            Over 50 weeks, that&apos;s {formatCurrency(otYearly)} in unpaid overtime per year &mdash; from just 7 extra hours per week.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Working just 2 extra hours per week without overtime pay costs a Level 3 permanent employee roughly {formatCurrency(Math.round(ot15 * 2 * 100) / 100)} per week. Over a year, that&apos;s over {formatCurrency(Math.round(ot15 * 2 * 50 * 100) / 100)}. For workers regularly doing 45+ hour weeks, the annual gap runs into five figures. Every unpaid overtime hour is money owed to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate overtime line item?</li>
          <li>Do your total hours exceed 38 per week?</li>
          <li>Are overtime hours paid at 1.5&times; or 2&times; your ordinary rate?</li>
          <li>Do any daily shifts exceed 7.6 hours (permanent)?</li>
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
        <p style={pStyle}>Calculate exactly what your overtime hours should pay.</p>
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
