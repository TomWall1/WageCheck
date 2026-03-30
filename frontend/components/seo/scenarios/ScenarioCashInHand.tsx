/**
 * Scenario: Hospitality Cash in Hand — Is This Legal?
 * URL: /awards/hospitality-award/scenarios/cash-in-hand
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'My employer says cash workers aren\'t covered by the award — is that true?', answer: 'No — and that claim is wrong. Employment status under the award is determined by the nature of the work performed, not the payment method.' },
  { question: 'I\'ve never gotten a payslip — what can I do?', answer: 'Demand one in writing. Employers are legally required to issue payslips. Non-provision is a separate breach you can report to the Fair Work Ombudsman independently of any pay dispute.' },
  { question: 'What if I\'ve been paid cash and underpaid for years?', answer: 'You can still recover back pay going back 6 years. Bank statements can help reconstruct payment history even without payslips.' },
];

export default function ScenarioCashInHand({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Paying wages in cash is not illegal &mdash; but using cash to avoid award obligations is. Many hospitality workers are paid cash in hand and told that means different rules apply. It doesn&apos;t. The Hospitality Award, minimum engagement rules, <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a>, superannuation obligations, and payslip requirements all apply equally to cash-paid workers.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid cash in hand in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Fair Work Act and the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The method of payment (cash, bank transfer, cheque) doesn&apos;t affect your entitlements</li>
          <li>You&apos;re entitled to the same minimum rates, penalty rates, and <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowances</a> as any other worker</li>
          <li>Your employer must still issue a payslip within one working day of each pay period</li>
          <li>Your employer must still pay superannuation on your earnings</li>
        </ul>
        <p style={pStyle}>
          Cash payment does not give an employer permission to pay below the award rate, skip penalty rates, or avoid any other legal obligation.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check if you&apos;re paid cash</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are you receiving the correct rate for your <a href="/awards/hospitality-award/classifications" style={linkStyle}>classification level</a>?</li>
          <li>Are weekend and public holiday rates higher than weekday rates?</li>
          <li>Are you receiving payslips? If not, that&apos;s a separate compliance breach.</li>
          <li>Is superannuation being paid to your fund?</li>
        </ul>
        <p style={pStyle}>
          If any of these are missing, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check what you should have been paid &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Common issues with cash arrangements</h2>
          <h3 style={h3Style}>Below-award flat rate with no penalty rate breakdowns</h3>
          <p style={pStyle}>
            The most common issue. A cash payment that doesn&apos;t vary by day is almost always applying a flat rate that misses weekend penalties.
          </p>
          <h3 style={h3Style}>No payslip provided</h3>
          <p style={pStyle}>
            Cash-paid workers are frequently not given payslips. This is a breach of the Fair Work Act regardless of payment method. See the <a href="/awards/hospitality-award/scenarios/no-payslip" style={linkStyle}>no payslip scenario</a>.
          </p>
          <h3 style={h3Style}>Superannuation not paid</h3>
          <p style={pStyle}>
            Super must be paid regardless of whether wages are paid in cash. Many cash-in-hand employers don&apos;t pay super.
          </p>
          <h3 style={h3Style}>No tax withheld</h3>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            While this is the employee&apos;s problem at tax time (you still have a tax obligation), no tax withheld can also be a sign that the employment relationship is being deliberately kept off the books.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A cash rate of $25/hr on a Sunday &mdash; when the Sunday casual rate at Level 2 is {formatCurrency(l2?.sundayCasual ?? 0)}/hr &mdash; is a shortfall of over {formatCurrency((l2?.sundayCasual ?? 0) - 25)}/hr. On a 6-hour Sunday shift, that&apos;s over $115 in one shift. If you&apos;ve been paid a flat cash rate across weekends for a year: potentially $5,000+ in underpayment.
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
