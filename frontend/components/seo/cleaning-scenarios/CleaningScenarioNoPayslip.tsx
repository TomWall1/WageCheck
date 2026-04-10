/**
 * Scenario: Cleaning Job With No Payslip
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
  { question: 'Is it illegal for my cleaning employer not to give me a payslip?', answer: 'Yes. Under the Fair Work Act, every employer must provide a payslip within 1 business day of paying you. This applies regardless of how you\'re paid — bank transfer, cash, cheque. The penalty for not providing payslips is up to $16,500 per breach for an individual and $82,500 for a company.' },
  { question: 'What should a cleaning payslip include?', answer: 'A valid payslip must show: your employer\'s name, your name, the pay period, your gross and net pay, your hourly rate, hours worked (including overtime), any deductions, and your superannuation contribution. If any of these are missing, the payslip is non-compliant.' },
  { question: 'No payslip means I can\'t prove my hours — what do I do?', answer: 'Keep your own records. Write down your start and finish times daily. Save text messages from your employer about shifts. Screenshot roster apps. Bank transfer records showing payment amounts and dates are strong evidence. The Fair Work Ombudsman can also compel employers to produce records.' },
];

export default function CleaningScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000022
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No payslip is a red flag, not a minor oversight. In the cleaning industry, employers who don&apos;t provide payslips are almost always underpaying. The payslip is the evidence trail &mdash; without it, you can&apos;t verify your rate, your hours, your penalties, or your super. That&apos;s exactly why some employers don&apos;t give them.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Every employer in Australia must provide a payslip within 1 business day of payment. No exceptions.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Payslips are <strong>legally required</strong> under section 536 of the Fair Work Act</li>
            <li style={{ marginBottom: '6px' }}>Must be provided within <strong>1 business day</strong> of payment</li>
            <li style={{ marginBottom: '6px' }}>Must include: employer name, hours worked, hourly rate, gross/net pay, super contributions, deductions</li>
            <li style={{ marginBottom: '6px' }}>Penalties: up to <strong>$16,500 per breach</strong> (individual) or <strong>$82,500</strong> (company)</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> A cleaner works 25 hours/week across 5 shifts, paid $500 cash weekly. No payslip, no super. They think they&apos;re earning $20/hr.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Problem 1:</strong> No payslip &mdash; breach of the Fair Work Act
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Problem 2:</strong> $20/hr is below the Level 1 minimum of ~{l1 ? formatCurrency(l1.ftRate) : '&mdash;'}/hr &mdash; underpaid {l1 ? formatCurrency(l1.ftRate - 20) : '&mdash;'}/hr
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Problem 3:</strong> No super &mdash; missing 12% ($60/week)
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Without a payslip, this worker couldn&apos;t see any of these problems. Total underpayment: ~$178/week, $9,280/year.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Have you ever received a payslip from this employer?</li>
          <li style={{ marginBottom: '6px' }}>Does it show all required information (hours, rate, super)?</li>
          <li style={{ marginBottom: '6px' }}>Start keeping your own records of hours worked &mdash; a simple notebook or phone note works</li>
          <li style={{ marginBottom: '6px' }}>Check your super fund to see if contributions are actually being made</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000022" awardName="Cleaning Award" />
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
