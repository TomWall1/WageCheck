/**
 * Scenario: Still on Grade 1 After 6 Months in Fast Food — Is That Right?
 * /awards/fast-food-award/scenarios/grade-1-after-6-months
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
  { question: 'What is the difference between Grade 1, 2, and 3?', answer: 'Grade 1 covers employees with basic duties and limited training. Grade 2 includes employees who have completed additional training or who perform more complex tasks like cooking, operating a register, and basic supervisory duties. Grade 3 covers experienced employees with significant responsibility, such as shift supervisors and trainers.' },
  { question: 'Does my employer have to promote me to Grade 2?', answer: 'The award doesn\'t mandate automatic promotion. However, if your duties match the Grade 2 description — such as operating cooking equipment, performing more complex tasks, or having completed relevant training — you should be classified and paid at Grade 2 regardless of your job title. Classification is based on what you actually do, not what your employer calls your role.' },
  { question: 'Can I ask to be reclassified?', answer: 'Yes. Review the classification definitions in the Fast Food Industry Award and compare them to your actual duties. If your work matches Grade 2, raise it with your employer in writing. If they disagree, you can seek advice from the Fair Work Ombudsman or your union.' },
];

export default function FFScenarioGrade1After6Months({ rates }: { rates?: AwardRateData }) {
  const g1 = rates ? getLevel(rates, 1) : undefined;
  const g2 = rates ? getLevel(rates, 2) : undefined;
  const grade1 = g1?.ftRate ?? 24.73;
  const grade2 = g2?.ftRate ?? 25.60;
  const diff = Math.round((grade2 - grade1) * 100) / 100;
  const weeklyDiff = Math.round(diff * 38 * 100) / 100;
  const yearlyDiff = Math.round(weeklyDiff * 52 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          If you&apos;re performing Grade 2 duties but still being paid at Grade 1, you are being underpaid. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, your classification — and therefore your pay rate — is determined by the work you actually do, not how long you&apos;ve been employed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          The Fast Food Industry Award (MA000003) classifies employees into three grades based on their duties, skills, and training — not tenure. Grade 1 covers introductory-level work with basic tasks. Grade 2 applies to employees performing more skilled duties such as cooking, complex food preparation, operating a cash register independently, or basic supervisory work. If your day-to-day tasks match the Grade 2 description, your employer must pay you at the Grade 2 rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Grade 1 vs Grade 2 — full-time</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Grade 1 base: ${grade1.toFixed(2)}/hr</li>
            <li>Grade 2 base: ${grade2.toFixed(2)}/hr</li>
            <li>Difference: ${diff.toFixed(2)}/hr</li>
            <li>Weekly difference (38 hrs): ${weeklyDiff.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            Over a full year, being incorrectly classified at Grade 1 instead of Grade 2 costs you ${yearlyDiff.toFixed(2)} — and that&apos;s just the base rate before penalties.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>What classification level is shown on your payslip?</li>
          <li>Do your actual duties match the Grade 2 description (cooking, cash handling, supervision)?</li>
          <li>Has your rate increased since you started, or is it still at the entry-level Grade 1 amount?</li>
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
