/**
 * Scenario: Sunday Rate Wrong — /awards/restaurant-award/scenarios/sunday-rate-wrong
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLevel } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioSundayRateWrong({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const casualRate = l3?.casualRate ?? 0;
  const sundayCasual = l3?.sundayCasual ?? 0;
  const gapPerHour = Math.round((sundayCasual - casualRate) * 100) / 100;
  const shiftGap = Math.round(gapPerHour * 6 * 100) / 100;
  const yearlyGap = Math.round(shiftGap * 50 * 100) / 100;

  const faqData = [
    { question: 'My employer says one rate covers all days — is that allowed?', answer: 'Only if they can provide written proof that the single rate demonstrably exceeds the highest penalty rate for every shift type you work, including Sundays and public holidays. A flat rate that doesn\'t clear the Sunday rate is non-compliant.' },
    { question: 'I\'ve been paid the wrong Sunday rate for 2 years — can I claim it back?', answer: 'Yes. Under the Fair Work Act you can claim up to 6 years of underpayments. Two years of incorrect Sunday rates on regular shifts adds up to a substantial amount.' },
    { question: 'Is the Sunday rate the same at all classification levels?', answer: 'The multiplier is the same (1.5\u00d7 for permanent), but because the base rate differs at each level, the dollar amount differs. Casual Sunday rates also vary by level because the casual loading is applied before the penalty.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your Sunday rate looks the same as a Tuesday, it&apos;s almost certainly wrong. The <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> sets specific Sunday <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a> that are significantly higher than ordinary weekday rates &mdash; for both permanent and casual employees.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work Sundays in a restaurant or standalone caf&eacute; &mdash; check your rate now.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Sunday permanent rate: 1.5&times; the ordinary hourly rate</li>
          <li>Sunday casual rate: a level-dependent higher multiplier applied on top of the casual loading</li>
        </ul>
        <p style={pStyle}>These rates are mandatory. Your employer cannot pay the weekday rate for Sunday work.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Casual Level 3 example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary casual rate (weekday): {formatCurrency(casualRate)}/hr</li>
            <li>Sunday casual rate: {formatCurrency(sundayCasual)}/hr</li>
            <li>Gap per hour: {formatCurrency(gapPerHour)}</li>
          </ul>
          <p style={smallStyle}>
            On a 6-hour Sunday shift, that&apos;s {formatCurrency(shiftGap)} missing per shift. Working one Sunday per week: {formatCurrency(yearlyGap)}/year underpaid.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A casual Level 3 receiving the weekday rate instead of the Sunday rate on a single 6-hour shift loses roughly {formatCurrency(shiftGap)} per shift. Over 50 weeks, that&apos;s nearly {formatCurrency(yearlyGap)}/year &mdash; from one shift type alone. For workers doing multiple Sundays per week, the gap compounds rapidly.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate line item for Sunday hours?</li>
          <li>Is the Sunday hourly rate higher than your weekday rate?</li>
          <li>Does the Sunday rate reflect 1.5&times; (permanent) or the applicable casual multiplier?</li>
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
        <p style={pStyle}>Don&apos;t guess &mdash; check exactly what your Sunday shifts should pay.</p>
        <CheckPayCTA awardCode="MA000119" awardName="Restaurant Industry Award" />
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
