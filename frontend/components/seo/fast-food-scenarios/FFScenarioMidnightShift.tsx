/**
 * Scenario: Fast Food Shift Past Midnight — What's the Loading?
 * /awards/fast-food-award/scenarios/midnight-shift
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
  { question: 'What is the difference between the 10pm and midnight loadings?', answer: 'Between 10pm and midnight, you receive a 10% loading on top of your base rate. After midnight, this increases to 15%. The loadings reflect the greater inconvenience and health impact of working very late or early morning hours.' },
  { question: 'Does the after-midnight loading stack with Saturday or Sunday penalties?', answer: 'The late night loading applies on top of your applicable rate for that day. If your shift crosses midnight from Saturday into Sunday, the after-midnight hours receive both the Sunday penalty rate and the 15% late night loading. These entitlements are cumulative.' },
  { question: 'I work drive-through from 11pm to 3am — how is my pay calculated?', answer: 'From 11pm to midnight, you receive your base rate plus the 10% late night loading. From midnight to 3am, you receive your base rate plus the 15% after-midnight loading. If this falls on a weekend, the relevant penalty rate applies first, then the loading is added on top.' },
];

export default function FFScenarioMidnightShift({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const baseRate = g1?.ftRate ?? 24.73;
  const lateNight10 = Math.round(baseRate * 1.10 * 100) / 100;
  const afterMidnight = Math.round(baseRate * 1.15 * 100) / 100;
  // Shift: 9pm to 2am (5 hours)
  const pay9to10 = Math.round(baseRate * 1 * 100) / 100;
  const pay10to12 = Math.round(lateNight10 * 2 * 100) / 100;
  const pay12to2 = Math.round(afterMidnight * 2 * 100) / 100;
  const totalCorrect = Math.round((pay9to10 + pay10to12 + pay12to2) * 100) / 100;
  const flatTotal = Math.round(baseRate * 5 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          After midnight, you receive a 15% loading on top of your base rate — higher than the 10% loading that applies from 10pm to midnight. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, these late-night loadings are separate entitlements that apply to all employees, including casuals.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) sets two tiers of late-night loading. From 10pm to midnight, all employees receive a 10% loading on top of their ordinary (or casual) rate. After midnight, the loading increases to 15%. These loadings apply every day of the week and are in addition to any weekend penalty rates. They recognise the unsociable nature of working late-night and early-morning hours.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 full-time, weekday 9pm&ndash;2am shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>9pm&ndash;10pm (1 hr, base): ${pay9to10.toFixed(2)}</li>
            <li>10pm&ndash;midnight (2 hrs, 110%): ${pay10to12.toFixed(2)}</li>
            <li>Midnight&ndash;2am (2 hrs, 115%): ${pay12to2.toFixed(2)}</li>
            <li>Correct total: ${totalCorrect.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            At a flat rate for 5 hours, you&apos;d receive ${flatTotal.toFixed(2)} &mdash; a shortfall of ${(totalCorrect - flatTotal).toFixed(2)} in late-night loadings.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Are hours between 10pm and midnight paid at a 10% premium?</li>
          <li>Are hours after midnight paid at a 15% premium?</li>
          <li>If your shift spans both time bands, are they calculated separately?</li>
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
