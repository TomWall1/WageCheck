/**
 * Scenario: Casual Late Nights in Hospitality — Am I Being Paid Correctly?
 * URL: /awards/hospitality-award/scenarios/casual-late-nights
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { HospitalityRateData, getLevel, getEveningLoading, getNightLoading } from '@/lib/hospitality-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function ScenarioCasualLateNights({ rates }: { rates?: HospitalityRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;
  const eveningLoading = rates ? getEveningLoading(rates) : 0;
  const nightLoading = rates ? getNightLoading(rates) : 0;

  const faqData = [
    { question: 'Do the evening/late-night loadings apply on weekdays too?', answer: 'Yes. The loadings apply on any day of the week — weekday evenings and late nights attract the loading just as weekend shifts do.' },
    { question: 'I finish at 11:30pm — does the late-night loading still apply?', answer: 'No — the late-night loading begins at midnight. Work between 7pm and midnight attracts the evening loading only.' },
    { question: 'Can my employer pay a flat rate that covers these loadings?', answer: 'Only if the flat rate demonstrably exceeds the highest possible rate combination across all shifts. For late weekend nights, that\'s a high bar.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Probably not. Late night shifts are one of the most frequently under-compensated shift types in hospitality. The Hospitality Award adds a loading for work after 7pm and a higher loading after midnight &mdash; on top of your casual rate and any weekend rate that applies. Most employers pay one flat rate for the whole shift.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work casual shifts finishing after 10pm, midnight, or later &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), adult employees are entitled to additional loadings on top of their base or casual rate:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Evening work (7pm&ndash;midnight):</strong> +{formatCurrency(eveningLoading)}/hr on top of the applicable rate</li>
          <li><strong>Late night work (midnight&ndash;7am):</strong> +{formatCurrency(nightLoading)}/hr on top of the applicable rate</li>
        </ul>
        <p style={pStyle}>
          These loadings stack on top of whatever day rate applies. A Saturday night shift running past midnight attracts the Saturday casual rate plus the evening loading plus (from midnight) the late-night loading.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Casual bar attendant, Level 2. Shift runs 7pm&ndash;2am on a Saturday.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>7pm&ndash;midnight: Saturday casual rate ({formatCurrency(l2?.saturdayCasual ?? 0)}/hr) + evening loading ({formatCurrency(eveningLoading)}/hr) = {formatCurrency((l2?.saturdayCasual ?? 0) + eveningLoading)}/hr</li>
            <li>Midnight&ndash;2am: Sunday casual rate ({formatCurrency(l2?.sundayCasual ?? 0)}/hr) + late-night loading ({formatCurrency(nightLoading)}/hr) = {formatCurrency((l2?.sundayCasual ?? 0) + nightLoading)}/hr</li>
          </ul>
          <p style={smallStyle}>
            If you&apos;re being paid {formatCurrency(l2?.casualRate ?? 0)}/hr for that whole shift, the shortfall is significant.
          </p>
        </div>
        <p style={pStyle}>
          If your late night rate looks the same as your afternoon rate, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your late-night shifts &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A shift from 9pm to 2am has two rate periods &mdash; evening loading (9pm&ndash;midnight) and late-night loading (midnight&ndash;2am) &mdash; on top of the applicable day rate. If you&apos;re being paid a flat casual rate for the whole shift, the missed loading across 3 late nights per week adds up to approximately $60&ndash;$100/week. Over a year: ~$3,000&ndash;$5,000 in missed loadings.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Do separate lines appear for evening or late-night hours?</li>
          <li>Does the rate change at midnight when the day changes?</li>
          <li>Is one flat casual rate applied for the entire shift?</li>
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
          Don&apos;t guess &mdash; enter your actual shifts and check.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at fairwork.gov.au.
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
