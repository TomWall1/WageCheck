/**
 * Scenario: Casual Conversion in Retail — /awards/retail-award/scenarios/casual-conversion
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I\'ve been casual for 2 years with regular shifts — can I convert?', answer: 'Yes. Under the Fair Work Act, if you have been employed as a casual for 12 months and have worked a regular pattern of hours for at least the last 6 months, your employer must offer you conversion to permanent employment (unless there are reasonable business grounds not to). If they haven\'t offered, you can request it yourself.' },
  { question: 'Will I lose money by converting from casual to permanent?', answer: 'You lose the 25% casual loading but gain paid annual leave (4 weeks), paid personal/carer\'s leave (10 days), and paid public holidays. For most retail workers with regular hours, the leave entitlements are worth more than the casual loading — especially if you work weekends and public holidays.' },
  { question: 'Can my employer refuse my request to convert?', answer: 'Only on reasonable business grounds — for example, if your hours are genuinely going to change significantly. They must provide written reasons for the refusal. If you believe the refusal is not genuine, you can raise it with the Fair Work Commission.' },
];

export default function RetailScenarioCasualConversion({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve been working regular shifts as a casual in retail for 12 months or more, you have the right to request conversion to permanent (part-time or full-time) employment. Your employer is legally required to offer you conversion after 12 months if you&apos;ve worked a regular pattern of hours for at least the last 6 months.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Been casual for over a year with the same shifts every week? Your employer should have already offered you permanent employment.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>What you gain by converting</h2>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
            <li>4 weeks paid annual leave per year</li>
            <li>10 days paid personal/carer&apos;s leave per year</li>
            <li>Paid public holidays (instead of just the penalty rate)</li>
            <li>Notice of termination and redundancy pay entitlements</li>
            <li>Guaranteed hours each week</li>
          </ul>
          <p style={smallStyle}>
            You lose the 25% casual loading, but for a retail worker doing 25+ hours per week with regular shifts, the leave entitlements are typically worth more.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How to request conversion</h2>
        <ol style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Put your request in writing to your employer.</li>
          <li style={{ marginBottom: '8px' }}>Reference the Fair Work Act casual conversion provisions.</li>
          <li style={{ marginBottom: '8px' }}>Your employer has 21 days to respond in writing.</li>
          <li style={{ marginBottom: '8px' }}>If refused, they must give written reasons based on reasonable business grounds.</li>
        </ol>
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
        <p style={pStyle}>Check what your pay should be as a permanent employee vs casual.</p>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
