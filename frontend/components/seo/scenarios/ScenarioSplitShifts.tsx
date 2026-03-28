/**
 * Scenario: Split Shifts in Hospitality — Am I Being Paid for the Break?
 * URL: /awards/hospitality-award/scenarios/split-shifts-pay
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
  { question: 'I\'m casual — do I get the split shift allowance?', answer: 'No. The split shift allowance applies to permanent and part-time employees only. Casual employees do not receive it.' },
  { question: 'My breaks are sometimes shorter than 2 hours — does the allowance still apply?', answer: 'The allowance applies when the unpaid break is 2 hours or longer. Breaks shorter than 2 hours don\'t trigger it.' },
  { question: 'My employer says the break is a meal break — does that change anything?', answer: 'A meal break during a continuous shift is different from a split shift. The allowance applies when you leave the workplace entirely and return for a separate work period, not when you take a break mid-shift.' },
];

export default function ScenarioSplitShifts() {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000009
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No &mdash; you shouldn&apos;t be paid for the break itself, but you should be receiving a split shift allowance. If your working day is broken into two separate periods with an unpaid gap between them, the Hospitality Award entitles permanent and part-time employees to an additional <a href="/awards/hospitality-award/allowances" style={linkStyle}>allowance</a> on top of their hourly rate. Most employers never pay it.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you work split shifts in any hospitality venue as a permanent or part-time employee &mdash; this applies to you.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Hospitality Award (MA000009), a split shift allowance applies when your working day is broken into two or more separate periods with an unpaid gap:
        </p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li><strong>Gap of 2&ndash;3 hours:</strong> {/* TODO: dynamic rate */}$3.53/day allowance</li>
          <li><strong>Gap of more than 3 hours:</strong> {/* TODO: dynamic rate */}$5.34/day allowance</li>
        </ul>
        <p style={pStyle}>
          This allowance applies to permanent and part-time employees only &mdash; casual employees are not entitled to it.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Example:</strong> Permanent waitstaff, Level 2. Works 10am&ndash;2pm, 3-hour break, then 5pm&ndash;9pm &mdash; 5 days a week.
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>Hourly rate applies for both working periods as normal</li>
            <li>Split shift allowance: {/* TODO: dynamic rate */}$5.34/day &times; 5 days = {/* TODO: dynamic rate */}$26.70/week</li>
            <li>Over 50 working weeks: {/* TODO: dynamic rate */}$1,335/year in allowances owed</li>
          </ul>
        </div>
        <p style={pStyle}>
          If no split shift allowance appears on your payslip and you regularly work this pattern, <a href="/check-my-pay?award=MA000009" style={linkStyle}>Check if your split shift allowance is missing &rarr;</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The split shift allowance is {/* TODO: dynamic rate */}$5.34/day when the break exceeds 3 hours. Working 5 split shifts per week: ~$26.70/week. Over 50 working weeks: ~$1,335/year &mdash; money that should appear on every payslip and almost never does.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a split shift allowance line for each day you worked a broken shift?</li>
          <li>Does the allowance amount match the gap duration ({/* TODO: dynamic rate */}$3.53 for 2&ndash;3hr gap, {/* TODO: dynamic rate */}$5.34 for 3hr+ gap)?</li>
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
          Don&apos;t guess &mdash; check what you&apos;re owed.
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
