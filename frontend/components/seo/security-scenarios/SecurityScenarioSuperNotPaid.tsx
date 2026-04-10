/**
 * Scenario: Security Super Not Being Paid
 * URL: /awards/security-award/scenarios/super-not-paid
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How do I check if my super is being paid?', answer: 'Log into your super fund online or call them directly. You can also check via myGov linked to the ATO — the ATO receives super data from all funds and can show you a complete picture. If contributions have stopped or never started, that is a clear breach.' },
  { question: 'Is there a minimum earnings threshold for super?', answer: 'No. From 1 July 2022, the $450/month threshold was removed. All employees are entitled to superannuation regardless of how much they earn. If you are a security worker earning any amount, your employer must pay super on your ordinary time earnings.' },
  { question: 'Can I recover unpaid super from previous years?', answer: 'Yes. The ATO can pursue unpaid super going back years. You can lodge a report with the ATO online or by phone. The ATO will investigate and can compel the employer to pay the missing contributions plus interest (the Superannuation Guarantee Charge). You can remain anonymous when reporting.' },
];

export default function SecurityScenarioSuperNotPaid({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Missing superannuation is one of the most common issues in the security industry. Your employer is legally required to pay super on top of your wages &mdash; it is not optional, and it does not matter whether you are full-time, part-time, or casual. The current rate is 12% of your ordinary time earnings, paid into your nominated super fund. If it is not showing up, your employer is in breach.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Super is your money. It is paid on top of your wages, not taken from them. If it is missing, you are losing 12% of your earnings.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Superannuation Guarantee:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Employers must pay 12% of ordinary time earnings into your super fund</li>
          <li style={{ marginBottom: '6px' }}>This applies to all employees &mdash; full-time, part-time, and casual</li>
          <li style={{ marginBottom: '6px' }}>There is no minimum earnings threshold</li>
          <li style={{ marginBottom: '6px' }}>Super must be paid at least quarterly</li>
          <li style={{ marginBottom: '6px' }}>Failure to pay super attracts the Superannuation Guarantee Charge (SGC) which includes interest and administration fees</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you&apos;re losing</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard earning $800/week in ordinary time earnings. Employer has not paid super for 2 years.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Super owed per week: $800 x 12% = $96</li>
            <li>Super owed per year: ~$4,992</li>
            <li>Over 2 years: ~$9,984 in missing super</li>
            <li>Plus lost investment returns on that money</li>
            <li>Plus the SGC interest and admin fee the employer will owe the ATO</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Two years of missing super can exceed $10,000 &mdash; money that should be growing in your retirement fund.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Log into your super fund and check the date of the last contribution</li>
          <li style={{ marginBottom: '8px' }}>Check via myGov/ATO for a complete view across all funds</li>
          <li style={{ marginBottom: '8px' }}>Compare contributions to your pay records &mdash; super should be ~12% of ordinary time earnings</li>
          <li style={{ marginBottom: '8px' }}>If contributions have stopped or never started, report it to the ATO</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
