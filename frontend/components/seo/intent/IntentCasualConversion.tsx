/**
 * High-intent: Employer Refusing Casual Conversion in Hospitality?
 * URL: /awards/hospitality-award/casual-conversion-refused
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData } from '@/lib/hospitality-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const warningBoxStyle: React.CSSProperties = { background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: '10px', padding: '16px 20px', marginBottom: '1.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' };
const thStyle: React.CSSProperties = { padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600, textAlign: 'left', borderBottom: '2px solid var(--border)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--secondary-muted)' };

const faqData = [
  { question: 'I work irregular hours \u2014 can I still request conversion?', answer: 'Possibly. "Regular and systematic" doesn\'t require identical hours. If there\'s been a consistent pattern of engagement over 12 months, the right may apply. The Fair Work Commission assesses the overall pattern, not individual weeks.' },
  { question: 'My employer converted me but offered fewer hours than I currently work \u2014 is that right?', answer: 'Not necessarily. The permanent arrangement should reflect your regular hours to the extent practicable. Being converted to fewer guaranteed hours than you regularly work may not reflect the spirit of the obligation.' },
  { question: 'Can I be dismissed for requesting conversion?', answer: 'No. Requesting casual conversion is a workplace right under the Fair Work Act. Taking adverse action against you for exercising that right is unlawful.' },
];

export default function IntentCasualConversion({ rates }: { rates?: HospitalityRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025 &middot; MA000009
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve been working casual in hospitality on a regular schedule for more than 12 months and your employer has never raised the possibility of permanent employment, there&apos;s a high chance your conversion rights have been ignored. The right to request casual conversion is built into the Fair Work Act &mdash; and your employer has specific obligations they may not be meeting.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;ve worked regular casual shifts in hospitality for 12 months or more &mdash; this applies to you.
        </p>
      </section>

      {/* Real example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual waitstaff working Tuesday, Thursday, and Friday every week for 2 years. Same shifts, same hours, same venue. Never offered conversion.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}><strong>What should have happened:</strong> After 12 months of regular and systematic work, the employer must either offer conversion or provide written reasons for not doing so.</p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Value of missed entitlements: Annual leave alone (4 weeks/year on 24hrs/week) = approximately $2,400/year in leave not accrued.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Employer keeps all staff casual to avoid leave obligations. Workers don&apos;t know the conversion right exists.
          </p>
        </div>
      </section>

      {/* What is casual conversion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is the casual conversion right?</h2>
        <p style={pStyle}>
          Under the Fair Work Act, casual employees who have been employed on a regular and systematic basis for at least 12 months have the right to:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Request conversion</strong> to permanent part-time or full-time employment, OR</li>
          <li><strong>Receive a proactive offer</strong> from their employer to convert</li>
        </ul>
        <p style={pStyle}>
          &quot;Regular and systematic&quot; doesn&apos;t mean identical hours every week. A consistent pattern of engagement &mdash; even with some variation &mdash; can qualify.
        </p>
        <p style={pStyle}>
          If you&apos;ve been working a recognisable schedule for over a year without any conversation about conversion, your employer may be in breach. <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your pay now</a>.
        </p>
      </section>

      {/* What can employer say */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What can your employer say when you request conversion?</h2>
        <p style={pStyle}>
          Your employer can decline a conversion request &mdash; but only if they have genuine operational reasons. If they decline, they must:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Provide the reasons in writing</li>
          <li>Do so within 21 days of the request</li>
        </ul>
        <p style={pStyle}>
          They cannot decline simply because they prefer casual arrangements. Vague reasons like &quot;we need flexibility&quot; without specific operational justification may not be sufficient.
        </p>
        <p style={pStyle}>
          If you&apos;ve had a conversion request declined without written reasons, or the reasons given seem unsupported, the decision can be challenged at the Fair Work Commission.
        </p>
      </section>

      {/* What changes */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What changes when you convert to permanent?</h2>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}></th>
                <th style={thStyle}>Casual</th>
                <th style={thStyle}>Permanent (part-time)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Hourly rate</td><td style={tdStyle}>Higher (25% loading)</td><td style={tdStyle}>Lower (no loading)</td></tr>
              <tr><td style={tdStyle}>Annual leave</td><td style={tdStyle}>None</td><td style={tdStyle}>4 weeks/year, pro-rated</td></tr>
              <tr><td style={tdStyle}>Personal leave</td><td style={tdStyle}>None</td><td style={tdStyle}>10 days/year, pro-rated</td></tr>
              <tr><td style={tdStyle}>Guaranteed hours</td><td style={tdStyle}>None</td><td style={tdStyle}>As agreed</td></tr>
              <tr><td style={tdStyle}>Notice of termination</td><td style={tdStyle}>None</td><td style={tdStyle}>Required</td></tr>
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          Whether conversion is in your financial interest depends on your hours and how much you value leave entitlements. For many regular casuals in hospitality, the annual leave alone is worth more than the loading difference.
        </p>
      </section>

      {/* Warning box */}
      <section style={sectionStyle}>
        <div style={warningBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>&#9888;&#65039; Common conversion right issues in hospitality</h2>

          <h3 style={h3Style}>Employer never raises it after 12 months</h3>
          <p style={pStyle}>
            The employer has a proactive obligation &mdash; not just to respond to requests but to inform eligible employees of their right. Many don&apos;t.
          </p>

          <h3 style={h3Style}>Hours varied slightly to avoid &quot;regular and systematic&quot; classification</h3>
          <p style={pStyle}>
            Some employers deliberately vary rosters to prevent a recognisable pattern. If this has happened to you, document your actual schedule &mdash; a consistent pattern often still exists.
          </p>

          <h3 style={h3Style}>Told conversion isn&apos;t available because the business needs flexibility</h3>
          <p style={pStyle}>
            &quot;We need flexible staffing&quot; is not on its own a sufficient operational reason. The employer must demonstrate specific, genuine reasons related to your particular role or situation.
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

      {/* Closing */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Don&apos;t guess &mdash; check your pay while you consider your options.
        </p>
        <p style={pStyle}>
          Whether you convert or stay casual, you&apos;re entitled to be paid correctly right now.
        </p>
        <p style={pStyle}>
          It takes 2 minutes &mdash; and you&apos;ll know for certain if you&apos;ve been underpaid.
        </p>
        <p style={smallStyle}>
          Based on official pay rates from the Fair Work Commission (MA000009).
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Hospitality Industry (General) Award 2020 (MA000009), effective 1 July 2025. General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
