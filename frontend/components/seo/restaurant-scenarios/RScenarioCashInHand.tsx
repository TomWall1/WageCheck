/**
 * Scenario: Cash in Hand — /awards/restaurant-award/scenarios/cash-in-hand
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Is being paid in cash automatically illegal?', answer: 'No. Cash is a perfectly legal payment method. What matters is whether the employer complies with all obligations: paying at least the award rate, providing payslips, paying superannuation, and withholding tax. Cash becomes a problem when it\'s used to avoid these obligations.' },
  { question: 'How can I check my pay without a payslip?', answer: 'Keep your own record of every shift you work (date, start time, finish time, break times). Then enter your shifts into a pay calculator to compare what you received against what the award requires. Any shortfall is an underpayment.' },
  { question: 'Does my employer have to pay super on cash payments?', answer: 'Yes. Superannuation is required regardless of payment method. Since November 2022, there is no minimum earnings threshold — all employees including casuals are entitled to super at 12% of ordinary time earnings.' },
];

export default function RScenarioCashInHand({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l3SundayCasual = l3?.sundayCasual ?? 45.00;
  const sundayGap = Math.round((l3SundayCasual - 25) * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash is legal as a payment method. What&apos;s not legal is paying below the <a href="/awards/restaurant-award" style={linkStyle}>award rate</a>, skipping payslips, or not paying superannuation &mdash; and cash payments are frequently used to do all three. If you&apos;re paid in cash, you still have the same entitlements as any other employee.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re paid cash with no payslip &mdash; your rights haven&apos;t changed, but verifying them is harder.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Cash payments must still comply with:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>All <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>award rates</a> including penalties, overtime, and allowances</li>
          <li>Payslip requirements (within one working day of each pay day)</li>
          <li>Superannuation obligations (12% of ordinary time earnings)</li>
          <li>Tax withholding (PAYG)</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Red flags</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li><strong>No payslip with cash payment</strong> &mdash; contravention of Fair Work Act</li>
            <li><strong>Below-award rate</strong> &mdash; &quot;but it&apos;s cash so no tax&quot; does not make up for underpayment</li>
            <li><strong>No super contributions</strong> &mdash; check your super fund for employer contributions</li>
            <li><strong>Employer says &quot;it&apos;s tax-free&quot;</strong> &mdash; this means tax isn&apos;t being withheld, which creates a liability for you</li>
          </ul>
          <p style={smallStyle}>
            Any of these red flags suggest your employer is not meeting their legal obligations.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Cash-in-hand workers in restaurants frequently miss out on penalty rates, overtime, allowances, and superannuation. A casual Level 3 worker paid $25/hr cash on Sundays is being underpaid by {formatCurrency(sundayGap)}/hr compared to the correct Sunday casual rate of {formatCurrency(l3SundayCasual)}/hr. Missing super at 12% costs thousands over a career. And not having tax withheld creates a personal tax liability you&apos;ll eventually owe.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Keep your own detailed record of every shift (dates, times, breaks)</li>
          <li>Request payslips in writing</li>
          <li>Log into your super fund and check for employer contributions</li>
          <li>Compare your actual pay against the award rates for your shifts</li>
          <li>If concerned, contact the Fair Work Ombudsman on 13 13 94</li>
        </ul>
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
        <p style={pStyle}>Paid in cash? Check what you should actually be receiving.</p>
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
