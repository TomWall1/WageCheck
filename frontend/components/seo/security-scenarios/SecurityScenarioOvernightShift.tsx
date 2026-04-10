/**
 * Scenario: Overnight Security Shift — What's the Pay Rate?
 * URL: /awards/security-award/scenarios/overnight-shift
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';
import { formatCurrency } from '@/lib/utils';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'What is the night loading for security guards?', answer: 'The Security Services Industry Award provides penalty loadings for overnight hours. The exact percentage depends on the day and time, but hours worked between midnight and 6am attract higher rates than standard evening hours. These night loadings are on top of the base rate and apply to all employment types.' },
  { question: 'Does the rate change at midnight on an overnight shift?', answer: 'Yes. If your shift starts on a Saturday evening and runs past midnight into Sunday, the hours after midnight are paid at the Sunday rate — which is higher. Many employers pay the same rate for the entire shift, which short-changes you on the post-midnight hours.' },
  { question: 'Is the overnight rate different for casuals and full-time?', answer: 'Yes. Casual employees receive their base casual rate (which includes the 25% casual loading) plus the applicable night/weekend penalty. Full-time employees receive the base rate plus the night loading. Both employment types are entitled to the penalty — the base rate they build from is just different.' },
];

export default function SecurityScenarioOvernightShift({ rates }: { rates?: AwardRateData }) {
  const l2 = rates ? getLevel(rates, 2) : undefined;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: April 2026 &middot; MA000016
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Overnight shifts are the backbone of security work &mdash; and they carry some of the highest penalty rate entitlements under any award. The Security Services Industry Award requires different rates depending on the exact hours worked, and an overnight shift typically spans multiple penalty rate bands. If your employer pays a flat rate from 6pm to 6am, they are almost certainly underpaying you.
        </p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          Your rate at 3am is not the same as your rate at 7pm. The award says so.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>Under the Security Services Industry Award (MA000016), overnight hours attract penalty loadings:</p>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '6px' }}>Evening and night hours attract shift loadings above the base rate</li>
          <li style={{ marginBottom: '6px' }}>Hours after midnight may attract higher loadings than pre-midnight hours</li>
          <li style={{ marginBottom: '6px' }}>If the shift crosses into a Saturday or Sunday, the post-midnight hours are paid at the applicable weekend rate</li>
          <li style={{ marginBottom: '6px' }}>Overtime applies for hours beyond ordinary on any shift, including overnight shifts</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Worked example</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, marginBottom: '8px' }}>
            <strong>Scenario:</strong> Casual security guard, Level 2, works a Friday night shift from 6pm to 6am (12 hours).
          </p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '8px' }}>
            <li>6pm&ndash;midnight (Friday): evening/night rate applies</li>
            <li>Midnight&ndash;6am (Saturday): Saturday rate applies &mdash; higher than the Friday night rate</li>
            <li>Hours beyond ordinary: overtime at 1.5x then 2x</li>
          </ul>
          <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
            A flat rate ignores all three rate changes in a single shift. The shortfall on one overnight shift can exceed $50&ndash;$100+.
          </p>
          <p style={smallStyle}>
            Multiply by 3&ndash;4 overnight shifts per week and the annual underpayment runs into thousands.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '8px' }}>Does your payslip show different rates for pre-midnight and post-midnight hours?</li>
          <li style={{ marginBottom: '8px' }}>Is the post-midnight rate higher when the shift crosses into a Saturday or Sunday?</li>
          <li style={{ marginBottom: '8px' }}>Are overtime hours separated out on shifts over 8 hours?</li>
          <li style={{ marginBottom: '8px' }}>Is a night shift allowance or loading shown on your payslip?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000016" awardName="Security Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', marginTop: '0', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only. Verify at <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>fairwork.gov.au</a>.
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
