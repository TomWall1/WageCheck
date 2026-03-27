/**
 * Scenario: Sent Home Early from a Hospitality Shift — What Do I Get Paid?
 * URL: /awards/hospitality-award/scenarios/sent-home-early
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
  { question: 'Does the minimum apply if I leave early voluntarily?', answer: 'If you chose to leave early of your own accord, the minimum engagement may not apply. But if you were sent home — even politely — the minimum still applies.' },
  { question: 'I\'m a permanent employee — does a minimum engagement apply to me?', answer: 'Permanent employees have agreed rostered hours. Being sent home early as a permanent employee is more complex and relates to your agreed hours rather than a casual minimum.' },
  { question: 'My employer says it\'s slow so they can\'t afford to pay the minimum — is that a valid reason?', answer: 'No. The minimum engagement applies regardless of business conditions.' },
];

export default function ScenarioSentHomeEarly() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          At least 3 hours &mdash; regardless of how long you actually worked. The Hospitality Award requires a minimum engagement of 3 hours for casual employees per shift. If you arrive, work for 90 minutes, and get sent home because it&apos;s quiet, you&apos;re still owed 3 hours&apos; pay at the rate applicable for that day and time.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve ever been sent home early from a hospitality shift and paid only for the time worked &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), the minimum engagement period for casual employees is 3 hours per shift. This means:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>If you work 1 hour, you&apos;re paid for 3 hours</li>
          <li>If you work 2 hours, you&apos;re paid for 3 hours</li>
          <li>If you work 4 hours, you&apos;re paid for 4 hours</li>
        </ul>
        <p style={pStyle}>
          The minimum applies regardless of the reason for the early finish &mdash; including slow trade, overstaffing, or the employer simply deciding they don&apos;t need you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <p style={pStyle}>
          The 3-hour minimum is calculated at the rate applicable for that day:
        </p>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}><strong>Minimum 3-hour pay (Level 1&ndash;3 casual):</strong></p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Weekday: {/* TODO: dynamic rate */}$30.13 / {/* TODO: dynamic rate */}$31.60 / {/* TODO: dynamic rate */}$32.63 per hour</li>
            <li>Saturday: {/* TODO: dynamic rate */}$36.15 / {/* TODO: dynamic rate */}$37.92 / {/* TODO: dynamic rate */}$39.15 per hour</li>
            <li>Sunday: {/* TODO: dynamic rate */}$42.18 / {/* TODO: dynamic rate */}$44.24 / {/* TODO: dynamic rate */}$45.68 per hour</li>
          </ul>
          <p style={smallStyle}>
            Minimum 3 hours = 3 &times; the applicable rate. Rates effective 1 July 2025. Based on the Fair Work Commission pay guide for MA000009.
          </p>
        </div>
        <p style={pStyle}>
          If you were paid for less than 3 hours on any shift, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does every shift show at least 3 hours worked, even if you left earlier?</li>
          <li>Is the minimum engagement applied at the correct day rate (not just the weekday rate on a Sunday)?</li>
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
          Don&apos;t guess &mdash; calculate what you were owed.
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
