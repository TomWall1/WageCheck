/**
 * Casual vs Part-Time guide — /guides/casual-vs-part-time
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
  { question: 'My hours vary week to week — can I still convert?', answer: 'Possibly. "Regular and systematic" doesn\'t require identical hours. A consistent pattern of engagement can qualify even with varying hours.' },
  { question: 'If I convert to part-time, will I earn less?', answer: 'Your hourly rate will be lower (no loading) but you\'ll accrue leave entitlements with real monetary value. Whether you\'re better off overall depends on your hours and how much leave you actually use.' },
  { question: 'Can my employer refuse to convert me?', answer: 'Yes, if they have genuine operational reasons — provided in writing. If you believe the refusal is not genuine, you can apply to the Fair Work Commission for review.' },
];

export default function GuideCasualVsPartTime() {
  return (
    <>
      {/* Last updated */}
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work regular hours each week but are employed as casual, there&apos;s a high chance the classification is wrong &mdash; and the financial consequences are real. Being incorrectly kept as casual means no paid leave, no notice, and no conversion offer. Understanding the difference between casual and part-time could be worth thousands of dollars in missed entitlements.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work regular hours each week and are classified as casual &mdash; this page applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Retail worker classified as casual. Works every Monday, Wednesday, and Friday &mdash; same hours, same shifts &mdash; for 2 years.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What they missed:</strong> Never offered casual conversion. No annual leave or personal leave accrued.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Missed entitlements: Annual leave alone (4 weeks/year) on 24hrs/week = ~$2,400/year in leave not accrued
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer keeps the worker casual indefinitely to avoid leave obligations. Worker doesn&apos;t know conversion rights exist.
          </p>
        </div>
      </section>

      {/* Key differences table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Key differences in pay and entitlements</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Entitlement</th>
                <th style={thStyle}>Casual</th>
                <th style={thStyle}>Part-time</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hourly rate</td><td style={tdStyle}>Higher (25% loading)</td><td style={tdStyle}>Lower (no loading)</td></tr>
              <tr><td style={tdStyle}>Annual leave</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes &mdash; 4 weeks/year pro-rated</td></tr>
              <tr><td style={tdStyle}>Personal leave</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes &mdash; 10 days/year pro-rated</td></tr>
              <tr><td style={tdStyle}>Guaranteed hours</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes &mdash; as agreed</td></tr>
              <tr><td style={tdStyle}>Notice of termination</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes</td></tr>
              <tr><td style={tdStyle}>Casual loading</td><td style={tdStyle}>Yes &mdash; 25%</td><td style={tdStyle}>No</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Casual conversion right */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The casual conversion right</h2>
        <p style={pStyle}>
          Under the Fair Work Act, casual employees who have worked regularly and systematically for at least 12 months are entitled to:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Request conversion to permanent part-time or full-time employment, OR</li>
          <li>Receive a proactive offer of conversion from their employer</li>
        </ul>
        <p style={pStyle}>
          The employer can decline if there are genuine operational reasons &mdash; but those must be provided in writing. Vague or unsupported refusals can be challenged at the Fair Work Commission.
        </p>
        <p style={pStyle}>
          Ask yourself: are you trusted with a consistent schedule and regular responsibilities? If yes, and 12 months have passed, you may qualify for conversion.
        </p>
        <p style={pStyle}>
          If your employer hasn&apos;t raised conversion after 12 months of regular work, they may be in breach.
        </p>
        <CheckPayCTA />
      </section>

      {/* Common issues */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common issues from incorrect casual classification</h2>

          <h3 style={h3Style}>Casual employment used to avoid leave obligations</h3>
          <p style={pStyle}>
            Keeping workers casual indefinitely &mdash; even when the schedule is completely regular &mdash; to avoid accruing annual and personal leave. Not legally sustainable after 12 months.
          </p>
          <p style={pStyle}>
            If you&apos;ve worked regular hours for over a year without a conversion offer, check your entitlements now.
          </p>
          <CheckPayCTA />

          <h3 style={h3Style}>Conversion right never raised by the employer</h3>
          <p style={pStyle}>
            Most casual workers don&apos;t know this right exists. Employers have an obligation to proactively offer conversion or inform eligible employees. Many don&apos;t.
          </p>

          <h3 style={h3Style}>Loading used to justify below-award conditions</h3>
          <p style={pStyle}>
            The 25% loading compensates for specific missing entitlements. Penalty rates and correct classification still apply on top.
          </p>

          <h3 style={h3Style}>&quot;Irregular&quot; roster to avoid regular status</h3>
          <p style={pStyle}>
            Slight variation in hours week to week doesn&apos;t necessarily negate regular and systematic status. A pattern of engagement over 12 months is what matters.
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

      {/* Find your award */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Find your award</h2>
        <p style={pStyle}>
          These rules apply across all modern awards — but the specific rates, penalty multipliers, and allowances vary by industry. If you&apos;re ready to check your actual pay:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Hospitality</strong> (hotels, bars, caf&eacute;s, clubs) &rarr; <a href="/awards/hospitality-award" style={linkStyle}>Hospitality Award pay rates</a></li>
          <li><strong>Fast food and takeaway</strong> &rarr; <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Award pay rates</a></li>
          <li><strong>Restaurants and caf&eacute;s</strong> &rarr; <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Award pay rates</a></li>
          <li><strong>Retail</strong> (shops, supermarkets) &rarr; <a href="/awards/retail-award" style={linkStyle}>Retail Award pay rates</a></li>
          <li><strong>Admin and clerical</strong> &rarr; <a href="/awards/clerks-award" style={linkStyle}>Clerks Award pay rates</a></li>
          <li><strong>Cleaning</strong> &rarr; <a href="/awards/cleaning-award" style={linkStyle}>Cleaning Award pay rates</a></li>
        </ul>
        <p style={pStyle}>
          Not sure which applies to you? <a href="/awards" style={linkStyle}>Browse all awards</a>
        </p>
      </section>

      {/* Closing CTA */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; your employment type affects everything.
        </p>
        <p style={pStyle}>
          Enter your shifts and see exactly what you should have been paid.
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
