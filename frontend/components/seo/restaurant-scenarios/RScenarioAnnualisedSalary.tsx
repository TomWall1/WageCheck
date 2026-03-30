/**
 * Scenario: Annualised Salary — /awards/restaurant-award/scenarios/annualised-salary
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

export default function RScenarioAnnualisedSalary({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l3Ft = l3?.ftRate ?? 23.23;
  const weeklyWage = Math.round(l3Ft * 38 * 100) / 100;
  const weeklyAbove = Math.round(weeklyWage * 1.25 * 100) / 100;
  const annualAbove = Math.round(weeklyAbove * 52 * 100) / 100;

  const faqData = [
    { question: 'What does "25% above the minimum weekly wage" mean?', answer: `The annualised wage must be at least 25% higher than the minimum weekly wage for your classification level under the Restaurant Industry Award. This is calculated on the base weekly rate — so if your minimum weekly wage is ${formatCurrency(weeklyWage)}, the annualised arrangement must pay at least ${formatCurrency(weeklyAbove)} per week equivalent.` },
    { question: 'What is the annual reconciliation?', answer: 'At least once every 12 months, the employer must compare what they actually paid you to what the award would have paid for your actual hours worked (including overtime, penalties, and allowances). If the award calculation exceeds the salary paid, the employer must back-pay the shortfall.' },
    { question: 'What if my employer hasn\'t done the reconciliation?', answer: 'If your employer hasn\'t reconciled your annualised salary against the award, the arrangement may not comply with the award. Raise it with your employer in writing. If unresolved, contact the Fair Work Ombudsman on 13 13 94 — they can investigate and enforce compliance.' },
  ];
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          An annualised salary arrangement under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> can be legal &mdash; but only if the annualised wage is at least 25% above the minimum weekly wage for your classification AND the employer reconciles it annually. Many arrangements fail one or both of these tests.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          On an annualised salary? Make sure it&apos;s been reconciled &mdash; you could be owed back-pay.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119), annualised wage arrangements must meet all of these conditions:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Annualised wage at least 25% above the minimum weekly wage for the classification</li>
          <li>Outer limits on hours that can be worked under the arrangement</li>
          <li>Annual reconciliation comparing salary paid to award entitlements for actual hours</li>
          <li>Any shortfall identified must be back-paid to the employee</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 3 annualised salary example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Level 3 minimum weekly wage: {formatCurrency(weeklyWage)}/week</li>
            <li>25% above minimum: {formatCurrency(weeklyAbove)}/week (or {formatCurrency(annualAbove)}/year)</li>
            <li>If your annualised salary falls below {formatCurrency(annualAbove)}/year at Level 3, the arrangement may not be compliant</li>
            <li>If actual hours (with penalties) exceed the annualised amount in any reconciliation period, the shortfall is owed</li>
          </ul>
          <p style={smallStyle}>
            The reconciliation often reveals shortfalls during busy periods with weekend and public holiday work. A Level 3 worker doing regular weekend shifts could be owed thousands in back-pay. Exact thresholds depend on your classification level.
          </p>
        </div>
        <p style={smallStyle}>
          Figures are approximate based on rates effective 1 July 2025. Exact amounts depend on your classification level. Use the calculator below for your specific shifts.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your annualised wage at least 25% above the minimum weekly rate?</li>
          <li>Has your employer conducted an annual reconciliation?</li>
          <li>Were you back-paid any shortfall identified in reconciliation?</li>
          <li>Are there outer limits on your hours documented in writing?</li>
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
        <p style={pStyle}>Calculate what the award would pay for your actual working hours.</p>
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
