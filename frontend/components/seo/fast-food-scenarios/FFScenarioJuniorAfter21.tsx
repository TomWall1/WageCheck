/**
 * Scenario: I Turned 21 Working in Fast Food — Has My Rate Changed?
 * /awards/fast-food-award/scenarios/junior-turned-21
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
  { question: 'Does my pay automatically increase when I turn 21?', answer: 'Yes. From the first full pay period on or after your 21st birthday, your employer must pay you the full adult rate. You don\'t need to request it — it\'s automatic under the award. If they don\'t adjust it, they\'re underpaying you.' },
  { question: 'I turned 21 two months ago and my rate hasn\'t changed — what do I do?', answer: 'Raise it with your employer first, referencing the Fast Food Industry Award (MA000003). If they don\'t fix it, you can lodge a complaint with the Fair Work Ombudsman. You may also be owed back pay for every shift worked since your birthday.' },
  { question: 'What is the junior rate for a 20-year-old in fast food?', answer: 'A 20-year-old receives 97% of the adult rate under the Fast Food Industry Award. For Grade 1, the adult base rate is $24.73, so a 20-year-old earns approximately $23.99/hr. At 21, you move to the full 100% rate.' },
];

export default function FFScenarioJuniorAfter21({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const adultBase = g1?.ftRate ?? 24.73;
  const juniorRate = Math.round(adultBase * 0.97 * 100) / 100;
  const weeklyDiff = Math.round((adultBase - juniorRate) * 38 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          Yes, your pay rate changes the moment you turn 21. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, junior rates end at 21 and you must be moved to the full adult rate from the first full pay period after your birthday.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) sets junior pay rates as a percentage of the adult rate based on age. At age 20, you receive 97% of the adult rate. Once you turn 21, you are entitled to 100% of the adult rate for your classification level. Your employer must adjust your pay from the first full pay period on or after your 21st birthday — no application or request is needed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 — turning 21</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Junior rate (age 20, 97%): ${juniorRate.toFixed(2)}/hr</li>
            <li>Adult rate (age 21+): ${adultBase.toFixed(2)}/hr</li>
            <li>Increase: ${(adultBase - juniorRate).toFixed(2)}/hr</li>
          </ul>
          <p style={smallStyle}>
            Over a 38-hour week, that&apos;s an extra ${weeklyDiff.toFixed(2)} per week you&apos;re owed if your employer hasn&apos;t updated your rate.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Has your hourly rate increased since your 21st birthday?</li>
          <li>Is your rate at least the full adult minimum for your grade?</li>
          <li>Check all penalty rates have also been recalculated on the adult base rate.</li>
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
