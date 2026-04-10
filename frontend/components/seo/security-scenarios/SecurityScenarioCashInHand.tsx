/**
 * Scenario: Security Cash in Hand — Is This Legal?
 * URL: /awards/security-award/scenarios/cash-in-hand
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
  { question: 'Is cash in hand illegal in security?', answer: 'Cash in hand itself is not automatically illegal — it is the method of payment. What makes it a problem is that cash payments almost always mean the employer is not meeting their legal obligations: no tax withholding, no superannuation, no payslips, no workers compensation insurance, and often no correct award rates. In the security industry, where licencing requirements apply, cash-in-hand arrangements also raise serious compliance concerns.' },
  { question: 'Am I in trouble if I have been paid cash in hand?', answer: 'The legal obligation to withhold tax and pay super sits with the employer, not you. However, you are still required to declare all income in your tax return, including cash payments. If you have not been declaring cash income, you should speak to a tax professional about how to correct this. The Fair Work Ombudsman focuses enforcement on employers, not employees.' },
  { question: 'What am I missing out on with cash in hand?', answer: 'Typically: superannuation (currently 12% of your ordinary earnings), workers compensation insurance (critical in security where injuries are more common), leave entitlements (if you should be permanent), correct penalty rates and overtime, and a paper trail of employment that affects future loan applications and Centrelink claims.' },
];

export default function SecurityScenarioCashInHand({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash in hand is common in parts of the security industry, particularly for event work and short-term assignments. It might feel like a good deal &mdash; more money in your pocket, no tax taken out. But the reality is you&apos;re almost certainly losing more than you gain. No super, no workers comp, no leave, no payslips, and very likely a rate that falls short of the award once penalty rates are factored in.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re being paid cash in hand for security work, you are almost certainly being underpaid &mdash; even if the hourly rate looks decent.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Regardless of how you are paid, your employer must:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Pay at least the award rate including all applicable penalty rates and overtime</li>
          <li style={{ marginBottom: '6px' }}>Withhold PAYG tax and remit it to the ATO</li>
          <li style={{ marginBottom: '6px' }}>Pay superannuation (currently 12% of ordinary time earnings)</li>
          <li style={{ marginBottom: '6px' }}>Provide payslips within one working day of each pay</li>
          <li style={{ marginBottom: '6px' }}>Maintain workers compensation insurance</li>
          <li style={{ marginBottom: '6px' }}>Ensure the worker holds a valid security licence (a legal requirement under state legislation)</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you&apos;re actually losing</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard paid $35/hr cash in hand for overnight event work. Works 20 hours per week across weekend nights.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Missing super: ~$84/week ($35 x 20hrs x 12%)</li>
            <li>Missing night/weekend penalties: the correct award rate for Saturday and Sunday overnight casual work is substantially higher than $35/hr</li>
            <li>No workers comp: if injured on site, no insurance coverage</li>
            <li>No leave accrual: if you should be classified as permanent, you&apos;re missing annual leave and sick leave</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            The $35/hr &quot;tax free&quot; rate likely works out to less than what you&apos;d receive with correct award rates plus super.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Are you receiving payslips? If not, that is a breach in itself.</li>
          <li style={{ marginBottom: '8px' }}>Is superannuation being paid? Check your super fund for recent contributions.</li>
          <li style={{ marginBottom: '8px' }}>Is your employer withholding tax? Check your income statement via myGov/ATO.</li>
          <li style={{ marginBottom: '8px' }}>Does the cash rate actually cover what you&apos;d earn under the award with all penalties?</li>
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
