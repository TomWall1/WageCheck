/**
 * Scenario: Tips and Pay — /awards/hospitality-award/scenarios/tips-and-pay
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
  { question: 'My employer pools all tips and distributes them — is that legal?', answer: 'Yes, if the arrangement is transparent and all staff have effectively agreed to it. Tip pooling is common and legal.' },
  { question: 'My employer keeps all service charges and doesn\u0027t share anything — is that right?', answer: 'This may conflict with the 2023 changes depending on the circumstances. If service charges are added to bills in a way that customers reasonably expect to go to staff, the employer may be required to pass them on.' },
  { question: 'I rely on tips to make a reasonable income — is my base rate still correct?', answer: 'Your base rate must meet the award minimum for your classification regardless of tips. If it doesn\u0027t, you\u0027re being underpaid even before the tips question.' },
];

export default function ScenarioTipsAndPay() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Tips are not an award entitlement &mdash; but your employer cannot use them to offset your minimum pay. Under the Hospitality Award, your minimum rates, <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a>, and <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowances</a> must be paid regardless of whether customers tip and regardless of how much. There&apos;s no legal entitlement to receive tips, but there&apos;s also no legal right for your employer to use tips to reduce your pay below award minimums.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in hospitality and tip policies feel unclear &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under Australian law:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Tips are not part of your award entitlement. The Hospitality Award sets minimum pay rates independently of tipping.</li>
          <li>Your award rate must be paid in full regardless of tips received.</li>
          <li>Tip pooling arrangements &mdash; where tips are collected and distributed among staff &mdash; are legal if staff agree to them and the arrangement is transparent.</li>
          <li>Your employer cannot keep all tips if those tips were given by customers specifically for the service staff.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What your pay must include regardless of tips</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Your full minimum hourly rate for your <a href="/awards/hospitality-award/classifications" style={linkStyle}>classification level</a></li>
            <li>All applicable penalty rates for the days you worked</li>
            <li>All applicable allowances</li>
            <li>Superannuation on your ordinary time earnings</li>
          </ul>
          <p style={{ ...smallStyle }}>
            None of these are reduced by the existence of tips. If your employer is paying you below the award rate on the basis that &quot;tips make up the difference,&quot; that&apos;s not a valid arrangement.
          </p>
        </div>
        <p style={pStyle}>
          If you suspect your base pay is below award minimums regardless of tips, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check if your base rate is correct &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          If your base pay is below the award minimum &mdash; for example, $28/hr when the Sunday casual rate at your level is {/* TODO: dynamic rate */}$44.24/hr &mdash; tips don&apos;t fill that gap legally. The shortfall is owed regardless of how much you earned in tips. On a Sunday shift where the pay gap is $15+/hr, a 6-hour shift means $90+ owed per shift on top of any tipping income.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The Fair Work Act and tips (2023 changes)</h2>
        <p style={pStyle}>
          The Fair Work Legislation Amendment (Closing Loopholes) Act 2023 introduced new provisions around tips and service charges. Employers covered by the Act must pay tips, gratuities, and service charges to employees as directed by the reasonable expectation of the customer who paid them.
        </p>
        <p style={pStyle}>
          This means an employer cannot lawfully keep customer tips if those tips were clearly intended for the workers.
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
        <p style={pStyle}>Don&apos;t guess &mdash; check whether your base pay meets the award minimum.</p>
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
