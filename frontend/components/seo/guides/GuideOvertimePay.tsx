/**
 * Overtime Pay in Australia — /guides/overtime-pay-australia
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
  { question: 'My employer says my salary covers overtime — is that valid?', answer: 'Only if the salary exceeds all award obligations including overtime in every week worked. If you work significantly more than 38 hours regularly, ask for the calculation.' },
  { question: 'Do casual employees get overtime?', answer: 'The daily threshold still applies to casuals under most awards. Weekly overtime generally doesn\'t apply the same way, but a casual working 12-hour shifts may still be owed overtime on the excess.' },
  { question: 'Can I claim back unpaid overtime?', answer: 'Yes — up to 6 years under the Fair Work Act.' },
];

export default function GuideOvertimePay() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you regularly work long hours in Australia and your pay looks the same every week, there&apos;s a high chance overtime isn&apos;t being applied. Overtime is one of the most frequently unpaid entitlements across hospitality, retail, fast food, and office work &mdash; often because employers assume a salary or verbal agreement covers it. It usually doesn&apos;t.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work more than 38 hours a week or more than your award&apos;s daily threshold &mdash; overtime almost certainly applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Full-time admin worker under the Clerks Award. Works 42 hours one week &mdash; regularly.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they were paid:</strong> Same weekly salary as always</p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> 38 ordinary hours at base rate; 4 hours at time-and-a-half</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Underpayment: ~$50&ndash;80 that week, ~$2,600&ndash;$4,200/year if this happens weekly
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer says the salary covers all reasonable hours. That claim is only valid if the salary genuinely exceeds all overtime obligations &mdash; most of the time, it doesn&apos;t.
          </p>
        </div>
      </section>

      {/* How overtime works */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How overtime works in Australia</h2>
        <p style={pStyle}>
          Under most modern awards, overtime applies when you work beyond your ordinary hours. The general structure:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Daily trigger</strong> &mdash; overtime after exceeding a set number of hours in a day</li>
          <li><strong>Weekly trigger</strong> &mdash; overtime after more than 38 ordinary hours in a week</li>
          <li><strong>Rate</strong> &mdash; time-and-a-half (1.5&times;) for the first period, double time (2&times;) after that</li>
        </ul>
        <p style={pStyle}>
          If your payslip never shows overtime despite working past these thresholds, that&apos;s a red flag.
        </p>
        <CheckPayCTA />
      </section>

      {/* Overtime thresholds table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Overtime thresholds &mdash; key awards compared</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Award</th>
                <th style={thStyle}>Daily trigger</th>
                <th style={thStyle}>Weekly trigger</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hospitality (MA000009)</td><td style={tdStyle}>After 10 hours</td><td style={tdStyle}>After 38 hours</td></tr>
              <tr><td style={tdStyle}>Fast Food (MA000003)</td><td style={tdStyle}>After 11 hours</td><td style={tdStyle}>After 38 hours</td></tr>
              <tr><td style={tdStyle}>Retail (MA000004)</td><td style={tdStyle}>After 9 hours</td><td style={tdStyle}>After 38 hours</td></tr>
              <tr><td style={tdStyle}>Clerks (MA000002)</td><td style={tdStyle}>After 7.6 hours</td><td style={tdStyle}>After 38 hours</td></tr>
            </tbody>
          </table>
        </div>
        <p style={smallStyle}>
          Thresholds are indicative &mdash; refer to your specific award. Rates effective 1 July 2025.
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          For detailed worked examples, see your award-specific overtime guide: <a href="/awards/hospitality-award/overtime" style={linkStyle}>Hospitality Award overtime</a>
        </p>
      </section>

      {/* TOIL */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Time off in lieu (TOIL)</h2>
        <p style={pStyle}>
          Some awards allow TOIL instead of overtime pay &mdash; but only when:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Agreed in writing before the overtime is worked</li>
          <li>Taken at the overtime rate &mdash; 1 hour at time-and-a-half = 1.5 hours TOIL</li>
        </ul>
        <p style={pStyle}>
          Hour-for-hour TOIL is underpayment. If you&apos;ve been taking it 1:1, the difference is owed.
        </p>
        <CheckPayCTA />
      </section>

      {/* Common underpayments */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common overtime underpayments</h2>

          <h3 style={h3Style}>Salary absorption &mdash; &ldquo;your salary covers all hours&rdquo;</h3>
          <p style={pStyle}>
            A salary only covers overtime if it demonstrably exceeds total award obligations across every week worked. Most don&apos;t &mdash; especially during peak periods.
          </p>
          <p style={pStyle}>
            If you regularly work 40+ hours on a fixed salary, check your pay now.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Long single shifts with no overtime applied</h3>
          <p style={pStyle}>
            A 12-hour shift often contains overtime under most awards. Many employers pay a flat shift rate regardless of length.
          </p>

          <h3 style={h3Style}>TOIL taken hour-for-hour</h3>
          <p style={pStyle}>
            1 hour at time-and-a-half = 1.5 hours TOIL minimum. Anything less is underpayment.
          </p>

          <h3 style={h3Style}>Part-time workers pushed past agreed hours</h3>
          <p style={pStyle}>
            Hours beyond agreed part-time hours are overtime &mdash; even if the week doesn&apos;t exceed 38.
          </p>

          <p style={pStyle}>
            These issues rarely happen in isolation &mdash; and even one can result in hundreds or thousands in underpayments per year.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer} {i === 2 && <> See <a href="/guides/how-to-report-underpayment" style={linkStyle}>how to report underpayment</a></>}</p>
          </details>
        ))}
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; small underpayments add up fast.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you&apos;re owed including every overtime threshold.
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
