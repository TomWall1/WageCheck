/**
 * Scenario: TOIL (Time Off In Lieu) — /awards/restaurant-award/scenarios/toil
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData } from '@/lib/restaurant-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Can my employer require me to take TOIL instead of overtime pay?', answer: 'No. TOIL must be genuinely agreed between the employer and employee. Your employer cannot unilaterally decide you\'ll take time off instead of being paid overtime. If you don\'t agree, you\'re entitled to overtime pay.' },
  { question: 'Is a verbal agreement to take TOIL sufficient?', answer: 'No. The agreement to take TOIL must be in writing. A verbal arrangement doesn\'t meet the award requirements. Without a written agreement, the overtime should have been paid at the overtime rate.' },
  { question: 'What happens if I don\'t use my TOIL within 6 months?', answer: 'Unused TOIL must be paid out at the overtime rate that would have applied when the overtime was worked. Your employer cannot let TOIL accumulate indefinitely — if it\'s not taken within 6 months, it converts to a payment obligation.' },
];

export default function RScenarioToil({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No &mdash; 1 hour of time-and-a-half <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a> equals 1.5 hours of TOIL minimum. Hour-for-hour TOIL for overtime hours is underpayment under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>. TOIL must also be agreed in writing and taken within 6 months.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Getting 1 hour off for every 1 hour of overtime? That&apos;s not TOIL &mdash; that&apos;s underpayment.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119), TOIL arrangements must meet all of these requirements:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Agreement must be in writing</li>
          <li>TOIL must be taken at the overtime rate: 1 hour at 1.5&times; = 1.5 hours TOIL; 1 hour at 2&times; = 2 hours TOIL</li>
          <li>TOIL must be taken within 6 months</li>
          <li>Unused TOIL after 6 months must be paid out at the overtime rate</li>
        </ul>
        <p style={pStyle}>Hour-for-hour TOIL for overtime work is non-compliant and constitutes underpayment.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>The 1:1 TOIL shortfall</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>1 hour of overtime at 1.5&times; should = 1.5 hours TOIL</li>
            <li>1:1 TOIL gives you only 1 hour off</li>
            <li>Shortfall: 0.5 hours per overtime hour worked</li>
          </ul>
          <p style={smallStyle}>
            If you work 4 hours of overtime per week on 1:1 TOIL, you&apos;re losing 2 hours of time off every week. Over a year, that&apos;s 100+ hours of uncompensated work &mdash; equivalent to nearly 3 weeks of full-time pay.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a written TOIL agreement?</li>
          <li>Is TOIL accrued at the overtime rate (1.5 or 2 hours per overtime hour)?</li>
          <li>Is TOIL taken within 6 months?</li>
          <li>Has any unused TOIL been paid out at overtime rates?</li>
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
        <p style={pStyle}>Calculate what your overtime hours should actually pay.</p>
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
