/**
 * Scenario: Fast Food Shift After 10pm — Am I Getting a Loading?
 * /awards/fast-food-award/scenarios/late-night-loading
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
  { question: 'Does the late night loading apply to casuals as well?', answer: 'Yes. The late night loading (10% from 10pm to midnight, 15% after midnight) applies to all employees — casual, part-time, and full-time. For casuals, this loading is applied on top of your casual rate. It\'s a separate entitlement from the 25% casual loading.' },
  { question: 'What if my shift starts at 9pm and finishes at 11pm?', answer: 'You receive your ordinary rate (or casual rate) for the hour from 9pm to 10pm. From 10pm to 11pm, you receive the 10% late night loading on top of your base rate. The loading only kicks in at 10pm — not for the entire shift.' },
  { question: 'Is the late night loading shown separately on my payslip?', answer: 'It should be. Best practice is for your payslip to show a separate line item for late night hours with the loading applied. If your payslip only shows a single flat rate for the entire shift, you should ask your employer to clarify whether the loading is included.' },
];

export default function FFScenarioLateNight({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const lateNightRate = Math.round(baseRate * 1.10 * 100) / 100;
  const afterMidnight = Math.round(baseRate * 1.15 * 100) / 100;
  const shift4pm11pm = Math.round(baseRate * 6 * 100) / 100 + Math.round(lateNightRate * 1 * 100) / 100;
  const flatShift = Math.round(baseRate * 7 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes, you should be getting a loading for every hour you work after 10pm. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, there is a 10% loading from 10pm to midnight and a 15% loading after midnight — on top of your ordinary or casual rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) provides a late-night loading for all employees. Between 10pm and midnight, you receive an additional 10% on top of your ordinary hourly rate. After midnight, the loading increases to 15%. These loadings apply Monday to Sunday and are separate from weekend penalty rates. If you work a Sunday night shift past 10pm, you receive both the Sunday penalty and the late-night loading.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, 4pm&ndash;11pm weekday shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>4pm&ndash;10pm (6 hrs) at base rate: ${baseRate.toFixed(2)}/hr</li>
            <li>10pm&ndash;11pm (1 hr) at late night rate (110%): ${lateNightRate.toFixed(2)}/hr</li>
            <li>After midnight rate (115%): ${afterMidnight.toFixed(2)}/hr</li>
            <li>Total for 7-hr shift: ${shift4pm11pm.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At a flat rate, you&apos;d receive ${flatShift.toFixed(2)} &mdash; missing ${(shift4pm11pm - flatShift).toFixed(2)} in late night loading.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are your hours after 10pm shown at a higher rate than your pre-10pm hours?</li>
          <li>Is the late night loading (10% or 15%) itemised separately?</li>
          <li>If you work past midnight, does the rate increase from 10% to 15% at that point?</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <CheckPayCTA awardCode="MA000003" awardName="Fast Food Industry Award" />
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {faqData.map((faq, i) => (
          <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
            <summary style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)', cursor: 'pointer', padding: '4px 0' }}>{faq.question}</summary>
            <p style={{ ...pStyle, marginTop: '8px' }}>{faq.answer}</p>
          </details>
        ))}
      </section>

      <p style={{ ...smallStyle, marginTop: '2rem', fontStyle: 'italic' }}>
        General information only &mdash; not legal advice. Verify details at <a href="https://www.fairwork.gov.au" style={linkStyle}>fairwork.gov.au</a>.
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
