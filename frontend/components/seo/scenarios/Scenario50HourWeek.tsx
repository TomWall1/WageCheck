/**
 * Scenario: No Overtime Paid for a 50-Hour Hospitality Week
 * URL: /awards/hospitality-award/scenarios/50-hour-week
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
  { question: 'My employer says 50-hour weeks are "expected in hospitality" — is that right?', answer: 'Long hours are common in hospitality — but the award applies regardless. Expected hours don\'t change the legal obligation to pay overtime.' },
  { question: 'Can I claim back overtime from previous years?', answer: 'Yes — up to 6 years under the Fair Work Act. If this has been happening consistently, the cumulative amount owed may be very significant.' },
  { question: 'What if I\'m on a salary?', answer: 'A salary only covers overtime if it demonstrably exceeds all award obligations for every week worked. If you regularly work 50-hour weeks on a salary designed for 38, it almost certainly doesn\'t cover it.' },
];

export default function Scenario50HourWeek() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You are almost certainly owed <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a>. Under the Hospitality Award, every hour beyond 38 in a week triggers overtime at time-and-a-half, then double time. A 50-hour week contains 12 hours of overtime &mdash; and if your payslip shows no overtime, those 12 hours were paid at ordinary rates when they should have been paid significantly higher.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work 50 hours in a hospitality week and see no overtime on your payslip &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Ordinary hours:</strong> up to 38 per week</li>
          <li><strong>Overtime &mdash; hours 39 and 40:</strong> 1.5&times; your ordinary rate</li>
          <li><strong>Overtime &mdash; hours 41 onwards:</strong> 2&times; your ordinary rate</li>
        </ul>
        <p style={pStyle}>In a 50-hour week, that means 2 hours at time-and-a-half and 10 hours at double time.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid (worked example)</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Permanent Level 3 employee. 50-hour week.</strong>
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>38 hours at {/* TODO: dynamic rate */}$26.10/hr = {/* TODO: dynamic rate */}$991.80</li>
            <li>2 hours at {/* TODO: dynamic rate */}$39.15/hr = {/* TODO: dynamic rate */}$78.30</li>
            <li>10 hours at {/* TODO: dynamic rate */}$52.20/hr = {/* TODO: dynamic rate */}$522.00</li>
            <li><strong>Total: {/* TODO: dynamic rate */}$1,592.10</strong></li>
          </ul>
          <p style={smallStyle}>
            Compared to 50 hours at flat ordinary rate: {/* TODO: dynamic rate */}$1,305.00. Underpayment on this single week: {/* TODO: dynamic rate */}$287.10.
          </p>
          <p style={{ ...pStyle, marginTop: '12px', marginBottom: 0, fontWeight: 600 }}>
            Over 52 weeks, if this pattern is consistent: ~{/* TODO: dynamic rate */}$14,900/year in unpaid overtime.
          </p>
        </div>
        <p style={pStyle}>
          If your payslip shows no overtime on weeks over 38 hours, <a href="/check-my-pay?award=MA000009" style={linkStyle}>check your pay now &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does overtime appear as a separate line for weeks over 38 hours?</li>
          <li>Does the overtime rate change from 1.5&times; to 2&times; after the first 2 overtime hours?</li>
          <li>Is one flat rate applied for all hours regardless of how many were worked?</li>
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
          Don&apos;t guess &mdash; calculate what 50 hours should actually pay.
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
