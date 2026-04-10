/**
 * Scenario: Split Shifts in the Fitness Industry — Am I Being Paid for the Break?
 * URL: /awards/fitness-award/scenarios/split-shift
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What counts as a split shift in the fitness industry?', answer: 'A split shift is when your work is broken into two or more separate periods in a single day with an unpaid break of more than one hour between them. In fitness, this is extremely common — a morning block of classes (e.g., 6am–9am) and an evening block (e.g., 5pm–8pm) with 8 hours unpaid in between. That gap triggers a split shift allowance.' },
  { question: 'How much is the split shift allowance?', answer: 'The allowance amount is specified in the Fitness Industry Award and is updated annually. It is a flat dollar amount per split shift worked — meaning you receive it for every day you work a broken shift, regardless of how long the break between sessions is.' },
  { question: 'My employer says I choose to work split shifts so no allowance is owed — is that right?', answer: 'No. The split shift allowance is triggered by the pattern of work, not by who chose it. If the roster requires you to work morning and evening sessions with a long unpaid break in between, the allowance is payable. It doesn\'t matter that split shifts are standard in fitness or that you agreed to the roster.' },
];

export default function FitnessScenarioSplitShift({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000094
      </p>

      {/* Intro */}
      <section style={sectionStyle}>
        <p style={pStyle}>
          Split shifts are the default working pattern in the fitness industry. Morning classes, long unpaid break, evening classes. It&apos;s so normal that most fitness workers don&apos;t realise they&apos;re entitled to extra pay for it. They are. The <a href="/awards/fitness-award" style={linkStyle}>Fitness Industry Award</a> includes a split shift allowance specifically because this pattern is disruptive &mdash; you can&apos;t take another job during that break, and you&apos;re effectively tied to two commutes in one day.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          The split shift allowance is almost never paid in fitness. If you work broken shifts, check your payslip for it right now.
        </p>
      </section>

      {/* The Rule */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under the Fitness Industry Award, when an employee works a split shift &mdash; where their ordinary hours are split into two or more separate periods with an unpaid break exceeding a specified duration &mdash; the employer must pay a split shift allowance. This is a flat dollar amount per day, on top of your ordinary pay. It applies to every day you work a split shift.
        </p>
        <p style={pStyle}>
          The allowance compensates for the inconvenience and cost of the broken work pattern. It is not optional, and it applies whether you&apos;re full-time, part-time, or casual.
        </p>
      </section>

      {/* Worked example */}
      <section style={sectionStyle}>
        <div style={exampleBoxStyle}>
          <h2 style={{ ...h2Style, marginBottom: '12px' }}>Worked example</h2>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Gym instructor works 6am&ndash;9am and 5pm&ndash;8pm, Monday through Friday. That&apos;s 5 split shifts per week.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What should happen:</strong> Each of the 5 days triggers a split shift allowance. Over a week, that&apos;s 5 &times; the daily allowance amount.
          </p>
          <p style={{ ...pStyle, marginBottom: '4px' }}>
            <strong>What actually happens:</strong> Employer pays for 30 hours of work at the ordinary rate. No split shift allowance appears on the payslip.
          </p>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            Over a year, missing split shift allowances on 5 days per week adds up to hundreds of dollars.
          </p>
          <p style={smallStyle}>
            <strong>Why it happens:</strong> Split shifts are so standard in fitness that employers and workers alike treat them as normal. But &ldquo;normal&rdquo; and &ldquo;compensated&rdquo; are different things.
          </p>
        </div>
      </section>

      {/* What to check */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your payslip list a &ldquo;split shift allowance&rdquo; or equivalent line item?</li>
          <li>How many days per week do you work a broken shift (morning + evening)?</li>
          <li>Is the allowance paid for every split shift day, not just some?</li>
          <li>Does the amount match the current award rate for the allowance?</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000094" awardName="Fitness Award" />
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ ...h3Style, cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Disclaimer */}
      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
