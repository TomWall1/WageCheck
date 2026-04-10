/**
 * High-intent: My Office Pay Seems Too Low — Clerks Award
 * URL: /awards/clerks-award/pay-too-low-clerks
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
  { question: 'My pay went up with the July increase — doesn\'t that mean it\'s correct?', answer: 'Not necessarily. If your employer applied the annual increase to an already-incorrect base rate, or if your classification level is wrong, the increase just shifts the underpayment forward. The question isn\'t whether your rate increased — it\'s whether it matches the correct level for your duties.' },
  { question: 'I started at a low rate because I was new — shouldn\'t it increase over time?', answer: 'The Clerks Award doesn\'t have automatic time-based progression like some awards. But your classification must match your duties. If you started at Level 1 doing basic filing and now handle accounts, scheduling, and complex correspondence, you should be reclassified at Level 3 — regardless of how long you\'ve been there.' },
  { question: 'What if my employer says they pay above the award?', answer: 'Ask them to show you in writing which classification level they\'re paying above, and whether that calculation includes all overtime hours. Many employers who claim to pay above the award are actually comparing their rate to the wrong level or not accounting for unpaid overtime.' },
];

export default function ClerksIntentPayTooLow({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; Rates effective 1 July 2025 &middot; MA000002
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You&apos;re here because something about your pay doesn&apos;t feel right. Maybe you looked up the Clerks Award rates and the numbers don&apos;t match. Maybe a colleague in a similar role earns more. Whatever triggered it &mdash; trust that instinct. Office workers are underpaid far more often than most people realise.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The three most common reasons clerks are underpaid: wrong classification level, missing overtime, and no annual increase applied.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Quick check: is your pay too low?</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>Answer these questions:</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: 0 }}>
            <li style={{ marginBottom: '6px' }}>Do you know your classification level (1&ndash;5)? If not, that&apos;s a red flag.</li>
            <li style={{ marginBottom: '6px' }}>Does your payslip show a separate overtime rate when you work beyond 38 hours or 7.6 hours/day?</li>
            <li style={{ marginBottom: '6px' }}>Did your rate increase on 1 July 2025?</li>
            <li style={{ marginBottom: '6px' }}>Do you handle bookkeeping, accounts, or complex admin but get paid at a &quot;basic&quot; rate?</li>
          </ul>
        </div>
        <p style={pStyle}>
          If any of those answers concern you, the gap between what you earn and what the award requires could be significant.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>How big is the gap?</h2>
        <p style={pStyle}>
          A Level 2 clerk paid at Level 1 rates loses roughly $2&ndash;$3 per hour. That&apos;s $76&ndash;$114 per week, or $3,900&ndash;$5,900 per year. Add unpaid overtime and the total climbs further. These aren&apos;t edge cases &mdash; this is the most common pattern of Clerks Award underpayment.
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
        <p style={pStyle}>Stop guessing. Enter your hours and classification and find out in 2 minutes.</p>
        <CheckPayCTA awardCode="MA000002" awardName="Clerks Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        Rates sourced from the Fair Work Commission pay guide for the Clerks &mdash; Private Sector Award 2020 (MA000002), effective 1 July 2025. General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
