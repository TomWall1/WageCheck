/**
 * Scenario: Paid Below Award — /awards/restaurant-award/scenarios/below-award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData } from '@/lib/restaurant-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'How far back can I claim underpayments?', answer: 'Up to 6 years under the Fair Work Act. This means if you\'ve been paid below the award rate for several years, you can recover the difference for the entire period — not just recent pay periods.' },
  { question: 'My employer says they didn\'t know the rate was wrong — does that matter?', answer: 'No. Ignorance of the award is not a defence. Employers are legally required to pay at least the minimum award rate regardless of whether they knew the correct rate. The underpayment is still owed.' },
  { question: 'Will raising this with my employer affect my job?', answer: 'You are legally protected from adverse action (dismissal, demotion, reduction of hours) for exercising your workplace rights, which includes raising pay concerns. If your employer retaliates, that\'s a separate and serious contravention of the Fair Work Act.' },
];

export default function RScenarioBelowAward({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re owed the difference and can recover it. Paying below the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> minimum <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>pay rate</a> is a contravention of the Fair Work Act. It doesn&apos;t matter why it happened &mdash; the shortfall is owed to you.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Being paid below the award minimum? You can recover up to 6 years of underpayments.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Restaurant Industry Award (MA000119) sets minimum pay rates for every classification level and employment type. These are legal minimums &mdash; not suggestions. Paying below the award rate is a contravention that can result in penalties for the employer and recovery of the full shortfall for the employee.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Steps to recover your pay</h2>
        <div style={exampleBoxStyle}>
          <ol style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li style={{ marginBottom: '8px' }}>Calculate the difference between what you were paid and what the award requires using the pay checker tool below</li>
            <li style={{ marginBottom: '8px' }}>Raise the issue with your employer in writing (email or text), stating the shortfall and requesting back-payment</li>
            <li style={{ marginBottom: '8px' }}>If your employer does not resolve it, contact the Fair Work Ombudsman on <strong>13 13 94</strong> &mdash; their service is free</li>
          </ol>
          <p style={smallStyle}>
            Keep copies of all payslips, timesheets, bank statements, and any written communication about your pay.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your hourly rate meet the minimum for your classification level?</li>
          <li>Are penalty rates, overtime, and allowances being paid correctly on top?</li>
          <li>Has your rate increased with the latest annual award review?</li>
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
        <p style={pStyle}>Check exactly how much you should be earning under the award.</p>
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
