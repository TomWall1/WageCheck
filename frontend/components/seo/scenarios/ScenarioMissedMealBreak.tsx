/**
 * Scenario: No Meal Break on a 10-Hour Hospitality Shift — Is That Legal?
 * URL: /awards/hospitality-award/scenarios/missed-meal-break
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'I\'m casual — do I get the meal allowance?', answer: 'No. The meal allowance under the Hospitality Award applies to permanent and part-time employees only.' },
  { question: 'My employer provides a meal during overtime — do I still get the allowance?', answer: 'No. If your employer actually provides a meal, the cash allowance doesn\'t apply. It only applies when no meal is provided.' },
  { question: 'What about planned overtime — does the allowance apply?', answer: 'The allowance applies specifically to unplanned overtime where adequate notice wasn\'t given. If the extended hours were pre-rostered, the allowance may not apply — though the obligation to provide a meal break or allowance remains.' },
];

export default function ScenarioMissedMealBreak() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Possibly &mdash; but if your employer doesn&apos;t provide a meal break, they may owe you a meal <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowance</a>. Under the Hospitality Award, full-time and part-time employees who work overtime that extends through a meal time without prior notice are entitled to a meal allowance. Working through without a break doesn&apos;t make the shift illegal per se, but it does trigger a payment obligation.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work long hospitality shifts without a proper meal break &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Hospitality Award (MA000009):</p>
        <p style={pStyle}>
          <strong>Meal allowance &mdash; when it applies:</strong> Full-time and part-time employees required to work <a href="/awards/hospitality-award/overtime" style={linkStyle}>overtime</a> without being given at least the required prior notice, where a meal time falls during that overtime period, are entitled to a meal allowance of {/* TODO: dynamic rate */}$16.73 per meal.
        </p>
        <p style={pStyle}>This applies when:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>You&apos;re permanent (full-time or part-time) &mdash; not casual</li>
          <li>The overtime was not planned in advance (unplanned overtime)</li>
          <li>A meal period falls within the overtime hours</li>
          <li>Your employer doesn&apos;t provide a meal</li>
        </ul>
        <p style={pStyle}>
          Casual employees are not entitled to the meal allowance under the Hospitality Award.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Meal breaks &mdash; what the award actually requires</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            The Hospitality Award requires employees to be allowed meal breaks during extended shifts. The specific provisions are built into the ordinary hours and rostering framework. A 10-hour shift with no meal break provided may also raise conditions-of-employment concerns separate from the allowance.
          </p>
        </div>
        <p style={pStyle}>
          If you&apos;ve been working extended shifts without the meal allowance, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check your extended shift entitlements &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The meal allowance for unplanned overtime is {/* TODO: dynamic rate */}$16.73 per meal. If this applies twice per week &mdash; common in busy kitchens and high-volume service &mdash; that&apos;s $16.73 &times; 2 = approximately $33.46/week. Over 50 weeks: ~$1,673/year in allowances owed but never paid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does a meal allowance ({/* TODO: dynamic rate */}$16.73) appear on any pay period where you worked unplanned overtime through a meal time?</li>
          <li>If you&apos;re full-time or part-time and have been asked to stay back unexpectedly, has the allowance been paid?</li>
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
          Don&apos;t guess &mdash; check what your extended shifts should pay.
        </p>
        <CheckPayCTA awardCode="MA000009" awardName="Hospitality Award" />
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
