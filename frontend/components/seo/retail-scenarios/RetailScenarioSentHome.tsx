/**
 * Scenario: Sent Home Early in Retail — /awards/retail-award/scenarios/sent-home
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
  { question: 'I was sent home after 1 hour — do I get paid for 3?', answer: 'Yes. Under the Retail Award, the minimum engagement for casual and part-time employees is 3 hours. If your employer sends you home after 1 hour, they must pay you for the full 3 hours.' },
  { question: 'Does minimum engagement apply to full-time employees?', answer: 'Full-time employees are typically rostered for full shifts, but if they are sent home early, they must still be paid for their rostered hours unless there is a genuine agreement otherwise. The 3-hour minimum engagement rule specifically applies to casual and part-time employees.' },
  { question: 'Can my employer call me in for a 2-hour shift?', answer: 'No. Under the Retail Award, the minimum engagement is 3 hours. Your employer cannot roster you for less than 3 hours. If they roster you for 2 hours, they must pay you for 3.' },
];

export default function RetailScenarioSentHome({ rates }: { rates?: AwardRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000004
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you were sent home early from a retail shift, you must still be paid for a minimum of 3 hours. The <a href="/awards/retail-award/" style={linkStyle}>General Retail Industry Award</a> sets a minimum engagement of 3 hours for casual and part-time employees. Your employer cannot send you home after an hour and only pay you for an hour.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Sent home after 1 hour? You&apos;re owed at least 2 more hours of pay.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Retail Award (MA000004), the minimum engagement for each shift is 3 consecutive hours. This applies to casual and part-time employees. If you are rostered on and sent home early, you must be paid for at least 3 hours at the applicable rate for that day and time.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Real example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual retail worker arrives for a Sunday shift. Store is quiet, manager sends them home after 90 minutes. Only paid for 90 minutes at the weekday casual rate.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 1:</strong> Should have been paid for 3 hours, not 90 minutes.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>Error 2:</strong> Should have been paid at the Sunday rate (200%), not the weekday rate.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
            Two errors on a single shift &mdash; minimum engagement and penalty rate both missed.
          </p>
        </div>
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
        <p style={pStyle}>Check your minimum engagement pay is correct.</p>
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
