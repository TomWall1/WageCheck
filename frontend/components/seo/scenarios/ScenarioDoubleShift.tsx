/**
 * Scenario: Working a Double Shift in Hospitality — How Is It Paid?
 * URL: /awards/hospitality-award/scenarios/double-shift
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I\'m casual — do I get overtime on a double shift?', answer: 'Yes — the daily overtime threshold applies to casual employees. Hours beyond 10 in a single day attract overtime rates.' },
  { question: 'My employer says it\'s just "a long shift" not a double shift — does the label matter?', answer: 'No. The overtime threshold applies based on hours worked, not on how the shift is labelled.' },
  { question: 'Am I also entitled to a meal break on a double shift?', answer: 'Yes. The Hospitality Award requires meal breaks on extended shifts. If your employer provides the meal, no cash allowance applies. If not, a meal allowance applies.' },
];

export default function ScenarioDoubleShift() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          A double shift triggers <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a> on the hours beyond 10 in that day. Under the Hospitality Award, daily overtime kicks in after 10 hours worked. A double shift running 14 or 15 hours contains at least 4&ndash;5 hours of overtime &mdash; which must be paid at time-and-a-half, then double time. On top of that, evening and late-night loadings apply if the shift runs past 7pm and midnight.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work double shifts in any hospitality venue &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Daily overtime triggers after 10 hours</strong> in a single day</li>
          <li>First 2 hours of overtime: 1.5&times; your ordinary rate</li>
          <li>After 2 hours of overtime: 2&times; your ordinary rate</li>
          <li>Evening loading (7pm&ndash;midnight): {/* TODO: dynamic rate */}+$2.47/hr on top of the applicable rate</li>
          <li>Late-night loading (midnight&ndash;7am): {/* TODO: dynamic rate */}+$4.82/hr on top</li>
        </ul>
        <p style={pStyle}>
          All of these stack. A double shift that runs from noon to 2am involves ordinary hours, overtime hours, evening loadings, and late-night loadings &mdash; all calculated separately.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid (worked example)</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Permanent Level 3 employee. Noon to 2am shift (14 hours).</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Hours 1&ndash;10 (noon&ndash;10pm): ordinary rate + evening loading after 7pm</li>
            <li>Hours 11&ndash;12 (10pm&ndash;midnight): overtime time-and-a-half ({/* TODO: dynamic rate */}$39.15/hr) + evening loading</li>
            <li>Hours 13&ndash;14 (midnight&ndash;2am): overtime double time ({/* TODO: dynamic rate */}$52.20/hr) + late-night loading</li>
          </ul>
          <p style={smallStyle}>
            Total should be significantly higher than 14 &times; {/* TODO: dynamic rate */}$26.10/hr.
          </p>
        </div>
        <p style={pStyle}>
          If your double shift pay looks like a flat hourly rate &times; hours, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your double shift pay &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A 14-hour shift contains 4 hours of daily overtime. At Level 3 permanent, those 4 hours should be paid at time-and-a-half then double time &mdash; significantly above the ordinary rate. If you&apos;re paid a flat rate for the whole shift, the overtime shortfall alone is often $80&ndash;$140 per double shift. Working two double shifts per month: ~$1,600&ndash;$3,300/year in missed overtime.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does overtime appear as a separate line for hours beyond 10?</li>
          <li>Do evening and late-night loadings appear for the hours after 7pm and midnight?</li>
          <li>Is one flat rate applied for all hours regardless of length?</li>
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
          Don&apos;t guess &mdash; calculate what your double shift should have paid.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
