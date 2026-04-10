/**
 * Scenario: Fast Food Job With No Payslip — What Are My Rights?
 * /awards/fast-food-award/scenarios/no-payslip
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
  { question: 'What must a payslip include?', answer: 'A payslip must show: the employer\'s name and ABN, the employee\'s name, the pay period, gross and net pay, the hourly rate, hours worked, any loadings or penalty rates, superannuation contributions, and deductions. Electronic payslips are acceptable.' },
  { question: 'What is the penalty for not providing payslips?', answer: 'Failing to issue payslips is a breach of the Fair Work Act. Penalties can be up to $19,800 per breach for an individual and $99,000 per breach for a company. The Fair Work Ombudsman actively investigates and prosecutes payslip breaches in the fast food sector.' },
  { question: 'My employer says they don\'t have to give casuals a payslip — is that true?', answer: 'Absolutely not. Every employee — casual, part-time, or full-time — is entitled to a payslip within one working day of being paid. There is no exception for casuals. If your employer claims otherwise, they are either misinformed or deliberately non-compliant.' },
];

export default function FFScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const casualRate = l1?.casualRate ?? 30.91;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Your employer is breaking the law. Every employee in Australia must receive a payslip within one working day of being paid — no exceptions. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> and the Fair Work Act, this is a non-negotiable requirement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Section 536 of the Fair Work Act 2009 requires all employers to provide payslips within one working day of pay day. This applies to every employee covered by the Fast Food Industry Award (MA000003), whether casual, part-time, or full-time. Payslips must be in a readable format (paper or electronic) and must contain specific details about your pay, hours, rates, loadings, and deductions. Failure to provide payslips is a civil penalty provision.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Without a payslip, you can&apos;t verify these rates</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Grade 1 full-time minimum: ${baseRate.toFixed(2)}/hr</li>
            <li>Grade 1 casual minimum: ${casualRate.toFixed(2)}/hr</li>
            <li>Sunday, late night, and public holiday penalties on top</li>
          </ul>
          <p style={smallStyle}>
            No payslip means you have no way to confirm you&apos;re receiving the correct rate, penalty loadings, or superannuation. This is exactly why payslips are legally required.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are you receiving any payslip at all? If not, request one in writing immediately.</li>
          <li>Keep your own records of hours worked, dates, and amounts received as evidence.</li>
          <li>Check your super fund to see if contributions are being made — no payslip often means no super.</li>
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
