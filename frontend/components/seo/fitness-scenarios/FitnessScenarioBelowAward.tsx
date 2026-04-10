/**
 * Scenario: Paid Below Award Rate in the Fitness Industry
 * URL: /awards/fitness-award/scenarios/below-award
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
  { question: 'How far back can I claim underpayments?', answer: 'Up to 6 years under the Fair Work Act. This means if you\'ve been paid below the award rate for several years, you can recover the difference for the entire period — not just recent pay periods.' },
  { question: 'My employer says they didn\'t know the rate was wrong — does that matter?', answer: 'No. Ignorance of the award is not a defence. Employers are legally required to pay at least the minimum award rate regardless of whether they knew the correct amount. The underpayment is still owed in full.' },
  { question: 'I\'m worried about losing my job if I raise this — what are my protections?', answer: 'You are legally protected from adverse action under the Fair Work Act. An employer cannot reduce your hours, change your roster, demote you, or terminate you for raising a pay concern. If they do, that is a separate and serious contravention with significant penalties.' },
];

export default function FitnessScenarioBelowAward({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re owed the difference and can recover it. Paying below the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> minimum rate is a contravention of the Fair Work Act &mdash; full stop. It doesn&apos;t matter whether it was deliberate or a mistake. The shortfall is owed to you.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Being paid below the award minimum? You can recover up to 6 years of underpayments.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fitness Industry Award (MA000094) sets minimum pay rates for every classification level and employment type. These are legal minimums. Paying below the award rate is a contravention that can result in penalties for the employer and full recovery of the shortfall for the employee. Rates are updated annually, typically effective 1 July.
        </p>
        <p style={pStyle}>
          The minimum rate includes the base hourly rate for your classification, plus any applicable loadings (casual, weekend, public holiday), penalty rates, overtime, and allowances (such as the split shift allowance). If any component is missing, you&apos;re below the award.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual swim teacher, classified at Level 1 but has Certificate IV in Swimming and Water Safety plus 3 years of experience. Paid $25/hr for all shifts including weekends.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 1:</strong> With a Cert IV qualification, should be classified at a higher level with a higher base rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 2:</strong> Casual loading (25%) may not be properly included in the $25/hr rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Issue 3:</strong> Saturday and Sunday shifts paid at the same rate &mdash; weekend penalties missing.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Three separate errors on a single payslip. The worker is below the award on classification, base rate, and penalties.
          </p>
        </div>
      </section>

      {/* Steps to recover */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Steps to recover your pay</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Calculate the difference between what you were paid and what the award requires using the pay checker below</li>
          <li style={{ marginBottom: '8px' }}>Raise the issue with your employer in writing (email or text), stating the shortfall and requesting back-payment</li>
          <li style={{ marginBottom: '8px' }}>If your employer does not resolve it, contact the Fair Work Ombudsman on <strong>13 13 94</strong> &mdash; their service is free</li>
        </ol>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your hourly rate meet the minimum for your classification level?</li>
          <li>Is casual loading shown separately (if applicable)?</li>
          <li>Are penalty rates applied for weekends and public holidays?</li>
          <li>Has your rate increased with the latest annual award review?</li>
          <li>Is the split shift allowance being paid when you work broken shifts?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
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

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
