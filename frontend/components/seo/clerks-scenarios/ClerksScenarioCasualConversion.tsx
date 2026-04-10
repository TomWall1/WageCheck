/**
 * Scenario: Casual Conversion — Clerks Award
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Will I lose money by converting from casual to permanent?', answer: 'You lose the 25% casual loading, but you gain paid annual leave (4 weeks), paid personal/carer\'s leave (10 days), and notice of termination/redundancy pay. For most clerks working regular hours, the value of leave entitlements exceeds the casual loading — especially if you\'ve been taking unpaid time off for holidays and sick days.' },
  { question: 'My employer offered conversion but wants to reduce my hours — is that allowed?', answer: 'The conversion should reflect the regular pattern of hours you\'ve actually been working. If you\'ve been working 35 hours per week consistently, the permanent role should be based on 35 hours. An employer cannot use conversion as an opportunity to reduce your hours below what you\'ve been regularly working.' },
  { question: 'Can my employer refuse my request to convert?', answer: 'Only on reasonable business grounds, such as your hours being about to significantly change or the position being genuinely redundant. The employer must provide written reasons for the refusal within 21 days. If you believe the refusal is unreasonable, you can raise a dispute through Fair Work.' },
];

export default function ClerksScenarioCasualConversion({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;ve been working as a casual clerk for 12 months or more with a regular pattern of hours, you have the right to request conversion to permanent employment. Your employer must also offer you conversion if you meet the criteria. Many casual clerks work the same hours every week for years without being told about this right.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Working the same shifts every week as a &quot;casual&quot; for over a year? You likely have a right to go permanent.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How casual conversion works</h2>
        <div style={exampleBoxStyle}>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>After 12 months of regular and systematic casual employment, your employer must offer you conversion to full-time or part-time</li>
            <li style={{ marginBottom: '6px' }}>If they don&apos;t offer, you can request it yourself after 12 months</li>
            <li style={{ marginBottom: '6px' }}>The permanent role must reflect the hours you&apos;ve been regularly working</li>
            <li style={{ marginBottom: '6px' }}>You gain paid leave, notice periods, and redundancy entitlements</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why it matters financially</h2>
        <p style={pStyle}>
          Casual clerks don&apos;t get paid leave. If you take a week off for holidays, that&apos;s a week with zero income. If you&apos;re sick for three days, that&apos;s three days unpaid. Converting to permanent means 4 weeks paid annual leave and 10 days paid personal leave per year. For a Level 2 clerk working 38 hours, that&apos;s worth roughly $5,000&ndash;$6,000 per year in leave entitlements alone.
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
        <p style={pStyle}>Check your current casual rate and see what your entitlements should be.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
