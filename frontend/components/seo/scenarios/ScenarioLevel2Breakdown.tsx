/**
 * Scenario: Level 2 Shift Breakdown — /awards/hospitality-award/scenarios/level-2-shift-breakdown
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
  { question: 'How do I know if I\u0027m Level 2 or should be Level 3?', answer: 'Level 2 is for workers who work independently in their area after being shown what to do. If you\u0027re also training others, handling complaints, or running sections — Level 3 likely applies.' },
  { question: 'My rate is $34/hr — is that right for Level 2?', answer: '$34/hr is above the Level 2 ordinary casual rate ($31.60). But check whether $34 covers your Sunday and public holiday scenarios — Sunday casual at Level 2 is $44.24/hr, and $34 falls short.' },
  { question: 'What if I moved from Level 2 to Level 3 duties midway through my employment?', answer: 'Your pay should have been updated when your duties changed. If it wasn\u0027t, the shortfall from the date of the change is recoverable.' },
];

export default function ScenarioLevel2Breakdown() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Most of them. If you&apos;re a Level 2 hospitality worker, your ordinary weekday rate is just the starting point. Evenings, Saturdays, Sundays, and public holidays all attract higher rates &mdash; some significantly so. If your payslip shows the same rate for every shift regardless of when you worked, most of those shifts have been underpaid.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re <a href="/awards/hospitality-award/classifications" style={linkStyle}>classified</a> at Level 2 under the Hospitality Award &mdash; this is your complete rate breakdown.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Level 2 permanent (full-time / part-time)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Shift type</th>
                <th style={thStyle}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Ordinary weekday</td><td style={tdStyle}>$25.28/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Evening (7pm&ndash;midnight)</td><td style={tdStyle}>$27.75/hr (+$2.47)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Late night (midnight&ndash;7am)</td><td style={tdStyle}>$30.10/hr (+$4.82)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>$31.60/hr (1.25&times;)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>$37.92/hr (1.5&times;)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>$56.88/hr (2.25&times;)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Level 2 casual</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Shift type</th>
                <th style={thStyle}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Ordinary weekday</td><td style={tdStyle}>$31.60/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Evening (7pm&ndash;midnight)</td><td style={tdStyle}>~$34.07/hr (+$2.47)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Late night (midnight&ndash;7am)</td><td style={tdStyle}>~$36.42/hr (+$4.82)</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>$37.92/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>$44.24/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>$56.88/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025. Evening/late-night rates are the applicable day rate plus the flat hourly loading.
        </p>
        <p style={pStyle}>
          If any of these rates are higher than what you&apos;re currently paid on those days, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your Level 2 shifts &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Which is the most commonly underpaid?</h2>
        <div style={exampleBoxStyle}>
          {/* TODO: dynamic rate */}
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Sunday is the most frequently underpaid shift type for Level 2 workers. The gap between ordinary casual ($31.60/hr) and Sunday casual ($44.24/hr) is over $12/hr. Working one Sunday per week at the wrong rate costs approximately $2,600/year.
          </p>
        </div>
        <p style={pStyle}>
          If your Sunday rate looks similar to your Tuesday rate, you&apos;re almost certainly underpaid on Sundays. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your Level 2 shifts &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A Level 2 casual worker paid the ordinary weekday rate for every shift misses: approximately {/* TODO: dynamic rate */}$6.32/hr on Saturdays, {/* TODO: dynamic rate */}$12.64/hr on Sundays, and {/* TODO: dynamic rate */}$25.28/hr on public holidays. Working one Sunday and one Saturday per week: ~$113.76/week. Over a year: ~$5,688 &mdash; from two shifts per week being underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate line for each day type you worked?</li>
          <li>Do the rates in each line match the table above?</li>
          <li>Is one flat rate applied for all shifts regardless of day or time?</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; run your actual shifts through the calculator.</p>
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
