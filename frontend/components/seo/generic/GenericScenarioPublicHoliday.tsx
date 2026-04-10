/**
 * Generic "Worked a Public Holiday" scenario — works for any award.
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

export default function GenericScenarioPublicHoliday({ rates, awardCode, awardName, awardSlug }: Props) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  const faqData = [
    { question: `Do I have to work on a public holiday under the ${awardName}?`, answer: 'Your employer can request you work on a public holiday, but you can refuse if the request is unreasonable. Factors include the nature of the workplace, your personal circumstances, and whether you were given adequate notice.' },
    { question: `What if my employer only pays me the normal rate for a public holiday?`, answer: `Under the ${awardName}, public holiday work must be paid at the public holiday rate — not the ordinary rate. If your payslip shows the same rate as a normal weekday, you are being underpaid and should raise it with your employer or contact the Fair Work Ombudsman on 13 13 94.` },
    { question: 'Does the minimum engagement apply on a public holiday?', answer: 'Yes. If you are called in to work on a public holiday, minimum engagement rules still apply. Casuals are typically entitled to a minimum of 2 to 3 hours pay at the public holiday rate, even if they are sent home earlier.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Rates effective {rates?.effectiveDate || '1 July 2025'} &middot; {awardCode}
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you worked a public holiday under the {awardName}, you are owed significantly more than your ordinary rate.{l1 && <> The Level 1 full-time public holiday rate is {formatCurrency(l1.publicHolidayFt)}/hr and the casual public holiday rate is {formatCurrency(l1.publicHolidayCasual)}/hr.</>} These rates are not optional &mdash; they are legal minimums your employer must pay.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the {awardName}, any work performed on a public holiday attracts the public holiday penalty rate. This applies to all hours worked on that day. Minimum engagement also applies &mdash; if you are called in, you are generally entitled to at least 2 to 3 hours of work (or pay for those hours), even if you are sent home earlier. Full-time and part-time employees who are not required to work are entitled to be paid their ordinary hours for the day.
        </p>
      </section>

      {l1 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Worked example</h2>
          <div style={exampleBoxStyle}>
            <p style={pStyle}>
              <strong>Scenario:</strong> Casual Level 1 employee works a 6-hour shift on a public holiday under the {awardName}.
            </p>
            <p style={pStyle}>
              <strong>Correct pay:</strong> {formatCurrency(l1.publicHolidayCasual)}/hr &times; 6 hours = <strong>{formatCurrency(l1.publicHolidayCasual * 6)}</strong>
            </p>
            <p style={pStyle}>
              <strong>If paid the ordinary casual rate:</strong> {formatCurrency(l1.casualRate)}/hr &times; 6 hours = {formatCurrency(l1.casualRate * 6)}
            </p>
            <p style={smallStyle}>
              Difference: <strong>{formatCurrency((l1.publicHolidayCasual - l1.casualRate) * 6)}</strong> underpaid for a single shift. Over a year with one public holiday shift per month, that is {formatCurrency((l1.publicHolidayCasual - l1.casualRate) * 6 * 12)} in lost wages.
            </p>
          </div>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>The public holiday hours are listed separately from ordinary hours</li>
          <li style={{ marginBottom: '6px' }}>The hourly rate shown for those hours matches the public holiday rate{l1 && <> (at least {formatCurrency(l1.publicHolidayFt)}/hr full-time or {formatCurrency(l1.publicHolidayCasual)}/hr casual for Level 1)</>}</li>
          <li style={{ marginBottom: '6px' }}>You were paid for minimum engagement hours even if sent home early</li>
          <li style={{ marginBottom: '6px' }}>If you did not work the public holiday, you were still paid ordinary hours (full-time and part-time only)</li>
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
