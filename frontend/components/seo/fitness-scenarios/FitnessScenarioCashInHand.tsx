/**
 * Scenario: Fitness Industry Cash in Hand — Is This Legal?
 * URL: /awards/fitness-award/scenarios/cash-in-hand
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
  { question: 'Is being paid cash in hand illegal?', answer: 'Paying wages in cash is not inherently illegal. What is illegal is failing to meet award minimums, not paying superannuation, not withholding tax, not issuing payslips, and not declaring income. Cash-in-hand arrangements in fitness almost always involve one or more of these failures.' },
  { question: 'My employer says cash is better because I don\'t pay tax — is that true?', answer: 'You are legally required to declare all income, including cash payments, on your tax return. Not declaring it is tax evasion. And the "benefit" of avoiding tax is a myth when you factor in what you lose: no super, no workers\' compensation coverage, no leave entitlements, no payslips to prove your income for loans or rental applications.' },
  { question: 'I\'ve been paid cash for years — can I still recover underpayments?', answer: 'Yes. The Fair Work Ombudsman can investigate and recover underpayments regardless of whether you were paid in cash or by bank transfer. You can recover up to 6 years of shortfalls. Keep any records you have — texts, schedules, bank deposits, anything that documents the hours you worked and what you were paid.' },
];

export default function FitnessScenarioCashInHand({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash-in-hand is common in the fitness industry, especially for personal trainers, group fitness instructors at smaller studios, and swim teachers. It might feel convenient &mdash; and it might even feel like you&apos;re getting a better deal &mdash; but cash-in-hand arrangements in fitness almost always mean you&apos;re losing money, not saving it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No super. No leave. No payslips. No workers&apos; comp. No record of income. That&apos;s not a perk &mdash; it&apos;s a cost.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Employers must pay at least the <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> minimum rate, withhold tax, pay superannuation (currently 12%), issue payslips within one working day, and maintain employment records for 7 years. Cash-in-hand that avoids any of these obligations is unlawful. The method of payment (cash vs. bank transfer) is irrelevant &mdash; all the same obligations apply.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> PT paid $40/hr cash for 20 hours/week. No payslip. No super. No tax withheld.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Missing super:</strong> 12% of $800/week = $96/week in super not being contributed. That&apos;s ~$5,000/year missing from their retirement.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>No workers&apos; comp:</strong> If injured at work, no coverage. In a physically demanding industry, this is a serious risk.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>No penalty rates:</strong> Weekend and public holiday work paid at the same $40/hr &mdash; penalties missing.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The &ldquo;good rate&rdquo; of $40/hr cash actually costs the worker $150+ per week in lost entitlements.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are you receiving payslips for every pay period?</li>
          <li>Is superannuation being paid into your super fund? Check via myGov/ATO</li>
          <li>Is tax being withheld from your pay?</li>
          <li>Does your hourly rate meet the award minimum for your classification level?</li>
          <li>Are penalty rates applied for weekend and public holiday shifts?</li>
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
