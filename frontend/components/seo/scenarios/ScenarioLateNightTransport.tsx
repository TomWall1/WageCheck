/**
 * Scenario: Late Night Hospitality Finish — Do I Get Transport Paid?
 * URL: /awards/hospitality-award/scenarios/late-night-transport
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
  { question: 'My shift ends at 1am — is the whole shift paid at late-night rates?', answer: 'No. Only the hours after midnight attract the late-night loading. Hours before midnight attract the evening loading (7pm\u2013midnight) or the ordinary/weekend rate before 7pm.' },
  { question: 'My employer provides a taxi home after midnight — do I still get the loading?', answer: 'Yes. The loading is a pay entitlement that applies to the hours worked regardless of any transport arrangements.' },
  { question: 'I have to pay for my own transport home — can I claim it?', answer: 'Under the standard Hospitality Award, there\'s no automatic reimbursement for transport home. However, if you were required to work late due to your employer\'s direction and public transport is unavailable, some arrangements may apply. Check your enterprise agreement or raise it with the Fair Work Ombudsman.' },
];

export default function ScenarioLateNightTransport() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          It depends on your circumstances &mdash; and many workers who qualify never receive it. The Hospitality Award has limited provisions around late-night transport, but some employees finishing after midnight may be entitled to employer-arranged transport or a reimbursement under specific conditions. This is separate from the late-night loading that applies to your hourly rate.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly finish hospitality shifts after midnight &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), the primary financial compensation for late-night work is the late-night loading &mdash; an additional {/* TODO: dynamic rate */}$4.82/hr applied to all hours worked between midnight and 7am on top of any other applicable rate.
        </p>
        <p style={pStyle}>
          On the question of transport specifically: the award does not contain a blanket transport entitlement for all late-night workers. However, some enterprise agreements or venue-specific arrangements do include transport provisions &mdash; check your employment contract or any applicable enterprise agreement.
        </p>
        <p style={pStyle}>
          What is required: the late-night loading on every hour worked after midnight. This is frequently missed and is itself a meaningful entitlement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid for late nights</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li><strong>7pm&ndash;midnight:</strong> {/* TODO: dynamic rate */}+$2.47/hr (evening loading) on top of applicable rate</li>
            <li><strong>Midnight&ndash;7am:</strong> {/* TODO: dynamic rate */}+$4.82/hr (late-night loading) on top of applicable rate</li>
          </ul>
          <p style={smallStyle}>
            These apply on top of whatever day rate (weekday, Saturday, Sunday, or public holiday) is in effect.
          </p>
        </div>
        <p style={pStyle}>
          If you regularly finish after midnight and your rate doesn&apos;t reflect the late-night loading, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show an evening loading for hours after 7pm?</li>
          <li>Does it show a higher late-night loading for hours after midnight?</li>
          <li>Check your employment contract or enterprise agreement &mdash; it may include transport provisions not in the standard award.</li>
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
          Don&apos;t guess &mdash; check what your late-night hours should pay.
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
