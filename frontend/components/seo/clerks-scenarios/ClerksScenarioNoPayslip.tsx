/**
 * Scenario: No Payslip Provided — Clerks Award
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
  { question: 'Is it illegal for my employer not to give me a payslip?', answer: 'Yes. Under the Fair Work Act, employers must provide payslips within 1 business day of paying you. Payslips must include your name, employer\'s name, pay period, gross and net pay, hourly rate, hours worked, superannuation contributions, and any deductions. Failure to provide payslips carries penalties of up to $16,500 per breach for individuals and $82,500 for companies.' },
  { question: 'My payslip only shows a total amount with no breakdown — is that enough?', answer: 'No. A payslip must show the hourly rate, hours worked (including overtime hours separately), any penalty rates or loadings applied, and superannuation contributions. A lump sum with no breakdown is not a compliant payslip and makes it impossible to verify your pay is correct.' },
  { question: 'I lost my payslips — can I still make a claim?', answer: 'Yes. Your employer is required to keep pay records for 7 years. If you request copies, they must provide them. Bank statements showing pay deposits can also help reconstruct your pay history.' },
];

export default function ClerksScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No payslip means no transparency. You can&apos;t verify your hourly rate, check that overtime was paid, or confirm superannuation contributions without one. Under the Fair Work Act, your employer must provide a payslip within 1 business day of each pay. If they don&apos;t, that&apos;s a breach &mdash; and it&apos;s often a sign of deeper problems.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Employers who don&apos;t provide payslips are statistically far more likely to be underpaying.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What your payslip must include</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Your name and employer&apos;s name</li>
            <li style={{ marginBottom: '6px' }}>Pay period and date of payment</li>
            <li style={{ marginBottom: '6px' }}>Gross and net amounts</li>
            <li style={{ marginBottom: '6px' }}>Ordinary hourly rate and hours worked</li>
            <li style={{ marginBottom: '6px' }}>Overtime hours and overtime rate (separately)</li>
            <li style={{ marginBottom: '6px' }}>Any loadings, penalty rates, or allowances</li>
            <li style={{ marginBottom: '6px' }}>Superannuation contributions</li>
            <li style={{ marginBottom: '6px' }}>Any deductions</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why it matters for clerks</h2>
        <p style={pStyle}>
          Clerical roles often involve variable hours &mdash; staying late for deadlines, starting early for meetings. Without a payslip showing hours worked and overtime separately, there&apos;s no way to verify those extra hours were paid at the correct penalty rate. The absence of a payslip doesn&apos;t just hide the problem &mdash; it prevents you from finding it.
        </p>
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
        <p style={pStyle}>Even without a payslip, you can check your bank deposits against what the award requires.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
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
