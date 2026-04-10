/**
 * Generic "My Pay Seems Too Low" intent page — broad entry point for uncertain workers.
 * Uses award metadata + API rates to generate award-specific content.
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

interface Props {
  rates?: AwardRateData;
  awardCode: string;
  awardName: string;
  awardSlug: string;
  examples: string;
}

export default function GenericIntentPayTooLow({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  const faqData = [
    { question: `How do I find out which classification level I should be on under the ${awardName}?`, answer: `Your classification is based on the duties you actually perform, not your job title. Review the classification descriptions in the award — or use the Fair Work Award Finder at fairwork.gov.au. If your duties match a higher level than what you're being paid for, you're owed the difference.` },
    { question: 'What should I check first if my pay seems low?', answer: 'Start with your base hourly rate and compare it to the award minimum for your level and employment type. Then check whether penalty rates appear on your payslip for weekend and evening shifts. These two areas account for the majority of underpayments.' },
    { question: 'What if I\'m only underpaid by a small amount?', answer: 'Small amounts compound. A $2/hr shortfall across 30 hours/week is $60/week, which is over $3,100/year. You can recover up to 6 years of underpayments — that small gap could be worth $15,000+.' },
    { question: 'Can I check without my employer knowing?', answer: 'Yes. Our calculator is private and anonymous. You can check your rates, compare them to the award, and decide what to do next on your own terms.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If something feels off about your pay under the {awardName}, trust that instinct. Most workers who suspect they are being underpaid are right &mdash; and the gap is usually bigger than they expected.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If that is your job &mdash; run through the checklist below.
        </p>
      </section>

      {/* Checklist */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The 5-point pay check</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>1. Is your base rate correct?</h3>
          <p style={pStyle}>
            Compare your hourly rate to the minimum for your classification level and employment type.
            {l1 && <> Level 1 full-time minimum is {formatCurrency(l1.ftRate)}/hr. Casual minimum is {formatCurrency(l1.casualRate)}/hr.</>}
            {' '}See <a href={`/awards/${awardSlug}/pay-rates`} style={linkStyle}>{awardName} pay rates</a>.
          </p>

          <h3 style={h3Style}>2. Are penalty rates being applied?</h3>
          <p style={pStyle}>
            Check your payslip for different rates on Saturdays, Sundays, and public holidays. If every shift pays the same rate, penalties are missing.
            {l1 && <> Level 1 casual Sunday rate should be {formatCurrency(l1.sundayCasual)}/hr &mdash; not {formatCurrency(l1.casualRate)}/hr.</>}
            {' '}See <a href={`/awards/${awardSlug}/penalty-rates`} style={linkStyle}>{awardName} penalty rates</a>.
          </p>

          <h3 style={h3Style}>3. Are you getting overtime?</h3>
          <p style={pStyle}>
            If you regularly work more than 38 hours per week and your payslip does not show overtime, those extra hours are being paid at the wrong rate.
            {' '}See <a href={`/awards/${awardSlug}/overtime`} style={linkStyle}>{awardName} overtime rates</a>.
          </p>

          <h3 style={h3Style}>4. Are allowances showing up?</h3>
          <p style={pStyle}>
            Meal allowances, uniform allowances, travel allowances &mdash; these should be separate line items on your payslip. If they are absent, they are not being paid.
            {' '}See <a href={`/awards/${awardSlug}/allowances`} style={linkStyle}>{awardName} allowances</a>.
          </p>

          <h3 style={h3Style}>5. Is superannuation being paid?</h3>
          <p style={pStyle}>
            Your employer must contribute 12% of your ordinary time earnings to your super fund. Log in to your super account and check that contributions are appearing regularly. Gaps mean your employer is not paying.
          </p>
        </div>
      </section>

      {/* How it adds up */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>How small gaps become big money</h2>
          {l1 && l2 ? (
            <p style={pStyle}>
              A worker classified at Level 1 ({formatCurrency(l1.ftRate)}/hr) who should be Level 2 ({formatCurrency(l2.ftRate)}/hr) loses {formatCurrency(l2.ftRate - l1.ftRate)}/hr. Over 38 hours/week for 48 weeks, that is {formatCurrency((l2.ftRate - l1.ftRate) * 38 * 48)}/year &mdash; before you even factor in missing penalties, overtime, or allowances.
            </p>
          ) : (
            <p style={pStyle}>
              Even a $1&ndash;2/hr shortfall across 30+ hours a week adds up to thousands per year. Factor in missing penalties and overtime, and the total can be tens of thousands over a few years.
            </p>
          )}
          <p style={pStyle}>
            The Fair Work Ombudsman can recover underpayments going back 6 years. Whatever your gut is telling you &mdash; put a number on it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find out in 2 minutes</h2>
        <p style={pStyle}>
          You do not need to confront anyone or make a complaint. Just enter your details and see whether your pay matches the {awardName} minimums. If it does &mdash; peace of mind. If it does not &mdash; you will know exactly where the gap is.
        </p>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          You do not need to be certain something is wrong. You just need to check. If your pay is correct, you lose nothing. If it is not &mdash; you have just found money that belongs to you.
        </p>
        <CheckPayCTA awardCode={awardCode} awardName={awardName} />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the {awardName} ({awardCode}), effective {rates?.effectiveDate || '1 July 2025'}. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
