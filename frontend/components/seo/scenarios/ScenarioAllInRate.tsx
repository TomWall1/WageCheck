/**
 * Scenario: All-In Rate — /awards/hospitality-award/scenarios/all-in-rate
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
  { question: 'My contract says my all-in rate covers all entitlements — is that enforceable?', answer: 'Only if the rate actually does cover all entitlements. A contractual claim that the rate is all-inclusive doesn\u0027t make it legally sufficient if the numbers don\u0027t support it.' },
  { question: 'How do I get my employer to show me the calculation?', answer: 'Ask in writing. Request a written statement demonstrating how the all-in rate covers the highest penalty scenario applicable to your role. If they can\u0027t or won\u0027t provide it, that\u0027s informative.' },
  { question: 'If the all-in rate is insufficient, can I claim back pay?', answer: 'Yes — up to 6 years. The shortfall is the difference between your all-in rate and what the award requires for each affected shift type.' },
];

export default function ScenarioAllInRate() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          It can be &mdash; but the conditions are strict and most all-in rates don&apos;t actually meet them. An all-in rate arrangement in hospitality is a single hourly rate that purports to cover all award entitlements including <a href="/awards/hospitality-award/penalty-rates" style={linkStyle}>penalty rates</a>, <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowances</a>, and <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a>. For it to be legal, it must demonstrably exceed every award entitlement in every possible scenario &mdash; including public holidays. Most don&apos;t.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re on an all-in rate in hospitality &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>An all-in rate is legal under the Hospitality Award only when:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>The rate is higher than every applicable award rate across every shift type &mdash; including the highest penalty scenarios (2.25&times; public holiday rate)</li>
          <li>The assessment covers all allowances that might apply</li>
          <li>The arrangement is genuinely better off overall for the employee compared to the award</li>
          <li>For casuals, the 25% loading is embedded in the comparison</li>
        </ul>
        {/* TODO: dynamic rate */}
        <p style={pStyle}>
          The public holiday rate is the critical test. At Level 2 casual, that&apos;s $56.88/hr. Any all-in rate that falls below this fails to cover public holiday shifts.
        </p>
        <p style={pStyle}>
          If your all-in rate doesn&apos;t clearly exceed the public holiday rate for your level, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to check your all-in rate</h2>
        <p style={pStyle}><strong>Step 1:</strong> Find your classification level. See <a href="/awards/hospitality-award/classifications" style={linkStyle}>Hospitality Award classifications guide</a></p>
        <p style={pStyle}><strong>Step 2:</strong> Check the public holiday rate for your level from the rates table. See <a href="/awards/hospitality-award/pay-rates" style={linkStyle}>Hospitality Award pay rates</a></p>
        <p style={pStyle}><strong>Step 3:</strong> If your all-in rate is lower than the public holiday rate for your level, the arrangement fails for public holiday shifts.</p>
        <p style={pStyle}><strong>Step 4:</strong> Also check your Sunday rate. Even if the all-in covers weekdays, it may fall short on Sundays.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Common all-in rate failures</h2>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Rate set above ordinary but below Sunday or public holiday rate</h3>
          {/* TODO: dynamic rate */}
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            The most common failure. A rate of $38/hr clears the ordinary casual rate at Level 2 ($31.60) but falls well short of the public holiday rate ($56.88/hr).
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Arrangement was agreed verbally at hire, never formally assessed</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Many all-in arrangements were never properly calculated against the full award. Both parties assumed the rate was compliant without checking.
          </p>
        </div>

        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Allowances not included in the assessment</h3>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            Even if penalty rates are covered, a split shift or meal allowance that applies in some shifts can make the arrangement non-compliant on those days.
          </p>
        </div>
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
        <p style={pStyle}>Don&apos;t guess &mdash; compare your all-in rate against every shift type you work.</p>
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
