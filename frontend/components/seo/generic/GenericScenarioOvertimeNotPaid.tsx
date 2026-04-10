/**
 * Generic "Overtime Not Paid" scenario — works for any award.
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

export default function GenericScenarioOvertimeNotPaid({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const ot15 = l1 ? l1.ftRate * 1.5 : undefined;
  const ot20 = l1 ? l1.ftRate * 2.0 : undefined;

  const faqData = [
    { question: `When does overtime start under the ${awardName}?`, answer: `Under most awards including the ${awardName}, overtime generally starts after 38 ordinary hours per week or after the daily hour threshold specified in the award (often 7.6 or 8 hours per day). Any hours beyond these thresholds must be paid at overtime rates.` },
    { question: 'Can my employer make me work overtime without paying overtime rates?', answer: 'No. If you work hours that qualify as overtime under the award, your employer must pay overtime rates. An employer can request reasonable overtime, but they cannot avoid paying the correct rate. Unpaid overtime is a breach of the Fair Work Act.' },
    { question: 'What if my employer says overtime is included in my salary?', answer: 'Award-covered employees cannot have overtime "built in" to a flat rate unless there is a formal annualised salary arrangement that meets strict requirements — including a reconciliation to ensure you are not worse off. If no such arrangement exists, overtime must be paid separately at the correct rate.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you are regularly working more than 38 hours per week under the {awardName} and your pay does not change, you are almost certainly not being paid overtime.{l1 && ot15 && ot20 && <> At Level 1, the first 2 to 3 overtime hours should be paid at {formatCurrency(ot15)}/hr (time and a half) and anything beyond that at {formatCurrency(ot20)}/hr (double time).</>} These are legal minimums, not discretionary bonuses.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the {awardName}, ordinary hours are capped at 38 per week. Hours worked beyond 38 per week (or beyond the daily threshold specified in the award) are overtime and must be paid at penalty rates. The first 2 to 3 hours of overtime are typically paid at time and a half (1.5&times; the ordinary rate), and any hours beyond that at double time (2.0&times; the ordinary rate). Some awards also trigger overtime for work outside a specified span of hours.
        </p>
      </section>

      {l1 && ot15 && ot20 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Full-time Level 1 employee under the {awardName} works 45 hours in a week. Their employer pays a flat rate for all hours.
            </p>
            <p style={pStyle}>
              <strong>Correct calculation:</strong><br />
              38 ordinary hours &times; {formatCurrency(l1.ftRate)}/hr = {formatCurrency(l1.ftRate * 38)}<br />
              First 3 overtime hours &times; {formatCurrency(ot15)}/hr = {formatCurrency(ot15 * 3)}<br />
              Next 4 overtime hours &times; {formatCurrency(ot20)}/hr = {formatCurrency(ot20 * 4)}<br />
              <strong>Total: {formatCurrency(l1.ftRate * 38 + ot15 * 3 + ot20 * 4)}</strong>
            </p>
            <p style={pStyle}>
              <strong>If paid flat rate for 45 hours:</strong> 45 &times; {formatCurrency(l1.ftRate)}/hr = {formatCurrency(l1.ftRate * 45)}
            </p>
            <p style={smallStyle}>
              Shortfall: <strong>{formatCurrency((l1.ftRate * 38 + ot15 * 3 + ot20 * 4) - l1.ftRate * 45)}</strong> per week. Over a year, that is {formatCurrency(((l1.ftRate * 38 + ot15 * 3 + ot20 * 4) - l1.ftRate * 45) * 48)} in unpaid overtime.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Overtime hours are listed as a separate line item from ordinary hours</li>
          <li style={{ marginBottom: '6px' }}>The overtime rate is at least 1.5&times; your ordinary rate for the first 2&ndash;3 hours</li>
          <li style={{ marginBottom: '6px' }}>Hours beyond the initial overtime threshold are paid at 2.0&times; the ordinary rate</li>
          <li style={{ marginBottom: '6px' }}>Total hours on the payslip match the hours you actually worked</li>
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
