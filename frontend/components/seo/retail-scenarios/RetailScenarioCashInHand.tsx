/**
 * Scenario: Cash In Hand in Retail — /awards/retail-award/scenarios/cash-in-hand
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
  { question: 'Is being paid cash in hand illegal?', answer: 'Being paid in cash is not inherently illegal, but it is illegal if your employer is not withholding tax, not paying superannuation, not providing payslips, or paying below the award rate. In practice, cash-in-hand arrangements in retail almost always involve one or more of these breaches.' },
  { question: 'Will I get in trouble if I report a cash-in-hand arrangement?', answer: 'You are protected under the Fair Work Act from adverse action for raising a workplace complaint. If your employer retaliates, that is a separate serious breach. You should also consider speaking to the ATO about any tax implications on your end.' },
  { question: 'My employer says I\'m better off with cash because there\'s no tax — is that true?', answer: 'No. You are still legally obligated to pay tax on your income. If your employer is not withholding tax, you will owe it at tax time. Meanwhile, you are missing out on superannuation (12% on top of your pay), workers compensation insurance, and potentially penalty rates. Cash-in-hand workers are almost always worse off.' },
];

export default function RetailScenarioCashInHand({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 22.61;
  const casualRate = l1?.casualRate ?? 28.26;
  const sundayRate = l1?.sundayCasual ?? 45.22;
  const superPerHour = Math.round(baseRate * 0.12 * 100) / 100;
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash-in-hand pay in retail is a red flag for multiple legal breaches. If you&apos;re being paid cash without payslips, there is a high probability you are being underpaid on your base rate, missing penalty rates entirely, receiving no superannuation, and having no tax withheld. Each of these is a separate breach of Australian law.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Cash-in-hand workers in retail are some of the most underpaid in the country. The &quot;no tax&quot; benefit does not come close to covering what you&apos;re losing.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What you&apos;re actually losing</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Typical cash-in-hand retail worker:</strong> Paid $20/hr cash for all shifts including Sundays.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li><strong>Missing Sunday penalty:</strong> Should be ~{formatCurrency(sundayRate)}/hr on Sundays, not $20</li>
            <li><strong>Missing super:</strong> 12% on top = ~{formatCurrency(superPerHour)}/hr minimum that should go to your super fund</li>
            <li><strong>Missing Saturday penalty:</strong> Should be higher than weekday rate</li>
            <li><strong>Below base rate:</strong> Even weekday casual rate is ~{formatCurrency(casualRate)}/hr, not $20</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Total loss: $200+ per week in missed pay and super.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Keep records of every shift you work &mdash; dates, times, and amounts paid.</li>
          <li style={{ marginBottom: '8px' }}>Calculate what you should have been paid under the <a href="/awards/retail-award/" style={linkStyle}>Retail Award</a>.</li>
          <li style={{ marginBottom: '8px' }}>Contact the Fair Work Ombudsman on 13 13 94 &mdash; they handle cash-in-hand complaints regularly.</li>
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
        <p style={pStyle}>Calculate what you should actually be earning under the award.</p>
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
