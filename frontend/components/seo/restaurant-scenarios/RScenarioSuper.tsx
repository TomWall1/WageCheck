/**
 * Scenario: Superannuation — /awards/restaurant-award/scenarios/super
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
  { question: 'Do casual workers get super?', answer: 'Yes. Since November 2022, there is no minimum earnings threshold for super. All employees — including casuals — are entitled to superannuation at 12% of ordinary time earnings, regardless of how much they earn.' },
  { question: 'How often must my employer pay super?', answer: 'Employers must pay super contributions at least quarterly — by the 28th day after the end of each quarter. Many employers pay more frequently (e.g., each pay cycle), but quarterly is the legal minimum.' },
  { question: 'Can I claim unpaid super?', answer: 'Yes. If your employer hasn\'t been paying your super, you can report it to the Australian Taxation Office (ATO). The ATO can investigate and recover unpaid super on your behalf, including a charge for late payment.' },
];

export default function RScenarioSuper() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          All restaurant and caf&eacute; workers &mdash; including casuals &mdash; are entitled to superannuation at 12% of ordinary time earnings. Since November 2022, there is no minimum earnings threshold. If your employer isn&apos;t paying your super, they&apos;re breaking the law.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you haven&apos;t checked your super fund recently &mdash; do it now.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Superannuation Guarantee:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Rate: 12% of ordinary time earnings (as of 1 July 2025)</li>
          <li>No minimum earnings threshold since November 2022</li>
          <li>Applies to all employees: permanent, part-time, and casual</li>
          <li>Must be paid at least quarterly (by the 28th day after quarter end)</li>
          <li>Applies regardless of payment method (bank transfer or cash)</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li><strong>Step 1:</strong> Log into your super fund (or use myGov to find your fund)</li>
            <li><strong>Step 2:</strong> Check employer contributions for each quarter</li>
            <li><strong>Step 3:</strong> Compare contributions against 12% of your ordinary time earnings</li>
            <li><strong>Step 4:</strong> Check that contributions are being made at least quarterly</li>
          </ul>
          <p style={smallStyle}>
            If contributions are missing, late, or lower than expected, your employer may not be meeting their obligations.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A <a href="/awards/restaurant-award/casual-employees" style={linkStyle}>casual</a> Level 3 working 20 hours per week at ~$32.63/hr earns approximately $33,934 in ordinary time per year. At 12%, that&apos;s ~$4,072/year in super contributions your employer should be making. Over a 5-year period of missed super, that&apos;s over $20,000 in lost retirement savings &mdash; before accounting for investment returns.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do if super is missing</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Raise it with your employer first &mdash; in writing</li>
          <li>If not resolved, report to the ATO online or call 13 10 20</li>
          <li>The ATO can investigate and recover unpaid super</li>
          <li>Your employer may also be liable for a Super Guarantee Charge (SGC)</li>
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
        <p style={pStyle}>Check your pay is right &mdash; including super.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
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
