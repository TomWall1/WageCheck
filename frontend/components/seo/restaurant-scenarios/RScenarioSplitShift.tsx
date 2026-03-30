/**
 * Scenario: Split Shift Allowance — /awards/restaurant-award/scenarios/split-shift-allowance
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { RestaurantRateData, getAllowance } from '@/lib/restaurant-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const h3Style: React.CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

export default function RScenarioSplitShift({ rates }: { rates?: RestaurantRateData }) {
  const splitAllowance = rates ? getAllowance(rates, 'split_shift') : 0;
  const weeklyAllowance = Math.round(splitAllowance * 5 * 100) / 100;
  const yearlyAllowance = Math.round(splitAllowance * 250 * 100) / 100;
  const threeYearAllowance = Math.round(yearlyAllowance * 3 * 100) / 100;

  const faqData = [
    { question: 'Do casual employees get the split shift allowance?', answer: 'No. The split shift allowance under the Restaurant Award applies to permanent (full-time) and part-time employees only. Casuals are not entitled to this allowance.' },
    { question: 'My break between shifts is 90 minutes — do I qualify?', answer: 'Each work period within the split shift must be at least 2 hours. The allowance applies when you work two separate periods (e.g., lunch service and dinner service) with an unpaid break between them, provided each period meets the minimum duration.' },
    { question: `I've worked split shifts for 3 years with no allowance — can I claim it back?`, answer: `Yes. You can claim unpaid split shift allowances for up to 6 years under the Fair Work Act. Three years of daily split shifts at ${formatCurrency(splitAllowance)}/shift adds up to roughly ${formatCurrency(threeYearAllowance)}.` },
  ];

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you work morning and evening service with an unpaid break in between, you&apos;re owed a split shift allowance for every qualifying day. This is one of the most commonly missed <a href="/awards/restaurant-award/allowances" style={linkStyle}>allowances</a> under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          If you regularly work split shifts &mdash; check whether the allowance is on your payslip.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Restaurant Industry Award (MA000119):</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>A split shift allowance is payable per shift for permanent and part-time employees</li>
          <li>Applies when the employee works two separate periods of work in one day with an unpaid break between them</li>
          <li>Each work period must be at least 2 hours</li>
          <li>Casual employees are not entitled to this allowance</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Split shift allowance example</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Split shift allowance: {formatCurrency(splitAllowance)} per qualifying shift</li>
            <li>5 split shifts per week &times; 50 weeks = 250 qualifying shifts per year</li>
            <li>Annual total: {formatCurrency(yearlyAllowance)}/year that&apos;s often completely missed</li>
          </ul>
          <p style={smallStyle}>
            That&apos;s {formatCurrency(weeklyAllowance)}/week for a full-time worker doing daily split shifts. Many restaurant workers doing lunch and dinner service every day never see this allowance on their payslip.
          </p>
        </div>
        <p style={smallStyle}>
          Rates based on the Fair Work Commission pay guide for MA000119, effective 1 July 2025.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What this costs you</h2>
        <p style={pStyle}>
          The split shift allowance is payable every qualifying day. At {formatCurrency(splitAllowance)} per shift, a full-time worker doing 5 split shifts per week over 50 weeks is owed {formatCurrency(yearlyAllowance)}/year. Over 3 years without the allowance: {formatCurrency(threeYearAllowance)} in back-pay &mdash; money that most workers never realise they&apos;re owed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is there a separate line item for &quot;split shift allowance&quot;?</li>
          <li>Does it appear on every day you worked a split shift?</li>
          <li>Are you permanent or part-time? (casuals are not eligible)</li>
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
        <p style={pStyle}>Working split shifts? Make sure you&apos;re getting everything you&apos;re owed.</p>
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
