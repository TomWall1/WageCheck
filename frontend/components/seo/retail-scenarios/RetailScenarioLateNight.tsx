/**
 * Scenario: Late Night Loading in Retail — /awards/retail-award/scenarios/late-night
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
  { question: 'What counts as "late night" under the Retail Award?', answer: 'Under the Retail Award, late night work means hours worked after 6pm on Monday to Friday. The specific penalty rates apply to evening and early morning hours as specified in the award. If you regularly work closing shifts past 6pm, check that the evening loading is applied.' },
  { question: 'Does late night loading apply on weekends too?', answer: 'Weekend penalty rates (Saturday and Sunday) already apply to all hours worked on those days regardless of time. The specific late night/evening loading structure applies to weekday shifts. Weekend rates are generally higher than the evening loading, so you receive the weekend rate instead.' },
  { question: 'I close the store at 9pm every Thursday — should my rate be higher?', answer: 'Yes. If you are working after 6pm on a weekday, the evening penalty rate applies to those hours. A Thursday closing shift from 4pm to 9pm should have the last 3 hours paid at the higher evening rate, not the standard weekday rate.' },
];

export default function RetailScenarioLateNight({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Late night shifts in retail attract higher pay under the <a href="/awards/retail-award/" style={linkStyle}>General Retail Industry Award</a>. Hours worked after 6pm on weekdays are subject to evening penalty rates. If your pay is the same for a 9am shift and a 6pm&ndash;9pm close, the evening loading is missing.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Late-night retail workers who close stores regularly can be underpaid by $30&ndash;$50 per week if evening penalties are missing.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual Level 1 retail worker closes the store 3 nights per week. Shifts run from 4pm to 9:30pm. Paid a flat casual rate for all hours.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> Hours after 6pm should attract the evening penalty rate &mdash; higher than the standard weekday casual rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Hours affected:</strong> 3.5 hours per shift &times; 3 nights = 10.5 hours per week at the wrong rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Over a year, that&apos;s hundreds of hours of missed evening penalties.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip show a separate rate for evening hours?</li>
          <li>Is your rate after 6pm higher than your rate before 6pm on weekdays?</li>
          <li>Are your actual clock-in and clock-out times reflected on the payslip?</li>
        </ul>
        <CheckPayCTA awardCode="MA000004" awardName="Retail Award" />
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
        <p style={pStyle}>Check your evening rate is correct &mdash; enter your shifts and find out.</p>
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
