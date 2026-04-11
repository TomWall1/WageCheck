/**
 * Generic "No Payslip" scenario — works for any award.
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

export default function GenericScenarioNoPayslip({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const faqData = [
    { question: 'Is my employer legally required to give me a payslip?', answer: 'Yes. Under the Fair Work Act 2009, every employer must provide a payslip to each employee within 1 working day of paying them. This applies to all employees — full-time, part-time, and casual. There are no exceptions based on business size or industry.' },
    { question: `What should a payslip show under the ${awardName}?`, answer: `A compliant payslip must show the employer's name and ABN, the employee's name, the pay period, gross and net amounts, hourly rates (including any penalty rates), hours worked at each rate, superannuation contributions, and any deductions. Under the ${awardName}, you should see separate line items for ordinary hours, weekend penalties, and public holiday rates.` },
    { question: 'What can I do if my employer refuses to provide payslips?', answer: 'First, ask in writing (email or text). If your employer still refuses, you can lodge a complaint with the Fair Work Ombudsman at fairwork.gov.au or call 13 13 94. The FWO can issue infringement notices and penalties. Failure to provide payslips can result in fines of up to $16,500 per breach for individuals and $82,500 for companies.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Every employee under the {awardName} is entitled to a payslip within 1 working day of being paid &mdash; no exceptions. If you are not receiving payslips, that is a breach of the Fair Work Act, and it is one of the strongest indicators that you are also being underpaid. Employers who skip payslips are typically also skipping penalty rates, super, and correct award rates.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Section 536 of the Fair Work Act 2009 requires employers to issue payslips within 1 working day of payment. The payslip must be in electronic or hard-copy form and must itemise hours worked, rates of pay (including penalties), gross and net pay, super contributions, and any deductions. This is not a suggestion &mdash; failure to comply carries penalties of up to $16,500 per breach for individuals and $82,500 for companies.
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual Level 1 worker under the {awardName} works 20 hours per week including Saturdays but has never received a payslip. They are paid a flat $23/hr into their bank account.
            </p>
            <p style={pStyle}>
              <strong>Without a payslip, they cannot verify:</strong> Whether the {formatCurrency(l1.casualRate)}/hr casual rate is being met, whether Saturday hours are paid at the {formatCurrency(l1.saturdayCasual)}/hr Saturday casual rate, or whether super is being contributed.
            </p>
            <p style={smallStyle}>
              If their Saturday rate alone is wrong, that could be {formatCurrency((l1.saturdayCasual - 23) * 5)} per week in underpayment &mdash; over {formatCurrency((l1.saturdayCasual - 23) * 5 * 48)} per year. Without a payslip, they would never know.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>You actually receive a payslip for every pay period</li>
          <li style={{ marginBottom: '6px' }}>It arrives within 1 working day of pay day</li>
          <li style={{ marginBottom: '6px' }}>Hours are broken down by ordinary, weekend, and public holiday</li>
          <li style={{ marginBottom: '6px' }}>Each rate matches the {awardName} minimums for your classification level</li>
          <li style={{ marginBottom: '6px' }}>Super contributions are listed and match 12% of ordinary time earnings</li>
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
