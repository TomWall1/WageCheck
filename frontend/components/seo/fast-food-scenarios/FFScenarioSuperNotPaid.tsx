/**
 * Scenario: Fast Food Super Not Being Paid — What Can I Do?
 * /awards/fast-food-award/scenarios/super-not-paid
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How do I check if my super is being paid?', answer: 'Log into your super fund\'s website or app and check your contribution history. Super must be paid at least quarterly (by the 28th day after each quarter ends). If you see gaps, your employer may not be paying. You can also check via your myGov ATO account.' },
  { question: 'Does my employer have to pay super if I\'m casual or under 18?', answer: 'From 1 July 2024, all employees earn super regardless of how much they earn — the old $450/month threshold has been removed. If you\'re under 18, you must work more than 30 hours per week to qualify. Otherwise, every dollar you earn attracts super at 12%.' },
  { question: 'What can I do if my employer hasn\'t paid my super?', answer: 'Report it to the ATO using the "Report unpaid super" form on the ATO website. The ATO can investigate, issue penalties, and recover unpaid super on your behalf. Employers who fail to pay super on time also face the Super Guarantee Charge, which includes interest and an admin fee.' },
];

export default function FFScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const superRate = 0.12;
  const superPerHour = Math.round(baseRate * superRate * 100) / 100;
  const weeklyHours = 25;
  const weeklySuper = Math.round(superPerHour * weeklyHours * 100) / 100;
  const yearlySuper = Math.round(weeklySuper * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your fast food employer is not paying your superannuation, they are breaking the law. Every employer must pay super at 12% on top of your ordinary time earnings under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> and the Superannuation Guarantee legislation.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Superannuation Guarantee requires all employers to pay super at 12% of an employee&apos;s ordinary time earnings into their nominated super fund. This applies to full-time, part-time, and casual employees. From 1 July 2024, there is no minimum earnings threshold — super is owed on every dollar. Super must be paid at least quarterly, by the 28th day after each quarter ends (28 October, 28 January, 28 April, 28 July).
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1, 25 hours/week — missing super</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Base rate: ${baseRate.toFixed(2)}/hr</li>
            <li>Super per hour (12%): ${superPerHour.toFixed(2)}</li>
            <li>Super per week (25 hrs): ${weeklySuper.toFixed(2)}</li>
            <li>Super per year: ${yearlySuper.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            Over 3 years, that&apos;s ${(yearlySuper * 3).toFixed(2)} in lost retirement savings — plus compound interest you&apos;ll never recover.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show a super contribution amount and fund name?</li>
          <li>Log into your super fund — are contributions appearing quarterly?</li>
          <li>Check the ATO&apos;s &quot;Super guarantee eligibility&quot; tool if your employer claims you&apos;re not entitled.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
