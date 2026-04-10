/**
 * Scenario: My Fast Food Pay Doesn't Match My Hours
 * /awards/fast-food-award/scenarios/pay-doesnt-match
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
  { question: 'What should I do if my pay is consistently short?', answer: 'First, keep your own records of every shift — start time, finish time, and break time. Compare these against your payslips. If there\'s a pattern of underpayment, raise it with your employer in writing. If they don\'t fix it, contact the Fair Work Ombudsman. You can make a claim going back up to 6 years.' },
  { question: 'My employer rounds my hours down — is that legal?', answer: 'Rounding must be fair and consistent. If your employer always rounds down (e.g., clocking off at 5:12pm but only paying to 5:00pm), this is underpayment. Many fast food businesses use electronic time systems that should capture exact minutes. You are entitled to be paid for every minute worked.' },
  { question: 'Can my employer deduct pay for mistakes or till shortages?', answer: 'Generally, no. Under the Fair Work Act, an employer cannot deduct money from your pay unless you have given written authorisation and the deduction is principally for your benefit. Deducting for till shortages, broken equipment, or customer walkouts is not permitted without your genuine consent.' },
];

export default function FFScenarioPayDoesntMatch({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const casualRate = l1?.casualRate ?? 30.91;
  const actualHrs = 22.5;
  const paidHrs = 20;
  const correctPay = Math.round(casualRate * actualHrs * 100) / 100;
  const receivedPay = Math.round(casualRate * paidHrs * 100) / 100;
  const shortfall = Math.round((correctPay - receivedPay) * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your fast food pay does not match the hours you worked, you are being underpaid and need to act. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, you must be paid for every minute of work performed — and your payslip must accurately reflect your hours.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fair Work Act requires employers to keep accurate time and wages records for all employees and to provide payslips that reflect actual hours worked. Under the Fast Food Industry Award (MA000003), you must be paid for all time worked at the applicable rate — including arrival duties, closing tasks, and any time spent waiting for customers. Falsifying time records is a serious offence carrying penalties of up to $99,000 per breach for companies.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Casual Grade 1 — worked 22.5 hrs but paid for 20 hrs</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Casual rate: ${casualRate.toFixed(2)}/hr</li>
            <li>Correct pay (22.5 hrs): ${correctPay.toFixed(2)}</li>
            <li>Received pay (20 hrs): ${receivedPay.toFixed(2)}</li>
            <li>Shortfall: ${shortfall.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            That&apos;s ${shortfall.toFixed(2)} per week. Over a year, it adds up to ${(shortfall * 52).toFixed(2)} in unpaid wages — before penalties and super are considered.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Do the total hours on your payslip match your own record of hours worked?</li>
          <li>Are start and finish times rounded fairly, or always rounded down?</li>
          <li>Are any unauthorised deductions reducing your pay (till shortages, uniforms, etc.)?</li>
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
