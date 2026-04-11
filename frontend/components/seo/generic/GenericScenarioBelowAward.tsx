/**
 * Generic "Paid Below Award Rate" scenario — works for any award.
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

export default function GenericScenarioBelowAward({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const faqData = [
    { question: `How do I know my correct classification level under the ${awardName}?`, answer: `Your classification level is based on the duties you actually perform, not your job title. The ${awardName} defines each level by skills, qualifications, and responsibilities. If your duties have changed since you started, your level may need to be updated. Check the classification descriptions in the award or use the Fair Work classification tool.` },
    { question: 'How far back can I recover underpayments?', answer: 'The Fair Work Ombudsman can recover unpaid wages going back up to 6 years from the date of the complaint. Even a shortfall of $1 to $2 per hour adds up to thousands over that period. There is no cost to you for lodging a complaint.' },
    { question: 'What if my employer says they cannot afford to pay the award rate?', answer: 'Award rates are legal minimums — they are not negotiable. An employer cannot pay below the award rate regardless of business circumstances. If your employer cannot afford to pay the minimum, that is a business problem, not a reason to underpay workers. You are entitled to the full amount.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you are being paid below the minimum rate under the {awardName}, your employer is breaking the law and you can recover the difference going back up to 6 years.{l1 && <> The Level 1 full-time minimum rate is {formatCurrency(l1.ftRate)}/hr and the casual rate (including the 25% loading) is {formatCurrency(l1.casualRate)}/hr.</>} These rates are non-negotiable legal minimums &mdash; your employer cannot pay you less regardless of what you agreed to when you started.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The {awardName} sets legally binding minimum rates of pay for every classification level. These rates are updated annually (usually from 1 July) by the Fair Work Commission. Paying below these rates is a contravention of the Fair Work Act 2009 and can result in penalties for the employer. You can lodge a free complaint with the Fair Work Ombudsman, who has the power to investigate and recover the underpayment on your behalf. In 2024&ndash;25, the FWO recovered $358 million for over 249,000 underpaid workers and secured $23.7 million in court penalties against non-compliant employers. (<a href="https://www.fairwork.gov.au/newsroom/media-releases/2025-media-releases/october-2025/20251029-annual-report-2024-25-media-release" target="_blank" rel="noopener noreferrer" style={linkStyle}>FWO Annual Report 2024&ndash;25</a>)
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Full-time Level 1 employee under the {awardName} is paid $22.00/hr flat &mdash; below the minimum of {formatCurrency(l1.ftRate)}/hr.
            </p>
            <p style={pStyle}>
              <strong>Weekly shortfall:</strong> ({formatCurrency(l1.ftRate)} &minus; $22.00) &times; 38 hours = <strong>{formatCurrency((l1.ftRate - 22) * 38)}</strong> per week
            </p>
            <p style={pStyle}>
              <strong>Annual shortfall:</strong> {formatCurrency((l1.ftRate - 22) * 38 * 48)} per year
            </p>
            <p style={smallStyle}>
              Over the 6-year recovery period: approximately <strong>{formatCurrency((l1.ftRate - 22) * 38 * 48 * 6)}</strong>. And that is before counting missing penalty rates, overtime, and super.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Your ordinary hourly rate meets or exceeds the minimum for your classification level under the {awardName}</li>
          <li style={{ marginBottom: '6px' }}>If casual, the 25% casual loading is included on top of the base rate</li>
          <li style={{ marginBottom: '6px' }}>Your classification level matches the duties you actually perform</li>
          <li style={{ marginBottom: '6px' }}>Rates were updated after the most recent annual wage review (usually 1 July)</li>
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
