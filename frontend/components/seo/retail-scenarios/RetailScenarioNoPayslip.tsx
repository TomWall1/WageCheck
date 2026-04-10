/**
 * Scenario: No Payslip in Retail — /awards/retail-award/scenarios/no-payslip
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Is my employer legally required to give me a payslip?', answer: 'Yes. Under the Fair Work Act, every employer must provide a payslip within 1 business day of paying you. The payslip must be in electronic or paper form and must include your hourly rate, hours worked, gross and net pay, superannuation contributions, and any deductions. Failure to provide payslips is a separate legal breach.' },
  { question: 'What if I\'m paid cash and never get a payslip?', answer: 'Cash payments without payslips are a major red flag. Your employer is still legally required to provide payslips, pay the correct award rate, pay superannuation, and withhold tax. If none of this is happening, multiple laws are being broken simultaneously.' },
  { question: 'Can I report my employer for not providing payslips?', answer: 'Yes. You can report the issue to the Fair Work Ombudsman on 13 13 94 or through their online complaint form. Failing to provide payslips carries penalties of up to $16,500 per breach for individuals and $82,500 for companies.' },
];

export default function RetailScenarioNoPayslip({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Not getting a payslip is illegal. Under the Fair Work Act, your employer must provide a payslip within 1 business day of every pay day. No exceptions. No payslip means you cannot verify your rate, hours, penalty rates, or super &mdash; and in retail, that almost always means something is wrong with your pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No payslip is not a minor oversight. It&apos;s a breach of the law and often a sign of deeper underpayment.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What a payslip must include</h2>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>Employer&apos;s name and ABN</li>
            <li>Employee&apos;s name</li>
            <li>Pay period and date of payment</li>
            <li>Gross and net amounts</li>
            <li>Hourly rate and hours worked (including overtime and penalty hours)</li>
            <li>Any deductions (tax, other)</li>
            <li>Superannuation contributions</li>
          </ul>
          <p style={smallStyle}>
            If any of these are missing, the payslip is non-compliant.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why this matters in retail</h2>
        <p style={pStyle}>
          Without a payslip, you cannot verify that Saturday, Sunday, and public holiday penalty rates are being applied. You cannot check your classification level or confirm super is being paid. In retail, where penalty rates can double your hourly rate on certain days, a missing payslip often masks thousands of dollars in underpayment per year.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Request payslips in writing from your employer.</li>
          <li style={{ marginBottom: '8px' }}>Keep your own records of hours worked and days worked.</li>
          <li style={{ marginBottom: '8px' }}>Use the tool below to estimate what you should have been paid based on your hours.</li>
          <li style={{ marginBottom: '8px' }}>Contact the Fair Work Ombudsman on 13 13 94 if payslips are still not provided.</li>
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
        <p style={pStyle}>No payslip? Calculate what you should have been paid based on your hours.</p>
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
