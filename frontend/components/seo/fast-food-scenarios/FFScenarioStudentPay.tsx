/**
 * Scenario: Student Working Fast Food — Are Pay Rates Different?
 * /awards/fast-food-award/scenarios/student-pay
 */

import CheckPayCTA from '@/components/seo/CheckPayCTA';
import { AwardRateData, getLevel } from '@/lib/award-rates';

const h2Style: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '10px', marginTop: '0' };
const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' };
const smallStyle: React.CSSProperties = { fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.6 };
const sectionStyle: React.CSSProperties = { marginBottom: '2.5rem' };
const exampleBoxStyle: React.CSSProperties = { background: '#f8f9fa', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '1.5rem' };
const linkStyle: React.CSSProperties = { color: 'var(--primary)', textDecoration: 'underline' };

const faqData = [
  { question: 'Does being a student affect my pay rate?', answer: 'No. There is no "student rate" under the Fast Food Industry Award. Your pay rate is determined by your age (junior rates apply under 21) and your classification level — not your student status. A 21-year-old university student working part-time earns the same rate as any other 21-year-old.' },
  { question: 'Can my employer pay me less because I\'m only available limited hours?', answer: 'No. Your availability has no bearing on your hourly rate. Whether you work 5 hours or 38 hours per week, the hourly rate must be the same for your classification, age, and employment type. If you\'re casual, you receive the 25% casual loading regardless of your hours.' },
  { question: 'I\'m an international student — do I have the same pay rights?', answer: 'Yes. All employees in Australia have the same minimum pay entitlements regardless of visa status or nationality. International students on a work visa are covered by the Fast Food Industry Award and must receive the same rates, penalty rates, and entitlements as any other worker. Underpaying someone because of their visa status is illegal.' },
];

export default function FFScenarioStudentPay({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const casualRate = l1?.casualRate ?? 30.91;
  const sundayCasual = Math.round(baseRate * 1.75 * 100) / 100;
  const weeklyPay15hrs = Math.round(casualRate * 15 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          There is no separate student pay rate — you are entitled to the same minimum rates as every other worker. The <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a> bases your pay on age and classification, not on whether you&apos;re studying. If you&apos;re 21 or over, you get the full adult rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) does not distinguish between students and non-students. Your minimum hourly rate is determined by your age (junior percentages apply for workers under 21) and your classification level (Grade 1, 2, or 3). All penalty rates, loadings, and entitlements apply equally. International students on work visas have exactly the same workplace rights as Australian citizens and permanent residents.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>21-year-old student, casual Grade 1, 15 hrs/week</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Weekday casual rate: ${casualRate.toFixed(2)}/hr</li>
            <li>Sunday casual rate (175%): ${sundayCasual.toFixed(2)}/hr</li>
            <li>Weekly pay (15 weekday hrs): ${weeklyPay15hrs.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            These are minimum rates. If you work Sundays, public holidays, or after 10pm, your pay should be higher. Being a student does not change any of these amounts.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your hourly rate at least the award minimum for your age and classification?</li>
          <li>Are you receiving the 25% casual loading if you&apos;re a casual employee?</li>
          <li>Are penalty rates applied correctly for weekends, public holidays, and late nights?</li>
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
