/**
 * Scenario: Good Friday Pay — /awards/restaurant-award/scenarios/good-friday
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

export default function RScenarioGoodFriday({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const ftRate = l3?.ftRate ?? 0;
  const doubleTime = Math.round(ftRate * 2 * 100) / 100;
  const phRate = l3?.publicHolidayFt ?? 0;
  const gapPerHour = Math.round((phRate - doubleTime) * 100) / 100;
  const shiftGap = Math.round(gapPerHour * 8 * 100) / 100;

  const faqData = [
    { question: 'Is it really 2.25\u00d7 and not just double time?', answer: 'Yes. This is one of the most common mistakes in the restaurant industry. The permanent public holiday rate under the Restaurant Industry Award is 2.25\u00d7 the ordinary rate — not 2\u00d7. The difference might seem small per hour, but it adds up across a full shift.' },
    { question: 'Are all public holidays paid at the same rate?', answer: 'Yes. Under the Restaurant Industry Award, all gazetted public holidays attract the same penalty rate: 2.25\u00d7 for permanent employees. This applies to Good Friday, Christmas Day, New Year\'s Day, and every other national and state public holiday.' },
    { question: 'I\'m part-time and normally work Fridays — what am I entitled to?', answer: 'If Good Friday falls on a day you normally work, you\'re entitled to the public holiday rate (2.25\u00d7) if you work, or a paid day off at your ordinary rate if you don\'t work. You shouldn\'t lose pay because a public holiday falls on your regular day.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Good Friday pay under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> is 2.25&times; the ordinary rate for permanent employees &mdash; not just &ldquo;double time.&rdquo; This is one of the most commonly underpaid <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rates</a> in the industry.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Being paid double time on Good Friday? You&apos;re still being short-changed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Good Friday is a national public holiday. Under the Restaurant Industry Award (MA000119), the permanent rate is 2.25&times; the ordinary hourly rate &mdash; not 2&times;. Casuals receive the applicable casual public holiday rate. This applies to all hours worked on the day.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Level 3 permanent — double time vs correct rate</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary hourly rate: {formatCurrency(ftRate)}/hr</li>
            <li>Incorrect double time (2&times;): {formatCurrency(doubleTime)}/hr</li>
            <li>Correct public holiday rate (2.25&times;): {formatCurrency(phRate)}/hr</li>
            <li>Gap per hour: {formatCurrency(gapPerHour)}</li>
          </ul>
          <p style={smallStyle}>
            On an 8-hour Good Friday shift, paying 2&times; instead of 2.25&times; short-changes you by {formatCurrency(shiftGap)}. Across multiple public holidays per year, this adds up.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is Good Friday shown as a public holiday line item?</li>
          <li>Is the rate exactly 2.25&times; your ordinary rate (not 2&times;)?</li>
          <li>Were you paid for at least 4 hours (permanent) or 2 hours (casual)?</li>
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
        <p style={pStyle}>Check your Good Friday pay matches the correct public holiday rate.</p>
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
