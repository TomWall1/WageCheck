/**
 * Scenario: Pay Doesn't Match Roster — /awards/restaurant-award/scenarios/pay-doesnt-match
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
  { question: 'My roster was changed after I worked the shift — what am I paid for?', answer: 'You\'re paid for the hours you actually worked, not a retroactively altered roster. If you worked 6 hours but the roster was changed to show 5, you\'re owed pay for 6 hours. Keep your own records of actual start and finish times.' },
  { question: 'Does it matter if my timesheet is digital or paper?', answer: 'Both are valid records. Whether your employer uses a digital time-clock system or paper timesheets, the records should accurately reflect your actual hours worked. If they don\'t, the discrepancy needs to be corrected.' },
  { question: 'My employer says the difference is just a rounding error — should I accept that?', answer: 'Request the correction in writing. Even small rounding errors compound over time — 15 minutes per shift across 5 shifts per week is over 60 hours per year of unpaid work. Ask your employer to correct the payslip and back-pay any shortfall.' },
];

export default function RScenarioPayDoesntMatch({ rates }: { rates?: RestaurantRateData }) {
  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000119
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If your payslip doesn&apos;t match your roster or actual hours worked, the shortfall is owed to you. Under the <a href="/awards/restaurant-award" style={linkStyle}>Restaurant Industry Award</a>, you must be paid for every hour worked at the correct <a href="/awards/restaurant-award/pay-rates" style={linkStyle}>rate</a> for that shift type. Hours trimmed or rates applied incorrectly are both forms of underpayment.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Payslip showing fewer hours than you worked? That&apos;s money missing from your pay.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Employers must pay for all hours actually worked at the correct award rate for each shift type. Payslips must accurately reflect hours worked, rates applied, and any loadings or penalties. Discrepancies between actual hours and payslip hours are a contravention of the Fair Work Act.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <div style={exampleBoxStyle}>
          <h3 style={h3Style}>Compare your records to your payslip</h3>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Actual hours worked vs hours shown on payslip</li>
            <li>Rate for each shift type (weekday, Saturday, Sunday, PH, late night)</li>
            <li>Any overtime hours that should appear but don&apos;t</li>
            <li>Allowances that should be included</li>
          </ul>
          <p style={smallStyle}>
            Even 15 minutes trimmed per shift adds up: across 5 shifts/week for a year, that&apos;s 65+ hours of unpaid work.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to do</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Keep your own record of actual start and finish times</li>
          <li>Compare each pay period to your records</li>
          <li>Raise any discrepancy with your employer in writing</li>
          <li>If not corrected, contact the Fair Work Ombudsman on 13 13 94</li>
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
        <p style={pStyle}>Check whether the rates on your payslip match what the award requires.</p>
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
