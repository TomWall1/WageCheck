/**
 * Scenario: Below Award Pay — /awards/hospitality-award/scenarios/below-award-pay
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
  { question: 'My employer says my rate is competitive for the industry — is that a valid defence?', answer: 'No. The award rate is the legal minimum regardless of what other employers pay. "Competitive" is not a legal standard.' },
  { question: 'Can my employer lower my rate with notice?', answer: 'An employer cannot reduce your rate below the award minimum under any circumstances. They can reduce it above the minimum with agreement, but never below it.' },
  { question: 'If the shortfall is small — is it still worth pursuing?', answer: 'Yes. Small weekly shortfalls compound quickly. $2/hr shortfall \u00d7 20hrs/week \u00d7 52 weeks = over $2,000/year. Over 3 years, that\u0027s $6,000+.' },
];

export default function ScenarioBelowAward() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re owed the difference &mdash; and you can recover it. Being paid below the minimum rate set by the Hospitality Award is a breach of the Fair Work Act. It doesn&apos;t matter whether it was deliberate or a genuine mistake. You&apos;re entitled to every dollar of the shortfall going back up to 6 years, and the Fair Work Ombudsman can help you recover it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re being paid &mdash; or have been paid &mdash; below the award minimum in hospitality, this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to confirm you&apos;re below the award rate</h2>
        <p style={pStyle}><strong>Step 1:</strong> Confirm your <a href="/awards/hospitality-award/classifications" style={linkStyle}>classification level</a>. If your payslip doesn&apos;t show it, ask your employer.</p>
        <p style={pStyle}><strong>Step 2:</strong> Look up the minimum rate for your level and employment type in the pay guide. See <a href="/awards/hospitality-award/pay-rates" style={linkStyle}>Hospitality Award pay rates</a></p>
        <p style={pStyle}><strong>Step 3:</strong> Compare your actual rate against the table. If your rate is lower, you&apos;re being underpaid.</p>
        <p style={pStyle}><strong>Step 4:</strong> Check that the correct rate is being applied for the day you&apos;re working &mdash; a rate that&apos;s legal on a Tuesday may be below the minimum on a Sunday.</p>
        <p style={pStyle}>
          If your rate falls below the minimum, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Calculate the exact shortfall &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The minimum rates for common hospitality roles (casual)</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Casual ordinary</th>
                <th style={thStyle}>Casual Sunday</th>
                <th style={thStyle}>Casual public holiday</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 1</td><td style={tdStyle}>$30.13/hr</td><td style={tdStyle}>$42.18/hr</td><td style={tdStyle}>$54.23/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 2</td><td style={tdStyle}>$31.60/hr</td><td style={tdStyle}>$44.24/hr</td><td style={tdStyle}>$56.88/hr</td></tr>
              {/* TODO: dynamic rate */}
              <tr><td style={tdStyle}>Level 3</td><td style={tdStyle}>$32.63/hr</td><td style={tdStyle}>$45.68/hr</td><td style={tdStyle}>$58.73/hr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>Effective 1 July 2025.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Being paid $2/hr below the award minimum for your level and employment type: $2 &times; 25hrs/week &times; 52 weeks = $2,600/year from base rate alone &mdash; before factoring in that every penalty rate multiplied from the wrong base is also underpaid. The compounding effect across weekend shifts typically doubles or triples the total. Over 3 years: potentially $8,000&ndash;$15,000+.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <p style={pStyle}><strong>Step 1:</strong> Document your actual rate &mdash; payslips, bank statements, any written confirmation of your pay rate.</p>
        <p style={pStyle}><strong>Step 2:</strong> Calculate the shortfall &mdash; how much per hour &times; how many hours over what period.</p>
        <p style={pStyle}><strong>Step 3:</strong> Raise it with your employer. Many respond and correct it.</p>
        <p style={pStyle}><strong>Step 4:</strong> If they don&apos;t, contact the Fair Work Ombudsman on 13 13 94 or lodge at fairwork.gov.au. They investigate for free and can recover the shortfall plus interest.</p>
        <p style={pStyle}>
          See the <a href="/guides/how-to-report-underpayment" style={linkStyle}>guide to reporting underpayment</a> for the full process.
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
        <p style={pStyle}>Don&apos;t guess &mdash; calculate the exact shortfall.</p>
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
