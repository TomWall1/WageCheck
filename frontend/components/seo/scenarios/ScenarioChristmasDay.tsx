/**
 * Scenario: Worked Christmas Day in Hospitality — What Am I Owed?
 * URL: /awards/hospitality-award/scenarios/christmas-day-pay
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function ScenarioChristmasDay({ rates }: { rates?: HospitalityRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const l3 = rates ? getLevel(rates, 3) : undefined;
  const l4 = rates ? getLevel(rates, 4) : undefined;
  const l5 = rates ? getLevel(rates, 5) : undefined;

  const faqData = [
    { question: 'I wasn\'t rostered on Christmas Day but the venue was open — do I still get anything?', answer: 'If you\'re a permanent employee and Christmas Day would have been a normal working day for you, you\'re entitled to a paid day off instead.' },
    { question: 'I was paid "double time" — is that right?', answer: 'No — the Hospitality Award specifies 2.25\u00d7, not 2\u00d7. Double time is technically underpayment on Christmas Day. The difference is real money on an 8-hour shift.' },
    { question: 'My employer said it was just a normal Saturday rate — is that correct?', answer: 'No. Even when Christmas Day falls on a Saturday, the public holiday rate (2.25\u00d7) applies — not the Saturday rate (1.25\u00d7).' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re owed 2.25 times your ordinary rate. Christmas Day is a national public holiday, and the Hospitality Award specifies a public holiday rate of 2.25&times; the base rate for both permanent and casual employees. If you were paid your ordinary rate &mdash; or even double time &mdash; you were underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked Christmas Day in any hospitality venue and weren&apos;t paid at 2.25&times; &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), public holidays &mdash; including Christmas Day &mdash; must be paid at 2.25&times; the ordinary rate for adult employees.
        </p>
        <p style={pStyle}>
          For casual employees, this is applied to the casual base rate (which already includes the 25% loading). See the <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual employees guide</a> for details.
        </p>
        <p style={pStyle}>
          Christmas Day is also sometimes a Saturday or Sunday. When Christmas Day falls on a weekend, it is still treated as a public holiday &mdash; the public holiday rate (2.25&times;) applies, not the Saturday/Sunday rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Christmas Day rates by level (adult):</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Level 1: {formatCurrency(l1?.publicHolidayFt ?? 0)}/hr</li>
            <li>Level 2: {formatCurrency(l2?.publicHolidayFt ?? 0)}/hr</li>
            <li>Level 3: {formatCurrency(l3?.publicHolidayFt ?? 0)}/hr</li>
            <li>Level 4: {formatCurrency(l4?.publicHolidayFt ?? 0)}/hr</li>
            <li>Level 5: {formatCurrency(l5?.publicHolidayFt ?? 0)}/hr</li>
          </ul>
          <p style={smallStyle}>
            Rates effective {rates?.effectiveDate ?? '1 July 2025'}. Based on the Fair Work Commission pay guide for MA000009.
          </p>
          <p style={{ ...pStyle, marginTop: '12px', marginBottom: '0' }}>
            <strong>Example:</strong> 8-hour Christmas Day shift, Level 2 casual = 8 &times; {formatCurrency(l2?.publicHolidayCasual ?? 0)} = {formatCurrency((l2?.publicHolidayCasual ?? 0) * 8)}
          </p>
        </div>
        <p style={pStyle}>
          If you received significantly less than this, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your Christmas Day pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The difference between an ordinary casual rate and the public holiday rate at Level 2 is over $25/hr. On an 8-hour Christmas Day shift, that gap is over $200 in a single day. If you&apos;ve worked multiple public holidays on the wrong rate, the total is often in the hundreds to thousands of dollars.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a public holiday rate line appear for your Christmas Day shift?</li>
          <li>Is the rate 2.25&times; your ordinary rate &mdash; not 1.5&times; or 2&times;?</li>
          <li>If you worked on Christmas Day last year, is the rate shown the correct 2025&ndash;26 figure?</li>
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
        <p style={pStyle}>
          Don&apos;t guess &mdash; calculate exactly what Christmas Day should have paid.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
