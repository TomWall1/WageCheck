/**
 * Scenario: Junior No Penalty Rates — /awards/restaurant-award/scenarios/junior-no-penalty
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

export default function RScenarioJuniorNoPenalty({ rates }: { rates?: RestaurantRateData }) {
  const l3 = rates ? getLevel(rates, 3) : undefined;

  const adultCasualRate = l3?.casualRate ?? 0;
  const juniorCasualWeekday = Math.round(adultCasualRate * 0.6 * 100) / 100;
  const adultSundayCasual = l3?.sundayCasual ?? 0;
  const juniorSundayCasual = Math.round(adultSundayCasual * 0.6 * 100) / 100;
  const sundayGap = Math.round((juniorSundayCasual - juniorCasualWeekday) * 100) / 100;
  const shiftGap = Math.round(sundayGap * 6 * 100) / 100;
  const yearlyGap = Math.round(shiftGap * 50 * 100) / 100;

  const faqData = [
    { question: 'My employer says juniors just get "the junior rate" — is that right?', answer: 'No. The junior rate is the starting point (a percentage of the adult base rate). Penalty rate multipliers for Saturdays, Sundays, and public holidays then apply on top of that junior base rate. A flat junior rate on penalty days is wrong.' },
    { question: 'I just turned 18 — what should change on my payslip?', answer: 'Check your payslip carefully. At 18, your junior percentage increases (typically to 70% of the adult rate). Your rate should reflect this change from your 18th birthday, and penalty multipliers should be applied to the updated base.' },
    { question: 'What happens when I turn 21?', answer: 'From your 21st birthday, you are entitled to full adult rates under the award. Your employer must update your pay from that date — no delay, no probation period at the junior rate.' },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          That&apos;s almost certainly wrong. Junior rates under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a> are a starting point &mdash; not a cap. <a href="/awards/restaurant-award/penalty-rates" style={linkStyle}>Penalty rate</a> multipliers for Saturdays, Sundays, and public holidays apply on top of the junior base rate, just as they do for adults.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you&apos;re under 21 and working weekends at a flat junior rate &mdash; you&apos;re almost certainly underpaid.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Junior rates are a percentage of the adult base rate, increasing with age</li>
          <li>Penalty rate multipliers (Saturday, Sunday, public holiday) apply to the junior base rate</li>
          <li>The junior rate does not replace or absorb penalty entitlements</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>17-year-old casual Level 3 &mdash; Sunday shift</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Adult casual L3 weekday rate: {formatCurrency(adultCasualRate)}/hr</li>
            <li>Junior percentage (17 y/o): 60%</li>
            <li>Junior casual weekday rate: {formatCurrency(juniorCasualWeekday)}/hr</li>
            <li>Junior casual Sunday rate (with penalty): {formatCurrency(juniorSundayCasual)}/hr</li>
            <li>If paid flat weekday junior rate on Sunday: gap of {formatCurrency(sundayGap)}/hr</li>
          </ul>
          <p style={smallStyle}>
            On a 6-hour Sunday shift, a 17-year-old missing Sunday penalties loses {formatCurrency(shiftGap)} per shift. Over 50 weekly Sunday shifts: {formatCurrency(yearlyGap)}/year. Exact figures depend on classification level and age percentage.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          Young workers are disproportionately affected because they&apos;re less likely to know about penalty rates and more likely to accept what they&apos;re told. A 17-year-old Level 3 casual working one 6-hour Sunday shift per week at a flat {formatCurrency(juniorCasualWeekday)}/hr instead of the correct {formatCurrency(juniorSundayCasual)}/hr loses {formatCurrency(shiftGap)} per shift &mdash; that&apos;s {formatCurrency(yearlyGap)}/year.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Does your Sunday rate differ from your weekday rate?</li>
          <li>Does your Saturday rate differ from your weekday rate?</li>
          <li>Is the junior percentage correct for your age?</li>
          <li>Are penalty multipliers applied to your junior base, not just the adult base?</li>
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
        <p style={pStyle}>Under 21 and working weekends? Check your pay is correct.</p>
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
