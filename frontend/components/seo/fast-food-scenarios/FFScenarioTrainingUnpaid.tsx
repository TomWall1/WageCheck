/**
 * Scenario: Unpaid Training Shift in Fast Food — Is This Legal?
 * /awards/fast-food-award/scenarios/training-unpaid
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
  { question: 'My employer said the first shift is a "trial" and unpaid — is that legal?', answer: 'An unpaid trial shift is only legal if it is genuinely for assessment purposes (not productive work), is no longer than necessary to assess your skills, and you are informed in advance that it\'s unpaid. If you\'re making food, serving customers, or doing any productive work, it\'s not a trial — it\'s work, and it must be paid.' },
  { question: 'I did online training at home — should that be paid?', answer: 'Yes. If your employer requires you to complete training modules, watch videos, or do any work-related activity outside of your normal shifts, that time must be paid at your applicable rate. Mandatory training is work time regardless of where it takes place.' },
  { question: 'Can I be paid less during training?', answer: 'You must be paid at least the minimum rate for your classification and age under the Fast Food Industry Award. There is no "training rate" in this award. From your first paid minute, you are entitled to the full Grade 1 (or applicable) rate. If casual, the 25% loading applies from the start.' },
];

export default function FFScenarioTrainingUnpaid({ rates }: { rates?: AwardRateData }) {
  const l1 = rates ? getLevel(rates, 1) : undefined;
  const baseRate = l1?.ftRate ?? 24.73;
  const casualRate = l1?.casualRate ?? 30.91;
  const training4hrs = Math.round(casualRate * 4 * 100) / 100;
  const minEngagement = Math.round(casualRate * 2 * 100) / 100;

  return (
    <>
      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; MA000003
      </p>

      <section style={sectionStyle}>
        <p style={pStyle}>
          No, unpaid training in fast food is not legal if you are performing productive work. Under the <a href="/awards/fast-food-award" style={linkStyle}>Fast Food Industry Award</a>, any time you spend working — including training shifts where you serve customers, prepare food, or learn on the job — must be paid at the applicable award rate.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>The rule</h2>
        <p style={pStyle}>
          Under Australian workplace law, if an employment relationship exists and you are performing work (including training that benefits the employer), you must be paid. The Fast Food Industry Award (MA000003) does not provide for unpaid training shifts. From your first hour of work, you are entitled to at least the Grade 1 rate for your age and employment type. Casual employees are also entitled to the minimum 2-hour engagement, even for a training shift.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What you should be paid</h2>
        <div style={exampleBoxStyle}>
          <p style={{ ...pStyle, fontWeight: 600, marginBottom: '8px' }}>Casual Grade 1 — 4-hour training shift</p>
          <ul style={{ ...pStyle, paddingLeft: '1.25rem', marginBottom: '4px' }}>
            <li>Casual hourly rate: ${casualRate.toFixed(2)}/hr</li>
            <li>4-hour training shift: ${training4hrs.toFixed(2)}</li>
            <li>Minimum engagement (2 hrs): ${minEngagement.toFixed(2)}</li>
          </ul>
          <p style={smallStyle}>
            If your employer didn&apos;t pay you for this shift, you are owed at least ${training4hrs.toFixed(2)}. For a shorter training session, the minimum is still ${minEngagement.toFixed(2)} (2-hour minimum engagement).
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>What to check on your payslip</h2>
        <ul style={{ ...pStyle, paddingLeft: '1.25rem' }}>
          <li>Is your training shift listed on your payslip as paid time?</li>
          <li>Were you paid the same rate for training hours as regular work hours?</li>
          <li>If you completed training at home (online modules), were those hours included?</li>
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
