/**
 * Scenario: No Payslip — /awards/restaurant-award/scenarios/no-payslip
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
  { question: 'Is it legal for my employer to not give me payslips?', answer: 'No. Under the Fair Work Act, every employer must provide a payslip within one working day of each pay day. Failing to provide payslips is a contravention that can result in penalties for the employer.' },
  { question: 'I\'m paid in cash and don\'t get a payslip — am I still entitled to one?', answer: 'Yes. The payment method (cash, bank transfer, cheque) does not change the payslip obligation. You are entitled to a payslip regardless of how you are paid.' },
  { question: 'What if my employer refuses to give me a payslip?', answer: 'Contact the Fair Work Ombudsman on 13 13 94 or visit fairwork.gov.au. Failure to provide payslips is a contravention of the Fair Work Act and can be investigated and penalised.' },
];

export default function RScenarioNoPayslip({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Every employee is entitled to a payslip within one working day of each pay period. Working without payslips is a significant red flag &mdash; it makes it nearly impossible to verify you&apos;re being paid correctly under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re not receiving payslips &mdash; something is wrong.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Fair Work Act 2009:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Employers must provide a payslip within one working day of each pay day</li>
          <li>Payslips must be in electronic or paper form</li>
          <li>This applies to all employees &mdash; permanent, part-time, and casual</li>
          <li>Failure to provide payslips is a contravention of the Act</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What your payslip must show</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Employer&apos;s name and ABN</li>
            <li>Employee&apos;s name</li>
            <li>Award name and classification level</li>
            <li>Pay period and date of payment</li>
            <li>Gross and net amounts</li>
            <li>Ordinary hours worked and hourly rate</li>
            <li>Separate rates for each shift type (Saturday, Sunday, PH, overtime)</li>
            <li>Superannuation contributions</li>
            <li>Any allowances paid</li>
          </ul>
          <p style={smallStyle}>
            Without this information, you cannot verify whether you&apos;re being paid correctly.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Step 1:</strong> Request payslips from your employer in writing (email or text message)</li>
          <li><strong>Step 2:</strong> Keep a record of your request and the date</li>
          <li><strong>Step 3:</strong> If payslips are not provided, contact the Fair Work Ombudsman on 13 13 94</li>
          <li><strong>Step 4:</strong> Keep your own record of hours worked, shifts, and amounts received</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why it matters</h2>
        <p style={pStyle}>
          No payslip means no way to check your <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a>, <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a>, <a href="/awards/restaurant-award/allowances" style={linkStyle}>allowances</a>, or superannuation. In the restaurant industry, where penalty rates and allowances make up a significant portion of total pay, working without payslips dramatically increases the risk of underpayment going undetected.
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
        <p style={pStyle}>Getting payslips but not sure they&apos;re right? Check your pay now.</p>
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
