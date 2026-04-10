/**
 * Scenario: Super Not Paid in Retail — /awards/retail-award/scenarios/super-not-paid
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How do I check if my super is being paid?', answer: 'Log into your super fund (e.g., AustralianSuper, REST, Hostplus) and check your contribution history. Your employer must pay super at least quarterly. If there are gaps, or if the amounts do not match 12% of your gross pay, super is not being paid correctly.' },
  { question: 'I earn under $450 per month. Do I still get super?', answer: 'Yes. Since 1 July 2022, the $450 per month threshold was removed. All employees are entitled to super regardless of how much they earn. If your employer told you that you do not qualify because of low earnings, that is wrong.' },
  { question: 'My employer says super is included in my hourly rate. Is that legal?', answer: 'Only if your employment contract explicitly states that your rate is inclusive of super and the total still meets the award minimum plus super. In most cases, super must be paid on top of your gross wages. A verbal claim that "super is included" with no written documentation is not sufficient.' },
];

export default function RetailScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const casualRate = l1?.casualRate ?? 28.26;
  const weeklyGross = Math.round(casualRate * 20 * 100) / 100;
  const weeklySuper = Math.round(weeklyGross * 0.12 * 100) / 100;
  const yearlySuper = Math.round(weeklySuper * 48 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your employer must pay superannuation at 12% on top of your gross wages. This applies to all retail employees &mdash; full-time, part-time, and casual &mdash; regardless of age or earnings. Unpaid super is one of the most common and expensive forms of wage theft in retail.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          A casual working 20 hours per week loses over $3,000 per year in retirement savings when super is not paid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Superannuation Guarantee, employers must pay 12% of your ordinary time earnings into your nominated super fund. This is on top of your gross wages, not deducted from them. Payments must be made at least quarterly. Failure to pay super attracts penalties and interest from the ATO.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What this looks like in practice</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Level 1 casual, 20 hours/week at {formatCurrency(casualRate)}/hr:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Weekly gross: ~{formatCurrency(weeklyGross)}</li>
            <li>Super owed per week: ~{formatCurrency(weeklySuper)} (12%)</li>
            <li>Super owed per year (48 weeks): ~{formatCurrency(yearlySuper)}</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            That is {formatCurrency(yearlySuper)} per year stolen from your retirement &mdash; and it compounds over decades.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your super</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Log into your super fund and check your contribution history.</li>
          <li style={{ marginBottom: '8px' }}>Contributions should appear quarterly at minimum.</li>
          <li style={{ marginBottom: '8px' }}>Each contribution should be approximately 12% of your gross pay for that quarter.</li>
          <li style={{ marginBottom: '8px' }}>If contributions are missing, report it to the ATO.</li>
        </ol>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Check your total pay including super &mdash; it takes 2 minutes.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
