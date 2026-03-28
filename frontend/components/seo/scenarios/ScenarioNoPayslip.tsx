/**
 * Scenario: Hospitality Casual, No Payslip — What Are My Rights?
 * URL: /awards/hospitality-award/scenarios/no-payslip
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says cash workers don\'t get payslips — is that right?', answer: 'No — and that claim is wrong. Payment method doesn\'t affect the payslip obligation. Cash-paid workers are entitled to payslips exactly like any other employee.' },
  { question: 'Can I still claim back pay without payslips?', answer: 'Yes. Bank statements, text messages about shifts, and calendar records can all be used as evidence. The Fair Work Ombudsman is experienced at working with incomplete records.' },
  { question: 'What penalty does an employer face for not providing payslips?', answer: 'Civil penalties of up to $16,500 per breach for a company, or $3,300 for an individual.' },
];

export default function ScenarioNoPayslip() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You are entitled to a payslip &mdash; regardless of being casual. Under the Fair Work Act, every employee must receive a payslip within one working day of each pay period. There is no exemption for casual workers, cash-paid workers, or short-term workers. Not receiving a payslip is a compliance breach your employer can be reported for &mdash; separate from any pay dispute.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual in hospitality and don&apos;t receive payslips &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fair Work Act, every employer must provide a payslip to every employee within one working day of each pay period. The payslip must include:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Employer name and ABN</li>
          <li>Employee name</li>
          <li>Pay period (dates covered)</li>
          <li><a href="/awards/hospitality-award/classifications" style={linkStyle}>Classification level</a> and award</li>
          <li>Gross pay and net pay</li>
          <li>Ordinary hours and rate applied</li>
          <li>Any <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a> &mdash; separate line per day type</li>
          <li>Any <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowances</a> paid</li>
          <li>Superannuation contributions</li>
        </ul>
        <p style={pStyle}>
          A payslip that shows only a total amount is also non-compliant &mdash; the rate breakdown must be itemised.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why it matters beyond compliance</h2>
        <p style={pStyle}>Without a payslip you can&apos;t check:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Whether your rate is correct for your classification</li>
          <li>Whether penalty rates were applied for weekends and public holidays</li>
          <li>Whether superannuation is being paid</li>
          <li>Whether allowances are being included</li>
        </ul>
        <p style={pStyle}>
          The absence of a payslip often coincides with underpayment &mdash; not always deliberately, but because the lack of transparency removes the most accessible check workers have.
        </p>
        <p style={pStyle}>
          If you&apos;ve been working without payslips, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate what you should have received &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Step 1:</strong> Request payslips in writing &mdash; email or text message. State the dates you worked and ask for payslips for each pay period.
          </p>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Step 2:</strong> If not provided within a reasonable timeframe, report the non-provision to the Fair Work Ombudsman at fairwork.gov.au or call 13 13 94.
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            <strong>Step 3:</strong> Use bank statements to reconstruct payment history &mdash; these show dates and amounts even without itemised payslips.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Without a payslip, you can&apos;t verify any of the following: whether your base rate is correct, whether penalty rates were applied, whether allowances were paid, or whether super was contributed. Workers without payslips are statistically more likely to be underpaid across multiple entitlements simultaneously. The total gap is often $3,000&ndash;$8,000/year when all missed entitlements are calculated together.
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
        <p style={pStyle}>
          Don&apos;t guess &mdash; check what you should have been paid.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
