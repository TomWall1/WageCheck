/**
 * Casual Loading Explained — /guides/casual-loading-explained
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
  { question: 'Do I earn more than a permanent worker as a casual?', answer: 'On ordinary weekdays, yes — the loading makes your rate higher. But permanent workers accrue leave entitlements with real monetary value, and they receive notice on termination.' },
  { question: 'I\'m casual but work the same shifts every week — does the loading still apply?', answer: 'Yes — but you may also have casual conversion rights after 12 months.' },
  { question: 'Can my employer remove the loading if I get other benefits?', answer: 'Not without a formal, legally compliant arrangement. The loading is an award entitlement.' },
];

export default function GuideCasualLoading() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re a casual worker in Australia, you&apos;ve probably been paid the 25% loading &mdash; but there&apos;s a good chance you&apos;ve been told it covers weekends. It doesn&apos;t. The loading and penalty rates are completely separate entitlements. Both apply every time. Understanding this one distinction could be worth thousands of dollars a year.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re employed as a casual in any award-covered industry &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual hospitality worker told the 25% loading covers Sunday rates.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> $30.13/hr every day (casual base rate)</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> Sunday casual rate under the Hospitality Award &mdash; $42.18/hr at Level 1</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$72 per 6-hour Sunday shift. ~$3,744/year on one Sunday per week.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer conflates the loading with penalty rates. Many workers accept the explanation without checking.
          </p>
        </div>
      </section>

      {/* What is the 25% casual loading? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is the 25% casual loading?</h2>
        <p style={pStyle}>
          The casual loading compensates for entitlements casual employees don&apos;t receive:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>No paid annual leave</li>
          <li>No paid personal/carer&apos;s leave</li>
          <li>No paid compassionate leave</li>
          <li>No notice of termination</li>
          <li>No redundancy pay</li>
        </ul>
        <p style={pStyle}>
          It&apos;s applied to the base rate to produce the casual ordinary hourly rate.
        </p>
        <p style={pStyle}>
          Example: Hospitality Award Level 1 base rate = $24.10/hr. Casual rate = $24.10 &times; 1.25 = $30.13/hr.
        </p>
        <p style={pStyle}>
          That $30.13/hr is your starting point on an ordinary weekday. It is not your rate on Sundays.
        </p>
        <p style={pStyle}>
          If your Sunday rate looks the same as your Tuesday rate, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* Does casual loading replace penalty rates? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Does casual loading replace penalty rates?</h2>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          No. This is the most important point on this page.
        </p>
        <p style={pStyle}>
          The loading and penalty rates are separate entitlements &mdash; both apply every time. Here&apos;s how it works at Level 1 under the Hospitality Award:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Day</th>
                <th style={thStyle}>Casual ordinary rate</th>
                <th style={thStyle}>Penalty</th>
                <th style={thStyle}>Rate you&apos;re owed</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Weekday</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>None</td><td style={tdStyle}>$30.13/hr</td></tr>
              <tr><td style={tdStyle}>Saturday</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>Saturday loading</td><td style={tdStyle}>$36.15/hr</td></tr>
              <tr><td style={tdStyle}>Sunday</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>Sunday loading</td><td style={tdStyle}>$42.18/hr</td></tr>
              <tr><td style={tdStyle}>Public holiday</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>PH rate</td><td style={tdStyle}>$54.23/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000009, effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          For the full breakdown of penalty rate multipliers, see the <a href="/guides/penalty-rates-australia" style={linkStyle}>penalty rates guide</a>
        </p>
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common casual loading underpayments</h2>

          <h3 style={h3Style}>Loading treated as a substitute for penalty rates</h3>
          <p style={pStyle}>
            Your employer applies the 25% and pays the same rate every day. Both the loading and the day-specific penalty must apply.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Loading calculated on a wrong base rate</h3>
          <p style={pStyle}>
            The 25% is applied to the award base rate. If your base rate is already below the award minimum, the loading doesn&apos;t fix the problem &mdash; it magnifies it.
          </p>

          <h3 style={h3Style}>No loading at all on weekday shifts</h3>
          <p style={pStyle}>
            Some employers pay the ordinary base rate on weekdays and a &ldquo;penalty rate&rdquo; on weekends without including the casual loading in either. On weekdays, the loading is missing.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
        <p style={pStyle}>
          If any of these sound familiar, check your pay now.
        </p>
        <CheckPayCTA />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer} {i === 1 && <> See <a href="/guides/casual-vs-part-time" style={linkStyle}>casual vs part-time</a></>}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you&apos;re owed &mdash; including your loading and every applicable penalty rate.
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
