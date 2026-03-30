/**
 * Scenario: Public Holiday Rates — /awards/restaurant-award/scenarios/public-holiday-rate
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

export default function RScenarioPublicHoliday({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const casualRate = l3?.casualRate ?? 0;
  const phCasualRate = l3?.publicHolidayCasual ?? 0;
  const ordinaryShift = Math.round(casualRate * 8 * 100) / 100;
  const phShift = Math.round(phCasualRate * 8 * 100) / 100;
  const phGap = Math.round((phShift - ordinaryShift) * 100) / 100;
  const yearlyGap = Math.round(phGap * 8 * 100) / 100;

  const faqData = [
    { question: 'I worked a 3-hour shift on a public holiday — can I be paid for just 3 hours?', answer: 'No. Permanent and part-time employees have a minimum engagement of 4 hours on public holidays. Even if you only worked 3 hours, you must be paid for 4 hours at the public holiday rate. Casual minimum engagement is 2 hours.' },
    { question: 'My employer paid me "double time" for a public holiday — is that enough?', answer: 'For permanent employees, the Restaurant Award public holiday rate is 2.25\u00d7 the ordinary rate, not 2\u00d7. If you were paid double time instead of 2.25\u00d7, you\'ve been underpaid by 0.25\u00d7 on every public holiday hour worked.' },
    { question: 'Can I refuse to work on a public holiday?', answer: 'Yes, if the request to work is unreasonable. You can refuse an unreasonable request. Factors include the nature of the workplace, your personal circumstances, and whether you were given adequate notice.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Permanent employees working <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>public holidays</a> under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> are entitled to 2.25&times; the ordinary rate &mdash; not double time. There are also minimum engagement requirements that many employers overlook.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you worked a public holiday and got paid &quot;double time&quot; &mdash; you were likely underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Permanent employees: 2.25&times; ordinary hourly rate for all hours worked</li>
          <li>Casual employees: applicable casual public holiday rate</li>
          <li>Minimum engagement permanent/part-time: 4 hours</li>
          <li>Minimum engagement casual: 2 hours</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Casual Level 3 &mdash; 8-hour public holiday shift</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Ordinary casual L3 rate: {formatCurrency(casualRate)}/hr</li>
            <li>Public holiday casual L3 rate: {formatCurrency(phCasualRate)}/hr</li>
            <li>8-hour shift at ordinary rate: {formatCurrency(ordinaryShift)}</li>
            <li>8-hour shift at PH rate: {formatCurrency(phShift)}</li>
            <li>Gap per PH shift: {formatCurrency(phGap)} underpaid</li>
          </ul>
          <p style={smallStyle}>
            Over ~8 public holidays per year: {formatCurrency(yearlyGap)} in missed penalty rates. Exact figures depend on your classification level.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Restaurant workers frequently work public holidays &mdash; Christmas, Easter, Australia Day. If your employer pays &quot;double time&quot; instead of 2.25&times;, the 0.25&times; shortfall on an 8-hour shift at Level 3 is significant. Across 8 public holidays per year, that&apos;s hundreds of dollars &mdash; and that&apos;s just the gap between 2&times; and 2.25&times;. Workers paid at ordinary rates on public holidays are owed far more.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate public holiday rate line on PH days?</li>
          <li>Does the rate show 2.25&times; (not 2&times;) for permanent employees?</li>
          <li>Were you paid for at least 4 hours (permanent/PT) or 2 hours (casual)?</li>
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
        <p style={pStyle}>Worked a public holiday? Check you were paid the correct rate.</p>
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
