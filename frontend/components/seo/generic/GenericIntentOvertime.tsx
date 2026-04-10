/**
 * Generic "Not Getting Overtime?" intent page — works for any award.
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

export default function GenericIntentOvertime({ rates, awardCode, awardName, awardSlug, examples }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const otHalf = l1 ? l1.ftRate * 1.5 : undefined;
  const otDouble = l1 ? l1.ftRate * 2 : undefined;
  // 45-hour week: 38 ordinary + 5 at time-and-a-half + 2 at double-time (common pattern)
  const exampleOrdinary = l1 ? l1.ftRate * 38 : undefined;
  const exampleOT = otHalf && otDouble ? (otHalf * 5) + (otDouble * 2) : undefined;
  const exampleTotal = exampleOrdinary && exampleOT ? exampleOrdinary + exampleOT : undefined;
  const flatTotal = l1 ? l1.ftRate * 45 : undefined;
  const exampleShortfall = exampleTotal && flatTotal ? exampleTotal - flatTotal : undefined;

  const faqData = [
    { question: `When does overtime start under the ${awardName}?`, answer: `Overtime generally triggers after 38 ordinary hours per week, or after the daily threshold specified in the award (often 8 or 10 hours depending on the roster arrangement). Any hours beyond those limits must be paid at overtime rates.` },
    { question: 'What is the difference between time-and-a-half and double time?', answer: 'Time-and-a-half means 1.5 times your ordinary hourly rate — it typically applies to the first 2–3 hours of overtime. Double time means twice your ordinary rate and applies to overtime hours beyond that initial block.' },
    { question: 'Can my employer refuse to pay overtime if they didn\'t authorise it?', answer: 'If the overtime was genuinely worked and the employer knew about it (or should have known), the employer must pay it. "I didn\'t approve it" is not a valid reason to withhold overtime pay that was actually worked.' },
    { question: 'I\'m on a salary — do I still get overtime?', answer: 'Many salaried employees covered by the award are still entitled to overtime. Unless your contract includes an annualised salary arrangement that demonstrably covers all overtime worked, you are likely entitled to overtime pay on top of your salary.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work more than 38 hours a week under the {awardName} and your pay looks the same every week, overtime is almost certainly not being calculated. That is money you are owed &mdash; and the longer it goes unnoticed, the more it adds up.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Common roles covered: {examples}. If you work in any of these and regularly exceed 38 hours &mdash; read on.
        </p>
      </section>

      {/* When overtime triggers */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>When overtime kicks in</h2>
        <p style={pStyle}>
          Under the {awardName}, overtime is triggered in two ways:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}><strong>Weekly threshold:</strong> Any hours beyond 38 ordinary hours in a week</li>
          <li style={{ marginBottom: '6px' }}><strong>Daily threshold:</strong> Any hours beyond the daily limit set by the award (commonly 8 or 10 hours depending on roster arrangement)</li>
        </ul>
        <p style={pStyle}>
          The first 2&ndash;3 overtime hours are generally paid at <strong>time-and-a-half</strong> (1.5x your base rate). Hours beyond that are paid at <strong>double time</strong> (2x your base rate).
          {l1 && <> For a Level 1 full-time worker at {formatCurrency(l1.ftRate)}/hr, that means {formatCurrency(otHalf!)}/hr then {formatCurrency(otDouble!)}/hr.</>}
        </p>
        <p style={pStyle}>
          See the full breakdown at <a href={`/awards/${awardSlug}/overtime`} style={linkStyle}>{awardName} overtime rates</a>.
        </p>
      </section>

      {/* Worked example */}
      {l1 && exampleShortfall && (
        <section style={sectionStyle}>
          <div style={exampleBoxStyle}>
            <h2 style={{ ...h2Style, marginBottom: '12px' }}>What missing overtime costs you</h2>
            <p style={pStyle}>
              <strong>Scenario:</strong> Full-time Level 1 employee. Works 45 hours in a week &mdash; 7 hours of overtime. First 5 hours at time-and-a-half, last 2 at double time.
            </p>
            <p style={pStyle}>
              <strong>Correct pay:</strong> 38hrs &times; {formatCurrency(l1.ftRate)} + 5hrs &times; {formatCurrency(otHalf!)} + 2hrs &times; {formatCurrency(otDouble!)} = <strong>{formatCurrency(exampleTotal!)}</strong>
            </p>
            <p style={pStyle}>
              <strong>Flat-rate pay (no overtime):</strong> 45hrs &times; {formatCurrency(l1.ftRate)} = {formatCurrency(flatTotal!)}
            </p>
            <p style={pStyle}>
              <strong>Shortfall:</strong> {formatCurrency(exampleShortfall)}/week &mdash; that is {formatCurrency(exampleShortfall * 48)}/year in unpaid overtime.
            </p>
          </div>
        </section>
      )}

      {/* Common signs */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Signs your overtime is not being paid</h2>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '6px' }}>Your weekly pay is the same regardless of whether you worked 38 or 50 hours</li>
            <li style={{ marginBottom: '6px' }}>Your payslip shows no overtime line items despite regular extra hours</li>
            <li style={{ marginBottom: '6px' }}>Your employer says you are &ldquo;salaried&rdquo; but you are still covered by the {awardName}</li>
            <li style={{ marginBottom: '6px' }}>You are told overtime is &ldquo;included&rdquo; but no one has shown you how the numbers actually work out</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Check if your overtime is being paid correctly</h2>
        <p style={pStyle}>
          Enter your hours and rate below. If overtime is missing, you will see exactly how much you are owed &mdash; and what to do next.
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
          Every extra hour you work past 38 is worth more than your base rate. If your payslip does not reflect that &mdash; you are leaving money on the table.
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
