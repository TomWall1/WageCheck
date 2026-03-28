/**
 * Scenario: Annual Leave Loading — /awards/hospitality-award/scenarios/annual-leave-loading
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
  { question: 'I\u0027m casual — I thought I got leave loading as part of my casual rate?', answer: 'The 25% casual loading compensates for the absence of annual leave itself — not for annual leave loading. Casuals don\u0027t receive annual leave, so no loading applies.' },
  { question: 'My employer says annual leave loading isn\u0027t required under the Hospitality Award — is that right?', answer: 'Check your specific award and your employment instrument. The annual leave loading provision is in the award, though the "greater of" calculation means it sometimes doesn\u0027t produce additional payment in practice.' },
  { question: 'Do I get annual leave loading if my employer cashes out my leave?', answer: 'If annual leave is cashed out (which requires agreement), the loading should apply to the cashed-out amount in the same way it would for leave taken.' },
];

export default function ScenarioAnnualLeave() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          <a href="/awards/hospitality-award/casual-employees" style={linkStyle}>Casual</a> employees do not receive annual leave loading &mdash; but permanent employees may, and it&apos;s frequently missed. Annual leave loading is an additional payment on top of ordinary pay when permanent employees take annual leave. Under the Hospitality Award, permanent employees are entitled to the higher of their normal pay or pay plus 17.5% annual leave loading. Many employers simply pay ordinary rates during leave without the loading.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re a permanent hospitality worker taking annual leave &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), permanent (full-time and part-time) employees are entitled to annual leave with pay at their ordinary rate of pay. Additionally, they&apos;re entitled to an annual leave loading of 17.5% on top of ordinary pay when taking leave &mdash; unless their regular <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalties</a> and shift loadings over the year amount to more than 17.5%, in which case the higher amount applies.
        </p>
        <p style={pStyle}>
          Casual employees don&apos;t receive annual leave &mdash; the 25% casual loading compensates for this absence. As such, there&apos;s no annual leave loading entitlement for casuals.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What annual leave should pay for permanent staff</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example: Permanent Level 3 hospitality worker</h3>
          {/* TODO: dynamic rate */}
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Annual leave ordinary pay: $26.10/hr</li>
            <li>Plus 17.5% loading: +$4.57/hr</li>
            <li>Total during annual leave: $30.67/hr</li>
          </ul>
          <p style={smallStyle}>
            If you&apos;re a permanent worker receiving only $26.10/hr during leave, the loading is being missed.
          </p>
        </div>
        <p style={pStyle}>
          If your pay during annual leave doesn&apos;t include the loading, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your leave loading &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Annual leave loading is 17.5% on top of ordinary pay during leave. For a permanent Level 3 employee taking 4 weeks&apos; leave (38hrs/week): 17.5% &times; {/* TODO: dynamic rate */}$26.70/hr &times; 152hrs = approximately $710 in leave loading owed per year. If your employer pays ordinary rates during leave without the loading, this amount is missed every single year.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The &quot;greater of&quot; provision</h2>
        <p style={pStyle}>The Hospitality Award specifies that annual leave must be paid at the greater of:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The ordinary rate plus 17.5% loading, or</li>
          <li>What the employee would have earned including penalties and loadings had they worked</li>
        </ul>
        <p style={pStyle}>
          If you regularly work weekends and your normal weekly earnings (with penalty rates) exceed what 17.5% loading would give you, the higher amount applies.
        </p>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check what your annual leave should pay.</p>
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
