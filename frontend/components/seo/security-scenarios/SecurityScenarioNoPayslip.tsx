/**
 * Scenario: Security Job With No Payslip
 * URL: /awards/security-award/scenarios/no-payslip
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
  { question: 'What must a payslip include?', answer: 'Under the Fair Work Act, a payslip must include: the employer\'s name and ABN, the employee\'s name, the pay period, the gross and net amounts, the hourly rate, the number of hours worked, any loadings, allowances, bonuses, or penalty rates paid separately, superannuation contributions, and any deductions. For security workers, this means night loadings, weekend penalties, and overtime should each be itemised.' },
  { question: 'What is the penalty for not providing payslips?', answer: 'Failure to provide payslips is a breach of the Fair Work Act. Penalties can be up to $16,500 per breach for an individual and $82,500 per breach for a company. Each missing payslip is a separate breach. The Fair Work Ombudsman takes payslip violations seriously because they often indicate broader non-compliance.' },
  { question: 'I have bank transfers but no payslips — is that enough?', answer: 'Bank transfers show you received money, but they do not show whether the amount was correct. Without a payslip, you cannot verify your hourly rate, penalty rates, overtime calculations, or superannuation. A bank transfer alone is not a substitute for a compliant payslip.' },
];

export default function SecurityScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No payslip means no transparency. In security, where your pay should vary significantly between day shifts, night shifts, weekends, and public holidays, a payslip is the only way to verify that each component is being paid correctly. If your employer isn&apos;t providing payslips, they are already breaking the law &mdash; and there is a strong chance other things are wrong too.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No payslip is a red flag, not a minor oversight. It is a legal requirement and its absence often signals deeper problems.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Fair Work Act 2009:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Every employer must provide a payslip within one working day of each pay day</li>
          <li style={{ marginBottom: '6px' }}>Payslips can be electronic (email, app, portal) or paper</li>
          <li style={{ marginBottom: '6px' }}>Payslips must itemise hours, rates, loadings, penalties, overtime, and super</li>
          <li style={{ marginBottom: '6px' }}>Failure to provide payslips attracts penalties per breach</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why it matters for security workers</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Security guard works a mix of day, night, and weekend shifts. Receives a bank transfer each fortnight with no payslip.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Without a payslip, you cannot verify:</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Whether night loadings were applied to overnight hours</li>
            <li>Whether Saturday and Sunday penalties were paid at the correct rate</li>
            <li>Whether overtime was calculated on 12-hour shifts</li>
            <li>Whether superannuation was paid at all</li>
            <li>Whether the correct classification level was used</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            A single bank transfer amount tells you nothing about whether each component of your pay is correct.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Request payslips in writing (email or text). This creates a record.</li>
          <li style={{ marginBottom: '8px' }}>Check your super fund for contributions &mdash; missing payslips often correlate with missing super.</li>
          <li style={{ marginBottom: '8px' }}>Check your ATO income statement via myGov to see if tax is being withheld.</li>
          <li style={{ marginBottom: '8px' }}>Keep your own record of shifts worked &mdash; times, dates, locations.</li>
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
