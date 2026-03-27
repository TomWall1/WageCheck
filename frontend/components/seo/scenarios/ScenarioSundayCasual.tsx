/**
 * Scenario: Sunday Casual Rate — /awards/hospitality-award/scenarios/sunday-casual-rate
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'My employer says my casual loading covers the Sunday premium — is that right?', answer: 'No — and that claim is wrong. The 25% loading compensates for the absence of leave entitlements. It does not replace Sunday penalty rates, which are a separate and additional entitlement.' },
  { question: 'I\u0027ve been paid the wrong Sunday rate for years — can I recover it?', answer: 'Yes — up to 6 years under the Fair Work Act. If you work one Sunday per week, the cumulative shortfall can be very significant.' },
  { question: 'What\u0027s the Sunday rate for a permanent employee by comparison?', answer: 'Lower than the casual Sunday rate. Permanent Level 2 Sunday = $37.92/hr vs casual Level 2 Sunday = $44.24/hr.' },
];

export default function ScenarioSundayCasual() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Both &mdash; the casual rate and the Sunday rate are applied together, not as alternatives. This is the single most common misunderstanding about <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>casual</a> pay in hospitality. The 25% casual loading and the Sunday <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rate</a> are separate entitlements that both apply every Sunday. If you&apos;re being paid your ordinary casual rate on Sundays, you&apos;re being underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work casual Sunday shifts in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>For casual employees under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The 25% casual loading is applied to the ordinary base rate to produce the casual hourly rate</li>
          <li>The Sunday penalty multiplier is then applied to the casual rate</li>
        </ul>
        <p style={pStyle}>Both apply. The casual rate is the starting point for the Sunday calculation &mdash; not an alternative to it.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Sunday casual rate at each level</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Ordinary casual</th>
                <th style={thStyle}>Sunday casual</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$42.18/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$44.24/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$45.68/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 4</td><td style={tdStyle}>$34.15/hr</td><td style={tdStyle}>$47.81/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 5</td><td style={tdStyle}>$35.75/hr</td><td style={tdStyle}>$50.05/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>Rates effective 1 July 2025.</p>
        <p style={pStyle}>
          If your Sunday pay matches your ordinary casual rate rather than the Sunday casual rate, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The maths</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 2 example</h3>
          {/* TODO: dynamic rate */}
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Base rate: $25.28/hr</li>
            <li>Casual loading (25%): +$6.32/hr = $31.60/hr (ordinary casual rate)</li>
            <li>Sunday penalty (1.4&times; the casual rate): $44.24/hr</li>
          </ul>
          <p style={smallStyle}>
            Getting $31.60 on a Sunday means the Sunday penalty hasn&apos;t been applied. That&apos;s ~$12.64/hr missing on every Sunday shift.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a separate Sunday rate line appear for Sunday shifts?</li>
          <li>Is the Sunday rate higher than your ordinary casual rate?</li>
          <li>Does your Sunday rate match the table above for your level?</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check exactly what your Sunday shifts should pay.</p>
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
