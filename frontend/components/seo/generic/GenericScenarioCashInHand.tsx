/**
 * Generic "Cash in Hand" scenario — works for any award.
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

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
}

export default function GenericScenarioCashInHand({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const superRate = 0.115;

  const faqData = [
    { question: `Is it legal to be paid cash under the ${awardName}?`, answer: `Cash itself is a legal payment method. The issue is what typically comes with it: no payslip, no super, no tax withheld, and no penalty rates. If any of those are missing, the arrangement is illegal regardless of how the money is physically delivered.` },
    { question: 'What if I agreed to be paid cash in hand?', answer: 'Your agreement does not make it legal. An employee cannot contract out of minimum award entitlements, tax obligations, or superannuation. Even if you said yes, your employer is still breaking the law by not meeting their obligations under the Fair Work Act and tax law.' },
    { question: 'Can I get in trouble for being paid cash in hand?', answer: 'If you are not declaring the income, you may have tax obligations. However, the Fair Work Ombudsman focuses on the employer, not the employee. You can report underpayment without fear of penalty for the workplace rights issue itself. For tax concerns, contact the ATO.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Cash is a legal way to pay wages under the {awardName} &mdash; but only if every other obligation is met. The problem is that in practice, cash-in-hand almost always means no payslip, no super, no penalty rates, and no tax withheld. That combination is illegal, and it almost always means you are being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          There is nothing in the {awardName} or the Fair Work Act that prohibits cash as a payment method. What is required regardless of how you are paid: a payslip within 1 working day of pay day, superannuation at 11.5% of ordinary time earnings, correct penalty rates for weekends and public holidays, tax withheld and reported to the ATO, and at least the minimum award rate for your classification level.
        </p>
        <p style={pStyle}>
          If any of these are missing, the arrangement is not just informal &mdash; it is a breach of workplace law.
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual Level 1 worker under the {awardName} is paid $25/hr cash for 20 hours per week including a Sunday shift.
            </p>
            <p style={pStyle}>
              <strong>What they should receive:</strong> Weekday casual rate of {formatCurrency(l1.casualRate)}/hr plus the Sunday casual rate of {formatCurrency(l1.sundayCasual)}/hr for the Sunday shift, plus 11.5% super on ordinary time earnings.
            </p>
            <p style={pStyle}>
              <strong>Super alone:</strong> {formatCurrency(l1.casualRate)} &times; 20 hrs &times; {superRate} = <strong>{formatCurrency(l1.casualRate * 20 * superRate)}/week</strong> in super not being paid.
            </p>
            <p style={smallStyle}>
              Over a year, that is approximately {formatCurrency(l1.casualRate * 20 * superRate * 48)} in missing superannuation &mdash; money that should be growing in your retirement fund.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You actually receive a payslip &mdash; no payslip is the first red flag</li>
          <li style={{ marginBottom: '6px' }}>Tax has been withheld and your employer has your TFN on file</li>
          <li style={{ marginBottom: '6px' }}>Superannuation contributions appear on your super fund statement</li>
          <li style={{ marginBottom: '6px' }}>Weekend and public holiday shifts are paid at the correct penalty rates under the {awardName}</li>
        </ul>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
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
        Rates sourced from the Fair Work Commission pay guide for the {awardName} ({awardCode}), effective {rates?.effectiveDate || '1 July 2025'}. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
