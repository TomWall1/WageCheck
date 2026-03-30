/**
 * Scenario: Meal Allowance — /awards/restaurant-award/scenarios/meal-allowance
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
  { question: 'Does the meal allowance apply if overtime was planned in advance?', answer: 'No. The meal allowance is triggered when overtime is not notified the day before. If your employer told you the day before (or earlier) that you\'d be working overtime, the meal allowance doesn\'t apply — even if the overtime extends through a meal time.' },
  { question: 'Do casual workers get the meal allowance?', answer: 'The meal allowance provisions generally apply differently to casuals. The key trigger is unplanned overtime extending through a meal time for full-time and part-time employees.' },
  { question: 'What if my employer provides a meal instead?', answer: 'If the employer provides an adequate meal, this satisfies the obligation and the monetary meal allowance doesn\'t need to be paid. The meal must be adequate — a packet of chips or a slice of bread doesn\'t count.' },
];

export default function RScenarioMealAllowance({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re full-time or part-time and worked unplanned <a href="/awards/restaurant-award/overtime" style={linkStyle}>overtime</a> that extended through a meal time, you&apos;re entitled to a meal allowance under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>. This is separate from your overtime pay.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Asked to stay back with no notice and worked through dinner? You&apos;re owed a meal allowance.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Restaurant Industry Award (MA000119), a meal allowance is payable when a full-time or part-time employee works overtime that was not notified the day before, and that overtime extends through a recognised meal time. The allowance covers the cost of a meal the employee wasn&apos;t expecting to need.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>When it applies</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Example scenario</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Shift scheduled to finish at 5pm</li>
            <li>At 4:30pm, manager asks you to stay until 8pm</li>
            <li>No notice given the day before</li>
            <li>You work through the dinner period (6pm&ndash;7pm)</li>
            <li>Result: meal allowance is owed in addition to overtime pay</li>
          </ul>
          <p style={smallStyle}>
            If this happens regularly &mdash; staying back unexpectedly through meal times &mdash; the unpaid meal allowances add up over time.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a meal allowance line item for shifts with unplanned overtime?</li>
          <li>Did the overtime extend through a meal time?</li>
          <li>Was the overtime notified the day before? (If yes, no meal allowance)</li>
          <li>Did the employer provide an adequate meal instead?</li>
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
        <p style={pStyle}>Check whether your pay includes all applicable allowances and overtime.</p>
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
