/**
 * Scenario: Fitness Job With No Payslip
 * URL: /awards/fitness-award/scenarios/no-payslip
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
  { question: 'Is it illegal to not give me a payslip?', answer: 'Yes. Under the Fair Work Act, employers must issue a payslip within one working day of paying you. This applies to all employees — full-time, part-time, and casual. Not issuing a payslip is a separate contravention with its own penalties, regardless of whether the pay itself is correct.' },
  { question: 'What should a payslip include?', answer: 'A compliant payslip must include: employer name and ABN, employee name, pay period, date of payment, gross and net pay, hourly rate, hours worked, any allowances or loadings, superannuation contributions, and deductions. If your payslip is missing any of these, it doesn\'t meet the legal requirements.' },
  { question: 'I\'ve never received a payslip — what should I do?', answer: 'First, request one in writing (email or text). If your employer refuses or continues to not provide payslips, you can report the matter to the Fair Work Ombudsman on 13 13 94. Keep records of your hours, pay received, and any communication about payslips. The absence of payslips is often a red flag for broader underpayment.' },
];

export default function FitnessScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          No payslip means no transparency. In the fitness industry, missing payslips are disturbingly common &mdash; especially for casual instructors, PTs working at independent studios, and swim teachers at smaller facilities. Without a payslip, you have no way to verify your rate, your classification, your penalties, your super, or your tax.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No payslip is never &ldquo;just an admin issue.&rdquo; It&apos;s a legal breach &mdash; and it&apos;s usually hiding other problems.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act, every employer must issue a payslip to every employee within <strong>one working day</strong> of paying them. Payslips must be in a readable format (paper or electronic) and must contain specific information including hours worked, hourly rate, gross and net pay, super contributions, and any loadings or allowances. Failure to issue a payslip is a contravention that can result in penalties of up to $16,500 per breach for individuals and $82,500 for companies.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual group fitness instructor at a boutique studio. Paid weekly via bank transfer. Has never received a payslip in 18 months of employment.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What she can&apos;t verify:</strong> Her classification level, whether casual loading is included, whether weekend penalties are applied, whether super is being paid, and whether her rate has been updated with the annual increase.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What she discovers:</strong> After requesting payslips and checking her super fund, she finds zero super contributions over 18 months and her rate hasn&apos;t changed despite the July increase.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The missing payslips were hiding missing super ($3,000+) and an outdated hourly rate.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Do you receive a payslip within one working day of each pay day?</li>
          <li>Does the payslip show hours worked, hourly rate, and all loadings separately?</li>
          <li>Does it show superannuation contributions?</li>
          <li>Log into myGov and check your super fund &mdash; are contributions being made?</li>
          <li>Keep your own records of hours worked (screenshots of rosters, text messages confirming shifts)</li>
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
