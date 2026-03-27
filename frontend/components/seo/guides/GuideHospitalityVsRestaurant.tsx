/**
 * Hospitality vs Restaurant Award guide — /guides/hospitality-vs-restaurant-award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left' as const, borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'My caf\u00e9 is inside a hotel — which award?', answer: 'Almost certainly the Hospitality Award. Food and beverage operations that are part of a hotel fall under the Hospitality Award regardless of how the venue is branded.' },
  { question: 'I work at a caf\u00e9 that does catering events — does that change anything?', answer: 'Not if the caf\u00e9 is the primary business. Occasional catering doesn\'t switch the award. But if catering is the primary business, the Restaurant Award may apply.' },
  { question: 'My employer says we\'re on the Hospitality Award — how do I verify?', answer: 'Check your payslip and employment contract — the award should be named. You can also check using the Fair Work Award Finder. If the Finder says Restaurant Award but your employer is applying Hospitality, that\'s worth raising.' },
];

export default function GuideHospitalityVsRestaurant() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work in a caf&eacute;, restaurant, or hospitality venue and have never verified which award applies, there&apos;s a high chance you don&apos;t know &mdash; and there&apos;s a meaningful chance the wrong one is being used. The Hospitality Award (MA000009) and the Restaurant Industry Award (MA000119) cover similar workers in similar settings. But the rates differ, particularly on Sundays &mdash; meaning the wrong award could mean every Sunday shift has been calculated incorrectly from the start.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work in a caf&eacute;, restaurant, hotel dining room, or any food and beverage venue &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Waitstaff at a standalone caf&eacute;. Employer applies the Hospitality Award. The Restaurant Award actually applies.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>Why it matters:</strong> Sunday permanent rates differ between the two awards. Restaurant Award Sunday rate (1.75&times;) is higher than Hospitality Award (1.5&times;).</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Impact: Potentially underpaid on every Sunday shift for the duration of employment.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer uses whichever award they&apos;re familiar with. Worker has no way to check without knowing which applies.
          </p>
        </div>
      </section>

      {/* The core distinction */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The core distinction</h2>
        <p style={pStyle}>
          The difference comes down to the employer&apos;s primary business activity.
        </p>
        <h3 style={h3Style}>Hospitality Award (MA000009) applies when the primary business is:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Hotel, motel, resort, or accommodation</li>
          <li>Licensed club</li>
          <li>Function centre connected to an accommodation venue</li>
          <li>Pub or bar operating as part of a hotel</li>
        </ul>
        <h3 style={h3Style}>Restaurant Industry Award (MA000119) applies when the primary business is:</h3>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Standalone restaurant</li>
          <li>Standalone caf&eacute; or coffee shop</li>
          <li>Catering business not connected to a hotel</li>
          <li>Event catering</li>
        </ul>
        <p style={pStyle}>
          If your payslip doesn&apos;t show which award applies, that&apos;s a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Decision framework */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Decision framework &mdash; which award applies to you?</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>1.</strong> Is your employer primarily in accommodation or hotels? &rarr; Yes &rarr; Hospitality Award</li>
          <li><strong>2.</strong> Is it a pub, bar, or licensed club (not primarily accommodation)? &rarr; Yes &rarr; Hospitality Award</li>
          <li><strong>3.</strong> Is it a standalone restaurant or caf&eacute; with no accommodation component? &rarr; Yes &rarr; Restaurant Award</li>
          <li><strong>4.</strong> Is your restaurant or caf&eacute; attached to a hotel or resort? &rarr; Yes &rarr; Hospitality Award</li>
          <li><strong>5.</strong> Still not sure? &rarr; Use the Fair Work Award Finder at fairwork.gov.au</li>
        </ul>
      </section>

      {/* Key rate differences table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Key rate differences</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Scenario</th>
                <th style={thStyle}>Hospitality Award</th>
                <th style={thStyle}>Restaurant Award</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Sunday rate (permanent)</td><td style={tdStyle}>1.5&times;</td><td style={tdStyle}>1.75&times;</td></tr>
              <tr><td style={tdStyle}>Sunday rate (casual)</td><td style={tdStyle}>Higher multiplier &mdash; check pay guide</td><td style={tdStyle}>Different multiplier &mdash; check pay guide</td></tr>
              <tr><td style={tdStyle}>Public holiday rate</td><td style={tdStyle}>2.25&times;</td><td style={tdStyle}>2.25&times;</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          The Restaurant Award Sunday rate for permanent employees is meaningfully higher &mdash; making correct award identification particularly important for Sunday workers.
        </p>
        <p style={smallStyle}>
          Rates effective 1 July 2025. Refer to your award&apos;s pay guide for exact dollar amounts.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          If you&apos;ve been on the wrong award for your Sunday shifts, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* Common wrong-award issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common wrong-award issues</h2>

          <h3 style={h3Style}>Hospitality Award applied to standalone restaurant staff</h3>
          <p style={pStyle}>
            The most common error. Restaurant staff on the Hospitality Award may receive lower Sunday rates than they&apos;re entitled to.
          </p>

          <h3 style={h3Style}>Award not specified on payslip or contract</h3>
          <p style={pStyle}>
            If your documentation doesn&apos;t clearly identify which award applies, ask your employer directly. They&apos;re legally required to tell you.
          </p>

          <h3 style={h3Style}>Award changed without notification</h3>
          <p style={pStyle}>
            Employees are entitled to know which award applies. Any change must be communicated &mdash; and changing to a less favourable award may not be legally valid.
          </p>
        </div>
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

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; the award determines every rate you&apos;re paid.
        </p>
        <p style={pStyle}>
          Enter your shifts and check what you should have been paid under the correct award for your workplace.
        </p>
        <CheckPayCTA />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
      </p>

      {/* FAQPage Schema */}
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
