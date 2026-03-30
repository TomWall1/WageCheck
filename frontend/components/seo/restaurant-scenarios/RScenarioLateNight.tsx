/**
 * Scenario: Late Night Loading — /awards/restaurant-award/scenarios/late-night-loading
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getLateNightLoading } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioLateNight({ rates }: { rates?: RestaurantRateData }) {
  const lateNight = rates ? getLateNightLoading(rates) : 0;
  const weeklyShortfall = Math.round(lateNight * 6 * 100) / 100;
  const yearlyShortfall = Math.round(weeklyShortfall * 50 * 100) / 100;

  const faqData = [
    { question: 'Does the late-night loading stack with Saturday or Sunday penalties?', answer: 'Yes. The late-night loading applies in addition to any applicable Saturday or Sunday penalty rate. They are separate entitlements that both apply when the qualifying conditions are met.' },
    { question: 'My shift ends at 9:45pm — do I get the loading?', answer: 'No. The late-night loading under the Restaurant Award starts at 10pm. Hours worked before 10pm do not attract the loading, even if the shift finishes close to 10pm.' },
    { question: 'My employer says my flat rate includes the late-night loading — is that okay?', answer: 'Only if the flat rate demonstrably covers the highest combined rate for every shift type, including late-night hours on weekends. If the flat rate doesn\'t clear the combined penalty + loading amount, it fails.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          You should be getting a loading for late-night hours, but most workers who close restaurants don&apos;t. The <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> adds a per-hour loading after 10pm and a higher loading after midnight &mdash; on top of your ordinary or <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>penalty rate</a>.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work past 10pm &mdash; check whether the loading appears on your payslip.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Loading per hour for hours worked between 10pm and midnight</li>
          <li>Higher loading per hour for hours worked between midnight and 6am</li>
          <li>No loading before 10pm (unlike the Hospitality Award which starts at 7pm)</li>
          <li>Loading applies in addition to any penalty rates for weekends or public holidays</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Missing 10pm&ndash;midnight loading example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Late-night loading (10pm&ndash;midnight): {formatCurrency(lateNight)}/hr</li>
            <li>3 closing shifts per week, 2 hours post-10pm each = 6 late-night hours/week</li>
            <li>Weekly shortfall: {formatCurrency(weeklyShortfall)}/week</li>
            <li>Over 50 weeks: {formatCurrency(yearlyShortfall)}/year missed</li>
          </ul>
          <p style={smallStyle}>
            The loading stacks with weekend penalties, so Saturday or Sunday closing shifts cost even more when missed.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          A worker doing 3 closing shifts per week with 2 hours past 10pm on each shift is missing {formatCurrency(lateNight)}/hr on 6 hours per week &mdash; that&apos;s {formatCurrency(weeklyShortfall)}/week or {formatCurrency(yearlyShortfall)}/year. Over 50 weeks, that&apos;s 300 hours of loading missed. It stacks with weekend penalties that many employers also miss, pushing total underpayment even higher.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate line for late-night loading on shifts past 10pm?</li>
          <li>Is the midnight&ndash;6am loading higher than the 10pm&ndash;midnight loading?</li>
          <li>Does the loading appear on weekend shifts as well as weekday shifts?</li>
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
        <p style={pStyle}>Closing up late? Make sure you&apos;re getting your late-night loading.</p>
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
